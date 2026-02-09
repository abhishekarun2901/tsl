# Organizer Guide - Managing TSL Tournament

Complete guide for tournament organizers to manage matches, scores, and updates.

## 🔐 Accessing the Admin Panel

### URL
The admin panel is hidden and not linked anywhere on the public website.

**Direct URL:**
```
https://your-website.com/update-tournament
```

⚠️ **Keep this URL private!** Only share with authorized organizers.

### Login
1. Visit the admin URL
2. Enter your secret key (provided during deployment)
3. Click "Access"
4. Secret key is saved in browser - you'll stay logged in

**Logout:**
Click the red "Logout" button in the top right corner.

## 📊 Dashboard Overview

After logging in, you'll see 4 tabs:
1. **Matches** - Update scores and add goals
2. **Teams** - Create new teams
3. **Players** - Add players to teams
4. **Fixtures** - Schedule new matches

## ⚽ Managing Match Scores

### Step 1: Update Score and Status

1. Click **"Matches"** tab
2. Find **"Update Match Score"** section
3. Select the match from dropdown
4. Enter Score A (home team)
5. Enter Score B (away team)
6. Select status:
   - **Upcoming** - Match hasn't started
   - **Live** - Match is in progress
   - **Finished** - Match has ended
7. Click **"Update Score"**

**Example Workflow:**
```
Before match: Status = "Upcoming", Scores = 0-0
Kickoff: Status = "Live", Scores = 0-0
Goal scored: Status = "Live", Scores = 1-0
Match ends: Status = "Finished", Scores = 2-1
```

⚡ **Important:** When you mark a match as "Finished", the points table automatically recalculates!

### Step 2: Add Goal Scorers

1. In **"Matches"** tab, scroll to **"Add Goal Scorer"**
2. Select the match
3. Select which team scored
4. Select the player who scored
5. Enter the minute (e.g., 23)
6. Click **"Add Goal"**

**Example:**
- Match: Liverpool vs Lazio
- Team: Liverpool FC
- Player: Jeswin
- Minute: 23

Goal will show as: ⚽ Jeswin - 23'

### Step 3: Remove Goal (if mistake)

1. Scroll to **"Matches & Goals"** section
2. Find the match
3. Click **"Remove"** next to the goal
4. Confirm removal

## 🎯 Complete Match Management Example

### Scenario: Liverpool FC vs Lazio

**Pre-Match (Day Before):**
- Match already created in fixtures
- Status: "Upcoming"
- Scores: 0-0

**Kickoff (Match Starts):**
1. Go to "Update Match Score"
2. Select: Liverpool vs Lazio
3. Keep scores: 0-0
4. Change status to: "Live"
5. Click "Update Score"
6. Public website now shows live indicator! 🔴

**23rd Minute - Liverpool Scores:**
1. Scroll to "Add Goal Scorer"
2. Select: Liverpool vs Lazio
3. Team: Liverpool FC
4. Player: Jeswin
5. Minute: 23
6. Click "Add Goal"
7. Go back to "Update Match Score"
8. Update scores: 1-0
9. Status: Live
10. Click "Update Score"

**64th Minute - Liverpool Scores Again:**
1. Add goal scorer: Shihan, 64'
2. Update score: 2-0

**71st Minute - Lazio Scores:**
1. Add goal scorer: Select Lazio team, pick player, minute 71
2. Update score: 2-1

**Full Time (90th Minute):**
1. Final update
2. Scores: 2-1
3. Status: "Finished"
4. Click "Update Score"
5. **Points table automatically updates!**

**Result:**
- Liverpool: +3 points, +1 goal difference
- Lazio: 0 points, -1 goal difference

## 👥 Adding Teams

### When to Use
- Tournament expansion
- New team registration
- Correction needed

### Steps
1. Click **"Teams"** tab
2. Enter team name (e.g., "Real Madrid")
3. Enter manager name
4. Enter captain name
5. Select pool (A or B)
6. Click **"Create Team"**

Team immediately appears in the list below and on the public website.

## 🏃 Adding Players

### Steps
1. Click **"Players"** tab
2. Enter player name
3. Select their team from dropdown
4. Select position (optional):
   - Goalkeeper
   - Defender
   - Midfielder
   - Forward
5. Enter jersey number (optional, 1-99)
6. Click **"Create Player"**

### Bulk Adding Players
Add multiple players one at a time. The form stays on the same team after each submission for convenience.

**Tip:** Add all players for one team before switching to another team.

## 📅 Creating Fixtures

### Steps
1. Click **"Fixtures"** tab
2. Select Team A
3. Select Team B (different from Team A)
4. Enter matchday number (1, 2, 3, etc.)
5. Select match date and time
6. Click **"Create Fixture"**

### Match Date/Time Format
The datetime picker lets you choose:
- Date: Calendar picker
- Time: Clock picker

Example: February 15, 2025, 2:00 PM

### Planning Matchdays

**Matchday 1:**
- Liverpool vs Lazio - Feb 15, 2:00 PM
- Inter Milan vs Fiorentina - Feb 15, 4:00 PM
- Arsenal vs Força - Feb 16, 2:00 PM
- Monaco vs São Paulo - Feb 16, 4:00 PM

**Matchday 2:**
- Liverpool vs Fiorentina - Feb 22, 2:00 PM
- Inter Milan vs Lazio - Feb 22, 4:00 PM
- ... and so on

## 📈 Understanding Points Table

### Automatic Calculation
The points table calculates automatically when you mark a match as "Finished".

**Points System:**
- Win: 3 points
- Draw: 1 point each
- Loss: 0 points

**Sorting Priority:**
1. Points (highest first)
2. Goal Difference (highest first)
3. Goals For (highest first)
4. Head-to-Head (manual tie-breaker if needed)

### What Updates
When you finish a match with score 2-1:
- Winner: +3 points, played +1, won +1, GF +2, GD +1
- Loser: +0 points, played +1, lost +1, GA +2, GD -1

### Visual Indicators (Public Site)
- Top 4: Green highlight (knockout zone)
- Last place: Red highlight (elimination)

## 🔄 Live Update System

### How It Works
The public website automatically checks for updates every 10 seconds.

**What Updates Automatically:**
- Match scores
- Match status (upcoming → live → finished)
- Goal scorers
- Points table
- Top scorers leaderboard

**What Organizers Need to Do:**
Just update in the admin panel - visitors see changes within 10 seconds!

## 📱 Mobile Usage

The admin panel works on mobile but desktop is recommended for easier management.

**Mobile Tips:**
- Use landscape mode for better view
- Tabs scroll horizontally
- Forms are touch-friendly
- All features work on mobile

## ⚠️ Common Mistakes to Avoid

### 1. Forgetting to Change Status
❌ **Wrong:** Update score but leave status as "Upcoming"
✅ **Right:** Update score AND status to "Live" or "Finished"

### 2. Adding Goals Without Updating Score
❌ **Wrong:** Add 3 goal scorers but score shows 0-0
✅ **Right:** Update score to match number of goals

### 3. Wrong Team for Goal Scorer
❌ **Wrong:** Liverpool scores but you select Lazio team
✅ **Right:** Double-check team matches the scorer

### 4. Not Marking Match as Finished
❌ **Wrong:** Match ends but status stays "Live"
✅ **Right:** Change to "Finished" so points table updates

### 5. Duplicate Goal Entries
❌ **Wrong:** Accidentally add same goal twice
✅ **Right:** Check "Matches & Goals" list before adding

## 🛠️ Troubleshooting

### Score Won't Update
- Check you clicked "Update Score" button
- Verify match is selected in dropdown
- Try refreshing the page

### Goal Not Appearing
- Make sure you added goal scorer first
- Then update the score
- Check the "Matches & Goals" section

### Player Not in Dropdown
- Verify player was created for correct team
- Refresh the page
- Check "Players" tab for confirmation

### Points Table Not Changing
- Ensure match status is "Finished"
- Check scores are entered correctly
- Refresh public website after 10 seconds

### Logged Out Unexpectedly
- Browser cleared cookies
- Re-enter secret key
- Consider saving secret key securely

## 💡 Best Practices

### Pre-Match
1. Verify fixture exists
2. Confirm teams and players are correct
3. Status should be "Upcoming"

### During Match
1. Change status to "Live" at kickoff
2. Add goals as they happen
3. Update score immediately after each goal
4. Keep scorers and times accurate

### Post-Match
1. Add any missing goals
2. Verify final score is correct
3. Change status to "Finished"
4. Check points table updated correctly
5. Verify top scorers list is accurate

### Daily Routine
1. Check upcoming fixtures
2. Ensure all previous matches are marked "Finished"
3. Verify points table looks correct
4. Prepare for today's matches

## 🎉 Tips for Success

### Communication
- Share match updates on social media
- Post screenshots of live scores
- Highlight top scorers and table leaders

### Timing
- Update scores in real-time when possible
- If delayed, batch update after match
- Always finish matches same day

### Accuracy
- Double-check player names
- Verify goal minutes
- Confirm scores before marking finished

### Engagement
- Update promptly for viewer excitement
- Use live status during actual matches
- Keep fixture schedule current

## 📞 Getting Help

### If Something Goes Wrong
1. Check this guide
2. Try logging out and back in
3. Refresh the browser
4. Check browser console for errors
5. Contact technical support

### Data Recovery
All data is safely stored in the database. If you make a mistake:
- Wrong score: Just update again
- Wrong goal: Remove and re-add
- Wrong team/player: Contact technical support for database edit

## 🎯 Quick Reference

**Match Day Checklist:**
- [ ] Change match to "Live"
- [ ] Add goals as scored
- [ ] Update score after each goal
- [ ] Change to "Finished" at full time
- [ ] Verify points table updated
- [ ] Check public website displays correctly

**Tournament Setup:**
- [ ] All teams created
- [ ] All players added
- [ ] All fixtures scheduled
- [ ] Test match update
- [ ] Verify admin access works

---

You're ready to manage the TSL tournament! ⚽

Remember: The admin URL is secret - keep it safe and share only with authorized organizers.
