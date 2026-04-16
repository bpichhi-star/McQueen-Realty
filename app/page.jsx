'use client';

import { useState } from 'react';
import Link from 'next/link';

// ─────────────────────────────────────────────────────────────
// Content
// ─────────────────────────────────────────────────────────────

const STATS = [
  { value: '$2.4B+', label: 'Closed Volume' },
  { value: '18 days', label: 'Avg. Days on Market' },
  { value: '104%', label: 'List-to-Sale Ratio' },
  { value: '95+', label: 'Off-Market Buyers' },
];

const PROCESS = [
  {
    n: '01',
    title: 'Private Consultation',
    body:
      'We meet on-site for a confidential walkthrough — reviewing your goals, timeline, and the unique story of your property. No pressure, no listing agreement until the strategy is right.',
  },
  {
    n: '02',
    title: 'Valuation & Positioning',
    body:
      'Using real-time CRMLS data, recent comparable sales, and our proprietary buyer network, we position your home for maximum leverage — not simply the highest comp.',
  },
  {
    n: '03',
    title: 'Preparation & Staging',
    body:
      'Our design team coordinates staging, light renovations, professional deep-cleaning, and landscape refresh. You see a property that is genuinely ready for its close-up.',
  },
  {
    n: '04',
    title: 'Cinematic Marketing',
    body:
      'Editorial photography, aerial cinematography, a bespoke property film, and a dedicated microsite. Your listing looks less like an MLS feed entry and more like a feature in Architectural Digest.',
  },
  {
    n: '05',
    title: 'Targeted Exposure',
    body:
      'Pre-MLS exposure to our private buyer list, broker-network previews across Southern California, and paid placement on The Wall Street Journal, Mansion Global, and Dwell.',
  },
  {
    n: '06',
    title: 'Negotiation & Close',
    body:
      'We negotiate with discretion and precision — navigating inspections, appraisals, and contingencies so you move from offer to close without drama.',
  },
];

const MARKETING = [
  {
    title: 'Editorial Photography',
    body:
      'Every listing is photographed by a specialist architectural shooter using full-frame medium format, natural light, and carefully styled interior moments.',
  },
  {
    title: 'Aerial & Drone Film',
    body:
      'FAA-licensed operators capture the context of your property — the coastline, canyon, or cityscape that makes the address.',
  },
  {
    title: 'Property Microsite',
    body:
      'A dedicated domain and custom single-property landing page, designed to convert qualified buyer interest into private showings.',
  },
  {
    title: 'Print & Digital Placement',
    body:
      'Targeted placement in the Los Angeles Times Hot Property section, The Wall Street Journal Mansion, Robb Report, and geo-fenced digital campaigns across luxury platforms.',
  },
  {
    title: 'Private Buyer Network',
    body:
      'Discreet pre-MLS exposure to our curated list of qualified domestic and international buyers, agent alliances, and wealth advisors.',
  },
  {
    title: 'Open House & Showings',
    body:
      'Invite-only broker previews and hosted Sunday opens — staffed by licensed McQueen advisors, never outsourced.',
  },
];

const TESTIMONIALS = [
  {
    quote:
      'They sold our home in eleven days for more than we thought possible. The marketing felt like a feature story, not a flyer.',
    author: 'Priya & Daniel K.',
    location: 'Malibu, CA',
  },
  {
    quote:
      'Every detail was considered. McQueen treated the sale of our home with the same care they would their own.',
    author: 'Michael R.',
    location: 'Hidden Hills, CA',
  },
  {
    quote:
      'The off-market buyer they brought in never would have found us otherwise. We closed before we ever hit the MLS.',
    author: 'Jennifer S.',
    location: 'Calabasas, CA',
  },
];

const FAQ = [
  {
    q: 'How do you determine list price?',
    a: 'We combine live CRMLS comparables, buyer-demand signals from our private network, and a structural condition review. The outcome is a range — we then position within that range based on your timeline, urgency, and leverage.',
  },
  {
    q: 'What does it cost to list with McQueen?',
    a: 'Commission is negotiated per engagement and always competitive with luxury-tier brokerages. Preparation services — staging, photography, cinematography, and microsite — are funded by McQueen and reconciled at close. No out-of-pocket from you.',
  },
  {
    q: 'How long until my home is on the market?',
    a: 'For a turn-key property, 10–14 days from signed listing agreement to live on MLS. For homes requiring staging or light renovation, typically 3–4 weeks. We move at the pace that serves your outcome.',
  },
  {
    q: 'Do you sell off-market?',
    a: 'Regularly. Our private buyer network and agent alliances mean many of our most notable transactions never appear on public MLS. We will recommend the right strategy — public listing, pocket, or hybrid — based on your property and goals.',
  },
  {
    q: 'What areas do you serve?',
    a: 'Los Angeles County, San Fernando Valley, Conejo Valley, and Ventura County. We specialize in estate and luxury properties across Agoura Hills, Hidden Hills, Calabasas, Malibu, Beverly Hills, Brentwood, and the surrounding markets.',
  },
  {
    q: 'Will my listing be syndicated?',
    a: 'Yes — across every major platform (Zillow, Realtor.com, Redfin, Compass, The Agency) and all premium luxury portals (Mansion Global, JamesEdition, LuxuryEstate, Christie\u2019s International Real Estate affiliates).',
  },
];

// ─────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────

export default function SellPage() {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <main className="bg-[#0a0a0a] text-white">
      {/* ── TOP NAV ──────────────────────────────────────────── */}
      <header className="fixed top-0 left-0 right-0 z-50 px-10 py-6 bg-gradient-to-b from-black/70 to-transparent">
        <nav className="flex items-center justify-between">
          <Link
            href="/"
            className="font-serif text-sm tracking-[0.3em] text-white uppercase"
          >
            McQueen Realty
          </Link>
          <div className="hidden md:flex items-center gap-10 text-xs tracking-[0.25em] uppercase text-white/80">
            <Link href="/buy" className="hover:text-white">Buy</Link>
            <Link href="/sell" className="hover:text-white text-white">Sell</Link>
            <Link href="/rent" className="hover:text-white">Rent</Link>
            <Link href="/agents" className="hover:text-white">Agents</Link>
          </div>
          <div className="flex items-center gap-8 text-xs tracking-[0.25em] uppercase">
            <Link href="/new-listings" className="hidden md:inline text-white/80 hover:text-white">
              New Listings
            </Link>
            <Link href="/exclusives" className="hidden md:inline text-white/80 hover:text-white">
              Exclusives
            </Link>
            <a
              href="#connect"
              className="px-5 py-3 bg-[#C9A84C] text-black tracking-[0.25em]"
            >
              Free Valuation
            </a>
          </div>
        </nav>
      </header>

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="relative h-screen w-full overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/sell-hero.jpg')" }}
        />
        {/* darkening overlays for cinematic feel */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-transparent" />

        <div className="relative h-full flex flex-col justify-end pb-24 px-10 md:px-20 max-w-7xl">
          <p className="text-xs tracking-[0.4em] uppercase text-[#C9A84C] mb-8">
            Seller Advisory · McQueen Realty
          </p>
          <h1 className="font-serif text-6xl md:text-8xl lg:text-9xl leading-[0.95] max-w-5xl">
            Sell your home<br />
            on your terms.
          </h1>
          <p className="mt-10 max-w-xl text-lg text-white/85 leading-relaxed">
            Boutique-scale service. Institutional marketing. A selling experience designed
            for the people who built something worth selling in the first place.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="#connect"
              className="px-8 py-4 bg-[#C9A84C] text-black text-xs tracking-[0.3em] uppercase hover:bg-white transition-colors"
            >
              Request Free Valuation →
            </a>
            <a
              href="#process"
              className="px-8 py-4 border border-white/40 text-white text-xs tracking-[0.3em] uppercase hover:border-white hover:bg-white/5 transition-all"
            >
              See the Process
            </a>
          </div>
        </div>

        {/* scroll cue */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[10px] tracking-[0.4em] uppercase text-white/60">
          Scroll
        </div>
      </section>

      {/* ── STATS STRIP ──────────────────────────────────────── */}
      <section className="bg-[#0a0a0a] border-y border-white/10 py-20 px-10">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12">
          {STATS.map((s) => (
            <div key={s.label} className="text-center">
              <div className="font-serif text-5xl md:text-6xl text-[#C9A84C] mb-3">
                {s.value}
              </div>
              <div className="text-[10px] tracking-[0.35em] uppercase text-white/60">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── PHILOSOPHY ───────────────────────────────────────── */}
      <section className="py-32 px-10">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-xs tracking-[0.4em] uppercase text-[#C9A84C] mb-8">
            Our Approach
          </p>
          <h2 className="font-serif text-5xl md:text-7xl leading-[1.05] mb-10">
            We don&rsquo;t list homes.<br />
            We launch them.
          </h2>
          <p className="text-lg md:text-xl text-white/70 leading-relaxed max-w-3xl mx-auto">
            Every property McQueen represents is treated as a launch, not a listing.
            Editorial photography, dedicated microsites, aerial cinematography, and private
            buyer previews — the kind of marketing reserved for Beverly Hills compounds,
            applied with precision to every home we take on.
          </p>
        </div>
      </section>

      {/* ── PROCESS TIMELINE ─────────────────────────────────── */}
      <section id="process" className="bg-[#0f0f0f] py-32 px-10">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20 max-w-3xl">
            <p className="text-xs tracking-[0.4em] uppercase text-[#C9A84C] mb-6">
              The Process
            </p>
            <h2 className="font-serif text-5xl md:text-6xl leading-[1.05]">
              Six steps. One outcome.
            </h2>
          </div>

          <div className="relative">
            {/* vertical line */}
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-white/10" />

            <div className="space-y-16">
              {PROCESS.map((step, i) => (
                <div
                  key={step.n}
                  className={`relative grid md:grid-cols-2 gap-10 items-start ${
                    i % 2 === 0 ? '' : 'md:[&>*:first-child]:col-start-2'
                  }`}
                >
                  <div className="pl-16 md:pl-0 md:px-12">
                    <div className="font-serif text-6xl md:text-7xl text-[#C9A84C] mb-4">
                      {step.n}
                    </div>
                    <h3 className="font-serif text-3xl md:text-4xl mb-4">
                      {step.title}
                    </h3>
                    <p className="text-white/70 leading-relaxed text-base">
                      {step.body}
                    </p>
                  </div>
                  {/* dot on the line */}
                  <div className="hidden md:block absolute left-1/2 top-6 -translate-x-1/2 w-3 h-3 bg-[#C9A84C] rounded-full ring-4 ring-[#0f0f0f]" />
                  <div className="md:hidden absolute left-6 top-6 -translate-x-1/2 w-3 h-3 bg-[#C9A84C] rounded-full ring-4 ring-[#0f0f0f]" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── MARKETING DETAILS ────────────────────────────────── */}
      <section className="py-32 px-10">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20 max-w-3xl">
            <p className="text-xs tracking-[0.4em] uppercase text-[#C9A84C] mb-6">
              Marketing
            </p>
            <h2 className="font-serif text-5xl md:text-6xl leading-[1.05]">
              A campaign, not a flyer.
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16">
            {MARKETING.map((m) => (
              <div key={m.title} className="border-t border-white/15 pt-8">
                <h3 className="font-serif text-2xl mb-4 text-white">{m.title}</h3>
                <p className="text-white/65 text-sm leading-relaxed">{m.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────────────── */}
      <section className="bg-[#0f0f0f] py-32 px-10 border-y border-white/10">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs tracking-[0.4em] uppercase text-[#C9A84C] mb-6 text-center">
            Seller Stories
          </p>
          <h2 className="font-serif text-5xl md:text-6xl leading-[1.05] text-center mb-20">
            They trusted us.<br />We delivered.
          </h2>

          <div className="grid md:grid-cols-3 gap-10">
            {TESTIMONIALS.map((t, i) => (
              <blockquote
                key={i}
                className="border-l-2 border-[#C9A84C] pl-6"
              >
                <p className="font-serif text-xl md:text-2xl leading-snug text-white/90 mb-8">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <footer className="text-[10px] tracking-[0.3em] uppercase text-white/60">
                  <div>{t.author}</div>
                  <div className="text-[#C9A84C] mt-1">{t.location}</div>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────── */}
      <section className="py-32 px-10">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs tracking-[0.4em] uppercase text-[#C9A84C] mb-6 text-center">
            Frequently Asked
          </p>
          <h2 className="font-serif text-5xl md:text-6xl leading-[1.05] text-center mb-16">
            The details.
          </h2>

          <div className="divide-y divide-white/15 border-y border-white/15">
            {FAQ.map((item, i) => {
              const isOpen = openFaq === i;
              return (
                <div key={i}>
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : i)}
                    className="w-full flex items-center justify-between py-8 text-left group"
                  >
                    <span className="font-serif text-xl md:text-2xl pr-8 group-hover:text-[#C9A84C] transition-colors">
                      {item.q}
                    </span>
                    <span
                      className={`text-[#C9A84C] text-3xl font-light transition-transform flex-shrink-0 ${
                        isOpen ? 'rotate-45' : ''
                      }`}
                    >
                      +
                    </span>
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      isOpen ? 'max-h-96 pb-8' : 'max-h-0'
                    }`}
                  >
                    <p className="text-white/70 leading-relaxed pr-12">
                      {item.a}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CONNECT / CTA ────────────────────────────────────── */}
      <section id="connect" className="relative py-32 px-10 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: "url('/sell-hero.jpg')" }}
        />
        <div className="absolute inset-0 bg-[#0a0a0a]/85" />

        <div className="relative max-w-3xl mx-auto text-center">
          <p className="text-xs tracking-[0.4em] uppercase text-[#C9A84C] mb-6">
            Get Started
          </p>
          <h2 className="font-serif text-5xl md:text-7xl leading-[1.05] mb-8">
            Let&rsquo;s talk about<br />your home.
          </h2>
          <p className="text-lg text-white/75 max-w-xl mx-auto mb-12 leading-relaxed">
            A confidential conversation about value, timing, and strategy. No pressure,
            no listing agreement required — just honest advice from our advisors.
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              window.location.href = 'mailto:hello@mcqueenrealty.com?subject=Seller Inquiry';
            }}
            className="grid md:grid-cols-2 gap-4 mb-8 text-left"
          >
            <input
              type="text"
              required
              placeholder="Full Name"
              className="bg-transparent border border-white/25 px-5 py-4 text-white placeholder-white/40 focus:border-[#C9A84C] focus:outline-none"
            />
            <input
              type="email"
              required
              placeholder="Email Address"
              className="bg-transparent border border-white/25 px-5 py-4 text-white placeholder-white/40 focus:border-[#C9A84C] focus:outline-none"
            />
            <input
              type="tel"
              placeholder="Phone (Optional)"
              className="bg-transparent border border-white/25 px-5 py-4 text-white placeholder-white/40 focus:border-[#C9A84C] focus:outline-none"
            />
            <input
              type="text"
              placeholder="Property Address"
              className="bg-transparent border border-white/25 px-5 py-4 text-white placeholder-white/40 focus:border-[#C9A84C] focus:outline-none"
            />
            <textarea
              rows={4}
              placeholder="Tell us about your home (optional)"
              className="md:col-span-2 bg-transparent border border-white/25 px-5 py-4 text-white placeholder-white/40 focus:border-[#C9A84C] focus:outline-none resize-none"
            />
            <button
              type="submit"
              className="md:col-span-2 px-10 py-5 bg-[#C9A84C] text-black text-xs tracking-[0.3em] uppercase hover:bg-white transition-colors"
            >
              Request Free Valuation →
            </button>
          </form>

          <p className="text-xs text-white/40">
            Your information is confidential and reviewed only by a McQueen advisor.
          </p>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────── */}
      <footer className="bg-black px-10 py-20 border-t border-white/10">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12">
          <div className="md:col-span-1">
            <div className="font-serif text-sm tracking-[0.3em] uppercase mb-6">
              McQueen&nbsp;·&nbsp;Realty
            </div>
            <p className="text-white/50 text-sm leading-relaxed">
              28047 Dorothy Dr Unit 303<br />
              Agoura Hills, CA 91301
            </p>
          </div>

          <div>
            <div className="text-[10px] tracking-[0.3em] uppercase text-white/50 mb-5">
              Properties
            </div>
            <ul className="space-y-3 text-white/80 text-sm">
              <li><Link href="/buy" className="hover:text-[#C9A84C]">Buy</Link></li>
              <li><Link href="/sell" className="hover:text-[#C9A84C]">Sell</Link></li>
              <li><Link href="/rent" className="hover:text-[#C9A84C]">Rent</Link></li>
              <li><Link href="/new-listings" className="hover:text-[#C9A84C]">New Listings</Link></li>
              <li><Link href="/exclusives" className="hover:text-[#C9A84C]">Exclusives</Link></li>
            </ul>
          </div>

          <div>
            <div className="text-[10px] tracking-[0.3em] uppercase text-white/50 mb-5">
              Company
            </div>
            <ul className="space-y-3 text-white/80 text-sm">
              <li><Link href="/about" className="hover:text-[#C9A84C]">About Us</Link></li>
              <li><Link href="/agents" className="hover:text-[#C9A84C]">Agents</Link></li>
              <li><Link href="/services" className="hover:text-[#C9A84C]">Services</Link></li>
              <li><Link href="/contact" className="hover:text-[#C9A84C]">Contact</Link></li>
            </ul>
          </div>

          <div>
            <div className="text-[10px] tracking-[0.3em] uppercase text-white/50 mb-5">
              Markets
            </div>
            <ul className="space-y-3 text-white/80 text-sm">
              <li>Los Angeles County</li>
              <li>San Fernando Valley</li>
              <li>Ventura County</li>
              <li>Conejo Valley</li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-white/10 flex flex-wrap justify-between items-center gap-4 text-xs text-white/40">
          <div>© {new Date().getFullYear()} McQueen Realty. All rights reserved.</div>
          <div className="tracking-[0.2em] uppercase">DRE #XXXXXXXX</div>
        </div>
      </footer>
    </main>
  );
}
