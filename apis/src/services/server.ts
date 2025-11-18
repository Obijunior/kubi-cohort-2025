// server.ts
import express from "express";
import bodyParser from "body-parser";
import xrpl, { Wallet, xrpToDrops } from "xrpl";

const app = express();
app.use(bodyParser.json());

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

    const tx = {
      TransactionType: "TrustSet",
      Account: wallet.classicAddress,
      LimitAmount: {
        currency,
        issuer,
        value: limit ?? "1000000000",
      },
    };

    const prepared = await c.autofill(tx);
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

    const tx = {
      TransactionType: "Payment",
      Account: wallet.classicAddress,
      Destination: recipient,
      Amount: {
        currency,
        issuer: wallet.classicAddress,
        value: amount,
      },
    };

    const prepared = await c.autofill(tx);
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

    const tx = {
      TransactionType: "OfferCreate",
      Account: wallet.classicAddress,
      TakerPays: xrpToDrops(xrpAmount),
      TakerGets: {
        currency,
        issuer,
        value: tokenAmount,
      },
    };

    const prepared = await c.autofill(tx);
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
    const wallet = login(seed);
    const c = await getClient();

    const tx = {
      TransactionType: "OfferCreate",
      Account: wallet.classicAddress,
      TakerPays: {
        currency,
        issuer,
        value: tokenAmount,
      },
      TakerGets: xrpToDrops(xrpAmount),
    };

    const prepared = await c.autofill(tx);
    const result = await submitAndWait(prepared, wallet);
    res.json(result);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// ---------------------------------------------
// START SERVER
// ---------------------------------------------
app.listen(4000, () => console.log("XRPL API running on port 4000"));
