import { useEffect, useState, useRef } from 'react';
import { FaDiscord, FaTrophy, FaHome, FaFileCode, FaChevronDown, FaTwitter, FaYoutube } from 'react-icons/fa';

export default function Home() {
  const [players, setPlayers] = useState([]);
  const [search, setSearch] = useState('');
  const searchInput = useRef(null);

  useEffect(() => {
    fetch('/api/players').then(res => res.json()).then(data => setPlayers(data));
    
    // Shortcut for "/" key to focus search
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
      
      {/* MCTIERS STYLE NAVBAR */}
      <nav style={{ 
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', 
        padding: '10px 40px', backgroundColor: '#11141b', borderBottom: '1px solid #1f232d',
        position: 'sticky', top: 0, zIndex: 100
      }}>
        {/* Logo Section */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1 }}>
          <h1 style={{ fontSize: '1.4rem', fontWeight: '900', letterSpacing: '-1.2px', margin: 0, cursor: 'pointer' }}>
            QUICKDROP <span style={{ color: '#3b82f6' }}>TIERS</span>
          </h1>
        </div>

        {/* Center Links */}
        <div style={{ display: 'flex', gap: '25px', alignItems: 'center', color: '#9ca3af', fontWeight: '600', fontSize: '0.85rem' }}>
          <a href="/" style={{ textDecoration: 'none', color: '#fff', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <FaHome size={16}/> Home
          </a>
          <a href="#rankings" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <FaTrophy size={14}/> Rankings
          </a>

          {/* DISCORD DROPDOWN */}
          <div className="dropdown">
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
              <FaDiscord size={16}/> Discords <FaChevronDown size={10} />
            </div>
            <div className="dropdown-content">
              <a href="https://discord.gg/yourlink" target="_blank">Main Community</a>
              <a href="https://discord.gg/yourlink2" target="_blank">Staff Support</a>
            </div>
          </div>

          <a href="/api-docs" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <FaFileCode size={14}/> API Docs
          </a>
        </div>

        {/* Right Section: Search & Socials */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flex: 1, justifyContent: 'flex-end' }}>
          <div style={{ position: 'relative', width: '200px' }}>
            <input 
              ref={searchInput}
              type="text" 
              placeholder="Search player..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ 
                width: '100%', padding: '7px 15px', borderRadius: '6px', border: '1px solid #1f232d', 
                backgroundColor: '#080a0f', color: 'white', fontSize: '0.8rem', outline: 'none' 
              }}
            />
            <div style={{ 
              position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)',
              backgroundColor: '#1f232d', padding: '1px 5px', borderRadius: '3px', fontSize: '0.65rem', color: '#4b5563'
            }}>/</div>
          </div>
          
          <div style={{ display: 'flex', gap: '15px', color: '#9ca3af' }}>
             <a href="#" style={{ color: 'inherit' }}><FaTwitter size={18}/></a>
             <a href="#" style={{ color: 'inherit' }}><FaDiscord size={18}/></a>
          </div>
        </div>
      </nav>

      {/* STYLES FOR DROPDOWN AND HOVERS */}
      <style jsx>{`
        .dropdown { position: relative; display: inline-block; }
        .dropdown-content {
          display: none;
          position: absolute;
          background-color: #161a23;
          min-width: 180px;
          box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.5);
          border: 1px solid #1f232d;
          border-radius: 8px;
          z-index: 1;
          margin-top: 10px;
          overflow: hidden;
        }
        .dropdown-content a {
          color: #9ca3af;
          padding: 12px 16px;
          text-decoration: none;
          display: block;
          font-size: 0.8rem;
        }
        .dropdown-content a:hover { background-color: #1f232d; color: white; }
        .dropdown:hover .dropdown-content { display: block; }
        a { transition: color 0.2s; }
        a:hover { color: #fff !important; }
      `}</style>

      {/* ... Rest of your Player Table code ... */}
    </div>
  );
}
