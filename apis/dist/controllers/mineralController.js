"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllMinerals = exports.getMineralData = void 0;
const metalApiService_1 = require("../services/metalApiService");
const getMineralData = async (req, res) => {
    try {
        const mineralName = req.params.mineralName;
        const minerals = await (0, metalApiService_1.getLatestMineralPrices)();
        const mineral = minerals[mineralName];
        if (mineral) {
            res.json(mineral);
        }
        else {
            res.status(404).json({ error: 'Mineral not found' });
        }
    }
    catch (error) {
        res.status(500).json({ error: 'Internal server error', message: error.message });
    }
};
exports.getMineralData = getMineralData;
const getAllMinerals = async (req, res) => {
    try {
        const minerals = await (0, metalApiService_1.getLatestMineralPrices)();
        res.json(minerals);
    }
    catch (error) {
        res.status(500).json({ error: 'Internal server error', message: error.message });
    }
};
exports.getAllMinerals = getAllMinerals;
