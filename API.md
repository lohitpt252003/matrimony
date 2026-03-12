# API Documentation

## Base URL
```
http://localhost:8000
```

## Authentication

All protected endpoints require the `Authorization` header with a Bearer token:

```
Authorization: Bearer {access_token}
```

Tokens are obtained from the `/auth/login` endpoint and expire after 30 minutes by default.

## Response Format

All responses are in JSON format with the following structure:

**Success Response (200, 201):**
```json
{
  "id": 1,
  "email": "user@example.com",
  "username": "username",
  "full_name": "Full Name",
  ...
}
```

**Error Response (400, 401, 404, 422, 500):**
```json
{
  "detail": "Error message describing what went wrong"
}
```

## Endpoints

### Authentication Endpoints

#### Sign Up
Create a new user account.

**Request:**
```
POST /auth/signup
Content-Type: application/json
```

**Request Body:**
```json
{
  "email": "user@example.com",
  "username": "username",
  "password": "password123",
  "full_name": "John Doe",
  "gender": "Male",
  "age": 25,
  "religion": "Hindu",
  "caste": "Caste Name",
  "education": "B.Tech",
  "occupation": "Software Engineer",
  "bio": "I am a software engineer looking for a life partner."
}
```

**Required Fields:**
- `email` - Valid email address
- `username` - Alphanumeric characters only
- `password` - Minimum 6 characters
- `full_name` - User's full name

**Optional Fields:**
- `gender` - Male, Female, Other
- `age` - Between 18 and 100
- `religion` - Religious background
- `caste` - Caste information
- `education` - Educational qualification
- `occupation` - Job/profession
- `bio` - Personal biography (max 1000 characters)

**Response (201):**
```json
{
  "id": 1,
  "email": "user@example.com",
  "username": "username",
  "full_name": "John Doe",
  "gender": "Male",
  "age": 25,
  "religion": "Hindu",
  "caste": "Caste Name",
  "education": "B.Tech",
  "occupation": "Software Engineer",
  "bio": "I am a software engineer...",
  "is_active": true,
  "created_at": "2024-03-12T10:00:00"
}
```

**Error Responses:**
- `400` - Email already registered / Username already taken
- `422` - Validation failed (check field constraints)

**Example cURL:**
```bash
curl -X POST http://localhost:8000/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "username": "johndoe",
    "password": "password123",
    "full_name": "John Doe",
    "gender": "Male",
    "age": 25,
    "religion": "Hindu",
    "occupation": "Engineer",
    "bio": "Software engineer looking for a partner"
  }'
```

---

#### Login
Authenticate user and obtain JWT token.

**Request:**
```
POST /auth/login
Content-Type: application/x-www-form-urlencoded
```

**Request Body (Form Data):**
```
username=johndoe&password=password123
```

**Response (200):**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "bearer"
}
```

**Error Responses:**
- `401` - Incorrect username or password
- `422` - Missing username or password

**Example cURL:**
```bash
curl -X POST http://localhost:8000/auth/login \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "username=johndoe&password=password123"
```

**Token Usage:**
```bash
curl -X GET http://localhost:8000/users/me \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

---

### User Endpoints

#### Get Current User
Retrieve the authenticated user's profile.

**Request:**
```
GET /users/me
Authorization: Bearer {access_token}
```

**Response (200):**
```json
{
  "id": 1,
  "email": "john@example.com",
  "username": "johndoe",
  "full_name": "John Doe",
  "gender": "Male",
  "age": 25,
  "religion": "Hindu",
  "caste": "Caste",
  "education": "B.Tech",
  "occupation": "Engineer",
  "bio": "Software engineer...",
  "profile_picture": null,
  "is_active": true,
  "created_at": "2024-03-12T10:00:00"
}
```

**Error Responses:**
- `401` - Invalid or missing token

**Example cURL:**
```bash
curl -X GET http://localhost:8000/users/me \
  -H "Authorization: Bearer {access_token}"
```

---

#### Get User List
Retrieve paginated list of all users (excluding current user).

**Request:**
```
GET /users/?skip=0&limit=10
Authorization: Bearer {access_token}
```

**Query Parameters:**
| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `skip` | integer | 0 | Number of records to skip (offset) |
| `limit` | integer | 10 | Number of records to return (max recommended: 100) |

**Response (200):**
```json
[
  {
    "id": 2,
    "email": "jane@example.com",
    "username": "janedoe",
    "full_name": "Jane Doe",
    "gender": "Female",
    "age": 23,
    "religion": "Christian",
    "caste": null,
    "education": "B.A",
    "occupation": "Doctor",
    "bio": "Doctor looking for...",
    "profile_picture": null,
    "is_active": true,
    "created_at": "2024-03-11T15:30:00"
  },
  {
    "id": 3,
    "email": "mike@example.com",
    "username": "mikesmith",
    "full_name": "Mike Smith",
    "gender": "Male",
    "age": 26,
    "religion": "Hindu",
    "caste": "Caste",
    "education": "MBA",
    "occupation": "Manager",
    "bio": "Manager at...",
    "profile_picture": null,
    "is_active": true,
    "created_at": "2024-03-10T12:00:00"
  }
]
```

**Error Responses:**
- `401` - Invalid or missing token

**Example cURL:**
```bash
# Get first 10 users
curl -X GET "http://localhost:8000/users/?skip=0&limit=10" \
  -H "Authorization: Bearer {access_token}"

# Get next 10 users
curl -X GET "http://localhost:8000/users/?skip=10&limit=10" \
  -H "Authorization: Bearer {access_token}"

# Get 20 users
curl -X GET "http://localhost:8000/users/?skip=0&limit=20" \
  -H "Authorization: Bearer {access_token}"
```

---

#### Get Specific User
Retrieve a specific user's public profile.

**Request:**
```
GET /users/{user_id}
```

**Path Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| `user_id` | integer | User's unique identifier |

**Response (200):**
```json
{
  "id": 2,
  "email": "jane@example.com",
  "username": "janedoe",
  "full_name": "Jane Doe",
  "gender": "Female",
  "age": 23,
  "religion": "Christian",
  "caste": null,
  "education": "B.A",
  "occupation": "Doctor",
  "bio": "Doctor looking for...",
  "profile_picture": null,
  "is_active": true,
  "created_at": "2024-03-11T15:30:00"
}
```

**Error Responses:**
- `404` - User not found

**Example cURL:**
```bash
curl -X GET http://localhost:8000/users/2
```

---

### Health Check Endpoint

#### Health Check
Check if the API is running.

**Request:**
```
GET /health
```

**Response (200):**
```json
{
  "status": "healthy"
}
```

**Example cURL:**
```bash
curl -X GET http://localhost:8000/health
```

---

#### Root Endpoint
Get API information.

**Request:**
```
GET /
```

**Response (200):**
```json
{
  "message": "Welcome to the Matrimony API",
  "status": "online"
}
```

---

## Error Codes Reference

| Code | Status | Description |
|------|--------|-------------|
| 200 | OK | Request successful |
| 201 | Created | Resource created successfully |
| 400 | Bad Request | Invalid request data |
| 401 | Unauthorized | Missing or invalid authentication token |
| 404 | Not Found | Resource not found |
| 422 | Unprocessable Entity | Validation error |
| 500 | Server Error | Internal server error |

---

## Field Validation Rules

### Username
- **Required:** Yes
- **Type:** String
- **Constraints:**
  - Must be alphanumeric (letters and numbers only)
  - No special characters or spaces
  - Minimum length: 1
  - Must be unique in the database

### Email
- **Required:** Yes
- **Type:** String
- **Constraints:**
  - Must be valid email format (user@domain.com)
  - Must be unique in the database
  - Used for account recovery

### Password
- **Required:** Yes
- **Type:** String
- **Constraints:**
  - Minimum 6 characters
  - Hashed with bcrypt before storage
  - Never returned in API responses

### Age
- **Required:** No
- **Type:** Integer
- **Constraints:**
  - Minimum: 18
  - Maximum: 100

### Bio
- **Required:** No
- **Type:** String
- **Constraints:**
  - Maximum 1000 characters
  - Plain text (no HTML/formatting)

### Gender
- **Required:** No
- **Type:** String (Enum)
- **Valid Values:** Male, Female, Other

---

## Rate Limiting

Currently, the API does not have rate limiting. For production deployment, consider implementing:
- 100 requests per minute per IP
- 1000 requests per hour per user
- Custom limits for authentication endpoints

---

## CORS Policy

The API allows requests from:
- `http://localhost:3000`
- `http://127.0.0.1:3000`

**Allowed Methods:**
- GET
- POST
- PUT
- DELETE

**Allowed Headers:**
- Content-Type
- Authorization

---

## Best Practices

### 1. Always Include Authorization Header
```javascript
const headers = {
  'Authorization': `Bearer ${token}`,
  'Content-Type': 'application/json'
};
```

### 2. Handle Token Expiration
```javascript
if (response.status === 401) {
  // Token expired, redirect to login
  window.location.href = '/login';
}
```

### 3. Use Pagination for Large Datasets
```javascript
// Bad - gets all users (slow)
GET /users/?limit=999999

// Good - gets 10 at a time
GET /users/?skip=0&limit=10
GET /users/?skip=10&limit=10
```

### 4. Validate Input Before Sending
```javascript
// Validate age
if (age < 18 || age > 100) {
  throw new Error('Age must be between 18 and 100');
}

// Validate username
if (!/^[a-zA-Z0-9]+$/.test(username)) {
  throw new Error('Username must be alphanumeric');
}
```

### 5. Use Appropriate HTTP Methods
- GET - Retrieve data
- POST - Create new data
- PUT - Update existing data
- DELETE - Remove data

---

## API Testing Tools

### Postman Collection
Import this collection into Postman for easy testing:
[Link to Postman collection]

### Thunder Client
Use Thunder Client extension in VS Code for quick API testing

### cURL
Command-line tool for API testing (examples provided above)

---

## Changelog

### Version 1.0.0 (Current)
- Initial API release
- User authentication (signup/login)
- User profile management
- User browsing with pagination
- JWT-based authorization

### Planned Features
- Email verification
- Password reset
- Profile picture upload
- User matching algorithm
- Interest/like system
- Messaging system
