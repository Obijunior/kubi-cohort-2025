import { notFound } from "next/navigation";
import type { Metadata } from "next";
import MarketChart from "../../components/MarketChart";
import Navigation from "../../components/Navigation";

// --- Types ---
type MarketData = {
  mineralName: string;
  lastUpdated?: string;
  priceHistory: Array<{ date: string; price: number }>;
};

// --- Mock fallback (useful for local dev / tests) ---
const MOCK_MARKET: MarketData = {
  mineralName: '',
  lastUpdated: new Date().toISOString(),
  priceHistory: [
    { date: '2025-11-15', price: 76.45 },
    { date: '2025-11-14', price: 74.82 },
    { date: '2025-11-13', price: 75.30 },
  ],
};

// --- Robust fetcher ---
export async function fetchMarketData(mineral: string): Promise<MarketData | null> {
  const base = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

  let res: Response | null = null;
  try {
    // sanitize base to avoid double slashes
    const url = `${base.replace(/\/$/, "")}/minerals/${encodeURIComponent(mineral)}`;
    res = await fetch(url, { next: { revalidate: 60 } });
  } catch (err) {
    console.error("Fetch to API failed:", err);
    return null;
  }

  if (!res) {
    console.error("No response object received from fetch for mineral:", mineral);
    return null;
  }

  if (!res.ok) {
    console.error(`API returned non-OK status ${res.status} ${res.statusText} for ${mineral}`);
    return null;
  }

  // parse JSON with defensive checks
  try {
    // In some runtimes res.json() may reject — catch below will handle it
    const json = await res.json();
    if (!json || typeof json !== "object") {
      console.error("API returned invalid JSON shape for mineral:", mineral, json);
      return null;
    }

    // Map/validate fields into MarketData - only expecting date/time and price
    const data: MarketData = {
      mineralName: String(json.mineralName ?? json.mineral ?? mineral),
      lastUpdated: json.lastUpdated ? String(json.lastUpdated) : undefined,
      priceHistory: Array.isArray(json.priceHistory)
        ? json.priceHistory.map((p: Record<string, unknown>) => ({
            date: String(p.date ?? ""),
            price: typeof p.price === "number" ? p.price : 0,
          }))
        : [],
    };

    return data;
  } catch (err) {
    console.error("Failed to parse JSON from API for mineral:", mineral, err);
    return null;
  }
}

export async function generateMetadata({ params }: { params: Promise<{ marketName: string }> }): Promise<Metadata> {
  const { marketName } = await params;
  return { title: `${marketName} | Mineral Trading` };
}

export default async function MarketPage({ params }: { params: Promise<{ marketName: string }> }) {
  const { marketName } = await params;
  const data = await fetchMarketData(marketName);

  // If fetchMarketData returns null, show a 404. This avoids trying to read properties of null.
  if (!data) return notFound();

  // Defensive defaults for rendering
  const priceHistory = Array.isArray(data.priceHistory) && data.priceHistory.length 
    ? data.priceHistory 
    : [{ date: new Date().toISOString().split('T')[0], price: 0 }];

  const currentPrice = priceHistory[priceHistory.length - 1]?.price ?? 0;
  const previousPrice = priceHistory[priceHistory.length - 2]?.price ?? currentPrice;
  const priceChange = ((currentPrice - previousPrice) / previousPrice) * 100;

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
            ${Math.min(...priceHistory.map(p => p.price)).toFixed(2)}
          </div>
          <div className="mt-1 text-sm text-gray-500">Last 30 days</div>
        </div>

        <div className="p-6 bg-white rounded-2xl shadow-sm border">
          <div className="text-gray-600 text-sm">Highest Price</div>
          <div className="text-2xl font-semibold mt-2">
            ${Math.max(...priceHistory.map(p => p.price)).toFixed(2)}
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