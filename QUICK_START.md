# Quick Start Guide - TSL Tournament

Get your tournament website running in minutes!

## 🚀 5-Minute Local Setup

### Prerequisites Check
```bash
node --version  # Should be v16 or higher
npm --version   # Should be v8 or higher
```

Don't have Node.js? Download from https://nodejs.org

### Step 1: Extract Files
Unzip the project folder to your desired location.

### Step 2: Setup Backend (Terminal 1)

```bash
# Navigate to backend
cd tsl-tournament/backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Open .env and add your MongoDB URI and secret key
# For testing, you can use MongoDB Atlas free tier

# Seed database with initial data
npm run seed

# Start backend server
npm run dev
```

✅ Backend running at http://localhost:5000

### Step 3: Setup Frontend (Terminal 2)

```bash
# Open new terminal
# Navigate to frontend
cd tsl-tournament/frontend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Edit .env - already configured for localhost

# Start frontend server
npm run dev
```

✅ Frontend running at http://localhost:3000

### Step 4: Access the Website

**Public Website:**
Open browser → http://localhost:3000

**Admin Panel:**
Open browser → http://localhost:3000/update-tournament
Enter your secret key (from backend .env)

## 🎯 What You Should See

### Public Website
- ✅ TSL Homepage with hero banner
- ✅ Today's Fixtures section
- ✅ 9 pre-loaded matches
- ✅ 8 teams in two pools
- ✅ Points table (empty until matches finish)
- ✅ All player rosters

### Admin Panel
- ✅ Login screen
- ✅ 4 tabs: Matches, Teams, Players, Fixtures
- ✅ Pre-loaded teams and players
- ✅ Ready to update scores

## 🧪 Test the System

### Quick Test Scenario

1. **Go to Admin Panel** (http://localhost:3000/update-tournament)

2. **Update a Match:**
   - Tab: Matches
   - Select: Liverpool FC vs Lazio
   - Score A: 2
   - Score B: 1
   - Status: Finished
   - Click "Update Score"

3. **Add Goal Scorers:**
   - Match: Liverpool FC vs Lazio
   - Team: Liverpool FC
   - Player: Jeswin
   - Minute: 23
   - Click "Add Goal"
   
   Repeat for second goal:
   - Player: Shihan
   - Minute: 64

4. **Check Public Website:**
   - Go to http://localhost:3000
   - See match result in "Recent Results"
   - Check Points Table - Liverpool has 3 points!
   - Check Top Scorers - Jeswin and Shihan appear

## 📱 Mobile Testing

Open http://localhost:3000 on your phone (same WiFi):
- Find your computer's IP: `ipconfig` (Windows) or `ifconfig` (Mac/Linux)
- Visit: http://YOUR-IP:3000

## 🌐 Ready to Deploy?

See **DEPLOYMENT_GUIDE.md** for complete deployment instructions.

Quick links:
- MongoDB Atlas: https://mongodb.com/cloud/atlas
- Render (Backend): https://render.com
- Vercel (Frontend): https://vercel.com

## ❓ Troubleshooting

**Backend won't start:**
```bash
# Check if MongoDB URI is set in .env
# Make sure port 5000 is not in use
```

**Frontend can't load data:**
```bash
# Verify backend is running on port 5000
# Check VITE_API_URL in frontend/.env
```

**Database seed fails:**
```bash
# Verify MongoDB connection string
# Check network connectivity
# Ensure database user has read/write permissions
```

**"Invalid secret key":**
```bash
# Check ADMIN_SECRET in backend/.env
# Make sure you're using the exact same key
```

## 📁 Project Structure

```
tsl-tournament/
├── backend/              # Node.js + Express API
│   ├── models/          # Database schemas
│   ├── routes/          # API endpoints
│   ├── middleware/      # Authentication
│   ├── utils/           # Helper functions
│   ├── server.js        # Main server file
│   └── seed.js          # Database seeding
├── frontend/             # React + Vite app
│   └── src/
│       ├── components/  # Reusable UI components
│       ├── pages/       # Page components
│       └── utils/       # API utilities
├── README.md            # Full documentation
├── DEPLOYMENT_GUIDE.md  # Deployment steps
├── ORGANIZER_GUIDE.md   # Admin usage guide
└── QUICK_START.md       # This file
```

## 🎮 Next Steps

1. ✅ Customize team logos (update in database)
2. ✅ Adjust fixture dates and times
3. ✅ Add/modify teams and players as needed
4. ✅ Update match scores as tournament progresses
5. ✅ Deploy to production (see DEPLOYMENT_GUIDE.md)

## 📚 Documentation

- **README.md** - Complete project overview
- **DEPLOYMENT_GUIDE.md** - Step-by-step deployment
- **ORGANIZER_GUIDE.md** - How to manage tournament

## 💡 Tips

- **Development:** Use `npm run dev` for auto-reload
- **Production:** Use `npm start` in backend
- **Database:** MongoDB Atlas free tier is perfect for starting
- **Hosting:** Vercel + Render free tiers work for testing

## 🎉 You're All Set!

Your TSL tournament website is ready to use.

**What works:**
✅ Live score updates
✅ Automatic standings calculation
✅ Goal scorer tracking
✅ Top scorers leaderboard
✅ Mobile responsive design
✅ Auto-refresh every 10 seconds
✅ Professional sports portal design

**Share with fans:**
Send them the public URL (not the /update-tournament page!)

**For organizers:**
Share the admin URL and secret key privately.

---

Need help? Check the troubleshooting section or read the full README.md

Built with ⚽ for Thekkinkad Super League
