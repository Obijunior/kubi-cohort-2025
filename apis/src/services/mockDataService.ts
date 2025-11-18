// @ts-ignore - Allow import from JS module
import mockDataModule from '../../data/mockData.js';

export interface MineralData {
    mineralName: string;
    symbol: string;
    lastUpdated: string;
    priceHistory: Array<{ date: string; price: number }>;
}

/**
 * Get mock mineral data from mockData.js
 * Returns the hardcoded mock data structure
 */
export const getMockMineralData = (): { [key: string]: MineralData } => {
    try {
        console.log('📦 Loading hardcoded mock mineral data...');
        
        const data: { [key: string]: MineralData } = mockDataModule.minerals;

        console.log('✅ Successfully loaded mock mineral data');
        return data;

    } catch (error) {
        console.error('❌ Error loading mock data:', error);
        // Return empty structure as fallback
        return createEmptyMineralData();
    }
};

// Create empty mineral data structure
const createEmptyMineralData = (): { [key: string]: MineralData } => {
    const empty: { [key: string]: MineralData } = {};
    const minerals = ['oil', 'gold', 'silver'];
    minerals.forEach(mineral => {
        empty[mineral] = {
            mineralName: mineral.charAt(0).toUpperCase() + mineral.slice(1),
            symbol: mineral.toUpperCase(),
            lastUpdated: new Date().toISOString(),
            priceHistory: []
        };
    });
    return empty;
};
