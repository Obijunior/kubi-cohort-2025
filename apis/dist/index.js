"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
require("dotenv/config");
const minerals_1 = __importDefault(require("./routes/minerals"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
const CORS_ORIGIN = process.env.CORS_ORIGIN || 'http://localhost:3000';
// Middleware
app.use((0, cors_1.default)({
    origin: CORS_ORIGIN,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express_1.default.json());
// Logging middleware
app.use((req, res, next) => {
    console.log(`📍 ${req.method} ${req.path}`);
    next();
});
// Routes
app.use('/minerals', minerals_1.default);
// Health check endpoint
app.get('/health', (req, res) => {
    res.json({
        status: 'OK',
        timestamp: new Date().toISOString(),
        uptime: process.uptime()
    });
});
// 404 handler
app.use((req, res) => {
    res.status(404).json({
        error: 'Route not found',
        path: req.path,
        method: req.method
    });
});
// Error handler
app.use((err, req, res, next) => {
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
