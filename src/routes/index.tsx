import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import {
  Search,
  MapPin,
  Building2,
  Home as HomeIcon,
  ShieldCheck,
  Award,
  Users,
  TrendingUp,
  Star,
  ArrowRight,
  Quote,
  BadgeCheck,
  Sparkles,
} from "lucide-react";
import heroImg from "@/assets/hero-building.jpg";
import { featuredProperties } from "@/lib/properties";
import { PropertyCard } from "@/components/site/PropertyCard";
import { InquiryForm } from "@/components/site/InquiryForm";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Group One Realty — Premium Delhi NCR Properties for Sale & Rent" },
      {
        name: "description",
        content:
          "Discover RERA-approved flats, builder floors, villas, plots & commercial spaces across Gurgaon, Noida, Delhi NCR. Zero brokerage deals. Free consultation.",
      },
      { property: "og:title", content: "Group One Realty — Delhi NCR Real Estate" },
      {
        property: "og:description",
        content: "Verified listings, best price deals, end-to-end support across Delhi NCR.",
      },
      { property: "og:image", content: heroImg },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <FeaturedProperties />
      <WhyChooseUs />
      <Services />
      <TopLocations />
      <Testimonials />
      <CTABanner />
    </>
  );
}

function Hero() {
  const navigate = useNavigate();
  const [purpose, setPurpose] = useState("Buy");
  const [city, setCity] = useState("");
  const [type, setType] = useState("");
  const [budget, setBudget] = useState("");

  const onSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate({ to: "/properties", search: { city, type, budget, purpose } });
  };

  const purposes = ["Buy", "Rent", "Resale"];

  return (
    <section className="relative min-h-[100svh] flex items-center overflow-hidden">
      <img
        src={heroImg}
        alt="Delhi NCR luxury skyline"
        width={1920}
        height={1280}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-hero" />
      <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-transparent to-navy/40" />

      <div className="relative z-10 mx-auto max-w-7xl container-px pt-32 pb-20 w-full">
        <div className="max-w-3xl">
          <span className="inline-flex items-center gap-2 glass-dark text-white px-4 py-1.5 rounded-full text-xs font-medium tracking-wide">
            <Sparkles className="h-3.5 w-3.5 text-gold" /> RERA Approved · 1000+ Happy Families
          </span>
          <h1 className="mt-6 font-display text-5xl md:text-7xl font-bold text-white leading-[1.05]">
            Find Your <span className="text-gradient-gold">Dream Home</span>
            <br />
            in Delhi NCR
          </h1>
          <p className="mt-6 text-lg md:text-xl text-white/85 max-w-2xl leading-relaxed">
            Verified listings · Zero brokerage deals · Trusted by NRIs & families. Your premium real
            estate partner across Gurgaon, Noida, Delhi & beyond.
          </p>
        </div>

        {/* Search */}
        <form onSubmit={onSearch} className="mt-10 max-w-4xl">
          {/* Buy / Rent / Resale tabs */}
          <div className="inline-flex glass-dark rounded-t-2xl p-1.5 gap-1">
            {purposes.map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => {
                  setPurpose(p);
                  setBudget("");
                }}
                className={`px-5 py-2 rounded-xl text-sm font-semibold transition-colors ${
                  purpose === p
                    ? "bg-gold text-gold-foreground shadow-luxury"
                    : "text-white/85 hover:text-white"
                }`}
              >
                {p}
              </button>
            ))}
          </div>

          <div className="glass rounded-2xl rounded-tl-none p-3 md:p-4 grid grid-cols-1 md:grid-cols-[1.2fr_1fr_1fr_auto] gap-3 shadow-luxury">
            <label className="flex items-center gap-2 px-4 py-3 rounded-lg bg-background/80 border border-border">
              <MapPin className="h-4 w-4 text-gold shrink-0" />
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="bg-transparent w-full outline-none text-sm text-foreground"
              >
                <option value="">All Cities</option>
                <option>Gurgaon</option>
                <option>Noida</option>
                <option>Greater Noida</option>
                <option>Delhi</option>
                <option>Ghaziabad</option>
                <option>Faridabad</option>
              </select>
            </label>
            <label className="flex items-center gap-2 px-4 py-3 rounded-lg bg-background/80 border border-border">
              <Building2 className="h-4 w-4 text-gold shrink-0" />
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="bg-transparent w-full outline-none text-sm text-foreground"
              >
                <option value="">Property Type</option>
                <option>Flat</option>
                <option>Builder Floor</option>
                <option>Villa</option>
                <option>Plot</option>
                <option>Shop</option>
                <option>Office</option>
              </select>
            </label>
            <label className="flex items-center gap-2 px-4 py-3 rounded-lg bg-background/80 border border-border">
              <TrendingUp className="h-4 w-4 text-gold shrink-0" />
              <select
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                className="bg-transparent w-full outline-none text-sm text-foreground"
              >
                <option value="">Budget</option>
                {purpose === "Rent" ? (
                  <>
                    <option value="rent-under-20k">Under ₹20K/mo</option>
                    <option value="rent-20k-40k">₹20K – ₹40K</option>
                    <option value="rent-40k-75k">₹40K – ₹75K</option>
                    <option value="rent-75k-plus">₹75K+</option>
                  </>
                ) : (
                  <>
                    <option value="sale-under-50l">Under ₹50L</option>
                    <option value="sale-50l-1cr">₹50L – ₹1Cr</option>
                    <option value="sale-1cr-3cr">₹1Cr – ₹3Cr</option>
                    <option value="sale-3cr-plus">₹3Cr+</option>
                  </>
                )}
              </select>
            </label>
            <Button type="submit" variant="gold" size="lg" className="md:w-auto">
              <Search className="h-4 w-4" /> Search {purpose}
            </Button>
          </div>
        </form>

        <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3 text-white/85 text-sm">
          {["Verified Listings", "Zero Brokerage", "RERA Approved", "Local Experts"].map((t) => (
            <span key={t} className="inline-flex items-center gap-2">
              <BadgeCheck className="h-4 w-4 text-gold" /> {t}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function TrustStrip() {
  const stats = [
    { v: "1000+", l: "Happy Families" },
    { v: "500+", l: "Verified Listings" },
    { v: "15+", l: "Years Experience" },
    { v: "₹500Cr+", l: "Properties Sold" },
  ];
  return (
    <section className="bg-navy text-navy-foreground py-12">
      <div className="mx-auto max-w-7xl container-px grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((s) => (
          <div key={s.l} className="text-center">
            <div className="font-display text-4xl md:text-5xl font-bold text-gradient-gold">
              {s.v}
            </div>
            <div className="mt-1 text-sm text-white/70 uppercase tracking-wider">{s.l}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function FeaturedProperties() {
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl container-px">
        <div className="flex items-end justify-between flex-wrap gap-4 mb-12">
          <div>
            <span className="text-gold font-semibold text-sm uppercase tracking-widest">
              Featured
            </span>
            <h2 className="mt-2 font-display text-4xl md:text-5xl font-bold text-foreground">
              Hand-picked Properties
            </h2>
            <p className="mt-3 text-muted-foreground max-w-xl">
              The best of Delhi NCR — premium flats, villas, plots and commercial spaces, personally
              verified by our team.
            </p>
          </div>
          <Link
            to="/properties"
            className="inline-flex items-center gap-2 text-navy font-semibold hover:text-gold transition-colors"
          >
            View All <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProperties.map((p) => (
            <PropertyCard key={p.id} p={p} />
          ))}
        </div>
      </div>
    </section>
  );
}

function WhyChooseUs() {
  const items = [
    {
      icon: ShieldCheck,
      t: "Verified Listings",
      d: "Every property is personally inspected and verified by our experts.",
    },
    {
      icon: Award,
      t: "RERA Approved",
      d: "We deal exclusively in legally compliant, RERA-registered projects.",
    },
    {
      icon: TrendingUp,
      t: "Best Price Deals",
      d: "Negotiated rates, zero brokerage on select listings, transparent pricing.",
    },
    {
      icon: Users,
      t: "Local Market Experts",
      d: "15+ years of on-ground experience across Delhi NCR micro-markets.",
    },
  ];
  return (
    <section className="py-20 md:py-28 bg-secondary">
      <div className="mx-auto max-w-7xl container-px">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-gold font-semibold text-sm uppercase tracking-widest">
            Why Group One
          </span>
          <h2 className="mt-2 font-display text-4xl md:text-5xl font-bold">
            Trust. Transparency. Results.
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map(({ icon: Icon, t, d }) => (
            <div
              key={t}
              className="bg-card rounded-2xl p-7 shadow-card hover:shadow-luxury transition-all hover:-translate-y-1 border border-border"
            >
              <div className="h-12 w-12 rounded-xl bg-gradient-navy grid place-items-center shadow-luxury">
                <Icon className="h-6 w-6 text-gold" />
              </div>
              <h3 className="mt-5 font-display text-xl font-semibold">{t}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Services() {
  const services = [
    "Buy Property",
    "Sell Property",
    "Rent Property",
    "Resale Property",
    "Investment Consulting",
    "Commercial Deals",
    "Home Loan Assistance",
    "Site Visit Support",
    "Property Management",
  ];
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl container-px grid lg:grid-cols-2 gap-12 items-start">
        <div>
          <span className="text-gold font-semibold text-sm uppercase tracking-widest">
            Our Services
          </span>
          <h2 className="mt-2 font-display text-4xl md:text-5xl font-bold">
            End-to-End Real Estate Solutions
          </h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            Whether you're buying your first home, selling an investment, or expanding your
            commercial portfolio — Group One Realty is your single trusted point of contact.
          </p>
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-3">
            {services.map((s) => (
              <div
                key={s}
                className="flex items-center gap-2 bg-secondary rounded-lg px-3 py-2.5 text-sm font-medium"
              >
                <BadgeCheck className="h-4 w-4 text-gold shrink-0" /> {s}
              </div>
            ))}
          </div>
        </div>
        <div className="bg-gradient-navy rounded-3xl p-8 md:p-10 shadow-luxury text-navy-foreground">
          <h3 className="font-display text-2xl md:text-3xl font-bold">
            Get a <span className="text-gradient-gold">Free Consultation</span>
          </h3>
          <p className="mt-2 text-white/75 text-sm">
            Tell us what you need. We'll call you back within 30 minutes.
          </p>
          <div className="mt-6 bg-background rounded-2xl p-6">
            <InquiryForm />
          </div>
        </div>
      </div>
    </section>
  );
}

function TopLocations() {
  const locs = [
    { name: "Gurgaon", count: "180+ Properties" },
    { name: "Noida", count: "120+ Properties" },
    { name: "Greater Noida", count: "90+ Properties" },
    { name: "Delhi", count: "75+ Properties" },
    { name: "Ghaziabad", count: "45+ Properties" },
    { name: "Faridabad", count: "30+ Properties" },
  ];
  return (
    <section className="py-20 md:py-28 bg-secondary">
      <div className="mx-auto max-w-7xl container-px">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-gold font-semibold text-sm uppercase tracking-widest">
            Locations
          </span>
          <h2 className="mt-2 font-display text-4xl md:text-5xl font-bold">
            Top Delhi NCR Markets
          </h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {locs.map((l) => (
            <Link
              key={l.name}
              to="/properties"
              className="group bg-card rounded-xl p-6 text-center shadow-card hover:shadow-luxury transition-all hover:-translate-y-1 border border-border"
            >
              <div className="mx-auto h-12 w-12 rounded-full bg-gradient-gold grid place-items-center mb-3 group-hover:scale-110 transition-transform">
                <HomeIcon className="h-5 w-5 text-gold-foreground" />
              </div>
              <div className="font-display font-semibold text-foreground">{l.name}</div>
              <div className="text-xs text-muted-foreground mt-1">{l.count}</div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const tests = [
    {
      n: "Rohit Sharma",
      c: "Gurgaon",
      t: "Group One Realty made buying our first home effortless. Transparent, professional, and they negotiated a great deal for us.",
    },
    {
      n: "Priya Mehta (NRI)",
      c: "Noida",
      t: "Being based in Dubai, I needed a partner I could trust. Their team handled everything end-to-end. Highly recommended for NRI buyers.",
    },
    {
      n: "Amit Khanna",
      c: "Delhi",
      t: "Sold my builder floor in 3 weeks at a price 8% above market. The team's market knowledge is unmatched.",
    },
  ];
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl container-px">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-gold font-semibold text-sm uppercase tracking-widest">
            Testimonials
          </span>
          <h2 className="mt-2 font-display text-4xl md:text-5xl font-bold">
            Loved by 1000+ Families
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {tests.map((t) => (
            <div
              key={t.n}
              className="bg-card rounded-2xl p-7 shadow-card border border-border relative"
            >
              <Quote className="h-8 w-8 text-gold/30 absolute top-5 right-5" />
              <div className="flex gap-0.5 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-gold text-gold" />
                ))}
              </div>
              <p className="text-foreground/90 leading-relaxed text-sm">{t.t}</p>
              <div className="mt-5 pt-5 border-t border-border">
                <div className="font-semibold text-foreground">{t.n}</div>
                <div className="text-xs text-muted-foreground">{t.c}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTABanner() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl container-px">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-navy p-10 md:p-16 shadow-luxury text-navy-foreground">
          <div className="absolute -top-20 -right-20 h-72 w-72 rounded-full bg-gold/20 blur-3xl" />
          <div className="relative grid md:grid-cols-[1.5fr_auto] gap-8 items-center">
            <div>
              <span className="inline-flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider text-gold">
                ⚡ Limited Units Available
              </span>
              <h2 className="mt-4 font-display text-3xl md:text-5xl font-bold leading-tight">
                Ready to Find Your <span className="text-gradient-gold">Perfect Property?</span>
              </h2>
              <p className="mt-3 text-white/80 max-w-xl">
                Book a free site visit or get an instant callback from our Delhi NCR experts.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row md:flex-col gap-3">
              <Button asChild variant="gold" size="xl">
                <a href="tel:9654440099">📞 Call Now</a>
              </Button>
              <Button asChild variant="outlineGold" size="xl">
                <a href="https://wa.me/919654440099" target="_blank" rel="noopener noreferrer">
                  💬 WhatsApp Us
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
