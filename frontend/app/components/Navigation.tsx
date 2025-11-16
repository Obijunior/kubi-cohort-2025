'use client';

import React from 'react';
import Link from 'next/link';
import WalletConnector from './WalletConnector';
import WalletModal from './WalletModal';


export default function Navigation() {
  const [isWalletModalOpen, setIsWalletModalOpen] = React.useState(false);
  const [walletAddress, setWalletAddress] = React.useState<string | null>(null);

  const handleConnectWallet = (address: string) => {
    setWalletAddress(address);
    setIsWalletModalOpen(false);
  };

  const handleDisconnect = () => {
    setWalletAddress(null);
  };

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <>
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
            <a href="/markets" className="text-sm font-medium text-secondary hover:text-primary transition">
              Markets
            </a>
            <a href="/learn" className="text-sm font-medium text-secondary hover:text-primary transition">
              Learn
            </a>
            <a href="#trade" className="text-sm font-medium text-secondary hover:text-primary transition">
              Trade
            </a>
          </div>

           {walletAddress ? (
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 rounded-lg px-4 py-2">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                    <span className="text-sm font-medium text-emerald-700">
                      {formatAddress(walletAddress)}
                    </span>
                  </div>
                  <button 
                    onClick={handleDisconnect}
                    className="px-4 py-2 text-stone-600 hover:text-stone-900 text-sm font-medium transition"
                  >
                    Disconnect
                  </button>
                </div>
              ) : (

          <div className="flex items-center gap-4">
            <WalletConnector onClick={() => setIsWalletModalOpen(true)} />
          </div>
          )}
        </div>
      </div>
    </nav>
    <WalletModal
      isOpen={isWalletModalOpen}
      onClose={() => setIsWalletModalOpen(false)}
      onConnect={handleConnectWallet}
    />
    </>
  );
}