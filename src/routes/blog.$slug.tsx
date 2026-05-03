import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import {
  ArrowRight,
  Calendar,
  Clock,
  Share2,
  Instagram,
  MessageCircle,
  MapPin,
} from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { PricingButtonsRow } from "@/components/pricing-plans";
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
            publisher: {
              "@type": "Organization",
              name: "Wandr Wisely",
            },
            mainEntityOfPage: url,
            keywords: post.keywords.join(", "),
          }),
        },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="min-h-screen grid place-items-center bg-background">
      <div className="text-center">
        <h1 className="font-display text-4xl mb-3">Article not found</h1>
        <Link to="/blog" className="text-primary font-medium">
          ← Back to blog
        </Link>
      </div>
    </div>
  ),
  errorComponent: ({ error }) => (
    <div className="min-h-screen grid place-items-center bg-background">
      <p className="text-muted-foreground">{error.message}</p>
    </div>
  ),
  component: BlogPostPage,
});

const rajasthanPlaces = [
  {
    name: "Jaipur — The Pink City",
    slug: "jaipur",
    emoji: "🏰",
    why: "Jaipur is the gateway to Rajasthan and one of the best places to visit in India for first-timers. Wander the Amber Fort at sunrise, marvel at the honeycomb facade of Hawa Mahal, and shop for block-printed textiles in Johari Bazaar.",
    budget: "Rs.1,500–2,500/day",
    stay: "2 nights",
  },
  {
    name: "Udaipur — City of Lakes",
    slug: "udaipur",
    emoji: "🛶",
    why: "Often called the most romantic city in India, Udaipur's whitewashed havelis ring Lake Pichola. Take a sunset boat ride past the Lake Palace, then catch a rooftop dinner overlooking the City Palace.",
    budget: "Rs.1,800–3,000/day",
    stay: "2 nights",
  },
  {
    name: "Jaisalmer — The Golden City",
    slug: "jaisalmer",
    emoji: "🐪",
    why: "Rising out of the Thar Desert, Jaisalmer's living sandstone fort glows gold at sunset. A camel safari and overnight in Sam Sand Dunes is a bucket-list Rajasthan experience.",
    budget: "Rs.1,500–2,800/day",
    stay: "2 nights",
  },
  {
    name: "Jodhpur — The Blue City",
    slug: "jodhpur",
    emoji: "🔵",
    why: "Mehrangarh Fort towers over a sea of indigo houses. Don't miss the stepwell Toorji Ka Jhalra and a Rajasthani thali at one of the rooftop cafes in the old town.",
    budget: "Rs.1,400–2,400/day",
    stay: "2 nights",
  },
  {
    name: "Pushkar — The Holy Town",
    slug: "pushkar",
    emoji: "🪔",
    why: "Wrapped around a sacred lake with 52 ghats, Pushkar is where backpackers and pilgrims meet. Visit during the famous November Camel Fair for a once-in-a-lifetime spectacle.",
    budget: "Rs.900–1,800/day",
    stay: "1 night",
  },
  {
    name: "Bikaner — Camel Country",
    slug: "bikaner",
    emoji: "🕌",
    why: "Off the typical tourist trail, Bikaner offers Junagarh Fort, the National Research Centre on Camels, and Rajasthan's best sweets — try a hot kachori at Chhotu Motu Joshi.",
    budget: "Rs.1,000–2,000/day",
    stay: "1 night",
  },
  {
    name: "Mount Abu — Hill Station Escape",
    slug: "mount-abu",
    emoji: "⛰️",
    why: "Rajasthan's only hill station offers a cool break from desert heat. The Dilwara Jain Temples are an architectural marvel and Nakki Lake is great for an evening stroll.",
    budget: "Rs.1,200–2,200/day",
    stay: "1 night",
  },
  {
    name: "Ranthambore — Tiger Country",
    slug: "ranthambore",
    emoji: "🐯",
    why: "One of India's best places to spot a Bengal tiger in the wild. Book a morning jeep safari in Zone 3 or 4 for the best chances and pair it with the ruined Ranthambore Fort.",
    budget: "Rs.2,500–4,500/day",
    stay: "2 nights",
  },
  {
    name: "Chittorgarh — Land of Legends",
    slug: "chittorgarh",
    emoji: "⚔️",
    why: "The largest fort in India, Chittorgarh is steeped in tales of Rajput valor. Climb the Vijay Stambh (Tower of Victory) for sweeping views of the plains.",
    budget: "Rs.1,000–2,000/day",
    stay: "1 night",
  },
  {
    name: "Bundi — The Hidden Gem",
    slug: "bundi",
    emoji: "🎨",
    why: "Skipped by most tour buses, Bundi rewards travelers with a stunning step-well (Raniji ki Baori), the dreamy Taragarh Fort, and miniature paintings inside Chitrashala.",
    budget: "Rs.800–1,600/day",
    stay: "1 night",
  },
];

function BlogPostPage() {
  const { post } = Route.useLoaderData();
  const shareUrl = `https://wandr-wisely.lovable.app/blog/${post.slug}`;
  const shareText = `${post.title} — ${post.description}`;
  const whatsappHref = `https://wa.me/?text=${encodeURIComponent(`${shareText} ${shareUrl}`)}`;
  const instagramHref = `https://www.instagram.com/`; // IG has no web share intent; opens app/site

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
    } catch {}
  };

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      {/* Hero */}
      <article>
        <header className="mx-auto max-w-3xl px-5 pt-12 pb-6">
          <Link
            to="/blog"
            className="text-sm text-muted-foreground hover:text-primary"
          >
            ← All articles
          </Link>
          <div className="flex items-center gap-4 text-xs text-muted-foreground mt-4 mb-4">
            <span className="flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5" /> {post.date}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" /> {post.readMins} min read
            </span>
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-semibold tracking-tight text-balance mb-4">
            {post.title}
          </h1>
          <p className="text-lg text-muted-foreground">{post.description}</p>

          {/* Share */}
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
            className="w-full aspect-[16/9] object-cover rounded-3xl shadow-warm"
          />
        </div>

        {/* Body */}
        <div className="mx-auto max-w-3xl px-5 py-12 prose prose-lg max-w-none">
          <p className="text-lg leading-relaxed text-foreground/90">
            Rajasthan, the <strong>land of kings</strong>, is India's most
            visually arresting state — a sun-baked tapestry of mighty forts,
            mirrored palaces, painted havelis and rolling sand dunes. Whether
            you have 5 days or 3 weeks, these are the{" "}
            <strong>top 10 places to visit in Rajasthan</strong> in 2026, with
            real budgets and how long to stay.
          </p>

          <div className="my-10 p-6 rounded-2xl bg-warm border border-border/60">
            <h2 className="font-display text-2xl font-semibold mb-3 mt-0">
              Quick Rajasthan trip facts
            </h2>
            <ul className="space-y-1 text-foreground/85 my-0">
              <li>
                <strong>Best time to visit:</strong> October to March (cool,
                dry, perfect sightseeing weather)
              </li>
              <li>
                <strong>Ideal duration:</strong> 10–14 days for the classic
                circuit
              </li>
              <li>
                <strong>Daily budget:</strong> Rs.1,500 backpacker · Rs.3,500
                mid-range · Rs.8,000+ luxury
              </li>
              <li>
                <strong>Getting around:</strong> Trains between cities, autos
                and Ola/Uber within
              </li>
            </ul>
          </div>

          {rajasthanPlaces.map((place, i) => (
            <section key={place.slug} className="mt-10">
              <h2 className="font-display text-3xl font-semibold mb-3 flex items-center gap-3">
                <span className="text-2xl text-primary font-bold">
                  {i + 1}.
                </span>
                <span>{place.emoji}</span>
                {place.name}
              </h2>
              <p className="text-foreground/85">{place.why}</p>
              <p className="text-sm text-muted-foreground mt-2">
                <strong className="text-foreground">Budget:</strong>{" "}
                {place.budget} ·{" "}
                <strong className="text-foreground">Recommended stay:</strong>{" "}
                {place.stay}
              </p>
            </section>
          ))}

          <h2 className="font-display text-3xl font-semibold mt-12 mb-4">
            Suggested 10-day Rajasthan itinerary
          </h2>
          <p>
            Short on time? Combine the highlights into one unforgettable loop:{" "}
            <strong>
              Delhi → Jaipur (2N) → Pushkar (1N) → Jodhpur (2N) → Jaisalmer (2N)
              → Udaipur (2N) → Mumbai
            </strong>
            . Trains between cities are cheap (Rs.300–800 in sleeper class) and
            an overnight train is one less hotel to pay for.
          </p>

          <h2 className="font-display text-3xl font-semibold mt-10 mb-4">
            How much does a Rajasthan trip cost?
          </h2>
          <p>
            A budget-friendly 10-day Rajasthan trip costs around{" "}
            <strong>Rs.18,000–25,000 per person</strong> including stays,
            transport, food and entry fees. Mid-range travelers should plan{" "}
            <strong>Rs.40,000–55,000</strong>, and luxury heritage-hotel trips
            start at <strong>Rs.1,20,000+</strong>.
          </p>

          {/* CTA block */}
          <div className="not-prose my-12 p-8 rounded-3xl bg-sunset text-primary-foreground shadow-warm text-center">
            <h2 className="font-display text-3xl font-semibold mb-2">
              Want a custom Rajasthan plan?
            </h2>
            <p className="text-primary-foreground/90 mb-6 max-w-xl mx-auto">
              Get an AI-crafted, day-by-day itinerary with hotels, transport
              and budget — delivered instantly. Pick a plan below.
            </p>
            <PricingButtonsRow />
            <Link
              to="/plan"
              className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-card text-primary font-semibold hover:scale-105 transition-transform"
            >
              Try the free planner <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <h2 className="font-display text-3xl font-semibold mt-10 mb-4">
            Final tips for visiting Rajasthan
          </h2>
          <ul>
            <li>Carry cash — small towns and dhabas often won't accept UPI.</li>
            <li>
              Dress modestly when visiting temples and forts, and always remove
              shoes at religious sites.
            </li>
            <li>
              Book Ranthambore safaris and luxury heritage stays at least 30
              days in advance.
            </li>
            <li>
              Negotiate auto fares before you start the ride — or use Ola/Uber
              in Jaipur, Jodhpur and Udaipur.
            </li>
          </ul>
        </div>
      </article>

      {/* Related destinations */}
      <section className="bg-secondary/40">
        <div className="mx-auto max-w-6xl px-5 py-16">
          <h2 className="font-display text-3xl md:text-4xl font-semibold mb-2">
            Related destinations
          </h2>
          <p className="text-muted-foreground mb-8">
            Explore in-depth guides for the cities featured in this article.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {rajasthanPlaces.slice(0, 6).map((c) => (
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
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {c.why}
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
