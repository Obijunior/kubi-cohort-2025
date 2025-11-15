'use client';

import React from 'react';
import Link from 'next/link';



export default function Navigation() {

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-secondary/80 border-b border-default shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 hover:opacity-90 transition">
            <div className="w-10 h-10 bg-linear-to-br from-emerald-500 to-green-300 rounded-xl flex items-center justify-center shadow-md">
              <span className="text-xl">🏠</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-primary">TerraNova</h1>
              <p className="text-xs text-muted">Learn. Trade. Grow.</p>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <a href="#markets" className="text-sm font-medium text-secondary hover:text-primary transition">
              Markets
            </a>
            <a href="learn" className="text-sm font-medium text-secondary hover:text-primary transition">
              Learn
            </a>
            <a href="#trade" className="text-sm font-medium text-secondary hover:text-primary transition">
              Trade
            </a>
          </div>

          <div className="flex items-center gap-4">


            <button className="px-5 py-2 bg-dark text-white text-sm font-medium rounded-lg hover:opacity-90 transition shadow-sm">
              Connect Wallet
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}