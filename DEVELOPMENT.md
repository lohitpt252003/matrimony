# Development Workflow Guide

## Auto-Reload Setup

This guide explains how to set up automatic server restart on file changes for both frontend and backend.

### Prerequisites
- Docker & Docker Compose installed
- `.env` files configured (see Environment Setup section)

---

## For Development (Recommended)

### Using Development Docker Compose

The `docker-compose.dev.yml` is specifically configured for development with automatic reload on file changes:

```bash
docker-compose -f docker-compose.dev.yml up
```

**What happens:**
- Backend automatically restarts when Python files in `/app/app` directory change
- Frontend automatically reloads when JS, JSX, CSS, or any source files change
- Hot Module Replacement (HMR) enabled for frontend
- File polling enabled for Docker volume sync

### Key Features
1. **Backend Reload** (`--reload` with `--reload-dirs /app/app`)
   - Watches all Python files in the app directory
   - Automatically restarts Uvicorn server
   - No manual restart needed

2. **Frontend Hot Reload**
   - Webpack dev server watches all changes
   - Browser automatically refreshes (or hot-swaps modules)
   - CSS changes apply instantly
   - JSX/JS changes reload the page

3. **Volume Mounts**
   - Both services have volumes pointing to your local code
   - Changes on your machine instantly sync to Docker

---

## For Production

Use the default `docker-compose.yml`:

```bash
docker-compose up
```

No automatic reload in production (safer for stability).

---

## Environment Variables for Development Reload

The `docker-compose.dev.yml` includes these variables:

| Variable | Value | Purpose |
|----------|-------|---------|
| `PYTHONUNBUFFERED` | 1 | Real-time Python output to console |
| `WATCHPACK_POLLING` | true | Use polling instead of native file watchers |
| `CHOKIDAR_USEPOLLING` | true | Enable polling for file change detection |
| `WDS_SOCKET_PORT` | 0 | Auto-detect WebSocket port for HMR |

---

## Troubleshooting Auto-Reload

### Backend not restarting?

Check if the file is in the watched directory:
```bash
# These files will trigger reload:
backend/app/main.py
backend/app/auth.py
backend/app/database.py
backend/app/models/user.py
backend/app/routers/auth.py
backend/app/routers/users.py
backend/app/schemas/user.py

# These won't (they're excluded):
backend/requirements.txt
backend/Dockerfile
```

**Solution:** Ensure you're modifying files in the `app/` directory.

### Frontend not reloading?

**Solution 1:** Check Docker logs
```bash
docker-compose -f docker-compose.dev.yml logs frontend
```

**Solution 2:** Verify volume mounts
```bash
docker-compose -f docker-compose.dev.yml exec frontend ls -la /app
# Should show your source files
```

**Solution 3:** Restart Docker service
```bash
docker-compose -f docker-compose.dev.yml down
docker-compose -f docker-compose.dev.yml up
```

---

## File Change Detection

### Python Files (Backend)
When you modify these, the backend restarts:
- `app/main.py` - FastAPI app setup
- `app/auth.py` - Authentication logic
- `app/database.py` - Database configuration
- `app/models/*` - Database models
- `app/routers/*` - API endpoints
- `app/schemas/*` - Request/response validation

### JavaScript/CSS Files (Frontend)
When you modify these, the frontend reloads:
- `src/**/*.jsx` - React components
- `src/**/*.css` - Stylesheets (light, dark, mobile variants)
- `public/index.html` - HTML template
- `.env.local` - Environment variables

---

## Development Workflow Example

```bash
# 1. Start development containers
docker-compose -f docker-compose.dev.yml up

# 2. In another terminal, open your editor
code .

# 3. Make changes to any file:
# - Edit backend/app/main.py → Backend auto-restarts in ~2 seconds
# - Edit frontend/src/pages/HomePage/index.jsx → Frontend auto-reloads instantly
# - Edit frontend/src/pages/HomePage/index.css → CSS changes apply instantly

# 4. View changes in:
# - Backend API: http://localhost:8000/docs (Swagger UI)
# - Frontend: http://localhost:3000

# 5. Stop containers when done
# Press Ctrl+C in the terminal running docker-compose
```

---

## Performance Tips

1. **Use `.dockerignore`** to exclude files from Docker build
2. **Keep container logs running** to debug issues:
   ```bash
   docker-compose -f docker-compose.dev.yml logs -f backend
   docker-compose -f docker-compose.dev.yml logs -f frontend
   ```

3. **For large projects**, consider:
   - Using `--no-cache` flag: `docker-compose build --no-cache`
   - Increasing Docker memory allocation

---

## Quick Commands

```bash
# Start development environment
docker-compose -f docker-compose.dev.yml up

# Stop everything
docker-compose -f docker-compose.dev.yml down

# View logs
docker-compose -f docker-compose.dev.yml logs -f

# View specific service logs
docker-compose -f docker-compose.dev.yml logs -f backend
docker-compose -f docker-compose.dev.yml logs -f frontend

# Rebuild images
docker-compose -f docker-compose.dev.yml build --no-cache

# Execute command in running container
docker-compose -f docker-compose.dev.yml exec backend bash
docker-compose -f docker-compose.dev.yml exec frontend bash

# Restart specific service
docker-compose -f docker-compose.dev.yml restart backend
docker-compose -f docker-compose.dev.yml restart frontend
```

---

## File Structure for Auto-Reload

```
matrimony/
├── docker-compose.yml          # Production configuration
├── docker-compose.dev.yml       # Development configuration ← Use this!
├── backend/
│   ├── Dockerfile              # Production
│   ├── Dockerfile.dev           # Development ← Used by docker-compose.dev.yml
│   ├── requirements.txt
│   └── app/
│       ├── main.py
│       ├── auth.py
│       ├── database.py
│       ├── models/
│       └── routers/
└── frontend/
    ├── Dockerfile              # Production
    ├── Dockerfile.dev          # Development ← Used by docker-compose.dev.yml
    ├── package.json
    └── src/
        ├── App.jsx
        └── pages/
```

---

## Next Steps

1. **Set up `.env`** files for local development
2. **Run** `docker-compose -f docker-compose.dev.yml up`
3. **Edit files** - they'll auto-reload
4. **Check the logs** if something doesn't reload
5. **Commit changes** when satisfied with your work

Enjoy automatic reload! 🚀
