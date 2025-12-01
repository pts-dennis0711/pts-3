# Email Service Verification Guide for Render

## ✅ Fixed Issue
Fixed a bug in `index.js` line 102 where `SMTP_SECURE` was always set to `true` regardless of environment variable. This is now fixed.

## 🔍 How to Verify Email Service is Running on Render

### Step 1: Check Service Health
Test if your service is running:
```bash
curl https://your-app-name.onrender.com/api/health
```

Expected response:
```json
{
  "status": "ok",
  "message": "Email service is running"
}
```

### Step 2: Check Render Logs
1. Go to your Render dashboard
2. Click on your web service
3. Go to **"Logs"** tab
4. Look for:
   - ✅ `🚀 Email server running on port 5000`
   - ✅ `📧 SMTP Host: smtp.hostinger.com`
   - ✅ `👤 SMTP User: [your-email]` (should show your email, not "Not configured")
   - ✅ `✅ Connected to PostgreSQL` (if database is configured)

### Step 3: Verify Environment Variables
In Render dashboard → Your Service → **Environment** tab, ensure these are set:
- ✅ `SMTP_HOST=smtp.hostinger.com`
- ✅ `SMTP_PORT=465`
- ✅ `SMTP_SECURE=true`
- ✅ `SMTP_USER=your-email@domain.com`
- ✅ `SMTP_PASS=your-email-password`
- ✅ `SMTP_FROM=your-email@domain.com`
- ✅ `DATABASE_URL=your-neon-connection-string` (optional but recommended)

### Step 4: Test Email Sending
Send a test email:
```bash
curl -X POST https://your-app-name.onrender.com/api/test-email \
  -H "Content-Type: application/json" \
  -d '{"to": "your-test-email@example.com"}'
```

Expected response:
```json
{
  "success": true,
  "message": "Test email sent successfully",
  "messageId": "..."
}
```

### Step 5: Check Email Logs (if database is configured)
View recent email attempts:
```bash
curl https://your-app-name.onrender.com/api/email-logs?limit=10
```

This will show:
- ✅ Successful sends (`status: "sent"`)
- ❌ Failed sends (`status: "failed"` with `error_message`)

## 🚨 Common Issues on Render

### Issue 1: Service Spun Down (Free Tier)
**Symptom:** First request takes 30-50 seconds
**Solution:** 
- Wait for the service to wake up
- Or upgrade to paid plan ($7/month) for always-on service

### Issue 2: SMTP Authentication Failed
**Symptom:** Error like "Invalid login" or "Authentication failed"
**Check:**
- `SMTP_USER` is the full email address (e.g., `noreply@yourdomain.com`)
- `SMTP_PASS` is correct (no extra spaces)
- Email account is active in Hostinger

### Issue 3: Connection Timeout
**Symptom:** "Connection timeout" or "ECONNREFUSED"
**Check:**
- `SMTP_HOST` is correct: `smtp.hostinger.com`
- `SMTP_PORT` matches: `465` for secure, `587` for non-secure
- Firewall/network allows outbound SMTP connections (Render should handle this)

### Issue 4: Emails Not Received
**Possible causes:**
- Check spam/junk folder
- Verify recipient email is correct
- Check email logs for errors
- Verify SMTP credentials are correct

## 📊 Monitoring Email Service

### Check Recent Email Activity
```bash
# Get last 20 email logs
curl https://your-app-name.onrender.com/api/email-logs?limit=20
```

### Monitor Render Logs
- Go to Render dashboard → Your Service → Logs
- Look for:
  - `Email sent successfully: [messageId]` ✅
  - `Error sending email: [error]` ❌

## 🔧 Quick Troubleshooting Commands

```bash
# 1. Health check
curl https://your-app-name.onrender.com/api/health

# 2. Test email
curl -X POST https://your-app-name.onrender.com/api/test-email \
  -H "Content-Type: application/json" \
  -d '{"to": "test@example.com"}'

# 3. Check email logs
curl https://your-app-name.onrender.com/api/email-logs?limit=5
```

## ✅ Success Indicators

Your email service is working correctly if:
1. ✅ Health endpoint returns `{"status": "ok"}`
2. ✅ Test email endpoint returns `{"success": true}`
3. ✅ You receive the test email in your inbox
4. ✅ Email logs show `status: "sent"` for recent attempts
5. ✅ No errors in Render logs

## 📝 Next Steps After Verification

1. **If everything works:** You're all set! The service is running smoothly.
2. **If there are issues:**
   - Check Render logs for specific error messages
   - Verify all environment variables are set correctly
   - Test SMTP credentials directly with Hostinger
   - Check if your Hostinger email account has any restrictions

---

**Note:** After fixing the `SMTP_SECURE` bug, make sure to:
1. Commit and push the changes to GitHub
2. Render will auto-deploy the fix
3. Test again after deployment completes

