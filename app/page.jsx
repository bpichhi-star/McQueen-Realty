'use client';

import { useState, useEffect, useRef } from 'react';

/* ─── Global CSS ─────────────────────────────────────────────────────────── */
const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:ital,wght@0,700;0,800;0,900;1,700;1,800;1,900&family=Jost:wght@300;400;500;600&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  /* ── SHARP NEUTRAL PALETTE — no warmth, no brown ── */
  :root {
    --black:       #000000;
    --near-black:  #0D0D0D;
    --white:       #FFFFFF;
    --off-white:   #F2F2F2;
    --light-gray:  #E8E8E8;
    --mid:         #5C5C5C;
    --faint:       #999999;
    --border:      #D8D8D8;
    --gold:        #C4A35A;
    --gold-dark:   #A8883E;
    --gold-light:  #D4B57A;
  }

  html { scroll-behavior: smooth; }

  body {
    background: var(--white);
    color: var(--black);
    font-family: 'Jost', sans-serif;
    -webkit-font-smoothing: antialiased;
    overflow-x: hidden;
  }

  a { text-decoration: none; color: inherit; }
  button { cursor: pointer; font-family: 'Jost', sans-serif; }

  /* ── Animations ── */
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(28px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  @keyframes marquee {
    from { transform: translateX(0); }
    to   { transform: translateX(-50%); }
  }
  @keyframes scrollPulse {
    0%, 100% { opacity: 0.3; transform: translateY(0); }
    50%       { opacity: 1;   transform: translateY(6px); }
  }

  .anim-fadeIn { animation: fadeIn 1.4s ease both; }
  .anim-d1     { animation: fadeUp 1s cubic-bezier(.16,1,.3,1) 0.4s both; }
  .anim-d2     { animation: fadeUp 1s cubic-bezier(.16,1,.3,1) 0.65s both; }
  .anim-d3     { animation: fadeUp 1s cubic-bezier(.16,1,.3,1) 0.85s both; }
  .anim-d4     { animation: fadeUp 1s cubic-bezier(.16,1,.3,1) 1.05s both; }
  .anim-d5     { animation: fadeIn 1s ease 1.4s both; }

  /* ── Nav ── */
  .nav-wrap {
    position: fixed; top: 0; left: 0; right: 0; z-index: 500;
    transition: background 0.5s, border-color 0.5s, backdrop-filter 0.5s;
    border-bottom: 1px solid transparent;
  }
  .nav-wrap.over-video {
    background: transparent;
  }
  .nav-wrap.scrolled-dark {
    background: rgba(0,0,0,0.85);
    backdrop-filter: blur(20px);
    border-bottom-color: rgba(255,255,255,0.07);
  }
  .nav-wrap.scrolled-light {
    background: rgba(255,255,255,0.97);
    backdrop-filter: blur(20px);
    border-bottom-color: var(--border);
  }

  .nav-inner {
    display: flex; align-items: stretch;
    height: 68px; padding: 0 2.5rem;
  }

  .nav-logo {
    display: flex; align-items: center;
    padding-right: 3rem;
    font-family: 'Jost', sans-serif;
    font-weight: 600; font-size: 0.76rem;
    letter-spacing: 0.3em; text-transform: uppercase;
    transition: color 0.4s; white-space: nowrap; flex-shrink: 0;
  }
  .nav-logo .sep { color: var(--gold); margin: 0 0.15em; font-weight: 300; }

  .nav-links { display: flex; align-items: stretch; flex: 1; }

  .nav-link {
    display: flex; align-items: center;
    padding: 0 1.3rem;
    font-size: 0.7rem; letter-spacing: 0.1em;
    text-transform: uppercase; font-weight: 400;
    transition: color 0.2s; position: relative; white-space: nowrap;
  }
  .nav-link::after {
    content: ''; position: absolute; bottom: 0;
    left: 1.3rem; right: 1.3rem; height: 2px;
    background: var(--gold); transform: scaleX(0);
    transition: transform 0.25s ease;
  }
  .nav-link:hover::after { transform: scaleX(1); }

  .nav-right {
    display: flex; align-items: center;
    gap: 1.2rem; margin-left: auto;
  }

  .nav-cta {
    display: flex; align-items: center;
    height: 36px; padding: 0 1.4rem;
    background: var(--gold); color: var(--white) !important;
    font-size: 0.67rem; letter-spacing: 0.12em;
    font-weight: 500; text-transform: uppercase;
    transition: background 0.2s; flex-shrink: 0;
  }
  .nav-cta:hover { background: var(--gold-dark); }

  /* ── Video Hero ── */
  .hero-video-wrap {
    position: relative; width: 100%; height: 100vh; min-height: 700px;
    overflow: hidden; background: #000;
  }

  .hero-video {
    position: absolute; inset: 0;
    width: 100%; height: 100%;
    object-fit: cover; object-position: center;
    transition: opacity 1.2s ease;
  }
  .hero-video.active  { opacity: 1; }
  .hero-video.inactive { opacity: 0; }

  .hero-overlay {
    position: absolute; inset: 0;
    background: linear-gradient(
      180deg,
      rgba(0,0,0,0.30) 0%,
      rgba(0,0,0,0.15) 35%,
      rgba(0,0,0,0.50) 70%,
      rgba(0,0,0,0.88) 100%
    );
  }

  .hero-center {
    position: absolute; inset: 0;
    display: flex; flex-direction: column;
    align-items: center; justify-content: center;
  }

  /* Scene location label */
  .hero-scene-label {
    position: absolute; bottom: 3.5rem; left: 2.5rem;
    display: flex; align-items: center; gap: 0.75rem;
  }
  .hero-scene-dot {
    width: 6px; height: 6px; border-radius: 50%;
    background: var(--gold); flex-shrink: 0;
  }
  .hero-scene-name {
    font-family: 'Jost', sans-serif;
    font-size: 0.62rem; letter-spacing: 0.28em;
    text-transform: uppercase; color: rgba(255,255,255,0.55);
    transition: opacity 0.6s ease;
  }

  /* Scene progress dots */
  .hero-dots {
    position: absolute; bottom: 3.7rem; right: 2.5rem;
    display: flex; gap: 0.5rem;
  }
  .hero-dot {
    width: 18px; height: 2px;
    background: rgba(255,255,255,0.25);
    transition: background 0.4s, width 0.4s;
  }
  .hero-dot.active-dot {
    background: var(--gold); width: 32px;
  }

  .hero-wordmark {
    font-family: 'Jost', sans-serif;
    font-weight: 300; font-size: clamp(1rem, 2.5vw, 1.8rem);
    letter-spacing: 0.55em; text-transform: uppercase;
    color: rgba(255,255,255,0.88);
  }
  .hero-wordmark strong {
    font-weight: 600; letter-spacing: 0.55em;
  }

  .hero-rule {
    width: 1px; height: 60px;
    background: linear-gradient(to bottom, rgba(196,163,90,0.8), transparent);
    margin: 2rem auto 0;
  }

  .hero-scroll {
    position: absolute; bottom: 2.5rem; left: 50%;
    transform: translateX(-50%);
    display: flex; flex-direction: column; align-items: center; gap: 0.5rem;
  }
  .hero-scroll span {
    font-family: 'Jost', sans-serif;
    font-size: 0.55rem; letter-spacing: 0.3em;
    text-transform: uppercase; color: rgba(255,255,255,0.35);
  }
  .hero-scroll-arrow {
    width: 16px; height: 16px;
    border-right: 1px solid rgba(255,255,255,0.3);
    border-bottom: 1px solid rgba(255,255,255,0.3);
    transform: rotate(45deg);
    animation: scrollPulse 2s ease-in-out infinite;
  }

  /* ── Search Section ── */
  .search-section {
    position: relative;
    background: var(--near-black);
    padding: 7rem 2.5rem;
    border-bottom: 1px solid rgba(255,255,255,0.06);
    overflow: hidden;
  }
  .search-bg {
    position: absolute; inset: 0;
    background-size: cover; background-position: center 30%;
    opacity: 0.22;
    transition: opacity 0.6s;
  }
  .search-content { position: relative; z-index: 2; }

  .search-headline {
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 900; font-style: italic;
    font-size: clamp(4.5rem, 11vw, 13rem);
    line-height: 0.88; letter-spacing: -0.01em;
    text-transform: uppercase; color: var(--white);
    margin-bottom: 1.5rem;
  }

  .search-sub {
    font-family: 'Jost', sans-serif;
    font-size: 0.85rem; font-weight: 300;
    letter-spacing: 0.08em; color: rgba(255,255,255,0.45);
    margin-bottom: 3rem;
  }

  /* ── Search Bar ── */
  .search-bar {
    display: flex; max-width: 780px;
    background: rgba(255,255,255,0.06);
    border: 1px solid rgba(255,255,255,0.14);
  }
  .search-bar input {
    flex: 1; background: transparent; border: none; outline: none;
    padding: 0 1.8rem; height: 62px;
    font-family: 'Jost', sans-serif;
    font-size: 0.92rem; font-weight: 300;
    color: var(--white); letter-spacing: 0.03em;
  }
  .search-bar input::placeholder { color: rgba(255,255,255,0.3); }
  .search-bar-divider { width: 1px; margin: 16px 0; background: rgba(255,255,255,0.12); }
  .search-bar-btn {
    display: flex; align-items: center; gap: 0.5rem;
    height: 62px; padding: 0 2.2rem;
    background: var(--gold); border: none;
    font-family: 'Jost', sans-serif;
    font-size: 0.68rem; letter-spacing: 0.18em;
    font-weight: 500; text-transform: uppercase;
    color: var(--white); transition: background 0.2s; flex-shrink: 0;
  }
  .search-bar-btn:hover { background: var(--gold-dark); }

  .search-exclusives {
    display: inline-flex; align-items: center; gap: 0.6rem;
    margin-top: 1.8rem;
    font-family: 'Jost', sans-serif;
    font-size: 0.67rem; letter-spacing: 0.16em;
    text-transform: uppercase; color: rgba(255,255,255,0.35);
    border-bottom: 1px solid rgba(255,255,255,0.15);
    padding-bottom: 2px; transition: color 0.2s, border-color 0.2s;
  }
  .search-exclusives:hover { color: var(--gold); border-color: var(--gold); }

  /* ── Stats ── */
  .stats-strip {
    display: flex;
    border-bottom: 1px solid var(--border);
  }
  .stat-cell {
    flex: 1; padding: 2.2rem 2.5rem;
  }
  .stat-cell + .stat-cell { border-left: 1px solid var(--border); }
  .stat-val {
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 900; font-size: 2.8rem; line-height: 1;
    color: var(--black); margin-bottom: 0.3rem;
  }
  .stat-label {
    font-family: 'Jost', sans-serif;
    font-size: 0.62rem; letter-spacing: 0.2em;
    text-transform: uppercase; color: var(--faint);
  }

  /* ── Marquee ── */
  .marquee-wrap {
    overflow: hidden; background: var(--black);
    border-bottom: 1px solid rgba(255,255,255,0.04);
    padding: 1rem 0;
  }
  .marquee-track {
    display: flex; gap: 0; width: max-content;
    animation: marquee 30s linear infinite;
  }
  .marquee-item {
    display: flex; align-items: center; gap: 1.8rem;
    padding: 0 2rem; white-space: nowrap;
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 700; font-size: 0.95rem;
    letter-spacing: 0.18em; text-transform: uppercase;
    transition: color 0.2s;
  }
  .marquee-dot { color: rgba(255,255,255,0.15); font-size: 0.45rem; }

  /* ── Listings ── */
  .listings-grid {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr;
    gap: 1px; background: var(--border);
  }
  .prop-card { background: var(--white); cursor: pointer; }
  .prop-card-img { overflow: hidden; position: relative; }
  .prop-card-img-inner {
    width: 100%; height: 100%;
    transition: transform 0.7s cubic-bezier(.16,1,.3,1);
  }
  .prop-card:hover .prop-card-img-inner { transform: scale(1.05); }
  .prop-tag {
    position: absolute; top: 1.2rem; left: 1.2rem;
    background: var(--black); color: var(--gold);
    font-family: 'Jost', sans-serif;
    font-size: 0.54rem; letter-spacing: 0.22em;
    padding: 0.32rem 0.75rem; text-transform: uppercase; font-weight: 500;
  }
  .prop-body { padding: 1.6rem 1.8rem 2rem; }
  .prop-address {
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 700; font-size: 1.35rem;
    text-transform: uppercase; letter-spacing: 0.02em;
    color: var(--black); line-height: 1.1; margin-bottom: 0.25rem;
  }
  .prop-city {
    font-family: 'Jost', sans-serif;
    font-size: 0.67rem; letter-spacing: 0.12em;
    text-transform: uppercase; color: var(--faint); margin-bottom: 1.1rem;
  }
  .prop-stats {
    display: flex; gap: 1.4rem; margin-bottom: 1.2rem;
  }
  .prop-stat {
    font-family: 'Jost', sans-serif;
    font-size: 0.7rem; color: var(--mid);
  }
  .prop-price {
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 800; font-size: 1.6rem; color: var(--black);
  }

  /* ── Section label ── */
  .sec-label {
    font-family: 'Jost', sans-serif;
    font-size: 0.62rem; letter-spacing: 0.28em;
    text-transform: uppercase; color: var(--gold);
    font-weight: 500; display: block; margin-bottom: 1rem;
  }
  .sec-h2 {
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 800; text-transform: uppercase;
    line-height: 0.9; letter-spacing: -0.01em;
  }

  /* ── Editorial ── */
  .edit-grid {
    display: grid;
    grid-template-columns: 1.6fr 1fr 1fr;
    gap: 1px; background: rgba(255,255,255,0.06);
  }
  .edit-card { cursor: pointer; background: var(--near-black); }
  .edit-card-img { overflow: hidden; }
  .edit-card-img-inner {
    width: 100%; height: 100%;
    transition: transform 0.65s cubic-bezier(.16,1,.3,1);
  }
  .edit-card:hover .edit-card-img-inner { transform: scale(1.05); }

  /* ── About ── */
  .about-grid {
    display: grid; grid-template-columns: 1fr 1fr;
    min-height: 600px;
    border-bottom: 1px solid var(--border);
  }

  /* ── Contact ── */
  .contact-grid {
    display: grid; grid-template-columns: 1fr 1fr;
    border-bottom: 1px solid var(--border);
  }

  /* ── Form ── */
  .field-wrap { border-bottom: 1px solid var(--border); padding: 1.2rem 0; }
  .field-label {
    display: block; font-size: 0.58rem; letter-spacing: 0.22em;
    text-transform: uppercase; color: var(--faint); margin-bottom: 0.4rem;
  }
  .field-input, .field-textarea {
    width: 100%; background: transparent; border: none; outline: none;
    font-family: 'Jost', sans-serif; font-size: 0.95rem; color: var(--black);
  }
  .field-textarea { resize: none; }

  /* ── Card / button hovers ── */
  .btn-primary {
    display: inline-flex; align-items: center; gap: 0.7rem;
    background: var(--black); color: var(--white);
    padding: 1rem 2.4rem;
    font-family: 'Jost', sans-serif;
    font-size: 0.7rem; letter-spacing: 0.18em;
    text-transform: uppercase; font-weight: 500;
    border: none; transition: background 0.2s; cursor: pointer;
  }
  .btn-primary:hover { background: var(--gold); }

  .link-underline {
    font-family: 'Jost', sans-serif;
    font-size: 0.7rem; letter-spacing: 0.14em;
    text-transform: uppercase; color: var(--mid);
    border-bottom: 1px solid var(--border); padding-bottom: 2px;
    transition: color 0.2s, border-color 0.2s;
  }
  .link-underline:hover { color: var(--gold); border-color: var(--gold); }

  .link-gold {
    font-family: 'Jost', sans-serif;
    font-size: 0.7rem; letter-spacing: 0.16em;
    text-transform: uppercase; color: var(--gold);
    border-bottom: 1px solid var(--gold);
    padding-bottom: 2px; font-weight: 500;
    display: inline-flex; align-items: center; gap: 0.5rem;
    transition: color 0.2s;
  }
  .link-gold:hover { color: var(--gold-dark); }
`;

/* ─── Arrow Icon ─────────────────────────────────────────────────────────── */
function Arrow({ size = 14, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

/* ─── Nav ────────────────────────────────────────────────────────────────── */
function Nav({ scrolled, overVideo }) {
  const light = scrolled && !overVideo;
  const dark  = scrolled && overVideo;

  const wrapClass = `nav-wrap${dark ? ' scrolled-dark' : light ? ' scrolled-light' : ' over-video'}`;
  const linkColor  = (light) ? 'var(--black)' : 'rgba(255,255,255,0.72)';
  const logoColor  = (light) ? 'var(--black)' : '#ffffff';

  return (
    <nav className={wrapClass}>
      <div className="nav-inner">
        <div className="nav-logo" style={{ color: logoColor }}>
          McQueen<span className="sep">·</span>Realty
        </div>
        <div className="nav-links">
          {['Buy', 'Rent', 'Sell', 'Agents'].map(l => (
            <a key={l} href={`#${l.toLowerCase()}`} className="nav-link" style={{ color: linkColor }}>{l}</a>
          ))}
        </div>
        <div className="nav-right">
          {['New Listings', 'Exclusives'].map(l => (
            <a key={l} href="#listings" className="nav-link" style={{ color: linkColor, padding: '0 0.8rem' }}>{l}</a>
          ))}
          <a href="#contact" className="nav-cta">Schedule Showing</a>
        </div>
      </div>
    </nav>
  );
}

/* ─── Video Hero ─────────────────────────────────────────────────────────── */
const SCENES = [
  {
    src: 'https://videos.pexels.com/video-files/3051985/3051985-uhd_2560_1440_25fps.mp4',
    poster: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1800&q=80&auto=format',
    label: 'Los Angeles',
  },
  {
    src: 'https://videos.pexels.com/video-files/2169880/2169880-uhd_2560_1440_25fps.mp4',
    poster: 'https://images.unsplash.com/photo-1420745981456-b95fe23f5753?w=1800&q=80',
    label: 'Malibu',
  },
  {
    src: 'https://videos.pexels.com/video-files/1843319/1843319-hd_1920_1080_25fps.mp4',
    poster: 'https://images.unsplash.com/photo-1449034446853-66c86144b0ad?w=1800&q=80',
    label: 'Santa Monica',
  },
  {
    src: 'https://videos.pexels.com/video-files/3770441/3770441-uhd_2560_1440_25fps.mp4',
    poster: 'https://images.unsplash.com/photo-1543328023-cd0b8ff72739?w=1800&q=80',
    label: 'Beverly Hills',
  },
];

function VideoHero({ heroRef }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const videoRefs = useRef([]);

  useEffect(() => {
    // Start playing the first video
    videoRefs.current[0]?.play().catch(() => {});

    const timer = setInterval(() => {
      setActiveIdx(prev => {
        const next = (prev + 1) % SCENES.length;
        // Preload + play the next video
        const nextVid = videoRefs.current[next];
        if (nextVid) {
          nextVid.currentTime = 0;
          nextVid.play().catch(() => {});
        }
        return next;
      });
    }, 7000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="hero-video-wrap" ref={heroRef}>

      {/* All scene videos stacked, fade between them */}
      {SCENES.map((scene, i) => (
        <video
          key={i}
          ref={el => videoRefs.current[i] = el}
          className={`hero-video ${i === activeIdx ? 'active' : 'inactive'}`}
          autoPlay={i === 0}
          muted
          loop
          playsInline
          poster={scene.poster}
        >
          <source src={scene.src} type="video/mp4" />
        </video>
      ))}

      {/* Cinematic overlay */}
      <div className="hero-overlay anim-fadeIn" />

      {/* Centered wordmark */}
      <div className="hero-center">
        <div className="anim-d1" style={{ textAlign: 'center' }}>
          <div className="hero-wordmark">
            <strong>McQueen</strong>
          </div>
          <div style={{
            fontFamily: "'Jost', sans-serif",
            fontWeight: 300, fontSize: 'clamp(0.55rem, 1.2vw, 0.8rem)',
            letterSpacing: '0.7em', textTransform: 'uppercase',
            color: 'var(--gold)', marginTop: '0.8rem',
          }}>
            Realty
          </div>
        </div>
        <div className="hero-rule anim-d2" />
      </div>

      {/* Scene location label — bottom left */}
      <div className="hero-scene-label anim-d5">
        <div className="hero-scene-dot" />
        <span className="hero-scene-name">{SCENES[activeIdx].label}</span>
      </div>

      {/* Scene progress dots — bottom right */}
      <div className="hero-dots anim-d5">
        {SCENES.map((_, i) => (
          <div
            key={i}
            className={`hero-dot${i === activeIdx ? ' active-dot' : ''}`}
            onClick={() => {
              setActiveIdx(i);
              videoRefs.current[i]?.play().catch(() => {});
            }}
            style={{ cursor: 'pointer' }}
          />
        ))}
      </div>

      {/* Scroll hint */}
      <div className="hero-scroll anim-d5">
        <span>Scroll</span>
        <div className="hero-scroll-arrow" />
      </div>
    </section>
  );
}

/* ─── Search Section (replaces "Our Exclusives") ─────────────────────────── */
function SearchSection() {
  const [query, setQuery] = useState('');

  // Cycle bg images in sync with video scenes
  const SEARCH_BG = 'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1800&q=80&auto=format';

  return (
    <section className="search-section" id="search">
      {/* Full-bleed photo behind the text */}
      <div
        className="search-bg"
        style={{ backgroundImage: `url(${SEARCH_BG})` }}
      />
      <div className="search-content" style={{ maxWidth: '1400px', margin: '0 auto' }}>
        {/* Label */}
        <p style={{
          fontFamily: "'Jost', sans-serif",
          fontSize: '0.62rem', letterSpacing: '0.3em',
          textTransform: 'uppercase', color: 'var(--gold)',
          fontWeight: 500, marginBottom: '1.5rem',
        }}>
          Los Angeles · Beverly Hills · Malibu
        </p>

        {/* Massive headline */}
        <h1 className="search-headline">
          Where Do<br />You Want<br />To Live?
        </h1>

        <p className="search-sub">
          McQueen Realty. Leaders in Southern California luxury property.
        </p>

        {/* Search bar */}
        <div className="search-bar">
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="City, neighborhood, or ZIP code"
            onKeyDown={e => e.key === 'Enter' && (window.location.href = '#listings')}
          />
          <div className="search-bar-divider" />
          <button className="search-bar-btn" onClick={() => window.location.href = '#listings'}>
            Start Your Search <Arrow size={14} />
          </button>
        </div>

        <a href="#listings" className="search-exclusives">
          View Our Exclusives <Arrow size={11} />
        </a>
      </div>
    </section>
  );
}

/* ─── Stats Strip ────────────────────────────────────────────────────────── */
function StatsStrip() {
  return (
    <div className="stats-strip">
      {[
        { val: '$2.4B+', label: 'Closed Sales Volume' },
        { val: '340+',   label: 'Properties Represented' },
        { val: '10+',    label: 'Years of Excellence' },
        { val: '98%',    label: 'Client Satisfaction' },
      ].map(({ val, label }) => (
        <div key={label} className="stat-cell">
          <div className="stat-val">{val}</div>
          <div className="stat-label">{label}</div>
        </div>
      ))}
    </div>
  );
}

/* ─── Markets Marquee ────────────────────────────────────────────────────── */
function Marquee() {
  const markets = [
    'Beverly Hills', 'Bel Air', 'Malibu', 'Santa Monica',
    'Pacific Palisades', 'Holmby Hills', 'Brentwood', 'Los Feliz',
  ];
  const doubled = [...markets, ...markets];
  return (
    <div className="marquee-wrap">
      <div className="marquee-track">
        {doubled.map((m, i) => (
          <a key={i} href="#listings" className="marquee-item" style={{
            color: i % 2 === 0 ? 'rgba(255,255,255,0.82)' : 'var(--gold)',
          }}>
            {m}
            <span className="marquee-dot">◆</span>
          </a>
        ))}
      </div>
    </div>
  );
}

/* ─── Listings Grid ──────────────────────────────────────────────────────── */
const LISTINGS = [
  {
    id: 1, address: '482 Sunset Ridge Drive', city: 'Beverly Hills, CA 90210',
    price: '$8,950,000', beds: 6, baths: 7, sqft: '9,200', tag: 'Exclusive',
    bg: 'linear-gradient(160deg,#CECECE,#A8A8A8)',
  },
  {
    id: 2, address: '17 Oceanfront Terrace', city: 'Malibu, CA 90265',
    price: '$12,500,000', beds: 5, baths: 6, sqft: '7,800', tag: 'New',
    bg: 'linear-gradient(160deg,#C8D0D0,#A4B0B0)',
  },
  {
    id: 3, address: '903 Canyon Crest Lane', city: 'Bel Air, CA 90077',
    price: '$6,250,000', beds: 5, baths: 5, sqft: '6,400', tag: 'Featured',
    bg: 'linear-gradient(160deg,#D0CCCC,#B0AAAA)',
  },
];

function ListingsGrid() {
  return (
    <section id="listings" style={{ padding: '6rem 2.5rem', borderBottom: '1px solid var(--border)' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <div style={{
          display: 'flex', justifyContent: 'space-between',
          alignItems: 'flex-end', marginBottom: '3.5rem',
        }}>
          <div>
            <span className="sec-label">Featured Properties</span>
            <h2 className="sec-h2" style={{ fontSize: 'clamp(2.8rem, 5vw, 5rem)', color: 'var(--black)' }}>
              Selected Homes
            </h2>
          </div>
          <a href="/listings" className="link-underline">View All Properties →</a>
        </div>

        <div className="listings-grid">
          {LISTINGS.map((l, i) => (
            <div key={l.id} className="prop-card">
              <div className="prop-card-img" style={{ height: i === 0 ? '480px' : '280px' }}>
                <div className="prop-card-img-inner" style={{ background: l.bg, height: '100%', position: 'relative' }}>
                  <div className="prop-tag">{l.tag}</div>
                </div>
              </div>
              <div className="prop-body">
                <div className="prop-address">{l.address}</div>
                <div className="prop-city">{l.city}</div>
                <div className="prop-stats">
                  {[`${l.beds} BD`, `${l.baths} BA`, `${l.sqft} SF`].map(s => (
                    <span key={s} className="prop-stat">{s}</span>
                  ))}
                </div>
                <div className="prop-price">{l.price}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── MLS Search ─────────────────────────────────────────────────────────── */
function MLSSearch() {
  return (
    <section style={{ padding: '6rem 2.5rem', borderBottom: '1px solid var(--border)', background: 'var(--off-white)' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3rem' }}>
          <div>
            <span className="sec-label">Live MLS · CRMLS</span>
            <h2 className="sec-h2" style={{ fontSize: 'clamp(2.5rem, 4.5vw, 4.5rem)' }}>Search Properties</h2>
          </div>
          <a href="/listings" className="link-underline">Full Screen Search →</a>
        </div>
        <div style={{ border: '1px solid var(--border)', height: '680px', background: 'var(--white)' }}>
          <iframe
            src="https://matrix.crmls.org/Matrix/public/IDX.aspx?idx=eefc378c"
            width="100%" height="100%" frameBorder="0"
            style={{ display: 'block', border: 'none' }}
            title="McQueen Realty Property Search"
            allowFullScreen
          />
        </div>
        <div style={{ marginTop: '2rem', textAlign: 'center' }}>
          <a href="/listings" className="btn-primary">
            Open Full Property Search <Arrow size={14} />
          </a>
        </div>
      </div>
    </section>
  );
}

/* ─── Editorial ──────────────────────────────────────────────────────────── */
const EDITORIAL = [
  {
    title: 'The New Bel Air',
    sub: "How LA's most storied hillside is quietly reinventing itself",
    bg: 'linear-gradient(145deg,#222,#111)',
  },
  {
    title: 'Malibu Colony Report',
    sub: 'Q1 2026 Market Insight',
    bg: 'linear-gradient(145deg,#1c2020,#111616)',
  },
  {
    title: 'Architecture & Privacy',
    sub: 'Designing for the ultra-high-net-worth buyer',
    bg: 'linear-gradient(145deg,#201c1c,#141010)',
  },
];

function Editorial() {
  return (
    <section style={{ background: 'var(--near-black)', padding: '6rem 2.5rem', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3.5rem' }}>
          <div>
            <span className="sec-label">World of McQueen</span>
            <h2 className="sec-h2" style={{ fontSize: 'clamp(2.8rem, 5vw, 5rem)', color: 'var(--white)' }}>
              Luxury Property<br />&amp; Lifestyle
            </h2>
          </div>
          <a href="/journal" style={{ ...{}, fontFamily: "'Jost',sans-serif", fontSize: '0.7rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', borderBottom: '1px solid rgba(255,255,255,0.12)', paddingBottom: '2px' }}>
            View All →
          </a>
        </div>
        <div className="edit-grid">
          {EDITORIAL.map((e, i) => (
            <div key={i} className="edit-card">
              <div className="edit-card-img" style={{ height: i === 0 ? '380px' : '220px' }}>
                <div className="edit-card-img-inner" style={{ background: e.bg, height: '100%' }} />
              </div>
              <div style={{ padding: '1.5rem 1.8rem 2rem' }}>
                <div style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontWeight: 800, fontSize: i === 0 ? '1.6rem' : '1.3rem',
                  textTransform: 'uppercase', color: 'var(--white)',
                  lineHeight: 1.05, marginBottom: '0.5rem',
                }}>
                  {e.title}
                </div>
                <div style={{
                  fontFamily: "'Jost', sans-serif",
                  fontSize: '0.78rem', color: 'rgba(255,255,255,0.38)',
                  fontWeight: 300, lineHeight: 1.6,
                }}>
                  {e.sub}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Services ───────────────────────────────────────────────────────────── */
function Services() {
  return (
    <section id="services" style={{ borderTop: '1px solid var(--border)', padding: '6rem 2.5rem' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '4rem' }}>
          <div>
            <span className="sec-label">What We Do</span>
            <h2 className="sec-h2" style={{ fontSize: 'clamp(2.8rem, 5vw, 5rem)' }}>How We Serve</h2>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', borderTop: '1px solid var(--border)' }}>
          {[
            { num: '01', title: 'Buyer Representation', desc: 'We guide discerning buyers through the acquisition of extraordinary properties — from private previews to negotiation and close.' },
            { num: '02', title: 'Seller Advisory', desc: 'Strategic pricing, editorial marketing, and access to our global network of qualified buyers at every price point.' },
            { num: '03', title: 'Portfolio & Investment', desc: 'Identify high-value residential opportunities and build a real estate portfolio positioned for long-term appreciation.' },
          ].map(({ num, title, desc }, i) => (
            <div key={i} style={{
              padding: '3rem 2.5rem 3rem 0',
              borderLeft: i > 0 ? '1px solid var(--border)' : 'none',
              paddingLeft: i > 0 ? '2.5rem' : 0,
            }}>
              <div style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 900, fontSize: '5rem', lineHeight: 1,
                color: 'var(--light-gray)', marginBottom: '1.5rem',
              }}>
                {num}
              </div>
              <h3 style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 800, fontSize: '1.5rem',
                textTransform: 'uppercase', color: 'var(--black)',
                marginBottom: '1rem', lineHeight: 1.1,
              }}>
                {title}
              </h3>
              <p style={{
                fontFamily: "'Jost', sans-serif",
                fontSize: '0.88rem', lineHeight: 1.8,
                color: 'var(--mid)', fontWeight: 300,
              }}>
                {desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── About ──────────────────────────────────────────────────────────────── */
function About() {
  return (
    <section id="about" className="about-grid">
      <div style={{
        background: 'linear-gradient(150deg,#D8D8D8,#BEBEBE)',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', bottom: '2.5rem', right: '2.5rem',
          background: 'rgba(255,255,255,0.96)',
          padding: '1.2rem 1.8rem', borderLeft: '2px solid var(--gold)',
        }}>
          <div style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontWeight: 900, fontSize: '2.4rem', lineHeight: 1, color: 'var(--black)',
          }}>
            Est. 2015
          </div>
          <div style={{
            fontFamily: "'Jost', sans-serif",
            fontSize: '0.6rem', letterSpacing: '0.2em',
            textTransform: 'uppercase', color: 'var(--mid)', marginTop: '0.3rem',
          }}>
            Beverly Hills
          </div>
        </div>
      </div>
      <div style={{
        display: 'flex', flexDirection: 'column', justifyContent: 'center',
        padding: '5rem 4rem',
        borderLeft: '1px solid var(--border)',
      }}>
        <span className="sec-label">About McQueen Realty</span>
        <h2 className="sec-h2" style={{ fontSize: 'clamp(2.5rem, 4vw, 4rem)', marginBottom: '2rem' }}>
          A Standard Built<br />On Trust
        </h2>
        <p style={{ fontFamily: "'Jost',sans-serif", fontSize: '0.9rem', lineHeight: 1.85, color: 'var(--mid)', fontWeight: 300, marginBottom: '1.4rem' }}>
          McQueen Realty was founded on a single conviction: every client —
          whether purchasing their first estate or expanding a multi-property
          portfolio — deserves the same caliber of attention and strategy.
        </p>
        <p style={{ fontFamily: "'Jost',sans-serif", fontSize: '0.9rem', lineHeight: 1.85, color: 'var(--mid)', fontWeight: 300, marginBottom: '2.5rem' }}>
          Our team combines deep regional market knowledge with a genuine passion
          for architecture and design. Every transaction is handled with discretion,
          precision, and genuine investment in the outcome.
        </p>
        <a href="#contact" className="link-gold">
          Work With Us <Arrow size={12} color="var(--gold)" />
        </a>
      </div>
    </section>
  );
}

/* ─── Quote Band ─────────────────────────────────────────────────────────── */
function QuoteBand() {
  return (
    <div style={{
      background: 'var(--black)', padding: '5rem 2.5rem',
      textAlign: 'center', borderBottom: '1px solid rgba(255,255,255,0.04)',
    }}>
      <blockquote style={{
        fontFamily: "'Barlow Condensed', sans-serif",
        fontWeight: 700, fontStyle: 'italic',
        fontSize: 'clamp(2rem, 4vw, 4rem)',
        textTransform: 'uppercase', color: 'var(--white)',
        lineHeight: 1.0, maxWidth: '900px', margin: '0 auto 1.5rem',
      }}>
        "Every Exceptional Home Has a Story."
      </blockquote>
      <p style={{
        fontFamily: "'Jost', sans-serif", fontSize: '0.78rem',
        color: 'rgba(255,255,255,0.25)', letterSpacing: '0.1em', fontWeight: 300,
      }}>
        — McQueen Realty, est. 2015
      </p>
    </div>
  );
}

/* ─── Contact ────────────────────────────────────────────────────────────── */
function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  return (
    <section id="contact" className="contact-grid">
      {/* Dark left panel */}
      <div style={{ background: 'var(--near-black)', padding: '6rem 3.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <span className="sec-label">Begin the Conversation</span>
        <h2 className="sec-h2" style={{ fontSize: 'clamp(2.8rem, 4vw, 4.5rem)', color: 'var(--white)', marginBottom: '2rem' }}>
          We'd Love<br />to Hear<br />From You
        </h2>
        <p style={{ fontFamily: "'Jost',sans-serif", fontSize: '0.88rem', lineHeight: 1.8, color: 'rgba(255,255,255,0.38)', fontWeight: 300, maxWidth: '340px', marginBottom: '3rem' }}>
          Whether buying, selling, or simply exploring —
          our team responds within 24 hours.
        </p>
        {[
          { label: 'Phone', val: '(310) 555-0147' },
          { label: 'Email', val: 'hello@mcqueenrealty.com' },
          { label: 'Office', val: '9601 Wilshire Blvd, Beverly Hills' },
        ].map(({ label, val }) => (
          <div key={label} style={{ marginBottom: '1.2rem' }}>
            <div style={{ fontFamily: "'Jost',sans-serif", fontSize: '0.56rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.22)', marginBottom: '0.2rem' }}>
              {label}
            </div>
            <div style={{ fontFamily: "'Jost',sans-serif", fontSize: '0.88rem', color: 'rgba(255,255,255,0.65)', fontWeight: 300 }}>
              {val}
            </div>
          </div>
        ))}
      </div>

      {/* Right form */}
      <div style={{ padding: '6rem 3.5rem', background: 'var(--off-white)' }}>
        {sent ? (
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%', textAlign: 'center' }}>
            <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 900, fontSize: '3.5rem', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '1rem' }}>
              Thank You
            </div>
            <p style={{ fontFamily: "'Jost',sans-serif", fontSize: '0.9rem', color: 'var(--mid)' }}>
              We'll be in touch shortly.
            </p>
          </div>
        ) : (
          <form onSubmit={e => { e.preventDefault(); setSent(true); }} style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'center' }}>
            {[
              { name: 'name', label: 'Your Name', type: 'text' },
              { name: 'email', label: 'Email Address', type: 'email' },
            ].map(({ name, label, type }) => (
              <div key={name} className="field-wrap">
                <label className="field-label">{label}</label>
                <input className="field-input" type={type} name={name} required
                  value={form[name]} onChange={e => setForm({ ...form, [name]: e.target.value })} />
              </div>
            ))}
            <div className="field-wrap" style={{ marginBottom: '2.5rem' }}>
              <label className="field-label">Message</label>
              <textarea className="field-textarea" name="message" rows={4} required
                value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} />
            </div>
            <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
              Send Inquiry <Arrow size={14} />
            </button>
          </form>
        )}
      </div>
    </section>
  );
}

/* ─── Footer ─────────────────────────────────────────────────────────────── */
function Footer() {
  return (
    <footer style={{ background: 'var(--black)' }}>
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
        padding: '4rem 2.5rem 3rem', borderBottom: '1px solid rgba(255,255,255,0.06)',
        gap: '2rem', flexWrap: 'wrap',
      }}>
        <div>
          <div style={{ fontFamily: "'Jost',sans-serif", fontWeight: 600, fontSize: '0.82rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--white)', marginBottom: '0.6rem' }}>
            McQueen<span style={{ color: 'var(--gold)' }}>·</span>Realty
          </div>
          <div style={{ fontFamily: "'Jost',sans-serif", fontSize: '0.75rem', color: 'rgba(255,255,255,0.25)', fontWeight: 300 }}>
            9601 Wilshire Blvd, Beverly Hills CA 90210
          </div>
        </div>
        <div style={{ display: 'flex', gap: '4rem' }}>
          {[
            { head: 'Properties', links: ['Buy', 'Rent', 'Sell', 'Exclusives'] },
            { head: 'Company', links: ['About Us', 'Agents', 'Services', 'Journal'] },
            { head: 'Markets', links: ['Beverly Hills', 'Bel Air', 'Malibu', 'Santa Monica'] },
          ].map(({ head, links }) => (
            <div key={head}>
              <div style={{ fontFamily: "'Jost',sans-serif", fontSize: '0.58rem', letterSpacing: '0.24em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', fontWeight: 500, marginBottom: '1rem' }}>
                {head}
              </div>
              {links.map(l => (
                <div key={l} style={{ marginBottom: '0.6rem' }}>
                  <a href="#" style={{ fontFamily: "'Jost',sans-serif", fontSize: '0.8rem', color: 'rgba(255,255,255,0.28)', fontWeight: 300, transition: 'color 0.2s' }}
                    onMouseEnter={e => e.currentTarget.style.color = 'var(--gold)'}
                    onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.28)'}
                  >
                    {l}
                  </a>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '1.4rem 2.5rem', flexWrap: 'wrap', gap: '1rem',
      }}>
        <div style={{ fontFamily: "'Jost',sans-serif", fontSize: '0.62rem', color: 'rgba(255,255,255,0.2)', fontWeight: 300 }}>
          © {new Date().getFullYear()} McQueen Realty. DRE #01234567. All rights reserved.
        </div>
        <div style={{ display: 'flex', gap: '2rem' }}>
          {['Privacy Policy', 'Terms of Service', 'Do Not Sell My Info'].map(l => (
            <a key={l} href="#" style={{ fontFamily: "'Jost',sans-serif", fontSize: '0.6rem', color: 'rgba(255,255,255,0.18)', transition: 'color 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.color = 'rgba(255,255,255,0.55)'}
              onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.18)'}
            >
              {l}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

/* ─── Page ───────────────────────────────────────────────────────────────── */
export default function Home() {
  const [scrolled, setScrolled]   = useState(false);
  const [overVideo, setOverVideo] = useState(true);
  const heroRef                   = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      if (heroRef.current) {
        setOverVideo(heroRef.current.getBoundingClientRect().bottom > 80);
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: GLOBAL_CSS }} />
      <Nav scrolled={scrolled} overVideo={overVideo} />
      <VideoHero heroRef={heroRef} />
      <SearchSection />
      <StatsStrip />
      <Marquee />
      <ListingsGrid />
      <MLSSearch />
      <Editorial />
      <Services />
      <About />
      <QuoteBand />
      <Contact />
      <Footer />
    </>
  );
}
