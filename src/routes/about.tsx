import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart, Compass, Wallet, Leaf } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Wandr — travel further on less" },
      { name: "description", content: "Wandr is a friendly travel companion that helps curious travelers discover great places and plan trips on a tight budget." },
      { property: "og:title", content: "About Wandr — travel further on less" },
      { property: "og:description", content: "A friendly travel companion for curious travelers on a tight budget." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <section className="bg-warm">
        <div className="mx-auto max-w-3xl px-5 py-16 md:py-24 text-center">
          <div className="text-6xl mb-6">🌅</div>
          <h1 className="font-display text-5xl md:text-6xl font-semibold mb-5 text-balance">
            Travel is for everyone.
          </h1>
          <p className="text-lg text-muted-foreground text-balance">
            Wandr exists because the best trips of our lives weren't the most
            expensive ones. They were the ones where we got curious, asked
            locals, ate at the place with no English menu, and walked instead
            of taxied. We made Wandr to share that with you.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-5 py-16">
        <div className="grid md:grid-cols-2 gap-5">
          {[
            { icon: Heart, title: "Friendly, not financial", desc: "No spammy deals, no affiliate clickbait. Just honest tips from real travelers." },
            { icon: Compass, title: "Curated, not infinite", desc: "25 hand-picked destinations beats 25,000 generic ones. Quality over quantity." },
            { icon: Wallet, title: "Budget-first", desc: "Every place we list comes with realistic daily costs and ways to save more." },
            { icon: Leaf, title: "Slow and local", desc: "We highlight neighborhoods, family-run kitchens, and free experiences worth your time." },
          ].map((v) => (
            <div key={v.title} className="p-6 rounded-3xl bg-card border border-border/60 shadow-soft">
              <div className="h-11 w-11 rounded-2xl bg-primary text-primary-foreground grid place-items-center mb-4 shadow-soft">
                <v.icon className="h-5 w-5" />
              </div>
              <h3 className="font-display text-xl font-semibold mb-2">{v.title}</h3>
              <p className="text-sm text-muted-foreground">{v.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-14 text-center">
          <Link
            to="/explore"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-primary text-primary-foreground font-medium shadow-soft hover:shadow-warm transition-all"
          >
            Start exploring →
          </Link>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
