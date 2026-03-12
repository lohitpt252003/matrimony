# Frontend Documentation

## Project Structure

```
frontend/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   └── Button/
│   │       ├── index.jsx
│   │       ├── index.css
│   │       ├── light.css
│   │       ├── dark.css
│   │       ├── mlight.css
│   │       └── mdark.css
│   ├── context/
│   │   ├── AuthContext.jsx (legacy - can be removed)
│   │   └── AuthContext/
│   │       └── index.jsx
│   ├── pages/
│   │   ├── HomePage/
│   │   │   ├── index.jsx
│   │   │   ├── index.css
│   │   │   ├── light.css
│   │   │   ├── dark.css
│   │   │   ├── mlight.css
│   │   │   └── mdark.css
│   │   ├── LoginPage/
│   │   │   ├── index.jsx
│   │   │   ├── index.css
│   │   │   ├── light.css
│   │   │   ├── dark.css
│   │   │   ├── mlight.css
│   │   │   └── mdark.css
│   │   └── SignupPage/
│   │       ├── index.jsx
│   │       ├── index.css
│   │       ├── light.css
│   │       ├── dark.css
│   │       ├── mlight.css
│   │       └── mdark.css
│   ├── App.jsx
│   ├── index.jsx
│   └── index.css
├── .env.example
├── Dockerfile
├── package.json
└── tsconfig.json
```

## Component Architecture

### Page Components

#### HomePage
Displays user profiles with browsing and pagination capabilities.

**Features:**
- Profile grid display with pagination
- Authentication-gated (requires login)
- Loading states and error handling
- Responsive design with mobile support

**Files:**
- `index.jsx` - Component logic
- `index.css` - Base styles
- `light.css` - Light theme colors
- `dark.css` - Dark theme colors
- `mlight.css` - Mobile light theme
- `mdark.css` - Mobile dark theme

**Props:** None (uses AuthContext)

#### LoginPage
Handles user authentication.

**Features:**
- Form validation
- Error messaging
- Loading state during submission
- Responsive form layout

**Files:**
- `index.jsx` - Component logic
- `index.css` - Base form styles
- `light.css` - Light theme
- `dark.css` - Dark theme
- `mlight.css` - Mobile light styles
- `mdark.css` - Mobile dark styles

**Props:** None (uses AuthContext and Router)

#### SignupPage
User registration and profile creation.

**Features:**
- Multi-field form with validation
- Gender, religion, caste selections
- Bio textarea with character limit
- Loading states and error handling

**Files:**
- `index.jsx` - Component logic
- `index.css` - Base form styles
- `light.css` - Light theme
- `dark.css` - Dark theme
- `mlight.css` - Mobile light styles
- `mdark.css` - Mobile dark styles

**Props:** None (uses Router)

### Reusable Components

#### Button
Reusable button component with variants and sizes.

**Props:**
- `children` (required) - Button text
- `variant` - 'primary' | 'secondary' | 'success' | 'danger' (default: 'primary')
- `size` - 'small' | 'medium' | 'large' (default: 'medium')
- `disabled` - boolean (default: false)
- `onClick` - function
- `type` - 'button' | 'submit' | 'reset' (default: 'button')
- `className` - additional CSS classes

**Usage:**
```jsx
import Button from './components/Button';

<Button variant="primary" size="large" onClick={handleClick}>
  Click Me
</Button>
```

### Context

#### AuthContext
Manages authentication state and user data.

**Provides:**
- `user` - Authenticated user object
- `token` - JWT token string
- `login(token)` - Set authentication token
- `logout()` - Clear authentication
- `isLoading` - Loading state during auth check

**Usage:**
```jsx
import { useAuth } from './context/AuthContext';

const MyComponent = () => {
  const { user, logout, token } = useAuth();
  
  return (
    <div>
      {user && <p>Welcome, {user.full_name}</p>}
    </div>
  );
};
```

## Theming System

### CSS Theme Structure

Each component follows this theming pattern:

**Base Styles (index.css)**
- Layout and structure
- Common spacing and sizing
- Typography

**Light Theme (light.css)**
- Light mode colors
- Light theme specific styling

**Dark Theme (dark.css)**
- Dark mode colors (prefixed with `:root[data-theme="dark"]`)
- Dark theme specific styling

**Mobile Light Theme (mlight.css)**
- Mobile breakpoints (max-width: 768px)
- Mobile-specific light theme adjustments

**Mobile Dark Theme (mdark.css)**
- Mobile breakpoints with dark theme
- Mobile-specific dark theme adjustments

### Adding Dark Theme Support

To enable dark mode, add this to the root element:
```html
<div data-theme="dark">
  <!-- Your app content -->
</div>
```

Or dynamically:
```jsx
document.documentElement.setAttribute('data-theme', 'dark');
```

### CSS Variables

Define theme colors as CSS variables:
```css
:root {
  --accent-color: #ff6b9d;
  --border-color: #ddd;
  --text-color: #333;
}

:root[data-theme="dark"] {
  --accent-color: #ff6b9d;
  --border-color: #555;
  --text-color: #e0e0e0;
}
```

## Environment Variables

Create a `.env` file in the `frontend/` directory:

```
REACT_APP_API_URL=http://localhost:8000
```

See `.env.example` for all available variables.

## Installation & Setup

### Requirements
- Node.js 16+
- npm or yarn

### Install Dependencies
```bash
cd frontend
npm install
```

### Development Server
```bash
npm start
```
Runs on `http://localhost:3000`

### Build for Production
```bash
npm run build
```

### Running Tests
```bash
npm test
```

## Component Development Guidelines

### Creating a New Component

1. Create a directory under `src/components/` or `src/pages/`
2. Create `index.jsx` with component logic
3. Create CSS files:
   - `index.css` - Base styles
   - `light.css` - Light theme
   - `dark.css` - Dark theme
   - `mlight.css` - Mobile light
   - `mdark.css` - Mobile dark

4. Import all CSS files in the component:
```jsx
import './index.css';
import './light.css';
import './dark.css';
import './mlight.css';
import './mdark.css';
```

### Naming Conventions

- Component files: `index.jsx`
- CSS class names: `{component-name}-{element}` (e.g., `home-nav`, `login-button`)
- Component directories: PascalCase (e.g., `HomePage`, `LoginPage`)

### CSS Class Naming Pattern

```css
/* Base component element */
.component-name { }

/* Sub-elements */
.component-name-element { }

/* Variants */
.component-name--variant { }

/* States */
.component-name.is-active { }
.component-name:disabled { }
```

## Responsive Design

### Breakpoints

- Mobile: `max-width: 768px`
- Tablet: `768px - 1024px`
- Desktop: `1024px+`

### Mobile-First Approach

Write mobile styles in `index.css` and tablet/desktop overrides in media queries.

## API Integration

Base API URL is configured via `REACT_APP_API_URL` environment variable.

### Authentication

All authenticated requests require:
```javascript
headers: {
  'Authorization': `Bearer ${token}`
}
```

### Endpoints Used

- `POST /auth/signup` - User registration
- `POST /auth/login` - User login
- `GET /users/me` - Get current user
- `GET /users/?skip=0&limit=10` - Get paginated user list

## Performance Tips

1. Use React.memo for components that don't need frequent updates
2. Implement lazy loading for routes
3. Optimize images and assets
4. Use CSS variables for theming to avoid re-renders
5. Debounce API calls for search/filter operations

## Troubleshooting

### Dark Theme Not Working
- Ensure `data-theme="dark"` is set on root element
- Check that dark.css files are imported in components
- Verify CSS selector specificity

### API Calls Failing
- Check `REACT_APP_API_URL` environment variable
- Verify backend is running on the correct port
- Check browser console for CORS errors

### Components Not Rendering
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`
- Clear browser cache
- Check console for JavaScript errors

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)
