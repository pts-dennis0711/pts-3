# SMTP Connection Timeout Fix (Render/Cloud Platforms)

## 🔴 Error You're Seeing

```
Error: Connection timeout
code: 'ETIMEDOUT',
command: 'CONN'
```

This means: **The SMTP connection cannot be established** (port is blocked or unreachable).

---

## ⚡ **Quick Fix (Port 465 → 587)**

### **On Render Dashboard:**

1. **Go to your backend service** on Render
2. Click **Environment** tab
3. **Update these variables**:
   ```
   SMTP_PORT=587
   SMTP_SECURE=false
   ```
4. Click **Save Changes** (auto-redeploys)

### **Why This Works:**
- **Port 465** (SMTP over SSL) is blocked on most cloud platforms
- **Port 587** (SMTP with STARTTLS) is the standard submission port and rarely blocked
- Your code already handles this properly with the improved SMTP configuration

---

## 🧪 **Testing After Fix**

### Test Endpoint:
```bash
curl -X POST https://pts3-backend.onrender.com/api/test-email \
  -H "Content-Type: application/json" \
  -d '{"to": "your-email@example.com"}'
```

### Expected Response (Success):
```json
{
  "success": true,
  "message": "Test email sent successfully",
  "messageId": "..."
}
```

### Expected Response (Still Failing):
```json
{
  "success": false,
  "error": "Connection timeout...",
  "code": "ETIMEDOUT"
}
```

---

## 📊 **Port Compatibility**

| Port | Type | Render | Railway | Vercel | Netlify | Local |
|------|------|--------|---------|--------|---------|-------|
| **587** | STARTTLS | ✅ | ✅ | ✅ | ✅ | ✅ |
| 465 | SSL | ❌ | ❌ | ❌ | ⚠️ | ✅ |
| 2525 | Alternative | ✅ | ✅ | ✅ | ✅ | ✅ |
| 25 | Standard | ❌ | ❌ | ❌ | ❌ | ⚠️ |

**Recommendation**: Always use **port 587** for cloud deployments.

---

## 🔧 **Alternative Solutions**

### **Option 1: Port 2525** (If 587 Still Fails)

Update on Render:
```
SMTP_PORT=2525
SMTP_SECURE=false
```

### **Option 2: Use Different Email Service**

If Hostinger SMTP continues to have issues, consider:

**Free Alternatives:**
- **SendGrid** (100 emails/day free)
- **Mailgun** (100 emails/day free)
- **AWS SES** (62,000 emails/month free)
- **Resend** (100 emails/day free)

These are designed for cloud platforms and have better deliverability.

### **Option 3: Gmail SMTP** (Development Only)

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-gmail@gmail.com
SMTP_PASS=your-app-specific-password  # Not your Gmail password!
```

**Note**: Gmail requires "App Passwords" - not your regular Gmail password.

---

## 🐛 **Other Common SMTP Errors**

### Error: `EAUTH` or "Invalid login"

**Cause**: Wrong credentials

**Fix**:
1. Verify `SMTP_USER` and `SMTP_PASS` in Render environment
2. Check Hostinger email account is active
3. Make sure you're using the **email password**, not hPanel password

### Error: `ENOTFOUND`

**Cause**: DNS cannot resolve SMTP host

**Fix**:
1. Verify `SMTP_HOST=smtp.hostinger.com` (no typos)
2. Check Render can reach external SMTP servers (shouldn't be blocked)

### Error: `ECONNREFUSED`

**Cause**: Port is blocked or server refuses connection

**Fix**:
1. Switch to port 587
2. Try port 2525 as alternative

---

## 📝 **Environment Variables Checklist**

On Render, make sure these are ALL set:

```
✓ SMTP_HOST=smtp.hostinger.com
✓ SMTP_PORT=587
✓ SMTP_SECURE=false
✓ SMTP_USER=your-email@yourdomain.com
✓ SMTP_PASS=your-actual-password
✓ SMTP_FROM=noreply@yourdomain.com
✓ DATABASE_URL=postgresql://...
✓ PORT=5000 (optional, Render sets this)
```

---

## 🔍 **Verify SMTP Credentials**

### On Hostinger hPanel:

1. **Log in** to [hpanel.hostinger.com](https://hpanel.hostinger.com)
2. Go to **Emails** → **Email Accounts**
3. Find your email account
4. **Test credentials**:
   - Username: Full email address (e.g., `info@yourdomain.com`)
   - Password: The password you set for this email account
5. **SMTP Settings** should show:
   - Server: `smtp.hostinger.com`
   - Ports: 465 (SSL) or 587 (TLS)

---

## 💡 **Why Port 465 is Blocked**

Cloud platforms like Render, Railway, Vercel serverless functions block port 465 because:
1. **Security**: Port 465 is deprecated (legacy "SMTPS")
2. **Modern standard**: Port 587 with STARTTLS is the official submission port
3. **Abuse prevention**: Port 465 was commonly used for spam

**Industry Standard**: RFC 8314 recommends port 587 for email submission.

---

## ✅ **After Making Changes**

1. **Update environment variables** on Render
2. **Wait 1-2 minutes** for auto-redeploy
3. **Check logs** on Render:
   - Go to **Logs** tab
   - Look for: `✅ SMTP server is ready to send emails`
4. **Test email endpoint** using curl or Postman
5. **Try from frontend** (trial download form)

---

## 🆘 **Still Having Issues?**

If port 587 still times out:

1. **Check Render's IP is not blacklisted**:
   - SMTP servers sometimes block cloud provider IPs
   - Contact Hostinger support to whitelist Render's IP range

2. **Try a different SMTP provider**:
   - SendGrid, Mailgun, or AWS SES are cloud-friendly
   - They're designed for programmatic email sending

3. **Enable "SMTP Relay" on Hostinger**:
   - Some Hostinger plans require enabling SMTP relay
   - Check in hPanel settings

---

## 📚 **Additional Resources**

- [Hostinger SMTP Settings](https://support.hostinger.com/en/articles/1583298-how-to-use-smtp-settings)
- [Nodemailer Documentation](https://nodemailer.com/smtp/)
- [RFC 8314 - SMTP Submission](https://tools.ietf.org/html/rfc8314)
- [Render Platform Limits](https://render.com/docs/free#free-web-services)
