import { useEffect, useState, useRef, useCallback } from 'react';
import { FaDiscord, FaTrophy, FaHome, FaShieldAlt, FaYoutube, FaUsers, FaGithub, FaPlayCircle, FaExternalLinkAlt, FaCrown, FaMedal, FaClock, FaCode, FaSync } from 'react-icons/fa';
import Rankings from '../components/Rankings';

export default function Home() {
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState('home'); 
  const [players, setPlayers] = useState([]);
  const [queue, setQueue] = useState([]);
  const [loading, setLoading] = useState(false);
  const searchInput = useRef(null);

  const refreshData = useCallback(() => {
    if (activeTab === 'rankings' || activeTab === 'queue') {
      setLoading(true);
      const endpoint = activeTab === 'rankings' ? '/api/Rankings' : '/api/queue';
      
      fetch(endpoint)
        .then((res) => res.json())
        .then((data) => {
          if (activeTab === 'rankings') setPlayers(Array.isArray(data) ? data : []);
          if (activeTab === 'queue') setQueue(Array.isArray(data) ? data : []);
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
          if (activeTab === 'rankings') setPlayers([]);
          if (activeTab === 'queue') setQueue([]);
        });
    }
  }, [activeTab]);

  useEffect(() => {
    refreshData();
  }, [refreshData]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === '/' && document.activeElement !== searchInput.current) {
        e.preventDefault();
        searchInput.current.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const filteredPlayers = players.filter(p => 
    p.ign.toLowerCase().includes(search.toLowerCase())
  );

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
            <a href="#" className={activeTab === 'home' ? 'active' : ''} onClick={(e) => { e.preventDefault(); setActiveTab('home'); }}>
               <FaHome size={16} /> Home
            </a>
            <a href="#" className={activeTab === 'rankings' ? 'active' : ''} onClick={(e) => { e.preventDefault(); setActiveTab('rankings'); }}>
               <FaTrophy size={14} /> Rankings
            </a>
            <a href="#" className={activeTab === 'queue' ? 'active' : ''} onClick={(e) => { e.preventDefault(); setActiveTab('queue'); }}>
               <FaClock size={14} /> Queue
            </a>
            <a href="#" className={activeTab === 'staff' ? 'active' : ''} onClick={(e) => { e.preventDefault(); setActiveTab('staff'); }}>
               <FaUsers size={16} /> Staff
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
                <a href="https://discord.gg/EKXHuKMXT4" target="_blank" rel="noreferrer"><FaDiscord size={20}/></a>
                <a href="https://www.youtube.com/@QuickdropTierlist" target="_blank" rel="noreferrer"><FaYoutube size={20}/></a>
             </div>
          </div>
        </div>
      </nav>

      <main className="page-wrapper">
        
        {activeTab === 'home' && (
          <>
            <h2 className="staff-heading">The Lead Staff Team</h2>

            <div className="feature-card">
              <div className="card-left">
                <img src="https://minotar.net/helm/carinoh/120.png" alt="Carinoh" className="avatar-img founder-glow" />
                <h2 className="name-text">Carinoh</h2>
                <div className="badge"> Founder</div>
              </div>
              <div className="card-right">
                <h3 className="title-text">The Vision Behind <span className="logo-accent">Quickdrop</span></h3>
                <p className="bio-p">As the founder of the Quickdrop Network, Carinoh is the driving force behind our community's growth and direction.</p>
              </div>
            </div>

            <div className="feature-card">
              <div className="card-right">
                <h3 className="title-text">Mastering the <span className="logo-accent">Architecture</span></h3>
                <p className="bio-p">Meet Caackee, the Lead Developer. He ensures the Quickdrop infrastructure is optimized and safely working.</p>
              </div>
              <div className="card-left">
                <img src="https://minotar.net/helm/Caackee/120.png" alt="Caackee" className="avatar-img dev-glow" />
                <h2 className="name-text">Caackee</h2>
                <div className="badge dev-badge"> Lead Developer</div>
              </div>
            </div>

            <div className="spacer"></div>

            <div className="testers-container">
              <h2 className="staff-heading">Testers of the Month</h2>
              <div className="tester-podium">
                <div className="tester-card t-rank-2 silver-glow">
                  <div className="tester-header">
                    <FaMedal color="#94a3b8" size={24} />
                    <span className="tester-rank">#2</span>
                  </div>
                  <img src="https://minotar.net/helm/Carinoh/80.png" alt="Carinoh" className="tester-img" />
                  <h4 className="tester-name">Carinoh</h4>
                  <p className="tester-bio">Outstanding performance in tests and tickets.</p>
                  <div className="tester-stat">Completed tests: <span className="stat-highlight">56</span></div>
                </div>

                <div className="tester-card t-rank-1">
                  <div className="tester-header">
                    <FaCrown color="#fbbf24" size={32} />
                    <span className="tester-rank rank-gold">#1</span>
                  </div>
                  <img src="https://minotar.net/helm/Caackee/100.png" alt="Caackee" className="tester-img champion-glow" />
                  <h4 className="tester-name">Caackee</h4>
                  <p className="tester-bio">Outstanding dedication to the community testing phase.</p>
                  <div className="tester-stat">Completed tests: <span className="stat-highlight">69</span></div>
                </div>

                <div className="tester-card t-rank-3 bronze-style">
                  <div className="tester-header">
                    <FaMedal color="#cd7f32" size={24} />
                    <span className="tester-rank">#3</span>
                  </div>
                  <img src="https://minotar.net/helm/ItzStormzy_/80.png" alt="ItzStormzy_" className="tester-img" />
                  <h4 className="tester-name">ItzStormzy_</h4>
                  <p className="tester-bio">Excellent speed and focus on edge-case scenarios.</p>
                  <div className="tester-stat">Completed tests: <span className="stat-highlight">42</span></div>
                </div>
              </div>
            </div>

            {/* CLIP OF THE WEEK SECTION */}
            <div className="clip-section">
              <h2 className="clip-heading">CLIP OF THE WEEK</h2>
              <div className="clip-card">
                <div className="clip-icon-wrapper">
                   <div className="clip-blue-circle"></div>
                </div>
                <div className="clip-content">
                   <div className="clip-badge">CLIP OF THE WEEK</div>
                   <h3 className="clip-title">Insane Shield Disable</h3>
                   <p className="clip-desc">
                     This clip was made by <strong>PlayerName</strong>. Watch how they perfectly timed the axe swap to secure the quickdrop.
                   </p>
                   <a href="#" className="clip-btn">
                     Click to Visit <FaExternalLinkAlt size={12} />
                   </a>
                </div>
              </div>
            </div>
          </>
        )}

        {/* ... Other Tabs (Rankings, Queue, Staff) remain identical ... */}

      </main>

      <style jsx>{`
        /* ... Global and Base styles from previous version ... */
        :global(html), :global(body) { background-color: #0b0d12 !important; margin: 0; padding: 0; min-height: 100%; }
        .container { background-color: #0b0d12; min-height: 100vh; color: white; font-family: 'Inter', sans-serif; }
        .navbar { padding: 25px 0; background-color: #11141b; border-bottom: 1px solid #1f232d; position: sticky; top: 0; z-index: 100; }
        .nav-container { display: flex; align-items: center; max-width: 1400px; margin: 0 auto; padding: 0 30px; }
        .logo-text { font-size: 1.8rem; font-weight: 950; letter-spacing: -1px; }
        .logo-accent { color: #3b82f6; font-style: italic; }
        .nav-center { flex: 2; display: flex; gap: 30px; justify-content: center; }
        .nav-center a { display: flex; align-items: center; gap: 8px; color: #9ca3af; text-decoration: none; font-size: 0.95rem; font-weight: 600; }
        .nav-center a.active { color: white; }

        .founder-glow { border: 2px solid #3b82f6; box-shadow: 0 0 20px rgba(59, 130, 246, 0.4); }
        .dev-glow { border: 2px solid #8b5cf6; box-shadow: 0 0 15px rgba(139, 92, 246, 0.3); }

        /* PODIUM STYLES */
        .tester-podium { display: flex; justify-content: center; align-items: flex-start; gap: 20px; margin-top: 80px; }
        .tester-card { background: #11141b; border: 1px solid #1f232d; border-radius: 16px; padding: 25px; text-align: center; flex: 1; max-width: 280px; }
        
        .t-rank-1 { order: 2; transform: translateY(-40px); border: 2px solid #fbbf24; z-index: 3; }
        .t-rank-2 { order: 1; transform: translateY(20px); z-index: 2; }
        .t-rank-3 { order: 3; transform: translateY(80px); z-index: 1; }

        /* METALLIC SILVER GLOW FOR #2 */
        .silver-glow { border: 2px solid #94a3b8; box-shadow: 0 0 15px rgba(148, 163, 184, 0.3); }
        
        /* BRONZE STYLE FOR #3 */
        .bronze-style { border-color: #cd7f32; }

        .champion-glow { filter: drop-shadow(0 0 15px rgba(251, 191, 36, 0.3)); border: 2px solid #fbbf24; }
        .tester-img { border-radius: 12px; margin-bottom: 15px; border: 1px solid #1f232d; }
        .tester-bio { font-size: 0.8rem; color: #9ca3af; margin-bottom: 15px; min-height: 40px; }
        .stat-highlight { color: #3b82f6; font-weight: 900; }

        /* CLIP OF THE WEEK STYLES */
        .clip-section { margin-top: 100px; text-align: center; padding-bottom: 60px; }
        .clip-heading { font-size: 2rem; font-weight: 950; color: #3b82f6; margin-bottom: 30px; letter-spacing: 2px; }
        .clip-card { 
          background: #11141b; 
          border: 1px solid #1f232d; 
          border-radius: 20px; 
          max-width: 800px; 
          margin: 0 auto; 
          padding: 30px; 
          display: flex; 
          align-items: center; 
          gap: 30px;
          box-shadow: 0 0 30px rgba(59, 130, 246, 0.1);
          text-align: left;
        }
        .clip-blue-circle { 
          width: 80px; 
          height: 80px; 
          background: #3b82f6; 
          border-radius: 50%; 
          box-shadow: 0 0 20px #3b82f688; 
        }
        .clip-badge { 
          background: #1e293b; 
          color: #3b82f6; 
          font-size: 0.7rem; 
          font-weight: 900; 
          padding: 4px 10px; 
          border-radius: 20px; 
          display: inline-block;
          margin-bottom: 10px;
          border: 1px solid #3b82f644;
        }
        .clip-title { font-size: 1.5rem; font-weight: 900; margin-bottom: 10px; color: white; }
        .clip-desc { color: #9ca3af; font-size: 0.95rem; line-height: 1.5; margin-bottom: 20px; }
        .clip-btn { 
          background: #3b82f6; 
          color: white; 
          padding: 10px 25px; 
          border-radius: 10px; 
          text-decoration: none; 
          font-weight: 700; 
          display: inline-flex; 
          align-items: center; 
          gap: 10px;
          transition: 0.2s;
        }
        .clip-btn:hover { background: #2563eb; transform: translateY(-2px); }

        @media (max-width: 768px) {
          .tester-podium { flex-direction: column; align-items: center; }
          .t-rank-1, .t-rank-2, .t-rank-3 { transform: none; order: unset; margin-bottom: 20px; }
          .clip-card { flex-direction: column; text-align: center; }
        }
      `}</style>
    </div>
  );
}
