import { createFileRoute } from "@tanstack/react-router";
import { PurposePage } from "@/components/site/PurposePage";

export const Route = createFileRoute("/resale")({
  head: () => ({
    meta: [
      { title: "Resale Flats & Properties in Delhi NCR — Best Deals | Group One Realty" },
      {
        name: "description",
        content:
          "Buy resale flats, builder floors and villas in Gurgaon, Noida and Delhi NCR. Negotiated prices, ready-to-move-in homes, transparent paperwork and end-to-end support.",
      },
      { property: "og:title", content: "Resale Properties in Delhi NCR — Group One Realty" },
      {
        property: "og:description",
        content: "Best resale deals on ready-to-move flats and homes across Delhi NCR.",
      },
    ],
  }),
  component: () => (
    <PurposePage
      purpose="Resale"
      eyebrow="Resale Property"
      title={
        <>
          Smart <span className="text-gradient-gold">Resale Deals</span> Across Delhi NCR
        </>
      }
      subtitle="Ready-to-move resale flats and homes at negotiated prices — fully verified paperwork, transparent ownership history, and end-to-end support."
      bullets={["Ready to Move", "Verified Paperwork", "Negotiated Pricing", "Loan Assistance"]}
      ctaLabel="Find a great resale deal — handpicked by our experts"
    />
  ),
});
