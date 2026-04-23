import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border/60 bg-secondary/40">
      <div className="mx-auto max-w-6xl px-5 py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-sunset grid place-items-center text-sm">
            🌅
          </div>
          <span className="font-display text-xl font-semibold">Wandr</span>
        </div>
        <p className="text-sm text-muted-foreground max-w-md">
          Travel further on less. Curated destinations and budget tips for the
          curious traveler.
        </p>
        <div className="flex gap-5 text-sm text-muted-foreground">
          <Link to="/explore" className="hover:text-primary">Explore</Link>
          <Link to="/plan" className="hover:text-primary">Plan</Link>
          <Link to="/estimate" className="hover:text-primary">Estimate</Link>
          <Link to="/about" className="hover:text-primary">About</Link>
        </div>
      </div>
      <div className="text-center text-xs text-muted-foreground pb-6">
        © {new Date().getFullYear()} Wandr · Made with warmth
      </div>
    </footer>
  );
}
