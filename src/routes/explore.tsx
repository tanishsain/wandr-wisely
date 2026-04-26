import { createFileRoute, Link } from "@tanstack/react-router";
import { zodValidator, fallback } from "@tanstack/zod-adapter";
import { z } from "zod";
import { Search, MapPin, Clock, DollarSign, Lightbulb, Tag, Building2 } from "lucide-react";
import { useMemo, useState } from "react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { DestinationCard } from "@/components/destination-card";
import { HotelAffiliateCard } from "@/components/hotel-affiliate-card";
import { destinations, getDestination, type Destination } from "@/data/destinations";
import { citiesFor } from "@/data/cities";

const searchSchema = z.object({
  q: fallback(z.string(), "").default(""),
});

export const Route = createFileRoute("/explore")({
  validateSearch: zodValidator(searchSchema),
  head: () => ({
    meta: [
      { title: "Explore destinations · Wandr" },
      { name: "description", content: "Browse 25 hand-picked destinations across the world. See top places, costs, and travel tips at a glance." },
      { property: "og:title", content: "Explore destinations · Wandr" },
      { property: "og:description", content: "Browse hand-picked destinations across the world." },
    ],
  }),
  component: ExplorePage,
});

const categoryTint: Record<string, string> = {
  Landmark: "bg-sun/30 text-foreground",
  Nature: "bg-leaf/20 text-foreground",
  Food: "bg-primary/15 text-primary",
  Culture: "bg-accent/40 text-foreground",
  Adventure: "bg-sky/30 text-foreground",
};

function ExplorePage() {
  const { q } = Route.useSearch();
  const navigate = Route.useNavigate();
  const [input, setInput] = useState(q);

  // Try exact slug match first, then fuzzy match
  const selected = useMemo<Destination | undefined>(() => {
    if (!q) return undefined;
    const direct = getDestination(q);
    if (direct) return direct;
    const lower = q.toLowerCase();
    return destinations.find(
      (d) =>
        d.name.toLowerCase().includes(lower) ||
        d.country.toLowerCase().includes(lower) ||
        d.slug.includes(lower),
    );
  }, [q]);

  const filtered = useMemo(() => {
    if (!q || selected) return destinations;
    const lower = q.toLowerCase();
    return destinations.filter(
      (d) =>
        d.name.toLowerCase().includes(lower) ||
        d.country.toLowerCase().includes(lower) ||
        d.region.toLowerCase().includes(lower),
    );
  }, [q, selected]);

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <section className="bg-warm border-b border-border/60">
        <div className="mx-auto max-w-6xl px-5 py-14">
          <h1 className="font-display text-4xl md:text-5xl font-semibold mb-3 text-balance">
            Where to next?
          </h1>
          <p className="text-muted-foreground mb-8 max-w-xl">
            Search a city, country, or just browse the lot. All 25 destinations
            below have been picked for being beautiful, beloved, and budget-friendly.
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              navigate({ search: { q: input.trim() } });
            }}
            className="max-w-xl flex items-center gap-2 p-2 bg-card rounded-full border border-border shadow-soft"
          >
            <div className="flex-1 flex items-center gap-3 pl-4">
              <Search className="h-5 w-5 text-muted-foreground shrink-0" />
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Try ‘Tokyo’, ‘Italy’, or ‘Asia’…"
                className="flex-1 bg-transparent py-3 outline-none placeholder:text-muted-foreground"
              />
            </div>
            <button
              type="submit"
              className="px-5 py-3 rounded-full bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
            >
              Search
            </button>
            {q && (
              <button
                type="button"
                onClick={() => {
                  setInput("");
                  navigate({ search: { q: "" } });
                }}
                className="px-4 py-3 rounded-full text-sm text-muted-foreground hover:text-foreground"
              >
                Clear
              </button>
            )}
          </form>
        </div>
      </section>

      {selected ? (
        <DestinationDetail dest={selected} />
      ) : (
        <section className="mx-auto max-w-6xl px-5 py-12">
          <p className="text-sm text-muted-foreground mb-6">
            {q ? `${filtered.length} matching destination${filtered.length === 1 ? "" : "s"}` : `Browsing all ${filtered.length} destinations`}
          </p>
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">🤷</div>
              <p className="text-muted-foreground mb-4">
                No matches for "{q}" yet. Try one of our curated picks below.
              </p>
              <button
                onClick={() => navigate({ search: { q: "" } })}
                className="text-primary font-medium hover:underline"
              >
                Show all destinations
              </button>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filtered.map((d) => (
                <DestinationCard key={d.slug} dest={d} />
              ))}
            </div>
          )}
        </section>
      )}

      <SiteFooter />
    </div>
  );
}

function DestinationDetail({ dest }: { dest: Destination }) {
  const total =
    dest.costs.stay + dest.costs.food + dest.costs.transport + dest.costs.activities;
  const cities = citiesFor(dest.slug);
  const cheapestNight = cities.length
    ? Math.min(...cities.map((c) => c.hotelFromUSD))
    : undefined;

  return (
    <section className="mx-auto max-w-6xl px-5 py-12">
      <div className="mb-8">
        <Link
          to="/explore"
          search={{ q: "" }}
          className="text-sm text-muted-foreground hover:text-primary"
        >
          ← Back to all destinations
        </Link>
      </div>

      <div className="grid lg:grid-cols-3 gap-8 mb-12">
        <div className="lg:col-span-2">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-6xl">{dest.emoji}</span>
            <span className="px-3 py-1 rounded-full bg-secondary text-xs font-medium">
              {dest.region}
            </span>
          </div>
          <h2 className="font-display text-5xl md:text-6xl font-semibold mb-2">
            {dest.name}
          </h2>
          <p className="text-xl text-muted-foreground mb-4">{dest.country}</p>
          <p className="text-lg text-foreground/80 max-w-2xl">{dest.tagline}</p>

          <div className="flex flex-wrap gap-4 mt-6 text-sm">
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border/60">
              <Clock className="h-4 w-4 text-primary" />
              <span><span className="text-muted-foreground">Best time:</span> {dest.bestTime}</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border/60">
              <DollarSign className="h-4 w-4 text-primary" />
              <span><span className="text-muted-foreground">Currency:</span> {dest.currency}</span>
            </div>
          </div>
        </div>

        <div className="rounded-3xl bg-sunset p-7 text-primary-foreground shadow-warm">
          <p className="text-sm opacity-90 mb-1">Daily budget from</p>
          <div className="font-display text-5xl font-semibold mb-5">${total}</div>
          <div className="space-y-2.5 text-sm">
            {[
              ["🏨 Stay", dest.costs.stay],
              ["🍜 Food", dest.costs.food],
              ["🚌 Transport", dest.costs.transport],
              ["🎟️ Activities", dest.costs.activities],
            ].map(([label, value]) => (
              <div key={label as string} className="flex justify-between border-b border-primary-foreground/20 pb-2 last:border-0">
                <span className="opacity-90">{label}</span>
                <span className="font-medium">${value}</span>
              </div>
            ))}
          </div>
          <Link
            to="/plan"
            search={{ destination: dest.slug }}
            className="mt-6 block text-center px-4 py-3 rounded-full bg-card text-primary font-medium hover:scale-105 transition-transform"
          >
            Plan a trip here →
          </Link>
        </div>
      </div>

      {/* Hotel + flight affiliate CTA */}
      <div className="mb-14">
        <HotelAffiliateCard city={`${dest.name}, ${dest.country}`} fromUSD={cheapestNight} />
      </div>

      {/* Cities */}
      {cities.length > 0 && (
        <div className="mb-14">
          <div className="flex items-center gap-2 mb-6">
            <Building2 className="h-5 w-5 text-primary" />
            <h3 className="font-display text-3xl font-semibold">Cities & neighborhoods</h3>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {cities.map((c) => (
              <div
                key={c.slug}
                className="p-6 rounded-3xl bg-card border border-border/60 shadow-soft hover:shadow-warm hover:-translate-y-1 transition-all"
              >
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-display text-xl font-semibold">{c.name}</h4>
                  <div className="text-right">
                    <div className="text-[10px] text-muted-foreground uppercase tracking-wide">Hotels</div>
                    <div className="font-display text-base font-semibold text-primary">
                      ${c.hotelFromUSD}
                      <span className="text-xs text-muted-foreground font-normal">/nt</span>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-foreground/80 mb-4">{c.hero}</p>
                <ul className="space-y-1.5 mb-4">
                  {c.attractions.slice(0, 3).map((a) => (
                    <li key={a.name} className="text-xs text-foreground/75 flex items-start gap-1.5">
                      <span className="text-primary">•</span>
                      <span><span className="font-medium">{a.name}</span> — {a.blurb}</span>
                    </li>
                  ))}
                </ul>
                <HotelAffiliateCard
                  city={`${c.name}, ${dest.country}`}
                  variant="inline"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Places */}
      <div className="mb-14">
        <div className="flex items-center gap-2 mb-6">
          <MapPin className="h-5 w-5 text-primary" />
          <h3 className="font-display text-3xl font-semibold">Famous places to visit</h3>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {dest.places.map((p) => (
            <div
              key={p.name}
              className="p-5 rounded-2xl bg-card border border-border/60 hover:shadow-soft transition-shadow"
            >
              <div className="flex items-start justify-between gap-3 mb-2">
                <h4 className="font-display text-lg font-semibold">{p.name}</h4>
                {p.free && (
                  <span className="text-xs px-2 py-0.5 rounded-full bg-leaf/20 text-leaf-foreground font-medium shrink-0">
                    FREE
                  </span>
                )}
              </div>
              <p className="text-sm text-foreground/80 mb-3">{p.why}</p>
              <span className={`inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full font-medium ${categoryTint[p.category]}`}>
                <Tag className="h-3 w-3" />
                {p.category}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Tips */}
      <div className="rounded-3xl bg-secondary/60 p-8 md:p-10">
        <div className="flex items-center gap-2 mb-6">
          <Lightbulb className="h-5 w-5 text-primary" />
          <h3 className="font-display text-3xl font-semibold">Money-saving tips</h3>
        </div>
        <ul className="grid md:grid-cols-2 gap-4">
          {dest.tips.map((tip, i) => (
            <li key={i} className="flex gap-3 items-start">
              <span className="mt-1 h-6 w-6 rounded-full bg-primary text-primary-foreground grid place-items-center text-xs font-semibold shrink-0">
                {i + 1}
              </span>
              <span className="text-foreground/85">{tip}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
