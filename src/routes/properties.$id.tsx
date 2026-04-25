import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { getPropertyById, formatINR, properties } from "@/lib/properties";
import {
  Bed,
  Bath,
  Maximize,
  MapPin,
  BadgeCheck,
  Calendar,
  IndianRupee,
  Phone,
  MessageCircle,
  Calculator,
  X,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { InquiryForm } from "@/components/site/InquiryForm";
import { PropertyCard } from "@/components/site/PropertyCard";

type GalleryPhoto = {
  label: string;
  image: string;
};

const roomGallery: GalleryPhoto[] = [
  {
    label: "Living Hall",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=900&q=80",
  },
  {
    label: "Modular Kitchen",
    image:
      "https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=900&q=80",
  },
  {
    label: "Bedroom",
    image:
      "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=900&q=80",
  },
  {
    label: "Balcony",
    image:
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=900&q=80",
  },
  {
    label: "Bathroom",
    image:
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=900&q=80",
  },
];

export const Route = createFileRoute("/properties/$id")({
  loader: ({ params }) => {
    const property = getPropertyById(params.id);
    if (!property) throw notFound();
    return { property };
  },
  head: ({ loaderData }) => {
    const p = loaderData?.property;
    if (!p) return { meta: [{ title: "Property — Group One Realty" }] };
    return {
      meta: [
        { title: `${p.title} — ${formatINR(p.price)} | Group One Realty` },
        { name: "description", content: `${p.description.slice(0, 150)}` },
        { property: "og:title", content: p.title },
        { property: "og:description", content: p.description.slice(0, 160) },
        { property: "og:image", content: p.image },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="pt-32 pb-20 text-center">
      <h1 className="font-display text-4xl">Property not found</h1>
      <Link to="/properties" className="text-gold mt-4 inline-block">
        Browse all properties
      </Link>
    </div>
  ),
  component: PropertyDetail,
});

function PropertyDetail() {
  const { property: p } = Route.useLoaderData();
  const [previewPhoto, setPreviewPhoto] = useState<GalleryPhoto | null>(null);
  const similar = properties.filter((x) => x.id !== p.id && x.city === p.city).slice(0, 3);
  const wa = `https://wa.me/919654440099?text=Hi%2C%20I%27m%20interested%20in%20${encodeURIComponent(p.title)}%20%28${p.id}%29.`;
  const gallery = [{ label: "Property Front", image: p.image }, ...roomGallery];

  useEffect(() => {
    if (!previewPhoto) return;

    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setPreviewPhoto(null);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [previewPhoto]);

  return (
    <div className="pt-24">
      {/* Gallery */}
      <div className="relative h-[60vh] min-h-[420px] overflow-hidden">
        <img
          src={p.image}
          alt={p.title}
          width={1920}
          height={1080}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 mx-auto max-w-7xl container-px pb-10 text-white">
          <div className="flex flex-wrap gap-2 mb-3">
            {p.featured && (
              <span className="bg-gradient-gold text-gold-foreground text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                Featured
              </span>
            )}
            {p.rera && (
              <span className="inline-flex items-center gap-1 bg-white/95 text-navy text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                <BadgeCheck className="h-3 w-3 text-gold" /> RERA
              </span>
            )}
            {p.zeroBrokerage && (
              <span className="bg-success text-success-foreground text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                Zero Brokerage
              </span>
            )}
          </div>
          <h1 className="font-display text-3xl md:text-5xl font-bold max-w-4xl">{p.title}</h1>
          <p className="mt-2 flex items-center gap-2 text-white/85">
            <MapPin className="h-4 w-4 text-gold" />
            {p.location}, {p.city}
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl container-px py-12 grid lg:grid-cols-[1fr_380px] gap-10">
        <div>
          {/* Property photos */}
          <section className="mb-8">
            <div className="flex items-end justify-between gap-4 mb-4">
              <div>
                <h2 className="font-display text-2xl md:text-3xl font-bold text-navy">
                  Property Photos
                </h2>
                <p className="text-sm text-muted-foreground mt-1">
                  Kitchen, rooms, hall and balcony views
                </p>
              </div>
              <span className="hidden sm:inline-flex rounded-full border border-border px-3 py-1 text-xs font-semibold text-muted-foreground">
                {gallery.length} Photos
              </span>
            </div>
            <div className="grid gap-3 md:grid-cols-4 md:grid-rows-2">
              {gallery.map((photo, index) => (
                <button
                  key={photo.label}
                  type="button"
                  onClick={() => setPreviewPhoto(photo)}
                  className={`group relative overflow-hidden rounded-2xl border border-border bg-secondary text-left shadow-card ${
                    index === 0 ? "md:col-span-2 md:row-span-2" : ""
                  }`}
                  aria-label={`Open ${photo.label} photo preview`}
                >
                  <img
                    src={photo.image}
                    alt={`${p.title} - ${photo.label}`}
                    loading={index === 0 ? "eager" : "lazy"}
                    className={`w-full object-cover transition duration-500 group-hover:scale-105 ${
                      index === 0 ? "h-72 md:h-full" : "h-44"
                    }`}
                  />
                  <span className="absolute inset-0 bg-navy/0 transition group-hover:bg-navy/10" />
                  <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy/85 to-transparent px-4 py-3 text-sm font-semibold text-white">
                    {photo.label}
                  </span>
                </button>
              ))}
            </div>
          </section>

          {/* Price & Highlights */}
          <div className="bg-card rounded-2xl p-6 md:p-8 shadow-card border border-border">
            <div className="flex items-end justify-between flex-wrap gap-4">
              <div>
                <div className="text-sm text-muted-foreground">Price</div>
                <div className="font-display text-4xl md:text-5xl font-bold text-navy">
                  {formatINR(p.price)}
                </div>
                {p.pricePerSqft ? (
                  <div className="text-sm text-muted-foreground mt-1">
                    ₹{p.pricePerSqft.toLocaleString("en-IN")} / sqft
                  </div>
                ) : null}
              </div>
              <div className="flex gap-3">
                <Button asChild variant="gold" size="lg">
                  <a href="tel:9654440099">
                    <Phone className="h-4 w-4" /> Call
                  </a>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <a href={wa} target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="h-4 w-4" /> WhatsApp
                  </a>
                </Button>
              </div>
            </div>
            <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-border">
              {p.bedrooms != null && <Stat icon={Bed} l="Bedrooms" v={String(p.bedrooms)} />}
              {p.bathrooms != null && <Stat icon={Bath} l="Bathrooms" v={String(p.bathrooms)} />}
              <Stat icon={Maximize} l="Area" v={`${p.area} sqft`} />
              <Stat icon={Calendar} l="Possession" v={p.possession} />
            </div>
          </div>

          {/* Description */}
          <Section title="About this property">
            <p className="text-foreground/85 leading-relaxed">{p.description}</p>
          </Section>

          {/* Amenities */}
          <Section title="Amenities">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {p.amenities.map((a) => (
                <div
                  key={a}
                  className="flex items-center gap-2 bg-secondary rounded-lg px-3 py-2.5 text-sm"
                >
                  <BadgeCheck className="h-4 w-4 text-gold shrink-0" /> {a}
                </div>
              ))}
            </div>
          </Section>

          {/* Details */}
          <Section title="Property details">
            <div className="grid sm:grid-cols-2 gap-x-8 gap-y-3">
              <Row k="Type" v={p.type} />
              <Row k="Category" v={p.category} />
              <Row k="Furnishing" v={p.furnished} />
              <Row k="Possession" v={p.possession} />
              <Row k="RERA" v={p.rera ? "Approved" : "—"} />
              <Row k="Property ID" v={p.id.toUpperCase()} />
            </div>
          </Section>

          {/* EMI calculator */}
          <Section
            title={
              <span className="flex items-center gap-2">
                <Calculator className="h-5 w-5 text-gold" /> EMI Calculator
              </span>
            }
          >
            <EMICalc price={p.price} />
          </Section>

          {/* Map */}
          <Section title="Location">
            <div className="rounded-2xl overflow-hidden border border-border h-80">
              <iframe
                title="Map"
                src={`https://www.google.com/maps?q=${encodeURIComponent(`${p.location}, ${p.city}, India`)}&output=embed`}
                className="h-full w-full"
                loading="lazy"
              />
            </div>
          </Section>
        </div>

        {/* Sidebar */}
        <aside className="lg:sticky lg:top-24 h-fit space-y-6">
          <div className="bg-gradient-navy rounded-2xl p-6 text-navy-foreground shadow-luxury">
            <h3 className="font-display text-xl font-bold">Book a Free Site Visit</h3>
            <p className="text-sm text-white/75 mt-1">
              Our expert will show you the property at your convenience.
            </p>
            <div className="mt-5 bg-background rounded-xl p-5">
              <InquiryForm propertyTitle={p.title} />
            </div>
          </div>
        </aside>
      </div>

      {similar.length > 0 && (
        <section className="bg-secondary py-16 mt-10">
          <div className="mx-auto max-w-7xl container-px">
            <h2 className="font-display text-3xl font-bold mb-8">Similar properties in {p.city}</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {similar.map((s) => (
                <PropertyCard key={s.id} p={s} />
              ))}
            </div>
          </div>
        </section>
      )}

      {previewPhoto ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-navy/90 px-4 py-6"
          role="dialog"
          aria-modal="true"
          aria-label={`${previewPhoto.label} photo preview`}
          onClick={() => setPreviewPhoto(null)}
        >
          <div className="relative w-full max-w-6xl" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              onClick={() => setPreviewPhoto(null)}
              className="absolute right-3 top-3 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white text-navy shadow-lg transition hover:bg-gold"
              aria-label="Close photo preview"
            >
              <X className="h-5 w-5" />
            </button>
            <img
              src={previewPhoto.image}
              alt={`${p.title} - ${previewPhoto.label}`}
              className="max-h-[82vh] w-full rounded-2xl object-contain"
            />
            <div className="mt-3 text-center font-display text-xl font-bold text-white">
              {previewPhoto.label}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function Stat({ icon: Icon, l, v }: { icon: LucideIcon; l: string; v: string }) {
  return (
    <div>
      <div className="flex items-center gap-2 text-muted-foreground text-xs uppercase tracking-wider">
        <Icon className="h-4 w-4 text-gold" /> {l}
      </div>
      <div className="mt-1 font-display text-lg font-semibold text-foreground">{v}</div>
    </div>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex justify-between border-b border-border py-2 text-sm">
      <span className="text-muted-foreground">{k}</span>
      <span className="font-medium text-foreground">{v}</span>
    </div>
  );
}

function Section({ title, children }: { title: React.ReactNode; children: React.ReactNode }) {
  return (
    <section className="mt-8 bg-card rounded-2xl p-6 md:p-8 shadow-card border border-border">
      <h2 className="font-display text-2xl font-bold mb-5">{title}</h2>
      {children}
    </section>
  );
}

function EMICalc({ price }: { price: number }) {
  const [loanPct, setLoanPct] = useState(80);
  const [rate, setRate] = useState(8.5);
  const [years, setYears] = useState(20);
  const principal = Math.round((price * loanPct) / 100);
  const r = rate / 12 / 100;
  const n = years * 12;
  const emi =
    r === 0 ? principal / n : (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);

  return (
    <div className="grid md:grid-cols-2 gap-6 items-center">
      <div className="space-y-4">
        <Slider
          label={`Loan Amount (${loanPct}%)`}
          value={loanPct}
          min={10}
          max={90}
          step={5}
          onChange={setLoanPct}
          suffix={formatINR(principal)}
        />
        <Slider
          label="Interest Rate"
          value={rate}
          min={6}
          max={14}
          step={0.1}
          onChange={setRate}
          suffix={`${rate.toFixed(1)}% p.a.`}
        />
        <Slider
          label="Tenure"
          value={years}
          min={5}
          max={30}
          step={1}
          onChange={setYears}
          suffix={`${years} years`}
        />
      </div>
      <div className="bg-gradient-navy text-navy-foreground rounded-2xl p-6 text-center shadow-luxury">
        <div className="text-sm text-white/70 uppercase tracking-wider">Monthly EMI</div>
        <div className="font-display text-4xl font-bold text-gradient-gold mt-2 flex items-center justify-center">
          <IndianRupee className="h-7 w-7 text-gold" />
          {Math.round(emi).toLocaleString("en-IN")}
        </div>
        <div className="mt-4 grid grid-cols-2 gap-3 text-sm pt-4 border-t border-white/10">
          <div>
            <div className="text-white/60 text-xs">Principal</div>
            <div className="font-semibold">{formatINR(principal)}</div>
          </div>
          <div>
            <div className="text-white/60 text-xs">Total Interest</div>
            <div className="font-semibold">{formatINR(Math.round(emi * n - principal))}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Slider({
  label,
  value,
  min,
  max,
  step,
  onChange,
  suffix,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (n: number) => void;
  suffix: string;
}) {
  return (
    <div>
      <div className="flex justify-between text-sm mb-1.5">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-semibold text-navy">{suffix}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-[oklch(0.78_0.13_80)]"
      />
    </div>
  );
}
