'use client';
import { useEffect, useRef, useState } from 'react';

const NAV_LINKS = [['Buy','/buy'],['Sell','/sell'],['Rent','/rent'],['Agents','#agents']];

export default function SellPage() {
  const [scrolled, setScrolled] = useState(false);
  const [overHero, setOverHero] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', address: '', message: '' });
  const heroRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 10);
      if (heroRef.current) {
        setOverHero(y < heroRef.current.offsetHeight * 0.85);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navTextColor = overHero ? 'rgba(255,255,255,0.82)' : 'var(--mid)';
  const navLogoColor = overHero ? '#ffffff' : 'var(--black)';

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:ital,wght@0,700;0,800;0,900;1,700;1,800;1,900&family=Jost:wght@300;400;500;600&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        :root {
          --black: #000000; --near-black: #0D0D0D; --white: #FFFFFF;
          --off-white: #F2F2F2; --light-gray: #E8E8E8; --mid: #5C5C5C;
          --faint: #999999; --border: #D8D8D8; --gold: #C4A35A;
          --gold-dark: #A8883E; --gold-light: #D4B57A;
        }
        html { scroll-behavior: smooth; }
        body { background: var(--white); color: var(--black); font-family: 'Jost', sans-serif; -webkit-font-smoothing: antialiased; overflow-x: hidden; }
        a { text-decoration: none; color: inherit; }
        button { cursor: pointer; font-family: 'Jost', sans-serif; }

        @keyframes fadeUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        .anim-d1 { animation: fadeUp 1s cubic-bezier(.16,1,.3,1) 0.3s both; }
        .anim-d2 { animation: fadeUp 1s cubic-bezier(.16,1,.3,1) 0.55s both; }
        .anim-d3 { animation: fadeUp 1s cubic-bezier(.16,1,.3,1) 0.75s both; }
        .anim-fade { animation: fadeIn 1.4s ease both; }

        /* NAV */
        .nav-wrap { position: fixed; top: 0; left: 0; right: 0; z-index: 500; transition: background 0.5s, border-color 0.5s; border-bottom: 1px solid transparent; }
        .nav-wrap.nav-over { background: transparent; }
        .nav-wrap.nav-scrolled { background: rgba(255,255,255,0.97); backdrop-filter: blur(20px); border-bottom-color: var(--border); }
        .nav-inner { display: flex; align-items: stretch; height: 68px; padding: 0 2.5rem; }
        .nav-logo { display: flex; align-items: center; padding-right: 3rem; font-family: 'Jost', sans-serif; font-weight: 600; font-size: 0.76rem; letter-spacing: 0.3em; text-transform: uppercase; transition: color 0.4s; white-space: nowrap; flex-shrink: 0; }
        .nav-logo .sep { color: var(--gold); margin: 0 0.15em; font-weight: 300; }
        .nav-links { display: flex; align-items: stretch; flex: 1; }
        .nav-link { display: flex; align-items: center; padding: 0 1.3rem; font-size: 0.7rem; letter-spacing: 0.1em; text-transform: uppercase; font-weight: 400; transition: color 0.2s; position: relative; white-space: nowrap; }
        .nav-link::after { content: ''; position: absolute; bottom: 0; left: 1.3rem; right: 1.3rem; height: 2px; background: var(--gold); transform: scaleX(0); transition: transform 0.25s ease; }
        .nav-link:hover::after { transform: scaleX(1); }
        .nav-right { display: flex; align-items: center; gap: 1.2rem; margin-left: auto; }
        .nav-cta { display: flex; align-items: center; height: 36px; padding: 0 1.4rem; background: var(--gold); color: var(--white) !important; font-size: 0.67rem; letter-spacing: 0.12em; font-weight: 500; text-transform: uppercase; transition: background 0.2s; flex-shrink: 0; }
        .nav-cta:hover { background: var(--gold-dark); }

        /* HERO */
        .sell-hero { position: relative; width: 100%; height: 100vh; min-height: 700px; overflow: hidden; background: var(--near-black); }
        .sell-hero-bg { position: absolute; inset: 0; background-size: cover; background-position: center 40%; }
        .sell-hero-overlay { position: absolute; inset: 0; background: linear-gradient(135deg, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.35) 60%, rgba(0,0,0,0.65) 100%); }
        .sell-hero-content { position: absolute; inset: 0; display: flex; flex-direction: column; justify-content: center; padding: 0 2.5rem; max-width: 1400px; margin: 0 auto; left: 0; right: 0; }
        .sell-hero-label { font-family: 'Jost', sans-serif; font-size: 0.62rem; letter-spacing: 0.32em; text-transform: uppercase; color: var(--gold); font-weight: 500; margin-bottom: 1.4rem; display: block; }
        .sell-hero-h1 { font-family: 'Barlow Condensed', sans-serif; font-weight: 900; font-size: clamp(4.5rem, 10vw, 12rem); text-transform: uppercase; color: var(--white); line-height: 0.87; letter-spacing: -0.01em; margin-bottom: 2rem; }
        .sell-hero-h1 em { font-style: italic; color: var(--gold-light); }
        .sell-hero-sub { font-family: 'Jost', sans-serif; font-size: 1rem; font-weight: 300; letter-spacing: 0.06em; color: rgba(255,255,255,0.55); max-width: 480px; line-height: 1.7; margin-bottom: 2.5rem; }
        .sell-hero-ctas { display: flex; gap: 1rem; flex-wrap: wrap; }
        .btn-gold { display: inline-flex; align-items: center; gap: 0.7rem; background: var(--gold); color: var(--black); padding: 1rem 2.4rem; font-family: 'Jost', sans-serif; font-size: 0.7rem; letter-spacing: 0.18em; text-transform: uppercase; font-weight: 600; border: none; transition: background 0.2s; cursor: pointer; text-decoration: none; }
        .btn-gold:hover { background: var(--gold-light); }
        .btn-outline-white { display: inline-flex; align-items: center; gap: 0.7rem; background: transparent; color: var(--white); padding: 1rem 2.4rem; font-family: 'Jost', sans-serif; font-size: 0.7rem; letter-spacing: 0.18em; text-transform: uppercase; font-weight: 500; border: 1px solid rgba(255,255,255,0.35); transition: border-color 0.2s, color 0.2s; cursor: pointer; text-decoration: none; }
        .btn-outline-white:hover { border-color: var(--gold); color: var(--gold); }

        /* STATS BAR */
        .stats-bar { background: var(--black); border-bottom: 1px solid rgba(255,255,255,0.06); }
        .stats-inner { max-width: 1400px; margin: 0 auto; display: grid; grid-template-columns: repeat(4, 1fr); }
        .stat-item { padding: 2.8rem 2.5rem; border-right: 1px solid rgba(255,255,255,0.06); }
        .stat-item:last-child { border-right: none; }
        .stat-num { font-family: 'Barlow Condensed', sans-serif; font-weight: 900; font-size: clamp(2.5rem, 4vw, 4rem); line-height: 1; color: var(--white); letter-spacing: -0.02em; }
        .stat-num span { color: var(--gold); }
        .stat-label { font-family: 'Jost', sans-serif; font-size: 0.62rem; letter-spacing: 0.2em; text-transform: uppercase; color: rgba(255,255,255,0.3); font-weight: 400; margin-top: 0.5rem; }

        /* SECTION UTILITIES */
        .sec-label { font-family: 'Jost', sans-serif; font-size: 0.62rem; letter-spacing: 0.28em; text-transform: uppercase; color: var(--gold); font-weight: 500; display: block; margin-bottom: 1rem; }
        .sec-h2 { font-family: 'Barlow Condensed', sans-serif; font-weight: 800; text-transform: uppercase; line-height: 0.9; letter-spacing: -0.01em; }
        .section-inner { max-width: 1400px; margin: 0 auto; }
        .btn-primary { display: inline-flex; align-items: center; gap: 0.7rem; background: var(--black); color: var(--white); padding: 1rem 2.4rem; font-family: 'Jost', sans-serif; font-size: 0.7rem; letter-spacing: 0.18em; text-transform: uppercase; font-weight: 500; border: none; transition: background 0.2s; cursor: pointer; text-decoration: none; }
        .btn-primary:hover { background: var(--gold); }

        /* WHY MCQUEEN */
        .why-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1px; background: var(--border); margin-top: 4rem; }
        .why-card { background: var(--white); padding: 3.5rem; }
        .why-card:hover { background: var(--off-white); }
        .why-num { font-family: 'Barlow Condensed', sans-serif; font-weight: 900; font-size: 4rem; line-height: 1; color: var(--light-gray); margin-bottom: 1.5rem; }
        .why-title { font-family: 'Barlow Condensed', sans-serif; font-weight: 800; font-size: 1.5rem; text-transform: uppercase; color: var(--black); margin-bottom: 1rem; line-height: 1.05; }
        .why-body { font-family: 'Jost', sans-serif; font-size: 0.88rem; line-height: 1.85; color: var(--mid); font-weight: 300; }

        /* PROCESS */
        .process-section { background: var(--near-black); padding: 7rem 2.5rem; }
        .process-steps { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1px; background: rgba(255,255,255,0.07); margin-top: 4rem; }
        .process-step { background: var(--near-black); padding: 3rem 2.5rem; border-top: 2px solid transparent; transition: border-color 0.3s; }
        .process-step:hover { border-top-color: var(--gold); }
        .process-step-num { font-family: 'Barlow Condensed', sans-serif; font-weight: 900; font-size: 3.5rem; color: rgba(255,255,255,0.08); line-height: 1; margin-bottom: 1.8rem; }
        .process-step-icon { width: 40px; height: 2px; background: var(--gold); margin-bottom: 1.5rem; }
        .process-step-title { font-family: 'Barlow Condensed', sans-serif; font-weight: 800; font-size: 1.3rem; text-transform: uppercase; color: var(--white); line-height: 1.05; margin-bottom: 0.8rem; }
        .process-step-body { font-family: 'Jost', sans-serif; font-size: 0.8rem; line-height: 1.75; color: rgba(255,255,255,0.38); font-weight: 300; }

        /* MARKETING / DIFFERENTIATOR */
        .marketing-grid { display: grid; grid-template-columns: 1fr 1fr; min-height: 560px; }
        .marketing-img { position: relative; overflow: hidden; }
        .marketing-img-inner { width: 100%; height: 100%; background-size: cover; background-position: center; transition: transform 0.8s cubic-bezier(.16,1,.3,1); }
        .marketing-img:hover .marketing-img-inner { transform: scale(1.04); }
        .marketing-content { display: flex; flex-direction: column; justify-content: center; padding: 5rem 4.5rem; background: var(--off-white); border-left: 1px solid var(--border); }
        .marketing-features { list-style: none; margin: 2rem 0 2.5rem; }
        .marketing-features li { font-family: 'Jost', sans-serif; font-size: 0.85rem; color: var(--mid); font-weight: 300; padding: 0.75rem 0; border-bottom: 1px solid var(--border); display: flex; align-items: center; gap: 0.8rem; }
        .marketing-features li::before { content: ''; width: 18px; height: 1px; background: var(--gold); flex-shrink: 0; }

        /* TESTIMONIALS */
        .testimonials-section { background: var(--black); padding: 7rem 2.5rem; }
        .testimonials-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2px; margin-top: 4rem; }
        .testimonial-card { background: rgba(255,255,255,0.03); padding: 3rem; border-top: 1px solid rgba(255,255,255,0.06); transition: background 0.3s; }
        .testimonial-card:hover { background: rgba(255,255,255,0.06); }
        .testimonial-stars { display: flex; gap: 3px; margin-bottom: 1.5rem; }
        .testimonial-star { width: 10px; height: 10px; background: var(--gold); clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%); }
        .testimonial-quote { font-family: 'Jost', sans-serif; font-size: 0.88rem; line-height: 1.85; color: rgba(255,255,255,0.55); font-weight: 300; font-style: italic; margin-bottom: 2rem; }
        .testimonial-author { font-family: 'Jost', sans-serif; font-size: 0.65rem; letter-spacing: 0.16em; text-transform: uppercase; color: rgba(255,255,255,0.28); }
        .testimonial-location { font-family: 'Jost', sans-serif; font-size: 0.6rem; color: var(--gold); letter-spacing: 0.1em; text-transform: uppercase; margin-top: 0.2rem; }

        /* VALUATION CTA BANNER */
        .valuation-banner { background: var(--gold); padding: 5rem 2.5rem; text-align: center; }
        .valuation-banner h2 { font-family: 'Barlow Condensed', sans-serif; font-weight: 900; font-size: clamp(2.5rem, 5vw, 5.5rem); text-transform: uppercase; color: var(--black); line-height: 0.9; margin-bottom: 1.5rem; }
        .valuation-banner p { font-family: 'Jost', sans-serif; font-size: 0.9rem; font-weight: 300; color: rgba(0,0,0,0.55); margin-bottom: 2.5rem; letter-spacing: 0.04em; }
        .btn-black { display: inline-flex; align-items: center; gap: 0.7rem; background: var(--black); color: var(--white); padding: 1rem 2.8rem; font-family: 'Jost', sans-serif; font-size: 0.7rem; letter-spacing: 0.18em; text-transform: uppercase; font-weight: 500; border: none; transition: background 0.2s; cursor: pointer; text-decoration: none; }
        .btn-black:hover { background: var(--near-black); }

        /* CONTACT FORM */
        .sell-contact { display: grid; grid-template-columns: 1fr 1fr; border-bottom: 1px solid var(--border); }
        .sell-contact-left { background: var(--near-black); padding: 6rem 4rem; display: flex; flex-direction: column; justify-content: center; }
        .sell-contact-right { padding: 6rem 4rem; background: var(--off-white); }
        .field-wrap { border-bottom: 1px solid var(--border); padding: 1.1rem 0; }
        .field-label { display: block; font-size: 0.56rem; letter-spacing: 0.22em; text-transform: uppercase; color: var(--faint); margin-bottom: 0.35rem; }
        .field-input, .field-textarea { width: 100%; background: transparent; border: none; outline: none; font-family: 'Jost', sans-serif; font-size: 0.95rem; color: var(--black); }
        .field-textarea { resize: none; }

        /* FOOTER */
        footer { background: var(--black); }
        .footer-top { display: flex; justify-content: space-between; align-items: flex-start; padding: 4rem 2.5rem 3rem; border-bottom: 1px solid rgba(255,255,255,0.06); gap: 2rem; flex-wrap: wrap; }
        .footer-bottom { display: flex; justify-content: space-between; align-items: center; padding: 1.4rem 2.5rem; flex-wrap: wrap; gap: 1rem; }

        @media (max-width: 900px) {
          .stats-inner { grid-template-columns: repeat(2,1fr); }
          .why-grid { grid-template-columns: 1fr; }
          .process-steps { grid-template-columns: repeat(2,1fr); }
          .testimonials-grid { grid-template-columns: 1fr; }
          .marketing-grid { grid-template-columns: 1fr; }
          .sell-contact { grid-template-columns: 1fr; }
        }
      `}</style>

      {/* ── NAV ── */}
      <nav className={`nav-wrap ${overHero ? 'nav-over' : 'nav-scrolled'}`}>
        <div className="nav-inner">
          <a href="/" className="nav-logo" style={{ color: navLogoColor }}>
            McQueen<span className="sep">·</span>Realty
          </a>
          <div className="nav-links">
            {NAV_LINKS.map(([label, href]) => (
              <a key={label} href={href} className="nav-link" style={{ color: navTextColor }}>{label}</a>
            ))}
          </div>
          <div className="nav-right">
            <a href="/new-listings" className="nav-link" style={{ color: navTextColor, padding: '0 0.8rem' }}>New Listings</a>
            <a href="/search" className="nav-link" style={{ color: navTextColor, padding: '0 0.8rem' }}>Exclusives</a>
            <a href="#sell-contact" className="nav-cta">Free Valuation</a>
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="sell-hero" ref={heroRef}>
        <div className="sell-hero-bg anim-fade" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1613977257592-4871e5fcd7c4?w=1800&q=80')" }} />
        <div className="sell-hero-overlay" />
        <div className="sell-hero-content">
          <span className="sell-hero-label anim-d1">Seller Advisory · McQueen Realty</span>
          <h1 className="sell-hero-h1 anim-d1">
            Sell <em>Smarter.</em><br/>Sell Higher.
          </h1>
          <p className="sell-hero-sub anim-d2">
            Southern California's premier luxury brokerage. We combine market intelligence, editorial marketing, and a global buyer network to achieve results others simply can't.
          </p>
          <div className="sell-hero-ctas anim-d3">
            <a href="#sell-contact" className="btn-gold">
              Get a Free Home Valuation
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
              </svg>
            </a>
            <a href="#process" className="btn-outline-white">See Our Process</a>
          </div>
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <div className="stats-bar">
        <div className="stats-inner">
          {[
            { num: '$2B', suffix: '+', label: 'Total Sales Volume' },
            { num: '500', suffix: '+', label: 'Homes Sold' },
            { num: '98', suffix: '%', label: 'Client Satisfaction' },
            { num: '21', suffix: ' Days', label: 'Average Days to Close' },
          ].map(s => (
            <div key={s.label} className="stat-item">
              <div className="stat-num">{s.num}<span>{s.suffix}</span></div>
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── WHY MCQUEEN ── */}
      <section style={{ padding: '7rem 2.5rem', borderBottom: '1px solid var(--border)' }}>
        <div className="section-inner">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <span className="sec-label">The McQueen Difference</span>
              <h2 className="sec-h2" style={{ fontSize: 'clamp(2.8rem, 5vw, 5.5rem)' }}>What Sets<br/>Us Apart</h2>
            </div>
            <a href="#sell-contact" className="btn-primary" style={{ alignSelf: 'flex-end' }}>
              Start a Conversation
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
              </svg>
            </a>
          </div>
          <div className="why-grid">
            {[
              {
                n: '01',
                title: 'Strategic Pricing & Market Analysis',
                body: 'We leverage real-time CRMLS data and deep hyper-local expertise to price your home precisely — attracting maximum qualified buyers and competitive offers from day one.'
              },
              {
                n: '02',
                title: 'Editorial-Grade Marketing',
                body: 'Your home is presented as a luxury editorial. Professional photography, cinematic video tours, custom property websites, and targeted digital campaigns that reach qualified buyers globally.'
              },
              {
                n: '03',
                title: 'Global Buyer Network',
                body: 'Our network spans domestic and international buyers with the means to move. We pre-market your property to qualified prospects before it hits public portals — often generating offers before launch.'
              },
              {
                n: '04',
                title: 'Concierge-Level Service',
                body: 'From initial consultation through closing, you have a dedicated advisor managing every detail — staging, inspections, negotiations, and escrow — so you can focus on what\'s next.'
              },
            ].map(c => (
              <div key={c.n} className="why-card">
                <div className="why-num">{c.n}</div>
                <h3 className="why-title">{c.title}</h3>
                <p className="why-body">{c.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section id="process" className="process-section">
        <div className="section-inner">
          <span className="sec-label" style={{ color: 'var(--gold)' }}>How It Works</span>
          <h2 className="sec-h2" style={{ fontSize: 'clamp(2.8rem, 5vw, 5.5rem)', color: 'var(--white)' }}>Our Proven<br/>Process</h2>
          <div className="process-steps">
            {[
              {
                n: '01',
                title: 'Consultation & Valuation',
                body: 'We visit your property, assess its unique value, and deliver a comprehensive market analysis with a strategic pricing recommendation.'
              },
              {
                n: '02',
                title: 'Prepare & Stage',
                body: 'Our design partners prepare your home to photograph and show at its absolute best — from decluttering and repairs to full luxury staging when appropriate.'
              },
              {
                n: '03',
                title: 'Launch & Market',
                body: 'A coordinated launch across MLS, social, digital advertising, our broker network, and direct buyer outreach ensures maximum exposure on day one.'
              },
              {
                n: '04',
                title: 'Negotiate & Close',
                body: 'We negotiate fiercely on your behalf, manage due diligence, and guide you through a smooth escrow to the best possible outcome.'
              },
            ].map(s => (
              <div key={s.n} className="process-step">
                <div className="process-step-num">{s.n}</div>
                <div className="process-step-icon" />
                <h3 className="process-step-title">{s.title}</h3>
                <p className="process-step-body">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MARKETING SECTION ── */}
      <section style={{ borderBottom: '1px solid var(--border)' }}>
        <div className="marketing-grid">
          <div className="marketing-img">
            <div className="marketing-img-inner" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80')", height: '100%', minHeight: 560 }} />
          </div>
          <div className="marketing-content">
            <span className="sec-label">Premium Exposure</span>
            <h2 className="sec-h2" style={{ fontSize: 'clamp(2.4rem, 4vw, 4rem)', marginBottom: '0.5rem' }}>Marketing That<br/>Moves Homes</h2>
            <p style={{ fontFamily: "'Jost',sans-serif", fontSize: '0.88rem', color: 'var(--mid)', fontWeight: 300, lineHeight: 1.8, marginTop: '1rem' }}>
              We don't just list your home — we launch it. Every property receives a bespoke marketing campaign built for maximum impact.
            </p>
            <ul className="marketing-features">
              {[
                'Professional photography & cinematic video tours',
                'Custom single-property website & virtual walkthrough',
                'Featured placement on Zillow, Realtor.com & Redfin',
                'Targeted social media & digital advertising campaigns',
                'Direct outreach to our qualified buyer database',
                'Broker network previews & exclusive pre-market exposure',
              ].map(f => <li key={f}>{f}</li>)}
            </ul>
            <a href="#sell-contact" className="btn-primary">
              Get Started
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="testimonials-section">
        <div className="section-inner">
          <span className="sec-label">Client Stories</span>
          <h2 className="sec-h2" style={{ fontSize: 'clamp(2.8rem, 5vw, 5rem)', color: 'var(--white)' }}>What Our<br/>Clients Say</h2>
          <div className="testimonials-grid">
            {[
              {
                quote: "McQueen delivered multiple offers above asking within the first weekend. Their marketing was on another level — our home looked like something out of Architectural Digest.",
                author: 'J. & M. Harrison',
                location: 'Sold in Bel Air · $14.2M',
              },
              {
                quote: "From the moment we met our agent, we knew we were in expert hands. They navigated a complex negotiation flawlessly and got us well above our target. We couldn't be happier.",
                author: 'T. Weston',
                location: 'Sold in Hidden Hills · $9.8M',
              },
              {
                quote: "The concierge experience was unlike anything we'd seen before. They managed everything — staging, inspections, the entire process — so we could focus on our next chapter.",
                author: 'L. & R. Montoya',
                location: 'Sold in Malibu · $7.5M',
              },
            ].map(t => (
              <div key={t.author} className="testimonial-card">
                <div className="testimonial-stars">
                  {[...Array(5)].map((_, i) => <div key={i} className="testimonial-star" />)}
                </div>
                <p className="testimonial-quote">"{t.quote}"</p>
                <div className="testimonial-author">{t.author}</div>
                <div className="testimonial-location">{t.location}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── VALUATION CTA BANNER ── */}
      <div className="valuation-banner">
        <h2>What's Your<br/>Home Worth?</h2>
        <p>Get a free, no-obligation market analysis from Southern California's luxury specialists.</p>
        <a href="#sell-contact" className="btn-black">
          Request a Free Valuation
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
          </svg>
        </a>
      </div>

      {/* ── CONTACT FORM ── */}
      <section id="sell-contact" className="sell-contact">
        <div className="sell-contact-left">
          <span className="sec-label">Let's Talk</span>
          <h2 className="sec-h2" style={{ fontSize: 'clamp(2.8rem, 4vw, 4.5rem)', color: 'var(--white)', marginBottom: '2rem' }}>Ready to<br/>Sell Your<br/>Home?</h2>
          <p style={{ fontFamily: "'Jost',sans-serif", fontSize: '0.88rem', lineHeight: 1.8, color: 'rgba(255,255,255,0.38)', fontWeight: 300, maxWidth: 340, marginBottom: '3rem' }}>
            Reach out today for a confidential consultation and complimentary market analysis. Our team responds within 24 hours.
          </p>
          {[['Phone','818.591.1600'],['Email','info@mcqueenrealty.com'],['Office','28047 Dorothy Dr Unit 303, Agoura Hills CA 91301']].map(([l,v]) => (
            <div key={l} style={{ marginBottom: '1.2rem' }}>
              <div style={{ fontFamily: "'Jost',sans-serif", fontSize: '0.56rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.22)', marginBottom: '0.2rem' }}>{l}</div>
              <div style={{ fontFamily: "'Jost',sans-serif", fontSize: '0.88rem', color: 'rgba(255,255,255,0.65)', fontWeight: 300 }}>{v}</div>
            </div>
          ))}
        </div>
        <div className="sell-contact-right">
          <div style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'center' }}>
            <h3 style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 800, fontSize: '1.6rem', textTransform: 'uppercase', color: 'var(--black)', marginBottom: '2rem', letterSpacing: '0.02em' }}>Get Your Free Home Valuation</h3>
            {[['Your Name','text','name'],['Email Address','email','email'],['Phone Number','tel','phone'],['Property Address','text','address']].map(([label, type, name]) => (
              <div key={name} className="field-wrap">
                <label className="field-label">{label}</label>
                <input
                  className="field-input"
                  type={type}
                  name={name}
                  value={formData[name]}
                  onChange={e => setFormData(p => ({ ...p, [name]: e.target.value }))}
                />
              </div>
            ))}
            <div className="field-wrap" style={{ marginBottom: '2.5rem' }}>
              <label className="field-label">Tell Us About Your Property</label>
              <textarea
                className="field-textarea"
                name="message"
                rows={3}
                placeholder="Bedrooms, bathrooms, special features, timeline..."
                value={formData.message}
                onChange={e => setFormData(p => ({ ...p, message: e.target.value }))}
              />
            </div>
            <button className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
              Request My Free Valuation
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
              </svg>
            </button>
            <p style={{ fontFamily: "'Jost',sans-serif", fontSize: '0.62rem', color: 'var(--faint)', marginTop: '1rem', textAlign: 'center', letterSpacing: '0.04em' }}>
              No obligation. 100% confidential. We respond within 24 hours.
            </p>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer>
        <div className="footer-top">
          <div>
            <div style={{ fontFamily: "'Jost',sans-serif", fontWeight: 600, fontSize: '0.82rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--white)', marginBottom: '0.6rem' }}>
              McQueen<span style={{ color: 'var(--gold)' }}>·</span>Realty
            </div>
            <div style={{ fontFamily: "'Jost',sans-serif", fontSize: '0.75rem', color: 'rgba(255,255,255,0.25)', fontWeight: 300 }}>28047 Dorothy Dr Unit 303, Agoura Hills CA 91301</div>
          </div>
          <div style={{ display: 'flex', gap: '4rem' }}>
            {[
              ['Properties', [['Buy','/buy'],['Sell','/sell'],['Rent','/rent'],['Exclusives','/search']]],
              ['Company', [['About Us','/#about'],['Agents','/#agents'],['Services','/#services']]],
              ['Markets', [['Los Angeles County','#'],['San Fernando Valley','#'],['Ventura County','#']]],
            ].map(([heading, links]) => (
              <div key={heading}>
                <div style={{ fontFamily: "'Jost',sans-serif", fontSize: '0.58rem', letterSpacing: '0.24em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', fontWeight: 500, marginBottom: '1rem' }}>{heading}</div>
                {links.map(([label, href]) => (
                  <div key={label} style={{ marginBottom: '0.6rem' }}>
                    <a href={href} style={{ fontFamily: "'Jost',sans-serif", fontSize: '0.8rem', color: 'rgba(255,255,255,0.28)', fontWeight: 300 }}>{label}</a>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className="footer-bottom">
          <div style={{ fontFamily: "'Jost',sans-serif", fontSize: '0.62rem', color: 'rgba(255,255,255,0.2)', fontWeight: 300 }}>© 2026 McQueen Realty. DRE Licensed · Equal Housing Opportunity. All rights reserved.</div>
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
