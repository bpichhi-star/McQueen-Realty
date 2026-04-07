'use client';
import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

function SearchPageInner() {
  const params  = useSearchParams();
  const [loaded, setLoaded] = useState(false);

  // Get the pre-built ApexIDX URL, or fall back to general search
  const src = params.get('src')
    ? decodeURIComponent(params.get('src'))
    : 'https://apexidx.com/idx_lite/results/EN_LA/lastModified_orderBy/desc_order/home,Townhouse_homeType/active,short-sales,foreclosures_homeStatus';

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;800;900&family=Jost:wght@300;400;500;600&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --black:      #000000;
          --near-black: #0D0D0D;
          --white:      #FFFFFF;
          --off-white:  #F2F2F2;
          --light-gray: #E8E8E8;
          --mid:        #5C5C5C;
          --faint:      #999999;
          --border:     #D8D8D8;
          --gold:       #C4A35A;
          --gold-dark:  #A8883E;
        }

        html, body { height: 100%; overflow: hidden; }
        body {
          font-family: 'Jost', sans-serif;
          background: var(--white);
          -webkit-font-smoothing: antialiased;
        }
        a { text-decoration: none; color: inherit; }
        button { cursor: pointer; font-family: 'Jost', sans-serif; }

        /* ── NAV ── */
        .nav {
          position: fixed; top: 0; left: 0; right: 0; z-index: 600;
          height: 62px;
          background: var(--white);
          border-bottom: 1px solid var(--border);
          display: flex; align-items: center;
          padding: 0 2.5rem; gap: 2rem;
        }
        .nav-logo {
          font-family: 'Jost', sans-serif; font-weight: 600;
          font-size: 0.72rem; letter-spacing: 0.3em;
          text-transform: uppercase; color: var(--black);
          white-space: nowrap; flex-shrink: 0;
        }
        .nav-logo .sep { color: var(--gold); }
        .nav-divider { width: 1px; height: 22px; background: var(--border); flex-shrink: 0; }
        .nav-links { display: flex; align-items: stretch; }
        .nav-link {
          display: flex; align-items: center;
          padding: 0 1.1rem; height: 62px;
          font-size: 0.67rem; letter-spacing: 0.1em;
          text-transform: uppercase; color: var(--mid);
          transition: color 0.2s; white-space: nowrap;
          position: relative;
        }
        .nav-link::after {
          content: ''; position: absolute; bottom: 0;
          left: 1.1rem; right: 1.1rem; height: 2px;
          background: var(--gold); transform: scaleX(0);
          transition: transform 0.2s;
        }
        .nav-link:hover { color: var(--black); }
        .nav-link:hover::after { transform: scaleX(1); }
        .nav-right { margin-left: auto; display: flex; align-items: center; gap: 1.2rem; }
        .nav-back {
          display: flex; align-items: center; gap: 6px;
          font-family: 'Jost', sans-serif; font-size: 0.63rem;
          letter-spacing: 0.1em; text-transform: uppercase;
          color: var(--mid); transition: color 0.2s;
        }
        .nav-back:hover { color: var(--black); }
        .nav-cta {
          height: 34px; padding: 0 1.3rem;
          background: var(--black); color: var(--white);
          font-family: 'Jost', sans-serif;
          font-size: 0.63rem; letter-spacing: 0.12em;
          text-transform: uppercase; font-weight: 500; border: none;
          transition: background 0.2s; white-space: nowrap;
          display: flex; align-items: center;
          text-decoration: none;
        }
        .nav-cta:hover { background: var(--gold); }

        /* ── CONTEXT STRIP ── */
        .context-strip {
          position: fixed; top: 62px; left: 0; right: 0; z-index: 500;
          height: 42px;
          background: var(--near-black);
          display: flex; align-items: center; justify-content: space-between;
          padding: 0 2.5rem;
        }
        .cs-left {
          display: flex; align-items: center; gap: 1.4rem;
        }
        .cs-title {
          font-family: 'Barlow Condensed', sans-serif; font-weight: 800;
          font-size: 0.92rem; text-transform: uppercase;
          letter-spacing: 0.1em; color: var(--white);
        }
        .cs-divider { width: 1px; height: 16px; background: rgba(255,255,255,0.12); }
        .cs-live {
          display: flex; align-items: center; gap: 6px;
          font-family: 'Jost', sans-serif; font-size: 0.57rem;
          letter-spacing: 0.12em; text-transform: uppercase;
          color: rgba(255,255,255,0.38);
        }
        .cs-live::before {
          content: ''; width: 5px; height: 5px; border-radius: 50%;
          background: #4CAF50; flex-shrink: 0;
          animation: pulse 2s ease infinite;
        }
        @keyframes pulse {
          0%, 100% { box-shadow: 0 0 0 2px rgba(76,175,80,0.3); }
          50%       { box-shadow: 0 0 0 5px rgba(76,175,80,0); }
        }
        .cs-right {
          font-family: 'Jost', sans-serif; font-size: 0.55rem;
          letter-spacing: 0.1em; text-transform: uppercase;
          color: rgba(255,255,255,0.2);
        }

        /* ── IFRAME VIEWPORT ── */
        .idx-viewport {
          position: fixed;
          top: 104px;
          left: 0; right: 0; bottom: 0;
          overflow: hidden;
          background: var(--white);
        }

        /* Loader */
        .idx-loader {
          position: absolute; inset: 0;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          background: var(--white); z-index: 20;
          gap: 1.2rem; pointer-events: none;
          transition: opacity 0.7s ease;
        }
        .idx-loader.hidden { opacity: 0; }
        .idx-wordmark {
          font-family: 'Jost', sans-serif; font-weight: 600;
          font-size: 0.72rem; letter-spacing: 0.32em;
          text-transform: uppercase; color: var(--black);
        }
        .idx-wordmark .sep { color: var(--gold); }
        .idx-bar-wrap {
          width: 110px; height: 1px;
          background: var(--light-gray); overflow: hidden;
        }
        .idx-bar-fill {
          height: 100%; background: var(--gold);
          animation: barAnim 1.8s cubic-bezier(.4,0,.2,1) infinite;
        }
        @keyframes barAnim {
          0%   { width: 0%;  margin-left: 0; }
          50%  { width: 55%; margin-left: 20%; }
          100% { width: 0%;  margin-left: 100%; }
        }
        .idx-loading-label {
          font-family: 'Jost', sans-serif; font-size: 0.56rem;
          letter-spacing: 0.26em; text-transform: uppercase; color: var(--faint);
        }

        /* Iframe — full height, no offset needed for ApexIDX */
        .idx-viewport iframe {
          position: absolute;
          top: 0; left: 0;
          width: 100%;
          height: 100%;
          border: none;
          opacity: 0;
          transition: opacity 0.7s ease;
        }
        .idx-viewport iframe.loaded { opacity: 1; }

        /* Floating CTA */
        .cta-float {
          position: absolute;
          bottom: 2rem; right: 2rem; z-index: 30;
          display: flex; flex-direction: column;
          align-items: flex-end; gap: 8px;
          opacity: 0;
          animation: floatUp 0.5s ease 2.5s both;
        }
        @keyframes floatUp {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .cta-hint {
          font-family: 'Jost', sans-serif; font-size: 0.56rem;
          letter-spacing: 0.1em; text-transform: uppercase;
          color: rgba(0,0,0,0.38);
        }
        .cta-btn {
          display: flex; align-items: center; gap: 8px;
          padding: 0.9rem 1.6rem;
          background: var(--black); color: var(--white);
          font-family: 'Jost', sans-serif; font-size: 0.68rem;
          letter-spacing: 0.12em; text-transform: uppercase; font-weight: 500;
          border: none; text-decoration: none;
          box-shadow: 0 8px 32px rgba(0,0,0,0.18);
          transition: background 0.2s;
        }
        .cta-btn:hover { background: var(--gold); }
      `}</style>

      {/* ── NAV ── */}
      <nav className="nav">
        <a href="/" className="nav-logo">
          McQueen<span className="sep">·</span>Realty
        </a>
        <div className="nav-divider" />
        <div className="nav-links">
          {['Buy','Rent','Sell','Agents'].map(l => (
            <a key={l} href={`/#${l.toLowerCase()}`} className="nav-link">{l}</a>
          ))}
        </div>
        <div className="nav-right">
          <a href="/" className="nav-back">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="19" y1="12" x2="5" y2="12"/>
              <polyline points="12 19 5 12 12 5"/>
            </svg>
            Back
          </a>
          <a href="/#contact" className="nav-cta">Schedule Showing</a>
        </div>
      </nav>

      {/* ── CONTEXT STRIP ── */}
      <div className="context-strip">
        <div className="cs-left">
          <span className="cs-title">
            {params.get('src')
              ? decodeURIComponent(params.get('src')).includes('_autosearch')
                ? `Search Results · ${decodeURIComponent(params.get('src')).match(/([^/]+)_autosearch/)?.[1] || 'Southern California'}`
                : 'Search Results · Southern California'
              : 'Southern California Properties'}
          </span>
          <div className="cs-divider" />
          <span className="cs-live">Live MLS · Updated Daily</span>
        </div>
        <span className="cs-right">Powered by CRMLS</span>
      </div>

      {/* ── FULL VIEWPORT IDX ── */}
      <div className="idx-viewport">

        <div className={`idx-loader ${loaded ? 'hidden' : ''}`}>
          <div className="idx-wordmark">
            McQueen<span className="sep">·</span>Realty
          </div>
          <div className="idx-bar-wrap">
            <div className="idx-bar-fill" />
          </div>
          <div className="idx-loading-label">Loading Live Listings</div>
        </div>

        <iframe
          src={src}
          frameBorder="0"
          title="McQueen Realty MLS Property Search"
          allowFullScreen
          className={loaded ? 'loaded' : ''}
          onLoad={() => setLoaded(true)}
        />

        <div className="cta-float">
          <span className="cta-hint">Found something you love?</span>
          <a href="/#contact" className="cta-btn">
            Talk to an Agent
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="5" y1="12" x2="19" y2="12"/>
              <polyline points="12 5 19 12 12 19"/>
            </svg>
          </a>
        </div>

      </div>
    </>
  );
}

export default function SearchPage() {
  return (
    <Suspense>
      <SearchPageInner />
    </Suspense>
  );
}
