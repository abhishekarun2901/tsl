import { useState, useEffect } from 'react';
import { getStandings } from '../utils/api';

const Table = () => {
  const [standings, setStandings] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const fetchStandings = async () => {
    try {
      const response = await getStandings();
      setStandings(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching standings:', error);
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchStandings();
    
    // Poll for updates every 10 seconds
    const interval = setInterval(fetchStandings, 10000);
    
    return () => clearInterval(interval);
  }, []);
  
  const getTeamLogo = (teamName) => {
    return teamName.substring(0, 2).toUpperCase();
  };
  
  const getRowStyle = (index, total) => {
    if (index < 4) return 'bg-green-50 border-l-4 border-green-500';
    if (index === total - 1) return 'bg-red-50 border-l-4 border-red-500';
    return '';
  };
  
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading standings...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-8">
          League Table
        </h1>
        
        {standings.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">No standings available yet</p>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-primary to-green-600 text-white">
                  <tr>
                    <th className="py-4 px-4 text-left font-semibold">#</th>
                    <th className="py-4 px-4 text-left font-semibold">Team</th>
                    <th className="py-4 px-2 text-center font-semibold">P</th>
                    <th className="py-4 px-2 text-center font-semibold">W</th>
                    <th className="py-4 px-2 text-center font-semibold">D</th>
                    <th className="py-4 px-2 text-center font-semibold">L</th>
                    <th className="py-4 px-2 text-center font-semibold">GF</th>
                    <th className="py-4 px-2 text-center font-semibold">GA</th>
                    <th className="py-4 px-2 text-center font-semibold">GD</th>
                    <th className="py-4 px-4 text-center font-semibold">Pts</th>
                  </tr>
                </thead>
                <tbody>
                  {standings.map((standing, index) => (
                    <tr
                      key={standing._id}
                      className={`table-row ${getRowStyle(index, standings.length)}`}
                    >
                      <td className="py-4 px-4 font-bold text-gray-700">{index + 1}</td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <div className="team-logo bg-gradient-to-br from-blue-500 to-blue-600 text-white text-sm">
                            {getTeamLogo(standing.teamId?.name || 'TM')}
                          </div>
                          <span className="font-semibold text-gray-900">
                            {standing.teamId?.name}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-2 text-center stat-badge mx-auto">{standing.played}</td>
                      <td className="py-4 px-2 text-center stat-badge mx-auto">{standing.won}</td>
                      <td className="py-4 px-2 text-center stat-badge mx-auto">{standing.draw}</td>
                      <td className="py-4 px-2 text-center stat-badge mx-auto">{standing.lost}</td>
                      <td className="py-4 px-2 text-center stat-badge mx-auto">{standing.gf}</td>
                      <td className="py-4 px-2 text-center stat-badge mx-auto">{standing.ga}</td>
                      <td className="py-4 px-2 text-center">
                        <span className={`stat-badge ${standing.gd > 0 ? 'bg-green-100 text-green-700' : standing.gd < 0 ? 'bg-red-100 text-red-700' : ''}`}>
                          {standing.gd > 0 ? '+' : ''}{standing.gd}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-center">
                        <span className="text-xl font-bold text-primary">{standing.points}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {/* Mobile Cards */}
            <div className="md:hidden divide-y">
              {standings.map((standing, index) => (
                <div
                  key={standing._id}
                  className={`p-4 ${getRowStyle(index, standings.length)}`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl font-bold text-gray-700">{index + 1}</span>
                      <div className="team-logo bg-gradient-to-br from-blue-500 to-blue-600 text-white text-sm">
                        {getTeamLogo(standing.teamId?.name || 'TM')}
                      </div>
                      <span className="font-semibold text-gray-900">
                        {standing.teamId?.name}
                      </span>
                    </div>
                    <span className="text-2xl font-bold text-primary">{standing.points}</span>
                  </div>
                  <div className="grid grid-cols-4 gap-2 text-center text-sm">
                    <div>
                      <div className="text-gray-500 text-xs mb-1">P</div>
                      <div className="stat-badge w-full">{standing.played}</div>
                    </div>
                    <div>
                      <div className="text-gray-500 text-xs mb-1">W-D-L</div>
                      <div className="stat-badge w-full text-xs">
                        {standing.won}-{standing.draw}-{standing.lost}
                      </div>
                    </div>
                    <div>
                      <div className="text-gray-500 text-xs mb-1">GF-GA</div>
                      <div className="stat-badge w-full text-xs">
                        {standing.gf}-{standing.ga}
                      </div>
                    </div>
                    <div>
                      <div className="text-gray-500 text-xs mb-1">GD</div>
                      <div className={`stat-badge w-full text-xs ${standing.gd > 0 ? 'bg-green-100 text-green-700' : standing.gd < 0 ? 'bg-red-100 text-red-700' : ''}`}>
                        {standing.gd > 0 ? '+' : ''}{standing.gd}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Legend */}
        {standings.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-500 rounded"></div>
              <span className="text-gray-600">Top 4 (Knockout)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-red-500 rounded"></div>
              <span className="text-gray-600">Eliminated</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Table;
