'use client';
import { useEffect, useRef, useState } from 'react';

const NAV_LINKS = [['Buy','/buy'],['Sell','/sell'],['Rent','/rent'],['Agents','#agents']];

const SHARED_CSS = `
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
  .page-header { background: var(--near-black); padding: 9rem 2.5rem 4rem; border-bottom: 1px solid rgba(255,255,255,0.06); position: relative; overflow: hidden; }
  .page-header-bg { position: absolute; inset: 0; background-size: cover; background-position: center; opacity: 0.12; }
  .page-header-inner { position: relative; z-index: 2; max-width: 1400px; margin: 0 auto; }
  .page-header-label { font-family: 'Jost', sans-serif; font-size: 0.62rem; letter-spacing: 0.28em; text-transform: uppercase; color: var(--gold); font-weight: 500; display: block; margin-bottom: 1rem; }
  .page-header-h1 { font-family: 'Barlow Condensed', sans-serif; font-weight: 900; font-size: clamp(3.5rem, 7vw, 8rem); text-transform: uppercase; color: var(--white); line-height: 0.88; letter-spacing: -0.01em; }
  .page-header-sub { font-family: 'Jost', sans-serif; font-size: 0.85rem; font-weight: 300; letter-spacing: 0.06em; color: rgba(255,255,255,0.45); margin-top: 1.2rem; }
  .idx-section { background: var(--white); border-top: 1px solid var(--border); }
  .idx-context-bar { display: flex; align-items: center; justify-content: space-between; padding: 1.4rem 2.5rem; border-bottom: 1px solid var(--border); background: var(--white); }
  .idx-context-left { display: flex; align-items: center; gap: 1.6rem; }
  .idx-context-label { font-family: 'Jost', sans-serif; font-size: 0.58rem; letter-spacing: 0.24em; text-transform: uppercase; color: var(--faint); font-weight: 500; }
  .idx-context-title { font-family: 'Barlow Condensed', sans-serif; font-weight: 800; font-size: 1.1rem; text-transform: uppercase; letter-spacing: 0.04em; color: var(--black); }
  .idx-context-divider { width: 1px; height: 24px; background: var(--border); }
  .idx-live-dot { display: flex; align-items: center; gap: 6px; font-family: 'Jost', sans-serif; font-size: 0.62rem; letter-spacing: 0.1em; text-transform: uppercase; color: var(--faint); }
  .idx-live-dot::before { content: ''; width: 6px; height: 6px; border-radius: 50%; background: #4CAF50; box-shadow: 0 0 0 2px rgba(76,175,80,0.2); animation: livePulse 2s ease infinite; }
  @keyframes livePulse { 0%, 100% { box-shadow: 0 0 0 2px rgba(76,175,80,0.2); } 50% { box-shadow: 0 0 0 5px rgba(76,175,80,0); } }
  .idx-context-right { display: flex; align-items: center; gap: 1.4rem; }
  .idx-contact-btn { display: flex; align-items: center; gap: 6px; height: 36px; padding: 0 1.4rem; background: var(--black); color: var(--white); border: none; font-family: 'Jost', sans-serif; font-size: 0.67rem; letter-spacing: 0.12em; font-weight: 500; text-transform: uppercase; cursor: pointer; transition: background 0.2s; text-decoration: none; }
  .idx-contact-btn:hover { background: var(--gold); }
  .idx-disclaimer { font-family: 'Jost', sans-serif; font-size: 0.6rem; color: var(--faint); letter-spacing: 0.04em; }
  .idx-clip { position: relative; overflow: hidden; height: 860px; background: var(--white); }
  .idx-loader { position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; background: var(--white); z-index: 10; gap: 1.2rem; transition: opacity 0.6s ease; pointer-events: none; }
  .idx-loader.hidden { opacity: 0; }
  .idx-loader-bar { width: 120px; height: 1px; background: var(--light-gray); overflow: hidden; }
  .idx-loader-fill { height: 100%; background: var(--gold); animation: idxLoad 1.8s cubic-bezier(.4,0,.2,1) infinite; }
  @keyframes idxLoad { 0% { width: 0%; margin-left: 0; } 50% { width: 60%; margin-left: 20%; } 100% { width: 0%; margin-left: 100%; } }
  .idx-loader-label { font-family: 'Jost', sans-serif; font-size: 0.58rem; letter-spacing: 0.28em; text-transform: uppercase; color: var(--faint); }
  .idx-clip iframe { position: absolute; top: -82px; left: 0; width: 100%; height: calc(100% + 82px); border: none; opacity: 0; transition: opacity 0.7s ease; }
  .idx-clip iframe.loaded { opacity: 1; }
  .idx-cta-bar { display: flex; align-items: center; justify-content: center; gap: 2rem; padding: 1.8rem 2.5rem; border-top: 1px solid var(--border); background: var(--off-white); }
  footer { background: var(--black); }
  .footer-top { display: flex; justify-content: space-between; align-items: flex-start; padding: 4rem 2.5rem 3rem; border-bottom: 1px solid rgba(255,255,255,0.06); gap: 2rem; flex-wrap: wrap; }
  .footer-bottom { display: flex; justify-content: space-between; align-items: center; padding: 1.4rem 2.5rem; flex-wrap: wrap; gap: 1rem; }
  .csearch-panel { background: var(--white); max-width: 820px; box-shadow: 0 20px 80px rgba(0,0,0,0.45); }
  .csearch-tabs { display: flex; border-bottom: 1px solid var(--border); padding: 0 1.5rem; }
  .csearch-tab { padding: 0.85rem 1.1rem; background: transparent; border: none; border-bottom: 2px solid transparent; margin-bottom: -1px; cursor: pointer; font-family: 'Jost', sans-serif; font-size: 0.7rem; font-weight: 500; letter-spacing: 0.12em; text-transform: uppercase; color: var(--faint); transition: color 0.2s, border-color 0.2s; }
  .csearch-tab.tab-active { color: var(--black); border-bottom-color: var(--gold); }
  .csearch-input-row { display: flex; align-items: center; padding: 0 1.5rem; height: 62px; border-bottom: 1px solid var(--border); gap: 0.8rem; }
  .csearch-input { flex: 1; background: transparent; border: none; outline: none; font-family: 'Jost', sans-serif; font-size: 0.92rem; font-weight: 300; color: var(--black); letter-spacing: 0.02em; }
  .csearch-input::placeholder { color: var(--faint); }
  .csearch-divider { width: 1px; height: 26px; background: var(--border); flex-shrink: 0; }
  .csearch-search-btn { display: flex; align-items: center; gap: 6px; height: 40px; padding: 0 1.4rem; background: var(--black); color: var(--white); border: none; cursor: pointer; font-family: 'Jost', sans-serif; font-size: 0.67rem; letter-spacing: 0.14em; font-weight: 500; text-transform: uppercase; flex-shrink: 0; transition: background 0.2s; }
  .csearch-search-btn:hover { background: var(--gold); }
  .csearch-filters { display: flex; align-items: center; padding: 0 1.5rem; height: 50px; gap: 6px; }
  .csearch-pill { display: flex; align-items: center; gap: 4px; height: 30px; padding: 0 11px; background: transparent; border: 1px solid var(--border); color: var(--black); font-family: 'Jost', sans-serif; font-size: 0.67rem; letter-spacing: 0.04em; font-weight: 400; white-space: nowrap; cursor: pointer; transition: border-color 0.15s, background 0.15s, color 0.15s; }
  .csearch-pill:hover { border-color: var(--black); }
  .csearch-geo-btn { display: flex; align-items: center; justify-content: center; width: 34px; height: 34px; background: transparent; border: 1px solid var(--border); cursor: pointer; flex-shrink: 0; color: var(--faint); transition: border-color 0.15s, color 0.15s; }
  .csearch-geo-btn:hover { border-color: var(--gold); color: var(--gold); }
  @keyframes spinOnce { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
  .csearch-geo-btn.spinning svg { animation: spinOnce 0.8s ease both; }
`;

export default function RentPage() {
  const [scrolled, setScrolled] = useState(false);
  const [idxLoaded, setIdxLoaded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [geoLoading, setGeoLoading] = useState(false);
  const searchPanelRef = useRef(null);

  const NEIGHBORHOOD_ZIPS = {
    'beverly hills': '90210', 'bel air': '90077', 'malibu': '90265',
    'santa monica': '90401', 'pacific palisades': '90272', 'brentwood': '90049',
    'hollywood hills': '90046', 'west hollywood': '90046', 'calabasas': '91302',
    'hidden hills': '91301', 'holmby hills': '90024', 'westwood': '90024',
    'los feliz': '90027', 'silver lake': '90026', 'studio city': '91604',
    'sherman oaks': '91403', 'encino': '91316', 'woodland hills': '91364',
    'hancock park': '90004', 'los angeles': '90001', 'west la': '90025',
    'culver city': '90232', 'marina del rey': '90292', 'playa del rey': '90293',
    'manhattan beach': '90266', 'hermosa beach': '90254', 'redondo beach': '90277',
    'palos verdes': '90274', 'san marino': '91108', 'pasadena': '91101',
    'glendale': '91201', 'burbank': '91501', 'tarzana': '91356',
    'northridge': '91324', 'chatsworth': '91311', 'porter ranch': '91326',
  };

  const handleSearch = () => {
    const q = searchQuery.trim().toLowerCase();
    let zip = '';
    if (/^\d{5}$/.test(q)) {
      zip = q;
    } else if (q && NEIGHBORHOOD_ZIPS[q]) {
      zip = NEIGHBORHOOD_ZIPS[q];
    }
    const params = new URLSearchParams({ LA: 'EN', TRANSACTION_TYPE: 'L' });
    if (zip) params.set('ZIP', zip);
    else if (q) params.set('CITY', q);
    window.location.href = `https://www.crmls.org/servlet/lDisplayListings?${params.toString()}`;
  };

  const handleGeolocate = () => {
    if (!navigator.geolocation) return;
    setGeoLoading(true);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const { latitude, longitude } = pos.coords;
          const res = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`);
          const data = await res.json();
          const city = data.address?.city || data.address?.town || data.address?.suburb || data.address?.county || '';
          const state = data.address?.state_code || data.address?.state || '';
          if (city) setSearchQuery(state ? `${city}, ${state}` : city);
        } catch {} finally { setGeoLoading(false); }
      },
      () => setGeoLoading(false),
      { timeout: 8000 }
    );
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const IDX_URL = 'https://matrix.crmls.org/Matrix/public/IDX.aspx?idx=eefc378c';

  return (
    <>
      <style>{SHARED_CSS}</style>

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

      {/* ── PAGE HEADER ── */}
      <div className="page-header">
        <div className="page-header-bg" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1449034446853-66c86144b0ad?w=1800&q=80')" }} />
        <div className="page-header-inner">
          <span className="page-header-label">Luxury Rentals</span>
          <h1 className="page-header-h1">Rent in<br/>Style</h1>
          <p className="page-header-sub">Premium rental properties across Southern California · Updated daily</p>
          <div className="csearch-panel" ref={searchPanelRef} style={{ marginTop: '2.5rem' }}>
            <div className="csearch-tabs">
              <button className="csearch-tab tab-active">Rent</button>
            </div>
            <div className="csearch-input-row">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--faint)" strokeWidth="2" strokeLinecap="round">
                <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
              <input className="csearch-input" placeholder="City, neighborhood, ZIP, or address"
                value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') handleSearch(); }} />
              <button className={`csearch-geo-btn ${geoLoading ? 'spinning' : ''}`} onClick={handleGeolocate} title="Use my location">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3"/>
                  <circle cx="12" cy="12" r="7" strokeDasharray="2 2"/>
                </svg>
              </button>
              <div className="csearch-divider" />
              <button className="csearch-search-btn" onClick={handleSearch}>
                Search Rentals
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                </svg>
              </button>
            </div>
            <div className="csearch-filters">
              <button className="csearch-pill" onClick={handleSearch}>
                More Filters
                <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="6 9 12 15 18 9"/></svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── MLS SEARCH ── */}
      <section className="idx-section">
        <div className="idx-context-bar">
          <div className="idx-context-left">
            <div>
              <div className="idx-context-label">Rental Search</div>
              <div className="idx-context-title">Live MLS Rentals · Southern California</div>
            </div>
            <div className="idx-context-divider" />
            <div className="idx-live-dot">Live · Updated Daily</div>
          </div>
          <div className="idx-context-right">
            <span className="idx-disclaimer">Powered by CRMLS</span>
            <a href="/#contact" className="idx-contact-btn">
              Schedule a Tour
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
              </svg>
            </a>
          </div>
        </div>
        <div className="idx-clip">
          <div className={`idx-loader ${idxLoaded ? 'hidden' : ''}`}>
            <div style={{ fontFamily: "'Jost',sans-serif", fontWeight: 600, fontSize: '0.72rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--black)' }}>
              McQueen<span style={{ color: 'var(--gold)' }}>·</span>Realty
            </div>
            <div className="idx-loader-bar"><div className="idx-loader-fill" /></div>
            <div className="idx-loader-label">Loading Rentals</div>
          </div>
          <iframe
            src={IDX_URL}
            frameBorder="0"
            title="McQueen Realty — Rent"
            allowFullScreen
            className={idxLoaded ? 'loaded' : ''}
            onLoad={() => setIdxLoaded(true)}
          />
        </div>
        <div className="idx-cta-bar">
          <span style={{ fontFamily: "'Jost',sans-serif", fontSize: '0.78rem', color: 'var(--mid)', fontWeight: 300 }}>
            Ready to schedule a tour?
          </span>
          <a href="/#contact" className="idx-contact-btn">
            Talk to an Agent
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
            </svg>
          </a>
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
