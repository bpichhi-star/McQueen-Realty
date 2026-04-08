'use client';

import { useState, useEffect, useRef } from 'react';

/* ─── VIDEO HERO ─────────────────────────────────────────── */
const scenes = [
  {
    src: 'https://videos.pexels.com/video-files/2169880/2169880-uhd_2560_1440_30fps.mp4',
    label: 'Los Angeles',
  },
  {
    src: 'https://videos.pexels.com/video-files/3571264/3571264-uhd_2560_1440_25fps.mp4',
    label: 'Malibu',
  },
  {
    src: 'https://videos.pexels.com/video-files/4763824/4763824-hd_1920_1080_25fps.mp4',
    label: 'Santa Monica',
  },
  {
    src: 'https://videos.pexels.com/video-files/3214083/3214083-uhd_2560_1440_25fps.mp4',
    label: 'Beverly Hills',
  },
];

function VideoHero() {
  const [current, setCurrent] = useState(0);
  const [fading, setFading] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setFading(true);
      setTimeout(() => {
        setCurrent(prev => (prev + 1) % scenes.length);
        setFading(false);
      }, 800);
    }, 7000);
    return () => clearInterval(intervalRef.current);
  }, []);

  const scrollToContact = () => {
    document.getElementById('contact-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section style={{ position: 'relative', height: '100vh', overflow: 'hidden', background: '#0a0a0a' }}>
      {/* Videos */}
      {scenes.map((scene, i) => (
        <video
          key={scene.src}
          autoPlay
          muted
          loop
          playsInline
          style={{
            position: 'absolute', inset: 0, width: '100%', height: '100%',
            objectFit: 'cover',
            opacity: i === current ? (fading ? 0 : 0.55) : 0,
            transition: 'opacity 0.8s ease',
            zIndex: 1,
          }}
          src={scene.src}
        />
      ))}

      {/* Overlay */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 2,
        background: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.1) 40%, rgba(0,0,0,0.6) 100%)',
      }} />

      {/* Location label */}
      <div style={{
        position: 'absolute', bottom: 80, left: 60, zIndex: 10,
        display: 'flex', alignItems: 'center', gap: 8,
      }}>
        <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#C9A84C', display: 'inline-block' }} />
        <span style={{ color: '#C9A84C', fontFamily: '"Cormorant Garamond", serif', fontSize: 13, letterSpacing: '0.15em', textTransform: 'uppercase' }}>
          {scenes[current].label}
        </span>
      </div>

      {/* Progress dots */}
      <div style={{ position: 'absolute', bottom: 80, right: 60, zIndex: 10, display: 'flex', gap: 8 }}>
        {scenes.map((_, i) => (
          <div key={i} style={{
            width: i === current ? 20 : 6, height: 6, borderRadius: 3,
            background: i === current ? '#C9A84C' : 'rgba(255,255,255,0.3)',
            transition: 'all 0.4s ease',
          }} />
        ))}
      </div>

      {/* Hero copy */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 5,
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        textAlign: 'center', padding: '0 24px',
      }}>
        <p style={{ color: '#C9A84C', fontFamily: '"Cormorant Garamond", serif', fontSize: 13, letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: 20 }}>
          Luxury Real Estate
        </p>
        <h1 style={{
          fontFamily: '"Cormorant Garamond", serif', fontWeight: 300,
          fontSize: 'clamp(52px, 8vw, 100px)', color: '#fff',
          lineHeight: 1.05, letterSpacing: '-0.02em', margin: '0 0 8px',
        }}>
          McQueen Realty
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.6)', fontFamily: '"Cormorant Garamond", serif', fontSize: 'clamp(16px, 2vw, 22px)', fontStyle: 'italic', marginBottom: 48 }}>
          Southern California's Premier Luxury Brokerage
        </p>
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center' }}>
          <a href="/buy" style={{
            padding: '14px 36px', background: '#C9A84C', color: '#0a0a0a',
            fontFamily: '"Cormorant Garamond", serif', fontSize: 15, fontWeight: 600,
            letterSpacing: '0.15em', textTransform: 'uppercase', textDecoration: 'none',
            transition: 'background 0.3s',
          }}>
            Buy
          </a>
          <a href="/sell" style={{
            padding: '14px 36px', background: 'transparent', color: '#fff',
            border: '1px solid rgba(255,255,255,0.5)',
            fontFamily: '"Cormorant Garamond", serif', fontSize: 15, fontWeight: 600,
            letterSpacing: '0.15em', textTransform: 'uppercase', textDecoration: 'none',
            transition: 'all 0.3s',
          }}>
            Sell
          </a>
          <button onClick={scrollToContact} style={{
            padding: '14px 36px', background: 'transparent', color: '#C9A84C',
            border: '1px solid #C9A84C',
            fontFamily: '"Cormorant Garamond", serif', fontSize: 15, fontWeight: 600,
            letterSpacing: '0.15em', textTransform: 'uppercase', cursor: 'pointer',
            transition: 'all 0.3s',
          }}>
            Schedule Showing
          </button>
        </div>
      </div>
    </section>
  );
}

/* ─── NAVBAR ─────────────────────────────────────────────── */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const scrollToContact = () => {
    document.getElementById('contact-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      padding: '0 40px',
      height: 72,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      background: scrolled ? 'rgba(10,10,10,0.96)' : 'transparent',
      backdropFilter: scrolled ? 'blur(12px)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(201,168,76,0.15)' : 'none',
      transition: 'all 0.4s ease',
    }}>
      {/* Logo */}
      <a href="/" style={{ textDecoration: 'none' }}>
        <span style={{
          fontFamily: '"Cormorant Garamond", serif',
          fontSize: 26,
          fontWeight: 600,
          color: '#C9A84C',
          letterSpacing: '0.05em',
        }}>
          McQueen Realty
        </span>
      </a>

      {/* Center nav links */}
      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        {[
          { label: 'Buy', href: '/buy' },
          { label: 'Sell', href: '/sell' },
          { label: 'About Us', href: '/about' },
        ].map(item => (
          <a key={item.label} href={item.href} style={{
            color: '#fff',
            fontFamily: '"Cormorant Garamond", serif',
            fontSize: 18,
            fontWeight: 500,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            textDecoration: 'none',
            padding: '6px 14px',
            transition: 'color 0.3s',
          }}
            onMouseEnter={e => e.target.style.color = '#C9A84C'}
            onMouseLeave={e => e.target.style.color = '#fff'}
          >
            {item.label}
          </a>
        ))}
      </div>

      {/* Right CTA */}
      <button onClick={scrollToContact} style={{
        padding: '10px 24px',
        background: 'transparent',
        border: '1px solid #C9A84C',
        color: '#C9A84C',
        fontFamily: '"Cormorant Garamond", serif',
        fontSize: 14,
        fontWeight: 600,
        letterSpacing: '0.15em',
        textTransform: 'uppercase',
        cursor: 'pointer',
        transition: 'all 0.3s',
      }}
        onMouseEnter={e => { e.target.style.background = '#C9A84C'; e.target.style.color = '#0a0a0a'; }}
        onMouseLeave={e => { e.target.style.background = 'transparent'; e.target.style.color = '#C9A84C'; }}
      >
        Schedule Showing
      </button>
    </nav>
  );
}

/* ─── STATS / EST BADGE ──────────────────────────────────── */
function StatsBar() {
  return (
    <div style={{ background: '#0d0d0d', borderBottom: '1px solid rgba(201,168,76,0.15)', padding: '28px 60px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 24 }}>
        {[
          { value: 'EST. 2008', label: 'Established' },
          { value: '$2B+', label: 'Total Sales Volume' },
          { value: '500+', label: 'Homes Sold' },
          { value: '98%', label: 'Client Satisfaction' },
        ].map(stat => (
          <div key={stat.label} style={{ textAlign: 'center' }}>
            <div style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: 28, fontWeight: 600, color: '#C9A84C', letterSpacing: '0.05em' }}>
              {stat.value}
            </div>
            <div style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: 12, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.2em', textTransform: 'uppercase', marginTop: 4 }}>
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── WORLD OF MCQUEEN ───────────────────────────────────── */
function WorldOfMcQueen() {
  return (
    <section style={{ background: '#111', padding: '100px 60px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        {/* Heading */}
        <div style={{ textAlign: 'center', marginBottom: 70 }}>
          <p style={{ color: '#C9A84C', fontFamily: '"Cormorant Garamond", serif', fontSize: 13, letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: 16 }}>
            The Experience
          </p>
          <h2 style={{ fontFamily: '"Cormorant Garamond", serif', fontWeight: 300, fontSize: 'clamp(36px, 5vw, 60px)', color: '#fff', margin: 0 }}>
            World of McQueen
          </h2>
          <div style={{ width: 60, height: 1, background: '#C9A84C', margin: '24px auto 0' }} />
        </div>

        {/* Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 2 }}>
          {[
            {
              title: 'Buyer Representation',
              desc: 'From initial search to closing day, we guide buyers through every step with expert market knowledge and dedicated advocacy.',
              icon: '🏡',
            },
            {
              title: 'Seller Strategy',
              desc: 'Precision pricing, luxury marketing, and curated exposure that consistently achieves top dollar for our clients\' properties.',
              icon: '📈',
            },
            {
              title: 'Off-Market Access',
              desc: 'Exclusive access to pocket listings and pre-market opportunities across Southern California's most coveted neighborhoods.',
              icon: '🔑',
            },
            {
              title: 'White Glove Service',
              desc: 'From staging and photography to concierge referrals, every detail is handled with discretion and care.',
              icon: '✨',
            },
          ].map(card => (
            <div key={card.title} style={{
              background: '#0d0d0d',
              padding: '48px 36px',
              borderTop: '2px solid #C9A84C',
              transition: 'background 0.3s',
            }}>
              <div style={{ fontSize: 32, marginBottom: 20 }}>{card.icon}</div>
              <h3 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: 22, color: '#fff', fontWeight: 500, marginBottom: 14 }}>
                {card.title}
              </h3>
              <p style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: 16, color: 'rgba(255,255,255,0.6)', lineHeight: 1.7, margin: 0 }}>
                {card.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── HOW WE SERVE ───────────────────────────────────────── */
function HowWeServe() {
  const items = [
    { title: 'Residential Sales', desc: 'Luxury single-family homes, estates, and condominiums across Southern California.' },
    { title: 'Investment Properties', desc: 'Multi-family and income-producing assets for discerning investors.' },
    { title: 'New Development', desc: 'Exclusive representation of new construction and developer projects.' },
    { title: 'Relocation Services', desc: 'Seamless transitions for corporate and executive relocations.' },
    { title: 'Leasing', desc: 'Premium lease representation for luxury residential properties.' },
    { title: 'Market Analysis', desc: 'In-depth comparative market analysis and valuation consulting.' },
  ];

  return (
    <section style={{ background: '#0d0d0d', padding: '100px 60px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 70 }}>
          <p style={{ color: '#C9A84C', fontFamily: '"Cormorant Garamond", serif', fontSize: 13, letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: 16 }}>
            Our Expertise
          </p>
          <h2 style={{ fontFamily: '"Cormorant Garamond", serif', fontWeight: 300, fontSize: 'clamp(36px, 5vw, 60px)', color: '#fff', margin: 0 }}>
            How We Serve
          </h2>
          <div style={{ width: 60, height: 1, background: '#C9A84C', margin: '24px auto 0' }} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 40 }}>
          {items.map(item => (
            <div key={item.title} style={{ borderLeft: '2px solid #C9A84C', paddingLeft: 24 }}>
              <h3 style={{
                fontFamily: '"Cormorant Garamond", serif',
                fontSize: 22,
                color: '#fff',
                fontWeight: 500,
                marginBottom: 10,
              }}>
                {item.title}
              </h3>
              <p style={{
                fontFamily: '"Cormorant Garamond", serif',
                fontSize: 16,
                color: 'rgba(255,255,255,0.72)',
                lineHeight: 1.7,
                margin: 0,
              }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── PROPERTY SEARCH / MLS ──────────────────────────────── */
function PropertySearch() {
  return (
    <section style={{ background: '#0a0a0a', padding: '100px 60px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 50 }}>
          <p style={{ color: '#C9A84C', fontFamily: '"Cormorant Garamond", serif', fontSize: 13, letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: 16 }}>
            Live MLS Listings · Southern California
          </p>
          <h2 style={{ fontFamily: '"Cormorant Garamond", serif', fontWeight: 300, fontSize: 'clamp(36px, 5vw, 60px)', color: '#fff', margin: 0 }}>
            Property Search
          </h2>
          <div style={{ width: 60, height: 1, background: '#C9A84C', margin: '24px auto 0' }} />
        </div>

        <div style={{
          width: '100%',
          height: 700,
          border: '1px solid rgba(201,168,76,0.2)',
          borderRadius: 2,
          overflow: 'hidden',
        }}>
          <iframe
            src="https://www.mlslistings.com/search/idx?idx=Mjk1"
            title="McQueen Realty MLS Listings"
            width="100%"
            height="100%"
            frameBorder="0"
            style={{ display: 'block' }}
          />
        </div>
      </div>
    </section>
  );
}

/* ─── CONTACT / COMPANY INFO ─────────────────────────────── */
function ContactSection() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });

  const handleChange = e => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = e => {
    e.preventDefault();
    alert('Thank you! A McQueen Realty agent will be in touch shortly.');
    setForm({ name: '', email: '', phone: '', message: '' });
  };

  const inputStyle = {
    width: '100%',
    padding: '14px 16px',
    background: 'rgba(255,255,255,0.08)',
    border: '1px solid rgba(201,168,76,0.25)',
    color: '#000',
    fontFamily: '"Cormorant Garamond", serif',
    fontSize: 16,
    outline: 'none',
    boxSizing: 'border-box',
    transition: 'border-color 0.3s',
    borderRadius: 0,
  };

  return (
    <section id="contact-section" style={{ background: '#0a0a0a', padding: '100px 60px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 70 }}>
          <p style={{ color: '#C9A84C', fontFamily: '"Cormorant Garamond", serif', fontSize: 13, letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: 16 }}>
            Reach Out
          </p>
          <h2 style={{ fontFamily: '"Cormorant Garamond", serif', fontWeight: 300, fontSize: 'clamp(36px, 5vw, 60px)', color: '#fff', margin: 0 }}>
            Connect With Us
          </h2>
          <div style={{ width: 60, height: 1, background: '#C9A84C', margin: '24px auto 0' }} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80 }}>
          {/* ── Left: Company Info ── */}
          <div>
            <h3 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: 28, color: '#C9A84C', fontWeight: 400, marginBottom: 40 }}>
              McQueen Realty
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
              {/* Phone */}
              <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                <div style={{ width: 40, height: 40, border: '1px solid rgba(201,168,76,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="1.5">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.95 10.5a19.79 19.79 0 01-3.07-8.67A2 2 0 012.85 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L7.09 7.64a16 16 0 006.29 6.29l1.01-1.01a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                  </svg>
                </div>
                <div>
                  <p style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: 12, color: '#C9A84C', letterSpacing: '0.2em', textTransform: 'uppercase', margin: '0 0 4px' }}>Phone</p>
                  <p style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: 18, color: '#ffffff', margin: 0 }}>818.591.1600</p>
                </div>
              </div>

              {/* Email */}
              <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                <div style={{ width: 40, height: 40, border: '1px solid rgba(201,168,76,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="1.5">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </div>
                <div>
                  <p style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: 12, color: '#C9A84C', letterSpacing: '0.2em', textTransform: 'uppercase', margin: '0 0 4px' }}>Email</p>
                  <p style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: 18, color: '#ffffff', margin: 0 }}>info@mcqueenrealty.com</p>
                </div>
              </div>

              {/* Office */}
              <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                <div style={{ width: 40, height: 40, border: '1px solid rgba(201,168,76,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="1.5">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <div>
                  <p style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: 12, color: '#C9A84C', letterSpacing: '0.2em', textTransform: 'uppercase', margin: '0 0 4px' }}>Office</p>
                  <p style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: 18, color: '#ffffff', lineHeight: 1.5, margin: 0 }}>
                    28047 DOROTHY DR UNIT 303<br />
                    AGOURA HILLS, CA 91301
                  </p>
                </div>
              </div>

              {/* DRE */}
              <div style={{ marginTop: 16, paddingTop: 24, borderTop: '1px solid rgba(201,168,76,0.15)' }}>
                <p style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: 13, color: 'rgba(255,255,255,0.4)', margin: 0 }}>
                  DRE Licensed · Equal Housing Opportunity
                </p>
              </div>
            </div>
          </div>

          {/* ── Right: Contact Form ── */}
          <div>
            <h3 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: 24, color: '#fff', fontWeight: 400, marginBottom: 32 }}>
              Schedule a Showing
            </h3>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div>
                  <label style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: 12, color: '#C9A84C', letterSpacing: '0.2em', textTransform: 'uppercase', display: 'block', marginBottom: 8 }}>
                    Full Name
                  </label>
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    style={{ ...inputStyle, color: '#000', backgroundColor: '#f5f5f0' }}
                  />
                </div>
                <div>
                  <label style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: 12, color: '#C9A84C', letterSpacing: '0.2em', textTransform: 'uppercase', display: 'block', marginBottom: 8 }}>
                    Phone
                  </label>
                  <input
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="Your phone"
                    style={{ ...inputStyle, color: '#000', backgroundColor: '#f5f5f0' }}
                  />
                </div>
              </div>
              <div>
                <label style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: 12, color: '#C9A84C', letterSpacing: '0.2em', textTransform: 'uppercase', display: 'block', marginBottom: 8 }}>
                  Email Address
                </label>
                <input
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  style={{ ...inputStyle, color: '#000', backgroundColor: '#f5f5f0' }}
                />
              </div>
              <div>
                <label style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: 12, color: '#C9A84C', letterSpacing: '0.2em', textTransform: 'uppercase', display: 'block', marginBottom: 8 }}>
                  Message
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Tell us about the property you're interested in..."
                  rows={5}
                  style={{ ...inputStyle, color: '#000', backgroundColor: '#f5f5f0', resize: 'vertical' }}
                />
              </div>
              <button type="submit" style={{
                padding: '16px 32px',
                background: '#C9A84C',
                border: 'none',
                color: '#0a0a0a',
                fontFamily: '"Cormorant Garamond", serif',
                fontSize: 15,
                fontWeight: 700,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                transition: 'background 0.3s',
                alignSelf: 'flex-start',
              }}
                onMouseEnter={e => e.target.style.background = '#b8963e'}
                onMouseLeave={e => e.target.style.background = '#C9A84C'}
              >
                Send Inquiry
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── FOOTER ─────────────────────────────────────────────── */
function Footer() {
  return (
    <footer style={{ background: '#080808', borderTop: '1px solid rgba(201,168,76,0.1)', padding: '40px 60px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 20 }}>
        <div>
          <p style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: 20, color: '#C9A84C', margin: '0 0 6px', fontWeight: 600 }}>
            McQueen Realty
          </p>
          <p style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: 13, color: 'rgba(255,255,255,0.35)', margin: 0 }}>
            © {new Date().getFullYear()} McQueen Realty. All rights reserved.
          </p>
        </div>
        <div style={{ display: 'flex', gap: 32 }}>
          {['Buy', 'Sell', 'About Us', 'Listings'].map(link => (
            <a key={link} href={`/${link.toLowerCase().replace(' ', '-')}`} style={{
              fontFamily: '"Cormorant Garamond", serif',
              fontSize: 14,
              color: 'rgba(255,255,255,0.4)',
              textDecoration: 'none',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              transition: 'color 0.3s',
            }}
              onMouseEnter={e => e.target.style.color = '#C9A84C'}
              onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.4)'}
            >
              {link}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

/* ─── PAGE ───────────────────────────────────────────────── */
export default function Home() {
  return (
    <main style={{ background: '#0a0a0a', minHeight: '100vh' }}>
      <Navbar />
      <VideoHero />
      <StatsBar />
      {/* World of McQueen ABOVE Property Search */}
      <WorldOfMcQueen />
      <PropertySearch />
      <HowWeServe />
      <ContactSection />
      <Footer />
    </main>
  );
}
