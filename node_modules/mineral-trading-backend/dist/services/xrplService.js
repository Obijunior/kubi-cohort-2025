"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAccountInfo = exports.createOffer = exports.issueToken = exports.createTrustline = exports.disconnectXRPL = exports.connectXRPL = void 0;
const xrpl_1 = require("xrpl");
const client = new xrpl_1.Client("wss://s.altnet.rippletest.net:51233");
const connectXRPL = async () => {
    if (!client.isConnected())
        await client.connect();
};
exports.connectXRPL = connectXRPL;
const disconnectXRPL = async () => {
    if (client.isConnected())
        await client.disconnect();
};
exports.disconnectXRPL = disconnectXRPL;
// ----------------------
// CREATE TRUSTLINE
// ----------------------
const createTrustline = async (walletSeed, currency, issuer, limit = "1000000000") => {
    await (0, exports.connectXRPL)();
    const wallet = xrpl_1.Wallet.fromSeed(walletSeed);
    const trustSetTx = {
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
exports.createTrustline = createTrustline;
// ----------------------
// ISSUE TOKEN (Payment)
// ----------------------
const issueToken = async (issuerSeed, destinationAddress, currency, amount) => {
    await (0, exports.connectXRPL)();
    const issuerWallet = xrpl_1.Wallet.fromSeed(issuerSeed);
    const paymentTx = {
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
exports.issueToken = issueToken;
// ----------------------
// CREATE DEX OFFER
// ----------------------
const createOffer = async (walletSeed, tokenCurrency, tokenIssuer, amount, priceInXRP, isBuy) => {
    await (0, exports.connectXRPL)();
    const wallet = xrpl_1.Wallet.fromSeed(walletSeed);
    const offerTx = {
        TransactionType: "OfferCreate",
        Account: wallet.classicAddress,
        TakerGets: isBuy
            ? { currency: tokenCurrency, issuer: tokenIssuer, value: amount }
            : (0, xrpl_1.xrpToDrops)(priceInXRP),
        TakerPays: isBuy
            ? (0, xrpl_1.xrpToDrops)(priceInXRP)
            : { currency: tokenCurrency, issuer: tokenIssuer, value: amount }
    };
    const prepared = await client.autofill(offerTx);
    const signed = wallet.sign(prepared);
    const response = await client.submit(signed.tx_blob);
    return response.result;
};
exports.createOffer = createOffer;
// ----------------------
// GET BALANCES
// ----------------------
const getAccountInfo = async (address) => {
    await (0, exports.connectXRPL)();
    return await client.getBalances(address);
};
exports.getAccountInfo = getAccountInfo;
