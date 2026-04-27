import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import type { Destination } from "@/data/destinations";
import { formatInr } from "@/lib/currency";

export function DestinationCard({ dest }: { dest: Destination }) {
  const total =
    dest.costs.stay + dest.costs.food + dest.costs.transport + dest.costs.activities;

  return (
    <Link
      to="/explore"
      search={{ q: dest.slug }}
      className="group relative block rounded-3xl bg-card border border-border/60 p-6 shadow-soft hover:shadow-warm hover:-translate-y-1 transition-all duration-300 overflow-hidden"
    >
      <div className="absolute -top-12 -right-12 h-40 w-40 rounded-full bg-glow opacity-60 group-hover:opacity-100 transition-opacity" />

      <div className="relative flex items-start justify-between mb-4">
        <span className="text-5xl" aria-hidden>{dest.emoji}</span>
        <ArrowUpRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:rotate-45 transition-all" />
      </div>

      <h3 className="relative font-display text-2xl font-semibold mb-1">
        {dest.name}
      </h3>
      <p className="relative text-sm text-muted-foreground mb-4">{dest.country}</p>

      <p className="relative text-sm text-foreground/80 mb-5 line-clamp-2">
        {dest.tagline}
      </p>

      <div className="relative flex items-center justify-between pt-4 border-t border-border/60">
        <div>
          <div className="text-xs text-muted-foreground">From</div>
          <div className="font-display text-xl font-semibold text-primary">
            ${total}
            <span className="text-sm font-sans text-muted-foreground font-normal">
              {" "}/ day
            </span>
          </div>
          <div className="text-xs text-muted-foreground">{formatInr(total)} / day</div>
        </div>
        <span className="text-xs px-3 py-1.5 rounded-full bg-secondary text-secondary-foreground">
          {dest.region}
        </span>
      </div>
    </Link>
  );
}
