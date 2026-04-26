import { createFileRoute } from "@tanstack/react-router";
import { zodValidator, fallback } from "@tanstack/zod-adapter";
import { z } from "zod";
import { useMemo, useState } from "react";
import {
  Sparkles,
  Coffee,
  Sun,
  Sunset,
  Moon,
  Lock,
  Loader2,
  Download,
  Check,
  Lightbulb,
  Backpack,
  Gem,
} from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ProPaywall } from "@/components/pro-paywall";
import { destinations, getDestination } from "@/data/destinations";
import { generateAIItinerary, type Style, type Interest, type AIItinerary } from "@/lib/ai-planner";
import { usePro } from "@/hooks/use-pro";

const searchSchema = z.object({
  destination: fallback(z.string(), "").default(""),
});

export const Route = createFileRoute("/plan")({
  validateSearch: zodValidator(searchSchema),
  head: () => ({
    meta: [
      { title: "AI Trip Planner · Wandr" },
      {
        name: "description",
        content:
          "Generate a personalized AI itinerary for any destination — tuned to your budget, style, and what you actually love doing.",
      },
      { property: "og:title", content: "AI Trip Planner · Wandr" },
      {
        property: "og:description",
        content: "Generate a day-by-day AI itinerary tuned to your style and budget.",
      },
    ],
  }),
  component: PlanPage,
});

const ALL_INTERESTS: { id: Interest; label: string; emoji: string }[] = [
  { id: "food", label: "Food", emoji: "🍜" },
  { id: "culture", label: "Culture", emoji: "🏛️" },
  { id: "nature", label: "Nature", emoji: "🌿" },
  { id: "nightlife", label: "Nightlife", emoji: "🌙" },
  { id: "adventure", label: "Adventure", emoji: "🧗" },
  { id: "shopping", label: "Shopping", emoji: "🛍️" },
];

function PlanPage() {
  const { destination } = Route.useSearch();
  const navigate = Route.useNavigate();
  const { isPro, unlock } = usePro();

  const [destSlug, setDestSlug] = useState(destination || destinations[0].slug);
  const [days, setDays] = useState(5);
  const [budget, setBudget] = useState(800);
  const [style, setStyle] = useState<Style>("budget");
  const [interests, setInterests] = useState<Interest[]>(["food", "culture"]);
  const [itinerary, setItinerary] = useState<AIItinerary | null>(null);
  const [generating, setGenerating] = useState(false);
  const [paywallOpen, setPaywallOpen] = useState(false);

  const dest = getDestination(destSlug) ?? destinations[0];

  const onBudget = itinerary ? itinerary.totalEstimate <= budget : true;

  const toggleInterest = (i: Interest) => {
    setInterests((prev) => (prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i]));
  };

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    navigate({ search: { destination: destSlug } });
    setGenerating(true);
    setItinerary(null);
    // Simulate AI thinking — feels like generation
    setTimeout(() => {
      setItinerary(generateAIItinerary(dest, days, style, interests));
      setGenerating(false);
    }, 1100);
  };

  const handleExport = () => {
    if (!itinerary) return;
    const text = buildTextExport(dest.name, days, style, itinerary);
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `wandr-${dest.slug}-${days}d.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const visibleDays = useMemo(() => {
    if (!itinerary) return [];
    return isPro ? itinerary.days : itinerary.days.slice(0, 1);
  }, [itinerary, isPro]);

  const lockedDayCount = itinerary && !isPro ? Math.max(0, itinerary.days.length - 1) : 0;

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <section className="bg-warm border-b border-border/60">
        <div className="mx-auto max-w-6xl px-5 py-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-card border border-border/60 text-xs font-medium text-muted-foreground mb-4">
            <Sparkles className="h-3 w-3 text-primary" />
            AI Trip Planner
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-semibold mb-3 text-balance">
            Tell us your vibe. We'll plan the trip.
          </h1>
          <p className="text-muted-foreground max-w-xl">
            Our AI builds a day-by-day itinerary tuned to your destination,
            budget, and what you actually love doing — not generic top-10 lists.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-12 grid lg:grid-cols-[380px_1fr] gap-8">
        {/* Form */}
        <form
          onSubmit={handleGenerate}
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
            <span className="text-sm font-medium mb-2 flex items-center justify-between">
              <span>
                Days: <span className="text-primary font-semibold">{days}</span>
              </span>
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
              <span>2 days</span>
              <span>14 days</span>
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
          </label>

          <div className="block mb-5">
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

          <div className="block mb-6">
            <span className="text-sm font-medium mb-2 block">What do you love?</span>
            <div className="flex flex-wrap gap-2">
              {ALL_INTERESTS.map((i) => {
                const active = interests.includes(i.id);
                return (
                  <button
                    key={i.id}
                    type="button"
                    onClick={() => toggleInterest(i.id)}
                    className={`px-3 py-2 rounded-full text-sm font-medium transition-all border ${
                      active
                        ? "bg-primary/10 border-primary text-primary"
                        : "bg-card border-border text-foreground/70 hover:border-primary/40"
                    }`}
                  >
                    <span className="mr-1">{i.emoji}</span>
                    {i.label}
                  </button>
                );
              })}
            </div>
          </div>

          <button
            type="submit"
            disabled={generating}
            className="w-full px-5 py-3.5 rounded-full bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 shadow-soft disabled:opacity-60"
          >
            {generating ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" /> Generating…
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4" /> Generate AI itinerary
              </>
            )}
          </button>

          {!isPro && (
            <p className="text-center text-xs text-muted-foreground mt-3">
              Free preview shows Day 1 ·{" "}
              <button
                type="button"
                onClick={() => setPaywallOpen(true)}
                className="text-primary font-medium underline-offset-2 hover:underline"
              >
                Unlock all days
              </button>
            </p>
          )}
        </form>

        {/* Result */}
        <div>
          {generating && (
            <div className="rounded-3xl bg-card border border-border/60 p-12 text-center shadow-soft">
              <div className="inline-flex h-16 w-16 rounded-full bg-sunset items-center justify-center mb-4 animate-pulse">
                <Sparkles className="h-7 w-7 text-primary-foreground" />
              </div>
              <h3 className="font-display text-2xl font-semibold mb-2">
                Crafting your trip…
              </h3>
              <p className="text-muted-foreground">
                Matching {dest.name} highlights to your{" "}
                {interests.length ? interests.join(", ") : "preferences"}.
              </p>
            </div>
          )}

          {!generating && !itinerary && (
            <div className="rounded-3xl bg-secondary/40 border border-dashed border-border p-12 text-center">
              <div className="text-5xl mb-4">🗺️</div>
              <h3 className="font-display text-2xl font-semibold mb-2">
                Your AI itinerary will appear here
              </h3>
              <p className="text-muted-foreground">
                Set your preferences, then hit generate.
              </p>
            </div>
          )}

          {!generating && itinerary && (
            <div className="space-y-6">
              {/* Summary */}
              <div className="rounded-3xl bg-sunset p-6 md:p-8 text-primary-foreground shadow-warm">
                <div className="flex flex-wrap items-baseline justify-between gap-4 mb-2">
                  <h3 className="font-display text-3xl font-semibold">
                    {days} days in {dest.name}
                  </h3>
                  {isPro && (
                    <span className="text-xs px-2 py-1 rounded-full bg-card/20 backdrop-blur font-medium">
                      ✨ Pro
                    </span>
                  )}
                </div>
                <p className="opacity-90 mb-5">{itinerary.summary}</p>
                <div className="grid grid-cols-3 gap-3 text-sm">
                  <Stat label="Daily avg" value={`$${Math.round(itinerary.totalEstimate / days)}`} />
                  <Stat label="Total est." value={`$${itinerary.totalEstimate}`} />
                  <Stat label="Your budget" value={`$${budget}`} />
                </div>
                <div
                  className={`mt-4 px-4 py-3 rounded-xl text-sm font-medium ${
                    onBudget ? "bg-leaf/20" : "bg-destructive/20"
                  }`}
                >
                  {onBudget
                    ? `🎉 You're $${budget - itinerary.totalEstimate} under budget.`
                    : `⚠️ Over budget by $${itinerary.totalEstimate - budget}. Try fewer days or backpacker style.`}
                </div>
                {isPro && (
                  <button
                    onClick={handleExport}
                    className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card text-primary font-medium text-sm hover:bg-card/90 transition-colors"
                  >
                    <Download className="h-4 w-4" /> Export trip
                  </button>
                )}
              </div>

              {/* Days */}
              <div className="space-y-4">
                {visibleDays.map((day, i) => (
                  <DayCard key={i} day={day} index={i} isPro={isPro} />
                ))}

                {lockedDayCount > 0 && (
                  <div className="rounded-3xl bg-card border-2 border-dashed border-primary/30 p-8 text-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-glow opacity-50 pointer-events-none" />
                    <div className="relative">
                      <div className="inline-flex h-12 w-12 rounded-full bg-primary/10 items-center justify-center mb-3">
                        <Lock className="h-5 w-5 text-primary" />
                      </div>
                      <h4 className="font-display text-2xl font-semibold mb-2">
                        +{lockedDayCount} more day{lockedDayCount > 1 ? "s" : ""} planned
                      </h4>
                      <p className="text-muted-foreground mb-5 max-w-md mx-auto">
                        Unlock the full itinerary, hidden gems, restaurant picks, and a
                        custom packing list.
                      </p>
                      <button
                        onClick={() => setPaywallOpen(true)}
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors shadow-soft"
                      >
                        <Sparkles className="h-4 w-4" /> Unlock Pro · $9
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Pro extras */}
              {isPro && (
                <>
                  <div className="rounded-3xl bg-card border border-border/60 p-6 md:p-8 shadow-soft">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="h-10 w-10 rounded-2xl bg-sun text-sun-foreground grid place-items-center">
                        <Backpack className="h-5 w-5" />
                      </div>
                      <h3 className="font-display text-2xl font-semibold">Packing list</h3>
                    </div>
                    <ul className="grid sm:grid-cols-2 gap-2">
                      {itinerary.packingList.map((p) => (
                        <li key={p} className="flex items-center gap-2 text-sm">
                          <Check className="h-4 w-4 text-leaf shrink-0" />
                          <span>{p}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="rounded-3xl bg-secondary/60 p-6 md:p-8">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="h-10 w-10 rounded-2xl bg-primary text-primary-foreground grid place-items-center">
                        <Lightbulb className="h-5 w-5" />
                      </div>
                      <h3 className="font-display text-2xl font-semibold">Insider tips</h3>
                    </div>
                    <ul className="grid md:grid-cols-2 gap-3">
                      {itinerary.insiderTips.map((tip, i) => (
                        <li key={i} className="flex gap-3 items-start text-sm">
                          <span className="mt-0.5 h-6 w-6 rounded-full bg-primary text-primary-foreground grid place-items-center text-xs font-semibold shrink-0">
                            {i + 1}
                          </span>
                          <span className="text-foreground/85">{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </section>

      <ProPaywall open={paywallOpen} onClose={() => setPaywallOpen(false)} onUnlock={unlock} />

      <SiteFooter />
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-card/15 backdrop-blur p-3">
      <div className="opacity-80">{label}</div>
      <div className="font-display text-2xl font-semibold">{value}</div>
    </div>
  );
}

function DayCard({
  day,
  index,
  isPro,
}: {
  day: import("@/lib/ai-planner").AIDay;
  index: number;
  isPro: boolean;
}) {
  return (
    <div className="rounded-3xl bg-card border border-border/60 p-6 shadow-soft">
      <div className="flex items-center gap-3 mb-1">
        <div className="h-10 w-10 rounded-full bg-primary text-primary-foreground grid place-items-center font-display font-semibold">
          {index + 1}
        </div>
        <div>
          <div className="text-xs text-muted-foreground uppercase tracking-wide">
            Day {index + 1}
          </div>
          <h4 className="font-display text-xl font-semibold leading-tight">{day.title}</h4>
        </div>
        <div className="ml-auto text-right">
          <div className="text-xs text-muted-foreground">Est. spend</div>
          <div className="font-semibold">${day.estimatedSpend}</div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-3 mt-4">
        <Slot icon={Coffee} label="Morning" text={day.morning} tint="bg-sun/30" />
        <Slot icon={Sun} label="Midday" text={day.midday} tint="bg-primary/15" />
        <Slot icon={Sunset} label="Afternoon" text={day.afternoon} tint="bg-accent/40" />
        <Slot icon={Moon} label="Evening" text={day.evening} tint="bg-sky/25" />
      </div>

      {isPro && (day.hiddenGem || day.restaurantPick) && (
        <div className="mt-4 grid md:grid-cols-2 gap-3">
          {day.hiddenGem && (
            <div className="rounded-2xl bg-leaf/10 border border-leaf/20 p-4">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide mb-1 text-leaf">
                <Gem className="h-3.5 w-3.5" /> Hidden gem
              </div>
              <p className="text-sm text-foreground/85">{day.hiddenGem}</p>
            </div>
          )}
          {day.restaurantPick && (
            <div className="rounded-2xl bg-sun/20 border border-sun/30 p-4">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide mb-1">
                🍽️ Tonight's pick
              </div>
              <p className="text-sm text-foreground/85">{day.restaurantPick}</p>
            </div>
          )}
        </div>
      )}
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

function buildTextExport(name: string, days: number, style: string, it: AIItinerary) {
  const lines = [
    `WANDR — ${days} days in ${name}`,
    `Style: ${style}`,
    `Total estimate: $${it.totalEstimate}`,
    "",
    it.summary,
    "",
    "═══════════════════════════════════",
    "",
  ];
  it.days.forEach((d, i) => {
    lines.push(`DAY ${i + 1} — ${d.title}  (~$${d.estimatedSpend})`);
    lines.push(`  Morning:   ${d.morning}`);
    lines.push(`  Midday:    ${d.midday}`);
    lines.push(`  Afternoon: ${d.afternoon}`);
    lines.push(`  Evening:   ${d.evening}`);
    if (d.hiddenGem) lines.push(`  💎 Gem:    ${d.hiddenGem}`);
    if (d.restaurantPick) lines.push(`  🍽 Pick:   ${d.restaurantPick}`);
    lines.push("");
  });
  lines.push("PACKING LIST");
  it.packingList.forEach((p) => lines.push(`  • ${p}`));
  lines.push("");
  lines.push("INSIDER TIPS");
  it.insiderTips.forEach((t) => lines.push(`  • ${t}`));
  return lines.join("\n");
}
