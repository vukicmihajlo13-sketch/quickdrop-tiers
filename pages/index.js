import { useEffect, useState, useRef } from 'react';
import { FaDiscord, FaTrophy, FaHome, FaShieldAlt, FaYoutube } from 'react-icons/fa';

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
          
          {/* 1. LOGO */}
          <div className="logo-section">
            <h1 className="logo-text">
              QUICKDROP <span style={{ color: '#3b82f6' }}>NETWORK</span>
            </h1>
          </div>

          {/* 2. LINKS */}
          <div className="nav-links">
            <a href="/"><FaHome size={18} /> Home</a>
            <a href="#rankings"><FaTrophy size={16} /> Rankings</a>
            <a href="https://discord.gg/EKXHuKMXT4" target="_blank" rel="noreferrer"><FaDiscord size={18} /> Discord</a>
            <a href="#kits"><FaShieldAlt size={16} /> Kits</a>
          </div>

          {/* 3. SOCIALS */}
          <div className="social-section">
             <a href="https://discord.gg/EKXHuKMXT4" target="_blank" rel="noreferrer"><FaDiscord size={24}/></a>
             <a href="https://www.youtube.com/@QuickdropTierlist" target="_blank" rel="noreferrer"><FaYoutube size={24}/></a>
          </div>
        </div>

        {/* SEARCH BAR */}
        <div className="search-container">
          <div className="search-wrapper">
            <input 
              ref={searchInput}
              type="text" 
              placeholder="Search player..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="search-input"
            />
            <div className="search-slash">/</div>
          </div>
        </div>
      </nav>

      {/* FOUNDER FEATURE SECTION */}
      <main className="main-content">
        <div className="founder-card-container">
          <div className="glow-effect"></div>
          
          {/* PLAYER CARD (LEFT) */}
          <div className="founder-card-profile">
            <img 
              src="https://minotar.net/helm/carinoh/120.png" 
              alt="carinoh" 
              className="founder-avatar"
            />
            <h2 className="founder-name">carinoh</h2>
            <div className="founder-badge">Founder</div>
          </div>

          {/* BIO TEXT (RIGHT) */}
          <div className="founder-bio">
            <h3 className="founder-title">
              The Vision Behind <span style={{ color: '#3b82f6' }}>Quickdrop</span>
            </h3>
            <p className="founder-p">
              As the founder of the Quickdrop Network, <strong>carinoh</strong> is the driving force behind our community's growth and direction. With a focus on high-tier competitive play, he has built an environment where the best players thrive.
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
        /* NAVBAR RESPONSIVENESS */
        .navbar {
          padding: 20px 10px;
          background-color: #11141b;
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
          flex-wrap: wrap; /* Allows wrapping on mobile */
          gap: 15px;
        }
        .logo-text {
          font-size: 1.5rem;
          font-weight: 900;
          text-transform: uppercase;
          margin: 0;
        }
        .nav-links {
          display: flex;
          gap: 20px;
          font-weight: 600;
          color: #9ca3af;
        }
        .nav-links a {
          display: flex;
          align-items: center;
          gap: 6px;
          color: inherit;
        }
        
        /* SEARCH BAR */
        .search-container {
          display: flex;
          justify-content: center;
          margin-top: 25px;
        }
        .search-wrapper {
          position: relative;
          width: 100%;
          max-width: 750px;
        }
        .search-input {
          width: 100%;
          padding: 12px 20px;
          border-radius: 10px;
          border: 1px solid #1f232d;
          background-color: #080a0f;
          color: white;
          outline: none;
        }
        .search-slash {
          position: absolute; right: 15px; top: 50%; transform: translateY(-50%);
          background: #1f232d; padding: 2px 8px; border-radius: 4px; font-size: 0.8rem;
        }

        /* FOUNDER SECTION RESPONSIVENESS */
        .founder-card-container {
          display: flex;
          flex-direction: row;
          gap: 40px;
          align-items: center;
          background-color: #11141b;
          padding: 40px;
          border-radius: 20px;
          border: 1px solid #1f232d;
          position: relative;
          overflow: hidden;
        }
        .founder-avatar {
          border-radius: 12px;
          width: 100px;
          box-shadow: 0 0 20px rgba(59, 130, 246, 0.4);
        }
        .founder-badge {
          background: #3b82f6;
          padding: 4px 12px;
          border-radius: 4px;
          font-size: 0.7rem;
          font-weight: 900;
          margin-top: 10px;
        }

        /* MOBILE OVERRIDES */
        @media (max-width: 768px) {
          .nav-container {
            flex-direction: column;
            text-align: center;
          }
          .logo-text { font-size: 1.2rem; }
          .nav-links { gap: 10px; font-size: 0.85rem; }
          .social-section { display: none; } /* Hide socials on tiny screens to save space */
          
          .founder-card-container {
            flex-direction: column; /* Stack avatar on top of text */
            padding: 20px;
            text-align: center;
          }
          .founder-stats {
            flex-direction: column;
            gap: 10px;
          }
          .founder-title { font-size: 1.5rem !important; }
        }

        .main-content {
          max-width: 1100px;
          margin: 40px auto;
          padding: 0 20px;
        }
        .stat-box { border-left: 3px solid #3b82f6; padding-left: 15px; }
        .founder-stats { display: flex; gap: 20px; margin-top: 25px; }
      `}</style>

      <style jsx global>{`
        body { margin: 0; background-color: #0b0d12; color: white; }
        a { text-decoration: none; transition: 0.2s; }
        a:hover { color: #3b82f6 !important; }
      `}</style>
    </div>
  );
}
