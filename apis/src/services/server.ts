// server.ts
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import xrpl, { Wallet, xrpToDrops } from "xrpl";
import { createSellOffer, loginWithSeed } from "./xrplNew";
import { convertUSDtoXRP } from "./xrpPriceService";

dotenv.config();
const app = express();
app.use(bodyParser.json());

// Allow requests from the frontend dev server by default
app.use(
  cors({ origin: process.env.FRONTEND_ORIGIN || "http://localhost:3000" })
);

// XRPL Websocket endpoint (testnet)
const XRPL_WS = "wss://s.altnet.rippletest.net:51233";

let client: xrpl.Client | null = null;

// ---------------------------------------------
// GET XRPL CLIENT (singleton)
// ---------------------------------------------
async function getClient(): Promise<xrpl.Client> {
  if (client && client.isConnected()) return client;
  client = new xrpl.Client(XRPL_WS);
  await client.connect();
  return client;
}

// ---------------------------------------------
// Helper: submit transaction
// ---------------------------------------------
async function submitAndWait(tx: any, wallet: Wallet) {
  const c = await getClient();
  const signed = wallet.sign(tx);
  return await c.submitAndWait(signed.tx_blob);
}

// ---------------------------------------------
// CREATE ACCOUNT
// ---------------------------------------------
app.get("/create-account", async (req, res) => {
  try {
    const c = await getClient();
    const wallet = Wallet.generate();

    let seed = wallet.seed;
    let address = wallet.classicAddress;

    if ((c as any).fundWallet) {
      const funded = await (c as any).fundWallet(wallet);
      seed = funded.wallet.seed;
      address = funded.wallet.address;
    }

    res.json({ seed, address });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// Health endpoint
app.get("/api/health", (_req, res) => res.json({ ok: true }));

// ---------------------------------------------
// GET ACCOUNT INFO
// ---------------------------------------------
app.get("/api/xrpl/account/:address", async (req, res) => {
  try {
    const { address } = req.params;
    const c = await getClient();
    const info = await c.request({
      command: "account_info",
      account: address,
      ledger_index: "validated",
    });
    res.json(info.result ?? info);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// ---------------------------------------------
// CONVERT USD -> XRP (helper endpoint)
// ---------------------------------------------
app.get("/api/xrpl/convert-usd", async (req, res) => {
  try {
    const usd = Number(req.query.usd ?? 0);
    if (isNaN(usd)) return res.status(400).json({ error: "Invalid usd param" });
    const xrp = await convertUSDtoXRP(usd);
    res.json({ xrp });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// ---------------------------------------------
// LOGIN WITH SEED
// ---------------------------------------------
function login(seed: string) {
  try {
    return Wallet.fromSeed(seed);
  } catch {
    throw new Error("Invalid XRPL seed");
  }
}

// ---------------------------------------------
// CREATE TRUSTLINE
// ---------------------------------------------
app.post("/trustline", async (req, res) => {
  const { seed, issuer, currency, limit } = req.body;

  try {
    const wallet = login(seed);
    const c = await getClient();

    const tx: any = {
      TransactionType: "TrustSet",
      Account: wallet.classicAddress,
      LimitAmount: {
        currency,
        issuer,
        value: limit ?? "1000000000",
      },
    };

    const prepared = await c.autofill(tx as any);
    const result = await submitAndWait(prepared, wallet);
    res.json(result);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// ---------------------------------------------
// ISSUE TOKEN (Payment)
// ---------------------------------------------
app.post("/mint", async (req, res) => {
  const { seed, recipient, currency, amount } = req.body;

  try {
    const wallet = login(seed);
    const c = await getClient();

    const tx: any = {
      TransactionType: "Payment",
      Account: wallet.classicAddress,
      Destination: recipient,
      Amount: {
        currency,
        issuer: wallet.classicAddress,
        value: amount,
      },
    };

    const prepared = await c.autofill(tx as any);
    const result = await submitAndWait(prepared, wallet);
    res.json(result);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// ---------------------------------------------
// BUY OFFER (buy token using XRP)
// ---------------------------------------------
app.post("/buy-offer", async (req, res) => {
  const { seed, currency, issuer, tokenAmount, xrpAmount } = req.body;

  try {
    const wallet = login(seed);
    const c = await getClient();

    const tx: any = {
      TransactionType: "OfferCreate",
      Account: wallet.classicAddress,
      TakerPays: xrpToDrops(xrpAmount),
      TakerGets: {
        currency,
        issuer,
        value: tokenAmount,
      },
    };

    const prepared = await c.autofill(tx as any);
    const result = await submitAndWait(prepared, wallet);
    res.json(result);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// ---------------------------------------------
// SELL OFFER (sell token for XRP)
// ---------------------------------------------
app.post("/sell-offer", async (req, res) => {
  const { seed, currency, issuer, tokenAmount, xrpAmount } = req.body;

  try {
    // Use the shared helper which constructs and submits a sell OfferCreate
    const sellerWallet = loginWithSeed(seed);
    const result = await createSellOffer(sellerWallet, currency, issuer, String(tokenAmount), String(xrpAmount));
    res.json(result);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// ---------------------------------------------
// START SERVER
// ---------------------------------------------
const PORT = process.env.PORT ? Number(process.env.PORT) : 4000;
app.listen(PORT, () => console.log(`XRPL API running on port ${PORT}`));
