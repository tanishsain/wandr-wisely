import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { MapPin, Sparkles, Loader2, Star, Search, ArrowRight, Tag, Globe2 } from "lucide-react";
import { searchIndianCity, type OTMCityResult } from "@/lib/opentripmap.functions";
import { searchIndiaPlaces, type IndiaSearchResult } from "@/lib/india-search.functions";
import { HotelAffiliateCard } from "@/components/hotel-affiliate-card";
import { VoiceSearchButton } from "@/components/voice-search-button";
import { destinations, type Destination, type Place } from "@/data/destinations";
import { citiesByDestination, type City } from "@/data/cities";
import { aliasSuggestions, fuzzyScore, normalize, resolveAlias } from "@/lib/fuzzy";

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
  | { status: "ok"; otm?: OTMCityResult; nominatim: IndiaSearchResult["places"] };

const indianDestinations = destinations.filter((d) => d.country === "India");

function fuzzyMatch(query: string, dest: Destination): LocalMatch | null {
  const q = query.trim();
  if (!q) return null;

  let score = 0;
  score += fuzzyScore(q, dest.name) * 100;
  score += fuzzyScore(q, dest.slug) * 40;

  const cities = citiesByDestination[dest.slug] ?? [];
  const matchedCities = cities
    .map((c) => ({ c, s: Math.max(fuzzyScore(q, c.name), fuzzyScore(q, c.slug)) }))
    .filter((x) => x.s >= 0.6)
    .sort((a, b) => b.s - a.s)
    .map((x) => x.c);
  if (matchedCities.length) score += 50 + matchedCities.length * 5;

  const matchedPlaces = dest.places
    .map((p) => ({ p, s: fuzzyScore(q, p.name) }))
    .filter((x) => x.s >= 0.65)
    .sort((a, b) => b.s - a.s)
    .map((x) => x.p);
  if (matchedPlaces.length) score += 25 + matchedPlaces.length * 3;

  if (fuzzyScore(q, dest.tagline) > 0.5) score += 5;

  if (score < 25) return null;
  return { destination: dest, matchedCities, matchedPlaces, score };
}

function buildSuggestions(prefix: string, limit = 8): string[] {
  const q = prefix.trim();
  if (!q) return [];
  const out = new Map<string, number>();
  // Alias-driven suggestions first
  for (const s of aliasSuggestions(q, limit)) out.set(s, 1);

  const np = normalize(q);
  for (const d of indianDestinations) {
    if (normalize(d.name).startsWith(np)) out.set(d.name, (out.get(d.name) ?? 0) + 0.9);
    const cities = citiesByDestination[d.slug] ?? [];
    for (const c of cities) {
      if (normalize(c.name).startsWith(np)) out.set(c.name, (out.get(c.name) ?? 0) + 0.8);
      else if (normalize(c.name).includes(np) && np.length >= 3)
        out.set(c.name, (out.get(c.name) ?? 0) + 0.5);
    }
  }
  return [...out.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([s]) => s);
}

export function IndiaLiveSearch({ initialQuery = "" }: { initialQuery?: string }) {
  const [query, setQuery] = useState(initialQuery);
  const [submitted, setSubmitted] = useState(initialQuery.trim());
  const [live, setLive] = useState<LiveState>({ status: "idle" });
  const [showSuggest, setShowSuggest] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const otmSearch = useServerFn(searchIndianCity);
  const nominatimSearch = useServerFn(searchIndiaPlaces);

  const suggestions = useMemo(() => buildSuggestions(query), [query]);

  const localResults = useMemo<LocalMatch[]>(() => {
    if (!submitted) return [];
    const resolved = resolveAlias(submitted);
    return indianDestinations
      .map((d) => fuzzyMatch(resolved, d))
      .filter((m): m is LocalMatch => m !== null)
      .sort((a, b) => b.score - a.score)
      .slice(0, 8);
  }, [submitted]);

  async function runSearch(rawQuery: string) {
    const q = rawQuery.trim();
    if (!q) return;
    const resolved = resolveAlias(q);
    setSubmitted(resolved);
    setQuery(resolved);
    setShowSuggest(false);
    setLive({ status: "loading" });

    const [otmRes, nomRes] = await Promise.allSettled([
      otmSearch({ data: { query: resolved } }),
      nominatimSearch({ data: { query: resolved } }),
    ]);

    const otm =
      otmRes.status === "fulfilled" && !("error" in otmRes.value) ? otmRes.value : undefined;
    const nominatim =
      nomRes.status === "fulfilled" ? nomRes.value.places : [];

    if (!otm && nominatim.length === 0) {
      setLive({
        status: "error",
        message: "Live search is offline — showing curated results only.",
      });
      return;
    }
    setLive({ status: "ok", otm, nominatim });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    runSearch(query);
  }

  // Close suggestions on outside click
  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (!inputRef.current?.parentElement?.contains(e.target as Node)) {
        setShowSuggest(false);
      }
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  return (
    <div className="rounded-3xl bg-card border border-border/60 p-6 md:p-8 shadow-soft">
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="h-5 w-5 text-primary" />
        <h3 className="font-display text-2xl font-semibold">Search India — states, cities, towns & villages</h3>
      </div>
      <p className="text-sm text-muted-foreground mb-5">
        Powered by OpenStreetMap + OpenTripMap. Works with typos, partial names, and Hindi. Try{" "}
        {["Sri Ganganagar", "जयपुर", "jodpur", "Hanumangarh", "Hampi"].map((t, i) => (
          <span key={t}>
            <button
              type="button"
              onClick={() => runSearch(t)}
              className="text-primary hover:underline"
            >
              {t}
            </button>
            {i < 4 ? ", " : "."}
          </span>
        ))}
      </p>

      <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
        <div className="relative flex-1">
          <div className="flex items-center gap-2 px-4 rounded-full border border-border bg-background focus-within:ring-2 focus-within:ring-primary/40">
            <Search className="h-4 w-4 text-muted-foreground shrink-0" />
            <input
              ref={inputRef}
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setShowSuggest(true);
              }}
              onFocus={() => setShowSuggest(true)}
              placeholder="Type any Indian state, city, town or village (English or हिंदी)"
              className="flex-1 py-3 bg-transparent outline-none"
              autoComplete="off"
            />
          </div>
          
          {showSuggest && suggestions.length > 0 && (
            <ul className="absolute z-20 left-0 right-0 mt-2 rounded-2xl border border-border bg-card shadow-warm overflow-hidden">
              {suggestions.map((s) => (
                <li key={s}>
                  <button
                    type="button"
                    onMouseDown={(e) => {
                      e.preventDefault();
                      runSearch(s);
                    }}
                    className="w-full text-left px-4 py-2.5 text-sm hover:bg-secondary/60 flex items-center gap-2"
                  >
                    <MapPin className="h-3.5 w-3.5 text-primary" />
                    {s}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
        <VoiceSearchButton
          onResult={(loc) => runSearch(loc)}
          disabled={live.status === "loading"}
        />
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
          Start typing to search across every Indian destination — even small towns.
        </p>
      )}

      {submitted && localResults.length === 0 && live.status !== "ok" && live.status !== "loading" && (
        <div className="rounded-2xl bg-secondary/40 p-5 text-sm">
          <p className="font-medium mb-1">No curated match for “{submitted}”.</p>
          <p className="text-muted-foreground">
            We're checking OpenStreetMap for towns and villages too…
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

      {live.status === "ok" && live.otm && <LiveResults data={live.otm} />}
      {live.status === "ok" && live.nominatim.length > 0 && (
        <NominatimResults places={live.nominatim} />
      )}

      {live.status === "error" && (
        <p className="text-xs text-muted-foreground mt-4">{live.message}</p>
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

      <span className="sr-only">{query}</span>
    </article>
  );
}

function NominatimResults({ places }: { places: IndiaSearchResult["places"] }) {
  return (
    <div className="space-y-4 mt-8 pt-6 border-t border-border/60">
      <div className="flex items-baseline justify-between flex-wrap gap-2">
        <h4 className="font-display text-xl font-semibold flex items-center gap-2">
          <Globe2 className="h-4 w-4 text-primary" />
          Towns & villages from OpenStreetMap
        </h4>
        <span className="text-xs text-muted-foreground">
          {places.length} found · Nominatim
        </span>
      </div>
      <ul className="grid sm:grid-cols-2 gap-2">
        {places.map((p) => (
          <li
            key={p.id}
            className="text-sm px-3 py-2.5 rounded-lg bg-secondary/50 flex items-start gap-2"
          >
            <MapPin className="h-3.5 w-3.5 text-primary mt-0.5 shrink-0" />
            <div className="min-w-0">
              <div className="font-medium truncate">{p.name}</div>
              <div className="text-xs text-muted-foreground truncate">
                {[p.district, p.state].filter(Boolean).join(", ") || p.label}
                <span className="ml-1 capitalize">· {p.kind.replace(/_/g, " ")}</span>
              </div>
              <HotelAffiliateCard
                city={`${p.name}${p.state ? `, ${p.state}` : ""}, India`}
                variant="inline"
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
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
