import { r as reactExports, T as jsxRuntimeExports } from "./worker-entry-CVMFMino.js";
import { L as Link } from "./router-C-aH7qSq.js";
const mergeClasses = (...classes) => classes.filter((className, index, array) => {
  return Boolean(className) && className.trim() !== "" && array.indexOf(className) === index;
}).join(" ").trim();
const toKebabCase = (string) => string.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
const toCamelCase = (string) => string.replace(
  /^([A-Z])|[\s-_]+(\w)/g,
  (match, p1, p2) => p2 ? p2.toUpperCase() : p1.toLowerCase()
);
const toPascalCase = (string) => {
  const camelCase = toCamelCase(string);
  return camelCase.charAt(0).toUpperCase() + camelCase.slice(1);
};
var defaultAttributes = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round"
};
const hasA11yProp = (props) => {
  for (const prop in props) {
    if (prop.startsWith("aria-") || prop === "role" || prop === "title") {
      return true;
    }
  }
  return false;
};
const Icon = reactExports.forwardRef(
  ({
    color = "currentColor",
    size = 24,
    strokeWidth = 2,
    absoluteStrokeWidth,
    className = "",
    children,
    iconNode,
    ...rest
  }, ref) => reactExports.createElement(
    "svg",
    {
      ref,
      ...defaultAttributes,
      width: size,
      height: size,
      stroke: color,
      strokeWidth: absoluteStrokeWidth ? Number(strokeWidth) * 24 / Number(size) : strokeWidth,
      className: mergeClasses("lucide", className),
      ...!children && !hasA11yProp(rest) && { "aria-hidden": "true" },
      ...rest
    },
    [
      ...iconNode.map(([tag, attrs]) => reactExports.createElement(tag, attrs)),
      ...Array.isArray(children) ? children : [children]
    ]
  )
);
const createLucideIcon = (iconName, iconNode) => {
  const Component = reactExports.forwardRef(
    ({ className, ...props }, ref) => reactExports.createElement(Icon, {
      ref,
      iconNode,
      className: mergeClasses(
        `lucide-${toKebabCase(toPascalCase(iconName))}`,
        `lucide-${iconName}`,
        className
      ),
      ...props
    })
  );
  Component.displayName = toPascalCase(iconName);
  return Component;
};
const __iconNode$1 = [
  ["path", { d: "M4 5h16", key: "1tepv9" }],
  ["path", { d: "M4 12h16", key: "1lakjw" }],
  ["path", { d: "M4 19h16", key: "1djgab" }]
];
const Menu = createLucideIcon("menu", __iconNode$1);
const __iconNode = [
  ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
  ["path", { d: "m6 6 12 12", key: "d8bk6v" }]
];
const X = createLucideIcon("x", __iconNode);
function SiteHeader() {
  const [open, setOpen] = reactExports.useState(false);
  const [scrolled, setScrolled] = reactExports.useState(false);
  reactExports.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const links = [
    { to: "/", label: "Home" },
    { to: "/explore", label: "Explore" },
    { to: "/attractions", label: "Attractions" },
    { to: "/plan", label: "Plan" },
    { to: "/estimate", label: "Estimator" },
    { to: "/blog", label: "Journal" },
    { to: "/about", label: "About" }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "header",
    {
      className: `sticky top-0 z-50 transition-all duration-500 ${scrolled ? "bg-[rgba(8,12,24,0.72)] backdrop-blur-xl border-b border-gold" : "bg-transparent border-b border-transparent"}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl px-6 py-5 flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "flex items-center gap-2.5 group", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl", children: "🌅" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-2xl font-medium tracking-tight text-gold", children: "Wandr" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { className: "hidden lg:flex items-center gap-1", children: [
            links.map((l) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              Link,
              {
                to: l.to,
                activeOptions: { exact: l.to === "/" },
                className: "px-4 py-2 text-[11px] font-medium tracking-[0.18em] uppercase text-foreground/70 hover:text-gold transition-colors",
                activeProps: {
                  className: "px-4 py-2 text-[11px] font-medium tracking-[0.18em] uppercase text-gold"
                },
                children: l.label
              },
              l.to
            )),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Link,
              {
                to: "/plan",
                className: "ml-4 inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-gold-strong text-gold text-[11px] font-semibold tracking-[0.2em] uppercase bg-transparent hover:bg-gold hover:text-primary-foreground transition-all duration-300",
                style: { borderColor: "var(--border-gold-strong)" },
                children: "Plan Your Trip"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              onClick: () => setOpen(!open),
              className: "lg:hidden h-10 w-10 grid place-items-center rounded-full text-gold hover:bg-white/5 transition-colors",
              "aria-label": "Menu",
              children: open ? /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-5 w-5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Menu, { className: "h-5 w-5" })
            }
          )
        ] }),
        open && /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "lg:hidden border-t border-gold bg-[rgba(8,12,24,0.95)] backdrop-blur-xl", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl px-6 py-4 flex flex-col", children: [
          links.map((l) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            Link,
            {
              to: l.to,
              onClick: () => setOpen(false),
              activeOptions: { exact: l.to === "/" },
              className: "px-3 py-3 text-sm font-medium tracking-[0.18em] uppercase text-foreground/80 hover:text-gold border-b border-gold/30",
              activeProps: {
                className: "px-3 py-3 text-sm font-medium tracking-[0.18em] uppercase text-gold border-b border-gold/30"
              },
              children: l.label
            },
            l.to
          )),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Link,
            {
              to: "/plan",
              onClick: () => setOpen(false),
              className: "mt-4 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full border text-gold text-xs font-semibold tracking-[0.2em] uppercase hover:bg-gold hover:text-primary-foreground transition-all",
              style: { borderColor: "var(--border-gold-strong)" },
              children: "Plan Your Trip"
            }
          )
        ] }) })
      ]
    }
  );
}
function SiteFooter() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "footer",
    {
      className: "mt-24 border-t border-gold",
      style: { background: "var(--ink-deep)" },
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-6xl px-6 py-16 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "inline-flex items-center gap-3 group", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl", children: "🌅" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-4xl font-medium tracking-tight text-gold-gradient", children: "Wandr" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-sm tracking-[0.22em] uppercase text-gold/80", children: "Travel further · spend less" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "mx-auto my-10 h-px w-24",
            style: { background: "linear-gradient(90deg, transparent, var(--gold), transparent)" }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { className: "flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-[11px] tracking-[0.22em] uppercase text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/explore", className: "hover:text-gold transition-colors", children: "Explore" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/attractions", className: "hover:text-gold transition-colors", children: "Attractions" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/plan", className: "hover:text-gold transition-colors", children: "Plan a Trip" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/estimate", className: "hover:text-gold transition-colors", children: "Estimator" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/blog", className: "hover:text-gold transition-colors", children: "Journal" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/about", className: "hover:text-gold transition-colors", children: "About" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "mx-auto my-10 h-px w-24",
            style: { background: "linear-gradient(90deg, transparent, var(--gold), transparent)" }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display italic text-base text-champagne", children: "Made with warmth" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-2 text-xs text-muted-foreground", children: [
          "© ",
          (/* @__PURE__ */ new Date()).getFullYear(),
          " Wandr · All journeys begin somewhere"
        ] })
      ] })
    }
  );
}
export {
  SiteHeader as S,
  X,
  SiteFooter as a,
  createLucideIcon as c
};
