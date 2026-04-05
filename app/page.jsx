'use client';

import { useState, useEffect } from 'react';

/* ─── Data ─────────────────────────────────────── */
const listings = [
  {
    id: 1,
    address: '482 Sunset Ridge Drive',
    location: 'Beverly Hills, CA 90210',
    price: '$8,950,000',
    priceShort: '8.95M',
    beds: 6, baths: 7, sqft: '9,200',
    tag: 'Featured',
    accent: '#D4CCBF',
    img: 'linear-gradient(160deg, #DDD8CE 0%, #C8C0B2 100%)',
  },
  {
    id: 2,
    address: '17 Oceanfront Terrace',
    location: 'Malibu, CA 90265',
    price: '$12,500,000',
    priceShort: '12.5M',
    beds: 5, baths: 6, sqft: '7,800',
    tag: 'New',
    accent: '#CDD4CF',
    img: 'linear-gradient(160deg, #C9D2CC 0%, #B8C4BC 100%)',
  },
  {
    id: 3,
    address: '903 Canyon Crest Lane',
    location: 'Bel Air, CA 90077',
    price: '$6,250,000',
    priceShort: '6.25M',
    beds: 5, baths: 5, sqft: '6,400',
    tag: 'Exclusive',
    accent: '#D4CEC8',
    img: 'linear-gradient(160deg, #E0D8CE 0%, #CDBFB0 100%)',
  },
];

/* ─── Styles ────────────────────────────────────── */
const S = {
  // Eyebrow label
  label: {
    fontFamily: "'DM Sans', sans-serif",
    fontSize: '0.68rem',
    letterSpacing: '0.22em',
    textTransform: 'uppercase',
    color: 'var(--accent)',
    fontWeight: 500,
  },
  // Section heading
  h2: {
    fontFamily: "'Cormorant Garamond', serif",
    fontWeight: 300,
    lineHeight: 1.08,
    letterSpacing: '-0.02em',
    color: 'var(--ink)',
  },
  // Body text
  body: {
    fontFamily: "'DM Sans', sans-serif",
    fontSize: '0.92rem',
    lineHeight: 1.85,
    color: 'var(--ink-muted)',
  },
};

/* ─── Component ─────────────────────────────────── */
export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [hovered, setHovered] = useState(null);
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleForm = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh', overflowX: 'hidden' }}>

      {/* ═══════════════════════════════ NAV */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 3rem',
        height: '72px',
        background: scrolled ? 'rgba(250,250,248,0.95)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
        transition: 'all 0.4s ease',
      }}>
        {/* Logo */}
        <div style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontWeight: 400, fontSize: '1.15rem',
          letterSpacing: '0.18em', color: 'var(--ink)',
        }}>
          MCQUEEN
          <span style={{ color: 'var(--accent)', marginLeft: '0.15em' }}>REALTY</span>
        </div>

        {/* Links */}
        <div style={{ display: 'flex', gap: '2.5rem', alignItems: 'center' }}>
          {['Listings', 'Services', 'About', 'Contact'].map(item => (
            <a key={item} href={`#${item.toLowerCase()}`} style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '0.75rem', letterSpacing: '0.1em',
              color: 'var(--ink-muted)', textDecoration: 'none',
              transition: 'color 0.2s',
            }}
              onMouseEnter={e => e.target.style.color = 'var(--accent)'}
              onMouseLeave={e => e.target.style.color = 'var(--ink-muted)'}
            >
              {item}
            </a>
          ))}

          <a href="#contact" style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '0.72rem', letterSpacing: '0.12em',
            padding: '0.55rem 1.4rem',
            background: 'var(--accent)', color: 'var(--bg)',
            textDecoration: 'none', fontWeight: 500,
            transition: 'background 0.2s',
          }}
            onMouseEnter={e => e.target.style.background = 'var(--accent-hover)'}
            onMouseLeave={e => e.target.style.background = 'var(--accent)'}
          >
            Schedule Showing
          </a>
        </div>
      </nav>

      {/* ═══════════════════════════════ HERO — SPLIT */}
      <section style={{ display: 'flex', minHeight: '100vh', position: 'relative' }}>

        {/* Left panel */}
        <div style={{
          flex: '0 0 52%',
          display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
          padding: '0 4rem 6rem 3rem',
          position: 'relative', zIndex: 2,
        }}>
          {/* Thin top rule */}
          <div className="anim-fade-in d1" style={{
            position: 'absolute', top: '72px', left: '3rem', right: '4rem',
            height: '1px', background: 'var(--border)',
          }} />

          {/* Eyebrow */}
          <p className="anim-fade-up d2" style={{ ...S.label, marginBottom: '1.5rem' }}>
            Los Angeles · Beverly Hills · Malibu
          </p>

          {/* Headline */}
          <h1 className="anim-fade-up d3" style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 300, fontSize: 'clamp(3.5rem, 6vw, 6.5rem)',
            lineHeight: 0.98, letterSpacing: '-0.03em',
            color: 'var(--ink)', marginBottom: '2rem',
          }}>
            Homes of<br />
            <em style={{ fontStyle: 'italic', color: 'var(--accent)' }}>Rare</em><br />
            Distinction
          </h1>

          {/* Subtext */}
          <p className="anim-fade-up d4" style={{
            ...S.body, maxWidth: '380px', marginBottom: '3rem',
          }}>
            McQueen Realty represents the finest residential properties in 
            Southern California — acquired and sold with precision, discretion, 
            and uncompromising taste.
          </p>

          {/* CTAs */}
          <div className="anim-fade-up d5" style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <a href="#listings" style={{
              background: 'var(--ink)', color: 'var(--bg)',
              padding: '0.9rem 2rem', fontSize: '0.72rem', letterSpacing: '0.12em',
              textDecoration: 'none', fontFamily: "'DM Sans', sans-serif",
              fontWeight: 500, transition: 'background 0.2s',
            }}
              onMouseEnter={e => e.target.style.background = 'var(--accent)'}
              onMouseLeave={e => e.target.style.background = 'var(--ink)'}
            >
              VIEW LISTINGS
            </a>
            <a href="#about" style={{
              color: 'var(--ink-muted)', fontSize: '0.72rem', letterSpacing: '0.12em',
              textDecoration: 'none', fontFamily: "'DM Sans', sans-serif",
              display: 'flex', alignItems: 'center', gap: '0.5rem',
              borderBottom: '1px solid var(--border)', paddingBottom: '2px',
            }}>
              OUR STORY →
            </a>
          </div>
        </div>

        {/* Right panel — hero image area */}
        <div className="anim-scale-in d1" style={{
          flex: '0 0 48%',
          position: 'relative', overflow: 'hidden',
          background: 'linear-gradient(145deg, #DDD8CE 0%, #C8BFB0 60%, #B8AEAA 100%)',
        }}>
          {/* Overlay gradient blending into left panel */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to right, var(--bg) 0%, transparent 12%)',
            zIndex: 1,
          }} />
          {/* Photo placeholder label */}
          <div style={{
            position: 'absolute', bottom: '2rem', right: '2rem', zIndex: 2,
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '0.65rem', letterSpacing: '0.16em', color: 'rgba(17,17,16,0.35)',
          }}>
            HERO PHOTO
          </div>
          {/* Decorative tag */}
          <div style={{
            position: 'absolute', top: '50%', left: '50%',
            transform: 'translate(-50%,-50%)', zIndex: 2,
            textAlign: 'center',
          }}>
            <div style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: '5rem', fontWeight: 300, lineHeight: 1,
              color: 'rgba(17,17,16,0.08)', letterSpacing: '-0.04em',
            }}>
              MQ
            </div>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="anim-fade-in d6" style={{
          position: 'absolute', bottom: '2.5rem', left: '3rem',
          display: 'flex', alignItems: 'center', gap: '1rem', zIndex: 3,
        }}>
          <div style={{ width: '40px', height: '1px', background: 'var(--accent)' }} />
          <span style={{ ...S.label, color: 'var(--ink-faint)', fontSize: '0.6rem' }}>
            SCROLL TO EXPLORE
          </span>
        </div>
      </section>

      {/* ═══════════════════════════════ STATS STRIP */}
      <div style={{
        borderTop: '1px solid var(--border)',
        borderBottom: '1px solid var(--border)',
        padding: '2.5rem 3rem',
        display: 'flex', gap: '0', overflow: 'hidden',
      }}>
        {[
          { val: '$2.4B+', label: 'Closed Sales Volume' },
          { val: '340+',   label: 'Properties Represented' },
          { val: '10+',    label: 'Years of Excellence' },
          { val: '98%',    label: 'Client Satisfaction' },
        ].map(({ val, label }, i) => (
          <div key={i} style={{
            flex: 1,
            display: 'flex', flexDirection: 'column', gap: '0.35rem',
            paddingRight: '3rem',
            borderRight: i < 3 ? '1px solid var(--border)' : 'none',
            marginRight: i < 3 ? '3rem' : 0,
          }}>
            <div style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: '2.6rem', fontWeight: 300,
              color: 'var(--ink)', lineHeight: 1,
            }}>
              {val}
            </div>
            <div style={{ ...S.label, color: 'var(--ink-faint)', fontSize: '0.62rem' }}>
              {label}
            </div>
          </div>
        ))}
      </div>

      {/* ═══════════════════════════════ LISTINGS */}
      <section id="listings" style={{ padding: '7rem 3rem', maxWidth: '1300px', margin: '0 auto' }}>

        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '4rem' }}>
          <div>
            <p style={{ ...S.label, marginBottom: '0.75rem' }}>Curated Properties</p>
            <h2 style={{ ...S.h2, fontSize: 'clamp(2.2rem, 4vw, 3.5rem)' }}>Featured Listings</h2>
          </div>
          <a href="#contact" style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '0.72rem', letterSpacing: '0.1em',
            color: 'var(--ink-muted)', textDecoration: 'none',
            borderBottom: '1px solid var(--border)',
            paddingBottom: '2px', transition: 'color 0.2s',
          }}
            onMouseEnter={e => e.target.style.color = 'var(--accent)'}
            onMouseLeave={e => e.target.style.color = 'var(--ink-muted)'}
          >
            ALL PROPERTIES →
          </a>
        </div>

        {/* Feature card — large, editorial */}
        <div
          onMouseEnter={() => setHovered(1)}
          onMouseLeave={() => setHovered(null)}
          style={{
            display: 'flex', height: '480px', marginBottom: '1.5rem',
            border: '1px solid var(--border)',
            cursor: 'pointer', overflow: 'hidden',
            transition: 'border-color 0.3s',
            borderColor: hovered === 1 ? 'var(--accent)' : 'var(--border)',
          }}
        >
          {/* Image */}
          <div style={{
            flex: '0 0 60%', overflow: 'hidden',
            background: listings[0].img,
            position: 'relative', transition: 'transform 0.6s cubic-bezier(0.16,1,0.3,1)',
            transform: hovered === 1 ? 'scale(1.03)' : 'scale(1)',
          }}>
            <div style={{
              position: 'absolute', top: '1.5rem', left: '1.5rem',
              background: 'var(--accent)', color: 'var(--bg)',
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '0.6rem', letterSpacing: '0.16em', padding: '0.3rem 0.75rem',
            }}>
              {listings[0].tag.toUpperCase()}
            </div>
          </div>
          {/* Info */}
          <div style={{
            flex: 1, padding: '3rem', display: 'flex',
            flexDirection: 'column', justifyContent: 'space-between',
            background: 'var(--bg)',
          }}>
            <div>
              <p style={{ ...S.label, marginBottom: '1.25rem' }}>{listings[0].location}</p>
              <h3 style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 400, fontSize: '1.6rem', lineHeight: 1.2,
                marginBottom: '0.75rem',
              }}>
                {listings[0].address}
              </h3>
              <div style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: '2.4rem', fontWeight: 300,
                color: 'var(--accent)', lineHeight: 1,
              }}>
                {listings[0].price}
              </div>
            </div>
            <div>
              <div style={{
                display: 'flex', gap: '2rem',
                paddingTop: '1.5rem',
                borderTop: '1px solid var(--border)',
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '0.72rem', letterSpacing: '0.1em',
                color: 'var(--ink-muted)',
              }}>
                <span>{listings[0].beds} BED</span>
                <span>{listings[0].baths} BATH</span>
                <span>{listings[0].sqft} SF</span>
              </div>
              <div style={{ marginTop: '1.5rem' }}>
                <span style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '0.7rem', letterSpacing: '0.12em',
                  color: hovered === 1 ? 'var(--accent)' : 'var(--ink)',
                  borderBottom: '1px solid currentColor',
                  paddingBottom: '1px', transition: 'color 0.2s',
                }}>
                  INQUIRE ABOUT THIS PROPERTY →
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Two smaller cards */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
          {listings.slice(1).map((l, i) => (
            <div
              key={l.id}
              onMouseEnter={() => setHovered(l.id)}
              onMouseLeave={() => setHovered(null)}
              style={{
                border: '1px solid var(--border)',
                cursor: 'pointer', overflow: 'hidden',
                transition: 'border-color 0.3s',
                borderColor: hovered === l.id ? 'var(--accent)' : 'var(--border)',
              }}
            >
              {/* Image */}
              <div style={{
                height: '240px', background: l.img, overflow: 'hidden',
                position: 'relative',
                transition: 'transform 0.6s cubic-bezier(0.16,1,0.3,1)',
                transform: hovered === l.id ? 'scale(1.04)' : 'scale(1)',
              }}>
                <div style={{
                  position: 'absolute', top: '1rem', left: '1rem',
                  background: 'var(--ink)', color: 'var(--bg)',
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '0.58rem', letterSpacing: '0.16em',
                  padding: '0.25rem 0.65rem',
                }}>
                  {l.tag.toUpperCase()}
                </div>
              </div>
              {/* Info */}
              <div style={{ padding: '1.75rem' }}>
                <p style={{ ...S.label, marginBottom: '0.5rem' }}>{l.location}</p>
                <h3 style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontWeight: 400, fontSize: '1.2rem', marginBottom: '0.5rem',
                }}>
                  {l.address}
                </h3>
                <div style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: '1.8rem', fontWeight: 300,
                  color: 'var(--accent)', marginBottom: '1.25rem',
                }}>
                  {l.price}
                </div>
                <div style={{
                  display: 'flex', gap: '1.5rem',
                  paddingTop: '1rem', borderTop: '1px solid var(--border)',
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '0.7rem', letterSpacing: '0.1em',
                  color: 'var(--ink-muted)',
                }}>
                  <span>{l.beds} BED</span>
                  <span>{l.baths} BATH</span>
                  <span>{l.sqft} SF</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════ PULL QUOTE / MANIFESTO */}
      <section style={{
        padding: '7rem 3rem',
        borderTop: '1px solid var(--border)',
        display: 'flex', gap: '6rem', alignItems: 'flex-start',
        maxWidth: '1300px', margin: '0 auto',
      }}>
        <div style={{ flex: '0 0 2px', alignSelf: 'stretch' }}>
          <div style={{ width: '2px', height: '100%', background: 'var(--accent)', minHeight: '160px' }} />
        </div>
        <div style={{ flex: 1 }}>
          <p style={{ ...S.label, marginBottom: '2rem' }}>Our Philosophy</p>
          <blockquote style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 300, fontStyle: 'italic',
            fontSize: 'clamp(2rem, 3.5vw, 3rem)',
            lineHeight: 1.2, letterSpacing: '-0.01em',
            color: 'var(--ink)', marginBottom: '2.5rem',
            maxWidth: '700px',
          }}>
            "Every exceptional home has a story. Our role is to find the right 
            person to continue it."
          </blockquote>
          <p style={{ ...S.body, maxWidth: '500px' }}>
            Founded in 2015, McQueen Realty was built on a belief that luxury 
            real estate demands more than market knowledge — it demands artistry, 
            patience, and an unwavering commitment to the client's vision.
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════ SERVICES */}
      <section id="services" style={{
        borderTop: '1px solid var(--border)',
        background: 'var(--ink)',
        padding: '7rem 3rem',
      }}>
        <div style={{ maxWidth: '1300px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '5rem' }}>
            <h2 style={{
              ...S.h2, color: 'var(--bg)',
              fontSize: 'clamp(2.2rem, 4vw, 3.5rem)',
            }}>
              How We Serve<br />
              <em style={{ fontStyle: 'italic' }}>Our Clients</em>
            </h2>
            <p style={{ ...S.body, color: 'rgba(250,250,248,0.45)', maxWidth: '260px', textAlign: 'right' }}>
              A bespoke approach at every stage of the transaction.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0' }}>
            {[
              {
                num: '01',
                title: 'Buyer Representation',
                desc: 'We guide discerning buyers through the acquisition of extraordinary properties — from private previews to negotiation and close.',
              },
              {
                num: '02',
                title: 'Seller Advisory',
                desc: 'Strategic pricing, editorial marketing, and access to our global network of qualified buyers at every price point.',
              },
              {
                num: '03',
                title: 'Portfolio & Investment',
                desc: 'Identify high-value residential opportunities and build a real estate portfolio positioned for long-term appreciation.',
              },
            ].map(({ num, title, desc }, i) => (
              <div key={i} style={{
                padding: '3rem 3rem 3rem 0',
                borderLeft: i > 0 ? '1px solid rgba(250,250,248,0.1)' : 'none',
                paddingLeft: i > 0 ? '3rem' : 0,
              }}>
                <div style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: '4rem', fontWeight: 300, lineHeight: 1,
                  color: 'rgba(250,250,248,0.12)', marginBottom: '1.5rem',
                }}>
                  {num}
                </div>
                <h3 style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: '1.4rem', fontWeight: 400,
                  color: 'var(--bg)', marginBottom: '1rem', lineHeight: 1.2,
                }}>
                  {title}
                </h3>
                <p style={{ ...S.body, color: 'rgba(250,250,248,0.5)' }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════ ABOUT */}
      <section id="about" style={{
        padding: '7rem 3rem',
        display: 'flex', gap: '8rem', alignItems: 'center',
        maxWidth: '1300px', margin: '0 auto',
      }}>
        {/* Photo placeholder */}
        <div style={{
          flex: '0 0 44%', height: '560px',
          background: 'linear-gradient(150deg, #E0D9CE 0%, #CCC2B4 100%)',
          position: 'relative',
        }}>
          <div style={{
            position: 'absolute', bottom: '0', right: '-1.5rem',
            background: 'var(--bg)', border: '1px solid var(--border)',
            padding: '1.5rem 2rem',
          }}>
            <div style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: '2rem', fontWeight: 300,
              color: 'var(--accent)', lineHeight: 1,
            }}>
              Est. 2015
            </div>
            <div style={{ ...S.label, color: 'var(--ink-muted)', marginTop: '0.35rem' }}>
              Beverly Hills
            </div>
          </div>
        </div>

        {/* Text */}
        <div style={{ flex: 1 }}>
          <p style={{ ...S.label, marginBottom: '1rem' }}>About McQueen Realty</p>
          <h2 style={{
            ...S.h2, fontSize: 'clamp(2rem, 3.5vw, 3rem)',
            marginBottom: '2rem',
          }}>
            A Standard Built<br />
            <em style={{ fontStyle: 'italic' }}>on Trust</em>
          </h2>
          <p style={{ ...S.body, marginBottom: '1.5rem' }}>
            McQueen Realty was founded on a single conviction: every client — 
            whether purchasing their first estate or expanding a multi-property 
            portfolio — deserves the same caliber of attention and strategy.
          </p>
          <p style={{ ...S.body, marginBottom: '3rem' }}>
            Our team combines deep regional market knowledge with a genuine 
            passion for architecture and design. Every transaction is handled 
            with discretion, precision, and genuine investment in the outcome.
          </p>
          <a href="#contact" style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '0.72rem', letterSpacing: '0.12em',
            color: 'var(--accent)', textDecoration: 'none',
            borderBottom: '1px solid var(--accent)',
            paddingBottom: '2px', fontWeight: 500,
          }}>
            WORK WITH US →
          </a>
        </div>
      </section>

      {/* ═══════════════════════════════ CONTACT */}
      <section id="contact" style={{
        borderTop: '1px solid var(--border)',
        padding: '7rem 3rem',
        background: '#F2EFE9',
      }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <p style={{ ...S.label, marginBottom: '1rem' }}>Begin the Conversation</p>
          <h2 style={{
            ...S.h2, fontSize: 'clamp(2rem, 4vw, 3rem)',
            marginBottom: '0.75rem',
          }}>
            We'd Love to<br />
            <em style={{ fontStyle: 'italic' }}>Hear From You</em>
          </h2>
          <p style={{ ...S.body, marginBottom: '3.5rem' }}>
            Whether buying, selling, or simply exploring — our team responds 
            within 24 hours.
          </p>

          {sent ? (
            <div style={{
              padding: '3rem', border: '1px solid var(--border)',
              textAlign: 'center', background: 'var(--bg)',
            }}>
              <div style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: '1.6rem', fontWeight: 400,
                color: 'var(--accent)', marginBottom: '0.5rem',
              }}>
                Thank You
              </div>
              <p style={S.body}>We'll be in touch shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleForm} style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
              {[
                { name: 'name',  label: 'Your Name',       type: 'text'  },
                { name: 'email', label: 'Email Address',   type: 'email' },
              ].map(({ name, label, type }) => (
                <div key={name} style={{
                  borderBottom: '1px solid var(--border)',
                  padding: '1.25rem 0', marginBottom: '0',
                  position: 'relative',
                }}>
                  <label style={{
                    ...S.label, fontSize: '0.6rem',
                    color: 'var(--ink-faint)', display: 'block', marginBottom: '0.4rem',
                  }}>
                    {label.toUpperCase()}
                  </label>
                  <input
                    type={type} name={name} required
                    value={form[name]}
                    onChange={e => setForm({ ...form, [name]: e.target.value })}
                    style={{
                      width: '100%', background: 'transparent', border: 'none',
                      outline: 'none', fontFamily: "'DM Sans', sans-serif",
                      fontSize: '1rem', color: 'var(--ink)',
                    }}
                  />
                </div>
              ))}

              <div style={{ borderBottom: '1px solid var(--border)', padding: '1.25rem 0', marginBottom: '2.5rem' }}>
                <label style={{ ...S.label, fontSize: '0.6rem', color: 'var(--ink-faint)', display: 'block', marginBottom: '0.4rem' }}>
                  MESSAGE
                </label>
                <textarea
                  name="message" required rows={4}
                  value={form.message}
                  onChange={e => setForm({ ...form, message: e.target.value })}
                  style={{
                    width: '100%', background: 'transparent', border: 'none',
                    outline: 'none', fontFamily: "'DM Sans', sans-serif",
                    fontSize: '1rem', color: 'var(--ink)', resize: 'none',
                  }}
                />
              </div>

              <button type="submit" style={{
                background: 'var(--ink)', color: 'var(--bg)',
                border: 'none', padding: '1.1rem',
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '0.72rem', letterSpacing: '0.14em',
                fontWeight: 500, cursor: 'pointer',
                transition: 'background 0.2s',
              }}
                onMouseEnter={e => e.target.style.background = 'var(--accent)'}
                onMouseLeave={e => e.target.style.background = 'var(--ink)'}
              >
                SEND INQUIRY
              </button>
            </form>
          )}
        </div>
      </section>

      {/* ═══════════════════════════════ FOOTER */}
      <footer style={{
        borderTop: '1px solid var(--border)',
        padding: '2.5rem 3rem',
        display: 'flex', alignItems: 'center',
        justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap',
      }}>
        <div style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontWeight: 400, fontSize: '1rem',
          letterSpacing: '0.16em', color: 'var(--ink)',
        }}>
          MCQUEEN <span style={{ color: 'var(--accent)' }}>REALTY</span>
        </div>
        <div style={{ display: 'flex', gap: '2.5rem', alignItems: 'center' }}>
          {['Privacy', 'Terms', 'DRE #01234567'].map((item, i) => (
            <span key={i} style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '0.68rem', color: 'var(--ink-faint)',
              letterSpacing: '0.06em',
            }}>
              {item}
            </span>
          ))}
        </div>
        <div style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: '0.68rem', color: 'var(--ink-faint)',
        }}>
          © {new Date().getFullYear()} McQueen Realty. All rights reserved.
        </div>
      </footer>

    </div>
  );
}
