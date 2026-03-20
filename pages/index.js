import { useEffect, useState, useRef } from 'react';
import { FaDiscord, FaTrophy, FaHome, FaShieldAlt, FaYoutube, FaUsers, FaGithub, FaPlayCircle, FaExternalLinkAlt, FaCrown, FaMedal, FaClock } from 'react-icons/fa';
import Rankings from '../components/Rankings';

export default function Home() {
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState('home'); 
  const [players, setPlayers] = useState([]);
  const [queue, setQueue] = useState([]);
  const [loading, setLoading] = useState(false);
  const searchInput = useRef(null);

  // Fetch Data based on active tab
  useEffect(() => {
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

  const clipData = {
    title: "Insane Shield Disable",
    creator: "PlayerName",
    description: "Watch how they perfectly timed the axe swap to secure the quickdrop.",
    link: "https://youtube.com/your-clip-link"
  };

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

      {/* MAIN CONTENT */}
      <main className="page-wrapper">
        
        {activeTab === 'home' && (
          <>
            <h2 className="staff-heading">The Lead Staff Team</h2>

            <div className="feature-card">
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

            <div className="feature-card">
              <div className="card-right">
                <h3 className="title-text">Mastering the <span className="logo-accent">Architecture</span></h3>
                <p className="bio-p">Meet Caackee, the Lead Developer. He ensures the Quickdrop infrastructure is optimized and safely working.</p>
              </div>
              <div className="card-left">
                {/* Applied the 'dev-glow' for the maxed enchanted look */}
                <img src="https://minotar.net/helm/Caackee/120.png" alt="Caackee" className="avatar-img dev-glow" />
                <h2 className="name-text">Caackee</h2>
                <div className="badge dev-badge"> Lead Developer</div>
              </div>
            </div>

            <div className="spacer"></div>

            <div className="testers-container">
              <h2 className="staff-heading">Testers of the Month</h2>
              <div className="tester-podium">
                <div className="tester-card t-rank-2">
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

                <div className="tester-card t-rank-3">
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
          </>
        )}

        {activeTab === 'rankings' && (
          <div className="rankings-tab-view">
             <h2 className="staff-heading">Official Rankings</h2>
             {loading ? (
               <div className="loading-state">Syncing with database...</div>
             ) : (
               <Rankings players={filteredPlayers} />
             )}
          </div>
        )}

        {activeTab === 'queue' && (
          <div className="rankings-tab-view">
             <h2 className="staff-heading">Live Testing Queue</h2>
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
            <h2 className="staff-heading">Community Team</h2>
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
        :global(html), :global(body) {
          background-color: #0b0d12 !important;
          margin: 0;
          padding: 0;
          min-height: 100%;
        }

        :global(*) {
          outline: none !important;
          box-sizing: border-box;
        }

        .container { background-color: #0b0d12; min-height: 100vh; color: white; font-family: 'Inter', sans-serif; }
        .navbar { padding: 25px 0; background-color: #11141b; border-bottom: 1px solid #1f232d; position: sticky; top: 0; z-index: 100; }
        .nav-container { display: flex; align-items: center; max-width: 1400px; margin: 0 auto; padding: 0 30px; }
        .logo-text { font-size: 1.8rem; font-weight: 950; letter-spacing: -1px; }
        .logo-accent { color: #3b82f6; font-style: italic; }
        
        .nav-center { flex: 2; display: flex; gap: 30px; justify-content: center; }
        .nav-center a { display: flex; align-items: center; gap: 8px; color: #9ca3af; text-decoration: none; font-size: 0.95rem; font-weight: 600; transition: 0.2s; }
        .nav-center a:hover, .nav-center a.active { color: white; }

        .dev-glow { 
          border: 2px solid #8b5cf6; 
          box-shadow: 0 0 15px rgba(139, 92, 246, 0.3); 
          animation: enchant-pulse 3s infinite;
        }

        @keyframes enchant-pulse {
          0% { filter: brightness(1) drop-shadow(0 0 2px #8b5cf6); }
          50% { filter: brightness(1.3) drop-shadow(0 0 10px #8b5cf6); }
          100% { filter: brightness(1) drop-shadow(0 0 2px #8b5cf6); }
        }

        .queue-row {
          background: #11141b;
          border: 1px solid #1f232d;
          padding: 15px 25px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          gap: 20px;
          margin-bottom: 10px;
        }

        .q-pos { font-weight: 900; color: #3b82f6; font-size: 1.2rem; min-width: 40px; }
        .q-avatar { border-radius: 4px; }
        .q-name { font-weight: 700; flex: 1; }
        .q-status { background: #fbbf24; color: black; font-size: 0.7rem; font-weight: 900; padding: 4px 10px; border-radius: 4px; }

        .page-wrapper { max-width: 1100px; margin: 40px auto; padding: 0 20px; display: flex; flex-direction: column; gap: 30px; }
        .staff-heading { font-size: 2.2rem; font-weight: 900; color: white; margin-bottom: 20px; text-align: center; }
        
        .tester-podium { display: flex; justify-content: center; align-items: flex-end; gap: 20px; margin-top: 40px; }
        .tester-card { background: #11141b; border: 1px solid #1f232d; border-radius: 16px; padding: 25px; text-align: center; flex: 1; max-width: 300px; }
        .t-rank-1 { order: 2; transform: translateY(-30px); border-color: #fbbf24; }
        .champion-glow { filter: drop-shadow(0 0 15px rgba(251, 191, 36, 0.3)); border: 2px solid #fbbf24; }

        .feature-card { display: flex; gap: 40px; background: #11141b; padding: 40px; border-radius: 16px; align-items: center; border: 1px solid #1f232d; }
        .avatar-img { border-radius: 12px; width: 110px; }
        .badge { background: #3b82f6; padding: 5px 12px; border-radius: 6px; font-size: 0.75rem; font-weight: 800; display: inline-block; }
        .dev-badge { background: #8b5cf6; }

        .staff-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
        .staff-mini-card { background: #11141b; padding: 15px; border-radius: 12px; display: flex; align-items: center; gap: 15px; border: 1px solid #1f232d; }
        
        @media (max-width: 768px) {
          .nav-center { display: none; }
          .staff-grid { grid-template-columns: 1fr; }
          .feature-card { flex-direction: column; text-align: center; }
        }
      `}</style>
    </div>
  );
}
