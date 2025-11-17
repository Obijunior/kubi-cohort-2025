import {
  Client,
  Wallet,
  Payment,
  TrustSet,
  OfferCreate,
  xrpToDrops
} from "xrpl";

const client = new Client("wss://s.altnet.rippletest.net:51233");

export const connectXRPL = async () => {
  if (!client.isConnected()) await client.connect();
};

export const disconnectXRPL = async () => {
  if (client.isConnected()) await client.disconnect();
};

// ----------------------
// CREATE TRUSTLINE
// ----------------------
export const createTrustline = async (
  walletSeed: string,
  currency: string,
  issuer: string,
  limit: string = "1000000000"
) => {
  await connectXRPL();
  const wallet = Wallet.fromSeed(walletSeed);

  const trustSetTx: TrustSet = {
    TransactionType: "TrustSet",
    Account: wallet.classicAddress,
    LimitAmount: {
      currency,
      issuer,
      value: limit
    }
  };

  const prepared = await client.autofill(trustSetTx);
  const signed = wallet.sign(prepared);
  const response = await client.submit(signed.tx_blob);
  return response.result;
};

// ----------------------
// ISSUE TOKEN (Payment)
// ----------------------
export const issueToken = async (
  issuerSeed: string,
  destinationAddress: string,
  currency: string,
  amount: string
) => {
  await connectXRPL();
  const issuerWallet = Wallet.fromSeed(issuerSeed);

  const paymentTx: Payment = {
    TransactionType: "Payment",
    Account: issuerWallet.classicAddress,
    Destination: destinationAddress,
    Amount: {
      currency,
      issuer: issuerWallet.classicAddress,
      value: amount
    }
  };

  const prepared = await client.autofill(paymentTx);
  const signed = issuerWallet.sign(prepared);
  const response = await client.submit(signed.tx_blob);
  return response.result;
};

// ----------------------
// CREATE DEX OFFER
// ----------------------
export const createOffer = async (
  walletSeed: string,
  tokenCurrency: string,
  tokenIssuer: string,
  amount: string,
  priceInXRP: string,
  isBuy: boolean
) => {
  await connectXRPL();
  const wallet = Wallet.fromSeed(walletSeed);

  const offerTx: OfferCreate = {
    TransactionType: "OfferCreate",
    Account: wallet.classicAddress,
    TakerGets: isBuy
      ? { currency: tokenCurrency, issuer: tokenIssuer, value: amount }
      : xrpToDrops(priceInXRP),
    TakerPays: isBuy
      ? xrpToDrops(priceInXRP)
      : { currency: tokenCurrency, issuer: tokenIssuer, value: amount }
  };

  const prepared = await client.autofill(offerTx);
  const signed = wallet.sign(prepared);
  const response = await client.submit(signed.tx_blob);
  return response.result;
};

// ----------------------
// GET BALANCES
// ----------------------
export const getAccountInfo = async (address: string) => {
  await connectXRPL();
  return await client.getBalances(address);
};