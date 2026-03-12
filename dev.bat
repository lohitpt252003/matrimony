@echo off
REM Matrimony Development Startup Script for Windows
REM This script makes it easy to start the development environment

setlocal enabledelayedexpansion

REM Check if Docker is installed
docker --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Docker is not installed. Please install Docker Desktop for Windows first.
    pause
    exit /b 1
)

docker-compose --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Docker Compose is not installed. Please install Docker Desktop for Windows first.
    pause
    exit /b 1
)

echo [OK] Docker and Docker Compose are installed
echo.

REM Check if .env files exist
if not exist "backend\.env" (
    echo [WARNING] backend\.env not found. Copying from template...
    if exist "backend\.env.example" (
        copy backend\.env.example backend\.env >nul
        echo [OK] Created backend\.env
    ) else (
        echo [WARNING] backend\.env.example not found. You'll need to create backend\.env manually.
    )
)

if not exist "frontend\.env.local" (
    echo [WARNING] frontend\.env.local not found. Creating with default values...
    (
        echo REACT_APP_API_URL=http://localhost:8000
    ) > frontend\.env.local
    echo [OK] Created frontend\.env.local
)

REM Check if docker-compose.dev.yml exists
if not exist "docker-compose.dev.yml" (
    echo [ERROR] docker-compose.dev.yml not found. Cannot proceed.
    pause
    exit /b 1
)

echo.
echo [INFO] Starting Matrimony development environment...
echo [INFO] This will start:
echo         - PostgreSQL database (5432)
echo         - FastAPI backend (8000) with auto-reload
echo         - React frontend (3000) with hot-reload
echo.
echo [INFO] Access:
echo         - Frontend: http://localhost:3000
echo         - Backend API: http://localhost:8000/docs
echo.
echo [WARNING] Press Ctrl+C to stop all services
echo.

REM Start development environment
docker-compose -f docker-compose.dev.yml up

echo.
echo [OK] Development environment stopped
echo.
pause
