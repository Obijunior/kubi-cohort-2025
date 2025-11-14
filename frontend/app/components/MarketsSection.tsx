'use client';

import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function MarketsSection() {
  const router = useRouter();
  const markets = [
    { city: 'Miami', state: 'FL', price: '$245.50', change: '+2.4%', volume: '$12.5M', trend: 'up' },
    { city: 'Austin', state: 'TX', price: '$189.30', change: '+1.8%', volume: '$8.3M', trend: 'up' },
    { city: 'Denver', state: 'CO', price: '$310.20', change: '+3.1%', volume: '$15.2M', trend: 'up' },
    { city: 'Seattle', state: 'WA', price: '$425.80', change: '-0.5%', volume: '$22.1M', trend: 'down' },
    { city: 'Phoenix', state: 'AZ', price: '$198.40', change: '+2.8%', volume: '$9.7M', trend: 'up' },
    { city: 'Nashville', state: 'TN', price: '$215.60', change: '+1.9%', volume: '$7.8M', trend: 'up' },
  ];

  return (
    <section id="markets" className="px-6 py-20 bg-secondary">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-2 rounded-full text-sm font-medium mb-4 border border-accent/20">
            📊 Live Markets
          </div>
          <h2 className="text-4xl font-bold text-primary mb-4">
            Trending Housing Markets
          </h2>
          <p className="text-lg text-secondary max-w-2xl mx-auto">
            Trade tokenized futures on the hottest real estate markets. Each token represents future housing price movements.
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
                    {market.city}
                  </h3>
                  <p className="text-sm text-muted">{market.state}</p>
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

              <button onClick={() => router.push(`/markets/${market.city.toLowerCase()}`)} className="w-full py-3 bg-dark text-white font-medium rounded-theme-md hover:opacity-90 transition group-hover:shadow-theme-md">
                View Market →
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}