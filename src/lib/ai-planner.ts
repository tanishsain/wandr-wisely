// Local "AI" itinerary generator — deterministic but feels generated.
// Uses destination data + style + interests to produce a richer, varied plan.
import type { Destination } from "@/data/destinations";

export type Style = "backpacker" | "budget" | "comfort";
export type Interest = "food" | "culture" | "nature" | "nightlife" | "adventure" | "shopping";

export interface AIDay {
  title: string;
  morning: string;
  midday: string;
  afternoon: string;
  evening: string;
  hiddenGem?: string; // premium
  restaurantPick?: string; // premium
  estimatedSpend: number;
}

export interface AIItinerary {
  summary: string;
  vibe: string;
  days: AIDay[];
  packingList: string[]; // premium
  insiderTips: string[]; // premium
  totalEstimate: number;
}

const VIBES: Record<Style, string> = {
  backpacker: "low-key, hostel-hopping, street-food-fueled",
  budget: "balanced, smart-spending, local-first",
  comfort: "elevated, slow-paced, boutique-leaning",
};

const STYLE_MULT: Record<Style, number> = {
  backpacker: 0.65,
  budget: 1,
  comfort: 1.7,
};

function pick<T>(arr: T[], i: number, fb: T): T {
  return arr.length ? arr[i % arr.length] : fb;
}

function dayTitle(dest: Destination, day: number, total: number, interests: Interest[]) {
  if (day === 0) return `Arrival & first taste of ${dest.name}`;
  if (day === total - 1) return `Slow morning, last bites & farewell to ${dest.name}`;
  const themes = [
    interests.includes("culture") ? "Culture deep-dive" : null,
    interests.includes("food") ? "Eating like a local" : null,
    interests.includes("nature") ? "Out into the wild" : null,
    interests.includes("nightlife") ? "After-dark exploration" : null,
    interests.includes("adventure") ? "Adrenaline day" : null,
    interests.includes("shopping") ? "Markets & makers" : null,
    "Wandering off the map",
    "Neighborhood crawl",
  ].filter(Boolean) as string[];
  return pick(themes, day - 1, "Explore day");
}

export function generateAIItinerary(
  dest: Destination,
  days: number,
  style: Style,
  interests: Interest[],
): AIItinerary {
  const food = dest.places.filter((p) => p.category === "Food");
  const culture = dest.places.filter((p) => p.category === "Culture" || p.category === "Landmark");
  const nature = dest.places.filter((p) => p.category === "Nature" || p.category === "Adventure");

  const baseDaily =
    dest.costs.stay + dest.costs.food + dest.costs.transport + dest.costs.activities;
  const dailyCost = Math.round(baseDaily * STYLE_MULT[style]);

  const stayHint =
    style === "backpacker"
      ? "Drop bags at a social hostel"
      : style === "comfort"
        ? "Settle into a boutique stay"
        : "Check into a tidy budget guesthouse";

  const aiDays: AIDay[] = Array.from({ length: days }, (_, i) => {
    const cultureSpot = pick(culture, i, { name: "the old town", description: "" } as any);
    const foodSpot = pick(food, i, { name: "a local favorite", description: "" } as any);
    const natureSpot = pick(nature, i, { name: "a scenic viewpoint", description: "" } as any);
    const tip = pick(dest.tips, i, "Walk where you can — that's where the magic is.");

    return {
      title: dayTitle(dest, i, days, interests),
      morning:
        i === 0
          ? `${stayHint}. Coffee + pastry nearby, then a slow orientation walk.`
          : `Breakfast at a neighborhood café. Visit ${cultureSpot.name} before crowds.`,
      midday: interests.includes("food")
        ? `Long lunch at ${foodSpot.name} — order what the table next to you ordered.`
        : `Lunch at ${foodSpot.name}. Quick reset, then keep moving.`,
      afternoon: interests.includes("nature")
        ? `Head to ${natureSpot.name}. ${tip}`
        : `Wander ${cultureSpot.name} side streets, then ${natureSpot.name} for golden hour.`,
      evening:
        i === days - 1
          ? `Sunset stroll, last bites at ${pick(food, i + 1, foodSpot).name}, pack up.`
          : interests.includes("nightlife")
            ? `Dinner small + late, then a local bar where no menu is in English.`
            : `Easy dinner, evening walk through the old quarter.`,
      hiddenGem: pick(
        [
          `Skip the main square — the alley two blocks east has the same view, no crowds.`,
          `Locals eat dinner at 9pm. Show up at 7 and you'll get the best table.`,
          `The free walking tour at 10am is run by an actual historian, not a guide.`,
          `${natureSpot.name} is empty before 8am — best photos, coolest air.`,
          `Ask any taxi driver for "the place where YOU eat" — works every time.`,
        ],
        i,
        "Get lost on purpose at least once.",
      ),
      restaurantPick: `${foodSpot.name} — try the house specialty, skip the tourist menu.`,
      estimatedSpend: dailyCost + (i === 0 || i === days - 1 ? -10 : 0),
    };
  });

  const packingList = buildPackingList(dest, style, interests);
  const insiderTips = [
    ...dest.tips,
    `Carry small bills in ${dest.currency} — card minimums are common.`,
    `Download offline maps before you land. Save the saved-pin file to cloud.`,
    `Greet in the local language — even one word changes how you're treated.`,
  ];

  return {
    summary: `A ${days}-day, ${VIBES[style]} trip through ${dest.name}, tuned to ${
      interests.length ? interests.join(" + ") : "a bit of everything"
    }.`,
    vibe: VIBES[style],
    days: aiDays,
    packingList,
    insiderTips,
    totalEstimate: aiDays.reduce((s, d) => s + d.estimatedSpend, 0),
  };
}

function buildPackingList(dest: Destination, style: Style, interests: Interest[]): string[] {
  const base = [
    "Passport + 2 photocopies",
    "Universal power adapter",
    "Refillable water bottle",
    "Comfortable walking shoes",
    "Light layer for evenings",
    `Some cash in ${dest.currency}`,
    "Offline maps + key addresses saved",
  ];
  if (style === "backpacker") base.push("Quick-dry travel towel", "Padlock for hostel locker", "Earplugs");
  if (style === "comfort") base.push("Outfit for one nice dinner", "Noise-cancelling headphones");
  if (interests.includes("nature") || interests.includes("adventure"))
    base.push("Daypack", "Sunscreen + hat", "Reusable rain shell");
  if (interests.includes("nightlife")) base.push("One smart-casual outfit");
  if (interests.includes("food")) base.push("Loose pants for big meals 😅");
  return base;
}
