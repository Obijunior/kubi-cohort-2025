import { notFound } from "next/navigation";
import type { Metadata } from "next";
import MarketChart from "../../components/MarketChart";
import Navigation from "../../components/Navigation";
import { mockMinerals, getCurrentPrice, getPreviousPrice, getLowestPrice, getHighestPrice } from "@/app/utils/mockData";

// --- Types ---
type MarketData = {
  mineralName: string;
  lastUpdated?: string;
  priceHistory: Array<{ date: string; price: number }>;
};

// --- Mock data fetcher ---
export function fetchMarketData(mineral: string): MarketData | null {
  try {
    const mockData = mockMinerals[mineral];
    
    if (!mockData) {
      console.error("Mineral not found in mock data:", mineral);
      return null;
    }

    const data: MarketData = {
      mineralName: mockData.mineralName,
      lastUpdated: mockData.lastUpdated,
      priceHistory: mockData.priceHistory
    };

    return data;
  } catch (err) {
    console.error("Error loading mock data for mineral:", mineral, err);
    return null;
  }
}

export async function generateMetadata({ params }: { params: Promise<{ marketName: string }> }): Promise<Metadata> {
  const { marketName } = await params;
  return { title: `${marketName} | Mineral Trading` };
}

export default async function MarketPage({ params }: { params: Promise<{ marketName: string }> }) {
  const { marketName } = await params;
  const data = fetchMarketData(marketName);

  // If fetchMarketData returns null, show a 404. This avoids trying to read properties of null.
  if (!data) return notFound();

  // Defensive defaults for rendering
  const priceHistory = Array.isArray(data.priceHistory) && data.priceHistory.length 
    ? data.priceHistory 
    : [{ date: new Date().toISOString().split('T')[0], price: 0 }];

  const currentPrice = getCurrentPrice(priceHistory);
  const previousPrice = getPreviousPrice(priceHistory);
  const priceChange = ((currentPrice - previousPrice) / previousPrice) * 100;
  const lowestPrice = getLowestPrice(priceHistory);
  const highestPrice = getHighestPrice(priceHistory);

  return (
    <div>
      <Navigation />
    <main className="max-w-6xl mx-auto px-4 py-12">
      {/* Header */}
      <section className="mb-8">
        <h1 className="text-4xl font-bold mb-2">{data.mineralName}</h1>
        <p className="text-gray-500">Updated: {data.lastUpdated ?? "Unknown"}</p>
      </section>

      {/* Key Stats Card */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="p-6 bg-white rounded-2xl shadow-sm border">
          <div className="text-gray-600 text-sm">Current Price</div>
          <div className="text-2xl font-semibold mt-2">${currentPrice.toFixed(2)}</div>
          <div className={"mt-1 text-sm " + (priceChange > 0 ? "text-green-600" : "text-red-600")}>
            {priceChange > 0 ? "+" : ""}
            {priceChange.toFixed(2)}%
          </div>
        </div>

        <div className="p-6 bg-white rounded-2xl shadow-sm border">
          <div className="text-gray-600 text-sm">Lowest Price</div>
          <div className="text-2xl font-semibold mt-2">
            ${lowestPrice.toFixed(2)}
          </div>
          <div className="mt-1 text-sm text-gray-500">Last 30 days</div>
        </div>

        <div className="p-6 bg-white rounded-2xl shadow-sm border">
          <div className="text-gray-600 text-sm">Highest Price</div>
          <div className="text-2xl font-semibold mt-2">
            ${highestPrice.toFixed(2)}
          </div>
          <div className="mt-1 text-sm text-gray-500">Last 30 days</div>
        </div>
      </section>

      {/* Price chart */}
      <section className="bg-white rounded-2xl border shadow-sm p-6 mb-12">
        <h2 className="text-xl font-semibold mb-4">Price History</h2>
        <MarketChart data={priceHistory} mineralName={data.mineralName}/>
      </section>

    </main>
    </div>
  );
}