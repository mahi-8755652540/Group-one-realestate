import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, Home } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/properties", label: "Properties" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled ? "glass shadow-card py-3" : "bg-transparent py-5"
      )}
    >
      <div className="mx-auto max-w-7xl container-px flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-navy shadow-luxury">
            <Home className="h-5 w-5 text-gold" />
          </div>
          <div className="leading-tight">
            <div className={cn("font-display text-lg font-bold", scrolled ? "text-navy" : "text-white")}>
              Group One <span className="text-gradient-gold">Realty</span>
            </div>
            <div className={cn("text-[10px] uppercase tracking-widest", scrolled ? "text-muted-foreground" : "text-white/70")}>
              Delhi NCR Experts
            </div>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={cn(
                "text-sm font-medium transition-colors hover:text-gold",
                scrolled ? "text-foreground" : "text-white"
              )}
              activeProps={{ className: "text-gold" }}
              activeOptions={{ exact: l.to === "/" }}
            >
              {l.label}
            </Link>
          ))}
          <a
            href="tel:9654440099"
            className="inline-flex items-center justify-center rounded-full bg-gradient-gold px-5 py-2.5 text-sm font-semibold text-gold-foreground shadow-gold hover:scale-105 transition-transform"
          >
            +91 96544 40099
          </a>
        </nav>

        <button
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
          className={cn("md:hidden p-2 rounded-md", scrolled ? "text-foreground" : "text-white")}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden glass border-t border-border mt-3">
          <div className="mx-auto max-w-7xl container-px py-4 flex flex-col gap-3">
            {navLinks.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="text-foreground py-2 font-medium"
                activeProps={{ className: "text-gold" }}
                activeOptions={{ exact: l.to === "/" }}
              >
                {l.label}
              </Link>
            ))}
            <a
              href="tel:9654440099"
              className="inline-flex items-center justify-center rounded-full bg-gradient-gold px-5 py-2.5 text-sm font-semibold text-gold-foreground shadow-gold mt-2"
            >
              Call +91 96544 40099
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
