import { Request, Response } from 'express';
import { getMockMineralData } from '../services/mockDataService';

export const getMineralData = async (req: Request, res: Response) => {
  try {
    const mineralName = req.params.mineralName;
    const minerals = getMockMineralData();
    const mineral = minerals[mineralName];
    if (mineral) {
      res.json(mineral);
    } else {
      res.status(404).json({ error: 'Mineral not found' });
    }
  } catch (error) {
    console.error('❌ Error in getMineralData:', error);
    res.status(500).json({ error: 'Internal server error', message: (error as Error).message });
  }
};

export const getAllMinerals = async (req: Request, res: Response) => {
  try {
    console.log('📍 Loading mock mineral data...');
    const minerals = getMockMineralData();
    console.log('✅ Successfully loaded minerals:', Object.keys(minerals));
    res.json(minerals);
  } catch (error) {
    console.error('❌ Error in getAllMinerals:', error);
    res.status(500).json({ error: 'Internal server error', message: (error as Error).message });
  }
};

