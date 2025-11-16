import React from 'react';
import { TrendingUp, TrendingDown, Eye, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Navigation from '@/app/components/Navigation';

type MineralOverview = {
  id: string;
  name: string;
  symbol: string;
  currentPrice: string;
  change: number;
  volume: string;
  trend: 'up' | 'down';
  description: string;
  icon: string;
};

export default function MarketsPage() {
  const minerals: MineralOverview[] = [
    {
      id: 'oil',
      name: 'Oil',
      symbol: 'WTI',
      currentPrice: '$76.45',
      change: 2.4,
      volume: '$125.5M',
      trend: 'up',
      description: 'West Texas Intermediate crude oil futures',
      icon: ''
    },
    {
      id: 'gold',
      name: 'Gold',
      symbol: 'XAU',
      currentPrice: '$2,089.30',
      change: 1.8,
      volume: '$83.3M',
      trend: 'up',
      description: 'Precious metal commodity futures',
      icon: ''
    },
    {
      id: 'silver',
      name: 'Silver',
      symbol: 'XAG',
      currentPrice: '$31.20',
      change: 3.1,
      volume: '$52.2M',
      trend: 'up',
      description: 'Industrial and precious metal futures',
      icon: ''
    }
  ];

  return (
    <div className="min-h-screen bg-primary">
      <Navigation />

      <main className="max-w-7xl mx-auto px-4 py-12">
        {/* Header */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-4xl font-bold text-primary mb-2">
                Mineral Markets
              </h1>
              <p className="text-lg text-secondary">
                Explore and trade tokenized mineral futures
              </p>
            </div>
            <div className="hidden md:block text-right">
              <div className="text-3xl font-bold text-primary">3</div>
              <p className="text-sm text-secondary">Active Markets</p>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-lg p-4 border border-stone-200 shadow-sm">
              <p className="text-sm text-secondary mb-1">Total Volume</p>
              <p className="text-2xl font-bold text-primary">$261M</p>
            </div>
            <div className="bg-white rounded-lg p-4 border border-stone-200 shadow-sm">
              <p className="text-sm text-secondary mb-1">Average Change</p>
              <p className="text-2xl font-bold text-green-600">+2.4%</p>
            </div>
            <div className="bg-white rounded-lg p-4 border border-stone-200 shadow-sm">
              <p className="text-sm text-secondary mb-1">Market Status</p>
              <p className="text-2xl font-bold text-primary flex items-center gap-2">
                <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>
                Live
              </p>
            </div>
          </div>
        </section>

        {/* Markets Grid */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-primary mb-6">Available Markets</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {minerals.map((mineral) => (
              <div
                key={mineral.id}
                className="group bg-white rounded-2xl border border-stone-200 hover:border-stone-300 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden"
              >
                {/* Card Header */}
                <div className="p-6 border-b border-stone-100 bg-linear-to-r from-stone-50 to-transparent">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-2xl font-bold text-primary">{mineral.name}</h3>
                      <p className="text-sm text-secondary">{mineral.symbol}</p>
                    </div>
                    <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${
                      mineral.trend === 'up'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-700'
                    }`}>
                      {mineral.trend === 'up' ? (
                        <TrendingUp className="w-4 h-4" />
                      ) : (
                        <TrendingDown className="w-4 h-4" />
                      )}
                      {mineral.change > 0 ? '+' : ''}{mineral.change}%
                    </div>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 space-y-4">
                  {/* Price */}
                  <div className="bg-stone-50 rounded-lg p-3">
                    <p className="text-sm text-secondary mb-1">Current Price</p>
                    <p className="text-2xl font-bold text-primary">{mineral.currentPrice}</p>
                  </div>

                  {/* Volume */}
                  <div>
                    <p className="text-sm text-secondary mb-1">24h Volume</p>
                    <p className="text-lg font-semibold text-primary">{mineral.volume}</p>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-secondary line-clamp-2">
                    {mineral.description}
                  </p>

                  {/* Stats Row */}
                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <div className="flex items-center gap-2 text-xs text-secondary">
                      <Eye className="w-4 h-4" />
                      <span>Watch</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-secondary">
                      <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                      <span>Live Data</span>
                    </div>
                  </div>
                </div>

                {/* Card Footer */}
                <Link
                  href={`/markets/${mineral.id}`}
                  className="flex w-full px-6 py-3 bg-primary text-secondary font-semibold text-center group-hover:bg-opacity-90 transition-all duration-200 items-center justify-center gap-2"
                >
                  View Details
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* Quick Info Section */}
        <section className="bg-stone-50 rounded-2xl p-8 border border-stone-200">
          <div className="max-w-3xl">
            <h3 className="text-2xl font-bold text-primary mb-4">
              How to Get Started
            </h3>
            <div className="space-y-3">
              <div className="flex gap-4">
                <div className="shrink-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm">
                  1
                </div>
                <div>
                  <p className="font-semibold text-primary">Select a Market</p>
                  <p className="text-sm text-secondary">
                    Click on any mineral card to view detailed price charts and market data
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="shrink-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm">
                  2
                </div>
                <div>
                  <p className="font-semibold text-primary">Analyze Trends</p>
                  <p className="text-sm text-secondary">
                    Review 30-day price history and market statistics to make informed decisions
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="shrink-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm">
                  3
                </div>
                <div>
                  <p className="font-semibold text-primary">Start Trading</p>
                  <p className="text-sm text-secondary">
                    Begin trading tokenized mineral futures with as little as $10
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Info Banner */}
        <section className="mt-12 bg-blue-50 border border-blue-200 rounded-xl p-6">
          <div className="flex gap-4">
            <div className="text-xl font-bold text-blue-900">ⓘ</div>
            <div>
              <h4 className="font-semibold text-blue-900 mb-1">Real-Time Data</h4>
              <p className="text-sm text-blue-800">
                Market prices update in real-time using current commodity data. All trading involves risk. 
                Please only invest what you can afford to lose.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
