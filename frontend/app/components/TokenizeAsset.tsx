'use client';

import { Plus, X } from 'lucide-react';
import { useState } from 'react';
// import { issueFungibleToken, createBuyOffer } from '../../../apis/src/services/xrplNew';

type AssetType = 'oil' | 'gold' | 'silver' | 'platinum' | 'copper' | 'natural-gas';

export interface AssetFormData {
  assetType: AssetType | '';
  assetName: string;
  assetSymbol: string;
  tokensToMint: string;
  physicalBacking: string;
}

const ASSET_TYPES: { value: AssetType; label: string; description: string }[] = [
  { value: 'oil', label: 'Oil (WTI)', description: 'West Texas Intermediate Crude Oil' },
  { value: 'gold', label: 'Gold (XAU)', description: 'Physical Gold Bullion' },
  { value: 'silver', label: 'Silver (XAG)', description: 'Physical Silver Bullion' },
//   { value: 'platinum', label: 'Platinum (XPT)', description: 'Physical Platinum' },
//   { value: 'copper', label: 'Copper (XCU)', description: 'Physical Copper' },
//   { value: 'natural-gas', label: 'Natural Gas (NG)', description: 'Natural Gas Futures' },
];

interface TokenizeAssetProps {
  onAssetTokenized: (data: AssetFormData) => void;
}

export default function TokenizeAsset({ onAssetTokenized }: TokenizeAssetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState<AssetFormData>({
    assetType: '',
    assetName: '',
    assetSymbol: '',
    tokensToMint: '',
    physicalBacking: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const generateSymbol = (name: string, type: AssetType | '') => {
    if (!name || !type) return '';
    const namePrefix = name.split(' ')[0].toUpperCase().slice(0, 3);
    const typeMap: Record<AssetType, string> = {
      'oil': 'OIL',
      'gold': 'AUR',
      'silver': 'SLV',
      'platinum': 'PLT',
      'copper': 'COP',
      'natural-gas': 'GAS',
    };
    return `${namePrefix}-${typeMap[type as AssetType]}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalFormData = {
      ...formData,
      assetSymbol: generateSymbol(formData.assetName, formData.assetType as AssetType),
    };
    onAssetTokenized(finalFormData);
    setIsOpen(false);
    setFormData({
      assetType: '',
      assetName: '',
      assetSymbol: '',
      tokensToMint: '',
      physicalBacking: '',
    });
  };

  const isFormValid =
    formData.assetType &&
    formData.assetName &&
    formData.tokensToMint &&
    formData.physicalBacking;

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-6 py-3 bg-accent text-white rounded-lg hover:bg-opacity-80 hover:shadow-lg transition-all duration-200 font-semibold"
      >
        <Plus className="w-5 h-5" />
        Tokenize Asset
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-2xl w-full border border-stone-200 shadow-lg max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-3xl font-bold text-primary">Tokenize New Asset</h2>
                <p className="text-secondary mt-1">Create and mint tokens backed by physical assets</p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-secondary hover:text-primary transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Asset Type Dropdown */}
              <div>
                <label className="block text-sm font-semibold text-primary mb-2">Asset Type *</label>
                <select
                  name="assetType"
                  value={formData.assetType}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-stone-200 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent text-sm bg-white"
                >
                  <option value="">Select an asset type...</option>
                  {ASSET_TYPES.map(type => (
                    <option key={type.value} value={type.value}>
                      {type.label} - {type.description}
                    </option>
                  ))}
                </select>
              </div>

              {/* Asset Name */}
              <div>
                <label className="block text-sm font-semibold text-primary mb-2">Asset Name *</label>
                <input
                  type="text"
                  name="assetName"
                  value={formData.assetName}
                  onChange={handleInputChange}
                  placeholder="e.g., Aurora Gold Reserve"
                  className="w-full px-4 py-2 border border-stone-200 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent text-sm"
                />
                <p className="text-xs text-secondary mt-1">Give your tokenized asset a memorable name</p>
              </div>

              {/* Asset Symbol (Auto-generated) */}
              <div>
                <label className="block text-sm font-semibold text-primary mb-2">Token Symbol (Auto-generated)</label>
                <input
                  type="text"
                  value={generateSymbol(formData.assetName, formData.assetType as AssetType)}
                  disabled
                  className="w-full px-4 py-2 border border-stone-200 rounded-lg bg-stone-50 text-secondary text-sm cursor-not-allowed"
                />
                <p className="text-xs text-secondary mt-1">Updates automatically based on name and type</p>
              </div>

              {/* Tokens to Mint */}
              <div>
                <label className="block text-sm font-semibold text-primary mb-2">Total Tokens to Mint *</label>
                <input
                  type="number"
                  name="tokensToMint"
                  value={formData.tokensToMint}
                  onChange={handleInputChange}
                  placeholder="e.g., 1000000"
                  min="1"
                  className="w-full px-4 py-2 border border-stone-200 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent text-sm"
                />
                <p className="text-xs text-secondary mt-1">Total supply of tokens to create</p>
              </div>

              {/* Physical Backing */}
              <div>
                <label className="block text-sm font-semibold text-primary mb-2">Physical Asset Backing *</label>
                <input
                  type="text"
                  name="physicalBacking"
                  value={formData.physicalBacking}
                  onChange={handleInputChange}
                  placeholder="e.g., 500 kg of gold or 10,000 barrels of oil"
                  className="w-full px-4 py-2 border border-stone-200 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent text-sm"
                />
                <p className="text-xs text-secondary mt-1">The real-world asset amount backing these tokens</p>
              </div>

              {/* Info Banner */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-blue-900 mb-2">Asset Verification Required</h4>
                <p className="text-sm text-blue-800 mb-3">
                  After minting, you&apos;ll need to provide proof of ownership and custody documentation for your assets.
                </p>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 rounded border-stone-300 text-accent" />
                  <span className="text-sm text-blue-800">I certify that I own and control these assets</span>
                </label>
              </div>

              {/* Buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="flex-1 px-4 py-3 border border-stone-300 text-primary rounded-lg hover:bg-stone-50 transition-colors font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!isFormValid}
                  className="flex-1 px-4 py-3 bg-accent text-white rounded-lg hover:bg-opacity-90 transition-all font-semibold disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  Mint Asset
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}