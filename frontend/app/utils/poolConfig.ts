export const POOL_CONFIGS = [
  {
    key: 'oil' as const,
    symbol: 'WTI',
    name: 'Oil',
    type: 'Energy',
    liquidity: '$2.5M',
    tradingFee: '0.3%',
    tokensInPool: 1000000
  },
  {
    key: 'gold' as const,
    symbol: 'XAU',
    name: 'Gold',
    type: 'Precious Metal',
    liquidity: '$1.8M',
    tradingFee: '0.25%',
    tokensInPool: 500000
  },
  {
    key: 'silver' as const,
    symbol: 'XAG',
    name: 'Silver',
    type: 'Precious Metal',
    liquidity: '$1.2M',
    tradingFee: '0.35%',
    tokensInPool: 2000000
  }
];

export const getTokensForMineral = (mineralName: string): number => {
  const config = POOL_CONFIGS.find(p => p.name.toLowerCase() === mineralName.toLowerCase());
  return config?.tokensInPool || 0;
};

export const getTokensForSymbol = (symbol: string): number => {
  const config = POOL_CONFIGS.find(p => p.symbol === symbol);
  return config?.tokensInPool || 0;
};
