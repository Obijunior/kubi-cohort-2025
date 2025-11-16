// Generate realistic mineral price history for the last 30 days
const generatePriceHistory = (startPrice, volatility = 0.02) => {
  const priceHistory = [];
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

module.exports = {
  minerals: {
    oil: {
      mineralName: 'Oil',
      symbol: 'WTI',
      lastUpdated: new Date().toISOString(),
      priceHistory: generatePriceHistory(76.45, 0.03)
    },
    gold: {
      mineralName: 'Gold',
      symbol: 'XAU',
      lastUpdated: new Date().toISOString(),
      priceHistory: generatePriceHistory(2089.30, 0.015)
    },
    silver: {
      mineralName: 'Silver',
      symbol: 'XAG',
      lastUpdated: new Date().toISOString(),
      priceHistory: generatePriceHistory(31.20, 0.02)
    }
  }
};
