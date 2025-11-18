'use client';

import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { mockMinerals } from '@/app/utils/mockData';

type Market = {
  mineral: string;
  symbol: string;
  price: string;
  change: string;
  volume: string;
  trend: 'up' | 'down';
};

export default function MarketsSection() {
  const router = useRouter();
  const [markets, setMarkets] = useState<Market[]>([]);

  useEffect(() => {
    const loadMarkets = () => {
      const marketData: Market[] = [];

      // Oil
      if (mockMinerals.oil && mockMinerals.oil.priceHistory.length > 0) {
        const oilPrice = mockMinerals.oil.priceHistory[mockMinerals.oil.priceHistory.length - 1].price;
        const oilPrevPrice = mockMinerals.oil.priceHistory[mockMinerals.oil.priceHistory.length - 2]?.price || oilPrice;
        const oilChange = ((oilPrice - oilPrevPrice) / oilPrevPrice) * 100;
        marketData.push({
          mineral: 'Oil',
          symbol: 'WTI',
          price: `$${oilPrice.toFixed(2)}`,
          change: `${oilChange >= 0 ? '+' : ''}${oilChange.toFixed(1)}%`,
          volume: '$125.5M',
          trend: oilChange >= 0 ? 'up' : 'down'
        });
      }

      // Gold
      if (mockMinerals.gold && mockMinerals.gold.priceHistory.length > 0) {
        const goldPrice = mockMinerals.gold.priceHistory[mockMinerals.gold.priceHistory.length - 1].price;
        const goldPrevPrice = mockMinerals.gold.priceHistory[mockMinerals.gold.priceHistory.length - 2]?.price || goldPrice;
        const goldChange = ((goldPrice - goldPrevPrice) / goldPrevPrice) * 100;
        marketData.push({
          mineral: 'Gold',
          symbol: 'XAU',
          price: `$${goldPrice.toFixed(2)}`,
          change: `${goldChange >= 0 ? '+' : ''}${goldChange.toFixed(1)}%`,
          volume: '$83.3M',
          trend: goldChange >= 0 ? 'up' : 'down'
        });
      }

      // Silver
      if (mockMinerals.silver && mockMinerals.silver.priceHistory.length > 0) {
        const silverPrice = mockMinerals.silver.priceHistory[mockMinerals.silver.priceHistory.length - 1].price;
        const silverPrevPrice = mockMinerals.silver.priceHistory[mockMinerals.silver.priceHistory.length - 2]?.price || silverPrice;
        const silverChange = ((silverPrice - silverPrevPrice) / silverPrevPrice) * 100;
        marketData.push({
          mineral: 'Silver',
          symbol: 'XAG',
          price: `$${silverPrice.toFixed(2)}`,
          change: `${silverChange >= 0 ? '+' : ''}${silverChange.toFixed(1)}%`,
          volume: '$52.2M',
          trend: silverChange >= 0 ? 'up' : 'down'
        });
      }

      setMarkets(marketData);
    };

    loadMarkets();
  }, []);

  return (
    <section id="markets" className="px-6 py-20 bg-secondary">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-2 rounded-full text-sm font-medium mb-4 border border-accent/20">
            📊 Live Markets
          </div>
          <h2 className="text-4xl font-bold text-primary mb-4">
            Trending Mineral Commodities
          </h2>
          <p className="text-lg text-secondary max-w-2xl mx-auto">
            Trade tokenized futures on the world&apos;s most valuable minerals. Each token represents commodity price movements.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {markets.map((market, idx) => (
            <div
              key={idx}
              className="group bg-tertiary rounded-theme-xl p-6 border border-default hover:border-hover hover:shadow-theme-lg transition cursor-pointer"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-primary mb-1">
                    {market.mineral}
                  </h3>
                  <p className="text-sm text-muted">{market.symbol}</p>
                </div>
                <div className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${
                  market.trend === 'up' 
                    ? 'bg-accent-secondary/10 text-accent-secondary' 
                    : 'bg-red-500/10 text-red-400'
                }`}>
                  {market.trend === 'up' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                  {market.change}
                </div>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-secondary">Token Price</span>
                  <span className="text-xl font-bold text-primary">{market.price}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-secondary">24h Volume</span>
                  <span className="text-sm font-medium text-secondary">{market.volume}</span>
                </div>
              </div>

              <button onClick={() => router.push(`/markets/${market.mineral.toLowerCase()}`)} className="w-full py-3 bg-dark text-white font-medium rounded-theme-md hover:opacity-90 transition group-hover:shadow-theme-md">
                View Market →
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}