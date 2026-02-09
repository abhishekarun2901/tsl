import { useState, useEffect } from 'react';
import { getMatches } from '../utils/api';
import MatchCard from '../components/MatchCard';

const Fixtures = () => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const fetchMatches = async () => {
    try {
      const response = await getMatches();
      setMatches(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching matches:', error);
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchMatches();
    
    // Poll for updates every 10 seconds
    const interval = setInterval(fetchMatches, 10000);
    
    return () => clearInterval(interval);
  }, []);
  
  // Group matches by matchday
  const groupedMatches = matches.reduce((acc, match) => {
    const matchday = match.matchday || 1;
    if (!acc[matchday]) {
      acc[matchday] = [];
    }
    acc[matchday].push(match);
    return acc;
  }, {});
  
  const sortedMatchdays = Object.keys(groupedMatches).sort((a, b) => Number(a) - Number(b));
  
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading fixtures...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-8">
          All Fixtures
        </h1>
        
        {sortedMatchdays.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">No fixtures available</p>
          </div>
        ) : (
          <div className="space-y-10">
            {sortedMatchdays.map((matchday) => (
              <div key={matchday}>
                <h2 className="text-2xl font-display font-bold text-gray-900 mb-4 pb-2 border-b-2 border-primary inline-block">
                  Matchday {matchday}
                </h2>
                <div className="grid gap-4 md:grid-cols-2 mt-6">
                  {groupedMatches[matchday].map((match) => (
                    <MatchCard key={match._id} match={match} showDate />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Fixtures;
