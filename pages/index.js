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
          
          {/* 1. LOGO (Left Column) */}
          <div className="nav-column align-left">
            <h1 className="logo-text">
              QUICKDROP <span style={{ color: '#3b82f6' }}>NETWORK</span>
            </h1>
          </div>

          {/* 2. LINKS (Center Column - Dead Center) */}
          <div className="nav-column align-center">
            <div className="nav-links">
              <a href="/"><FaHome size={16} /> Home</a>
              <a href="#rankings"><FaTrophy size={14} /> Rankings</a>
              <a href="https://discord.gg/EKXHuKMXT4" target="_blank" rel="noreferrer"><FaDiscord size={16} /> Discord</a>
              <a href="#kits"><FaShieldAlt size={14} /> Kits</a>
              <a href="#"><FaFileAlt size={14} /> API Docs</a>
            </div>
          </div>

          {/* 3. SOCIALS (Right Column) */}
          <div className="nav-column align-right">
             <div className="social-icons">
               <a href="https://discord.gg/EKXHuKMXT4" target="_blank" rel="noreferrer"><FaDiscord size={22}/></a>
               <a href="https://www.youtube.com/@QuickdropTierlist" target="_blank" rel="noreferrer"><FaYoutube size={22}/></a>
             </div>
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
        .navbar {
          padding: 15px 30px;
          background-color: #11141b;
          border-bottom: 1px solid #1f232d;
          position: sticky;
          top: 0;
          z-index: 100;
        }
        .nav-container {
          display: grid;
          grid-template-columns: 1fr 2fr 1fr; /* Creates three equal zones */
          align-items: center;
          max-width: 1400px;
          margin: 0 auto;
        }
        .nav-column { display: flex; align-items: center; }
        .align-left { justify-content: flex-start; }
        .align-center { justify-content: center; }
        .align-right { justify-content: flex-end; }

        .logo-text { font-size: 1.4rem; font-weight: 900; text-transform: uppercase; margin: 0; white-space: nowrap; }
        .nav-links { display: flex; gap: 25px; font-weight: 600; color: #9ca3af; font-size: 0.95rem; }
        .nav-links a { display: flex; align-items: center; gap: 8px; color: inherit; }
        .social-icons { display: flex; gap: 15px; color: #9ca3af; }
        
        /* SEARCH BAR */
        .search-container { display: flex; justify-content: center; margin-top: 20px; }
        .search-wrapper { position: relative; width: 100%; max-width: 800px; }
        .search-input { 
          width: 100%; padding: 14px 22px; border-radius: 12px; border: 1px solid #1f232d; 
          background-color: #080a0f; color: white; outline: none; font-size: 1rem;
        }
        .search-slash { position: absolute; right: 18px; top: 50%; transform: translateY(-50%); background: #1f232d; padding: 2px 10px; border-radius: 6px; font-size: 0.8rem; color: #4b5563; }

        /* FOUNDER SECTION */
        .founder-card-container {
          display: flex; gap: 50px; align-items: center; background-color: #11141b;
          padding: 50px; border-radius: 24px; border: 1px solid #1f232d; position: relative; overflow: hidden;
        }
        .founder-avatar { border-radius: 12px; width: 110px; box-shadow: 0 0 25px rgba(59, 130, 246, 0.4); border: 2px solid #1f232d; }
        .founder-badge { background: #3b82f6; padding: 5px 14px; border-radius: 6px; font-size: 0.75rem; font-weight: 900; margin-top: 15px; text-transform: uppercase; }
        .founder-title { font-size: 2.2rem; margin-bottom: 15px; font-weight: 800; }
        .founder-p { font-size: 1.1rem; color: #9ca3af; line-height: 1.7; }
        
        .founder-stats { display: flex; gap: 30px; margin-top: 30px; }
        .stat-box { border-left: 3px solid #3b82f6; padding-left: 20px; } /* Increased padding here */
        .stat-label { display: block; color: #4b5563; font-size: 0.7rem; font-weight: 800; text-transform: uppercase; margin-bottom: 4px; }
        .stat-value { font-size: 1.1rem; font-weight: 700; }

        /* MOBILE FIXES */
        @media (max-width: 1000px) {
          .nav-container { grid-template-columns: 1fr; gap: 15px; }
          .align-left, .align-center, .align-right { justify-content: center; }
          .founder-card-container { flex-direction: column; text-align: center; padding: 30px; }
          .founder-stats { flex-direction: column; align-items: center; gap: 20px; }
          .stat-box { border-left: none; border-top: 3px solid #3b82f6; padding: 15px 0 0 0; }
        }
      `}</style>

      <style jsx global>{`
        body { margin: 0; background-color: #0b0d12; color: white; }
        a { text-decoration: none; transition: 0.2s; }
        a:hover { color: white !important; }
      `}</style>
    </div>
  );
}
