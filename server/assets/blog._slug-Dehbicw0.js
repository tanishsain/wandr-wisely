import { T as jsxRuntimeExports } from "./worker-entry-CVMFMino.js";
import { c as Route, L as Link } from "./router-C-aH7qSq.js";
import { c as createLucideIcon, S as SiteHeader, a as SiteFooter } from "./site-footer-Cu9GkHUY.js";
import { C as Calendar } from "./calendar-fMy52lZq.js";
import { C as Clock, A as ArrowRight } from "./clock-DVsMz_YE.js";
import { S as Sparkles } from "./sparkles-CVG9Vr0A.js";
import { Z as Zap, C as Crown } from "./zap-C-9OYVtN.js";
import { M as MapPin } from "./map-pin-CZEMfQ_2.js";
import "node:events";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
import "./types-CHm7Zrw6.js";
const __iconNode$3 = [
  ["path", { d: "m12 19-7-7 7-7", key: "1l729n" }],
  ["path", { d: "M19 12H5", key: "x3x0zl" }]
];
const ArrowLeft = createLucideIcon("arrow-left", __iconNode$3);
const __iconNode$2 = [
  ["rect", { width: "20", height: "20", x: "2", y: "2", rx: "5", ry: "5", key: "2e1cvw" }],
  ["path", { d: "M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z", key: "9exkf1" }],
  ["line", { x1: "17.5", x2: "17.51", y1: "6.5", y2: "6.5", key: "r4j83e" }]
];
const Instagram = createLucideIcon("instagram", __iconNode$2);
const __iconNode$1 = [
  [
    "path",
    {
      d: "M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719",
      key: "1sd12s"
    }
  ]
];
const MessageCircle = createLucideIcon("message-circle", __iconNode$1);
const __iconNode = [
  ["circle", { cx: "18", cy: "5", r: "3", key: "gq8acd" }],
  ["circle", { cx: "6", cy: "12", r: "3", key: "w7nqdw" }],
  ["circle", { cx: "18", cy: "19", r: "3", key: "1xt0gg" }],
  ["line", { x1: "8.59", x2: "15.42", y1: "13.51", y2: "17.49", key: "47mynk" }],
  ["line", { x1: "15.41", x2: "8.59", y1: "6.51", y2: "10.49", key: "1n3mei" }]
];
const Share2 = createLucideIcon("share-2", __iconNode);
const places = [{
  name: "Jaipur — The Pink City",
  slug: "jaipur",
  emoji: "🏰",
  mustVisit: "Amber Fort, Hawa Mahal, City Palace, Jantar Mantar",
  bestTime: "October to March",
  budget: "Rs.2,000 – Rs.5,000 per day"
}, {
  name: "Jodhpur — The Blue City",
  slug: "jodhpur",
  emoji: "🔵",
  mustVisit: "Mehrangarh Fort, Jaswant Thada, Umaid Bhawan Palace",
  bestTime: "October to February",
  budget: "Rs.1,500 – Rs.4,000 per day"
}, {
  name: "Jaisalmer — The Golden City",
  slug: "jaisalmer",
  emoji: "🐪",
  mustVisit: "Jaisalmer Fort, Sam Sand Dunes, Desert Safari",
  bestTime: "November to February",
  budget: "Rs.2,000 – Rs.6,000 per day"
}, {
  name: "Udaipur — The City of Lakes",
  slug: "udaipur",
  emoji: "🛶",
  mustVisit: "Lake Pichola, City Palace, Jag Mandir",
  bestTime: "September to March",
  budget: "Rs.2,500 – Rs.7,000 per day"
}, {
  name: "Pushkar — The Holy City",
  slug: "pushkar",
  emoji: "🪔",
  mustVisit: "Brahma Temple, Pushkar Lake, Savitri Temple",
  bestTime: "October to March",
  budget: "Rs.1,000 – Rs.3,000 per day"
}, {
  name: "Bikaner — The Camel City",
  slug: "bikaner",
  emoji: "🕌",
  mustVisit: "Junagarh Fort, Karni Mata Temple, Lalgarh Palace",
  bestTime: "October to February",
  budget: "Rs.1,000 – Rs.3,000 per day"
}, {
  name: "Ranthambore — Wildlife Paradise",
  slug: "ranthambore",
  emoji: "🐯",
  mustVisit: "National Park, Tiger Safari, Ranthambore Fort",
  bestTime: "October to June",
  budget: "Rs.3,000 – Rs.8,000 per day"
}, {
  name: "Mount Abu — Hill Station",
  slug: "mount-abu",
  emoji: "⛰️",
  mustVisit: "Dilwara Jain Temples, Nakki Lake, Guru Shikhar",
  bestTime: "October to June",
  budget: "Rs.1,500 – Rs.4,000 per day"
}, {
  name: "Chittorgarh — City of Valor",
  slug: "chittorgarh",
  emoji: "⚔️",
  mustVisit: "Chittorgarh Fort, Vijay Stambha, Meera Temple",
  bestTime: "October to March",
  budget: "Rs.1,000 – Rs.3,000 per day"
}, {
  name: "Sri Ganganagar — Hidden Gem",
  slug: "sri-ganganagar",
  emoji: "🌾",
  mustVisit: "Hari Singh Park, Gandhi Park, Local Fruit Markets",
  bestTime: "October to March",
  budget: "Rs.800 – Rs.2,000 per day"
}];
const plans = [{
  name: "Basic",
  price: "Rs.199",
  href: "https://rzp.io/rzp/wandrwisely-basic",
  icon: Sparkles,
  cls: "bg-card border-border text-foreground"
}, {
  name: "Standard",
  price: "Rs.499",
  href: "https://rzp.io/rzp/wandrwisely-standard",
  icon: Zap,
  cls: "bg-[#FF6A00] border-[#FF6A00] text-white"
}, {
  name: "Premium",
  price: "Rs.999",
  href: "https://rzp.io/rzp/otXOpEWz",
  icon: Crown,
  cls: "bg-foreground border-foreground text-background"
}];
function BlogPostPage() {
  const {
    post
  } = Route.useLoaderData();
  const shareUrl = `https://wandr-wisely.lovable.app/blog/${post.slug}`;
  const shareText = `${post.title} — ${post.description}`;
  const whatsappHref = `https://wa.me/?text=${encodeURIComponent(`${shareText} ${shareUrl}`)}`;
  const instagramHref = "https://www.instagram.com/";
  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
    } catch {
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SiteHeader, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "mx-auto max-w-3xl px-5 pt-8 md:pt-12 pb-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/blog", className: "inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-primary mb-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4" }),
          " Back to blog"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted-foreground mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-3.5 w-3.5" }),
            " ",
            post.date
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-3.5 w-3.5" }),
            " ",
            post.readMins,
            " min read"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-balance mb-4", children: post.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-base sm:text-lg text-muted-foreground", children: post.description }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2 mt-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-muted-foreground mr-1", children: "Share:" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: whatsappHref, target: "_blank", rel: "noopener noreferrer", className: "inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-[#25D366] text-white text-sm font-medium hover:-translate-y-0.5 transition-all shadow-soft", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "h-4 w-4" }),
            " WhatsApp"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: instagramHref, target: "_blank", rel: "noopener noreferrer", className: "inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-white text-sm font-medium hover:-translate-y-0.5 transition-all shadow-soft", style: {
            background: "linear-gradient(45deg,#F58529,#DD2A7B,#8134AF,#515BD4)"
          }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Instagram, { className: "h-4 w-4" }),
            " Instagram"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: copyLink, className: "inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-secondary text-secondary-foreground text-sm font-medium hover:bg-secondary/80 transition-colors", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Share2, { className: "h-4 w-4" }),
            " Copy link"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto max-w-4xl px-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: post.cover, alt: "Hawa Mahal palace facade in Jaipur, Rajasthan", className: "w-full aspect-[16/9] object-cover rounded-2xl md:rounded-3xl shadow-warm" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-3xl px-5 py-10 md:py-14", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-base md:text-lg leading-relaxed text-foreground/90", children: [
          "Rajasthan, the ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "land of kings" }),
          ", is India's most visually arresting state — a sun-baked tapestry of mighty forts, mirrored palaces, painted havelis and rolling sand dunes. Here are the ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "top 10 places to visit in Rajasthan" }),
          ", with the must-see sights, the best season and what each destination will cost you per day."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-10 space-y-6", children: places.map((p, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "p-5 md:p-7 rounded-2xl bg-card border border-border/60 shadow-soft", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display text-2xl md:text-3xl font-semibold flex flex-wrap items-center gap-2 md:gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-primary font-bold", children: [
              i + 1,
              "."
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { "aria-hidden": true, children: p.emoji }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: p.name })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("dl", { className: "mt-4 space-y-2 text-sm md:text-base", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row sm:gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "font-semibold min-w-[110px] text-foreground", children: "Must visit:" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { className: "text-foreground/80", children: p.mustVisit })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row sm:gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "font-semibold min-w-[110px] text-foreground", children: "Best time:" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { className: "text-foreground/80", children: p.bestTime })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row sm:gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "font-semibold min-w-[110px] text-foreground", children: "Budget:" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { className: "text-foreground/80", children: p.budget })
            ] })
          ] })
        ] }, p.slug)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-12 p-6 md:p-10 rounded-3xl bg-sunset text-primary-foreground shadow-warm text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl md:text-4xl font-semibold mb-3", children: "Plan your Rajasthan trip with Wandr Wisely!" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-primary-foreground/90 mb-6 max-w-xl mx-auto text-sm md:text-base", children: "Get a custom day-by-day itinerary, budget breakdown and hotel picks — delivered instantly. Choose your plan:" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid sm:grid-cols-3 gap-3 max-w-2xl mx-auto", children: plans.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: p.href, target: "_blank", rel: "noopener noreferrer", className: `group flex flex-col items-center justify-center gap-1 px-4 py-5 rounded-2xl border-2 font-semibold shadow-soft hover:-translate-y-1 hover:shadow-warm transition-all ${p.cls}`, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(p.icon, { className: "h-6 w-6 mb-1" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm uppercase tracking-wider opacity-80", children: [
              p.name,
              " Plan"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl font-bold", children: p.price })
          ] }, p.name)) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/plan", className: "mt-8 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-card text-primary font-semibold hover:scale-105 transition-transform", children: [
            "Try the free planner ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-10 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/blog", className: "inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-primary", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4" }),
          " Back to all articles"
        ] }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-secondary/40", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-6xl px-5 py-14 md:py-16", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl md:text-4xl font-semibold mb-2", children: "Related destinations" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-8", children: "Explore in-depth guides for the cities featured in this article." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid sm:grid-cols-2 lg:grid-cols-3 gap-5", children: places.slice(0, 6).map((c) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/explore", search: {
        q: c.slug
      }, className: "group p-6 rounded-3xl bg-card border border-border/60 shadow-soft hover:shadow-warm hover:-translate-y-1 transition-all", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between mb-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-4xl", "aria-hidden": true, children: c.emoji }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-4 w-4 text-muted-foreground" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-xl font-semibold mb-1", children: c.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
          "Best time: ",
          c.bestTime
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 text-primary text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all", children: [
          "See guide ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4" })
        ] })
      ] }, c.slug)) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(SiteFooter, {})
  ] });
}
export {
  BlogPostPage as component
};
