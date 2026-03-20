import { useEffect, useState, useRef } from 'react';
import { FaDiscord, FaTrophy, FaHome, FaShieldAlt, FaYoutube } from 'react-icons/fa';

export default function Home() {
  const [players, setPlayers] = useState([]);
  const [search, setSearch] = useState('');
  // New state to track which "page" we are on
  const [activeTab, setActiveTab] = useState('home'); 
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
              QUICKDROP <span className="logo-accent">NETWORK</span>
            </h1>
          </div>

          <div className="nav-center">
            {/* Added onClick events to swap views */}
            <a href="#" onClick={(e) => { e.preventDefault(); setActiveTab('home'); }}>
               <FaHome size={16} /> Home
            </a>
            <a href="#" onClick={(e) => { e.preventDefault(); setActiveTab('rankings'); }}>
               <FaTrophy size={14} /> Rankings
            </a>
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
               <a href="https://discord.gg/EKXHuKMXT4" target="_blank" rel="noreferrer"><FaDiscord size={20}/></a>
               <a href="https://www.youtube.com/@QuickdropTierlist" target="_blank" rel="noreferrer"><FaYoutube size={20}/></a>
             </div>
          </div>
        </div>
      </nav>

      {/* MAIN CONTENT */}
      <main className="page-wrapper">
        
        {/* Only show this content if activeTab is 'home' */}
        {activeTab === 'home' ? (
          <>
            {/* STAFF MEMBERS GRID */}
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

            {/* FOUNDER SECTION */}
            <div className="feature-card">
              <div className="card-left">
                <img src="https://minotar.net/helm/carinoh/120.png" alt="Carinoh" className="avatar-img" />
                <h2 className="name-text">Carinoh</h2>
                <div className="badge">Founder</div>
              </div>
              <div className="card-right">
                <h3 className="title-text">The Vision Behind <span className="logo-accent">Quickdrop</span></h3>
                <p className="bio-p">
                  As the founder of the Quickdrop Network, <strong>carinoh</strong> is the driving force behind our community's growth and direction.
                </p>
              </div>
            </div>

            {/* DEVELOPER SECTION */}
            <div className="feature-card">
              <div className="card-right">
                <h3 className="title-text">Mastering the <span className="logo-accent">Architecture</span></h3>
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
          </>
        ) : (
          /* THIS SHOWS WHEN RANKINGS IS CLICKED (Blank for now) */
          <div className="blank-state">
             <h2 className="title-text">Rankings</h2>
             <p className="bio-p">Rankings content will appear here soon...</p>
          </div>
        )}

      </main>

      <style jsx>{`
        :global(*) {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
          outline: none !important;
          -webkit-tap-highlight-color: transparent;
        }

        .container { background-color: #0b0d12; min-height: 100vh; color: white; font-family: 'Inter', sans-serif; }

        /* NAVBAR */
        .navbar { 
          padding: 25px 0; 
          background-color: #11141b; 
          border-bottom: 1px solid #1f232d;
          position: sticky; 
          top: 0; 
          z-index: 100; 
        }
        .nav-container { display: flex; align-items: center; max-width: 1400px; margin: 0 auto; padding: 0 30px; }
        
        .nav-left { flex: 1.5; text-align: left; }
        .logo-text { font-size: 1.8rem; font-weight: 950; letter-spacing: -1px; line-height: 1; }
        .logo-accent { color: #3b82f6; font-style: italic; font-weight: 900; }
        
        .nav-center { flex: 2; display: flex; gap: 30px; justify-content: center; }
        .nav-center a { display: flex; align-items: center; gap: 8px; color: #9ca3af; text-decoration: none; font-size: 0.95rem; font-weight: 600; transition: 0.2s; cursor: pointer; }
        .nav-center a:hover { color: white; }
        
        .nav-right { flex: 1.5; display: flex; align-items: center; justify-content: flex-end; gap: 15px; }

        .mini-search { position: relative; background: #080a0f; border: 1px solid #1f232d; border-radius: 8px; padding: 6px 12px; display: flex; align-items: center; }
        .mini-input { background: transparent; border: none; color: white; width: 130px; font-size: 0.8rem; }
        .mini-slash { background: #1f232d; padding: 0px 5px; border-radius: 4px; font-size: 0.7rem; color: #4b5563; margin-left: 5px;}

        .nav-socials { display: flex; gap: 12px; border-left: 1px solid #1f232d; padding-left: 15px; }
        .nav-socials a { color: #9ca3af; transition: 0.2s; }
        .nav-socials a:hover { color: white; }

        /* MAIN CONTENT */
        .page-wrapper { max-width: 1100px; margin: 40px auto; padding: 0 20px; display: flex; flex-direction: column; gap: 30px; }
        
        .blank-state { text-align: center; padding: 100px 0; border: 2px dashed #1f232d; border-radius: 20px; }

        .staff-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
        .staff-mini-card { background: #11141b; padding: 15px; border-radius: 12px; display: flex; align-items: center; gap: 15px; border: 1px solid #1f232d; }
        .staff-avatar { width: 45px; height: 45px; border-radius: 8px; }
        .staff-name { display: block; font-weight: 700; font-size: 1rem; }
        .staff-role { display: block; font-size: 0.7rem; color: #9ca3af; }

        .feature-card { 
          display: flex; 
          gap: 40px; 
          background: #11141b; 
          padding: 40px; 
          border-radius: 16px; 
          align-items: center;
          border: 1px solid #1f232d;
        }
        .card-left { text-align: center; min-width: 180px; }
        .card-right { flex: 1; }
        .avatar-img { 
          border-radius: 12px; 
          width: 110px; 
          margin-bottom: 12px; 
          filter: drop-shadow(0 0 10px rgba(59, 130, 246, 0.2));
        }
        .dev-glow { filter: drop-shadow(0 0 10px rgba(139, 92, 246, 0.2)); }
        
        .name-text { font-size: 1.5rem; margin-bottom: 6px; font-weight: 800; }
        .badge { background: #3b82f6; padding: 5px 12px; border-radius: 6px; font-size: 0.75rem; font-weight: 800; display: inline-block; }
        .dev-badge { background: #8b5cf6; }
        .title-text { font-size: 1.8rem; margin-bottom: 10px; font-weight: 800; }
        .bio-p { color: #9ca3af; font-size: 1rem; line-height: 1.5; }

        @media (max-width: 950px) {
          .nav-center { display: none; }
          .staff-grid { grid-template-columns: 1fr; }
          .feature-card { flex-direction: column; text-align: center; padding: 30px; }
        }
      `}</style>
    </div>
  );
}
