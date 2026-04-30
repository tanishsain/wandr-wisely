import { Check, Sparkles, Zap, Crown, ArrowRight } from "lucide-react";

interface PricingPlansProps {
  variant?: "full" | "compact";
  id?: string;
}

const plans = [
  {
    name: "Basic",
    price: 199,
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
    highlight: false,
  },
  {
    name: "Standard",
    price: 499,
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
    ],
    highlight: true,
  },
  {
    name: "Premium",
    price: 999,
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
      "Lifetime plan updates",
    ],
    highlight: false,
  },
];

/** Bright orange CTA buttons for the 3 booking links. */
export function PricingButtonsRow() {
  return (
    <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
      {plans.map((p) => (
        <a
          key={p.name}
          href={p.href}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative inline-flex items-center gap-2 px-6 py-3.5 rounded-full
                     bg-[#FF6A00] text-white font-semibold text-sm sm:text-base
                     shadow-[0_8px_24px_-8px_rgba(255,106,0,0.6)]
                     hover:bg-[#FF8124] hover:shadow-[0_14px_36px_-10px_rgba(255,106,0,0.75)]
                     hover:-translate-y-1 active:translate-y-0
                     transition-all duration-300 ease-out
                     focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6A00]/60 focus-visible:ring-offset-2"
        >
          <span className="absolute inset-0 rounded-full bg-white/20 opacity-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300" />
          <p.icon className="h-4 w-4 relative z-10" />
          <span className="relative z-10">{p.name} Plan — Rs.{p.price}</span>
          <ArrowRight className="h-4 w-4 relative z-10 transition-transform duration-300 group-hover:translate-x-1" />
        </a>
      ))}
    </div>
  );
}

/** Full pricing section with feature lists. */
export function PricingPlans({ id = "pricing" }: PricingPlansProps) {
  return (
    <section id={id} className="mx-auto max-w-6xl px-5 py-20">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF6A00]/10 text-[#FF6A00] text-xs font-semibold uppercase tracking-wide mb-4">
          <Sparkles className="h-3.5 w-3.5" /> Pricing
        </div>
        <h2 className="font-display text-4xl sm:text-5xl font-semibold tracking-tight mb-3">
          Pick the plan that fits your trip
        </h2>
        <p className="text-muted-foreground max-w-xl mx-auto">
          One-time payment. No subscriptions. Instant access after checkout.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {plans.map((p) => {
          const Icon = p.icon;
          return (
            <div
              key={p.name}
              className={`group relative rounded-3xl p-7 border transition-all duration-300 hover:-translate-y-1 ${
                p.highlight
                  ? "bg-card border-[#FF6A00] shadow-[0_20px_50px_-20px_rgba(255,106,0,0.45)] hover:shadow-[0_28px_60px_-20px_rgba(255,106,0,0.6)]"
                  : "bg-card border-border/60 shadow-soft hover:shadow-warm hover:border-[#FF6A00]/40"
              }`}
            >
              {p.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-[#FF6A00] text-white text-xs font-semibold shadow-md">
                  Most Popular
                </div>
              )}

              <div className={`inline-grid place-items-center h-11 w-11 rounded-2xl mb-4 ${
                p.highlight ? "bg-[#FF6A00] text-white" : "bg-[#FF6A00]/10 text-[#FF6A00]"
              }`}>
                <Icon className="h-5 w-5" />
              </div>

              <h3 className="font-display text-2xl font-semibold mb-1">{p.name}</h3>
              <p className="text-sm text-muted-foreground mb-4">{p.tagline}</p>

              <div className="flex items-baseline gap-1 mb-6">
                <span className="font-display text-5xl font-semibold">Rs.{p.price}</span>
                <span className="text-muted-foreground text-sm">one-time</span>
              </div>

              <ul className="space-y-2.5 mb-7">
                {p.features.map((f) => (
                  <li key={f} className="flex gap-2.5 items-start text-sm">
                    <span className="mt-0.5 h-5 w-5 rounded-full bg-[#FF6A00]/15 text-[#FF6A00] grid place-items-center shrink-0">
                      <Check className="h-3 w-3" strokeWidth={3} />
                    </span>
                    <span className="text-foreground/85">{f}</span>
                  </li>
                ))}
              </ul>

              <a
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`group/btn relative w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-full font-semibold text-sm transition-all duration-300 ease-out
                           hover:-translate-y-0.5 active:translate-y-0
                           focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6A00]/60 focus-visible:ring-offset-2
                           ${
                             p.highlight
                               ? "bg-[#FF6A00] text-white shadow-[0_10px_28px_-10px_rgba(255,106,0,0.7)] hover:bg-[#FF8124] hover:shadow-[0_16px_38px_-10px_rgba(255,106,0,0.8)]"
                               : "bg-[#FF6A00] text-white shadow-[0_8px_22px_-10px_rgba(255,106,0,0.6)] hover:bg-[#FF8124] hover:shadow-[0_14px_32px_-10px_rgba(255,106,0,0.75)]"
                           }`}
              >
                Get {p.name} — Rs.{p.price}
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
              </a>
            </div>
          );
        })}
      </div>

      <p className="text-center text-xs text-muted-foreground mt-8">
        Secure checkout powered by Razorpay · UPI, cards & net banking accepted
      </p>
    </section>
  );
}
