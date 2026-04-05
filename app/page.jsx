'use client';
import { useEffect, useRef, useState } from 'react';

const VIDEOS = [
  {
    src: 'https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-a-luxury-mansion-41779-large.mp4',
    poster: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1800&q=80&auto=format',
    label: 'Los Angeles',
  },
  {
    src: 'https://assets.mixkit.co/videos/preview/mixkit-aerial-panorama-of-a-residential-area-near-the-sea-44698-large.mp4',
    poster: 'https://images.unsplash.com/photo-1420745981456-b95fe23f5753?w=1800&q=80',
    label: 'Malibu',
  },
  {
    src: 'https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-a-beach-resort-4152-large.mp4',
    poster: 'https://images.unsplash.com/photo-1449034446853-66c86144b0ad?w=1800&q=80',
    label: 'Santa Monica',
  },
  {
    src: 'https://assets.mixkit.co/videos/preview/mixkit-flying-over-a-suburban-neighborhood-at-sunset-41773-large.mp4',
    poster: 'https://images.unsplash.com/photo-1543328023-cd0b8ff72739?w=1800&q=80',
    label: 'Beverly Hills',
  },
];

export default function Home() {
  const [active, setActive] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [overVideo, setOverVideo] = useState(true);
  const videoRefs = useRef([]);
  const intervalRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 10);
      setOverVideo(y < window.innerHeight * 0.8);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Play the active video
    videoRefs.current.forEach((v, i) => {
      if (!v) return;
      if (i === active) {
        v.play().catch(() => {});
      } else {
        v.pause();
        v.currentTime = 0;
      }
    });

    // Rotate every 7s
    intervalRef.current = setInterval(() => {
      setActive((prev) => (prev + 1) % VIDEOS.length);
    }, 7000);

    return () => clearInterval(intervalRef.current);
  }, [active]);

  const navClass = overVideo
    ? 'nav-wrap over-video'
    : scrolled
    ? 'nav-wrap scrolled-light'
    : 'nav-wrap';

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:ital,wght@0,700;0,800;0,900;1,700;1,800;1,900&family=Jost:wght@300;400;500;600&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

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

        .nav-wrap {
          position: fixed; top: 0; left: 0; right: 0; z-index: 500;
          transition: background 0.5s, border-color 0.5s, backdrop-filter 0.5s;
          border-bottom: 1px solid transparent;
        }
        .nav-wrap.over-video { background: transparent; }
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

        .nav-inner { display: flex; align-items: stretch; height: 68px; padding: 0 2.5rem; }

        .nav-logo {
          display: flex; align-items: center; padding-right: 3rem;
          font-family: 'Jost', sans-serif; font-weight: 600; font-size: 0.76rem;
          letter-spacing: 0.3em; text-transform: uppercase;
          transition: color 0.4s; white-space: nowrap; flex-shrink: 0;
        }
        .nav-logo .sep { color: var(--gold); margin: 0 0.15em; font-weight: 300; }

        .nav-links { display: flex; align-items: stretch; flex: 1; }

        .nav-link {
          display: flex; align-items: center; padding: 0 1.3rem;
          font-size: 0.7rem; letter-spacing: 0.1em; text-transform: uppercase;
          font-weight: 400; transition: color 0.2s; position: relative; white-space: nowrap;
        }
        .nav-link::after {
          content: ''; position: absolute; bottom: 0;
          left: 1.3rem; right: 1.3rem; height: 2px;
          background: var(--gold); transform: scaleX(0);
          transition: transform 0.25s ease;
        }
        .nav-link:hover::after { transform: scaleX(1); }

        .nav-right { display: flex; align-items: center; gap: 1.2rem; margin-left: auto; }

        .nav-cta {
          display: flex; align-items: center; height: 36px; padding: 0 1.4rem;
          background: var(--gold); color: var(--white) !important;
          font-size: 0.67rem; letter-spacing: 0.12em; font-weight: 500;
          text-transform: uppercase; transition: background 0.2s; flex-shrink: 0;
        }
        .nav-cta:hover { background: var(--gold-dark); }

        .hero-video-wrap {
          position: relative; width: 100%; height: 100vh; min-height: 700px;
          overflow: hidden; background: #000;
        }

        .hero-video {
          position: absolute; inset: 0; width: 100%; height: 100%;
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

        .hero-scene-label {
          position: absolute; bottom: 3.5rem; left: 2.5rem;
          display: flex; align-items: center; gap: 0.75rem;
        }
        .hero-scene-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--gold); flex-shrink: 0; }
        .hero-scene-name {
          font-family: 'Jost', sans-serif; font-size: 0.62rem; letter-spacing: 0.28em;
          text-transform: uppercase; color: rgba(255,255,255,0.55); transition: opacity 0.6s ease;
        }

        .hero-dots { position: absolute; bottom: 3.7rem; right: 2.5rem; display: flex; gap: 0.5rem; }
        .hero-dot { width: 18px; height: 2px; background: rgba(255,255,255,0.25); transition: background 0.4s, width 0.4s; }
        .hero-dot.active-dot { background: var(--gold); width: 32px; }

        .hero-wordmark {
          font-family: 'Jost', sans-serif; font-weight: 300;
          font-size: clamp(1rem, 2.5vw, 1.8rem); letter-spacing: 0.55em;
          text-transform: uppercase; color: rgba(255,255,255,0.88);
        }
        .hero-wordmark strong { font-weight: 600; letter-spacing: 0.55em; }

        .hero-rule {
          width: 1px; height: 60px;
          background: linear-gradient(to bottom, rgba(196,163,90,0.8), transparent);
          margin: 2rem auto 0;
        }

        .hero-scroll {
          position: absolute; bottom: 2.5rem; left: 50%; transform: translateX(-50%);
          display: flex; flex-direction: column; align-items: center; gap: 0.5rem;
        }
        .hero-scroll span {
          font-family: 'Jost', sans-serif; font-size: 0.55rem; letter-spacing: 0.3em;
          text-transform: uppercase; color: rgba(255,255,255,0.35);
        }
        .hero-scroll-arrow {
          width: 16px; height: 16px;
          border-right: 1px solid rgba(255,255,255,0.3);
          border-bottom: 1px solid rgba(255,255,255,0.3);
          transform: rotate(45deg);
          animation: scrollPulse 2s ease-in-out infinite;
        }

        .search-section {
          position: relative; background: var(--near-black); padding: 7rem 2.5rem;
          border-bottom: 1px solid rgba(255,255,255,0.06); overflow: hidden;
        }
        .search-bg {
          position: absolute; inset: 0; background-size: cover;
          background-position: center 30%; opacity: 0.22; transition: opacity 0.6s;
        }
        .search-content { position: relative; z-index: 2; }

        .search-headline {
          font-family: 'Barlow Condensed', sans-serif; font-weight: 900; font-style: italic;
          font-size: clamp(4.5rem, 11vw, 13rem); line-height: 0.88; letter-spacing: -0.01em;
          text-transform: uppercase; color: var(--white); margin-bottom: 1.5rem;
        }

        .search-sub {
          font-family: 'Jost', sans-serif; font-size: 0.85rem; font-weight: 300;
          letter-spacing: 0.08em; color: rgba(255,255,255,0.45); margin-bottom: 3rem;
        }

        .search-bar {
          display: flex; max-width: 780px;
          background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.14);
        }
        .search-bar input {
          flex: 1; background: transparent; border: none; outline: none;
          padding: 0 1.8rem; height: 62px; font-family: 'Jost', sans-serif;
          font-size: 0.92rem; font-weight: 300; color: var(--white); letter-spacing: 0.03em;
        }
        .search-bar input::placeholder { color: rgba(255,255,255,0.3); }
        .search-bar-divider { width: 1px; margin: 16px 0; background: rgba(255,255,255,0.12); }
        .search-bar-btn {
          display: flex; align-items: center; gap: 0.5rem;
          height: 62px; padding: 0 2.2rem; background: var(--gold); border: none;
          font-family: 'Jost', sans-serif; font-size: 0.68rem; letter-spacing: 0.18em;
          font-weight: 500; text-transform: uppercase; color: var(--white);
          transition: background 0.2s; flex-shrink: 0;
        }
        .search-bar-btn:hover { background: var(--gold-dark); }

        .search-exclusives {
          display: inline-flex; align-items: center; gap: 0.6rem; margin-top: 1.8rem;
          font-family: 'Jost', sans-serif; font-size: 0.67rem; letter-spacing: 0.16em;
          text-transform: uppercase; color: rgba(255,255,255,0.35);
          border-bottom: 1px solid rgba(255,255,255,0.15); padding-bottom: 2px;
          transition: color 0.2s, border-color 0.2s;
        }
        .search-exclusives:hover { color: var(--gold); border-color: var(--gold); }

        .stats-strip { display: flex; border-bottom: 1px solid var(--border); }
        .stat-cell { flex: 1; padding: 2.2rem 2.5rem; }
        .stat-cell + .stat-cell { border-left: 1px solid var(--border); }
        .stat-val {
          font-family: 'Barlow Condensed', sans-serif; font-weight: 900;
          font-size: 2.8rem; line-height: 1; color: var(--black); margin-bottom: 0.3rem;
        }
        .stat-label {
          font-family: 'Jost', sans-serif; font-size: 0.62rem; letter-spacing: 0.2em;
          text-transform: uppercase; color: var(--faint);
        }

        .marquee-wrap {
          overflow: hidden; background: var(--black);
          border-bottom: 1px solid rgba(255,255,255,0.04); padding: 1rem 0;
        }
        .marquee-track {
          display: flex; gap: 0; width: max-content;
          animation: marquee 30s linear infinite;
        }
        .marquee-item {
          display: flex; align-items: center; gap: 1.8rem; padding: 0 2rem;
          white-space: nowrap; font-family: 'Barlow Condensed', sans-serif;
          font-weight: 700; font-size: 0.95rem; letter-spacing: 0.18em;
          text-transform: uppercase; transition: color 0.2s;
        }
        .marquee-dot { color: rgba(255,255,255,0.15); font-size: 0.45rem; }

        .listings-grid {
          display: grid; grid-template-columns: 2fr 1fr 1fr;
          gap: 1px; background: var(--border);
        }
        .prop-card { background: var(--white); cursor: pointer; }
        .prop-card-img { overflow: hidden; position: relative; }
        .prop-card-img-inner { width: 100%; height: 100%; transition: transform 0.7s cubic-bezier(.16,1,.3,1); }
        .prop-card:hover .prop-card-img-inner { transform: scale(1.05); }
        .prop-tag {
          position: absolute; top: 1.2rem; left: 1.2rem;
          background: var(--black); color: var(--gold);
          font-family: 'Jost', sans-serif; font-size: 0.54rem; letter-spacing: 0.22em;
          padding: 0.32rem 0.75rem; text-transform: uppercase; font-weight: 500;
        }
        .prop-body { padding: 1.6rem 1.8rem 2rem; }
        .prop-address {
          font-family: 'Barlow Condensed', sans-serif; font-weight: 700; font-size: 1.35rem;
          text-transform: uppercase; letter-spacing: 0.02em; color: var(--black);
          line-height: 1.1; margin-bottom: 0.25rem;
        }
        .prop-city {
          font-family: 'Jost', sans-serif; font-size: 0.67rem; letter-spacing: 0.12em;
          text-transform: uppercase; color: var(--faint); margin-bottom: 1.1rem;
        }
        .prop-stats { display: flex; gap: 1.4rem; margin-bottom: 1.2rem; }
        .prop-stat { font-family: 'Jost', sans-serif; font-size: 0.7rem; color: var(--mid); }
        .prop-price { font-family: 'Barlow Condensed', sans-serif; font-weight: 800; font-size: 1.6rem; color: var(--black); }

        .sec-label {
          font-family: 'Jost', sans-serif; font-size: 0.62rem; letter-spacing: 0.28em;
          text-transform: uppercase; color: var(--gold); font-weight: 500;
          display: block; margin-bottom: 1rem;
        }
        .sec-h2 {
          font-family: 'Barlow Condensed', sans-serif; font-weight: 800;
          text-transform: uppercase; line-height: 0.9; letter-spacing: -0.01em;
        }

        .edit-grid {
          display: grid; grid-template-columns: 1.6fr 1fr 1fr;
          gap: 1px; background: rgba(255,255,255,0.06);
        }
        .edit-card { cursor: pointer; background: var(--near-black); }
        .edit-card-img { overflow: hidden; }
        .edit-card-img-inner { width: 100%; height: 100%; transition: transform 0.65s cubic-bezier(.16,1,.3,1); }
        .edit-card:hover .edit-card-img-inner { transform: scale(1.05); }

        .about-grid {
          display: grid; grid-template-columns: 1fr 1fr;
          min-height: 600px; border-bottom: 1px solid var(--border);
        }

        .contact-grid { display: grid; grid-template-columns: 1fr 1fr; border-bottom: 1px solid var(--border); }

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

        .btn-primary {
          display: inline-flex; align-items: center; gap: 0.7rem;
          background: var(--black); color: var(--white);
          padding: 1rem 2.4rem; font-family: 'Jost', sans-serif;
          font-size: 0.7rem; letter-spacing: 0.18em; text-transform: uppercase;
          font-weight: 500; border: none; transition: background 0.2s; cursor: pointer;
        }
        .btn-primary:hover { background: var(--gold); }

        .link-underline {
          font-family: 'Jost', sans-serif; font-size: 0.7rem; letter-spacing: 0.14em;
          text-transform: uppercase; color: var(--mid);
          border-bottom: 1px solid var(--border); padding-bottom: 2px;
          transition: color 0.2s, border-color 0.2s;
        }
        .link-underline:hover { color: var(--gold); border-color: var(--gold); }

        .link-gold {
          font-family: 'Jost', sans-serif; font-size: 0.7rem; letter-spacing: 0.16em;
          text-transform: uppercase; color: var(--gold);
          border-bottom: 1px solid var(--gold); padding-bottom: 2px; font-weight: 500;
          display: inline-flex; align-items: center; gap: 0.5rem; transition: color 0.2s;
        }
        .link-gold:hover { color: var(--gold-dark); }
      `}</style>

      {/* ── NAV ── */}
      <nav className={navClass}>
        <div className="nav-inner">
          <div className="nav-logo" style={{ color: overVideo ? '#ffffff' : 'var(--black)' }}>
            McQueen<span className="sep">·</span>Realty
          </div>
          <div className="nav-links">
            {['Buy','Rent','Sell','Agents'].map(l => (
              <a key={l} href={`#${l.toLowerCase()}`} className="nav-link"
                style={{ color: overVideo ? 'rgba(255,255,255,0.72)' : 'var(--mid)' }}>{l}</a>
            ))}
          </div>
          <div className="nav-right">
            <a href="#listings" className="nav-link"
              style={{ color: overVideo ? 'rgba(255,255,255,0.72)' : 'var(--mid)', padding: '0 0.8rem' }}>New Listings</a>
            <a href="#listings" className="nav-link"
              style={{ color: overVideo ? 'rgba(255,255,255,0.72)' : 'var(--mid)', padding: '0 0.8rem' }}>Exclusives</a>
            <a href="#contact" className="nav-cta">Schedule Showing</a>
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="hero-video-wrap">
        {VIDEOS.map((v, i) => (
          <video
            key={i}
            ref={el => videoRefs.current[i] = el}
            className={`hero-video ${i === active ? 'active' : 'inactive'}`}
            muted
            loop
            playsInline
            poster={v.poster}
          >
            <source src={v.src} type="video/mp4" />
          </video>
        ))}

        <div className="hero-overlay anim-fadeIn" />

        <div className="hero-center">
          <div className="anim-d1" style={{ textAlign: 'center' }}>
            <div className="hero-wordmark"><strong>McQueen</strong></div>
            <div style={{
              fontFamily: "'Jost', sans-serif", fontWeight: 300,
              fontSize: 'clamp(0.55rem, 1.2vw, 0.8rem)', letterSpacing: '0.7em',
              textTransform: 'uppercase', color: 'var(--gold)', marginTop: '0.8rem'
            }}>Realty</div>
          </div>
          <div className="hero-rule anim-d2" />
        </div>

        <div className="hero-scene-label anim-d5">
          <div className="hero-scene-dot" />
          <span className="hero-scene-name">{VIDEOS[active].label}</span>
        </div>

        <div className="hero-dots anim-d5">
          {VIDEOS.map((_, i) => (
            <div
              key={i}
              className={`hero-dot ${i === active ? 'active-dot' : ''}`}
              style={{ cursor: 'pointer' }}
              onClick={() => setActive(i)}
            />
          ))}
        </div>

        <div className="hero-scroll anim-d5">
          <span>Scroll</span>
          <div className="hero-scroll-arrow" />
        </div>
      </section>

      {/* ── SEARCH ── */}
      <section className="search-section" id="search">
        <div className="search-bg" style={{ backgroundImage: `url(${VIDEOS[active].poster})` }} />
        <div className="search-content" style={{ maxWidth: 1400, margin: '0 auto' }}>
          <p style={{
            fontFamily: "'Jost', sans-serif", fontSize: '0.62rem', letterSpacing: '0.3em',
            textTransform: 'uppercase', color: 'var(--gold)', fontWeight: 500, marginBottom: '1.5rem'
          }}>Los Angeles · Beverly Hills · Malibu</p>
          <h1 className="search-headline">Where Do<br/>You Want<br/>To Live?</h1>
          <p className="search-sub">McQueen Realty. Leaders in Southern California luxury property.</p>
          <div className="search-bar">
            <input placeholder="City, neighborhood, or ZIP code" />
            <div className="search-bar-divider" />
            <button className="search-bar-btn">
              Start Your Search{' '}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
              </svg>
            </button>
          </div>
          <a href="#listings" className="search-exclusives">
            View Our Exclusives{' '}
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
            </svg>
          </a>
        </div>
      </section>

      {/* ── STATS ── */}
      <div className="stats-strip">
        {[['$2.4B+','Closed Sales Volume'],['340+','Properties Represented'],['10+','Years of Excellence'],['98%','Client Satisfaction']].map(([v,l]) => (
          <div key={l} className="stat-cell">
            <div className="stat-val">{v}</div>
            <div className="stat-label">{l}</div>
          </div>
        ))}
      </div>

      {/* ── MARQUEE ── */}
      <div className="marquee-wrap">
        <div className="marquee-track">
          {['Beverly Hills','Bel Air','Malibu','Santa Monica','Pacific Palisades','Holmby Hills','Brentwood','Los Feliz',
            'Beverly Hills','Bel Air','Malibu','Santa Monica','Pacific Palisades','Holmby Hills','Brentwood','Los Feliz'].map((name, i) => (
            <a key={i} href="#listings" className="marquee-item"
              style={{ color: i % 2 === 0 ? 'rgba(255,255,255,0.82)' : 'var(--gold)' }}>
              {name}<span className="marquee-dot">◆</span>
            </a>
          ))}
        </div>
      </div>

      {/* ── LISTINGS ── */}
      <section id="listings" style={{ padding: '6rem 2.5rem', borderBottom: '1px solid var(--border)' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3.5rem' }}>
            <div>
              <span className="sec-label">Featured Properties</span>
              <h2 className="sec-h2" style={{ fontSize: 'clamp(2.8rem, 5vw, 5rem)', color: 'var(--black)' }}>Selected Homes</h2>
            </div>
            <a href="/listings" className="link-underline">View All Properties →</a>
          </div>
          <div className="listings-grid">
            {[
              { tag:'Exclusive', h:480, addr:'482 Sunset Ridge Drive', city:'Beverly Hills, CA 90210', bd:6, ba:7, sf:'9,200', price:'$8,950,000', bg:'linear-gradient(160deg,#CECECE,#A8A8A8)' },
              { tag:'New', h:280, addr:'17 Oceanfront Terrace', city:'Malibu, CA 90265', bd:5, ba:6, sf:'7,800', price:'$12,500,000', bg:'linear-gradient(160deg,#C8D0D0,#A4B0B0)' },
              { tag:'Featured', h:280, addr:'903 Canyon Crest Lane', city:'Bel Air, CA 90077', bd:5, ba:5, sf:'6,400', price:'$6,250,000', bg:'linear-gradient(160deg,#D0CCCC,#B0AAAA)' },
            ].map(p => (
              <div key={p.addr} className="prop-card">
                <div className="prop-card-img" style={{ height: p.h }}>
                  <div className="prop-card-img-inner" style={{ background: p.bg, height: '100%', position: 'relative' }}>
                    <div className="prop-tag">{p.tag}</div>
                  </div>
                </div>
                <div className="prop-body">
                  <div className="prop-address">{p.addr}</div>
                  <div className="prop-city">{p.city}</div>
                  <div className="prop-stats">
                    <span className="prop-stat">{p.bd} BD</span>
                    <span className="prop-stat">{p.ba} BA</span>
                    <span className="prop-stat">{p.sf} SF</span>
                  </div>
                  <div className="prop-price">{p.price}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MLS SEARCH ── */}
      <section style={{ padding: '6rem 2.5rem', borderBottom: '1px solid var(--border)', background: 'var(--off-white)' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3rem' }}>
            <div>
              <span className="sec-label">Live MLS · CRMLS</span>
              <h2 className="sec-h2" style={{ fontSize: 'clamp(2.5rem, 4.5vw, 4.5rem)' }}>Search Properties</h2>
            </div>
            <a href="/listings" className="link-underline">Full Screen Search →</a>
          </div>
          <div style={{ border: '1px solid var(--border)', height: 680, background: 'var(--white)' }}>
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
              Open Full Property Search{' '}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* ── EDITORIAL ── */}
      <section style={{ background: 'var(--near-black)', padding: '6rem 2.5rem', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3.5rem' }}>
            <div>
              <span className="sec-label">World of McQueen</span>
              <h2 className="sec-h2" style={{ fontSize: 'clamp(2.8rem, 5vw, 5rem)', color: 'var(--white)' }}>Luxury Property<br/>&amp; Lifestyle</h2>
            </div>
            <a href="/journal" style={{ fontFamily: "'Jost',sans-serif", fontSize: '0.7rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', borderBottom: '1px solid rgba(255,255,255,0.12)', paddingBottom: 2 }}>View All →</a>
          </div>
          <div className="edit-grid">
            {[
              { h: 380, title: 'The New Bel Air', sub: "How LA's most storied hillside is quietly reinventing itself", bg: 'linear-gradient(145deg,#222,#111)' },
              { h: 220, title: 'Malibu Colony Report', sub: 'Q1 2026 Market Insight', bg: 'linear-gradient(145deg,#1c2020,#111616)' },
              { h: 220, title: 'Architecture & Privacy', sub: 'Designing for the ultra-high-net-worth buyer', bg: 'linear-gradient(145deg,#201c1c,#141010)' },
            ].map(e => (
              <div key={e.title} className="edit-card">
                <div className="edit-card-img" style={{ height: e.h }}>
                  <div className="edit-card-img-inner" style={{ background: e.bg, height: '100%' }} />
                </div>
                <div style={{ padding: '1.5rem 1.8rem 2rem' }}>
                  <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: '1.3rem', textTransform: 'uppercase', color: 'var(--white)', lineHeight: 1.05, marginBottom: '0.5rem' }}>{e.title}</div>
                  <div style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.78rem', color: 'rgba(255,255,255,0.38)', fontWeight: 300, lineHeight: 1.6 }}>{e.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section id="services" style={{ borderTop: '1px solid var(--border)', padding: '6rem 2.5rem' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '4rem' }}>
            <div>
              <span className="sec-label">What We Do</span>
              <h2 className="sec-h2" style={{ fontSize: 'clamp(2.8rem, 5vw, 5rem)' }}>How We Serve</h2>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', borderTop: '1px solid var(--border)' }}>
            {[
              { n:'01', title:'Buyer Representation', body:'We guide discerning buyers through the acquisition of extraordinary properties — from private previews to negotiation and close.' },
              { n:'02', title:'Seller Advisory', body:'Strategic pricing, editorial marketing, and access to our global network of qualified buyers at every price point.' },
              { n:'03', title:'Portfolio & Investment', body:'Identify high-value residential opportunities and build a real estate portfolio positioned for long-term appreciation.' },
            ].map((s, i) => (
              <div key={s.n} style={{ padding: '3rem 2.5rem 3rem 0', borderLeft: i === 0 ? 'none' : '1px solid var(--border)', paddingLeft: i === 0 ? 0 : '2.5rem' }}>
                <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: '5rem', lineHeight: 1, color: 'var(--light-gray)', marginBottom: '1.5rem' }}>{s.n}</div>
                <h3 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: '1.5rem', textTransform: 'uppercase', color: 'var(--black)', marginBottom: '1rem', lineHeight: 1.1 }}>{s.title}</h3>
                <p style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.88rem', lineHeight: 1.8, color: 'var(--mid)', fontWeight: 300 }}>{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" className="about-grid">
        <div style={{ background: 'linear-gradient(150deg,#D8D8D8,#BEBEBE)', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', bottom: '2.5rem', right: '2.5rem', background: 'rgba(255,255,255,0.96)', padding: '1.2rem 1.8rem', borderLeft: '2px solid var(--gold)' }}>
            <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: '2.4rem', lineHeight: 1, color: 'var(--black)' }}>Est. 2015</div>
            <div style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--mid)', marginTop: '0.3rem' }}>Beverly Hills</div>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '5rem 4rem', borderLeft: '1px solid var(--border)' }}>
          <span className="sec-label">About McQueen Realty</span>
          <h2 className="sec-h2" style={{ fontSize: 'clamp(2.5rem, 4vw, 4rem)', marginBottom: '2rem' }}>A Standard Built<br/>On Trust</h2>
          <p style={{ fontFamily: "'Jost',sans-serif", fontSize: '0.9rem', lineHeight: 1.85, color: 'var(--mid)', fontWeight: 300, marginBottom: '1.4rem' }}>McQueen Realty was founded on a single conviction: every client — whether purchasing their first estate or expanding a multi-property portfolio — deserves the same caliber of attention and strategy.</p>
          <p style={{ fontFamily: "'Jost',sans-serif", fontSize: '0.9rem', lineHeight: 1.85, color: 'var(--mid)', fontWeight: 300, marginBottom: '2.5rem' }}>Our team combines deep regional market knowledge with a genuine passion for architecture and design. Every transaction is handled with discretion, precision, and genuine investment in the outcome.</p>
          <a href="#contact" className="link-gold">
            Work With Us{' '}
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
            </svg>
          </a>
        </div>
      </section>

      {/* ── QUOTE ── */}
      <div style={{ background: 'var(--black)', padding: '5rem 2.5rem', textAlign: 'center', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
        <blockquote style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontStyle: 'italic', fontSize: 'clamp(2rem, 4vw, 4rem)', textTransform: 'uppercase', color: 'var(--white)', lineHeight: 1, maxWidth: 900, margin: '0 auto 1.5rem' }}>&quot;Every Exceptional Home Has a Story.&quot;</blockquote>
        <p style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.78rem', color: 'rgba(255,255,255,0.25)', letterSpacing: '0.1em', fontWeight: 300 }}>— McQueen Realty, est. 2015</p>
      </div>

      {/* ── CONTACT ── */}
      <section id="contact" className="contact-grid">
        <div style={{ background: 'var(--near-black)', padding: '6rem 3.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <span className="sec-label">Begin the Conversation</span>
          <h2 className="sec-h2" style={{ fontSize: 'clamp(2.8rem, 4vw, 4.5rem)', color: 'var(--white)', marginBottom: '2rem' }}>We&apos;d Love<br/>to Hear<br/>From You</h2>
          <p style={{ fontFamily: "'Jost',sans-serif", fontSize: '0.88rem', lineHeight: 1.8, color: 'rgba(255,255,255,0.38)', fontWeight: 300, maxWidth: 340, marginBottom: '3rem' }}>Whether buying, selling, or simply exploring — our team responds within 24 hours.</p>
          {[['Phone','(310) 555-0147'],['Email','hello@mcqueenrealty.com'],['Office','9601 Wilshire Blvd, Beverly Hills']].map(([l,v]) => (
            <div key={l} style={{ marginBottom: '1.2rem' }}>
              <div style={{ fontFamily: "'Jost',sans-serif", fontSize: '0.56rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.22)', marginBottom: '0.2rem' }}>{l}</div>
              <div style={{ fontFamily: "'Jost',sans-serif", fontSize: '0.88rem', color: 'rgba(255,255,255,0.65)', fontWeight: 300 }}>{v}</div>
            </div>
          ))}
        </div>
        <div style={{ padding: '6rem 3.5rem', background: 'var(--off-white)' }}>
          <div style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'center' }}>
            {[['Your Name','text','name'],['Email Address','email','email']].map(([label, type, name]) => (
              <div key={name} className="field-wrap">
                <label className="field-label">{label}</label>
                <input className="field-input" type={type} name={name} />
              </div>
            ))}
            <div className="field-wrap" style={{ marginBottom: '2.5rem' }}>
              <label className="field-label">Message</label>
              <textarea className="field-textarea" name="message" rows={4} />
            </div>
            <button className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
              Send Inquiry{' '}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background: 'var(--black)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', padding: '4rem 2.5rem 3rem', borderBottom: '1px solid rgba(255,255,255,0.06)', gap: '2rem', flexWrap: 'wrap' }}>
          <div>
            <div style={{ fontFamily: "'Jost',sans-serif", fontWeight: 600, fontSize: '0.82rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--white)', marginBottom: '0.6rem' }}>McQueen<span style={{ color: 'var(--gold)' }}>·</span>Realty</div>
            <div style={{ fontFamily: "'Jost',sans-serif", fontSize: '0.75rem', color: 'rgba(255,255,255,0.25)', fontWeight: 300 }}>9601 Wilshire Blvd, Beverly Hills CA 90210</div>
          </div>
          <div style={{ display: 'flex', gap: '4rem' }}>
            {[
              ['Properties', ['Buy','Rent','Sell','Exclusives']],
              ['Company', ['About Us','Agents','Services','Journal']],
              ['Markets', ['Beverly Hills','Bel Air','Malibu','Santa Monica']],
            ].map(([heading, links]) => (
              <div key={heading}>
                <div style={{ fontFamily: "'Jost',sans-serif", fontSize: '0.58rem', letterSpacing: '0.24em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', fontWeight: 500, marginBottom: '1rem' }}>{heading}</div>
                {links.map(l => (
                  <div key={l} style={{ marginBottom: '0.6rem' }}>
                    <a href="#" style={{ fontFamily: "'Jost',sans-serif", fontSize: '0.8rem', color: 'rgba(255,255,255,0.28)', fontWeight: 300 }}>{l}</a>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.4rem 2.5rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ fontFamily: "'Jost',sans-serif", fontSize: '0.62rem', color: 'rgba(255,255,255,0.2)', fontWeight: 300 }}>© 2026 McQueen Realty. DRE #01234567. All rights reserved.</div>
          <div style={{ display: 'flex', gap: '2rem' }}>
            {['Privacy Policy','Terms of Service','Do Not Sell My Info'].map(l => (
              <a key={l} href="#" style={{ fontFamily: "'Jost',sans-serif", fontSize: '0.6rem', color: 'rgba(255,255,255,0.18)' }}>{l}</a>
            ))}
          </div>
        </div>
      </footer>
    </>
  );
}
