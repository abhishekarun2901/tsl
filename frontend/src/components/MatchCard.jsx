import { useState } from 'react';

const MatchCard = ({ match, showDate = false }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  const getStatusBadge = () => {
    switch (match.status) {
      case 'live':
        return (
          <div className="live-indicator">
            <span className="live-dot"></span>
            LIVE
          </div>
        );
      case 'finished':
        return <span className="text-sm font-semibold text-gray-500">FT</span>;
      default:
        return <span className="text-sm text-gray-500">{formatDate(match.matchTime)}</span>;
    }
  };
  
  const getTeamLogo = (teamName) => {
    return teamName.substring(0, 2).toUpperCase();
  };
  
  const hasGoalScorers = match.goalscorers && match.goalscorers.length > 0;
  
  return (
    <div className="match-card animate-slide-in">
      <div className="flex items-center justify-between mb-3">
        {showDate && (
          <span className="text-xs text-gray-500 font-medium">
            Matchday {match.matchday || 1}
          </span>
        )}
        {getStatusBadge()}
      </div>
      
      <div className="flex items-center justify-between gap-4">
        {/* Team A */}
        <div className="flex items-center gap-3 flex-1">
          <div className="team-logo bg-gradient-to-br from-blue-500 to-blue-600 text-white">
            {getTeamLogo(match.teamA?.name || 'TM')}
          </div>
          <span className="font-semibold text-gray-900">{match.teamA?.name}</span>
        </div>
        
        {/* Score */}
        <div className="flex items-center gap-4">
          <span className={`score-display ${match.status === 'live' ? 'text-primary' : 'text-gray-900'}`}>
            {match.scoreA}
          </span>
          <span className="text-2xl text-gray-400 font-bold">—</span>
          <span className={`score-display ${match.status === 'live' ? 'text-primary' : 'text-gray-900'}`}>
            {match.scoreB}
          </span>
        </div>
        
        {/* Team B */}
        <div className="flex items-center gap-3 flex-1 justify-end">
          <span className="font-semibold text-gray-900 text-right">{match.teamB?.name}</span>
          <div className="team-logo bg-gradient-to-br from-red-500 to-red-600 text-white">
            {getTeamLogo(match.teamB?.name || 'TM')}
          </div>
        </div>
      </div>
      
      {/* Expandable goal scorers */}
      {hasGoalScorers && (
        <div className="mt-4">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-sm text-primary font-semibold hover:text-green-600 transition-colors"
          >
            {isExpanded ? '▼' : '▶'} Goal Scorers ({match.goalscorers.length})
          </button>
          
          {isExpanded && (
            <div className="mt-3 space-y-2 pl-4 border-l-2 border-primary">
              {match.goalscorers.map((scorer, index) => (
                <div key={index} className="text-sm flex items-center gap-2">
                  <span className="text-lg">⚽</span>
                  <span className="font-medium">{scorer.playerId?.name || 'Unknown'}</span>
                  <span className="text-gray-500">—</span>
                  <span className="font-semibold text-primary">{scorer.minute}'</span>
                  {scorer.isOwnGoal && (
                    <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded">OG</span>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MatchCard;
