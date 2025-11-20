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
              <span className="text-xl font-bold">TerraNova</span>
            </div>
            {/* <p className="text-sm text-white/60">
              Learn, trade, and grow your mineral portfolio through tokenized futures.
            </p> */}
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-8 text-center text-sm text-white/60">
          <p className="mb-2">Trading and investing involve substantial risk. Past performance is not indicative of future results.</p>
          <br></br>
          <ul className='columns-6'>
            <li>Made with ❤️ by </li>
            <li>Henry</li>
            <li>Sneha</li>
            <li>Matthew</li>
            <li>Abhi</li>
            <li>Ouji</li>
          </ul>
        </div>
      </div>
    </footer>
  );
}