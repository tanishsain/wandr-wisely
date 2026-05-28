import { c as createServerRpc } from "./createServerRpc-zjpbWzrX.js";
import { $ as createServerFn } from "./worker-entry-CVMFMino.js";
import { o as objectType, s as stringType } from "./types-CHm7Zrw6.js";
import "node:events";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
const BASE = "https://api.opentripmap.com/0.1/en";
function getKey() {
  const k = process.env.OPENTRIPMAP_API_KEY;
  if (!k) throw new Error("OPENTRIPMAP_API_KEY is not configured");
  return k;
}
async function otmFetch(path) {
  const key = getKey();
  const sep = path.includes("?") ? "&" : "?";
  const url = `${BASE}${path}${sep}apikey=${key}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`OpenTripMap ${res.status}: ${await res.text()}`);
  return res.json();
}
const searchIndianCity_createServerFn_handler = createServerRpc({
  id: "d8fbd25ade938994a2d4afd161eeda3f9f5ee4ea67b5926a626400851f88df64",
  name: "searchIndianCity",
  filename: "src/lib/opentripmap.functions.ts"
}, (opts) => searchIndianCity.__executeServer(opts));
const searchIndianCity = createServerFn({
  method: "GET"
}).inputValidator(objectType({
  query: stringType().min(1).max(100)
}).parse).handler(searchIndianCity_createServerFn_handler, async ({
  data
}) => {
  try {
    const geo = await otmFetch(`/places/geoname?name=${encodeURIComponent(data.query)}&country=IN`);
    if (!geo.lat || !geo.lon) {
      return {
        error: `No Indian city found for "${data.query}".`
      };
    }
    const radius = await otmFetch(`/places/radius?radius=15000&lon=${geo.lon}&lat=${geo.lat}&rate=2&format=geojson&limit=30`);
    const features = (radius.features ?? []).filter((f) => f.properties.name);
    const top = features.slice(0, 12);
    const detailed = await Promise.all(top.map(async (f) => {
      try {
        const detail = await otmFetch(`/places/xid/${f.properties.xid}`);
        return {
          xid: detail.xid,
          name: detail.name || f.properties.name || "Unknown",
          kind: (detail.kinds || f.properties.kinds || "").split(",")[0] || "attraction",
          rate: detail.rate ?? f.properties.rate,
          dist: f.properties.dist,
          preview: detail.preview?.source,
          wikipedia_extracts: detail.wikipedia_extracts?.text
        };
      } catch {
        return {
          xid: f.properties.xid,
          name: f.properties.name || "Unknown",
          kind: (f.properties.kinds || "").split(",")[0] || "attraction",
          rate: f.properties.rate,
          dist: f.properties.dist
        };
      }
    }));
    return {
      city: geo.name || data.query,
      country: geo.country,
      lat: geo.lat,
      lon: geo.lon,
      population: geo.population,
      attractions: detailed
    };
  } catch (e) {
    console.error("OpenTripMap error:", e);
    return {
      error: e instanceof Error ? e.message : "Search failed"
    };
  }
});
export {
  searchIndianCity_createServerFn_handler
};
