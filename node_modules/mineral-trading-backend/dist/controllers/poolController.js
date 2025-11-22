"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPools = exports.sellTokens = exports.buyTokens = exports.createPool = void 0;
const xrplService_1 = require("../services/xrplService");
const pools = [];
const createPool = (req, res) => {
    const { poolId, tokenSymbol, tokenIssuer, initialPrice } = req.body;
    const pool = { poolId, tokenSymbol, tokenIssuer, tokenPrice: initialPrice };
    pools.push(pool);
    res.json({ success: true, pool });
};
exports.createPool = createPool;
const buyTokens = async (req, res) => {
    const { walletSeed, poolId, tokenAmount, priceInXRP } = req.body;
    const pool = pools.find(p => p.poolId === poolId);
    if (!pool)
        return res.status(404).json({ error: "Pool not found" });
    const offer = await (0, xrplService_1.createOffer)(walletSeed, pool.tokenSymbol, pool.tokenIssuer, tokenAmount, priceInXRP, true);
    res.json({ success: true, offer });
};
exports.buyTokens = buyTokens;
const sellTokens = async (req, res) => {
    const { walletSeed, poolId, tokenAmount, priceInXRP } = req.body;
    const pool = pools.find(p => p.poolId === poolId);
    if (!pool)
        return res.status(404).json({ error: "Pool not found" });
    const offer = await (0, xrplService_1.createOffer)(walletSeed, pool.tokenSymbol, pool.tokenIssuer, tokenAmount, priceInXRP, false);
    res.json({ success: true, offer });
};
exports.sellTokens = sellTokens;
const getPools = (req, res) => {
    res.json({ success: true, pools });
};
exports.getPools = getPools;
