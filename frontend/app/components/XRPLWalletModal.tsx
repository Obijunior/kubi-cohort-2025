'use client';

import React, { useState } from 'react';
import { X, Eye, EyeOff, AlertCircle, CheckCircle } from 'lucide-react';

interface XRPLWalletModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConnect: (address: string) => void;
}

export default function XRPLWalletModal({ isOpen, onClose, onConnect }: XRPLWalletModalProps) {
  const [seed, setSeed] = useState('');
  const [showSeed, setShowSeed] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleConnect = async () => {
    try {
      setError(null);
      setLoading(true);

      // Validate seed format (basic validation for XRPL seed)
      if (!seed.trim()) {
        setError('Please enter your XRPL seed phrase');
        setLoading(false);
        return;
      }

      // XRPL seeds typically start with 's' and are alphanumeric
      if (!seed.match(/^s[A-Za-z0-9]{25,}$/)) {
        setError('Invalid seed format. XRPL seeds start with "s" followed by alphanumeric characters.');
        setLoading(false);
        return;
      }

      // Import xrpl library dynamically
      const xrpl = await import('xrpl');
      const Wallet = xrpl.Wallet;

      // Derive account from seed
      const wallet = Wallet.fromSeed(seed);
      const address = wallet.address;

      if (!address) {
        setError('Failed to derive wallet address from seed');
        setLoading(false);
        return;
      }

      setSuccess(true);
      
      // Reset form and close after a brief delay to show success state
      setTimeout(() => {
        onConnect(address);
        handleClose();
      }, 1000);

    } catch (err: unknown) {
      console.error('XRPL wallet connection error:', err);
      
      if (err instanceof Error) {
        if (err.message.includes('checksum')) {
          setError('Invalid seed: Checksum validation failed');
        } else if (err.message.includes('Invalid seed')) {
          setError('Invalid seed phrase format');
        } else {
          setError(err.message || 'Failed to connect wallet');
        }
      } else {
        setError('An unexpected error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setSeed('');
    setShowSeed(false);
    setError(null);
    setSuccess(false);
    onClose();
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && seed.trim()) {
      handleConnect();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-lg max-w-md w-full p-6 md:p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-primary">Connect XRPL Wallet</h2>
            <p className="text-sm text-secondary mt-1">Enter your seed phrase to connect</p>
          </div>
          <button
            onClick={handleClose}
            className="p-1 hover:bg-stone-100 rounded-lg transition"
            aria-label="Close modal"
          >
            <X className="w-5 h-5 text-secondary" />
          </button>
        </div>

        {/* Seed Input */}
        <div className="mb-6">
          <label htmlFor="seed-input" className="block text-sm font-medium text-primary mb-2">
            XRPL Seed Phrase
          </label>
          <div className="relative">
            <input
              id="seed-input"
              type={showSeed ? 'text' : 'password'}
              value={seed}
              onChange={(e) => {
                setSeed(e.target.value);
                if (error) setError(null); // Clear error when user starts typing
              }}
              onKeyPress={handleKeyPress}
              placeholder="Enter your seed phrase (e.g., sEd7rBGm5kxzauRTAV2hbsa...)"
              disabled={loading || success}
              className="w-full px-4 py-3 bg-stone-50 border-2 border-stone-200 rounded-lg text-primary placeholder-stone-400 focus:outline-none focus:border-emerald-500 focus:bg-white transition pr-10 disabled:opacity-50 disabled:cursor-not-allowed"
            />
            <button
              onClick={() => setShowSeed(!showSeed)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary hover:text-primary transition p-1"
              type="button"
              disabled={loading || success}
            >
              {showSeed ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          </div>
          <p className="text-xs text-stone-500 mt-2">
            ⚠️ Never share your seed phrase. We do not store it.
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-red-900">{error}</p>
            </div>
          </div>
        )}

        {/* Success Message */}
        {success && (
          <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg flex gap-3">
            <CheckCircle className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-green-900">Wallet connected successfully!</p>
            </div>
          </div>
        )}

        {/* Info Section */}
        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h4 className="text-sm font-semibold text-blue-900 mb-2">How to find your seed:</h4>
          <ul className="text-xs text-blue-800 space-y-1 list-disc list-inside">
            <li>Open your XRPL wallet application</li>
            <li>Look for &quot;Seed&quot; or &quot;Secret Key&quot; in settings</li>
            <li>It will start with the letter &quot;s&quot;</li>
          </ul>
        </div>

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            onClick={handleClose}
            disabled={loading}
            className="flex-1 px-4 py-3 border-2 border-stone-200 rounded-lg text-primary font-medium hover:border-stone-300 hover:bg-stone-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
          <button
            onClick={handleConnect}
            disabled={loading || !seed.trim() || success}
            className="flex-1 px-4 py-3 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <span className="animate-spin">⏳</span>
                Connecting...
              </>
            ) : success ? (
              <>
                <CheckCircle className="w-4 h-4" />
                Connected!
              </>
            ) : (
              'Connect Wallet'
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
