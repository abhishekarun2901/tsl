import { useState, useEffect } from 'react';
import {
  setAdminSecret,
  verifyAdmin,
  getTeams,
  getPlayers,
  getMatches,
  createTeam,
  createPlayer,
  createMatch,
  updateMatchScore,
  addGoalScorer,
  removeGoalScorer
} from '../utils/api';

const UpdateTournament = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [secretKey, setSecretKey] = useState('');
  const [error, setError] = useState('');
  
  const [teams, setTeams] = useState([]);
  const [players, setPlayers] = useState([]);
  const [matches, setMatches] = useState([]);
  
  const [activeTab, setActiveTab] = useState('matches');
  
  // Form states
  const [teamForm, setTeamForm] = useState({ name: '', manager: '', captain: '', pool: 'A' });
  const [playerForm, setPlayerForm] = useState({ name: '', teamId: '', position: '', jerseyNumber: '' });
  const [matchForm, setMatchForm] = useState({ teamA: '', teamB: '', matchday: 1, matchTime: '' });
  const [scoreForm, setScoreForm] = useState({ matchId: '', scoreA: 0, scoreB: 0, status: 'upcoming' });
  const [goalForm, setGoalForm] = useState({ matchId: '', playerId: '', teamId: '', minute: '' });
  
  const handleAuth = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      setAdminSecret(secretKey);
      await verifyAdmin();
      setIsAuthenticated(true);
      localStorage.setItem('tsl_admin_key', secretKey);
      fetchData();
    } catch (err) {
      setError('Invalid secret key');
      setSecretKey('');
    }
  };
  
  const fetchData = async () => {
    try {
      const [teamsRes, playersRes, matchesRes] = await Promise.all([
        getTeams(),
        getPlayers(),
        getMatches()
      ]);
      setTeams(teamsRes.data);
      setPlayers(playersRes.data);
      setMatches(matchesRes.data);
    } catch (err) {
      console.error('Error fetching data:', err);
    }
  };
  
  useEffect(() => {
    const savedKey = localStorage.getItem('tsl_admin_key');
    if (savedKey) {
      setSecretKey(savedKey);
      setAdminSecret(savedKey);
      verifyAdmin()
        .then(() => {
          setIsAuthenticated(true);
          fetchData();
        })
        .catch(() => {
          localStorage.removeItem('tsl_admin_key');
        });
    }
  }, []);
  
  const handleCreateTeam = async (e) => {
    e.preventDefault();
    try {
      await createTeam(teamForm);
      setTeamForm({ name: '', manager: '', captain: '', pool: 'A' });
      fetchData();
      alert('Team created successfully!');
    } catch (err) {
      alert('Error creating team: ' + err.response?.data?.error || err.message);
    }
  };
  
  const handleCreatePlayer = async (e) => {
    e.preventDefault();
    try {
      await createPlayer({
        ...playerForm,
        jerseyNumber: playerForm.jerseyNumber ? Number(playerForm.jerseyNumber) : null
      });
      setPlayerForm({ name: '', teamId: '', position: '', jerseyNumber: '' });
      fetchData();
      alert('Player created successfully!');
    } catch (err) {
      alert('Error creating player: ' + err.response?.data?.error || err.message);
    }
  };
  
  const handleCreateMatch = async (e) => {
    e.preventDefault();
    try {
      await createMatch({
        ...matchForm,
        matchday: Number(matchForm.matchday)
      });
      setMatchForm({ teamA: '', teamB: '', matchday: 1, matchTime: '' });
      fetchData();
      alert('Match created successfully!');
    } catch (err) {
      alert('Error creating match: ' + err.response?.data?.error || err.message);
    }
  };
  
  const handleUpdateScore = async (e) => {
    e.preventDefault();
    try {
      await updateMatchScore({
        matchId: scoreForm.matchId,
        scoreA: Number(scoreForm.scoreA),
        scoreB: Number(scoreForm.scoreB),
        status: scoreForm.status
      });
      fetchData();
      alert('Score updated successfully!');
    } catch (err) {
      alert('Error updating score: ' + err.response?.data?.error || err.message);
    }
  };
  
  const handleAddGoal = async (e) => {
    e.preventDefault();
    try {
      await addGoalScorer({
        matchId: goalForm.matchId,
        playerId: goalForm.playerId,
        teamId: goalForm.teamId,
        minute: Number(goalForm.minute)
      });
      setGoalForm({ matchId: '', playerId: '', teamId: '', minute: '' });
      fetchData();
      alert('Goal added successfully!');
    } catch (err) {
      alert('Error adding goal: ' + err.response?.data?.error || err.message);
    }
  };
  
  const handleRemoveGoal = async (matchId, goalIndex) => {
    if (!confirm('Remove this goal?')) return;
    try {
      await removeGoalScorer({ matchId, goalIndex });
      fetchData();
    } catch (err) {
      alert('Error removing goal: ' + err.response?.data?.error || err.message);
    }
  };
  
  const handleLogout = () => {
    setIsAuthenticated(false);
    setSecretKey('');
    localStorage.removeItem('tsl_admin_key');
  };
  
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
          <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">
            🔒 Tournament Updates
          </h1>
          <form onSubmit={handleAuth}>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Secret Key
            </label>
            <input
              type="password"
              value={secretKey}
              onChange={(e) => setSecretKey(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              required
              autoFocus
            />
            {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
            <button
              type="submit"
              className="w-full mt-4 bg-primary hover:bg-green-600 text-white font-semibold py-2 rounded-lg transition-colors"
            >
              Access
            </button>
          </form>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-900">Tournament Management</h1>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
        
        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-lg mb-6">
          <div className="flex border-b overflow-x-auto">
            {['matches', 'teams', 'players', 'fixtures'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 font-semibold capitalize whitespace-nowrap ${
                  activeTab === tab
                    ? 'border-b-2 border-primary text-primary'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
        
        {/* Match Updates Tab */}
        {activeTab === 'matches' && (
          <div className="space-y-6">
            {/* Update Score */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-bold mb-4">Update Match Score</h2>
              <form onSubmit={handleUpdateScore} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Match</label>
                  <select
                    value={scoreForm.matchId}
                    onChange={(e) => setScoreForm({ ...scoreForm, matchId: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg"
                    required
                  >
                    <option value="">Select match</option>
                    {matches.map((match) => (
                      <option key={match._id} value={match._id}>
                        {match.teamA?.name} vs {match.teamB?.name} - {match.status}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Score A</label>
                    <input
                      type="number"
                      min="0"
                      value={scoreForm.scoreA}
                      onChange={(e) => setScoreForm({ ...scoreForm, scoreA: e.target.value })}
                      className="w-full px-3 py-2 border rounded-lg"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Score B</label>
                    <input
                      type="number"
                      min="0"
                      value={scoreForm.scoreB}
                      onChange={(e) => setScoreForm({ ...scoreForm, scoreB: e.target.value })}
                      className="w-full px-3 py-2 border rounded-lg"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Status</label>
                    <select
                      value={scoreForm.status}
                      onChange={(e) => setScoreForm({ ...scoreForm, status: e.target.value })}
                      className="w-full px-3 py-2 border rounded-lg"
                    >
                      <option value="upcoming">Upcoming</option>
                      <option value="live">Live</option>
                      <option value="finished">Finished</option>
                    </select>
                  </div>
                </div>
                <button type="submit" className="btn-primary w-full">
                  Update Score
                </button>
              </form>
            </div>
            
            {/* Add Goal Scorer */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-bold mb-4">Add Goal Scorer</h2>
              <form onSubmit={handleAddGoal} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Match</label>
                  <select
                    value={goalForm.matchId}
                    onChange={(e) => {
                      const match = matches.find(m => m._id === e.target.value);
                      setGoalForm({ ...goalForm, matchId: e.target.value, teamId: match?.teamA._id || '' });
                    }}
                    className="w-full px-3 py-2 border rounded-lg"
                    required
                  >
                    <option value="">Select match</option>
                    {matches.filter(m => m.status !== 'upcoming').map((match) => (
                      <option key={match._id} value={match._id}>
                        {match.teamA?.name} {match.scoreA} - {match.scoreB} {match.teamB?.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Team</label>
                  <select
                    value={goalForm.teamId}
                    onChange={(e) => setGoalForm({ ...goalForm, teamId: e.target.value, playerId: '' })}
                    className="w-full px-3 py-2 border rounded-lg"
                    required
                  >
                    <option value="">Select team</option>
                    {goalForm.matchId && (() => {
                      const match = matches.find(m => m._id === goalForm.matchId);
                      return match ? [
                        <option key={match.teamA._id} value={match.teamA._id}>{match.teamA.name}</option>,
                        <option key={match.teamB._id} value={match.teamB._id}>{match.teamB.name}</option>
                      ] : null;
                    })()}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Player</label>
                  <select
                    value={goalForm.playerId}
                    onChange={(e) => setGoalForm({ ...goalForm, playerId: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg"
                    required
                  >
                    <option value="">Select player</option>
                    {players.filter(p => p.teamId._id === goalForm.teamId).map((player) => (
                      <option key={player._id} value={player._id}>{player.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Minute</label>
                  <input
                    type="number"
                    min="1"
                    max="120"
                    value={goalForm.minute}
                    onChange={(e) => setGoalForm({ ...goalForm, minute: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg"
                    required
                  />
                </div>
                <button type="submit" className="btn-primary w-full">
                  Add Goal
                </button>
              </form>
            </div>
            
            {/* Match List with Goals */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-bold mb-4">Matches & Goals</h2>
              <div className="space-y-4">
                {matches.map((match) => (
                  <div key={match._id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold">
                        {match.teamA?.name} {match.scoreA} - {match.scoreB} {match.teamB?.name}
                      </span>
                      <span className="text-sm text-gray-500">{match.status}</span>
                    </div>
                    {match.goalscorers?.length > 0 && (
                      <div className="space-y-1 pl-4">
                        {match.goalscorers.map((goal, idx) => (
                          <div key={idx} className="flex justify-between items-center text-sm">
                            <span>⚽ {goal.playerId?.name} ({goal.minute}')</span>
                            <button
                              onClick={() => handleRemoveGoal(match._id, idx)}
                              className="text-red-600 hover:text-red-800 text-xs"
                            >
                              Remove
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        
        {/* Teams Tab */}
        {activeTab === 'teams' && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold mb-4">Create Team</h2>
            <form onSubmit={handleCreateTeam} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Team Name</label>
                <input
                  type="text"
                  value={teamForm.name}
                  onChange={(e) => setTeamForm({ ...teamForm, name: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Manager</label>
                <input
                  type="text"
                  value={teamForm.manager}
                  onChange={(e) => setTeamForm({ ...teamForm, manager: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Captain</label>
                <input
                  type="text"
                  value={teamForm.captain}
                  onChange={(e) => setTeamForm({ ...teamForm, captain: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Pool</label>
                <select
                  value={teamForm.pool}
                  onChange={(e) => setTeamForm({ ...teamForm, pool: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg"
                >
                  <option value="A">Pool A</option>
                  <option value="B">Pool B</option>
                </select>
              </div>
              <button type="submit" className="btn-primary w-full">
                Create Team
              </button>
            </form>
            
            <div className="mt-6">
              <h3 className="font-bold mb-2">Teams ({teams.length})</h3>
              <div className="space-y-2">
                {teams.map((team) => (
                  <div key={team._id} className="p-2 bg-gray-50 rounded">
                    {team.name} - Pool {team.pool}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        
        {/* Players Tab */}
        {activeTab === 'players' && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold mb-4">Create Player</h2>
            <form onSubmit={handleCreatePlayer} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Player Name</label>
                <input
                  type="text"
                  value={playerForm.name}
                  onChange={(e) => setPlayerForm({ ...playerForm, name: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Team</label>
                <select
                  value={playerForm.teamId}
                  onChange={(e) => setPlayerForm({ ...playerForm, teamId: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg"
                  required
                >
                  <option value="">Select team</option>
                  {teams.map((team) => (
                    <option key={team._id} value={team._id}>{team.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Position</label>
                <select
                  value={playerForm.position}
                  onChange={(e) => setPlayerForm({ ...playerForm, position: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg"
                >
                  <option value="">Select position</option>
                  <option value="Goalkeeper">Goalkeeper</option>
                  <option value="Defender">Defender</option>
                  <option value="Midfielder">Midfielder</option>
                  <option value="Forward">Forward</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Jersey Number (optional)</label>
                <input
                  type="number"
                  min="1"
                  max="99"
                  value={playerForm.jerseyNumber}
                  onChange={(e) => setPlayerForm({ ...playerForm, jerseyNumber: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
              <button type="submit" className="btn-primary w-full">
                Create Player
              </button>
            </form>
          </div>
        )}
        
        {/* Fixtures Tab */}
        {activeTab === 'fixtures' && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold mb-4">Create Fixture</h2>
            <form onSubmit={handleCreateMatch} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Team A</label>
                <select
                  value={matchForm.teamA}
                  onChange={(e) => setMatchForm({ ...matchForm, teamA: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg"
                  required
                >
                  <option value="">Select team</option>
                  {teams.map((team) => (
                    <option key={team._id} value={team._id}>{team.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Team B</label>
                <select
                  value={matchForm.teamB}
                  onChange={(e) => setMatchForm({ ...matchForm, teamB: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg"
                  required
                >
                  <option value="">Select team</option>
                  {teams.filter(t => t._id !== matchForm.teamA).map((team) => (
                    <option key={team._id} value={team._id}>{team.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Matchday</label>
                <input
                  type="number"
                  min="1"
                  value={matchForm.matchday}
                  onChange={(e) => setMatchForm({ ...matchForm, matchday: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Match Time</label>
                <input
                  type="datetime-local"
                  value={matchForm.matchTime}
                  onChange={(e) => setMatchForm({ ...matchForm, matchTime: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg"
                  required
                />
              </div>
              <button type="submit" className="btn-primary w-full">
                Create Fixture
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default UpdateTournament;
