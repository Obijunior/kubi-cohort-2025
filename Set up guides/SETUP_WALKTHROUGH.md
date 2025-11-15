# 🎯 Step-by-Step API Setup Walkthrough

Follow these exact steps to get your mineral trading API running.

## Phase 1: Backend Setup (5 minutes)

### Step 1.1: Navigate to Backend Directory
```powershell
cd c:\Users\obijr\Downloads\kubi-cohort-2025\backend
```

### Step 1.2: Install Dependencies
```powershell
npm install
```

**Output you should see:**
```
npm notice
npm notice New minor version of npm available! 9.6.7 -> 10.2.0
npm notice To update run: npm install -g npm@10.2.0
npm notice
added 50 packages, and audited 51 packages in 3s
```

### Step 1.3: Verify Installation
```powershell
npm list
```

Should show:
```
mineral-trading-backend@1.0.0
├── cors@2.8.5
├── dotenv@16.3.1
└── express@4.18.2
```

### Step 1.4: Start Backend Server
```powershell
npm run dev
```

**Expected output:**
```
========================================
🚀 Mineral Trading Backend Started
========================================
📍 Server: http://localhost:5000
📊 Minerals API: http://localhost:5000/minerals
💚 Health Check: http://localhost:5000/health
🔗 CORS Origin: http://localhost:3000
========================================

📍 GET /minerals
📍 GET /minerals
```

✅ **Backend is running!** Leave this terminal open.

---

## Phase 2: Test Backend API (2 minutes)

### Step 2.1: Open New PowerShell Terminal

### Step 2.2: Test Health Endpoint
```powershell
Invoke-WebRequest -Uri "http://localhost:5000/health" | Select-Object -ExpandProperty Content | ConvertFrom-Json
```

Should return:
```
status          : OK
timestamp       : 2025-11-15T10:30:45.123Z
uptime          : 5.234
```

### Step 2.3: Test Get All Minerals
```powershell
Invoke-WebRequest -Uri "http://localhost:5000/minerals" | Select-Object -ExpandProperty Content | ConvertFrom-Json
```

Should return:
```
id              : oil
name            : Oil
symbol          : WTI
currentPrice    : 76.45
lastUpdated     : 2025-11-15T10:30:45.123Z

id              : gold
name            : Gold
symbol          : XAU
currentPrice    : 2089.30
lastUpdated     : 2025-11-15T10:30:45.123Z

id              : silver
name            : Silver
symbol          : XAG
currentPrice    : 31.20
lastUpdated     : 2025-11-15T10:30:45.123Z
```

### Step 2.4: Test Get Specific Mineral
```powershell
Invoke-WebRequest -Uri "http://localhost:5000/minerals/oil" | Select-Object -ExpandProperty Content | ConvertFrom-Json
```

Should return:
```
mineralName : Oil
symbol      : WTI
lastUpdated : 2025-11-15T10:30:45.123Z
priceHistory: {
  {date: 2025-10-16, price: 74.22},
  {date: 2025-10-17, price: 75.10},
  ...
  {date: 2025-11-15, price: 76.45}
}
```

### Step 2.5: Test All Three Minerals
```powershell
Invoke-WebRequest -Uri "http://localhost:5000/minerals/gold" | Select-Object -ExpandProperty Content | ConvertFrom-Json | Select -First 1
Invoke-WebRequest -Uri "http://localhost:5000/minerals/silver" | Select-Object -ExpandProperty Content | ConvertFrom-Json | Select -First 1
```

✅ **API is working!**

---

## Phase 3: Frontend Setup (5 minutes)

### Step 3.1: Open New Terminal (Keep Backend Running)

### Step 3.2: Navigate to Frontend Directory
```powershell
cd c:\Users\obijr\Downloads\kubi-cohort-2025\frontend
```

### Step 3.3: Check .env.local File
```powershell
cat .env.local
```

Should show:
```
NEXT_PUBLIC_API_URL=http://localhost:5000
```

✅ Already configured!

### Step 3.4: Install Frontend Dependencies
```powershell
npm install
```

### Step 3.5: Start Frontend Server
```powershell
npm run dev
```

**Expected output:**
```
✓ Ready in 2.5s

➜  Local:   http://localhost:3000
➜  Modules: node_modules
```

---

## Phase 4: Test Full Integration (5 minutes)

### Step 4.1: Open Browser

Navigate to **http://localhost:3000**

You should see:
- Hero section with "Mineral Trading" theme
- Three mineral cards: Oil, Gold, Silver
- Each showing current price and 24h volume

### Step 4.2: Click on a Mineral Card

Click on **Oil** card → Should navigate to `/markets/oil`

You should see:
- Oil price chart loading
- Current price, lowest price, highest price stats
- Price history chart rendering with data from your backend

### Step 4.3: Check Browser Console

Press `F12` → Go to **Network** tab

Click on a mineral card again. You should see:
```
GET http://localhost:5000/minerals/oil     200 OK
GET http://localhost:5000/minerals/gold    200 OK
GET http://localhost:5000/minerals/silver  200 OK
```

### Step 4.4: Test All Three Minerals

1. Click **Oil** → See oil price chart ✅
2. Click **Gold** → See gold price chart ✅
3. Click **Silver** → See silver price chart ✅

✅ **Full integration is working!**

---

## Phase 5: Verify Complete Setup

### Checklist

- [ ] Backend running on `http://localhost:5000`
- [ ] Frontend running on `http://localhost:3000`
- [ ] Can see all 3 minerals on home page
- [ ] Can click mineral cards and see price charts
- [ ] API returns proper data format
- [ ] No CORS errors in browser console
- [ ] `.env.local` has correct API URL

---

## 🎉 Success! Your API is Ready

You now have:

✅ **Backend API** serving mineral price data  
✅ **Frontend** displaying and fetching data  
✅ **CORS** properly configured  
✅ **Mock data** with 30 days of price history  
✅ **Price charts** working in real-time  

---

## 🚀 What to Do Next

### Keep Both Servers Running
- Terminal 1: Backend (`npm run dev`)
- Terminal 2: Frontend (`npm run dev`)

### Make Changes
Edit files and both will auto-reload:
- Backend: Changes to `server.js` auto-refresh
- Frontend: Changes to components auto-refresh in browser

### Try These Next Steps

1. **Change Mock Data**
   - Edit `backend/data/mockData.js`
   - Adjust starting prices or volatility
   - Restart backend to see changes

2. **Add Real Data**
   - Get API key from alphavantage.co
   - Follow instructions in `API_SETUP_GUIDE.md`
   - Replace mock data with real commodity prices

3. **Deploy**
   - Backend to Heroku/Railway
   - Frontend to Vercel
   - See `API_SETUP_GUIDE.md` for detailed steps

4. **Add Features**
   - User authentication
   - Trading functionality
   - Historical comparisons
   - Alerts & notifications

---

## 🐛 Quick Troubleshooting

### Backend won't start
```powershell
# Check if port 5000 is in use
netstat -ano | findstr :5000

# Kill the process using port 5000
taskkill /PID <PID> /F

# Restart backend
npm run dev
```

### Frontend shows blank page
```powershell
# Check browser console (F12) for errors
# Verify NEXT_PUBLIC_API_URL in frontend/.env.local
# Restart frontend: Ctrl+C, then npm run dev
```

### CORS errors
```
Access to XMLHttpRequest from 'http://localhost:3000' has been blocked by CORS policy
```

**Fix:** Check `backend/.env` - `CORS_ORIGIN` should be `http://localhost:3000`

---

## 📊 Architecture Diagram

```
┌─────────────────────────────────────────────────────────┐
│              Browser (localhost:3000)                   │
│  ┌────────────────────────────────────────────────────┐ │
│  │  Next.js Frontend                                  │ │
│  │  - Hero Section                                    │ │
│  │  - Markets Section (3 minerals)                   │ │
│  │  - Market Detail Pages (/markets/[mineral])      │ │
│  │  - Price Charts (Recharts)                        │ │
│  └────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────┘
                         ↓ HTTP
            Fetch requests to /minerals/*
                         ↓ HTTP
┌─────────────────────────────────────────────────────────┐
│              Backend (localhost:5000)                    │
│  ┌────────────────────────────────────────────────────┐ │
│  │  Express.js API Server                             │ │
│  │  ┌──────────────────────────────────────────────┐  │ │
│  │  │  Routes                                      │  │ │
│  │  │  GET /minerals               (all minerals)  │  │ │
│  │  │  GET /minerals/oil           (oil data)      │  │ │
│  │  │  GET /minerals/gold          (gold data)     │  │ │
│  │  │  GET /minerals/silver        (silver data)   │  │ │
│  │  └──────────────────────────────────────────────┘  │ │
│  │           ↓ Calls ↓                                 │ │
│  │  ┌──────────────────────────────────────────────┐  │ │
│  │  │  Controllers                                 │  │ │
│  │  │  - getMineralData()                          │  │ │
│  │  │  - getAllMinerals()                          │  │ │
│  │  └──────────────────────────────────────────────┘  │ │
│  │           ↓ Queries ↓                               │ │
│  │  ┌──────────────────────────────────────────────┐  │ │
│  │  │  Mock Data (mockData.js)                    │  │ │
│  │  │  - Oil: 30-day history                      │  │ │
│  │  │  - Gold: 30-day history                     │  │ │
│  │  │  - Silver: 30-day history                   │  │ │
│  │  └──────────────────────────────────────────────┘  │ │
│  └────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────┘
```

---

## 📞 Support

For detailed information, see:
- `QUICK_START.md` - Quick reference
- `API_SETUP_GUIDE.md` - Comprehensive guide
- `backend/README.md` - Backend documentation

**You're all set! 🎉**
