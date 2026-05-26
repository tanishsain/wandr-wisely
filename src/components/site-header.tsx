import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
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
    { to: "/about", label: "About" },
  ] as const;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[rgba(8,12,24,0.72)] backdrop-blur-xl border-b border-gold"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 py-5 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5 group">
          <span className="text-xl">🌅</span>
          <span className="font-display text-2xl font-medium tracking-tight text-gold">
            Wandr
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeOptions={{ exact: l.to === "/" }}
              className="px-4 py-2 text-[11px] font-medium tracking-[0.18em] uppercase text-foreground/70 hover:text-gold transition-colors"
              activeProps={{
                className:
                  "px-4 py-2 text-[11px] font-medium tracking-[0.18em] uppercase text-gold",
              }}
            >
              {l.label}
            </Link>
          ))}
          <Link
            to="/plan"
            className="ml-4 inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-gold-strong text-gold text-[11px] font-semibold tracking-[0.2em] uppercase bg-transparent hover:bg-gold hover:text-primary-foreground transition-all duration-300"
            style={{ borderColor: "var(--border-gold-strong)" }}
          >
            Plan Your Trip
          </Link>
        </nav>

        <button
          onClick={() => setOpen(!open)}
          className="lg:hidden h-10 w-10 grid place-items-center rounded-full text-gold hover:bg-white/5 transition-colors"
          aria-label="Menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <nav className="lg:hidden border-t border-gold bg-[rgba(8,12,24,0.95)] backdrop-blur-xl">
          <div className="mx-auto max-w-7xl px-6 py-4 flex flex-col">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                activeOptions={{ exact: l.to === "/" }}
                className="px-3 py-3 text-sm font-medium tracking-[0.18em] uppercase text-foreground/80 hover:text-gold border-b border-gold/30"
                activeProps={{
                  className:
                    "px-3 py-3 text-sm font-medium tracking-[0.18em] uppercase text-gold border-b border-gold/30",
                }}
              >
                {l.label}
              </Link>
            ))}
            <Link
              to="/plan"
              onClick={() => setOpen(false)}
              className="mt-4 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full border text-gold text-xs font-semibold tracking-[0.2em] uppercase hover:bg-gold hover:text-primary-foreground transition-all"
              style={{ borderColor: "var(--border-gold-strong)" }}
            >
              Plan Your Trip
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
