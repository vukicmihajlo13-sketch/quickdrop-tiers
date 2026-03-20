import { useEffect, useState, useRef } from 'react';
import { FaDiscord, FaTrophy, FaHome, FaShieldAlt, FaYoutube, FaUsers, FaGithub, FaPlayCircle, FaExternalLinkAlt } from 'react-icons/fa';

export default function Home() {
  const [players, setPlayers] = useState([]);
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState('home'); 
  const searchInput = useRef(null);

  // Editable Clip Data
  const clipData = {
    title: "Insane Shield Disable",
    creator: "PlayerName",
    description: "Watch how they perfectly timed the axe swap to secure the quickdrop.",
    link: "https://youtube.com/your-clip-link"
  };

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
            <a href="#" onClick={(e) => { e.preventDefault(); setActiveTab('home'); }}>
               <FaHome size={16} /> Home
            </a>
            <a href="#" onClick={(e) => { e.preventDefault(); setActiveTab('rankings'); }}>
               <FaTrophy size={14} /> Rankings
            </a>
            <a href="#" onClick={(e) => { e.preventDefault(); setActiveTab('staff'); }}>
               <FaUsers size={16} /> Staff
            </a>
            <a href="#" onClick={(e) => { e.preventDefault(); setActiveTab('kits'); }}>
               <FaShieldAlt size={14} /> Kits
            </a>
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
               <a href="https://github.com" target="_blank" rel="noreferrer"><FaGithub size={20}/></a>
               <a href="https://discord.gg/EKXHuKMXT4" target="_blank" rel="noreferrer"><FaDiscord size={20}/></a>
               <a href="https://www.youtube.com/@QuickdropTierlist" target="_blank" rel="noreferrer"><FaYoutube size={20}/></a>
             </div>
          </div>
        </div>
      </nav>

      {/* MAIN CONTENT */}
      <main className="page-wrapper">
        
        {activeTab === 'home' && (
          <>
            {/* CLIP OF THE WEEK SECTION */}
            <div className="clip-card">
              <div className="clip-icon">
                <FaPlayCircle size={40} color="#3b82f6" />
              </div>
              <div className="clip-content">
                <div className="clip-header">
                   <span className="clip-badge">CLIP OF THE WEEK</span>
                   <h3 className="clip-title">{clipData.title}</h3>
                </div>
                <p className="clip-description">
                  This clip was made by <strong>{clipData.creator}</strong>. {clipData.description}
                </p>
                <a href={clipData.link} target="_blank" rel="noreferrer" className="clip-link-btn">
                  Click to Visit <FaExternalLinkAlt size={12} style={{marginLeft: '8px'}} />
                </a>
              </div>
            </div>

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
        )}

        {/* ... (rest of the activeTab sections for staff, rankings, kits remain same) */}

      </main>

      <style jsx>{`
        /* ... (previous styles) */

        /* CLIP CARD STYLES */
        .clip-card {
          display: flex;
          align-items: center;
          gap: 25px;
          background: linear-gradient(135deg, #11141b 0%, #161a24 100%);
          padding: 30px;
          border-radius: 16px;
          border: 1px solid #1f232d;
          border-left: 4px solid #3b82f6;
          margin-bottom: 10px;
        }
        .clip-icon { background: #080a0f; padding: 20px; border-radius: 12px; display: flex; align-items: center; justify-content: center; }
        .clip-content { flex: 1; }
        .clip-header { display: flex; align-items: center; gap: 15px; margin-bottom: 10px; }
        .clip-badge { background: rgba(59, 130, 246, 0.1); color: #3b82f6; padding: 4px 10px; border-radius: 4px; font-size: 0.7rem; font-weight: 900; letter-spacing: 1px; }
        .clip-title { font-size: 1.4rem; font-weight: 800; }
        .clip-description { color: #9ca3af; margin-bottom: 20px; font-size: 1rem; line-height: 1.5; }
        
        .clip-link-btn { 
          display: inline-flex; 
          align-items: center; 
          background: #3b82f6; 
          color: white; 
          text-decoration: none; 
          padding: 10px 20px; 
          border-radius: 8px; 
          font-weight: 700; 
          font-size: 0.9rem; 
          transition: 0.2s;
        }
        .clip-link-btn:hover { background: #2563eb; transform: translateY(-2px); }

        /* ... (rest of the CSS) */
      `}</style>
    </div>
  );
}
