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
      
      <nav className="navbar">
        <div className="nav-container">
          
          <div className="nav-left">
            <h1 className="logo-text">
              QUICKDROP <span>NETWORK</span>
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

      <main className="page-wrapper">
        
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

        <div className="feature-card">
          <div className="card-left">
            <img src="https://minotar.net/helm/carinoh/120.png" alt="Carinoh" className="avatar-img" />
            <h2 className="name-text">Carinoh</h2>
            <div className="badge">Founder</div>
          </div>
          <div className="card-right">
            <h3 className="title-text">The Vision Behind <span style={{ color: '#3b82f6' }}>Quickdrop</span></h3>
            <p className="bio-p">
              As the founder of the Quickdrop Network, <strong>Carinoh</strong> is the driving force behind our community's growth and direction.
            </p>
          </div>
        </div>

        <div className="feature-card developer-section">
          <div className="card-right">
            <h3 className="title-text">Mastering the <span style={{ color: '#3b82f6' }}>Architecture</span></h3>
            <p className="bio-p">
              Meet <strong>Caackee</strong>, the Lead Developer.
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
        /* FIX WHITE OUTLINE */
        :global(html),
        :global(body) {
          margin: 0;
          padding: 0;
          outline: none;
          box-shadow: none;
          border: none;
          background: #0b0d12;
        }

        :global(*) {
          box-sizing: border-box;
        }

        :global(*:focus),
        :global(*:focus-visible) {
          outline: none;
          box-shadow: none;
        }

        .container {
          background-color: #0b0d12;
          min-height: 100vh;
          color: white;
          font-family: 'Inter', sans-serif;
        }

        .navbar { 
          padding: 15px 40px; 
          background-color: #11141b; 
          border-bottom: 1px solid #1f232d;
          position: sticky; 
          top: 0; 
          z-index: 100; 
        }

        .nav-container { display: flex; align-items: center; justify-content: space-between; max-width: 1400px; margin: 0 auto; }

        .nav-left { flex: 1; }

        .logo-text { 
          font-size: 1.4rem; 
          font-weight: 900; 
          margin: 0; 
        }

        .logo-text span {
          color: #3b82f6;
        }

        .nav-center { flex: 2; display: flex; gap: 40px; justify-content: center; color: #9ca3af; }
        .nav-center a { display: flex; align-items: center; gap: 8px; color: inherit; text-decoration: none; }
        .nav-center a:hover { color: white; }

        .nav-right { flex: 1; display: flex; justify-content: flex-end; gap: 20px; }

        .mini-search { 
          position: relative; 
          background: #080a0f; 
          border: 1px solid #1f232d; 
          border-radius: 10px; 
          padding: 8px 15px; 
          width: 200px;
        }

        .mini-search:focus-within {
          border-color: #3b82f6;
        }

        .mini-input { background: transparent; border: none; color: white; width: 100%; }

        .mini-slash { position: absolute; right: 10px; top: 50%; transform: translateY(-50%); background: #1f232d; padding: 1px 6px; border-radius: 4px; font-size: 0.7rem; }

        .page-wrapper { max-width: 1100px; margin: 40px auto; padding: 0 20px; display: flex; flex-direction: column; gap: 60px; }

        .staff-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; }
        .staff-mini-card { background: #11141b; padding: 12px; border-radius: 10px; display: flex; gap: 12px; }

        .feature-card { display: flex; gap: 40px; background: #11141b; padding: 40px; border-radius: 20px; }

        /* 🔥 DESKTOP ONLY FIX */
        @media (min-width: 901px) {
          .logo-text {
            font-size: 1.9rem;
          }

          .logo-text span {
            font-size: 2.2rem;
          }

          .nav-left {
            margin-left: -40px;
          }
        }

        @media (max-width: 900px) {
          .nav-container { flex-direction: column; gap: 15px; }
          .feature-card { flex-direction: column; }
        }
      `}</style>
    </div>
  );
}
