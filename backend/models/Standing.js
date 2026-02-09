const mongoose = require('mongoose');

const standingSchema = new mongoose.Schema({
  teamId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Team',
    required: true,
    unique: true
  },
  played: {
    type: Number,
    default: 0
  },
  won: {
    type: Number,
    default: 0
  },
  draw: {
    type: Number,
    default: 0
  },
  lost: {
    type: Number,
    default: 0
  },
  gf: {
    type: Number,
    default: 0
  },
  ga: {
    type: Number,
    default: 0
  },
  gd: {
    type: Number,
    default: 0
  },
  points: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Standing', standingSchema);
