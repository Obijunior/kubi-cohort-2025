const mockData = require('../data/mockData');

exports.getMineralData = (req, res) => {
  try {
    const { mineralName } = req.params;
    const mineral = mockData.minerals[mineralName.toLowerCase()];

    if (!mineral) {
      return res.status(404).json({
        error: `Mineral '${mineralName}' not found`,
        available: Object.keys(mockData.minerals)
      });
    }

    res.json(mineral);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error', message: error.message });
  }
};

exports.getAllMinerals = (req, res) => {
  try {
    const minerals = Object.entries(mockData.minerals).map(([key, value]) => ({
      id: key,
      name: value.mineralName,
      symbol: value.symbol,
      currentPrice: value.priceHistory[value.priceHistory.length - 1].price,
      lastUpdated: value.lastUpdated
    }));

    res.json(minerals);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error', message: error.message });
  }
};
