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
                <a href="https://discord.gg/EKXHuKMXT4" target="_blank" rel="noreferrer" className="social-discord"><FaDiscord size={22}/></a>
                <a href="https://www.youtube.com/@QuickdropTierlist" target="_blank" rel="noreferrer" className="social-youtube"><FaYoutube size={22}/></a>
                <a href="https://github.com" target="_blank" rel="noreferrer" className="social-github"><FaGithub size={22}/></a>
             </div>
          </div>
        </div>
      </nav>

      <main className="page-wrapper">
        
        {activeTab === 'home' && (
          <>
            <h2 className="staff-heading">The Lead Staff Team</h2>

            {/* FOUNDER */}
            <div className="feature-card founder-animated-glow">
              <div className="card-left">
                <img src="https://minotar.net/helm/carinoh/120.png" alt="Carinoh" className="avatar-img" />
                <h2 className="name-text">Carinoh</h2>
                <div className="badge"> Founder</div>
              </div>
              <div className="card-right">
                <h3 className="title-text">The Vision Behind <span className="logo-accent">Quickdrop</span></h3>
                <p className="bio-p">As the founder of the Quickdrop Network, Carinoh is the driving force behind our community's growth and direction.</p>
              </div>
            </div>

            {/* LEAD DEVELOPER */}
            <div className="feature-card dev-animated-glow">
              <div className="card-right">
                <h3 className="title-text">Mastering the <span className="logo-accent">Architecture</span></h3>
                <p className="bio-p">Meet Caackee, the Lead Developer. He ensures the Quickdrop infrastructure is optimized and safely working.</p>
              </div>
              <div className="card-left">
                <img src="https://minotar.net/helm/Caackee/120.png" alt="Caackee" className="avatar-img" />
                <h2 className="name-text">Caackee</h2>
                <div className="badge dev-badge"> Lead Developer</div>
              </div>
            </div>

            {/* NEW STAFF: ignStormz with PINK GLOW */}
            <div className="feature-card stormz-animated-glow">
              <div className="card-left">
                <img src="https://minotar.net/helm/ignStormz/120.png" alt="ignStormz" className="avatar-img" />
                <h2 className="name-text">ignStormz</h2>
                <div className="badge pink-badge"> Manager</div>
              </div>
              <div className="card-right">
                <h3 className="title-text">Managing the <span className="logo-accent">Server</span></h3>
                <p className="bio-p">Working alongside the lead team, ignStormz focuses on managing ranks, permissions and brings order.</p>
              </div>
            </div>

            <div className="spacer"></div>

            <div className="testers-container">
              <h2 className="staff-heading">Testers of the Month</h2>
              <div className="tester-podium">
                <div className="tester-card t-rank-side silver-glow">
                  <div className="tester-header">
                    <FaMedal color="#94a3b8" size={24} />
                    <span className="tester-rank">#2</span>
                  </div>
                  <img src="https://minotar.net/helm/Carinoh/80.png" alt="Carinoh" className="tester-img" />
                  <h4 className="tester-name">Carinoh</h4>
                  <div className="tester-stat">Completed tests: <span className="stat-highlight">56</span></div>
                </div>

                <div className="tester-card t-rank-top">
                  <div className="tester-header">
                    <FaCrown color="#fbbf24" size={32} />
                    <span className="tester-rank rank-gold">#1</span>
                  </div>
                  <img src="https://minotar.net/helm/Caackee/100.png" alt="Caackee" className="tester-img champion-glow" />
                  <h4 className="tester-name">Caackee</h4>
                  <div className="tester-stat">Completed tests: <span className="stat-highlight">69</span></div>
                </div>

                <div className="tester-card t-rank-side bronze-style">
                  <div className="tester-header">
                    <FaMedal color="#cd7f32" size={24} />
                    <span className="tester-rank">#3</span>
                  </div>
                  <img src="https://minotar.net/helm/ItzStormzy_/80.png" alt="ItzStormzy_" className="tester-img" />
                  <h4 className="tester-name">ItzStormzy_</h4>
                  <div className="tester-stat">Completed tests: <span className="stat-highlight">42</span></div>
                </div>
              </div>
            </div>

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

        {activeTab === 'rankings' && (
          <div className="rankings-tab-view bracket-container">
              <div className="tab-header-flex">
                <h2 className="staff-heading">Official Rankings</h2>
                <div className="bracket-right-action">
                    <button className={`sync-btn 3d-refresh-purple ${loading ? 'syncing' : ''}`} onClick={refreshData}>
                    <FaSync />
                    </button>
                </div>
              </div>
              {loading ? (
                <div className="loading-state">Syncing with database...</div>
              ) : (
                <Rankings players={filteredPlayers} />
              )}
          </div>
        )}

        {activeTab === 'queue' && (
          <div className="rankings-tab-view bracket-container">
              <div className="tab-header-flex">
                <h2 className="staff-heading">Live Testing Queue</h2>
                <div className="bracket-right-action">
                    <button className={`sync-btn 3d-refresh-purple ${loading ? 'syncing' : ''}`} onClick={refreshData}>
                    <FaSync />
                    </button>
                </div>
              </div>
              <div className="queue-container">
                {loading ? (
                  <div className="loading-state">Updating queue...</div>
                ) : queue.length > 0 ? (
                  queue.map((q, i) => (
                    <div key={i} className="queue-row">
                      <span className="q-pos">#{i + 1}</span>
                      <img src={`https://minotar.net/helm/${q.ign}/32.png`} alt={q.ign} className="q-avatar" />
                      <span className="q-name">{q.ign}</span>
                      <span className="q-status">WAITING</span>
                    </div>
                  ))
                ) : (
                  <div className="blank-state">
                    <p>Queue is currently empty. Start a test in Discord!</p>
                  </div>
                )}
              </div>
          </div>
        )}

        {activeTab === 'staff' && (
          <div className="staff-tab-view">
            <h2 className="staff-heading">Administration</h2>
            <div className="staff-grid main-staff">
                <div className="staff-mini-card admin-border">
                   <img src="https://minotar.net/helm/carinoh/60.png" alt="carinoh" className="staff-avatar" />
                   <div className="staff-info">
                     <span className="staff-name">carinoh</span>
                     <span className="staff-role owner">Founder</span>
                   </div>
                </div>
                <div className="staff-mini-card dev-border">
                   <img src="https://minotar.net/helm/Caackee/60.png" alt="Caackee" className="staff-avatar" />
                   <div className="staff-info">
                     <span className="staff-name">Caackee</span>
                     <span className="staff-role developer">Lead Developer</span>
                   </div>
                </div>
                <div className="staff-mini-card pink-border">
                   <img src="https://minotar.net/helm/ignStormz/60.png" alt="ignStormz" className="staff-avatar" />
                   <div className="staff-info">
                     <span className="staff-name">ignStormz</span>
                     <span className="staff-role pink-text">Developer</span>
                   </div>
                </div>
            </div>

            <h2 className="staff-heading sub-heading">Moderation Team</h2>
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
          </div>
        )}

      </main>

      <style jsx>{`
        :global(html), :global(body) { background-color: #0b0d12 !important; margin: 0; padding: 0; min-height: 100%; }
        :global(*) { outline: none !important; box-sizing: border-box; }
        .container { background-color: #0b0d12; min-height: 100vh; color: white; font-family: 'Inter', sans-serif; }
        .navbar { padding: 25px 0; background-color: #11141b; border-bottom: 1px solid #1f232d; position: sticky; top: 0; z-index: 100; }
        .nav-container { display: flex; align-items: center; max-width: 1400px; margin: 0 auto; padding: 0 30px; }
        .logo-text { font-size: 1.8rem; font-weight: 950; letter-spacing: -1px; }
        .logo-accent { color: #3b82f6; font-style: italic; }
        .nav-center { flex: 2; display: flex; gap: 30px; justify-content: center; }
        .nav-center a { display: flex; align-items: center; gap: 8px; color: #9ca3af; text-decoration: none; font-size: 0.95rem; font-weight: 600; }
        .nav-center a.active { color: white; }
        .nav-right { display: flex; align-items: center; gap: 30px; }
        
        .nav-socials { display: flex; gap: 20px; align-items: center; }
        .social-discord { color: #5865F2; }
        .social-youtube { color: #FF0000; }
        .social-github { color: #d1d5db; }

        .mini-search { position: relative; background: #0b0d12; border: 1px solid #1f232d; border-radius: 8px; padding: 6px 12px; display: flex; align-items: center; }
        .mini-input { background: none; border: none; color: white; font-size: 0.85rem; width: 140px; }
        .mini-slash { color: #475569; font-size: 0.8rem; font-weight: 800; background: #1f232d; padding: 1px 6px; border-radius: 4px; margin-left: 8px; }

        /* PULSING ANIMATIONS */
        .founder-animated-glow { border: 1px solid #3b82f6; animation: pulse-blue 4s infinite; }
        .dev-animated-glow { border: 1px solid #8b5cf6; animation: pulse-purple 4s infinite; }
        .stormz-animated-glow { border: 1px solid #ec4899; animation: pulse-pink 4s infinite; }
        
        @keyframes pulse-blue { 0%, 100% { box-shadow: 0 0 5px #3b82f644; } 50% { box-shadow: 0 0 25px #3b82f688; } }
        @keyframes pulse-purple { 0%, 100% { box-shadow: 0 0 5px #8b5cf644; } 50% { box-shadow: 0 0 25px #8b5cf688; } }
        @keyframes pulse-pink { 0%, 100% { box-shadow: 0 0 5px #ec489944; } 50% { box-shadow: 0 0 25px #ec489988; } }

        .tab-header-flex { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }

        /* 3D PURPLE REFRESH BUTTON */
        .3d-refresh-purple { 
          background: #8b5cf6; 
          border: none; 
          color: white; 
          padding: 12px; 
          border-radius: 50%; 
          cursor: pointer;
          box-shadow: 0 4px #6d28d9, 0 8px 15px rgba(0,0,0,0.3);
          transition: all 0.1s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.2rem;
        }
        .3d-refresh-purple:active {
          transform: translateY(2px);
          box-shadow: 0 2px #6d28d9, 0 4px 10px rgba(0,0,0,0.3);
        }
        .syncing { animation: spin 1s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }

        .page-wrapper { max-width: 1100px; margin: 40px auto; padding: 0 20px; display: flex; flex-direction: column; gap: 30px; }
        .staff-heading { font-size: 2.2rem; font-weight: 900; color: white; text-align: left; }
        .feature-card { display: flex; gap: 40px; background: #11141b; padding: 40px; border-radius: 16px; align-items: center; border: 1px solid #1f232d; margin-bottom: 10px; }
        .avatar-img { border-radius: 12px; width: 110px; }
        .badge { background: #3b82f6; padding: 5px 12px; border-radius: 6px; font-size: 0.75rem; font-weight: 800; display: inline-block; }
        .dev-badge { background: #8b5cf6; }
        .pink-badge { background: #ec4899; }

        .tester-podium { display: flex; justify-content: center; align-items: flex-end; gap: 20px; margin-top: 80px; }
        .tester-card { background: #11141b; border: 1px solid #1f232d; border-radius: 16px; padding: 25px; text-align: center; width: 260px; }
        .t-rank-top { transform: translateY(-40px); border: 2px solid #fbbf24; z-index: 3; }
        .t-rank-side { z-index: 1; }

        .silver-glow { border: 2px solid #94a3b8; box-shadow: 0 0 15px rgba(148, 163, 184, 0.3); }
        .bronze-style { border-color: #cd7f32; }
        .champion-glow { filter: drop-shadow(0 0 15px rgba(251, 191, 36, 0.3)); border: 1px solid #fbbf24; }
        .tester-img { border-radius: 12px; margin-bottom: 15px; border: 1px solid #1f232d; }
        .tester-name { font-weight: 900; }
        .stat-highlight { color: #3b82f6; font-weight: 900; }

        .clip-section { margin-top: 100px; text-align: center; padding-bottom: 60px; }
        .clip-heading { font-size: 2rem; font-weight: 950; color: #3b82f6; margin-bottom: 30px; text-align: center; }
        .clip-card { background: #11141b; border: 1px solid #1f232d; border-radius: 20px; max-width: 800px; margin: 0 auto; padding: 30px; display: flex; align-items: center; gap: 30px; text-align: left; }
        .clip-blue-circle { width: 80px; height: 80px; background: #3b82f6; border-radius: 50%; box-shadow: 0 0 20px #3b82f688; }
        .clip-badge { background: #1e293b; color: #3b82f6; font-size: 0.7rem; font-weight: 900; padding: 4px 10px; border-radius: 20px; display: inline-block; margin-bottom: 10px; }
        .clip-title { font-size: 1.5rem; font-weight: 900; margin-bottom: 10px; color: white; }
        .clip-desc { color: #9ca3af; font-size: 0.95rem; line-height: 1.5; margin-bottom: 20px; }
        .clip-btn { background: #3b82f6; color: white; padding: 10px 25px; border-radius: 10px; text-decoration: none; font-weight: 700; display: inline-flex; align-items: center; gap: 10px; }

        .staff-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
        .main-staff { grid-template-columns: repeat(3, 1fr); margin-bottom: 20px; }
        .staff-mini-card { background: #11141b; padding: 15px; border-radius: 12px; display: flex; align-items: center; gap: 15px; border: 1px solid #1f232d; }
        .admin-border { border-color: #3b82f633; }
        .dev-border { border-color: #8b5cf633; }
        .pink-border { border-color: #ec489933; }
        .pink-text { color: #ec4899; }
        .staff-avatar { border-radius: 8px; }
        .staff-info { display: flex; flex-direction: column; }
        .staff-name { font-weight: 800; }
        .staff-role { font-size: 0.7rem; font-weight: 700; color: #9ca3af; text-transform: uppercase; }
        .owner { color: #3b82f6; }
        .developer { color: #8b5cf6; }

        @media (max-width: 768px) {
          .nav-center { display: none; }
          .tester-podium { flex-direction: column; align-items: center; }
          .t-rank-top, .t-rank-side { transform: none; order: unset; margin-bottom: 20px; width: 100%; }
          .clip-card { flex-direction: column; text-align: center; }
          .staff-heading { text-align: center; }
          .main-staff { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
}
