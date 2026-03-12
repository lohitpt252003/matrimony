# Quick Start Guide

## Overview

Matrimony is a full-stack web application for connecting people. It includes:
- **Backend**: FastAPI with PostgreSQL database
- **Frontend**: React with responsive design
- **Database**: PostgreSQL (15-alpine)

---

## Getting Started

### Option 1: Development Mode (Recommended)

This mode enables automatic server restart when you change files.

```bash
# Clone the repository
git clone <your-repo>
cd matrimony

# Start the application
docker-compose -f docker-compose.dev.yml up
```

**Access the app:**
- Frontend: http://localhost:3000
- Backend API Docs: http://localhost:8000/docs
- Backend GraphQL: http://localhost:8000/graphql (if enabled)

**Files will auto-reload when you change them** - no manual restart needed!

For detailed development workflow, see [DEVELOPMENT.md](./DEVELOPMENT.md).

---

### Option 2: Production Mode

```bash
# Clone the repository
git clone <your-repo>
cd matrimony

# Start the application
docker-compose up
```

**Note:** Production mode does NOT auto-reload. Manual container restart required for changes.

---

## Environment Setup

### Backend Configuration

Create `backend/.env`:

```env
DATABASE_URL=postgresql://user:password@db:5432/matrimony
SECRET_KEY=your-super-secret-key-change-this-in-production
PYTHONUNBUFFERED=1
```

Or copy from template:
```bash
cp backend/.env.example backend/.env
```

### Frontend Configuration

Create `frontend/.env.local`:

```env
REACT_APP_API_URL=http://localhost:8000
```

---

## Project Structure

```
matrimony/
├── docker-compose.yml           # Production setup
├── docker-compose.dev.yml       # Development setup with auto-reload
├── README.md                    # Main readme
├── DEVELOPMENT.md               # Development workflow guide
├── backend/
│   ├── Dockerfile              # Production image
│   ├── Dockerfile.dev           # Development image
│   ├── requirements.txt         # Python dependencies
│   └── app/
│       ├── main.py            # FastAPI app
│       ├── auth.py            # JWT & password hashing
│       ├── database.py         # SQLAlchemy setup
│       ├── models/
│       │   └── user.py        # User model
│       ├── routers/
│       │   ├── auth.py        # Auth endpoints
│       │   └── users.py       # User endpoints
│       └── schemas/
│           └── user.py        # Validation schemas
├── frontend/
│   ├── Dockerfile              # Production image
│   ├── Dockerfile.dev           # Development image
│   ├── package.json            # Node dependencies
│   ├── public/
│   │   └── index.html
│   └── src/
│       ├── App.jsx
│       ├── index.jsx
│       ├── index.css
│       ├── pages/
│       │   ├── HomePage/       # Browse profiles
│       │   ├── LoginPage/      # Login form
│       │   └── SignupPage/     # Registration form
│       ├── components/
│       │   └── Button/         # Reusable button component
│       └── context/
│           └── AuthContext/    # Global auth state
```

---

## Available Commands

```bash
# Start development (with auto-reload)
docker-compose -f docker-compose.dev.yml up

# Start production
docker-compose up

# Stop all services
docker-compose -f docker-compose.dev.yml down

# View logs
docker-compose -f docker-compose.dev.yml logs -f

# View logs for specific service
docker-compose -f docker-compose.dev.yml logs -f backend
docker-compose -f docker-compose.dev.yml logs -f frontend

# Enter a container's shell
docker-compose -f docker-compose.dev.yml exec backend bash
docker-compose -f docker-compose.dev.yml exec frontend bash

# Restart a service
docker-compose -f docker-compose.dev.yml restart backend
docker-compose -f docker-compose.dev.yml restart frontend
```

---

## Accessing the Application

### Frontend
- **URL**: http://localhost:3000
- **Pages**:
  - `/` - Home (profile browser)
  - `/login` - Login page
  - `/signup` - Registration page

### Backend API
- **Docs**: http://localhost:8000/docs (Swagger UI)
- **Base URL**: http://localhost:8000
- **Endpoints**:
  - `POST /auth/signup` - Register new user
  - `POST /auth/login` - Login user
  - `GET /users/me` - Get logged-in user
  - `GET /users/` - List all users (paginated)
  - `GET /users/{id}` - Get specific user

For complete API documentation, see [API.md](./API.md).

---

## Key Features

✅ **User Authentication**
- JWT-based authentication
- Secure password hashing with bcrypt
- Login & signup endpoints

✅ **Security**
- CORS restricted to safe methods (GET, POST, PUT, DELETE)
- Input validation with Pydantic
- Password constraints (min 6 chars)
- Age constraints (18-100 years)
- Protected endpoints

✅ **Responsive Design**
- Mobile-first approach
- Light/Dark theme support
- Separate CSS files for mobile, light, and dark modes

✅ **Auto-reload Development**
- Backend restarts on Python file changes
- Frontend hot-reloads on JS/CSS changes
- No manual restarts needed during development

---

## Troubleshooting

### Port Already in Use
```bash
# Check what's using the port
lsof -i :3000    # Frontend
lsof -i :8000    # Backend
lsof -i :5432    # Database

# Kill the process
kill -9 <PID>
```

### Database Connection Error
```bash
# Check database is running
docker-compose -f docker-compose.dev.yml logs db

# Restart database
docker-compose -f docker-compose.dev.yml restart db
```

### Auto-reload Not Working
1. Check logs: `docker-compose -f docker-compose.dev.yml logs backend`
2. Ensure files are in correct directory (`backend/app/` for Python, `frontend/src/` for JS)
3. Restart containers: `docker-compose -f docker-compose.dev.yml restart`

For more troubleshooting, see [DEVELOPMENT.md](./DEVELOPMENT.md#troubleshooting-auto-reload).

---

## Documentation

- [DEVELOPMENT.md](./DEVELOPMENT.md) - Detailed development workflow
- [API.md](./API.md) - Complete API documentation
- [FRONTEND.md](./FRONTEND.md) - Frontend architecture
- [BACKEND.md](./BACKEND.md) - Backend architecture
- [COMPONENTS.md](./COMPONENTS.md) - Component documentation
- [THEMING.md](./THEMING.md) - Theming system
- [SETUP.md](./SETUP.md) - Detailed setup instructions

---

## Technology Stack

**Frontend:**
- React 18.2.0
- React Router 6.22.0
- Pure CSS3 with theme variables
- No TypeScript (pure JavaScript/JSX)

**Backend:**
- FastAPI 0.109.0
- SQLAlchemy 2.0.25
- PostgreSQL 15
- Uvicorn 0.27.0

**DevOps:**
- Docker & Docker Compose
- Volume mounts for development
- Auto-reload on file changes

---

## Next Steps

1. Follow the **Getting Started** section above
2. Read [DEVELOPMENT.md](./DEVELOPMENT.md) for the detailed development workflow
3. Make edits - files will auto-reload!
4. Check [API.md](./API.md) for API endpoints
5. See [COMPONENTS.md](./COMPONENTS.md) for component documentation

For any issues, check the [Troubleshooting](#troubleshooting) section or the detailed docs.

Happy coding! 🚀
