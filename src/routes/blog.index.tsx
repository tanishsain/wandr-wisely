import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { blogPosts } from "@/data/blog";

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title: "Travel Blog — Wandr Wisely" },
      {
        name: "description",
        content:
          "Honest travel guides, budget tips and itineraries from Wandr Wisely. Plan smarter, travel further.",
      },
      { property: "og:title", content: "Travel Blog — Wandr Wisely" },
      {
        property: "og:description",
        content: "Honest travel guides, budget tips and itineraries.",
      },
      { property: "og:url", content: "https://wandr-wisely.lovable.app/blog" },
    ],
    links: [{ rel: "canonical", href: "https://wandr-wisely.lovable.app/blog" }],
  }),
  component: BlogIndex,
});

function BlogIndex() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <section className="mx-auto max-w-5xl px-5 pt-14 pb-10">
        <span className="text-xs font-semibold uppercase tracking-widest text-primary">
          Wandr Journal
        </span>
        <h1 className="font-display text-4xl md:text-6xl font-semibold mt-3 mb-4">
          Travel guides & budget tips
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          Real itineraries, real costs. Bite-sized guides to help you plan
          unforgettable trips without overspending.
        </p>
      </section>

      <section className="mx-auto max-w-5xl px-5 pb-20 grid gap-6 md:grid-cols-2">
        {blogPosts.map((p) => (
          <Link
            key={p.slug}
            to="/blog/$slug"
            params={{ slug: p.slug }}
            className="group rounded-3xl overflow-hidden bg-card border border-border/60 shadow-soft hover:shadow-warm hover:-translate-y-1 transition-all"
          >
            <div className="aspect-[16/10] overflow-hidden">
              <img
                src={p.cover}
                alt={p.title}
                loading="lazy"
                className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-6">
              <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                <span className="flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5" /> {p.date}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" /> {p.readMins} min read
                </span>
              </div>
              <h2 className="font-display text-2xl font-semibold mb-2 group-hover:text-primary transition-colors">
                {p.title}
              </h2>
              <p className="text-muted-foreground text-sm mb-4">{p.excerpt}</p>
              <span className="text-primary font-medium inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                Read article <ArrowRight className="h-4 w-4" />
              </span>
            </div>
          </Link>
        ))}
      </section>

      <SiteFooter />
    </div>
  );
}
