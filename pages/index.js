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
        
        {/* 1. STAFF MEMBERS GRID */}
        <section className="staff-section">
          <div className="staff-grid">
            {['Staff1', 'Staff2', 'Staff3'].map((staff) => (
              <div key={staff} className="staff-mini-card">
                <img src={`https://minotar.net/helm/${staff}/60.png`} alt={staff} className="staff-avatar" />
                <div className="staff-info">
                  <span className="staff-name">{staff}</span>
                  <span className="staff-role">Moderator</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 2. FOUNDER SECTION */}
        <div className="feature-card">
          <div className="card-left">
            <img src="https://minotar.net/helm/carinoh/120.png" alt="carinoh" className="avatar-img" />
            <h2 className="name-text">carinoh</h2>
            <div className="badge">Founder</div>
          </div>
          <div className="card-right">
            <h3 className="title-text">The Vision Behind <span style={{ color: '#3b82f6' }}>Quickdrop</span></h3>
            <p className="bio-p">
              As the founder of the Quickdrop Network, <strong>carinoh</strong> is the driving force behind our community's growth and direction.
            </p>
          </div>
        </div>

        {/* 3. DEVELOPER SECTION */}
        <div className="feature-card developer-section">
          <div className="card-right">
            <h3 className="title-text">Mastering the <span style={{ color: '#3b82f6' }}>Architecture</span></h3>
            <p className="bio-p">
              Meet <strong>Caackee</strong>, the Lead Developer. He ensures the Quickdrop infrastructure is optimized and innovative.
            </p>
          </div>
          <div className="card-left">
            <img src="https://minotar.net/helm/Caackee/120.png" alt="Caackee" className="avatar-img dev-glow" />
            <h2 className="name-text">Caackee</h2>
            <div className="badge dev-badge">Developer</div>
          </div>
        </div>

      </main>

      <style jsx>{`
        /* THE "OUTLINE KILLER" */
        :global(*) {
          outline: none !important;
          box-shadow: none !important;
          -webkit-tap-highlight-color: transparent;
        }

        :global(input:focus), :global(a:focus) {
          outline: none !important;
          border-color: transparent !important;
        }

        .container { background-color: #0b0d12; min-height: 100vh; color: white; font-family: 'Inter', sans-serif; }

        /* NAVBAR - CENTERED LAYOUT */
        .navbar { padding: 15px 40px; background-color: #11141b; border-bottom: 1px solid #1f232d; position: sticky; top: 0; z-index: 100; }
        .nav-container { display: flex; align-items: center; justify-content: space-between; max-width: 1400px; margin: 0 auto; }
        
        .nav-left { flex: 1; }
        .logo-text { font-size: 1.4rem; font-weight: 900; margin: 0; white-space: nowrap; }
        
        .nav-center { flex: 2; display: flex; gap: 40px; justify-content: center; color: #9ca3af; font-size: 0.95rem; font-weight: 600; }
        .nav-center a { display: flex; align-items: center; gap: 8px; color: inherit; text-decoration: none; transition: 0.2s; }
        .nav-center a:hover { color: white; }
        
        .nav-right { flex: 1; display: flex; align-items: center; justify-content: flex-end; gap: 20px; }

        /* SEARCH BAR */
        .mini-search { position: relative; background: #080a0f; border: 1px solid #1f232d; border-radius: 10px; padding: 8px 15px; width: 200px; }
        .mini-input { background: transparent; border: none; color: white; width: 100%; font-size: 0.85rem; }
        .mini-slash { position: absolute; right: 10px; top: 50%; transform: translateY(-50%); background: #1f232d; padding: 1px 6px; border-radius: 4px; font-size: 0.7rem; color: #4b5563; }

        .page-wrapper { max-width: 1100px; margin: 40px auto; padding: 0 20px; display: flex; flex-direction: column; gap: 60px; }

        /* STAFF GRID */
        .staff-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; }
        .staff-mini-card { background: #11141b; border: 1px solid #1f232d; padding: 12px; border-radius: 10px; display: flex; align-items: center; gap: 12px; }
        .staff-avatar { width: 40px; height: 40px; border-radius: 6px; }
        .staff-name { display: block; font-weight: 700; font-size: 0.9rem; }
        .staff-role { display: block; font-size: 0.65rem; color: #3b82f6; text-transform: uppercase; font-weight: 800; }

        /* FEATURE CARDS */
        .feature-card { display: flex; gap: 40px; background: #11141b; padding: 40px; border-radius: 20px; border: none; align-items: center; filter: drop-shadow(0 4px 20px rgba(0,0,0,0.5)); }
        .card-left { text-align: center; min-width: 180px; }
        .card-right { flex: 1; }
        
        .avatar-img { 
           border-radius: 12px; 
           width: 100px; 
           border: 1px solid #1f232d; 
           filter: drop-shadow(0 0 10px rgba(59, 130, 246, 0.25));
        }
        
        .dev-glow { filter: drop-shadow(0 0 10px rgba(139, 92, 246, 0.25)); }
        .dev-badge { background: #8b5cf6 !important; }
        .name-text { font-size: 1.6rem; margin: 12px 0 5px; }
        .badge { background: #3b82f6; padding: 4px 12px; border-radius: 5px; font-size: 0.7rem; font-weight: 900; }
        .title-text { font-size: 2rem; margin: 0 0 12px; font-weight: 800; }
        .bio-p { color: #9ca3af; font-size: 1.05rem; line-height: 1.6; }

        /* MOBILE FIXES */
        @media (max-width: 900px) {
          .nav-container { flex-direction: column; gap: 15px; text-align: center; }
          .nav-center { gap: 15px; }
          .nav-right { justify-content: center; width: 100%; }
          .feature-card { flex-direction: column !important; text-align: center; padding: 30px; }
          .developer-section .card-right { order: 2; }
          .developer-section .card-left { order: 1; }
        }
      `}</style>
    </div>
  );
}
