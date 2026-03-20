import { FaCrown } from 'react-icons/fa';

export default function Rankings({ players = [] }) {
  // Sort players by points (highest first) to automate the ranking order
  const sortedPlayers = [...players].sort((a, b) => b.points - a.points);

  return (
    <div className="rankings-container">
      <div className="rankings-list">
        {sortedPlayers.map((player, index) => {
          const rank = index + 1;
          const isTopRank = rank === 1;

          return (
            <div key={player.ign} className={`player-row ${isTopRank ? 'rank-one-glow' : ''}`}>
              {/* Slanted Rank Box */}
              <div className={`player-rank-box ${isTopRank ? 'gold-bg' : 'dark-bg'}`}>
                <span>{rank}.</span>
              </div>
              
              <div className="player-identity">
                <img 
                  src={`https://minotar.net/helm/${player.ign}/44.png`} 
                  alt={player.ign} 
                  className="player-avatar-small" 
                />
                <div className="player-info-stack">
                  <span className="p-name">{player.ign}</span>
                  <span className="p-sub">
                    <FaCrown size={10} color={isTopRank ? "#fbbf24" : "#64748b"} /> 
                    {player.tier} <span className="p-points">({player.points} ELO)</span>
                  </span>
                </div>
              </div>

              <div className="player-region-section">
                <span className={`region-badge ${player.region.toUpperCase() === 'NA' ? 'na-red' : 'eu-blue'}`}>
                  {player.region.toUpperCase()}
                </span>
              </div>

              <div className="player-stats-icons">
                 {/* Visual representation of the player's primary tier */}
                 {['shield', 'sword', 'axe', 'pearl', 'potion'].map((icon) => (
                   <div key={icon} className="kit-icon-group">
                     <div className={`kit-dot ${player.tier.startsWith('H') ? 'ht-gold' : 'lt-silver'}`}></div>
                     <span className="kit-label">{player.tier}</span>
                   </div>
                 ))}
              </div>
            </div>
          );
        })}
      </div>

      <style jsx>{`
        /* ... (Keep the CSS from the previous Rankings component) ... */
      `}</style>
    </div>
  );
}
