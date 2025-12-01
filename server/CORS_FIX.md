# CORS and 502 Error Fix

## Issues Identified

1. **CORS Error**: `pts-3-tau.vercel.app` was not in allowed origins list
2. **502 Bad Gateway**: Service might be down or spinning up on Render

## Fixes Applied

### 1. Added Vercel URL to Allowed Origins
- Added `https://pts-3-tau.vercel.app` explicitly
- Added wildcard pattern for Vercel preview deployments: `https://pts-3-tau-*.vercel.app`
- Improved CORS origin matching with regex support

### 2. Enhanced CORS Configuration
- Added explicit preflight handling with `app.options('*', cors())`
- Added more allowed headers
- Added `maxAge` for preflight caching
- Better logging for debugging

### 3. Improved Error Handling
- Added request logging to email endpoint
- Better SMTP configuration validation
- More detailed error messages

## Testing the Fix

### 1. Check if Service is Running
```bash
curl https://pts3-backend.onrender.com/api/health
```

If you get a 502, the service is down or spinning up. Wait 30-50 seconds and try again.

### 2. Test CORS Preflight
```bash
curl -X OPTIONS https://pts3-backend.onrender.com/api/send-trial-email \
  -H "Origin: https://pts-3-tau.vercel.app" \
  -H "Access-Control-Request-Method: POST" \
  -H "Access-Control-Request-Headers: Content-Type" \
  -v
```

You should see:
```
Access-Control-Allow-Origin: https://pts-3-tau.vercel.app
Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS, PATCH
```

### 3. Test Email Endpoint
```bash
curl -X POST https://pts3-backend.onrender.com/api/send-trial-email \
  -H "Origin: https://pts-3-tau.vercel.app" \
  -H "Content-Type: application/json" \
  -d '{
    "to": "test@example.com",
    "subject": "Test",
    "html": "<p>Test email</p>"
  }'
```

## Common Issues

### 502 Bad Gateway
**Cause**: Render service is down or spinning up (free tier)

**Solutions**:
1. Wait 30-50 seconds for service to wake up
2. Check Render dashboard → Your Service → Status
3. Check logs for startup errors
4. Upgrade to paid plan ($7/month) for always-on service

### CORS Still Not Working
**Possible causes**:
1. Service not deployed yet - wait for deployment
2. CORS middleware not applied - check logs
3. Browser cache - clear cache or use incognito

**Debug steps**:
1. Check Render logs for CORS-related messages
2. Test with curl to see actual headers
3. Check browser Network tab for preflight request

## Next Steps

1. **Deploy the fix:**
   ```bash
   git add .
   git commit -m "Fix CORS for Vercel frontend"
   git push origin main
   ```

2. **Wait for Render to deploy** (2-3 minutes)

3. **Verify service is up:**
   ```bash
   curl https://pts3-backend.onrender.com/api/health
   ```

4. **Test from frontend:**
   - Try sending an email from your Vercel app
   - Check browser console for errors
   - Check Network tab for CORS headers

## Environment Variables

Make sure these are set in Render:
- `FRONTEND_URL=https://pts-3-tau.vercel.app` (optional, but helpful)
- All SMTP variables
- `DATABASE_URL`

## If Still Not Working

1. **Check Render Logs:**
   - Go to Render Dashboard → Your Service → Logs
   - Look for startup messages
   - Check for CORS-related errors

2. **Verify Service Status:**
   - Check if service is "Live" in Render dashboard
   - If "Stopped", manually start it

3. **Test Health Endpoint:**
   - Should return 200 with service status
   - If 502, service is down

4. **Check CORS Headers:**
   - Use browser DevTools → Network tab
   - Look at response headers
   - Should see `Access-Control-Allow-Origin`

