import { r as reactExports, T as jsxRuntimeExports } from "./worker-entry-CVMFMino.js";
import { c as createLucideIcon, S as SiteHeader, a as SiteFooter } from "./site-footer-Cu9GkHUY.js";
import { d as destinations, g as getDestination } from "./router-C-aH7qSq.js";
import { f as formatInr } from "./currency--B8lzbTJ.js";
import "node:events";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
import "./types-CHm7Zrw6.js";
const __iconNode$1 = [
  ["rect", { width: "16", height: "20", x: "4", y: "2", rx: "2", key: "1nb95v" }],
  ["line", { x1: "8", x2: "16", y1: "6", y2: "6", key: "x4nwl0" }],
  ["line", { x1: "16", x2: "16", y1: "14", y2: "18", key: "wjye3r" }],
  ["path", { d: "M16 10h.01", key: "1m94wz" }],
  ["path", { d: "M12 10h.01", key: "1nrarc" }],
  ["path", { d: "M8 10h.01", key: "19clt8" }],
  ["path", { d: "M12 14h.01", key: "1etili" }],
  ["path", { d: "M8 14h.01", key: "6423bh" }],
  ["path", { d: "M12 18h.01", key: "mhygvu" }],
  ["path", { d: "M8 18h.01", key: "lrp35t" }]
];
const Calculator = createLucideIcon("calculator", __iconNode$1);
const __iconNode = [
  ["path", { d: "M16 17h6v-6", key: "t6n2it" }],
  ["path", { d: "m22 17-8.5-8.5-5 5L2 7", key: "x473p" }]
];
const TrendingDown = createLucideIcon("trending-down", __iconNode);
const styleMult = {
  backpacker: 0.7,
  budget: 1,
  comfort: 1.6
};
function EstimatePage() {
  const [destSlug, setDestSlug] = reactExports.useState(destinations[0].slug);
  const [days, setDays] = reactExports.useState(7);
  const [travelers, setTravelers] = reactExports.useState(1);
  const [style, setStyle] = reactExports.useState("budget");
  const dest = getDestination(destSlug) ?? destinations[0];
  const breakdown = reactExports.useMemo(() => {
    const m = styleMult[style];
    return {
      stay: Math.round(dest.costs.stay * m),
      food: Math.round(dest.costs.food * m),
      transport: Math.round(dest.costs.transport * m),
      activities: Math.round(dest.costs.activities * m)
    };
  }, [dest, style]);
  const dailyTotal = breakdown.stay + breakdown.food + breakdown.transport + breakdown.activities;
  const tripTotal = dailyTotal * days * travelers;
  const max = Math.max(breakdown.stay, breakdown.food, breakdown.transport, breakdown.activities);
  const rows = [{
    label: "Stay",
    key: "stay",
    color: "bg-primary",
    icon: "🏨"
  }, {
    label: "Food",
    key: "food",
    color: "bg-sun",
    icon: "🍜"
  }, {
    label: "Transport",
    key: "transport",
    color: "bg-sky",
    icon: "🚌"
  }, {
    label: "Activities",
    key: "activities",
    color: "bg-leaf",
    icon: "🎟️"
  }];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SiteHeader, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-warm border-b border-border/60", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-6xl px-5 py-14", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-4xl md:text-5xl font-semibold mb-3 text-balance", children: "How much will it really cost?" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground max-w-xl", children: "A clear, no-surprises estimate based on real backpacker and budget traveler spending — not airline marketing." })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mx-auto max-w-6xl px-5 py-12 grid lg:grid-cols-[380px_1fr] gap-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-3xl bg-card border border-border/60 p-6 md:p-7 shadow-soft h-fit lg:sticky lg:top-24", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Calculator, { className: "h-5 w-5 text-primary" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-semibold", children: "Calculator" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block mb-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium mb-2 block", children: "Destination" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("select", { value: destSlug, onChange: (e) => setDestSlug(e.target.value), className: "w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none", children: destinations.map((d) => /* @__PURE__ */ jsxRuntimeExports.jsxs("option", { value: d.slug, children: [
            d.emoji,
            " ",
            d.name,
            ", ",
            d.country
          ] }, d.slug)) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3 mb-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium mb-2 block", children: "Days" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "number", min: 1, max: 60, value: days, onChange: (e) => setDays(Math.max(1, Number(e.target.value) || 1)), className: "w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium mb-2 block", children: "Travelers" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "number", min: 1, max: 10, value: travelers, onChange: (e) => setTravelers(Math.max(1, Number(e.target.value) || 1)), className: "w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "block mb-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium mb-2 block", children: "Travel style" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-2", children: ["backpacker", "budget", "comfort"].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setStyle(s), className: `px-3 py-2.5 rounded-xl text-sm font-medium capitalize transition-all ${style === s ? "bg-primary text-primary-foreground shadow-soft" : "bg-secondary text-foreground/70 hover:bg-secondary/80"}`, children: s }, s)) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-3xl bg-sunset p-7 md:p-9 text-primary-foreground shadow-warm relative overflow-hidden", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -top-10 -right-10 h-40 w-40 rounded-full bg-sun/40 blur-2xl" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "relative text-sm opacity-90 mb-2", children: [
            "Total for ",
            travelers,
            " ",
            travelers === 1 ? "traveler" : "travelers",
            " · ",
            days,
            " days"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative font-display text-6xl md:text-7xl font-semibold mb-1", children: formatInr(tripTotal) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "relative opacity-90", children: [
            "About ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold", children: formatInr(dailyTotal) }),
            " per person per day in ",
            dest.name,
            "."
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-3xl bg-card border border-border/60 p-6 md:p-8 shadow-soft", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-2xl font-semibold mb-6", children: "Daily breakdown" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: rows.map((r) => {
            const v = breakdown[r.key];
            const pct = max > 0 ? v / max * 100 : 0;
            return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-1.5 text-sm", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-medium flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: r.icon }),
                  " ",
                  r.label
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold", children: formatInr(v) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-3 rounded-full bg-secondary overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `h-full rounded-full ${r.color} transition-all duration-500`, style: {
                width: `${pct}%`
              } }) })
            ] }, r.key);
          }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 pt-6 border-t border-border/60 flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Daily total per person" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-3xl font-semibold text-primary", children: formatInr(dailyTotal) }) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-3xl bg-secondary/60 p-6 md:p-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingDown, { className: "h-5 w-5 text-leaf" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-display text-2xl font-semibold", children: [
              "Spend even less in ",
              dest.name
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "grid md:grid-cols-2 gap-3", children: dest.tips.map((tip, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex gap-3 items-start text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mt-0.5 h-6 w-6 rounded-full bg-leaf text-leaf-foreground grid place-items-center text-xs font-semibold shrink-0", children: "✓" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground/85", children: tip })
          ] }, i)) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground text-center", children: "Estimates based on typical backpacker / budget traveler spending. Excludes international flights, visas, and travel insurance." })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(SiteFooter, {})
  ] });
}
export {
  EstimatePage as component
};
