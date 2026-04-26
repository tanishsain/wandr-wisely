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
          </div>
        </nav>
      )}
    </header>
  );
}
