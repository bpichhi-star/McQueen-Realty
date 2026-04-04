const featuredListings = [
  {
    title: 'Modern Hillside Retreat',
    location: 'Beverly Hills, CA',
    price: '$6,850,000',
    specs: '5 Beds · 6 Baths · 5,240 Sq Ft',
    image:
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1400&q=80',
  },
  {
    title: 'Coastal Contemporary',
    location: 'Malibu, CA',
    price: '$9,200,000',
    specs: '4 Beds · 5 Baths · 4,780 Sq Ft',
    image:
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=80',
  },
  {
    title: 'Private Estate Residence',
    location: 'Pacific Palisades, CA',
    price: '$7,495,000',
    specs: '6 Beds · 7 Baths · 6,120 Sq Ft',
    image:
      'https://images.unsplash.com/photo-1600573472592-401b489a3cdc?auto=format&fit=crop&w=1400&q=80',
  },
]

const neighborhoods = [
  'Beverly Hills',
  'Brentwood',
  'Pacific Palisades',
  'Santa Monica',
  'Malibu',
  'West Hollywood',
]

const testimonials = [
  {
    quote:
      'They made the entire process feel discreet, strategic, and completely tailored to us. Every detail was handled beautifully.',
    name: 'Olivia & Marcus K.',
  },
  {
    quote:
      'The local knowledge, presentation, and negotiation were exceptional. We felt represented at a completely different level.',
    name: 'Danielle R.',
  },
  {
    quote:
      'From staging to closing, the experience felt elevated and effortless. We would work with this team again without hesitation.',
    name: 'James T.',
  },
]

function sectionHeading(eyebrow: string, title: string, description?: string) {
  return (
    <div style={{ maxWidth: 760 }}>
      <div style={{ fontSize: 12, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#a8a29e' }}>
        {eyebrow}
      </div>
      <h2 style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', fontWeight: 300, lineHeight: 1.05, margin: '14px 0 0' }}>
        {title}
      </h2>
      {description ? (
        <p style={{ marginTop: 24, color: '#d6d3d1', lineHeight: 1.8, fontSize: 16 }}>{description}</p>
      ) : null}
    </div>
  )
}

export default function Page() {
  return (
    <main>
      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 40,
          backdropFilter: 'blur(18px)',
          background: 'rgba(15, 12, 10, 0.78)',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
        }}
      >
        <div
          style={{
            maxWidth: 1280,
            margin: '0 auto',
            padding: '18px 24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 20,
          }}
        >
          <div>
            <div style={{ fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.35em', color: '#a8a29e' }}>
              McQueen Realty
            </div>
            <div style={{ fontSize: 18, fontWeight: 300, letterSpacing: '0.16em' }}>Luxury Real Estate</div>
          </div>
          <nav style={{ display: 'flex', gap: 28, color: '#d6d3d1', fontSize: 14, flexWrap: 'wrap', justifyContent: 'center' }}>
            <a href="#listings">Listings</a>
            <a href="#communities">Communities</a>
            <a href="#about">About</a>
            <a href="#journal">Journal</a>
            <a href="#contact">Contact</a>
          </nav>
          <a
            href="#contact"
            style={{
              border: '1px solid rgba(255,255,255,0.18)',
              borderRadius: 999,
              padding: '12px 18px',
              fontSize: 14,
              whiteSpace: 'nowrap',
            }}
          >
            Book a Consultation
          </a>
        </div>
      </header>

      <section
        style={{
          position: 'relative',
          minHeight: '86vh',
          backgroundImage:
            "linear-gradient(to bottom, rgba(0,0,0,0.52), rgba(0,0,0,0.25), #0f0c0a), url('https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1800&q=80')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div
          style={{
            maxWidth: 1280,
            margin: '0 auto',
            minHeight: '86vh',
            padding: '80px 24px 56px',
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1.25fr) minmax(320px, 430px)',
            gap: 32,
            alignItems: 'end',
          }}
        >
          <div style={{ maxWidth: 820 }}>
            <div
              style={{
                display: 'inline-flex',
                borderRadius: 999,
                padding: '10px 16px',
                fontSize: 12,
                letterSpacing: '0.28em',
                textTransform: 'uppercase',
                background: 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(255,255,255,0.14)',
                color: '#e7e5e4',
              }}
            >
              Refined representation across Los Angeles
            </div>
            <h1 style={{ fontSize: 'clamp(3.2rem, 8vw, 6.4rem)', fontWeight: 300, lineHeight: 1.02, margin: '24px 0 0' }}>
              A cinematic real estate experience for exceptional homes.
            </h1>
            <p style={{ marginTop: 24, maxWidth: 650, color: '#e7e5e4', lineHeight: 1.8, fontSize: 18 }}>
              Luxury service, local expertise, and beautifully presented listings for buyers,
              sellers, and investors who expect more.
            </p>
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginTop: 36 }}>
              <a href="#listings" style={{ background: '#fff', color: '#0f0c0a', borderRadius: 999, padding: '14px 22px', fontSize: 14, fontWeight: 500 }}>
                Explore Listings
              </a>
              <a href="#communities" style={{ border: '1px solid rgba(255,255,255,0.18)', borderRadius: 999, padding: '14px 22px', fontSize: 14 }}>
                View Communities
              </a>
            </div>
          </div>

          <div
            style={{
              borderRadius: 28,
              padding: 20,
              background: 'rgba(0,0,0,0.34)',
              border: '1px solid rgba(255,255,255,0.1)',
              boxShadow: '0 24px 80px rgba(0,0,0,0.35)',
              backdropFilter: 'blur(18px)',
            }}
          >
            <div style={{ marginBottom: 16, fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.28em', color: '#d6d3d1' }}>
              Start your search
            </div>
            <div style={{ display: 'grid', gap: 12 }}>
              <input placeholder="Neighborhood, address, or MLS #" style={fieldStyle(true)} />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <select style={fieldStyle()}><option>Price Range</option></select>
                <select style={fieldStyle()}><option>Property Type</option></select>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <select style={fieldStyle()}><option>Beds</option></select>
                <select style={fieldStyle()}><option>Baths</option></select>
              </div>
              <button style={{ border: 0, borderRadius: 18, padding: '14px 18px', background: '#fff', color: '#0f0c0a', fontWeight: 600, cursor: 'pointer' }}>
                Search Properties
              </button>
            </div>
          </div>
        </div>
      </section>

      <section style={{ borderTop: '1px solid rgba(255,255,255,0.08)', background: 'rgba(28,25,23,0.6)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '36px 24px', display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: 24, textAlign: 'center' }}>
          {[
            ['220+', 'Closed Transactions'],
            ['$420M', 'Career Sales Volume'],
            ['18', 'Years in Luxury Markets'],
            ['24/7', 'White-Glove Service'],
          ].map(([value, label]) => (
            <div key={label}>
              <div style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 300 }}>{value}</div>
              <div style={{ marginTop: 8, fontSize: 12, color: '#a8a29e', letterSpacing: '0.22em', textTransform: 'uppercase' }}>{label}</div>
            </div>
          ))}
        </div>
      </section>

      <section id="listings" style={{ maxWidth: 1280, margin: '0 auto', padding: '96px 24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', gap: 20, marginBottom: 40, flexWrap: 'wrap' }}>
          {sectionHeading('Featured portfolio', 'Curated listings with elevated presentation.')}
          <a href="#contact" style={{ border: '1px solid rgba(255,255,255,0.12)', borderRadius: 999, padding: '14px 20px', color: '#e7e5e4', fontSize: 14 }}>
            View All Properties
          </a>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 24 }}>
          {featuredListings.map((listing) => (
            <article key={listing.title} style={{ overflow: 'hidden', borderRadius: 28, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <img src={listing.image} alt={listing.title} style={{ width: '100%', height: 320, objectFit: 'cover', display: 'block' }} />
              <div style={{ padding: 24 }}>
                <div style={{ fontSize: 12, letterSpacing: '0.28em', textTransform: 'uppercase', color: '#a8a29e' }}>{listing.location}</div>
                <h3 style={{ margin: '14px 0 0', fontSize: 32, fontWeight: 300 }}>{listing.title}</h3>
                <div style={{ marginTop: 18, fontSize: 20 }}>{listing.price}</div>
                <div style={{ marginTop: 8, color: '#a8a29e', fontSize: 14 }}>{listing.specs}</div>
                <a href="#contact" style={{ display: 'inline-block', marginTop: 24, borderRadius: 999, border: '1px solid rgba(255,255,255,0.14)', padding: '10px 16px', fontSize: 14 }}>
                  View Details
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="communities" style={{ background: 'rgba(28,25,23,0.7)', padding: '96px 0' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px', display: 'grid', gridTemplateColumns: '0.95fr 1.05fr', gap: 48, alignItems: 'center' }}>
          <div>
            {sectionHeading(
              'Neighborhood expertise',
              'Discover the communities defining your next move.',
              'From quiet hillside enclaves to vibrant walkable neighborhoods, we position every search around lifestyle, access, architecture, and long-term value.'
            )}
            <a href="#contact" style={{ display: 'inline-block', marginTop: 28, background: '#fff', color: '#0f0c0a', borderRadius: 999, padding: '14px 22px', fontSize: 14, fontWeight: 600 }}>
              Browse Neighborhood Guides
            </a>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 16 }}>
            {neighborhoods.map((name, index) => (
              <div key={name} style={{ borderRadius: 24, padding: 24, border: '1px solid rgba(255,255,255,0.08)', background: 'linear-gradient(to bottom, rgba(255,255,255,0.09), rgba(255,255,255,0.04))' }}>
                <div style={{ fontSize: 12, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#78716c' }}>0{index + 1}</div>
                <div style={{ marginTop: 44, fontSize: 24, fontWeight: 300 }}>{name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="about" style={{ maxWidth: 1280, margin: '0 auto', padding: '96px 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'center' }}>
          <div style={{ position: 'relative' }}>
            <img
              src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1400&q=80"
              alt="Luxury home exterior"
              style={{ width: '100%', height: 560, objectFit: 'cover', borderRadius: 32, display: 'block' }}
            />
            <div style={{ position: 'absolute', left: 24, bottom: 24, maxWidth: 320, borderRadius: 24, padding: 20, background: 'rgba(0,0,0,0.42)', border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(16px)' }}>
              <div style={{ fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.28em', color: '#d6d3d1' }}>Private advisory</div>
              <div style={{ marginTop: 8, fontSize: 22, fontWeight: 300, lineHeight: 1.35 }}>
                A boutique office approach with world-class presentation.
              </div>
            </div>
          </div>
          <div>
            {sectionHeading(
              'About the office',
              'Designed to feel personal, polished, and deeply local.',
              'We pair luxury branding with sharp market strategy, helping clients navigate acquisitions, sales, investments, and relocations with confidence. Every campaign is tailored. Every property is positioned with intention.'
            )}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginTop: 32 }}>
              {['Luxury listing marketing', 'Private client advisory', 'Off-market opportunities', 'Relocation and investor strategy'].map((item) => (
                <div key={item} style={{ padding: 20, borderRadius: 22, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: '#e7e5e4' }}>
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="journal" style={{ background: 'rgba(28,25,23,0.7)', padding: '96px 0' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px' }}>
          <div style={{ marginBottom: 40 }}>{sectionHeading('Journal', 'Editorial content that builds authority.')}</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 24 }}>
            {[
              { title: 'What buyers are prioritizing in Westside luxury this season', category: 'Market Insight' },
              { title: 'The neighborhoods attracting relocation clients right now', category: 'Neighborhood Guide' },
              { title: 'How thoughtful presentation changes the sale trajectory', category: 'Seller Strategy' },
            ].map((post, idx) => (
              <article key={post.title} style={{ padding: 24, borderRadius: 28, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
                <div style={{ marginBottom: 110, fontSize: 12, letterSpacing: '0.28em', textTransform: 'uppercase', color: '#a8a29e' }}>
                  0{idx + 1} · {post.category}
                </div>
                <h3 style={{ fontSize: 30, fontWeight: 300, lineHeight: 1.2, margin: 0 }}>{post.title}</h3>
                <a href="#contact" style={{ display: 'inline-block', marginTop: 28, borderRadius: 999, border: '1px solid rgba(255,255,255,0.14)', padding: '10px 16px', fontSize: 14 }}>
                  Read Article
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section style={{ maxWidth: 1280, margin: '0 auto', padding: '96px 24px' }}>
        <div style={{ marginBottom: 40 }}>
          {sectionHeading('Client experience', 'Trusted by buyers and sellers who value discretion.')}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 24 }}>
          {testimonials.map((item) => (
            <article key={item.name} style={{ padding: 28, borderRadius: 28, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <p style={{ fontSize: 20, lineHeight: 1.8, color: '#e7e5e4', margin: 0 }}>“{item.quote}”</p>
              <div style={{ marginTop: 24, fontSize: 12, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#a8a29e' }}>{item.name}</div>
            </article>
          ))}
        </div>
      </section>

      <section id="contact" style={{ borderTop: '1px solid rgba(255,255,255,0.08)', background: '#f5f5f4', color: '#0f0c0a' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '96px 24px', display: 'grid', gridTemplateColumns: '0.95fr 1.05fr', gap: 48 }}>
          <div>
            {sectionHeading(
              'Let’s connect',
              'A tailored real estate experience begins with a conversation.',
              'Whether you are preparing to sell, beginning a search, or exploring investment opportunities, McQueen Realty is here to guide the next step.'
            )}
            <div style={{ marginTop: 32, display: 'grid', gap: 12, fontSize: 13, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#57534e' }}>
              <div>Los Angeles, California</div>
              <div>(310) 555-0198</div>
              <div>hello@mcqueenrealty.com</div>
            </div>
          </div>
          <form style={{ background: '#fff', padding: 32, borderRadius: 32, border: '1px solid #e7e5e4', boxShadow: '0 20px 60px rgba(0,0,0,0.08)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <input placeholder="First name" style={lightFieldStyle} />
              <input placeholder="Last name" style={lightFieldStyle} />
              <input placeholder="Email" style={{ ...lightFieldStyle, gridColumn: '1 / -1' }} />
              <input placeholder="Phone" style={{ ...lightFieldStyle, gridColumn: '1 / -1' }} />
              <select style={{ ...lightFieldStyle, gridColumn: '1 / -1' }}>
                <option>I’m interested in</option>
                <option>Buying</option>
                <option>Selling</option>
                <option>Investing</option>
                <option>Relocating</option>
              </select>
              <textarea placeholder="Tell us about your goals" style={{ ...lightFieldStyle, minHeight: 140, gridColumn: '1 / -1', resize: 'vertical' }} />
            </div>
            <button type="submit" style={{ marginTop: 20, border: 0, borderRadius: 999, padding: '14px 22px', background: '#0f0c0a', color: '#fff', fontWeight: 600 }}>
              Submit Inquiry
            </button>
          </form>
        </div>
      </section>
    </main>
  )
}

const commonField: React.CSSProperties = {
  width: '100%',
  borderRadius: 18,
  padding: '14px 16px',
  outline: 'none',
}

function fieldStyle(isInput = false): React.CSSProperties {
  return {
    ...commonField,
    border: '1px solid rgba(255,255,255,0.1)',
    background: 'rgba(255,255,255,0.08)',
    color: '#fff',
    appearance: 'none',
    ...(isInput ? {} : { cursor: 'pointer' }),
  }
}

const lightFieldStyle: React.CSSProperties = {
  ...commonField,
  border: '1px solid #e7e5e4',
  background: '#fff',
  color: '#0f0c0a',
}
