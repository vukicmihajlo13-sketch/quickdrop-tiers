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
    <div className="container">
      
      {/* NAVBAR */}
      <nav className="navbar">
        <div className="nav-container">
          
          <div className="nav-left">
            <h1 className="logo-text">
              QUICKDROP <span style={{ color: '#3b82f6' }}>NETWORK</span>
            </h1>
          </div>

          <div className="nav-center">
            <a href="/"><FaHome size={16} /> Home</a>
            <a href="#rankings"><FaTrophy size={14} /> Rankings</a>
            <a href="https://discord.gg/EKXHuKMXT4" target="_blank" rel="noreferrer"><FaDiscord size={16} /> Discord</a>
            <a href="#kits"><FaShieldAlt size={14} /> Kits</a>
            <a href="#"><FaFileAlt size={14} /> API Docs</a>
          </div>

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

      {/* MAIN CONTENT */}
      <main className="page-wrapper">
        <div className="founder-card">
          <div className="founder-left">
            <img 
              src="https://minotar.net/helm/carinoh/120.png" 
              alt="carinoh" 
              className="avatar-img"
            />
            <h2 className="name-text">carinoh</h2>
            <div className="badge">Founder</div>
          </div>

          <div className="founder-right">
            <h3 className="title-text">
              The Vision Behind <span style={{ color: '#3b82f6' }}>Quickdrop</span>
            </h3>
            <p className="bio-p">
              As the founder of the Quickdrop Network, <strong>carinoh</strong> is the driving force behind our community's growth and direction.
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
        .container {
          background-color: #0b0d12;
          min-height: 100vh;
          color: white;
          font-family: 'Inter', sans-serif;
        }

        /* STRIP ALL OUTLINES & BORDERS */
        * {
          outline: none !important;
          -webkit-tap-highlight-color: transparent;
        }

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

        .logo-text { font-size: 1.4rem; font-weight: 900; margin: 0; }
        .nav-center { display: flex; gap: 30px; color: #9ca3af; font-size: 0.95rem; }
        .nav-center a { display: flex; align-items: center; gap: 8px; color: inherit; text-decoration: none; }
        .nav-right { display: flex; align-items: center; gap: 20px; }
        .nav-socials { display: flex; gap: 15px; color: #9ca3af; }

        .mini-search {
          position: relative;
          background: #080a0f;
          border: 1px solid #1f232d;
          border-radius: 10px;
          padding: 8px 15px;
          width: 240px;
        }

        .mini-input {
          background: transparent;
          border: none;
          color: white;
          width: 100%;
          font-size: 0.9rem;
        }

        /* FOUNDER SECTION */
        .page-wrapper { max-width: 1200px; margin: 60px auto; padding: 0 20px; }
        .founder-card {
          display: flex;
          gap: 50px;
          background: #11141b;
          padding: 50px;
          border-radius: 25px;
          border: 1px solid #1f232d;
          align-items: center;
          box-shadow: none; /* Removed shadow that might look like a border */
        }

        .avatar-img { 
          border-radius: 15px; 
          width: 120px; 
          border: 1px solid #1f232d;
          box-shadow: 0 10px 30px -10px rgba(59, 130, 246, 0.5); /* Softened glow */
        }

        .name-text { font-size: 1.8rem; margin: 15px 0 5px; }
        .badge { background: #3b82f6; padding: 5px 15px; border-radius: 6px; font-size: 0.75rem; font-weight: 900; }
        
        .title-text { font-size: 2.5rem; margin: 0 0 15px; font-weight: 800; }
        .bio-p { color: #9ca3af; font-size: 1.15rem; line-height: 1.8; margin-bottom: 30px; }
        .stats-row { display: flex; gap: 40px; }
        .stat { border-left: 3px solid #3b82f6; padding-left: 20px; }
        .label { display: block; color: #4b5563; font-size: 0.75rem; font-weight: 800; text-transform: uppercase; }
        .value { font-size: 1.1rem; font-weight: 700; }

        @media (max-width: 1100px) {
          .nav-container { flex-direction: column; gap: 15px; padding: 10px 0; }
          .nav-center { gap: 15px; flex-wrap: wrap; justify-content: center; }
          .mini-search { width: 90%; }
          .founder-card { flex-direction: column; text-align: center; padding: 30px; }
          .stats-row { flex-direction: column; align-items: center; gap: 20px; }
          .stat { border-left: none; border-top: 3px solid #3b82f6; padding: 15px 0 0; width: 100%; }
        }
      `}</style>

      <style jsx global>{`
        body { margin: 0; background-color: #0b0d12; }
      `}</style>
    </div>
  );
}
