# Quick SMTP Troubleshooting Steps

## 🔧 **Step 1: Check Your Render Configuration**

Visit this URL in your browser:
```
https://pts3-backend.onrender.com/api/smtp-diagnostics
```

This will show you:
- ✅ What SMTP settings are currently active
- ⚠️ What needs to be changed
- ❌ What's missing

## 📝 **Step 2: Update Based on Diagnostics**

If it shows:
```json
{
  "smtp": {
    "port": "465",
    ...
  },
  "recommendations": [
    "⚠️ Port 465 is often blocked on cloud platforms. Try port 587..."
  ]
}
```

Then you **haven't updated the Render environment variables yet**.

### **Fix on Render Dashboard:**

1. Go to: https://render.com/dashboard
2. Click your backend service: `pts3-backend`
3. Click **"Environment"** tab
4. **Update**:
   ```
   SMTP_PORT = 587
   SMTP_SECURE = false
   ```
5. **Save Changes** (waits for auto-redeploy ~2 min)

## 🧪 **Step 3: Test After Redeploy**

Visit diagnostics again:
```
https://pts3-backend.onrender.com/api/smtp-diagnostics
```

Should now show:
```json
{
  "smtp": {
    "port": "587",
    "secure": "false"
  },
  "recommendations": ["✅ Configuration looks good"]
}
```

## 📧 **Step 4: Test Email**

```bash
curl -X POST https://pts3-backend.onrender.com/api/test-email \
  -H "Content-Type: application/json" \
  -d '{"to":"dennis.tirkey@prototechsolutions.com"}'
```

## 🔄 **Alternative Ports to Try**

If port 587 still times out, try:

### **Port 2525** (Hostinger alternative):
```
SMTP_PORT = 2525
SMTP_SECURE = false
```

### **Port 465** (only if on local/VPS):
```
SMTP_PORT = 465
SMTP_SECURE = true
```

## 🚨 **If Nothing Works**

Hostinger SMTP might be completely blocked from Render's IP range.

**Alternative Email Services** (cloud-friendly):

1. **SendGrid** (Recommended, 100/day free):
   ```
   SMTP_HOST = smtp.sendgrid.net
   SMTP_PORT = 587
   SMTP_SECURE = false
   SMTP_USER = apikey
   SMTP_PASS = <your-sendgrid-api-key>
   ```

2. **Mailgun** (100/day free):
   ```
   SMTP_HOST = smtp.mailgun.org
   SMTP_PORT = 587
   SMTP_SECURE = false
   SMTP_USER = <your-mailgun-user>
   SMTP_PASS = <your-mailgun-password>
   ```

3. **Resend** (Modern, 100/day free):
   - Use their API instead of SMTP (faster, more reliable)

---

## 📞 **Contact Hostinger**

If you want to stick with Hostinger:
1. Contact their support
2. Ask: "Is SMTP access allowed from Render.com servers?"
3. They may need to whitelist Render's IP range
