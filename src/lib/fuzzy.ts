// Lightweight fuzzy matching + alias normalisation for Indian place names.
// No external deps — runs on client and server.

// Common misspellings / Hindi transliterations -> canonical English name.
// Keys are normalised (lowercase, no spaces/punct).
const ALIASES: Record<string, string> = {
  // Rajasthan
  sriganganagar: "Sri Ganganagar",
  shriganganagar: "Sri Ganganagar",
  ganganagar: "Sri Ganganagar",
  hanumangarh: "Hanumangarh",
  suratgarh: "Suratgarh",
  anupgarh: "Anupgarh",
  raisinghnagar: "Raisinghnagar",
  jaipur: "Jaipur",
  jaypur: "Jaipur",
  jodhpur: "Jodhpur",
  jodpur: "Jodhpur",
  jaisalmer: "Jaisalmer",
  jaisalmir: "Jaisalmer",
  bikaner: "Bikaner",
  udaipur: "Udaipur",
  udipur: "Udaipur",
  ajmer: "Ajmer",
  pushkar: "Pushkar",
  mountabu: "Mount Abu",

  // Other popular
  newdelhi: "New Delhi",
  delhi: "Delhi",
  bombay: "Mumbai",
  mumbai: "Mumbai",
  bangalore: "Bengaluru",
  bengaluru: "Bengaluru",
  calcutta: "Kolkata",
  kolkata: "Kolkata",
  madras: "Chennai",
  chennai: "Chennai",
  benaras: "Varanasi",
  banaras: "Varanasi",
  varanasi: "Varanasi",
  cochin: "Kochi",
  kochi: "Kochi",
  trivandrum: "Thiruvananthapuram",
  pondicherry: "Puducherry",
  hampi: "Hampi",
  goa: "Goa",
  kerala: "Kerala",
  rajasthan: "Rajasthan",

  // Hindi (Devanagari) -> English
  "जयपुर": "Jaipur",
  "जोधपुर": "Jodhpur",
  "जैसलमेर": "Jaisalmer",
  "बीकानेर": "Bikaner",
  "उदयपुर": "Udaipur",
  "श्रीगंगानगर": "Sri Ganganagar",
  "गंगानगर": "Sri Ganganagar",
  "हनुमानगढ़": "Hanumangarh",
  "दिल्ली": "Delhi",
  "मुंबई": "Mumbai",
  "बेंगलुरु": "Bengaluru",
  "कोलकाता": "Kolkata",
  "चेन्नई": "Chennai",
  "वाराणसी": "Varanasi",
  "गोवा": "Goa",
  "केरल": "Kerala",
  "राजस्थान": "Rajasthan",
};

export function normalize(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\p{L}\p{N}]+/gu, "");
}

export function resolveAlias(query: string): string {
  const key = normalize(query);
  return ALIASES[key] ?? query;
}

export function aliasSuggestions(prefix: string, limit = 6): string[] {
  const p = normalize(prefix);
  if (!p) return [];
  const out = new Set<string>();
  for (const [k, v] of Object.entries(ALIASES)) {
    if (k.startsWith(p) || normalize(v).startsWith(p)) out.add(v);
    if (out.size >= limit) break;
  }
  return [...out];
}

// Damerau-Levenshtein distance (handles transpositions like "jodpur" vs "jodhpur").
export function editDistance(a: string, b: string): number {
  if (a === b) return 0;
  const al = a.length;
  const bl = b.length;
  if (!al) return bl;
  if (!bl) return al;
  const dp: number[][] = Array.from({ length: al + 1 }, () => new Array(bl + 1).fill(0));
  for (let i = 0; i <= al; i++) dp[i][0] = i;
  for (let j = 0; j <= bl; j++) dp[0][j] = j;
  for (let i = 1; i <= al; i++) {
    for (let j = 1; j <= bl; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      dp[i][j] = Math.min(dp[i - 1][j] + 1, dp[i][j - 1] + 1, dp[i - 1][j - 1] + cost);
      if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) {
        dp[i][j] = Math.min(dp[i][j], dp[i - 2][j - 2] + cost);
      }
    }
  }
  return dp[al][bl];
}

// Returns a 0..1 similarity score; tolerant of small typos and partial matches.
export function fuzzyScore(query: string, candidate: string): number {
  const q = normalize(query);
  const c = normalize(candidate);
  if (!q || !c) return 0;
  if (c === q) return 1;
  if (c.startsWith(q)) return 0.95;
  if (c.includes(q)) return 0.85;
  if (q.includes(c)) return 0.7;
  const dist = editDistance(q, c);
  const maxLen = Math.max(q.length, c.length);
  const sim = 1 - dist / maxLen;
  // Allow up to ~30% character difference for short words
  return sim >= 0.6 ? sim * 0.8 : 0;
}
