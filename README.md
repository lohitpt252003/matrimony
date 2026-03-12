# Matrimony App

A full-stack matrimony matching application built with React (JavaScript) and FastAPI.

## Quick Links

- **� Quick Start:** [QUICKSTART.md](./QUICKSTART.md) - Get up and running in 5 minutes
- **🔄 Development Workflow:** [DEVELOPMENT.md](./DEVELOPMENT.md) - Auto-reload setup and troubleshooting
- **�📚 Setup Guide:** [SETUP.md](./SETUP.md) - Complete installation and deployment instructions
- **🔧 Frontend Docs:** [frontend/FRONTEND.md](./frontend/FRONTEND.md) - React components and frontend architecture
- **🖥️ Backend Docs:** [backend/BACKEND.md](./backend/BACKEND.md) - FastAPI endpoints and database schema
- **📱 Component Guide:** [frontend/COMPONENTS.md](./frontend/COMPONENTS.md) - Detailed component documentation
- **🎨 Theming System:** [THEMING.md](./THEMING.md) - Light/Dark mode and responsive design
- **🔌 API Reference:** [API.md](./API.md) - Complete API endpoint documentation

## Project Overview

A matrimony matching platform that allows users to create profiles, browse other members, and connect with potential matches.

### Features

✅ **User Management**
- User registration and authentication
- Profile creation with detailed information
- JWT-based authentication
- Password security with bcrypt hashing

✅ **Profile Browsing**
- View other user profiles
- Pagination support
- Responsive design for desktop and mobile
- Authentication-gated access

✅ **Modern UI**
- React with pure JavaScript (no TypeScript)
- Component-based architecture
- Light and Dark theme support
- Mobile-first responsive design
- Smooth loading states

✅ **Security**
- Input validation on both frontend and backend
- Protected endpoints (requires authentication)
- CORS restrictions
- Password strength requirements
- Secure token management

## Tech Stack

### Frontend
- **React 18** - UI library
- **React Router 6** - Client-side routing
- **JavaScript (ES6+)** - No TypeScript
- **CSS3** - Theming with light/dark modes
- **Responsive Design** - Mobile, tablet, desktop support

### Backend
- **FastAPI** - Modern Python web framework
- **SQLAlchemy** - ORM for database operations
- **PostgreSQL** - Relational database
- **JWT** - JSON Web Tokens for authentication
- **Pydantic** - Data validation

### DevOps
- **Docker** - Containerization
- **Docker Compose** - Multi-container orchestration
- **Uvicorn** - ASGI server for FastAPI

## Project Structure

```
matrimony/
├── frontend/                 # React frontend
│   ├── src/
│   │   ├── components/      # Reusable components
│   │   ├── pages/           # Page components
│   │   ├── context/         # React context (auth)
│   │   └── App.jsx
│   ├── package.json
│   └── Dockerfile
├── backend/                  # FastAPI backend
│   ├── app/
│   │   ├── models/          # SQLAlchemy models
│   │   ├── routers/         # API endpoints
│   │   ├── schemas/         # Pydantic schemas
│   │   ├── main.py          # FastAPI app
│   │   └── auth.py          # Authentication logic
│   ├── requirements.txt
│   └── Dockerfile
├── docker-compose.yml        # Container orchestration
├── README.md                 # This file
├── SETUP.md                  # Setup and installation
├── API.md                    # API documentation
├── THEMING.md               # Theme documentation
└── .gitignore
```

## Quick Start

### Prerequisites
- Docker and Docker Compose (recommended)
- OR Python 3.8+, Node.js 16+, PostgreSQL 12+

### Using Docker with Auto-Reload (Recommended for Development)

**Easiest way - Run the startup script:**

**Linux/macOS:**
```bash
chmod +x dev.sh
./dev.sh
```

**Windows:**
```bash
dev.bat
```

**Or manually start with auto-reload enabled:**

```bash
# Clone repository
git clone https://github.com/lohitpt252003/matrimony.git
cd matrimony

# Create environment files
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env

# Edit .env files with your configuration (optional)

# Start with auto-reload on file changes
docker-compose -f docker-compose.dev.yml up
```

**Access the application:**
- Frontend: http://localhost:3000
- Backend: http://localhost:8000
- API Docs: http://localhost:8000/docs

**⚡ Files auto-reload on change** - No manual restart needed!

For detailed development workflow, see [DEVELOPMENT.md](./DEVELOPMENT.md).

### Using Docker for Production

```bash
# Clone repository
git clone https://github.com/lohitpt252003/matrimony.git
cd matrimony

# Create environment files
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env

# Edit .env files with your configuration
# - Update DATABASE_URL for PostgreSQL
# - Set a secure SECRET_KEY
# - Update REACT_APP_API_URL if needed

# Start all services
docker-compose up -d

# Access the application
# - Frontend: http://localhost:3000
# - Backend: http://localhost:8000
# - API Docs: http://localhost:8000/docs
```

### Local Development

See [SETUP.md](./SETUP.md) for detailed local setup instructions.

```bash
# Backend setup
cd backend
python -m venv venv
source venv/bin/activate  # or venv\Scripts\activate on Windows
pip install -r requirements.txt
uvicorn app.main:app --reload

# Frontend setup (in new terminal)
cd frontend
npm install
npm start
```

## Documentation

### For Different Audiences

**⚡ Want to Start Immediately?**
- [QUICKSTART.md](./QUICKSTART.md) - 5-minute quick reference

**🔄 Development Workflow?**
- [DEVELOPMENT.md](./DEVELOPMENT.md) - Auto-reload setup and troubleshooting

**🔧 Developers Building Features**
1. Start with [SETUP.md](./SETUP.md) for local development setup
2. Read [frontend/COMPONENTS.md](./frontend/COMPONENTS.md) to understand component architecture
3. Check [THEMING.md](./THEMING.md) for styling guidelines
4. Review [backend/BACKEND.md](./backend/BACKEND.md) for API structure
5. Reference [DEVELOPMENT.md](./DEVELOPMENT.md) for auto-reload and troubleshooting

**📱 Frontend Developers**
1. [frontend/FRONTEND.md](./frontend/FRONTEND.md) - Project structure and tools
2. [frontend/COMPONENTS.md](./frontend/COMPONENTS.md) - Component API and usage
3. [THEMING.md](./THEMING.md) - CSS theming system
4. [DEVELOPMENT.md](./DEVELOPMENT.md) - File watch setup and hot reload

**🖥️ Backend Developers**
1. [backend/BACKEND.md](./backend/BACKEND.md) - Database schema and models
2. [API.md](./API.md) - Endpoint reference
3. [SETUP.md](./SETUP.md) - Database setup
4. [DEVELOPMENT.md](./DEVELOPMENT.md) - Auto-reload configuration

**🔌 API Integration**
1. [API.md](./API.md) - Complete endpoint documentation
2. [SETUP.md](./SETUP.md) - Local testing setup
3. Example cURL commands in [API.md](./API.md)

**📦 DevOps / Deployment**
1. [SETUP.md](./SETUP.md) - Docker and local setup
2. [DEVELOPMENT.md](./DEVELOPMENT.md) - Development vs. Production configurations

## Key Features

### Authentication
- User registration with profile creation
- Secure login with JWT tokens
- Password hashing with bcrypt
- Token expiration and refresh

### User Profiles
- Required fields: Email, username, password, full name
- Optional fields: Age, gender, religion, caste, education, occupation, bio
- Profile visibility with pagination
- Authentication required for browsing

### Security Measures
- Input validation (email, username, password, age, bio)
- CORS restrictions (only localhost:3000)
- Protected endpoints (authentication required)
- SQL injection prevention via ORM
- XSS protection in frontend

### Responsive Design
- Desktop: Full layout with multiple columns
- Tablet: Adjusted spacing and sizing
- Mobile: Single column layout, larger tap targets
- Automatic theme switching (light/dark mode)

## Component Architecture

### Pages
- **HomePage** - Profile browsing with pagination
- **LoginPage** - User authentication
- **SignupPage** - User registration

### Reusable Components
- **Button** - Multi-variant button component
- **Card** - Content container (via CSS)

### Context
- **AuthContext** - Global authentication state

Each component has dedicated CSS files:
- `index.css` - Base styles
- `light.css` - Light theme
- `dark.css` - Dark theme
- `mlight.css` - Mobile light
- `mdark.css` - Mobile dark

## API Endpoints

### Authentication
- `POST /auth/signup` - User registration
- `POST /auth/login` - User login

### Users
- `GET /users/me` - Get current user profile
- `GET /users/?skip=0&limit=10` - Browse user profiles
- `GET /users/{user_id}` - Get specific user profile

Full API documentation: [API.md](./API.md)

## Environment Variables

### Backend
```
DATABASE_URL=postgresql://user:password@db:5432/matrimony
SECRET_KEY=your-secret-key-change-this
ACCESS_TOKEN_EXPIRE_MINUTES=30
```

### Frontend
```
REACT_APP_API_URL=http://localhost:8000
```

See `.env.example` files for all available options.

## Testing

### API Testing
```bash
# Signup
curl -X POST http://localhost:8000/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","username":"testuser","password":"pass123","full_name":"Test User","gender":"Male","age":25}'

# Login
curl -X POST http://localhost:8000/auth/login \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "username=testuser&password=pass123"
```

See [API.md](./API.md) for more examples.

## Deployment

### Production Checklist
- [ ] Change SECRET_KEY to strong random value
- [ ] Update database credentials
- [ ] Set DEBUG=false
- [ ] Configure frontend API URL
- [ ] Enable HTTPS
- [ ] Setup database backups
- [ ] Configure logging and monitoring
- [ ] Review security settings

### Deployment Guides
See [SETUP.md](./SETUP.md) for detailed deployment instructions.

## Performance

- Pagination for large datasets
- Database indexing on frequently queried fields
- Connection pooling for database
- CSS-based theming (no re-renders)
- JWT-based stateless authentication

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Security & Best Practices

- ✅ Input validation on both frontend and backend
- ✅ Password hashing with bcrypt
- ✅ JWT authentication with expiration
- ✅ CORS restrictions
- ✅ SQL injection prevention (ORM)
- ✅ XSS protection
- ✅ Secure environment variable handling

## Troubleshooting

### Common Issues

**Docker containers won't start:**
```bash
docker-compose logs
docker-compose up --build
```

**API connection errors:**
- Check `REACT_APP_API_URL` in frontend/.env
- Verify backend is running: `curl http://localhost:8000/health`
- Check CORS settings in backend/app/main.py

**Database connection error:**
- Verify PostgreSQL is running
- Check DATABASE_URL in backend/.env
- Ensure database exists: `createdb matrimony`

See [SETUP.md](./SETUP.md) for more troubleshooting tips.

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Roadmap

- [ ] Email verification
- [ ] Password reset functionality
- [ ] Profile picture upload
- [ ] Advanced matching algorithm
- [ ] Interest/like system
- [ ] Messaging system
- [ ] Admin dashboard
- [ ] Analytics

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For issues, questions, or suggestions:
- Create an issue on GitHub
- Check existing documentation first
- Review [SETUP.md](./SETUP.md) for common problems

## Acknowledgments

- FastAPI documentation
- React documentation
- PostgreSQL documentation
- Docker documentation

---

**Made with ❤️ by the Matrimony Team**
