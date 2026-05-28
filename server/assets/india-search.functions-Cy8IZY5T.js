import { c as createServerRpc } from "./createServerRpc-zjpbWzrX.js";
import { $ as createServerFn } from "./worker-entry-CVMFMino.js";
import { o as objectType, s as stringType } from "./types-CHm7Zrw6.js";
import "node:events";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
async function nominatimFetch(query, limit = 8) {
  const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&countrycodes=in&format=jsonv2&addressdetails=1&accept-language=en,hi&limit=${limit}`;
  const res = await fetch(url, {
    headers: {
      "User-Agent": "WandrWisely/1.0 (travel planner; contact: hello@wandr.app)",
      Accept: "application/json"
    }
  });
  if (!res.ok) throw new Error(`Nominatim ${res.status}`);
  return await res.json();
}
const searchIndiaPlaces_createServerFn_handler = createServerRpc({
  id: "032a844bc5fdb6404134046a5a0dcf3efc2460432d2f96b33574f5fbc48fe655",
  name: "searchIndiaPlaces",
  filename: "src/lib/india-search.functions.ts"
}, (opts) => searchIndiaPlaces.__executeServer(opts));
const searchIndiaPlaces = createServerFn({
  method: "GET"
}).inputValidator(objectType({
  query: stringType().min(1).max(120)
}).parse).handler(searchIndiaPlaces_createServerFn_handler, async ({
  data
}) => {
  try {
    const raw = await nominatimFetch(data.query, 10);
    const places = raw.map((p) => {
      const addr = p.address ?? {};
      const name = p.name || addr.village || addr.town || addr.city || addr.municipality || p.display_name.split(",")[0];
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
        source: "nominatim"
      };
    });
    const seen = /* @__PURE__ */ new Set();
    const deduped = places.filter((p) => {
      const key = `${p.name.toLowerCase()}|${(p.state ?? "").toLowerCase()}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
    return {
      query: data.query,
      places: deduped
    };
  } catch (e) {
    console.error("Nominatim error:", e);
    return {
      query: data.query,
      places: [],
      error: e instanceof Error ? e.message : "Nominatim search failed"
    };
  }
});
export {
  searchIndiaPlaces_createServerFn_handler
};
