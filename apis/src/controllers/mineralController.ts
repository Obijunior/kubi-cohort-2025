import { Request, Response } from 'express';
import { getLatestMineralPrices } from '../services/metalApiService';

export const getMineralData = async (req: Request, res: Response) => {
  try {
    const mineralName = req.params.mineralName;
    const minerals = await getLatestMineralPrices();
    const mineral = minerals[mineralName];
    if (mineral) {
      res.json(mineral);
    } else {
      res.status(404).json({ error: 'Mineral not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error', message: (error as Error).message });
  }
};

export const getAllMinerals = async (req: Request, res: Response) => {
  try {
    const minerals = await getLatestMineralPrices();
    res.json(minerals);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error', message: (error as Error).message });
  }
};
