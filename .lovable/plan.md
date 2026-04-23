
# Wandr — Budget Travel Companion

A warm, friendly travel discovery app powered by AI that helps people find famous places to visit anywhere in the world and plan trips on a tight budget.

## What gets built

**Pages (separate routes for SEO + clean nav)**
- `/` — Home: hero with destination search bar, popular destination chips (Paris, Tokyo, Bali, Istanbul…), "How it works" trio, friendly CTA
- `/explore` — Results page: enter any country/city → AI returns top famous places with short descriptions, best time to visit, and a "must-see" badge
- `/plan` — Budget Trip Planner: form (destination, days, budget in any currency, travel style: backpacker / budget / comfort) → AI generates a day-by-day itinerary with cheap stays, local food picks, transport tips, and free activities
- `/estimate` — Cost Estimator: pick destination + days → AI returns a daily breakdown (stay / food / transport / activities) with total + money-saving tips
- `/about` — Short page about the mission

## Core features

1. **Destination search + top places** — AI returns 8–12 famous spots with description, category (landmark/nature/food/culture), and a one-line "why visit"
2. **Budget trip planner** — Day-by-day plan optimized for the user's budget with hostel/guesthouse suggestions, local cheap eats, public-transport routes, and free attractions
3. **Cost estimator** — Realistic daily cost breakdown by category + total trip cost + 3–5 personalized money-saving tips
4. **Recent searches** stored in localStorage so people can revisit suggestions without re-querying

## How it works (technical, lightly)

- Lovable Cloud enabled for the AI edge function
- One edge function `travel-ai` that handles all three modes (places / itinerary / estimate) using Lovable AI (`google/gemini-3-flash-preview`) with structured tool-calling output so results render as nice cards, not raw text
- Loading skeletons + friendly error states (rate limit, no credits) shown as toasts
- Results cached client-side per query to keep things snappy and reduce cost

## Visual design — "Warm Sunset"

Chosen for its proven psychological effect: warm tones (coral, peach, soft yellow) trigger optimism, comfort, and longer dwell time — perfect for daydreaming about travel.

- **Palette**: coral primary `#FF7A59`, peach `#FFB28A`, soft butter yellow `#FFD munsell`, cream background `#FFF7F0`, deep plum text `#3D2C2E` for high readability
- **Typography**: rounded, friendly headings (e.g. Fraunces or Quicksand) + clean sans body (Inter) — feels human, not corporate
- **UI feel**: generous whitespace, large rounded cards (radius 1rem+), soft shadows, gentle hover lifts, subtle gradient washes behind hero sections, sun/horizon decorative SVG accents
- **Micro-interactions**: smooth fade-ins on results, animated number counters on cost estimates, gentle skeleton loaders shaped like postcards
- **Mobile-first** responsive layout — most travel browsing happens on phones

## What's intentionally NOT in v1

- User accounts, saved trips, sharing (can add later)
- Real-time prices / booking integrations
- Maps (kept out for simplicity; can add Mapbox later)
