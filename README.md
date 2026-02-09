# Thekkinkad Super League (TSL) - Tournament Website

A complete production-ready football tournament web application with live score updates.

## 🎯 Features

### Public Website
- **Home Page**: Live matches, today's fixtures, upcoming matches, and recent results
- **Fixtures**: Full schedule grouped by matchday
- **Points Table**: Auto-calculated standings with live updates
- **Teams**: Team profiles with manager, captain, and squad details
- **Top Scorers**: Leaderboard of goal scorers
- **Live Updates**: Automatic polling every 10 seconds

### Hidden Organizer Page
- Accessible at `/update-tournament` (not publicly linked)
- Secret key authentication (no login UI)
- Quick match score updates
- Add/remove goal scorers
- Create teams, players, and fixtures
- Change match status (upcoming/live/finished)

## 🛠️ Tech Stack

- **Frontend**: React (Vite) + Tailwind CSS
- **Backend**: Node.js + Express
- **Database**: MongoDB Atlas
- **Authentication**: Secret key based (environment variable)
- **Hosting**: Vercel (frontend) + Render (backend)

## 📁 Project Structure

```
tsl-tournament/
├── backend/
│   ├── models/           # MongoDB models
│   ├── routes/           # API routes (public + admin)
│   ├── middleware/       # Authentication middleware
│   ├── utils/            # Standings calculator
│   ├── server.js         # Express server
│   ├── seed.js           # Database seeding script
│   └── package.json
└── frontend/
    ├── src/
    │   ├── components/   # Reusable components
    │   ├── pages/        # Page components
    │   ├── utils/        # API utilities
    │   ├── App.jsx       # Main app with routes
    │   └── main.jsx      # Entry point
    ├── index.html
    └── package.json
```

## 🚀 Local Development Setup

### Prerequisites
- Node.js (v16 or higher)
- MongoDB Atlas account (free tier works)
- Git

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```bash
cp .env.example .env
```

4. Edit `.env` with your credentials:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/tsl-tournament?retryWrites=true&w=majority
PORT=5000
ADMIN_SECRET=your-secret-key-here
NODE_ENV=development
```

5. Seed the database with initial data:
```bash
npm run seed
```

6. Start the backend server:
```bash
npm run dev
```

Backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```bash
cp .env.example .env
```

4. Edit `.env`:
```env
VITE_API_URL=http://localhost:5000/api
```

5. Start the frontend development server:
```bash
npm run dev
```

Frontend will run on `http://localhost:3000`

### Access the Application

- **Public Website**: http://localhost:3000
- **Hidden Admin Page**: http://localhost:3000/update-tournament
  - Use the secret key from your backend `.env` file

## 📊 Database Models

### Team
- name, logo, manager, captain, pool

### Player
- name, teamId, position, jerseyNumber, goals

### Match
- teamA, teamB, scoreA, scoreB, status, matchTime, matchday, goalscorers[]

### Standing
- teamId, played, won, draw, lost, gf, ga, gd, points
- Auto-calculated when matches finish

## 🌐 Deployment

### MongoDB Atlas Setup

1. Create a free MongoDB Atlas account at https://www.mongodb.com/cloud/atlas
2. Create a new cluster (M0 free tier)
3. Create a database user with password
4. Whitelist IP addresses (use 0.0.0.0/0 for all IPs)
5. Get your connection string

### Backend Deployment (Render)

1. Create account at https://render.com
2. Create new Web Service
3. Connect your GitHub repository
4. Configure:
   - **Build Command**: `cd backend && npm install`
   - **Start Command**: `cd backend && npm start`
   - **Environment Variables**:
     - `MONGODB_URI`: Your MongoDB Atlas connection string
     - `ADMIN_SECRET`: Your secret key
     - `NODE_ENV`: production
     - `PORT`: 5000 (Render will override this)

5. Deploy and note your backend URL (e.g., `https://tsl-backend.onrender.com`)

### Frontend Deployment (Vercel)

1. Create account at https://vercel.com
2. Import your GitHub repository
3. Configure:
   - **Framework Preset**: Vite
   - **Root Directory**: frontend
   - **Build Command**: `npm run build`
   - **Output Directory**: dist
   - **Environment Variables**:
     - `VITE_API_URL`: Your Render backend URL + `/api` (e.g., `https://tsl-backend.onrender.com/api`)

4. Deploy

### Post-Deployment

1. Seed your production database:
```bash
# On your local machine, update .env with production MongoDB URI
cd backend
npm run seed
```

2. Access your live site:
   - Public: `https://your-app.vercel.app`
   - Admin: `https://your-app.vercel.app/update-tournament`

## 🎮 Organizer Workflow

### Updating Match Scores

1. Go to `/update-tournament`
2. Enter secret key
3. Navigate to "Matches" tab
4. Select match from dropdown
5. Enter scores and set status (upcoming/live/finished)
6. Click "Update Score"
7. Standings automatically recalculate when status is "finished"

### Adding Goal Scorers

1. In "Matches" tab, scroll to "Add Goal Scorer"
2. Select match
3. Select team
4. Select player
5. Enter minute
6. Click "Add Goal"
7. Player's goal tally automatically increments

### Creating New Fixtures

1. Navigate to "Fixtures" tab
2. Select both teams
3. Enter matchday number
4. Set match date/time
5. Click "Create Fixture"

### Adding Teams and Players

1. Use "Teams" and "Players" tabs
2. Fill in required information
3. Submit forms

## 🔄 Live Updates

The frontend automatically polls the backend every 10 seconds for:
- Match scores and status
- Goal scorers
- Standings updates
- Top scorers leaderboard

No manual refresh needed - updates appear automatically!

## 🎨 Design Features

- Professional sports portal aesthetic
- Light color scheme (#f5f7fa background)
- Primary green (#2ecc71) and secondary blue (#1f4fff)
- Responsive mobile design
- Live match indicators with pulsing dot
- Smooth animations and transitions
- Clean card-based layouts
- Top 4 teams highlighted in green (knockout zone)
- Bottom team highlighted in red (elimination)

## 🔒 Security

- Admin routes protected by secret key in header
- No public admin UI
- Environment variables for sensitive data
- CORS enabled for cross-origin requests

## 📝 API Endpoints

### Public Routes
- `GET /api/teams` - All teams
- `GET /api/teams/:id` - Single team with players
- `GET /api/matches` - All matches
- `GET /api/standings` - Current standings
- `GET /api/players` - All players
- `GET /api/topscorers` - Top goal scorers

### Admin Routes (require x-admin-secret header)
- `POST /api/admin/team` - Create team
- `POST /api/admin/player` - Create player
- `POST /api/admin/match` - Create match
- `PATCH /api/admin/match/score` - Update score
- `POST /api/admin/match/goals` - Add goal scorer
- `DELETE /api/admin/match/goals` - Remove goal scorer
- `POST /api/admin/verify` - Verify admin access

## 🐛 Troubleshooting

### Backend won't start
- Check MongoDB connection string
- Ensure database is accessible
- Verify all environment variables are set

### Frontend can't connect to backend
- Check VITE_API_URL in frontend .env
- Verify backend is running
- Check CORS configuration

### Standings not updating
- Check match status is "finished"
- View backend logs for errors
- Verify recalculateStandings function runs

### Can't access admin page
- Verify you're using correct secret key
- Check browser console for errors
- Ensure backend /api/admin/verify route works

## 📞 Support

For issues or questions, check:
1. Console logs (browser and terminal)
2. Network tab in browser dev tools
3. MongoDB Atlas connection status
4. Environment variable configuration

## 📄 License

This project is created for the Thekkinkad Super League tournament.

---

Built with ⚽ for TSL
