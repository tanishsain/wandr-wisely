import { T as jsxRuntimeExports, r as reactExports } from "./worker-entry-CVMFMino.js";
import { S as Sparkles } from "./sparkles-CVG9Vr0A.js";
import { Z as Zap, C as Crown } from "./zap-C-9OYVtN.js";
import { A as ArrowRight, C as Clock } from "./clock-DVsMz_YE.js";
import { c as createLucideIcon, X } from "./site-footer-Cu9GkHUY.js";
import { E as Earth, S as Star } from "./star-sBKfvAVq.js";
const __iconNode$6 = [
  [
    "path",
    {
      d: "M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z",
      key: "3c2336"
    }
  ],
  ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }]
];
const BadgeCheck = createLucideIcon("badge-check", __iconNode$6);
const __iconNode$5 = [["path", { d: "M20 6 9 17l-5-5", key: "1gmf2c" }]];
const Check = createLucideIcon("check", __iconNode$5);
const __iconNode$4 = [["path", { d: "m6 9 6 6 6-6", key: "qrunsl" }]];
const ChevronDown = createLucideIcon("chevron-down", __iconNode$4);
const __iconNode$3 = [
  [
    "path",
    {
      d: "M12 3q1 4 4 6.5t3 5.5a1 1 0 0 1-14 0 5 5 0 0 1 1-3 1 1 0 0 0 5 0c0-2-1.5-3-1.5-5q0-2 2.5-4",
      key: "1slcih"
    }
  ]
];
const Flame = createLucideIcon("flame", __iconNode$3);
const __iconNode$2 = [
  ["rect", { width: "18", height: "11", x: "3", y: "11", rx: "2", ry: "2", key: "1w4ew1" }],
  ["path", { d: "M7 11V7a5 5 0 0 1 10 0v4", key: "fwvmzm" }]
];
const Lock = createLucideIcon("lock", __iconNode$2);
const __iconNode$1 = [
  [
    "path",
    {
      d: "M16 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z",
      key: "rib7q0"
    }
  ],
  [
    "path",
    {
      d: "M5 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z",
      key: "1ymkrd"
    }
  ]
];
const Quote = createLucideIcon("quote", __iconNode$1);
const __iconNode = [
  [
    "path",
    {
      d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
      key: "oel41y"
    }
  ]
];
const Shield = createLucideIcon("shield", __iconNode);
const plans = [
  {
    name: "Basic",
    price: 199,
    original: 499,
    href: "https://rzp.io/rzp/wandrwisely-basic",
    icon: Sparkles,
    tagline: "Perfect for a quick weekend getaway",
    features: [
      "1 destination trip plan",
      "Day-by-day AI itinerary",
      "Budget breakdown in INR",
      "Top attractions & food picks",
      "Email support"
    ]
  },
  {
    name: "Standard",
    price: 499,
    original: 999,
    href: "https://rzp.io/rzp/wandrwisely-standard",
    icon: Zap,
    tagline: "Most popular for week-long trips",
    features: [
      "Up to 3 destination trip plans",
      "Detailed 7-day itineraries",
      "Hotel & flight recommendations",
      "Hidden gems & local food spots",
      "Personalized packing list",
      "Priority email support",
      "2 free revisions"
    ],
    highlight: true
  },
  {
    name: "Premium",
    price: 999,
    original: 1999,
    href: "https://rzp.io/rzp/otXOpEWz",
    icon: Crown,
    tagline: "For the serious explorer",
    features: [
      "Unlimited destination trip plans",
      "Full multi-city itineraries",
      "Premium hotel & flight deals",
      "1-on-1 trip consultation",
      "Custom packing & budget sheets",
      "WhatsApp + priority support",
      "5 free revisions",
      "Lifetime plan updates"
    ]
  }
];
function PricingButtonsRow() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap justify-center gap-3 sm:gap-4", children: plans.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "a",
    {
      href: p.href,
      target: "_blank",
      rel: "noopener noreferrer",
      className: "group relative inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full\n                     border text-gold text-xs font-semibold tracking-[0.22em] uppercase\n                     bg-transparent transition-all duration-300\n                     hover:bg-gold hover:text-primary-foreground hover:shadow-gold\n                     focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gold)]/40",
      style: { borderColor: "var(--border-gold-strong)" },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(p.icon, { className: "h-4 w-4" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
          p.name,
          " · ₹",
          p.price
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" })
      ]
    },
    p.name
  )) });
}
function PricingPlans({ id = "pricing" }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { id, className: "mx-auto max-w-6xl px-6 py-24", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-16", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "eyebrow mb-5 inline-flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Flame, { className: "h-3 w-3" }),
        " Limited offer · 60% off"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-4xl md:text-6xl font-medium tracking-tight mb-4", children: "The plan for your journey" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground max-w-xl mx-auto text-base", children: [
        "One-time payment. Lifetime access. ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gold", children: "Only 10 spots left today." })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid md:grid-cols-3 gap-6 items-stretch", children: plans.map((p) => {
      const Icon = p.icon;
      const isFeatured = p.highlight;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: `group relative rounded-2xl p-8 flex flex-col transition-all duration-500 hover:-translate-y-1 ${isFeatured ? "md:scale-105 md:-mt-3" : ""}`,
          style: {
            background: "var(--surface)",
            border: isFeatured ? "1px solid transparent" : "1px solid var(--border-gold)",
            backgroundImage: isFeatured ? "linear-gradient(var(--surface), var(--surface)), var(--gradient-gold)" : void 0,
            backgroundOrigin: isFeatured ? "border-box" : void 0,
            backgroundClip: isFeatured ? "padding-box, border-box" : void 0,
            boxShadow: isFeatured ? "0 30px 60px -20px rgba(201,168,76,0.25), 0 0 0 1px rgba(201,168,76,0.1)" : "var(--shadow-soft)"
          },
          children: [
            isFeatured && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-[10px] font-semibold tracking-[0.22em] uppercase",
                style: {
                  background: "var(--gradient-gold)",
                  color: "var(--ink)"
                },
                children: "★ Most Popular"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-6", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "h-11 w-11 rounded-full grid place-items-center border border-gold-strong text-gold",
                  style: { borderColor: "var(--border-gold-strong)" },
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-5 w-5" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "eyebrow text-gold", children: "Plan" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-2xl font-medium", children: p.name })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-7", children: p.tagline }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-2 flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm line-through text-muted-foreground", children: [
                "₹",
                p.original
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: "text-[10px] font-semibold tracking-[0.22em] uppercase px-2 py-0.5 rounded-sm text-gold",
                  style: { borderColor: "var(--border-gold-strong)", border: "1px solid var(--border-gold-strong)" },
                  children: "60% off"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-baseline gap-2 mb-8", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-display text-6xl font-medium text-gold-gradient", children: [
                "₹",
                p.price
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground", children: "lifetime" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-3 mb-8 flex-1", children: p.features.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex gap-3 items-start text-sm text-foreground/90", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mt-1.5 text-gold text-xs leading-none", children: "◆" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: f })
            ] }, f)) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "a",
              {
                href: p.href,
                target: "_blank",
                rel: "noopener noreferrer",
                className: "group/btn w-full inline-flex items-center justify-center gap-2.5 px-5 py-4 rounded-full text-xs font-semibold tracking-[0.22em] uppercase transition-all duration-300 hover:shadow-glow",
                style: {
                  background: "var(--gradient-gold)",
                  color: "var(--ink)"
                },
                children: [
                  "Reserve ",
                  p.name,
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-3.5 w-3.5 transition-transform duration-300 group-hover/btn:translate-x-1" })
                ]
              }
            )
          ]
        },
        p.name
      );
    }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-[11px] tracking-[0.22em] uppercase text-muted-foreground mt-12", children: "Secure checkout · Razorpay · UPI · Cards · Net Banking" })
  ] });
}
function TrustBadges() {
  const badges = [
    { icon: Shield, label: "Money Back Guarantee" },
    { icon: Zap, label: "Instant Delivery" },
    { icon: Lock, label: "Secured by Razorpay" },
    { icon: Earth, label: "10,000+ Destinations" },
    { icon: Sparkles, label: "AI-Powered Planning" }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "border-y border-gold", style: { background: "var(--ink-deep)" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto max-w-7xl px-6 py-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4", children: badges.map((b) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 justify-center sm:justify-start", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(b.icon, { className: "h-4 w-4 text-gold shrink-0" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] sm:text-xs font-medium tracking-[0.18em] uppercase text-foreground/75 leading-tight", children: b.label })
  ] }, b.label)) }) });
}
const TESTIMONIALS = [
  { name: "Priya Sharma", city: "Delhi", quote: "Planned my entire Rajasthan trip in minutes. The hidden gems section was extraordinary." },
  { name: "Rahul Verma", city: "Mumbai", quote: "Worth every rupee. A complete 7-day Jaipur itinerary, instantly. My family loved every moment." },
  { name: "Anjali Singh", city: "Bangalore", quote: "The finest travel planner for India. The budget breakdown saved us nearly ₹5,000." },
  { name: "Amit Patel", city: "Ahmedabad", quote: "Used the Standard Plan for our honeymoon. Everything was flawlessly orchestrated." },
  { name: "Sneha Gupta", city: "Jaipur", quote: "A travel planner that truly understands India. The coverage was remarkably precise." },
  { name: "Vikram Kumar", city: "Hyderabad", quote: "Premium plan was worth every paisa. WhatsApp support throughout our entire road trip." }
];
function TestimonialsGrid() {
  const loop = [...TESTIMONIALS, ...TESTIMONIALS];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative overflow-hidden border-y border-gold", style: { background: "var(--ink-deep)" }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl px-6 py-24", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-16 relative", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            "aria-hidden": true,
            className: "absolute -top-8 left-1/2 -translate-x-1/2 font-display text-[12rem] leading-none text-gold/10 select-none pointer-events-none",
            children: '"'
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "eyebrow mb-5 relative", children: "Words from our travelers" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-4xl md:text-6xl font-medium mb-5 relative", children: "Loved across the world" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-1.5 text-gold relative", children: [
          Array.from({ length: 5 }).map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "h-4 w-4 fill-current" }, i)),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-3 text-xs tracking-[0.22em] uppercase text-muted-foreground", children: "4.9 average" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "relative",
          style: {
            maskImage: "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)",
            WebkitMaskImage: "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)"
          },
          children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-6 animate-[scroll_60s_linear_infinite] hover:[animation-play-state:paused]", style: { width: "max-content" }, children: loop.map((t, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "figure",
            {
              className: "w-[340px] shrink-0 p-7 rounded-2xl border border-gold flex flex-col",
              style: { background: "var(--surface)" },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Quote, { className: "h-6 w-6 text-gold/40 mb-4" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("blockquote", { className: "font-display italic text-lg text-foreground/90 mb-6 flex-1 leading-relaxed", children: t.quote }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-1 text-gold mb-3", children: Array.from({ length: 5 }).map((_, i2) => /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "h-3 w-3 fill-current" }, i2)) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("figcaption", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-medium text-gold tracking-wide", children: t.name }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[11px] tracking-[0.22em] uppercase text-muted-foreground mt-1", children: t.city })
                ] })
              ]
            },
            `${t.name}-${i}`
          )) })
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("style", { children: `
        @keyframes scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      ` })
  ] });
}
function UrgencyBanner() {
  const [secs, setSecs] = reactExports.useState(24 * 3600);
  reactExports.useEffect(() => {
    const id = setInterval(() => setSecs((s2) => s2 > 0 ? s2 - 1 : 24 * 3600), 1e3);
    return () => clearInterval(id);
  }, []);
  const h = String(Math.floor(secs / 3600)).padStart(2, "0");
  const m = String(Math.floor(secs % 3600 / 60)).padStart(2, "0");
  const s = String(secs % 60).padStart(2, "0");
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto max-w-6xl px-6 pt-12 -mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4 border border-gold-strong",
      style: {
        background: "var(--surface)",
        borderColor: "var(--border-gold-strong)"
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-10 w-10 rounded-full border border-gold grid place-items-center text-gold", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Flame, { className: "h-4 w-4" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "eyebrow text-gold mb-1", children: "Limited offer · 60% off" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-foreground/80", children: "Only 10 spots left today" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-3.5 w-3.5 text-gold" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] tracking-[0.22em] uppercase text-muted-foreground", children: "Ends in" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-1 font-display text-xl text-gold tabular-nums", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: h }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gold/50", children: ":" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: m }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gold/50", children: ":" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: s })
          ] })
        ] })
      ]
    }
  ) });
}
function ComparisonSection() {
  const features = [
    { feature: "Planning time", others: "Hours of research", wandr: "10 seconds" },
    { feature: "Cost", others: "₹5,000+ commission", wandr: "₹199 — keep the savings" },
    { feature: "Day-by-day itinerary", others: false, wandr: true },
    { feature: "Hidden gems", others: false, wandr: true },
    { feature: "Budget in INR", others: false, wandr: true },
    { feature: "Money-back guarantee", others: false, wandr: true }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mx-auto max-w-5xl px-6 py-24", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-14", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "eyebrow mb-5", children: "The Wandr advantage" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-4xl md:text-6xl font-medium mb-4", children: "Why travelers choose Wandr" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "rounded-2xl overflow-hidden border border-gold",
        style: { background: "var(--surface)" },
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-[1.4fr_1fr_1fr] text-[10px] sm:text-xs tracking-[0.22em] uppercase", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-5 sm:p-6 text-muted-foreground border-b border-gold", children: "Feature" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-5 sm:p-6 text-muted-foreground border-b border-l border-gold text-center", children: "Others" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "p-5 sm:p-6 text-center border-b border-l border-gold font-semibold",
              style: { background: "var(--gradient-gold)", color: "var(--ink)" },
              children: "Wandr"
            }
          ),
          features.map((row, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "contents", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `p-5 sm:p-6 text-foreground/90 text-sm normal-case tracking-normal ${i < features.length - 1 ? "border-b border-gold" : ""}`, children: row.feature }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `p-5 sm:p-6 text-center border-l border-gold ${i < features.length - 1 ? "border-b" : ""}`, children: typeof row.others === "boolean" ? row.others ? /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-4 w-4 text-gold inline" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4 text-muted-foreground inline" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground normal-case tracking-normal", children: row.others }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `p-5 sm:p-6 text-center border-l border-gold ${i < features.length - 1 ? "border-b" : ""}`, children: typeof row.wandr === "boolean" ? row.wandr ? /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-4 w-4 text-gold inline", strokeWidth: 2.5 }) : /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4 text-muted-foreground inline" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-gold font-semibold normal-case tracking-normal", children: row.wandr }) })
          ] }, row.feature))
        ] })
      }
    )
  ] });
}
function GuaranteeSection() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "mx-auto max-w-5xl px-6 py-20", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "rounded-2xl p-10 sm:p-14 border border-gold flex flex-col sm:flex-row items-center gap-10 text-center sm:text-left",
      style: { background: "var(--surface)" },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "h-28 w-28 rounded-full grid place-items-center border-2",
            style: {
              background: "rgba(201,168,76,0.08)",
              borderColor: "var(--gold)"
            },
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(BadgeCheck, { className: "h-14 w-14 text-gold", strokeWidth: 1.5 })
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "eyebrow mb-4", children: "100% Guarantee" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-3xl sm:text-5xl font-medium mb-4", children: "Not satisfied? Every rupee returned." }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-foreground/75 text-base leading-relaxed", children: [
            "We're so confident you'll love your itinerary, we back it with a ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gold", children: "complete money-back guarantee" }),
            ". If it doesn't move you, we'll refund you. No questions asked."
          ] })
        ] })
      ]
    }
  ) });
}
const FAQS = [
  { q: "How quickly will I receive my itinerary?", a: "Instantly after payment. Your full day-by-day plan is unlocked the moment your Razorpay checkout completes." },
  { q: "What if I'm not satisfied with my itinerary?", a: "100% money-back guarantee — no questions asked. Email us within 7 days and we'll refund you in full." },
  { q: "Can I plan trips outside Rajasthan?", a: "Of course. We cover all of India — from Kerala backwaters to Ladakh, Goa to the North-East." },
  { q: "Which plan should I choose?", a: "Our Standard plan is the most popular — the perfect balance of features and value for week-long journeys." },
  { q: "Is my payment secure?", a: "Yes. All payments are processed by Razorpay with bank-grade encryption. We never see your card details." },
  { q: "Can I modify my itinerary?", a: "Standard plan includes 2 free revisions. Premium plan includes 5 revisions plus WhatsApp support." }
];
function FAQSection() {
  const [open, setOpen] = reactExports.useState(0);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mx-auto max-w-3xl px-6 py-24", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-14", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "eyebrow mb-5", children: "Frequently asked" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-4xl md:text-6xl font-medium", children: "Questions, answered." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: FAQS.map((f, i) => {
      const isOpen = open === i;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "rounded-xl border border-gold transition-all",
          style: { background: "var(--surface)" },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                onClick: () => setOpen(isOpen ? null : i),
                className: "w-full flex items-center justify-between gap-4 p-6 text-left",
                "aria-expanded": isOpen,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-lg sm:text-xl font-medium pr-4", children: f.q }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: `h-4 w-4 shrink-0 text-gold transition-transform duration-300 ${isOpen ? "rotate-180" : ""}` })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `grid transition-all duration-300 ease-out ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "px-6 pb-6 text-muted-foreground leading-relaxed text-[15px]", children: f.a }) }) })
          ]
        },
        f.q
      );
    }) })
  ] });
}
export {
  Check as C,
  FAQSection as F,
  GuaranteeSection as G,
  Lock as L,
  PricingButtonsRow as P,
  TrustBadges as T,
  UrgencyBanner as U,
  PricingPlans as a,
  TestimonialsGrid as b,
  ComparisonSection as c
};
