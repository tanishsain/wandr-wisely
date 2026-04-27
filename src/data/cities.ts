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
  "prague-czechia": [
    {
      slug: "stare-mesto",
      name: "Staré Město (Old Town)",
      hotelFromUSD: 50,
      hero: "Astronomical clock, gothic spires, and beer halls.",
      attractions: [
        { name: "Old Town Square + Astronomical Clock", type: "Landmark", blurb: "Hourly show on the hour.", free: true },
        { name: "Charles Bridge at dawn", type: "Landmark", blurb: "Empty before 7am — magic light.", free: true },
        { name: "U Fleků beer hall", type: "Food", blurb: "13th-century brewery.", priceUSD: 12 },
      ],
    },
    {
      slug: "mala-strana",
      name: "Malá Strana + Castle",
      hotelFromUSD: 60,
      hero: "Baroque palaces under Prague Castle.",
      attractions: [
        { name: "Prague Castle complex", type: "Landmark", blurb: "Largest ancient castle in the world.", priceUSD: 18 },
        { name: "John Lennon Wall", type: "Landmark", blurb: "Ever-changing graffiti tribute.", free: true },
      ],
    },
  ],
  "buenos-aires-argentina": [
    {
      slug: "palermo",
      name: "Palermo",
      hotelFromUSD: 40,
      hero: "Tree-lined parks, parrillas, and craft cocktail bars.",
      attractions: [
        { name: "Bosques de Palermo", type: "Nature", blurb: "Rose garden + paddle boats.", free: true },
        { name: "Parrilla dinner", type: "Food", blurb: "Steak + Malbec for $20.", priceUSD: 20 },
      ],
    },
    {
      slug: "san-telmo",
      name: "San Telmo",
      hotelFromUSD: 35,
      hero: "Cobblestones, tango, and Sunday antique market.",
      attractions: [
        { name: "Feria de San Telmo (Sun)", type: "Market", blurb: "Antiques + street tango.", free: true },
        { name: "Plaza Dorrego milonga", type: "Nightlife", blurb: "Watch locals dance under the lamps.", free: true },
      ],
    },
  ],
  "kyoto-japan": [
    {
      slug: "higashiyama",
      name: "Higashiyama",
      hotelFromUSD: 70,
      hero: "Wooden alleys leading up to Kiyomizu-dera.",
      attractions: [
        { name: "Kiyomizu-dera Temple", type: "Landmark", blurb: "Hillside wooden temple with city view.", priceUSD: 4 },
        { name: "Sannenzaka + Ninenzaka lanes", type: "Landmark", blurb: "Edo-era streets, perfect at dusk.", free: true },
      ],
    },
    {
      slug: "arashiyama",
      name: "Arashiyama",
      hotelFromUSD: 80,
      hero: "Bamboo grove + monkey park on the outskirts.",
      attractions: [
        { name: "Arashiyama Bamboo Grove", type: "Nature", blurb: "Otherworldly green corridor.", free: true },
        { name: "Iwatayama Monkey Park", type: "Nature", blurb: "Macaques + Kyoto skyline.", priceUSD: 6 },
      ],
    },
  ],
  "cape-town-south-africa": [
    {
      slug: "city-bowl",
      name: "City Bowl",
      hotelFromUSD: 35,
      hero: "Under Table Mountain, between the harbor and Bo-Kaap.",
      attractions: [
        { name: "Table Mountain cableway", type: "Nature", blurb: "5-min ride to a 1,084m flat-top.", priceUSD: 30 },
        { name: "Bo-Kaap colored houses", type: "Landmark", blurb: "Cape Malay quarter rainbow streets.", free: true },
        { name: "V&A Waterfront", type: "Market", blurb: "Food market + harbor seals.", free: true },
      ],
    },
    {
      slug: "cape-peninsula",
      name: "Cape Peninsula",
      hotelFromUSD: 50,
      hero: "Boulders Beach penguins + Cape of Good Hope.",
      attractions: [
        { name: "Boulders Beach penguin colony", type: "Nature", blurb: "African penguins up close.", priceUSD: 12 },
        { name: "Cape Point", type: "Nature", blurb: "Dramatic clifftop where two oceans meet.", priceUSD: 22 },
      ],
    },
  ],
  "hanoi-vietnam": [
    {
      slug: "old-quarter-hanoi",
      name: "Old Quarter",
      hotelFromUSD: 18,
      hero: "36 ancient streets — each named after its trade.",
      attractions: [
        { name: "Hoan Kiem Lake + Ngoc Son Temple", type: "Landmark", blurb: "Misty lake in the city center.", priceUSD: 2 },
        { name: "Train Street", type: "Landmark", blurb: "Cafés inches from a working railway.", free: true },
        { name: "Bún chả at Huong Lien", type: "Food", blurb: "Obama ate here for $6.", priceUSD: 6 },
      ],
    },
  ],
  "rajasthan-india": [
    {
      slug: "jaipur",
      name: "Jaipur",
      hotelFromUSD: 14,
      hero: "The Pink City — palaces, bazaars, and royal heritage.",
      attractions: [
        { name: "Amber Fort", type: "Landmark", blurb: "Hilltop sandstone fort with Sheesh Mahal mirror palace.", priceUSD: 6 },
        { name: "Hawa Mahal", type: "Landmark", blurb: "953-window pink honeycomb façade.", priceUSD: 2 },
        { name: "City Palace", type: "Museum", blurb: "Royal residence + courtyards still in use.", priceUSD: 8 },
        { name: "Jantar Mantar", type: "Landmark", blurb: "UNESCO 18th-c. astronomical instruments.", priceUSD: 3 },
        { name: "Johari Bazaar", type: "Market", blurb: "Gemstones, bangles, block-print textiles.", free: true },
        { name: "Laxmi Misthan Bhandar (LMB)", type: "Food", blurb: "Legendary thali + ghewar sweets.", priceUSD: 5 },
      ],
    },
    {
      slug: "jodhpur",
      name: "Jodhpur",
      hotelFromUSD: 12,
      hero: "The Blue City under the mighty Mehrangarh Fort.",
      attractions: [
        { name: "Mehrangarh Fort", type: "Landmark", blurb: "Cliffside fort 122m above the blue old town.", priceUSD: 7 },
        { name: "Jaswant Thada", type: "Landmark", blurb: "Marble cenotaph — the 'Taj of Marwar'.", priceUSD: 1 },
        { name: "Sardar Market & Clock Tower", type: "Market", blurb: "Spices, textiles, lassi at Shri Mishrilal.", free: true },
        { name: "Umaid Bhawan Palace", type: "Museum", blurb: "Art-deco royal palace, part still a hotel.", priceUSD: 4 },
        { name: "Step Well (Toorji Ka Jhalra)", type: "Landmark", blurb: "Restored 18th-c. step well in the old city.", free: true },
      ],
    },
    {
      slug: "jaisalmer",
      name: "Jaisalmer",
      hotelFromUSD: 11,
      hero: "Golden sandstone fort city on the edge of the Thar desert.",
      attractions: [
        { name: "Jaisalmer Fort (Sonar Quila)", type: "Landmark", blurb: "Living fort — shops, homes, havelis inside.", free: true },
        { name: "Patwon Ki Haveli", type: "Landmark", blurb: "Cluster of 5 ornate merchant mansions.", priceUSD: 3 },
        { name: "Sam Sand Dunes camel safari", type: "Adventure", blurb: "Sunset ride + overnight desert camp.", priceUSD: 25 },
        { name: "Gadisar Lake", type: "Nature", blurb: "Boat at golden hour beside ghats and temples.", free: true },
        { name: "Bada Bagh cenotaphs", type: "Landmark", blurb: "Royal tombs in a desert garden.", priceUSD: 1 },
      ],
    },
    {
      slug: "udaipur",
      name: "Udaipur",
      hotelFromUSD: 15,
      hero: "City of Lakes — marble palaces, ghats, and sunset boat rides.",
      attractions: [
        { name: "City Palace & Lake Pichola boat", type: "Landmark", blurb: "Largest royal complex in Rajasthan + sunset boat.", priceUSD: 10 },
        { name: "Jag Mandir", type: "Landmark", blurb: "Island palace where Shah Jahan once stayed.", priceUSD: 8 },
        { name: "Sajjangarh (Monsoon Palace)", type: "Landmark", blurb: "Hilltop palace — best Udaipur sunset.", priceUSD: 3 },
        { name: "Bagore Ki Haveli evening dance", type: "Museum", blurb: "Folk + Ghoomar performance nightly.", priceUSD: 2 },
        { name: "Ambrai Ghat", type: "Nature", blurb: "Free ghat with the postcard palace view.", free: true },
      ],
    },
    {
      slug: "bikaner",
      name: "Bikaner",
      hotelFromUSD: 10,
      hero: "Camel country, Junagarh Fort, and the famed Bhujia bazaar.",
      attractions: [
        { name: "Junagarh Fort", type: "Landmark", blurb: "Unconquered 16th-c. fort with painted halls.", priceUSD: 4 },
        { name: "Karni Mata Temple (Deshnoke)", type: "Landmark", blurb: "The famous 'rat temple' 30km out.", free: true },
        { name: "National Camel Research Centre", type: "Nature", blurb: "Camel breeds + camel-milk ice cream.", priceUSD: 1 },
        { name: "Old City haveli walk", type: "Landmark", blurb: "Red-sandstone merchant mansions.", free: true },
        { name: "Bhujia & sweets at KEM Road", type: "Food", blurb: "Bikaneri bhujia + rasgulla heaven.", priceUSD: 3 },
      ],
    },
    {
      slug: "sri-ganganagar",
      name: "Sri Ganganagar",
      hotelFromUSD: 9,
      hero: "Rajasthan's wheat & citrus belt near the Punjab border — kinnow capital of India.",
      attractions: [
        { name: "Anupgarh Fort", type: "Landmark", blurb: "Crumbling 17th-c. fort an hour west.", free: true },
        { name: "Hindumalkot border", type: "Landmark", blurb: "India–Pakistan border post — permit needed.", free: true },
        { name: "Laila-Majnu Mazaar (Anupgarh)", type: "Landmark", blurb: "Folk pilgrimage shrine of the legendary lovers.", free: true },
        { name: "Gurudwara Buddha Johad", type: "Landmark", blurb: "Historic Sikh shrine in Rawatsar nearby.", free: true },
        { name: "Kinnow orchards (winter)", type: "Nature", blurb: "Citrus groves stretching to the horizon Dec–Feb.", free: true },
        { name: "Local kulfi & chaat at Bhagat Singh Chowk", type: "Food", blurb: "Cheap, famous street eats.", priceUSD: 2 },
      ],
    },
    {
      slug: "pushkar",
      name: "Pushkar",
      hotelFromUSD: 10,
      hero: "Sacred lake, ghats, and the world-famous camel fair.",
      attractions: [
        { name: "Pushkar Lake & ghats", type: "Landmark", blurb: "52 bathing ghats around a holy lake.", free: true },
        { name: "Brahma Temple", type: "Landmark", blurb: "One of the few Brahma temples in the world.", free: true },
        { name: "Pushkar Camel Fair (Nov)", type: "Market", blurb: "Iconic 5-day livestock + culture fair.", free: true },
        { name: "Savitri Temple sunrise hike", type: "Adventure", blurb: "Hilltop temple — best dawn view.", free: true },
      ],
    },
    {
      slug: "ajmer",
      name: "Ajmer",
      hotelFromUSD: 11,
      hero: "Sufi pilgrimage city around the revered Dargah Sharif.",
      attractions: [
        { name: "Ajmer Sharif Dargah", type: "Landmark", blurb: "Shrine of Khwaja Moinuddin Chishti.", free: true },
        { name: "Ana Sagar Lake", type: "Nature", blurb: "12th-c. lake with marble pavilions.", free: true },
        { name: "Taragarh Fort", type: "Landmark", blurb: "Hilltop fort with city panorama.", free: true },
      ],
    },
    {
      slug: "mount-abu",
      name: "Mount Abu",
      hotelFromUSD: 13,
      hero: "Rajasthan's only hill station — cool air and Jain marble temples.",
      attractions: [
        { name: "Dilwara Jain Temples", type: "Landmark", blurb: "Astonishing 11th-c. white-marble carvings.", free: true },
        { name: "Nakki Lake", type: "Nature", blurb: "Pedal-boat the legend-soaked crater lake.", priceUSD: 2 },
        { name: "Sunset Point", type: "Nature", blurb: "Aravalli sunset over the plains.", free: true },
        { name: "Guru Shikhar", type: "Adventure", blurb: "Highest peak in the Aravalli range (1722m).", free: true },
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
