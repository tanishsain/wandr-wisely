import { Sparkles, Check, X, ArrowRight } from "lucide-react";

interface ProPaywallProps {
  open: boolean;
  onClose: () => void;
  onUnlock: () => void;
}

const plans = [
  {
    name: "Basic",
    price: 199,
    href: "https://rzp.io/rzp/wandrwisely-basic",
    tagline: "Quick weekend getaway",
  },
  {
    name: "Standard",
    price: 499,
    href: "https://rzp.io/rzp/wandrwisely-standard",
    tagline: "Most popular · week-long trips",
    highlight: true,
  },
  {
    name: "Premium",
    price: 999,
    href: "https://rzp.io/rzp/wandrwisely-basic",
    tagline: "Multi-city explorer",
  },
];

export function ProPaywall({ open, onClose, onUnlock }: ProPaywallProps) {
  if (!open) return null;

  // After redirecting to Razorpay, optimistically unlock locally so the
  // user sees their full plan when they return to the tab.
  const handleSelect = () => {
    onUnlock();
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-foreground/40 backdrop-blur-sm p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg rounded-3xl bg-card shadow-warm overflow-hidden border border-border/60"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 h-8 w-8 rounded-full bg-card/80 grid place-items-center hover:bg-secondary transition-colors"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="bg-sunset p-6 text-primary-foreground">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-card/20 backdrop-blur text-xs font-medium mb-3">
            <Sparkles className="h-3 w-3" /> Wandr Pro
          </div>
          <h3 className="font-display text-3xl font-semibold mb-1">Unlock the full trip</h3>
          <p className="text-primary-foreground/90 text-sm">
            Pick a plan. Secure one-time payment via Razorpay.
          </p>
        </div>

        <div className="p-6">
          <ul className="space-y-2.5 mb-6">
            {[
              "Full day-by-day AI itinerary (not just Day 1)",
              "Hidden gems & insider restaurant picks",
              "Personalized packing list",
              "Daily spending estimates",
              "Exportable trip summary",
            ].map((f) => (
              <li key={f} className="flex gap-2.5 items-start text-sm">
                <span className="mt-0.5 h-5 w-5 rounded-full bg-leaf/20 text-leaf grid place-items-center shrink-0">
                  <Check className="h-3 w-3" strokeWidth={3} />
                </span>
                <span>{f}</span>
              </li>
            ))}
          </ul>

          <div className="space-y-2.5">
            {plans.map((p) => (
              <a
                key={p.name}
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleSelect}
                className={`group flex items-center justify-between gap-3 px-5 py-3.5 rounded-2xl font-medium text-sm transition-all duration-300 hover:-translate-y-0.5 ${
                  p.highlight
                    ? "bg-[#FF6A00] text-white shadow-[0_10px_28px_-10px_rgba(255,106,0,0.7)] hover:bg-[#FF8124]"
                    : "bg-secondary text-foreground hover:bg-[#FF6A00] hover:text-white"
                }`}
              >
                <div className="flex flex-col text-left">
                  <span className="font-semibold">{p.name} — Rs.{p.price}</span>
                  <span className={`text-xs ${p.highlight ? "text-white/85" : "text-muted-foreground group-hover:text-white/85"}`}>
                    {p.tagline}
                  </span>
                </div>
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            ))}
          </div>

          <p className="text-center text-xs text-muted-foreground mt-4">
            Secure checkout · UPI, cards & net banking
          </p>
        </div>
      </div>
    </div>
  );
}
