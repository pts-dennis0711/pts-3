# Quick Start Guide - Local Development

## Current Setup

✅ **Backend**: Running locally on `http://localhost:5000`
✅ **Frontend**: Running locally on `http://localhost:3000`
✅ **Database**: NeonDB (cloud PostgreSQL)

## Admin Login Credentials

- **URL**: http://localhost:3000/admin/login
- **Username**: `admin`
- **Password**: `admin@1234`

## What I Just Did

1. ✅ Stopped the frontend server
2. ✅ Created `.env` file from `.env.development` to ensure local backend is used
3. ✅ Restarted frontend with correct environment variables

## Testing the Admin Panel

1. Wait for the frontend to finish starting (you'll see "Compiled successfully!")
2. Open browser: http://localhost:3000/admin/login
3. Login with credentials above
4. You should now be able to access the admin dashboard

## Troubleshooting

If you still see 404 errors:
1. **Clear browser cache**: Ctrl+Shift+Delete
2. **Hard refresh**: Ctrl+F5
3. **Check console**: Make sure API calls go to `localhost:5000` not `pts3-backend.onrender.com`

## Environment Variables Being Used

```bash
REACT_APP_API_URL=http://localhost:5000
REACT_APP_SITE_URL=http://localhost:3000
```

All API calls will now go to your local backend server.
