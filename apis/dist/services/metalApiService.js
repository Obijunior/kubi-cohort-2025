"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLatestMineralPrices = void 0;
const axios_1 = __importDefault(require("axios"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const API_KEY = process.env.METALS_API_KEY || 'YOUR_API_KEY';
const BASE_URL = 'https://api.metalpriceapi.com/v1';
const symbolToNameMap = {
    'XAU': 'Gold',
    'XAG': 'Silver',
    'XPT': 'Platinum',
    'XPD': 'Palladium',
};
const getHistoricalMineralPrices = async (date) => {
    try {
        const response = await axios_1.default.get(`${BASE_URL}/${date}`, {
            params: {
                api_key: API_KEY,
                base: 'USD',
                currency: Object.keys(symbolToNameMap).join(',')
            }
        });
        return response.data;
    }
    catch (error) {
        console.error(`Error fetching historical mineral prices for ${date}:`, error);
        return null;
    }
};
const getLatestMineralPrices = async () => {
    try {
        const today = new Date();
        const dates = Array.from({ length: 7 }, (_, i) => {
            const d = new Date(today);
            d.setDate(d.getDate() - i);
            return d.toISOString().split('T')[0];
        });
        const historicalDataPromises = dates.map(date => getHistoricalMineralPrices(date));
        const historicalDataResponses = await Promise.all(historicalDataPromises);
        const latestResponse = await axios_1.default.get(`${BASE_URL}/latest`, {
            params: {
                api_key: API_KEY,
                base: 'USD',
                currency: Object.keys(symbolToNameMap).join(',')
            }
        });
        const mineralData = {};
        for (const symbol in symbolToNameMap) {
            const mineralName = symbolToNameMap[symbol];
            const priceHistory = [];
            for (const response of historicalDataResponses) {
                if (response && response.success && response.rates[symbol]) {
                    priceHistory.push({
                        date: response.date,
                        price: 1 / response.rates[symbol]
                    });
                }
            }
            if (latestResponse.data.success && latestResponse.data.rates[symbol]) {
                // Add latest price if it's not already in the history
                if (!priceHistory.some(p => p.date === latestResponse.data.date)) {
                    priceHistory.unshift({
                        date: latestResponse.data.date,
                        price: 1 / latestResponse.data.rates[symbol]
                    });
                }
            }
            // Sort by date ascending
            priceHistory.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
            mineralData[mineralName.toLowerCase()] = {
                mineralName: mineralName,
                symbol: symbol,
                lastUpdated: new Date(latestResponse.data.timestamp * 1000).toISOString(),
                priceHistory: priceHistory
            };
        }
        return mineralData;
    }
    catch (error) {
        console.error('Error fetching mineral prices:', error);
        throw error;
    }
};
exports.getLatestMineralPrices = getLatestMineralPrices;
