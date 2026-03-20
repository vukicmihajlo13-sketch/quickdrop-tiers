import { FaCrown, FaShieldAlt, FaMagic } from 'react-icons/fa';
import { GiBroadsword, GiBattleAxe, GiEmerald necklace, GiGlassBottle } from 'react-icons/gi';

export default function Rankings({ players = [] }) {
  const sortedPlayers = [...players]
    .filter(player => player.points > 0) 
    .sort((a, b) => {
      if (b.points !== a.points) return b.points - a.points;
      return a.ign.localeCompare(b.ign);
    })
    .slice(0, 100);

  return (
    <div className="rankings-container">
      <div className="rankings-list">
        {sortedPlayers.length === 0 ? (
          <div className="no-players">No players have been ranked yet.</div>
        ) : (
          sortedPlayers.map((player, index) => {
            const rank = index + 1;
            const isTopRank = rank === 1;
            const isHighTier = player.tier.toUpperCase().startsWith('HT');

            return (
              <div key={player.ign} className={`player-row ${isTopRank ? 'rank-one-glow' : ''}`}>
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
                  {/* Gear icons representing maxed stats with visible enchantments */}
                  {[
                    { id: 'shield', icon: <FaShieldAlt /> },
                    { id: 'sword', icon: <GiBroadsword />, maxed: true },
                    { id: 'axe', icon: <GiBattleAxe /> },
                    { id: 'pearl', icon: <FaMagic /> },
                    { id: 'potion', icon: <GiGlassBottle /> }
                  ].map((item) => (
                    <div key={item.id} className="kit-icon-group">
                      <div className={`icon-wrapper ${item.maxed ? 'enchanted-glow' : ''} ${isHighTier ? 'tier-gold' : 'tier-silver'}`}>
                        {item.icon}
                      </div>
                      <span className="kit-label">{player.tier}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })
        )}
      </div>

      <style jsx>{`
        .rankings-container { width: 100%; margin-top: 20px; }
        .rankings-list { display: flex; flex-direction: column; gap: 10px; }
        .no-players { text-align: center; padding: 40px; color: #64748b; font-style: italic; }
        
        .player-row { 
          background: #11141b; 
          border: 1px solid #1f232d; 
          border-radius: 6px; 
          display: flex; 
          align-items: center; 
          height: 65px; 
          overflow: hidden;
        }

        .rank-one-glow { border-color: #fbbf24; box-shadow: 0 0 15px rgba(251, 191, 36, 0.2); }

        .player-rank-box {
          width: 80px; height: 100%;
          display: flex; align-items: center; justify-content: center;
          font-weight: 900; font-style: italic; font-size: 1.4rem;
          clip-path: polygon(0 0, 100% 0, 75% 100%, 0% 100%);
          margin-right: 15px;
        }

        .gold-bg { background: #fbbf24; color: #000; }
        .dark-bg { background: #1f232d; color: #fff; }

        .player-identity { flex: 2; display: flex; align-items: center; gap: 12px; }
        .player-avatar-small { border-radius: 4px; }
        .p-name { font-weight: 800; font-size: 1.1rem; color: #fff; }
        .p-sub { font-size: 0.75rem; color: #9ca3af; display: flex; align-items: center; gap: 5px; }
        .p-points { color: #3b82f6; font-weight: 700; }

        .region-badge { padding: 4px 8px; border-radius: 4px; font-weight: 900; font-size: 0.7rem; background: rgba(0,0,0,0.2); }
        .na-red { color: #ef4444; border: 1px solid #ef444433; }
        .eu-blue { color: #3b82f6; border: 1px solid #3b82f633; }

        /* Gear Styles */
        .player-stats-icons { flex: 3; display: flex; justify-content: flex-end; gap: 15px; padding-right: 25px; }
        .kit-icon-group { display: flex; flex-direction: column; align-items: center; gap: 4px; }
        .icon-wrapper { font-size: 1.2rem; display: flex; align-items: center; justify-content: center; }
        .tier-gold { color: #fbbf24; }
        .tier-silver { color: #94a3b8; }
        
        /* Highly visible enchantment glow for maxed swords */
        .enchanted-glow {
          filter: drop-shadow(0 0 5px #a855f7) drop-shadow(0 0 2px #d8b4fe);
          animation: pulse-enchant 2s infinite ease-in-out;
        }

        @keyframes pulse-enchant {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; transform: scale(1.1); }
        }

        .kit-label { font-size: 0.6rem; font-weight: 900; color: #64748b; text-transform: uppercase; }

        @media (max-width: 768px) {
          .player-stats-icons { display: none; }
          .player-rank-box { width: 50px; font-size: 1.1rem; }
        }
      `}</style>
    </div>
  );
}
