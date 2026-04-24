import { createFileRoute } from "@tanstack/react-router";
import { PurposePage } from "@/components/site/PurposePage";

export const Route = createFileRoute("/buy")({
  head: () => ({
    meta: [
      { title: "Buy Property in Delhi NCR — Flats, Villas & Plots | Group One Realty" },
      { name: "description", content: "Buy RERA-approved flats, builder floors, villas and plots across Gurgaon, Noida, Delhi NCR. Verified listings, transparent pricing, zero brokerage on select deals." },
      { property: "og:title", content: "Buy Property in Delhi NCR — Group One Realty" },
      { property: "og:description", content: "Verified RERA-approved properties for sale across Gurgaon, Noida, Greater Noida & Delhi." },
    ],
  }),
  component: () => (
    <PurposePage
      purpose="Buy"
      eyebrow="Buy Property"
      title={<>Buy Your <span className="text-gradient-gold">Dream Home</span> in Delhi NCR</>}
      subtitle="Hand-picked, RERA-approved flats, villas and plots across Gurgaon, Noida and Delhi — verified by our local market experts."
      bullets={["RERA Approved", "Zero Brokerage Deals", "Best Price Guaranteed", "Site Visits Arranged"]}
      ctaLabel="Find your perfect home — talk to an expert"
    />
  ),
});
