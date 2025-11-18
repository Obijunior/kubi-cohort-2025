"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLatestMineralPrices = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
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
// Mock mineral data
const mockData = {
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
/**
 * Get latest mineral prices from mock data
 * Regenerates price history each time to simulate realistic data updates
 */
const getLatestMineralPrices = async () => {
    try {
        console.log('📦 Loading mock mineral data...');
        // Regenerate data each time to get fresh prices
        const freshData = {
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
        console.log('✅ Successfully loaded mock mineral data');
        return freshData;
    }
    catch (error) {
        console.error('❌ Error loading mock data:', error);
        // Return empty structure as fallback
        return createEmptyMineralData();
    }
};
exports.getLatestMineralPrices = getLatestMineralPrices;
// Create empty mineral data structure
const createEmptyMineralData = () => {
    const empty = {};
    const minerals = [
        { name: 'Oil', symbol: 'WTI' },
        { name: 'Gold', symbol: 'XAU' },
        { name: 'Silver', symbol: 'XAG' }
    ];
    for (const mineral of minerals) {
        empty[mineral.name.toLowerCase()] = {
            mineralName: mineral.name,
            symbol: mineral.symbol,
            lastUpdated: new Date().toISOString(),
            priceHistory: []
        };
    }
    return empty;
};
