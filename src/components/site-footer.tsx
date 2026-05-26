import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  return (
    <footer
      className="mt-24 border-t border-gold"
      style={{ background: "var(--ink-deep)" }}
    >
      <div className="mx-auto max-w-6xl px-6 py-16 text-center">
        <Link to="/" className="inline-flex items-center gap-3 group">
          <span className="text-2xl">🌅</span>
          <span className="font-display text-4xl font-medium tracking-tight text-gold-gradient">
            Wandr
          </span>
        </Link>

        <p className="mt-4 text-sm tracking-[0.22em] uppercase text-gold/80">
          Travel further · spend less
        </p>

        <div
          className="mx-auto my-10 h-px w-24"
          style={{ background: "linear-gradient(90deg, transparent, var(--gold), transparent)" }}
        />

        <nav className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-[11px] tracking-[0.22em] uppercase text-muted-foreground">
          <Link to="/explore" className="hover:text-gold transition-colors">Explore</Link>
          <Link to="/attractions" className="hover:text-gold transition-colors">Attractions</Link>
          <Link to="/plan" className="hover:text-gold transition-colors">Plan a Trip</Link>
          <Link to="/estimate" className="hover:text-gold transition-colors">Estimator</Link>
          <Link to="/blog" className="hover:text-gold transition-colors">Journal</Link>
          <Link to="/about" className="hover:text-gold transition-colors">About</Link>
        </nav>

        <div
          className="mx-auto my-10 h-px w-24"
          style={{ background: "linear-gradient(90deg, transparent, var(--gold), transparent)" }}
        />

        <p className="font-display italic text-base text-champagne">
          Made with warmth
        </p>
        <p className="mt-2 text-xs text-muted-foreground">
          © {new Date().getFullYear()} Wandr · All journeys begin somewhere
        </p>
      </div>
    </footer>
  );
}
