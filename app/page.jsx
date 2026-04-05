'use client';

import { useState, useEffect, useRef } from 'react';

/* ─── Global CSS ─────────────────────────────────────────────────────────── */
const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:ital,wght@0,700;0,800;0,900;1,700;1,800;1,900&family=Jost:wght@300;400;500;600&family=Cormorant+Garamond:wght@300;400&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --black:      #0A0908;
    --white:      #FFFFFF;
    --off-white:  #F5F4F1;
    --mid:        #767370;
    --border:     #E2DFD9;
    --gold:       #B8975A;
    --gold-dark:  #9A7D45;
    --red:        #C9243F;
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
    from { opacity: 0; transform: translateY(32px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  @keyframes photoScale {
    from { transform: scale(1.06); }
    to   { transform: scale(1); }
  }
  @keyframes slideIn {
    from { opacity: 0; transform: translateX(-20px); }
    to   { opacity: 1; transform: translateX(0); }
  }

  .anim-photo  { animation: photoScale 2.2s cubic-bezier(.16,1,.3,1) both; }
  .anim-fadeIn { animation: fadeIn  1s ease both; }
  .anim-d1     { animation: fadeUp  1s cubic-bezier(.16,1,.3,1) 0.3s both; }
  .anim-d2     { animation: fadeUp  1s cubic-bezier(.16,1,.3,1) 0.5s both; }
  .anim-d3     { animation: fadeUp  1s cubic-bezier(.16,1,.3,1) 0.7s both; }
  .anim-d4     { animation: fadeUp  1s cubic-bezier(.16,1,.3,1) 0.9s both; }
  .anim-d5     { animation: fadeIn  1s ease 1.2s both; }

  /* ── Nav ── */
  .nav-wrap {
    position: fixed; top: 0; left: 0; right: 0; z-index: 500;
    transition: background 0.4s, border-color 0.4s, backdrop-filter 0.4s;
  }
  .nav-wrap.scrolled-light {
    background: rgba(255,255,255,0.97);
    backdrop-filter: blur(16px);
    border-bottom: 1px solid var(--border);
  }
  .nav-wrap.scrolled-dark {
    background: rgba(10,9,8,0.88);
    backdrop-filter: blur(16px);
    border-bottom: 1px solid rgba(255,255,255,0.08);
  }
  .nav-wrap.top-dark  { background: transparent; border-bottom: 1px solid transparent; }

  .nav-inner {
    display: flex; align-items: stretch;
    height: 64px;
    padding: 0 2rem;
  }

  .nav-logo {
    display: flex; align-items: center;
    padding-right: 3rem;
    font-family: 'Jost', sans-serif;
    font-weight: 600;
    font-size: 0.78rem;
    letter-spacing: 0.28em;
    text-transform: uppercase;
    transition: color 0.4s;
    white-space: nowrap;
    flex-shrink: 0;
  }
  .nav-logo .dot { color: var(--gold); margin: 0 0.1em; }

  .nav-links {
    display: flex; align-items: stretch;
    flex: 1;
    gap: 0;
  }

  .nav-link {
    display: flex; align-items: center;
    padding: 0 1.4rem;
    font-size: 0.72rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    font-weight: 400;
    transition: color 0.2s, background 0.2s;
    position: relative;
    white-space: nowrap;
  }
  .nav-link::after {
    content: '';
    position: absolute; bottom: 0; left: 1.4rem; right: 1.4rem;
    height: 2px; background: var(--gold);
    transform: scaleX(0);
    transition: transform 0.25s;
  }
  .nav-link:hover::after { transform: scaleX(1); }

  .nav-right {
    display: flex; align-items: center;
    gap: 1.4rem;
    margin-left: auto;
  }

  .nav-cta {
    display: flex; align-items: center;
    height: 36px; padding: 0 1.4rem;
    background: var(--gold);
    color: var(--white) !important;
    font-size: 0.68rem;
    letter-spacing: 0.12em;
    font-weight: 500;
    text-transform: uppercase;
    transition: background 0.2s;
    flex-shrink: 0;
  }
  .nav-cta:hover { background: var(--gold-dark); }

  /* ── Hero ── */
  .hero {
    position: relative;
    height: 100vh; min-height: 700px;
    display: flex; align-items: flex-end;
    overflow: hidden;
  }

  .hero-bg {
    position: absolute; inset: 0;
    width: 100%; height: 100%;
    object-fit: cover; object-position: center 35%;
  }

  .hero-overlay {
    position: absolute; inset: 0;
    background: linear-gradient(
      180deg,
      rgba(10,9,8,0.28) 0%,
      rgba(10,9,8,0.18) 30%,
      rgba(10,9,8,0.55) 65%,
      rgba(10,9,8,0.92) 100%
    );
  }

  .hero-content {
    position: relative; z-index: 2;
    width: 100%;
    padding: 0 2rem 5rem;
    display: flex; flex-direction: column; align-items: flex-start;
  }

  .hero-eyebrow {
    font-family: 'Jost', sans-serif;
    font-size: 0.62rem;
    letter-spacing: 0.32em;
    text-transform: uppercase;
    color: var(--gold);
    font-weight: 400;
    margin-bottom: 1.2rem;
  }

  .hero-headline {
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 900;
    font-style: italic;
    font-size: clamp(5rem, 13vw, 14rem);
    line-height: 0.88;
    letter-spacing: -0.01em;
    text-transform: uppercase;
    color: var(--white);
    margin-bottom: 2.4rem;
    max-width: 1100px;
  }

  .hero-sub {
    font-family: 'Jost', sans-serif;
    font-size: 0.85rem;
    font-weight: 300;
    letter-spacing: 0.06em;
    color: rgba(255,255,255,0.65);
    margin-bottom: 2.4rem;
  }

  /* ── Hero Search ── */
  .hero-search {
    display: flex;
    width: 100%; max-width: 720px;
    background: rgba(255,255,255,0.1);
    border: 1px solid rgba(255,255,255,0.22);
    backdrop-filter: blur(20px);
  }

  .hero-search input {
    flex: 1;
    background: transparent; border: none; outline: none;
    padding: 0 1.6rem;
    height: 58px;
    font-family: 'Jost', sans-serif;
    font-size: 0.9rem;
    font-weight: 300;
    color: var(--white);
    letter-spacing: 0.03em;
  }
  .hero-search input::placeholder { color: rgba(255,255,255,0.45); }

  .hero-search-divider {
    width: 1px;
    margin: 14px 0;
    background: rgba(255,255,255,0.18);
  }

  .hero-search-btn {
    display: flex; align-items: center;
    height: 58px; padding: 0 2rem;
    background: var(--gold);
    border: none;
    font-family: 'Jost', sans-serif;
    font-size: 0.7rem;
    letter-spacing: 0.16em;
    font-weight: 500;
    text-transform: uppercase;
    color: var(--white);
    transition: background 0.2s;
    white-space: nowrap;
    flex-shrink: 0;
    gap: 0.6rem;
  }
  .hero-search-btn:hover { background: var(--gold-dark); }

  .hero-exclusives {
    margin-top: 1.6rem;
    font-size: 0.68rem;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.5);
    display: flex; align-items: center; gap: 0.6rem;
    border-bottom: 1px solid rgba(255,255,255,0.2);
    padding-bottom: 2px;
    width: fit-content;
    transition: color 0.2s, border-color 0.2s;
  }
  .hero-exclusives:hover {
    color: var(--gold);
    border-color: var(--gold);
  }

  /* ── Marquee strip ── */
  @keyframes marquee {
    from { transform: translateX(0); }
    to   { transform: translateX(-50%); }
  }
  .marquee-track {
    display: flex; gap: 0;
    animation: marquee 28s linear infinite;
    width: max-content;
  }

  /* ── Property Cards ── */
  .prop-card { cursor: pointer; }
  .prop-card-img-wrap { overflow: hidden; }
  .prop-card-img {
    width: 100%; height: 100%;
    object-fit: cover;
    transition: transform 0.7s cubic-bezier(.16,1,.3,1);
    display: block;
  }
  .prop-card:hover .prop-card-img { transform: scale(1.06); }
  .prop-card:hover .prop-card-over { opacity: 1; }

  /* ── Editorial cards ── */
  .edit-card { cursor: pointer; }
  .edit-card-img-wrap { overflow: hidden; }
  .edit-card img {
    width: 100%; height: 100%;
    object-fit: cover; display: block;
    transition: transform 0.65s cubic-bezier(.16,1,.3,1);
  }
  .edit-card:hover img { transform: scale(1.05); }

  /* ── Section label ── */
  .sec-label {
    font-family: 'Jost', sans-serif;
    font-size: 0.62rem;
    letter-spacing: 0.26em;
    text-transform: uppercase;
    color: var(--gold);
    font-weight: 500;
    display: block;
    margin-bottom: 1rem;
  }

  /* ── Big heading ── */
  .sec-h2 {
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 800;
    text-transform: uppercase;
    line-height: 0.9;
    letter-spacing: -0.01em;
  }

  /* ── Form fields ── */
  .field-wrap { border-bottom: 1px solid var(--border); padding: 1.2rem 0; }
  .field-label {
    display: block;
    font-size: 0.6rem; letter-spacing: 0.2em;
    text-transform: uppercase; color: #aaa; margin-bottom: 0.4rem;
  }
  .field-input {
    width: 100%; background: transparent; border: none; outline: none;
    font-family: 'Jost', sans-serif; font-size: 0.95rem; color: var(--black);
  }
  .field-input:focus { border-bottom-color: var(--gold); }
  .field-textarea {
    width: 100%; background: transparent; border: none; outline: none;
    font-family: 'Jost', sans-serif; font-size: 0.95rem; color: var(--black);
    resize: none;
  }
`;

/* ─── Data ───────────────────────────────────────────────────────────────── */
const NAV_LEFT  = ['Buy', 'Rent', 'Sell', 'Agents'];
const NAV_RIGHT = ['New Listings', 'Exclusives'];

const LISTINGS = [
  {
    id: 1, address: '482 Sunset Ridge Drive', city: 'Beverly Hills, CA 90210',
    price: '$8,950,000', beds: 6, baths: 7, sqft: '9,200', tag: 'Exclusive',
    bg: 'linear-gradient(160deg,#DDD8CE,#C8C0B2)',
  },
  {
    id: 2, address: '17 Oceanfront Terrace', city: 'Malibu, CA 90265',
    price: '$12,500,000', beds: 5, baths: 6, sqft: '7,800', tag: 'New',
    bg: 'linear-gradient(160deg,#C9D2CC,#B8C4BC)',
  },
  {
    id: 3, address: '903 Canyon Crest Lane', city: 'Bel Air, CA 90077',
    price: '$6,250,000', beds: 5, baths: 5, sqft: '6,400', tag: 'Featured',
    bg: 'linear-gradient(160deg,#E0D8CE,#CDBFB0)',
  },
];

const EDITORIAL = [
  {
    title: 'The New Bel Air',
    sub: "How LA's most storied hillside is quietly reinventing itself",
    size: 'large',
    bg: 'linear-gradient(145deg,#3a3530,#1a1714)',
  },
  {
    title: 'Malibu Colony Report',
    sub: 'Q1 2026 Market Insight',
    size: 'small',
    bg: 'linear-gradient(145deg,#2c3430,#181c1a)',
  },
  {
    title: 'Architecture & Privacy',
    sub: 'Designing for the ultra-high-net-worth buyer',
    size: 'small',
    bg: 'linear-gradient(145deg,#302c28,#1a1714)',
  },
];

const MARKETS = [
  'Beverly Hills', 'Bel Air', 'Malibu', 'Santa Monica',
  'Pacific Palisades', 'Holmby Hills', 'Brentwood', 'Los Feliz',
];

/* ─── Search Arrow Icon ──────────────────────────────────────────────────── */
function ArrowRight({ color = 'currentColor', size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

/* ─── Nav ────────────────────────────────────────────────────────────────── */
function Nav({ scrolled, overHero }) {
  const dark = overHero;
  const linkColor = dark ? 'rgba(255,255,255,0.72)' : 'var(--black)';
  const logoColor = dark ? '#ffffff' : 'var(--black)';
  const wrapClass = `nav-wrap${scrolled ? (dark ? ' scrolled-dark' : ' scrolled-light') : ' top-dark'}`;

  return (
    <nav className={wrapClass}>
      <div className="nav-inner">
        {/* Logo */}
        <div className="nav-logo" style={{ color: logoColor }}>
          McQueen<span className="dot">·</span>Realty
        </div>

        {/* Left links */}
        <div className="nav-links">
          {NAV_LEFT.map(l => (
            <a key={l} href={`#${l.toLowerCase()}`} className="nav-link" style={{ color: linkColor }}>
              {l}
            </a>
          ))}
        </div>

        {/* Right */}
        <div className="nav-right">
          {NAV_RIGHT.map(l => (
            <a key={l} href="#listings" className="nav-link" style={{ color: linkColor, padding: '0 0.8rem' }}>
              {l}
            </a>
          ))}
          <a href="#contact" className="nav-cta">Schedule Showing</a>
        </div>
      </div>
    </nav>
  );
}

/* ─── Hero Search Input ──────────────────────────────────────────────────── */
function HeroSearchBar() {
  const [query, setQuery] = useState('');
  return (
    <div className="anim-d3" style={{ width: '100%', maxWidth: '720px' }}>
      <div className="hero-search">
        <input
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="City, neighborhood, or ZIP code"
          onKeyDown={e => e.key === 'Enter' && (window.location.href = '#listings')}
        />
        <div className="hero-search-divider" />
        <button className="hero-search-btn" onClick={() => window.location.href = '#listings'}>
          Start Your Search
          <ArrowRight color="white" size={14} />
        </button>
      </div>
      <a href="#listings" className="hero-exclusives anim-d4">
        View Our Exclusives <ArrowRight size={11} />
      </a>
    </div>
  );
}

/* ─── Stats Strip ────────────────────────────────────────────────────────── */
function StatsStrip() {
  const stats = [
    { val: '$2.4B+', label: 'Closed Sales Volume' },
    { val: '340+',   label: 'Properties Represented' },
    { val: '10+',    label: 'Years of Excellence' },
    { val: '98%',    label: 'Client Satisfaction' },
  ];
  return (
    <div style={{
      display: 'flex',
      borderBottom: '1px solid var(--border)',
    }}>
      {stats.map(({ val, label }, i) => (
        <div key={i} style={{
          flex: 1, padding: '2rem 2.5rem',
          borderRight: i < stats.length - 1 ? '1px solid var(--border)' : 'none',
        }}>
          <div style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontWeight: 800, fontSize: '2.8rem', lineHeight: 1,
            color: 'var(--black)', marginBottom: '0.3rem',
          }}>
            {val}
          </div>
          <div style={{
            fontFamily: "'Jost', sans-serif",
            fontSize: '0.65rem', letterSpacing: '0.18em',
            textTransform: 'uppercase', color: 'var(--mid)', fontWeight: 400,
          }}>
            {label}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ─── Markets Marquee ────────────────────────────────────────────────────── */
function MarketsMarquee() {
  const items = [...MARKETS, ...MARKETS]; // doubled for seamless loop
  return (
    <div style={{
      overflow: 'hidden',
      borderBottom: '1px solid var(--border)',
      background: 'var(--black)',
      padding: '1.1rem 0',
    }}>
      <div className="marquee-track">
        {items.map((m, i) => (
          <a key={i} href="#listings" style={{
            display: 'flex', alignItems: 'center', gap: '2rem',
            padding: '0 2rem',
            fontFamily: "'Barlow Condensed', sans-serif",
            fontWeight: 700, fontSize: '1rem',
            letterSpacing: '0.16em', textTransform: 'uppercase',
            color: i % 2 === 0 ? 'rgba(255,255,255,0.9)' : 'var(--gold)',
            whiteSpace: 'nowrap',
            transition: 'color 0.2s',
          }}>
            {m}
            <span style={{ color: 'rgba(255,255,255,0.2)', fontSize: '0.5rem' }}>◆</span>
          </a>
        ))}
      </div>
    </div>
  );
}

/* ─── Listings Grid ──────────────────────────────────────────────────────── */
function ListingsGrid() {
  return (
    <section id="listings" style={{ padding: '6rem 2rem', borderBottom: '1px solid var(--border)' }}>
      {/* Header */}
      <div style={{
        display: 'flex', justifyContent: 'space-between',
        alignItems: 'flex-end', marginBottom: '3.5rem',
      }}>
        <div>
          <span className="sec-label">Featured Properties</span>
          <h2 className="sec-h2" style={{ fontSize: 'clamp(2.8rem, 5vw, 5rem)', color: 'var(--black)' }}>
            Our Exclusives
          </h2>
        </div>
        <a href="/listings" style={{
          fontFamily: "'Jost', sans-serif",
          fontSize: '0.7rem', letterSpacing: '0.14em',
          textTransform: 'uppercase', color: 'var(--mid)',
          borderBottom: '1px solid var(--border)', paddingBottom: '2px',
          transition: 'color 0.2s, border-color 0.2s',
        }}
          onMouseEnter={e => { e.currentTarget.style.color = 'var(--gold)'; e.currentTarget.style.borderColor = 'var(--gold)'; }}
          onMouseLeave={e => { e.currentTarget.style.color = 'var(--mid)'; e.currentTarget.style.borderColor = 'var(--border)'; }}
        >
          View All Properties →
        </a>
      </div>

      {/* Grid — Elliman uses a 2+1 or 3-col layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '1px', background: 'var(--border)' }}>
        {LISTINGS.map((l, i) => (
          <div key={l.id} className="prop-card" style={{ background: 'var(--white)', position: 'relative' }}>
            {/* Image */}
            <div className="prop-card-img-wrap" style={{ height: i === 0 ? '480px' : '280px' }}>
              <div style={{ width: '100%', height: '100%', background: l.bg, position: 'relative' }}>
                {/* Tag */}
                <div style={{
                  position: 'absolute', top: '1.2rem', left: '1.2rem',
                  background: 'var(--black)', color: 'var(--gold)',
                  fontFamily: "'Jost', sans-serif",
                  fontSize: '0.55rem', letterSpacing: '0.2em',
                  padding: '0.3rem 0.7rem', textTransform: 'uppercase', fontWeight: 500,
                }}>
                  {l.tag}
                </div>
              </div>
            </div>

            {/* Body */}
            <div style={{ padding: '1.4rem 1.6rem 1.8rem' }}>
              <div style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 700, fontSize: '1.4rem',
                textTransform: 'uppercase', letterSpacing: '0.02em',
                color: 'var(--black)', marginBottom: '0.2rem', lineHeight: 1.1,
              }}>
                {l.address}
              </div>
              <div style={{
                fontFamily: "'Jost', sans-serif",
                fontSize: '0.68rem', letterSpacing: '0.1em',
                color: 'var(--mid)', textTransform: 'uppercase',
                marginBottom: '1rem',
              }}>
                {l.city}
              </div>
              <div style={{ display: 'flex', gap: '1.2rem', marginBottom: '1.1rem' }}>
                {[`${l.beds} BD`, `${l.baths} BA`, `${l.sqft} SF`].map((s, si) => (
                  <span key={si} style={{
                    fontFamily: "'Jost', sans-serif",
                    fontSize: '0.72rem', color: 'var(--mid)',
                  }}>{s}</span>
                ))}
              </div>
              <div style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 800, fontSize: '1.6rem',
                color: 'var(--black)',
              }}>
                {l.price}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─── MLS iframe ─────────────────────────────────────────────────────────── */
function MLSSearch() {
  return (
    <section style={{ padding: '6rem 2rem', borderBottom: '1px solid var(--border)', background: 'var(--off-white)' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3rem' }}>
          <div>
            <span className="sec-label">Live MLS · CRMLS</span>
            <h2 className="sec-h2" style={{ fontSize: 'clamp(2.5rem, 4.5vw, 4.5rem)', color: 'var(--black)' }}>
              Search Properties
            </h2>
          </div>
          <a href="/listings" style={{
            fontFamily: "'Jost', sans-serif",
            fontSize: '0.7rem', letterSpacing: '0.14em',
            textTransform: 'uppercase', color: 'var(--mid)',
            borderBottom: '1px solid var(--border)', paddingBottom: '2px',
          }}>
            Full Screen Search →
          </a>
        </div>

        <div style={{ border: '1px solid var(--border)', height: '680px', background: 'var(--white)' }}>
          <iframe
            src="https://matrix.crmls.org/Matrix/public/IDX.aspx?idx=eefc378c"
            width="100%" height="100%"
            frameBorder="0"
            style={{ display: 'block', border: 'none' }}
            title="McQueen Realty Property Search"
            allowFullScreen
          />
        </div>

        <div style={{ marginTop: '2rem', textAlign: 'center' }}>
          <a href="/listings" style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.7rem',
            background: 'var(--black)', color: 'var(--white)',
            padding: '1rem 2.4rem',
            fontFamily: "'Jost', sans-serif",
            fontSize: '0.7rem', letterSpacing: '0.16em',
            textTransform: 'uppercase', fontWeight: 500,
            transition: 'background 0.2s',
          }}
            onMouseEnter={e => e.currentTarget.style.background = 'var(--gold)'}
            onMouseLeave={e => e.currentTarget.style.background = 'var(--black)'}
          >
            Open Full Property Search <ArrowRight size={14} />
          </a>
        </div>
      </div>
    </section>
  );
}

/* ─── Editorial / World of McQueen ──────────────────────────────────────── */
function Editorial() {
  return (
    <section style={{ background: 'var(--black)', padding: '6rem 2rem', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3.5rem' }}>
          <div>
            <span style={{ ...{}, fontFamily: "'Jost',sans-serif", fontSize: '0.62rem', letterSpacing: '0.26em', textTransform: 'uppercase', color: 'var(--gold)', fontWeight: 500, display: 'block', marginBottom: '1rem' }}>
              World of McQueen
            </span>
            <h2 className="sec-h2" style={{ fontSize: 'clamp(2.8rem, 5vw, 5rem)', color: 'var(--white)' }}>
              The Latest in Luxury<br />Property & Lifestyle
            </h2>
          </div>
          <a href="/journal" style={{
            fontFamily: "'Jost', sans-serif",
            fontSize: '0.7rem', letterSpacing: '0.14em',
            textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)',
            borderBottom: '1px solid rgba(255,255,255,0.15)', paddingBottom: '2px',
          }}>
            View All →
          </a>
        </div>

        {/* 3-col editorial grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr 1fr', gap: '1px', background: 'rgba(255,255,255,0.06)' }}>
          {EDITORIAL.map((e, i) => (
            <div key={i} className="edit-card" style={{ background: 'var(--black)', cursor: 'pointer' }}>
              <div className="edit-card-img-wrap" style={{ height: i === 0 ? '380px' : '220px' }}>
                <div style={{
                  width: '100%', height: '100%', background: e.bg,
                  display: 'flex', alignItems: 'flex-end', padding: '1.5rem',
                }}>
                  {i === 0 && (
                    <div style={{
                      fontFamily: "'Jost', sans-serif",
                      fontSize: '0.58rem', letterSpacing: '0.22em',
                      textTransform: 'uppercase', color: 'var(--gold)',
                    }}>
                      Market Report
                    </div>
                  )}
                </div>
              </div>
              <div style={{ padding: '1.4rem 1.6rem 1.8rem' }}>
                <div style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontWeight: 800,
                  fontSize: i === 0 ? '1.6rem' : '1.3rem',
                  textTransform: 'uppercase',
                  color: 'var(--white)',
                  lineHeight: 1.05, marginBottom: '0.5rem',
                }}>
                  {e.title}
                </div>
                <div style={{
                  fontFamily: "'Jost', sans-serif",
                  fontSize: '0.78rem', color: 'rgba(255,255,255,0.45)',
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
  const services = [
    {
      num: '01', title: 'Buyer Representation',
      desc: 'We guide discerning buyers through the acquisition of extraordinary properties — from private previews to negotiation and close.',
    },
    {
      num: '02', title: 'Seller Advisory',
      desc: 'Strategic pricing, editorial marketing, and access to our global network of qualified buyers at every price point.',
    },
    {
      num: '03', title: 'Portfolio & Investment',
      desc: 'Identify high-value residential opportunities and build a real estate portfolio positioned for long-term appreciation.',
    },
  ];
  return (
    <section id="services" style={{ padding: '6rem 2rem', borderBottom: '1px solid var(--border)' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '4rem' }}>
          <div>
            <span className="sec-label">What We Do</span>
            <h2 className="sec-h2" style={{ fontSize: 'clamp(2.8rem, 5vw, 5rem)' }}>How We Serve</h2>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '0', borderTop: '1px solid var(--border)' }}>
          {services.map(({ num, title, desc }, i) => (
            <div key={i} style={{
              padding: '3rem 2.5rem 3rem 0',
              borderRight: i < 2 ? '1px solid var(--border)' : 'none',
              paddingLeft: i > 0 ? '2.5rem' : 0,
            }}>
              <div style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 900, fontSize: '5rem', lineHeight: 1,
                color: 'rgba(10,9,8,0.06)', marginBottom: '1.5rem',
              }}>
                {num}
              </div>
              <h3 style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 800, fontSize: '1.5rem',
                textTransform: 'uppercase', letterSpacing: '0.02em',
                color: 'var(--black)', marginBottom: '1rem', lineHeight: 1.1,
              }}>
                {title}
              </h3>
              <p style={{
                fontFamily: "'Jost', sans-serif",
                fontSize: '0.88rem', lineHeight: 1.75,
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
    <section id="about" style={{
      display: 'grid', gridTemplateColumns: '1fr 1fr',
      minHeight: '600px', borderBottom: '1px solid var(--border)',
    }}>
      {/* Image */}
      <div style={{
        background: 'linear-gradient(145deg,#E8E3DA,#D0C8BC)',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', bottom: '2.5rem', right: '2.5rem',
          background: 'rgba(255,255,255,0.92)',
          padding: '1.2rem 1.8rem',
          backdropFilter: 'blur(8px)',
        }}>
          <div style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontWeight: 800, fontSize: '2.4rem', lineHeight: 1,
            color: 'var(--gold)',
          }}>Est. 2015</div>
          <div style={{
            fontFamily: "'Jost', sans-serif",
            fontSize: '0.6rem', letterSpacing: '0.2em',
            textTransform: 'uppercase', color: 'var(--mid)',
            marginTop: '0.3rem',
          }}>Beverly Hills</div>
        </div>
      </div>

      {/* Text */}
      <div style={{
        display: 'flex', flexDirection: 'column', justifyContent: 'center',
        padding: '5rem 4rem',
        borderLeft: '1px solid var(--border)',
      }}>
        <span className="sec-label">About McQueen Realty</span>
        <h2 className="sec-h2" style={{ fontSize: 'clamp(2.5rem, 4vw, 4rem)', marginBottom: '2rem' }}>
          A Standard Built<br />On Trust
        </h2>
        <p style={{
          fontFamily: "'Jost', sans-serif", fontSize: '0.9rem',
          lineHeight: 1.85, color: 'var(--mid)', fontWeight: 300,
          marginBottom: '1.4rem',
        }}>
          McQueen Realty was founded on a single conviction: every client —
          whether purchasing their first estate or expanding a multi-property
          portfolio — deserves the same caliber of attention and strategy.
        </p>
        <p style={{
          fontFamily: "'Jost', sans-serif", fontSize: '0.9rem',
          lineHeight: 1.85, color: 'var(--mid)', fontWeight: 300,
          marginBottom: '2.5rem',
        }}>
          Our team combines deep regional market knowledge with a genuine
          passion for architecture and design. Every transaction is handled
          with discretion, precision, and genuine investment in the outcome.
        </p>
        <a href="#contact" style={{
          display: 'inline-flex', alignItems: 'center', gap: '0.7rem',
          fontFamily: "'Jost', sans-serif", fontSize: '0.7rem',
          letterSpacing: '0.16em', textTransform: 'uppercase',
          color: 'var(--gold)', fontWeight: 500,
          borderBottom: '1px solid var(--gold)', paddingBottom: '2px', width: 'fit-content',
        }}>
          Work With Us <ArrowRight size={12} color="var(--gold)" />
        </a>
      </div>
    </section>
  );
}

/* ─── Quote Band ─────────────────────────────────────────────────────────── */
function QuoteBand() {
  return (
    <div style={{
      background: 'var(--black)', padding: '5rem 2rem',
      textAlign: 'center', borderBottom: '1px solid rgba(255,255,255,0.06)',
    }}>
      <blockquote style={{
        fontFamily: "'Barlow Condensed', sans-serif",
        fontWeight: 700, fontStyle: 'italic',
        fontSize: 'clamp(2rem, 4vw, 4rem)',
        textTransform: 'uppercase',
        color: 'var(--white)', lineHeight: 1.0,
        maxWidth: '900px', margin: '0 auto 1.5rem',
        letterSpacing: '-0.01em',
      }}>
        "Every Exceptional Home Has a Story."
      </blockquote>
      <p style={{
        fontFamily: "'Jost', sans-serif", fontSize: '0.82rem',
        color: 'rgba(255,255,255,0.4)', letterSpacing: '0.08em', fontWeight: 300,
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
    <section id="contact" style={{
      display: 'grid', gridTemplateColumns: '1fr 1fr',
      borderBottom: '1px solid var(--border)',
    }}>
      {/* Left — dark panel */}
      <div style={{
        background: 'var(--black)', padding: '6rem 3.5rem',
        display: 'flex', flexDirection: 'column', justifyContent: 'center',
      }}>
        <span style={{
          fontFamily: "'Jost', sans-serif", fontSize: '0.62rem',
          letterSpacing: '0.26em', textTransform: 'uppercase',
          color: 'var(--gold)', fontWeight: 500, display: 'block', marginBottom: '1rem',
        }}>
          Begin the Conversation
        </span>
        <h2 className="sec-h2" style={{
          fontSize: 'clamp(2.8rem, 4vw, 4.5rem)',
          color: 'var(--white)', marginBottom: '2rem',
        }}>
          We'd Love<br />to Hear<br />From You
        </h2>
        <p style={{
          fontFamily: "'Jost', sans-serif", fontSize: '0.88rem',
          lineHeight: 1.8, color: 'rgba(255,255,255,0.45)', fontWeight: 300,
          maxWidth: '340px', marginBottom: '3rem',
        }}>
          Whether buying, selling, or simply exploring —
          our team responds within 24 hours.
        </p>

        {/* Contact details */}
        {[
          { label: 'Phone', val: '(310) 555-0147' },
          { label: 'Email', val: 'hello@mcqueenrealty.com' },
          { label: 'Office', val: '9601 Wilshire Blvd, Beverly Hills' },
        ].map(({ label, val }) => (
          <div key={label} style={{ marginBottom: '1.2rem' }}>
            <div style={{
              fontFamily: "'Jost', sans-serif", fontSize: '0.58rem',
              letterSpacing: '0.2em', textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.3)', marginBottom: '0.2rem',
            }}>
              {label}
            </div>
            <div style={{
              fontFamily: "'Jost', sans-serif", fontSize: '0.88rem',
              color: 'rgba(255,255,255,0.75)', fontWeight: 300,
            }}>
              {val}
            </div>
          </div>
        ))}
      </div>

      {/* Right — form */}
      <div style={{ padding: '6rem 3.5rem', background: 'var(--off-white)' }}>
        {sent ? (
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%', textAlign: 'center' }}>
            <div style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 800, fontSize: '3rem',
              textTransform: 'uppercase', color: 'var(--gold)',
              marginBottom: '1rem',
            }}>
              Thank You
            </div>
            <p style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.9rem', color: 'var(--mid)' }}>
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
                <input
                  className="field-input"
                  type={type} name={name} required
                  value={form[name]}
                  onChange={e => setForm({ ...form, [name]: e.target.value })}
                />
              </div>
            ))}
            <div className="field-wrap" style={{ marginBottom: '2.5rem' }}>
              <label className="field-label">Message</label>
              <textarea
                className="field-textarea"
                name="message" rows={4} required
                value={form.message}
                onChange={e => setForm({ ...form, message: e.target.value })}
              />
            </div>
            <button type="submit" style={{
              background: 'var(--black)', color: 'var(--white)',
              border: 'none', padding: '1.1rem',
              fontFamily: "'Jost', sans-serif",
              fontSize: '0.7rem', letterSpacing: '0.18em',
              textTransform: 'uppercase', fontWeight: 500,
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.7rem',
              transition: 'background 0.2s',
            }}
              onMouseEnter={e => e.currentTarget.style.background = 'var(--gold)'}
              onMouseLeave={e => e.currentTarget.style.background = 'var(--black)'}
            >
              Send Inquiry <ArrowRight size={14} />
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
    <footer style={{ background: 'var(--black)', color: 'rgba(255,255,255,0.35)' }}>
      {/* Top row */}
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
        padding: '4rem 2rem 3rem',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
        gap: '2rem', flexWrap: 'wrap',
      }}>
        {/* Logo + tagline */}
        <div>
          <div style={{
            fontFamily: "'Jost', sans-serif", fontWeight: 600,
            fontSize: '0.85rem', letterSpacing: '0.28em',
            textTransform: 'uppercase', color: 'var(--white)', marginBottom: '0.6rem',
          }}>
            McQueen<span style={{ color: 'var(--gold)' }}>·</span>Realty
          </div>
          <div style={{
            fontFamily: "'Jost', sans-serif", fontSize: '0.75rem',
            color: 'rgba(255,255,255,0.3)', fontWeight: 300, letterSpacing: '0.04em',
          }}>
            9601 Wilshire Blvd, Beverly Hills CA 90210
          </div>
        </div>

        {/* Link columns */}
        <div style={{ display: 'flex', gap: '4rem' }}>
          {[
            { head: 'Properties', links: ['Buy', 'Rent', 'Sell', 'Exclusives'] },
            { head: 'Company', links: ['About Us', 'Agents', 'Services', 'Journal'] },
            { head: 'Markets', links: ['Beverly Hills', 'Bel Air', 'Malibu', 'Santa Monica'] },
          ].map(({ head, links }) => (
            <div key={head}>
              <div style={{
                fontFamily: "'Jost', sans-serif",
                fontSize: '0.6rem', letterSpacing: '0.22em',
                textTransform: 'uppercase', color: 'rgba(255,255,255,0.55)',
                fontWeight: 500, marginBottom: '1rem',
              }}>
                {head}
              </div>
              {links.map(l => (
                <div key={l} style={{ marginBottom: '0.6rem' }}>
                  <a href="#" style={{
                    fontFamily: "'Jost', sans-serif",
                    fontSize: '0.8rem', color: 'rgba(255,255,255,0.35)',
                    fontWeight: 300, transition: 'color 0.2s',
                  }}
                    onMouseEnter={e => e.currentTarget.style.color = 'var(--gold)'}
                    onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.35)'}
                  >
                    {l}
                  </a>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Bottom row */}
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '1.4rem 2rem', flexWrap: 'wrap', gap: '1rem',
      }}>
        <div style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.65rem', fontWeight: 300 }}>
          © {new Date().getFullYear()} McQueen Realty. DRE #01234567. All rights reserved.
        </div>
        <div style={{ display: 'flex', gap: '2rem' }}>
          {['Privacy Policy', 'Terms of Service', 'Do Not Sell My Info'].map(l => (
            <a key={l} href="#" style={{
              fontFamily: "'Jost', sans-serif",
              fontSize: '0.62rem', color: 'rgba(255,255,255,0.25)',
              transition: 'color 0.2s',
            }}
              onMouseEnter={e => e.currentTarget.style.color = 'rgba(255,255,255,0.6)'}
              onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.25)'}
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
  const [scrolled, setScrolled] = useState(false);
  const [overHero, setOverHero] = useState(true);
  const heroRef = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      if (heroRef.current) {
        setOverHero(heroRef.current.getBoundingClientRect().bottom > 80);
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: GLOBAL_CSS }} />

      <Nav scrolled={scrolled} overHero={overHero} />

      {/* ── Hero ── */}
      <section className="hero" ref={heroRef}>
        <img
          className="hero-bg anim-photo"
          src="https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1800&q=85&auto=format&fit=crop"
          alt="McQueen Realty luxury property"
        />
        <div className="hero-overlay anim-fadeIn" />

        <div className="hero-content">
          <p className="hero-eyebrow anim-d1">
            Los Angeles · Beverly Hills · Malibu
          </p>

          <h1 className="hero-headline anim-d2">
            Where Do You<br />Want to Live?
          </h1>

          <p className="hero-sub anim-d3">
            McQueen Realty. Leaders in Southern California luxury properties.
          </p>

          <HeroSearchBar />
        </div>
      </section>

      <StatsStrip />
      <MarketsMarquee />
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
