'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Listings() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      overflow: 'hidden',
      background: '#FAFAF8',
      fontFamily: "'DM Sans', sans-serif",
    }}>

      {/* ── NAV ─────────────────────────────────────── */}
      <nav style={{
        flexShrink: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 2.5rem',
        height: '60px',
        background: 'rgba(250,250,248,0.97)',
        borderBottom: '1px solid rgba(17,17,16,0.1)',
        backdropFilter: 'blur(10px)',
        zIndex: 50,
      }}>
        {/* Logo */}
        <Link href="/" style={{ textDecoration: 'none' }}>
          <div style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 400,
            fontSize: '1rem',
            letterSpacing: '0.16em',
            color: '#111110',
          }}>
            MCQUEEN <span style={{ color: '#2C4A3E' }}>REALTY</span>
          </div>
        </Link>

        {/* Page title */}
        <div style={{
          position: 'absolute',
          left: '50%',
          transform: 'translateX(-50%)',
          fontSize: '0.65rem',
          letterSpacing: '0.24em',
          textTransform: 'uppercase',
          color: '#A09890',
          fontWeight: 500,
        }}>
          Property Search
        </div>

        {/* Nav links */}
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          {[
            { label: 'Home', href: '/' },
            { label: 'About', href: '/#about' },
            { label: 'Contact', href: '/#contact' },
          ].map(({ label, href }) => (
            <Link key={label} href={href} style={{
              fontSize: '0.72rem',
              letterSpacing: '0.08em',
              color: '#6B6560',
              textDecoration: 'none',
            }}>
              {label}
            </Link>
          ))}
          <Link href="/#contact" style={{
            background: '#2C4A3E',
            color: '#FAFAF8',
            fontSize: '0.68rem',
            letterSpacing: '0.1em',
            padding: '0.45rem 1.1rem',
            textDecoration: 'none',
            fontWeight: 500,
          }}>
            Schedule Showing
          </Link>
        </div>
      </nav>

      {/* ── IDX IFRAME ──────────────────────────────── */}
      <div style={{ flex: 1, overflow: 'hidden', position: 'relative' }}>
        <iframe
          src="https://matrix.crmls.org/Matrix/public/IDX.aspx?idx=eefc378c"
          width="100%"
          height="100%"
          frameBorder="0"
          marginWidth="0"
          marginHeight="0"
          style={{
            display: 'block',
            width: '100%',
            height: '100%',
            border: 'none',
          }}
          title="McQueen Realty Property Search"
          allowFullScreen
        />
      </div>

    </div>
  );
}
