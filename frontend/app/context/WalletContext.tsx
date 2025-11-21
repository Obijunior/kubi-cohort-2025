'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect, useCallback } from 'react';
import { apiGet } from '@/app/utils/api';

interface WalletContextType {
  isConnected: boolean;
  walletAddress: string | null;
  connectWallet: (address: string) => void;
  disconnectWallet: () => void;
  xrpBalance: string | null;
  setXrpBalance: (b: string | null) => void;
  loadingBalance: boolean;
  refreshBalance: () => Promise<void>;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export function WalletProvider({ children }: { children: ReactNode }) {
  const [walletData, setWalletData] = useState<{
    isConnected: boolean;
    walletAddress: string | null;
    mounted: boolean;
  }>(() => {
    // Initialize from localStorage
    const savedAddress = typeof window !== 'undefined' ? localStorage.getItem('walletAddress') : null;
    return {
      isConnected: !!savedAddress,
      walletAddress: savedAddress,
      mounted: true
    };
  });

  const [xrpBalance, setXrpBalanceState] = useState<string | null>(() => {
    return typeof window !== 'undefined' ? localStorage.getItem('xrpBalance') : null;
  });

  const [loadingBalance, setLoadingBalance] = useState(false);

  const setXrpBalance = (b: string | null) => {
    setXrpBalanceState(b);
    if (typeof window !== 'undefined') {
      if (b === null) localStorage.removeItem('xrpBalance');
      else localStorage.setItem('xrpBalance', b);
    }
  };

  const connectWallet = (address: string) => {
    setWalletData(prev => ({
      ...prev,
      walletAddress: address,
      isConnected: true
    }));
    if (typeof window !== 'undefined') localStorage.setItem('walletAddress', address);
  };

  const disconnectWallet = () => {
    setWalletData(prev => ({
      ...prev,
      walletAddress: null,
      isConnected: false
    }));
    if (typeof window !== 'undefined') localStorage.removeItem('walletAddress');
    // Also clear balance on disconnect
    setXrpBalance(null);
  };

  const refreshBalance = useCallback(async (): Promise<void> => {
    const address = walletData.walletAddress;
    if (!address) return setXrpBalance(null);

    try {
      setLoadingBalance(true);
      const data = await apiGet(`/api/xrpl/account/${encodeURIComponent(address)}`);
      // account_info may be at data.result.account_data or data.account_data
      const drops = Number(data?.result?.account_data?.Balance ?? data?.account_data?.Balance ?? 0);
      const balance = drops ? (drops / 1_000_000).toString() : '0';
      setXrpBalance(balance);
    } catch (err) {
      console.error('Failed to refresh XRP balance:', err);
      setXrpBalance(null);
    } finally {
      setLoadingBalance(false);
    }
  }, [walletData.walletAddress]);

  // Auto-refresh when walletAddress changes
  useEffect(() => {
    if (walletData.walletAddress) {
      // fire-and-forget
      refreshBalance();
    }
  }, [walletData.walletAddress, refreshBalance]);

  return (
    <WalletContext.Provider value={{ 
      isConnected: walletData.isConnected, 
      walletAddress: walletData.walletAddress, 
      connectWallet, 
      disconnectWallet,
      xrpBalance,
      setXrpBalance,
      loadingBalance,
      refreshBalance
    }}>
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet() {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
}
