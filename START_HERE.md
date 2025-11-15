# 🎯 API SETUP - COMPLETE WALKTHROUGH

Follow these commands **exactly** to get your mineral trading API running.

---

## ⚡ The 3-Minute Fast Track

### Terminal 1: Backend Setup
```powershell
cd C:\Users\obijr\Downloads\kubi-cohort-2025\backend
npm install
npm run dev
```

You should see:
```
========================================
🚀 Mineral Trading Backend Started
========================================
📍 Server: http://localhost:5000
📊 Minerals API: http://localhost:5000/minerals
💚 Health Check: http://localhost:5000/health
🔗 CORS Origin: http://localhost:3000
========================================
```

**✅ Leave this running. Open a NEW terminal.**

---

### Terminal 2: Frontend Setup
```powershell
cd C:\Users\obijr\Downloads\kubi-cohort-2025\frontend
npm run dev
```

You should see:
```
✓ Ready in 2.5s

➜  Local:   http://localhost:3000
```

**✅ Go to http://localhost:3000**

---

## 🧪 Test It Works

### In Your Browser

1. Visit **http://localhost:3000**
   - You should see 3 mineral cards (Oil, Gold, Silver)

2. Click on **Oil** card
   - You should see a price chart load
   - Data comes from your backend API at `http://localhost:5000`

3. Click on **Gold** and **Silver** cards
   - Same behavior, different data

---

## 📊 What's Happening Behind the Scenes

```
┌─────────────────────────┐
│   Browser              │
│ http://localhost:3000  │
│                       │
│  [Oil] [Gold] [Silver]│
└──────────────┬─────────┘
               │ Click "Oil"
               │
               ▼
┌─────────────────────────────────────────────────────┐
│   Your React App                                   │
│   (Next.js running on port 3000)                  │
│                                                    │
│   Calls: fetch('http://localhost:5000/minerals/oil')
└──────────────┬─────────────────────────────────────┘
               │ HTTP Request
               │
               ▼
┌─────────────────────────────────────────────────────┐
│   Your Backend API                                 │
│   (Express.js running on port 5000)               │
│                                                    │
│   Route: GET /minerals/oil                        │
│   ├─ Reads from mockData.js                       │
│   └─ Returns: 30 days of oil prices               │
└──────────────┬─────────────────────────────────────┘
               │ JSON Response
               │
               ▼
┌─────────────────────────────────────────────────────┐
│   Your React App                                   │
│   Receives: { mineralName, symbol,               │
│               lastUpdated, priceHistory }         │
└──────────────┬─────────────────────────────────────┘
               │ Render with Recharts
               │
               ▼
┌─────────────────────────────────────────────────────┐
│   Browser                                          │
│   ✅ Price chart displays with 30-day history     │
│   ✅ Current price: $76.45                        │
│   ✅ Highest/Lowest prices shown                  │
└─────────────────────────────────────────────────────┘
```

---

## 🔗 API Endpoints Reference

### Check if API is working

**In Browser:**
```
http://localhost:5000/health
http://localhost:5000/minerals
http://localhost:5000/minerals/oil
http://localhost:5000/minerals/gold
http://localhost:5000/minerals/silver
```

**In PowerShell:**
```powershell
# Get all minerals
Invoke-WebRequest -Uri "http://localhost:5000/minerals" | ConvertFrom-Json

# Get oil data
Invoke-WebRequest -Uri "http://localhost:5000/minerals/oil" | ConvertFrom-Json | Select -First 1

# Pretty print
Invoke-WebRequest -Uri "http://localhost:5000/minerals/oil" | ConvertFrom-Json | ConvertTo-Json
```

---

## 📁 File Structure Created

```
kubi-cohort-2025/
├── backend/ .......................... ✨ NEW
│   ├── server.js ..................... Main API server
│   ├── routes/minerals.js ............ API routes
│   ├── controllers/mineralController.js  Request handlers
│   ├── data/mockData.js ............. Mock commodity data
│   ├── package.json ................. Dependencies
│   ├── .env ......................... Config (PORT=5000)
│   └── README.md
│
├── frontend/
│   ├── .env.local ................... ✨ UPDATED
│   │  └─ NEXT_PUBLIC_API_URL=http://localhost:5000
│   ├── app/markets/[marketName]/page.tsx
│   └── ...
│
├── API_SETUP_GUIDE.md ............... ✨ Comprehensive guide
├── QUICK_START.md ................... ✨ Quick reference
├── SETUP_WALKTHROUGH.md ............. ✨ This file with commands
├── API_SETUP_SUMMARY.md ............. ✨ Summary & next steps
└── Mineral_Trading_API.postman_collection.json  ✨ Postman tests
```

---

## 🔧 Configuration Explained

### Backend (.env)
```env
PORT=5000                    # Where backend runs
NODE_ENV=development         # Development mode
CORS_ORIGIN=http://localhost:3000  # Frontend URL (allows requests from frontend)
```

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:5000  # Where backend is
```

These must match for everything to work!

---

## 📝 Response Examples

### GET /minerals/oil
```json
{
  "mineralName": "Oil",
  "symbol": "WTI",
  "lastUpdated": "2025-11-15T15:30:45.123Z",
  "priceHistory": [
    { "date": "2025-10-16", "price": 74.22 },
    { "date": "2025-10-17", "price": 75.10 },
    { "date": "2025-10-18", "price": 73.99 },
    ...
    { "date": "2025-11-15", "price": 76.45 }
  ]
}
```

This data is used to:
- Calculate current price: `76.45`
- Calculate price change: `(76.45 - 73.99) / 73.99 * 100 = 3.33%`
- Draw the price chart with Recharts
- Show highest/lowest prices

---

## ✅ Verification Steps

**Step 1: Check Backend is Running**
```powershell
curl http://localhost:5000/health
```
Should return status: OK

**Step 2: Check API Endpoints Work**
```powershell
curl http://localhost:5000/minerals/oil
```
Should return JSON with oil price data

**Step 3: Check Frontend Loads**
```
http://localhost:3000
```
Should show 3 mineral cards

**Step 4: Check Integration Works**
1. Click on Oil card
2. Press F12 (open DevTools)
3. Go to Network tab
4. Should see GET request to `http://localhost:5000/minerals/oil`
5. Status should be 200
6. Response should show priceHistory

**Step 5: Check Chart Renders**
- Price chart should display
- Shows 30 days of data
- Has current price, high, low cards

---

## 🚨 Troubleshooting

### Backend won't start
```powershell
# Error: Port 5000 already in use
# Solution: Find and kill the process
netstat -ano | findstr :5000
taskkill /PID <PID> /F
npm run dev
```

### Frontend shows blank page
```powershell
# Error: Console shows fetch error
# Solution: Check NEXT_PUBLIC_API_URL
cat frontend/.env.local
# Should be: NEXT_PUBLIC_API_URL=http://localhost:5000

# Restart frontend
npm run dev
```

### CORS error in console
```
Access to XMLHttpRequest at 'http://localhost:5000/minerals/oil' from origin 
'http://localhost:3000' has been blocked by CORS policy
```

**Solution:** Check backend `.env`
```env
CORS_ORIGIN=http://localhost:3000  # Must match frontend URL
```

### 404 on mineral routes
```
GET http://localhost:5000/minerals/Oil  404
```

**Solution:** Mineral names are lowercase
```
Use: http://localhost:5000/minerals/oil
Not: http://localhost:5000/minerals/Oil
```

---

## 🎯 What You Have Now

✅ **Working Backend API** serving mineral data  
✅ **Working Frontend** displaying mineral cards  
✅ **CORS configured** so they can talk to each other  
✅ **Mock data** with realistic 30-day price history  
✅ **Price charts** showing oil/gold/silver prices  
✅ **No database needed** (data is in-memory, resets on restart)  

---

## 🚀 Next Steps

### Today - Get it running (you are here!)
1. Start backend: `npm run dev` in backend folder
2. Start frontend: `npm run dev` in frontend folder
3. Visit http://localhost:3000
4. Click on minerals, see charts

### Tomorrow - Add Features
- User authentication (sign up, login)
- Trading functionality (buy/sell tokens)
- Portfolio tracking
- Price alerts

### This Week - Upgrade Data
- Replace mock data with real commodity prices
- Options: Alpha Vantage, Finnhub, IEX Cloud
- See `API_SETUP_GUIDE.md` for instructions

### This Month - Deploy
- Backend to Heroku or Railway
- Frontend to Vercel
- Set up CI/CD pipeline
- Add unit tests

---

## 📚 Documentation

| File | Contains |
|------|----------|
| `API_SETUP_GUIDE.md` | Comprehensive setup + deployment + real data integration |
| `QUICK_START.md` | Quick reference + troubleshooting |
| `SETUP_WALKTHROUGH.md` | Commands you should run (this file) |
| `backend/README.md` | API documentation |
| `API_SETUP_SUMMARY.md` | High-level overview |

---

## 🎉 You're All Set!

Just run those 3 commands above and you'll have:
- ✅ Working backend API
- ✅ Working frontend app
- ✅ Real price charts
- ✅ Full mineral trading UI

**Now go build something awesome! 🚀**

---

## 💡 Pro Tips

### Keep servers running during development
- Terminal 1: Backend (`npm run dev`)
- Terminal 2: Frontend (`npm run dev`)
- They'll auto-reload when you make changes

### Test your changes
- Change a price in `backend/data/mockData.js`
- Restart backend
- Visit frontend, click a mineral
- See your changes reflected in the chart

### Monitor requests
- Press F12 in browser
- Go to Network tab
- Watch API calls happen in real-time
- Inspect request/response data

---

**Questions? Check the docs or let me know! 🎯**
