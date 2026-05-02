import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Search, Compass, Wallet, Sparkles, ArrowRight, MapPin,
} from "lucide-react";
import { useState } from "react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { DestinationCard } from "@/components/destination-card";
import { PricingButtonsRow, PricingPlans } from "@/components/pricing-plans";
import {
  HeroSocialProof,
  TrustBadges,
  TestimonialsGrid,
  UrgencyBanner,
  ComparisonSection,
  GuaranteeSection,
  FAQSection,
} from "@/components/conversion-sections";
import { destinations } from "@/data/destinations";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Wandr — Discover places, travel on a budget" },
      { name: "description", content: "Find famous places to visit and plan trips that fit your budget. Curated destinations across 6 continents with real cost breakdowns." },
      { property: "og:title", content: "Wandr — Discover places, travel on a budget" },
      { property: "og:description", content: "Find famous places to visit and plan trips that fit your budget." },
    ],
    links: [{ rel: "canonical", href: "https://wandr-wisely.lovable.app/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "Wandr",
          url: "https://wandr-wisely.lovable.app",
          description: "Discover famous places and plan trips on a budget.",
          potentialAction: {
            "@type": "SearchAction",
            target: "https://wandr-wisely.lovable.app/explore?q={search_term_string}",
            "query-input": "required name=search_term_string",
          },
        }),
      },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const [query, setQuery] = useState("");
  const navigate = Route.useNavigate();

  const featured = destinations.slice(0, 6);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate({ to: "/explore", search: { q: query.trim() } });
  };

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      {/* Hero */}
      <section className="relative overflow-hidden bg-warm">
        <div className="absolute inset-0 bg-glow opacity-70 pointer-events-none" />
        <div className="absolute -top-20 -right-20 h-80 w-80 rounded-full bg-sunset opacity-30 blur-3xl" />
        <div className="absolute -bottom-32 -left-20 h-96 w-96 rounded-full bg-sun/30 blur-3xl" />

        <div className="relative mx-auto max-w-6xl px-5 pt-16 pb-24 md:pt-24 md:pb-32 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-card border border-border/60 shadow-soft text-xs font-medium text-muted-foreground mb-8">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            25 hand-picked destinations · real budget tips
          </div>

          <h1 className="font-display text-5xl md:text-7xl font-semibold tracking-tight text-foreground text-balance mb-6">
            Travel further <br className="hidden md:block" />
            <span className="bg-sunset bg-clip-text text-transparent">on less.</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-6 text-balance">
            Discover the world's most beautiful places and plan trips that
            don't drain your wallet. Wandr is your friendly travel companion.
          </p>

          <HeroSocialProof />

          <form
            onSubmit={handleSubmit}
            className="max-w-xl mx-auto flex items-center gap-2 p-2 bg-card rounded-full border border-border shadow-warm"
          >
            <div className="flex-1 flex items-center gap-3 pl-4">
              <Search className="h-5 w-5 text-muted-foreground shrink-0" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search a city or country…"
                className="flex-1 bg-transparent py-3 outline-none text-base placeholder:text-muted-foreground"
              />
            </div>
            <button
              type="submit"
              className="px-5 md:px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors flex items-center gap-2"
            >
              Explore
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>

          <div className="flex flex-wrap items-center justify-center gap-2 mt-6 text-sm text-muted-foreground">
            <span>Trending:</span>
            {["Bali", "Tokyo", "Lisbon", "Istanbul", "Mexico City"].map((c) => (
              <Link
                key={c}
                to="/explore"
                search={{ q: c }}
                className="px-3 py-1 rounded-full bg-card border border-border/60 hover:border-primary hover:text-primary transition-colors"
              >
                {c}
              </Link>
            ))}
          </div>

          <div className="mt-10">
            <p className="text-center text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4">
              Unlock your full trip plan
            </p>
            <PricingButtonsRow />
          </div>
        </div>
      </section>

      {/* Trust badges strip */}
      <TrustBadges />

      {/* How it works */}
      <section className="mx-auto max-w-6xl px-5 py-20">
        <div className="text-center mb-14">
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-primary mb-3">How it works</span>
          <h2 className="font-display text-4xl md:text-5xl font-semibold mb-4">
            Three steps. Zero stress.
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Whether you're dreaming, planning, or counting coins, Wandr
            makes it simple.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              icon: Compass,
              tint: "bg-sun text-sun-foreground",
              title: "Discover places",
              desc: "Browse curated highlights for cities and countries — landmarks, food, hidden gems.",
              to: "/explore" as const,
              cta: "Explore destinations",
            },
            {
              icon: Sparkles,
              tint: "bg-primary text-primary-foreground",
              title: "AI trip planner",
              desc: "Generate a day-by-day itinerary tuned to your style, budget, and interests. Pro unlocks the full trip.",
              to: "/plan" as const,
              cta: "Try the AI planner",
            },
            {
              icon: Wallet,
              tint: "bg-leaf text-leaf-foreground",
              title: "Estimate cost",
              desc: "See realistic daily costs and tips to stretch every dollar further.",
              to: "/estimate" as const,
              cta: "Estimate my trip",
            },
          ].map((card) => (
            <Link
              key={card.title}
              to={card.to}
              className="group p-7 rounded-3xl bg-card border border-border/60 shadow-soft hover:shadow-warm hover:-translate-y-1 transition-all"
            >
              <div className={`h-12 w-12 rounded-2xl ${card.tint} grid place-items-center mb-5 shadow-soft`}>
                <card.icon className="h-6 w-6" />
              </div>
              <h3 className="font-display text-2xl font-semibold mb-2">
                {card.title}
              </h3>
              <p className="text-muted-foreground mb-5">{card.desc}</p>
              <div className="text-primary font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                {card.cta} <ArrowRight className="h-4 w-4" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured destinations */}
      <section className="bg-secondary/40">
        <div className="mx-auto max-w-6xl px-5 py-20">
          <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
            <div>
              <h2 className="font-display text-4xl md:text-5xl font-semibold mb-2">
                Wander somewhere new.
              </h2>
              <p className="text-muted-foreground">
                Hand-picked spots that prove great trips don't need deep pockets.
              </p>
            </div>
            <Link
              to="/explore"
              className="text-primary font-medium flex items-center gap-1 hover:gap-2 transition-all"
            >
              View all <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {featured.map((dest) => (
              <DestinationCard key={dest.slug} dest={dest} />
            ))}
          </div>
        </div>
      </section>

      {/* Popular Rajasthan destinations */}
      <section className="mx-auto max-w-6xl px-5 py-20">
        <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
          <div>
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-primary mb-3">India spotlight</span>
            <h2 className="font-display text-4xl md:text-5xl font-semibold mb-2">
              Popular Rajasthan destinations
            </h2>
            <p className="text-muted-foreground max-w-xl">
              Forts, palaces and dunes — the land of kings on a backpacker budget.
            </p>
          </div>
          <Link
            to="/explore"
            search={{ q: "rajasthan" }}
            className="text-primary font-medium flex items-center gap-1 hover:gap-2 transition-all"
          >
            Explore Rajasthan <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[
            { slug: "jaipur", name: "Jaipur", emoji: "🏰", tag: "Pink City", blurb: "Amber Fort, Hawa Mahal and bustling bazaars." },
            { slug: "jodhpur", name: "Jodhpur", emoji: "🔵", tag: "Blue City", blurb: "Mehrangarh Fort towering over indigo lanes." },
            { slug: "jaisalmer", name: "Jaisalmer", emoji: "🐪", tag: "Golden City", blurb: "Sandstone fort and Sam dune camel safaris." },
            { slug: "udaipur", name: "Udaipur", emoji: "🛶", tag: "City of Lakes", blurb: "Lake Pichola palaces and rooftop sunsets." },
            { slug: "bikaner", name: "Bikaner", emoji: "🕌", tag: "Camel Country", blurb: "Junagarh Fort, sweets, and desert culture." },
            { slug: "pushkar", name: "Pushkar", emoji: "🪔", tag: "Holy Town", blurb: "Sacred lake, ghats and the famous camel fair." },
          ].map((c) => (
            <Link
              key={c.slug}
              to="/explore"
              search={{ q: c.slug }}
              className="group p-6 rounded-3xl bg-card border border-border/60 shadow-soft hover:shadow-warm hover:-translate-y-1 transition-all"
            >
              <div className="flex items-start justify-between mb-3">
                <span className="text-4xl" aria-hidden>{c.emoji}</span>
                <span className="text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full bg-secondary text-secondary-foreground font-semibold">
                  {c.tag}
                </span>
              </div>
              <h3 className="font-display text-2xl font-semibold mb-1 flex items-center gap-2">
                {c.name}
                <MapPin className="h-4 w-4 text-muted-foreground" />
              </h3>
              <p className="text-sm text-muted-foreground">{c.blurb}</p>
              <div className="mt-4 text-primary text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                See guide <ArrowRight className="h-4 w-4" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <TestimonialsGrid />

      {/* Comparison */}
      <ComparisonSection />

      {/* CTA */}
      <section className="mx-auto max-w-4xl px-5 py-20">
        <div className="relative rounded-3xl bg-sunset p-10 md:p-16 text-center text-primary-foreground overflow-hidden shadow-warm">
          <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-sun/40 blur-2xl" />
          <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-sky/30 blur-2xl" />
          <h2 className="relative font-display text-3xl md:text-5xl font-semibold mb-4 text-balance">
            The world is closer than you think.
          </h2>
          <p className="relative text-primary-foreground/90 mb-8 max-w-xl mx-auto">
            Pick a destination, set your budget, and let Wandr do the heavy lifting.
          </p>
          <Link
            to="/plan"
            className="relative inline-flex items-center gap-2 px-7 py-4 rounded-full bg-card text-primary font-semibold shadow-warm hover:shadow-glow hover:scale-105 transition-all"
          >
            Plan my next trip <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* Urgency + Pricing */}
      <UrgencyBanner />
      <PricingPlans />

      {/* Money back guarantee */}
      <GuaranteeSection />

      {/* FAQ */}
      <FAQSection />

      <SiteFooter />
    </div>
  );
}
