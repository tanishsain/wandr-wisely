import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export type NominatimPlace = {
  place_id: number;
  display_name: string;
  name?: string;
  lat: string;
  lon: string;
  type?: string;
  class?: string;
  address?: {
    village?: string;
    town?: string;
    city?: string;
    municipality?: string;
    county?: string;
    state_district?: string;
    state?: string;
    country?: string;
    country_code?: string;
  };
  importance?: number;
};

export type IndiaSearchResult = {
  query: string;
  places: Array<{
    id: string;
    name: string;
    label: string;
    state?: string;
    district?: string;
    kind: string;
    lat: number;
    lon: number;
    source: "nominatim";
  }>;
  error?: string;
};

// Nominatim has no key but requires a descriptive User-Agent + low QPS.
async function nominatimFetch(query: string, limit = 8): Promise<NominatimPlace[]> {
  const url =
    `https://nominatim.openstreetmap.org/search` +
    `?q=${encodeURIComponent(query)}` +
    `&countrycodes=in` +
    `&format=jsonv2` +
    `&addressdetails=1` +
    `&accept-language=en,hi` +
    `&limit=${limit}`;

  const res = await fetch(url, {
    headers: {
      "User-Agent": "WandrWisely/1.0 (travel planner; contact: hello@wandr.app)",
      Accept: "application/json",
    },
  });
  if (!res.ok) throw new Error(`Nominatim ${res.status}`);
  return (await res.json()) as NominatimPlace[];
}

export const searchIndiaPlaces = createServerFn({ method: "GET" })
  .inputValidator(z.object({ query: z.string().min(1).max(120) }).parse)
  .handler(async ({ data }): Promise<IndiaSearchResult> => {
    try {
      const raw = await nominatimFetch(data.query, 10);
      const places = raw.map((p) => {
        const addr = p.address ?? {};
        const name =
          p.name ||
          addr.village ||
          addr.town ||
          addr.city ||
          addr.municipality ||
          p.display_name.split(",")[0];
        const district = addr.county || addr.state_district;
        return {
          id: String(p.place_id),
          name,
          label: p.display_name,
          state: addr.state,
          district,
          kind: p.type || p.class || "place",
          lat: Number(p.lat),
          lon: Number(p.lon),
          source: "nominatim" as const,
        };
      });

      // De-dup by name+state
      const seen = new Set<string>();
      const deduped = places.filter((p) => {
        const key = `${p.name.toLowerCase()}|${(p.state ?? "").toLowerCase()}`;
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      });

      return { query: data.query, places: deduped };
    } catch (e) {
      console.error("Nominatim error:", e);
      return {
        query: data.query,
        places: [],
        error: e instanceof Error ? e.message : "Nominatim search failed",
      };
    }
  });
