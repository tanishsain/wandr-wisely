import { T as jsxRuntimeExports } from "./worker-entry-CVMFMino.js";
import { L as Link } from "./router-C-aH7qSq.js";
import { f as formatInr } from "./currency--B8lzbTJ.js";
import { c as createLucideIcon } from "./site-footer-Cu9GkHUY.js";
const __iconNode = [
  ["path", { d: "M7 7h10v10", key: "1tivn9" }],
  ["path", { d: "M7 17 17 7", key: "1vkiza" }]
];
const ArrowUpRight = createLucideIcon("arrow-up-right", __iconNode);
const regionBackdrop = {
  Asia: "linear-gradient(135deg, #2a1832 0%, #5a2a3a 45%, #c9a84c 130%)",
  Europe: "linear-gradient(135deg, #0e2230 0%, #2a3f5a 45%, #c9a84c 140%)",
  Americas: "linear-gradient(135deg, #2a1a14 0%, #5a3220 45%, #c9a84c 130%)",
  Africa: "linear-gradient(135deg, #3a2010 0%, #6a3818 45%, #c9a84c 130%)",
  Oceania: "linear-gradient(135deg, #0a2230 0%, #1a4a5a 45%, #c9a84c 140%)",
  "Middle East": "linear-gradient(135deg, #2a1a08 0%, #5a3a18 45%, #c9a84c 130%)"
};
function DestinationCard({ dest }) {
  const total = dest.costs.stay + dest.costs.food + dest.costs.transport + dest.costs.activities;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Link,
    {
      to: "/explore",
      search: { q: dest.slug },
      className: "group relative block rounded-2xl overflow-hidden border border-gold transition-all duration-500 hover:-translate-y-1 hover:shadow-glow",
      style: {
        background: regionBackdrop[dest.region],
        minHeight: "420px"
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute inset-0 grid place-items-center text-[14rem] opacity-25 group-hover:opacity-35 group-hover:scale-110 transition-all duration-700",
            "aria-hidden": true,
            children: dest.emoji
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute inset-0",
            style: {
              background: "linear-gradient(180deg, rgba(8,12,24,0.2) 0%, rgba(8,12,24,0.4) 50%, rgba(8,12,24,0.95) 100%)"
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-2 rounded-xl border border-transparent group-hover:border-gold-strong transition-colors duration-500 pointer-events-none" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 flex items-start justify-between p-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "eyebrow", children: dest.region }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-9 w-9 rounded-full border border-gold grid place-items-center text-gold group-hover:bg-gold group-hover:text-primary-foreground transition-all", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpRight, { className: "h-4 w-4 group-hover:rotate-45 transition-transform" }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-x-0 bottom-0 z-10 p-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] font-semibold tracking-[0.28em] uppercase text-gold/90 mb-2", children: dest.country }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-4xl font-medium text-foreground mb-3 leading-none", children: dest.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground/70 mb-5 line-clamp-2 leading-relaxed", children: dest.tagline }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between pt-4 border-t border-gold", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "span",
              {
                className: "inline-flex items-center px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider",
                style: {
                  background: "var(--gradient-gold)",
                  color: "var(--ink)"
                },
                children: [
                  "From $",
                  total,
                  "/day"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[11px] text-muted-foreground", children: [
              formatInr(total),
              " · day"
            ] })
          ] })
        ] })
      ]
    }
  );
}
export {
  DestinationCard as D
};
