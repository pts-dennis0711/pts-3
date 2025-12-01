# Email Connection Timeout Fix

## Issue
- **Error**: `Connection timeout` when submitting form
- **HTTP Status**: 500 Internal Server Error
- **Location**: `/api/send-trial-email` endpoint

## Root Cause
The SMTP connection to Hostinger was timing out because:
1. No connection timeout was configured
2. No socket timeout was set
3. No verification before sending emails
4. Poor error handling for timeout scenarios

## Fixes Applied

### 1. Added Connection Timeouts
```javascript
connectionTimeout: 10000,  // 10 seconds to establish connection
greetingTimeout: 10000,     // 10 seconds to receive greeting
socketTimeout: 10000,       // 10 seconds for socket inactivity
```

### 2. Added Send Timeout
- Email sending now has a 30-second timeout
- Prevents indefinite hanging

### 3. Enhanced Error Handling
- Specific error messages for different failure types:
  - Connection timeout
  - Authentication failures
  - Server unreachable
  - Host not found
- Better error logging with full error details

### 4. Connection Verification
- Verifies SMTP connection before sending (with timeout)
- Logs connection status for debugging

## Testing the Fix

### 1. Check Render Logs
Go to Render Dashboard → Your Service → Logs and look for:
- `✅ SMTP server is ready to send emails` (on startup)
- `✅ SMTP connection verified` (before sending)
- `✅ Email sent successfully` (on success)
- `❌ SMTP verification failed` (if connection fails)

### 2. Test Email Endpoint
```bash
curl -X POST https://pts3-backend.onrender.com/api/send-trial-email \
  -H "Content-Type: application/json" \
  -H "Origin: https://pts-3-tau.vercel.app" \
  -d '{
    "to": "test@example.com",
    "subject": "Test Email",
    "html": "<p>Test</p>"
  }'
```

### 3. Check Error Response
If it still times out, you'll now get a more specific error:
```json
{
  "success": false,
  "error": "Connection timeout. The email server took too long to respond.",
  "message": "SMTP connection timeout - server may be unreachable or slow",
  "code": "ETIMEDOUT"
}
```

## Common Causes of Timeout

### 1. SMTP Server Unreachable
**Check:**
- Is `SMTP_HOST` correct? Should be `smtp.hostinger.com`
- Is Hostinger SMTP service up?
- Are there firewall restrictions?

**Solution:**
- Verify SMTP settings in Hostinger
- Try alternative port (587 instead of 465)
- Check Hostinger status page

### 2. Network Issues from Render
**Check:**
- Render logs for network errors
- Test from different location

**Solution:**
- Render should allow outbound SMTP, but verify
- Try using port 587 with `SMTP_SECURE=false`

### 3. Incorrect SMTP Credentials
**Check:**
- `SMTP_USER` is full email address
- `SMTP_PASS` is correct (no extra spaces)
- Email account is active in Hostinger

**Solution:**
- Double-check credentials in Render environment variables
- Test credentials directly in email client

### 4. Port/SSL Mismatch
**Check:**
- Port 465 requires `SMTP_SECURE=true`
- Port 587 requires `SMTP_SECURE=false`

**Solution:**
- Verify port and secure settings match
- Try alternative configuration:
  ```
  SMTP_PORT=587
  SMTP_SECURE=false
  ```

## Diagnostic Steps

### Step 1: Verify Environment Variables
In Render Dashboard → Your Service → Environment, check:
```
SMTP_HOST=smtp.hostinger.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=your-email@yourdomain.com
SMTP_PASS=your-password
SMTP_FROM=your-email@yourdomain.com
```

### Step 2: Check Render Logs
Look for these messages:
- `🚀 Email server running on port 5000`
- `📧 SMTP Host: smtp.hostinger.com`
- `👤 SMTP User: [your-email]` (should NOT say "Not configured")
- `✅ SMTP server is ready to send emails`

### Step 3: Test Health Endpoint
```bash
curl https://pts3-backend.onrender.com/api/health
```

Should show:
```json
{
  "smtp": {
    "configured": true,
    "host": "smtp.hostinger.com"
  }
}
```

### Step 4: Check Email Logs
```bash
curl https://pts3-backend.onrender.com/api/email-logs?limit=5
```

Look for recent failed attempts and error messages.

## Alternative SMTP Configuration

If port 465 continues to timeout, try port 587:

**In Render Environment Variables:**
```
SMTP_HOST=smtp.hostinger.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@yourdomain.com
SMTP_PASS=your-password
SMTP_FROM=your-email@yourdomain.com
```

Then restart the service.

## Next Steps

1. **Deploy the fix:**
   ```bash
   git add .
   git commit -m "Fix email connection timeout with proper timeouts and error handling"
   git push origin main
   ```

2. **Wait for Render to deploy** (2-3 minutes)

3. **Test from frontend:**
   - Try submitting the form again
   - Check browser console for specific error message
   - Check Render logs for detailed error information

4. **If still timing out:**
   - Check Render logs for specific error
   - Verify SMTP credentials are correct
   - Try alternative port (587)
   - Check Hostinger email account status
   - Verify network connectivity from Render

## Expected Behavior After Fix

✅ Connection attempts timeout after 10 seconds (not hanging indefinitely)
✅ Better error messages indicating the specific issue
✅ Email sending timeout after 30 seconds
✅ Detailed logging for debugging
✅ Connection verification before sending

## If Issues Persist

1. **Check Render Logs** for specific error messages
2. **Verify SMTP Settings** in Hostinger account
3. **Test SMTP Credentials** using an email client
4. **Try Alternative Port** (587 instead of 465)
5. **Contact Hostinger Support** if SMTP service is down

