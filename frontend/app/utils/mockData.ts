// Mock data for minerals - used instead of API calls
export interface MineralData {
  mineralName: string;
  symbol: string;
  lastUpdated: string;
  priceHistory: Array<{ date: string; price: number }>;
}

// Generate realistic mineral price history for the last 30 days
const generatePriceHistory = (startPrice: number, volatility: number = 0.02): Array<{ date: string; price: number }> => {
  const priceHistory: Array<{ date: string; price: number }> = [];
  const today = new Date();
  let currentPrice = startPrice;

  for (let i = 29; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    
    // Add random daily volatility
    const change = (Math.random() - 0.5) * 2 * volatility;
    currentPrice = currentPrice * (1 + change);
    
    priceHistory.push({
      date: date.toISOString().split('T')[0], // YYYY-MM-DD format
      price: parseFloat(currentPrice.toFixed(2))
    });
  }

  return priceHistory;
};

export const mockMinerals: { [key: string]: MineralData } = {
  oil: {
    mineralName: 'Oil',
    symbol: 'WTI',
    lastUpdated: new Date().toISOString(),
    priceHistory: generatePriceHistory(60, 0.03)
  },
  gold: {
    mineralName: 'Gold',
    symbol: 'XAU',
    lastUpdated: new Date().toISOString(),
    priceHistory: generatePriceHistory(4010, 0.015)
  },
  silver: {
    mineralName: 'Silver',
    symbol: 'XAG',
    lastUpdated: new Date().toISOString(),
    priceHistory: generatePriceHistory(50, 0.02)
  }
};
