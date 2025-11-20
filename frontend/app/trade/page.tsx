"use client";

import React, { useState } from 'react';
import { Building2, TrendingUp } from 'lucide-react';
import Navigation from '@/app/components/Navigation';
import CompanyView from '@/app/components/CompanyView';
import TraderView from '@/app/components/TraderView';
import { useWallet } from '@/app/context/WalletContext';
import { mockMinerals, getCurrentPrice } from '@/app/utils/mockData';
import { POOL_CONFIGS } from '@/app/utils/poolConfig';

type MockMineralEntry = {
  priceHistory: { date: string; price: number; }[];
};

const typedMockMinerals: Record<string, MockMineralEntry> = mockMinerals;

export type CompanyAsset = {
  key: string;
  symbol: string;
  name: string;
  tokensInPool: number;
  price: number;
  feePercentage: number;
};

export type PositionConfig = {
  id: string;
  symbol: string;
  amount: number;
  entryPrice: number;
  mineralKey: 'oil' | 'gold' | 'silver';
};

export default function TradePage() {
  const { isConnected: walletConnected } = useWallet();
  const [activeView, setActiveView] = useState<'company' | 'trader'>('trader');

  // Company Dashboard State
  const [companyAssets, setCompanyAssets] = useState<CompanyAsset[]>(() => 
    POOL_CONFIGS.map(config => {
      const mineralData = typedMockMinerals[config.key];
      const price = mineralData ? getCurrentPrice(mineralData.priceHistory) : 0;
      return {
        key: config.key,
        symbol: config.symbol,
        name: config.name,
        tokensInPool: config.tokensInPool,
        price,
        feePercentage: 0.25
      };
    })
  );

  // Trader Dashboard State
  const [positionConfigs, setPositionConfigs] = useState<PositionConfig[]>([
    {
      id: '1',
      symbol: 'WTI',
      amount: 100,
      entryPrice: 55.70,
      mineralKey: 'oil'
    },
    {
      id: '2',
      symbol: 'XAU',
      amount: 10,
      entryPrice: 4000.50,
      mineralKey: 'gold'
    }
  ]);
  const [closedPnL, setClosedPnL] = useState(0);

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

        {/* Conditional View Rendering */}
        {activeView === 'company' ? (
          <CompanyView 
            companyAssets={companyAssets}
            setCompanyAssets={setCompanyAssets}
          />
        ) : (
          <TraderView
            walletConnected={walletConnected}
            positionConfigs={positionConfigs}
            setPositionConfigs={setPositionConfigs}
            closedPnL={closedPnL}
            setClosedPnL={setClosedPnL}
            companyAssets={companyAssets}
          />
        )}
      </main>
    </div>
  );
}