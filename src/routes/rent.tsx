import { createFileRoute } from "@tanstack/react-router";
import { PurposePage } from "@/components/site/PurposePage";

export const Route = createFileRoute("/rent")({
  head: () => ({
    meta: [
      { title: "Rent Flats & Homes in Delhi NCR — Furnished & Semi-Furnished | Group One Realty" },
      { name: "description", content: "Rent verified furnished and semi-furnished flats, builder floors and villas in Gurgaon, Noida, Greater Noida and Delhi. Quick possession, owner-direct, zero brokerage options." },
      { property: "og:title", content: "Rent a Home in Delhi NCR — Group One Realty" },
      { property: "og:description", content: "Furnished and semi-furnished rentals across Gurgaon, Noida and Delhi NCR." },
    ],
  }),
  component: () => (
    <PurposePage
      purpose="Rent"
      eyebrow="Rent Property"
      title={<>Rent a <span className="text-gradient-gold">Home You'll Love</span> in Delhi NCR</>}
      subtitle="Furnished, semi-furnished and unfurnished homes across NCR — quick possession, verified owners, and zero brokerage on select properties."
      bullets={["Verified Owners", "Furnished Options", "Quick Possession", "Zero Brokerage Deals"]}
      ctaLabel="Looking for a rental? We'll find it in 48 hours"
    />
  ),
});
