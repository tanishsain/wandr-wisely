import { createFileRoute, Link } from "@tanstack/react-router";
import { Compass, Wallet, Sparkles, ArrowRight } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { DestinationCard } from "@/components/destination-card";
import { PricingPlans } from "@/components/pricing-plans";
import { HeroGlobe, GoldParticles } from "@/components/hero-globe";
import {
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
      { title: "Wandr — Travel Further. Spend Less." },
      { name: "description", content: "Curated journeys, intelligent itineraries, and budgets that breathe. Wandr is your luxury-minded travel companion for the modern explorer." },
      { property: "og:title", content: "Wandr — Travel Further. Spend Less." },
      { property: "og:description", content: "Curated journeys and intelligent itineraries for the modern explorer." },
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
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Wandr Wisely",
          url: "https://wandr-wisely.lovable.app",
          logo: "https://wandr-wisely.lovable.app/favicon.ico",
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
            { "@type": "Question", name: "How quickly will I get my itinerary?", acceptedAnswer: { "@type": "Answer", text: "Instantly after payment! Your full day-by-day plan is unlocked the moment your Razorpay checkout completes." } },
            { "@type": "Question", name: "What if I don't like my itinerary?", acceptedAnswer: { "@type": "Answer", text: "100% money back guarantee — no questions asked. Just email us within 7 days and we'll refund you in full." } },
            { "@type": "Question", name: "Can I plan trips outside Rajasthan?", acceptedAnswer: { "@type": "Answer", text: "Yes! We cover all of India — from Kerala backwaters to Ladakh, Goa to the North-East." } },
            { "@type": "Question", name: "Which plan should I choose?", acceptedAnswer: { "@type": "Answer", text: "Standard Plan is our most popular choice — perfect balance of features and price for week-long trips." } },
            { "@type": "Question", name: "Is my payment secure?", acceptedAnswer: { "@type": "Answer", text: "Yes! All payments are securely processed by Razorpay with bank-grade encryption. We never see your card details." } },
            { "@type": "Question", name: "Can I modify my itinerary?", acceptedAnswer: { "@type": "Answer", text: "Standard plan includes 2 free revisions. Premium plan includes 5 revisions plus WhatsApp support." } },
          ],
        }),
      },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const featured = destinations.slice(0, 6);

  return (
    <div className="min-h-screen" style={{ background: "var(--ink)" }}>
      {/* Loading screen overlay — fades out on mount */}
      <div
        className="fixed inset-0 z-[100] grid place-items-center pointer-events-none loader-fade"
        style={{ background: "var(--ink)" }}
      >
        <span className="font-display text-6xl font-medium text-gold-gradient">
          Wandr
        </span>
      </div>

      <SiteHeader />

      {/* ━━━ HERO ━━━ */}
      <section
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{ background: "var(--ink)" }}
      >
        <HeroGlobe />
        <GoldParticles />

        {/* Vignette */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 0%, rgba(8,12,24,0.6) 70%, var(--ink) 100%)",
          }}
        />

        <div className="relative z-10 max-w-5xl mx-auto px-6 pt-32 pb-24 text-center lux-fade-up">
          <div className="eyebrow mb-8 inline-block">
            <span className="inline-block w-10 h-px bg-gold align-middle mr-4" />
            Curated since 2024
            <span className="inline-block w-10 h-px bg-gold align-middle ml-4" />
          </div>

          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-medium leading-[1.05] tracking-tight text-balance mb-8 text-foreground">
            Travel Further.
            <br />
            <span className="italic text-gold-gradient">Spend Less.</span>
          </h1>

          <p className="text-base sm:text-lg text-muted-foreground max-w-xl mx-auto mb-12 leading-relaxed font-light">
            Intelligent itineraries crafted for the modern explorer.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/explore"
              className="group inline-flex items-center gap-3 px-8 py-4 rounded-full text-xs font-semibold tracking-[0.22em] uppercase transition-all duration-300 hover:shadow-glow hover:-translate-y-0.5"
              style={{ background: "var(--gradient-gold)", color: "var(--ink)" }}
            >
              Explore Destinations
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              to="/plan"
              className="group inline-flex items-center gap-3 px-8 py-4 rounded-full text-xs font-semibold tracking-[0.22em] uppercase border text-gold bg-transparent hover:bg-gold hover:text-primary-foreground transition-all duration-300"
              style={{ borderColor: "var(--border-gold-strong)" }}
            >
              Plan a Trip
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        {/* Scroll indicator — pulsing gold line */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-10">
          <span className="text-[10px] tracking-[0.3em] uppercase text-gold/70">Scroll</span>
          <div className="relative h-12 w-px bg-gold/15">
            <div
              className="absolute top-0 left-0 w-px h-full bg-gold scroll-line"
              style={{ boxShadow: "0 0 8px rgba(201,168,76,0.8)" }}
            />
          </div>
        </div>
      </section>

      <TrustBadges />

      {/* ━━━ CURATED DESTINATIONS ━━━ */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="flex items-end justify-between mb-14 flex-wrap gap-6">
          <div>
            <div className="eyebrow eyebrow-line mb-5">Curated Destinations</div>
            <h2 className="font-display text-4xl md:text-6xl font-medium tracking-tight max-w-xl leading-[1.05]">
              Places worth the journey.
            </h2>
          </div>
          <Link
            to="/explore"
            className="group inline-flex items-center gap-2 text-xs font-semibold tracking-[0.22em] uppercase text-gold hover:gap-3 transition-all"
          >
            View all <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((dest) => (
            <DestinationCard key={dest.slug} dest={dest} />
          ))}
        </div>
      </section>

      {/* ━━━ HOW IT WORKS ━━━ */}
      <section
        className="relative py-24 border-y border-gold overflow-hidden"
        style={{ background: "var(--ink-deep)" }}
      >
        {/* Faint world map watermark */}
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 30%, #c9a84c 1px, transparent 1.5px), radial-gradient(circle at 40% 50%, #c9a84c 1px, transparent 1.5px), radial-gradient(circle at 60% 35%, #c9a84c 1px, transparent 1.5px), radial-gradient(circle at 75% 55%, #c9a84c 1px, transparent 1.5px), radial-gradient(circle at 85% 30%, #c9a84c 1px, transparent 1.5px), radial-gradient(circle at 25% 65%, #c9a84c 1px, transparent 1.5px), radial-gradient(circle at 50% 75%, #c9a84c 1px, transparent 1.5px), radial-gradient(circle at 70% 70%, #c9a84c 1px, transparent 1.5px)",
            backgroundSize: "200px 200px",
          }}
        />

        <div className="relative mx-auto max-w-6xl px-6">
          <div className="text-center mb-20">
            <div className="eyebrow mb-5">How it works</div>
            <h2 className="font-display text-4xl md:text-6xl font-medium tracking-tight mb-4">
              Three steps. Zero compromise.
            </h2>
          </div>

          <div className="relative grid md:grid-cols-3 gap-12 md:gap-6">
            {/* Connecting line */}
            <div
              className="hidden md:block absolute top-8 left-[16%] right-[16%] h-px"
              style={{
                background:
                  "linear-gradient(90deg, transparent, var(--gold), transparent)",
              }}
            />

            {[
              { num: "01", icon: Compass, title: "Discover", desc: "Browse curated highlights for cities and countries — landmarks, food, hidden gems.", to: "/explore" as const, cta: "Explore destinations" },
              { num: "02", icon: Sparkles, title: "Plan", desc: "Generate a day-by-day itinerary tuned to your style, budget, and interests.", to: "/plan" as const, cta: "Try the AI planner" },
              { num: "03", icon: Wallet, title: "Travel", desc: "See realistic daily costs and tips to stretch every rupee further.", to: "/estimate" as const, cta: "Estimate my trip" },
            ].map((step) => (
              <Link
                key={step.num}
                to={step.to}
                className="relative group text-center"
              >
                <div
                  className="relative mx-auto h-16 w-16 rounded-full border-2 grid place-items-center mb-6 transition-all group-hover:scale-110"
                  style={{
                    background: "var(--ink)",
                    borderColor: "var(--gold)",
                  }}
                >
                  <span className="font-display text-lg text-gold">{step.num}</span>
                </div>

                <step.icon className="h-5 w-5 text-gold/70 mx-auto mb-4" strokeWidth={1.5} />

                <h3 className="font-display text-3xl font-medium mb-3">{step.title}</h3>
                <p className="text-muted-foreground mb-5 max-w-xs mx-auto leading-relaxed">
                  {step.desc}
                </p>
                <div className="text-xs tracking-[0.22em] uppercase text-gold inline-flex items-center gap-2 group-hover:gap-3 transition-all">
                  {step.cta} <ArrowRight className="h-3 w-3" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━ INDIA SPOTLIGHT ━━━ */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="flex items-end justify-between mb-14 flex-wrap gap-6">
          <div>
            <div className="eyebrow eyebrow-line mb-5">India Spotlight</div>
            <h2 className="font-display text-4xl md:text-6xl font-medium tracking-tight max-w-xl leading-[1.05]">
              The land of kings, reimagined.
            </h2>
          </div>
          <Link
            to="/explore"
            search={{ q: "rajasthan" }}
            className="text-xs font-semibold tracking-[0.22em] uppercase text-gold hover:gap-3 inline-flex items-center gap-2 transition-all"
          >
            Explore Rajasthan <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
              className="group p-7 rounded-2xl border border-gold hover:border-gold-strong transition-all duration-500 hover:-translate-y-1 hover:shadow-glow"
              style={{ background: "var(--surface)" }}
            >
              <div className="flex items-start justify-between mb-6">
                <span className="text-5xl" aria-hidden>{c.emoji}</span>
                <span className="eyebrow">{c.tag}</span>
              </div>
              <h3 className="font-display text-3xl font-medium mb-3">{c.name}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6">{c.blurb}</p>
              <div className="text-[11px] tracking-[0.22em] uppercase text-gold inline-flex items-center gap-2 group-hover:gap-3 transition-all">
                See guide <ArrowRight className="h-3 w-3" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      <TestimonialsGrid />

      <ComparisonSection />

      {/* ━━━ EDITORIAL CTA ━━━ */}
      <section className="mx-auto max-w-5xl px-6 py-24">
        <div
          className="relative rounded-2xl p-12 md:p-20 text-center overflow-hidden border border-gold"
          style={{ background: "var(--ink-deep)" }}
        >
          <div
            className="absolute -top-20 -right-20 h-80 w-80 rounded-full"
            style={{ background: "radial-gradient(circle, rgba(201,168,76,0.2), transparent 70%)", filter: "blur(40px)" }}
          />
          <div className="eyebrow mb-6 relative">Your next chapter</div>
          <h2 className="relative font-display text-3xl md:text-5xl font-medium mb-6 text-balance leading-tight">
            The world is closer than you think.
          </h2>
          <p className="relative text-muted-foreground mb-10 max-w-xl mx-auto leading-relaxed">
            Pick a destination, set your budget, and let Wandr orchestrate the rest.
          </p>
          <Link
            to="/plan"
            className="relative inline-flex items-center gap-3 px-8 py-4 rounded-full text-xs font-semibold tracking-[0.22em] uppercase hover:shadow-glow transition-all hover:-translate-y-0.5"
            style={{ background: "var(--gradient-gold)", color: "var(--ink)" }}
          >
            Plan my next trip <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </section>

      <UrgencyBanner />
      <PricingPlans />

      <GuaranteeSection />

      <FAQSection />

      <SiteFooter />
    </div>
  );
}
