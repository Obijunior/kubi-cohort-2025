import { notFound } from "next/navigation";
import type { Metadata } from "next";

// --- Types ---
type KPI = { label: string; value: string | number; delta?: number | null };

// Breakdown item type for market breakdown lists
type BreakdownItem = { label: string; value: string | number };

type MarketData = {
  marketName: string;
  lastUpdated?: string;
  kpis?: KPI[];
  breakdown?: BreakdownItem[];
  // extend with other fields as needed (priceSeries, supply, etc.)
};

// --- Mock fallback (useful for local dev / tests) ---
const MOCK_MARKET: MarketData = {
  marketName: '',
  lastUpdated: new Date().toISOString(),
  kpis: [
    { label: "Average Price per sq foot", value: "$350.32", delta: 2.3 },
    { label: "Inventory", value: 120 },
    { label: "Monthly Change", value: "-1.4%", delta: -1.4 },
  ],
  breakdown: [
    { label: "Average Days on Market", value: 28 },
    { label: "Listings", value: 512 },
  ],
};

// --- Robust fetcher ---
export async function fetchMarketData(market: string): Promise<MarketData | null> {
  const base = process.env.NEXT_PUBLIC_API_URL;

  // If no base URL is set, return mock data (avoid runtime null errors).
  // In production you may prefer to throw or return null instead.
  if (!base) {
    console.warn("NEXT_PUBLIC_API_URL not set — returning MOCK_MARKET for", market);
    // If you prefer to return null so the page 404s, change this to 'return null;'
    return { ...MOCK_MARKET, marketName: `${MOCK_MARKET.marketName} ${market.charAt(0).toUpperCase()}${market.slice(1)}` };
  }

  let res: Response | null = null;
  try {
    // sanitize base to avoid double slashes
    const url = `${base.replace(/\/$/, "")}/markets/${encodeURIComponent(market)}`;
    res = await fetch(url, { next: { revalidate: 60 } });
  } catch (err) {
    console.error("Fetch to API failed:", err);
    return null;
  }

  if (!res) {
    console.error("No response object received from fetch for market:", market);
    return null;
  }

  if (!res.ok) {
    console.error(`API returned non-OK status ${res.status} ${res.statusText} for ${market}`);
    return null;
  }

  // parse JSON with defensive checks
  try {
    // In some runtimes res.json() may reject — catch below will handle it
    const json = await res.json();
    if (!json || typeof json !== "object") {
      console.error("API returned invalid JSON shape for market:", market, json);
      return null;
    }

    // Map/validate fields into MarketData
    const data: MarketData = {
      marketName: String(json.marketName ?? json.market ?? market),
      lastUpdated: json.lastUpdated ? String(json.lastUpdated) : undefined,
      kpis: Array.isArray(json.kpis)
        ? json.kpis.map((k: Record<string, unknown>) => ({
            label: String(k.label ?? ""),
            value: k.value ?? "-",
            delta: typeof k.delta === "number" ? k.delta : null,
          }))
        : [],
      breakdown: Array.isArray(json.breakdown)
        ? json.breakdown.map((b: Record<string, unknown>) => ({ label: String(b.label ?? ""), value: b.value ?? "-" }))
        : [],
    };

    return data;
  } catch (err) {
    console.error("Failed to parse JSON from API for market:", market, err);
    return null;
  }
}

export async function generateMetadata({ params }: { params: Promise<{ marketName: string }> }): Promise<Metadata> {
  const { marketName } = await params;
  return { title: `${marketName} Market | Web3 Real Estate` };
}

export default async function MarketPage({ params }: { params: Promise<{ marketName: string }> }) {
  const { marketName } = await params;
  const data = await fetchMarketData(marketName);

  // If fetchMarketData returns null, show a 404. This avoids trying to read properties of null.
  if (!data) return notFound();

  // Defensive defaults for rendering
  const kpis = Array.isArray(data.kpis) && data.kpis.length ? data.kpis : [{ label: "No KPIs", value: "—" }];
  const breakdown = Array.isArray(data.breakdown) && data.breakdown.length ? data.breakdown : [{ label: "No data", value: "—" }];

  return (
    <main className="max-w-6xl mx-auto px-4 py-12">
      {/* Header */}
      <section className="mb-8">
        <h1 className="text-4xl font-bold mb-2">{data.marketName}</h1>
        <p className="text-gray-500">Updated: {data.lastUpdated ?? "Unknown"}</p>
      </section>

      {/* KPI cards */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {kpis.map((kpi) => (
          <div key={kpi.label} className="p-6 bg-white rounded-2xl shadow-sm border">
            <div className="text-gray-600 text-sm">{kpi.label}</div>
            <div className="text-2xl font-semibold mt-2">{String(kpi.value)}</div>
            {typeof kpi.delta === "number" && (
              <div className={"mt-1 text-sm " + (kpi.delta > 0 ? "text-green-600" : "text-red-600")}>
                {kpi.delta > 0 ? "+" : ""}
                {kpi.delta}%
              </div>
            )}
          </div>
        ))}
      </section>

      {/* Price chart placeholder */}
      <section className="bg-white rounded-2xl border shadow-sm p-6 mb-12">
        <h2 className="text-xl font-semibold mb-4">Price Index</h2>
        {/* Replace with actual chart (recharts / chart.js). Using a placeholder avoids chart runtime errors. */}
        <div className="h-64 flex items-center justify-center text-gray-400">[Chart goes here]</div>
      </section>

      {/* Additional data section */}
      <section className="bg-white rounded-2xl border shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-4">Market Breakdown</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          {breakdown.map((item) => (
            <li key={item.label}>
              <span className="font-medium">{item.label}:</span> {String(item.value)}
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}