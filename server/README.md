# Email Server Setup Guide

This backend server handles sending emails using Hostinger SMTP configuration.

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Hostinger email account with SMTP access

## Installation

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
# Copy the example environment file
cp .env.example .env

# Edit .env and add your Hostinger SMTP credentials and database settings
```

## Hostinger SMTP Configuration

Edit the `.env` file with your Hostinger SMTP settings:

```env
SMTP_HOST=smtp.hostinger.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=your-email@yourdomain.com
SMTP_PASS=your-email-password
SMTP_FROM=noreply@yourdomain.com
PORT=5000

# PostgreSQL connection string (Neon, Supabase, Render, Railway, etc.)
DATABASE_URL=postgresql://username:password@host:5432/database
# Optional: disable SSL for a local database
PGSSLMODE=disable
```

### Free PostgreSQL Options

You can host PostgreSQL without cost on platforms like:
- [Neon](https://neon.tech/)
- [Supabase](https://supabase.com/)
- [Render](https://render.com/)
- [Railway](https://railway.app/)

Each provider gives you a `DATABASE_URL` that you can paste into `.env`.

### How to Get Hostinger SMTP Credentials

1. Log in to your Hostinger control panel (hPanel)
2. Go to **Email** section
3. Create or select an email account
4. Note down:
   - Email address (this is your `SMTP_USER`)
   - Email password (this is your `SMTP_PASS`)
5. SMTP settings are typically:
   - **Host:** smtp.hostinger.com
   - **Port:** 465 (SSL) or 587 (TLS)
   - **Security:** SSL/TLS

### Alternative Hostinger SMTP Settings

If port 465 doesn't work, try:
```env
SMTP_PORT=587
SMTP_SECURE=false
```

## Running the Server

### Development Mode (with auto-reload):
```bash
npm run dev
```

### Production Mode:
```bash
npm start
```

The server will start on `http://localhost:5000` (or the port specified in `.env`).

## API Endpoints

### 1. Health Check
```
GET /api/health
```
Returns server status.

### 2. Send Trial Email
```
POST /api/send-trial-email
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

### 3. Test Email (for testing SMTP configuration)
```
POST /api/test-email
Content-Type: application/json

{
  "to": "your-email@example.com"
}
```

### 4. Email Logs (requires PostgreSQL)
```
GET /api/email-logs?limit=50
```
Returns recent email send attempts stored in PostgreSQL.

## Testing the Setup

1. Start the server:
```bash
npm start
```

If PostgreSQL credentials are present, the server will:
- Verify the connection on startup
- Auto-create the `email_logs` table (if missing)
- Store every successful or failed `/api/send-trial-email` attempt

2. Test SMTP configuration:
```bash
curl -X POST http://localhost:5000/api/test-email \
  -H "Content-Type: application/json" \
  -d '{"to": "your-email@example.com"}'
```

Or use Postman/Thunder Client to send a POST request.

## Troubleshooting

### Common Issues

1. **"Invalid login" error:**
   - Verify your email and password are correct
   - Make sure you're using the full email address (e.g., `noreply@yourdomain.com`)

2. **"Connection timeout" error:**
   - Check if port 465 is blocked by firewall
   - Try port 587 with `SMTP_SECURE=false`
   - Verify SMTP_HOST is correct

3. **"Self-signed certificate" error:**
   - The server is configured to accept self-signed certificates
   - If issues persist, check Hostinger's SSL certificate settings

4. **Emails going to spam:**
   - Set up SPF, DKIM, and DMARC records in your domain DNS
   - Use a proper "from" address (not a generic one)
   - Avoid spam trigger words in subject/content

## Security Notes

⚠️ **Important:**
- Never commit `.env` file to version control
- Keep your SMTP credentials secure
- Use environment variables for all sensitive data
- Consider using a dedicated email account for sending automated emails

## Production Deployment

For production:
1. Use a process manager like PM2:
```bash
npm install -g pm2
pm2 start index.js --name email-server
```

2. Set up reverse proxy (nginx/Apache) if needed
3. Use HTTPS for the API endpoint
4. Monitor logs for email delivery issues

## Integration with Frontend

The frontend is already configured to call `/api/send-trial-email`. Make sure:

1. The backend server is running
2. CORS is properly configured (already set up)
3. The frontend can reach the backend URL

If your frontend and backend are on different domains/ports, update the API URL in `src/services/emailService.js`.

