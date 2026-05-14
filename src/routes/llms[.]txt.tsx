import { createFileRoute } from "@tanstack/react-router";
import { blogPosts } from "@/data/blog";

export const Route = createFileRoute("/llms.txt")({
  server: {
    handlers: {
      GET: () => {
        const blogLinks = blogPosts
          .map((p) => `- [${p.title}](/blog/${p.slug}): ${p.description}`)
          .join("\n");

        const body = `# Wandr Wisely

> Friendly travel companion for curious travelers — discover famous places worldwide and plan unforgettable trips on a tight budget.

Wandr Wisely curates 25 hand-picked destinations with realistic daily costs, budget-first tips, and an AI trip planner that builds day-by-day itineraries tuned to your style and budget. Paid plans (Basic/Standard/Premium) unlock the full multi-day itinerary, packing list, insider tips and PDF export.

## Pages

- [Home](/): Discover famous places and plan trips on a budget.
- [Explore destinations](/explore): Browse 25 curated cities and countries with budget breakdowns.
- [Attractions](/attractions): Top sights filtered by city, country and category.
- [AI Trip Planner](/plan): Generate a day-by-day itinerary tuned to your style and budget.
- [Estimate cost](/estimate): Realistic daily-cost estimator for any destination.
- [About](/about): Why Wandr exists and how we curate.
- [Blog](/blog): Honest travel guides and budget tips.

## Blog posts

${blogLinks}
`;
        return new Response(body, {
          headers: { "Content-Type": "text/plain; charset=utf-8" },
        });
      },
    },
  },
});
