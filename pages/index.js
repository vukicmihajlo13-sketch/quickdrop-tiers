import { useEffect, useState } from 'react';

const getTierStyles = (tier) => {
  const t = tier?.toUpperCase();
  if (t === 'HT1') return { color: '#ffcc00', label: 'HT1', glow: 'rgba(255, 204, 0, 0.2)' };
  if (t === 'LT1') return { color: '#ff4d4d', label: 'LT1', glow: 'rgba(255, 77, 77, 0.2)' };
  if (t?.startsWith('HT')) return { color: '#55aaff', label: t, glow: 'rgba(85, 170, 255, 0.1)' };
  if (t?.startsWith('LT')) return { color: '#aaaaaa', label: t, glow: 'transparent' };
  return { color: '#ffffff', label: t, glow: 'transparent' };
};

export default function Home() {
  const [players, setPlayers] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetch('/api/players').then(res => res.json()).then(data => setPlayers(data));
  }, []);

  const filteredPlayers = players.filter(p => 
    p.username.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ backgroundColor: '#080a0f', minHeight: '100vh', color: 'white', fontFamily: 'Inter, sans-serif', padding: '40px 20px' }}>
      
      {/* Header & Search */}
      <div style={{ textAlign: 'center', marginBottom: '60px' }}>
        <h1 style={{ fontSize: '3.5rem', fontWeight: '900', letterSpacing: '-4px', textTransform: 'uppercase', margin: 0, color: '#fff' }}>
          QUICKDROP <span style={{ color: '#3b82f6' }}>TIERS</span>
        </h1>
        <div style={{ marginTop: '30px', position: 'relative', maxWidth: '500px', margin: '30px auto' }}>
          <input 
            type="text" 
            placeholder="Search for a player..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ 
              width: '100%', padding: '15px 25px', borderRadius: '12px', border: '1px solid #1f232d', 
              backgroundColor: '#12151c', color: 'white', fontSize: '1rem', outline: 'none',
              boxShadow: '0 4px 20px rgba(0,0,0,0.5)'
            }}
          />
        </div>
      </div>

      {/* Leaderboard Table */}
      <div style={{ maxWidth: '1000px', margin: '0 auto', backgroundColor: '#11141b', borderRadius: '20px', border: '1px solid #1f232d', overflow: 'hidden' }}>
        
        <div style={{ display: 'flex', padding: '20px 40px', backgroundColor: '#161a23', color: '#4b5563', fontSize: '0.75rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1px' }}>
          <span style={{ width: '80px' }}>Rank</span>
          <span style={{ flexGrow: 1 }}>Player</span>
          <span style={{ width: '100px', textAlign: 'center' }}>Region</span>
          <span style={{ width: '120px', textAlign: 'right' }}>Tier</span>
        </div>

        {filteredPlayers.length === 0 ? (
          <div style={{ padding: '100px', textAlign: 'center', color: '#374151', fontSize: '1.2rem' }}>No players found...</div>
        ) : (
          filteredPlayers.map((player, index) => {
            const style = getTierStyles(player.tier);
            return (
              <div key={index} className="player-row" style={{ 
                display: 'flex', alignItems: 'center', padding: '15px 40px', 
                borderBottom: '1px solid #1f232d', transition: '0.2s ease-in-out'
              }}>
                <span style={{ width: '80px', fontWeight: '900', color: index < 3 ? style.color : '#374151', fontSize: '1.3rem' }}>
                  #{index + 1}
                </span>
                
                <div style={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
                  <img 
                    src={`https://mc-heads.net/avatar/${player.username}/45`} 
                    alt={player.username}
                    style={{ 
                      borderRadius: '10px', marginRight: '20px', 
                      border: `2px solid ${style.color}`, boxShadow: `0 0 15px ${style.glow}` 
                    }} 
                  />
                  <span style={{ fontWeight: '700', fontSize: '1.15rem', color: '#e5e7eb' }}>{player.username}</span>
                </div>

                <div style={{ width: '100px', textAlign: 'center' }}>
                  <span style={{ backgroundColor: '#1f232d', padding: '4px 10px', borderRadius: '6px', fontSize: '0.7rem', color: '#9ca3af', fontWeight: 'bold' }}>
                    {player.region || 'NA'}
                  </span>
                </div>

                <div style={{ width: '120px', textAlign: 'right' }}>
                  <span style={{ 
                    color: style.color, border: `1px solid ${style.color}`, 
                    padding: '6px 14px', borderRadius: '8px', fontSize: '0.8rem', 
                    fontWeight: '900', backgroundColor: style.glow, display: 'inline-block', minWidth: '60px', textAlign: 'center'
                  }}>
                    {style.label}
                  </span>
                </div>
              </div>
            );
          })
        )}
      </div>

      <style jsx>{`
        .player-row:hover {
          background-color: #161a23;
          transform: scale(1.005);
        }
      `}</style>
    </div>
  );
}
