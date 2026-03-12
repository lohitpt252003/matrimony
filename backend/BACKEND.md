# Backend Documentation

## Project Structure

```
backend/
├── app/
│   ├── __pycache__/
│   ├── models/
│   │   └── user.py
│   ├── routers/
│   │   ├── __init__.py
│   │   ├── auth.py
│   │   └── users.py
│   ├── schemas/
│   │   └── user.py
│   ├── __init__.py
│   ├── auth.py
│   ├── database.py
│   └── main.py
├── Dockerfile
├── requirements.txt
├── .env.example
└── README.md
```

## Core Components

### Database (`app/database.py`)

Manages database connectivity and session management.

**Features:**
- PostgreSQL integration via SQLAlchemy
- Connection pooling
- Session management with context manager

**Configuration:**
```python
DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://user:password@db:5432/matrimony")
```

### Authentication (`app/auth.py`)

Handles password hashing and JWT token generation.

**Functions:**
- `get_password_hash(password)` - Hash passwords with bcrypt
- `verify_password(plain_password, hashed_password)` - Verify password against hash
- `create_access_token(data, expires_delta)` - Generate JWT token

**Configuration:**
```python
SECRET_KEY = os.getenv("SECRET_KEY", "your-secret-key-change-this-in-production")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30
```

### Models

#### User Model (`app/models/user.py`)

Database schema for user profiles.

**Fields:**
- `id` - Primary key
- `email` - User email (unique, indexed)
- `username` - User username (unique, indexed)
- `hashed_password` - Bcrypt hashed password
- `full_name` - User's full name
- `is_active` - Account status
- `created_at` - Account creation timestamp
- `updated_at` - Last updated timestamp
- `gender` - User's gender
- `age` - User's age
- `religion` - Religious background
- `caste` - Caste information
- `education` - Education level
- `occupation` - Profession
- `bio` - User biography
- `profile_picture` - Profile image URL

### Schemas

#### User Schema (`app/schemas/user.py`)

Pydantic models for request/response validation.

**Models:**
- `UserBase` - Common user fields
- `UserCreate` - Signup request with password
- `UserUpdate` - Profile update model
- `UserResponse` - User response (excludes password)
- `Token` - Login response
- `TokenData` - JWT token payload

**Validation:**
- Username: Alphanumeric only
- Age: 18-100
- Password: Minimum 6 characters
- Bio: Maximum 1000 characters

### Routers

#### Auth Router (`app/routers/auth.py`)

Handles user authentication.

**Endpoints:**

##### POST `/auth/signup`
Create a new user account.

**Request:**
```json
{
  "email": "user@example.com",
  "username": "username",
  "password": "password",
  "full_name": "Full Name",
  "gender": "Male",
  "age": 25,
  "religion": "Hindu",
  "caste": "Caste",
  "education": "Graduate",
  "occupation": "Engineer",
  "bio": "About me"
}
```

**Response (201):**
```json
{
  "id": 1,
  "email": "user@example.com",
  "username": "username",
  "full_name": "Full Name",
  "gender": "Male",
  "age": 25,
  "is_active": true,
  "created_at": "2024-03-12T10:00:00"
}
```

**Errors:**
- `400` - Email already registered
- `400` - Username already taken
- `422` - Validation error

##### POST `/auth/login`
Authenticate user and return JWT token.

**Request (Form Data):**
```
username=username
password=password
```

**Response (200):**
```json
{
  "access_token": "eyJhbGc...",
  "token_type": "bearer"
}
```

**Errors:**
- `401` - Incorrect username or password

#### Users Router (`app/routers/users.py`)

Manages user profiles and data retrieval.

**Endpoints:**

##### GET `/users/me`
Get current authenticated user's profile.

**Headers:**
```
Authorization: Bearer {token}
```

**Response (200):**
```json
{
  "id": 1,
  "email": "user@example.com",
  "username": "username",
  "full_name": "Full Name",
  "gender": "Male",
  "age": 25,
  "is_active": true,
  "created_at": "2024-03-12T10:00:00"
}
```

**Errors:**
- `401` - Invalid or missing token

##### GET `/users/?skip=0&limit=10`
Get paginated list of user profiles (excludes current user).

**Headers:**
```
Authorization: Bearer {token}
```

**Query Parameters:**
- `skip` - Offset for pagination (default: 0)
- `limit` - Number of results (default: 10)

**Response (200):**
```json
[
  {
    "id": 2,
    "email": "user2@example.com",
    "username": "username2",
    "full_name": "Another User",
    "gender": "Female",
    "age": 23,
    "is_active": true,
    "created_at": "2024-03-11T15:30:00"
  }
]
```

**Errors:**
- `401` - Invalid or missing token

##### GET `/users/{user_id}`
Get specific user's public profile.

**Response (200):**
```json
{
  "id": 2,
  "email": "user2@example.com",
  "username": "username2",
  "full_name": "Another User",
  "gender": "Female",
  "age": 23,
  "is_active": true
}
```

**Errors:**
- `404` - User not found

### Main App (`app/main.py`)

FastAPI application setup and configuration.

**Features:**
- CORS middleware (restricted to localhost:3000)
- Database session management
- Route registration
- Health check endpoints

**Endpoints:**
- `GET /` - Root endpoint
- `GET /health` - Health check

## Environment Variables

Create a `.env` file in the `backend/` directory:

```
DATABASE_URL=postgresql://user:password@db:5432/matrimony
SECRET_KEY=your-super-secret-key-minimum-32-characters
ACCESS_TOKEN_EXPIRE_MINUTES=30
DEBUG=false
```

See `.env.example` for all available variables.

## Installation & Setup

### Requirements
- Python 3.8+
- PostgreSQL 12+
- pip

### Install Dependencies
```bash
cd backend
pip install -r requirements.txt
```

### Database Setup

```bash
# Create database
createdb matrimony

# Run migrations (if using Alembic)
alembic upgrade head
```

### Run Development Server
```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

### Run with Docker
```bash
docker build -t matrimony-backend .
docker run -p 8000:8000 --env-file .env matrimony-backend
```

## Security Features

### Password Security
- Bcrypt hashing with automatic salt generation
- Passwords never stored in plaintext
- Password verification done in constant time

### JWT Authentication
- HS256 algorithm for token signing
- Configurable token expiration (default: 30 minutes)
- Secure secret key (changeable via environment variable)

### Input Validation
- Email format validation
- Username alphanumeric validation
- Age range validation (18-100)
- Bio length validation (max 1000 chars)
- Password strength requirement (min 6 chars)

### CORS Headers
- Restricted to specific origins (localhost:3000)
- Limited HTTP methods (GET, POST, PUT, DELETE)
- Limited headers (Content-Type, Authorization)

## Database Schema

### Users Table

```sql
CREATE TABLE users (
  id INTEGER PRIMARY KEY,
  email VARCHAR UNIQUE NOT NULL,
  username VARCHAR UNIQUE NOT NULL,
  hashed_password VARCHAR NOT NULL,
  full_name VARCHAR,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIMEZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIMEZONE,
  gender VARCHAR,
  age INTEGER,
  religion VARCHAR,
  caste VARCHAR,
  education VARCHAR,
  occupation VARCHAR,
  bio VARCHAR,
  profile_picture VARCHAR
);
```

**Indexes:**
- `email` (unique)
- `username` (unique)

## API Error Responses

All error responses follow this format:

```json
{
  "detail": "Error message describing what went wrong"
}
```

### Common HTTP Status Codes

- `200` - Success
- `400` - Bad request / Validation error
- `401` - Unauthorized (invalid/missing token)
- `404` - Not found
- `422` - Unprocessable entity (validation error)
- `500` - Server error

## Testing

### Run Tests
```bash
pytest
```

### Test Coverage
```bash
pytest --cov=app
```

## Development Guidelines

### Code Style
- Follow PEP 8
- Use type hints
- Document functions

### Adding New Endpoints

1. Create route handler in `routers/`
2. Create Pydantic schema in `schemas/`
3. Add database model if needed in `models/`
4. Include proper error handling
5. Add comprehensive docstrings

### Example:
```python
@router.post("/endpoint", response_model=ResponseSchema)
def endpoint_handler(
    data: RequestSchema,
    db: Session = Depends(database.get_db)
):
    """Description of what this endpoint does."""
    # Implementation
    return result
```

## Performance Optimization

1. **Database Indexing** - Indexes on frequently queried fields
2. **Connection Pooling** - SQLAlchemy handles connection pooling
3. **Query Optimization** - Use `.first()` instead of `.all()[0]`
4. **Caching** - Implement Redis for token blacklisting
5. **Pagination** - Always paginate large result sets

## Troubleshooting

### Database Connection Error
- Check `DATABASE_URL` environment variable
- Verify PostgreSQL is running
- Ensure credentials are correct

### Authentication Failed
- Verify `SECRET_KEY` is consistent across instances
- Check token expiration time
- Ensure JWT format is correct

### CORS Errors
- Verify frontend origin is in `allow_origins`
- Check allowed methods and headers
- Clear browser cache

## Future Enhancements

- [ ] Email verification
- [ ] Password reset functionality
- [ ] Profile picture upload
- [ ] Matching algorithm
- [ ] Interest/like system
- [ ] Chat functionality
- [ ] Admin dashboard
- [ ] Rate limiting
- [ ] Request logging
- [ ] Analytics

## Dependencies

See `requirements.txt` for specific versions:
- FastAPI - Web framework
- Uvicorn - ASGI server
- SQLAlchemy - ORM
- psycopg2-binary - PostgreSQL adapter
- python-jose - JWT handling
- passlib - Password hashing
- Pydantic - Data validation
