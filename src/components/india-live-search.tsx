import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { MapPin, Sparkles, Loader2, Star } from "lucide-react";
import { searchIndianCity, type OTMCityResult } from "@/lib/opentripmap.functions";
import { HotelAffiliateCard } from "@/components/hotel-affiliate-card";

type State =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "error"; message: string }
  | { status: "ok"; data: OTMCityResult };

export function IndiaLiveSearch({ initialQuery = "" }: { initialQuery?: string }) {
  const [query, setQuery] = useState(initialQuery);
  const [state, setState] = useState<State>({ status: "idle" });
  const search = useServerFn(searchIndianCity);

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    const q = query.trim();
    if (!q) return;
    setState({ status: "loading" });
    try {
      const result = await search({ data: { query: q } });
      if ("error" in result) {
        setState({ status: "error", message: result.error });
      } else {
        setState({ status: "ok", data: result });
      }
    } catch (err) {
      setState({
        status: "error",
        message: err instanceof Error ? err.message : "Search failed",
      });
    }
  }

  return (
    <div className="rounded-3xl bg-card border border-border/60 p-6 md:p-8 shadow-soft">
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="h-5 w-5 text-primary" />
        <h3 className="font-display text-2xl font-semibold">Search any Indian city or town</h3>
      </div>
      <p className="text-sm text-muted-foreground mb-5">
        Live results powered by OpenTripMap — try Sri Ganganagar, Hampi, Rishikesh, Madurai…
      </p>

      <form onSubmit={handleSearch} className="flex gap-2 mb-6">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Type any Indian city or town"
          className="flex-1 px-4 py-3 rounded-full border border-border bg-background outline-none focus:ring-2 focus:ring-primary/40"
        />
        <button
          type="submit"
          disabled={state.status === "loading"}
          className="px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors disabled:opacity-60 inline-flex items-center gap-2"
        >
          {state.status === "loading" ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" /> Searching…
            </>
          ) : (
            "Search"
          )}
        </button>
      </form>

      {state.status === "error" && (
        <p className="text-sm text-destructive">{state.message}</p>
      )}

      {state.status === "ok" && <Results data={state.data} />}
    </div>
  );
}

function Results({ data }: { data: OTMCityResult }) {
  const withPhoto = data.attractions.filter((a) => a.preview);
  const others = data.attractions.filter((a) => !a.preview);

  return (
    <div className="space-y-6">
      <div className="flex items-baseline justify-between flex-wrap gap-2">
        <div>
          <h4 className="font-display text-2xl font-semibold flex items-center gap-2">
            <MapPin className="h-5 w-5 text-primary" />
            {data.city}
            {data.country && (
              <span className="text-muted-foreground text-base font-normal">
                · {data.country}
              </span>
            )}
          </h4>
          {data.population && (
            <p className="text-xs text-muted-foreground">
              Population ~{data.population.toLocaleString()}
            </p>
          )}
        </div>
        <span className="text-xs text-muted-foreground">
          {data.attractions.length} attractions found
        </span>
      </div>

      <HotelAffiliateCard city={`${data.city}, India`} />

      {data.attractions.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          No tourist attractions indexed for this town yet. Try a nearby larger city.
        </p>
      ) : (
        <>
          {withPhoto.length > 0 && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {withPhoto.map((a) => (
                <AttractionCard key={a.xid} a={a} />
              ))}
            </div>
          )}
          {others.length > 0 && (
            <div>
              <h5 className="font-display text-lg font-semibold mb-3">More to see</h5>
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
            </div>
          )}
        </>
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
