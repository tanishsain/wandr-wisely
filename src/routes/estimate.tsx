import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Calculator, TrendingDown } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { destinations, getDestination } from "@/data/destinations";
import { formatInr } from "@/lib/currency";

export const Route = createFileRoute("/estimate")({
  head: () => ({
    meta: [
      { title: "Trip cost estimator · Wandr" },
      { name: "description", content: "Estimate the daily and total cost of your trip with a clear breakdown of stay, food, transport and activities." },
      { property: "og:title", content: "Trip cost estimator · Wandr" },
      { property: "og:description", content: "See exactly what your trip will cost — and how to spend less." },
    ],
    links: [{ rel: "canonical", href: "https://wandr-wisely.lovable.app/estimate" }],
  }),
  component: EstimatePage,
});

type Style = "backpacker" | "budget" | "comfort";
const styleMult: Record<Style, number> = { backpacker: 0.7, budget: 1, comfort: 1.6 };

function EstimatePage() {
  const [destSlug, setDestSlug] = useState(destinations[0].slug);
  const [days, setDays] = useState(7);
  const [travelers, setTravelers] = useState(1);
  const [style, setStyle] = useState<Style>("budget");

  const dest = getDestination(destSlug) ?? destinations[0];

  const breakdown = useMemo(() => {
    const m = styleMult[style];
    return {
      stay: Math.round(dest.costs.stay * m),
      food: Math.round(dest.costs.food * m),
      transport: Math.round(dest.costs.transport * m),
      activities: Math.round(dest.costs.activities * m),
    };
  }, [dest, style]);

  const dailyTotal = breakdown.stay + breakdown.food + breakdown.transport + breakdown.activities;
  const tripTotal = dailyTotal * days * travelers;

  const max = Math.max(breakdown.stay, breakdown.food, breakdown.transport, breakdown.activities);

  const rows: { label: string; key: keyof typeof breakdown; color: string; icon: string }[] = [
    { label: "Stay", key: "stay", color: "bg-primary", icon: "🏨" },
    { label: "Food", key: "food", color: "bg-sun", icon: "🍜" },
    { label: "Transport", key: "transport", color: "bg-sky", icon: "🚌" },
    { label: "Activities", key: "activities", color: "bg-leaf", icon: "🎟️" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <section className="bg-warm border-b border-border/60">
        <div className="mx-auto max-w-6xl px-5 py-14">
          <h1 className="font-display text-4xl md:text-5xl font-semibold mb-3 text-balance">
            How much will it really cost?
          </h1>
          <p className="text-muted-foreground max-w-xl">
            A clear, no-surprises estimate based on real backpacker and budget
            traveler spending — not airline marketing.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-12 grid lg:grid-cols-[380px_1fr] gap-8">
        {/* Inputs */}
        <div className="rounded-3xl bg-card border border-border/60 p-6 md:p-7 shadow-soft h-fit lg:sticky lg:top-24">
          <div className="flex items-center gap-2 mb-5">
            <Calculator className="h-5 w-5 text-primary" />
            <h2 className="font-display text-2xl font-semibold">Calculator</h2>
          </div>

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

          <div className="grid grid-cols-2 gap-3 mb-5">
            <label className="block">
              <span className="text-sm font-medium mb-2 block">Days</span>
              <input
                type="number"
                min={1}
                max={60}
                value={days}
                onChange={(e) => setDays(Math.max(1, Number(e.target.value) || 1))}
                className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
              />
            </label>
            <label className="block">
              <span className="text-sm font-medium mb-2 block">Travelers</span>
              <input
                type="number"
                min={1}
                max={10}
                value={travelers}
                onChange={(e) => setTravelers(Math.max(1, Number(e.target.value) || 1))}
                className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
              />
            </label>
          </div>

          <div className="block mb-2">
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
        </div>

        {/* Result */}
        <div className="space-y-6">
          {/* Total */}
          <div className="rounded-3xl bg-sunset p-7 md:p-9 text-primary-foreground shadow-warm relative overflow-hidden">
            <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-sun/40 blur-2xl" />
            <p className="relative text-sm opacity-90 mb-2">
              Total for {travelers} {travelers === 1 ? "traveler" : "travelers"} · {days} days
            </p>
            <div className="relative font-display text-6xl md:text-7xl font-semibold mb-1">
              ${tripTotal.toLocaleString()}
            </div>
            <div className="relative text-lg opacity-90 mb-2">{formatInr(tripTotal)}</div>
            <p className="relative opacity-90">
              About <span className="font-semibold">${dailyTotal}</span> ({formatInr(dailyTotal)}) per person per day in {dest.name}.
            </p>
          </div>

          {/* Breakdown */}
          <div className="rounded-3xl bg-card border border-border/60 p-6 md:p-8 shadow-soft">
            <h3 className="font-display text-2xl font-semibold mb-6">Daily breakdown</h3>
            <div className="space-y-4">
              {rows.map((r) => {
                const v = breakdown[r.key];
                const pct = max > 0 ? (v / max) * 100 : 0;
                return (
                  <div key={r.key}>
                    <div className="flex items-center justify-between mb-1.5 text-sm">
                      <span className="font-medium flex items-center gap-2">
                        <span>{r.icon}</span> {r.label}
                      </span>
                      <span className="font-semibold">${v} <span className="text-muted-foreground font-normal text-xs">· {formatInr(v)}</span></span>
                    </div>
                    <div className="h-3 rounded-full bg-secondary overflow-hidden">
                      <div
                        className={`h-full rounded-full ${r.color} transition-all duration-500`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-6 pt-6 border-t border-border/60 flex items-center justify-between">
              <span className="text-muted-foreground">Daily total per person</span>
              <div className="text-right">
                <div className="font-display text-3xl font-semibold text-primary">
                  ${dailyTotal}
                </div>
                <div className="text-xs text-muted-foreground">{formatInr(dailyTotal)}</div>
              </div>
            </div>
          </div>

          {/* Tips */}
          <div className="rounded-3xl bg-secondary/60 p-6 md:p-8">
            <div className="flex items-center gap-2 mb-4">
              <TrendingDown className="h-5 w-5 text-leaf" />
              <h3 className="font-display text-2xl font-semibold">
                Spend even less in {dest.name}
              </h3>
            </div>
            <ul className="grid md:grid-cols-2 gap-3">
              {dest.tips.map((tip, i) => (
                <li key={i} className="flex gap-3 items-start text-sm">
                  <span className="mt-0.5 h-6 w-6 rounded-full bg-leaf text-leaf-foreground grid place-items-center text-xs font-semibold shrink-0">
                    ✓
                  </span>
                  <span className="text-foreground/85">{tip}</span>
                </li>
              ))}
            </ul>
          </div>

          <p className="text-xs text-muted-foreground text-center">
            Estimates based on typical backpacker / budget traveler spending. Excludes
            international flights, visas, and travel insurance.
          </p>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
