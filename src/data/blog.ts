export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  keywords: string[];
  date: string;
  readMins: number;
  cover: string;
  excerpt: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "top-10-places-to-visit-in-rajasthan",
    title: "Top 10 Places to Visit in Rajasthan (2026 Guide)",
    description:
      "Discover the top 10 places to visit in Rajasthan — from Jaipur's pink palaces to Jaisalmer's golden dunes. Budget tips, itineraries & must-see attractions.",
    keywords: [
      "places to visit in Rajasthan",
      "Rajasthan tourism",
      "Jaipur travel guide",
      "Udaipur lake palace",
      "Jaisalmer desert safari",
      "Rajasthan trip plan",
      "best time to visit Rajasthan",
      "Rajasthan budget travel",
    ],
    date: "2026-05-03",
    readMins: 9,
    cover:
      "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1600&q=80",
    excerpt:
      "Forts, palaces, dunes and bazaars — here are the 10 unmissable Rajasthan destinations and exactly how to plan your trip on a budget.",
  },
];
