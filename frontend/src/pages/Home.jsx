import { useState, useEffect } from 'react';
import { getMatches } from '../utils/api';
import MatchCard from '../components/MatchCard';

const Home = () => {
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
  
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  
  const liveMatches = matches.filter(m => m.status === 'live');
  const todayMatches = matches.filter(m => {
    const matchDate = new Date(m.matchTime);
    return matchDate >= today && matchDate < tomorrow && m.status === 'upcoming';
  });
  const upcomingMatches = matches.filter(m => {
    const matchDate = new Date(m.matchTime);
    return matchDate >= tomorrow && m.status === 'upcoming';
  }).slice(0, 4);
  const finishedMatches = matches.filter(m => m.status === 'finished').reverse().slice(0, 3);
  
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary to-green-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-display font-bold mb-4">
            Thekkinkad Super League
          </h1>
          <p className="text-xl md:text-2xl font-medium opacity-90">
            The Premier Football Tournament
          </p>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Live Matches */}
        {liveMatches.length > 0 && (
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <h2 className="text-3xl font-display font-bold text-gray-900">Live Now</h2>
              <div className="live-dot"></div>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {liveMatches.map((match) => (
                <MatchCard key={match._id} match={match} />
              ))}
            </div>
          </section>
        )}
        
        {/* Today's Matches */}
        {todayMatches.length > 0 && (
          <section className="mb-12">
            <h2 className="text-3xl font-display font-bold text-gray-900 mb-6">Today's Fixtures</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {todayMatches.map((match) => (
                <MatchCard key={match._id} match={match} />
              ))}
            </div>
          </section>
        )}
        
        {/* Upcoming Matches */}
        {upcomingMatches.length > 0 && (
          <section className="mb-12">
            <h2 className="text-3xl font-display font-bold text-gray-900 mb-6">Upcoming Matches</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {upcomingMatches.map((match) => (
                <MatchCard key={match._id} match={match} showDate />
              ))}
            </div>
          </section>
        )}
        
        {/* Recent Results */}
        {finishedMatches.length > 0 && (
          <section>
            <h2 className="text-3xl font-display font-bold text-gray-900 mb-6">Recent Results</h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {finishedMatches.map((match) => (
                <MatchCard key={match._id} match={match} />
              ))}
            </div>
          </section>
        )}
        
        {matches.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">No matches scheduled yet</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
