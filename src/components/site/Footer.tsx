import { Link } from "@tanstack/react-router";
import { Home, MapPin, Phone, Mail, Facebook, Instagram, Linkedin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-navy text-navy-foreground mt-24">
      <div className="mx-auto max-w-7xl container-px py-16 grid gap-12 md:grid-cols-4">
        <div className="md:col-span-2">
          <Link to="/" className="flex items-center gap-2 mb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-gold">
              <Home className="h-5 w-5 text-gold-foreground" />
            </div>
            <div className="font-display text-xl font-bold">
              Group One <span className="text-gradient-gold">Realty</span>
            </div>
          </Link>
          <p className="text-sm text-white/70 max-w-md leading-relaxed">
            Your trusted partner for buying, selling, renting, and investing in
            premium Delhi NCR real estate. RERA-approved projects, verified
            listings, transparent guidance.
          </p>
          <div className="flex gap-3 mt-6">
            {[Facebook, Instagram, Linkedin].map((Icon, i) => (
              <a key={i} href="#" aria-label="social" className="h-9 w-9 grid place-items-center rounded-full border border-white/15 hover:bg-gold hover:text-gold-foreground hover:border-gold transition-colors">
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-display text-lg mb-4 text-gold">Quick Links</h4>
          <ul className="space-y-2 text-sm text-white/70">
            <li><Link to="/" className="hover:text-gold">Home</Link></li>
            <li><Link to="/buy" className="hover:text-gold">Buy Property</Link></li>
            <li><Link to="/rent" className="hover:text-gold">Rent Property</Link></li>
            <li><Link to="/resale" className="hover:text-gold">Resale Property</Link></li>
            <li><Link to="/properties" className="hover:text-gold">All Listings</Link></li>
            <li><Link to="/about" className="hover:text-gold">About Us</Link></li>
            <li><Link to="/contact" className="hover:text-gold">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display text-lg mb-4 text-gold">Reach Us</h4>
          <ul className="space-y-3 text-sm text-white/80">
            <li className="flex gap-2">
              <MapPin className="h-4 w-4 mt-0.5 text-gold shrink-0" />
              <span>Unit 4, Pyramid Urban Homes 2, Sector 86, Gurugram, HR 122004</span>
            </li>
            <li className="flex gap-2">
              <Phone className="h-4 w-4 mt-0.5 text-gold shrink-0" />
              <a href="tel:9654440099" className="hover:text-gold">+91 96544 40099</a>
            </li>
            <li className="flex gap-2">
              <Mail className="h-4 w-4 mt-0.5 text-gold shrink-0" />
              <a href="mailto:info@grouponerealty.in" className="hover:text-gold">info@grouponerealty.in</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl container-px py-5 flex flex-col md:flex-row justify-between gap-3 text-xs text-white/60">
          <div>© {new Date().getFullYear()} Group One Realty. All rights reserved.</div>
          <div className="flex gap-5">
            <a href="#" className="hover:text-gold">Privacy Policy</a>
            <a href="#" className="hover:text-gold">Terms & Conditions</a>
            <a href="#" className="hover:text-gold">Disclaimer</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
