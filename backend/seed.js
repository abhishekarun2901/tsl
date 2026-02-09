require('dotenv').config();
const mongoose = require('mongoose');
const Team = require('./models/Team');
const Player = require('./models/Player');
const Match = require('./models/Match');
const Standing = require('./models/Standing');

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    await Team.deleteMany({});
    await Player.deleteMany({});
    await Match.deleteMany({});
    await Standing.deleteMany({});
    console.log('🗑️  Cleared existing data');

    // Create teams
    const teamsData = [
      // Pool A
      { name: 'Liverpool FC', manager: 'Amal Sidhan', captain: 'Afreen', pool: 'A' },
      { name: 'Inter Milan', manager: 'Sarang', captain: 'Harisankar', pool: 'A' },
      { name: 'Fiorentina', manager: 'Abdul Majeed', captain: 'Habeen', pool: 'A' },
      { name: 'Lazio', manager: 'Sanin', captain: 'Dhayanand', pool: 'A' },
      // Pool B
      { name: 'Arsenal', manager: 'Jithin B', captain: 'Amal', pool: 'B' },
      { name: 'Força FC', manager: 'Arun Vellodan', captain: 'Arun Prakash', pool: 'B' },
      { name: 'São Paulo FC', manager: 'Akash', captain: 'Sriram', pool: 'B' },
      { name: 'AS Monaco', manager: 'Shyam', captain: 'Vishnu', pool: 'B' }
    ];

    const teams = await Team.insertMany(teamsData);
    console.log('✅ Teams created');

    // Create standings for all teams
    const standingsData = teams.map(team => ({ teamId: team._id }));
    await Standing.insertMany(standingsData);
    console.log('✅ Standings initialized');

    // Helper function to find team by name
    const findTeam = (name) => teams.find(t => t.name === name);

    // Create players
    const playersData = [
      // Liverpool FC
      { name: 'Karthik Krishna U', teamId: findTeam('Liverpool FC')._id, position: 'Goalkeeper' },
      { name: 'Aswin Raj K', teamId: findTeam('Liverpool FC')._id, position: 'Defender' },
      { name: 'Adhithyan Ramesh', teamId: findTeam('Liverpool FC')._id, position: 'Defender' },
      { name: 'Ben Jude Tharsiuse', teamId: findTeam('Liverpool FC')._id, position: 'Midfielder' },
      { name: 'Shihan', teamId: findTeam('Liverpool FC')._id, position: 'Midfielder' },
      { name: 'Muhammad Rashid', teamId: findTeam('Liverpool FC')._id, position: 'Midfielder' },
      { name: 'Jeswin', teamId: findTeam('Liverpool FC')._id, position: 'Forward' },
      
      // Inter Milan
      { name: 'Vishnu S', teamId: findTeam('Inter Milan')._id, position: '' },
      { name: 'Rejith R', teamId: findTeam('Inter Milan')._id, position: '' },
      { name: 'Sanjay S', teamId: findTeam('Inter Milan')._id, position: '' },
      { name: 'Anandhu', teamId: findTeam('Inter Milan')._id, position: '' },
      { name: 'Muhamed Ziyan', teamId: findTeam('Inter Milan')._id, position: '' },
      { name: 'Niranjan Ravi', teamId: findTeam('Inter Milan')._id, position: '' },
      { name: 'Muhammed Anas', teamId: findTeam('Inter Milan')._id, position: '' },
      
      // Fiorentina
      { name: 'S Amrudhesh', teamId: findTeam('Fiorentina')._id, position: '' },
      { name: 'Adithyan VP', teamId: findTeam('Fiorentina')._id, position: '' },
      { name: 'Sidharth M Pillai', teamId: findTeam('Fiorentina')._id, position: '' },
      { name: 'Harinandan', teamId: findTeam('Fiorentina')._id, position: '' },
      { name: 'Sanjay A S', teamId: findTeam('Fiorentina')._id, position: '' },
      { name: 'Sebil Anto T', teamId: findTeam('Fiorentina')._id, position: '' },
      { name: 'Harikrishna R', teamId: findTeam('Fiorentina')._id, position: '' },
      
      // Lazio
      { name: 'Niranjan', teamId: findTeam('Lazio')._id, position: '' },
      { name: 'Rajeeb', teamId: findTeam('Lazio')._id, position: '' },
      { name: 'Akash Vijayan', teamId: findTeam('Lazio')._id, position: '' },
      { name: 'Adith Krishna', teamId: findTeam('Lazio')._id, position: '' },
      { name: 'Anand Krishna', teamId: findTeam('Lazio')._id, position: '' },
      { name: 'Amith Aravind', teamId: findTeam('Lazio')._id, position: '' },
      { name: 'Sreeraj', teamId: findTeam('Lazio')._id, position: '' },
      
      // Arsenal
      { name: 'Sreekuttan', teamId: findTeam('Arsenal')._id, position: '' },
      { name: 'Rameel', teamId: findTeam('Arsenal')._id, position: '' },
      { name: 'Darren Thomas', teamId: findTeam('Arsenal')._id, position: '' },
      { name: 'Jasir Abid', teamId: findTeam('Arsenal')._id, position: '' },
      { name: 'Amal Sugathan', teamId: findTeam('Arsenal')._id, position: '' },
      { name: 'Shamil A', teamId: findTeam('Arsenal')._id, position: '' },
      { name: 'Christo', teamId: findTeam('Arsenal')._id, position: '' },
      
      // Força FC
      { name: 'Abhishek MS', teamId: findTeam('Força FC')._id, position: '' },
      { name: 'Nayanjith', teamId: findTeam('Força FC')._id, position: '' },
      { name: 'Chithu', teamId: findTeam('Força FC')._id, position: '' },
      { name: 'Abhinand C', teamId: findTeam('Força FC')._id, position: '' },
      { name: 'Noel Tom Santhosh', teamId: findTeam('Força FC')._id, position: '' },
      { name: 'Sabari R Nadh', teamId: findTeam('Força FC')._id, position: '' },
      { name: 'Harikrishnan A', teamId: findTeam('Força FC')._id, position: '' },
      
      // São Paulo FC
      { name: 'Abhishek M Pillai', teamId: findTeam('São Paulo FC')._id, position: '' },
      { name: 'Ahammed Najjad', teamId: findTeam('São Paulo FC')._id, position: '' },
      { name: 'Anand', teamId: findTeam('São Paulo FC')._id, position: '' },
      { name: 'Rishikesh Unnikrishnan', teamId: findTeam('São Paulo FC')._id, position: '' },
      { name: 'K Vishnu', teamId: findTeam('São Paulo FC')._id, position: '' },
      { name: 'Abhinav R', teamId: findTeam('São Paulo FC')._id, position: '' },
      { name: 'Anfas Anwar', teamId: findTeam('São Paulo FC')._id, position: '' },
      
      // AS Monaco
      { name: 'Abay P', teamId: findTeam('AS Monaco')._id, position: '' },
      { name: 'Viswajith K B', teamId: findTeam('AS Monaco')._id, position: '' },
      { name: 'Mashur Pul', teamId: findTeam('AS Monaco')._id, position: '' },
      { name: 'Sreejith', teamId: findTeam('AS Monaco')._id, position: '' },
      { name: 'Arshak Ali', teamId: findTeam('AS Monaco')._id, position: '' },
      { name: 'Anshad A', teamId: findTeam('AS Monaco')._id, position: '' },
      { name: 'Sujin S', teamId: findTeam('AS Monaco')._id, position: '' }
    ];

    await Player.insertMany(playersData);
    console.log('✅ Players created');

    // Create fixtures
    const fixturesData = [
      { teamA: findTeam('Liverpool FC')._id, teamB: findTeam('Lazio')._id, matchday: 1, matchTime: new Date('2025-02-15T14:00:00') },
      { teamA: findTeam('Inter Milan')._id, teamB: findTeam('Fiorentina')._id, matchday: 1, matchTime: new Date('2025-02-15T16:00:00') },
      { teamA: findTeam('Arsenal')._id, teamB: findTeam('Força FC')._id, matchday: 1, matchTime: new Date('2025-02-16T14:00:00') },
      { teamA: findTeam('AS Monaco')._id, teamB: findTeam('São Paulo FC')._id, matchday: 1, matchTime: new Date('2025-02-16T16:00:00') },
      { teamA: findTeam('Liverpool FC')._id, teamB: findTeam('Fiorentina')._id, matchday: 2, matchTime: new Date('2025-02-22T14:00:00') },
      { teamA: findTeam('Inter Milan')._id, teamB: findTeam('Lazio')._id, matchday: 2, matchTime: new Date('2025-02-22T16:00:00') },
      { teamA: findTeam('Arsenal')._id, teamB: findTeam('São Paulo FC')._id, matchday: 2, matchTime: new Date('2025-02-23T14:00:00') },
      { teamA: findTeam('Força FC')._id, teamB: findTeam('AS Monaco')._id, matchday: 2, matchTime: new Date('2025-02-23T16:00:00') },
      { teamA: findTeam('Liverpool FC')._id, teamB: findTeam('Inter Milan')._id, matchday: 3, matchTime: new Date('2025-03-01T14:00:00') }
    ];

    await Match.insertMany(fixturesData);
    console.log('✅ Fixtures created');

    console.log('\n🎉 Database seeded successfully!');
    console.log(`📊 Teams: ${teams.length}`);
    console.log(`👥 Players: ${playersData.length}`);
    console.log(`⚽ Fixtures: ${fixturesData.length}`);

    await mongoose.disconnect();
    console.log('✅ Disconnected from MongoDB');
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
