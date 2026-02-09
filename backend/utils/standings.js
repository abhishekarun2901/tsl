const Standing = require('../models/Standing');
const Match = require('../models/Match');
const Team = require('../models/Team');

const recalculateStandings = async () => {
  try {
    // Get all teams
    const teams = await Team.find();
    
    // Reset all standings
    await Standing.deleteMany({});
    
    // Initialize standings for each team
    const standingsMap = {};
    for (const team of teams) {
      standingsMap[team._id.toString()] = {
        teamId: team._id,
        played: 0,
        won: 0,
        draw: 0,
        lost: 0,
        gf: 0,
        ga: 0,
        gd: 0,
        points: 0
      };
    }
    
    // Get all finished matches
    const matches = await Match.find({ status: 'finished' });
    
    // Calculate standings from matches
    for (const match of matches) {
      const teamAId = match.teamA.toString();
      const teamBId = match.teamB.toString();
      
      if (!standingsMap[teamAId] || !standingsMap[teamBId]) continue;
      
      // Update played
      standingsMap[teamAId].played++;
      standingsMap[teamBId].played++;
      
      // Update goals
      standingsMap[teamAId].gf += match.scoreA;
      standingsMap[teamAId].ga += match.scoreB;
      standingsMap[teamBId].gf += match.scoreB;
      standingsMap[teamBId].ga += match.scoreA;
      
      // Determine result
      if (match.scoreA > match.scoreB) {
        // Team A wins
        standingsMap[teamAId].won++;
        standingsMap[teamAId].points += 3;
        standingsMap[teamBId].lost++;
      } else if (match.scoreB > match.scoreA) {
        // Team B wins
        standingsMap[teamBId].won++;
        standingsMap[teamBId].points += 3;
        standingsMap[teamAId].lost++;
      } else {
        // Draw
        standingsMap[teamAId].draw++;
        standingsMap[teamBId].draw++;
        standingsMap[teamAId].points++;
        standingsMap[teamBId].points++;
      }
      
      // Calculate goal difference
      standingsMap[teamAId].gd = standingsMap[teamAId].gf - standingsMap[teamAId].ga;
      standingsMap[teamBId].gd = standingsMap[teamBId].gf - standingsMap[teamBId].ga;
    }
    
    // Save all standings
    const standingsArray = Object.values(standingsMap);
    await Standing.insertMany(standingsArray);
    
    return true;
  } catch (error) {
    console.error('Error recalculating standings:', error);
    throw error;
  }
};

module.exports = { recalculateStandings };
