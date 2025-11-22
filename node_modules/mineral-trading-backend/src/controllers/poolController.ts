// src/controllers/poolController.ts
import { Request, Response } from "express";
import { createOffer } from "../services/xrplService";

const pools: any[] = [];

export const createPool = (req: Request, res: Response) => {
  const { poolId, tokenSymbol, tokenIssuer, initialPrice } = req.body;
  const pool = { poolId, tokenSymbol, tokenIssuer, tokenPrice: initialPrice };
  pools.push(pool);
  res.json({ success: true, pool });
};

export const buyTokens = async (req: Request, res: Response) => {
  const { walletSeed, poolId, tokenAmount, priceInXRP } = req.body;
  const pool = pools.find(p => p.poolId === poolId);
  if (!pool) return res.status(404).json({ error: "Pool not found" });

  const offer = await createOffer(walletSeed, pool.tokenSymbol, pool.tokenIssuer, tokenAmount, priceInXRP, true);
  res.json({ success: true, offer });
};

export const sellTokens = async (req: Request, res: Response) => {
  const { walletSeed, poolId, tokenAmount, priceInXRP } = req.body;
  const pool = pools.find(p => p.poolId === poolId);
  if (!pool) return res.status(404).json({ error: "Pool not found" });

  const offer = await createOffer(walletSeed, pool.tokenSymbol, pool.tokenIssuer, tokenAmount, priceInXRP, false);
  res.json({ success: true, offer });
};

export const getPools = (req: Request, res: Response) => {
  res.json({ success: true, pools });
};
