# 🔧 Copy & Paste Setup Commands

Just copy and paste these exact commands. Nothing else needed!

---

## ⚡ THE FASTEST WAY (3 Commands)

### Open PowerShell and Copy These Exact Commands:

#### Command 1: Navigate and Install Backend
```powershell
cd C:\Users\obijr\Downloads\kubi-cohort-2025\backend; npm install
```

#### Command 2: Start Backend (leave running)
```powershell
npm run dev
```

**WAIT** - You should see:
```
========================================
🚀 Mineral Trading Backend Started
========================================
```

#### Command 3: Open NEW PowerShell and Run Frontend
```powershell
cd C:\Users\obijr\Downloads\kubi-cohort-2025\frontend; npm run dev
```

**WAIT** - You should see:
```
✓ Ready in X.Xs
➜  Local:   http://localhost:3000
```

#### Command 4: Open Browser
```
http://localhost:3000
```

**✅ DONE!** You should see 3 mineral cards. Click them to see charts.

---

## 📋 Step-by-Step if You Want More Details

### Step 1: Open PowerShell Terminal
```powershell
# If not already there, navigate to the project
cd C:\Users\obijr\Downloads\kubi-cohort-2025
```

### Step 2: Go to Backend Folder
```powershell
cd backend
```

**You should see:**
```
C:\Users\obijr\Downloads\kubi-cohort-2025\backend>
```

### Step 3: Install Dependencies (Takes 2-5 minutes)
```powershell
npm install
```

**Wait for it to finish. You'll see:**
```
added 50 packages, and audited 51 packages in 3s
```

### Step 4: Start Backend Server
```powershell
npm run dev
```

**You'll see:**
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

✅ **Leave this terminal open. DO NOT close it.**

---

### Step 5: Open NEW PowerShell Terminal

### Step 6: Navigate to Frontend
```powershell
cd C:\Users\obijr\Downloads\kubi-cohort-2025\frontend
```

**You should see:**
```
C:\Users\obijr\Downloads\kubi-cohort-2025\frontend>
```

### Step 7: Start Frontend
```powershell
npm run dev
```

**You'll see:**
```
✓ Ready in 2.5s

➜  Local:   http://localhost:3000
➜  Modules: node_modules
```

✅ **Frontend is ready!**

---

### Step 8: Open Browser

Go to: **http://localhost:3000**

You should see:
- Page title: "Learn, Trade, and Grow Your Mineral Portfolio"
- 3 cards: Oil (WTI), Gold (XAU), Silver (XAG)
- Each showing a price and % change

### Step 9: Click Oil Card

Click the blue "View Market →" button on the Oil card

You should see:
- URL changes to `http://localhost:3000/markets/oil`
- Page title: "Oil"
- Current price: $76.45
- A chart showing 30 days of price history
- Highest price, lowest price, and price change

### Step 10: Test Other Minerals

Go back and click Gold card → See gold chart  
Go back and click Silver card → See silver chart

---

## ✅ Verify Everything Works

### Check 1: Backend Responding
In a new PowerShell:
```powershell
curl http://localhost:5000/health
```

Should return:
```
status         : OK
timestamp      : 2025-11-15T10:30:45.123Z
uptime         : 5.234
```

### Check 2: Get Minerals Data
```powershell
curl http://localhost:5000/minerals
```

Should return JSON with oil, gold, silver data

### Check 3: Get Specific Mineral
```powershell
curl http://localhost:5000/minerals/oil
```

Should return JSON with 30 days of oil prices

### Check 4: Browser DevTools
1. Open browser DevTools: Press **F12**
2. Go to **Network** tab
3. Click a mineral card
4. You should see: `GET /minerals/oil 200` (green)
5. Response shows: priceHistory array with dates and prices

---

## 🆘 If Something Goes Wrong

### "Port 5000 already in use"
```powershell
# Find what's using port 5000
netstat -ano | findstr :5000

# Kill it (replace XXXX with the PID number)
taskkill /PID XXXX /F

# Try npm run dev again
npm run dev
```

### "npm: command not found"
```
You need to install Node.js
Download from: https://nodejs.org/
Install it, then try again
```

### "Cannot GET /"
```
You're trying to visit http://localhost:5000/
That's the backend. There's no home page there.
Try: http://localhost:3000/ (frontend)
Or: http://localhost:5000/minerals (API)
```

### "CORS error in browser console"
```
Make sure backend is running with npm run dev
Check that frontend .env.local has:
NEXT_PUBLIC_API_URL=http://localhost:5000
```

### "Blank page on http://localhost:3000"
```
1. Press F12 (DevTools)
2. Go to Console tab
3. Look for red errors
4. Report the error message
```

---

## 📱 What You Should See At Each Stage

### After `npm install` (Terminal 1)
```
added 50 packages, and audited 51 packages in 3s
```

### After `npm run dev` (Terminal 1)
```
🚀 Mineral Trading Backend Started
📍 Server: http://localhost:5000
```

### After `npm run dev` (Terminal 2)
```
✓ Ready in 2.5s
➜  Local:   http://localhost:3000
```

### After visiting http://localhost:3000
```
You see a page with:
- A search box
- 3 cards: Oil, Gold, Silver
- Each card shows: name, price, % change, 24h volume
- Blue "View Market →" button on each card
```

### After clicking Oil card
```
You see a page with:
- "Oil" title
- "Updated: [timestamp]"
- 3 stats cards: Current Price, Highest Price, Lowest Price
- A line chart showing 30 days of data
```

---

## 🎯 Summary

```
Terminal 1 (leave running):
cd C:\Users\obijr\Downloads\kubi-cohort-2025\backend
npm install
npm run dev

Terminal 2 (leave running):
cd C:\Users\obijr\Downloads\kubi-cohort-2025\frontend
npm run dev

Browser:
http://localhost:3000

✅ Done!
```

---

## 💡 Pro Tips

### Both Terminals Must Stay Open
- Terminal 1 for backend
- Terminal 2 for frontend
- Don't close either one while testing

### Auto Reload Works
- Change backend code → auto-restarts
- Change frontend code → auto-refreshes browser

### Monitor In Real-Time
- Open DevTools: F12
- Go to Network tab
- Click mineral cards
- Watch API requests happen in real-time

### Test Endpoints Quickly
```powershell
# Get all minerals
curl http://localhost:5000/minerals

# Get oil data specifically
curl http://localhost:5000/minerals/oil
```

---

## 🚀 You're Ready!

Just follow the **"Copy & Paste"** or **"Step-by-Step"** section above.

Everything else is already configured for you.

**Let's go! 🎉**
