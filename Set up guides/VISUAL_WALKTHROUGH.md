# 📖 Complete API Setup Guide - Visual Walkthrough

## 🎯 The Big Picture

```
YOUR COMPUTER
├─────────────────────────────────────────────────────────┐
│                                                         │
│  Terminal 1                Terminal 2                  │
│  ┌──────────────┐         ┌──────────────┐             │
│  │ cd backend   │         │ cd frontend  │             │
│  │ npm run dev  │         │ npm run dev  │             │
│  └──────┬───────┘         └──────┬───────┘             │
│         │                        │                     │
│         ▼                        ▼                     │
│  ┌──────────────┐         ┌──────────────┐             │
│  │ Port 5000    │         │ Port 3000    │             │
│  │ Backend API  │◄───────►│ Frontend App │             │
│  │ • /minerals  │  HTTP   │ • Charts     │             │
│  │ • /health    │ Requests│ • Cards      │             │
│  └──────────────┘         └──────┬───────┘             │
│         ▲                        │                     │
│         │                        ▼                     │
│         │                  ┌──────────────┐             │
│         │                  │  Browser     │             │
│         │                  │ localhost:   │             │
│         └──────────────────│ 3000         │             │
│         HTTP GET           │              │             │
│         /minerals/oil       └──────────────┘             │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

## 📦 What You Have

### Backend (Port 5000)
```
server.js
├─ Express app
├─ CORS enabled (allows frontend to connect)
├─ Routes: /minerals, /minerals/:name
└─ Serves mock data with 30-day price history
```

### Frontend (Port 3000)
```
Next.js app
├─ Home page with 3 mineral cards
├─ Mineral detail pages with charts
├─ Fetches from backend at http://localhost:5000
└─ Displays price charts with Recharts
```

### Mock Data
```
3 minerals with realistic price movements:
├─ Oil (WTI): $76.45 baseline, ±3% daily
├─ Gold (XAU): $2,089.30 baseline, ±1.5% daily
└─ Silver (XAG): $31.20 baseline, ±2% daily
```

---

## 🚀 Running It - Visual Flow

### Step 1: Open Terminal 1
```
C:\Users\obijr\Downloads\kubi-cohort-2025>
```

### Step 2: Navigate to Backend
```
C:\Users\obijr\Downloads\kubi-cohort-2025> cd backend

C:\Users\obijr\Downloads\kubi-cohort-2025\backend>
```

### Step 3: Install & Start
```
C:\Users\obijr\Downloads\kubi-cohort-2025\backend> npm install
...installing packages...

C:\Users\obijr\Downloads\kubi-cohort-2025\backend> npm run dev

========================================
🚀 Mineral Trading Backend Started
========================================
📍 Server: http://localhost:5000
📊 Minerals API: http://localhost:5000/minerals
💚 Health Check: http://localhost:5000/health
🔗 CORS Origin: http://localhost:3000
========================================

✅ BACKEND READY!
(Leave this terminal open)
```

### Step 4: Open Terminal 2 (New)
```
C:\Users\obijr\Downloads\kubi-cohort-2025>
```

### Step 5: Navigate to Frontend
```
C:\Users\obijr\Downloads\kubi-cohort-2025> cd frontend

C:\Users\obijr\Downloads\kubi-cohort-2025\frontend>
```

### Step 6: Start Frontend
```
C:\Users\obijr\Downloads\kubi-cohort-2025\frontend> npm run dev

✓ Ready in 2.5s

➜  Local:   http://localhost:3000

✅ FRONTEND READY!
```

### Step 7: Visit Website
```
Open browser → http://localhost:3000

You see:
├─ Oil card (WTI, $76.45, +2.4%)
├─ Gold card (XAU, $2,089.30, +1.8%)
└─ Silver card (XAG, $31.20, +3.1%)
```

### Step 8: Click Oil Card
```
Click → Navigate to /markets/oil

Backend Receives: GET http://localhost:5000/minerals/oil

You See:
├─ Current Price: $76.45
├─ Highest Price: $78.23
├─ Lowest Price: $74.12
└─ Price Chart: 30-day history with line graph
```

---

## 🧪 How to Test

### Test 1: Backend Endpoints
**In Browser:**
```
Visit: http://localhost:5000/health
See: { status: "OK", timestamp: "...", uptime: ... }

Visit: http://localhost:5000/minerals
See: [ { id: "oil", name: "Oil", ... }, ... ]

Visit: http://localhost:5000/minerals/oil
See: { mineralName: "Oil", priceHistory: [ ... ] }
```

### Test 2: Frontend Pages
**In Browser:**
```
Visit: http://localhost:3000
See: Mineral cards on homepage

Click: Oil card
See: /markets/oil with chart

Click: Gold card
See: /markets/gold with chart

Click: Silver card
See: /markets/silver with chart
```

### Test 3: Integration
**In DevTools (F12):**
```
1. Go to Network tab
2. Click a mineral card
3. See: GET /minerals/oil → 200 OK
4. See: Response contains priceHistory array
5. See: Chart renders on page
```

---

## 📊 Data Flow Example

```
User Action                    System Response
════════════════════════════════════════════════

1. User visits http://localhost:3000
   └─► Frontend loads
       Shows 3 mineral cards

2. User clicks "Oil" card
   └─► Frontend routing to /markets/oil
       Component calls fetch('http://localhost:5000/minerals/oil')

3. HTTP Request
   ┌─────────────────────────────────────────┐
   │ GET /minerals/oil HTTP/1.1              │
   │ Host: localhost:5000                    │
   │ Origin: http://localhost:3000           │
   └─────────────────────────────────────────┘
            │
            ▼
   Backend receives request
   ┌─────────────────────────────────────────┐
   │ Server checks:                          │
   │ ✓ Origin is http://localhost:3000       │
   │ ✓ CORS allows this origin               │
   │ ✓ Route /minerals exists                │
   │ ✓ Controller function exists            │
   └─────────────────────────────────────────┘
            │
            ▼
   Backend reads mockData.js
   ┌─────────────────────────────────────────┐
   │ Oil data:                               │
   │ {                                       │
   │   mineralName: "Oil",                   │
   │   symbol: "WTI",                        │
   │   lastUpdated: "2025-11-15T...",       │
   │   priceHistory: [                       │
   │     { date: "2025-10-16", price: 74.22}│
   │     { date: "2025-10-17", price: 75.10}│
   │     ...                                 │
   │     { date: "2025-11-15", price: 76.45}│
   │   ]                                     │
   │ }                                       │
   └─────────────────────────────────────────┘
            │
            ▼
   HTTP Response
   ┌─────────────────────────────────────────┐
   │ HTTP/1.1 200 OK                         │
   │ Content-Type: application/json          │
   │ Access-Control-Allow-Origin: *          │
   │                                         │
   │ { mineralName: "Oil", ... }             │
   └─────────────────────────────────────────┘
            │
            ▼
   Frontend receives response
   Component stores data
   Renders chart with Recharts

4. User sees
   ├─ Current Price: $76.45
   ├─ Highest: $78.23
   ├─ Lowest: $74.12
   └─ Line chart showing 30-day trend

✅ Done!
```

---

## ⚙️ Configuration Files

### backend/.env
```env
PORT=5000
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000
```

**Explanation:**
- `PORT`: Backend runs on 5000
- `NODE_ENV`: Development mode (shows errors)
- `CORS_ORIGIN`: Only allow requests from frontend at 3000

### frontend/.env.local
```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

**Explanation:**
- `NEXT_PUBLIC_`: Available to browser (not secret)
- `API_URL`: Where frontend fetches data from
- `http://localhost:5000`: Your backend

---

## 🔍 File Locations Reference

```
C:\Users\obijr\Downloads\kubi-cohort-2025\

Backend Files:
├── backend/server.js                          (Main server)
├── backend/routes/minerals.js                 (Routes)
├── backend/controllers/mineralController.js   (Handlers)
├── backend/data/mockData.js                  (Data)
├── backend/package.json                      (Dependencies)
├── backend/.env                              (Config)
└── backend/README.md                         (Docs)

Frontend Files:
├── frontend/.env.local                       (Config ✨ UPDATED)
├── frontend/app/markets/[marketName]/page.tsx  (Detail page)
└── frontend/package.json

Documentation:
├── START_HERE.md                             (👈 Read first!)
├── QUICK_START.md
├── SETUP_WALKTHROUGH.md
├── API_SETUP_GUIDE.md
├── API_SETUP_SUMMARY.md
├── IMPLEMENTATION_CHECKLIST.md
└── DOCUMENTATION_INDEX.md

Testing:
└── Mineral_Trading_API.postman_collection.json
```

---

## ✅ Success Checklist

As you follow the steps, check off:

### Installation Phase
- [ ] Opened Terminal 1
- [ ] Ran `cd backend`
- [ ] Ran `npm install` (finished)
- [ ] Backend folder has `node_modules` folder

### Backend Startup
- [ ] Ran `npm run dev`
- [ ] Saw "🚀 Server running"
- [ ] Saw "📊 Minerals API: http://localhost:5000/minerals"
- [ ] Terminal shows ready (left it running)

### Frontend Setup
- [ ] Opened Terminal 2 (new terminal)
- [ ] Ran `cd frontend`
- [ ] Ran `npm run dev`
- [ ] Saw "Ready in X.Xs"

### Browser Testing
- [ ] Opened http://localhost:3000
- [ ] Saw 3 mineral cards
- [ ] Clicked Oil → saw /markets/oil
- [ ] Price chart displayed
- [ ] Clicked Gold → saw /markets/gold
- [ ] Clicked Silver → saw /markets/silver

### Integration Testing
- [ ] Opened DevTools (F12)
- [ ] Went to Network tab
- [ ] Clicked mineral card
- [ ] Saw GET request to /minerals/oil
- [ ] Status was 200 (green)
- [ ] Response showed priceHistory array
- [ ] No CORS errors in Console

---

## 🎉 You're Done!

When everything above is checked, you have:

✅ Working backend API  
✅ Working frontend app  
✅ Real-time price charts  
✅ Full integration  

**Congratulations!** 🎊

---

## 💡 What To Do Next

### Right Now
- Keep both servers running
- Explore the app
- Click minerals, watch charts update
- Open DevTools, monitor requests

### Tomorrow
- Read `API_SETUP_GUIDE.md` for next steps
- Consider adding real commodity data
- Plan database integration

### This Week
- Deploy backend to Heroku/Railway
- Deploy frontend to Vercel
- Add authentication
- Add trading features

---

## 📞 Quick Help

**Backend won't start?**
→ Check if port 5000 is already in use
→ See IMPLEMENTATION_CHECKLIST.md troubleshooting

**Frontend blank?**
→ Check browser console (F12)
→ Check .env.local has correct API URL

**See CORS error?**
→ Check backend .env has correct CORS_ORIGIN
→ Restart backend server

**API returns 404?**
→ Use lowercase mineral names (/oil not /Oil)
→ Use correct path (/minerals/oil not /mineral/oil)

---

**Now start building! 🚀**
