import { Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { properties, type Property } from "@/lib/properties";
import { PropertyCard } from "@/components/site/PropertyCard";
import { InquiryForm } from "@/components/site/InquiryForm";
import { Button } from "@/components/ui/button";
import { BadgeCheck, MapPin, Search, ArrowRight } from "lucide-react";

type Purpose = Property["purpose"];

type Props = {
  purpose: Purpose;
  eyebrow: string;
  title: React.ReactNode;
  subtitle: string;
  bullets: string[];
  ctaLabel: string;
};

const allCities = ["Gurgaon", "Noida", "Greater Noida", "Delhi", "Ghaziabad", "Faridabad"] as const;

export function PurposePage({ purpose, eyebrow, title, subtitle, bullets, ctaLabel }: Props) {
  const [city, setCity] = useState<string>("");
  const [type, setType] = useState<string>("");

  const list = useMemo(() => {
    return properties.filter((p) => {
      if (p.purpose !== purpose) return false;
      if (city && p.city !== city) return false;
      if (type && p.type !== type) return false;
      return true;
    });
  }, [purpose, city, type]);

  // Cities that actually have stock for this purpose
  const cityCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    properties.forEach((p) => {
      if (p.purpose === purpose) counts[p.city] = (counts[p.city] ?? 0) + 1;
    });
    return counts;
  }, [purpose]);

  return (
    <div className="pt-24 pb-20">
      {/* Hero */}
      <section className="bg-gradient-navy text-navy-foreground py-16 md:py-24">
        <div className="mx-auto max-w-7xl container-px grid lg:grid-cols-[1.3fr_1fr] gap-10 items-center">
          <div>
            <span className="inline-flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider text-gold">
              {eyebrow}
            </span>
            <h1 className="mt-4 font-display text-4xl md:text-6xl font-bold leading-[1.05]">{title}</h1>
            <p className="mt-5 text-white/80 max-w-2xl text-lg leading-relaxed">{subtitle}</p>

            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/85">
              {bullets.map((b) => (
                <span key={b} className="inline-flex items-center gap-2">
                  <BadgeCheck className="h-4 w-4 text-gold" /> {b}
                </span>
              ))}
            </div>

            {/* Quick filter */}
            <form
              onSubmit={(e) => e.preventDefault()}
              className="mt-8 glass rounded-2xl p-3 grid grid-cols-1 sm:grid-cols-[1fr_1fr_auto] gap-3 max-w-xl shadow-luxury"
            >
              <label className="flex items-center gap-2 px-3 py-2.5 rounded-lg bg-background/80 border border-border">
                <MapPin className="h-4 w-4 text-gold shrink-0" />
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="bg-transparent w-full outline-none text-sm text-foreground"
                >
                  <option value="">All Cities</option>
                  {allCities.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </label>
              <label className="flex items-center gap-2 px-3 py-2.5 rounded-lg bg-background/80 border border-border">
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="bg-transparent w-full outline-none text-sm text-foreground"
                >
                  <option value="">All Types</option>
                  <option>Flat</option>
                  <option>Builder Floor</option>
                  <option>Villa</option>
                  <option>Plot</option>
                  <option>Shop</option>
                  <option>Office</option>
                </select>
              </label>
              <Button asChild variant="gold" size="lg">
                <Link
                  to="/properties"
                  search={{ purpose, city: city || undefined, type: type || undefined }}
                >
                  <Search className="h-4 w-4" /> Search
                </Link>
              </Button>
            </form>
          </div>

          {/* City quick links */}
          <div className="bg-white/5 backdrop-blur rounded-2xl p-6 border border-white/10">
            <div className="text-gold text-xs font-semibold uppercase tracking-widest">Popular Cities</div>
            <div className="mt-4 grid grid-cols-2 gap-3">
              {allCities.map((c) => (
                <Link
                  key={c}
                  to="/properties"
                  search={{ purpose, city: c }}
                  className="group flex items-center justify-between rounded-xl bg-white/5 hover:bg-gold/15 border border-white/10 px-4 py-3 transition-colors"
                >
                  <span className="font-semibold text-white">{c}</span>
                  <span className="text-xs text-white/60 group-hover:text-gold">
                    {cityCounts[c] ?? 0} listings
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Listings */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl container-px">
          <div className="flex items-end justify-between flex-wrap gap-4 mb-10">
            <div>
              <span className="text-gold font-semibold text-sm uppercase tracking-widest">{purpose} Properties</span>
              <h2 className="mt-2 font-display text-3xl md:text-4xl font-bold">
                {list.length} {purpose === "Rent" ? "rental" : purpose.toLowerCase()} {list.length === 1 ? "property" : "properties"} available
              </h2>
            </div>
            <Link
              to="/properties"
              search={{ purpose }}
              className="inline-flex items-center gap-2 text-navy font-semibold hover:text-gold"
            >
              View all <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {list.length === 0 ? (
            <div className="bg-secondary rounded-2xl p-12 text-center">
              <p className="text-muted-foreground">
                No {purpose.toLowerCase()} properties match your filters yet. Talk to our experts —
                we have unlisted inventory across NCR.
              </p>
              <Button asChild variant="gold" className="mt-5">
                <a href="https://wa.me/919654440099" target="_blank" rel="noopener noreferrer">
                  💬 WhatsApp our team
                </a>
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {list.map((p) => <PropertyCard key={p.id} p={p} />)}
            </div>
          )}
        </div>
      </section>

      {/* Lead form */}
      <section className="py-16 bg-secondary">
        <div className="mx-auto max-w-7xl container-px grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <span className="text-gold font-semibold text-sm uppercase tracking-widest">Free Consultation</span>
            <h2 className="mt-2 font-display text-3xl md:text-5xl font-bold">{ctaLabel}</h2>
            <p className="mt-4 text-muted-foreground leading-relaxed max-w-lg">
              Share your requirement — our Delhi NCR experts will call you back within 30 minutes
              with shortlisted options, transparent pricing, and zero brokerage deals where applicable.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild variant="gold" size="lg">
                <a href="tel:9654440099">📞 Call 96544 40099</a>
              </Button>
              <Button asChild variant="outline" size="lg">
                <a href="https://wa.me/919654440099" target="_blank" rel="noopener noreferrer">💬 WhatsApp</a>
              </Button>
            </div>
          </div>
          <div className="bg-card rounded-2xl p-6 md:p-8 shadow-card border border-border">
            <InquiryForm propertyTitle={`${purpose} enquiry`} />
          </div>
        </div>
      </section>
    </div>
  );
}
