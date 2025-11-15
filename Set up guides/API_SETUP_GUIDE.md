# Mineral Trading API Setup Guide

This guide will walk you through setting up the backend APIs for the mineral trading platform. We'll create three endpoints for **Oil**, **Gold**, and **Silver** that return date/time and price data.

## Architecture Overview

```
Frontend (Next.js) ─→ Backend API ─→ Database/Data Source
                        /minerals/oil
                        /minerals/gold
                        /minerals/silver
```

## Option 1: Node.js/Express Backend (Recommended for Quick Setup)

### Step 1: Create Backend Directory Structure

```bash
cd kubi-cohort-2025
mkdir backend
cd backend
npm init -y
```

### Step 2: Install Dependencies

```bash
npm install express cors dotenv axios
npm install --save-dev nodemon
```

### Step 3: Create .env File

```bash
# backend/.env
PORT=5000
NODE_ENV=development
API_URL=http://localhost:5000
```

### Step 4: Create Project Structure

```
backend/
├── server.js
├── routes/
│   └── minerals.js
├── controllers/
│   └── mineralController.js
├── data/
│   └── mockData.js
├── .env
└── package.json
```

### Step 5: Create Mock Data (`backend/data/mockData.js`)

```javascript
// Generate realistic mineral price history for the last 30 days
const generatePriceHistory = (startPrice, volatility = 0.02) => {
  const priceHistory = [];
  const today = new Date();
  let currentPrice = startPrice;

  for (let i = 29; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    
    // Add random daily volatility
    const change = (Math.random() - 0.5) * 2 * volatility;
    currentPrice = currentPrice * (1 + change);
    
    priceHistory.push({
      date: date.toISOString().split('T')[0], // YYYY-MM-DD format
      price: parseFloat(currentPrice.toFixed(2))
    });
  }

  return priceHistory;
};

module.exports = {
  minerals: {
    oil: {
      mineralName: 'Oil',
      symbol: 'WTI',
      lastUpdated: new Date().toISOString(),
      priceHistory: generatePriceHistory(76.45, 0.03)
    },
    gold: {
      mineralName: 'Gold',
      symbol: 'XAU',
      lastUpdated: new Date().toISOString(),
      priceHistory: generatePriceHistory(2089.30, 0.015)
    },
    silver: {
      mineralName: 'Silver',
      symbol: 'XAG',
      lastUpdated: new Date().toISOString(),
      priceHistory: generatePriceHistory(31.20, 0.02)
    }
  }
};
```

### Step 6: Create Mineral Controller (`backend/controllers/mineralController.js`)

```javascript
const mockData = require('../data/mockData');

exports.getMineralData = (req, res) => {
  try {
    const { mineralName } = req.params;
    const mineral = mockData.minerals[mineralName.toLowerCase()];

    if (!mineral) {
      return res.status(404).json({
        error: `Mineral '${mineralName}' not found`,
        available: Object.keys(mockData.minerals)
      });
    }

    res.json(mineral);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error', message: error.message });
  }
};

exports.getAllMinerals = (req, res) => {
  try {
    const minerals = Object.entries(mockData.minerals).map(([key, value]) => ({
      id: key,
      name: value.mineralName,
      symbol: value.symbol,
      currentPrice: value.priceHistory[value.priceHistory.length - 1].price,
      lastUpdated: value.lastUpdated
    }));

    res.json(minerals);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error', message: error.message });
  }
};
```

### Step 7: Create Routes (`backend/routes/minerals.js`)

```javascript
const express = require('express');
const router = express.Router();
const mineralController = require('../controllers/mineralController');

// GET all minerals
router.get('/', mineralController.getAllMinerals);

// GET specific mineral data
router.get('/:mineralName', mineralController.getMineralData);

module.exports = router;
```

### Step 8: Create Main Server (`backend/server.js`)

```javascript
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const mineralRoutes = require('./routes/minerals');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? 'https://yourdomain.com' 
    : 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());

// Routes
app.use('/minerals', mineralRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ 
    error: 'Internal server error', 
    message: process.env.NODE_ENV === 'development' ? err.message : undefined 
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📊 Minerals API: http://localhost:${PORT}/minerals`);
});
```

### Step 9: Update package.json Scripts

```json
{
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  }
}
```

### Step 10: Run the Backend

```bash
npm run dev
```

You should see:
```
🚀 Server running on http://localhost:5000
📊 Minerals API: http://localhost:5000/minerals
```

---

## Option 2: Using Real Commodity Data (Alpha Vantage or Similar)

If you want real commodity prices instead of mock data, you can integrate with APIs like:

### Alpha Vantage (Recommended for commodities)

1. **Sign up**: https://www.alphavantage.co/
2. **Get API Key**: Free tier includes commodities data
3. **Update Mock Data to Fetch Real Data**:

```javascript
const axios = require('axios');

const ALPHA_VANTAGE_KEY = process.env.ALPHA_VANTAGE_KEY;
const BASE_URL = 'https://www.alphavantage.co/query';

const fetchRealCommodityData = async (commodity) => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        function: `${commodity}_MONTHLY`, // WTI_PRICE, GOLD, SILVER
        interval: 'monthly',
        apikey: ALPHA_VANTAGE_KEY
      }
    });
    // Parse and format response
    return formatCommodityData(response.data);
  } catch (error) {
    console.error('Failed to fetch real data, using mock:', error.message);
    // Fallback to mock data
  }
};
```

---

## Frontend Integration

### Step 1: Set Environment Variable

Create `frontend/.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

### Step 2: Verify API Integration

The frontend is already configured to call:
- `GET /minerals/oil` → Oil price data
- `GET /minerals/gold` → Gold price data  
- `GET /minerals/silver` → Silver price data

Expected Response Format:
```json
{
  "mineralName": "Oil",
  "symbol": "WTI",
  "lastUpdated": "2025-11-15T10:30:00.000Z",
  "priceHistory": [
    { "date": "2025-10-16", "price": 74.22 },
    { "date": "2025-10-17", "price": 75.10 },
    { "date": "2025-11-15", "price": 76.45 }
  ]
}
```

### Step 3: Test the Integration

```bash
# In a new terminal, from kubi-cohort-2025/frontend
npm run dev

# Visit http://localhost:3000
# Click on mineral cards to load data from your backend
```

---

## Testing Your APIs

### Using cURL

```bash
# Get all minerals
curl http://localhost:5000/minerals

# Get specific mineral
curl http://localhost:5000/minerals/oil
curl http://localhost:5000/minerals/gold
curl http://localhost:5000/minerals/silver

# Health check
curl http://localhost:5000/health
```

### Using Postman

1. Create a new collection called "Mineral Trading"
2. Add requests:
   - **GET** `{{BASE_URL}}/minerals`
   - **GET** `{{BASE_URL}}/minerals/oil`
   - **GET** `{{BASE_URL}}/minerals/gold`
   - **GET** `{{BASE_URL}}/minerals/silver`

Set variable: `BASE_URL = http://localhost:5000`

---

## Deployment Options

### Option A: Heroku (Easiest)

```bash
# Install Heroku CLI
# Login: heroku login
# Create app: heroku create mineral-trading-api
# Deploy: git push heroku main
# Set env vars: heroku config:set PORT=5000
```

### Option B: Railway.app

```bash
# Connect GitHub repo
# Railway auto-deploys on git push
# Set PORT environment variable
```

### Option C: AWS/DigitalOcean

Deploy as Docker container or traditional server.

---

## Next Steps

1. **Create the backend** following Steps 1-8 above
2. **Run backend locally**: `npm run dev`
3. **Update frontend `.env.local`** with `NEXT_PUBLIC_API_URL`
4. **Start frontend**: `npm run dev`
5. **Test the integration** by visiting http://localhost:3000

## Troubleshooting

| Issue | Solution |
|-------|----------|
| CORS errors | Ensure backend allows `http://localhost:3000` in CORS config |
| 404 on `/minerals` | Verify routes are registered in server.js |
| Frontend shows mock data | Check `NEXT_PUBLIC_API_URL` is set correctly |
| API returns 500 | Check backend logs for errors |

Need help with any step? Let me know!
