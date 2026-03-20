import { useEffect, useState, useRef } from 'react';
import { FaDiscord, FaTrophy, FaHome, FaShieldAlt, FaYoutube, FaFileAlt } from 'react-icons/fa';

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
      <nav className="navbar">
        <div className="nav-container">
          
          {/* LOGO */}
          <div className="logo-box">
            <h1 className="logo-text">
              QUICKDROP <span style={{ color: '#3b82f6' }}>NETWORK</span>
            </h1>
          </div>

          {/* CENTER LINKS */}
          <div className="nav-links">
            <a href="/"><FaHome size={14} /> Home</a>
            <a href="#rankings"><FaTrophy size={14} /> Rankings</a>
            <a href="https://discord.gg/EKXHuKMXT4" target="_blank" rel="noreferrer"><FaDiscord size={15} /> Discord</a>
            <a href="#kits"><FaShieldAlt size={14} /> Kits</a>
            <a href="#"><FaFileAlt size={13} /> API Docs</a>
          </div>

          {/* SOCIALS & SEARCH (PC ONLY RIGHT ALIGN) */}
          <div className="nav-right">
             <div className="search-mini">
                <input 
                  ref={searchInput}
                  type="text" 
                  placeholder="Search player..." 
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="mini-input"
                />
                <span className="mini-slash">/</span>
             </div>
             <div className="social-icons">
               <a href="https://discord.gg/EKXHuKMXT4" target="_blank" rel="noreferrer"><FaDiscord size={20}/></a>
               <a href="https://www.youtube.com/@QuickdropTierlist" target="_blank" rel="noreferrer"><FaYoutube size={20}/></a>
             </div>
          </div>
        </div>
      </nav>

      {/* FOUNDER FEATURE SECTION */}
      <main className="main-content">
        <div className="founder-card-container">
          <div className="founder-card-profile">
            <img 
              src="https://minotar.net/helm/carinoh/120.png" 
              alt="carinoh" 
              className="founder-avatar"
            />
            <h2 className="founder-name">carinoh</h2>
            <div className="founder-badge">Founder</div>
          </div>

          <div className="founder-bio">
            <h3 className="founder-title">
              The Vision Behind <span style={{ color: '#3b82f6' }}>Quickdrop</span>
            </h3>
            <p className="founder-p">
              As the founder of the Quickdrop Network, <strong>carinoh</strong> is the driving force behind our community's growth and direction.
            </p>
            
            <div className="founder-stats">
              <div className="stat-box">
                <span className="stat-label">Established</span>
                <span className="stat-value">Network Leadership</span>
              </div>
              <div className="stat-box">
                <span className="stat-label">Focus</span>
                <span className="stat-value">Community Expansion</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      <style jsx>{`
        .navbar {
          padding: 12px 24px;
          background-color: #0b0d12;
          border-bottom: 1px solid #1f232d;
          position: sticky;
          top: 0;
          z-index: 100;
        }
        .nav-container {
          display: flex;
          align-items: center;
          justify-content: space-between;
          max-width: 1400px;
          margin: 0 auto;
          gap: 20px;
        }
        .logo-text { font-size: 1.2rem; font-weight: 900; letter-spacing: -0.5px; margin: 0; }
        
        .nav-links { 
          display: flex; 
          gap: 24px; 
          align-items: center;
          color: #9ca3af; 
          font-size: 0.9rem; 
          font-weight: 500;
        }
        .nav-links a { display: flex; align-items: center; gap: 6px; color: inherit; }
        .nav-links a:hover { color: #fff; }

        .nav-right { display: flex; align-items: center; gap: 20px; }
        .social-icons { display: flex; gap: 12px; color: #9ca3af; }

        /* MINI SEARCH (MCTIERS STYLE) */
        .search-mini {
          position: relative;
          background: #080a0f;
          border: 1px solid #1f232d;
          border-radius: 8px;
          padding: 6px 12px;
          width: 200px;
        }
        .mini-input {
          background: transparent;
          border: none;
          color: white;
          font-size: 0.85rem;
          width: 100%;
          outline: none;
        }
        .mini-slash {
          position: absolute; right: 8px; top: 50%; transform: translateY(-50%);
          background: #1f232d; padding: 0px 6px; border-radius: 4px; font-size: 0.7rem; color: #4b5563;
        }

        /* FOUNDER SECTION */
        .founder-card-container {
          display: flex; gap: 40px; align-items: center; background-color: #11141b;
          padding: 40px; border-radius: 16px; border: 1px solid #1f232d;
        }
        .founder-avatar { border-radius: 8px; width: 100px; border: 1px solid #3b82f6; }
        .founder-badge { background: #3b82f6; padding: 4px 10px; border-radius: 4px; font-size: 0.7rem; font-weight: 800; margin-top: 10px; text-transform: uppercase; }
        .founder-title { font-size: 1.8rem; margin: 0 0 10px 0; }
        .founder-stats { display: flex; gap: 30px; margin-top: 20px; }
        .stat-box { border-left: 2px solid #3b82f6; padding-left: 16px; }
        .stat-label { display: block; color: #4b5563; font-size: 0.65rem; font-weight: 800; text-transform: uppercase; }
        .stat-value { font-size: 1rem; font-weight: 600; }

        /* MOBILE FIXES */
        @media (max-width: 900px) {
          .nav-container { flex-direction: column; gap: 12px; padding: 10px 0; }
          .nav-links { gap: 15px; font-size: 0.8rem; flex-wrap: wrap; justify-content: center; }
          .search-mini { width: 100%; max-width: 300px; }
          .founder-card-container { flex-direction: column; text-align: center; }
          .founder-stats { flex-direction: column; align-items: center; }
        }
      `}</style>

      <style jsx global>{`
        body { margin: 0; background-color: #0b0d12; color: white; -webkit-font-smoothing: antialiased; }
        a { text-decoration: none; transition: 0.2s; }
      `}</style>
    </div>
  );
}
