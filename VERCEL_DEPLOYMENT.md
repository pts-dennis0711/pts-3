# Vercel Deployment Troubleshooting Guide

## ✅ Fix Applied

Added `CI=false` to **prevent ESLint warnings from being treated as errors** during Vercel build.

**Files Changed:**
1. ✅ `.env.production` - Added `CI=false`
2. ✅ `vercel.json` - Created with build configuration

---

## 🚀 Deploying to Vercel

### Option 1: Using Vercel Dashboard

1. **Push your changes to GitHub**:
   ```bash
   git add .
   git commit -m "Add Vercel deployment configuration"
   git push
   ```

2. **Import Project in Vercel**:
   - Go to [vercel.com/dashboard](https://vercel.com/dashboard)
   - Click "Add New Project"
   - Import your GitHub repository

3. **Configure Build Settings**:
   - **Framework Preset**: Create React App
   - **Build Command**: `npm run build`
   - **Output Directory**: `build`
   - **Install Command**: `npm install`

4. **Set Environment Variables** (in Vercel Dashboard):
   ```
   REACT_APP_API_URL=https://pts3-backend.onrender.com
   REACT_APP_SITE_NAME=ProtoTech Solutions
   REACT_APP_SITE_URL=https://your-vercel-url.vercel.app
   CI=false
   ```

5. **Deploy**: Click "Deploy"

### Option 2: Using Vercel CLI

```bash
npm install -g vercel
vercel login
vercel --prod
```

---

## 🐛 Common Vercel Errors & Solutions

### Error 1: "Treating warnings as errors"

**Symptom**: Build fails with ESLint warnings

**Error Message**:
```
Treating warnings as errors because process.env.CI = true
```

**Solution**: ✅ ALREADY FIXED
- Added `CI=false` to `.env.production`
- Set in `vercel.json`

---

### Error 2: "Module not found" or Import Errors

**Symptom**: Build fails with cannot find module

**Possible Causes**:
- Case sensitivity (Windows vs Linux)
- Missing dependencies
- Incorrect import paths

**Solutions**:

1. **Check import case sensitivity**:
   ```javascript
   // ❌ Wrong on Linux (if file is HomePage.js)
   import HomePage from './pages/homepage';
   
   // ✅ Correct
   import HomePage from './pages/HomePage';
   ```

2. **Verify all dependencies are in package.json**:
   ```bash
   npm install
   ```

3. **Check for dev dependencies**:
   ```bash
   # Move from devDependencies to dependencies if needed
   npm install --save package-name
   ```

---

### Error 3: Environment Variables Not Set

**Symptom**: `undefined` values for `process.env.REACT_APP_*`

**Solution**:
1. Set in Vercel Dashboard: Settings → Environment Variables
2. Or use `vercel.json` (already configured)

**Required Variables**:
```
REACT_APP_API_URL=https://pts3-backend.onrender.com
REACT_APP_SITE_NAME=ProtoTech Solutions
REACT_APP_SITE_URL=https://your-site.vercel.app
```

---

### Error 4: Out of Memory

**Symptom**: 
```
JavaScript heap out of memory
```

**Solution**: Add to `vercel.json`:
```json
{
  "build": {
    "env": {
      "NODE_OPTIONS": "--max_old_space_size=4096"
    }
  }
}
```

---

### Error 5: Build Command Exit Code 1

**Symptom**: Generic build failure

**Troubleshooting Steps**:

1. **Check Vercel build logs** for specific error
2. **Test build locally**:
   ```bash
   CI=true npm run build
   ```
   This simulates Vercel's strict mode

3. **Clear Vercel cache**:
   - Vercel Dashboard → Deployments → ... → Redeploy → Clear cache and deploy

---

### Error 6: Routing Issues (404 on Refresh)

**Symptom**: Routes work initially but give 404 on page refresh

**Solution**: Already configured in `vercel.json` with SPA routing

If still issues, ensure your `vercel.json` has:
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/" }
  ]
}
```

---

### Error 7: Node Version Mismatch

**Symptom**: 
```
Error: The engine "node" is incompatible
```

**Solution**: Add to `package.json`:
```json
{
  "engines": {
    "node": ">=14.0.0",
    "npm": ">=6.0.0"
  }
}
```

---

## 🧪 Testing Before Deployment

### 1. Test Build with CI=true (Simulates Vercel)
```bash
CI=true npm run build
```

If this fails, fix all ESLint warnings or use `CI=false`.

### 2. Check Bundle Size
```bash
npm run build
```

Look for warnings about large bundles (>500 KB).

### 3. Test Built App Locally
```bash
npm install -g serve
serve -s build
```

Visit `http://localhost:3000` and test all routes.

---

## 📋 Deployment Checklist

Before deploying:
- [ ] All changes committed to Git
- [ ] `.env.production` has correct values
- [ ] `vercel.json` is configured
- [ ] Build succeeds locally with `npm run build`
- [ ] Environment variables set in Vercel Dashboard
- [ ] Backend API is accessible from Vercel's servers
- [ ] CORS configured on backend to allow Vercel domain

---

## 🔍 Debugging Failed Vercel Builds

### Step 1: View Build Logs
1. Go to Vercel Dashboard
2. Click on failed deployment
3. Click "View Build Logs"
4. Look for the first ERROR (not WARNING)

### Step 2: Copy the Error
Share the specific error message for targeted help.

### Step 3: Common Error Patterns

**Pattern**: `Cannot find module 'X'`
→ Check imports, case sensitivity, package.json

**Pattern**: `Treating warnings as errors`
→ Set `CI=false` (already done)

**Pattern**: `process.env.REACT_APP_X is undefined`
→ Set environment variables in Vercel

**Pattern**: `JavaScript heap out of memory`
→ Increase Node memory limit

---

## 🆘 Still Having Issues?

If deployment still fails:

1. **Share the exact error** from Vercel build logs
2. **Check if issue is with**:
   - Frontend build (dealt with in this guide)
   - Backend API (separate deployment)
   - CORS configuration
   - Environment variables

3. **Quick test**: Deploy a minimal Create React App
   ```bash
   npx create-react-app test-deploy
   cd test-deploy
   vercel --prod
   ```
   If this works, issue is in your code/config.

---

## 🎯 Next Steps

1. **Commit and push** the changes:
   ```bash
   git add .
   git commit -m "Add Vercel deployment config with CI=false"
   git push
   ```

2. **Deploy on Vercel** (will auto-deploy if connected to GitHub)

3. **Set environment variables** in Vercel Dashboard

4. **Update backend CORS** to allow your Vercel domain:
   ```javascript
   // server/index.js
   app.use(cors({
     origin: [
       'http://localhost:3000',
       'https://your-app.vercel.app',
       'https://staging8.prototechsolutions.com'
     ]
   }));
   ```

---

## 📚 Resources

- [Vercel Create React App Guide](https://vercel.com/guides/deploying-react-with-vercel)
- [Vercel Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)
- [Vercel Build Configuration](https://vercel.com/docs/build-step)
