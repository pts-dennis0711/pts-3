# Email Setup Guide - Hostinger SMTP

This guide will help you set up email sending using Hostinger SMTP configuration.

## Quick Start

### 1. Backend Server Setup

1. Navigate to the server directory:
```bash
cd server
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
```bash
# Copy the example file
cp .env.example .env

# Edit .env with your Hostinger credentials
```

4. Edit `.env` file with your Hostinger SMTP details:
```env
SMTP_HOST=smtp.hostinger.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=your-email@yourdomain.com
SMTP_PASS=your-email-password
SMTP_FROM=noreply@yourdomain.com
PORT=5000
```

### 2. Get Your Hostinger SMTP Credentials

1. Log in to **Hostinger hPanel**
2. Navigate to **Email** section
3. Create or select an email account
4. Note the following:
   - **Email Address** → Use as `SMTP_USER`
   - **Email Password** → Use as `SMTP_PASS`
   - **SMTP Server** → Usually `smtp.hostinger.com`
   - **SMTP Port** → Usually `465` (SSL) or `587` (TLS)

### 3. Start the Backend Server

```bash
# Development mode (with auto-reload)
npm run dev

# Production mode
npm start
```

The server will start on `http://localhost:5000`

### 4. Test the Configuration

Test your SMTP setup:
```bash
curl -X POST http://localhost:5000/api/test-email \
  -H "Content-Type: application/json" \
  -d '{"to": "your-email@example.com"}'
```

Or use Postman/Thunder Client to send a POST request to:
- URL: `http://localhost:5000/api/test-email`
- Method: POST
- Body: `{"to": "your-email@example.com"}`

### 5. Frontend Configuration

The frontend is already configured to use the backend API. If your backend is on a different URL, create a `.env` file in the root directory:

```env
REACT_APP_API_URL=http://localhost:5000
```

For production, update this to your production API URL.

## Hostinger SMTP Settings Reference

### Standard Settings (SSL)
```
SMTP Host: smtp.hostinger.com
SMTP Port: 465
Security: SSL/TLS
SMTP Secure: true
```

### Alternative Settings (TLS)
If port 465 doesn't work, try:
```
SMTP Host: smtp.hostinger.com
SMTP Port: 587
Security: STARTTLS
SMTP Secure: false
```

Update your `.env` file accordingly:
```env
SMTP_PORT=587
SMTP_SECURE=false
```

## Troubleshooting

### Issue: "Invalid login" or "Authentication failed"

**Solutions:**
- Verify email and password are correct
- Use the full email address (e.g., `noreply@yourdomain.com`)
- Check if the email account is active in Hostinger
- Try resetting the email password in Hostinger

### Issue: "Connection timeout" or "ECONNREFUSED"

**Solutions:**
- Check if port 465/587 is blocked by firewall
- Verify `SMTP_HOST` is correct (`smtp.hostinger.com`)
- Try the alternative port (587) with `SMTP_SECURE=false`
- Check if your hosting provider allows SMTP connections

### Issue: "Self-signed certificate" error

**Solutions:**
- The server is configured to accept self-signed certificates
- If issues persist, check Hostinger's SSL certificate settings
- You can disable TLS verification (not recommended for production)

### Issue: Emails going to spam folder

**Solutions:**
- Set up SPF record in your domain DNS:
  ```
  Type: TXT
  Name: @
  Value: v=spf1 include:hostinger.com ~all
  ```

- Set up DKIM record (check Hostinger email settings)
- Set up DMARC record:
  ```
  Type: TXT
  Name: _dmarc
  Value: v=DMARC1; p=none; rua=mailto:your-email@yourdomain.com
  ```

- Use a proper "from" address (not generic)
- Avoid spam trigger words in subject/content

### Issue: "Cannot connect to email server" in frontend

**Solutions:**
- Ensure backend server is running (`npm start` in server directory)
- Check if backend is accessible at the configured URL
- Verify CORS is enabled (already configured in server)
- Check browser console for detailed error messages
- If backend is on different domain, update `REACT_APP_API_URL` in frontend `.env`

## API Endpoints

### Health Check
```
GET http://localhost:5000/api/health
```

### Send Trial Email
```
POST http://localhost:5000/api/send-trial-email
Content-Type: application/json

{
  "to": "customer@example.com",
  "toName": "Customer Name",
  "subject": "Download Your Free Trial - Product Name",
  "html": "<html>...</html>",
  "productName": "3D PDF Exporter for AutoCAD",
  "downloadUrl": "https://..."
}
```

### Test Email
```
POST http://localhost:5000/api/test-email
Content-Type: application/json

{
  "to": "your-email@example.com"
}
```

## Production Deployment

### 1. Environment Variables
Set environment variables on your production server (not in code):
- Use your hosting provider's environment variable settings
- Never commit `.env` file to version control

### 2. Process Manager (PM2)
```bash
npm install -g pm2
pm2 start server/index.js --name email-server
pm2 save
pm2 startup
```

### 3. Reverse Proxy (Nginx)
If needed, set up Nginx to proxy requests:
```nginx
location /api/ {
    proxy_pass http://localhost:5000;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
}
```

### 4. HTTPS
Use HTTPS for production to secure email credentials in transit.

## Security Best Practices

1. **Never commit `.env` file** - Add to `.gitignore`
2. **Use strong email passwords** - Generate secure passwords for email accounts
3. **Limit email account permissions** - Use a dedicated account for sending emails
4. **Monitor email usage** - Check for unusual activity
5. **Use environment variables** - Never hardcode credentials
6. **Enable rate limiting** - Prevent abuse (can be added to server)

## Support

If you encounter issues:
1. Check server logs for detailed error messages
2. Test SMTP connection using the test endpoint
3. Verify Hostinger email account is active
4. Contact Hostinger support for SMTP-specific issues

