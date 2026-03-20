import { useEffect, useState, useRef } from 'react';
import { FaDiscord, FaTrophy, FaHome, FaFileCode, FaChevronDown, FaTwitter, FaYoutube } from 'react-icons/fa';

export default function Home() {
  const [players, setPlayers] = useState([]);
  const [search, setSearch] = useState('');
  const searchInput = useRef(null);

  useEffect(() => {
    fetch('/api/players').then(res => res.json()).then(data => setPlayers(data));
    
    const handleKeyDown = (e) => {
      if (e.key === '/' && document.activeElement !== searchInput.current) {
        e.preventDefault();
        searchInput.current.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div style={{ backgroundColor: '#0b0d12', minHeight: '100vh', color: 'white', fontFamily: 'Inter, sans-serif' }}>
      
      {/* NAVBAR */}
      <nav style={{ 
        padding: '20px 40px', backgroundColor: '#11141b', borderBottom: '1px solid #1f232d',
        position: 'sticky', top: 0, zIndex: 100
      }}>
        {/* Top Row: Logo and Links */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', maxWidth: '1200px', margin: '0 auto' }}>
          <h1 style={{ fontSize: '1.4rem', fontWeight: '900', letterSpacing: '-1.2px', margin: 0 }}>
            QUICKDROP <span style={{ color: '#3b82f6' }}>TIERS</span>
          </h1>

          <div style={{ display: 'flex', gap: '30px', alignItems: 'center', color: '#9ca3af', fontWeight: '600', fontSize: '0.9rem' }}>
            <a href="/" style={{ textDecoration: 'none', color: '#fff', display: 'flex', alignItems: 'center', gap: '6px' }}><FaHome /> Home</a>
            <a href="#rankings" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center', gap: '6px' }}><FaTrophy /> Rankings</a>
            
            {/* Clickable Discord Link */}
            <a href="https://discord.gg/EKXHuKMXT4" target="_blank" rel="noreferrer" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <FaDiscord /> Discord
            </a>

            <a href="/api-docs" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center', gap: '6px' }}><FaFileCode /> API Docs</a>
          </div>

          <div style={{ display: 'flex', gap: '15px', color: '#9ca3af' }}>
             <a href="https://discord.gg/EKXHuKMXT4" target="_blank" style={{ color: 'inherit' }}><FaDiscord size={20}/></a>
             <a href="#" style={{ color: 'inherit' }}><FaTwitter size={20}/></a>
          </div>
        </div>

        {/* Bottom Row: Big Centered Search Bar */}
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '25px' }}>
          <div style={{ position: 'relative', width: '100%', maxWidth: '600px' }}>
            <input 
              ref={searchInput}
              type="text" 
              placeholder="Search player..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ 
                width: '100%', padding: '12px 20px', borderRadius: '10px', border: '1px solid #1f232d', 
                backgroundColor: '#080a0f', color: 'white', fontSize: '1rem', outline: 'none',
                boxShadow: '0 4px 15px rgba(0,0,0,0.3)'
              }}
            />
            <div style={{ 
              position: 'absolute', right: '15px', top: '50%', transform: 'translateY(-50%)',
              backgroundColor: '#1f232d', padding: '2px 8px', borderRadius: '5px', fontSize: '0.8rem', color: '#4b5563'
            }}>/</div>
          </div>
        </div>
      </nav>

      {/* PLAYER LIST CONTENT */}
      <div style={{ padding: '40px 20px', maxWidth: '1000px', margin: '0 auto' }}>
        {/* Your Table Code goes here */}
      </div>

      {/* CRITICAL: This removes the white outline/margin from the whole page */}
      <style jsx global>{`
        body { 
          margin: 0 !important; 
          padding: 0 !important; 
          background-color: #0b0d12;
          overflow-x: hidden;
        }
        * { box-sizing: border-box; }
        a { transition: color 0.2s; cursor: pointer; }
        a:hover { color: #3b82f6 !important; }
      `}</style>
    </div>
  );
}
