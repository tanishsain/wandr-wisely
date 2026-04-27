import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const BASE = "https://api.opentripmap.com/0.1/en";

export type OTMPlace = {
  xid: string;
  name: string;
  kind: string;
  rate?: number;
  dist?: number;
  preview?: string;
  wikipedia_extracts?: string;
};

export type OTMCityResult = {
  city: string;
  country?: string;
  lat: number;
  lon: number;
  population?: number;
  attractions: OTMPlace[];
};

function getKey(): string {
  const k = process.env.OPENTRIPMAP_API_KEY;
  if (!k) throw new Error("OPENTRIPMAP_API_KEY is not configured");
  return k;
}

async function otmFetch<T>(path: string): Promise<T> {
  const key = getKey();
  const sep = path.includes("?") ? "&" : "?";
  const url = `${BASE}${path}${sep}apikey=${key}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`OpenTripMap ${res.status}: ${await res.text()}`);
  return res.json() as Promise<T>;
}

export const searchIndianCity = createServerFn({ method: "GET" })
  .inputValidator(z.object({ query: z.string().min(1).max(100) }).parse)
  .handler(async ({ data }): Promise<OTMCityResult | { error: string }> => {
    try {
      // Geocode the city, scoped to India
      const geo = await otmFetch<{
        name?: string;
        country?: string;
        lat?: number;
        lon?: number;
        population?: number;
      }>(`/places/geoname?name=${encodeURIComponent(data.query)}&country=IN`);

      if (!geo.lat || !geo.lon) {
        return { error: `No Indian city found for "${data.query}".` };
      }

      // Top-rated attractions within 15km
      const radius = await otmFetch<{
        features?: Array<{
          properties: {
            xid: string;
            name?: string;
            kinds?: string;
            rate?: number;
            dist?: number;
          };
        }>;
      }>(
        `/places/radius?radius=15000&lon=${geo.lon}&lat=${geo.lat}&rate=2&format=geojson&limit=30`,
      );

      const features = (radius.features ?? []).filter((f) => f.properties.name);

      // Enrich top 12 with photo + extract
      const top = features.slice(0, 12);
      const detailed = await Promise.all(
        top.map(async (f) => {
          try {
            const detail = await otmFetch<{
              xid: string;
              name?: string;
              kinds?: string;
              rate?: number;
              preview?: { source?: string };
              wikipedia_extracts?: { text?: string };
            }>(`/places/xid/${f.properties.xid}`);
            return {
              xid: detail.xid,
              name: detail.name || f.properties.name || "Unknown",
              kind: (detail.kinds || f.properties.kinds || "").split(",")[0] || "attraction",
              rate: detail.rate ?? f.properties.rate,
              dist: f.properties.dist,
              preview: detail.preview?.source,
              wikipedia_extracts: detail.wikipedia_extracts?.text,
            } as OTMPlace;
          } catch {
            return {
              xid: f.properties.xid,
              name: f.properties.name || "Unknown",
              kind: (f.properties.kinds || "").split(",")[0] || "attraction",
              rate: f.properties.rate,
              dist: f.properties.dist,
            } as OTMPlace;
          }
        }),
      );

      return {
        city: geo.name || data.query,
        country: geo.country,
        lat: geo.lat,
        lon: geo.lon,
        population: geo.population,
        attractions: detailed,
      };
    } catch (e) {
      console.error("OpenTripMap error:", e);
      return { error: e instanceof Error ? e.message : "Search failed" };
    }
  });
