const express = require('express');
const router = express.Router();
const Team = require('../models/Team');
const Player = require('../models/Player');
const Match = require('../models/Match');
const Standing = require('../models/Standing');

// GET all teams
router.get('/teams', async (req, res) => {
  try {
    const teams = await Team.find().sort({ name: 1 });
    res.json(teams);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET single team with players
router.get('/teams/:id', async (req, res) => {
  try {
    const team = await Team.findById(req.params.id);
    if (!team) {
      return res.status(404).json({ error: 'Team not found' });
    }
    const players = await Player.find({ teamId: req.params.id });
    res.json({ team, players });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET all matches
router.get('/matches', async (req, res) => {
  try {
    const matches = await Match.find()
      .populate('teamA teamB')
      .populate({
        path: 'goalscorers.playerId',
        select: 'name'
      })
      .populate({
        path: 'goalscorers.teamId',
        select: 'name'
      })
      .sort({ matchTime: 1 });
    res.json(matches);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET standings
router.get('/standings', async (req, res) => {
  try {
    const standings = await Standing.find()
      .populate('teamId')
      .sort({ points: -1, gd: -1, gf: -1 });
    res.json(standings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET all players
router.get('/players', async (req, res) => {
  try {
    const players = await Player.find().populate('teamId');
    res.json(players);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET top scorers
router.get('/topscorers', async (req, res) => {
  try {
    const topScorers = await Player.find({ goals: { $gt: 0 } })
      .populate('teamId')
      .sort({ goals: -1 })
      .limit(20);
    res.json(topScorers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
