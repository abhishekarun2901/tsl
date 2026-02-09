const mongoose = require('mongoose');

const goalScorerSchema = new mongoose.Schema({
  playerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Player',
    required: true
  },
  teamId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Team',
    required: true
  },
  minute: {
    type: Number,
    required: true
  },
  isOwnGoal: {
    type: Boolean,
    default: false
  }
}, { _id: false });

const matchSchema = new mongoose.Schema({
  teamA: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Team',
    required: true
  },
  teamB: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Team',
    required: true
  },
  scoreA: {
    type: Number,
    default: 0
  },
  scoreB: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    enum: ['upcoming', 'live', 'finished'],
    default: 'upcoming'
  },
  matchTime: {
    type: Date,
    default: Date.now
  },
  matchday: {
    type: Number,
    default: 1
  },
  goalscorers: [goalScorerSchema]
}, {
  timestamps: true
});

module.exports = mongoose.model('Match', matchSchema);
