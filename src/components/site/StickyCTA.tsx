import { Phone, MessageCircle } from "lucide-react";

export function StickyCTA() {
  const wa =
    "https://wa.me/919654440099?text=Hi%20Group%20One%20Realty%2C%20I%27m%20interested%20in%20a%20property.";
  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-3">
      <a
        href={wa}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp"
        className="group h-14 w-14 grid place-items-center rounded-full bg-[oklch(0.65_0.16_145)] text-white shadow-luxury hover:scale-110 transition-transform animate-float"
      >
        <MessageCircle className="h-6 w-6" />
        <span className="sr-only">Chat on WhatsApp</span>
      </a>
      <a
        href="tel:9654440099"
        aria-label="Call"
        className="h-14 w-14 grid place-items-center rounded-full bg-gradient-gold text-gold-foreground shadow-gold hover:scale-110 transition-transform"
      >
        <Phone className="h-5 w-5" />
      </a>
    </div>
  );
}
