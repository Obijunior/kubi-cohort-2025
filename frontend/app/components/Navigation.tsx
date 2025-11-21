'use client';

import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import WalletConnector from './WalletConnector';
import XRPLWalletModal from './XRPLWalletModal';
import { useWallet } from '@/app/context/WalletContext';
import { apiGet } from '@/app/utils/api';

export default function Navigation() {
  const { isConnected, walletAddress, connectWallet, disconnectWallet, xrpBalance, setXrpBalance } = useWallet();
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
  const [loadingBalance, setLoadingBalance] = useState(false);

  const handleConnectWallet = (address: string) => {
    connectWallet(address);
    setIsWalletModalOpen(false);
  };

  const addressRef = useRef<HTMLDivElement | null>(null);
  const [showBalanceDropdown, setShowBalanceDropdown] = useState(false);

  // Close dropdown when clicking outside
  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (!addressRef.current) return;
      const target = e.target as Node;
      if (!addressRef.current.contains(target)) setShowBalanceDropdown(false);
    };

    document.addEventListener('mousedown', onDocClick);
    return () => document.removeEventListener('mousedown', onDocClick);
  }, []);

  const formatAddress = (address?: string) => {
    if (!address) return 'Invalid';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  // Fetch XRP balance when walletAddress changes
  useEffect(() => {
    if (!walletAddress) return;

    const fetchBalance = async () => {
      try {
        setLoadingBalance(true);
        const data = await apiGet(`/api/xrpl/account/${encodeURIComponent(walletAddress)}`);
        const drops = Number(data?.account_data?.Balance ?? data?.result?.account_data?.Balance ?? 0);
        const balance = (drops / 1_000_000).toString();
        setXrpBalance(balance);
      } catch (err) {
        console.error('Failed to fetch XRP balance:', err);
        setXrpBalance(null);
      } finally {
        setLoadingBalance(false);
      }
    };

    fetchBalance();
  }, [walletAddress, setXrpBalance]);

  return (
    <>
      <nav className="top-0 z-50 backdrop-blur-md bg-secondary/80 border-b border-default shadow-sm relative">
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

            <div className="hidden md:flex items-center gap-8 absolute left-1/2 transform -translate-x-1/2">
              <Link href="/markets" className="text-sm font-medium text-secondary hover:text-primary transition">
                Markets
              </Link>
              <Link href="/learn" className="text-sm font-medium text-secondary hover:text-primary transition">
                Learn
              </Link>
              <Link href="/trade" className="text-sm font-medium text-secondary hover:text-primary transition">
                Trade
              </Link>
            </div>

            {isConnected && walletAddress ? (
              <div className="flex items-center gap-4">
                <div ref={addressRef} className="relative">
                  <button
                    onClick={() => setShowBalanceDropdown(prev => !prev)}
                    className="flex items-center bg-emerald-50 border border-emerald-200 rounded-lg px-4 py-2"
                    aria-expanded={showBalanceDropdown}
                    aria-haspopup="true"
                    aria-label="Wallet address and balance"
                  >
                    <span className="text-sm font-medium text-emerald-700">{formatAddress(walletAddress)}</span>
                  </button>

                  {showBalanceDropdown && (
                    <div className="absolute right-0 mt-2 w-44 bg-white border border-stone-200 rounded-md shadow-md p-3 text-sm z-50">
                      {loadingBalance ? (
                        <div className="text-emerald-700">⏳ Loading...</div>
                      ) : (
                          <div className="text-emerald-700 font-medium">Balance: {(xrpBalance ? parseFloat(xrpBalance).toFixed(4) : '0.0000')} XRP</div>
                      )}
                    </div>
                  )}
                </div>

                {/* <div className="flex items-center bg-emerald-50 border border-emerald-200 rounded-lg px-4 py-2">
                  {loadingBalance ? (
                    <span className="text-sm text-emerald-700">⏳ Loading...</span>
                  ) : (
                    <span className="text-sm text-emerald-700">{xrpBalance ?? '0'} XRP</span>
                  )}
                </div> */}

                <button
                  onClick={() => { disconnectWallet(); setShowBalanceDropdown(false); }}
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

      <XRPLWalletModal
        isOpen={isWalletModalOpen}
        onClose={() => setIsWalletModalOpen(false)}
        onConnect={handleConnectWallet}
      />
    </>
  );
}
