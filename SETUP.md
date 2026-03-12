# Matrimony App - Setup & Installation Guide

## Prerequisites

Before starting, ensure you have the following installed:

- **Docker** and **Docker Compose** (for containerized setup)
- **Python 3.8+** (for local backend development)
- **Node.js 16+** and **npm** (for frontend)
- **PostgreSQL 12+** (if running locally without Docker)
- **Git**

## Project Structure

```
matrimony/
├── backend/
│   ├── app/
│   │   ├── models/
│   │   ├── routers/
│   │   ├── schemas/
│   │   ├── auth.py
│   │   ├── database.py
│   │   └── main.py
│   ├── Dockerfile
│   ├── requirements.txt
│   ├── .env.example
│   └── BACKEND.md
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   └── index.jsx
│   ├── Dockerfile
│   ├── package.json
│   ├── .env.example
│   └── FRONTEND.md
├── docker-compose.yml
└── README.md
```

## Quick Start with Docker

### 1. Clone Repository
```bash
git clone https://github.com/lohitpt252003/matrimony.git
cd matrimony
```

### 2. Create Environment Files

**backend/.env**
```
DATABASE_URL=postgresql://user:password@db:5432/matrimony
SECRET_KEY=your-super-secret-key-minimum-32-characters
ACCESS_TOKEN_EXPIRE_MINUTES=30
```

**frontend/.env**
```
REACT_APP_API_URL=http://localhost:8000
```

### 3. Start Docker Containers
```bash
docker-compose up -d
```

This starts:
- PostgreSQL database on port 5432
- Backend API on port 8000
- Frontend on port 3000

### 4. Access the Application
- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:8000
- **API Docs:** http://localhost:8000/docs

### 5. Stop Containers
```bash
docker-compose down
```

## Local Development Setup

### Backend Setup

#### 1. Create Virtual Environment
```bash
cd backend
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate
```

#### 2. Install Dependencies
```bash
pip install -r requirements.txt
```

#### 3. Setup Environment Variables
```bash
cp .env.example .env
# Edit .env with your database URL
```

#### 4. Run Database Migrations
```bash
# Create database
createdb matrimony

# Run Alembic migrations (if using)
alembic upgrade head
```

#### 5. Start Backend Server
```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

Backend will be available at `http://localhost:8000`

### Frontend Setup

#### 1. Install Dependencies
```bash
cd frontend
npm install
```

#### 2. Setup Environment Variables
```bash
cp .env.example .env
# Edit .env with your backend URL
```

#### 3. Start Development Server
```bash
npm start
```

Frontend will open at `http://localhost:3000`

## Configuration

### Backend Configuration

**Key Environment Variables:**

| Variable | Default | Description |
|----------|---------|-------------|
| `DATABASE_URL` | `postgresql://user:password@db:5432/matrimony` | PostgreSQL connection string |
| `SECRET_KEY` | `your-secret-key-change-this` | JWT signing secret (MUST BE CHANGED) |
| `ACCESS_TOKEN_EXPIRE_MINUTES` | `30` | JWT token expiration time |
| `DEBUG` | `false` | Enable debug mode |

### Frontend Configuration

**Key Environment Variables:**

| Variable | Default | Description |
|----------|---------|-------------|
| `REACT_APP_API_URL` | `http://localhost:8000` | Backend API URL |

## Testing the Application

### 1. Create an Account
- Go to http://localhost:3000
- Click "Sign Up"
- Fill in the registration form
- Click "Register"

### 2. Login
- Go to http://localhost:3000/login
- Enter your username and password
- Click "Login"

### 3. Browse Profiles
- After login, you'll see the homepage
- Browse other user profiles with pagination
- Click "View Profile" for more details

### 4. Test API with Postman/cURL

**Signup:**
```bash
curl -X POST http://localhost:8000/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "username": "testuser",
    "password": "password123",
    "full_name": "Test User",
    "gender": "Male",
    "age": 25,
    "religion": "Hindu",
    "caste": "Caste",
    "education": "Graduate",
    "occupation": "Engineer",
    "bio": "Test bio"
  }'
```

**Login:**
```bash
curl -X POST http://localhost:8000/auth/login \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "username=testuser&password=password123"
```

**Get Current User:**
```bash
curl -X GET http://localhost:8000/users/me \
  -H "Authorization: Bearer {access_token}"
```

**Get User List:**
```bash
curl -X GET "http://localhost:8000/users/?skip=0&limit=10" \
  -H "Authorization: Bearer {access_token}"
```

## Database Management

### Connect to PostgreSQL (Docker)
```bash
docker exec -it matrimony-db psql -U user -d matrimony
```

### Common SQL Commands
```sql
-- List all users
SELECT id, username, email, full_name, created_at FROM users;

-- Get user count
SELECT COUNT(*) FROM users;

-- Delete a user
DELETE FROM users WHERE username = 'testuser';

-- Update user info
UPDATE users SET full_name = 'New Name' WHERE username = 'testuser';
```

## Deployment

### Deploy to Production

#### Option 1: Docker on Cloud (AWS, GCP, Azure)
```bash
# Build and push Docker images
docker build -t myregistry/matrimony-backend:latest backend/
docker push myregistry/matrimony-backend:latest

docker build -t myregistry/matrimony-frontend:latest frontend/
docker push myregistry/matrimony-frontend:latest

# Deploy using docker-compose or k8s
```

#### Option 2: Traditional Hosting

**Backend (Heroku example):**
```bash
git push heroku main
```

**Frontend (Vercel/Netlify example):**
```bash
npm run build
# Deploy the build/ folder to Vercel/Netlify
```

### Production Environment Variables

**Critical Security:**
- Change `SECRET_KEY` to a strong random value
- Use production database URL
- Set `DEBUG=false`
- Update frontend API URL to production domain

## Troubleshooting

### Docker Issues

**Containers won't start:**
```bash
# Check logs
docker-compose logs

# Rebuild containers
docker-compose down
docker-compose up --build
```

**Port already in use:**
```bash
# Change ports in docker-compose.yml or kill the process using the port
lsof -i :8000  # See what's using port 8000
kill -9 <PID>  # Kill the process
```

### Backend Issues

**Database connection error:**
```bash
# Ensure PostgreSQL is running
# Check DATABASE_URL in .env
# Test connection with psql
psql postgresql://user:password@localhost:5432/matrimony
```

**Module import errors:**
```bash
# Reinstall dependencies
pip install -r requirements.txt --upgrade
```

**Port already in use:**
```bash
# Run on different port
uvicorn app.main:app --reload --port 8001
```

### Frontend Issues

**npm install fails:**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

**API connection issues:**
```bash
# Check REACT_APP_API_URL in .env
# Verify backend is running
# Check browser console for CORS errors
```

## Performance Monitoring

### Monitor Running Containers
```bash
docker stats
```

### View Logs
```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f backend
docker-compose logs -f frontend
```

## Security Best Practices

1. **Environment Variables**
   - Never commit `.env` files
   - Use `.env.example` as template
   - Rotate secrets regularly

2. **Database**
   - Use strong passwords
   - Enable SSL connections in production
   - Regular backups

3. **API Security**
   - Validate all inputs
   - Use HTTPS in production
   - Implement rate limiting
   - Add request logging

4. **Frontend**
   - Store tokens securely (HttpOnly cookies preferred)
   - CSRF protection
   - XSS prevention

## Maintenance

### Regular Tasks

- Monitor disk space and database size
- Review and update dependencies monthly
- Check error logs daily
- Backup database regularly
- Monitor API response times

### Update Dependencies

**Backend:**
```bash
pip list --outdated
pip install --upgrade package-name
```

**Frontend:**
```bash
npm outdated
npm update
```

## Support & Documentation

- **Backend Docs:** See `backend/BACKEND.md`
- **Frontend Docs:** See `frontend/FRONTEND.md`
- **API Docs:** Visit `http://localhost:8000/docs` (Swagger)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make changes
4. Commit with descriptive messages
5. Push and create a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

- Email: support@matrimony.app
- GitHub: [matrimony](https://github.com/lohitpt252003/matrimony)
