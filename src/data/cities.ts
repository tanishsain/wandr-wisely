// Cities + attractions catalog, indexed by destination slug.
// Keeps destinations.ts unchanged — opt-in extra layer of detail.

export type Attraction = {
  name: string;
  type: "Landmark" | "Nature" | "Museum" | "Food" | "Nightlife" | "Adventure" | "Market";
  blurb: string;
  free?: boolean;
  // Average ticket / entry price in USD (0 = free)
  priceUSD?: number;
};

export type City = {
  slug: string;
  name: string;
  // Approx. nightly hotel from-price in USD (used as affiliate hook)
  hotelFromUSD: number;
  hero: string; // short tagline
  attractions: Attraction[];
};

// Map: destination slug -> cities[]
export const citiesByDestination: Record<string, City[]> = {
  "bali-indonesia": [
    {
      slug: "ubud",
      name: "Ubud",
      hotelFromUSD: 18,
      hero: "Spiritual heart of Bali — yoga, jungle, and rice terraces.",
      attractions: [
        { name: "Sacred Monkey Forest", type: "Nature", blurb: "Banyan-shaded sanctuary in the middle of town.", priceUSD: 6 },
        { name: "Tegallalang Rice Terraces", type: "Nature", blurb: "Postcard paddies — go before 9am.", free: true },
        { name: "Ubud Art Market", type: "Market", blurb: "Sarongs, baskets, and silver — bargain hard.", free: true },
        { name: "Tirta Empul Temple", type: "Landmark", blurb: "Holy spring purification ritual.", priceUSD: 5 },
      ],
    },
    {
      slug: "canggu",
      name: "Canggu",
      hotelFromUSD: 22,
      hero: "Surf, smoothie bowls, and digital-nomad cafés.",
      attractions: [
        { name: "Echo Beach", type: "Nature", blurb: "Sunset surf spot — board rentals $5/hr.", free: true },
        { name: "Tanah Lot at sunset", type: "Landmark", blurb: "Sea-temple silhouette during golden hour.", priceUSD: 4 },
        { name: "Old Man's beach bar", type: "Nightlife", blurb: "Sunday party institution.", free: true },
      ],
    },
    {
      slug: "uluwatu",
      name: "Uluwatu",
      hotelFromUSD: 28,
      hero: "Cliffside temples and world-class waves.",
      attractions: [
        { name: "Uluwatu Temple + Kecak Dance", type: "Landmark", blurb: "Cliff temple with sunset fire dance.", priceUSD: 10 },
        { name: "Padang Padang Beach", type: "Nature", blurb: "Hidden cove through a rock crevice.", priceUSD: 1 },
        { name: "Single Fin (Sunday sessions)", type: "Nightlife", blurb: "Sunset DJ + 100m of cliff view.", free: true },
      ],
    },
  ],
  "bangkok-thailand": [
    {
      slug: "bangkok-old-town",
      name: "Old Town (Rattanakosin)",
      hotelFromUSD: 16,
      hero: "Royal palaces, ancient temples, and Khao San chaos.",
      attractions: [
        { name: "Grand Palace & Wat Phra Kaew", type: "Landmark", blurb: "Royal complex of dazzling spires.", priceUSD: 15 },
        { name: "Wat Pho (Reclining Buddha)", type: "Landmark", blurb: "46m gold reclining Buddha.", priceUSD: 6 },
        { name: "Khao San Road", type: "Nightlife", blurb: "Backpacker legend — pad thai + cheap beers.", free: true },
      ],
    },
    {
      slug: "sukhumvit",
      name: "Sukhumvit",
      hotelFromUSD: 24,
      hero: "Skytrains, rooftop bars, and shopping malls.",
      attractions: [
        { name: "Chatuchak Weekend Market", type: "Market", blurb: "15,000 stalls — go hungry.", free: true },
        { name: "Terminal 21 food court", type: "Food", blurb: "Cheap regional Thai dishes by the airport-themed mall.", priceUSD: 3 },
        { name: "Lumpini Park", type: "Nature", blurb: "Free tai chi at dawn, monitor lizards by day.", free: true },
      ],
    },
    {
      slug: "chinatown-bangkok",
      name: "Chinatown (Yaowarat)",
      hotelFromUSD: 18,
      hero: "Neon-lit street food capital.",
      attractions: [
        { name: "Yaowarat night market", type: "Food", blurb: "Oyster omelets, dim sum, mango sticky rice.", free: true },
        { name: "Wat Traimit (Golden Buddha)", type: "Landmark", blurb: "5.5 tonnes of solid gold.", priceUSD: 3 },
      ],
    },
  ],
  "lisbon-portugal": [
    {
      slug: "alfama",
      name: "Alfama",
      hotelFromUSD: 55,
      hero: "Tile-clad alleyways, Fado, and viewpoints.",
      attractions: [
        { name: "Castelo de São Jorge", type: "Landmark", blurb: "Hilltop Moorish castle with city panorama.", priceUSD: 15 },
        { name: "Miradouro da Senhora do Monte", type: "Nature", blurb: "Best free sunset view in Lisbon.", free: true },
        { name: "Tram 28 ride", type: "Landmark", blurb: "Yellow tram through the old quarter.", priceUSD: 4 },
      ],
    },
    {
      slug: "belem",
      name: "Belém",
      hotelFromUSD: 60,
      hero: "Maritime monuments and the original pastel de nata.",
      attractions: [
        { name: "Jerónimos Monastery", type: "Landmark", blurb: "UNESCO Manueline masterpiece.", priceUSD: 12 },
        { name: "Pastéis de Belém", type: "Food", blurb: "The original 1837 recipe.", priceUSD: 2 },
        { name: "Torre de Belém", type: "Landmark", blurb: "Riverfront 16th-century tower.", priceUSD: 8 },
      ],
    },
  ],
  "tokyo-japan": [
    {
      slug: "shibuya",
      name: "Shibuya",
      hotelFromUSD: 70,
      hero: "Neon, scramble crossings, and shopping.",
      attractions: [
        { name: "Shibuya Scramble", type: "Landmark", blurb: "World's busiest intersection.", free: true },
        { name: "Meiji Shrine", type: "Landmark", blurb: "Forested shrine in the middle of the city.", free: true },
        { name: "Yokocho alley izakayas", type: "Food", blurb: "Tiny bars under the tracks.", priceUSD: 15 },
      ],
    },
    {
      slug: "asakusa",
      name: "Asakusa",
      hotelFromUSD: 50,
      hero: "Old Tokyo: temples, rickshaws, and senbei.",
      attractions: [
        { name: "Sensō-ji Temple", type: "Landmark", blurb: "Tokyo's oldest temple, Nakamise food street.", free: true },
        { name: "Tokyo Skytree", type: "Landmark", blurb: "634m tower with viewing deck.", priceUSD: 22 },
      ],
    },
    {
      slug: "shinjuku",
      name: "Shinjuku",
      hotelFromUSD: 65,
      hero: "Skyscraper district + Golden Gai bars.",
      attractions: [
        { name: "Tokyo Metropolitan Building obs deck", type: "Landmark", blurb: "Free 202m view.", free: true },
        { name: "Golden Gai", type: "Nightlife", blurb: "200 micro-bars in 6 alleyways.", priceUSD: 10 },
        { name: "Shinjuku Gyoen", type: "Nature", blurb: "Best cherry blossom park in the city.", priceUSD: 4 },
      ],
    },
  ],
  "mexico-city-mexico": [
    {
      slug: "centro-historico-mx",
      name: "Centro Histórico",
      hotelFromUSD: 35,
      hero: "Aztec ruins under colonial cathedrals.",
      attractions: [
        { name: "Zócalo & Catedral Metropolitana", type: "Landmark", blurb: "Vast main square + sinking baroque cathedral.", free: true },
        { name: "Templo Mayor", type: "Landmark", blurb: "Aztec ruins downtown.", priceUSD: 5 },
        { name: "Palacio de Bellas Artes", type: "Museum", blurb: "Murals by Rivera + Orozco.", priceUSD: 4 },
      ],
    },
    {
      slug: "roma-condesa",
      name: "Roma + Condesa",
      hotelFromUSD: 50,
      hero: "Tree-lined streets, taquerias, and nightlife.",
      attractions: [
        { name: "Mercado Roma", type: "Food", blurb: "Gourmet food hall.", priceUSD: 8 },
        { name: "Parque México", type: "Nature", blurb: "Art-deco park with weekend salsa.", free: true },
        { name: "Tacos al pastor crawl", type: "Food", blurb: "Hop 4 places for $10 total.", priceUSD: 10 },
      ],
    },
    {
      slug: "coyoacan",
      name: "Coyoacán",
      hotelFromUSD: 40,
      hero: "Frida Kahlo's bohemian neighborhood.",
      attractions: [
        { name: "Casa Azul (Frida Kahlo Museum)", type: "Museum", blurb: "Book ahead — sells out daily.", priceUSD: 14 },
        { name: "Mercado de Coyoacán", type: "Market", blurb: "Tostadas + craft stalls.", priceUSD: 5 },
      ],
    },
  ],
  "istanbul-turkey": [
    {
      slug: "sultanahmet",
      name: "Sultanahmet",
      hotelFromUSD: 30,
      hero: "Byzantine + Ottoman wonders side by side.",
      attractions: [
        { name: "Hagia Sophia", type: "Landmark", blurb: "1500-year basilica turned mosque.", free: true },
        { name: "Blue Mosque", type: "Landmark", blurb: "Six-minaret Ottoman icon.", free: true },
        { name: "Basilica Cistern", type: "Landmark", blurb: "Underground forest of columns.", priceUSD: 25 },
      ],
    },
    {
      slug: "beyoglu",
      name: "Beyoğlu",
      hotelFromUSD: 35,
      hero: "Galata Tower, meyhanes, and Istiklal energy.",
      attractions: [
        { name: "Galata Tower", type: "Landmark", blurb: "Genoese tower with skyline view.", priceUSD: 30 },
        { name: "Istiklal Avenue + tram", type: "Landmark", blurb: "Pedestrian boulevard heart of new town.", free: true },
        { name: "Karaköy meyhane crawl", type: "Food", blurb: "Mezes + raki by the Bosphorus.", priceUSD: 20 },
      ],
    },
  ],
  "marrakech-morocco": [
    {
      slug: "medina-marrakech",
      name: "Medina",
      hotelFromUSD: 30,
      hero: "Souks, riads, and the legendary Jemaa el-Fnaa.",
      attractions: [
        { name: "Jemaa el-Fnaa at night", type: "Market", blurb: "Snake charmers, food carts, music.", free: true },
        { name: "Bahia Palace", type: "Landmark", blurb: "Carved cedar + tile masterpiece.", priceUSD: 7 },
        { name: "Souk shopping", type: "Market", blurb: "Spices, lanterns, leather — haggle hard.", free: true },
      ],
    },
    {
      slug: "gueliz",
      name: "Gueliz",
      hotelFromUSD: 45,
      hero: "Modern Marrakech: cafés, galleries, Jardin Majorelle.",
      attractions: [
        { name: "Jardin Majorelle + YSL Museum", type: "Nature", blurb: "Cobalt-blue garden oasis.", priceUSD: 18 },
        { name: "Gueliz café-hop", type: "Food", blurb: "Mint tea + pastries.", priceUSD: 8 },
      ],
    },
  ],
  "rio-de-janeiro-brazil": [
    {
      slug: "copacabana-ipanema",
      name: "Copacabana + Ipanema",
      hotelFromUSD: 45,
      hero: "World-famous beaches and beach-bar life.",
      attractions: [
        { name: "Ipanema Beach sunset", type: "Nature", blurb: "Locals applaud the sun every evening.", free: true },
        { name: "Sugarloaf Mountain cable car", type: "Landmark", blurb: "Two-stage glass cable car.", priceUSD: 30 },
      ],
    },
    {
      slug: "santa-teresa-lapa",
      name: "Santa Teresa + Lapa",
      hotelFromUSD: 35,
      hero: "Bohemian hilltop + samba nightlife below.",
      attractions: [
        { name: "Selarón Steps", type: "Landmark", blurb: "Tiled rainbow staircase.", free: true },
        { name: "Lapa samba clubs", type: "Nightlife", blurb: "Live samba on Fri/Sat nights.", priceUSD: 12 },
      ],
    },
    {
      slug: "corcovado",
      name: "Corcovado",
      hotelFromUSD: 40,
      hero: "Christ the Redeemer + Tijuca Forest.",
      attractions: [
        { name: "Christ the Redeemer", type: "Landmark", blurb: "Take the cog train up.", priceUSD: 28 },
        { name: "Tijuca Forest hike", type: "Nature", blurb: "Largest urban rainforest on earth.", free: true },
      ],
    },
  ],
};

export function citiesFor(destinationSlug: string): City[] {
  return citiesByDestination[destinationSlug] ?? [];
}

export function allCities(): { destinationSlug: string; city: City }[] {
  return Object.entries(citiesByDestination).flatMap(([destinationSlug, list]) =>
    (list ?? []).map((city) => ({ destinationSlug, city })),
  );
}
