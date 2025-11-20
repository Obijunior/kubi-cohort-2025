// /frontend/app/api/xrp/route.ts
import { NextResponse } from "next/server";
import { getXRPPrice, convertUSDtoXRP, convertXRPtoUSD } from "@/../apis/src/services/xrpPriceService";

export async function GET() {
  const price = await getXRPPrice();
  return NextResponse.json({ price });
}

export async function POST(req: Request) {
  const body = await req.json();

  if (body.type === "usd-to-xrp") {
    const result = await convertUSDtoXRP(body.amount);
    return NextResponse.json({ xrp: result });
  }

  if (body.type === "xrp-to-usd") {
    const result = await convertXRPtoUSD(body.amount);
    return NextResponse.json({ usd: result });
  }

  return NextResponse.json({ error: "invalid type" }, { status: 400 });
}
