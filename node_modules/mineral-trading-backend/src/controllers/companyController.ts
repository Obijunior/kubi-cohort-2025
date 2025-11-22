// src/controllers/companyController.ts
import { Request, Response } from "express";
import { issueToken } from "../services/xrplService";

export const onboardCompany = (req: Request, res: Response) => {
  const { name, walletSeed } = req.body;

  if (!name || !walletSeed) {
    return res.status(400).json({ success: false, error: "Missing name or walletSeed" });
  }

  res.json({ success: true, name, walletSeed });
};

export const mintToken = async (req: Request, res: Response) => {
  const { walletSeed, destinationAddress, currency, totalSupply } = req.body;

  if (!walletSeed || !destinationAddress || !currency || !totalSupply) {
    return res.status(400).json({ success: false, error: "Missing walletSeed, destinationAddress, currency, or totalSupply" });
  }

  try {
    const token = await issueToken(
      walletSeed,
      destinationAddress,
      currency,
      totalSupply.toString()  // ensure it's a string
    );

    res.json({ success: true, token });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
};
