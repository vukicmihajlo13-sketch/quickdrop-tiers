import { useEffect, useState } from 'react';

export default function Home() {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    fetch('/api/players')
      .then((res) => res.json())
      .then((data) => setPlayers(data));
  }, []);

  return (
    <div style={{ backgroundColor: '#0f111a', minHeight: '100vh', color: 'white', fontFamily: 'sans-serif', padding: '40px' }}>
      <h1 style={{ textAlign: 'center', fontSize: '3rem', fontWeight: '900', textTransform: 'uppercase', marginBottom: '50px' }}>
        QuickDrop <span style={{ color: '#3b82f6' }}>Tiers</span>
      </h1>
      
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        {players.map((player, index) => (
          <div key={index} style={{ display: 'flex', alignItems: 'center', backgroundColor: '#161922', padding: '20px', borderRadius: '15px', marginBottom: '15px', border: '1px solid #1f2937' }}>
            <span style={{ fontSize: '1.5rem', fontWeight: 'bold', width: '50px', color: index < 3 ? '#f59e0b' : '#4b5563' }}>
              #{index + 1}
            </span>
            <img src={`https://mc-heads.net/avatar/${player.username}/50`} alt="head" style={{ borderRadius: '8px', marginRight: '20px' }} />
            <div style={{ flexGrow: 1 }}>
              <h2 style={{ margin: 0, fontSize: '1.2rem' }}>{player.username}</h2>
              <span style={{ color: '#3b82f6', fontSize: '0.8rem', fontWeight: 'bold', textTransform: 'uppercase' }}>{player.tier}</span>
            </div>
            <div style={{ backgroundColor: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6', padding: '8px 15px', borderRadius: '8px', border: '1px solid #1e3a8a', fontWeight: 'bold' }}>
              {player.tier}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
