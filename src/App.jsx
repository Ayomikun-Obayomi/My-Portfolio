import { Routes, Route, Link, NavLink } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import MelissaMapViewer from './MelissaMapViewer'

function AffinityDiagramViewer() {
  const [open, setOpen] = useState(false);
  const modalRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    function handleKey(e) {
      setOpen(false);
    }
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [open]);

  function handleBackdrop(e) {
    if (modalRef.current && e.target === modalRef.current) {
      setOpen(false);
    }
  }

  return (
    <>
      <div style={{ display: 'inline-block', background: '#fff', borderRadius: 20, overflow: 'hidden', boxShadow: '0 2px 16px rgba(0,0,0,0.06)', marginTop: 32, marginBottom: 0, paddingBottom: 0 }}>
        <img
          src="https://images.squarespace-cdn.com/content/v1/6580d3c3d590237476692b5e/250779ab-9fd5-44f5-b02c-6ac562820f4d/image-asset.png?format=2500w"
          alt="Affinity diagram for communication pain points"
          style={{ maxWidth: '100%', height: 'auto', borderRadius: 20, transition: 'box-shadow 0.2s', cursor: 'pointer', display: 'block' }}
          onClick={() => setOpen(true)}
        />
      </div>
      <p className="case-study__section-caption">
        Our Affinity Diagram created during one of our collaborative sessions (Click to enlarge)
      </p>
      {open && (
        <div ref={modalRef} onClick={handleBackdrop} style={{ position: 'fixed', zIndex: 1000, top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(30,30,40,0.82)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <button
            aria-label="Close image viewer"
            onClick={() => setOpen(false)}
            style={{
              position: 'absolute',
              top: 20,
              right: 20,
              background: 'transparent',
              border: 'none',
              fontSize: '2rem',
              color: '#fff',
              cursor: 'pointer',
              zIndex: 1001,
            }}
          >
            &times;
          </button>
          <div style={{ position: 'relative', maxWidth: '90vw', maxHeight: '90vh', outline: 'none' }}>
            <img
              src="https://images.squarespace-cdn.com/content/v1/6580d3c3d590237476692b5e/250779ab-9fd5-44f5-b02c-6ac562820f4d/image-asset.png?format=2500w"
              alt="Affinity diagram for communication pain points"
              style={{ maxWidth: '80vw', maxHeight: '80vh', borderRadius: 20, background: '#fff', display: 'block', margin: '0 auto' }}
            />
          </div>
        </div>
      )}
    </>
  );
}

function JourneyMapViewer() {
  const [open, setOpen] = useState(false);
  const modalRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    function handleKey(e) {
      setOpen(false);
    }
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [open]);

  function handleBackdrop(e) {
    if (modalRef.current && e.target === modalRef.current) {
      setOpen(false);
    }
  }

  return (
    <>
      <img
        src="/melissa-journey-map copy.png"
        srcSet="/melissa-journey-map png 1x, /melissa-journey-map copy@2x.png 2x"
        alt="Journey map for communication pain points"
        style={{ maxWidth: '100%', height: 'auto', borderRadius: 20, display: 'block', marginTop: 32, cursor: 'pointer' }}
        onClick={() => setOpen(true)}
      />
      <p className="case-study__section-caption">
       A scenario based journey map helping the team empathize with parents (Click to enlarge)
      </p>
      {open && (
        <div ref={modalRef} onClick={handleBackdrop} style={{ position: 'fixed', zIndex: 1000, top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(30,30,40,0.82)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <button
            aria-label="Close image viewer"
            onClick={() => setOpen(false)}
            style={{
              position: 'absolute',
              top: 20,
              right: 20,
              background: 'transparent',
              border: 'none',
              fontSize: '2rem',
              color: '#fff',
              cursor: 'pointer',
              zIndex: 1001,
            }}
          >
            &times;
          </button>
          <div style={{ position: 'relative', maxWidth: '90vw', maxHeight: '90vh', outline: 'none' }}>
            <img
              src="/melissa-journey-map copy.png"
              srcSet="/melissa-journey-map copy.png 1x, /melissa-journey-map copy@2x.png 2x"
              alt="Journey map for communication pain points"
              style={{ maxWidth: '80vw', maxHeight: '80vh', borderRadius: 20, background: '#fff', display: 'block', margin: '0 auto' }}
            />
          </div>
        </div>
      )}
    </>
  );
}

function DesignExploration1Viewer() {
  const [open, setOpen] = useState(false);
  const modalRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    function handleKey(e) {
      setOpen(false);
    }
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [open]);

  function handleBackdrop(e) {
    if (modalRef.current && e.target === modalRef.current) {
      setOpen(false);
    }
  }

  return (
    <>
      <div style={{ maxWidth: 800, margin: '0 auto', width: '100%' }}>
        <img
          src="/exploration-1.png"
          alt="Rejected announcement feature sketch"
          style={{ width: '100%', maxWidth: '100%', borderRadius: 20, display: 'block', marginTop: 24, cursor: 'pointer' }}
          onClick={() => setOpen(true)}
        />
      </div>
      <p className="case-study__section-caption" style={{ cursor: 'pointer', fontWeight: 500 }} onClick={() => setOpen(true)}>
        (Click to enlarge)
      </p>
      {open && (
        <div ref={modalRef} onClick={handleBackdrop} style={{ position: 'fixed', zIndex: 1000, top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(30,30,40,0.82)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <button
            aria-label="Close image viewer"
            onClick={() => setOpen(false)}
            style={{
              position: 'absolute',
              top: 20,
              right: 20,
              background: 'transparent',
              border: 'none',
              fontSize: '2rem',
              color: '#fff',
              cursor: 'pointer',
              zIndex: 1001,
            }}
          >
            &times;
          </button>
          <div style={{ position: 'relative', maxWidth: '90vw', maxHeight: '90vh', outline: 'none' }}>
            <img
              src="/exploration-1.png"
              alt="Rejected announcement feature sketch"
              style={{ maxWidth: '80vw', maxHeight: '80vh', borderRadius: 20, background: '#fff', display: 'block', margin: '0 auto' }}
            />
          </div>
        </div>
      )}
    </>
  );
}

function DesignExploration2Viewer() {
  const [open, setOpen] = useState(false);
  const modalRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    function handleKey(e) {
      setOpen(false);
    }
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [open]);

  function handleBackdrop(e) {
    if (modalRef.current && e.target === modalRef.current) {
      setOpen(false);
    }
  }

  return (
    <>
      <img
        src="/designexploration-2.png"
        alt="Concept and rejected idea sketch"
        style={{ width: '100%', maxWidth: '100%', borderRadius: 20, display: 'block', marginTop: 24, cursor: 'pointer' }}
        onClick={() => setOpen(true)}
      />
      <p className="case-study__section-caption" style={{ cursor: 'pointer', fontWeight: 500 }} onClick={() => setOpen(true)}>
        (Click to enlarge)
      </p>
      {open && (
        <div ref={modalRef} onClick={handleBackdrop} style={{ position: 'fixed', zIndex: 1000, top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(30,30,40,0.82)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <button
            aria-label="Close image viewer"
            onClick={() => setOpen(false)}
            style={{
              position: 'absolute',
              top: 20,
              right: 20,
              background: 'transparent',
              border: 'none',
              fontSize: '2rem',
              color: '#fff',
              cursor: 'pointer',
              zIndex: 1001,
            }}
          >
            &times;
          </button>
          <div style={{ position: 'relative', maxWidth: '90vw', maxHeight: '90vh', outline: 'none' }}>
            <img
              src="/designexploration-2.png"
              alt="Concept and rejected idea sketch"
              style={{ maxWidth: '80vw', maxHeight: '80vh', borderRadius: 20, background: '#fff', display: 'block', margin: '0 auto' }}
            />
          </div>
        </div>
      )}
    </>
  );
}

function DesignExploration3Viewer() {
  const [open, setOpen] = useState(false);
  const modalRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    function handleKey(e) {
      setOpen(false);
    }
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [open]);

  function handleBackdrop(e) {
    if (modalRef.current && e.target === modalRef.current) {
      setOpen(false);
    }
  }

  return (
    <>
      <img
        src="/designexploration-3.png"
        alt="Accepted idea exploration sketch"
        style={{ width: '100%', maxWidth: '100%', borderRadius: 20, display: 'block', marginTop: 24, cursor: 'pointer' }}
        onClick={() => setOpen(true)}
      />
      <p className="case-study__section-caption" style={{ cursor: 'pointer', fontWeight: 500 }} onClick={() => setOpen(true)}>
        (Click to enlarge)
      </p>
      {open && (
        <div ref={modalRef} onClick={handleBackdrop} style={{ position: 'fixed', zIndex: 1000, top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(30,30,40,0.82)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <button
            aria-label="Close image viewer"
            onClick={() => setOpen(false)}
            style={{
              position: 'absolute',
              top: 20,
              right: 20,
              background: 'transparent',
              border: 'none',
              fontSize: '2rem',
              color: '#fff',
              cursor: 'pointer',
              zIndex: 1001,
            }}
          >
            &times;
          </button>
          <div style={{ position: 'relative', maxWidth: '90vw', maxHeight: '90vh', outline: 'none' }}>
            <img
              src="/designexploration-3.png"
              alt="Accepted idea exploration sketch"
              style={{ maxWidth: '80vw', maxHeight: '80vh', borderRadius: 20, background: '#fff', display: 'block', margin: '0 auto' }}
            />
          </div>
        </div>
      )}
    </>
  );
}

function PrioritizationMatrixViewer() {
  const [open, setOpen] = useState(false);
  const modalRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    function handleKey(e) {
      setOpen(false);
    }
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [open]);

  function handleBackdrop(e) {
    if (modalRef.current && e.target === modalRef.current) {
      setOpen(false);
    }
  }

  return (
    <>
      <div style={{ background: '#fff', border: '1px solid #eee', borderRadius: 20, boxShadow: '0 4px 24px rgba(0,0,0,0.08)', padding: 24, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', minHeight: 380, boxSizing: 'border-box' }}>
        <div style={{ width: '100%', height: '100%', borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
          <img 
            src="/Map for Guild Gaming.png" 
            alt="Prioritization Map" 
            style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 16, display: 'block', cursor: 'pointer' }}
            onClick={() => setOpen(true)}
          />
        </div>
      </div>
      <p className="case-study__section-caption" style={{ cursor: 'pointer', fontWeight: 500 }} onClick={() => setOpen(true)}>
        Prioritization Matrix (Click to enlarge)
      </p>
      {open && (
        <div ref={modalRef} onClick={handleBackdrop} style={{ position: 'fixed', zIndex: 1000, top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(30,30,40,0.82)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <button
            aria-label="Close image viewer"
            onClick={() => setOpen(false)}
            style={{
              position: 'absolute',
              top: 20,
              right: 20,
              background: 'transparent',
              border: 'none',
              fontSize: '2rem',
              color: '#fff',
              cursor: 'pointer',
              zIndex: 1001,
            }}
          >
            &times;
          </button>
          <div style={{ position: 'relative', maxWidth: '90vw', maxHeight: '90vh', outline: 'none' }}>
            <img
              src="/Map for Guild Gaming.png"
              alt="Prioritization Map"
              style={{ maxWidth: '80vw', maxHeight: '80vh', borderRadius: 20, background: '#fff', display: 'block', margin: '0 auto' }}
            />
          </div>
        </div>
      )}
    </>
  );
}

function App() {
  const [isMobile, setIsMobile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 800);
    };

    // Check on mount
    checkScreenSize();

    // Add event listener for window resize
    window.addEventListener('resize', checkScreenSize);

    // Cleanup
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      fontFamily: 'sans-serif'
    }}>
      <header className="navbar">
        <div className="navbar-logo">
                      <Link to="/" style={{ display: 'block', cursor: 'pointer' }} aria-label="Go to homepage">
              <svg width="60" height="48" viewBox="0 0 60 48" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block' }}>
                <text x="0" y="38" fontFamily="Helvetica, Arial, sans-serif" fontSize="40" fontWeight="bold" fill="#8134df" letterSpacing="2">a</text>
                <circle cx="36" cy="28" r="12" fill="none" stroke="#8134df" strokeWidth="2"/>
            </svg>
          </Link>
        </div>
        {isMobile ? (
          <>
            <button
              aria-label="Open menu"
              onClick={() => setMenuOpen(!menuOpen)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: 8,
                marginLeft: 'auto',
                outline: 'none',
                display: 'flex',
                alignItems: 'center',
                height: 48
              }}
            >
              {/* Hamburger/Close icon */}
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                style={{ transition: 'transform 0.2s' }}
              >
                {menuOpen ? (
                  // X icon when menu is open
                  <path
                    d="M18 6L6 18M6 6L18 18"
                    stroke="#000000"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                ) : (
                  // Hamburger icon when menu is closed
                  <path
                    d="M3 12H21M3 6H21M3 18H21"
                    stroke="#000000"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                )}
              </svg>
            </button>
            {menuOpen && (
              <>
                {/* Full Screen Overlay */}
                <div 
                  style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: '#fff',
                    zIndex: 1000,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: 'Helvetica, Arial, sans-serif',
                  }}
                >
                  {/* Cancel Button */}
                  <button
                    onClick={() => setMenuOpen(false)}
                    style={{
                      position: 'absolute',
                      top: 20,
                      right: 20,
                      background: 'none',
                      border: 'none',
                      fontSize: '24px',
                      cursor: 'pointer',
                      color: '#111',
                      padding: '8px',
                      borderRadius: '50%',
                      width: '40px',
                      height: '40px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'background-color 0.2s'
                    }}
                    onMouseEnter={(e) => e.target.style.backgroundColor = '#f5f5f5'}
                    onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                  >
                    ✕
                  </button>
                  
                  {/* Menu Items */}
                  <nav
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '32px',
                      width: '100%',
                      maxWidth: '300px',
                    }}
                  >
                  <NavLink 
                    to="/" 
                    end 
                    style={{ 
                      padding: '16px 32px', 
                      color: '#111', 
                      textDecoration: 'none', 
                      fontWeight: 600,
                      fontSize: '24px',
                      transition: 'color 0.2s'
                    }} 
                    onClick={() => setMenuOpen(false)}
                    onMouseEnter={(e) => e.target.style.color = '#8134df'}
                    onMouseLeave={(e) => e.target.style.color = '#111'}
                  >
                    Work
                  </NavLink>
                  <NavLink 
                    to="/about" 
                    style={{ 
                      padding: '16px 32px', 
                      color: '#111', 
                      textDecoration: 'none', 
                      fontWeight: 600,
                      fontSize: '24px',
                      transition: 'color 0.2s'
                    }} 
                    onClick={() => setMenuOpen(false)}
                    onMouseEnter={(e) => e.target.style.color = '#8134df'}
                    onMouseLeave={(e) => e.target.style.color = '#111'}
                  >
                    About
                  </NavLink>
                  <NavLink 
                    to="/resume" 
                    style={{ 
                      padding: '16px 32px', 
                      color: '#111', 
                      textDecoration: 'none', 
                      fontWeight: 600,
                      fontSize: '24px',
                      transition: 'color 0.2s'
                    }} 
                    onClick={() => setMenuOpen(false)}
                    onMouseEnter={(e) => e.target.style.color = '#8134df'}
                    onMouseLeave={(e) => e.target.style.color = '#111'}
                  >
                    Resume
                  </NavLink>
                  </nav>
                </div>
              </>
            )}
          </>
        ) : (
          <nav className="navbar-links">
            <NavLink to="/" end>Work</NavLink>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/resume">Resume</NavLink>
          </nav>
        )}
      </header>
      <main style={{
        flex: 1,
        padding: '0 32px',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/resume" element={<Resume />} />
          <Route path="/project/:id" element={<Project />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

function Home() {
  const [activeCard, setActiveCard] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 800);
    };

    // Check on mount
    checkScreenSize();

    // Add event listener for window resize
    window.addEventListener('resize', checkScreenSize);

    // Cleanup
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);
  const projects = [
    {
      name: 'Baseball Little League',
      description: 'Designing a communication platform to enhance organizational collaboration amongst Parents, Coaches, & Children.'
    },
    {
      name: 'Guild Gaming',
      description: 'Designing a dashboard to help event organizers track and manage the outcomes of their events.'
    }
  ];
  return (
    <main style={{
      minHeight: '80vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      gap: 24,
      paddingTop: 120,
      paddingLeft: 0,
      paddingRight: 0,
      margin: 0,
      marginBottom: 96 // Increased extra space below the cards before the footer
    }}>
      <div style={{ fontSize: 22, fontWeight: 400, color: '#111111', marginBottom: 32, letterSpacing: 0, textAlign: 'left', lineHeight: 1.3, fontFamily: 'Helvetica, sans-serif' }}>
        Product Designer. Outdoorsy Person. Songbird
      </div>
      <h1 style={{ 
        fontSize: isMobile ? '32px' : '48px', 
        fontWeight: 400, 
        lineHeight: 1.1, 
        color: '#111', 
        margin: 0, 
        textAlign: 'left' 
      }}>
        Ayo <span role="img" aria-label="hands making heart" style={{ fontSize: isMobile ? '28px' : '42px', verticalAlign: 'middle' }}>🫶🏿</span> crafting experiences that help users embrace <span style={{ color: '#A259FF', fontWeight: 800, fontFamily: 'Helvetica, sans-serif' }}>living in the moment</span> <span role="img" aria-label="sparkles" style={{ fontSize: isMobile ? '24px' : '36px', verticalAlign: 'middle' }}>✨</span>
      </h1>
      <div style={{ 
        display: isMobile ? 'flex' : 'grid', 
        flexDirection: isMobile ? 'column' : undefined,
        gridTemplateColumns: isMobile ? undefined : 'repeat(2, 1fr)', 
        alignItems: isMobile ? undefined : 'stretch',
        gap: '32px', 
        marginTop: 48, 
        width: '100%' 
      }}>
        {projects.map((project, idx) => {
          const isBaseball = project.name === 'Baseball Little League';
          const cardContent = (
            <div
              key={project.name}
              onClick={() => setActiveCard(idx)}
              onMouseLeave={() => setActiveCard(null)}
              style={{
                width: '100%',
                maxWidth: '100%',
                padding: '32px 24px',
                borderRadius: 16,
                boxShadow: activeCard === idx ? '0 4px 24px rgba(162,89,255,0.10)' : '0 2px 12px rgba(0,0,0,0.04)',
                border: '1px solid #eee',
                background: '#fff',
                color: '#fff',
                cursor: 'pointer',
                transition: 'background 0.2s, box-shadow 0.2s, transform 0.2s',
                outline: activeCard === idx ? '2px solid #8325FC' : 'none',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                gap: 16,
                transform: activeCard === idx ? 'translateY(-4px)' : 'none',
                boxSizing: 'border-box',
                overflow: 'hidden'
              }}
              onMouseEnter={() => setActiveCard(idx)}
            >
              <div style={{
                width: '100%',
                aspectRatio: '16/9',
                background: '#eee',
                borderRadius: 8,
                marginBottom: 24,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden'
              }}>
                <img
                  src={project.name === 'Baseball Little League'
                    ? 'https://static1.squarespace.com/static/6580d3c3d590237476692b5e/t/65ced92f3688ba30dd16b38c/1708054840220/yes.gif'
                    : '/GuildGamingAISolution.gif'}
                  alt={project.name + ' project GIF'}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    borderRadius: 8,
                  }}
                />
              </div>
              {project.name === 'Baseball Little League' && (
                <div style={{ display: 'flex', gap: 0, marginBottom: 0, flexWrap: 'wrap' }}>
                  <span style={{ paddingTop: 2, paddingBottom: 2, paddingLeft: 8, paddingRight: 8, fontSize: 11, marginRight: 8, border: '1px solid #c3c3c3', borderRadius: 8, marginBottom: 12, marginTop: 2, display: 'inline-block', backgroundColor: '#fefefe', fontFamily: 'Inter', color: '#111111', fontWeight: 400 }}>University-Sponsored Project</span>
                  <span style={{ paddingTop: 2, paddingBottom: 2, paddingLeft: 8, paddingRight: 8, fontSize: 11, marginRight: 8, border: '1px solid #c3c3c3', borderRadius: 8, marginBottom: 12, marginTop: 2, display: 'inline-block', backgroundColor: '#fefefe', fontFamily: 'Inter', color: '#111111', fontWeight: 400 }}>Sports Productivity</span>
                  <span style={{ paddingTop: 2, paddingBottom: 2, paddingLeft: 8, paddingRight: 8, fontSize: 11, marginRight: 8, border: '1px solid #c3c3c3', borderRadius: 8, marginBottom: 12, marginTop: 2, display: 'inline-block', backgroundColor: '#fefefe', fontFamily: 'Inter', color: '#111111', fontWeight: 400 }}>B2C</span>
                  <span style={{ paddingTop: 2, paddingBottom: 2, paddingLeft: 8, paddingRight: 8, fontSize: 11, marginRight: 8, border: '1px solid #c3c3c3', borderRadius: 8, marginBottom: 12, marginTop: 2, display: 'inline-block', backgroundColor: '#fefefe', fontFamily: 'Inter', color: '#111111', fontWeight: 400 }}>Product Design</span>
                </div>
              )}
              {project.name === 'Guild Gaming' && (
                <div style={{ display: 'flex', gap: 0, marginBottom: 0, flexWrap: 'wrap' }}>
                  <span style={{ paddingTop: 2, paddingBottom: 2, paddingLeft: 8, paddingRight: 8, fontSize: 11, marginRight: 8, border: '1px solid #c3c3c3', borderRadius: 8, marginBottom: 12, marginTop: 2, display: 'inline-block', backgroundColor: '#fefefe', fontFamily: 'Inter', color: '#111111', fontWeight: 400 }}>Internship</span>
                  <span style={{ paddingTop: 2, paddingBottom: 2, paddingLeft: 8, paddingRight: 8, fontSize: 11, marginRight: 8, border: '1px solid #c3c3c3', borderRadius: 8, marginBottom: 12, marginTop: 2, display: 'inline-block', backgroundColor: '#fefefe', fontFamily: 'Inter', color: '#111111', fontWeight: 400 }}>AI</span>
                  <span style={{ paddingTop: 2, paddingBottom: 2, paddingLeft: 8, paddingRight: 8, fontSize: 11, marginRight: 8, border: '1px solid #c3c3c3', borderRadius: 8, marginBottom: 12, marginTop: 2, display: 'inline-block', backgroundColor: '#fefefe', fontFamily: 'Inter', color: '#111111', fontWeight: 400 }}>Productivity</span>
                  <span style={{ paddingTop: 2, paddingBottom: 2, paddingLeft: 8, paddingRight: 8, fontSize: 11, marginRight: 8, border: '1px solid #c3c3c3', borderRadius: 8, marginBottom: 12, marginTop: 2, display: 'inline-block', backgroundColor: '#fefefe', fontFamily: 'Inter', color: '#111111', fontWeight: 400 }}>Event Management</span>
                  <span style={{ paddingTop: 2, paddingBottom: 2, paddingLeft: 8, paddingRight: 8, fontSize: 11, marginRight: 8, border: '1px solid #c3c3c3', borderRadius: 8, marginBottom: 12, marginTop: 2, display: 'inline-block', backgroundColor: '#fefefe', fontFamily: 'Inter', color: '#111111', fontWeight: 400 }}>Data Analytics</span>
                </div>
              )}
              <div style={{ 
                fontWeight: 600, 
                fontSize: isMobile ? '16px' : '18px', 
                marginBottom: 12, 
                textAlign: 'left', 
                color: '#111111' 
              }}>{project.name}</div>
              <div style={{ 
                fontSize: isMobile ? '13px' : '14px', 
                color: '#595858', 
                textAlign: 'left' 
              }}>{project.description}</div>
            </div>
          );
          return isBaseball ? (
            <Link to="/project/baseball-little-league" style={{ textDecoration: 'none', color: 'inherit', width: '100%' }} key={project.name}>
              {cardContent}
            </Link>
          ) : (
            <Link to="/project/guild-gaming" style={{ textDecoration: 'none', color: 'inherit', width: '100%' }} key={project.name}>
              {cardContent}
            </Link>
          );
        })}
      </div>
    </main>
  )
}

function About() {
  return (
    <div className="about">
      <div className="about__container">
        <div className="about__intro">
          <span className="about__title">Hi, I'm Ayo.</span>
            <div style={{ height: 8 }}></div>
          <span className="about__subtitle">Nice to meet you 👋🏿</span>
            <div style={{ height: 24 }}></div>
          <span className="about__description">Let me properly introduce myself:</span>
        </div>
        
        <div className="bento-grid">
          {/* Profile Image Card */}
                      <div className="bento-grid__card bento-grid__profile" style={{ border: '1px solid #e0e0e0' }}>
            <img 
              src="/Me.jpeg" 
              alt="This is who I am" 
              className="bento-grid__profile-image"
            />
          </div>
          
                    {/* Location Card */}
                      <div className="bento-grid__card bento-grid__location" style={{ border: '1px solid #e0e0e0' }}>
            <div className="bento-grid__location-content">
              <div className="bento-grid__location-pin">📍</div>
              <div className="bento-grid__location-city">West Lafayette, Indiana</div>
              <div className="bento-grid__location-subtitle">We love corn out here</div>
            </div>
          </div>
          
          {/* Interests Card */}
          <div className="bento-grid__card bento-grid__interests" style={{ border: '1px solid #e0e0e0' }}>
            <div className="bento-grid__interests-title">Interests</div>
            <div className="bento-grid__interests-grid">
              <div className="bento-grid__interests-item">
                <span className="bento-grid__interests-emoji">⚽</span>
                <span>Soccer</span>
              </div>
              <div className="bento-grid__interests-item">
                <span className="bento-grid__interests-emoji">🥾</span>
                <span>Nature walks</span>
              </div>
              <div className="bento-grid__interests-item">
                <span className="bento-grid__interests-emoji">🏃🏿‍♂️</span>
                <span>Jogging</span>
              </div>
              <div className="bento-grid__interests-item">
                <span className="bento-grid__interests-emoji">🎵</span>
                <span>Music</span>
              </div>
              <div className="bento-grid__interests-item">
                <span className="bento-grid__interests-emoji">📸</span>
                <span>Photography</span>
              </div>
              <div className="bento-grid__interests-item">
                <span className="bento-grid__interests-emoji">💪🏿</span>
                <span>Calisthenics</span>
              </div>
            </div>
          </div>
          
                    {/* Who Am I Card */}
          <div className="bento-grid__card bento-grid__content" style={{ border: '1px solid #e0e0e0' }}>
            <span className="bento-grid__content-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Person icon representing personal identity" role="img">
                <circle cx="12" cy="8" r="5" stroke="#9B6FD9" strokeWidth="2" fill="none"/>
                <path d="M20 21c0-4.4-3.6-8-8-8s-8 3.6-8 8" stroke="#9B6FD9" strokeWidth="2" fill="none"/>
              </svg>
            </span>
            <div className="bento-grid__content-text">
              <div className="bento-grid__content-title">Who am I?</div>
              <div className="bento-grid__content-description">
                My full name is Ayomikun, which means "my joy is full." I believe in building meaningful connections and moments that matter.
              </div>
            </div>
          </div>
          
          {/* Philosophy Card */}
          <div className="bento-grid__card bento-grid__content bento-grid__content--philosophy" style={{ border: '1px solid #e0e0e0' }}>
            <span className="bento-grid__content-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Lightbulb icon representing ideas and philosophy" role="img">
                <path d="M12 2a8 8 0 0 1 8 8c0 3.5-2 6-4 7.5V20a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2v-2.5C6 16 4 13.5 4 10a8 8 0 0 1 8-8z" stroke="#9B6FD9" strokeWidth="2" fill="none"/>
                <path d="M9 18h6" stroke="#9B6FD9" strokeWidth="2" strokeLinecap="round"/>
                <path d="M10 22h4" stroke="#9B6FD9" strokeWidth="2" strokeLinecap="round"/>
                <path d="M12 6a4 4 0 0 1 4 4c0 1.5-1 2.5-2 3" stroke="#9B6FD9" strokeWidth="2" fill="none"/>
              </svg>
            </span>
            <div className="bento-grid__content-text">
              <div className="bento-grid__content-title bento-grid__content-title--small">My Philosophy</div>
              <div className="bento-grid__content-description bento-grid__content-description--tight">
                "Connection creates creativity." Building strong relationships and listening with empathy are essential to meaningful design.
              </div>
            </div>
          </div>
          
          {/* Journey Card */}
          <div className="bento-grid__card bento-grid__content bento-grid__content--journey" style={{ border: '1px solid #e0e0e0' }}>
            <span className="bento-grid__content-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Layers icon representing journey and progression" role="img">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="#9B6FD9" strokeWidth="2" fill="none"/>
              </svg>
            </span>
            <div className="bento-grid__content-text">
              <div className="bento-grid__content-title bento-grid__content-title--small">My Journey</div>
              <div className="bento-grid__content-description bento-grid__content-description--tight">
                Creativity has always been a part of me. From dreaming of becoming a chef to exploring software development, and eventually finding my path in UX design.
              </div>
            </div>
          </div>
          
          {/* Scotland Photo */}
          <div className="bento-grid__photo bento-grid__photo--scotland">
            <img 
              src="/visit to Scotland.jpeg"
              alt="Scotland adventure" 
              className="bento-grid__photo-image"
            />
          </div>
           
          {/* Waterfall Photo */}
          <div className="bento-grid__photo bento-grid__photo--waterfall">
            <img 
              src="/waterfall.jpeg"
              alt="Beautiful waterfall" 
              className="bento-grid__photo-image"
            />
          </div>
 
          {/* Sheep Photo */}
          <div className="bento-grid__photo bento-grid__photo--sheep">
            <img 
              src="/sheep.jpeg"
              alt="Adorable sheep" 
              className="bento-grid__photo-image"
            />
          </div>
 
          {/* By the Lake Photo */}
          <div className="bento-grid__photo bento-grid__photo--lake">
            <img 
              src="/By the lake.jpeg"
              alt="Peaceful lake moment" 
              className="bento-grid__photo-image"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

function Resume() {
  return (
    <div>
      <h1>Resume</h1>
      <p>This is a placeholder for your resume. You can add a PDF download or embed here.</p>
    </div>
  )
}

// Responsive helper
const isMobile = typeof window !== 'undefined' && window.innerWidth <= 800;

function Project() {
  // Check if this is the Baseball Little League case study
  const path = window.location.pathname;
  if (path === '/project/baseball-little-league') {
    return (
      <div className="case-study">
        {/* Three phones image full-bleed */}
        <div className={`case-study__hero-banner ${!isMobile ? 'case-study__hero-banner--desktop' : ''}`}>
          <img
            src="/bannerforLittleLeague.png"
            alt="Three smartphones displaying a team management app interface"
            className="case-study__hero-banner-image"
          />
        </div>
        {/* Hero Section */}
        <section className="case-study__hero-section">
          <h1 className="case-study__hero-title">
            Baseball Little League: <span style={{ fontWeight: 500, color: '#111111' }}>Facilitating seamless communication between Coaches and Parents</span>
          </h1>
          <div className="case-study__hero-subtitle">
            <div className="case-study__project-details">
              <div className="case-study__project-detail-item">
                <span className="case-study__project-detail-label">Sponsored project through Purdue University</span>
              </div>
              <div className="case-study__project-detail-item">
                <span className="case-study__project-detail-label">Client:</span> Tim Porter
              </div>
              <div className="case-study__project-detail-item">
                <span className="case-study__project-detail-label">Product Sector:</span> Sports, Communication
              </div>
              <div className="case-study__project-detail-item">
                <span className="case-study__project-detail-label">Team:</span> 8 UX Designers where I was responsible for stakeholder conversation and prototyped the onboarding state for our users
              </div>
              <div className="case-study__project-detail-item">
                <span className="case-study__project-detail-label">Duration:</span> 4 months
              </div>
              <div className="case-study__project-detail-item">
                <span className="case-study__project-detail-label">Deliverables:</span> Presentation, Documentation, and High - Fidelity Prototypes
              </div>
            </div>
          </div>
        </section>
        {/* Discovery Section */}
        <section className="case-study__section">
          <h3 className="case-study__section-title">Discovery</h3>
          <p className="case-study__section-text">
            In our kickoff meeting with Tim Porter, we learned that the League aims to reduce the rates of children having to drop out of his Little League program due to a lack of effective communication between him, his coaches, and all of the parents. With our help, they hope to provide parents and coaches with a better organizational experience next season.
          </p>
          {/* The Current Experience Section */}
          <section className="case-study__section">
            <h3 className="case-study__section-title">Understanding the Current Experience</h3>
            <p className="case-study__section-text">
            During that same meeting, our client shared the challenges coaches and parents faced last season, which led us to discover that:
            </p>
            <div className={`case-study__cards-grid ${isMobile ? 'case-study__cards-grid--mobile' : ''}`}>
              {/* Card 1 */}
              <div className={`case-study__card ${isMobile ? 'case-study__card--mobile' : ''}`} style={{ border: '1px solid #e0e0e0' }}>
                <div className="case-study__card-icon">
                  <span className="case-study__card-icon-wrapper">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Email icon representing communication overload" role="img">
                      <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 2v.01L12 13 4 6.01V6h16zm0 12H4V8.99l8 6.99 8-6.99V18z" fill="#9B6FD9"/>
                    </svg>
                  </span>
                </div>
                <div className="case-study__current-experience-title">Coaches' communication overload</div>
                <div className="case-study__current-experience-description">
                  Coaches send around 300 emails to parents about league updates, leading to information overload and added workload.
                </div>
              </div>
              {/* Card 2 */}
              <div className={`case-study__card case-study__card--small ${isMobile ? 'case-study__card--small--mobile' : ''}`} style={{ border: '1px solid #e0e0e0' }}>
                <div className="case-study__card-icon">
                  <span className="case-study__card-icon-wrapper">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Smiley face icon representing user experience" role="img">
                      <circle cx="12" cy="12" r="10" stroke="#9B6FD9" strokeWidth="2" fill="none"/>
                      <path d="M8 11c.5-.5 1.5-.5 2 0" stroke="#9B6FD9" strokeWidth="1.5" strokeLinecap="round"/>
                      <path d="M16 11c.5-.5 1.5-.5-2 0" stroke="#9B6FD9" strokeWidth="1.5" strokeLinecap="round"/>
                      <path d="M9 16c1.5-1 4.5-1 6 0" stroke="#9B6FD9" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  </span>
                </div>
                <div className="case-study__current-experience-title">Parents' information fatigue</div>
                <div className="case-study__current-experience-description">
                  Parents struggled to keep up, often forgetting key details and missing practices or games.
                </div>
              </div>
            </div>
            <p className="case-study__section-text">
              Understanding these challenges helped us better identify our users' needs and focus our research on improving communication between coaches and parents for next season.
            </p>
          </section>
          {/* Spacer div for gap between sections */}
          <div style={{ height: '24px' }}></div>
          {/* Channels of Communication Section */}
          <section className="case-study__section case-study__section--large">
            <div className="case-study__section-label">FEATURES</div>
            <h3 className="case-study__section-title">Channels of Communication</h3>
            <div className="case-study__communication-cards">
              {/* Messages Card */}
              <div className="case-study__communication-card" style={{ border: '1px solid #e0e0e0' }}>
                <div className="case-study__communication-card-title">Messages</div>
                <div className="case-study__communication-card-description">Reduces the stress and mental capacity to read or respond to messages.</div>
                <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                  <div style={{ borderRadius: '20px', maxWidth: '540px', width: '100%', margin: '0 auto', display: 'flex', justifyContent: 'center', overflow: 'hidden' }}>
                    <img src="https://static1.squarespace.com/static/6580d3c3d590237476692b5e/t/676eff86b753a958278578a6/1735327623368/yes+again.png" alt="Messages app screenshot" style={{ width: '100%', height: 'auto', objectFit: 'cover', borderRadius: '20px', display: 'block' }} />
                  </div>
                </div>
              </div>
              {/* Calendar Card */}
              <div className="case-study__communication-card" style={{ border: '1px solid #e0e0e0' }}>
                <div className="case-study__communication-card-title">Calendar</div>
                <div className="case-study__communication-card-description">Plan and schedule around the kids league events.</div>
                <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                  <div style={{ borderRadius: '20px', maxWidth: '540px', width: '100%', margin: '0 auto', display: 'flex', justifyContent: 'center', overflow: 'hidden' }}>
                    <img src="https://static1.squarespace.com/static/6580d3c3d590237476692b5e/t/677c34652aa8160fae5e6099/1736193125964/calendar_pt4.png" alt="Calendar app screenshot" style={{ width: '100%', height: 'auto', objectFit: 'cover', borderRadius: '20px', display: 'block' }} />
                  </div>
                </div>
              </div>
              {/* Availability */}
              <div className="case-study__communication-card" style={{ border: '1px solid #e0e0e0' }}>
                <div className="case-study__communication-card-title">Availability</div>
                <div className="case-study__communication-card-description">Manage who can attend and cannot attend.</div>
                <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                  <div style={{ borderRadius: '20px', maxWidth: '540px', width: '100%', margin: '0 auto', display: 'flex', justifyContent: 'center', overflow: 'hidden' }}>
                    <img src="https://static1.squarespace.com/static/6580d3c3d590237476692b5e/t/677320f93414db375b34a6b5/1735598329789/uty.png" alt="Availability" style={{ width: '100%', height: 'auto', objectFit: 'cover', borderRadius: '20px', display: 'block' }} />
                  </div>
                </div>
              </div>
              {/* Announcements */}
              <div className="case-study__communication-card" style={{ border: '1px solid #e0e0e0' }}>
                <div className="case-study__communication-card-title">Announcements</div>
                <div className="case-study__communication-card-description">Quickly report conflicts within league events.</div>
                <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                  <div style={{ borderRadius: '20px', maxWidth: '540px', width: '100%', margin: '0 auto', display: 'flex', justifyContent: 'center', overflow: 'hidden' }}>
                    <img src="https://static1.squarespace.com/static/6580d3c3d590237476692b5e/t/6773225b90223b7c75283df1/1735598683937/u.png" alt="Announcements app screenshot" style={{ width: '100%', height: 'auto', objectFit: 'cover', borderRadius: '20px', display: 'block' }} />
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* Spacer div before Competitive Audit */}
          <div style={{ height: '16px' }}></div>
          {/* Competitive Audit Section */}
          <section className="case-study__section case-study__section--spaced">
            <h3 className="case-study__section-title">Competitive Audit</h3>
            <div className="case-study__section-subtitle">
              In what ways do communication apps promote alignment within an organization?
            </div>
            <div className="case-study__section-text">
              With a clear understanding of the league's challenges and current experience, our team conducted a competitive audit using the question above to guide our thinking. We found that applications like <strong>Slack, Team App, Team Snap, and Team Sideline</strong> share common features with our proposed solution, including Messaging, Calendar, Availability, and Announcements.
            </div>
            {/* Three Cards Row Section */}
            <div className="case-study__competitive-cards">
              {/* Left Card */}
              <div className="case-study__competitive-card" style={{ border: '1px solid #e0e0e0' }}>
                <div className="case-study__competitive-card-image-container">
                  <img src="/Inspiration from Slack.jpg" alt="Slack use case" className="case-study__competitive-card-img" />
                </div>
                <div className="case-study__insight-card-content">
                  <div className="case-study__competitive-card-title">Slack's approach to Messages </div>
                  <div className="case-study__competitive-card-description">Slack allows users to create dedicated channels for specific topics, giving them more control over how conversations are organized.</div>
                </div>
              </div>
              {/* Center Card */}
              <div className="case-study__competitive-card" style={{ border: '1px solid #e0e0e0' }}>
                <div className="case-study__competitive-card-image-container">
                <img src="/availabilityfromSnap.png" alt="Team Snap use case" className="case-study__competitive-card-img" />
                </div>
                <div className="case-study__insight-card-content">
                  <div className="case-study__competitive-card-title">Team Snap's approach to Availability</div>
                  <div className="case-study__competitive-card-description">Know who's available for the game ahead of time, no more guessing when players arrive or scrambling to decide whether to cancel or proceed.</div>
                </div>
              </div>
              {/* Right Card */}
              <div className="case-study__competitive-card case-study__competitive-card--sideline" style={{ border: '1px solid #e0e0e0' }}>
                <div className="case-study__competitive-card-image-container">
                <img src="/Calendarinspo.png" alt="Team Sideline use case" className="case-study__competitive-card-img" />
                </div>
                <div className="case-study__insight-card-content">
                  <div className="case-study__competitive-card-title">Team Sideline's approach to Calendar</div>
                  <div className="case-study__competitive-card-description">Easily view all scheduled events at a glance with a calendar and event list organized by date, type, and team.</div>
                </div>
              </div>
            </div>
            {/* Spacer div for gap between sections */}
          <div style={{ height: '16px' }}></div>
          </section>
          {/* Interviews Section */}
          <section className="case-study__section case-study__section--spaced">
            <h3 className="case-study__section-title">Interviews</h3>
            <div className="case-study__section-subtitle">
              Our interviewee mentioned that regularly, when there are games or practice cancelations, at least 26.6% will still show up to drop off their children even after communication of the cancelation had been initiated hours ago.
            </div>
            <div className="case-study__section-text">
              We talked to a former member of the board who informed us about the details above when updates aren't received by the parents. This made us curious to understand how communication tends to fall through when updates are sent out through a journey map.
            </div>
            {/* Journey Map Image Section */}
            <JourneyMapViewer />
            {/* Spacer div for gap between sections */}
          <div style={{ height: '16px' }}></div>
          </section>
          {/* Analysis Section (moved and restyled) */}
          <section className="case-study__section case-study__section--spaced">
            <h3 className="case-study__section-title">Analysis</h3>
            <p className="case-study__section-text">
              With the help of the journey map, we were able to pinpoint where communication breaks down, primarily through <strong>emails</strong> and <strong>text messages</strong> which often fails to assist parents with league updates effectively. This creates confusion, missed updates, and unnecessary stress for both parents and coaches.
              <span className="case-study__section-text-highlight">
                To address this, we created an affinity diagram to analyze features that could offer both parents and coaches a seamless experience aligned with their day-to-day responsibilities.
              </span>
            </p>
            <AffinityDiagramViewer />
          </section>
          {/* Spacer div for gap between sections */}
          <div style={{ height: '16px' }}></div>
          {/* Main Insights Section */}
          <section className="case-study__section case-study__section--spaced">
            <h3 className="case-study__section-title">Main Insights</h3>
            <p className="case-study__section-text">
              From our analysis, we identified key themes that revealed the need for specific features designed to support both coaches and parents in the long run.
            </p>
            <div className="case-study__insights-cards">
              {/* Team Attendance Card */}
              <div className="case-study__insight-card case-study__card--mobile" style={{ border: '1px solid #e0e0e0' }}>
                <div className="case-study__insight-card-icon">
                  <span className="case-study__insight-card-icon-wrapper">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Calendar with checkmark icon representing team attendance tracking" role="img">
                      <rect x="3" y="5" width="18" height="16" rx="2" stroke="#9B6FD9" strokeWidth="2"/>
                      <path d="M16 3V7" stroke="#9B6FD9" strokeWidth="2" strokeLinecap="round"/>
                      <path d="M8 3V7" stroke="#9B6FD9" strokeWidth="2" strokeLinecap="round"/>
                      <path d="M3 11H21" stroke="#9B6FD9" strokeWidth="2" strokeLinecap="round"/>
                      <path d="M9.5 15l2 2 3-3" stroke="#9B6FD9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                </div>
                <div className="case-study__insight-card-content">
                  <div className="case-study__card-title">Team Attendance</div>
                  <div className="case-study__card-description">
                    Coaches rely on player accountability for league events to determine if games should proceed or be canceled.
                  </div>
                </div>
              </div>
              {/* League Calendar Card */}
              <div className="case-study__insight-card case-study__card--mobile" style={{ border: '1px solid #e0e0e0' }}>
                <div className="case-study__insight-card-icon">
                  <span className="case-study__insight-card-icon-wrapper">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Calendar icon representing league schedule and events" role="img">
                      <rect x="3" y="5" width="18" height="16" rx="2" stroke="#9B6FD9" strokeWidth="2"/>
                      <path d="M16 3V7" stroke="#9B6FD9" strokeWidth="2" strokeLinecap="round"/>
                      <path d="M8 3V7" stroke="#9B6FD9" strokeWidth="2" strokeLinecap="round"/>
                      <path d="M3 11H21" stroke="#9B6FD9" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  </span>
                </div>
                <div className="case-study__insight-card-content">
                  <div className="case-study__card-title">League Calendar</div>
                  <div className="case-study__card-description">
                    Without visibility into upcoming events, parents struggle to schedule time off work to attend and support their child's league events.
                  </div>
                </div>
              </div>
              {/* League Alerts Card */}
              <div className="case-study__insight-card case-study__insight-card--alerts case-study__card--mobile" style={{ border: '1px solid #e0e0e0' }}>
                <div className="case-study__insight-card-icon case-study__insight-card-icon--absolute">
                  <span className="case-study__insight-card-icon-wrapper">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Bell notification icon representing league alerts and updates" role="img">
                      <path d="M12 22a2 2 0 0 0 2-2H10a2 2 0 0 0 2 2zm6-6V11c0-3.07-1.63-5.64-5-6.32V4a1 1 0 1 0-2 0v.68C7.63 5.36 6 7.92 6 11v5l-1.29 1.29A1 1 0 0 0 6 19h12a1 1 0 0 0 .71-1.71L18 16z" stroke="#9B6FD9" strokeWidth="2" fill="none"/>
                    </svg>
                  </span>
                </div>
                <div className="case-study__insight-card-content">
                  <div className="case-study__card-title">League Alerts</div>
                  <div className="case-study__card-description">
                    Coaches need a more efficient and effective way to share league updates with parents, one that respects their time and schedules, as emails and text messages caused more stress than clarity.
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* Spacer div for gap between sections */}
          <div style={{ height: '16px' }}></div>
          {/* Ideation Section */}
          <section className="case-study__section case-study__section--spaced">
            <h3 className="case-study__section-title">Ideation</h3>
            <div className="case-study__section-subtitle">
              Shortcomings + a new direction for a more pragmatic solution
            </div>
            <p className="case-study__section-text">
              With the features in mind, we started sketching out how they might look, but then a key question came up: "<strong>What device makes the most sense for parents to use these features?</strong>" In a previous meeting, we learned that the league currently uses a desktop to manage game schedules and view past results. This suggested that designing for desktop wouldn't meet the needs of parents, who are often on the go and require quick, mobile access to updates.
            </p>
            <div className="case-study__section-subtitle--small">
              Inevitable, Unavoidable Tradeoffs
            </div>
            <p className="case-study__section-text">
              When designing the announcement feature, our team had a few different ideas on how coaches should create alerts or updates with ease. Here's a look at what we explored and why.
            </p>
            <div className="case-study__idea-title">
              Idea 1: Vertical Duration with Push Notifications
            </div>
            <DesignExploration1Viewer />
            <div className="case-study__idea-title">
              Idea 2: Description + Vertical Duration 
            </div>
            <DesignExploration2Viewer />
            <div className="case-study__idea-title">
              Idea 3: Headline with Description + Horizontal Duration
            </div>
            <DesignExploration3Viewer />
            {/* Final Screens Section */}
            {/* Spacer div for gap between sections */}
            <div style={{ height: '16px' }}></div>
            <section className="case-study__final-screens">
              <div className="case-study__section-label">
                FINAL SCREENS
              </div>
              {/* Coaches Subsection */}
              <div className="case-study__final-screens-subtitle case-study__final-screens-subtitle--coaches">
                Coaches <span role="img" aria-label="party">🎉</span>
              </div>
              <p className="case-study__section-text">
                Coaches, with the help of these three features, can holistically deliver information to parents in a concise manner.
              </p>
              <div className="case-study__final-screens-image">
                <img
                  src="/SolutiontoCoaches.gif"
                  alt="Final screens for coaches"
                  className="case-study__final-screens-img"
                />
              </div>
              {/* Parents Subsection */}
              <div className="case-study__final-screens-subtitle case-study__final-screens-subtitle--parents">
                Parents <span role="img" aria-label="family">🧑‍🤝‍🧑</span>
              </div>
              <p className="case-study__section-text">
                Parents lead busy lives, and these features offer stability in their lives while dealing with league conflicts and events.
              </p>
              <div className="case-study__final-screens-image">
              <img
                src="/solutiontoparents.gif"
                  alt="Parent app calendar screenshot"
                  className="case-study__final-screens-img"
              />
              </div>
            </section>
            {/* Spacer div for gap between sections */}
            <div style={{ height: '16px' }}></div>
            {/* Bonus Screens Section */}
            <section className="case-study__section case-study__section--large">
            <div className="case-study__section-label">BONUS SCREENS</div>
              <div className="case-study__section-title">Onboarding Experience</div>
              <div className="case-study__final-screens-image">
                <img
                  src="/onboarding-experience.png"
                  alt="Onboarding Experience screens"
                  className="case-study__final-screens-img"
                />
              </div>
              <div className="case-study__section-title">Login</div>
              <div className="case-study__final-screens-image">
                <img
                  src="/login-experience.png"
                  alt="Login screens"
                  className="case-study__final-screens-imgs"
                  // TODO: Update this image or alt text as needed later
                />
              </div>
          </section>
          </section>
          {/* Conclusion / Reflection + Next steps Section */}
          <section style={{ padding: '64px 0', marginTop: 48, color: '#111111' }}>
            <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 32px' }}>
              <div style={{fontSize: 13, color: '#666', marginBottom: 16}}>
                CONCLUSION
            </div>
              <h2 className="case-study__reflection-title">
                Reflection + Next steps
              </h2>
              <p className="case-study__reflection-text">
                This project taught me a lot—not just about the design process, but also from the teammates I worked alongside. I'm grateful for the guidance, collaboration, and insights I gained throughout the experience. Here are a few key takeaways and ideas we hope to explore further:
              </p>
              <ol className="case-study__reflection-text" style={{ paddingLeft: 24, marginBottom: 0 }}>
                <li style={{ marginBottom: 16 }}><b>Hard-to-Reach Users</b><br />
                  Finding coaches and parents who understood Little League communication challenges was difficult. It showed us that sometimes, we need to improvise when direct access to a user group isn't possible by reaching out to our peers.
                </li>
                <li style={{ marginBottom: 16 }}><b>Learning from Leadership</b><br />
                  Working with teammates who had more experience gave me a chance to observe how they led meetings, organized tasks, and communicated with stakeholders. I'm especially thankful for their encouragement as I led desk crits and client check-ins.
                </li>
                <li style={{ marginBottom: 16 }}><b>Design Isn't Linear</b><br />
                  This project helped me understand that the design process involves constant iteration. We often circled back to research or made changes based on testing feedback, and that flexibility was key to our progress.
                </li>
                <li style={{ marginBottom: 16 }}><b>More Testing (If We Had Time)</b><br />
                  We would've loved to conduct heuristic evaluations, as recommended by our professor, to assess how well our solution met user expectations and where improvements were still needed.
                </li>
                <li><b>Ideas We Hoped to Include</b><br />
                  Due to time limits, we couldn't include every idea we brainstormed. A few features we'd still love to explore include:
                  <ul className="case-study__reflection-text" style={{ paddingLeft: 24, marginBottom: 0 }}>
                    <li>DocuSign Integration for easier sharing of important forms.</li>
                    <li>Calendar Syncing to help parents plan ahead and avoid missing games.</li>
                  </ul>
                </li>
              </ol>
            </div>
          </section>
        </section>
      </div>
    );
  }
  // Guild Gaming case study
  if (path === '/project/guild-gaming') {
    const isMobile = typeof window !== 'undefined' && window.innerWidth <= 800;
    return (
      <div className="case-study case-study--guild-gaming">
        {/* Guild Gaming Banner - match Baseball Little League dimensions */}
        <div className={`case-study__hero-banner ${!isMobile ? 'case-study__hero-banner--desktop' : ''}`}>
          <img
            src="/bannerforGuildGaming.png"
            alt="Guild Gaming project banner"
            className="case-study__hero-banner-image"
          />
        </div>
        {/* Hero Section */}
        <section className="case-study__hero-section">
          <h1 className="case-study__hero-title">
            Guild Gaming: <span style={{ fontWeight: 500, color: '#111111' }}>Leveraging AI to Make Event Performance Analysis Fast, Accessible, and Actionable.</span>
          </h1>
          <div className="case-study__hero-subtitle">
            <div className="case-study__project-details">
              <div className="case-study__project-detail-item">
                <span className="case-study__project-detail-label">Internship Project</span>
              </div>
              <div className="case-study__project-detail-item">
                <span className="case-study__project-detail-label">Product Sector:</span> Esports, Analytics, AI, Software Development, Event Management
              </div>
              <div className="case-study__project-detail-item">
                <span className="case-study__project-detail-label">Role:</span> UX/UI Design Intern
              </div>
              <div className="case-study__project-detail-item">
                <span className="case-study__project-detail-label">Team:</span> 5 UX Designers
              </div>
              <div className="case-study__project-detail-item">
                <span className="case-study__project-detail-label">Duration:</span> 1 month
              </div>
              <div className="case-study__project-detail-item">
                <span className="case-study__project-detail-label">Deliverables:</span> Research Report, Presentation and Low to High Fidelity Prototypes
              </div>
            </div>
          </div>
        </section>
        {/* Discovery Section */}
        <section className="case-study__section">
          <h3 className="case-study__section-title">Discovery</h3>
          <p className="case-study__section-text">
            Before diving into solutions, we needed to understand the landscape. Clay, the founder of Guild Gaming, was building a platform for gaming event organizers. To support this vision, we conducted extensive user research to uncover the real and often overlooked challenges organizers face after their tournaments end.
            <br /><br />
            One theme quickly emerged: <strong>making sense of data post-event is critical.</strong> Event Organizers rely on data to understand whether their event was a success or a failure, both financially and in terms of reach.
          </p>
          <div className="case-study__quote">
            "Numbers for everything.<br />
            The number of entrants.<br />
            How much we spent — and how much we made back from the venue and food.<br />
            How many people watched, and how many followers did we gain on Twitch or Twitter?<br />
            <div className="case-study__quote-attribution">— Survey Participant</div>
          </div>
          <span className="case-study__section-text">
            This insight shaped our next step: finding a way to make this post-event data more accessible, actionable, and aligned with what organizers value.
          </span>
          <div style={{ height: '16px' }} />
        </section>
        {/* Solution Section */}
        <section className="case-study__section">
          <div className="case-study__section-label">SOLUTION</div>
          <div className="case-study__section-title">
            Goodbye to playing the guessing game & analyzing fragmented data, and hello to Leveraging AI to Make Event Performance Analysis Fast, Accessible, and Actionable.
          </div>
          
          <p className="case-study__section-text">
            Event organizers, many of whom lack the expertise to interpret data visualizations, often struggle to make sense of their post-event analytics. This leads to missed opportunities when planning future events.
          </p>
          <p className="case-study__section-text">
            Therefore, we designed a dashboard that leverages AI to help event organizers uncover insights and answer tough questions, transforming raw data into actionable next steps.
          </p>
          
          {/* Dashboard Solution Image */}
          <div className="case-study__section-image">
            <img 
              src="/AIdashboard-GuildGaming.png" 
              alt="AI-powered dashboard solution for Guild Gaming event analytics"
              className="case-study__section-img"
            />
          </div>
          {/* Caption */}
          <p className="case-study__section-caption">
            Designed a dashboard that brings together the best of AI and traditional dashboard designs.
          </p>

          {/* Spacer div for better separation */}
          <div style={{ height: '16px' }}></div>
          <h3 className="case-study__section-title">
            Harnessing the Power of AI in Data Visualization
          </h3>
          <p className="case-study__section-text">
            Rather than reinventing the wheel, we analyzed how AI is applied both within data visualization tools and beyond, drawing inspiration from platforms like Notion, SunDial, and Glean. We examined their use of AI and design patterns to inform our own approach which we will dive into in the next section.
          </p>
          <p className="case-study__section-text">
            From there, we identified three key elements that would allow users to interact seamlessly with the AI in our dashboard.
          </p>
          <ul className="case-study__section-list">
            <li>
              <strong>Cards</strong> displayed insights based on the outcomes of their events, giving users a structured overview of their data.
            </li>
            <li>
              Each card featured an <strong>"Ask AI" button</strong> that users could click to get deeper explanations or ask follow-up questions about the data.
            </li>
            <li>
              An <strong>AI chatbox</strong> provided a familiar space for users to either type their own questions or choose from guided prompts, encouraging exploration and discovery of insights beyond the surface.
            </li>
          </ul>
          
          {/* AI Walkthrough GIF */}
          <div className="case-study__section-image">
            <img 
              src="/AI Dashboard-Walkthrough.gif" 
              alt="AI chatbox walkthrough demonstration"
              className="case-study__section-img"
            />
          </div>
          {/* Caption */}
          <p className="case-study__section-caption">
            Walkthrough of the AI Dashboard
          </p>

          {/* Spacer div for better separation */}
          <div style={{ height: '16px' }}></div>

          <h3 className="case-study__section-title">
            Designing for a use case: Create a Report
          </h3>
          <p className="case-study__section-text">
            Typically, after an event, organizers manually create reports to share with stakeholders, highlighting metrics such as revenue generated, audience engagement, or drops in viewership on platforms like Twitter. However, this process often involves analyzing fragmented data and playing a guessing game to piece together insights. The result? <strong>Reports that lack depth, clarity, and confidence.</strong>
          </p>
          <p className="case-study__section-text case-study__section-text--spaced-question">
            That's when we asked: <strong><em>What if AI could simplify and elevate this process?</em></strong>
          </p>
          {/* Create A Report Walkthrough GIF */}
          <div className="case-study__section-image">
            <img 
              src="/Create A Report Walkthrough.gif" 
              alt="Create a report walkthrough demonstration"
              className="case-study__section-img"
            />
          </div>
          {/* Caption */}
          <p className="case-study__section-caption">
            Create a report walkthrough demonstration
          </p>
        {/* Spacer div for gap between sections */}
            <div style={{ height: '16px' }}></div>
          <p className="case-study__section-text case-study__section-text--spaced-report">
            With creating a report, event organizers remain in control of what goes into their reports, graphs and summaries to requesting tailored recommendations for future events. The AI pulls all relevant insights together and generates a polished PDF report.
          </p>
            {/* Spacer div for gap between sections */}
          <div style={{ height: '16px' }}></div>
          <h4 className="case-study__section-title">
            Export reports in formats that match your workflow.
          </h4>
            
          {/* [image] placeholder for create report section */}
          <div className="case-study__placeholder">
            [Create Report Feature Image]
          </div>
          <p className="case-study__section-text">
            Additionally, organizers can export their reports in multiple formats, Notion, Microsoft Word, or Excel, giving them flexibility to present, document, or collaborate however they prefer.
          </p>
      
        <div style={{ height: '16px' }} />
          {/* Research Section */}
          <section className="case-study__section">
            <div className="case-study__section-label">RESEARCH</div>
            <h3 className="case-study__section-title">Understanding the User</h3>
            <p className="case-study__section-text">
              Using the gaming communities around Texas, we conducted a survey to understand the current post-event workflow of event organizers who have experience organizing tournaments in their various cities in TX. Our goal was to learn what application(s) are being used, the pain points, and the needs of our users to make their workflow seamless for understanding post-event outcomes.
            </p>
          </section>
          {/* Findings Section */}
          <section className="case-study__section">
            <div className="case-study__section-label">OUR FINDINGS</div>
            <div className={`case-study__cards-grid ${isMobile ? 'case-study__cards-grid--mobile' : ''}`}>
              <div className={`case-study__card ${isMobile ? 'case-study__card--mobile' : ''}`}>
                <div className="case-study__card-icon">
                  <span className="case-study__card-icon-wrapper">
                    {/* Bar chart icon */}
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" style={{ display: 'block', margin: 'auto' }} xmlns="http://www.w3.org/2000/svg" aria-label="Bar chart icon representing data visualization and analytics" role="img">
                      <rect x="3" y="12" width="4" height="8" stroke="#9B6FD9" strokeWidth="2" fill="none" />
                      <rect x="10" y="8" width="4" height="12" stroke="#9B6FD9" strokeWidth="2" fill="none" />
                      <rect x="17" y="4" width="4" height="16" stroke="#9B6FD9" strokeWidth="2" fill="none" />
                    </svg>
                  </span>
                </div>
                <div className="case-study__card-title">Using Google Sheets or Excel means building graphs manually, which can quickly get messy as more sheets pile up.</div>
                <div className="case-study__card-description">We asked participants about the applications being utilized, and a participant mentioned, <strong>"Excel spreadsheets are typically my go-to for budgeting and managing money."</strong>- Survey Participant</div>
              </div>
              <div className={`case-study__card case-study__card--small ${isMobile ? 'case-study__card--small--mobile' : ''}`}>
                <div className="case-study__card-icon">
                  <span className="case-study__card-icon-wrapper">
                    {/* Clock icon */}
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" style={{ display: 'block', margin: 'auto' }} xmlns="http://www.w3.org/2000/svg" aria-label="Clock icon representing time management and efficiency" role="img">
                      <circle cx="12" cy="12" r="10" stroke="#9B6FD9" strokeWidth="2" fill="none" />
                      <path d="M12 6v6l4 2" stroke="#9B6FD9" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </span>
                </div>
                <div className="case-study__card-title">Users need to ask the difficult questions, but may not have the expertise to answer them.</div>
                <div className="case-study__card-description">When we asked participants about what they looked to determine that their event was a success or not, a participant mentioned, <strong>"I need to quickly understand what worked and what didn't, so I can improve the next event without spending hours piecing data together."</strong>- Survey Participant.</div>
              </div>
              <div className={`case-study__card case-study__card--small ${isMobile ? 'case-study__card--small--mobile' : ''}`} style={{ gridColumn: '1 / span 2', justifySelf: 'center' }}>
                <div className="case-study__card-icon">
                  <span className="case-study__card-icon-wrapper">
                    {/* Lightbulb icon */}
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" style={{ display: 'block', margin: 'auto' }} xmlns="http://www.w3.org/2000/svg" aria-label="Lightbulb icon representing ideas and workflow optimization" role="img">
                      <path d="M12 2a8 8 0 0 1 8 8c0 3.5-2 6-4 7.5V20a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2v-2.5C6 16 4 13.5 4 10a8 8 0 0 1 8-8z" stroke="#9B6FD9" strokeWidth="2" fill="none"/>
                      <path d="M9 18h6" stroke="#9B6FD9" strokeWidth="2" strokeLinecap="round"/>
                      <path d="M10 22h4" stroke="#9B6FD9" strokeWidth="2" strokeLinecap="round"/>
                      <path d="M12 6a4 4 0 0 1 4 4c0 1.5-1 2.5-2 3" stroke="#9B6FD9" strokeWidth="2" fill="none"/>
                    </svg>
                  </span>
                </div>
                <div className="case-study__card-title">Manual graph creation can slow down event organizers' workflows.</div>
                <div className="case-study__card-description">When asked how they decide on the right type of chart to use, one participant expressed the common challenge many face: <strong>"I need a way to automatically visualize my data without juggling multiple sheets or building every chart from scratch."</strong> They emphasized that manually creating visuals not only takes too much time but also increases the risk of errors and clutter, making it harder to focus on the insights that truly matter.</div>
              </div>
            </div>
          </section>
        </section>
        <div style={{ height: '16px' }}></div>
        {/* Competitive Audit Section */}
        <section className="case-study__section case-study__section--spaced">
          <h3 className="case-study__section-title">Competitive Audit</h3>
          <p className="case-study__section-text">Now that we've understood the users, our next focus was to see how we could potentially assist them by learning how platforms are making the best use of AI within data analytics.</p>
          {/* Company Logos Section */}
          <div className="case-study__company-logos">
            <div className="case-study__company-logo">
              <img src="/sundial logo.jpeg" alt="Sundial Logo" className="case-study__company-logo-img" />
            </div>
            <div className="case-study__company-logo">
              <img src="/thoughtspot logo.png" alt="ThoughtSpot Logo" className="case-study__company-logo-img" />
            </div>
            <div className="case-study__company-logo">
              <img src="/glean-logo.png" alt="Glean Logo" className="case-study__company-logo-img" />
            </div>
          </div>
          {/* 1. Sundail.so Section */}
          <section className="case-study__section">
            <h4 className="case-study__section-title--large">1. SunDial.so</h4>
            <p className="case-study__section-text">
              With SunDial AI's guided questions, users can ask broad business questions and receive clear, actionable reports in minutes. It uses guided questions to remove guesswork, helping users quickly understand their data and make confident decisions.
            </p>
          </section>
          {/* 2. ThoughtSpot Section */}
          <section className="case-study__section">
            <h4 className="case-study__section-title--large">2. ThoughtSpot</h4>
            <p className="case-study__section-text">
              ThoughtSpot's AI acts like a personal data analyst, helping users uncover insights and answer business questions in seconds. No technical skills required. Their dashboard approach emphasizes natural language queries and automated insights, making complex data analysis accessible to non-technical users.
            </p>
          </section>
          {/* 3. Glean Section */}
          <section className="case-study__section">
            <h4 className="case-study__section-title--large">3. Glean</h4>
            <p className="case-study__section-text">
              Glean's AI leverages a company's internal data and knowledge to deliver insights that help improve key performance indicators (KPIs). It allows users to ask questions in plain English, delivering contextual AI responses based on company data.
            </p>
          </section>
          <div style={{ height: '16px' }}></div>
          {/* Ideation Section */}
          <section className="case-study__section">
            <h3 className="case-study__section-title">Ideation</h3>
            <p className="case-study__section-text">
              The key takeaway from our user research is that users prioritize efficiency, automated workflows, and simplicity. With these insights in mind, the main goal was <strong>to design a dashboard that leverages AI in assisting users by quickly deriving insights from analytical graphs.</strong>
              <br /><br />
              Once the main goal was clear to us, we began exploring different ideas on how to utilize AI tailored to their specific need of quickly understanding post-event outcomes.
            </p>
            <div className="case-study__ideation-section">
              <div className="case-study__ideation-title">
                Exploration #1: AI-Powered Dashboard
              </div>
              <p className="case-study__ideation-description">Our first exploration follows the concept of the platforms we conducted for our competitive audit, which have AI as their core functionality: embed into the analytical workflow. These dashboards are smart-live data analysts that provide users with insights into graphs, capable of having conversations and more.</p>
              <p className="case-study__section-text">
                Some of these applications include: Glean, Sundial, et al
              </p>
              {/* Image goes here */}
              <div className="case-study__section-image">
                <img
                  src="/Sundialaipowered.png"
                  alt="AI dashboard visual"
                  className="case-study__section-img"
                />
              </div>
              {/* Caption */}
              <p className="case-study__section-caption">
                Sundial's dashboard brings AI insights directly into the analytics workflow.
              </p>
              <div style={{ height: '16px' }}></div>
              <div className="case-study__ideation-title">
                Exploration #2: Conversational Dashboard
              </div>
              <div style={{ height: '16px' }}></div>
              {/* Video Card */}
              <div className="case-study__competitive-card">
                {/* Video */}
                <div className="case-study__competitive-card-image-container">
                  <video
                    width="100%"
                    height="100%"
                    className="case-study__competitive-card-img"
                    autoPlay
                    loop
                    muted
                    playsInline
                    aria-label="Sundial demo video"
                  >
                    <source src="/glean-demo.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              </div>
              {/* Caption */}
              <p className="case-study__section-caption">
                This is a demo showcasing Glean's AI Assistant.
              </p>
              <p className="case-study__ideation-description">Our next exploration was the concept of conversational dashboards powered by Generative AI, uses features similarly to ChatGPT, Copilot, or Claude. These interfaces allow users to interact with data through natural language: asking questions, generating reports, or uncovering insights in a chat-like experience. Users get answers in real time through a conversational flow. This would be integrated directly into the dashboard.</p>
            </div>
            <div style={{ height: '16px' }}></div>
            <div className="case-study__ideation-section">
              <div className="case-study__ideation-title">
                Exploration #3: AI-Enhanced Traditional Dashboard 
              </div>
              <p className="case-study__ideation-description">
                Lastly, we have the AI-enhanced traditional dashboard. While it still presents data through static, predefined charts and filters, it now includes conversational features, allowing users to ask questions, explore data, and generate reports through a chat-like interface. This adds a more intuitive layer of interaction without changing the underlying dashboard experience.
              </p>
              <div className="case-study__competitive-card-image-container">
                {/* Image goes here */}
                <img
                  src="/ThoughtSpotApproach.png"
                  alt="AI dashboard visual"
                  className="case-study__section-img"
                />
              </div>
              {/* Caption */}
              <p className="case-study__section-caption">
                ThoughtSpot's Liveboard
              </p>
            </div>
          </section>
          <div style={{ height: '16px' }}></div>
        </section>
        {/* New Section: Landing on a Solution */}
        <section className="case-study__section case-study__section--spaced">
          <h2 className="case-study__section-title--large">Landing on a Solution</h2>
          <PrioritizationMatrixViewer />
          <p className="case-study__section-text">
            To determine the best way to enhance our users' experience, the team and I developed a prioritization matrix. This led us to a hybrid solution—combining a traditional dashboard with conversational AI to deliver intuitive insights without disrupting familiar workflows for our users.
          </p>
        </section>
        <div style={{ height: '16px' }}></div>
        {/* New Section: Final Solution */}
        <section className="case-study__section">
          <div className="case-study__section-label">FINAL SOLUTION</div>
          <h3 className="case-study__section-title">A Hybrid Dashboard Experience</h3>
          <div className="case-study__placeholder case-study__placeholder--large">
            <div className="case-study__placeholder-content">
              <div className="case-study__placeholder-icon">🎯</div>
              <div className="case-study__placeholder-title">Final Solution Placeholder</div>
              <div className="case-study__placeholder-subtitle">Content coming soon...</div>
            </div>
          </div>
        </section>
        <div style={{ height: '16px' }}></div>
        {/* New Section: Final Thoughts */}
        <section className="case-study__section case-study__section--spaced">
          <div className="case-study__section-label">FINAL THOUGHTS</div>
          <h2 className="case-study__section-title">No more scattered spreadsheets — just answers when you need them.</h2>
          <p className="case-study__section-text">
            <strong>What I learned: </strong> This project was both exciting and educational as it deepened my understanding of AI's potential in analytics and reinforced the importance of staying up to date with emerging use cases that enhance user experiences. It also highlighted how crucial it is to design with our users' needs while considering their level of tech savviness, as neglecting this could result in a challenging learning curve for them.
            <br /><br />
            <strong>Next Steps: </strong> The Product team looked into the possibility of both launching and beta testing the product to a target audience, but unfortunately, after our conversation with the stakeholders, they would not be moving forward with the direction of utilizing the dashboard. 
            <br /><br />
            <strong>What I'm Proud of: </strong>I am most proud of all the work that we were able to achieve within quite a short period, and I believe that with more time, we could have developed a much more valuable product for our users and assessed its usability and desirability.
          </p>
        </section>
      </div>
    );
  }
  // ...existing fallback for other projects...
  return (
    <div>
      <h1>Project Details</h1>
      <p>This is a placeholder for an individual project page.</p>
    </div>
  )
}

function Footer() {
  return (
    <footer style={{
      textAlign: 'center',
      color: '#555',
      fontSize: 16,
      padding: '32px 0',
      borderTop: '1px solid #eee',
      marginTop: 'auto',
      position: 'relative',
      zIndex: 5
    }}>
      <div style={{ marginBottom: 8 }}>
        Get in touch: <a href="mailto:oba12ayo@gmail.com" style={{ color: '#8134df', textDecoration: 'none' }}>oba12ayo@gmail.com</a>
      </div>
      <div style={{ marginTop: 8, fontSize: 14, color: '#666' }}>
        Made with <span role="img" aria-label="love">a lot of hours on </span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="#1DB954" style={{ display: 'inline-block', verticalAlign: 'middle', marginLeft: '2px' }} aria-label="Spotify logo" role="img">
          <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
        </svg> 
      </div>
    </footer>
  )
}

export default App
