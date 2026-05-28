import { T as jsxRuntimeExports } from "./worker-entry-CVMFMino.js";
import { b as blogPosts, L as Link } from "./router-C-aH7qSq.js";
import { S as SiteHeader, a as SiteFooter } from "./site-footer-Cu9GkHUY.js";
import { C as Calendar } from "./calendar-fMy52lZq.js";
import { C as Clock, A as ArrowRight } from "./clock-DVsMz_YE.js";
import "node:events";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
import "./types-CHm7Zrw6.js";
function BlogIndex() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SiteHeader, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mx-auto max-w-5xl px-5 pt-14 pb-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold uppercase tracking-widest text-primary", children: "Wandr Journal" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-4xl md:text-6xl font-semibold mt-3 mb-4", children: "Travel guides & budget tips" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg text-muted-foreground max-w-2xl", children: "Real itineraries, real costs. Bite-sized guides to help you plan unforgettable trips without overspending." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "mx-auto max-w-5xl px-5 pb-20 grid gap-6 md:grid-cols-2", children: blogPosts.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/blog/$slug", params: {
      slug: p.slug
    }, className: "group rounded-3xl overflow-hidden bg-card border border-border/60 shadow-soft hover:shadow-warm hover:-translate-y-1 transition-all", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-[16/10] overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: p.cover, alt: p.title, loading: "lazy", className: "h-full w-full object-cover group-hover:scale-105 transition-transform duration-500" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 text-xs text-muted-foreground mb-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-3.5 w-3.5" }),
            " ",
            p.date
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-3.5 w-3.5" }),
            " ",
            p.readMins,
            " min read"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-semibold mb-2 group-hover:text-primary transition-colors", children: p.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mb-4", children: p.excerpt }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-primary font-medium inline-flex items-center gap-1 group-hover:gap-2 transition-all", children: [
          "Read article ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4" })
        ] })
      ] })
    ] }, p.slug)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(SiteFooter, {})
  ] });
}
export {
  BlogIndex as component
};
