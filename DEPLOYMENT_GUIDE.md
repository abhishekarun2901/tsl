# Deployment Guide - TSL Tournament

Complete step-by-step guide to deploy the Thekkinkad Super League website.

## 📋 Pre-Deployment Checklist

- [ ] GitHub repository created
- [ ] Code pushed to GitHub
- [ ] MongoDB Atlas account created
- [ ] Render account created
- [ ] Vercel account created

## 🗄️ Step 1: MongoDB Atlas Setup

### Create Database

1. Go to https://www.mongodb.com/cloud/atlas/register
2. Sign up for free account
3. Choose "Shared" (Free M0 cluster)
4. Select cloud provider and region (closest to you)
5. Name your cluster (e.g., "TSL-Cluster")
6. Click "Create Cluster"

### Configure Database Access

1. In left sidebar, click "Database Access"
2. Click "Add New Database User"
3. Choose "Password" authentication
4. Enter username and generate/create password
5. Save credentials securely
6. User Privileges: "Atlas admin" or "Read and write to any database"
7. Click "Add User"

### Configure Network Access

1. In left sidebar, click "Network Access"
2. Click "Add IP Address"
3. Click "Allow Access from Anywhere" (0.0.0.0/0)
4. Confirm

⚠️ For production, restrict to specific IPs for better security

### Get Connection String

1. Click "Database" in left sidebar
2. Click "Connect" button on your cluster
3. Choose "Connect your application"
4. Driver: Node.js, Version: Latest
5. Copy connection string
6. Replace `<username>` and `<password>` with your credentials
7. Replace `<dbname>` with `tsl-tournament`

Example:
```
mongodb+srv://admin:myPassword123@tsl-cluster.abc123.mongodb.net/tsl-tournament?retryWrites=true&w=majority
```

## 🖥️ Step 2: Backend Deployment (Render)

### Create Web Service

1. Go to https://render.com
2. Sign up / Log in
3. Click "New +" → "Web Service"
4. Connect GitHub account
5. Select your repository
6. Click "Connect"

### Configure Service

**Basic Settings:**
- Name: `tsl-backend` (or your choice)
- Region: Choose closest to your users
- Branch: `main` (or your default branch)
- Root Directory: `backend`
- Runtime: `Node`

**Build & Deploy:**
- Build Command: `npm install`
- Start Command: `npm start`

**Instance Type:**
- Free (for testing)
- Paid (for production with guaranteed uptime)

### Add Environment Variables

Click "Environment" tab and add:

| Key | Value |
|-----|-------|
| `MONGODB_URI` | Your MongoDB connection string |
| `ADMIN_SECRET` | Create a strong secret key (e.g., `TSL2025SecureKey!@#`) |
| `NODE_ENV` | `production` |

⚠️ Keep ADMIN_SECRET secure - you'll need it to access the admin page!

### Deploy

1. Click "Create Web Service"
2. Wait for deployment (3-5 minutes first time)
3. Check logs for any errors
4. Once successful, note your backend URL
   - Example: `https://tsl-backend.onrender.com`

### Test Backend

Visit `https://your-backend-url.onrender.com` in browser

Should see:
```json
{"message": "TSL Tournament API is running"}
```

Test API:
- `https://your-backend-url.onrender.com/api/teams`

## 🌐 Step 3: Frontend Deployment (Vercel)

### Create Project

1. Go to https://vercel.com
2. Sign up / Log in with GitHub
3. Click "Add New..." → "Project"
4. Import your GitHub repository
5. Click "Import"

### Configure Project

**Framework Preset:**
- Auto-detected as Vite (if not, select Vite)

**Root Directory:**
- Click "Edit" next to Root Directory
- Enter: `frontend`
- Click "Continue"

**Build Settings:**
- Build Command: `npm run build` (auto-filled)
- Output Directory: `dist` (auto-filled)
- Install Command: `npm install` (auto-filled)

### Add Environment Variable

Click "Environment Variables" section

| Key | Value |
|-----|-------|
| `VITE_API_URL` | Your Render backend URL + `/api` |

Example:
```
https://tsl-backend.onrender.com/api
```

⚠️ No trailing slash!

### Deploy

1. Click "Deploy"
2. Wait 1-2 minutes
3. Once successful, you'll see your live URL
   - Example: `https://tsl-tournament.vercel.app`

### Test Frontend

1. Visit your Vercel URL
2. You should see the TSL homepage
3. Check if data loads (teams, fixtures, etc.)

## 🌱 Step 4: Seed Production Database

Now that everything is deployed, seed your database:

### Option 1: Local Seeding (Recommended)

1. On your local machine, update `backend/.env`:
```env
MONGODB_URI=<your-production-mongodb-uri>
```

2. Run seed script:
```bash
cd backend
npm run seed
```

3. Check output for success messages
4. Restore `.env` to development settings if needed

### Option 2: Render Console

1. In Render dashboard, go to your web service
2. Click "Shell" tab
3. Run:
```bash
npm run seed
```

## ✅ Step 5: Verify Deployment

### Test Public Pages

Visit your Vercel URL and check:
- [ ] Home page loads
- [ ] Fixtures page shows matches
- [ ] Table page shows standings
- [ ] Teams page shows all teams
- [ ] Team detail pages work
- [ ] Top Scorers page loads
- [ ] Live polling works (data updates every 10 seconds)

### Test Admin Page

1. Visit `https://your-vercel-url.vercel.app/update-tournament`
2. Enter your ADMIN_SECRET
3. Verify you can:
   - [ ] Update match scores
   - [ ] Add goal scorers
   - [ ] Create teams
   - [ ] Create players
   - [ ] Create fixtures
   - [ ] See standings update after marking match as "finished"

## 🔧 Post-Deployment Configuration

### Custom Domain (Optional)

**Vercel:**
1. In Vercel project settings → "Domains"
2. Add your custom domain
3. Update DNS settings as instructed
4. Wait for verification

**Render:**
1. In Render service settings → "Custom Domains"
2. Add your custom domain
3. Update DNS with provided values

### Environment Variable Updates

If you need to update environment variables:

**Render:**
1. Go to service → "Environment"
2. Update values
3. Click "Save Changes"
4. Service auto-redeploys

**Vercel:**
1. Go to project → "Settings" → "Environment Variables"
2. Update values
3. Redeploy project

## 🚨 Troubleshooting

### Backend Issues

**"Application failed to respond"**
- Check Render logs
- Verify MongoDB connection string
- Ensure all environment variables are set

**CORS errors**
- Backend CORS is configured to allow all origins
- Check browser console for specific errors

### Frontend Issues

**"Failed to fetch"**
- Verify VITE_API_URL is correct
- Check if backend is running (visit backend URL)
- Ensure no trailing slash in VITE_API_URL

**Blank page**
- Check browser console for errors
- Verify build completed successfully
- Check Vercel deployment logs

**Data not loading**
- Verify backend API works (test in browser)
- Check browser Network tab
- Ensure database is seeded

### Database Issues

**Connection timeout**
- Check Network Access in MongoDB Atlas
- Verify IP whitelist includes 0.0.0.0/0
- Check connection string format

**No data showing**
- Run seed script again
- Check MongoDB Atlas collections have data
- Verify database name in connection string

## 🔄 Continuous Deployment

Both Render and Vercel automatically redeploy when you push to GitHub:

1. Make changes locally
2. Commit and push to GitHub
```bash
git add .
git commit -m "Update features"
git push origin main
```
3. Render and Vercel auto-detect and redeploy
4. Wait 2-5 minutes for deployment

## 📊 Monitoring

### Render Dashboard
- View logs in real-time
- Monitor CPU/memory usage
- Check deployment history

### Vercel Dashboard
- View deployment history
- Check build logs
- Monitor analytics (with paid plan)

### MongoDB Atlas
- Monitor database operations
- View connection metrics
- Set up alerts

## 💰 Cost Estimates

**Free Tier:**
- MongoDB Atlas M0: Free forever
- Render Free: Free (sleeps after 15min inactivity)
- Vercel Hobby: Free

**Production (Recommended):**
- MongoDB Atlas M10: ~$25/month
- Render Starter: $7/month
- Vercel Pro: $20/month (optional)

Total: ~$32-52/month for reliable production hosting

## 🎯 Going Live Checklist

Before sharing with users:

- [ ] All pages load correctly
- [ ] Data updates work in admin panel
- [ ] Standings calculate correctly
- [ ] Live polling works
- [ ] Mobile responsive design tested
- [ ] Admin secret key is secure
- [ ] Custom domain configured (optional)
- [ ] Backup plan for database
- [ ] Monitoring set up

## 📞 Support Resources

- Render Docs: https://render.com/docs
- Vercel Docs: https://vercel.com/docs
- MongoDB Atlas Docs: https://docs.atlas.mongodb.com

---

Your TSL tournament website is now live! 🎉⚽

Share the public URL with fans and keep the admin URL private.
