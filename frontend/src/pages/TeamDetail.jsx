import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getTeam } from '../utils/api';

const TeamDetail = () => {
  const { id } = useParams();
  const [team, setTeam] = useState(null);
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const response = await getTeam(id);
        setTeam(response.data.team);
        setPlayers(response.data.players);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching team:', error);
        setLoading(false);
      }
    };
    
    fetchTeam();
  }, [id]);
  
  const getTeamLogo = (teamName) => {
    return teamName.substring(0, 2).toUpperCase();
  };
  
  const groupedPlayers = {
    Goalkeeper: players.filter(p => p.position === 'Goalkeeper'),
    Defender: players.filter(p => p.position === 'Defender'),
    Midfielder: players.filter(p => p.position === 'Midfielder'),
    Forward: players.filter(p => p.position === 'Forward'),
    Other: players.filter(p => !p.position || p.position === '')
  };
  
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading team...</p>
        </div>
      </div>
    );
  }
  
  if (!team) {
    return (
      <div className="min-h-screen py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-500 text-lg">Team not found</p>
          <Link to="/teams" className="text-primary hover:underline mt-4 inline-block">
            Back to Teams
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4">
        <Link to="/teams" className="text-primary hover:text-green-600 font-semibold mb-6 inline-block">
          ← Back to Teams
        </Link>
        
        {/* Team Header */}
        <div className="bg-gradient-to-r from-primary to-green-600 rounded-lg shadow-lg p-8 md:p-12 text-white mb-8">
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 rounded-full bg-white text-primary flex items-center justify-center text-4xl font-bold">
              {getTeamLogo(team.name)}
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-display font-bold mb-2">
                {team.name}
              </h1>
              <p className="text-xl opacity-90">Pool {team.pool}</p>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 mt-8">
            <div>
              <p className="text-sm opacity-75 mb-1">Manager</p>
              <p className="text-xl font-semibold">{team.manager}</p>
            </div>
            <div>
              <p className="text-sm opacity-75 mb-1">Captain</p>
              <p className="text-xl font-semibold">{team.captain}</p>
            </div>
          </div>
        </div>
        
        {/* Squad */}
        <div>
          <h2 className="text-3xl font-display font-bold text-gray-900 mb-6">Squad</h2>
          
          {players.length === 0 ? (
            <p className="text-gray-500">No players registered yet</p>
          ) : (
            <div className="space-y-8">
              {Object.entries(groupedPlayers).map(([position, positionPlayers]) => {
                if (positionPlayers.length === 0) return null;
                
                return (
                  <div key={position}>
                    <h3 className="text-xl font-display font-bold text-gray-700 mb-4">
                      {position === 'Other' ? 'Players' : `${position}s`}
                    </h3>
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                      {positionPlayers.map((player) => (
                        <div
                          key={player._id}
                          className="bg-white rounded-lg shadow-md p-4 flex items-center justify-between"
                        >
                          <div>
                            <p className="font-semibold text-gray-900">{player.name}</p>
                            {player.position && (
                              <p className="text-sm text-gray-500">{player.position}</p>
                            )}
                          </div>
                          <div className="text-right">
                            {player.jerseyNumber && (
                              <span className="text-2xl font-bold text-primary">
                                #{player.jerseyNumber}
                              </span>
                            )}
                            {player.goals > 0 && (
                              <p className="text-xs text-gray-500 mt-1">
                                ⚽ {player.goals} {player.goals === 1 ? 'goal' : 'goals'}
                              </p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TeamDetail;
