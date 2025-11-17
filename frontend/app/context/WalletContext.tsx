'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface WalletContextType {
  isConnected: boolean;
  walletAddress: string | null;
  connectWallet: (address: string) => void;
  disconnectWallet: () => void;
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

  const connectWallet = (address: string) => {
    setWalletData(prev => ({
      ...prev,
      walletAddress: address,
      isConnected: true
    }));
    localStorage.setItem('walletAddress', address);
  };

  const disconnectWallet = () => {
    setWalletData(prev => ({
      ...prev,
      walletAddress: null,
      isConnected: false
    }));
    localStorage.removeItem('walletAddress');
  };

  return (
    <WalletContext.Provider value={{ 
      isConnected: walletData.isConnected, 
      walletAddress: walletData.walletAddress, 
      connectWallet, 
      disconnectWallet 
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
