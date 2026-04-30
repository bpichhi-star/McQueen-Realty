'use client';
import { useEffect, useRef, useState } from 'react';

const VIDEOS = [
  {
    src: 'https://pub-ad56d343e8ab4bbaa42e4b8b7cc3847b.r2.dev/hero1.mp4',
    label: 'Los Angeles',
  },
  {
    src: 'https://pub-ad56d343e8ab4bbaa42e4b8b7cc3847b.r2.dev/hero2.mp4',
    label: 'Malibu',
  },
  {
    src: 'https://pub-ad56d343e8ab4bbaa42e4b8b7cc3847b.r2.dev/hero3.mp4',
    label: 'Santa Monica',
  },
];

export default function Home() {
  const [active, setActive] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [overVideo, setOverVideo] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  // Compass-style search state
  const [searchTab, setSearchTab] = useState('buy');
  const [beds, setBeds] = useState('');
  const [baths, setBaths] = useState('');
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [homeTypes, setHomeTypes] = useState([]);
  const [openFilter, setOpenFilter] = useState(null);
  const [geoLoading, setGeoLoading] = useState(false);
  const [idxLoaded, setIdxLoaded] = useState(false);
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '', website: '' });
  const [contactStatus, setContactStatus] = useState('idle'); // 'idle' | 'sending' | 'sent' | 'error'
  const [contactError, setContactError] = useState('');
  const searchPanelRef = useRef(null);
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

  // Neighborhood → ZIP lookup for ApexIDX
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

  const buildApexUrl = () => {
    const q = searchQuery.trim().toLowerCase();
    let locationSegment = '';

    // Check if it's a ZIP code (5 digits)
    if (/^\d{5}$/.test(q)) {
      locationSegment = `${q}_autosearch`;
    } else if (q && NEIGHBORHOOD_ZIPS[q]) {
      // Known neighborhood → use its ZIP
      locationSegment = `${NEIGHBORHOOD_ZIPS[q]}_autosearch`;
    } else if (q) {
      // Unknown — try as-is in autosearch (ApexIDX may handle it)
      locationSegment = `${encodeURIComponent(q)}_autosearch`;
    }

    // Property types
    const typeMap = { 'House': 'home', 'Condo': 'Condo', 'Townhouse': 'Townhouse', 'Multi-Family': 'MultiFamily', 'Land': 'Land' };
    const types = homeTypes.length > 0
      ? homeTypes.map(t => typeMap[t] || t).join(',')
      : 'home,Townhouse';

    // Build URL segments
    const segments = [
      'lastModified_orderBy',
      'desc_order',
      priceRange.min ? `${priceRange.min}_price` : null,
      priceRange.max ? `${priceRange.max}_maxprice` : null,
      beds ? `${beds.replace('+','')}_br` : null,
      `${types}_homeType`,
      'active,short-sales,foreclosures_homeStatus',
      locationSegment || null,
    ].filter(Boolean).join('/');

    return `https://apexidx.com/idx_lite/results/EN_LA/${segments}`;
  };

  const handleContactSubmit = async (e) => {
    e?.preventDefault?.();
    if (contactStatus === 'sending') return;
    setContactStatus('sending');
    setContactError('');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ formType: 'contact', ...contactForm }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) {
        throw new Error(data.error || 'Could not send message');
      }
      setContactStatus('sent');
    } catch (err) {
      setContactStatus('error');
      setContactError(err.message || 'Something went wrong');
    }
  };

  const handleSearch = () => {
    const apexUrl = buildApexUrl();
    const encoded = encodeURIComponent(apexUrl);
    window.location.href = `/search?src=${encoded}`;
  };

  useEffect(() => {
    const handleOutside = (e) => {
      if (searchPanelRef.current && !searchPanelRef.current.contains(e.target)) {
        setOpenFilter(null);
      }
    };
    document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, []);

  const handleGeolocate = () => {
    if (!navigator.geolocation) return;
    setGeoLoading(true);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const { latitude, longitude } = pos.coords;
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
          );
          const data = await res.json();
          const city =
            data.address?.city ||
            data.address?.town ||
            data.address?.suburb ||
            data.address?.county ||
            '';
          const state = data.address?.state_code || data.address?.state || '';
          if (city) setSearchQuery(state ? `${city}, ${state}` : city);
        } catch {
          // silently fail — user still sees their location coordinates
        } finally {
          setGeoLoading(false);
        }
      },
      () => setGeoLoading(false),
      { timeout: 8000 }
    );
  };

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
            rgba(0,0,0,0.10) 0%,
            rgba(0,0,0,0) 30%,
            rgba(0,0,0,0) 60%,
            rgba(0,0,0,0.55) 100%
          );
        }

        .hero-center {
          position: absolute; inset: 0;
          display: flex; flex-direction: column;
          align-items: flex-start; justify-content: center;
          padding: 0 2.5rem;
        }


        .hero-dots { position: absolute; bottom: 3.7rem; right: 2.5rem; display: flex; gap: 0.5rem; }
        .hero-dot { width: 18px; height: 2px; background: rgba(255,255,255,0.25); transition: background 0.4s, width 0.4s; }
        .hero-dot.active-dot { background: var(--gold); width: 32px; }

        .hero-wordmark {
          font-family: 'Barlow Condensed', sans-serif; font-weight: 900;
          font-size: clamp(4rem, 10vw, 11rem); letter-spacing: -0.01em;
          text-transform: uppercase; color: var(--white); line-height: 0.9;
        }
        .hero-wordmark .brand-sub {
          display: block; font-family: 'Jost', sans-serif; font-weight: 300;
          font-size: clamp(0.7rem, 1.5vw, 1rem); letter-spacing: 0.5em;
          color: var(--gold); margin-top: 0.8rem; text-transform: uppercase;
        }
        .hero-wordmark strong { font-weight: 900; }


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

        /* ── SEARCH SECTION SHELL ── */
        .search-section {
          position: relative; background: var(--near-black); padding: 6rem 2.5rem 7rem;
          border-bottom: 1px solid rgba(255,255,255,0.06); overflow: hidden;
        }
        .search-bg {
          position: absolute; inset: 0; background-size: cover;
          background-position: center 30%; opacity: 0.6; transition: opacity 0.6s;
        }
        .search-content { position: relative; z-index: 2; }

        .search-headline {
          font-family: 'Barlow Condensed', sans-serif; font-weight: 900; font-style: italic;
          font-size: clamp(3.5rem, 8vw, 9rem); line-height: 0.88; letter-spacing: -0.01em;
          text-transform: uppercase; color: var(--white); margin-bottom: 1.2rem;
          text-shadow: 0 2px 24px rgba(0,0,0,0.4);
        }
        .search-sub {
          font-family: 'Jost', sans-serif; font-size: 0.82rem; font-weight: 300;
          letter-spacing: 0.08em; color: rgba(255,255,255,0.75); margin-bottom: 2.5rem;
          text-shadow: 0 1px 8px rgba(0,0,0,0.5);
        }

        .csearch-geo-btn {
          display: flex; align-items: center; justify-content: center;
          width: 34px; height: 34px; background: transparent;
          border: 1px solid var(--border); cursor: pointer; flex-shrink: 0;
          color: var(--faint); transition: border-color 0.15s, color 0.15s;
        }
        .csearch-geo-btn:hover { border-color: var(--gold); color: var(--gold); }
        .csearch-geo-btn.spinning svg { animation: spinOnce 0.8s ease both; }
        @keyframes spinOnce {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }

        /* ── IDX FULL-BLEED ── */
        .idx-section {
          position: relative;
          background: var(--white);
          border-top: 1px solid var(--border);
          border-bottom: 1px solid var(--border);
        }

        /* Branded context bar above the iframe */
        .idx-context-bar {
          display: flex; align-items: center; justify-content: space-between;
          padding: 1.4rem 2.5rem;
          border-bottom: 1px solid var(--border);
          background: var(--white);
        }
        .idx-context-left {
          display: flex; align-items: center; gap: 1.6rem;
        }
        .idx-context-label {
          font-family: 'Jost', sans-serif; font-size: 0.58rem;
          letter-spacing: 0.24em; text-transform: uppercase;
          color: var(--faint); font-weight: 500;
        }
        .idx-context-title {
          font-family: 'Barlow Condensed', sans-serif; font-weight: 800;
          font-size: 1.1rem; text-transform: uppercase;
          letter-spacing: 0.04em; color: var(--black);
        }
        .idx-context-divider {
          width: 1px; height: 24px; background: var(--border);
        }
        .idx-live-dot {
          display: flex; align-items: center; gap: 6px;
          font-family: 'Jost', sans-serif; font-size: 0.62rem;
          letter-spacing: 0.1em; text-transform: uppercase; color: var(--faint);
        }
        .idx-live-dot::before {
          content: ''; width: 6px; height: 6px; border-radius: 50%;
          background: #4CAF50;
          box-shadow: 0 0 0 2px rgba(76,175,80,0.2);
          animation: livePulse 2s ease infinite;
        }
        @keyframes livePulse {
          0%, 100% { box-shadow: 0 0 0 2px rgba(76,175,80,0.2); }
          50%       { box-shadow: 0 0 0 5px rgba(76,175,80,0); }
        }
        .idx-context-right {
          display: flex; align-items: center; gap: 1.4rem;
        }
        .idx-contact-btn {
          display: flex; align-items: center; gap: 6px;
          height: 36px; padding: 0 1.4rem;
          background: var(--black); color: var(--white); border: none;
          font-family: 'Jost', sans-serif; font-size: 0.67rem;
          letter-spacing: 0.12em; font-weight: 500; text-transform: uppercase;
          cursor: pointer; transition: background 0.2s; text-decoration: none;
        }
        .idx-contact-btn:hover { background: var(--gold); }
        .idx-disclaimer {
          font-family: 'Jost', sans-serif; font-size: 0.6rem;
          color: var(--faint); letter-spacing: 0.04em;
        }

        /* The clipping wrapper — hides Matrix chrome */
        .idx-clip {
          position: relative;
          overflow: hidden;
          height: 820px;
          background: var(--white);
        }

        /* Loader overlay */
        .idx-loader {
          position: absolute; inset: 0;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          background: var(--white); z-index: 10;
          gap: 1.2rem;
          transition: opacity 0.6s ease;
          pointer-events: none;
        }
        .idx-loader.hidden { opacity: 0; }
        .idx-loader-bar {
          width: 120px; height: 1px; background: var(--light-gray); overflow: hidden;
        }
        .idx-loader-fill {
          height: 100%; background: var(--gold);
          animation: idxLoad 1.8s cubic-bezier(.4,0,.2,1) infinite;
        }
        @keyframes idxLoad {
          0%   { width: 0%;  margin-left: 0; }
          50%  { width: 60%; margin-left: 20%; }
          100% { width: 0%;  margin-left: 100%; }
        }
        .idx-loader-label {
          font-family: 'Jost', sans-serif; font-size: 0.58rem;
          letter-spacing: 0.28em; text-transform: uppercase; color: var(--faint);
        }

        /* The iframe itself — offset upward to clip Matrix header */
        .idx-clip iframe {
          position: absolute;
          top: -82px; left: 0;
          width: 100%;
          height: calc(100% + 82px);
          border: none;
          opacity: 0;
          transition: opacity 0.7s ease;
        }
        .idx-clip iframe.loaded { opacity: 1; }

        /* Bottom CTA bar */
        .idx-cta-bar {
          display: flex; align-items: center; justify-content: center;
          gap: 2rem; padding: 1.8rem 2.5rem;
          border-top: 1px solid var(--border);
          background: var(--off-white);
        }

        .csearch-panel {
          background: var(--white);
          max-width: 820px;
          box-shadow: 0 20px 80px rgba(0,0,0,0.45);
        }

        /* Tabs */
        .csearch-tabs {
          display: flex; border-bottom: 1px solid var(--border); padding: 0 1.5rem;
        }
        .csearch-tab {
          padding: 0.85rem 1.1rem; background: transparent; border: none;
          border-bottom: 2px solid transparent; margin-bottom: -1px; cursor: pointer;
          font-family: 'Jost', sans-serif; font-size: 0.7rem; font-weight: 500;
          letter-spacing: 0.12em; text-transform: uppercase; color: var(--faint);
          transition: color 0.2s, border-color 0.2s;
        }
        .csearch-tab.tab-active { color: var(--black); border-bottom-color: var(--gold); }

        /* Input row */
        .csearch-input-row {
          display: flex; align-items: center; padding: 0 1.5rem;
          height: 62px; border-bottom: 1px solid var(--border); gap: 0.8rem;
        }
        .csearch-input {
          flex: 1; background: transparent; border: none; outline: none;
          font-family: 'Jost', sans-serif; font-size: 0.92rem; font-weight: 300;
          color: var(--black); letter-spacing: 0.02em;
        }
        .csearch-input::placeholder { color: var(--faint); }
        .csearch-divider { width: 1px; height: 26px; background: var(--border); flex-shrink: 0; }
        .csearch-search-btn {
          display: flex; align-items: center; gap: 6px; height: 40px; padding: 0 1.4rem;
          background: var(--black); color: var(--white); border: none; cursor: pointer;
          font-family: 'Jost', sans-serif; font-size: 0.67rem; letter-spacing: 0.14em;
          font-weight: 500; text-transform: uppercase; flex-shrink: 0;
          transition: background 0.2s;
        }
        .csearch-search-btn:hover { background: var(--gold); }

        /* Filter pills row */
        .csearch-filters {
          display: flex; align-items: center; padding: 0 1.5rem;
          height: 50px; gap: 6px; overflow-x: auto;
        }
        .csearch-filters::-webkit-scrollbar { display: none; }
        .csearch-pill {
          display: flex; align-items: center; gap: 4px; height: 30px; padding: 0 11px;
          background: transparent; border: 1px solid var(--border); color: var(--black);
          font-family: 'Jost', sans-serif; font-size: 0.67rem; letter-spacing: 0.04em;
          font-weight: 400; white-space: nowrap; cursor: pointer; position: relative;
          transition: border-color 0.15s, background 0.15s, color 0.15s;
        }
        .csearch-pill:hover { border-color: var(--black); }
        .csearch-pill.pill-active { background: var(--black); color: var(--white); border-color: var(--black); }

        /* Dropdowns */
        .csearch-dropdown {
          position: absolute; top: calc(100% + 6px); left: 0; min-width: 240px;
          background: var(--white); border: 1px solid var(--border);
          box-shadow: 0 12px 40px rgba(0,0,0,0.14); z-index: 600; padding: 1.2rem 1.4rem 1.4rem;
        }
        .csearch-dd-label {
          font-family: 'Jost', sans-serif; font-size: 0.55rem; letter-spacing: 0.2em;
          text-transform: uppercase; color: var(--faint); margin-bottom: 0.7rem; display: block;
        }
        .csearch-opt-row { display: flex; flex-wrap: wrap; gap: 5px; }
        .csearch-opt {
          padding: 4px 11px; border: 1px solid var(--border); background: transparent;
          color: var(--black); font-family: 'Jost', sans-serif; font-size: 0.68rem;
          cursor: pointer; transition: all 0.12s;
        }
        .csearch-opt:hover { border-color: var(--black); }
        .csearch-opt.opt-sel { background: var(--black); color: var(--white); border-color: var(--black); }
        .csearch-price-inputs { display: flex; gap: 8px; align-items: center; margin-top: 0.8rem; }
        .csearch-price-inp {
          flex: 1; height: 34px; padding: 0 10px; border: 1px solid var(--border); outline: none;
          font-family: 'Jost', sans-serif; font-size: 0.75rem; color: var(--black); background: transparent;
        }
        .csearch-price-inp:focus { border-color: var(--black); }
        .csearch-dd-apply {
          display: flex; justify-content: flex-end; margin-top: 1rem;
        }
        .csearch-dd-apply button {
          height: 32px; padding: 0 16px; background: var(--black); color: var(--white); border: none;
          cursor: pointer; font-family: 'Jost', sans-serif; font-size: 0.62rem;
          letter-spacing: 0.12em; text-transform: uppercase; font-weight: 500;
          transition: background 0.2s;
        }
        .csearch-dd-apply button:hover { background: var(--gold); }

        /* Exclusives link below panel */
        .search-exclusives {
          display: inline-flex; align-items: center; gap: 0.6rem; margin-top: 1.8rem;
          font-family: 'Jost', sans-serif; font-size: 0.67rem; letter-spacing: 0.16em;
          text-transform: uppercase; color: rgba(255,255,255,0.35);
          border-bottom: 1px solid rgba(255,255,255,0.15); padding-bottom: 2px;
          transition: color 0.2s, border-color 0.2s;
        }
        .search-exclusives:hover { color: var(--gold); border-color: var(--gold); }

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
          <a href="/" className="nav-logo" style={{ color: overVideo ? '#ffffff' : 'var(--black)' }}>
            McQueen<span className="sep">·</span>Realty
          </a>
          <div className="nav-links">
            {[['Buy','/buy'],['Sell','/sell'],['Rent','/rent'],['Agents','#agents']].map(([label, href]) => (
              <a key={label} href={href} className="nav-link"
                style={{ color: overVideo ? 'rgba(255,255,255,0.72)' : 'var(--mid)' }}>{label}</a>
            ))}
          </div>
          <div className="nav-right">
            <a href="/new-listings" className="nav-link"
              style={{ color: overVideo ? 'rgba(255,255,255,0.72)' : 'var(--mid)', padding: '0 0.8rem' }}>New Listings</a>
            <a href="/new-listings" className="nav-link"
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
        <div className="anim-d1">
          <h1 className="search-headline" style={{ color: 'var(--white)', margin: 0 }}>Where Do<br/>You Want<br/>To Live?</h1>
          <p style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.85rem', fontWeight: 300, letterSpacing: '0.08em', color: 'rgba(255,255,255,0.55)', marginTop: '1.2rem' }}>McQueen Realty. Leaders in Southern California luxury property.</p>
        </div>

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
              {
                h: 380,
                tag: 'Bel Air',
                price: '$14,999,000',
                address: '1475 Bel Air Road',
                city: 'Los Angeles, CA 90077',
                stats: '7 bd  ·  9 ba  ·  12,027 sqft',
                sub: 'Warm Modern · Infinity Pool · City & Ocean Views',
                img: 'https://photos.zillowstatic.com/fp/7dc5b14e37789f156b24ce8ff4e432ee-cc_ft_960.jpg',
                href: '/search?src=' + encodeURIComponent('https://apexidx.com/idx_lite/results/EN_LA/lastModified_orderBy/desc_order/26669607_autosearch'),
              },
              {
                h: 220,
                tag: 'Malibu',
                price: '$9,995,000',
                address: '29924 Harvester Road',
                city: 'Malibu, CA 90265',
                stats: '5 bd  ·  7 ba  ·  7,500 sqft',
                sub: 'New Construction · Ocean Views · Malibu Park',
                img: 'https://photos.zillowstatic.com/fp/d3ab9faf398f958423767d8c53528f91-cc_ft_960.jpg',
                href: '/search?src=' + encodeURIComponent('https://apexidx.com/idx_lite/results/EN_LA/lastModified_orderBy/desc_order/26672875_autosearch'),
              },
              {
                h: 220,
                tag: 'Hidden Hills',
                price: '$18,800,000',
                address: '5373 Jed Smith Road',
                city: 'Hidden Hills, CA 91302',
                stats: '7 bd  ·  10 ba  ·  13,802 sqft',
                sub: 'Guard-Gated Estate · New Build 2024',
                img: 'https://img.chime.me/imageemb/mls-listing/976/SR26011664/c2926e50/1768613485/original_FMhLDoQgDAbgG1F-OkBnbgO0ZBY-iJIYb2_cfv85x_kjarq5w8oy726mru3rS4SQiX1KASIf4m9tqSMbq8QgkJI5RqgHTA3sLqvjCQAA__8.jpg',
                href: '/search?src=' + encodeURIComponent('https://apexidx.com/idx_lite/results/EN_LA/lastModified_orderBy/desc_order/SR26011664_autosearch'),
              },
            ].map(e => (
              <a key={e.address} href={e.href} className="edit-card" style={{ textDecoration: 'none', display: 'block' }}>
                <div className="edit-card-img" style={{ height: e.h, position: 'relative' }}>
                  <div className="edit-card-img-inner" style={{
                    height: '100%',
                    backgroundImage: `url('${e.img}')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }} />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0) 55%, rgba(0,0,0,0.45) 100%)' }} />
                  <div style={{ position: 'absolute', top: '1.2rem', left: '1.2rem', background: 'var(--gold)', color: 'var(--black)', fontFamily: "'Jost', sans-serif", fontSize: '0.54rem', letterSpacing: '0.22em', padding: '0.32rem 0.75rem', textTransform: 'uppercase', fontWeight: 600 }}>{e.tag}</div>
                  <div style={{ position: 'absolute', bottom: '1.2rem', right: '1.2rem', fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: '1.6rem', color: 'var(--white)', letterSpacing: '0.02em', lineHeight: 1, textShadow: '0 1px 4px rgba(0,0,0,0.5)' }}>{e.price}</div>
                </div>
                <div style={{ padding: '1.4rem 1.8rem 1.8rem', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                    <div>
                      <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: '1.15rem', textTransform: 'uppercase', color: 'var(--white)', lineHeight: 1.05, marginBottom: '0.2rem' }}>{e.address}</div>
                      <div style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.63rem', color: 'rgba(255,255,255,0.35)', fontWeight: 300, letterSpacing: '0.06em' }}>{e.city}</div>
                    </div>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginLeft: '1rem', marginTop: '0.2rem' }}>
                      <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                    </svg>
                  </div>
                  <div style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.65rem', color: 'var(--gold)', fontWeight: 400, letterSpacing: '0.08em', marginBottom: '0.3rem' }}>{e.stats}</div>
                  <div style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.63rem', color: 'rgba(255,255,255,0.28)', fontWeight: 300, lineHeight: 1.5 }}>{e.sub}</div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── SEARCH ── */}
      <section className="search-section" id="search">
        <div className="search-bg" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1800&q=80')" }} />
        <div className="search-content" style={{ maxWidth: 1400, margin: '0 auto' }}>
          <h2 className="search-headline">Find Your<br/>Next Home</h2>
          <p className="search-sub">Search luxury properties across Southern California</p>

          {/* Compass Panel */}
          <div className="csearch-panel" ref={searchPanelRef}>

            {/* ── Tabs ── */}
            <div className="csearch-tabs">
              <button className="csearch-tab tab-active">Buy</button>
            </div>

            {/* ── Location Input ── */}
            <div className="csearch-input-row">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--faint)" strokeWidth="2" strokeLinecap="round">
                <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
              <input
                className="csearch-input"
                placeholder="City, neighborhood, ZIP, or address"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') handleSearch(); }}
              />
              {/* Geo button */}
              <button
                className={`csearch-geo-btn ${geoLoading ? 'spinning' : ''}`}
                onClick={handleGeolocate}
                title="Use my location"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <circle cx="12" cy="12" r="3"/>
                  <path d="M12 2v3M12 19v3M2 12h3M19 12h3"/>
                  <circle cx="12" cy="12" r="7" strokeDasharray="2 2"/>
                </svg>
              </button>
              <div className="csearch-divider" />
              <button className="csearch-search-btn" onClick={handleSearch}>
                Search
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                </svg>
              </button>
            </div>

            {/* ── Filter Pills ── */}
            <div className="csearch-filters">
              <button className="csearch-pill" onClick={handleSearch}>
                More Filters
                <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="6 9 12 15 18 9"/></svg>
              </button>
            </div>
          </div>{/* /csearch-panel */}

          <a href="/search" className="search-exclusives">
            View Our Exclusives{' '}
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
            </svg>
          </a>
        </div>
      </section>

      {/* ── MLS SEARCH ── */}
      <section className="idx-section" id="mls-search">

        {/* Context bar — McQueen branded, sits above iframe */}
        <div className="idx-context-bar">
          <div className="idx-context-left">
            <div>
              <div className="idx-context-label">Property Search</div>
              <div className="idx-context-title">Live MLS Listings · Southern California</div>
            </div>
            <div className="idx-context-divider" />
            <div className="idx-live-dot">Live · Updated Daily</div>
          </div>
          <div className="idx-context-right">
            <span className="idx-disclaimer">Powered by CRMLS</span>
            <a href="#contact" className="idx-contact-btn">
              Schedule a Showing
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
              </svg>
            </a>
          </div>
        </div>

        {/* ApexIDX full search — map + listings + filters */}
        <div className="idx-clip">
          <div className={`idx-loader ${idxLoaded ? 'hidden' : ''}`}>
            <div style={{
              fontFamily: "'Jost', sans-serif", fontWeight: 600, fontSize: '0.72rem',
              letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--black)'
            }}>McQueen<span style={{ color: 'var(--gold)' }}>·</span>Realty</div>
            <div className="idx-loader-bar"><div className="idx-loader-fill" /></div>
            <div className="idx-loader-label">Loading Live Listings</div>
          </div>
          <iframe
            src="https://apexidx.com/idx_lite/results/EN_LA/lastModified_orderBy/desc_order/home,Townhouse_homeType/active,short-sales,foreclosures_homeStatus"
            frameBorder="0"
            title="McQueen Realty MLS Property Search"
            allowFullScreen
            className={idxLoaded ? 'loaded' : ''}
            onLoad={() => setIdxLoaded(true)}
          />
        </div>

        {/* Bottom CTA */}
        <div className="idx-cta-bar">
          <span style={{ fontFamily: "'Jost',sans-serif", fontSize: '0.78rem', color: 'var(--mid)', fontWeight: 300 }}>
            Found something you love?
          </span>
          <a href="#contact" className="idx-contact-btn">
            Talk to an Agent
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
            </svg>
          </a>
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
            <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: '2.4rem', lineHeight: 1, color: 'var(--black)' }}>Est. 2008</div>
            <div style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--mid)', marginTop: '0.3rem' }}>Agoura Hills</div>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '5rem 4rem', borderLeft: '1px solid var(--border)' }}>
          <span className="sec-label">About McQueen Realty</span>
          <h2 className="sec-h2" style={{ fontSize: 'clamp(2.5rem, 4vw, 4rem)', marginBottom: '2rem' }}>A Standard Built<br/>On Trust</h2>
          <p style={{ fontFamily: "'Jost',sans-serif", fontSize: '0.9rem', lineHeight: 1.85, color: 'var(--mid)', fontWeight: 300, marginBottom: '1.4rem' }}>McQueen Realty was founded on a single conviction: every client — whether purchasing their first estate or expanding a multi-property portfolio — deserves the same caliber of attention and strategy.</p>
          <p style={{ fontFamily: "'Jost',sans-serif", fontSize: '0.9rem', lineHeight: 1.85, color: 'var(--mid)', fontWeight: 300, marginBottom: '2.5rem' }}>Our team combines deep regional market knowledge with a genuine passion for architecture and design. Since 2008, every transaction has been handled with discretion, precision, and genuine investment in the outcome.</p>
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
        <p style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.78rem', color: 'rgba(255,255,255,0.25)', letterSpacing: '0.1em', fontWeight: 300 }}>— McQueen Realty, est. 2008</p>
      </div>

      {/* ── CONTACT ── */}
      <section id="contact" className="contact-grid">
        <div style={{ background: 'var(--near-black)', padding: '6rem 3.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <span className="sec-label">Begin the Conversation</span>
          <h2 className="sec-h2" style={{ fontSize: 'clamp(2.8rem, 4vw, 4.5rem)', color: 'var(--white)', marginBottom: '2rem' }}>We&apos;d Love<br/>to Hear<br/>From You</h2>
          <p style={{ fontFamily: "'Jost',sans-serif", fontSize: '0.88rem', lineHeight: 1.8, color: 'rgba(255,255,255,0.38)', fontWeight: 300, maxWidth: 340, marginBottom: '3rem' }}>Whether buying, selling, or simply exploring — our team responds within 24 hours.</p>
          {[['Phone','818.591.1600'],['Email','info@mcqueenrealty.com'],['Office','28047 Dorothy Dr Unit 303, Agoura Hills CA 91301']].map(([l,v]) => (
            <div key={l} style={{ marginBottom: '1.2rem' }}>
              <div style={{ fontFamily: "'Jost',sans-serif", fontSize: '0.56rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.22)', marginBottom: '0.2rem' }}>{l}</div>
              <div style={{ fontFamily: "'Jost',sans-serif", fontSize: '0.88rem', color: 'rgba(255,255,255,0.65)', fontWeight: 300 }}>{v}</div>
            </div>
          ))}
        </div>
        <div style={{ padding: '6rem 3.5rem', background: 'var(--off-white)' }}>
          <div style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'center' }}>
            {contactStatus === 'sent' ? (
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: '3rem', textTransform: 'uppercase', color: 'var(--black)', lineHeight: 0.9, marginBottom: '1rem' }}>Message<br/>Sent</div>
                <p style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.9rem', color: 'var(--mid)', fontWeight: 300, lineHeight: 1.8 }}>Thank you for reaching out. A member of our team will respond within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit}>
                {/* honeypot — hidden from users, attractive to bots */}
                <input type="text" name="website" value={contactForm.website} onChange={(e) => setContactForm({ ...contactForm, website: e.target.value })} tabIndex={-1} autoComplete="off" style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, opacity: 0 }} aria-hidden="true" />
                <div className="field-wrap">
                  <label className="field-label">Your Name</label>
                  <input className="field-input" type="text" name="name" required value={contactForm.name} onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })} />
                </div>
                <div className="field-wrap">
                  <label className="field-label">Email Address</label>
                  <input className="field-input" type="email" name="email" required value={contactForm.email} onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })} />
                </div>
                <div className="field-wrap" style={{ marginBottom: '2.5rem' }}>
                  <label className="field-label">Message</label>
                  <textarea className="field-textarea" name="message" rows={4} value={contactForm.message} onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })} />
                </div>
                {contactStatus === 'error' && (
                  <div style={{ fontFamily: "'Jost',sans-serif", fontSize: '0.78rem', color: '#B53A3A', marginBottom: '1rem', letterSpacing: '0.04em' }}>
                    {contactError || 'Something went wrong. Please try again or call 818.591.1600.'}
                  </div>
                )}
                <button type="submit" disabled={contactStatus === 'sending'} className="btn-primary" style={{ width: '100%', justifyContent: 'center', opacity: contactStatus === 'sending' ? 0.6 : 1, cursor: contactStatus === 'sending' ? 'wait' : 'pointer' }}>
                  {contactStatus === 'sending' ? 'Sending…' : 'Send Inquiry'}{' '}
                  {contactStatus !== 'sending' && (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                    </svg>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background: 'var(--black)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', padding: '4rem 2.5rem 3rem', borderBottom: '1px solid rgba(255,255,255,0.06)', gap: '2rem', flexWrap: 'wrap' }}>
          <div>
            <div style={{ fontFamily: "'Jost',sans-serif", fontWeight: 600, fontSize: '0.82rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--white)', marginBottom: '0.6rem' }}>McQueen<span style={{ color: 'var(--gold)' }}>·</span>Realty</div>
            <div style={{ fontFamily: "'Jost',sans-serif", fontSize: '0.75rem', color: 'rgba(255,255,255,0.25)', fontWeight: 300 }}>28047 Dorothy Dr Unit 303, Agoura Hills CA 91301</div>
          </div>
          <div style={{ display: 'flex', gap: '4rem' }}>
            {[
              ['Properties', [['Buy','/buy'],['Sell','/sell'],['Rent','/rent'],['New Listings','/new-listings'],['Exclusives','/search']]],
              ['Company', [['About Us','#about'],['Agents','#agents'],['Services','#services'],['Contact','#contact']]],
              ['Markets', [['LA County','/search?src=https%3A%2F%2Fapexidx.com%2Fidx_lite%2Fresults%2FEN_LA%2FlastModified_orderBy%2Fdesc_order%2Factive%2Cshort-sales%2Cforeclosures_homeStatus'],['San Fernando Valley','/search?src=https%3A%2F%2Fapexidx.com%2Fidx_lite%2Fresults%2FEN_LA%2FlastModified_orderBy%2Fdesc_order%2F91301_autosearch'],['Ventura','/search?src=https%3A%2F%2Fapexidx.com%2Fidx_lite%2Fresults%2FEN_LA%2FlastModified_orderBy%2Fdesc_order%2F93001_autosearch']]],
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
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.4rem 2.5rem', flexWrap: 'wrap', gap: '1rem' }}>
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
