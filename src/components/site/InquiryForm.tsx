import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export function InquiryForm({ propertyTitle, compact = false }: { propertyTitle?: string; compact?: boolean }) {
  const [loading, setLoading] = useState(false);

  const fieldClassName = "bg-white text-black uppercase placeholder:normal-case";

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const form = e.currentTarget;
    const name = String(data.get("name") || "").trim().toUpperCase();
    const phone = String(data.get("phone") || "").trim();
    const email = String(data.get("email") || "").trim();
    const message = String(data.get("message") || "").trim();
    if (name.length < 2 || !/^[6-9]\d{9}$/.test(phone)) {
      toast.error("Please enter a valid name and 10-digit Indian mobile number.");
      return;
    }
    setLoading(true);

    const whatsappMessage = [
      "GET FREE CONSULTATION",
      `NAME: ${name}`,
      `MOBILE: ${phone}`,
      email ? `EMAIL: ${email}` : null,
      `PROPERTY: ${propertyTitle || "GENERAL PROPERTY ENQUIRY"}`,
      message ? `MESSAGE: ${message.toUpperCase()}` : null,
    ]
      .filter(Boolean)
      .join("\n");

    window.open(
      `https://wa.me/919654440099?text=${encodeURIComponent(whatsappMessage)}`,
      "_blank",
      "noopener,noreferrer",
    );
    toast.success("Opening WhatsApp with your enquiry.");
    form.reset();
    setLoading(false);
  };

  return (
    <form onSubmit={onSubmit} className={compact ? "space-y-3" : "space-y-4"}>
      <Input
        name="name"
        placeholder="Your Name *"
        required
        minLength={2}
        maxLength={80}
        className={fieldClassName}
      />
      <Input
        name="phone"
        type="tel"
        placeholder="Mobile Number *"
        required
        pattern="[6-9][0-9]{9}"
        maxLength={10}
        className="bg-white text-black placeholder:normal-case"
      />
      <Input
        name="email"
        type="email"
        placeholder="Email (optional)"
        maxLength={120}
        className="bg-white text-black placeholder:normal-case"
      />
      {!compact && (
        <Textarea
          name="message"
          placeholder={propertyTitle ? `I'm interested in: ${propertyTitle}` : "Tell us what you're looking for..."}
          rows={3}
          maxLength={500}
          className={fieldClassName}
        />
      )}
      <Button type="submit" disabled={loading} variant="gold" size="lg" className="w-full">
        {loading ? "Sending..." : "Get Free Consultation"}
      </Button>
      <p className="text-[11px] text-muted-foreground text-center">
        🔒 100% Confidential · No Spam · Expert callback in 30 mins
      </p>
    </form>
  );
}
