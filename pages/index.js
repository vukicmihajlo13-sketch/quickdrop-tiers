import { useEffect, useState, useRef } from 'react';
import { FaDiscord, FaTrophy, FaHome, FaShieldAlt, FaYoutube, FaFileAlt, FaUserShield } from 'react-icons/fa';

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
        
        {/* 1. STAFF MEMBERS GRID */}
        <section className="staff-section">
          <h2 className="section-header"><FaUserShield style={{marginRight: '10px'}}/> Staff Team</h2>
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

        {/* 2. FOUNDER SECTION (carinoh) */}
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

        {/* 3. DEVELOPER SECTION (Caackee) */}
        <div className="feature-card developer-section">
          <div className="card-right">
            <h3 className="title-text">Mastering the <span style={{ color: '#3b82f6' }}>Architecture</span></h3>
            <p className="bio-p">
              Meet <strong>Caackee</strong>, the Lead Developer. From custom Fabric mods to Discord automation, he ensures the Quickdrop infrastructure is optimized and innovative.
            </p>
            <div className="stats-row">
              <div className="stat dev-stat">
                <span className="label">Primary Role</span>
                <span className="value">Lead Systems Developer</span>
              </div>
              <div className="stat dev-stat">
                <span className="label">Expertise</span>
                <span className="value">Full-Stack Engineering</span>
              </div>
            </div>
          </div>
          <div className="card-left">
            <img src="https://minotar.net/helm/Caackee/120.png" alt="Caackee" className="avatar-img dev-glow" />
            <h2 className="name-text">Caackee</h2>
            <div className="badge dev-badge">Developer</div>
          </div>
        </div>

      </main>

      <style jsx>{`
        .container { background-color: #0b0d12; min-height: 100vh; color: white; font-family: 'Inter', sans-serif; }
        * { outline: none !important; -webkit-tap-highlight-color: transparent; }

        .navbar { padding: 15px 40px; background-color: #11141b; border-bottom: 1px solid #1f232d; position: sticky; top: 0; z-index: 100; }
        .nav-container { display: flex; align-items: center; justify-content: space-between; max-width: 1600px; margin: 0 auto; }
        .logo-text { font-size: 1.4rem; font-weight: 900; margin: 0; }
        .nav-center { display: flex; gap: 30px; color: #9ca3af; font-size: 0.95rem; }
        .nav-center a { display: flex; align-items: center; gap: 8px; color: inherit; text-decoration: none; }
        .nav-right { display: flex; align-items: center; gap: 20px; }
        .nav-socials { display: flex; gap: 15px; color: #9ca3af; }

        .mini-search { position: relative; background: #080a0f; border: 1px solid #1f232d; border-radius: 10px; padding: 8px 15px; width: 240px; }
        .mini-input { background: transparent; border: none; color: white; width: 100%; font-size: 0.9rem; }
        .mini-slash { position: absolute; right: 10px; top: 50%; transform: translateY(-50%); background: #1f232d; padding: 2px 8px; border-radius: 5px; font-size: 0.75rem; color: #4b5563; }

        .page-wrapper { max-width: 1200px; margin: 40px auto; padding: 0 20px; display: flex; flex-direction: column; gap: 80px; }

        /* STAFF GRID */
        .section-header { font-size: 1.5rem; margin-bottom: 25px; color: #f3f4f6; display: flex; align-items: center; }
        .staff-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; margin-bottom: 20px; }
        .staff-mini-card { background: #11141b; border: 1px solid #1f232d; padding: 15px; border-radius: 12px; display: flex; align-items: center; gap: 15px; }
        .staff-avatar { width: 45px; height: 45px; border-radius: 8px; }
        .staff-name { display: block; font-weight: 700; font-size: 1rem; }
        .staff-role { display: block; font-size: 0.7rem; color: #3b82f6; text-transform: uppercase; font-weight: 800; }

        /* FEATURE CARDS */
        .feature-card { display: flex; gap: 50px; background: #11141b; padding: 50px; border-radius: 25px; border: 1px solid #1f232d; align-items: center; }
        .card-left { text-align: center; min-width: 200px; }
        .card-right { flex: 1; }
        .avatar-img { border-radius: 15px; width: 110px; border: 1px solid #1f232d; box-shadow: 0 10px 30px -10px rgba(59, 130, 246, 0.4); }
        .dev-glow { box-shadow: 0 10px 30px -10px rgba(139, 92, 246, 0.4); }
        .dev-badge { background: #8b5cf6 !important; }
        .dev-stat { border-left-color: #8b5cf6 !important; }
        .name-text { font-size: 1.8rem; margin: 15px 0 5px; }
        .badge { background: #3b82f6; padding: 5px 15px; border-radius: 6px; font-size: 0.75rem; font-weight: 900; text-transform: uppercase; }
        .title-text { font-size: 2.2rem; margin: 0 0 15px; font-weight: 800; }
        .bio-p { color: #9ca3af; font-size: 1.1rem; line-height: 1.8; margin-bottom: 25px; }
        .stats-row { display: flex; gap: 40px; }
        .stat { border-left: 3px solid #3b82f6; padding-left: 20px; }
        .label { display: block; color: #4b5563; font-size: 0.7rem; font-weight: 800; text-transform: uppercase; }
        .value { font-size: 1rem; font-weight: 700; }

        @media (max-width: 1100px) {
          .nav-container { flex-direction: column; gap: 15px; }
          .feature-card { flex-direction: column !important; text-align: center; padding: 30px; gap: 30px; }
          .stats-row { flex-direction: column; align-items: center; gap: 20px; }
          .stat { border-left: none; border-top: 3px solid #3b82f6; padding: 15px 0 0; width: 100%; }
          .developer-section .card-right { order: 2; }
          .developer-section .card-left { order: 1; }
        }
      `}</style>
    </div>
  );
}
