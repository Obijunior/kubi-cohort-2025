'use client';

import React, { useState } from 'react';
import { X } from 'lucide-react';

interface WalletModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConnect: (address: string) => void;
}

// Extend Window interface for Web3 providers
interface EthereumProvider {
  request: (args: { method: string; params?: unknown[] }) => Promise<string[]>;
  on: (event: string, callback: (error?: Error) => void) => void;
}

interface PhantomProvider {
  solana: {
    connect: () => Promise<{ publicKey: { toString: () => string } }>;
  };
}

declare global {
  interface Window {
    ethereum?: EthereumProvider;
    phantom?: PhantomProvider;
  }
}

type WalletProvider = {
  name: string;
  icon: string;
  description: string;
  type: 'evm' | 'solana';
  detectFunction: string;
};

export default function WalletModal({ isOpen, onClose, onConnect }: WalletModalProps) {
  const [connecting, setConnecting] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const walletProviders: WalletProvider[] = [
    {
      name: 'MetaMask',
      icon: '🦊',
      description: 'Connect with MetaMask wallet',
      type: 'evm',
      detectFunction: 'ethereum'
    },
    {
      name: 'Phantom',
      icon: '👻',
      description: 'Connect with Phantom wallet',
      type: 'solana',
      detectFunction: 'phantom'
    },
    {
      name: 'Coinbase Wallet',
      icon: '🔵',
      description: 'Connect with Coinbase Wallet',
      type: 'evm',
      detectFunction: 'coinbaseWallet'
    },
  ];

  const connectMetaMask = async () => {
    try {
      setConnecting('MetaMask');
      setError(null);

      if (typeof window.ethereum === 'undefined') {
        setError('MetaMask is not installed. Please install it from metamask.io');
        setConnecting(null);
        return;
      }

      const accounts = await window.ethereum.request({ 
        method: 'eth_requestAccounts' 
      });

      if (accounts && accounts.length > 0) {
        onConnect(accounts[0]);
      }
    } catch (err: unknown) {
      console.error('MetaMask connection error:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to connect to MetaMask';
      setError(errorMessage);
    } finally {
      setConnecting(null);
    }
  };

  const connectPhantom = async () => {
    try {
      setConnecting('Phantom');
      setError(null);

      const phantom = window.phantom?.solana;

      if (!phantom) {
        setError('Phantom is not installed. Please install it from phantom.app');
        setConnecting(null);
        return;
      }

      const response = await phantom.connect();
      
      if (response.publicKey) {
        onConnect(response.publicKey.toString());
      }
    } catch (err: unknown) {
      console.error('Phantom connection error:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to connect to Phantom';
      setError(errorMessage);
    } finally {
      setConnecting(null);
    }
  };

  const connectWallet = async (provider: WalletProvider) => {
    if (provider.name === 'MetaMask') {
      await connectMetaMask();
    } else if (provider.name === 'Phantom') {
      await connectPhantom();
    } else {
      // For other wallets, show coming soon message
      setError(`${provider.name} integration coming soon!`);
      setTimeout(() => setError(null), 3000);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-stone-200">
          <div>
            <h2 className="text-2xl font-bold text-stone-900">Connect Wallet</h2>
            <p className="text-sm text-stone-600 mt-1">Choose your preferred wallet provider</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-stone-100 rounded-lg transition"
          >
            <X className="w-5 h-5 text-stone-600" />
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mx-6 mt-6 p-4 bg-rose-50 border border-rose-200 rounded-lg">
            <p className="text-sm text-rose-700">{error}</p>
          </div>
        )}

        {/* Wallet Options */}
        <div className="p-6 space-y-3 max-h-[60vh] overflow-y-auto">
          {walletProviders.map((provider) => (
            <button
              key={provider.name}
              onClick={() => connectWallet(provider)}
              disabled={connecting !== null}
              className="w-full flex items-center gap-4 p-4 border-2 border-stone-200 rounded-xl hover:border-stone-300 hover:shadow-md transition disabled:opacity-50 disabled:cursor-not-allowed group"
            >
              <div className="text-4xl">{provider.icon}</div>
              <div className="flex-1 text-left">
                <div className="font-semibold text-stone-900 flex items-center gap-2">
                  {provider.name}
                  {provider.type === 'solana' && (
                    <span className="text-xs px-2 py-0.5 bg-purple-100 text-purple-700 rounded-full">
                      Solana
                    </span>
                  )}
                  {provider.type === 'evm' && (
                    <span className="text-xs px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full">
                      EVM
                    </span>
                  )}
                </div>
                <p className="text-sm text-stone-600">{provider.description}</p>
              </div>
              {connecting === provider.name && (
                <div className="w-5 h-5 border-2 border-stone-300 border-t-stone-800 rounded-full animate-spin"></div>
              )}
            </button>
          ))}
        </div>

        {/* Footer */}
        <div className="p-6 bg-stone-50 border-t border-stone-200">
          <p className="text-xs text-stone-600 text-center">
           
          </p>
        </div>
      </div>
    </div>
  );
}