'use client';
import { useEffect, useState } from 'react';

const NAV_LINKS = [['Buy','/buy'],['Sell','/sell'],['Rent','/rent'],['Agents','#agents']];

export default function SellPage() {
  const [scrolled, setScrolled] = useState(false);
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', phone: '', address: '', timeline: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSubmit = () => {
    if (!form.firstName || !form.email) return;
    setSubmitted(true);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:ital,wght@0,700;0,800;0,900;1,700;1,800;1,900&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&family=Jost:wght@300;400;500;600&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        :root {
          --black: #000000; --near-black: #0D0D0D; --white: #FFFFFF;
          --off-white: #F7F7F5; --light-gray: #E8E8E8; --mid: #5C5C5C;
          --faint: #999999; --border: #E0E0E0; --gold: #C4A35A; --gold-dark: #A8883E;
        }
        html { scroll-behavior: smooth; }
        body { background: var(--white); color: var(--black); font-family: 'Jost', sans-serif; -webkit-font-smoothing: antialiased; overflow-x: hidden; }
        a { text-decoration: none; color: inherit; }
        button { cursor: pointer; font-family: 'Jost', sans-serif; }

        .nav-wrap { position: fixed; top: 0; left: 0; right: 0; z-index: 500; transition: background 0.4s, border-color 0.4s; border-bottom: 1px solid transparent; }
        .nav-wrap.nav-dark { background: transparent; }
        .nav-wrap.nav-light { background: rgba(255,255,255,0.97); backdrop-filter: blur(20px); border-bottom-color: var(--border); }
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

        .field-wrap { border-bottom: 1px solid var(--border); padding: 1.1rem 0; }
        .field-label { display: block; font-size: 0.56rem; letter-spacing: 0.22em; text-transform: uppercase; color: var(--faint); margin-bottom: 0.4rem; }
        .field-input, .field-textarea, .field-select { width: 100%; background: transparent; border: none; outline: none; font-family: 'Jost', sans-serif; font-size: 0.9rem; color: var(--black); font-weight: 300; }
        .field-select { appearance: none; cursor: pointer; color: var(--mid); }
        .field-textarea { resize: none; }
        .field-row { display: grid; grid-template-columns: 1fr 1fr; gap: 0 2.5rem; }

        footer { background: var(--black); }
        .footer-top { display: flex; justify-content: space-between; align-items: flex-start; padding: 4rem 2.5rem 3rem; border-bottom: 1px solid rgba(255,255,255,0.06); gap: 2rem; flex-wrap: wrap; }
        .footer-bottom { display: flex; justify-content: space-between; align-items: center; padding: 1.4rem 2.5rem; flex-wrap: wrap; gap: 1rem; }
      `}</style>

      {/* ── NAV ── */}
      <nav className={`nav-wrap ${scrolled ? 'nav-light' : 'nav-dark'}`}>
        <div className="nav-inner">
          <a href="/" className="nav-logo" style={{ color: scrolled ? 'var(--black)' : '#fff' }}>
            McQueen<span className="sep">·</span>Realty
          </a>
          <div className="nav-links">
            {NAV_LINKS.map(([label, href]) => (
              <a key={label} href={href} className="nav-link"
                style={{ color: scrolled ? 'var(--mid)' : 'rgba(255,255,255,0.72)' }}>{label}</a>
            ))}
          </div>
          <div className="nav-right">
            <a href="/new-listings" className="nav-link"
              style={{ color: scrolled ? 'var(--mid)' : 'rgba(255,255,255,0.72)', padding: '0 0.8rem' }}>New Listings</a>
            <a href="/search" className="nav-link"
              style={{ color: scrolled ? 'var(--mid)' : 'rgba(255,255,255,0.72)', padding: '0 0.8rem' }}>Exclusives</a>
            <a href="#connect" className="nav-cta">Free Valuation</a>
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <div style={{ width: '100%', height: '88vh', minHeight: 640, overflow: 'hidden', position: 'relative', background: '#000' }}>
        <img
          src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1800&q=85"
          alt="Luxury property"
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 50%', display: 'block', opacity: 0.82 }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0) 30%, rgba(0,0,0,0.72) 100%)' }} />
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '0 2.5rem 5rem', maxWidth: 1400, margin: '0 auto' }}>
          <div style={{ maxWidth: 1400 }}>
            <span style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.62rem', letterSpacing: '0.28em', textTransform: 'uppercase', color: 'var(--gold)', fontWeight: 500, display: 'block', marginBottom: '1rem' }}>Seller Advisory · McQueen Realty</span>
            <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontStyle: 'italic', fontSize: 'clamp(4rem, 7vw, 8.5rem)', textTransform: 'none', color: 'var(--white)', lineHeight: 1.0, letterSpacing: '-0.01em', marginBottom: '2rem' }}>Selling Your<br/>Home With<br/>McQueen</h1>
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '2rem' }}>
              <p style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.95rem', lineHeight: 1.85, color: 'rgba(255,255,255,0.6)', fontWeight: 300, maxWidth: 480 }}>Powered by market intelligence and deep local expertise, McQueen Realty puts the full weight of our team behind every listing — boutique service, editorial marketing, results that speak for themselves.</p>
              <a href="#connect" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.8rem', background: 'var(--gold)', color: 'var(--white)', padding: '1rem 2.2rem', fontFamily: "'Jost', sans-serif", fontSize: '0.68rem', letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 500, whiteSpace: 'nowrap', flexShrink: 0 }}
                onMouseOver={e => e.currentTarget.style.background = 'var(--gold-dark)'}
                onMouseOut={e => e.currentTarget.style.background = 'var(--gold)'}>
                Discover Your Home's Value
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ── VALUE PROPS ── */}
      <section style={{ padding: '7rem 2.5rem', background: 'var(--off-white)', borderBottom: '1px solid var(--border)' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto' }}>
          <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontStyle: 'italic', fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', textTransform: 'uppercase', color: 'var(--mid)', letterSpacing: '0.02em', marginBottom: '5rem', maxWidth: 700 }}>After all, more of the same is never an option.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '4rem', borderTop: '1px solid var(--border)', paddingTop: '4rem' }}>
            {[
              { title: 'Market Precision', body: 'We leverage real-time CRMLS data and hyper-local expertise to price your home exactly where it needs to be — maximum demand, maximum outcome.' },
              { title: 'Editorial Reach', body: 'Every listing is a campaign. Cinematic photography, targeted digital advertising, and broker network outreach that reaches qualified buyers before day one.' },
              { title: 'Concierge Standard', body: 'Luxury is not a price point — it\'s an experience. From first consultation to final close, you have a dedicated advisor managing every detail on your behalf.' },
            ].map((p) => (
              <div key={p.title}>
                <div style={{ width: 28, height: 2, background: 'var(--gold)', marginBottom: '1.8rem' }} />
                <h3 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: '1.5rem', textTransform: 'uppercase', color: 'var(--black)', marginBottom: '1rem', letterSpacing: '0.02em' }}>{p.title}</h3>
                <p style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.88rem', lineHeight: 1.85, color: 'var(--mid)', fontWeight: 300 }}>{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONNECT FORM ── */}
      <section id="connect" style={{ padding: '7rem 2.5rem', borderBottom: '1px solid var(--border)' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <span style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.62rem', letterSpacing: '0.28em', textTransform: 'uppercase', color: 'var(--gold)', fontWeight: 500, display: 'block', marginBottom: '1rem' }}>Get Started</span>
            <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 'clamp(2.8rem, 5vw, 5rem)', textTransform: 'uppercase', color: 'var(--black)', lineHeight: 0.9, marginBottom: '1.2rem' }}>Connect With an Expert</h2>
            <p style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.9rem', color: 'var(--mid)', fontWeight: 300, lineHeight: 1.8 }}>We'll match you with an advisor who understands the nuances of your market. Expect a response within 24 hours.</p>
          </div>

          {submitted ? (
            <div style={{ textAlign: 'center', padding: '4rem 0' }}>
              <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: '3.5rem', textTransform: 'uppercase', color: 'var(--black)', lineHeight: 0.9, marginBottom: '1.2rem' }}>Thank You</div>
              <p style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.9rem', color: 'var(--mid)', fontWeight: 300 }}>A member of our team will reach out within 24 hours.</p>
            </div>
          ) : (
            <div>
              <div className="field-row">
                <div className="field-wrap">
                  <label className="field-label">First Name</label>
                  <input className="field-input" value={form.firstName} onChange={e => setForm({...form, firstName: e.target.value})} />
                </div>
                <div className="field-wrap">
                  <label className="field-label">Last Name</label>
                  <input className="field-input" value={form.lastName} onChange={e => setForm({...form, lastName: e.target.value})} />
                </div>
              </div>
              <div className="field-row">
                <div className="field-wrap">
                  <label className="field-label">Email</label>
                  <input className="field-input" type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
                </div>
                <div className="field-wrap">
                  <label className="field-label">Phone Number</label>
                  <input className="field-input" type="tel" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} />
                </div>
              </div>
              <div className="field-wrap">
                <label className="field-label">Property Address</label>
                <input className="field-input" value={form.address} onChange={e => setForm({...form, address: e.target.value})} />
              </div>
              <div className="field-wrap">
                <label className="field-label">Selling Timeline</label>
                <select className="field-select" value={form.timeline} onChange={e => setForm({...form, timeline: e.target.value})}>
                  <option value="">Select a timeframe</option>
                  <option>As soon as possible</option>
                  <option>Within 3 months</option>
                  <option>3 – 6 months</option>
                  <option>6 – 12 months</option>
                  <option>Just exploring</option>
                </select>
              </div>
              <div className="field-wrap" style={{ marginBottom: '2.5rem' }}>
                <label className="field-label">Message</label>
                <textarea className="field-textarea" rows={4} value={form.message} onChange={e => setForm({...form, message: e.target.value})} />
              </div>
              <div style={{ textAlign: 'center' }}>
                <button onClick={handleSubmit}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '0.7rem', background: 'var(--black)', color: 'var(--white)', padding: '1rem 3rem', fontFamily: "'Jost', sans-serif", fontSize: '0.7rem', letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 500, border: 'none', cursor: 'pointer', transition: 'background 0.2s' }}
                  onMouseOver={e => e.currentTarget.style.background = 'var(--gold)'}
                  onMouseOut={e => e.currentTarget.style.background = 'var(--black)'}>
                  Let's Connect
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                  </svg>
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer>
        <div className="footer-top">
          <div>
            <div style={{ fontFamily: "'Jost',sans-serif", fontWeight: 600, fontSize: '0.82rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--white)', marginBottom: '0.6rem' }}>McQueen<span style={{ color: 'var(--gold)' }}>·</span>Realty</div>
            <div style={{ fontFamily: "'Jost',sans-serif", fontSize: '0.75rem', color: 'rgba(255,255,255,0.25)', fontWeight: 300 }}>28047 Dorothy Dr Unit 303, Agoura Hills CA 91301</div>
          </div>
          <div style={{ display: 'flex', gap: '4rem' }}>
            {[
              ['Properties', [['Buy','/buy'],['Sell','/sell'],['Rent','/rent'],['New Listings','/new-listings'],['Exclusives','/search']]],
              ['Company', [['About Us','/#about'],['Agents','/#agents'],['Services','/#services'],['Contact','/#contact']]],
              ['Markets', [['Los Angeles County','/search?src=https%3A%2F%2Fapexidx.com%2Fidx_lite%2Fresults%2FEN_LA%2FlastModified_orderBy%2Fdesc_order%2Factive%2Cshort-sales%2Cforeclosures_homeStatus'],['San Fernando Valley','/search?src=https%3A%2F%2Fapexidx.com%2Fidx_lite%2Fresults%2FEN_LA%2FlastModified_orderBy%2Fdesc_order%2F91301_autosearch'],['Ventura','/search?src=https%3A%2F%2Fapexidx.com%2Fidx_lite%2Fresults%2FEN_LA%2FlastModified_orderBy%2Fdesc_order%2F93001_autosearch']]],
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
