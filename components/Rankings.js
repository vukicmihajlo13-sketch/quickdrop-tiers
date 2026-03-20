import { FaCrown, FaMedal, FaStar, FaInfoCircle } from 'react-icons/fa';

export default function Rankings({ players }) {
  
  // Point mapping for both shorthand and full names from Discord
  const tierPoints = {
    'HT1': 60, 'HIGH TIER 1': 60,
    'LT1': 45, 'LOW TIER 1': 45,
    'HT2': 30, 'HIGH TIER 2': 30,
    'LT2': 20, 'LOW TIER 2': 20,
    'HT3': 15, 'HIGH TIER 3': 15,
    'LT3': 10, 'LOW TIER 3': 10,
    'HT4': 8,  'HIGH TIER 4': 8,
    'LT4': 5,  'LOW TIER 4': 5,
    'HT5': 3,  'HIGH TIER 5': 3,
    'LT5': 2,  'LOW TIER 5': 2
  };

  // Helper to convert full names to shorthand for the UI
  const formatTier = (tier) => {
    if (!tier) return 'NONE';
    const upper = tier.toUpperCase();
    if (upper.includes('LOW TIER')) return upper.replace('LOW TIER ', 'LT');
    if (upper.includes('HIGH TIER')) return upper.replace('HIGH TIER ', 'HT');
    return upper;
  };

  const getTierColor = (tier) => {
    const t = formatTier(tier);
    if (t.includes('1')) return '#ff4757';
    if (t.includes('2')) return '#ffa502';
    if (t.includes('3')) return '#2ed573';
    if (t.includes('4')) return '#1e90ff';
    return '#747d8c';
  };

  const sortedPlayers = [...players].sort((a, b) => {
    const pointsA = tierPoints[a.tier?.toUpperCase()] || 0;
    const pointsB = tierPoints[b.tier?.toUpperCase()] || 0;
    return pointsB - pointsA;
  });

  return (
    <div className="rankings-container">
      <div className="point-guide">
        <div className="guide-header">
          <FaInfoCircle /> <span>Tier Point System</span>
        </div>
        <div className="guide-grid">
          {['HT1', 'LT1', 'HT2', 'LT2', 'HT3', 'LT3', 'HT4', 'LT4', 'HT5', 'LT5'].map((t) => (
            <div key={t} className="guide-item">
              <span className="g-tier">{t}</span>
              <span className="g-pts">{tierPoints[t]}pts</span>
            </div>
          ))}
        </div>
      </div>

      <div className="rank-list">
        {sortedPlayers.length > 0 ? (
          sortedPlayers.map((player, index) => {
            const rawTier = player.tier?.toUpperCase();
            const points = tierPoints[rawTier] || 0;
            const displayTier = formatTier(rawTier);
            const tierColor = getTierColor(rawTier);

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
                    {displayTier}
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
        .point-guide { background: #161b22; border: 1px solid #30363d; border-radius: 12px; padding: 15px; }
        .guide-header { display: flex; align-items: center; gap: 8px; color: #8b949e; font-weight: 800; font-size: 0.8rem; text-transform: uppercase; margin-bottom: 10px; }
        .guide-grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 10px; }
        .guide-item { display: flex; flex-direction: column; align-items: center; background: #0d1117; padding: 5px; border-radius: 6px; border: 1px solid #21262d; }
        .g-tier { font-weight: 900; font-size: 0.85rem; color: #3b82f6; }
        .g-pts { font-size: 0.7rem; color: #8b949e; }
        .rank-list { display: flex; flex-direction: column; gap: 10px; }
        .player-card { background: #11141b; border: 1px solid #1f232d; padding: 12px 20px; border-radius: 12px; display: flex; align-items: center; gap: 15px; transition: 0.2s; }
        .player-card:hover { border-color: #3b82f6; transform: translateX(5px); }
        .player-rank-num { width: 40px; font-weight: 900; color: #475569; font-size: 1.1rem; }
        .player-head { border-radius: 6px; border: 1px solid #30363d; }
        .player-info { flex: 1; display: flex; flex-direction: column; }
        .player-name { font-weight: 800; font-size: 1.1rem; color: white; }
        .player-tier { font-weight: 900; font-size: 0.8rem; letter-spacing: 1px; }
        .player-points { text-align: right; }
        .pts-num { font-size: 1.4rem; font-weight: 900; color: #3b82f6; display: block; }
        .pts-label { font-size: 0.6rem; font-weight: 800; color: #475569; }
        .no-data { text-align: center; padding: 40px; color: #475569; }
        @media (max-width: 600px) { .guide-grid { grid-template-columns: repeat(2, 1fr); } }
      `}</style>
    </div>
  );
}
