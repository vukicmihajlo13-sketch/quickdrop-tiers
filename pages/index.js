import { useEffect, useState, useRef } from 'react';
import { FaDiscord, FaTrophy, FaHome, FaShieldAlt, FaYoutube, FaUsers, FaGithub, FaPlayCircle, FaExternalLinkAlt } from 'react-icons/fa';

export default function Home() {
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState('home'); 
  const searchInput = useRef(null);

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
            <a href="#" className={activeTab === 'staff' ? 'active' : ''} onClick={(e) => { e.preventDefault(); setActiveTab('staff'); }}>
               <FaUsers size={16} /> Staff
            </a>
            <a href="#" className={activeTab === 'kits' ? 'active' : ''} onClick={(e) => { e.preventDefault(); setActiveTab('kits'); }}>
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
            <h2 className="staff-heading">The Lead Staff Team</h2>

            <div className="feature-card">
              <div className="card-left">
                <img src="https://minotar.net/helm/carinoh/120.png" alt="Carinoh" className="avatar-img" />
                <h2 className="name-text">Carinoh</h2>
                <div className="badge">Founder</div>
              </div>
              <div className="card-right">
                <h3 className="title-text">The Vision Behind <span className="logo-accent">Quickdrop</span></h3>
                <p className="bio-p">As the founder of the Quickdrop Network, carinoh is the driving force behind our community's growth and direction.</p>
              </div>
            </div>

            <div className="feature-card">
              <div className="card-right">
                <h3 className="title-text">Mastering the <span className="logo-accent">Architecture</span></h3>
                <p className="bio-p">Meet Caackee, the Lead Developer. He ensures the Quickdrop infrastructure is optimized and innovative.</p>
              </div>
              <div className="card-left">
                <img src="https://minotar.net/helm/Caackee/120.png" alt="Caackee" className="avatar-img dev-glow" />
                <h2 className="name-text">Caackee</h2>
                <div className="badge dev-badge">Developer</div>
              </div>
            </div>

            <div className="spacer"></div>

            <div className="clip-of-week-container">
              <h2 className="clip-heading">Clip Of The Week</h2>
              <div className="clip-card">
                <div className="clip-icon">
                  <FaPlayCircle size={48} color="#3b82f6" />
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
                    Click to Visit <FaExternalLinkAlt size={14} style={{marginLeft: '8px'}} />
                  </a>
                </div>
              </div>
            </div>
          </>
        )}

        {activeTab === 'staff' && (
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
        )}

        {(activeTab === 'rankings' || activeTab === 'kits') && (
          <div className="blank-state">
             <h2 className="title-text" style={{textTransform: 'capitalize'}}>{activeTab}</h2>
             <p className="bio-p">This section is currently under development.</p>
          </div>
        )}

      </main>

      <style jsx>{`
        /* GLOBAL RESET FOR WHITE OUTLINE */
        :global(*) {
          outline: none !important;
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        :global(a:focus, button:focus, input:focus) {
          outline: none !important;
          box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.4);
        }

        .container { background-color: #0b0d12; min-height: 100vh; color: white; font-family: 'Inter', sans-serif; }
        .navbar { padding: 25px 0; background-color: #11141b; border-bottom: 1px solid #1f232d; position: sticky; top: 0; z-index: 100; }
        .nav-container { display: flex; align-items: center; max-width: 1400px; margin: 0 auto; padding: 0 30px; }
        .nav-left { flex: 1.5; }
        .logo-text { font-size: 1.8rem; font-weight: 950; letter-spacing: -1px; }
        .logo-accent { color: #3b82f6; font-style: italic; }
        .nav-center { flex: 2; display: flex; gap: 30px; justify-content: center; }
        .nav-center a { display: flex; align-items: center; gap: 8px; color: #9ca3af; text-decoration: none; font-size: 0.95rem; font-weight: 600; transition: 0.2s; }
        .nav-center a:hover, .nav-center a.active { color: white; }
        .nav-right { flex: 1.5; display: flex; align-items: center; justify-content: flex-end; gap: 15px; }
        .mini-search { background: #080a0f; border: 1px solid #1f232d; border-radius: 8px; padding: 6px 12px; display: flex; align-items: center; }
        .mini-input { background: transparent; border: none; color: white; width: 130px; font-size: 0.8rem; }
        .mini-slash { background: #1f232d; padding: 0px 5px; border-radius: 4px; font-size: 0.7rem; color: #4b5563; margin-left: 5px; }
        .nav-socials { display: flex; gap: 12px; border-left: 1px solid #1f232d; padding-left: 15px; }
        .nav-socials a { color: #9ca3af; transition: 0.2s; }
        .nav-socials a:hover { color: white; }
        .page-wrapper { max-width: 1100px; margin: 40px auto; padding: 0 20px; display: flex; flex-direction: column; gap: 30px; }

        .staff-heading { font-size: 2.2rem; font-weight: 900; color: white; margin-bottom: 20px; text-align: center; letter-spacing: -0.5px; }
        .spacer { height: 50px; }
        .clip-of-week-container { max-width: 800px; margin: 0 auto; text-align: center; }
        .clip-heading { font-size: 1.8rem; font-weight: 900; margin-bottom: 20px; color: #3b82f6; text-transform: uppercase; letter-spacing: 1.5px; }

        .clip-card { display: flex; align-items: center; gap: 25px; background: linear-gradient(135deg, #1e293b, #0f172a); padding: 30px; border-radius: 16px; border: 1px solid #3b82f6; box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3); transition: transform 0.3s ease; }
        .clip-card:hover { transform: scale(1.03); box-shadow: 0 6px 25px rgba(59, 130, 246, 0.5); }
        .clip-icon { flex-shrink: 0; background: #3b82f6; border-radius: 50%; padding: 12px; display: flex; align-items: center; justify-content: center; box-shadow: 0 0 15px #3b82f6; }
        .clip-content { text-align: left; flex: 1; }
        .clip-header { display: flex; align-items: center; gap: 15px; margin-bottom: 8px; flex-wrap: wrap; }
        .clip-badge { background: rgba(59, 130, 246, 0.15); color: #3b82f6; padding: 6px 14px; border-radius: 20px; font-size: 0.75rem; font-weight: 900; letter-spacing: 1px; text-transform: uppercase; }
        .clip-title { font-weight: 900; font-size: 1.3rem; color: white; margin: 0; }
        .clip-description { font-size: 1rem; color: #cbd5e1; margin-top: 6px; }

        .clip-link-btn {
          display: inline-flex;
          align-items: center;
          background: #3b82f6;
          color: white;
          text-decoration: none;
          padding: 12px 26px;
          border-radius: 12px;
          font-weight: 700;
          margin-top: 18px;
          font-size: 1rem;
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.5);
          transition: background-color 0.3s ease, box-shadow 0.3s ease;
        }
        .clip-link-btn:hover { background: #2563eb; }

        .feature-card { display: flex; gap: 40px; background: #11141b; padding: 40px; border-radius: 16px; align-items: center; border: 1px solid #1f232d; }
        .avatar-img { border-radius: 12px; width: 110px; margin-bottom: 12px; filter: drop-shadow(0 0 10px rgba(59, 130, 246, 0.2)); }
        .badge { background: #3b82f6; padding: 5px 12px; border-radius: 6px; font-size: 0.75rem; font-weight: 800; display: inline-block; }
        .dev-badge { background: #8b5cf6; }
        .title-text { font-size: 1.8rem; margin-bottom: 10px; font-weight: 800; }
        .bio-p { color: #9ca3af; line-height: 1.5; }
        .staff-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
        .staff-mini-card { background: #11141b; padding: 15px; border-radius: 12px; display: flex; align-items: center; gap: 15px; border: 1px solid #1f232d; }
        .staff-avatar { width: 45px; height: 45px; border-radius: 8px; }
        .blank-state { text-align: center; padding: 80px; border: 2px dashed #1f232d; border-radius: 20px; }
      `}</style>
    </div>
  );
}
