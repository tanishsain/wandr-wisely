import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Clock,
  Share2,
  Instagram,
  MessageCircle,
  MapPin,
  Sparkles,
  Zap,
  Crown,
} from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { blogPosts } from "@/data/blog";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = blogPosts.find((p) => p.slug === params.slug);
    if (!post) throw notFound();
    return { post };
  },
  head: ({ loaderData }) => {
    const post = loaderData?.post;
    if (!post) return { meta: [{ title: "Article — Wandr Wisely" }] };
    const url = `https://wandr-wisely.lovable.app/blog/${post.slug}`;
    return {
      meta: [
        { title: `${post.title} | Wandr Wisely` },
        { name: "description", content: post.description },
        { name: "keywords", content: post.keywords.join(", ") },
        { property: "og:type", content: "article" },
        { property: "og:title", content: post.title },
        { property: "og:description", content: post.description },
        { property: "og:image", content: post.cover },
        { property: "og:url", content: url },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: post.title },
        { name: "twitter:description", content: post.description },
        { name: "twitter:image", content: post.cover },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: post.title,
            description: post.description,
            image: [post.cover],
            datePublished: post.date,
            author: { "@type": "Organization", name: "Wandr Wisely" },
            publisher: { "@type": "Organization", name: "Wandr Wisely" },
            mainEntityOfPage: url,
            keywords: post.keywords.join(", "),
          }),
        },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="min-h-screen grid place-items-center bg-background px-5">
      <div className="text-center">
        <h1 className="font-display text-4xl mb-3">Article not found</h1>
        <Link to="/blog" className="text-primary font-medium">
          ← Back to blog
        </Link>
      </div>
    </div>
  ),
  errorComponent: ({ error }) => (
    <div className="min-h-screen grid place-items-center bg-background px-5">
      <p className="text-muted-foreground">{error.message}</p>
    </div>
  ),
  component: BlogPostPage,
});

const places = [
  {
    name: "Jaipur — The Pink City",
    slug: "jaipur",
    emoji: "🏰",
    mustVisit: "Amber Fort, Hawa Mahal, City Palace, Jantar Mantar",
    bestTime: "October to March",
    budget: "Rs.2,000 – Rs.5,000 per day",
  },
  {
    name: "Jodhpur — The Blue City",
    slug: "jodhpur",
    emoji: "🔵",
    mustVisit: "Mehrangarh Fort, Jaswant Thada, Umaid Bhawan Palace",
    bestTime: "October to February",
    budget: "Rs.1,500 – Rs.4,000 per day",
  },
  {
    name: "Jaisalmer — The Golden City",
    slug: "jaisalmer",
    emoji: "🐪",
    mustVisit: "Jaisalmer Fort, Sam Sand Dunes, Desert Safari",
    bestTime: "November to February",
    budget: "Rs.2,000 – Rs.6,000 per day",
  },
  {
    name: "Udaipur — The City of Lakes",
    slug: "udaipur",
    emoji: "🛶",
    mustVisit: "Lake Pichola, City Palace, Jag Mandir",
    bestTime: "September to March",
    budget: "Rs.2,500 – Rs.7,000 per day",
  },
  {
    name: "Pushkar — The Holy City",
    slug: "pushkar",
    emoji: "🪔",
    mustVisit: "Brahma Temple, Pushkar Lake, Savitri Temple",
    bestTime: "October to March",
    budget: "Rs.1,000 – Rs.3,000 per day",
  },
  {
    name: "Bikaner — The Camel City",
    slug: "bikaner",
    emoji: "🕌",
    mustVisit: "Junagarh Fort, Karni Mata Temple, Lalgarh Palace",
    bestTime: "October to February",
    budget: "Rs.1,000 – Rs.3,000 per day",
  },
  {
    name: "Ranthambore — Wildlife Paradise",
    slug: "ranthambore",
    emoji: "🐯",
    mustVisit: "National Park, Tiger Safari, Ranthambore Fort",
    bestTime: "October to June",
    budget: "Rs.3,000 – Rs.8,000 per day",
  },
  {
    name: "Mount Abu — Hill Station",
    slug: "mount-abu",
    emoji: "⛰️",
    mustVisit: "Dilwara Jain Temples, Nakki Lake, Guru Shikhar",
    bestTime: "October to June",
    budget: "Rs.1,500 – Rs.4,000 per day",
  },
  {
    name: "Chittorgarh — City of Valor",
    slug: "chittorgarh",
    emoji: "⚔️",
    mustVisit: "Chittorgarh Fort, Vijay Stambha, Meera Temple",
    bestTime: "October to March",
    budget: "Rs.1,000 – Rs.3,000 per day",
  },
  {
    name: "Sri Ganganagar — Hidden Gem",
    slug: "sri-ganganagar",
    emoji: "🌾",
    mustVisit: "Hari Singh Park, Gandhi Park, Local Fruit Markets",
    bestTime: "October to March",
    budget: "Rs.800 – Rs.2,000 per day",
  },
];

const plans = [
  {
    name: "Basic",
    price: "Rs.199",
    href: "https://rzp.io/rzp/wandrwisely-basic",
    icon: Sparkles,
    cls: "bg-card border-border text-foreground",
  },
  {
    name: "Standard",
    price: "Rs.499",
    href: "https://rzp.io/rzp/wandrwisely-standard",
    icon: Zap,
    cls: "bg-[#FF6A00] border-[#FF6A00] text-white",
  },
  {
    name: "Premium",
    price: "Rs.999",
    href: "https://rzp.io/rzp/otXOpEWz",
    icon: Crown,
    cls: "bg-foreground border-foreground text-background",
  },
];

function BlogPostPage() {
  const { post } = Route.useLoaderData();
  const shareUrl = `https://wandr-wisely.lovable.app/blog/${post.slug}`;
  const shareText = `${post.title} — ${post.description}`;
  const whatsappHref = `https://wa.me/?text=${encodeURIComponent(`${shareText} ${shareUrl}`)}`;
  const instagramHref = "https://www.instagram.com/";

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
    } catch {}
  };

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <article>
        <header className="mx-auto max-w-3xl px-5 pt-8 md:pt-12 pb-6">
          <Link
            to="/blog"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-primary mb-6"
          >
            <ArrowLeft className="h-4 w-4" /> Back to blog
          </Link>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted-foreground mb-4">
            <span className="flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5" /> {post.date}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" /> {post.readMins} min read
            </span>
          </div>

          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-balance mb-4">
            {post.title}
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground">
            {post.description}
          </p>

          <div className="flex flex-wrap items-center gap-2 mt-6">
            <span className="text-sm font-medium text-muted-foreground mr-1">
              Share:
            </span>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-[#25D366] text-white text-sm font-medium hover:-translate-y-0.5 transition-all shadow-soft"
            >
              <MessageCircle className="h-4 w-4" /> WhatsApp
            </a>
            <a
              href={instagramHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-white text-sm font-medium hover:-translate-y-0.5 transition-all shadow-soft"
              style={{
                background:
                  "linear-gradient(45deg,#F58529,#DD2A7B,#8134AF,#515BD4)",
              }}
            >
              <Instagram className="h-4 w-4" /> Instagram
            </a>
            <button
              onClick={copyLink}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-secondary text-secondary-foreground text-sm font-medium hover:bg-secondary/80 transition-colors"
            >
              <Share2 className="h-4 w-4" /> Copy link
            </button>
          </div>
        </header>

        <div className="mx-auto max-w-4xl px-5">
          <img
            src={post.cover}
            alt="Hawa Mahal palace facade in Jaipur, Rajasthan"
            className="w-full aspect-[16/9] object-cover rounded-2xl md:rounded-3xl shadow-warm"
          />
        </div>

        <div className="mx-auto max-w-3xl px-5 py-10 md:py-14">
          <p className="text-base md:text-lg leading-relaxed text-foreground/90">
            Rajasthan, the <strong>land of kings</strong>, is India's most
            visually arresting state — a sun-baked tapestry of mighty forts,
            mirrored palaces, painted havelis and rolling sand dunes. Here are
            the <strong>top 10 places to visit in Rajasthan</strong>, with the
            must-see sights, the best season and what each destination will cost
            you per day.
          </p>

          <div className="mt-10 space-y-6">
            {places.map((p, i) => (
              <section
                key={p.slug}
                className="p-5 md:p-7 rounded-2xl bg-card border border-border/60 shadow-soft"
              >
                <h2 className="font-display text-2xl md:text-3xl font-semibold flex flex-wrap items-center gap-2 md:gap-3">
                  <span className="text-primary font-bold">{i + 1}.</span>
                  <span aria-hidden>{p.emoji}</span>
                  <span>{p.name}</span>
                </h2>
                <dl className="mt-4 space-y-2 text-sm md:text-base">
                  <div className="flex flex-col sm:flex-row sm:gap-2">
                    <dt className="font-semibold min-w-[110px] text-foreground">
                      Must visit:
                    </dt>
                    <dd className="text-foreground/80">{p.mustVisit}</dd>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:gap-2">
                    <dt className="font-semibold min-w-[110px] text-foreground">
                      Best time:
                    </dt>
                    <dd className="text-foreground/80">{p.bestTime}</dd>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:gap-2">
                    <dt className="font-semibold min-w-[110px] text-foreground">
                      Budget:
                    </dt>
                    <dd className="text-foreground/80">{p.budget}</dd>
                  </div>
                </dl>
              </section>
            ))}
          </div>

          {/* Final CTA */}
          <div className="mt-12 p-6 md:p-10 rounded-3xl bg-sunset text-primary-foreground shadow-warm text-center">
            <h2 className="font-display text-2xl md:text-4xl font-semibold mb-3">
              Plan your Rajasthan trip with Wandr Wisely!
            </h2>
            <p className="text-primary-foreground/90 mb-6 max-w-xl mx-auto text-sm md:text-base">
              Get a custom day-by-day itinerary, budget breakdown and hotel
              picks — delivered instantly. Choose your plan:
            </p>

            <div className="grid sm:grid-cols-3 gap-3 max-w-2xl mx-auto">
              {plans.map((p) => (
                <a
                  key={p.name}
                  href={p.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group flex flex-col items-center justify-center gap-1 px-4 py-5 rounded-2xl border-2 font-semibold shadow-soft hover:-translate-y-1 hover:shadow-warm transition-all ${p.cls}`}
                >
                  <p.icon className="h-6 w-6 mb-1" />
                  <span className="text-sm uppercase tracking-wider opacity-80">
                    {p.name} Plan
                  </span>
                  <span className="text-2xl font-bold">{p.price}</span>
                </a>
              ))}
            </div>

            <Link
              to="/plan"
              className="mt-8 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-card text-primary font-semibold hover:scale-105 transition-transform"
            >
              Try the free planner <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-10 text-center">
            <Link
              to="/blog"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-primary"
            >
              <ArrowLeft className="h-4 w-4" /> Back to all articles
            </Link>
          </div>
        </div>
      </article>

      {/* Related destinations */}
      <section className="bg-secondary/40">
        <div className="mx-auto max-w-6xl px-5 py-14 md:py-16">
          <h2 className="font-display text-2xl md:text-4xl font-semibold mb-2">
            Related destinations
          </h2>
          <p className="text-muted-foreground mb-8">
            Explore in-depth guides for the cities featured in this article.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {places.slice(0, 6).map((c) => (
              <Link
                key={c.slug}
                to="/explore"
                search={{ q: c.slug }}
                className="group p-6 rounded-3xl bg-card border border-border/60 shadow-soft hover:shadow-warm hover:-translate-y-1 transition-all"
              >
                <div className="flex items-start justify-between mb-3">
                  <span className="text-4xl" aria-hidden>
                    {c.emoji}
                  </span>
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                </div>
                <h3 className="font-display text-xl font-semibold mb-1">
                  {c.name}
                </h3>
                <p className="text-sm text-muted-foreground">
                  Best time: {c.bestTime}
                </p>
                <div className="mt-4 text-primary text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                  See guide <ArrowRight className="h-4 w-4" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
