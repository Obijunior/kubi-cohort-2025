'use client';

import React from 'react';
import { Search } from 'lucide-react';

interface HeroSectionProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  // scrollY: number;
}

export default function HeroSection({ searchQuery, setSearchQuery }: HeroSectionProps) {
  return (
    <div className="relative px-6 py-24 overflow-hidden">
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 px-4 py-2 rounded-full text-sm font-medium mb-6 border border-emerald-200">
          <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
          Tokenized Real Estate Futures
        </div>

        <h1 className="text-5xl md:text-6xl font-bold text-primary mb-6 leading-tight">
          Learn, Trade, and Grow
          <span className="block text-transparent bg-clip-text bg-linear-to-r from-amber-600 via-orange-600 to-rose-600">
            Your Real Estate Portfolio
          </span>
        </h1>

        <p className="text-xl text-secondary mb-12 max-w-2xl mx-auto leading-relaxed">
          Invest in tokenized housing market futures while learning the fundamentals of real estate. 
          Start with as little as $10 and level up your financial knowledge.
        </p>

        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
            <input
              type="text"
              placeholder="Search markets by city or neighborhood..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 text-lg bg-secondary border-2 border-default rounded-xl focus:outline-none focus:border-hover transition shadow-sm text-primary placeholder:text-muted"
            />
          </div>
        </div>
      </div>
    </div>
  );
}