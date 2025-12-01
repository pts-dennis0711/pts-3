# Deploying to Render - Complete Guide

## 📦 **What You're Deploying**

Your application has two parts:
1. **Backend** (Express API) - Already deployed at `pts3-backend.onrender.com` ✅
2. **Frontend** (React App) - Deploy as Static Site

---

## 🚀 **Frontend Deployment (Static Site)**

### **Prerequisites**
- Git repository (GitHub, GitLab, or Bitbucket)
- Render account ([render.com](https://render.com))

### **Step-by-Step**

#### **1. Prepare Your Repository**

Make sure these files are committed:
- ✅ `.env.production` (with correct API URL)
- ✅ `vercel.json` (works for Render too)
- ✅ `package.json`
- ✅ All source files

```bash
git add .
git commit -m "Prepare for Render deployment"
git push
```

#### **2. Create Static Site on Render**

1. **Log in** to [render.com/dashboard](https://render.com/dashboard)
2. Click **"New +"** → **"Static Site"**
3. **Connect your repository**:
   - Choose GitHub/GitLab
   - Select repository: `pts-3`
   - Branch: `main` (or `master`)

#### **3. Configure Build Settings**

```yaml
Name:              pts-3-frontend
Root Directory:    (leave empty, or specify if frontend is in subdirectory)
Build Command:     npm install && npm run build
Publish Directory: build
```

**Advanced Settings** (optional):
```yaml
Auto-Deploy:       Yes
Branch:            main
```

#### **4. Environment Variables**

Click **"Advanced"** and add these:

```env
REACT_APP_API_URL=https://pts3-backend.onrender.com
REACT_APP_SITE_NAME=ProtoTech Solutions
REACT_APP_SITE_URL=https://pts-3-frontend.onrender.app
CI=false
```

> **Note**: Update `REACT_APP_SITE_URL` after Render assigns your URL

#### **5. Create Static Site**

1. Click **"Create Static Site"**
2. Render will:
   - Clone repository
   - Install dependencies
   - Run build command
   - Deploy to CDN

**First deploy takes**: ~3-5 minutes

#### **6. Update Backend CORS**

After frontend deploys, update backend to allow new origin:

**On Backend Render Service** (`pts3-backend`):
1. Go to **Environment**
2. Add this variable:
   ```
   FRONTEND_URL=https://pts-3-frontend.onrender.app
   ```
3. Save (auto-redeploys)

Your backend code already handles this (checks `process.env.FRONTEND_URL`).

---

## 🔧 **Configuration Files**

### **render.yaml** (Optional - Infrastructure as Code)

Create `render.yaml` in your repo root for easier management:

```yaml
# render.yaml
services:
  # Backend API
  - type: web
    name: pts3-backend
    env: node
    region: oregon
    buildCommand: cd server && npm install
    startCommand: cd server && npm start
    envVars:
      - key: NODE_ENV
        value: production
      - key: SMTP_HOST
        value: smtp.hostinger.com
      - key: SMTP_PORT
        value: 587
      - key: SMTP_SECURE
        value: false
      # Add other env vars in Render dashboard

  # Frontend Static Site
  - type: web
    name: pts3-frontend
    env: static
    buildCommand: npm install && npm run build
    staticPublishPath: ./build
    envVars:
      - key: REACT_APP_API_URL
        value: https://pts3-backend.onrender.com
      - key: CI
        value: false
```

---

## 🌐 **Custom Domain** (Optional)

### **For Frontend**

1. **In Render Dashboard**:
   - Go to your static site
   - Click **"Settings"** → **"Custom Domains"**
   - Add: `www.prototechsolutions.com`

2. **In Your DNS Provider** (Namecheap, GoDaddy, Cloudflare):
   - Add CNAME record:
     ```
     Type:  CNAME
     Host:  www
     Value: pts-3-frontend.onrender.app
     ```

3. **Wait for DNS** propagation (5-60 minutes)

4. **Update Environment Variables**:
   ```
   REACT_APP_SITE_URL=https://www.prototechsolutions.com
   ```

### **For Backend**

Similar process but add:
```
SITE_URL=https://www.prototechsolutions.com
```

---

## 📊 **Comparison: Render vs Vercel**

| Feature | Render | Vercel |
|---------|--------|--------|
| **Frontend (Static)** | ✅ Free | ✅ Free |
| **Backend (Node.js)** | ✅ Free (with limits) | ❌ Paid serverless |
| **Custom Domains** | ✅ Free SSL | ✅ Free SSL |
| **Build Minutes** | 500/month free | 6000/month free |
| **Auto-Deploy** | ✅ Yes | ✅ Yes |
| **Global CDN** | ✅ Yes | ✅ Yes (better) |
| **Best For** | Full-stack apps | JAMstack/Static |

**Recommendation for Your App**:
- **Backend**: Render ✅ (already there)
- **Frontend**: Either works, but **Vercel is faster** for static sites

---

## 🔄 **Auto-Deploy Setup**

Once connected to Git, Render auto-deploys when you:
```bash
git push origin main
```

**Deployment Triggers**:
- ✅ Push to main branch
- ✅ Merge pull request
- ✅ Manual deploy from dashboard

**Disable Auto-Deploy**:
- Settings → Auto-Deploy → Toggle off

---

## 🐛 **Common Issues**

### **Build Fails with ESLint Warnings**

**Error**: `Treating warnings as errors because process.env.CI = true`

**Fix**: Add `CI=false` to environment variables (already in guide)

### **API Calls Return 404**

**Cause**: Wrong `REACT_APP_API_URL`

**Fix**: 
1. Check environment variable is set correctly
2. Verify backend is running: `https://pts3-backend.onrender.com/api/health`

### **CORS Errors**

**Cause**: Backend doesn't allow frontend origin

**Fix**: Add `FRONTEND_URL` environment variable on backend

### **Build Succeeds but Site is Blank**

**Causes**:
1. Wrong publish directory
2. Routes not working (SPA routing)

**Fix**:
1. Verify `Publish Directory: build`
2. Add `_redirects` file:
   ```bash
   # In public/_redirects
   /*    /index.html   200
   ```

---

## 📈 **Monitoring & Logs**

### **View Build Logs**
1. Go to Render dashboard
2. Click on your site
3. **"Events"** tab → Click on deployment

### **View Runtime Logs** (Backend only)
- **"Logs"** tab in service dashboard

### **Check Site Status**
- Green dot = Healthy
- Yellow dot = Deploying
- Red dot = Failed

---

## 💰 **Render Free Tier Limits**

### **Static Sites**
- ✅ Unlimited sites
- ✅ Unlimited requests
- ✅ 100 GB bandwidth/month
- ✅ Global CDN

### **Web Services** (Backend)
- ⚠️ Spins down after 15 min inactivity
- ⚠️ First request after idle takes ~30 seconds
- ✅ 750 hours/month (enough for 1 service 24/7)

**Upgrade to Paid** ($7/month) for:
- Always-on services (no spin down)
- More resources
- Better performance

---

## 🚀 **Quick Deploy Checklist**

- [ ] Code pushed to GitHub
- [ ] `.env.production` has correct values
- [ ] Build works locally (`npm run build`)
- [ ] Backend is running on Render
- [ ] Create static site on Render
- [ ] Add environment variables
- [ ] Wait for first deploy
- [ ] Test frontend URL
- [ ] Update backend CORS
- [ ] Test API integration
- [ ] Configure custom domain (optional)

---

## 🔗 **Useful Links**

- [Render Dashboard](https://render.com/dashboard)
- [Render Docs - Static Sites](https://render.com/docs/static-sites)
- [Render Docs - Deploy Hooks](https://render.com/docs/deploy-hooks)
- [Render Status](https://status.render.com/)

---

## 🆘 **Getting Help**

**If deployment fails**:
1. Check build logs in Render dashboard
2. Look for specific error message
3. Test build locally first: `npm run build`
4. Check environment variables are set

**Common commands**:
```bash
# Test build locally
npm run build

# Test built site locally
npx serve -s build

# Check if backend is reachable
curl https://pts3-backend.onrender.com/api/health
```

---

## ✅ **After Successful Deployment**

Your application will be available at:
- **Frontend**: `https://pts-3-frontend.onrender.app`
- **Backend**: `https://pts3-backend.onrender.com`

Both with:
- ✅ HTTPS enabled
- ✅ Auto-deploy on push
- ✅ Free hosting (with limits)
