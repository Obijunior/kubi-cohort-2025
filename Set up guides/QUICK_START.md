# 🚀 API Setup Complete!

Your mineral trading backend API is now ready to go. Here's everything you need to know:

## 📁 Project Structure

```
kubi-cohort-2025/
├── frontend/                    # Next.js React app
│   ├── app/
│   ├── package.json
│   ├── .env.local              # ✨ NEW - API URL configured
│   └── tsconfig.json
│
├── backend/                     # ✨ NEW Express API
│   ├── server.js               # Main server
│   ├── routes/
│   │   └── minerals.js         # API routes
│   ├── controllers/
│   │   └── mineralController.js # Business logic
│   ├── data/
│   │   └── mockData.js         # Mock mineral data
│   ├── package.json
│   ├── .env                    # Environment config
│   ├── .gitignore
│   └── README.md
│
├── API_SETUP_GUIDE.md          # Comprehensive guide
├── setup.sh                     # Setup script (macOS/Linux)
├── setup.ps1                    # Setup script (Windows)
└── README.md
```

## ⚡ Quick Start (3 Steps)

### Step 1: Install Backend Dependencies

```powershell
cd backend
npm install
```

### Step 2: Start Backend Server

```powershell
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

### Step 3: Start Frontend (in new terminal)

```powershell
cd frontend
npm run dev
```

Visit **http://localhost:3000** and click on mineral cards!

---

## 📊 API Endpoints

All endpoints return the expected data format for your frontend:

### 1. Get All Minerals
```
GET http://localhost:5000/minerals
```

Returns summary of all 3 minerals with current prices.

### 2. Get Oil Prices
```
GET http://localhost:5000/minerals/oil
```

### 3. Get Gold Prices
```
GET http://localhost:5000/minerals/gold
```

### 4. Get Silver Prices
```
GET http://localhost:5000/minerals/silver
```

**Example Response:**
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

---

## 🧪 Test Your API

### Option 1: Using Browser

Visit in your browser:
- http://localhost:5000/minerals
- http://localhost:5000/minerals/oil
- http://localhost:5000/minerals/gold
- http://localhost:5000/minerals/silver

### Option 2: Using PowerShell

```powershell
# Get all minerals
Invoke-WebRequest -Uri "http://localhost:5000/minerals" -Method Get | ConvertFrom-Json

# Get oil data
Invoke-WebRequest -Uri "http://localhost:5000/minerals/oil" -Method Get | ConvertFrom-Json
```

### Option 3: Using cURL

```bash
curl http://localhost:5000/minerals
curl http://localhost:5000/minerals/oil
```

---

## 🔧 Configuration

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

### Backend (.env)
```env
PORT=5000
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000
```

---

## 📈 Mock Data

The backend generates realistic price data with daily volatility:

- **Oil (WTI)**: Starting at $76.45 with ±3% daily volatility
- **Gold (XAU)**: Starting at $2,089.30 with ±1.5% daily volatility
- **Silver (XAG)**: Starting at $31.20 with ±2% daily volatility

Price data auto-refreshes daily with new volatility on each server restart.

---

## 🚀 Next Steps

### Immediate (Today)
- [x] Install backend dependencies
- [x] Start backend server
- [x] Test API endpoints
- [x] Start frontend and verify integration

### Short-term (This Week)
- [ ] Add real commodity data (Alpha Vantage API)
- [ ] Add database persistence (MongoDB/PostgreSQL)
- [ ] Add authentication (JWT)
- [ ] Add trading functionality

### Medium-term (This Month)
- [ ] Deploy backend to Heroku/Railway
- [ ] Deploy frontend to Vercel
- [ ] Set up CI/CD pipeline
- [ ] Add unit tests

---

## 📚 Integration with Real Data

When ready to use real commodity prices, update `backend/data/mockData.js`:

### Option A: Alpha Vantage (Recommended)
```javascript
const axios = require('axios');

const getRealCommodityData = async (commodity) => {
  const response = await axios.get('https://www.alphavantage.co/query', {
    params: {
      function: `${commodity}_MONTHLY`,
      apikey: process.env.ALPHA_VANTAGE_KEY
    }
  });
  return formatData(response.data);
};
```

### Option B: Use CSV/Database
Replace mock data with database queries or CSV files.

See `API_SETUP_GUIDE.md` for detailed integration instructions.

---

## 🐛 Troubleshooting

| Problem | Solution |
|---------|----------|
| Port 5000 already in use | Change `PORT` in `.env` or kill process using port 5000 |
| CORS errors in console | Check `CORS_ORIGIN` matches frontend URL in `.env` |
| Frontend shows mock data | Verify `NEXT_PUBLIC_API_URL` in `frontend/.env.local` |
| API returns 404 | Check mineral name is lowercase: `/minerals/oil` not `/minerals/Oil` |
| "Cannot GET /" error | Backend is running but you hit root - use `/minerals` instead |

---

## 📱 Example Frontend Integration

The frontend already has this integration in place:

```typescript
// Automatically called when visiting /markets/oil, /markets/gold, /markets/silver
export async function fetchMarketData(mineral: string) {
  const base = process.env.NEXT_PUBLIC_API_URL;
  const response = await fetch(`${base}/minerals/${mineral}`);
  const data = await response.json();
  return data; // Contains priceHistory for charting
}
```

---

## 🎯 What's Next?

Your app is now set up with:

✅ Mock commodity price data  
✅ REST API serving mineral data  
✅ Frontend connected to backend  
✅ Beautiful charts showing price history  
✅ CORS configured for local development  

You can now:
1. Start trading functionality
2. Add user authentication
3. Integrate real commodity data
4. Deploy to production

---

## 📞 Need Help?

- Check `API_SETUP_GUIDE.md` for detailed setup instructions
- Check `backend/README.md` for API documentation
- Review `frontend/.env.local` and `backend/.env` configurations
- Test endpoints in browser or Postman

---

**Happy trading! 📈💰**
