import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Search, Compass, Wallet, Sparkles, ArrowRight,
  Star, Shield, Globe2, Users, Award, CheckCircle2, Quote, MapPin,
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

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 text-balance">
            Discover the world's most beautiful places and plan trips that
            don't drain your wallet. Wandr is your friendly travel companion.
          </p>

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

      {/* Trust strip / Statistics */}
      <section className="border-y border-border/60 bg-card">
        <div className="mx-auto max-w-6xl px-5 py-10 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { icon: Globe2, value: "25+", label: "Curated destinations" },
            { icon: Users, value: "12,000+", label: "Trips planned" },
            { icon: Star, value: "4.9/5", label: "Traveler rating" },
            { icon: Shield, value: "100%", label: "Free to use" },
          ].map((s) => (
            <div key={s.label} className="flex items-center gap-3">
              <div className="h-11 w-11 rounded-2xl bg-secondary grid place-items-center shrink-0">
                <s.icon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <div className="font-display text-2xl font-semibold leading-none">{s.value}</div>
                <div className="text-xs text-muted-foreground mt-1">{s.label}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

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
      <section className="bg-warm/40 border-y border-border/60">
        <div className="mx-auto max-w-6xl px-5 py-20">
          <div className="text-center mb-12">
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-primary mb-3">Loved by travelers</span>
            <h2 className="font-display text-4xl md:text-5xl font-semibold mb-3">
              What our travelers say
            </h2>
            <div className="flex items-center justify-center gap-1 text-primary">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-current" />
              ))}
              <span className="ml-2 text-sm text-muted-foreground">4.9 average from 2,400+ reviews</span>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {[
              { name: "Priya Sharma", trip: "Rajasthan · 10 days", quote: "Wandr's cost estimator was spot on. We did Jaipur, Jodhpur and Jaisalmer well under budget and the AI itinerary saved hours of planning." },
              { name: "Marco Rivera", trip: "Bali · 2 weeks", quote: "Honest tips, no spammy affiliate clutter. The hidden gems in Ubud were exactly what I was hoping to find." },
              { name: "Aiko Tanaka", trip: "Lisbon · weekend", quote: "Loved the curated highlights — felt like advice from a well-traveled friend, not a generic listicle." },
            ].map((t) => (
              <figure key={t.name} className="p-7 rounded-3xl bg-card border border-border/60 shadow-soft flex flex-col">
                <Quote className="h-6 w-6 text-primary/40 mb-3" />
                <blockquote className="text-foreground/90 mb-5 flex-1">"{t.quote}"</blockquote>
                <div className="flex items-center gap-1 text-primary mb-2" aria-label="5 star rating">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <figcaption>
                  <div className="font-semibold">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.trip}</div>
                </figcaption>
              </figure>
            ))}
          </div>

          <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { icon: Shield, label: "Secure by design" },
              { icon: CheckCircle2, label: "No hidden fees" },
              { icon: Award, label: "Editor-curated" },
              { icon: Globe2, label: "Worldwide coverage" },
            ].map((b) => (
              <div key={b.label} className="flex items-center gap-2 px-4 py-3 rounded-2xl bg-card border border-border/60 text-sm font-medium">
                <b.icon className="h-4 w-4 text-primary shrink-0" />
                {b.label}
              </div>
            ))}
          </div>
        </div>
      </section>

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

      <PricingPlans />

      <SiteFooter />
    </div>
  );
}
