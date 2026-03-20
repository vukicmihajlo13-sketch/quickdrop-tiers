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
          
          {/* 1. LOGO */}
          <div className="nav-left">
            <h1 className="logo-text">
              QUICKDROP <span style={{ color: '#3b82f6' }}>NETWORK</span>
            </h1>
          </div>

          {/* 2. CENTER LINKS */}
          <div className="nav-center">
            <a href="/"><FaHome size={16} /> Home</a>
            <a href="#rankings"><FaTrophy size={14} /> Rankings</a>
            <a href="https://discord.gg/EKXHuKMXT4" target="_blank" rel="noreferrer"><FaDiscord size={16} /> Discord</a>
            <a href="#kits"><FaShieldAlt size={14} /> Kits</a>
            <a href="#"><FaFileAlt size={14} /> API Docs</a>
          </div>

          {/* 3. SEARCH & SOCIALS */}
          <div className="nav-right">
             <div className="mini-search">
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
             <div className="nav-socials">
               <a href="https://discord.gg/EKXHuKMXT4" target="_blank" rel="noreferrer"><FaDiscord size={22}/></a>
               <a href="https://www.youtube.com/@QuickdropTierlist" target="_blank" rel="noreferrer"><FaYoutube size={22}/></a>
             </div>
          </div>
        </div>
      </nav>

      {/* FOUNDER SECTION */}
      <main className="page-wrapper">
        <div className="founder-card">
          {/* Avatar side */}
          <div className="founder-left">
            <img 
              src="https://minotar.net/helm/carinoh/120.png" 
              alt="carinoh" 
              className="avatar-img"
            />
            <h2 className="name-text">carinoh</h2>
            <div className="badge">Founder</div>
          </div>

          {/* Bio side */}
          <div className="founder-right">
            <h3 className="title-text">
              The Vision Behind <span style={{ color: '#3b82f6' }}>Quickdrop</span>
            </h3>
            <p className="bio-p">
              As the founder of the Quickdrop Network, <strong>carinoh</strong> is the driving force behind our community's growth and direction. With a focus on high-tier competitive play, he has built an environment where the best players thrive.
            </p>
            
            <div className="stats-row">
              <div className="stat">
                <span className="label">Established</span>
                <span className="value">Network Leadership</span>
              </div>
              <div className="stat">
                <span className="label">Focus</span>
                <span className="value">Community Expansion</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      <style jsx>{`
        /* NAVBAR DESKTOP */
        .navbar {
          padding: 15px 40px;
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
          max-width: 1600px;
          margin: 0 auto;
        }
        .logo-text { font-size: 1.4rem; font-weight: 900; text-transform: uppercase; margin: 0; white-space: nowrap; }
        .nav-center { display: flex; gap: 30px; color: #9ca3af; font-weight: 600; font-size: 0.95rem; }
        .nav-center a { display: flex; align-items: center; gap: 8px; color: inherit; }
        .nav-right { display: flex; align-items: center; gap: 20px; }
        .nav-socials { display: flex; gap: 15px; color: #9ca3af; }

        /* MINI SEARCH BAR */
        .mini-search {
          position: relative;
          background: #080a0f;
          border: 1px solid #1f232d;
          border-radius: 10px;
          padding: 8px 15px;
          width: 240px;
        }
        .mini-input { background: transparent; border: none; color: white; outline: none; width: 100%; font-size: 0.9rem; }
        .mini-slash { position: absolute; right: 10px; top: 50%; transform: translateY(-50%); background: #1f232d; padding: 2px 8px; border-radius: 5px; font-size: 0.75rem; color: #4b5563; }

        /* FOUNDER CARD PC */
        .page-wrapper { max-width: 1200px; margin: 60px auto; padding: 0 20px; }
        .founder-card {
          display: flex;
          gap: 50px;
          background: #11141b;
          padding: 50px;
          border-radius: 25px;
          border: 1px solid #1f232d;
          align-items: center;
        }
        .founder-left { text-align: center; min-width: 200px; }
        .avatar-img { border-radius: 15px; width: 120px; box-shadow: 0 0 30px rgba(59, 130, 246, 0.3); border: 2px solid #1f232d; }
        .name-text { font-size: 1.8rem; margin: 15px 0 5px; }
        .badge { background: #3b82f6; display: inline-block; padding: 5px 15px; border-radius: 6px; font-size: 0.75rem; font-weight: 900; text-transform: uppercase; }
        
        .founder-right { flex: 1; }
        .title-text { font-size: 2.5rem; margin: 0 0 15px; font-weight: 800; }
        .bio-p { color: #9ca3af; font-size: 1.15rem; line-height: 1.8; margin-bottom: 30px; }
        .stats-row { display: flex; gap: 40px; }
        .stat { border-left: 3px solid #3b82f6; padding-left: 20px; }
        .label { display: block; color: #4b5563; font-size: 0.75rem; font-weight: 800; text-transform: uppercase; margin-bottom: 5px; }
        .value { font-size: 1.1rem; font-weight: 700; }

        /* MOBILE OVERRIDES */
        @media (max-width: 1100px) {
          .nav-container { flex-direction: column; gap: 15px; }
          .nav-center { gap: 15px; flex-wrap: wrap; justify-content: center; font-size: 0.85rem; }
          .mini-search { width: 100%; max-width: 400px; }
          .founder-card { flex-direction: column; text-align: center; padding: 30px; gap: 30px; }
          .stats-row { flex-direction: column; align-items: center; gap: 20px; }
          .stat { border-left: none; border-top: 3px solid #3b82f6; padding: 15px 0 0; width: 100%; }
          .title-text { font-size: 1.8rem; }
        }
      `}</style>
    </div>
  );
}
