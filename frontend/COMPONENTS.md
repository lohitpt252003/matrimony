# Matrimony App - Component Documentation

## Overview

This document describes all components in the Matrimony application, including their structure, props, and usage.

## Component Directory Structure

```
src/
├── components/
│   └── Button/
│       ├── index.jsx
│       ├── index.css
│       ├── light.css
│       ├── dark.css
│       ├── mlight.css
│       └── mdark.css
├── pages/
│   ├── HomePage/
│   ├── LoginPage/
│   └── SignupPage/
└── context/
    └── AuthContext/
        └── index.jsx
```

## Reusable Components

### Button Component

**Location:** `src/components/Button/`

**Purpose:** Reusable button component with multiple variants and sizes.

**Props:**

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `children` | React.ReactNode | - | Yes | Button text/content |
| `variant` | string | 'primary' | No | Button style variant: 'primary', 'secondary', 'success', 'danger' |
| `size` | string | 'medium' | No | Button size: 'small', 'medium', 'large' |
| `disabled` | boolean | false | No | Disables the button |
| `onClick` | function | - | No | Click event handler |
| `type` | string | 'button' | No | Button type: 'button', 'submit', 'reset' |
| `className` | string | '' | No | Additional CSS classes |

**Example Usage:**

```jsx
import Button from '../components/Button';

// Primary button
<Button onClick={handleClick}>Click Me</Button>

// Success button, large size
<Button variant="success" size="large">Save</Button>

// Disabled danger button
<Button variant="danger" disabled>Delete</Button>

// Submit button
<Button type="submit">Submit Form</Button>
```

**CSS Classes:**

- `.btn` - Base button styles
- `.btn-primary` - Primary color variant
- `.btn-secondary` - Secondary color variant
- `.btn-success` - Success color variant
- `.btn-danger` - Danger color variant
- `.btn-small` - Small size
- `.btn-medium` - Medium size
- `.btn-large` - Large size

**Theme Support:**
- Light theme: `light.css`
- Dark theme: `dark.css`
- Mobile light: `mlight.css`
- Mobile dark: `mdark.css`

---

## Page Components

### HomePage

**Location:** `src/pages/HomePage/`

**Purpose:** Main landing page showing user profiles with browsing and pagination.

**Features:**
- Authentication-gated (requires login)
- Profile grid display with pagination
- Loading states and error handling
- Responsive design with mobile support

**Context Used:**
- `useAuth()` - For authentication and user info

**CSS Files:**
- `index.css` - Layout and structure
- `light.css` - Light theme colors
- `dark.css` - Dark theme colors
- `mlight.css` - Mobile light adjustments
- `mdark.css` - Mobile dark adjustments

**Key DOM Elements:**

```jsx
// Navigation bar
<nav className="home-nav">
  <h1 className="home-title">Eternal Bloom</h1>
  <div className="home-nav-actions">
    {/* Login/Logout buttons */}
  </div>
</nav>

// Hero section
<section className="home-hero glass-card">
  <h2 className="home-hero-title">Find Your Perfect Match</h2>
  <p className="home-hero-subtitle">Connecting hearts...</p>
</section>

// Profile grid
<div className="home-profiles-grid">
  {profiles.map(profile => (
    <div className="home-profile-card">
      <div className="home-profile-image">👤</div>
      <div className="home-profile-info">
        <h4 className="home-profile-name">{profile.full_name}</h4>
        <p className="home-profile-details">{profile.age} yrs • {profile.religion} • {profile.occupation}</p>
        <p className="home-profile-bio">{profile.bio?.substring(0, 100)}...</p>
        <button className="btn btn-primary home-view-btn">View Profile</button>
      </div>
    </div>
  ))}
</div>

// Pagination
<div className="home-pagination">
  <button onClick={() => setSkip(Math.max(0, skip - 10))}>Previous</button>
  <button onClick={() => setSkip(skip + 10)}>Next</button>
</div>
```

**State Management:**

```javascript
const [profiles, setProfiles] = useState([]);    // List of user profiles
const [loading, setLoading] = useState(false);   // Loading state
const [skip, setSkip] = useState(0);             // Pagination offset
const [error, setError] = useState('');          // Error message
```

**API Calls:**

```javascript
// Get paginated list of users (requires authentication)
GET /users/?skip={skip}&limit=10
Headers: { Authorization: Bearer {token} }
```

---

### LoginPage

**Location:** `src/pages/LoginPage/`

**Purpose:** User authentication and login screen.

**Features:**
- Form validation
- Error messaging
- Loading state during submission
- Responsive form layout
- Link to signup page

**Context Used:**
- `useAuth()` - For login function

**CSS Files:**
- `index.css` - Form layout
- `light.css` - Light theme
- `dark.css` - Dark theme
- `mlight.css` - Mobile light
- `mdark.css` - Mobile dark

**Key DOM Elements:**

```jsx
<div className="login-container">
  <div className="login-card glass-card">
    <h2 className="login-title">Login</h2>
    {error && <p className="login-error">{error}</p>}
    
    <form className="login-form" onSubmit={handleSubmit}>
      <input 
        className="login-input input-field"
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        disabled={loading}
      />
      
      <input
        className="login-input input-field"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        disabled={loading}
      />
      
      <button className="login-button btn btn-primary" type="submit" disabled={loading}>
        {loading ? 'Logging in...' : 'Login'}
      </button>
    </form>
    
    <p className="login-footer">
      Don't have an account? <Link to="/signup" className="login-link">Sign up</Link>
    </p>
  </div>
</div>
```

**State Management:**

```javascript
const [username, setUsername] = useState('');
const [password, setPassword] = useState('');
const [error, setError] = useState('');
const [loading, setLoading] = useState(false);
```

**API Calls:**

```javascript
// Login user
POST /auth/login
Content-Type: application/x-www-form-urlencoded

username=username&password=password

Response: { access_token: "...", token_type: "bearer" }
```

---

### SignupPage

**Location:** `src/pages/SignupPage/`

**Purpose:** User registration and profile creation.

**Features:**
- Multi-field form with validation
- Gender, religion, caste selections
- Bio textarea with character limit
- Loading states and error handling
- Age and password validation feedback

**Context Used:**
- None directly (uses React Router)

**CSS Files:**
- `index.css` - Form grid layout
- `light.css` - Light theme
- `dark.css` - Dark theme
- `mlight.css` - Mobile responsive
- `mdark.css` - Mobile dark

**Key DOM Elements:**

```jsx
<div className="signup-container">
  <div className="signup-card glass-card">
    <h2 className="signup-title">Create Your Profile</h2>
    {error && <p className="signup-error">{error}</p>}
    
    <form className="signup-form" onSubmit={handleSubmit}>
      {/* Basic Info */}
      <input name="full_name" placeholder="Full Name" required disabled={loading} />
      <input name="email" type="email" placeholder="Email" required disabled={loading} />
      
      {/* Credentials */}
      <input name="username" placeholder="Username (alphanumeric)" required disabled={loading} />
      <input name="password" type="password" placeholder="Password (min 6 chars)" required disabled={loading} />
      
      {/* Demographics */}
      <select name="gender" disabled={loading}>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
        <option value="Other">Other</option>
      </select>
      <input name="age" type="number" placeholder="Age (18-100)" required disabled={loading} />
      
      {/* Background */}
      <input name="religion" placeholder="Religion" disabled={loading} />
      <input name="caste" placeholder="Caste" disabled={loading} />
      
      {/* Professional */}
      <input name="education" placeholder="Education" disabled={loading} />
      <input name="occupation" placeholder="Occupation" disabled={loading} />
      
      {/* Bio */}
      <textarea 
        name="bio" 
        placeholder="Tell us about yourself (max 1000 chars)"
        disabled={loading}
      ></textarea>
      
      <button className="signup-button btn btn-primary" type="submit" disabled={loading}>
        {loading ? 'Registering...' : 'Register'}
      </button>
    </form>
  </div>
</div>
```

**Form Structure:**
- 2-column grid layout (1 column on mobile)
- Bio textarea spans full width
- Submit button spans full width

**State Management:**

```javascript
const [formData, setFormData] = useState({
  email: '',
  username: '',
  password: '',
  full_name: '',
  gender: 'Male',
  age: 25,
  religion: '',
  caste: '',
  education: '',
  occupation: '',
  bio: ''
});
const [error, setError] = useState('');
const [loading, setLoading] = useState(false);
```

**API Calls:**

```javascript
// Create user account
POST /auth/signup
Content-Type: application/json

{
  "email": "...",
  "username": "...",
  "password": "...",
  "full_name": "...",
  "gender": "...",
  "age": 25,
  "religion": "...",
  "caste": "...",
  "education": "...",
  "occupation": "...",
  "bio": "..."
}

Response: { id: 1, email: "...", username: "..." }
```

**Validation:**
- Email: Must be valid email format
- Username: Alphanumeric only
- Password: Minimum 6 characters
- Age: Must be between 18-100
- Bio: Maximum 1000 characters

---

## Context Components

### AuthContext

**Location:** `src/context/AuthContext/`

**Purpose:** Manages global authentication state and user data.

**Provides:**

| Property | Type | Description |
|----------|------|-------------|
| `user` | object \| null | Current authenticated user object |
| `token` | string \| null | JWT authentication token |
| `login(token)` | function | Set authentication token and fetch user |
| `logout()` | function | Clear authentication and user data |
| `isLoading` | boolean | Loading state during auth check |

**Usage Example:**

```jsx
import { useAuth } from './context/AuthContext';

const MyComponent = () => {
  const { user, token, login, logout, isLoading } = useAuth();
  
  if (isLoading) {
    return <div>Loading...</div>;
  }
  
  if (!user) {
    return <div>Please login</div>;
  }
  
  return (
    <div>
      <p>Welcome, {user.full_name}</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
};
```

**User Object Structure:**

```javascript
{
  id: 1,
  email: "user@example.com",
  username: "username",
  full_name: "Full Name",
  gender: "Male",
  age: 25,
  religion: "Hindu",
  caste: "Caste",
  education: "Graduate",
  occupation: "Engineer",
  bio: "About me",
  profile_picture: "url_or_null",
  is_active: true,
  created_at: "2024-03-12T10:00:00"
}
```

**API Calls Made:**

```javascript
// On token change
GET /users/me
Headers: { Authorization: Bearer {token} }

// Stores user data in state
```

**Token Storage:**
- Stored in browser's localStorage
- Retrieved and validated on app load
- Cleared on logout

---

## CSS Styling Guide

### Theme Structure

Each component follows this CSS pattern:

**Base Styles (index.css):**
- Layout and positioning
- Sizing and spacing
- Typography
- Hover/focus states

**Light Theme (light.css):**
- Light background colors
- Dark text colors
- Light border colors
- Accent colors for light mode

**Dark Theme (dark.css):**
- Dark background colors
- Light text colors
- Dark border colors
- Bright accent colors

**Mobile Light (mlight.css):**
```css
@media (max-width: 768px) {
  /* Mobile-specific light theme adjustments */
}
```

**Mobile Dark (mdark.css):**
```css
@media (max-width: 768px) {
  :root[data-theme="dark"] {
    /* Mobile-specific dark theme adjustments */
  }
}
```

### CSS Class Naming Convention

```css
/* Component name */
.component-name { }

/* Sub-elements */
.component-name-element { }

/* Modifiers */
.component-name--modifier { }

/* States */
.component-name.is-active { }
.component-name:disabled { }
.component-name:hover:not(:disabled) { }
```

---

## Component Composition Example

How components work together:

```jsx
// App.jsx
<AuthProvider>
  <Router>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
    </Routes>
  </Router>
</AuthProvider>

// HomePage.jsx
<div>
  <nav>
    {/* Uses useAuth from AuthContext */}
    {user && <button onClick={logout}>Logout</button>}
  </nav>
  {profiles.map(profile => (
    <div>
      {/* Could use Button component here */}
      <Button onClick={handleViewProfile}>View Profile</Button>
    </div>
  ))}
</div>
```

---

## Performance Tips

1. **Memoization:** Use React.memo for components that don't need frequent updates
2. **Lazy Loading:** Use React.lazy() for large pages
3. **CSS Specificity:** Keep CSS specific to avoid conflicts
4. **Event Delegation:** Use event bubbling for lists
5. **State Management:** Keep state as local as possible

---

## Testing Components

### Button Component Test
```jsx
import Button from './components/Button';

test('renders button with text', () => {
  render(<Button>Click Me</Button>);
  expect(screen.getByText('Click Me')).toBeInTheDocument();
});

test('calls onClick when clicked', () => {
  const handleClick = jest.fn();
  render(<Button onClick={handleClick}>Click</Button>);
  fireEvent.click(screen.getByText('Click'));
  expect(handleClick).toHaveBeenCalled();
});
```

### Integration Test
```jsx
test('can login and view homepage', async () => {
  render(<App />);
  // Fill login form
  // Submit
  // Assert homepage visible
});
```

---

## Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| Component not rendering | Check if state is properly initialized |
| Styles not applying | Verify CSS files are imported in component |
| Theme not switching | Ensure `data-theme` attribute is set on root |
| API calls failing | Check token validity and API URL |
| Form validation errors | Verify input constraints match backend validation |

