"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mintToken = exports.onboardCompany = void 0;
const xrplService_1 = require("../services/xrplService");
const onboardCompany = (req, res) => {
    const { name, walletSeed } = req.body;
    if (!name || !walletSeed) {
        return res.status(400).json({ success: false, error: "Missing name or walletSeed" });
    }
    res.json({ success: true, name, walletSeed });
};
exports.onboardCompany = onboardCompany;
const mintToken = async (req, res) => {
    const { walletSeed, destinationAddress, currency, totalSupply } = req.body;
    if (!walletSeed || !destinationAddress || !currency || !totalSupply) {
        return res.status(400).json({ success: false, error: "Missing walletSeed, destinationAddress, currency, or totalSupply" });
    }
    try {
        const token = await (0, xrplService_1.issueToken)(walletSeed, destinationAddress, currency, totalSupply.toString() // ensure it's a string
        );
        res.json({ success: true, token });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: err.message });
    }
};
exports.mintToken = mintToken;
