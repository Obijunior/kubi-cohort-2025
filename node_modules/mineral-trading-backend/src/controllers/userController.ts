import { Request, Response } from "express";
import { getAccountInfo, createOffer as xrplCreateOffer } from "../services/xrplService";

// ----------------------
// Get user balances
// ----------------------
export const getUserBalances = async (req: Request, res: Response) => {
  const { address } = req.params;
  try {
    const balances = await getAccountInfo(address);
    res.json({ success: true, balances });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Failed to fetch balances" });
  }
};

// ----------------------
// Create DEX offer
// ----------------------
export const createOffer = async (req: Request, res: Response) => {
  try {
    const { walletSeed, tokenCurrency, tokenIssuer, amount, priceInXRP, isBuy } = req.body;

    // Validate required fields
    if (!walletSeed || !tokenCurrency || !tokenIssuer || !amount || !priceInXRP || isBuy === undefined) {
      return res.status(400).json({ success: false, error: "Missing required fields" });
    }

    const result = await xrplCreateOffer(walletSeed, tokenCurrency, tokenIssuer, amount, priceInXRP, isBuy);
    res.json({ success: true, result });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
};
