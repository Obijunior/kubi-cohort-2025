# Quick start script for mineral trading platform (Windows PowerShell)

Write-Host "=========================================" -ForegroundColor Cyan
Write-Host "🚀 Mineral Trading Platform Setup" -ForegroundColor Cyan
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host ""

# Check if Node.js is installed
if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
    Write-Host "❌ Node.js is not installed. Please install Node.js 14+ first." -ForegroundColor Red
    exit 1
}

$nodeVersion = node --version
Write-Host "✅ Node.js $nodeVersion detected" -ForegroundColor Green
Write-Host ""

# Setup Backend
Write-Host "📦 Setting up Backend..." -ForegroundColor Yellow
Push-Location backend

if (-not (Test-Path node_modules)) {
    Write-Host "Installing dependencies..." -ForegroundColor Gray
    npm install
} else {
    Write-Host "✅ Dependencies already installed" -ForegroundColor Green
}

Write-Host ""
Write-Host "✅ Backend setup complete!" -ForegroundColor Green
Write-Host ""

# Setup Frontend
Write-Host "📦 Setting up Frontend..." -ForegroundColor Yellow
Pop-Location
Push-Location frontend

if (-not (Test-Path node_modules)) {
    Write-Host "Installing dependencies..." -ForegroundColor Gray
    npm install
} else {
    Write-Host "✅ Dependencies already installed" -ForegroundColor Green
}

Pop-Location

Write-Host ""
Write-Host "✅ Frontend setup complete!" -ForegroundColor Green
Write-Host ""
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host "🎉 Setup Complete!" -ForegroundColor Cyan
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "To start developing:" -ForegroundColor Yellow
Write-Host ""
Write-Host "Terminal 1 (Backend):" -ForegroundColor White
Write-Host "  cd backend && npm run dev" -ForegroundColor Gray
Write-Host ""
Write-Host "Terminal 2 (Frontend):" -ForegroundColor White
Write-Host "  cd frontend && npm run dev" -ForegroundColor Gray
Write-Host ""
Write-Host "Then visit: http://localhost:3000" -ForegroundColor Cyan
Write-Host ""
Write-Host "API Docs: http://localhost:5000/health" -ForegroundColor Cyan
Write-Host "=========================================" -ForegroundColor Cyan
