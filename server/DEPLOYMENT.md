# Deploy Backend to Render - Step by Step Guide

## Prerequisites
- GitHub account
- Render account (sign up at render.com)
- Your Neon DB connection string ready

## Step 1: Prepare Your Repository

Ensure your `server/package.json` has the correct start script:
```json
{
  "scripts": {
    "start": "node index.js"
  }
}
```
✅ Your server is already set up correctly!

## Step 2: Deploy to Render

### A. Create New Web Service
1. Go to https://render.com and sign in
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repository
4. Select your repository: `pts-3`

### B. Configure the Service
Fill in the following details:

| Setting | Value |
|---------|-------|
| **Name** | `prototech-api` (or any name you prefer) |
| **Root Directory** | `server` |
| **Environment** | `Node` |
| **Region** | Choose closest to you |
| **Branch** | `main` |
| **Build Command** | `npm install` |
| **Start Command** | `npm start` |
| **Instance Type** | `Free` |

### C. Add Environment Variables
Click **"Advanced"** and add these environment variables:

```
DATABASE_URL=your_neon_connection_string
SMTP_HOST=smtp.hostinger.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=your_email@domain.com
SMTP_PASS=your_email_password
SMTP_FROM=your_email@domain.com
NODE_ENV=production
```

### D. Deploy
1. Click **"Create Web Service"**
2. Render will start building and deploying (takes 2-3 minutes)
3. Once deployed, you'll get a URL like: `https://prototech-api.onrender.com`

## Step 3: Update Frontend Configuration

You need to update your React app to use the Render URL instead of localhost.

### Create `.env.production` file in your project root:
```
REACT_APP_API_URL=https://your-app-name.onrender.com
```

### For local development, create `.env.development`:
```
REACT_APP_API_URL=http://localhost:5000
```

## Step 4: Rebuild and Redeploy Frontend

After updating the environment variable:
```bash
npm run build
```

Then deploy the new build to Vercel (or your hosting platform).

## Important Notes

### Free Tier Limitations
- Render's free tier **spins down after 15 minutes of inactivity**
- First request after spin-down takes 30-50 seconds to wake up
- Solution: Use a paid plan ($7/month) for always-on service

### Auto-Deploy
- Render automatically redeploys when you push to GitHub
- No need to manually redeploy after code changes

### Monitoring
- View logs in Render dashboard
- Check deployment status
- Monitor resource usage

## Testing Your Deployment

After deployment, test these endpoints:

1. **Health Check:**
   ```
   GET https://your-app.onrender.com/api/health
   ```

2. **Create Order:**
   ```
   POST https://your-app.onrender.com/api/orders
   ```

## Troubleshooting

### Issue: "Service Unavailable"
- Check if service is running in Render dashboard
- Free tier may have spun down (wait 30-50 seconds)

### Issue: Database Connection Failed
- Verify `DATABASE_URL` in Render environment variables
- Check Neon DB is accessible (not paused)

### Issue: CORS Errors
- The server already has `cors` enabled
- If issues persist, update `index.js` to whitelist your frontend domain

## Your Setup URLs (After Deployment)

- **Backend API:** `https://prototech-api.onrender.com`
- **Frontend:** `https://staging8.prototechsolutions.com`
- **Database:** Neon DB (already configured)

## What Happens After Deployment?

1. You **stop running** `npm start` in the server folder
2. Orders are **automatically saved** to Neon DB when users checkout
3. Admin dashboard **fetches real orders** from the database
4. Everything works **without your local server running**

---

✅ Your backend will be live 24/7 (with free tier spin-down after inactivity)
✅ Database connections work from Render to Neon seamlessly
✅ No more need to run local server!
