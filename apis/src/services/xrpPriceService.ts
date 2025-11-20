import axios from 'axios';

interface XRPPrice {
  usd: number;
  timestamp: number;
}

// Get current XRP price in USD
export async function getXRPPrice(): Promise<number> {
  try {
    // Using CoinGecko API (free, no key required)
    const response = await axios.get(
      'https://api.coingecko.com/api/v3/simple/price?ids=ripple&vs_currencies=usd'
    );
    
    return response.data.ripple.usd;
  } catch (error) {
    console.error('Error fetching XRP price:', error);
    // Fallback price if API fails
    return 0.50; // Default ~$0.50 per XRP
  }
}

// Convert USD amount to XRP
export async function convertUSDtoXRP(usdAmount: number): Promise<number> {
  const xrpPrice = await getXRPPrice();
  const xrpAmount = usdAmount / xrpPrice;
  return parseFloat(xrpAmount.toFixed(6)); // 6 decimal places
}

// Convert XRP amount to USD
export async function convertXRPtoUSD(xrpAmount: number): Promise<number> {
  const xrpPrice = await getXRPPrice();
  const usdAmount = xrpAmount * xrpPrice;
  return parseFloat(usdAmount.toFixed(2)); // 2 decimal places
}