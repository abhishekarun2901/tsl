const express = require('express');
const router = express.Router();
const Team = require('../models/Team');
const Player = require('../models/Player');
const Match = require('../models/Match');
const Standing = require('../models/Standing');
const authMiddleware = require('../middleware/auth');
const { recalculateStandings } = require('../utils/standings');

// Apply auth middleware to all routes
router.use(authMiddleware);

// POST - Create team
router.post('/team', async (req, res) => {
  try {
    const team = new Team(req.body);
    await team.save();
    
    // Create standing entry
    const standing = new Standing({ teamId: team._id });
    await standing.save();
    
    res.status(201).json(team);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// POST - Create player
router.post('/player', async (req, res) => {
  try {
    const player = new Player(req.body);
    await player.save();
    res.status(201).json(player);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// POST - Create match
router.post('/match', async (req, res) => {
  try {
    const match = new Match(req.body);
    await match.save();
    res.status(201).json(match);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// PATCH - Update match score and status
router.patch('/match/score', async (req, res) => {
  try {
    const { matchId, scoreA, scoreB, status } = req.body;
    
    const match = await Match.findById(matchId);
    if (!match) {
      return res.status(404).json({ error: 'Match not found' });
    }
    
    match.scoreA = scoreA !== undefined ? scoreA : match.scoreA;
    match.scoreB = scoreB !== undefined ? scoreB : match.scoreB;
    match.status = status || match.status;
    
    await match.save();
    
    // Recalculate standings if match is finished
    if (match.status === 'finished') {
      await recalculateStandings();
    }
    
    const updatedMatch = await Match.findById(matchId)
      .populate('teamA teamB')
      .populate({
        path: 'goalscorers.playerId',
        select: 'name'
      })
      .populate({
        path: 'goalscorers.teamId',
        select: 'name'
      });
    
    res.json(updatedMatch);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// POST - Add goal scorer
router.post('/match/goals', async (req, res) => {
  try {
    const { matchId, playerId, teamId, minute, isOwnGoal } = req.body;
    
    const match = await Match.findById(matchId);
    if (!match) {
      return res.status(404).json({ error: 'Match not found' });
    }
    
    // Add goal scorer
    match.goalscorers.push({
      playerId,
      teamId,
      minute,
      isOwnGoal: isOwnGoal || false
    });
    
    // Update player's goal count
    const player = await Player.findById(playerId);
    if (player && !isOwnGoal) {
      player.goals += 1;
      await player.save();
    }
    
    await match.save();
    
    const updatedMatch = await Match.findById(matchId)
      .populate('teamA teamB')
      .populate({
        path: 'goalscorers.playerId',
        select: 'name'
      })
      .populate({
        path: 'goalscorers.teamId',
        select: 'name'
      });
    
    res.json(updatedMatch);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE - Remove goal scorer
router.delete('/match/goals', async (req, res) => {
  try {
    const { matchId, goalIndex } = req.body;
    
    const match = await Match.findById(matchId);
    if (!match) {
      return res.status(404).json({ error: 'Match not found' });
    }
    
    if (goalIndex < 0 || goalIndex >= match.goalscorers.length) {
      return res.status(400).json({ error: 'Invalid goal index' });
    }
    
    const removedGoal = match.goalscorers[goalIndex];
    
    // Update player's goal count
    if (!removedGoal.isOwnGoal) {
      const player = await Player.findById(removedGoal.playerId);
      if (player && player.goals > 0) {
        player.goals -= 1;
        await player.save();
      }
    }
    
    match.goalscorers.splice(goalIndex, 1);
    await match.save();
    
    const updatedMatch = await Match.findById(matchId)
      .populate('teamA teamB')
      .populate({
        path: 'goalscorers.playerId',
        select: 'name'
      })
      .populate({
        path: 'goalscorers.teamId',
        select: 'name'
      });
    
    res.json(updatedMatch);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// POST - Verify admin secret
router.post('/verify', async (req, res) => {
  res.json({ success: true, message: 'Authorized' });
});

module.exports = router;
