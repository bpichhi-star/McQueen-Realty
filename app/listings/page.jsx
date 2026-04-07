'use client';
import { useState, useMemo, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

/* ─── Sample listings (swap for live API) ─────────────────────────────────── */
const ALL_LISTINGS = [
  { id:1,  address:'1847 Carla Ridge',          city:'Beverly Hills', zip:'90210', price:8750000,  beds:5, baths:6,   sqft:6200, type:'House',     status:'For Sale', tag:'New',          dom:3,  photo:'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=900&q=80' },
  { id:2,  address:'24601 Malibu Road',          city:'Malibu',        zip:'90265', price:12500000, beds:6, baths:7,   sqft:8400, type:'House',     status:'For Sale', tag:null,           dom:14, photo:'https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=900&q=80' },
  { id:3,  address:'750 Bel Air Road',           city:'Bel Air',       zip:'90077', price:18900000, beds:8, baths:10,  sqft:12000,type:'House',     status:'For Sale', tag:'Price Cut',    dom:42, photo:'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=900&q=80' },
  { id:4,  address:'11 Marguerita Ave',          city:'Santa Monica',  zip:'90402', price:4200000,  beds:4, baths:4,   sqft:3800, type:'House',     status:'For Sale', tag:'New',          dom:5,  photo:'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=900&q=80' },
  { id:5,  address:'1305 Schuyler Rd',           city:'Beverly Hills', zip:'90210', price:6400000,  beds:5, baths:5,   sqft:5100, type:'House',     status:'For Sale', tag:null,           dom:21, photo:'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=900&q=80' },
  { id:6,  address:'3740 Multiview Dr',          city:'Hollywood Hills',zip:'90068',price:3100000,  beds:4, baths:4,   sqft:3200, type:'House',     status:'For Sale', tag:'New',          dom:7,  photo:'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=900&q=80' },
  { id:7,  address:'441 Evelyn Place',           city:'Beverly Hills', zip:'90210', price:9800000,  beds:6, baths:7,   sqft:7400, type:'House',     status:'For Sale', tag:null,           dom:33, photo:'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=900&q=80' },
  { id:8,  address:'22554 Carbon Mesa Rd',       city:'Malibu',        zip:'90265', price:7200000,  beds:5, baths:5.5, sqft:5800, type:'House',     status:'For Sale', tag:'Open Sun',     dom:10, photo:'https://images.unsplash.com/photo-1523217582562-09d0def993a6?w=900&q=80' },
  { id:9,  address:'920 Stradella Rd',           city:'Bel Air',       zip:'90077', price:22000000, beds:9, baths:11,  sqft:15600,type:'House',     status:'For Sale', tag:null,           dom:60, photo:'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=900&q=80' },
  { id:10, address:'17355 Sunset Blvd #204',     city:'Pacific Palisades',zip:'90272',price:1850000,beds:2,baths:2.5, sqft:1900, type:'Condo',     status:'For Sale', tag:'New',          dom:2,  photo:'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=80' },
  { id:11, address:'1201 Laurel Way',            city:'Beverly Hills', zip:'90210', price:14500000, beds:7, baths:9,   sqft:10200,type:'House',     status:'For Sale', tag:null,           dom:28, photo:'https://images.unsplash.com/photo-1416331108676-a22ccb276e35?w=900&q=80' },
  { id:12, address:'3959 Longridge Ave',         city:'Sherman Oaks',  zip:'91423', price:2250000,  beds:4, baths:3,   sqft:2800, type:'House',     status:'For Sale', tag:'New',          dom:4,  photo:'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=900&q=80' },
];

const fmt = (n) => '$' + (n >= 1000000 ? (n/1000000).toFixed(n%1000000===0?0:1)+'M' : (n/1000).toFixed(0)+'K');

const PRICE_RANGES = [
  { label:'Any Price', min:0, max:Infinity },
  { label:'Under $1M',    min:0,       max:1000000 },
  { label:'$1M – $3M',    min:1000000, max:3000000 },
  { label:'$3M – $6M',    min:3000000, max:6000000 },
  { label:'$6M – $10M',   min:6000000, max:10000000 },
  { label:'$10M – $20M',  min:10000000,max:20000000 },
  { label:'$20M+',        min:20000000,max:Infinity },
];
const BED_OPTS  = ['Any','1+','2+','3+','4+','5+'];
const BATH_OPTS = ['Any','1+','2+','3+','4+'];
const TYPE_OPTS = ['All Types','House','Condo','Townhouse'];
const SORT_OPTS = ['Newest','Price (High–Low)','Price (Low–High)','Beds'];

function Chevron() {
  return <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="6 9 12 15 18 9"/></svg>;
}

function HeartIcon({ saved }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill={saved ? '#C4A35A' : 'none'} stroke={saved ? '#C4A35A' : 'rgba(255,255,255,0.8)'} strokeWidth="2" strokeLinecap="round">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
    </svg>
  );
}

function FilterBtn({ label, active, onClick, children }) {
  return (
    <button onClick={onClick} style={{
      display:'flex', alignItems:'center', gap:'5px',
      padding:'0 14px', height:'36px',
      background: active ? '#111' : '#fff',
      color: active ? '#fff' : '#222',
      border: active ? '1px solid #111' : '1px solid #D0CEC8',
      cursor:'pointer', whiteSpace:'nowrap',
      fontSize:'0.72rem', fontFamily:"'Jost',sans-serif",
      fontWeight: active ? 500 : 400, letterSpacing:'0.02em',
      transition:'all 0.15s',
    }}>
      {label || children}
      <Chevron />
    </button>
  );
}

function Dropdown({ children, width = 200 }) {
  return (
    <div style={{
      position:'absolute', top:'calc(100% + 6px)', left:0,
      width, background:'#fff', border:'1px solid #D0CEC8',
      boxShadow:'0 8px 32px rgba(0,0,0,0.12)', zIndex:400,
    }}>
      {children}
    </div>
  );
}

function DropItem({ active, onClick, children }) {
  const [hov, setHov] = useState(false);
  return (
    <div onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        padding:'10px 16px', cursor:'pointer',
        fontSize:'0.78rem', fontFamily:"'Jost',sans-serif",
        color: active ? '#111' : '#444',
        fontWeight: active ? 500 : 400,
        background: active ? '#F8F6F2' : hov ? '#F5F4F1' : 'transparent',
        display:'flex', alignItems:'center', justifyContent:'space-between',
      }}>
      {children}
      {active && <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#C4A35A" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>}
    </div>
  );
}

/* ─── Card ────────────────────────────────────────────────────────────────── */
function Card({ listing, saved, onSave }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{ background:'#fff', cursor:'pointer', display:'flex', flexDirection:'column', border:'1px solid #ECEAE4', transition:'box-shadow 0.2s', boxShadow: hov ? '0 8px 32px rgba(0,0,0,0.12)' : '0 1px 4px rgba(0,0,0,0.05)' }}
    >
      {/* Photo */}
      <div style={{ position:'relative', overflow:'hidden', paddingBottom:'66%' }}>
        <img
          src={listing.photo}
          alt={listing.address}
          loading="lazy"
          style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover', transition:'transform 0.55s cubic-bezier(.16,1,.3,1)', transform: hov ? 'scale(1.04)' : 'scale(1)' }}
        />
        {/* Tag */}
        {listing.tag && (
          <div style={{ position:'absolute', top:12, left:12, background: listing.tag==='New' ? '#111' : listing.tag==='Price Cut' ? '#C4A35A' : '#2C6E49', color:'#fff', fontSize:'0.6rem', letterSpacing:'0.14em', textTransform:'uppercase', padding:'4px 9px', fontFamily:"'Jost',sans-serif", fontWeight:500 }}>
            {listing.tag}
          </div>
        )}
        {/* Save */}
        <button onClick={(e) => { e.stopPropagation(); onSave(listing.id); }}
          style={{ position:'absolute', top:10, right:10, background:'rgba(0,0,0,0.35)', border:'none', cursor:'pointer', width:32, height:32, display:'flex', alignItems:'center', justifyContent:'center', backdropFilter:'blur(4px)' }}>
          <HeartIcon saved={saved} />
        </button>
        {/* DOM */}
        <div style={{ position:'absolute', bottom:10, right:10, background:'rgba(0,0,0,0.5)', color:'rgba(255,255,255,0.85)', fontSize:'0.58rem', letterSpacing:'0.1em', padding:'3px 8px', fontFamily:"'Jost',sans-serif" }}>
          {listing.dom === 1 ? '1 day ago' : `${listing.dom} days ago`}
        </div>
      </div>

      {/* Info */}
      <div style={{ padding:'14px 16px 18px' }}>
        <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontWeight:800, fontSize:'1.45rem', color:'#111', letterSpacing:'-0.01em', marginBottom:'4px' }}>
          {fmt(listing.price)}
        </div>
        <div style={{ fontSize:'0.78rem', fontFamily:"'Jost',sans-serif", color:'#222', fontWeight:400, marginBottom:'3px', lineHeight:1.3 }}>
          {listing.address}
        </div>
        <div style={{ fontSize:'0.72rem', fontFamily:"'Jost',sans-serif", color:'#888', marginBottom:'10px' }}>
          {listing.city}, CA {listing.zip}
        </div>
        <div style={{ display:'flex', gap:'14px', fontSize:'0.7rem', fontFamily:"'Jost',sans-serif", color:'#555', borderTop:'1px solid #F0EDEA', paddingTop:'10px' }}>
          <span><strong style={{ color:'#111', fontWeight:600 }}>{listing.beds}</strong> bd</span>
          <span><strong style={{ color:'#111', fontWeight:600 }}>{listing.baths}</strong> ba</span>
          <span><strong style={{ color:'#111', fontWeight:600 }}>{listing.sqft.toLocaleString()}</strong> sqft</span>
          <span style={{ marginLeft:'auto', color:'#AAA', fontStyle:'italic' }}>{listing.type}</span>
        </div>
      </div>
    </div>
  );
}

/* ─── Main ─────────────────────────────────────────────────────────────────── */
function ListingsContent() {
  const searchParams = useSearchParams();
  const q = searchParams.get('q') || '';

  const [open,     setOpen]     = useState(null);
  const [priceIdx, setPriceIdx] = useState(0);
  const [beds,     setBeds]     = useState('Any');
  const [baths,    setBaths]    = useState('Any');
  const [type,     setType]     = useState('All Types');
  const [sort,     setSort]     = useState('Newest');
  const [saved,    setSaved]    = useState(new Set());
  const [locQ,     setLocQ]     = useState(q);

  const toggleSave = (id) => setSaved(s => { const n = new Set(s); n.has(id) ? n.delete(id) : n.add(id); return n; });

  const filtered = useMemo(() => {
    const pr = PRICE_RANGES[priceIdx];
    const minBed  = beds  === 'Any' ? 0 : parseInt(beds);
    const minBath = baths === 'Any' ? 0 : parseFloat(baths);
    let r = ALL_LISTINGS.filter(l =>
      l.price >= pr.min && l.price <= pr.max &&
      l.beds  >= minBed && l.baths >= minBath &&
      (type === 'All Types' || l.type === type) &&
      (!locQ || l.city.toLowerCase().includes(locQ.toLowerCase()) || l.zip.includes(locQ))
    );
    if (sort === 'Price (High–Low)')  r = [...r].sort((a,b) => b.price - a.price);
    if (sort === 'Price (Low–High)')  r = [...r].sort((a,b) => a.price - b.price);
    if (sort === 'Newest')            r = [...r].sort((a,b) => a.dom - b.dom);
    if (sort === 'Beds')              r = [...r].sort((a,b) => b.beds - a.beds);
    return r;
  }, [priceIdx, beds, baths, type, sort, locQ]);

  const hasFilters = priceIdx > 0 || beds !== 'Any' || baths !== 'Any' || type !== 'All Types';

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;800;900&family=Jost:wght@300;400;500;600&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { overflow-x: hidden; background: #F7F6F3; }
        a { text-decoration: none; color: inherit; }
        button { font-family: 'Jost', sans-serif; }
        ::-webkit-scrollbar { width: 5px; } ::-webkit-scrollbar-thumb { background: #D0CEC8; }
      `}</style>

      <div style={{ minHeight:'100vh', display:'flex', flexDirection:'column', fontFamily:"'Jost',sans-serif", background:'#F7F6F3' }}>

        {/* ── NAV ── */}
        <nav style={{ position:'sticky', top:0, zIndex:500, background:'#0D0D0D', borderBottom:'1px solid rgba(255,255,255,0.07)', display:'flex', alignItems:'center', padding:'0 2rem', height:'60px', gap:'2rem' }}>
          <Link href="/" style={{ fontFamily:"'Jost',sans-serif", fontWeight:600, fontSize:'0.76rem', letterSpacing:'0.3em', textTransform:'uppercase', color:'#fff', flexShrink:0 }}>
            McQueen<span style={{ color:'#C4A35A' }}>·</span>Realty
          </Link>
          <div style={{ position:'absolute', left:'50%', transform:'translateX(-50%)', fontSize:'0.58rem', letterSpacing:'0.28em', textTransform:'uppercase', color:'rgba(255,255,255,0.35)' }}>
            Property Search
          </div>
          <div style={{ display:'flex', gap:'1.5rem', alignItems:'center', marginLeft:'auto' }}>
            {[['Home','/'],['About','/#about'],['Contact','/#contact']].map(([l,h]) => (
              <Link key={l} href={h} style={{ fontSize:'0.7rem', letterSpacing:'0.1em', color:'rgba(255,255,255,0.55)', textDecoration:'none' }}>{l}</Link>
            ))}
            <Link href="/#contact" style={{ background:'#C4A35A', color:'#fff', fontSize:'0.67rem', letterSpacing:'0.12em', padding:'0.42rem 1.1rem', fontWeight:500, textTransform:'uppercase', textDecoration:'none' }}>
              Schedule Showing
            </Link>
          </div>
        </nav>

        {/* ── FILTER BAR ── */}
        <div style={{ position:'sticky', top:'60px', zIndex:400, background:'#fff', borderBottom:'1px solid #E2E0DA', padding:'0 2rem', height:'54px', display:'flex', alignItems:'center', gap:'8px' }}>

          {/* Location */}
          <div style={{ position:'relative', marginRight:'4px' }}>
            <div style={{ display:'flex', alignItems:'center', gap:'6px', border:'1px solid #D0CEC8', padding:'0 12px', height:'36px', background:'#fff', minWidth:'200px' }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
              <input
                placeholder="City or ZIP"
                value={locQ}
                onChange={e => setLocQ(e.target.value)}
                style={{ border:'none', outline:'none', fontSize:'0.73rem', fontFamily:"'Jost',sans-serif", color:'#222', background:'transparent', width:'140px' }}
              />
              {locQ && <button onClick={() => setLocQ('')} style={{ border:'none', background:'transparent', cursor:'pointer', color:'#AAA', fontSize:'14px', lineHeight:1, padding:0 }}>×</button>}
            </div>
          </div>

          <div style={{ width:'1px', height:'20px', background:'#E2E0DA' }} />

          {/* Price */}
          <div style={{ position:'relative' }}>
            <FilterBtn active={priceIdx > 0} onClick={() => setOpen(open === 'price' ? null : 'price')}>
              {priceIdx > 0 ? PRICE_RANGES[priceIdx].label : 'Price'}
            </FilterBtn>
            {open === 'price' && (
              <Dropdown width={200}>
                {PRICE_RANGES.map((r, i) => (
                  <DropItem key={r.label} active={priceIdx === i} onClick={() => { setPriceIdx(i); setOpen(null); }}>{r.label}</DropItem>
                ))}
              </Dropdown>
            )}
          </div>

          {/* Beds */}
          <div style={{ position:'relative' }}>
            <FilterBtn active={beds !== 'Any'} onClick={() => setOpen(open === 'beds' ? null : 'beds')}>
              {beds === 'Any' ? 'Beds' : `${beds} Beds`}
            </FilterBtn>
            {open === 'beds' && (
              <Dropdown width={160}>
                {BED_OPTS.map(v => (
                  <DropItem key={v} active={beds === v} onClick={() => { setBeds(v); setOpen(null); }}>{v === 'Any' ? 'Any bedrooms' : `${v} bedrooms`}</DropItem>
                ))}
              </Dropdown>
            )}
          </div>

          {/* Baths */}
          <div style={{ position:'relative' }}>
            <FilterBtn active={baths !== 'Any'} onClick={() => setOpen(open === 'baths' ? null : 'baths')}>
              {baths === 'Any' ? 'Baths' : `${baths} Baths`}
            </FilterBtn>
            {open === 'baths' && (
              <Dropdown width={160}>
                {BATH_OPTS.map(v => (
                  <DropItem key={v} active={baths === v} onClick={() => { setBaths(v); setOpen(null); }}>{v === 'Any' ? 'Any bathrooms' : `${v} bathrooms`}</DropItem>
                ))}
              </Dropdown>
            )}
          </div>

          {/* Type */}
          <div style={{ position:'relative' }}>
            <FilterBtn active={type !== 'All Types'} onClick={() => setOpen(open === 'type' ? null : 'type')}>
              {type === 'All Types' ? 'Home Type' : type}
            </FilterBtn>
            {open === 'type' && (
              <Dropdown width={170}>
                {TYPE_OPTS.map(v => (
                  <DropItem key={v} active={type === v} onClick={() => { setType(v); setOpen(null); }}>{v}</DropItem>
                ))}
              </Dropdown>
            )}
          </div>

          {/* Clear */}
          {hasFilters && (
            <button onClick={() => { setPriceIdx(0); setBeds('Any'); setBaths('Any'); setType('All Types'); setOpen(null); }}
              style={{ padding:'0 12px', height:'36px', border:'1px solid #D0CEC8', background:'transparent', cursor:'pointer', fontSize:'0.68rem', letterSpacing:'0.1em', textTransform:'uppercase', color:'#888', fontFamily:"'Jost',sans-serif" }}>
              Clear
            </button>
          )}

          {/* Sort — right side */}
          <div style={{ position:'relative', marginLeft:'auto' }}>
            <div style={{ display:'flex', alignItems:'center', gap:'5px', cursor:'pointer', fontSize:'0.7rem', fontFamily:"'Jost',sans-serif", color:'#555', letterSpacing:'0.04em' }}
              onClick={() => setOpen(open === 'sort' ? null : 'sort')}>
              Sort: <strong style={{ color:'#111', fontWeight:500 }}>{sort}</strong>
              <Chevron />
            </div>
            {open === 'sort' && (
              <div style={{ position:'absolute', top:'calc(100% + 8px)', right:0, width:200, background:'#fff', border:'1px solid #D0CEC8', boxShadow:'0 8px 32px rgba(0,0,0,0.12)', zIndex:400 }}>
                {SORT_OPTS.map(v => (
                  <DropItem key={v} active={sort === v} onClick={() => { setSort(v); setOpen(null); }}>{v}</DropItem>
                ))}
              </div>
            )}
          </div>

          {open && <div onClick={() => setOpen(null)} style={{ position:'fixed', inset:0, zIndex:300 }} />}
        </div>

        {/* ── RESULTS BAR ── */}
        <div style={{ padding:'16px 2rem', display:'flex', alignItems:'baseline', gap:'8px' }}>
          <span style={{ fontFamily:"'Barlow Condensed',sans-serif", fontWeight:800, fontSize:'1.6rem', color:'#111', letterSpacing:'-0.01em' }}>
            {filtered.length.toLocaleString()}
          </span>
          <span style={{ fontSize:'0.75rem', color:'#888', fontFamily:"'Jost',sans-serif", letterSpacing:'0.04em' }}>
            {filtered.length === 1 ? 'home' : 'homes'} {locQ ? `in ${locQ}` : 'in Los Angeles County'}
          </span>
          {locQ && (
            <span style={{ fontSize:'0.68rem', color:'#C4A35A', fontFamily:"'Jost',sans-serif", letterSpacing:'0.06em', textTransform:'uppercase', marginLeft:'4px', cursor:'pointer', borderBottom:'1px solid #C4A35A' }}
              onClick={() => setLocQ('')}>
              × Clear location
            </span>
          )}
        </div>

        {/* ── GRID ── */}
        <div style={{ padding:'0 2rem 4rem', flex:1 }}>
          {filtered.length === 0 ? (
            <div style={{ display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:'6rem 0', gap:'1rem' }}>
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#D0CEC8" strokeWidth="1.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontWeight:800, fontSize:'1.8rem', color:'#333', textTransform:'uppercase', letterSpacing:'0.02em' }}>No Results Found</div>
              <div style={{ fontSize:'0.82rem', color:'#888', fontFamily:"'Jost',sans-serif" }}>Try adjusting your filters or search a different area.</div>
              <button onClick={() => { setPriceIdx(0); setBeds('Any'); setBaths('Any'); setType('All Types'); setLocQ(''); }}
                style={{ marginTop:'8px', padding:'0.6rem 1.8rem', background:'#111', color:'#fff', border:'none', cursor:'pointer', fontSize:'0.7rem', letterSpacing:'0.14em', textTransform:'uppercase', fontFamily:"'Jost',sans-serif", fontWeight:500 }}>
                Clear All Filters
              </button>
            </div>
          ) : (
            <div style={{ display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:'20px' }}>
              {filtered.map(l => (
                <Card key={l.id} listing={l} saved={saved.has(l.id)} onSave={toggleSave} />
              ))}
            </div>
          )}
        </div>

        {/* ── FOOTER NOTE ── */}
        <div style={{ borderTop:'1px solid #E2E0DA', padding:'1.4rem 2rem', background:'#fff', display:'flex', alignItems:'center', justifyContent:'space-between', gap:'1rem' }}>
          <div style={{ fontSize:'0.62rem', color:'#BBB', fontFamily:"'Jost',sans-serif", letterSpacing:'0.06em' }}>
            Data shown is representative. All listings subject to availability. © {new Date().getFullYear()} McQueen Realty. DRE #01234567.
          </div>
          <a href="https://matrix.crmls.org/Matrix/public/IDX.aspx?idx=eefc378c" target="_blank" rel="noopener noreferrer"
            style={{ fontSize:'0.66rem', fontFamily:"'Jost',sans-serif", letterSpacing:'0.1em', textTransform:'uppercase', color:'#C4A35A', borderBottom:'1px solid #C4A35A', paddingBottom:'1px', flexShrink:0 }}>
            Full MLS Search →
          </a>
        </div>
      </div>
    </>
  );
}

export default function Listings() {
  return (
    <Suspense fallback={
      <div style={{ height:'100vh', background:'#0D0D0D', display:'flex', alignItems:'center', justifyContent:'center' }}>
        <div style={{ fontFamily:"'Jost',sans-serif", fontSize:'0.7rem', letterSpacing:'0.28em', textTransform:'uppercase', color:'rgba(255,255,255,0.4)' }}>
          Loading…
        </div>
      </div>
    }>
      <ListingsContent />
    </Suspense>
  );
}
