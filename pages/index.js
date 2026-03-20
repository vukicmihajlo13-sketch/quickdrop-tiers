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
        padding: '20px 40px', 
        backgroundColor: '#11141b', 
        borderBottom: '1px solid #1f232d',
        position: 'sticky', 
        top: 0, 
        zIndex: 100
      }}>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between', 
          maxWidth: '1400px', 
          margin: '0 auto',
          position: 'relative', // Context for the absolute centered links
          height: '50px' // Keeps row height consistent
        }}>
          
          {/* 1. BIG LOGO ON THE LEFT */}
          <div style={{ zIndex: 2, flex: '1 1 0' }}>
            <h1 style={{ 
              fontSize: '2.2rem', 
              fontWeight: '900', 
              letterSpacing: '-1.5px', 
              margin: 0,
              cursor: 'pointer',
              textTransform: 'uppercase',
              whiteSpace: 'nowrap'
            }}>
              QUICKDROP <span style={{ color: '#3b82f6' }}>TIERS</span>
            </h1>
          </div>

          {/* 2. CENTERED LINKS (Fixed Position) */}
          <div style={{ 
            display: 'flex', 
            gap: '35px', 
            alignItems: 'center', 
            color: '#9ca3af', 
            fontWeight: '600', 
            fontSize: '1rem',
            position: 'absolute', 
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 1,
            whiteSpace: 'nowrap'
          }}>
            <a href="/" style={{ textDecoration: 'none', color: '#fff', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <FaHome size={18} /> Home
            </a>
            <a href="#rankings" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <FaTrophy size={16} /> Rankings
            </a>
            <a href="https://discord.gg/EKXHuKMXT4" target="_blank" rel="noreferrer" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <FaDiscord size={18} /> Discord
            </a>
            <a href="/api-docs" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <FaFileCode size={16} /> API Docs
            </a>
          </div>

          {/* 3. SOCIAL ICONS ON THE RIGHT */}
          <div style={{ display: 'flex', gap: '20px', color: '#9ca3af', zIndex: 2, flex: '1 1 0', justifyContent: 'flex-end' }}>
             <a href="https://discord.gg/EKXHuKMXT4" target="_blank" style={{ color: 'inherit' }}><FaDiscord size={26}/></a>
             <a href="#" style={{ color: 'inherit' }}><FaTwitter size={26}/></a>
          </div>
        </div>

        {/* SEARCH BAR (Centered below) */}
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '35px' }}>
          <div style={{ position: 'relative', width: '100%', maxWidth: '750px' }}>
            <input 
              ref={searchInput}
              type="text" 
              placeholder="Search player..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ 
                width: '100%', 
                padding: '16px 25px', 
                borderRadius: '14px', 
                border: '1px solid #1f232d', 
                backgroundColor: '#080a0f', 
                color: 'white', 
                fontSize: '1.1rem', 
                outline: 'none',
                boxShadow: '0 4px 25px rgba(0,0,0,0.5)'
              }}
            />
            <div style={{ 
              position: 'absolute', right: '20px', top: '50%', transform: 'translateY(-50%)',
              backgroundColor: '#1f232d', padding: '4px 12px', borderRadius: '8px', fontSize: '0.9rem', color: '#4b5563',
              border: '1px solid #2d333f'
            }}>/</div>
          </div>
        </div>
      </nav>

      {/* PLAYER LIST CONTENT */}
      <div style={{ padding: '40px 20px', maxWidth: '1100px', margin: '0 auto' }}>
        {/* Your Table Code goes here */}
      </div>

      <style jsx global>{`
        body { 
          margin: 0 !important; 
          padding: 0 !important; 
          background-color: #0b0d12;
          overflow-x: hidden;
        }
        * { box-sizing: border-box; }
        a { transition: all 0.2s ease; cursor: pointer; }
        a:hover { color: #3b82f6 !important; transform: translateY(-1px); }
      `}</style>
    </div>
  );
}
