import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  const links = [
    { to: "/", label: "Home" },
    { to: "/explore", label: "Explore" },
    { to: "/attractions", label: "Attractions" },
    { to: "/plan", label: "Plan a Trip" },
    { to: "/estimate", label: "Cost Estimator" },
    { to: "/about", label: "About" },
  ] as const;

  return (
    <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-md border-b border-border/60">
      <div className="mx-auto max-w-6xl px-5 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="h-9 w-9 rounded-full bg-sunset shadow-soft grid place-items-center text-lg">
            🌅
          </div>
          <span className="font-display text-2xl font-semibold tracking-tight">
            Wandr
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeOptions={{ exact: l.to === "/" }}
              className="px-3 py-2 rounded-full text-sm font-medium text-foreground/70 hover:text-foreground hover:bg-secondary transition-colors"
              activeProps={{ className: "px-3 py-2 rounded-full text-sm font-semibold text-primary bg-secondary" }}
            >
              {l.label}
            </Link>
          ))}
          <Link
            to="/plan"
            className="ml-2 inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#FF6A00] text-white text-sm font-semibold shadow-[0_6px_18px_-6px_rgba(255,106,0,0.6)] hover:bg-[#FF8124] hover:-translate-y-0.5 hover:shadow-[0_10px_24px_-8px_rgba(255,106,0,0.75)] transition-all duration-300"
          >
            Plan Your Trip →
          </Link>
        </nav>

        <button
          onClick={() => setOpen(!open)}
          className="md:hidden h-10 w-10 grid place-items-center rounded-full hover:bg-secondary"
          aria-label="Menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <nav className="md:hidden border-t border-border/60 bg-background">
          <div className="mx-auto max-w-6xl px-5 py-3 flex flex-col">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                activeOptions={{ exact: l.to === "/" }}
                className="px-3 py-3 rounded-lg text-base font-medium text-foreground/80 hover:bg-secondary"
                activeProps={{ className: "px-3 py-3 rounded-lg text-base font-semibold text-primary bg-secondary" }}
              >
                {l.label}
              </Link>
            ))}
            <Link
              to="/plan"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex items-center justify-center gap-1.5 px-4 py-3 rounded-full bg-[#FF6A00] text-white text-base font-semibold shadow-[0_6px_18px_-6px_rgba(255,106,0,0.6)] hover:bg-[#FF8124] transition-all"
            >
              Plan Your Trip →
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
