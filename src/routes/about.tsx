import { createFileRoute } from "@tanstack/react-router";
import { Award, Target, Eye, Users, ShieldCheck, TrendingUp, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us — Group One Realty | Delhi NCR Real Estate Experts" },
      { name: "description", content: "Learn about Group One Realty's mission to deliver transparent, RERA-compliant real estate services across Delhi NCR. 15+ years, 1000+ happy families." },
      { property: "og:title", content: "About Group One Realty" },
      { property: "og:description", content: "Your trusted Delhi NCR real estate partner since 2010." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="pt-24">
      <section className="bg-gradient-navy text-navy-foreground py-20">
        <div className="mx-auto max-w-7xl container-px">
          <span className="text-gold font-semibold text-sm uppercase tracking-widest">About Us</span>
          <h1 className="mt-2 font-display text-4xl md:text-6xl font-bold max-w-3xl">
            Building Trust in <span className="text-gradient-gold">Delhi NCR Real Estate</span>
          </h1>
          <p className="mt-5 text-white/80 max-w-2xl text-lg leading-relaxed">
            For over 15 years, Group One Realty has been the trusted bridge between
            premium properties and discerning buyers, sellers, investors and NRIs across the National Capital Region.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-7xl container-px grid md:grid-cols-3 gap-6">
          {[
            { icon: Target, t: "Our Mission", d: "To make Delhi NCR real estate transparent, accessible and rewarding for every family and investor we serve." },
            { icon: Eye, t: "Our Vision", d: "To be the most trusted real estate consultancy in North India, known for integrity, expertise, and client-first service." },
            { icon: Heart, t: "Our Promise", d: "Verified listings, transparent pricing, no hidden charges, and end-to-end support — every single time." },
          ].map(({ icon: Icon, t, d }) => (
            <div key={t} className="bg-card rounded-2xl p-8 shadow-card border border-border">
              <div className="h-12 w-12 rounded-xl bg-gradient-gold grid place-items-center shadow-gold">
                <Icon className="h-6 w-6 text-gold-foreground" />
              </div>
              <h2 className="mt-5 font-display text-2xl font-bold">{t}</h2>
              <p className="mt-3 text-muted-foreground leading-relaxed">{d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-20 bg-secondary">
        <div className="mx-auto max-w-7xl container-px grid md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-gold font-semibold text-sm uppercase tracking-widest">Our Story</span>
            <h2 className="mt-2 font-display text-4xl font-bold">A Decade of Trust, Thousands of Happy Homes</h2>
            <div className="mt-6 space-y-4 text-foreground/85 leading-relaxed">
              <p>
                Founded with a simple belief — that buying or selling property should
                be an empowering experience, not a stressful one — Group One Realty
                has grown into one of Delhi NCR's most respected real estate consultancies.
              </p>
              <p>
                Headquartered in Sector 86, Gurugram, our team of local market experts
                has facilitated transactions worth over ₹500 crore across Gurgaon, Noida,
                Greater Noida, Delhi, Ghaziabad and Faridabad.
              </p>
              <p>
                Whether it's a first-time buyer, an NRI investor, or a commercial
                portfolio expansion — every client receives the same dedication,
                transparency and personal attention that defines our brand.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { v: "1000+", l: "Happy Families" },
              { v: "₹500Cr+", l: "Properties Sold" },
              { v: "15+", l: "Years Experience" },
              { v: "500+", l: "Verified Listings" },
            ].map((s) => (
              <div key={s.l} className="bg-card rounded-2xl p-6 text-center shadow-card border border-border">
                <div className="font-display text-4xl font-bold text-gradient-gold">{s.v}</div>
                <div className="mt-1 text-sm text-muted-foreground uppercase tracking-wider">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-7xl container-px">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-gold font-semibold text-sm uppercase tracking-widest">Our Strengths</span>
            <h2 className="mt-2 font-display text-4xl md:text-5xl font-bold">Why Families Choose Us</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: ShieldCheck, t: "RERA Compliant", d: "Only legally registered, transparent projects." },
              { icon: Users, t: "Local Experts", d: "On-ground knowledge of every NCR micro-market." },
              { icon: Award, t: "Award-winning Service", d: "Consistently 5-star rated by clients & developers." },
              { icon: TrendingUp, t: "Investment Insight", d: "Data-driven recommendations for max ROI." },
            ].map(({ icon: Icon, t, d }) => (
              <div key={t} className="text-center p-6">
                <div className="mx-auto h-14 w-14 rounded-2xl bg-gradient-navy grid place-items-center shadow-luxury">
                  <Icon className="h-6 w-6 text-gold" />
                </div>
                <h3 className="mt-4 font-display text-xl font-semibold">{t}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-5xl container-px">
          <div className="bg-gradient-navy text-navy-foreground rounded-3xl p-10 md:p-16 text-center shadow-luxury">
            <h2 className="font-display text-3xl md:text-5xl font-bold">Ready to work with the <span className="text-gradient-gold">Delhi NCR experts?</span></h2>
            <p className="mt-4 text-white/80 max-w-2xl mx-auto">Get a free, no-obligation consultation with our team today.</p>
            <div className="mt-8 flex flex-wrap gap-3 justify-center">
              <Button asChild variant="gold" size="xl"><a href="tel:9654440099">📞 Call +91 96544 40099</a></Button>
              <Button asChild variant="outlineGold" size="xl"><a href="https://wa.me/919654440099" target="_blank" rel="noopener noreferrer">💬 WhatsApp Us</a></Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
