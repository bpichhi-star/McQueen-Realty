'use client';
import { useEffect, useState } from 'react';

const NAV_LINKS = [['Buy','/buy'],['Sell','/sell'],['Rent','/rent'],['Agents','#agents']];

export default function RentPage() {
  const [scrolled, setScrolled] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', area: '', beds: '', message: '', website: '' });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSubmit = async () => {
    if (!form.name || !form.email) return;
    if (submitting) return;
    setSubmitting(true);
    setErrorMsg('');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ formType: 'rent', ...form }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) throw new Error(data.error || 'Could not send');
      setSubmitted(true);
    } catch (err) {
      setErrorMsg(err.message || 'Something went wrong');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:ital,wght@0,700;0,800;0,900;1,700;1,800;1,900&family=Jost:wght@300;400;500;600&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        :root {
          --black: #000000; --near-black: #0D0D0D; --white: #FFFFFF;
          --off-white: #F2F2F2; --light-gray: #E8E8E8; --mid: #5C5C5C;
          --faint: #999999; --border: #D8D8D8; --gold: #C4A35A;
          --gold-dark: #A8883E;
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
        .field-input, .field-textarea { width: 100%; background: transparent; border: none; outline: none; font-family: 'Jost', sans-serif; font-size: 0.92rem; color: var(--black); }
        .field-textarea { resize: none; }
        .field-row { display: grid; grid-template-columns: 1fr 1fr; gap: 0 2rem; }

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
            <a href="/#contact" className="nav-cta">Schedule Showing</a>
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <div style={{ background: 'var(--near-black)', padding: '9rem 2.5rem 5rem', position: 'relative', overflow: 'hidden', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: "url('https://raw.githubusercontent.com/bpichhi-star/McQueen-Realty/main/Rent_McQueen.jpg')", backgroundSize: 'cover', backgroundPosition: 'center', opacity: 1 }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.25) 50%, rgba(0,0,0,0) 100%)' }} />
        <div style={{ position: 'relative', zIndex: 2, maxWidth: 1400, margin: '0 auto' }}>
          <span style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.62rem', letterSpacing: '0.28em', textTransform: 'uppercase', color: 'var(--gold)', fontWeight: 500, display: 'block', marginBottom: '1rem' }}>Luxury Rentals</span>
          <h1 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 'clamp(3.5rem, 7vw, 8rem)', textTransform: 'uppercase', color: 'var(--white)', lineHeight: 0.88, letterSpacing: '-0.01em', marginBottom: '1.5rem', textShadow: '0 2px 24px rgba(0,0,0,0.5)' }}>Rent in<br/>Style</h1>
          <p style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.88rem', fontWeight: 300, letterSpacing: '0.06em', color: 'rgba(255,255,255,0.88)', maxWidth: 520, lineHeight: 1.8, textShadow: '0 1px 12px rgba(0,0,0,0.7)' }}>McQueen Realty represents premium rental properties across Southern California. Tell us what you're looking for and we'll match you with available listings personally.</p>
        </div>
      </div>

      {/* ── WHY US ── */}
      <section style={{ borderBottom: '1px solid var(--border)', padding: '5rem 2.5rem' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1px', background: 'var(--border)' }}>
          {[
            { n: '01', title: 'Curated Listings', body: 'We hand-select premium rental properties that meet our quality standards — from luxury apartments to gated estates.' },
            { n: '02', title: 'Personal Matching', body: 'Tell us your criteria and budget. We handle the search and connect you directly with verified landlords and listing agents.' },
            { n: '03', title: 'Full-Service Support', body: 'From first showing to lease signing, our team guides you through every step of the rental process.' },
          ].map((s) => (
            <div key={s.n} style={{ background: 'var(--white)', padding: '3rem 2.5rem' }}>
              <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: '4rem', lineHeight: 1, color: 'var(--light-gray)', marginBottom: '1.2rem' }}>{s.n}</div>
              <h3 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: '1.4rem', textTransform: 'uppercase', color: 'var(--black)', marginBottom: '0.8rem', lineHeight: 1.1 }}>{s.title}</h3>
              <p style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.86rem', lineHeight: 1.8, color: 'var(--mid)', fontWeight: 300 }}>{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── INQUIRY FORM ── */}
      <section style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', borderBottom: '1px solid var(--border)' }}>
        <div style={{ background: 'var(--near-black)', padding: '6rem 3.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <span style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.62rem', letterSpacing: '0.28em', textTransform: 'uppercase', color: 'var(--gold)', fontWeight: 500, display: 'block', marginBottom: '1rem' }}>Rental Inquiry</span>
          <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 'clamp(2.5rem, 4vw, 4.5rem)', textTransform: 'uppercase', color: 'var(--white)', lineHeight: 0.9, marginBottom: '2rem' }}>Tell Us What<br/>You Need</h2>
          <p style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.88rem', lineHeight: 1.8, color: 'rgba(255,255,255,0.38)', fontWeight: 300, maxWidth: 340, marginBottom: '3rem' }}>Our team will respond within 24 hours with available rentals that match your criteria.</p>
          {[['Phone','818.591.1600'],['Email','info@mcqueenrealty.com'],['Office','28047 Dorothy Dr Unit 303, Agoura Hills CA 91301']].map(([l,v]) => (
            <div key={l} style={{ marginBottom: '1.2rem' }}>
              <div style={{ fontFamily: "'Jost',sans-serif", fontSize: '0.56rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.22)', marginBottom: '0.2rem' }}>{l}</div>
              <div style={{ fontFamily: "'Jost',sans-serif", fontSize: '0.86rem', color: 'rgba(255,255,255,0.55)', fontWeight: 300 }}>{v}</div>
            </div>
          ))}
        </div>

        <div style={{ padding: '6rem 3.5rem', background: 'var(--off-white)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          {submitted ? (
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: '3rem', textTransform: 'uppercase', color: 'var(--black)', marginBottom: '1rem' }}>We'll Be<br/>In Touch</div>
              <p style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.86rem', color: 'var(--mid)', fontWeight: 300, lineHeight: 1.8 }}>Thank you. A member of our team will reach out within 24 hours with rental options that match your needs.</p>
            </div>
          ) : (
            <>
              <div className="field-row">
                <div className="field-wrap">
                  <label className="field-label">Your Name</label>
                  <input className="field-input" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
                </div>
                <div className="field-wrap">
                  <label className="field-label">Email Address</label>
                  <input className="field-input" type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
                </div>
              </div>
              <div className="field-row">
                <div className="field-wrap">
                  <label className="field-label">Phone</label>
                  <input className="field-input" type="tel" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} />
                </div>
                <div className="field-wrap">
                  <label className="field-label">Preferred Area</label>
                  <input className="field-input" placeholder="e.g. Malibu, Beverly Hills" value={form.area} onChange={e => setForm({...form, area: e.target.value})} />
                </div>
              </div>
              <div className="field-wrap">
                <label className="field-label">Bedrooms Needed</label>
                <input className="field-input" placeholder="e.g. 3+" value={form.beds} onChange={e => setForm({...form, beds: e.target.value})} />
              </div>
              <div className="field-wrap" style={{ marginBottom: '2.5rem' }}>
                <label className="field-label">Additional Details / Budget</label>
                <textarea className="field-textarea" rows={4} placeholder="Tell us your budget, move-in date, must-haves..." value={form.message} onChange={e => setForm({...form, message: e.target.value})} />
              </div>
              {/* honeypot */}
              <input type="text" name="website" value={form.website} onChange={e => setForm({...form, website: e.target.value})} tabIndex={-1} autoComplete="off" style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, opacity: 0 }} aria-hidden="true" />
              {errorMsg && (
                <div style={{ fontFamily: "'Jost',sans-serif", fontSize: '0.78rem', color: '#B53A3A', marginBottom: '1rem', letterSpacing: '0.04em' }}>
                  {errorMsg}. Please try again or call 818.591.1600.
                </div>
              )}
              <button onClick={handleSubmit} disabled={submitting} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.7rem', background: 'var(--black)', color: 'var(--white)', padding: '1rem 2.4rem', fontFamily: "'Jost', sans-serif", fontSize: '0.7rem', letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 500, border: 'none', cursor: submitting ? 'wait' : 'pointer', opacity: submitting ? 0.6 : 1, width: '100%', transition: 'background 0.2s' }}
                onMouseOver={e => { if (!submitting) e.currentTarget.style.background='var(--gold)'; }}
                onMouseOut={e => { if (!submitting) e.currentTarget.style.background='var(--black)'; }}>
                {submitting ? 'Sending…' : 'Submit Rental Inquiry'}
                {!submitting && (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                  </svg>
                )}
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
