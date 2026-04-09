'use client';
import { useEffect, useState } from 'react';

const NAV_LINKS = [['Buy','/buy'],['Sell','/sell'],['Rent','/rent'],['Agents','#agents']];

export default function SellPage() {
  const [scrolled, setScrolled] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', address: '', timeline: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSubmit = () => {
    if (!form.name || !form.email) return;
    setSubmitted(true);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:ital,wght@0,700;0,800;0,900;1,700;1,800;1,900&family=Jost:wght@300;400;500;600&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        :root {
          --black: #000000; --near-black: #0D0D0D; --white: #FFFFFF;
          --off-white: #F2F2F2; --light-gray: #E8E8E8; --mid: #5C5C5C;
          --faint: #999999; --border: #D8D8D8; --gold: #C4A35A; --gold-dark: #A8883E;
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
        .field-label { display: block; font-size: 0.56rem; letter-spacing: 0.22em; text-transform: uppercase; color: var(--faint); margin-bottom: 0.35rem; }
        .field-input, .field-textarea, .field-select { width: 100%; background: transparent; border: none; outline: none; font-family: 'Jost', sans-serif; font-size: 0.92rem; color: var(--black); }
        .field-select { appearance: none; cursor: pointer; }
        .field-textarea { resize: none; }

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
            <a href="#valuation" className="nav-cta">Free Valuation</a>
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <div style={{ position: 'relative', height: '100vh', minHeight: 700, overflow: 'hidden', background: '#000' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: "url('https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1800&q=80')", backgroundSize: 'cover', backgroundPosition: 'center 40%', opacity: 0.55 }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.65) 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '0 2.5rem 6rem' }}>
          <div style={{ maxWidth: 1400, margin: '0 auto', width: '100%' }}>
            <span style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.62rem', letterSpacing: '0.28em', textTransform: 'uppercase', color: 'var(--gold)', fontWeight: 500, display: 'block', marginBottom: '1.2rem' }}>Seller Advisory</span>
            <h1 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 'clamp(4rem, 9vw, 10rem)', textTransform: 'uppercase', color: 'var(--white)', lineHeight: 0.88, letterSpacing: '-0.01em', marginBottom: '2rem' }}>Sell With<br/>Intention.</h1>
            <p style={{ fontFamily: "'Jost', sans-serif", fontSize: '1rem', fontWeight: 300, letterSpacing: '0.04em', color: 'rgba(255,255,255,0.6)', maxWidth: 480, lineHeight: 1.8, marginBottom: '3rem' }}>McQueen Realty combines market intelligence, editorial marketing, and a global buyer network to achieve results others simply can't.</p>
            <a href="#valuation" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.8rem', background: 'var(--gold)', color: 'var(--white)', padding: '1rem 2.4rem', fontFamily: "'Jost', sans-serif", fontSize: '0.7rem', letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 500, transition: 'background 0.2s' }}
              onMouseOver={e => e.currentTarget.style.background='var(--gold-dark)'}
              onMouseOut={e => e.currentTarget.style.background='var(--gold)'}>
              Get a Free Valuation
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </a>
          </div>
        </div>
      </div>

      {/* ── INTRO ── */}
      <section style={{ padding: '8rem 2.5rem', borderBottom: '1px solid var(--border)' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8rem', alignItems: 'center' }}>
          <div>
            <span style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.62rem', letterSpacing: '0.28em', textTransform: 'uppercase', color: 'var(--gold)', fontWeight: 500, display: 'block', marginBottom: '1.2rem' }}>The McQueen Difference</span>
            <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 'clamp(3rem, 5vw, 5.5rem)', textTransform: 'uppercase', lineHeight: 0.9, letterSpacing: '-0.01em', marginBottom: '2.5rem' }}>Your Home<br/>Deserves<br/>More.</h2>
            <p style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.95rem', lineHeight: 1.9, color: 'var(--mid)', fontWeight: 300, marginBottom: '1.4rem' }}>We don't simply list properties — we position them. Every home we represent receives a custom strategy built around its unique story, architecture, and ideal buyer.</p>
            <p style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.95rem', lineHeight: 1.9, color: 'var(--mid)', fontWeight: 300 }}>Since 2008, McQueen Realty has represented some of Southern California's most distinctive properties, consistently achieving results that exceed expectations.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1px', background: 'var(--border)' }}>
            {[
              { label: 'Total Sales Volume', value: '$2B+' },
              { label: 'Homes Represented', value: '500+' },
              { label: 'Avg. Days to Close', value: '21' },
              { label: 'Years in Market', value: '17' },
            ].map(s => (
              <div key={s.label} style={{ background: 'var(--white)', padding: '2.5rem 2rem' }}>
                <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: '3.2rem', lineHeight: 1, color: 'var(--black)', marginBottom: '0.5rem' }}>{s.value}</div>
                <div style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.65rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--faint)', fontWeight: 400 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── THREE PILLARS ── */}
      <section style={{ background: 'var(--near-black)', padding: '8rem 2.5rem', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto' }}>
          <div style={{ marginBottom: '5rem' }}>
            <span style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.62rem', letterSpacing: '0.28em', textTransform: 'uppercase', color: 'var(--gold)', fontWeight: 500, display: 'block', marginBottom: '1rem' }}>Our Approach</span>
            <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 'clamp(3rem, 5vw, 5.5rem)', textTransform: 'uppercase', color: 'var(--white)', lineHeight: 0.9, letterSpacing: '-0.01em' }}>How We Work</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1px', background: 'rgba(255,255,255,0.06)' }}>
            {[
              { n: '01', title: 'Market Intelligence', body: 'We leverage real-time CRMLS data and deep hyper-local expertise to price your home with precision — attracting qualified buyers and competitive offers from day one.' },
              { n: '02', title: 'Editorial Marketing', body: 'Your home is presented as a luxury editorial. Cinematic photography, video tours, custom property websites, and targeted campaigns that reach the right buyers globally.' },
              { n: '03', title: 'Global Network', body: 'Our network spans domestic and international buyers with the means to move. We pre-market your property to qualified prospects before it ever hits public portals.' },
            ].map(s => (
              <div key={s.n} style={{ background: 'var(--near-black)', padding: '3.5rem 3rem' }}>
                <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: '5rem', lineHeight: 1, color: 'rgba(255,255,255,0.06)', marginBottom: '2rem' }}>{s.n}</div>
                <h3 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: '1.6rem', textTransform: 'uppercase', color: 'var(--white)', marginBottom: '1.2rem', lineHeight: 1.05 }}>{s.title}</h3>
                <p style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.88rem', lineHeight: 1.85, color: 'rgba(255,255,255,0.4)', fontWeight: 300 }}>{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section style={{ padding: '8rem 2.5rem', borderBottom: '1px solid var(--border)' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '8rem', alignItems: 'start' }}>
            <div style={{ position: 'sticky', top: '6rem' }}>
              <span style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.62rem', letterSpacing: '0.28em', textTransform: 'uppercase', color: 'var(--gold)', fontWeight: 500, display: 'block', marginBottom: '1rem' }}>How It Works</span>
              <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 'clamp(2.5rem, 4vw, 4.5rem)', textTransform: 'uppercase', lineHeight: 0.9, letterSpacing: '-0.01em', marginBottom: '2rem' }}>Our Proven<br/>Process</h2>
              <a href="#valuation" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem', fontFamily: "'Jost', sans-serif", fontSize: '0.68rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--gold)', borderBottom: '1px solid var(--gold)', paddingBottom: '2px', fontWeight: 500 }}>
                Begin the Conversation
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
              </a>
            </div>
            <div>
              {[
                { n: '01', title: 'Consultation & Valuation', body: 'We visit your property, assess its unique value, and deliver a comprehensive market analysis with a precise pricing recommendation — no obligation.' },
                { n: '02', title: 'Prepare & Position', body: 'Our design partners prepare your home to photograph and show at its absolute best. From targeted improvements to full luxury staging when appropriate.' },
                { n: '03', title: 'Launch & Expose', body: 'A coordinated launch across MLS, digital platforms, our broker network, and direct buyer outreach ensures maximum exposure on day one.' },
                { n: '04', title: 'Negotiate & Close', body: 'We negotiate fiercely on your behalf, manage due diligence, and guide you through a smooth escrow to the best possible outcome.' },
              ].map((s, i) => (
                <div key={s.n} style={{ display: 'flex', gap: '3rem', paddingBottom: '3.5rem', marginBottom: '3.5rem', borderBottom: i < 3 ? '1px solid var(--border)' : 'none' }}>
                  <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: '4rem', lineHeight: 1, color: 'var(--light-gray)', flexShrink: 0, width: '4rem' }}>{s.n}</div>
                  <div>
                    <h3 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: '1.6rem', textTransform: 'uppercase', color: 'var(--black)', marginBottom: '0.8rem', lineHeight: 1.05 }}>{s.title}</h3>
                    <p style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.9rem', lineHeight: 1.85, color: 'var(--mid)', fontWeight: 300 }}>{s.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── VALUATION FORM ── */}
      <section id="valuation" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', borderBottom: '1px solid var(--border)' }}>
        <div style={{ background: 'var(--near-black)', padding: '7rem 4rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, backgroundImage: "url('https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1200&q=80')", backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.08 }} />
          <div style={{ position: 'relative', zIndex: 2 }}>
            <span style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.62rem', letterSpacing: '0.28em', textTransform: 'uppercase', color: 'var(--gold)', fontWeight: 500, display: 'block', marginBottom: '1.2rem' }}>Free Valuation</span>
            <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 'clamp(2.8rem, 4vw, 5rem)', textTransform: 'uppercase', color: 'var(--white)', lineHeight: 0.9, marginBottom: '2rem' }}>What Is Your<br/>Home Worth?</h2>
            <p style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.9rem', lineHeight: 1.85, color: 'rgba(255,255,255,0.38)', fontWeight: 300, maxWidth: 360, marginBottom: '3rem' }}>Get a complimentary, no-obligation market analysis from Southern California's luxury specialists. We respond within 24 hours.</p>
            {[['Phone','818.591.1600'],['Email','info@mcqueenrealty.com']].map(([l,v]) => (
              <div key={l} style={{ marginBottom: '1rem' }}>
                <div style={{ fontFamily: "'Jost',sans-serif", fontSize: '0.56rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.22)', marginBottom: '0.2rem' }}>{l}</div>
                <div style={{ fontFamily: "'Jost',sans-serif", fontSize: '0.86rem', color: 'rgba(255,255,255,0.55)', fontWeight: 300 }}>{v}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ padding: '7rem 4rem', background: 'var(--off-white)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          {submitted ? (
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: '3rem', textTransform: 'uppercase', color: 'var(--black)', marginBottom: '1rem', lineHeight: 0.9 }}>We'll Be<br/>In Touch</div>
              <p style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.88rem', color: 'var(--mid)', fontWeight: 300, lineHeight: 1.8, marginTop: '1.2rem' }}>A member of our team will reach out within 24 hours with your complimentary market analysis.</p>
            </div>
          ) : (
            <>
              <div className="field-wrap">
                <label className="field-label">Your Name</label>
                <input className="field-input" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
              </div>
              <div className="field-wrap">
                <label className="field-label">Email Address</label>
                <input className="field-input" type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
              </div>
              <div className="field-wrap">
                <label className="field-label">Phone Number</label>
                <input className="field-input" type="tel" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} />
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
                <label className="field-label">Message (optional)</label>
                <textarea className="field-textarea" rows={3} value={form.message} onChange={e => setForm({...form, message: e.target.value})} />
              </div>
              <button onClick={handleSubmit}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.7rem', background: 'var(--black)', color: 'var(--white)', padding: '1rem 2.4rem', fontFamily: "'Jost', sans-serif", fontSize: '0.7rem', letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 500, border: 'none', cursor: 'pointer', width: '100%', transition: 'background 0.2s' }}
                onMouseOver={e => e.currentTarget.style.background='var(--gold)'}
                onMouseOut={e => e.currentTarget.style.background='var(--black)'}>
                Request Free Valuation
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                </svg>
              </button>
            </>
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
