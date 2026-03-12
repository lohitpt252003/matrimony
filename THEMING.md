# Theming Guide

## Overview

The Matrimony app implements a comprehensive theming system that supports:
- Light and Dark modes
- Desktop and Mobile responsive designs
- Smooth transitions between themes

## Theme Structure

### CSS File Organization

Each component has 5 CSS files:

```
Component/
├── index.css      # Base styles (layout, structure, typography)
├── light.css      # Light theme colors
├── dark.css       # Dark theme colors
├── mlight.css     # Mobile light theme
└── mdark.css      # Mobile dark theme
```

### How Themes Work

**Light Theme:**
- Applied by default
- Standard colors and contrast

**Dark Theme:**
- Activated by `data-theme="dark"` attribute
- Uses CSS selectors with `:root[data-theme="dark"]`
- Inverts colors for better readability

**Mobile Themes:**
- Applied at breakpoint `max-width: 768px`
- Adjust sizing and spacing for smaller screens
- Maintain theme consistency on mobile

## CSS Variables

Define theme variables in root:

```css
:root {
  --accent-color: #ff6b9d;
  --text-primary: #333;
  --text-secondary: #666;
  --bg-primary: #fff;
  --bg-secondary: #f5f5f5;
  --border-color: #ddd;
  --shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

:root[data-theme="dark"] {
  --accent-color: #ff6b9d;
  --text-primary: #e0e0e0;
  --text-secondary: #bbb;
  --bg-primary: #1a1a1a;
  --bg-secondary: #2a2a2a;
  --border-color: #555;
  --shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
}
```

## Implementation Example

### Base Styles (index.css)

```css
/* Layout and structure */
.component-name {
  display: flex;
  flex-direction: column;
  padding: 20px;
}

.component-name-element {
  margin: 10px 0;
  font-size: 1rem;
}

/* Default colors - can be overridden by theme */
.component-name-element {
  background-color: var(--bg-primary);
  color: var(--text-primary);
  border: 1px solid var(--border-color);
}
```

### Light Theme (light.css)

```css
/* Light theme specific colors */
.component-name {
  background-color: #fff;
  color: #333;
}

.component-name-element {
  background-color: #f5f5f5;
  border-color: #ddd;
  color: #333;
}

.component-name-element:hover {
  background-color: #ede7f6;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
```

### Dark Theme (dark.css)

```css
/* Dark theme specific colors */
/* Use :root[data-theme="dark"] selector */

:root[data-theme="dark"] .component-name {
  background-color: #1a1a1a;
  color: #e0e0e0;
}

:root[data-theme="dark"] .component-name-element {
  background-color: #2a2a2a;
  border-color: #555;
  color: #e0e0e0;
}

:root[data-theme="dark"] .component-name-element:hover {
  background-color: #3a3a3a;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
}
```

### Mobile Light Theme (mlight.css)

```css
/* Mobile responsive adjustments for light theme */
@media (max-width: 768px) {
  .component-name {
    padding: 15px;  /* Reduce padding on mobile */
  }

  .component-name-element {
    font-size: 0.95rem;  /* Slightly smaller text */
  }
}
```

### Mobile Dark Theme (mdark.css)

```css
/* Mobile responsive adjustments for dark theme */
@media (max-width: 768px) {
  :root[data-theme="dark"] .component-name {
    padding: 15px;
  }

  :root[data-theme="dark"] .component-name-element {
    font-size: 0.95rem;
  }
}
```

## Switching Themes

### JavaScript Implementation

```javascript
// Get current theme
const currentTheme = document.documentElement.getAttribute('data-theme');

// Set theme to dark
document.documentElement.setAttribute('data-theme', 'dark');

// Set theme to light (or remove attribute)
document.documentElement.removeAttribute('data-theme');

// Toggle theme
const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
document.documentElement.setAttribute('data-theme', isDark ? '' : 'dark');

// Persist theme preference
localStorage.setItem('theme', isDark ? 'dark' : 'light');

// Load saved theme
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
  document.documentElement.setAttribute('data-theme', 'dark');
}
```

### React Hook Example

```jsx
import { useEffect, useState } from 'react';

const useTheme = () => {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    // Load saved theme
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme === 'dark' ? 'dark' : '');
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme === 'dark' ? 'dark' : '');
  };

  return { theme, toggleTheme };
};

export default useTheme;
```

### Theme Toggle Button

```jsx
import { useTheme } from './hooks/useTheme';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button onClick={toggleTheme}>
      {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
    </button>
  );
};

export default ThemeToggle;
```

## Color Palette

### Light Theme
```
Primary/Accent: #ff6b9d (Pink)
Text Primary: #333333
Text Secondary: #666666
Background Primary: #ffffff
Background Secondary: #f5f5f5
Border: #dddddd
Success: #28a745 (Green)
Danger: #dc3545 (Red)
Warning: #ffc107 (Yellow)
Info: #17a2b8 (Cyan)
```

### Dark Theme
```
Primary/Accent: #ff6b9d (Pink)
Text Primary: #e0e0e0
Text Secondary: #bbbbbb
Background Primary: #1a1a1a
Background Secondary: #2a2a2a
Border: #555555
Success: #51cf66 (Green)
Danger: #ff6b6b (Red)
Warning: #ffd43b (Yellow)
Info: #74c0fc (Cyan)
```

## Responsive Breakpoints

```css
/* Mobile (Extra Small) */
@media (max-width: 576px) { }

/* Tablet (Small) */
@media (max-width: 768px) { }

/* Medium */
@media (max-width: 992px) { }

/* Large */
@media (max-width: 1200px) { }

/* Desktop (Extra Large) */
@media (min-width: 1200px) { }
```

## Best Practices

### 1. Use CSS Variables
```css
/* ✅ Good */
color: var(--text-primary);
background: var(--bg-secondary);

/* ❌ Avoid */
color: #333;
background: #f5f5f5;
```

### 2. Consistent Naming
```css
/* ✅ Good */
--text-primary
--text-secondary
--bg-primary
--bg-secondary

/* ❌ Avoid */
--dark-text
--light-bg
--color1
--color2
```

### 3. Theme Selector Format
```css
/* ✅ Good */
:root[data-theme="dark"] .element { }

/* ❌ Avoid */
body.dark .element { }
.element[data-dark] { }
```

### 4. Media Query Placement
```css
/* ✅ Good */
.component {
  padding: 20px;
}

@media (max-width: 768px) {
  .component {
    padding: 15px;
  }
}

/* ❌ Avoid */
@media (min-width: 769px) {
  .component {
    padding: 20px;
  }
}
```

### 5. Shadow Usage
```css
/* ✅ Good */
box-shadow: var(--shadow);

/* ❌ Avoid */
box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);  /* Light specific */
box-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);  /* Dark specific */
```

## Testing Themes

### Manual Testing Checklist
- [ ] Light theme displays correctly
- [ ] Dark theme displays correctly
- [ ] Mobile layout at 767px width
- [ ] Tablet layout at 800px width
- [ ] Desktop layout at 1200px+
- [ ] Theme persists after page reload
- [ ] All text is readable in both themes
- [ ] Buttons are clickable in both themes
- [ ] Forms are usable in both themes

### Browser DevTools Testing
```javascript
// In browser console, switch theme
document.documentElement.setAttribute('data-theme', 'dark');

// Check computed styles
const element = document.querySelector('.component-name');
window.getComputedStyle(element).backgroundColor;

// Test media queries
console.log(window.matchMedia('(max-width: 768px)').matches);
```

## Accessibility Considerations

### Color Contrast
- Text on background: Minimum 4.5:1 ratio (WCAG AA)
- Large text: Minimum 3:1 ratio

### Dark Mode
- Reduce brightness to minimize eye strain
- Use color-safe dark palettes
- Avoid pure white (#fff) in dark mode

### Motion
```css
/* Respect prefers-reduced-motion */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

## Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| Dark theme not applying | Check `data-theme="dark"` attribute on root element |
| Colors not changing on theme switch | Verify CSS selectors use `:root[data-theme="dark"]` |
| Mobile theme not responsive | Check media query breakpoint (768px) |
| Hard-coded colors in CSS | Replace with CSS variables |
| Theme doesn't persist | Add localStorage implementation |
| Flickering on page load | Initialize theme before render |

## Migration to New Theme

If updating the theme system:

1. Update CSS variables in root
2. Update light.css with new light colors
3. Update dark.css with new dark colors
4. Run visual regression tests
5. Check all components render correctly
6. Update this documentation

## Future Enhancements

- [ ] Auto-detect system dark mode preference
- [ ] Add more theme variants (e.g., high contrast)
- [ ] Implement theme animation transitions
- [ ] Add per-component theme customization
- [ ] Create theme builder tool
- [ ] Add theme analytics tracking
