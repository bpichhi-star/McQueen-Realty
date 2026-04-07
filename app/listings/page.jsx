'use client';
import { useState, useEffect, useRef, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

const BASE_IDX = 'https://matrix.crmls.org/Matrix/public/IDX.aspx?idx=eefc378c';

const LOCATIONS = [
  { label: 'Los Angeles County', slug: '' },
  { label: 'Beverly Hills',       slug: 'Beverly Hills' },
  { label: 'Bel Air',             slug: 'Bel Air' },
  { label: 'Malibu',              slug: 'Malibu' },
  { label: 'Santa Monica',        slug: 'Santa Monica' },
  { label: 'Pacific Palisades',   slug: 'Pacific Palisades' },
  { label: 'Brentwood',           slug: 'Brentwood' },
  { label: 'West Hollywood',      slug: 'West Hollywood' },
  { label: 'Hollywood Hills',     slug: 'Hollywood Hills' },
  { label: 'Holmby Hills',        slug: 'Holmby Hills' },
  { label: 'Trousdale Estates',   slug: 'Trousdale Estates' },
  { label: 'Westwood',            slug: 'Westwood' },
  { label: 'Culver City',         slug: 'Culver City' },
  { label: 'Marina Del Rey',      slug: 'Marina Del Rey' },
  { label: 'Venice',              slug: 'Venice' },
  { label: 'Playa Vista',         slug: 'Playa Vista' },
  { label: 'El Segundo',          slug: 'El Segundo' },
  { label: 'Manhattan Beach',     slug: 'Manhattan Beach' },
  { label: 'Hermosa Beach',       slug: 'Hermosa Beach' },
  { label: 'Redondo Beach',       slug: 'Redondo Beach' },
  { label: 'Palos Verdes Estates',slug: 'Palos Verdes Estates' },
  { label: 'Rancho Palos Verdes', slug: 'Rancho Palos Verdes' },
  { label: 'Long Beach',          slug: 'Long Beach' },
  { label: 'Pasadena',            slug: 'Pasadena' },
  { label: 'Glendale',            slug: 'Glendale' },
  { label: 'Burbank',             slug: 'Burbank' },
  { label: 'Silver Lake',         slug: 'Silver Lake' },
  { label: 'Los Feliz',           slug: 'Los Feliz' },
  { label: 'Echo Park',           slug: 'Echo Park' },
  { label: 'Hancock Park',        slug: 'Hancock Park' },
  { label: 'Koreatown',           slug: 'Koreatown' },
  { label: 'Mid-Wilshire',        slug: 'Mid-Wilshire' },
];

const MIN_PRICES = [
  { label: 'No min',  value: '' },
  { label: '$200K',   value: '200000' },
  { label: '$300K',   value: '300000' },
  { label: '$500K',   value: '500000' },
  { label: '$750K',   value: '750000' },
  { label: '$1M',     value: '1000000' },
  { label: '$1.5M',   value: '1500000' },
  { label: '$2M',     value: '2000000' },
  { label: '$3M',     value: '3000000' },
  { label: '$5M',     value: '5000000' },
];
const MAX_PRICES = [
  { label: 'No max',  value: '' },
  { label: '$500K',   value: '500000' },
  { label: '$750K',   value: '750000' },
  { label: '$1M',     value: '1000000' },
  { label: '$1.5M',   value: '1500000' },
  { label: '$2M',     value: '2000000' },
  { label: '$3M',     value: '3000000' },
  { label: '$5M',     value: '5000000' },
  { label: '$7.5M',   value: '7500000' },
  { label: '$10M+',   value: '10000000' },
];
const BED_OPTIONS  = ['', '1', '2', '3', '4', '5'];
const BATH_OPTIONS = ['', '1', '2', '3', '4'];
const TYPE_MAP = { SFR:'House', CONDO:'Condo/Co-op', TWNHS:'Townhouse', MLTRES:'Multi-family' };

function buildIdxUrl({ city, minPrice, maxPrice, minBeds, minBaths, propType }) {
  let url = BASE_IDX;
  if (city)     url += `&City=${encodeURIComponent(city)}`;
  if (minPrice) url += `&lp=${minPrice}`;
  if (maxPrice) url += `&hp=${maxPrice}`;
  if (minBeds)  url += `&bd=${minBeds}`;
  if (minBaths) url += `&ba=${minBaths}`;
  if (propType) url += `&pt=${propType}`;
  return url;
}

function priceSummary(min, max) {
  const mn = MIN_PRICES.find(p => p.value === min)?.label;
  const mx = MAX_PRICES.find(p => p.value === max)?.label;
  if (!min && !max) return 'Price';
  if (min && !max) return `${mn}+`;
  if (!min && max) return `Up to ${mx}`;
  return `${mn} – ${mx}`;
}

const BTN = ({ active, onClick, children }) => (
  <button onClick={onClick} style={{
    display: 'flex', alignItems: 'center', gap: '0.35rem',
    padding: '0 0.9rem', height: '36px',
    border: active ? '1.5px solid #C4A35A' : '1px solid #D0CEC8',
    background: active ? '#FBF7EF' : '#fff',
    cursor: 'pointer', whiteSpace: 'nowrap',
    fontSize: '0.73rem', fontFamily: "'Jost', sans-serif",
    fontWeight: active ? 500 : 400, color: active ? '#111' : '#333',
    letterSpacing: '0.02em', transition: 'border-color 0.15s',
  }}>
    {children}
    <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="6 9 12 15 18 9"/></svg>
  </button>
);

const DropPanel = ({ children }) => (
  <div style={{
    position: 'absolute', top: 'calc(100% + 6px)', left: 0,
    background: '#fff', border: '1px solid #D0CEC8',
    boxShadow: '0 6px 24px rgba(0,0,0,0.10)', zIndex: 300, minWidth: '160px',
  }}>
    {children}
  </div>
);

const DropRow = ({ selected, onClick, children }) => (
  <div onClick={onClick} style={{
    padding: '0.5rem 1rem', cursor: 'pointer',
    fontSize: '0.78rem', fontFamily: "'Jost', sans-serif",
    color: selected ? '#111' : '#444',
    background: selected ? '#FBF7EF' : 'transparent',
    fontWeight: selected ? 500 : 400,
  }}
  onMouseEnter={e => { if (!selected) e.currentTarget.style.background = '#F5F3EF'; }}
  onMouseLeave={e => { if (!selected) e.currentTarget.style.background = 'transparent'; }}>
    {children}
  </div>
);

function ListingsContent() {
  const searchParams = useSearchParams();
  const rawQ = searchParams.get('q') || '';
  const matched = LOCATIONS.find(l => l.label.toLowerCase() === rawQ.toLowerCase());

  const [filters, setFilters] = useState({
    city:          matched?.slug ?? (rawQ || ''),
    locationLabel: matched?.label ?? (rawQ || 'Los Angeles County'),
    minPrice: '', maxPrice: '',
    minBeds: '', minBaths: '',
    propType: '',
  });
  const [idxUrl, setIdxUrl]   = useState(() => buildIdxUrl({
    city:          matched?.slug ?? (rawQ || ''),
    minPrice: '', maxPrice: '', minBeds: '', minBaths: '', propType: '',
  }));
  const [open, setOpen]       = useState(null);
  const [locSearch, setLocSearch] = useState('');

  const apply = (patch) => {
    const next = { ...filters, ...patch };
    setFilters(next);
    setIdxUrl(buildIdxUrl(next));
    setOpen(null);
  };

  const filteredLocs = locSearch
    ? LOCATIONS.filter(l => l.label.toLowerCase().includes(locSearch.toLowerCase()))
    : LOCATIONS;

  const hasFilters = filters.minPrice || filters.maxPrice || filters.minBeds || filters.minBaths || filters.propType;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Jost:wght@300;400;500;600&family=Barlow+Condensed:wght@700;800;900&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html, body { height: 100%; overflow: hidden; }
        select { appearance: none; -webkit-appearance: none; background: #fff; cursor: pointer; }
      `}</style>

      <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden', fontFamily: "'Jost', sans-serif" }}>

        {/* ── NAV ── */}
        <nav style={{ flexShrink: 0, display: 'flex', alignItems: 'center', padding: '0 2rem', height: '60px', background: '#0D0D0D', borderBottom: '1px solid rgba(255,255,255,0.07)', position: 'relative', zIndex: 100 }}>
          <Link href="/" style={{ textDecoration: 'none', fontFamily: "'Jost', sans-serif", fontWeight: 600, fontSize: '0.76rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#fff' }}>
            McQueen<span style={{ color: '#C4A35A' }}>·</span>Realty
          </Link>
          <div style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', fontSize: '0.58rem', letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.38)', fontWeight: 400 }}>
            Property Search
          </div>
          <div style={{ display: 'flex', gap: '1.6rem', alignItems: 'center', marginLeft: 'auto' }}>
            {[['Home', '/'], ['About', '/#about'], ['Contact', '/#contact']].map(([l, h]) => (
              <Link key={l} href={h} style={{ fontSize: '0.7rem', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.58)', textDecoration: 'none' }}>{l}</Link>
            ))}
            <Link href="/#contact" style={{ background: '#C4A35A', color: '#fff', fontSize: '0.67rem', letterSpacing: '0.12em', padding: '0.42rem 1.1rem', textDecoration: 'none', fontWeight: 500, textTransform: 'uppercase' }}>
              Schedule Showing
            </Link>
          </div>
        </nav>

        {/* ── FILTER BAR ── */}
        <div style={{ flexShrink: 0, display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0 2rem', height: '56px', background: '#FAFAF8', borderBottom: '1px solid #E2E0DA', position: 'relative', zIndex: 90 }}>

          {/* Location */}
          <div style={{ position: 'relative' }}>
            <BTN active={open === 'loc' || filters.city !== ''} onClick={() => setOpen(open === 'loc' ? null : 'loc')}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
              {filters.locationLabel}
            </BTN>
            {open === 'loc' && (
              <DropPanel>
                <div style={{ padding: '0.5rem' }}>
                  <input autoFocus placeholder="Search area..." value={locSearch}
                    onChange={e => setLocSearch(e.target.value)}
                    style={{ width: '220px', border: '1px solid #D0CEC8', padding: '0.35rem 0.65rem', fontSize: '0.75rem', fontFamily: "'Jost', sans-serif", outline: 'none', background: '#fff' }}
                  />
                </div>
                <div style={{ maxHeight: '220px', overflowY: 'auto' }}>
                  {filteredLocs.map(loc => (
                    <DropRow key={loc.label} selected={filters.locationLabel === loc.label}
                      onClick={() => { apply({ city: loc.slug, locationLabel: loc.label }); setLocSearch(''); }}>
                      {loc.label}
                    </DropRow>
                  ))}
                </div>
              </DropPanel>
            )}
          </div>

          <div style={{ width: '1px', height: '20px', background: '#D0CEC8', flexShrink: 0 }} />

          {/* Price */}
          <div style={{ position: 'relative' }}>
            <BTN active={open === 'price' || !!(filters.minPrice || filters.maxPrice)} onClick={() => setOpen(open === 'price' ? null : 'price')}>
              {priceSummary(filters.minPrice, filters.maxPrice)}
            </BTN>
            {open === 'price' && (
              <DropPanel>
                <div style={{ padding: '0.9rem 0.9rem 0.7rem', width: '280px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.6rem', marginBottom: '0.8rem' }}>
                    <div>
                      <div style={{ fontSize: '0.58rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#999', marginBottom: '0.3rem' }}>Min</div>
                      <select value={filters.minPrice} onChange={e => setFilters(p => ({ ...p, minPrice: e.target.value }))}
                        style={{ width: '100%', padding: '0.38rem 0.5rem', border: '1px solid #D0CEC8', fontSize: '0.75rem', fontFamily: "'Jost', sans-serif", outline: 'none' }}>
                        {MIN_PRICES.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                      </select>
                    </div>
                    <div>
                      <div style={{ fontSize: '0.58rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#999', marginBottom: '0.3rem' }}>Max</div>
                      <select value={filters.maxPrice} onChange={e => setFilters(p => ({ ...p, maxPrice: e.target.value }))}
                        style={{ width: '100%', padding: '0.38rem 0.5rem', border: '1px solid #D0CEC8', fontSize: '0.75rem', fontFamily: "'Jost', sans-serif", outline: 'none' }}>
                        {MAX_PRICES.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                      </select>
                    </div>
                  </div>
                  <button onClick={() => apply({})} style={{ width: '100%', padding: '0.45rem', background: '#C4A35A', color: '#fff', border: 'none', fontSize: '0.68rem', letterSpacing: '0.12em', textTransform: 'uppercase', cursor: 'pointer', fontFamily: "'Jost', sans-serif" }}>
                    Apply
                  </button>
                </div>
              </DropPanel>
            )}
          </div>

          <div style={{ width: '1px', height: '20px', background: '#D0CEC8', flexShrink: 0 }} />

          {/* Beds */}
          <div style={{ position: 'relative' }}>
            <BTN active={open === 'beds' || !!filters.minBeds} onClick={() => setOpen(open === 'beds' ? null : 'beds')}>
              {filters.minBeds ? `${filters.minBeds}+ Beds` : 'Beds'}
            </BTN>
            {open === 'beds' && (
              <DropPanel>
                <div style={{ padding: '0.7rem 0.8rem' }}>
                  <div style={{ fontSize: '0.58rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#999', marginBottom: '0.5rem' }}>Min Bedrooms</div>
                  <div style={{ display: 'flex', gap: '0.3rem' }}>
                    {BED_OPTIONS.map(v => (
                      <button key={v} onClick={() => apply({ minBeds: v })} style={{ padding: '0.3rem 0.6rem', border: filters.minBeds === v ? '1.5px solid #C4A35A' : '1px solid #D0CEC8', background: filters.minBeds === v ? '#FBF7EF' : '#fff', cursor: 'pointer', fontSize: '0.73rem', fontFamily: "'Jost', sans-serif", fontWeight: filters.minBeds === v ? 500 : 400, color: '#333' }}>
                        {v ? `${v}+` : 'Any'}
                      </button>
                    ))}
                  </div>
                </div>
              </DropPanel>
            )}
          </div>

          <div style={{ width: '1px', height: '20px', background: '#D0CEC8', flexShrink: 0 }} />

          {/* Baths */}
          <div style={{ position: 'relative' }}>
            <BTN active={open === 'baths' || !!filters.minBaths} onClick={() => setOpen(open === 'baths' ? null : 'baths')}>
              {filters.minBaths ? `${filters.minBaths}+ Baths` : 'Baths'}
            </BTN>
            {open === 'baths' && (
              <DropPanel>
                <div style={{ padding: '0.7rem 0.8rem' }}>
                  <div style={{ fontSize: '0.58rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#999', marginBottom: '0.5rem' }}>Min Bathrooms</div>
                  <div style={{ display: 'flex', gap: '0.3rem' }}>
                    {BATH_OPTIONS.map(v => (
                      <button key={v} onClick={() => apply({ minBaths: v })} style={{ padding: '0.3rem 0.6rem', border: filters.minBaths === v ? '1.5px solid #C4A35A' : '1px solid #D0CEC8', background: filters.minBaths === v ? '#FBF7EF' : '#fff', cursor: 'pointer', fontSize: '0.73rem', fontFamily: "'Jost', sans-serif", fontWeight: filters.minBaths === v ? 500 : 400, color: '#333' }}>
                        {v ? `${v}+` : 'Any'}
                      </button>
                    ))}
                  </div>
                </div>
              </DropPanel>
            )}
          </div>

          <div style={{ width: '1px', height: '20px', background: '#D0CEC8', flexShrink: 0 }} />

          {/* Home Type */}
          <div style={{ position: 'relative' }}>
            <BTN active={open === 'type' || !!filters.propType} onClick={() => setOpen(open === 'type' ? null : 'type')}>
              {filters.propType ? TYPE_MAP[filters.propType] : 'Home Type'}
            </BTN>
            {open === 'type' && (
              <DropPanel>
                {[['', 'All Types'], ['SFR', 'House'], ['CONDO', 'Condo / Co-op'], ['TWNHS', 'Townhouse'], ['MLTRES', 'Multi-family']].map(([v, l]) => (
                  <DropRow key={v} selected={filters.propType === v} onClick={() => apply({ propType: v })}>
                    {l}
                  </DropRow>
                ))}
              </DropPanel>
            )}
          </div>

          {/* Clear filters */}
          {hasFilters && (
            <button onClick={() => apply({ minPrice: '', maxPrice: '', minBeds: '', minBaths: '', propType: '' })}
              style={{ marginLeft: '0.5rem', padding: '0 0.8rem', height: '34px', background: 'transparent', border: '1px solid #D0CEC8', cursor: 'pointer', fontSize: '0.67rem', fontFamily: "'Jost', sans-serif", letterSpacing: '0.1em', textTransform: 'uppercase', color: '#888' }}>
              Clear
            </button>
          )}

          {/* Click-away overlay */}
          {open && <div onClick={() => setOpen(null)} style={{ position: 'fixed', inset: 0, zIndex: 200 }} />}

          {/* Bring dropdowns above overlay */}
          <style>{`.filter-dropdown { z-index: 300 !important; }`}</style>
        </div>

        {/* ── IDX IFRAME ── */}
        <div style={{ flex: 1, overflow: 'hidden', position: 'relative' }}>
          <iframe
            key={idxUrl}
            src={idxUrl}
            width="100%"
            height="100%"
            frameBorder="0"
            style={{ display: 'block', width: '100%', height: '100%', border: 'none' }}
            title="McQueen Realty Property Search"
            allowFullScreen
          />
        </div>
      </div>
    </>
  );
}

export default function Listings() {
  return (
    <Suspense fallback={
      <div style={{ height: '100vh', background: '#0D0D0D', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.7rem', letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)' }}>
          Loading…
        </div>
      </div>
    }>
      <ListingsContent />
    </Suspense>
  );
}
