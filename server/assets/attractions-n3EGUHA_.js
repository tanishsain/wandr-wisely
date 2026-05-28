import { r as reactExports, T as jsxRuntimeExports } from "./worker-entry-CVMFMino.js";
import { g as getDestination, L as Link } from "./router-C-aH7qSq.js";
import { S as SiteHeader, a as SiteFooter } from "./site-footer-Cu9GkHUY.js";
import { b as allCities, S as Search } from "./cities-B2BqSztH.js";
import { T as Ticket, E as ExternalLink, g as getYourGuideLink, b as bookingHotelsLink } from "./affiliate-2eYY1u5Q.js";
import { f as formatInr } from "./currency--B8lzbTJ.js";
import { M as MapPin } from "./map-pin-CZEMfQ_2.js";
import "node:events";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
import "./types-CHm7Zrw6.js";
const TYPES = ["All", "Landmark", "Nature", "Museum", "Food", "Nightlife", "Adventure", "Market"];
function AttractionsPage() {
  const [query, setQuery] = reactExports.useState("");
  const [type, setType] = reactExports.useState("All");
  const items = reactExports.useMemo(() => {
    const all = allCities().flatMap(({
      destinationSlug,
      city
    }) => city.attractions.map((a) => ({
      attraction: a,
      cityName: city.name,
      destinationSlug,
      country: getDestination(destinationSlug)?.country ?? ""
    })));
    const lower = query.trim().toLowerCase();
    return all.filter((it) => {
      if (type !== "All" && it.attraction.type !== type) return false;
      if (!lower) return true;
      return it.attraction.name.toLowerCase().includes(lower) || it.cityName.toLowerCase().includes(lower) || it.country.toLowerCase().includes(lower);
    });
  }, [query, type]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SiteHeader, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-warm border-b border-border/60", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-6xl px-5 py-14", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-2 px-3 py-1 rounded-full bg-card border border-border/60 text-xs font-medium text-muted-foreground mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Ticket, { className: "h-3 w-3 text-primary" }),
        " ",
        items.length,
        "+ attractions"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-4xl md:text-5xl font-semibold mb-3 text-balance", children: "Iconic places, hidden gems, every city." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground max-w-xl", children: "Search landmarks, museums, food markets and nightlife across 30+ cities — then book skip-the-line tours or a place to stay nearby." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex items-center gap-2 max-w-lg p-2 bg-card rounded-full border border-border shadow-soft", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "h-4 w-4 text-muted-foreground ml-3" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: query, onChange: (e) => setQuery(e.target.value), placeholder: "Search attractions, cities, countries…", className: "flex-1 bg-transparent py-2 outline-none text-sm placeholder:text-muted-foreground" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 flex flex-wrap gap-2", children: TYPES.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setType(t), className: `px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${type === t ? "bg-primary text-primary-foreground" : "bg-card border border-border text-foreground/70 hover:border-primary/40"}`, children: t }, t)) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "mx-auto max-w-6xl px-5 py-12", children: items.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center py-20 text-muted-foreground", children: "No attractions match your filters." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid md:grid-cols-2 lg:grid-cols-3 gap-4", children: items.map((it) => /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { className: "p-5 rounded-3xl bg-card border border-border/60 shadow-soft hover:shadow-warm transition-all flex flex-col", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2 mb-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-lg font-semibold leading-tight", children: it.attraction.name }),
        it.attraction.free ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] px-2 py-0.5 rounded-full bg-leaf/20 text-leaf font-semibold shrink-0", children: "FREE" }) : typeof it.attraction.priceUSD === "number" ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] px-2 py-0.5 rounded-full bg-secondary font-semibold shrink-0", children: [
          "~",
          formatInr(it.attraction.priceUSD)
        ] }) : null
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-xs text-muted-foreground mb-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-3 w-3" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/explore", search: {
          q: it.destinationSlug
        }, className: "hover:text-primary", children: [
          it.cityName,
          " · ",
          it.country
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground/80 mb-4 flex-1", children: it.attraction.blurb }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-1.5 mb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] px-2 py-0.5 rounded-full bg-secondary font-medium", children: it.attraction.type }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: getYourGuideLink(`${it.attraction.name} ${it.cityName}`), target: "_blank", rel: "sponsored noopener noreferrer", className: "flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-primary text-primary-foreground text-xs font-medium hover:bg-primary/90 transition-colors", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Ticket, { className: "h-3.5 w-3.5" }),
          " Book tour",
          /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "h-3 w-3 opacity-70" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: bookingHotelsLink(`${it.cityName}, ${it.country}`), target: "_blank", rel: "sponsored noopener noreferrer", className: "flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-secondary text-foreground/80 text-xs font-medium hover:bg-secondary/80 transition-colors", children: [
          "Hotels nearby",
          /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "h-3 w-3 opacity-70" })
        ] })
      ] })
    ] }, `${it.destinationSlug}-${it.cityName}-${it.attraction.name}`)) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(SiteFooter, {})
  ] });
}
export {
  AttractionsPage as component
};
