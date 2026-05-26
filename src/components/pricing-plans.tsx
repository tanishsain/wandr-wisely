import { Sparkles, Zap, Crown, ArrowRight, Flame } from "lucide-react";

interface PricingPlansProps {
  variant?: "full" | "compact";
  id?: string;
}

const plans = [
  {
    name: "Basic",
    price: 199,
    original: 499,
    href: "https://rzp.io/rzp/wandrwisely-basic",
    icon: Sparkles,
    tagline: "Perfect for a quick weekend getaway",
    features: [
      "1 destination trip plan",
      "Day-by-day AI itinerary",
      "Budget breakdown in INR",
      "Top attractions & food picks",
      "Email support",
    ],
  },
  {
    name: "Standard",
    price: 499,
    original: 999,
    href: "https://rzp.io/rzp/wandrwisely-standard",
    icon: Zap,
    tagline: "Most popular for week-long trips",
    features: [
      "Up to 3 destination trip plans",
      "Detailed 7-day itineraries",
      "Hotel & flight recommendations",
      "Hidden gems & local food spots",
      "Personalized packing list",
      "Priority email support",
      "2 free revisions",
    ],
    highlight: true,
  },
  {
    name: "Premium",
    price: 999,
    original: 1999,
    href: "https://rzp.io/rzp/otXOpEWz",
    icon: Crown,
    tagline: "For the serious explorer",
    features: [
      "Unlimited destination trip plans",
      "Full multi-city itineraries",
      "Premium hotel & flight deals",
      "1-on-1 trip consultation",
      "Custom packing & budget sheets",
      "WhatsApp + priority support",
      "5 free revisions",
      "Lifetime plan updates",
    ],
  },
];

/** Gold-outlined CTA buttons for the 3 booking links. */
export function PricingButtonsRow() {
  return (
    <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
      {plans.map((p) => (
        <a
          key={p.name}
          href={p.href}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full
                     border text-gold text-xs font-semibold tracking-[0.22em] uppercase
                     bg-transparent transition-all duration-300
                     hover:bg-gold hover:text-primary-foreground hover:shadow-gold
                     focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gold)]/40"
          style={{ borderColor: "var(--border-gold-strong)" }}
        >
          <p.icon className="h-4 w-4" />
          <span>{p.name} · ₹{p.price}</span>
          <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
        </a>
      ))}
    </div>
  );
}

/** Full pricing section — luxury midnight & gold. */
export function PricingPlans({ id = "pricing" }: PricingPlansProps) {
  return (
    <section id={id} className="mx-auto max-w-6xl px-6 py-24">
      <div className="text-center mb-16">
        <div className="eyebrow mb-5 inline-flex items-center gap-2">
          <Flame className="h-3 w-3" /> Limited offer · 60% off
        </div>
        <h2 className="font-display text-4xl md:text-6xl font-medium tracking-tight mb-4">
          The plan for your journey
        </h2>
        <p className="text-muted-foreground max-w-xl mx-auto text-base">
          One-time payment. Lifetime access. <span className="text-gold">Only 10 spots left today.</span>
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 items-stretch">
        {plans.map((p) => {
          const Icon = p.icon;
          const isFeatured = p.highlight;

          return (
            <div
              key={p.name}
              className={`group relative rounded-2xl p-8 flex flex-col transition-all duration-500 hover:-translate-y-1 ${
                isFeatured ? "md:scale-105 md:-mt-3" : ""
              }`}
              style={{
                background: "var(--surface)",
                border: isFeatured
                  ? "1px solid transparent"
                  : "1px solid var(--border-gold)",
                backgroundImage: isFeatured
                  ? "linear-gradient(var(--surface), var(--surface)), var(--gradient-gold)"
                  : undefined,
                backgroundOrigin: isFeatured ? "border-box" : undefined,
                backgroundClip: isFeatured ? "padding-box, border-box" : undefined,
                boxShadow: isFeatured
                  ? "0 30px 60px -20px rgba(201,168,76,0.25), 0 0 0 1px rgba(201,168,76,0.1)"
                  : "var(--shadow-soft)",
              }}
            >
              {isFeatured && (
                <div
                  className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-[10px] font-semibold tracking-[0.22em] uppercase"
                  style={{
                    background: "var(--gradient-gold)",
                    color: "var(--ink)",
                  }}
                >
                  ★ Most Popular
                </div>
              )}

              <div className="flex items-center gap-3 mb-6">
                <div
                  className="h-11 w-11 rounded-full grid place-items-center border border-gold-strong text-gold"
                  style={{ borderColor: "var(--border-gold-strong)" }}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <div className="eyebrow text-gold">Plan</div>
                  <h3 className="font-display text-2xl font-medium">{p.name}</h3>
                </div>
              </div>

              <p className="text-sm text-muted-foreground mb-7">{p.tagline}</p>

              <div className="mb-2 flex items-center gap-2">
                <span className="text-sm line-through text-muted-foreground">₹{p.original}</span>
                <span
                  className="text-[10px] font-semibold tracking-[0.22em] uppercase px-2 py-0.5 rounded-sm text-gold"
                  style={{ borderColor: "var(--border-gold-strong)", border: "1px solid var(--border-gold-strong)" }}
                >
                  60% off
                </span>
              </div>
              <div className="flex items-baseline gap-2 mb-8">
                <span className="font-display text-6xl font-medium text-gold-gradient">₹{p.price}</span>
                <span className="text-sm text-muted-foreground">lifetime</span>
              </div>

              <ul className="space-y-3 mb-8 flex-1">
                {p.features.map((f) => (
                  <li key={f} className="flex gap-3 items-start text-sm text-foreground/90">
                    <span className="mt-1.5 text-gold text-xs leading-none">◆</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <a
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group/btn w-full inline-flex items-center justify-center gap-2.5 px-5 py-4 rounded-full text-xs font-semibold tracking-[0.22em] uppercase transition-all duration-300 hover:shadow-glow"
                style={{
                  background: "var(--gradient-gold)",
                  color: "var(--ink)",
                }}
              >
                Reserve {p.name}
                <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover/btn:translate-x-1" />
              </a>
            </div>
          );
        })}
      </div>

      <p className="text-center text-[11px] tracking-[0.22em] uppercase text-muted-foreground mt-12">
        Secure checkout · Razorpay · UPI · Cards · Net Banking
      </p>
    </section>
  );
}
