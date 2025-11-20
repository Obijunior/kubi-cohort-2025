import React from 'react';
import TokenizeAsset, { type AssetFormData } from '@/app/components/TokenizeAsset';
import { mockMinerals, getCurrentPrice } from '@/app/utils/mockData';
import type { CompanyAsset } from '@/app/trade/page';

type MockMineralEntry = {
  priceHistory: { date: string; price: number; }[];
};

const typedMockMinerals: Record<string, MockMineralEntry> = mockMinerals;

type CompanyViewProps = {
  companyAssets: CompanyAsset[];
  setCompanyAssets: React.Dispatch<React.SetStateAction<CompanyAsset[]>>;
};

export default function CompanyView({ companyAssets, setCompanyAssets }: CompanyViewProps) {
  const handleTokenizeAsset = (newAssetData: AssetFormData) => {
    if (!newAssetData.assetType) return;

    const mineralData = typedMockMinerals[newAssetData.assetType];
    const price = mineralData ? getCurrentPrice(mineralData.priceHistory) : 0;

    const newAsset: CompanyAsset = {
      key: newAssetData.assetType,
      symbol: newAssetData.assetSymbol,
      name: newAssetData.assetName,
      tokensInPool: parseInt(newAssetData.tokensToMint, 10),
      price: price,
      feePercentage: 0.25
    };

    setCompanyAssets(prevAssets => [...prevAssets, newAsset]);
  };

  const totalCompanyAssets = companyAssets.length;
  const totalCompanyLiquidity = companyAssets.reduce((sum, asset) => sum + (asset.tokensInPool * asset.price), 0);
  const totalFeesEarned = companyAssets.reduce((sum, asset) => {
    return sum + ((asset.tokensInPool * asset.price) * 0.10 * asset.feePercentage);
  }, 0);

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-primary">Your Tokenized Assets</h2>
          <p className="text-secondary mt-1">Create and manage RWA tokens</p>
        </div>
        <div className="hover:bg-opacity-90 transition-rounded-lg">
          <TokenizeAsset onAssetTokenized={handleTokenizeAsset} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg p-6 border border-stone-200 shadow-sm">
          <p className="text-sm text-secondary mb-2">Total Assets</p>
          <p className="text-3xl font-bold text-primary">{totalCompanyAssets}</p>
        </div>
        <div className="bg-white rounded-lg p-6 border border-stone-200 shadow-sm">
          <p className="text-sm text-secondary mb-2">Total Pool Liquidity</p>
          <p className="text-3xl font-bold text-primary">${(totalCompanyLiquidity / 1_000_000).toFixed(1)}M</p>
        </div>
        <div className="bg-white rounded-lg p-6 border border-stone-200 shadow-sm">
          <p className="text-sm text-secondary mb-2">Total Fees Earned</p>
          <p className="text-3xl font-bold text-green-600">${totalFeesEarned.toLocaleString('en-US', { maximumFractionDigits: 0 })}</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-stone-100">
          <h3 className="text-xl font-bold text-primary">Your Assets & Trading Pools</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-stone-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-secondary">Asset</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-secondary">Total Supply</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-secondary">Pool Liquidity</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-secondary">Fees Earned</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-secondary">Status</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-secondary">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-200">
              {companyAssets.map((asset) => {
                const assetLiquidity = asset.tokensInPool * asset.price;
                const estimatedFeesPerAsset = (assetLiquidity * 0.10 * asset.feePercentage);
                return (
                  <tr key={asset.symbol} className="hover:bg-stone-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-semibold text-primary">{asset.symbol}</div>
                      <div className="text-sm text-secondary">{asset.name}</div>
                    </td>
                    <td className="px-6 py-4 text-primary">{asset.tokensInPool.toLocaleString()}</td>
                    <td className="px-6 py-4 text-primary">${(assetLiquidity / 1_000_000).toFixed(2)}M</td>
                    <td className="px-6 py-4 font-semibold text-green-600">${estimatedFeesPerAsset.toLocaleString('en-US', { maximumFractionDigits: 0 })}</td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 text-xs rounded-full bg-green-100 text-green-700 font-medium">Pool Active</span>
                    </td>
                    <td className="px-6 py-4">
                      <button className="text-accent hover:text-opacity-80 transition-colors text-sm font-medium">
                        Manage
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
        <div className="flex gap-4">
          <div className="text-xl font-bold text-blue-900">ℹ</div>
          <div>
            <h4 className="font-semibold text-blue-900 mb-1">How Asset Leasing Works</h4>
            <p className="text-sm text-blue-800">
              Tokenize your physical assets and create liquidity pools. Traders will trade against your pools, 
              and you earn fees from every transaction while retaining full ownership of the underlying assets.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}