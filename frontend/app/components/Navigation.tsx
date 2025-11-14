'use client';

import React from 'react';

interface NavigationProps {
  userLevel: number;
  userXP: number;
  totalXP: number;
}

export default function Navigation({ userLevel, userXP, totalXP }: NavigationProps) {
  const xpPercentage = (userXP / totalXP) * 100;

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-secondary/80 border-b border-default shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-linear-to-br from-amber-200 to-orange-300 rounded-xl flex items-center justify-center shadow-md">
              <span className="text-xl">🏠</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-primary">RealQuest</h1>
              <p className="text-xs text-muted">Learn. Trade. Grow.</p>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <a href="#markets" className="text-sm font-medium text-secondary hover:text-primary transition">
              Markets
            </a>
            <a href="#learn" className="text-sm font-medium text-secondary hover:text-primary transition">
              Learn
            </a>
            <a href="#trade" className="text-sm font-medium text-secondary hover:text-primary transition">
              Trade
            </a>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden lg:flex items-center gap-3 bg-tertiary rounded-full px-4 py-2 border border-default">
              <div className="w-8 h-8 bg-accent/20 rounded-full flex items-center justify-center text-sm font-bold text-accent">
                {userLevel}
              </div>
              <div>
                <div className="text-xs text-muted">Level {userLevel}</div>
                <div className="w-24 h-1.5 bg-tertiary rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-linear-to-r from-emerald-400 to-teal-500 transition-all duration-500"
                    style={{ width: `${xpPercentage}%` }}
                  />
                </div>
              </div>
            </div>

            <button className="px-5 py-2 bg-dark text-white text-sm font-medium rounded-lg hover:opacity-90 transition shadow-sm">
              Connect Wallet
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}