import { useEffect, useState, useRef } from 'react';
import { FaDiscord, FaTrophy, FaHome, FaShieldAlt, FaYoutube, FaChevronDown } from 'react-icons/fa';

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
    <div style={{ backgroundColor: '#0b0d12', minHeight: '100vh', color: 'white', fontFamily: 'Inter, sans-serif' }}>
      
      {/* NAVBAR */}
      <nav style={{ 
        padding: '20px 10px', 
        backgroundColor: '#11141b', 
        borderBottom: '1px solid #1f232d',
        position: 'sticky', 
        top: 0, 
        zIndex: 100
      }}>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between', 
          maxWidth: '100%', 
          margin: '0 auto',
          position: 'relative',
          height: '60px'
        }}>
          
          {/* 1. LOGO */}
          <div style={{ zIndex: 10, flex: '0 1 auto', paddingLeft: '15px' }}>
            <h1 style={{ 
              fontSize: '2.2rem', 
              fontWeight: '900', 
              letterSpacing: '-1.5px', 
              margin: 0,
              cursor: 'pointer',
              textTransform: 'uppercase',
              whiteSpace: 'nowrap'
            }}>
              QUICKDROP <span style={{ color: '#3b82f6' }}>NETWORK</span>
            </h1>
          </div>

          {/* 2. CENTERED LINKS */}
          <div style={{ 
            display: 'flex', 
            gap: '35px', 
            alignItems: 'center', 
            color: '#9ca3af', 
            fontWeight: '600', 
            fontSize: '1rem',
            position: 'absolute', 
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 50, 
            whiteSpace: 'nowrap',
            pointerEvents: 'auto' 
          }}>
            <a href="/" style={{ textDecoration: 'none', color: '#fff', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <FaHome size={18} /> Home
            </a>
            <a href="#rankings" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <FaTrophy size={16} /> Rankings
            </a>
            <a href="https://discord.gg/EKXHuKMXT4" target="_blank" rel="noreferrer" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <FaDiscord size={18} /> Discord
            </a>
            <a href="#kits" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <FaShieldAlt size={16} /> Kits
            </a>
          </div>

          {/* 3. SOCIALS */}
          <div style={{ display: 'flex', gap: '20px', color: '#9ca3af', zIndex: 10, flex: '0 1 auto', justifyContent: 'flex-end', paddingRight: '20px' }}>
             <a href="https://discord.gg/EKXHuKMXT4" target="_blank" rel="noreferrer" style={{ color: 'inherit' }}><FaDiscord size={26}/></a>
             <a href="https://www.youtube.com/@QuickdropTierlist" target="_blank" rel="noreferrer" style={{ color: 'inherit' }}><FaYoutube size={26}/></a>
          </div>
        </div>

        {/* SEARCH BAR */}
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '35px' }}>
          <div style={{ position: 'relative', width: '100%', maxWidth: '750px' }}>
            <input 
              ref={searchInput}
              type="text" 
              placeholder="Search player..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ 
                width: '100%', 
                padding: '16px 25px', 
                borderRadius: '14px', 
                border: '1px solid #1f232d', 
                backgroundColor: '#080a0f', 
                color: 'white', 
                fontSize: '1.1rem', 
                outline: 'none',
                boxShadow: '0 4px 25px rgba(0,0,0,0.5)'
              }}
            />
            <div style={{ 
              position: 'absolute', right: '20px', top: '50%', transform: 'translateY(-50%)',
              backgroundColor: '#1f232d', padding: '4px 12px', borderRadius: '8px', fontSize: '0.9rem', color: '#4b5563',
              border: '1px solid #2d333f'
            }}>/</div>
          </div>
        </div>
      </nav>

      {/* PLAYER FEATURE SECTION */}
      <main style={{ maxWidth: '1100px', margin: '60px auto', padding: '0 20px' }}>
        <div style={{ 
          display: 'flex', 
          gap: '40px', 
          alignItems: 'center', 
          backgroundColor: '#11141b', 
          padding: '40px', 
          borderRadius: '20px', 
          border: '1px solid #1f232d',
          boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
        }}>
          
{/* FOUNDER FEATURE SECTION */}
      <main style={{ maxWidth: '1100px', margin: '60px auto', padding: '0 20px' }}>
        <div style={{ 
          display: 'flex', 
          gap: '40px', 
          alignItems: 'center', 
          backgroundColor: '#11141b', 
          padding: '40px', 
          borderRadius: '20px', 
          border: '1px solid #1f232d',
          boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Subtle Background Glow */}
          <div style={{ 
            position: 'absolute', top: '-50px', right: '-50px', width: '200px', height: '200px', 
            backgroundColor: '#3b82f6', filter: 'blur(100px)', opacity: '0.1', zIndex: 0 
          }}></div>
          
          {/* PLAYER CARD (LEFT) */}
          <div style={{ 
            backgroundColor: '#080a0f', 
            padding: '30px', 
            borderRadius: '15px', 
            border: '1px solid #3b82f6', 
            textAlign: 'center',
            minWidth: '260px',
            zIndex: 1,
            transition: 'transform 0.3s ease'
          }} className="founder-card">
            <img 
              src="https://minotar.net/helm/carinoh/120.png" 
              alt="carinoh" 
              style={{ 
                borderRadius: '12px', 
                marginBottom: '15px', 
                boxShadow: '0 0 20px rgba(59, 130, 246, 0.4)',
                border: '2px solid #1f232d'
              }} 
            />
            <h2 style={{ margin: '0', fontSize: '1.6rem', color: '#fff', letterSpacing: '-0.5px' }}>carinoh</h2>
            <div style={{ 
              display: 'inline-block', 
              marginTop: '12px', 
              padding: '5px 15px', 
              backgroundColor: '#3b82f6', 
              borderRadius: '6px', 
              fontSize: '0.75rem', 
              fontWeight: '900',
              textTransform: 'uppercase',
              letterSpacing: '1px'
            }}>
              Founder
            </div>
          </div>

          {/* BIO TEXT (RIGHT) */}
          <div style={{ flex: 1, zIndex: 1 }}>
            <h3 style={{ fontSize: '2.2rem', margin: '0 0 15px 0', color: '#fff', fontWeight: '800' }}>
              The Vision Behind <span style={{ color: '#3b82f6' }}>Quickdrop</span>
            </h3>
            <p style={{ fontSize: '1.15rem', lineHeight: '1.7', color: '#9ca3af', fontWeight: '400' }}>
              As the founder of the Quickdrop Network, <strong>carinoh</strong> is the driving force behind our community's growth and direction. With a focus on high-tier competitive play and community integrity, he has built an environment where the best players can compete and thrive.
            </p>
            
            <div style={{ display: 'flex', gap: '20px', marginTop: '25px' }}>
              <div style={{ borderLeft: '3px solid #3b82f6', paddingLeft: '15px' }}>
                <span style={{ display: 'block', color: '#4b5563', fontSize: '0.75rem', fontWeight: 'bold', textTransform: 'uppercase' }}>Established</span>
                <span style={{ fontSize: '1.1rem', fontWeight: '600' }}>Network Leadership</span>
              </div>
              <div style={{ borderLeft: '3px solid #3b82f6', paddingLeft: '15px' }}>
                <span style={{ display: 'block', color: '#4b5563', fontSize: '0.75rem', fontWeight: 'bold', textTransform: 'uppercase' }}>Focus</span>
                <span style={{ fontSize: '1.1rem', fontWeight: '600' }}>Community Expansion</span>
              </div>
            </div>
          </div>
        </div>

        <style jsx>{`
          .founder-card:hover {
            transform: translateY(-5px) scale(1.02);
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.4);
          }
        `}</style>
      </main>

      <style jsx global>{`
        body { 
          margin: 0 !important; 
          padding: 0 !important; 
          background-color: #0b0d12;
          overflow-x: hidden;
        }
        * { box-sizing: border-box; }
        a { transition: all 0.2s ease; cursor: pointer; text-decoration: none; }
        a:hover { color: #3b82f6 !important; transform: translateY(-1px); }
      `}</style>
    </div>
  );
}
