import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getTeams } from '../utils/api';

const Teams = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await getTeams();
        setTeams(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching teams:', error);
        setLoading(false);
      }
    };
    
    fetchTeams();
  }, []);
  
  const getTeamLogo = (teamName) => {
    return teamName.substring(0, 2).toUpperCase();
  };
  
  const poolA = teams.filter(t => t.pool === 'A');
  const poolB = teams.filter(t => t.pool === 'B');
  
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading teams...</p>
        </div>
      </div>
    );
  }
  
  const TeamCard = ({ team }) => (
    <Link
      to={`/teams/${team._id}`}
      className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 p-6 block"
    >
      <div className="flex items-center gap-4 mb-4">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 text-white flex items-center justify-center text-2xl font-bold">
          {getTeamLogo(team.name)}
        </div>
        <div>
          <h3 className="text-xl font-display font-bold text-gray-900">{team.name}</h3>
          <p className="text-sm text-gray-500">Pool {team.pool}</p>
        </div>
      </div>
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-600">Manager:</span>
          <span className="font-semibold text-gray-900">{team.manager}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Captain:</span>
          <span className="font-semibold text-gray-900">{team.captain}</span>
        </div>
      </div>
    </Link>
  );
  
  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-8">
          Teams
        </h1>
        
        {teams.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">No teams available</p>
          </div>
        ) : (
          <div className="space-y-10">
            {/* Pool A */}
            <div>
              <h2 className="text-2xl font-display font-bold text-gray-900 mb-4 pb-2 border-b-2 border-primary inline-block">
                Pool A
              </h2>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mt-6">
                {poolA.map((team) => (
                  <TeamCard key={team._id} team={team} />
                ))}
              </div>
            </div>
            
            {/* Pool B */}
            <div>
              <h2 className="text-2xl font-display font-bold text-gray-900 mb-4 pb-2 border-b-2 border-secondary inline-block">
                Pool B
              </h2>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mt-6">
                {poolB.map((team) => (
                  <TeamCard key={team._id} team={team} />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Teams;
