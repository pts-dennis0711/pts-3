# Admin Access Guide

## How to Access Admin Account

### Current Implementation
The admin access is currently managed through a toggle button in the navigation bar. However, it's currently hidden by default.

### Method 1: Via Navigation (Currently Hidden)
1. The admin button is in the navigation bar, but it has the `hidden` class applied
2. To enable it, you can remove the `hidden` class from the admin button in `src/components/Navigation.js` (line 648)

### Method 2: Direct URL Access
You can access admin routes by:
1. Setting `isAdmin` to `true` in the browser's localStorage:
   ```javascript
   localStorage.setItem('isAdmin', 'true');
   ```
2. Then refresh the page and navigate to `/admin`

### Method 3: Programmatically via Browser Console
Open browser console (F12) and run:
```javascript
// Access the React component's state (if you have React DevTools)
// Or simply set localStorage
localStorage.setItem('isAdmin', 'true');
window.location.reload();
```

### Admin Routes Available
Once in admin mode, you can access:
- `/admin` - Admin Dashboard
- `/admin/products` - Manage Products
- `/admin/blogs` - Manage Blogs
- `/admin/stories` - Manage Success Stories

### Exiting Admin Mode
Click the "Exit Admin" button in the navigation bar, or set:
```javascript
localStorage.setItem('isAdmin', 'false');
```

## Recommended: Enable Visible Admin Access Button

To make admin access more visible, you can:
1. Remove the `hidden` class from the admin button
2. Or add a keyboard shortcut (e.g., Ctrl+Shift+A)
3. Or create a dedicated admin login page with credentials



