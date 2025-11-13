'use client';

import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-dark text-white py-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-accent rounded-theme-md flex items-center justify-center">
                <span className="text-xl">🏠</span>
              </div>
              <span className="text-xl font-bold">RealQuest</span>
            </div>
            <p className="text-sm text-white/60">
              Learn, trade, and grow your real estate portfolio through tokenized futures.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold mb-3 text-white/90">Markets</h4>
            <ul className="space-y-2 text-sm text-white/60">
              <li><a href="#" className="hover:text-white transition">Browse Markets</a></li>
              <li><a href="#" className="hover:text-white transition">Price Charts</a></li>
              <li><a href="#" className="hover:text-white transition">Market Analysis</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-3 text-white/90">Learn</h4>
            <ul className="space-y-2 text-sm text-white/60">
              <li><a href="#" className="hover:text-white transition">Getting Started</a></li>
              <li><a href="#" className="hover:text-white transition">Educational Content</a></li>
              <li><a href="#" className="hover:text-white transition">Trading Guides</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-3 text-white/90">Company</h4>
            <ul className="space-y-2 text-sm text-white/60">
              <li><a href="#" className="hover:text-white transition">About Us</a></li>
              <li><a href="#" className="hover:text-white transition">Support</a></li>
              <li><a href="#" className="hover:text-white transition">Legal</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-8 text-center text-sm text-white/60">
          <p className="mb-2">Trading and investing involve substantial risk. Past performance is not indicative of future results.</p>
          <p>© 2025 RealQuest, Inc. Made with care.</p>
        </div>
      </div>
    </footer>
  );
}