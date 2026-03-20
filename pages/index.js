import { useEffect, useState } from 'react';

const getTierStyles = (tier) => {
  const t = tier?.toUpperCase();
  if (t === 'HT1') return { color: '#ffcc00', label: 'High Tier 1', glow: 'rgba(255, 204, 0, 0.2)' };
  if (t === 'LT1') return { color: '#ff4d4d', label: 'Low Tier 1', glow: 'rgba(255, 77, 77, 0.2)' };
  if (t?.startsWith('HT')) return { color: '#55aaff', label: `High Tier ${t.slice(-1)}`, glow: 'rgba(85, 170, 255, 0.1)' };
  if (t?.startsWith('LT')) return { color: '#aaaaaa', label: `Low Tier ${t.slice(-1)}`, glow: 'transparent' };
  return { color: '#ffffff', label: t, glow: 'transparent' };
};

export default function Home() {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    fetch('/api/players').then(res => res.json()).then(data => setPlayers(data));
  }, []);

  return (
    <div style={{ backgroundColor: '#0b0d12', minHeight: '100vh', color: 'white', fontFamily: 'Inter, sans-serif', padding: '60px 20px' }}>
      {/* Header Section */}
      <div style={{ textAlign: 'center', marginBottom: '80px' }}>
        <h1 style={{ fontSize: '3rem', fontWeight: '900', letterSpacing: '-3px', textTransform: 'uppercase', margin: 0 }}>
          QUICKDROP <span style={{ color: '#3b82f6' }}>TIERS</span>
        </h1>
        <p style={{ color: '#555', fontWeight: '500', marginTop: '10px' }}>Official Player Rankings & Leaderboard</p>
      </div>

      {/* Table Container */}
      <div style={{ maxWidth: '900px', margin: '0 auto', backgroundColor: '#12151c', borderRadius: '16px', border: '1px solid #1f232d', overflow: 'hidden', boxShadow: '0 20px 50px rgba(0,0,0,0.3)' }}>
        
        {/* Table Header */}
        <div style={{ display: 'flex', padding: '20px 30px', borderBottom: '1px solid #1f232d', backgroundColor: '#161a23', color: '#666', fontSize: '0.8rem', fontWeight: '800', textTransform: 'uppercase' }}>
          <span style={{ width: '60px' }}>Rank</span>
          <span style={{ flexGrow: 1 }}>Player</span>
          <span style={{ width: '150px', textAlign: 'right' }}>Tier</span>
        </div>

        {/* Player List */}
        {players.length === 0 ? (
          <div style={{ padding: '50px', textAlign: 'center', color: '#444' }}>Waiting for players to be ranked...</div>
        ) : (
          players.map((player, index) => {
            const style = getTierStyles(player.tier);
            return (
              <div key={index} style={{ display: 'flex', alignItems: 'center', padding: '20px 30px', borderBottom: index === players.length - 1 ? 'none' : '1px solid #1f232d', transition: 'background 0.2s' }}>
                <span style={{ width: '60px', fontWeight: '900', color: index < 3 ? style.color : '#333', fontSize: '1.2rem' }}>
                  #{index + 1}
                </span>
                
                <div style={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
                  <img 
                    src={`https://mc-heads.net/avatar/${player.username}/40`} 
                    alt={player.username}
                    style={{ borderRadius: '8px', marginRight: '15px', border: `2px solid ${style.color}`, boxShadow: `0 0 10px ${style.glow}` }} 
                  />
                  <span style={{ fontWeight: '700', fontSize: '1.1rem' }}>{player.username}</span>
                </div>

                <div style={{ width: '150px', textAlign: 'right' }}>
                  <span style={{ 
                    color: style.color, 
                    border: `1px solid ${style.color}`, 
                    padding: '5px 12px', 
                    borderRadius: '6px', 
                    fontSize: '0.75rem', 
                    fontWeight: '900',
                    backgroundColor: style.glow
                  }}>
                    {style.label}
                  </span>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
