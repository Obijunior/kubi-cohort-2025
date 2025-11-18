// Mock data for minerals - Real historical data extracted from source CSVs (Oct 20, 2025 - Nov 18, 2025)
export interface MineralData {
  mineralName: string;
  symbol: string;
  lastUpdated: string;
  priceHistory: Array<{ date: string; price: number }>;
}

// Real historical data for Oil (Oct 20, 2025 - Nov 18, 2025)
const oilHistory = [
  { date: '2025-10-20', price: 57.52 },
  { date: '2025-10-21', price: 57.82 },
  { date: '2025-10-22', price: 58.50 },
  { date: '2025-10-23', price: 61.79 },
  { date: '2025-10-24', price: 61.50 },
  { date: '2025-10-27', price: 61.31 },
  { date: '2025-10-28', price: 60.15 },
  { date: '2025-10-29', price: 60.48 },
  { date: '2025-10-30', price: 60.57 },
  { date: '2025-10-31', price: 60.98 },
  { date: '2025-11-03', price: 61.05 },
  { date: '2025-11-04', price: 60.56 },
  { date: '2025-11-05', price: 59.60 },
  { date: '2025-11-06', price: 59.43 },
  { date: '2025-11-07', price: 59.75 },
  { date: '2025-11-10', price: 60.03 },
  { date: '2025-11-11', price: 60.99 },
  { date: '2025-11-12', price: 58.49 },
  { date: '2025-11-13', price: 58.64 },
  { date: '2025-11-14', price: 59.95 },
  { date: '2025-11-16', price: 59.55 },
  { date: '2025-11-17', price: 59.86 },
  { date: '2025-11-18', price: 59.37 }
];

// Real historical data for Gold (Oct 20, 2025 - Nov 18, 2025)
const goldHistory = [
  { date: '2025-10-20', price: 4359.40 },
  { date: '2025-10-21', price: 4109.10 },
  { date: '2025-10-22', price: 4065.40 },
  { date: '2025-10-23', price: 4145.60 },
  { date: '2025-10-24', price: 4137.80 },
  { date: '2025-10-27', price: 4005.50 },
  { date: '2025-10-28', price: 3968.70 },
  { date: '2025-10-29', price: 3986.20 },
  { date: '2025-10-30', price: 4015.90 },
  { date: '2025-10-31', price: 3996.50 },
  { date: '2025-11-03', price: 4014.00 },
  { date: '2025-11-04', price: 3960.50 },
  { date: '2025-11-05', price: 3992.90 },
  { date: '2025-11-06', price: 3991.00 },
  { date: '2025-11-07', price: 4009.80 },
  { date: '2025-11-10', price: 4122.00 },
  { date: '2025-11-11', price: 4116.30 },
  { date: '2025-11-12', price: 4213.60 },
  { date: '2025-11-13', price: 4194.50 },
  { date: '2025-11-14', price: 4094.20 },
  { date: '2025-11-16', price: 4097.49 },
  { date: '2025-11-17', price: 4074.50 },
  { date: '2025-11-18', price: 4007.81 }
];

// Real historical data for Silver (Oct 20, 2025 - Nov 18, 2025)
const silverHistory = [
  { date: '2025-10-20', price: 51.384 },
  { date: '2025-10-21', price: 47.704 },
  { date: '2025-10-22', price: 47.681 },
  { date: '2025-10-23', price: 48.704 },
  { date: '2025-10-24', price: 48.586 },
  { date: '2025-10-27', price: 46.594 },
  { date: '2025-10-28', price: 47.149 },
  { date: '2025-10-29', price: 47.734 },
  { date: '2025-10-30', price: 48.616 },
  { date: '2025-10-31', price: 48.160 },
  { date: '2025-11-03', price: 48.049 },
  { date: '2025-11-04', price: 47.291 },
  { date: '2025-11-05', price: 48.022 },
  { date: '2025-11-06', price: 47.950 },
  { date: '2025-11-07', price: 48.143 },
  { date: '2025-11-10', price: 50.311 },
  { date: '2025-11-11', price: 50.744 },
  { date: '2025-11-12', price: 53.457 },
  { date: '2025-11-13', price: 53.170 },
  { date: '2025-11-14', price: 50.686 },
  { date: '2025-11-16', price: 50.720 },
  { date: '2025-11-17', price: 50.711 },
  { date: '2025-11-18', price: 49.245 }
];

export const mockMinerals: { [key: string]: MineralData } = {
  oil: {
    mineralName: 'Oil',
    symbol: 'WTI',
    lastUpdated: new Date().toISOString(),
    priceHistory: oilHistory
  },
  gold: {
    mineralName: 'Gold',
    symbol: 'XAU',
    lastUpdated: new Date().toISOString(),
    priceHistory: goldHistory
  },
  silver: {
    mineralName: 'Silver',
    symbol: 'XAG',
    lastUpdated: new Date().toISOString(),
    priceHistory: silverHistory
  }
};

// Helper utilities for working with mineral data
export const getCurrentPrice = (priceHistory: Array<{ date: string; price: number }>): number => {
  return priceHistory.length > 0 ? priceHistory[priceHistory.length - 1].price : 0;
};

export const getPreviousPrice = (priceHistory: Array<{ date: string; price: number }>): number => {
  return priceHistory.length > 1 ? priceHistory[priceHistory.length - 2].price : getCurrentPrice(priceHistory);
};

export const calculatePriceChange = (priceHistory: Array<{ date: string; price: number }>): number => {
  const currentPrice = getCurrentPrice(priceHistory);
  const previousPrice = getPreviousPrice(priceHistory);
  return parseFloat((((currentPrice - previousPrice) / previousPrice) * 100).toFixed(2));
};

export const getLowestPrice = (priceHistory: Array<{ date: string; price: number }>): number => {
  return Math.min(...priceHistory.map(p => p.price));
};

export const getHighestPrice = (priceHistory: Array<{ date: string; price: number }>): number => {
  return Math.max(...priceHistory.map(p => p.price));
};
