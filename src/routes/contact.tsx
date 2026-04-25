import { createFileRoute } from "@tanstack/react-router";
import { Phone, Mail, MapPin, MessageCircle, Clock } from "lucide-react";
import { InquiryForm } from "@/components/site/InquiryForm";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Group One Realty — Delhi NCR Real Estate Office" },
      {
        name: "description",
        content:
          "Visit, call, or WhatsApp Group One Realty. Office: Sector 86, Gurugram. Phone: +91 96544 40099. Email: info@grouponerealty.in",
      },
      { property: "og:title", content: "Contact Group One Realty" },
      {
        property: "og:description",
        content:
          "Reach our Delhi NCR real estate experts — call, WhatsApp, or visit our Gurugram office.",
      },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const cards = [
    {
      icon: Phone,
      t: "Call Us",
      v: "+91 96544 40099",
      href: "tel:9654440099",
      sub: "Mon–Sat, 9 AM – 8 PM",
    },
    {
      icon: MessageCircle,
      t: "WhatsApp",
      v: "+91 96544 40099",
      href: "https://wa.me/919654440099",
      sub: "Instant replies, 24×7",
    },
    {
      icon: Mail,
      t: "Email",
      v: "info@grouponerealty.in",
      href: "mailto:info@grouponerealty.in",
      sub: "Reply within 4 hours",
    },
  ];
  return (
    <div className="pt-24">
      <section className="bg-gradient-navy text-navy-foreground py-16">
        <div className="mx-auto max-w-7xl container-px">
          <span className="text-gold font-semibold text-sm uppercase tracking-widest">Contact</span>
          <h1 className="mt-2 font-display text-4xl md:text-6xl font-bold">
            Let's Find Your <span className="text-gradient-gold">Perfect Property</span>
          </h1>
          <p className="mt-4 text-white/80 max-w-2xl text-lg">
            Talk to a Delhi NCR expert today. Free, no-obligation consultation.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl container-px grid md:grid-cols-3 gap-5">
          {cards.map(({ icon: Icon, t, v, href, sub }) => (
            <a
              key={t}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              className="group bg-card rounded-2xl p-7 shadow-card border border-border hover:shadow-luxury hover:-translate-y-1 transition-all"
            >
              <div className="h-12 w-12 rounded-xl bg-gradient-gold grid place-items-center shadow-gold">
                <Icon className="h-6 w-6 text-gold-foreground" />
              </div>
              <div className="mt-5 text-xs uppercase tracking-wider text-muted-foreground">{t}</div>
              <div className="mt-1 font-display text-xl font-bold text-foreground group-hover:text-gold transition-colors">
                {v}
              </div>
              <div className="mt-1 text-sm text-muted-foreground">{sub}</div>
            </a>
          ))}
        </div>
      </section>

      <section className="pb-20">
        <div className="mx-auto max-w-7xl container-px grid lg:grid-cols-2 gap-10">
          <div>
            <h2 className="font-display text-3xl font-bold">Send us a message</h2>
            <p className="text-muted-foreground mt-2">
              Fill the form and our property expert will reach out within 30 minutes.
            </p>
            <div className="mt-8 bg-card rounded-2xl p-7 border border-border shadow-card">
              <InquiryForm />
            </div>
          </div>

          <div>
            <h2 className="font-display text-3xl font-bold">Visit our office</h2>
            <div className="mt-6 bg-card rounded-2xl p-7 border border-border shadow-card space-y-4">
              <div className="flex gap-3">
                <MapPin className="h-5 w-5 text-gold shrink-0 mt-1" />
                <div>
                  <div className="font-semibold">Group One Realty</div>
                  <div className="text-sm text-muted-foreground">
                    Unit Number-4, Pyramid Urban Homes 2,
                    <br />
                    Sector 86, Gurugram, Haryana 122004
                  </div>
                </div>
              </div>
              <div className="flex gap-3">
                <Clock className="h-5 w-5 text-gold shrink-0 mt-1" />
                <div>
                  <div className="font-semibold">Office Hours</div>
                  <div className="text-sm text-muted-foreground">
                    Monday – Saturday: 9:00 AM – 8:00 PM
                    <br />
                    Sunday: By appointment
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-6 rounded-2xl overflow-hidden border border-border shadow-card h-80">
              <iframe
                title="Office location"
                src="https://www.google.com/maps?q=Pyramid+Urban+Homes+2+Sector+86+Gurugram&output=embed"
                className="h-full w-full"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
