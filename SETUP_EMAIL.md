# Quick Setup Guide - Hostinger SMTP Email

## Step 1: Install Backend Dependencies

```bash
cd server
npm install
```

## Step 2: Configure SMTP Settings

Create a `.env` file in the `server` directory:

```bash
cd server
# Create .env file (copy from .env.example if it exists, or create manually)
```

Add your Hostinger SMTP credentials to `server/.env`:

```env
SMTP_HOST=smtp.hostinger.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=your-email@yourdomain.com
SMTP_PASS=your-email-password
SMTP_FROM=noreply@yourdomain.com
PORT=5000
```

**To get your Hostinger SMTP credentials:**
1. Log in to Hostinger hPanel
2. Go to **Email** section
3. Create or select an email account
4. Use the email address as `SMTP_USER`
5. Use the email password as `SMTP_PASS`

## Step 3: Start the Backend Server

```bash
cd server
npm start
```

The server will run on `http://localhost:5000`

## Step 4: Test the Configuration

Send a test email:
```bash
curl -X POST http://localhost:5000/api/test-email \
  -H "Content-Type: application/json" \
  -d "{\"to\": \"your-email@example.com\"}"
```

Or use Postman/Thunder Client:
- URL: `http://localhost:5000/api/test-email`
- Method: POST
- Body: `{"to": "your-email@example.com"}`

## Step 5: Start the Frontend

In a new terminal:
```bash
npm start
```

The frontend will automatically connect to the backend at `http://localhost:5000`

## Troubleshooting

### If port 465 doesn't work, try port 587:
```env
SMTP_PORT=587
SMTP_SECURE=false
```

### If you get "Cannot connect to email server":
- Make sure the backend server is running (`npm start` in server directory)
- Check that the server is accessible at `http://localhost:5000`

### For production:
Create a `.env` file in the root directory:
```env
REACT_APP_API_URL=https://your-api-domain.com
```

## Full Documentation

See `docs/EMAIL_SETUP.md` for detailed documentation and troubleshooting.

