#!/bin/bash

# Matrimony Development Startup Script
# This script makes it easy to start the development environment

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored messages
print_info() {
    echo -e "${BLUE}ℹ ${1}${NC}"
}

print_success() {
    echo -e "${GREEN}✓ ${1}${NC}"
}

print_warn() {
    echo -e "${YELLOW}⚠ ${1}${NC}"
}

print_error() {
    echo -e "${RED}✗ ${1}${NC}"
}

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    print_error "Docker is not installed. Please install Docker first."
    exit 1
fi

if ! command -v docker-compose &> /dev/null; then
    print_error "Docker Compose is not installed. Please install Docker Compose first."
    exit 1
fi

print_success "Docker and Docker Compose are installed"

# Check if .env files exist
if [ ! -f "backend/.env" ]; then
    print_warn "backend/.env not found. Copying from template..."
    if [ -f "backend/.env.example" ]; then
        cp backend/.env.example backend/.env
        print_success "Created backend/.env"
    else
        print_warn "backend/.env.example not found. You'll need to create backend/.env manually."
    fi
fi

if [ ! -f "frontend/.env.local" ]; then
    print_warn "frontend/.env.local not found. Creating with default values..."
    echo "REACT_APP_API_URL=http://localhost:8000" > frontend/.env.local
    print_success "Created frontend/.env.local"
fi

# Check if docker-compose.dev.yml exists
if [ ! -f "docker-compose.dev.yml" ]; then
    print_error "docker-compose.dev.yml not found. Cannot proceed."
    exit 1
fi

print_info "Starting Matrimony development environment..."
print_info "This will start:"
print_info "  • PostgreSQL database (5432)"
print_info "  • FastAPI backend (8000) with auto-reload"
print_info "  • React frontend (3000) with hot-reload"
echo ""
print_info "Access:"
print_info "  • Frontend: http://localhost:3000"
print_info "  • Backend API: http://localhost:8000/docs"
echo ""
print_warn "Press Ctrl+C to stop all services"
echo ""

# Start development environment
docker-compose -f docker-compose.dev.yml up

print_success "Development environment stopped"
