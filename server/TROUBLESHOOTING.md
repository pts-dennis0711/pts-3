# Troubleshooting Guide: Database & Email Issues

## Common Issues and Solutions

### 🔴 Issue 1: Database Not Connecting (Neon DB)

**Symptoms:**
- Orders not saving
- "Database is not configured" errors
- Connection timeout errors

**Solutions:**

1. **Check DATABASE_URL in Render:**
   - Go to Render Dashboard → Your Service → Environment
   - Verify `DATABASE_URL` is set correctly
   - Format should be: `postgresql://user:password@host/database?sslmode=require`
   - Neon DB connection strings include `?sslmode=require` at the end

2. **Verify Neon DB is Active:**
   - Log into Neon Console
   - Check if your database is paused (free tier auto-pauses)
   - Resume the database if paused
   - Verify the connection string matches what's in Render

3. **Check Render Logs:**
   ```bash
   # Look for these messages:
   ✅ Connected to PostgreSQL
   ❌ PostgreSQL connection failed: [error message]
   ```

4. **Test Connection:**
   ```bash
   curl https://your-app.onrender.com/api/health
   ```
   Should show: `"database": { "enabled": true, "connected": true }`

### 🔴 Issue 2: Emails Not Sending

**Symptoms:**
- No emails received
- "Failed to send email" errors
- SMTP authentication errors

**Solutions:**

1. **Verify SMTP Environment Variables in Render:**
   ```
   SMTP_HOST=smtp.hostinger.com
   SMTP_PORT=465
   SMTP_SECURE=true
   SMTP_USER=your-email@yourdomain.com
   SMTP_PASS=your-email-password
   SMTP_FROM=your-email@yourdomain.com
   ```

2. **Test Email Endpoint:**
   ```bash
   curl -X POST https://your-app.onrender.com/api/test-email \
     -H "Content-Type: application/json" \
     -d '{"to": "your-test-email@example.com"}'
   ```

3. **Check Email Logs:**
   ```bash
   curl https://your-app.onrender.com/api/email-logs?limit=10
   ```
   Look for `status: "failed"` entries and check `error_message`

4. **Common SMTP Issues:**
   - **Invalid credentials:** Double-check email and password
   - **Account locked:** Check Hostinger email account status
   - **Port blocked:** Try port 587 with `SMTP_SECURE=false`
   - **Firewall:** Render should allow outbound SMTP, but verify

### 🔴 Issue 3: CORS Errors from Vercel Frontend

**Symptoms:**
- "CORS policy" errors in browser console
- Requests blocked from frontend
- 401/403 errors

**Solutions:**

1. **Verify Frontend URL is Allowed:**
   - The code now includes `staging8.prototechsolutions.com` in allowed origins
   - Add your Vercel domain to `FRONTEND_URL` environment variable in Render

2. **Check Browser Console:**
   - Look for specific CORS error messages
   - Verify the API URL is correct in your frontend code

3. **Test CORS:**
   ```bash
   curl -H "Origin: https://staging8.prototechsolutions.com" \
        -H "Access-Control-Request-Method: POST" \
        -H "Access-Control-Request-Headers: Content-Type" \
        -X OPTIONS \
        https://your-app.onrender.com/api/orders
   ```

### 🔴 Issue 4: Orders Not Saving to Database

**Symptoms:**
- Orders appear to save but don't show up
- "Failed to create order" errors
- Database errors in logs

**Solutions:**

1. **Check Database Connection:**
   ```bash
   curl https://your-app.onrender.com/api/health
   ```
   Ensure `database.connected` is `true`

2. **Check Render Logs for Errors:**
   - Look for "Error creating order" messages
   - Check for database constraint violations
   - Verify table structure matches code

3. **Verify Order Data Format:**
   - Ensure frontend sends correct structure:
     ```json
     {
       "order": {
         "id": "...",
         "total": "...",
         "items": [...]
       },
       "customer": {
         "email": "...",
         "firstName": "...",
         "lastName": "..."
       }
     }
     ```

4. **Test Order Creation:**
   ```bash
   curl -X POST https://your-app.onrender.com/api/orders \
     -H "Content-Type: application/json" \
     -d '{
       "order": {
         "id": "test-123",
         "total": "100.00",
         "grandTotal": "110.00",
         "tax": "10.00",
         "status": "pending",
         "paymentMethod": "stripe",
         "shipping": {},
         "payment": {},
         "items": []
       },
       "customer": {
         "email": "test@example.com",
         "firstName": "Test",
         "lastName": "User"
       }
     }'
   ```

### 🔴 Issue 5: Service Spinning Down (Free Tier)

**Symptoms:**
- First request takes 30-50 seconds
- Timeout errors
- Service unavailable

**Solutions:**

1. **Wait for Wake-up:**
   - Free tier spins down after 15 minutes of inactivity
   - First request after spin-down takes 30-50 seconds
   - Subsequent requests are fast

2. **Upgrade to Paid Plan:**
   - $7/month for always-on service
   - No spin-down delays
   - Better performance

3. **Use Health Check Pinging:**
   - Set up external service to ping `/api/health` every 10 minutes
   - Keeps service awake (may violate free tier terms)

## Diagnostic Commands

### Check Service Health
```bash
curl https://your-app.onrender.com/api/health
```

### Test Database Connection
```bash
# Should return database status
curl https://your-app.onrender.com/api/health | jq .database
```

### Test Email Service
```bash
curl -X POST https://your-app.onrender.com/api/test-email \
  -H "Content-Type: application/json" \
  -d '{"to": "your-email@example.com"}'
```

### Check Email Logs
```bash
curl https://your-app.onrender.com/api/email-logs?limit=5
```

### Test Order Creation
```bash
curl -X POST https://your-app.onrender.com/api/orders \
  -H "Content-Type: application/json" \
  -d @test-order.json
```

## Environment Variables Checklist

### Required for Database:
- ✅ `DATABASE_URL` - Neon DB connection string

### Required for Email:
- ✅ `SMTP_HOST` - smtp.hostinger.com
- ✅ `SMTP_PORT` - 465 or 587
- ✅ `SMTP_SECURE` - true or false
- ✅ `SMTP_USER` - Your email address
- ✅ `SMTP_PASS` - Your email password
- ✅ `SMTP_FROM` - Your email address

### Optional:
- `FRONTEND_URL` - Your Vercel frontend URL (for CORS)
- `NODE_ENV` - production
- `PORT` - Server port (default: 5000)

## Render-Specific Issues

### Issue: Environment Variables Not Loading
- **Solution:** Restart the service after adding environment variables
- Go to Render Dashboard → Your Service → Manual Deploy → Clear build cache & deploy

### Issue: Build Fails
- **Solution:** Check build logs for npm install errors
- Verify `package.json` has all dependencies
- Check Node.js version compatibility

### Issue: Service Crashes
- **Solution:** Check logs for error messages
- Verify all environment variables are set
- Check for memory issues (free tier has limits)

## Neon DB-Specific Issues

### Issue: Database Paused
- **Solution:** Resume database in Neon Console
- Free tier auto-pauses after inactivity
- Connection will fail if database is paused

### Issue: Connection String Invalid
- **Solution:** Get fresh connection string from Neon Console
- Ensure it includes `?sslmode=require`
- Verify credentials are correct

### Issue: SSL Connection Errors
- **Solution:** Code already handles SSL with `rejectUnauthorized: false`
- If issues persist, check Neon DB SSL settings

## Quick Fix Checklist

1. ✅ Verify all environment variables in Render
2. ✅ Check Neon DB is active (not paused)
3. ✅ Test health endpoint: `/api/health`
4. ✅ Check Render logs for errors
5. ✅ Verify SMTP credentials are correct
6. ✅ Test email endpoint: `/api/test-email`
7. ✅ Check CORS configuration matches frontend URL
8. ✅ Verify database connection in health check
9. ✅ Test order creation endpoint
10. ✅ Check email logs for failed attempts

## Still Having Issues?

1. **Check Render Logs:**
   - Go to Render Dashboard → Your Service → Logs
   - Look for error messages
   - Check startup messages

2. **Check Neon DB Logs:**
   - Go to Neon Console → Your Project → Logs
   - Look for connection attempts

3. **Test Locally:**
   - Copy environment variables to local `.env`
   - Test locally to isolate Render-specific issues

4. **Contact Support:**
   - Render Support: support@render.com
   - Neon Support: support@neon.tech

