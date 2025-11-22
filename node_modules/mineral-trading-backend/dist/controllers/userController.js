"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createOffer = exports.getUserBalances = void 0;
const xrplService_1 = require("../services/xrplService");
// ----------------------
// Get user balances
// ----------------------
const getUserBalances = async (req, res) => {
    const { address } = req.params;
    try {
        const balances = await (0, xrplService_1.getAccountInfo)(address);
        res.json({ success: true, balances });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: "Failed to fetch balances" });
    }
};
exports.getUserBalances = getUserBalances;
// ----------------------
// Create DEX offer
// ----------------------
const createOffer = async (req, res) => {
    try {
        const { walletSeed, tokenCurrency, tokenIssuer, amount, priceInXRP, isBuy } = req.body;
        // Validate required fields
        if (!walletSeed || !tokenCurrency || !tokenIssuer || !amount || !priceInXRP || isBuy === undefined) {
            return res.status(400).json({ success: false, error: "Missing required fields" });
        }
        const result = await (0, xrplService_1.createOffer)(walletSeed, tokenCurrency, tokenIssuer, amount, priceInXRP, isBuy);
        res.json({ success: true, result });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: err.message });
    }
};
exports.createOffer = createOffer;
