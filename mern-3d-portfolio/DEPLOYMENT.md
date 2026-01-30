# 🚀 Deployment Guide

## Table of Contents
1. [MongoDB Atlas Setup](#mongodb-atlas-setup)
2. [Backend Deployment](#backend-deployment)
3. [Frontend Deployment](#frontend-deployment)
4. [Domain Configuration](#domain-configuration)

---

## MongoDB Atlas Setup

### Step 1: Create Cluster
1. Go to [mongodb.com](https://www.mongodb.com/cloud/atlas)
2. Sign up / Log in
3. Create new cluster (M0 Sandbox - FREE)
4. Choose cloud provider and region (closest to your users)

### Step 2: Database Access
1. Click "Database Access" in sidebar
2. "Add New Database User"
3. Choose "Password" authentication
4. Generate secure password (save it!)
5. Set privileges: "Read and write to any database"

### Step 3: Network Access
1. Click "Network Access" in sidebar
2. Click "Add IP Address"
3. Choose "ALLOW ACCESS FROM ANYWHERE" (0.0.0.0/0)
   - Or add specific IPs for security

### Step 4: Get Connection String
1. Go to "Database" → "Clusters"
2. Click "Connect"
3. Choose "Connect your application"
4. Copy the connection string
5. Replace `<password>` with your database user password
6. Replace `myFirstDatabase` with `bombsquad-portfolio`

**Example:**
```
mongodb+srv://admin:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/bombsquad-portfolio?retryWrites=true&w=majority
```

---

## Backend Deployment (Render)

### Step 1: Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/username/repo.git
git push -u origin main
```

### Step 2: Deploy on Render
1. Go to [render.com](https://render.com)
2. Sign up with GitHub
3. Click "New Web Service"
4. Connect your repository
5. Configure:
   - **Name**: `bombsquad-api`
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Root Directory**: `server` (if mono-repo)

### Step 3: Environment Variables
Add these in Render Dashboard → Environment:
```
MONGODB_URI=mongodb+srv://...
JWT_SECRET=your_super_secret_key
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=your_secure_password
NODE_ENV=production
```

### Step 4: Deploy
Click "Create Web Service"
Wait for deployment to complete

**Important:** Note the deployed URL (e.g., `https://bombsquad-api.onrender.com`)

---

## Frontend Deployment (Vercel)

### Step 1: Prepare Client
Update `client/package.json`, remove proxy line:
```json
// Remove this line:
"proxy": "http://localhost:5000"
```

Create `client/.env.production`:
```
REACT_APP_API_URL=https://your-backend-url.onrender.com/api
```

### Step 2: Deploy
```bash
cd client
npm install -g vercel
vercel --prod
```

Or use Vercel Dashboard:
1. Go to [vercel.com](https://vercel.com)
2. Import GitHub repository
3. Configure:
   - **Framework Preset**: Create React App
   - **Root Directory**: `client`
   - **Build Command**: `npm run build`
   - **Output Directory**: `build`

### Step 3: Environment Variables
Add in Vercel Dashboard:
```
REACT_APP_API_URL=https://your-backend-url.onrender.com/api
```

---

## Alternative: Netlify (Frontend)

```bash
cd client
npm run build
npm install -g netlify-cli
netlify deploy --prod --dir=build
```

Or drag `client/build` folder to [Netlify Drop](https://app.netlify.com/drop)

---

## Alternative: Railway (Backend)

1. Go to [railway.app](https://railway.app)
2. New Project → Deploy from GitHub repo
3. Add MongoDB plugin (or use external Atlas)
4. Add environment variables
5. Deploy

---

## Domain Configuration

### Custom Domain on Vercel
1. Buy domain (Namecheap, GoDaddy, etc.)
2. Vercel Dashboard → Project Settings → Domains
3. Add your domain
4. Update DNS records as instructed

### Custom Domain on Render
1. Dashboard → Custom Domains
2. Add domain
3. Update DNS with CNAME record

---

## 🔒 Security Checklist

- [ ] Change default admin password
- [ ] Use strong JWT_SECRET (64+ random chars)
- [ ] Enable MongoDB IP whitelist (if possible)
- [ ] Set `NODE_ENV=production`
- [ ] Enable HTTPS (automatic on Render/Vercel)
- [ ] Add rate limiting (install `express-rate-limit`)

---

## 🐛 Troubleshooting Deployment

### CORS Errors
Update `server/server.js`:
```javascript
app.use(cors({
  origin: ['https://your-frontend.vercel.app', 'http://localhost:3000'],
  credentials: true
}));
```

### Build Fails
Check Node version (should be 16+):
```bash
node -v
```

### Environment Variables Not Working
- Ensure `.env` is not in `.gitignore` for local
- For production, set in hosting platform dashboard
- Restart service after adding env vars

### MongoDB Connection Timeout
- Check if IP is whitelisted in Atlas
- Verify connection string format
- Try connecting with MongoDB Compass first

---

## 🎉 Post-Deployment

1. Visit your deployed site
2. Test admin login
3. Create a test project
4. Verify all features work
5. Share your awesome portfolio!

---

## 📊 Monitoring

### Free Options:
- **Uptime**: [UptimeRobot](https://uptimerobot.com) (free tier)
- **Analytics**: [Google Analytics](https://analytics.google.com)
- **Error Tracking**: [Sentry](https://sentry.io) (free tier)

Keep building amazing things! 🚀