# Mineral Trading Backend API

REST API for the mineral trading platform serving oil, gold, and silver price data.

## Quick Start

### Prerequisites
- Node.js 14+ installed
- npm or yarn

### Installation

```bash
cd backend
npm install
```

### Development

```bash
npm run dev
```

The server will start on `http://localhost:5000`

### Production

```bash
npm start
```

## API Endpoints

### Get All Minerals
```
GET /minerals
```

Returns a list of all available minerals with current prices.

**Response:**
```json
[
  {
    "id": "oil",
    "name": "Oil",
    "symbol": "WTI",
    "currentPrice": 76.45,
    "lastUpdated": "2025-11-15T10:30:00.000Z"
  },
  {
    "id": "gold",
    "name": "Gold",
    "symbol": "XAU",
    "currentPrice": 2089.30,
    "lastUpdated": "2025-11-15T10:30:00.000Z"
  },
  {
    "id": "silver",
    "name": "Silver",
    "symbol": "XAG",
    "currentPrice": 31.20,
    "lastUpdated": "2025-11-15T10:30:00.000Z"
  }
]
```

### Get Specific Mineral Data
```
GET /minerals/:mineralName
```

Parameters:
- `mineralName` (string): `oil`, `gold`, or `silver`

**Response:**
```json
{
  "mineralName": "Oil",
  "symbol": "WTI",
  "lastUpdated": "2025-11-15T10:30:00.000Z",
  "priceHistory": [
    {
      "date": "2025-10-16",
      "price": 74.22
    },
    {
      "date": "2025-10-17",
      "price": 75.10
    },
    {
      "date": "2025-11-15",
      "price": 76.45
    }
  ]
}
```

### Health Check
```
GET /health
```

**Response:**
```json
{
  "status": "OK",
  "timestamp": "2025-11-15T10:30:00.000Z",
  "uptime": 3600
}
```

## Environment Variables

Create a `.env` file in the backend root:

```env
PORT=5000
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000
```

## Testing

### Using cURL

```bash
# Get all minerals
curl http://localhost:5000/minerals

# Get oil prices
curl http://localhost:5000/minerals/oil

# Get gold prices
curl http://localhost:5000/minerals/gold

# Get silver prices
curl http://localhost:5000/minerals/silver

# Health check
curl http://localhost:5000/health
```

### Using Postman

1. Import the collection from `postman/mineral-api.postman_collection.json`
2. Set the environment variable `BASE_URL` to `http://localhost:5000`
3. Run the requests

## Architecture

```
Server (Express.js)
├── Routes (/minerals)
├── Controllers (mineralController)
└── Data (mockData.js)
    ├── Oil (WTI)
    ├── Gold (XAU)
    └── Silver (XAG)
```

## Data Sources

Currently using mock data with realistic price volatility. To integrate real commodity data:

1. **Alpha Vantage**: https://www.alphavantage.co/
2. **Finnhub**: https://finnhub.io/
3. **IEX Cloud**: https://iexcloud.io/

See `API_SETUP_GUIDE.md` for integration instructions.

## Deployment

### Heroku

```bash
heroku create mineral-trading-api
heroku config:set CORS_ORIGIN=https://your-frontend.herokuapp.com
git push heroku main
```

### Railway.app

1. Connect your GitHub repository
2. Set environment variables in Railway dashboard
3. Deploy automatically on git push

### DigitalOcean / AWS / Azure

See `API_SETUP_GUIDE.md` for detailed deployment instructions.

## Error Handling

All endpoints return appropriate HTTP status codes:

- `200`: Success
- `404`: Resource not found
- `500`: Internal server error

Error responses include a message:
```json
{
  "error": "Error description",
  "message": "Detailed error message (dev only)"
}
```

## CORS

The API allows requests from the frontend URL specified in the `CORS_ORIGIN` environment variable. Default is `http://localhost:3000`.

## Logs

The server logs all incoming requests:
```
📍 GET /minerals
📍 GET /minerals/oil
💚 Health Check: http://localhost:5000/health
```

## License

ISC
