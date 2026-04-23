import { createFileRoute } from "@tanstack/react-router";
import { zodValidator, fallback } from "@tanstack/zod-adapter";
import { z } from "zod";
import { useMemo, useState } from "react";
import { Sparkles, Sun, Coffee, Sunset, Moon } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { destinations, getDestination, type Destination } from "@/data/destinations";

const searchSchema = z.object({
  destination: fallback(z.string(), "").default(""),
});

export const Route = createFileRoute("/plan")({
  validateSearch: zodValidator(searchSchema),
  head: () => ({
    meta: [
      { title: "Plan a budget trip · Wandr" },
      { name: "description", content: "Build a personalized day-by-day itinerary for any destination, optimized for your budget and travel style." },
      { property: "og:title", content: "Plan a budget trip · Wandr" },
      { property: "og:description", content: "Build a day-by-day itinerary that fits your budget." },
    ],
  }),
  component: PlanPage,
});

type Style = "backpacker" | "budget" | "comfort";

function PlanPage() {
  const { destination } = Route.useSearch();
  const navigate = Route.useNavigate();

  const [destSlug, setDestSlug] = useState(destination || destinations[0].slug);
  const [days, setDays] = useState(5);
  const [budget, setBudget] = useState(500);
  const [style, setStyle] = useState<Style>("budget");
  const [generated, setGenerated] = useState(false);

  const dest = getDestination(destSlug) ?? destinations[0];

  const itinerary = useMemo(() => buildItinerary(dest, days, style), [dest, days, style]);
  const dailyCost = useMemo(() => computeDailyCost(dest, style), [dest, style]);
  const totalCost = dailyCost * days;
  const onBudget = totalCost <= budget;

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <section className="bg-warm border-b border-border/60">
        <div className="mx-auto max-w-6xl px-5 py-14">
          <h1 className="font-display text-4xl md:text-5xl font-semibold mb-3 text-balance">
            Plan your trip in a minute.
          </h1>
          <p className="text-muted-foreground max-w-xl">
            Pick a destination, set your budget, and we'll sketch out a
            day-by-day itinerary with cheap stays, real local food, and free things to do.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-12 grid lg:grid-cols-[380px_1fr] gap-8">
        {/* Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            navigate({ search: { destination: destSlug } });
            setGenerated(true);
          }}
          className="rounded-3xl bg-card border border-border/60 p-6 md:p-7 shadow-soft h-fit lg:sticky lg:top-24"
        >
          <h2 className="font-display text-2xl font-semibold mb-5">Trip details</h2>

          <label className="block mb-5">
            <span className="text-sm font-medium mb-2 block">Destination</span>
            <select
              value={destSlug}
              onChange={(e) => setDestSlug(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
            >
              {destinations.map((d) => (
                <option key={d.slug} value={d.slug}>
                  {d.emoji} {d.name}, {d.country}
                </option>
              ))}
            </select>
          </label>

          <label className="block mb-5">
            <span className="text-sm font-medium mb-2 block flex items-center justify-between">
              <span>Days: <span className="text-primary font-semibold">{days}</span></span>
            </span>
            <input
              type="range"
              min={2}
              max={14}
              value={days}
              onChange={(e) => setDays(Number(e.target.value))}
              className="w-full accent-primary"
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>2 days</span><span>14 days</span>
            </div>
          </label>

          <label className="block mb-5">
            <span className="text-sm font-medium mb-2 block">
              Budget (USD): <span className="text-primary font-semibold">${budget}</span>
            </span>
            <input
              type="range"
              min={100}
              max={5000}
              step={50}
              value={budget}
              onChange={(e) => setBudget(Number(e.target.value))}
              className="w-full accent-primary"
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>$100</span><span>$5000</span>
            </div>
          </label>

          <div className="block mb-6">
            <span className="text-sm font-medium mb-2 block">Travel style</span>
            <div className="grid grid-cols-3 gap-2">
              {(["backpacker", "budget", "comfort"] as Style[]).map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setStyle(s)}
                  className={`px-3 py-2.5 rounded-xl text-sm font-medium capitalize transition-all ${
                    style === s
                      ? "bg-primary text-primary-foreground shadow-soft"
                      : "bg-secondary text-foreground/70 hover:bg-secondary/80"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full px-5 py-3.5 rounded-full bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 shadow-soft"
          >
            <Sparkles className="h-4 w-4" />
            Generate itinerary
          </button>
        </form>

        {/* Result */}
        <div>
          {!generated ? (
            <div className="rounded-3xl bg-secondary/40 border border-dashed border-border p-12 text-center">
              <div className="text-5xl mb-4">🗺️</div>
              <h3 className="font-display text-2xl font-semibold mb-2">
                Your itinerary will appear here
              </h3>
              <p className="text-muted-foreground">
                Fill in the form and hit generate to see your day-by-day plan.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Summary */}
              <div className="rounded-3xl bg-sunset p-6 md:p-8 text-primary-foreground shadow-warm">
                <div className="flex flex-wrap items-baseline justify-between gap-4 mb-2">
                  <h3 className="font-display text-3xl font-semibold">
                    {days} days in {dest.name}
                  </h3>
                  <span className="text-sm opacity-90 capitalize">{style} style</span>
                </div>
                <p className="opacity-90 mb-5">{dest.tagline}</p>
                <div className="grid grid-cols-3 gap-3 text-sm">
                  <div className="rounded-xl bg-card/15 backdrop-blur p-3">
                    <div className="opacity-80">Daily</div>
                    <div className="font-display text-2xl font-semibold">${dailyCost}</div>
                  </div>
                  <div className="rounded-xl bg-card/15 backdrop-blur p-3">
                    <div className="opacity-80">Total trip</div>
                    <div className="font-display text-2xl font-semibold">${totalCost}</div>
                  </div>
                  <div className="rounded-xl bg-card/15 backdrop-blur p-3">
                    <div className="opacity-80">Your budget</div>
                    <div className="font-display text-2xl font-semibold">${budget}</div>
                  </div>
                </div>
                <div className={`mt-4 px-4 py-3 rounded-xl text-sm font-medium ${onBudget ? "bg-leaf/20" : "bg-destructive/20"}`}>
                  {onBudget
                    ? `🎉 You're $${budget - totalCost} under budget — leaves room for souvenirs!`
                    : `⚠️ Over budget by $${totalCost - budget}. Try fewer days, or backpacker style.`}
                </div>
              </div>

              {/* Days */}
              <div className="space-y-4">
                {itinerary.map((day, i) => (
                  <div
                    key={i}
                    className="rounded-3xl bg-card border border-border/60 p-6 shadow-soft"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="h-10 w-10 rounded-full bg-primary text-primary-foreground grid place-items-center font-display font-semibold">
                        {i + 1}
                      </div>
                      <h4 className="font-display text-2xl font-semibold">
                        Day {i + 1}
                      </h4>
                    </div>
                    <div className="grid md:grid-cols-4 gap-4">
                      <Slot icon={Coffee} label="Morning" text={day.morning} tint="bg-sun/30" />
                      <Slot icon={Sun} label="Midday" text={day.midday} tint="bg-primary/15" />
                      <Slot icon={Sunset} label="Afternoon" text={day.afternoon} tint="bg-accent/40" />
                      <Slot icon={Moon} label="Evening" text={day.evening} tint="bg-sky/25" />
                    </div>
                  </div>
                ))}
              </div>

              {/* Tips */}
              <div className="rounded-3xl bg-secondary/60 p-6 md:p-8">
                <h3 className="font-display text-2xl font-semibold mb-4">
                  Money-saving tips for {dest.name}
                </h3>
                <ul className="grid md:grid-cols-2 gap-3">
                  {dest.tips.map((tip, i) => (
                    <li key={i} className="flex gap-3 items-start text-sm">
                      <span className="mt-0.5 h-6 w-6 rounded-full bg-primary text-primary-foreground grid place-items-center text-xs font-semibold shrink-0">
                        {i + 1}
                      </span>
                      <span className="text-foreground/85">{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

function Slot({
  icon: Icon,
  label,
  text,
  tint,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  text: string;
  tint: string;
}) {
  return (
    <div className={`rounded-2xl p-4 ${tint}`}>
      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide mb-2">
        <Icon className="h-3.5 w-3.5" />
        {label}
      </div>
      <p className="text-sm text-foreground/85">{text}</p>
    </div>
  );
}

function computeDailyCost(dest: Destination, style: Style) {
  const base = dest.costs.stay + dest.costs.food + dest.costs.transport + dest.costs.activities;
  const mult = style === "backpacker" ? 0.7 : style === "comfort" ? 1.6 : 1;
  return Math.round(base * mult);
}

function buildItinerary(dest: Destination, days: number, style: Style) {
  const places = dest.places;
  const tips = dest.tips;
  const food = places.filter((p) => p.category === "Food");
  const culture = places.filter((p) => p.category === "Culture" || p.category === "Landmark");
  const nature = places.filter((p) => p.category === "Nature" || p.category === "Adventure");

  const pick = (arr: typeof places, i: number, fallback: string) =>
    arr.length ? arr[i % arr.length].name : fallback;

  const stayHint =
    style === "backpacker"
      ? "Check into a hostel dorm or guesthouse"
      : style === "comfort"
        ? "Settle into a boutique hotel"
        : "Drop bags at a budget guesthouse";

  return Array.from({ length: days }, (_, i) => ({
    morning:
      i === 0
        ? `${stayHint}, then a relaxed breakfast at a local café.`
        : `Coffee + pastry at a neighborhood spot. Visit ${pick(culture, i, "a local landmark")}.`,
    midday: `Lunch at ${pick(food, i, "a busy local eatery")} — go where locals queue.`,
    afternoon: `Explore ${pick(nature, i, "a nearby park or viewpoint")}. ${tips[i % tips.length]}`,
    evening:
      i === days - 1
        ? `Sunset stroll, last bites at ${pick(food, i + 1, "a favorite spot")}, pack up.`
        : `Dinner at a small restaurant, walk it off through the old town.`,
  }));
}
