import { FaCrown, FaMedal, FaStar, FaInfoCircle } from 'react-icons/fa';

export default function Rankings({ players }) {
  
  // Define the point values based on your request
  const tierPoints = {
    'HT1': 60, 'LT1': 45,
    'HT2': 30, 'LT2': 20,
    'HT3': 15, 'LT3': 10,
    'HT4': 8,  'LT4': 5,
    'HT5': 3,  'LT5': 2
  };

  // Helper to get color based on Tier
  const getTierColor = (tier) => {
    if (tier?.includes('1')) return '#ff4757'; // Red for Top Tier
    if (tier?.includes('2')) return '#ffa502'; // Gold/Orange
    if (tier?.includes('3')) return '#2ed573'; // Green
    if (tier?.includes('4')) return '#1e90ff'; // Blue
    return '#747d8c'; // Grey for T5
  };

  // Sort players by points (Highest to Lowest)
  const sortedPlayers = [...players].sort((a, b) => {
    const pointsA = tierPoints[a.tier?.toUpperCase()] || 0;
    const pointsB = tierPoints[b.tier?.toUpperCase()] || 0;
    return pointsB - pointsA;
  });

  return (
    <div className="rankings-container">
      {/* POINT GUIDE BOX */}
      <div className="point-guide">
        <div className="guide-header">
          <FaInfoCircle /> <span>Tier Point System</span>
        </div>
        <div className="guide-grid">
          {Object.entries(tierPoints).map(([tier, pts]) => (
            <div key={tier} className="guide-item">
              <span className="g-tier">{tier}</span>
              <span className="g-pts">{pts}pts</span>
            </div>
          ))}
        </div>
      </div>

      <div className="rank-list">
        {sortedPlayers.length > 0 ? (
          sortedPlayers.map((player, index) => {
            const points = tierPoints[player.tier?.toUpperCase()] || 0;
            const tierColor = getTierColor(player.tier?.toUpperCase());

            return (
              <div key={index} className="player-card">
                <div className="player-rank-num">
                  {index === 0 ? <FaCrown color="#fbbf24" size={20} /> : `#${index + 1}`}
                </div>
                
                <img 
                  src={`https://minotar.net/helm/${player.ign}/40.png`} 
                  alt={player.ign} 
                  className="player-head" 
                />

                <div className="player-info">
                  <span className="player-name">{player.ign}</span>
                  <span className="player-tier" style={{ color: tierColor }}>
                    {player.tier?.toUpperCase()}
                  </span>
                </div>

                <div className="player-points">
                  <span className="pts-num">{points}</span>
                  <span className="pts-label">POINTS</span>
                </div>
              </div>
            );
          })
        ) : (
          <div className="no-data">
            <p>No ranked players found. Use the sync button to refresh!</p>
          </div>
        )}
      </div>

      <style jsx>{`
        .rankings-container { width: 100%; display: flex; flex-direction: column; gap: 20px; }
        
        /* Point Guide Styling */
        .point-guide { 
          background: #161b22; 
          border: 1px solid #30363d; 
          border-radius: 12px; 
          padding: 15px; 
          margin-bottom: 10px;
        }
        .guide-header { 
          display: flex; 
          align-items: center; 
          gap: 8px; 
          color: #8b949e; 
          font-weight: 800; 
          font-size: 0.8rem; 
          text-transform: uppercase; 
          margin-bottom: 10px;
        }
        .guide-grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 10px; }
        .guide-item { display: flex; flex-direction: column; align-items: center; background: #0d1117; padding: 5px; border-radius: 6px; border: 1px solid #21262d; }
        .g-tier { font-weight: 900; font-size: 0.85rem; color: #58a6ff; }
        .g-pts { font-size: 0.7rem; color: #8b949e; }

        /* Player Card Styling */
        .rank-list { display: flex; flex-direction: column; gap: 10px; }
        .player-card { 
          background: #11141b; 
          border: 1px solid #1f232d; 
          padding: 12px 20px; 
          border-radius: 12px; 
          display: flex; 
          align-items: center; 
          gap: 15px;
          transition: 0.2s;
        }
        .player-card:hover { border-color: #3b82f6; transform: translateX(5px); background: #161b22; }
        
        .player-rank-num { width: 40px; font-weight: 900; color: #475569; font-size: 1.1rem; }
        .player-head { border-radius: 6px; background: #0b0d12; border: 1px solid #30363d; }
        
        .player-info { flex: 1; display: flex; flex-direction: column; }
        .player-name { font-weight: 800; font-size: 1.1rem; color: white; }
        .player-tier { font-weight: 900; font-size: 0.8rem; letter-spacing: 1px; }

        .player-points { text-align: right; display: flex; flex-direction: column; }
        .pts-num { font-size: 1.4rem; font-weight: 900; color: #3b82f6; line-height: 1; }
        .pts-label { font-size: 0.6rem; font-weight: 800; color: #475569; letter-spacing: 1px; }

        .no-data { text-align: center; padding: 40px; color: #475569; font-weight: 600; }

        @media (max-width: 600px) {
          .guide-grid { grid-template-columns: repeat(2, 1fr); }
        }
      `}</style>
    </div>
  );
}
