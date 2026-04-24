import { Link } from "@tanstack/react-router";
import { Bed, Bath, Maximize, MapPin, BadgeCheck } from "lucide-react";
import { type Property, formatINR } from "@/lib/properties";

export function PropertyCard({ p }: { p: Property }) {
  return (
    <Link
      to="/properties/$id"
      params={{ id: p.id }}
      className="group block bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-luxury transition-all duration-500 hover:-translate-y-1 border border-border"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={p.image}
          alt={p.title}
          loading="lazy"
          width={1024}
          height={768}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute top-3 left-3 flex flex-wrap gap-2">
          {p.featured && (
            <span className="bg-gradient-gold text-gold-foreground text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-gold">
              Featured
            </span>
          )}
          {p.zeroBrokerage && (
            <span className="bg-success text-success-foreground text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">
              Zero Brokerage
            </span>
          )}
        </div>
        {p.rera && (
          <span className="absolute top-3 right-3 inline-flex items-center gap-1 bg-white/95 text-navy text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">
            <BadgeCheck className="h-3 w-3 text-gold" /> RERA
          </span>
        )}
        <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
          <span className="bg-white/95 text-navy text-xs font-semibold px-2.5 py-1 rounded-md backdrop-blur">
            {p.type}
          </span>
          <span className="bg-navy/90 text-white text-base font-bold px-3 py-1.5 rounded-md backdrop-blur">
            {formatINR(p.price)}
          </span>
        </div>
      </div>
      <div className="p-5">
        <h3 className="font-display text-lg font-semibold text-foreground line-clamp-1 group-hover:text-navy transition-colors">
          {p.title}
        </h3>
        <p className="mt-1 text-sm text-muted-foreground flex items-center gap-1">
          <MapPin className="h-3.5 w-3.5 text-gold" />
          {p.location}, {p.city}
        </p>
        <div className="mt-4 flex items-center gap-4 text-sm text-muted-foreground border-t border-border pt-4">
          {p.bedrooms != null && (
            <span className="flex items-center gap-1.5"><Bed className="h-4 w-4 text-navy" />{p.bedrooms} Bed</span>
          )}
          {p.bathrooms != null && (
            <span className="flex items-center gap-1.5"><Bath className="h-4 w-4 text-navy" />{p.bathrooms} Bath</span>
          )}
          <span className="flex items-center gap-1.5 ml-auto"><Maximize className="h-4 w-4 text-navy" />{p.area} sqft</span>
        </div>
      </div>
    </Link>
  );
}
