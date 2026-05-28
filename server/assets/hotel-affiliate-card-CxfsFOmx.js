import { c as createLucideIcon } from "./site-footer-Cu9GkHUY.js";
import { T as jsxRuntimeExports } from "./worker-entry-CVMFMino.js";
import { f as formatInr } from "./currency--B8lzbTJ.js";
import { b as bookingHotelsLink, a as airbnbLink, s as skyscannerLink, T as Ticket, g as getYourGuideLink, E as ExternalLink } from "./affiliate-2eYY1u5Q.js";
const __iconNode$3 = [
  ["path", { d: "M2 20v-8a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v8", key: "1k78r4" }],
  ["path", { d: "M4 10V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v4", key: "fb3tl2" }],
  ["path", { d: "M12 4v6", key: "1dcgq2" }],
  ["path", { d: "M2 18h20", key: "ajqnye" }]
];
const BedDouble = createLucideIcon("bed-double", __iconNode$3);
const __iconNode$2 = [
  [
    "path",
    {
      d: "M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5",
      key: "1gvzjb"
    }
  ],
  ["path", { d: "M9 18h6", key: "x1upvd" }],
  ["path", { d: "M10 22h4", key: "ceow96" }]
];
const Lightbulb = createLucideIcon("lightbulb", __iconNode$2);
const __iconNode$1 = [["path", { d: "M21 12a9 9 0 1 1-6.219-8.56", key: "13zald" }]];
const LoaderCircle = createLucideIcon("loader-circle", __iconNode$1);
const __iconNode = [
  [
    "path",
    {
      d: "M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z",
      key: "1v9wt8"
    }
  ]
];
const Plane = createLucideIcon("plane", __iconNode);
function HotelAffiliateCard({ city, fromUSD, variant = "card" }) {
  if (variant === "inline") {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(AffiliateButton, { href: bookingHotelsLink(city), label: "Booking.com", icon: BedDouble }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(AffiliateButton, { href: airbnbLink(city), label: "Airbnb", icon: BedDouble }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(AffiliateButton, { href: skyscannerLink("anywhere", city), label: "Flights", icon: Plane })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-3xl bg-card border border-border/60 p-6 shadow-soft", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3 mb-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-primary mb-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(BedDouble, { className: "h-3.5 w-3.5" }),
          " Stay in ",
          city
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-display text-2xl font-semibold", children: "Find a place" })
      ] }),
      typeof fromUSD === "number" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: "From" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-display text-2xl font-semibold text-primary", children: [
          formatInr(fromUSD),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-sans text-muted-foreground font-normal", children: " /night" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid sm:grid-cols-2 gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        AffiliateButton,
        {
          href: bookingHotelsLink(city),
          label: "Hotels on Booking.com",
          icon: BedDouble,
          primary: true
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(AffiliateButton, { href: airbnbLink(city), label: "Airbnb stays", icon: BedDouble }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        AffiliateButton,
        {
          href: skyscannerLink("anywhere", city),
          label: "Flights via Skyscanner",
          icon: Plane
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        AffiliateButton,
        {
          href: getYourGuideLink(city),
          label: "Tours & tickets",
          icon: Ticket
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-3", children: "We may earn a small commission at no extra cost to you." })
  ] });
}
function AffiliateButton({
  href,
  label,
  icon: Icon,
  primary
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "a",
    {
      href,
      target: "_blank",
      rel: "sponsored noopener noreferrer",
      className: `flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${primary ? "bg-primary text-primary-foreground hover:bg-primary/90" : "bg-secondary text-foreground/80 hover:bg-secondary/80"}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-4 w-4" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex-1", children: label }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "h-3.5 w-3.5 opacity-60" })
      ]
    }
  );
}
export {
  HotelAffiliateCard as H,
  LoaderCircle as L,
  Lightbulb as a
};
