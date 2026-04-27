import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, Ticket, MapPin, ExternalLink } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { allCities } from "@/data/cities";
import { getDestination } from "@/data/destinations";
import { getYourGuideLink, bookingHotelsLink } from "@/lib/affiliate";
import { formatInr } from "@/lib/currency";

export const Route = createFileRoute("/attractions")({
  head: () => ({
    meta: [
      { title: "Top attractions worldwide · Wandr" },
      {
        name: "description",
        content:
          "Browse iconic landmarks, museums, food spots, and hidden gems across 30+ cities. Book tours and hotels in one click.",
      },
      { property: "og:title", content: "Top attractions worldwide · Wandr" },
      {
        property: "og:description",
        content: "Iconic landmarks, museums, and food spots across 30+ cities.",
      },
    ],
  }),
  component: AttractionsPage,
});

const TYPES = ["All", "Landmark", "Nature", "Museum", "Food", "Nightlife", "Adventure", "Market"] as const;

function AttractionsPage() {
  const [query, setQuery] = useState("");
  const [type, setType] = useState<(typeof TYPES)[number]>("All");

  const items = useMemo(() => {
    const all = allCities().flatMap(({ destinationSlug, city }) =>
      city.attractions.map((a) => ({
        attraction: a,
        cityName: city.name,
        destinationSlug,
        country: getDestination(destinationSlug)?.country ?? "",
      })),
    );
    const lower = query.trim().toLowerCase();
    return all.filter((it) => {
      if (type !== "All" && it.attraction.type !== type) return false;
      if (!lower) return true;
      return (
        it.attraction.name.toLowerCase().includes(lower) ||
        it.cityName.toLowerCase().includes(lower) ||
        it.country.toLowerCase().includes(lower)
      );
    });
  }, [query, type]);

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <section className="bg-warm border-b border-border/60">
        <div className="mx-auto max-w-6xl px-5 py-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-card border border-border/60 text-xs font-medium text-muted-foreground mb-4">
            <Ticket className="h-3 w-3 text-primary" /> {items.length}+ attractions
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-semibold mb-3 text-balance">
            Iconic places, hidden gems, every city.
          </h1>
          <p className="text-muted-foreground max-w-xl">
            Search landmarks, museums, food markets and nightlife across 30+ cities — then
            book skip-the-line tours or a place to stay nearby.
          </p>

          <div className="mt-6 flex items-center gap-2 max-w-lg p-2 bg-card rounded-full border border-border shadow-soft">
            <Search className="h-4 w-4 text-muted-foreground ml-3" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search attractions, cities, countries…"
              className="flex-1 bg-transparent py-2 outline-none text-sm placeholder:text-muted-foreground"
            />
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {TYPES.map((t) => (
              <button
                key={t}
                onClick={() => setType(t)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                  type === t
                    ? "bg-primary text-primary-foreground"
                    : "bg-card border border-border text-foreground/70 hover:border-primary/40"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-12">
        {items.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground">
            No attractions match your filters.
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {items.map((it) => (
              <article
                key={`${it.destinationSlug}-${it.cityName}-${it.attraction.name}`}
                className="p-5 rounded-3xl bg-card border border-border/60 shadow-soft hover:shadow-warm transition-all flex flex-col"
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="font-display text-lg font-semibold leading-tight">
                    {it.attraction.name}
                  </h3>
                  {it.attraction.free ? (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-leaf/20 text-leaf font-semibold shrink-0">
                      FREE
                    </span>
                  ) : typeof it.attraction.priceUSD === "number" ? (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-secondary font-semibold shrink-0">
                      ~${it.attraction.priceUSD} · {formatInr(it.attraction.priceUSD)}
                    </span>
                  ) : null}
                </div>

                <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-3">
                  <MapPin className="h-3 w-3" />
                  <Link
                    to="/explore"
                    search={{ q: it.destinationSlug }}
                    className="hover:text-primary"
                  >
                    {it.cityName} · {it.country}
                  </Link>
                </div>

                <p className="text-sm text-foreground/80 mb-4 flex-1">{it.attraction.blurb}</p>

                <div className="flex items-center gap-1.5 mb-3">
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-secondary font-medium">
                    {it.attraction.type}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <a
                    href={getYourGuideLink(`${it.attraction.name} ${it.cityName}`)}
                    target="_blank"
                    rel="sponsored noopener noreferrer"
                    className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-primary text-primary-foreground text-xs font-medium hover:bg-primary/90 transition-colors"
                  >
                    <Ticket className="h-3.5 w-3.5" /> Book tour
                    <ExternalLink className="h-3 w-3 opacity-70" />
                  </a>
                  <a
                    href={bookingHotelsLink(`${it.cityName}, ${it.country}`)}
                    target="_blank"
                    rel="sponsored noopener noreferrer"
                    className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-secondary text-foreground/80 text-xs font-medium hover:bg-secondary/80 transition-colors"
                  >
                    Hotels nearby
                    <ExternalLink className="h-3 w-3 opacity-70" />
                  </a>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      <SiteFooter />
    </div>
  );
}
