import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import 'dotenv/config';

import mineralRoutes from './routes/minerals';

const app = express();
const PORT = process.env.PORT || 5000;
const CORS_ORIGIN = process.env.CORS_ORIGIN || 'http://localhost:3000';

// Middleware
app.use(cors({
  origin: CORS_ORIGIN,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Logging middleware
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`📍 ${req.method} ${req.path}`);
  next();
});

// Routes
app.use('/minerals', mineralRoutes);

// Health check endpoint
app.get('/health', (req: Request, res: Response) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({
    error: 'Route not found',
    path: req.path,
    method: req.method
  });
});

// Error handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error('❌ Error:', err);
  res.status(500).json({
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

app.listen(PORT, () => {
  console.log('\n========================================');
  console.log('🚀 Mineral Trading Backend Started');
  console.log('========================================');
  console.log(`📍 Server: http://localhost:${PORT}`);
  console.log(`📊 Minerals API: http://localhost:${PORT}/minerals`);
  console.log(`💚 Health Check: http://localhost:${PORT}/health`);
  console.log(`🔗 CORS Origin: ${CORS_ORIGIN}`);
  console.log('========================================\n');
});