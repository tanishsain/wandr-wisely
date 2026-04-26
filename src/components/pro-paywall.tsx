import { Lock, Sparkles, Check, X } from "lucide-react";
import { useState } from "react";

interface ProPaywallProps {
  open: boolean;
  onClose: () => void;
  onUnlock: () => void;
}

export function ProPaywall({ open, onClose, onUnlock }: ProPaywallProps) {
  const [processing, setProcessing] = useState(false);

  if (!open) return null;

  const handleUnlock = () => {
    setProcessing(true);
    // Simulated checkout — in real life this would hit Stripe
    setTimeout(() => {
      onUnlock();
      setProcessing(false);
      onClose();
    }, 900);
  };

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-foreground/40 backdrop-blur-sm p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md rounded-3xl bg-card shadow-warm overflow-hidden border border-border/60"
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
            One-time payment. Yours forever, on this device.
          </p>
        </div>

        <div className="p-6">
          <ul className="space-y-3 mb-6">
            {[
              "Full day-by-day AI itinerary (not just Day 1)",
              "Hidden gems & insider restaurant picks",
              "Personalized packing list",
              "Daily spending estimates",
              "Exportable plain-text trip summary",
            ].map((f) => (
              <li key={f} className="flex gap-3 items-start text-sm">
                <span className="mt-0.5 h-5 w-5 rounded-full bg-leaf/20 text-leaf grid place-items-center shrink-0">
                  <Check className="h-3 w-3" strokeWidth={3} />
                </span>
                <span>{f}</span>
              </li>
            ))}
          </ul>

          <div className="flex items-baseline gap-2 mb-5">
            <span className="font-display text-4xl font-semibold">$9</span>
            <span className="text-muted-foreground text-sm line-through">$19</span>
            <span className="ml-auto text-xs px-2 py-1 rounded-full bg-sun/30 text-foreground font-medium">
              Launch price
            </span>
          </div>

          <button
            onClick={handleUnlock}
            disabled={processing}
            className="w-full px-5 py-3.5 rounded-full bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 shadow-soft disabled:opacity-60"
          >
            {processing ? (
              <>Processing…</>
            ) : (
              <>
                <Lock className="h-4 w-4" /> Unlock Pro for $9
              </>
            )}
          </button>
          <p className="text-center text-xs text-muted-foreground mt-3">
            Demo checkout · no real charge
          </p>
        </div>
      </div>
    </div>
  );
}
