import { createFileRoute } from "@tanstack/react-router";
import { destinations } from "@/data/destinations";
import { blogPosts } from "@/data/blog";

const SITE = "https://wandr-wisely.lovable.app";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: () => {
        const staticPaths = ["/", "/explore", "/attractions", "/plan", "/estimate", "/about", "/blog"];
        const destPaths = destinations.map((d) => `/explore?q=${encodeURIComponent(d.slug)}`);
        const blogPaths = blogPosts.map((p) => `/blog/${p.slug}`);
        const today = new Date().toISOString().split("T")[0];

        const urls = [...staticPaths, ...destPaths, ...blogPaths]
          .map(
            (p) =>
              `  <url><loc>${SITE}${p}</loc><lastmod>${today}</lastmod><changefreq>weekly</changefreq></url>`,
          )
          .join("\n");

        const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

        return new Response(xml, {
          headers: { "Content-Type": "application/xml; charset=utf-8" },
        });
      },
    },
  },
});
