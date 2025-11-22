'use client';

import React, { useState } from 'react';

export default function TradingPanel() {
  const [amount, setAmount] = useState('');

  return (
    <section id="trade" className="px-6 py-20 bg-secondary">
      <div className="max-w-4xl mx-auto">
        <div className="bg-dark rounded-theme-xl p-12 text-white shadow-theme-xl">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur px-4 py-2 rounded-full text-sm font-medium mb-4 border border-white/20">
              ⛏️ Ready to Start?
            </div>
            <h2 className="text-4xl font-bold mb-4">
              Begin Your Mineral Trading Journey
            </h2>
            <p className="text-white/70 text-lg max-w-xl mx-auto">
              Trade tokenized commodities for oil, gold, and silver. Start with just $10. Learn as you trade. Grow your portfolio with confidence.
            </p>
          </div>

          <div className="max-w-md mx-auto bg-white/5 backdrop-blur rounded-theme-xl p-6 border border-white/10 mb-6">
            <label className="block text-sm font-medium mb-2 text-white/70">
              Investment Amount
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl text-white/40">$</span>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="10.00"
                className="w-full pl-10 pr-4 py-4 bg-white/10 border border-white/20 rounded-theme-md text-white text-xl font-medium focus:outline-none focus:border-white/40 transition"
              />
            </div>
            <div className="flex gap-2 mt-3">
              {['10', '50', '100', '500'].map((preset) => (
                <button
                  key={preset}
                  onClick={() => setAmount(preset)}
                  className="flex-1 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-theme-md text-sm font-medium transition"
                >
                  ${preset}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-white text-black font-bold text-lg rounded-theme-xl hover:bg-white/90 transition shadow-theme-lg">
              Start Trading
            </button>
            <button className="px-8 py-4 bg-white/10 backdrop-blur text-white font-bold text-lg rounded-theme-xl hover:bg-white/20 transition border border-white/20">
              Learn More
            </button>
          </div>

          <p className="text-center text-white/50 text-sm mt-6">
            ⚠️ Trading involves risk. Only invest what you can afford to lose.
          </p>
        </div>
      </div>
    </section>
  );
}