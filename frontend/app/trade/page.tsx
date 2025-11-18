"use client";

import React, { useState } from 'react';
import { ArrowUpRight, ArrowDownRight, Search, Building2, TrendingUp } from 'lucide-react';
import Navigation from '@/app/components/Navigation';
import TokenizeAsset from '@/app/components/TokenizeAsset';
import { useWallet } from '@/app/context/WalletContext';
import { mockMinerals } from '@/app/utils/mockData';

type MineralPool = {
  id: string;
  symbol: string;
  name: string;
  type: string;
  price: number;
  change24h: number;
  volume24h: string;
  liquidity: string;
  tradingFee: string;
  tokensInPool: number;
};

type UserPosition = {
  id: string;
  symbol: string;
  amount: number;
  entryPrice: number;
  currentPrice: number;
  pnl: number;
  pnlPercent: number;
};

// Initialize mineral pools from mockData
const initializeMineralPools = (): MineralPool[] => {
  const pools: MineralPool[] = [];
  
  // Oil pool
  if (mockMinerals.oil && mockMinerals.oil.priceHistory.length > 0) {
    const oilPrice = mockMinerals.oil.priceHistory[mockMinerals.oil.priceHistory.length - 1].price;
    const oilPrevPrice = mockMinerals.oil.priceHistory[mockMinerals.oil.priceHistory.length - 2]?.price || oilPrice;
    pools.push({
      id: 'oil',
      symbol: 'WTI',
      name: 'Oil',
      type: 'Energy',
      price: oilPrice,
      change24h: parseFloat((((oilPrice - oilPrevPrice) / oilPrevPrice) * 100).toFixed(2)),
      volume24h: '$125.5M',
      liquidity: '$2.5M',
      tradingFee: '0.3%',
      tokensInPool: 500000
    });
  }

  // Gold pool
  if (mockMinerals.gold && mockMinerals.gold.priceHistory.length > 0) {
    const goldPrice = mockMinerals.gold.priceHistory[mockMinerals.gold.priceHistory.length - 1].price;
    const goldPrevPrice = mockMinerals.gold.priceHistory[mockMinerals.gold.priceHistory.length - 2]?.price || goldPrice;
    pools.push({
      id: 'gold',
      symbol: 'XAU',
      name: 'Gold',
      type: 'Precious Metal',
      price: goldPrice,
      change24h: parseFloat((((goldPrice - goldPrevPrice) / goldPrevPrice) * 100).toFixed(2)),
      volume24h: '$83.3M',
      liquidity: '$1.8M',
      tradingFee: '0.25%',
      tokensInPool: 400000
    });
  }

  // Silver pool
  if (mockMinerals.silver && mockMinerals.silver.priceHistory.length > 0) {
    const silverPrice = mockMinerals.silver.priceHistory[mockMinerals.silver.priceHistory.length - 1].price;
    const silverPrevPrice = mockMinerals.silver.priceHistory[mockMinerals.silver.priceHistory.length - 2]?.price || silverPrice;
    pools.push({
      id: 'silver',
      symbol: 'XAG',
      name: 'Silver',
      type: 'Precious Metal',
      price: silverPrice,
      change24h: parseFloat((((silverPrice - silverPrevPrice) / silverPrevPrice) * 100).toFixed(2)),
      volume24h: '$52.2M',
      liquidity: '$1.2M',
      tradingFee: '0.35%',
      tokensInPool: 350000
    });
  }

  return pools;
};

export default function TradePage() {
  const { isConnected: walletConnected } = useWallet();
  const [activeView, setActiveView] = useState<'company' | 'trader'>('trader');
  const [selectedPool, setSelectedPool] = useState<MineralPool | null>(null);
  const [tradeAmount, setTradeAmount] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [mineralPools] = useState<MineralPool[]>(initializeMineralPools());

  const userPositions: UserPosition[] = [
    {
      id: '1',
      symbol: 'WTI',
      amount: 500,
      entryPrice: 74.70,
      currentPrice: 76.45,
      pnl: 875.00,
      pnlPercent: 2.34
    },
    {
      id: '2',
      symbol: 'XAU',
      amount: 10,
      entryPrice: 2053.50,
      currentPrice: 2089.30,
      pnl: 357.80,
      pnlPercent: 1.74
    }
  ];

  const portfolioValue = 1225.50;
  const totalPnL = 1232.80;
  const totalPnLPercent = 2.01;

  const filteredPools = mineralPools.filter(pool =>
    pool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    pool.symbol.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-primary">
      <Navigation />

      <main className="max-w-7xl mx-auto px-4 py-12">
        {/* Header with View Toggle */}
        <section className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-4xl font-bold text-primary mb-2">
                {activeView === 'company' ? 'Company Dashboard' : 'Trading Dashboard'}
              </h1>
              <p className="text-lg text-secondary">
                {activeView === 'company' 
                  ? 'Tokenize and manage your real-world assets' 
                  : 'Trade tokenized mineral commodities'}
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setActiveView('company')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all duration-200 ${
                  activeView === 'company'
                    ? 'bg-accent text-white'
                    : 'bg-white text-primary border border-stone-200 hover:border-stone-300'
                }`}
              >
                <Building2 className="w-4 h-4" />
                Company
              </button>
              <button
                onClick={() => setActiveView('trader')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all duration-200 ${
                  activeView === 'trader'
                    ? 'bg-accent text-white'
                    : 'bg-white text-primary border border-stone-200 hover:border-stone-300'
                }`}
              >
                <TrendingUp className="w-4 h-4" />
                Trader
              </button>

            </div>
          </div>
        </section>

        {/* Company Dashboard View */}
        {activeView === 'company' ? (
          <div className="space-y-8">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-primary">Your Tokenized Assets</h2>
                <p className="text-secondary mt-1">Create and manage RWA tokens</p>
              </div>
              <div className="hover:bg-opacity-90 transition-rounded-lg">
            <TokenizeAsset />
            </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white rounded-lg p-6 border border-stone-200 shadow-sm">
                <p className="text-sm text-secondary mb-2">Total Assets</p>
                <p className="text-3xl font-bold text-primary">3</p>
              </div>
              <div className="bg-white rounded-lg p-6 border border-stone-200 shadow-sm">
                <p className="text-sm text-secondary mb-2">Total Pool Liquidity</p>
                <p className="text-3xl font-bold text-primary">$5.5M</p>
              </div>
              <div className="bg-white rounded-lg p-6 border border-stone-200 shadow-sm">
                <p className="text-sm text-secondary mb-2">Total Fees Earned</p>
                <p className="text-3xl font-bold text-green-600">$12,450</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-stone-100">
                <h3 className="text-xl font-bold text-primary">Your Assets & Trading Pools</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-stone-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-secondary">Asset</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-secondary">Total Supply</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-secondary">Pool Liquidity</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-secondary">24h Volume</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-secondary">Fees Earned</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-secondary">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-secondary">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-200">
                    <tr className="hover:bg-stone-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="font-semibold text-primary">WTI</div>
                        <div className="text-sm text-secondary">Oil</div>
                      </td>
                      <td className="px-6 py-4 text-primary">1,000,000</td>
                      <td className="px-6 py-4 text-primary">$2.5M</td>
                      <td className="px-6 py-4 text-primary">$125.5M</td>
                      <td className="px-6 py-4 font-semibold text-green-600">$6,200</td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 text-xs rounded-full bg-green-100 text-green-700 font-medium">Pool Active</span>
                      </td>
                      <td className="px-6 py-4">
                        <button className="text-accent hover:text-opacity-80 transition-colors text-sm font-medium">
                          Manage
                        </button>
                      </td>
                    </tr>
                    <tr className="hover:bg-stone-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="font-semibold text-primary">XAU</div>
                        <div className="text-sm text-secondary">Gold</div>
                      </td>
                      <td className="px-6 py-4 text-primary">500,000</td>
                      <td className="px-6 py-4 text-primary">$1.8M</td>
                      <td className="px-6 py-4 text-primary">$83.3M</td>
                      <td className="px-6 py-4 font-semibold text-green-600">$3,950</td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 text-xs rounded-full bg-green-100 text-green-700 font-medium">Pool Active</span>
                      </td>
                      <td className="px-6 py-4">
                        <button className="text-accent hover:text-opacity-80 transition-colors text-sm font-medium">
                          Manage
                        </button>
                      </td>
                    </tr>
                    <tr className="hover:bg-stone-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="font-semibold text-primary">XAG</div>
                        <div className="text-sm text-secondary">Silver</div>
                      </td>
                      <td className="px-6 py-4 text-primary">2,000,000</td>
                      <td className="px-6 py-4 text-primary">$1.2M</td>
                      <td className="px-6 py-4 text-primary">$52.2M</td>
                      <td className="px-6 py-4 font-semibold text-green-600">$2,300</td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 text-xs rounded-full bg-green-100 text-green-700 font-medium">Pool Active</span>
                      </td>
                      <td className="px-6 py-4">
                        <button className="text-accent hover:text-opacity-80 transition-colors text-sm font-medium">
                          Manage
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
              <div className="flex gap-4">
                <div className="text-xl font-bold text-blue-900">ⓘ</div>
                <div>
                  <h4 className="font-semibold text-blue-900 mb-1">How Asset Leasing Works</h4>
                  <p className="text-sm text-blue-800">
                    Tokenize your physical assets and create liquidity pools. Traders will trade against your pools, 
                    and you earn fees from every transaction while retaining full ownership of the underlying assets.
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Trader Dashboard */}

            {/* Portfolio Stats */}
            <section className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-white rounded-lg p-6 border border-stone-200 shadow-sm">
                <p className="text-sm text-secondary mb-2">Portfolio Value</p>
                <p className="text-3xl font-bold text-primary">${portfolioValue.toFixed(2)}</p>
              </div>
              <div className="bg-white rounded-lg p-6 border border-stone-200 shadow-sm">
                <p className="text-sm text-secondary mb-2">Total P&L</p>
                <p className="text-3xl font-bold text-green-600">
                  ${totalPnL.toFixed(2)}
                </p>
              </div>
              <div className="bg-white rounded-lg p-6 border border-stone-200 shadow-sm">
                <p className="text-sm text-secondary mb-2">Active Positions</p>
                <p className="text-3xl font-bold text-primary">{userPositions.length}</p>
              </div>
              <div className="bg-white rounded-lg p-6 border border-stone-200 shadow-sm">
                <p className="text-sm text-secondary mb-2">24h Change</p>
                <p className="text-3xl font-bold text-green-600">+{totalPnLPercent.toFixed(2)}%</p>
              </div>
            </section>

            {/* Your Positions */}
            {userPositions.length > 0 && (
              <section className="mb-8">
                <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
                  <div className="p-6 border-b border-stone-100">
                    <h2 className="text-2xl font-bold text-primary">Your Positions</h2>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-stone-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-semibold text-secondary">Asset</th>
                          <th className="px-6 py-3 text-left text-xs font-semibold text-secondary">Amount</th>
                          <th className="px-6 py-3 text-left text-xs font-semibold text-secondary">Entry Price</th>
                          <th className="px-6 py-3 text-left text-xs font-semibold text-secondary">Current Price</th>
                          <th className="px-6 py-3 text-left text-xs font-semibold text-secondary">P&L</th>
                          <th className="px-6 py-3 text-left text-xs font-semibold text-secondary">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-stone-200">
                        {userPositions.map(position => (
                          <tr key={position.id} className="hover:bg-stone-50 transition-colors">
                            <td className="px-6 py-4 font-semibold text-primary">{position.symbol}</td>
                            <td className="px-6 py-4 text-primary">{position.amount.toLocaleString()}</td>
                            <td className="px-6 py-4 text-primary">${position.entryPrice.toFixed(2)}</td>
                            <td className="px-6 py-4 text-primary">${position.currentPrice.toFixed(2)}</td>
                            <td className="px-6 py-4">
                              <div className="text-green-600">
                                <div className="font-semibold">${position.pnl.toFixed(2)}</div>
                                <div className="text-xs">+{position.pnlPercent.toFixed(2)}%</div>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <button className="px-4 py-2 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium">
                                Close
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </section>
            )}

            {/* Available Trading Pools */}
            <section>
              <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-stone-100 flex justify-between items-center">
                  <div>
                    <h2 className="text-2xl font-bold text-primary mb-1">Available Markets</h2>
                    <p className="text-sm text-secondary">Trade tokenized mineral commodities</p>
                  </div>
                  <div className="relative w-64">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search by name or symbol..."
                      className="w-full pl-9 pr-4 py-2 border border-stone-200 rounded-lg text-sm focus:ring-2 focus:ring-accent focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-stone-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-secondary">Asset</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-secondary">Type</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-secondary">Price</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-secondary">24h Change</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-secondary">24h Volume</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-secondary">Liquidity</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-secondary">Fee</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-secondary">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-200">
                      {filteredPools.map(pool => (
                        <tr key={pool.id} className="hover:bg-stone-50 transition-colors">
                          <td className="px-6 py-4">
                            <div className="font-semibold text-primary">{pool.symbol}</div>
                            <div className="text-sm text-secondary">{pool.name}</div>
                          </td>
                          <td className="px-6 py-4">
                            <span className="px-3 py-1 text-xs rounded-full bg-blue-100 text-blue-700 font-medium">
                              {pool.type}
                            </span>
                          </td>
                          <td className="px-6 py-4 font-semibold text-primary">${pool.price.toFixed(2)}</td>
                          <td className="px-6 py-4">
                            <div className={`flex items-center gap-1 font-medium ${
                              pool.change24h >= 0 ? 'text-green-600' : 'text-red-600'
                            }`}>
                              {pool.change24h >= 0 ? (
                                <ArrowUpRight className="w-4 h-4" />
                              ) : (
                                <ArrowDownRight className="w-4 h-4" />
                              )}
                              <span>{pool.change24h >= 0 ? '+' : ''}{pool.change24h}%</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-primary">{pool.volume24h}</td>
                          <td className="px-6 py-4">
                            <div>
                              <div className="font-semibold text-primary">{pool.liquidity}</div>
                              <div className="text-xs text-secondary">{pool.tokensInPool.toLocaleString()} tokens</div>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-primary font-medium">{pool.tradingFee}</td>
                          <td className="px-6 py-4">
                            <button
                              onClick={() => setSelectedPool(pool)}
                              disabled={!walletConnected}
                              className="px-4 py-2 text-sm bg-accent text-white rounded-lg hover:bg-opacity-90 transition-all font-medium disabled:bg-gray-300 disabled:cursor-not-allowed"
                            >
                              Trade
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            {/* Risk Disclaimer */}
            <section className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
              <div className="flex gap-4">
                <div className="text-xl font-bold text-blue-900">ⓘ</div>
                <div>
                  <h4 className="font-semibold text-blue-900 mb-1">Trading Risk Disclosure</h4>
                  <p className="text-sm text-blue-800">
                    Mineral commodity trading involves substantial risk and is not suitable for all investors. 
                    Prices are volatile and can fluctuate rapidly. Only trade with capital you can afford to lose.
                    Past performance does not guarantee future results.
                  </p>
                </div>
              </div>
            </section>
          </div>
        )}
      </main>

      {/* Trade Modal */}
      {selectedPool && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full border border-stone-200 shadow-lg">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-2xl font-bold text-primary">{selectedPool.symbol}</h3>
                <p className="text-sm text-secondary">{selectedPool.name}</p>
              </div>
              <button 
                onClick={() => setSelectedPool(null)} 
                className="text-secondary hover:text-primary transition-colors text-2xl leading-none"
              >
                ✕
              </button>
            </div>

            <div className="mb-6 p-4 bg-stone-50 rounded-lg space-y-3 border border-stone-200">
              <div className="flex justify-between">
                <span className="text-sm text-secondary">Current Price</span>
                <span className="font-semibold text-primary">${selectedPool.price.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-secondary">Pool Liquidity</span>
                <span className="font-semibold text-primary">{selectedPool.liquidity}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-secondary">Trading Fee</span>
                <span className="font-semibold text-primary">{selectedPool.tradingFee}</span>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-primary mb-2">Trade Amount</label>
                <input
                  type="number"
                  value={tradeAmount}
                  onChange={(e) => setTradeAmount(e.target.value)}
                  placeholder="Enter amount"
                  className="w-full px-4 py-3 border border-stone-200 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent text-sm"
                />
                <p className="text-xs text-secondary mt-2">
                  Estimated cost: ${(parseFloat(tradeAmount || '0') * selectedPool.price).toFixed(2)}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-4">
                <button
                  onClick={() => {
                    alert(`Buy order placed for ${tradeAmount} ${selectedPool.symbol}`);
                    setSelectedPool(null);
                    setTradeAmount('');
                  }}
                  disabled={!tradeAmount || !walletConnected}
                  className="px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  Buy
                </button>
                <button
                  onClick={() => {
                    alert(`Sell order placed for ${tradeAmount} ${selectedPool.symbol}`);
                    setSelectedPool(null);
                    setTradeAmount('');
                  }}
                  disabled={!tradeAmount || !walletConnected}
                  className="px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-semibold disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  Sell
                </button>
              </div>

              {!walletConnected && (
                <p className="text-xs text-red-600 text-center pt-2">Please connect a wallet to trade</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
