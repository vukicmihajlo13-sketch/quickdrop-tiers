import { FaCrown } from 'react-icons/fa';

export default function Rankings({ players = [] }) {
  // 1. Sort by ELO (points), then by IGN (Alphabetical) if points are tied
  // 2. Limit the list to the Top 100 players
  const sortedPlayers = [...players]
    .sort((a, b) => {
      if (b.points !== a.points) {
        return b.points - a.points; // Higher ELO first
      }
      return a.ign.localeCompare(b.ign); // A-Z if ELO is equal
    })
    .slice(0, 100);

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
                 {/* Visual representation of the kit tiers */}
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
        .rankings-container { width: 100%; margin-top: 20px; }
        .rankings-list { display: flex; flex-direction: column; gap: 10px; }
        
        .player-row { 
          background: #11141b; 
          border: 1px solid #1f232d; 
          border-radius: 6px; 
          display: flex; 
          align-items: center; 
          height: 65px; 
          overflow: hidden;
        }

        .rank-one-glow { border-color: #fbbf24; box-shadow: 0 0 15px rgba(251, 191, 36, 0.1); }

        .player-rank-box {
          width: 80px;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 900;
          font-style: italic;
          font-size: 1.4rem;
          clip-path: polygon(0 0, 100% 0, 75% 100%, 0% 100%);
          margin-right: 15px;
        }

        .gold-bg { background: #fbbf24; color: #000; }
        .dark-bg { background: #1f232d; color: #fff; }

        .player-identity { flex: 2; display: flex; align-items: center; gap: 12px; }
        .player-avatar-small { border-radius: 4px; }
        .p-name { font-weight: 800; font-size: 1.1rem; color: #fff; display: block; }
        .p-sub { font-size: 0.75rem; color: #9ca3af; display: flex; align-items: center; gap: 5px; }
        .p-points { color: #3b82f6; font-weight: 700; }

        .region-badge { padding: 4px 8px; border-radius: 4px; font-weight: 900; font-size: 0.7rem; background: rgba(0,0,0,0.2); }
        .na-red { color: #ef4444; border: 1px solid #ef444433; }
        .eu-blue { color: #3b82f6; border: 1px solid #3b82f633; }

        .player-stats-icons { flex: 2; display: flex; justify-content: flex-end; gap: 12px; padding-right: 20px; }
        .kit-icon-group { display: flex; flex-direction: column; align-items: center; gap: 2px; }
        .kit-dot { width: 10px; height: 10px; border-radius: 50%; }
        .ht-gold { background: #fbbf24; box-shadow: 0 0 5px #fbbf24; }
        .lt-silver { background: #94a3b8; }
        .kit-label { font-size: 0.6rem; font-weight: 900; color: #64748b; }
      `}</style>
    </div>
  );
}
