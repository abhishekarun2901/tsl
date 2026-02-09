import { useState, useEffect } from 'react';
import { getTopScorers } from '../utils/api';

const TopScorers = () => {
  const [topScorers, setTopScorers] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const fetchTopScorers = async () => {
    try {
      const response = await getTopScorers();
      setTopScorers(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching top scorers:', error);
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchTopScorers();
    
    // Poll for updates every 10 seconds
    const interval = setInterval(fetchTopScorers, 10000);
    
    return () => clearInterval(interval);
  }, []);
  
  const getMedalColor = (index) => {
    if (index === 0) return 'from-yellow-400 to-yellow-600';
    if (index === 1) return 'from-gray-300 to-gray-400';
    if (index === 2) return 'from-orange-400 to-orange-600';
    return 'from-gray-200 to-gray-300';
  };
  
  const getMedalEmoji = (index) => {
    if (index === 0) return '🥇';
    if (index === 1) return '🥈';
    if (index === 2) return '🥉';
    return '';
  };
  
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading top scorers...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen py-8">
      <div className="max-w-5xl mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-8">
          Top Scorers
        </h1>
        
        {topScorers.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">No goals scored yet</p>
          </div>
        ) : (
          <div className="space-y-4">
            {topScorers.map((player, index) => (
              <div
                key={player._id}
                className={`bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 p-6 ${
                  index < 3 ? 'border-2 border-primary' : ''
                }`}
              >
                <div className="flex items-center gap-4">
                  {/* Rank */}
                  <div className="flex-shrink-0">
                    {index < 3 ? (
                      <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${getMedalColor(index)} flex items-center justify-center text-3xl`}>
                        {getMedalEmoji(index)}
                      </div>
                    ) : (
                      <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
                        <span className="text-2xl font-bold text-gray-700">#{index + 1}</span>
                      </div>
                    )}
                  </div>
                  
                  {/* Player Info */}
                  <div className="flex-grow">
                    <h3 className="text-xl font-display font-bold text-gray-900">
                      {player.name}
                    </h3>
                    <p className="text-gray-600">{player.teamId?.name}</p>
                    {player.position && (
                      <p className="text-sm text-gray-500">{player.position}</p>
                    )}
                  </div>
                  
                  {/* Goals */}
                  <div className="text-right">
                    <div className="text-4xl font-bold text-primary">
                      {player.goals}
                    </div>
                    <p className="text-sm text-gray-500">
                      {player.goals === 1 ? 'goal' : 'goals'}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {/* Golden Boot Info */}
        {topScorers.length > 0 && (
          <div className="mt-8 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg p-6 border-2 border-yellow-300">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-3xl">👞</span>
              <h3 className="text-xl font-display font-bold text-gray-900">Golden Boot Race</h3>
            </div>
            <p className="text-gray-600">
              {topScorers[0].name} is currently leading the race with {topScorers[0].goals} {topScorers[0].goals === 1 ? 'goal' : 'goals'}!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TopScorers;
