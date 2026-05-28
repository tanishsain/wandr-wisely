import { T as jsxRuntimeExports } from "./worker-entry-CVMFMino.js";
import { L as Link } from "./router-C-aH7qSq.js";
import { c as createLucideIcon, S as SiteHeader, a as SiteFooter } from "./site-footer-Cu9GkHUY.js";
import { C as Compass, W as Wallet } from "./wallet-BfH4tWYM.js";
import "node:events";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
import "./types-CHm7Zrw6.js";
const __iconNode$1 = [
  [
    "path",
    {
      d: "M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5",
      key: "mvr1a0"
    }
  ]
];
const Heart = createLucideIcon("heart", __iconNode$1);
const __iconNode = [
  [
    "path",
    {
      d: "M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z",
      key: "nnexq3"
    }
  ],
  ["path", { d: "M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12", key: "mt58a7" }]
];
const Leaf = createLucideIcon("leaf", __iconNode);
function AboutPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SiteHeader, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-warm", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-3xl px-5 py-16 md:py-24 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-6xl mb-6", children: "🌅" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-5xl md:text-6xl font-semibold mb-5 text-balance", children: "Travel is for everyone." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg text-muted-foreground text-balance", children: "Wandr exists because the best trips of our lives weren't the most expensive ones. They were the ones where we got curious, asked locals, ate at the place with no English menu, and walked instead of taxied. We made Wandr to share that with you." })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mx-auto max-w-4xl px-5 py-16", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid md:grid-cols-2 gap-5", children: [{
        icon: Heart,
        title: "Friendly, not financial",
        desc: "No spammy deals, no affiliate clickbait. Just honest tips from real travelers."
      }, {
        icon: Compass,
        title: "Curated, not infinite",
        desc: "25 hand-picked destinations beats 25,000 generic ones. Quality over quantity."
      }, {
        icon: Wallet,
        title: "Budget-first",
        desc: "Every place we list comes with realistic daily costs and ways to save more."
      }, {
        icon: Leaf,
        title: "Slow and local",
        desc: "We highlight neighborhoods, family-run kitchens, and free experiences worth your time."
      }].map((v) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 rounded-3xl bg-card border border-border/60 shadow-soft", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-11 w-11 rounded-2xl bg-primary text-primary-foreground grid place-items-center mb-4 shadow-soft", children: /* @__PURE__ */ jsxRuntimeExports.jsx(v.icon, { className: "h-5 w-5" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-xl font-semibold mb-2", children: v.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: v.desc })
      ] }, v.title)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-14 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/explore", className: "inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-primary text-primary-foreground font-medium shadow-soft hover:shadow-warm transition-all", children: "Start exploring →" }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(SiteFooter, {})
  ] });
}
export {
  AboutPage as component
};
