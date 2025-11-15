'use client';

import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function MarketsSection() {
  const router = useRouter();
  const markets = [
    { mineral: 'Oil', symbol: 'WTI', price: '$76.45', change: '+2.4%', volume: '$125.5M', trend: 'up' },
    { mineral: 'Gold', symbol: 'XAU', price: '$2,089.30', change: '+1.8%', volume: '$83.3M', trend: 'up' },
    { mineral: 'Silver', symbol: 'XAG', price: '$31.20', change: '+3.1%', volume: '$52.2M', trend: 'up' },
  ];

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