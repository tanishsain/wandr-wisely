import { T as jsxRuntimeExports } from "./worker-entry-CVMFMino.js";
import { d as destinations, L as Link } from "./router-C-aH7qSq.js";
import { S as SiteHeader, a as SiteFooter } from "./site-footer-Cu9GkHUY.js";
import { D as DestinationCard } from "./destination-card-CVrOIY2Z.js";
import { T as TrustBadges, b as TestimonialsGrid, c as ComparisonSection, U as UrgencyBanner, a as PricingPlans, G as GuaranteeSection, F as FAQSection } from "./conversion-sections-BX8HSi99.js";
import { A as ArrowRight } from "./clock-DVsMz_YE.js";
import { C as Compass, W as Wallet } from "./wallet-BfH4tWYM.js";
import { S as Sparkles } from "./sparkles-CVG9Vr0A.js";
import "node:events";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
import "./types-CHm7Zrw6.js";
import "./currency--B8lzbTJ.js";
import "./zap-C-9OYVtN.js";
import "./star-sBKfvAVq.js";
function HeroGlobe() {
  const markers = [
    { x: 28, y: 38, delay: 0 },
    // London-ish
    { x: 52, y: 42, delay: 0.4 },
    // Cairo-ish
    { x: 68, y: 48, delay: 0.8 },
    // Mumbai-ish
    { x: 78, y: 38, delay: 1.2 },
    // Tokyo-ish
    { x: 18, y: 52, delay: 1.6 },
    // NYC-ish
    { x: 36, y: 64, delay: 2 },
    // Rio-ish
    { x: 82, y: 62, delay: 2.4 }
    // Sydney-ish
  ];
  const arcs = [
    { from: 0, to: 3, delay: 0 },
    { from: 4, to: 2, delay: 1.5 },
    { from: 1, to: 6, delay: 3 },
    { from: 5, to: 0, delay: 4.5 }
  ];
  const arcPath = (a, b) => {
    const mx = (a.x + b.x) / 2;
    const my = (a.y + b.y) / 2 - 12;
    return `M ${a.x} ${a.y} Q ${mx} ${my} ${b.x} ${b.y}`;
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "absolute inset-0 grid place-items-center pointer-events-none lux-fade-in",
      "aria-hidden": true,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute h-[120vmin] w-[120vmin] max-h-[1100px] max-w-[1100px] rounded-full",
            style: {
              background: "radial-gradient(circle, rgba(201,168,76,0.12) 0%, transparent 55%)",
              filter: "blur(40px)"
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "relative h-[85vmin] w-[85vmin] max-h-[780px] max-w-[780px] rounded-full overflow-hidden",
            style: {
              background: "radial-gradient(circle at 35% 30%, #131a2e 0%, #0a1020 50%, #04060f 100%)",
              boxShadow: "inset 0 0 80px rgba(201,168,76,0.08), 0 0 120px rgba(201,168,76,0.15)"
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 globe-rotate", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { viewBox: "0 0 100 100", className: "w-full h-full", preserveAspectRatio: "none", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("defs", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("radialGradient", { id: "gridFade", cx: "50%", cy: "50%", r: "50%", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "0%", stopColor: "#c9a84c", stopOpacity: "0.35" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "70%", stopColor: "#c9a84c", stopOpacity: "0.18" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "100%", stopColor: "#c9a84c", stopOpacity: "0" })
                ] }) }),
                Array.from({ length: 12 }).map((_, i) => {
                  const rx = 50 - i * 4;
                  return /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "ellipse",
                    {
                      cx: "50",
                      cy: "50",
                      rx: rx < 1 ? 1 : rx,
                      ry: "48",
                      fill: "none",
                      stroke: "url(#gridFade)",
                      strokeWidth: "0.18"
                    },
                    `mer-${i}`
                  );
                })
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 globe-rotate-rev", style: { animationDuration: "100s" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { viewBox: "0 0 100 100", className: "w-full h-full", preserveAspectRatio: "none", children: Array.from({ length: 9 }).map((_, i) => {
                const y = 5 + i * 11.25;
                const rx = Math.sqrt(50 * 50 - (y - 50) * (y - 50)) || 0.1;
                return /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "ellipse",
                  {
                    cx: "50",
                    cy: y,
                    rx,
                    ry: "1.4",
                    fill: "none",
                    stroke: "#c9a84c",
                    strokeOpacity: "0.18",
                    strokeWidth: "0.18"
                  },
                  `par-${i}`
                );
              }) }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "absolute left-0 right-0 top-1/2 h-px",
                  style: {
                    background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.35), transparent)"
                  }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { viewBox: "0 0 100 100", className: "absolute inset-0 w-full h-full", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("defs", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("radialGradient", { id: "markerGlow", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "0%", stopColor: "#f5e6c8", stopOpacity: "1" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "60%", stopColor: "#c9a84c", stopOpacity: "0.6" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "100%", stopColor: "#c9a84c", stopOpacity: "0" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("linearGradient", { id: "arcGrad", x1: "0%", y1: "0%", x2: "100%", y2: "0%", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "0%", stopColor: "#c9a84c", stopOpacity: "0" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "50%", stopColor: "#f5e6c8", stopOpacity: "1" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "100%", stopColor: "#c9a84c", stopOpacity: "0" })
                  ] })
                ] }),
                arcs.map((arc, i) => {
                  const a = markers[arc.from];
                  const b = markers[arc.to];
                  return /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "path",
                    {
                      d: arcPath(a, b),
                      fill: "none",
                      stroke: "url(#arcGrad)",
                      strokeWidth: "0.4",
                      strokeLinecap: "round",
                      className: "arc-draw",
                      style: { animationDelay: `${arc.delay}s` }
                    },
                    `arc-${i}`
                  );
                }),
                markers.map((m, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("g", { className: "marker-pulse", style: { animationDelay: `${m.delay}s` }, children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: m.x, cy: m.y, r: "2.5", fill: "url(#markerGlow)" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: m.x, cy: m.y, r: "0.7", fill: "#f5e6c8" })
                ] }, `m-${i}`))
              ] })
            ]
          }
        )
      ]
    }
  );
}
function GoldParticles() {
  const particles = Array.from({ length: 14 }).map((_, i) => ({
    left: i * 7.3 % 100,
    delay: i * 1.1 % 14,
    duration: 12 + i % 5 * 1.5,
    size: 1 + i % 3 * 0.8
  }));
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 overflow-hidden pointer-events-none", "aria-hidden": true, children: particles.map((p, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
    "span",
    {
      className: "absolute bottom-0 rounded-full particle-rise",
      style: {
        left: `${p.left}%`,
        width: `${p.size}px`,
        height: `${p.size}px`,
        background: "rgba(245, 230, 200, 0.6)",
        boxShadow: "0 0 6px rgba(201, 168, 76, 0.7)",
        animationDelay: `${p.delay}s`,
        animationDuration: `${p.duration}s`
      }
    },
    i
  )) });
}
function HomePage() {
  const featured = destinations.slice(0, 6);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen", style: {
    background: "var(--ink)"
  }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 z-[100] grid place-items-center pointer-events-none loader-fade", style: {
      background: "var(--ink)"
    }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-6xl font-medium text-gold-gradient", children: "Wandr" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(SiteHeader, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative min-h-screen flex items-center justify-center overflow-hidden", style: {
      background: "var(--ink)"
    }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(HeroGlobe, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(GoldParticles, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 pointer-events-none", style: {
        background: "radial-gradient(ellipse at center, transparent 0%, rgba(8,12,24,0.6) 70%, var(--ink) 100%)"
      } }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 max-w-5xl mx-auto px-6 pt-32 pb-24 text-center lux-fade-up", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "eyebrow mb-8 inline-block", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-block w-10 h-px bg-gold align-middle mr-4" }),
          "Curated since 2024",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-block w-10 h-px bg-gold align-middle ml-4" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-medium leading-[1.05] tracking-tight text-balance mb-8 text-foreground", children: [
          "Travel Further.",
          /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "italic text-gold-gradient", children: "Spend Less." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-base sm:text-lg text-muted-foreground max-w-xl mx-auto mb-12 leading-relaxed font-light", children: "Intelligent itineraries crafted for the modern explorer." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row items-center justify-center gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/explore", className: "group inline-flex items-center gap-3 px-8 py-4 rounded-full text-xs font-semibold tracking-[0.22em] uppercase transition-all duration-300 hover:shadow-glow hover:-translate-y-0.5", style: {
            background: "var(--gradient-gold)",
            color: "var(--ink)"
          }, children: [
            "Explore Destinations",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-3.5 w-3.5 transition-transform group-hover:translate-x-1" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/plan", className: "group inline-flex items-center gap-3 px-8 py-4 rounded-full text-xs font-semibold tracking-[0.22em] uppercase border text-gold bg-transparent hover:bg-gold hover:text-primary-foreground transition-all duration-300", style: {
            borderColor: "var(--border-gold-strong)"
          }, children: [
            "Plan a Trip",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-3.5 w-3.5 transition-transform group-hover:translate-x-1" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] tracking-[0.3em] uppercase text-gold/70", children: "Scroll" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative h-12 w-px bg-gold/15", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-0 left-0 w-px h-full bg-gold scroll-line", style: {
          boxShadow: "0 0 8px rgba(201,168,76,0.8)"
        } }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(TrustBadges, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mx-auto max-w-7xl px-6 py-24", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-end justify-between mb-14 flex-wrap gap-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "eyebrow eyebrow-line mb-5", children: "Curated Destinations" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-4xl md:text-6xl font-medium tracking-tight max-w-xl leading-[1.05]", children: "Places worth the journey." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/explore", className: "group inline-flex items-center gap-2 text-xs font-semibold tracking-[0.22em] uppercase text-gold hover:gap-3 transition-all", children: [
          "View all ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-3.5 w-3.5" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid sm:grid-cols-2 lg:grid-cols-3 gap-6", children: featured.map((dest) => /* @__PURE__ */ jsxRuntimeExports.jsx(DestinationCard, { dest }, dest.slug)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative py-24 border-y border-gold overflow-hidden", style: {
      background: "var(--ink-deep)"
    }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 opacity-[0.04] pointer-events-none", style: {
        backgroundImage: "radial-gradient(circle at 20% 30%, #c9a84c 1px, transparent 1.5px), radial-gradient(circle at 40% 50%, #c9a84c 1px, transparent 1.5px), radial-gradient(circle at 60% 35%, #c9a84c 1px, transparent 1.5px), radial-gradient(circle at 75% 55%, #c9a84c 1px, transparent 1.5px), radial-gradient(circle at 85% 30%, #c9a84c 1px, transparent 1.5px), radial-gradient(circle at 25% 65%, #c9a84c 1px, transparent 1.5px), radial-gradient(circle at 50% 75%, #c9a84c 1px, transparent 1.5px), radial-gradient(circle at 70% 70%, #c9a84c 1px, transparent 1.5px)",
        backgroundSize: "200px 200px"
      } }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mx-auto max-w-6xl px-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-20", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "eyebrow mb-5", children: "How it works" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-4xl md:text-6xl font-medium tracking-tight mb-4", children: "Three steps. Zero compromise." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative grid md:grid-cols-3 gap-12 md:gap-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hidden md:block absolute top-8 left-[16%] right-[16%] h-px", style: {
            background: "linear-gradient(90deg, transparent, var(--gold), transparent)"
          } }),
          [{
            num: "01",
            icon: Compass,
            title: "Discover",
            desc: "Browse curated highlights for cities and countries — landmarks, food, hidden gems.",
            to: "/explore",
            cta: "Explore destinations"
          }, {
            num: "02",
            icon: Sparkles,
            title: "Plan",
            desc: "Generate a day-by-day itinerary tuned to your style, budget, and interests.",
            to: "/plan",
            cta: "Try the AI planner"
          }, {
            num: "03",
            icon: Wallet,
            title: "Travel",
            desc: "See realistic daily costs and tips to stretch every rupee further.",
            to: "/estimate",
            cta: "Estimate my trip"
          }].map((step) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: step.to, className: "relative group text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative mx-auto h-16 w-16 rounded-full border-2 grid place-items-center mb-6 transition-all group-hover:scale-110", style: {
              background: "var(--ink)",
              borderColor: "var(--gold)"
            }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-lg text-gold", children: step.num }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(step.icon, { className: "h-5 w-5 text-gold/70 mx-auto mb-4", strokeWidth: 1.5 }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-3xl font-medium mb-3", children: step.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-5 max-w-xs mx-auto leading-relaxed", children: step.desc }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs tracking-[0.22em] uppercase text-gold inline-flex items-center gap-2 group-hover:gap-3 transition-all", children: [
              step.cta,
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-3 w-3" })
            ] })
          ] }, step.num))
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mx-auto max-w-7xl px-6 py-24", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-end justify-between mb-14 flex-wrap gap-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "eyebrow eyebrow-line mb-5", children: "India Spotlight" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-4xl md:text-6xl font-medium tracking-tight max-w-xl leading-[1.05]", children: "The land of kings, reimagined." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/explore", search: {
          q: "rajasthan"
        }, className: "text-xs font-semibold tracking-[0.22em] uppercase text-gold hover:gap-3 inline-flex items-center gap-2 transition-all", children: [
          "Explore Rajasthan ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-3.5 w-3.5" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid sm:grid-cols-2 lg:grid-cols-3 gap-6", children: [{
        slug: "jaipur",
        name: "Jaipur",
        emoji: "🏰",
        tag: "Pink City",
        blurb: "Amber Fort, Hawa Mahal and bustling bazaars."
      }, {
        slug: "jodhpur",
        name: "Jodhpur",
        emoji: "🔵",
        tag: "Blue City",
        blurb: "Mehrangarh Fort towering over indigo lanes."
      }, {
        slug: "jaisalmer",
        name: "Jaisalmer",
        emoji: "🐪",
        tag: "Golden City",
        blurb: "Sandstone fort and Sam dune camel safaris."
      }, {
        slug: "udaipur",
        name: "Udaipur",
        emoji: "🛶",
        tag: "City of Lakes",
        blurb: "Lake Pichola palaces and rooftop sunsets."
      }, {
        slug: "bikaner",
        name: "Bikaner",
        emoji: "🕌",
        tag: "Camel Country",
        blurb: "Junagarh Fort, sweets, and desert culture."
      }, {
        slug: "pushkar",
        name: "Pushkar",
        emoji: "🪔",
        tag: "Holy Town",
        blurb: "Sacred lake, ghats and the famous camel fair."
      }].map((c) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/explore", search: {
        q: c.slug
      }, className: "group p-7 rounded-2xl border border-gold hover:border-gold-strong transition-all duration-500 hover:-translate-y-1 hover:shadow-glow", style: {
        background: "var(--surface)"
      }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between mb-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-5xl", "aria-hidden": true, children: c.emoji }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "eyebrow", children: c.tag })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-3xl font-medium mb-3", children: c.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed mb-6", children: c.blurb }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-[11px] tracking-[0.22em] uppercase text-gold inline-flex items-center gap-2 group-hover:gap-3 transition-all", children: [
          "See guide ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-3 w-3" })
        ] })
      ] }, c.slug)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(TestimonialsGrid, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ComparisonSection, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "mx-auto max-w-5xl px-6 py-24", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative rounded-2xl p-12 md:p-20 text-center overflow-hidden border border-gold", style: {
      background: "var(--ink-deep)"
    }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -top-20 -right-20 h-80 w-80 rounded-full", style: {
        background: "radial-gradient(circle, rgba(201,168,76,0.2), transparent 70%)",
        filter: "blur(40px)"
      } }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "eyebrow mb-6 relative", children: "Your next chapter" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "relative font-display text-3xl md:text-5xl font-medium mb-6 text-balance leading-tight", children: "The world is closer than you think." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "relative text-muted-foreground mb-10 max-w-xl mx-auto leading-relaxed", children: "Pick a destination, set your budget, and let Wandr orchestrate the rest." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/plan", className: "relative inline-flex items-center gap-3 px-8 py-4 rounded-full text-xs font-semibold tracking-[0.22em] uppercase hover:shadow-glow transition-all hover:-translate-y-0.5", style: {
        background: "var(--gradient-gold)",
        color: "var(--ink)"
      }, children: [
        "Plan my next trip ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-3.5 w-3.5" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(UrgencyBanner, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(PricingPlans, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(GuaranteeSection, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(FAQSection, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(SiteFooter, {})
  ] });
}
export {
  HomePage as component
};
