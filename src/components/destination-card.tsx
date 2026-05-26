import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import type { Destination } from "@/data/destinations";
import { formatInr } from "@/lib/currency";

// Cinematic gradient backdrop per region (stand-in for full-bleed photo)
const regionBackdrop: Record<Destination["region"], string> = {
  Asia: "linear-gradient(135deg, #2a1832 0%, #5a2a3a 45%, #c9a84c 130%)",
  Europe: "linear-gradient(135deg, #0e2230 0%, #2a3f5a 45%, #c9a84c 140%)",
  Americas: "linear-gradient(135deg, #2a1a14 0%, #5a3220 45%, #c9a84c 130%)",
  Africa: "linear-gradient(135deg, #3a2010 0%, #6a3818 45%, #c9a84c 130%)",
  Oceania: "linear-gradient(135deg, #0a2230 0%, #1a4a5a 45%, #c9a84c 140%)",
  "Middle East": "linear-gradient(135deg, #2a1a08 0%, #5a3a18 45%, #c9a84c 130%)",
};

export function DestinationCard({ dest }: { dest: Destination }) {
  const total =
    dest.costs.stay + dest.costs.food + dest.costs.transport + dest.costs.activities;

  return (
    <Link
      to="/explore"
      search={{ q: dest.slug }}
      className="group relative block rounded-2xl overflow-hidden border border-gold transition-all duration-500 hover:-translate-y-1 hover:shadow-glow"
      style={{
        background: regionBackdrop[dest.region],
        minHeight: "420px",
      }}
    >
      {/* Backdrop emoji as cinematic focal */}
      <div
        className="absolute inset-0 grid place-items-center text-[14rem] opacity-25 group-hover:opacity-35 group-hover:scale-110 transition-all duration-700"
        aria-hidden
      >
        {dest.emoji}
      </div>

      {/* Vignette + bottom-up dark gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(8,12,24,0.2) 0%, rgba(8,12,24,0.4) 50%, rgba(8,12,24,0.95) 100%)",
        }}
      />

      {/* Gold hover frame */}
      <div className="absolute inset-2 rounded-xl border border-transparent group-hover:border-gold-strong transition-colors duration-500 pointer-events-none" />

      {/* Top — region eyebrow + arrow */}
      <div className="relative z-10 flex items-start justify-between p-6">
        <span className="eyebrow">{dest.region}</span>
        <span className="h-9 w-9 rounded-full border border-gold grid place-items-center text-gold group-hover:bg-gold group-hover:text-primary-foreground transition-all">
          <ArrowUpRight className="h-4 w-4 group-hover:rotate-45 transition-transform" />
        </span>
      </div>

      {/* Bottom content */}
      <div className="absolute inset-x-0 bottom-0 z-10 p-6">
        <div className="text-[10px] font-semibold tracking-[0.28em] uppercase text-gold/90 mb-2">
          {dest.country}
        </div>
        <h3 className="font-display text-4xl font-medium text-foreground mb-3 leading-none">
          {dest.name}
        </h3>
        <p className="text-sm text-foreground/70 mb-5 line-clamp-2 leading-relaxed">
          {dest.tagline}
        </p>

        <div className="flex items-center justify-between pt-4 border-t border-gold">
          <span
            className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider"
            style={{
              background: "var(--gradient-gold)",
              color: "var(--ink)",
            }}
          >
            From ${total}/day
          </span>
          <span className="text-[11px] text-muted-foreground">
            {formatInr(total)} · day
          </span>
        </div>
      </div>
    </Link>
  );
}
