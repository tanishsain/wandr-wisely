import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { MapPin, Sparkles, Loader2, Star, Search, ArrowRight, Tag } from "lucide-react";
import { searchIndianCity, type OTMCityResult } from "@/lib/opentripmap.functions";
import { HotelAffiliateCard } from "@/components/hotel-affiliate-card";
import { destinations, type Destination, type Place } from "@/data/destinations";
import { citiesByDestination, type City } from "@/data/cities";

type LocalMatch = {
  destination: Destination;
  matchedCities: City[];
  matchedPlaces: Place[];
  score: number;
};

type LiveState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "error"; message: string }
  | { status: "ok"; data: OTMCityResult };

const indianDestinations = destinations.filter((d) => d.country === "India");

function scoreMatch(query: string, dest: Destination): LocalMatch | null {
  const q = query.toLowerCase().trim();
  if (!q) return null;

  let score = 0;
  const inName = dest.name.toLowerCase().includes(q);
  const inSlug = dest.slug.toLowerCase().includes(q);
  if (dest.name.toLowerCase() === q) score += 100;
  else if (inName) score += 50;
  if (inSlug) score += 20;

  const cities = citiesByDestination[dest.slug] ?? [];
  const matchedCities = cities.filter(
    (c) => c.name.toLowerCase().includes(q) || c.slug.toLowerCase().includes(q),
  );
  if (matchedCities.length) score += 40 + matchedCities.length * 5;

  const matchedPlaces = dest.places.filter((p) =>
    p.name.toLowerCase().includes(q),
  );
  if (matchedPlaces.length) score += 25 + matchedPlaces.length * 3;

  if (dest.tagline.toLowerCase().includes(q)) score += 5;

  if (score === 0) return null;
  return { destination: dest, matchedCities, matchedPlaces, score };
}

export function IndiaLiveSearch({ initialQuery = "" }: { initialQuery?: string }) {
  const [query, setQuery] = useState(initialQuery);
  const [submitted, setSubmitted] = useState(initialQuery.trim());
  const [live, setLive] = useState<LiveState>({ status: "idle" });
  const search = useServerFn(searchIndianCity);

  const localResults = useMemo<LocalMatch[]>(() => {
    if (!submitted) return [];
    return indianDestinations
      .map((d) => scoreMatch(submitted, d))
      .filter((m): m is LocalMatch => m !== null)
      .sort((a, b) => b.score - a.score)
      .slice(0, 8);
  }, [submitted]);

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    const q = query.trim();
    if (!q) return;
    setSubmitted(q);
    setLive({ status: "loading" });
    try {
      const result = await search({ data: { query: q } });
      if ("error" in result) {
        setLive({ status: "error", message: result.error });
      } else {
        setLive({ status: "ok", data: result });
      }
    } catch (err) {
      setLive({
        status: "error",
        message: err instanceof Error ? err.message : "Live enrichment unavailable",
      });
    }
  }

  return (
    <div className="rounded-3xl bg-card border border-border/60 p-6 md:p-8 shadow-soft">
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="h-5 w-5 text-primary" />
        <h3 className="font-display text-2xl font-semibold">Search India — states, cities & towns</h3>
      </div>
      <p className="text-sm text-muted-foreground mb-5">
        All 28 Indian states + popular cities indexed. Try{" "}
        <button
          type="button"
          onClick={() => { setQuery("Kerala"); setSubmitted("Kerala"); }}
          className="text-primary hover:underline"
        >Kerala</button>,{" "}
        <button
          type="button"
          onClick={() => { setQuery("Jaipur"); setSubmitted("Jaipur"); }}
          className="text-primary hover:underline"
        >Jaipur</button>,{" "}
        <button
          type="button"
          onClick={() => { setQuery("Sri Ganganagar"); setSubmitted("Sri Ganganagar"); }}
          className="text-primary hover:underline"
        >Sri Ganganagar</button>, or{" "}
        <button
          type="button"
          onClick={() => { setQuery("Hampi"); setSubmitted("Hampi"); }}
          className="text-primary hover:underline"
        >Hampi</button>.
      </p>

      <form onSubmit={handleSearch} className="flex gap-2 mb-6">
        <div className="flex-1 flex items-center gap-2 px-4 rounded-full border border-border bg-background focus-within:ring-2 focus-within:ring-primary/40">
          <Search className="h-4 w-4 text-muted-foreground shrink-0" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type any Indian state, city, or town"
            className="flex-1 py-3 bg-transparent outline-none"
          />
        </div>
        <button
          type="submit"
          disabled={live.status === "loading"}
          className="px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors disabled:opacity-60 inline-flex items-center gap-2"
        >
          {live.status === "loading" ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" /> Searching…
            </>
          ) : (
            "Search"
          )}
        </button>
      </form>

      {!submitted && (
        <p className="text-sm text-muted-foreground">
          Start typing to search across all Indian destinations.
        </p>
      )}

      {submitted && localResults.length === 0 && live.status !== "ok" && (
        <div className="rounded-2xl bg-secondary/40 p-5 text-sm">
          <p className="font-medium mb-1">No curated match for “{submitted}”.</p>
          <p className="text-muted-foreground">
            Try a state name (e.g. Kerala, Goa, Punjab) or a famous city
            (Jaipur, Varanasi, Munnar).
          </p>
        </div>
      )}

      {localResults.length > 0 && (
        <div className="space-y-4">
          <p className="text-xs uppercase tracking-wide text-muted-foreground">
            {localResults.length} curated match{localResults.length === 1 ? "" : "es"}
          </p>
          <div className="grid gap-4">
            {localResults.map((m) => (
              <LocalResultCard key={m.destination.slug} match={m} query={submitted} />
            ))}
          </div>
        </div>
      )}

      {live.status === "ok" && <LiveResults data={live.data} />}

      {live.status === "error" && localResults.length === 0 && (
        <p className="text-xs text-muted-foreground mt-4">
          Live enrichment is offline right now — showing curated results only.
        </p>
      )}
    </div>
  );
}

function LocalResultCard({ match, query }: { match: LocalMatch; query: string }) {
  const { destination: d, matchedCities, matchedPlaces } = match;
  const total = d.costs.stay + d.costs.food + d.costs.transport + d.costs.activities;

  return (
    <article className="rounded-2xl bg-background border border-border/60 p-5 hover:shadow-soft transition-shadow">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-start gap-3">
          <span className="text-3xl leading-none">{d.emoji}</span>
          <div>
            <h4 className="font-display text-xl font-semibold leading-tight">
              {d.name}
              <span className="text-muted-foreground text-sm font-normal"> · {d.country}</span>
            </h4>
            <p className="text-sm text-foreground/75 mt-1">{d.tagline}</p>
          </div>
        </div>
        <div className="text-right shrink-0">
          <div className="text-[10px] uppercase tracking-wide text-muted-foreground">From</div>
          <div className="font-display text-lg font-semibold text-primary">${total}<span className="text-xs text-muted-foreground font-normal">/day</span></div>
        </div>
      </div>

      {matchedCities.length > 0 && (
        <div className="mb-3">
          <div className="text-[10px] uppercase tracking-wide text-muted-foreground mb-1">Cities matched</div>
          <div className="flex flex-wrap gap-1.5">
            {matchedCities.map((c) => (
              <span key={c.slug} className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary font-medium">
                {c.name}
              </span>
            ))}
          </div>
        </div>
      )}

      {matchedPlaces.length > 0 && (
        <ul className="space-y-1 mb-4">
          {matchedPlaces.slice(0, 4).map((p) => (
            <li key={p.name} className="text-sm flex items-start gap-2">
              <Tag className="h-3.5 w-3.5 text-primary mt-0.5 shrink-0" />
              <span>
                <span className="font-medium">{p.name}</span>{" "}
                <span className="text-muted-foreground text-xs">· {p.category}</span>
                <span className="block text-xs text-foreground/70">{p.why}</span>
              </span>
            </li>
          ))}
        </ul>
      )}

      {matchedCities.length === 0 && matchedPlaces.length === 0 && (
        <ul className="space-y-1 mb-4">
          {d.places.slice(0, 3).map((p) => (
            <li key={p.name} className="text-sm flex items-start gap-2">
              <MapPin className="h-3.5 w-3.5 text-primary mt-0.5 shrink-0" />
              <span><span className="font-medium">{p.name}</span> <span className="text-muted-foreground text-xs">· {p.category}</span></span>
            </li>
          ))}
        </ul>
      )}

      <div className="flex flex-wrap gap-2">
        <Link
          to="/explore"
          search={{ q: d.slug }}
          className="inline-flex items-center gap-1 px-4 py-2 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90"
        >
          Explore {d.name} <ArrowRight className="h-3.5 w-3.5" />
        </Link>
        <Link
          to="/plan"
          search={{ destination: d.slug }}
          className="inline-flex items-center gap-1 px-4 py-2 rounded-full bg-secondary text-foreground text-sm font-medium hover:bg-secondary/80"
        >
          Plan a trip
        </Link>
        <HotelAffiliateCard
          city={`${matchedCities[0]?.name ?? d.name}, India`}
          variant="inline"
        />
      </div>

      {/* unused query var for potential highlighting */}
      <span className="sr-only">{query}</span>
    </article>
  );
}

function LiveResults({ data }: { data: OTMCityResult }) {
  const withPhoto = data.attractions.filter((a) => a.preview);
  const others = data.attractions.filter((a) => !a.preview);

  if (data.attractions.length === 0) return null;

  return (
    <div className="space-y-5 mt-8 pt-6 border-t border-border/60">
      <div className="flex items-baseline justify-between flex-wrap gap-2">
        <h4 className="font-display text-xl font-semibold flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-primary" />
          Live attractions in {data.city}
        </h4>
        <span className="text-xs text-muted-foreground">
          {data.attractions.length} found · OpenTripMap
        </span>
      </div>

      {withPhoto.length > 0 && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {withPhoto.map((a) => (
            <AttractionCard key={a.xid} a={a} />
          ))}
        </div>
      )}
      {others.length > 0 && (
        <ul className="grid sm:grid-cols-2 gap-2">
          {others.map((a) => (
            <li
              key={a.xid}
              className="text-sm flex items-start gap-2 px-3 py-2 rounded-lg bg-secondary/50"
            >
              <MapPin className="h-3.5 w-3.5 text-primary mt-0.5 shrink-0" />
              <span>
                <span className="font-medium">{a.name}</span>{" "}
                <span className="text-muted-foreground text-xs">
                  · {a.kind.replace(/_/g, " ")}
                </span>
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function AttractionCard({ a }: { a: { xid: string; name: string; kind: string; preview?: string; rate?: number; wikipedia_extracts?: string } }) {
  return (
    <article className="rounded-2xl overflow-hidden bg-background border border-border/60 hover:shadow-soft transition-shadow flex flex-col">
      {a.preview && (
        <img
          src={a.preview}
          alt={a.name}
          loading="lazy"
          className="w-full h-40 object-cover"
        />
      )}
      <div className="p-4 flex-1 flex flex-col">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h6 className="font-display font-semibold leading-tight">{a.name}</h6>
          {typeof a.rate === "number" && a.rate > 0 && (
            <span className="text-xs inline-flex items-center gap-0.5 text-primary shrink-0">
              <Star className="h-3 w-3 fill-current" />
              {a.rate}
            </span>
          )}
        </div>
        <p className="text-xs text-muted-foreground capitalize mb-2">
          {a.kind.replace(/_/g, " ")}
        </p>
        {a.wikipedia_extracts && (
          <p className="text-sm text-foreground/80 line-clamp-3">
            {a.wikipedia_extracts}
          </p>
        )}
      </div>
    </article>
  );
}
