import { mockMinerals, getCurrentPrice } from './mockData';

const BASE_POOL_CONFIGS = [
  {
    key: 'oil' as const,
    symbol: 'WTI',
    name: 'Oil',
    type: 'Energy',
    tradingFee: '0.3%',
    tokensInPool: 100000
  },
  {
    key: 'gold' as const,
    symbol: 'XAU',
    name: 'Gold',
    type: 'Precious Metal',
    tradingFee: '0.2%',
    tokensInPool: 10000
  },
  {
    key: 'silver' as const,
    symbol: 'XAG',
    name: 'Silver',
    type: 'Precious Metal',
    tradingFee: '0.1%',
    tokensInPool: 20000
  }
];

export const POOL_CONFIGS = BASE_POOL_CONFIGS.map(config => {
  const mineralData = mockMinerals[config.key];
  const currentPrice = mineralData ? getCurrentPrice(mineralData.priceHistory) : 0;
  const liquidityValue = (currentPrice * config.tokensInPool) / 1000000;
  const liquidity = `$${liquidityValue.toFixed(2)} M`;

  return {
    ...config,
    liquidity,
  };
});


export const getTokensForMineral = (mineralName: string): number => {
  const config = POOL_CONFIGS.find(p => p.name.toLowerCase() === mineralName.toLowerCase());
  return config?.tokensInPool || 0;
};

export const getTokensForSymbol = (symbol: string): number => {
  const config = POOL_CONFIGS.find(p => p.symbol === symbol);
  return config?.tokensInPool || 0;
};
