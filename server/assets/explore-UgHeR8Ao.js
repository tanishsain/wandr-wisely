import { M as useRouter, r as reactExports, b as isRedirect, a0 as TSS_SERVER_FUNCTION, a1 as getServerFnById, $ as createServerFn, T as jsxRuntimeExports } from "./worker-entry-CVMFMino.js";
import { d as destinations, L as Link, a as Route, g as getDestination } from "./router-C-aH7qSq.js";
import { c as createLucideIcon, S as SiteHeader, a as SiteFooter } from "./site-footer-Cu9GkHUY.js";
import { D as DestinationCard } from "./destination-card-CVrOIY2Z.js";
import { L as LoaderCircle, H as HotelAffiliateCard, a as Lightbulb } from "./hotel-affiliate-card-CxfsFOmx.js";
import { o as objectType, s as stringType } from "./types-CHm7Zrw6.js";
import { S as Search, c as citiesByDestination, a as citiesFor } from "./cities-B2BqSztH.js";
import { S as Sparkles } from "./sparkles-CVG9Vr0A.js";
import { M as MapPin } from "./map-pin-CZEMfQ_2.js";
import { A as ArrowRight, C as Clock } from "./clock-DVsMz_YE.js";
import { E as Earth, S as Star } from "./star-sBKfvAVq.js";
import { f as formatInr } from "./currency--B8lzbTJ.js";
import "node:events";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
import "./affiliate-2eYY1u5Q.js";
function useServerFn(serverFn) {
  const router = useRouter();
  return reactExports.useCallback(async (...args) => {
    try {
      const res = await serverFn(...args);
      if (isRedirect(res)) throw res;
      return res;
    } catch (err) {
      if (isRedirect(err)) {
        err.options._fromLocation = router.stores.location.get();
        return router.navigate(router.resolveRedirect(err).options);
      }
      throw err;
    }
  }, [router, serverFn]);
}
const __iconNode$4 = [
  ["path", { d: "M10 12h4", key: "a56b0p" }],
  ["path", { d: "M10 8h4", key: "1sr2af" }],
  ["path", { d: "M14 21v-3a2 2 0 0 0-4 0v3", key: "1rgiei" }],
  [
    "path",
    {
      d: "M6 10H4a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-2",
      key: "secmi2"
    }
  ],
  ["path", { d: "M6 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16", key: "16ra0t" }]
];
const Building2 = createLucideIcon("building-2", __iconNode$4);
const __iconNode$3 = [
  ["line", { x1: "12", x2: "12", y1: "2", y2: "22", key: "7eqyqh" }],
  ["path", { d: "M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6", key: "1b0p4s" }]
];
const DollarSign = createLucideIcon("dollar-sign", __iconNode$3);
const __iconNode$2 = [
  ["path", { d: "M12 19v3", key: "npa21l" }],
  ["path", { d: "M15 9.34V5a3 3 0 0 0-5.68-1.33", key: "1gzdoj" }],
  ["path", { d: "M16.95 16.95A7 7 0 0 1 5 12v-2", key: "cqa7eg" }],
  ["path", { d: "M18.89 13.23A7 7 0 0 0 19 12v-2", key: "16hl24" }],
  ["path", { d: "m2 2 20 20", key: "1ooewy" }],
  ["path", { d: "M9 9v3a3 3 0 0 0 5.12 2.12", key: "r2i35w" }]
];
const MicOff = createLucideIcon("mic-off", __iconNode$2);
const __iconNode$1 = [
  ["path", { d: "M12 19v3", key: "npa21l" }],
  ["path", { d: "M19 10v2a7 7 0 0 1-14 0v-2", key: "1vc78b" }],
  ["rect", { x: "9", y: "2", width: "6", height: "13", rx: "3", key: "s6n7sd" }]
];
const Mic = createLucideIcon("mic", __iconNode$1);
const __iconNode = [
  [
    "path",
    {
      d: "M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z",
      key: "vktsd0"
    }
  ],
  ["circle", { cx: "7.5", cy: "7.5", r: ".5", fill: "currentColor", key: "kqv944" }]
];
const Tag = createLucideIcon("tag", __iconNode);
var createSsrRpc = (functionId) => {
  const url = "/_serverFn/" + functionId;
  const serverFnMeta = { id: functionId };
  const fn = async (...args) => {
    return (await getServerFnById(functionId))(...args);
  };
  return Object.assign(fn, {
    url,
    serverFnMeta,
    [TSS_SERVER_FUNCTION]: true
  });
};
const searchIndianCity = createServerFn({
  method: "GET"
}).inputValidator(objectType({
  query: stringType().min(1).max(100)
}).parse).handler(createSsrRpc("d8fbd25ade938994a2d4afd161eeda3f9f5ee4ea67b5926a626400851f88df64"));
const searchIndiaPlaces = createServerFn({
  method: "GET"
}).inputValidator(objectType({
  query: stringType().min(1).max(120)
}).parse).handler(createSsrRpc("032a844bc5fdb6404134046a5a0dcf3efc2460432d2f96b33574f5fbc48fe655"));
function getRecognitionCtor() {
  if (typeof window === "undefined") return null;
  const w = window;
  return w.SpeechRecognition ?? w.webkitSpeechRecognition ?? null;
}
const COMMAND_PATTERNS = [
  /^\s*(please\s+)?(show\s+me|find\s+me|search\s+(for\s+)?|look\s+up|tell\s+me\s+about|take\s+me\s+to)\s+/i,
  /^\s*(places|tourist\s+(spots?|places?|attractions?)|attractions?|hotels?|things\s+to\s+do|sights?)\s+(in|near|around|at)\s+/i,
  /^\s*(plan\s+(a\s+)?trip|trip|travel|visit|go)\s+(to|in|for)\s+/i,
  /^\s*(in|near|around|at)\s+/i,
  // Hinglish/Hindi prefixes
  /^\s*(mujhe|hume|humein)\s+/i,
  /\s+(ke\s+(paas|pass|aas\s*paas)|me|mein|main)\s*$/i,
  /\s+(dikhao|batao|jana\s+hai|chalna\s+hai)\s*$/i
];
function extractLocation(raw) {
  let q = raw.trim().replace(/[?.!]+$/g, "");
  for (const re of COMMAND_PATTERNS) q = q.replace(re, "");
  return q.trim();
}
const LANG_CYCLE = ["en-IN", "hi-IN", "en-US"];
const LANG_LABEL = {
  "en-IN": "EN",
  "hi-IN": "हिं",
  "en-US": "EN"
};
function VoiceSearchButton({ onResult, disabled }) {
  const [supported, setSupported] = reactExports.useState(true);
  const [state, setState] = reactExports.useState(
    "idle"
  );
  const [transcript, setTranscript] = reactExports.useState("");
  const [errorMsg, setErrorMsg] = reactExports.useState(null);
  const [langIdx, setLangIdx] = reactExports.useState(0);
  const recogRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    setSupported(getRecognitionCtor() !== null);
    return () => {
      try {
        recogRef.current?.abort();
      } catch {
      }
    };
  }, []);
  async function start() {
    if (state === "listening" || state === "requesting") {
      try {
        recogRef.current?.abort();
      } catch {
      }
      recogRef.current = null;
      setTranscript("");
      setErrorMsg(null);
      setState("idle");
      return;
    }
    const Ctor = getRecognitionCtor();
    if (!Ctor) {
      setSupported(false);
      return;
    }
    setErrorMsg(null);
    setTranscript("");
    setState("requesting");
    try {
      if (navigator.mediaDevices?.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        stream.getTracks().forEach((t) => t.stop());
      }
    } catch {
      setState("error");
      setErrorMsg("Microphone permission denied. Enable it in your browser settings.");
      return;
    }
    const recog = new Ctor();
    recog.lang = LANG_CYCLE[langIdx];
    recog.continuous = false;
    recog.interimResults = true;
    recog.maxAlternatives = 3;
    recog.onstart = () => setState("listening");
    recog.onresult = (e) => {
      let interim = "";
      let final = "";
      for (let i = e.resultIndex; i < e.results.length; i++) {
        const r = e.results[i];
        if (r.isFinal) final += r[0].transcript;
        else interim += r[0].transcript;
      }
      setTranscript(final || interim);
      if (final) {
        setState("processing");
        const cleaned = extractLocation(final);
        if (cleaned) onResult(cleaned, final);
        setTimeout(() => setState("idle"), 600);
      }
    };
    recog.onerror = (e) => {
      setState("error");
      const map = {
        "no-speech": "Didn't catch that — try again.",
        "audio-capture": "No microphone found.",
        "not-allowed": "Microphone permission denied.",
        network: "Voice service unreachable. Check your connection."
      };
      setErrorMsg(map[e.error] ?? `Voice error: ${e.error}`);
    };
    recog.onend = () => {
      setState((s) => s === "listening" ? "idle" : s);
    };
    recogRef.current = recog;
    try {
      recog.start();
    } catch {
      setState("error");
      setErrorMsg("Could not start voice recognition.");
    }
  }
  function cycleLang(e) {
    e.stopPropagation();
    setLangIdx((i) => (i + 1) % LANG_CYCLE.length);
  }
  if (!supported) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        type: "button",
        disabled: true,
        title: "Voice search isn't supported in this browser. Try Chrome or Edge.",
        className: "px-4 py-3 rounded-full bg-secondary/60 text-muted-foreground cursor-not-allowed inline-flex items-center gap-2",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(MicOff, { className: "h-4 w-4" })
      }
    );
  }
  const listening = state === "listening" || state === "requesting";
  const lang = LANG_CYCLE[langIdx];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        onClick: start,
        disabled: disabled || state === "processing",
        "aria-pressed": listening,
        "aria-label": listening ? "Stop listening" : "Start voice search",
        title: `Voice search (${lang}) — click to ${listening ? "stop" : "speak"}`,
        className: `relative h-12 px-4 rounded-full inline-flex items-center justify-center gap-2 transition-all duration-300 active:scale-95 ${listening ? "bg-destructive text-destructive-foreground voice-glow scale-105" : "bg-gradient-to-br from-primary to-primary-glow text-primary-foreground shadow-warm hover:shadow-glow hover:-translate-y-0.5"} disabled:opacity-60 disabled:hover:translate-y-0`,
        children: [
          listening && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "voice-ring" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "voice-ring voice-ring-2" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "voice-ring voice-ring-3" })
          ] }),
          state === "processing" ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-5 w-5 animate-spin relative" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Mic, { className: `h-5 w-5 relative transition-transform ${listening ? "scale-110" : ""}` }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              onClick: cycleLang,
              role: "button",
              tabIndex: 0,
              className: "relative text-[10px] font-bold tracking-wider px-2 py-0.5 rounded-full bg-background/25 hover:bg-background/40 backdrop-blur-sm transition-colors",
              children: LANG_LABEL[lang]
            }
          )
        ]
      }
    ),
    (listening || transcript || errorMsg) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute z-30 right-0 mt-3 w-80 rounded-2xl border border-border/60 bg-card/95 backdrop-blur-xl shadow-warm p-4 text-sm animate-fade-in", children: [
      listening && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-destructive font-semibold", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "relative flex h-2.5 w-2.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute inline-flex h-full w-full rounded-full bg-destructive opacity-75 animate-ping" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "relative inline-flex rounded-full h-2.5 w-2.5 bg-destructive" })
          ] }),
          "Listening…"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-end gap-1 h-6 text-destructive", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "voice-bar" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "voice-bar" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "voice-bar" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "voice-bar" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "voice-bar" })
        ] })
      ] }),
      transcript && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-foreground/90 leading-relaxed", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-xs uppercase tracking-wider mr-1", children: "Heard" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-medium", children: [
          '"',
          transcript,
          '"'
        ] })
      ] }),
      errorMsg && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-destructive text-xs mt-2 flex items-start gap-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { "aria-hidden": true, children: "⚠" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: errorMsg })
      ] }),
      !errorMsg && !transcript && listening && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[11px] text-muted-foreground mt-2 leading-relaxed", children: [
        "Try: ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground/70", children: '"Show me places in Jaipur"' }),
        ",",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground/70", children: '"Hotels in Jodhpur"' }),
        ",",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground/70", children: '"Plan a trip to Jaisalmer"' })
      ] }),
      listening && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 pt-2 border-t border-border/40 flex items-center justify-between text-[10px] text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
          "Language: ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground/80", children: lang })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Tap mic to stop" })
      ] })
    ] })
  ] });
}
const ALIASES = {
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
  "राजस्थान": "Rajasthan"
};
function normalize(s) {
  return s.toLowerCase().normalize("NFKD").replace(/[\u0300-\u036f]/g, "").replace(/[^\p{L}\p{N}]+/gu, "");
}
function resolveAlias(query) {
  const key = normalize(query);
  return ALIASES[key] ?? query;
}
function aliasSuggestions(prefix, limit = 6) {
  const p = normalize(prefix);
  if (!p) return [];
  const out = /* @__PURE__ */ new Set();
  for (const [k, v] of Object.entries(ALIASES)) {
    if (k.startsWith(p) || normalize(v).startsWith(p)) out.add(v);
    if (out.size >= limit) break;
  }
  return [...out];
}
function editDistance(a, b) {
  if (a === b) return 0;
  const al = a.length;
  const bl = b.length;
  if (!al) return bl;
  if (!bl) return al;
  const dp = Array.from({ length: al + 1 }, () => new Array(bl + 1).fill(0));
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
function fuzzyScore(query, candidate) {
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
  return sim >= 0.6 ? sim * 0.8 : 0;
}
const indianDestinations = destinations.filter((d) => d.country === "India");
function fuzzyMatch(query, dest) {
  const q = query.trim();
  if (!q) return null;
  let score = 0;
  score += fuzzyScore(q, dest.name) * 100;
  score += fuzzyScore(q, dest.slug) * 40;
  const cities = citiesByDestination[dest.slug] ?? [];
  const matchedCities = cities.map((c) => ({ c, s: Math.max(fuzzyScore(q, c.name), fuzzyScore(q, c.slug)) })).filter((x) => x.s >= 0.6).sort((a, b) => b.s - a.s).map((x) => x.c);
  if (matchedCities.length) score += 50 + matchedCities.length * 5;
  const matchedPlaces = dest.places.map((p) => ({ p, s: fuzzyScore(q, p.name) })).filter((x) => x.s >= 0.65).sort((a, b) => b.s - a.s).map((x) => x.p);
  if (matchedPlaces.length) score += 25 + matchedPlaces.length * 3;
  if (fuzzyScore(q, dest.tagline) > 0.5) score += 5;
  if (score < 25) return null;
  return { destination: dest, matchedCities, matchedPlaces, score };
}
function buildSuggestions(prefix, limit = 8) {
  const q = prefix.trim();
  if (!q) return [];
  const out = /* @__PURE__ */ new Map();
  for (const s of aliasSuggestions(q, limit)) out.set(s, 1);
  const np = normalize(q);
  for (const d of indianDestinations) {
    if (normalize(d.name).startsWith(np)) out.set(d.name, (out.get(d.name) ?? 0) + 0.9);
    const cities = citiesByDestination[d.slug] ?? [];
    for (const c of cities) {
      if (normalize(c.name).startsWith(np)) out.set(c.name, (out.get(c.name) ?? 0) + 0.8);
      else if (normalize(c.name).includes(np) && np.length >= 3)
        out.set(c.name, (out.get(c.name) ?? 0) + 0.5);
    }
  }
  return [...out.entries()].sort((a, b) => b[1] - a[1]).slice(0, limit).map(([s]) => s);
}
function IndiaLiveSearch({ initialQuery = "" }) {
  const [query, setQuery] = reactExports.useState(initialQuery);
  const [submitted, setSubmitted] = reactExports.useState(initialQuery.trim());
  const [live, setLive] = reactExports.useState({ status: "idle" });
  const [showSuggest, setShowSuggest] = reactExports.useState(false);
  const inputRef = reactExports.useRef(null);
  const otmSearch = useServerFn(searchIndianCity);
  const nominatimSearch = useServerFn(searchIndiaPlaces);
  const suggestions = reactExports.useMemo(() => buildSuggestions(query), [query]);
  const localResults = reactExports.useMemo(() => {
    if (!submitted) return [];
    const resolved = resolveAlias(submitted);
    return indianDestinations.map((d) => fuzzyMatch(resolved, d)).filter((m) => m !== null).sort((a, b) => b.score - a.score).slice(0, 8);
  }, [submitted]);
  async function runSearch(rawQuery) {
    const q = rawQuery.trim();
    if (!q) return;
    const resolved = resolveAlias(q);
    setSubmitted(resolved);
    setQuery(resolved);
    setShowSuggest(false);
    setLive({ status: "loading" });
    const [otmRes, nomRes] = await Promise.allSettled([
      otmSearch({ data: { query: resolved } }),
      nominatimSearch({ data: { query: resolved } })
    ]);
    const otm = otmRes.status === "fulfilled" && !("error" in otmRes.value) ? otmRes.value : void 0;
    const nominatim = nomRes.status === "fulfilled" ? nomRes.value.places : [];
    if (!otm && nominatim.length === 0) {
      setLive({
        status: "error",
        message: "Live search is offline — showing curated results only."
      });
      return;
    }
    setLive({ status: "ok", otm, nominatim });
  }
  function handleSubmit(e) {
    e.preventDefault();
    runSearch(query);
  }
  reactExports.useEffect(() => {
    function onDoc(e) {
      if (!inputRef.current?.parentElement?.contains(e.target)) {
        setShowSuggest(false);
      }
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-3xl bg-card border border-border/60 p-6 md:p-8 shadow-soft", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-5 w-5 text-primary" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-2xl font-semibold", children: "Search India — states, cities, towns & villages" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mb-5", children: [
      "Powered by OpenStreetMap + OpenTripMap. Works with typos, partial names, and Hindi. Try",
      " ",
      ["Sri Ganganagar", "जयपुर", "jodpur", "Hanumangarh", "Hampi"].map((t, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => runSearch(t),
            className: "text-primary hover:underline",
            children: t
          }
        ),
        i < 4 ? ", " : "."
      ] }, t))
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "flex gap-2 mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 px-4 rounded-full border border-border bg-background focus-within:ring-2 focus-within:ring-primary/40", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "h-4 w-4 text-muted-foreground shrink-0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              ref: inputRef,
              value: query,
              onChange: (e) => {
                setQuery(e.target.value);
                setShowSuggest(true);
              },
              onFocus: () => setShowSuggest(true),
              placeholder: "Type any Indian state, city, town or village (English or हिंदी)",
              className: "flex-1 py-3 bg-transparent outline-none",
              autoComplete: "off"
            }
          )
        ] }),
        showSuggest && suggestions.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "absolute z-20 left-0 right-0 mt-2 rounded-2xl border border-border bg-card shadow-warm overflow-hidden", children: suggestions.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onMouseDown: (e) => {
              e.preventDefault();
              runSearch(s);
            },
            className: "w-full text-left px-4 py-2.5 text-sm hover:bg-secondary/60 flex items-center gap-2",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-3.5 w-3.5 text-primary" }),
              s
            ]
          }
        ) }, s)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        VoiceSearchButton,
        {
          onResult: (loc) => runSearch(loc),
          disabled: live.status === "loading"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "submit",
          disabled: live.status === "loading",
          className: "px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors disabled:opacity-60 inline-flex items-center gap-2",
          children: live.status === "loading" ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }),
            " Searching…"
          ] }) : "Search"
        }
      )
    ] }),
    !submitted && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Start typing to search across every Indian destination — even small towns." }),
    submitted && localResults.length === 0 && live.status !== "ok" && live.status !== "loading" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl bg-secondary/40 p-5 text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-medium mb-1", children: [
        "No curated match for “",
        submitted,
        "”."
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "We're checking OpenStreetMap for towns and villages too…" })
    ] }),
    localResults.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs uppercase tracking-wide text-muted-foreground", children: [
        localResults.length,
        " curated match",
        localResults.length === 1 ? "" : "es"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-4", children: localResults.map((m) => /* @__PURE__ */ jsxRuntimeExports.jsx(LocalResultCard, { match: m, query: submitted }, m.destination.slug)) })
    ] }),
    live.status === "ok" && live.otm && /* @__PURE__ */ jsxRuntimeExports.jsx(LiveResults, { data: live.otm }),
    live.status === "ok" && live.nominatim.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(NominatimResults, { places: live.nominatim }),
    live.status === "error" && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-4", children: live.message })
  ] });
}
function LocalResultCard({ match, query }) {
  const { destination: d, matchedCities, matchedPlaces } = match;
  const total = d.costs.stay + d.costs.food + d.costs.transport + d.costs.activities;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { className: "rounded-2xl bg-background border border-border/60 p-5 hover:shadow-soft transition-shadow", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3 mb-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-3xl leading-none", children: d.emoji }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h4", { className: "font-display text-xl font-semibold leading-tight", children: [
            d.name,
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground text-sm font-normal", children: [
              " · ",
              d.country
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground/75 mt-1", children: d.tagline })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right shrink-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] uppercase tracking-wide text-muted-foreground", children: "From" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-display text-lg font-semibold text-primary", children: [
          "$",
          total,
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground font-normal", children: "/day" })
        ] })
      ] })
    ] }),
    matchedCities.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] uppercase tracking-wide text-muted-foreground mb-1", children: "Cities matched" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1.5", children: matchedCities.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs px-2 py-1 rounded-full bg-primary/10 text-primary font-medium", children: c.name }, c.slug)) })
    ] }),
    matchedPlaces.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-1 mb-4", children: matchedPlaces.slice(0, 4).map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "text-sm flex items-start gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Tag, { className: "h-3.5 w-3.5 text-primary mt-0.5 shrink-0" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: p.name }),
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground text-xs", children: [
          "· ",
          p.category
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block text-xs text-foreground/70", children: p.why })
      ] })
    ] }, p.name)) }),
    matchedCities.length === 0 && matchedPlaces.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-1 mb-4", children: d.places.slice(0, 3).map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "text-sm flex items-start gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-3.5 w-3.5 text-primary mt-0.5 shrink-0" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: p.name }),
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground text-xs", children: [
          "· ",
          p.category
        ] })
      ] })
    ] }, p.name)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Link,
        {
          to: "/explore",
          search: { q: d.slug },
          className: "inline-flex items-center gap-1 px-4 py-2 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90",
          children: [
            "Explore ",
            d.name,
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-3.5 w-3.5" })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Link,
        {
          to: "/plan",
          search: { destination: d.slug },
          className: "inline-flex items-center gap-1 px-4 py-2 rounded-full bg-secondary text-foreground text-sm font-medium hover:bg-secondary/80",
          children: "Plan a trip"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        HotelAffiliateCard,
        {
          city: `${matchedCities[0]?.name ?? d.name}, India`,
          variant: "inline"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sr-only", children: query })
  ] });
}
function NominatimResults({ places }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 mt-8 pt-6 border-t border-border/60", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-baseline justify-between flex-wrap gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h4", { className: "font-display text-xl font-semibold flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Earth, { className: "h-4 w-4 text-primary" }),
        "Towns & villages from OpenStreetMap"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
        places.length,
        " found · Nominatim"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "grid sm:grid-cols-2 gap-2", children: places.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "li",
      {
        className: "text-sm px-3 py-2.5 rounded-lg bg-secondary/50 flex items-start gap-2",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-3.5 w-3.5 text-primary mt-0.5 shrink-0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-medium truncate", children: p.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground truncate", children: [
              [p.district, p.state].filter(Boolean).join(", ") || p.label,
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-1 capitalize", children: [
                "· ",
                p.kind.replace(/_/g, " ")
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              HotelAffiliateCard,
              {
                city: `${p.name}${p.state ? `, ${p.state}` : ""}, India`,
                variant: "inline"
              }
            )
          ] })
        ]
      },
      p.id
    )) })
  ] });
}
function LiveResults({ data }) {
  const withPhoto = data.attractions.filter((a) => a.preview);
  const others = data.attractions.filter((a) => !a.preview);
  if (data.attractions.length === 0) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5 mt-8 pt-6 border-t border-border/60", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-baseline justify-between flex-wrap gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h4", { className: "font-display text-xl font-semibold flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-4 w-4 text-primary" }),
        "Live attractions in ",
        data.city
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
        data.attractions.length,
        " found · OpenTripMap"
      ] })
    ] }),
    withPhoto.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid sm:grid-cols-2 lg:grid-cols-3 gap-4", children: withPhoto.map((a) => /* @__PURE__ */ jsxRuntimeExports.jsx(AttractionCard, { a }, a.xid)) }),
    others.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "grid sm:grid-cols-2 gap-2", children: others.map((a) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "li",
      {
        className: "text-sm flex items-start gap-2 px-3 py-2 rounded-lg bg-secondary/50",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-3.5 w-3.5 text-primary mt-0.5 shrink-0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: a.name }),
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground text-xs", children: [
              "· ",
              a.kind.replace(/_/g, " ")
            ] })
          ] })
        ]
      },
      a.xid
    )) })
  ] });
}
function AttractionCard({ a }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { className: "rounded-2xl overflow-hidden bg-background border border-border/60 hover:shadow-soft transition-shadow flex flex-col", children: [
    a.preview && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "img",
      {
        src: a.preview,
        alt: a.name,
        loading: "lazy",
        className: "w-full h-40 object-cover"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 flex-1 flex flex-col", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2 mb-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h6", { className: "font-display font-semibold leading-tight", children: a.name }),
        typeof a.rate === "number" && a.rate > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs inline-flex items-center gap-0.5 text-primary shrink-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "h-3 w-3 fill-current" }),
          a.rate
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground capitalize mb-2", children: a.kind.replace(/_/g, " ") }),
      a.wikipedia_extracts && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground/80 line-clamp-3", children: a.wikipedia_extracts })
    ] })
  ] });
}
const categoryTint = {
  Landmark: "bg-sun/30 text-foreground",
  Nature: "bg-leaf/20 text-foreground",
  Food: "bg-primary/15 text-primary",
  Culture: "bg-accent/40 text-foreground",
  Adventure: "bg-sky/30 text-foreground"
};
function ExplorePage() {
  const {
    q
  } = Route.useSearch();
  const navigate = Route.useNavigate();
  const [input, setInput] = reactExports.useState(q);
  const selected = reactExports.useMemo(() => {
    if (!q) return void 0;
    const direct = getDestination(q);
    if (direct) return direct;
    const lower = q.toLowerCase();
    return destinations.find((d) => d.name.toLowerCase().includes(lower) || d.country.toLowerCase().includes(lower) || d.slug.includes(lower));
  }, [q]);
  const filtered = reactExports.useMemo(() => {
    if (!q || selected) return destinations;
    const lower = q.toLowerCase();
    return destinations.filter((d) => d.name.toLowerCase().includes(lower) || d.country.toLowerCase().includes(lower) || d.region.toLowerCase().includes(lower));
  }, [q, selected]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SiteHeader, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-warm border-b border-border/60", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-6xl px-5 py-14", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-4xl md:text-5xl font-semibold mb-3 text-balance", children: "Where to next?" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-8 max-w-xl", children: "Search a city, country, or just browse the lot. All 25 destinations below have been picked for being beautiful, beloved, and budget-friendly." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: (e) => {
        e.preventDefault();
        navigate({
          search: {
            q: input.trim()
          }
        });
      }, className: "max-w-xl flex items-center gap-2 p-2 bg-card rounded-full border border-border shadow-soft", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 flex items-center gap-3 pl-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "h-5 w-5 text-muted-foreground shrink-0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: input, onChange: (e) => setInput(e.target.value), placeholder: "Try ‘Tokyo’, ‘Italy’, or ‘Asia’…", className: "flex-1 bg-transparent py-3 outline-none placeholder:text-muted-foreground" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", className: "px-5 py-3 rounded-full bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors", children: "Search" }),
        q && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => {
          setInput("");
          navigate({
            search: {
              q: ""
            }
          });
        }, className: "px-4 py-3 rounded-full text-sm text-muted-foreground hover:text-foreground", children: "Clear" })
      ] })
    ] }) }),
    selected ? /* @__PURE__ */ jsxRuntimeExports.jsx(DestinationDetail, { dest: selected }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mx-auto max-w-6xl px-5 py-12 space-y-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(IndiaLiveSearch, { initialQuery: q }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: q ? `${filtered.length} matching curated destination${filtered.length === 1 ? "" : "s"}` : `Browsing all ${filtered.length} curated destinations` }),
      filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-20", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-6xl mb-4", children: "🤷" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground mb-4", children: [
          'No matches for "',
          q,
          '" yet. Try one of our curated picks below.'
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => navigate({
          search: {
            q: ""
          }
        }), className: "text-primary font-medium hover:underline", children: "Show all destinations" })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid sm:grid-cols-2 lg:grid-cols-3 gap-5", children: filtered.map((d) => /* @__PURE__ */ jsxRuntimeExports.jsx(DestinationCard, { dest: d }, d.slug)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(SiteFooter, {})
  ] });
}
function DestinationDetail({
  dest
}) {
  const total = dest.costs.stay + dest.costs.food + dest.costs.transport + dest.costs.activities;
  const cities = citiesFor(dest.slug);
  const cheapestNight = cities.length ? Math.min(...cities.map((c) => c.hotelFromUSD)) : void 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mx-auto max-w-6xl px-5 py-12", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/explore", search: {
      q: ""
    }, className: "text-sm text-muted-foreground hover:text-primary", children: "← Back to all destinations" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid lg:grid-cols-3 gap-8 mb-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-6xl", children: dest.emoji }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-3 py-1 rounded-full bg-secondary text-xs font-medium", children: dest.region })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-5xl md:text-6xl font-semibold mb-2", children: dest.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xl text-muted-foreground mb-4", children: dest.country }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg text-foreground/80 max-w-2xl", children: dest.tagline }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-4 mt-6 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border/60", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-4 w-4 text-primary" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Best time:" }),
              " ",
              dest.bestTime
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border/60", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(DollarSign, { className: "h-4 w-4 text-primary" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Currency:" }),
              " ",
              dest.currency
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-3xl bg-sunset p-7 text-primary-foreground shadow-warm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm opacity-90 mb-1", children: "Daily budget from" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-5xl font-semibold", children: formatInr(total) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm opacity-90 mb-5", children: "/ day" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2.5 text-sm", children: [["🏨 Stay", dest.costs.stay], ["🍜 Food", dest.costs.food], ["🚌 Transport", dest.costs.transport], ["🎟️ Activities", dest.costs.activities]].map(([label, value]) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between border-b border-primary-foreground/20 pb-2 last:border-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "opacity-90", children: label }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: formatInr(value) })
        ] }, label)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/plan", search: {
          destination: dest.slug
        }, className: "mt-6 block text-center px-4 py-3 rounded-full bg-card text-primary font-medium hover:scale-105 transition-transform", children: "Plan a trip here →" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-14", children: /* @__PURE__ */ jsxRuntimeExports.jsx(HotelAffiliateCard, { city: `${dest.name}, ${dest.country}`, fromUSD: cheapestNight }) }),
    cities.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-14", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Building2, { className: "h-5 w-5 text-primary" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-3xl font-semibold", children: "Cities & neighborhoods" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid md:grid-cols-2 lg:grid-cols-3 gap-4", children: cities.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 rounded-3xl bg-card border border-border/60 shadow-soft hover:shadow-warm hover:-translate-y-1 transition-all", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between mb-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-display text-xl font-semibold", children: c.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] text-muted-foreground uppercase tracking-wide", children: "Hotels" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-display text-base font-semibold text-primary", children: [
              formatInr(c.hotelFromUSD),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground font-normal", children: "/nt" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground/80 mb-4", children: c.hero }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-1.5 mb-4", children: c.attractions.slice(0, 3).map((a) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "text-xs text-foreground/75 flex items-start gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: "•" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: a.name }),
            " — ",
            a.blurb
          ] })
        ] }, a.name)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(HotelAffiliateCard, { city: `${c.name}, ${dest.country}`, variant: "inline" })
      ] }, c.slug)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-14", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-5 w-5 text-primary" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-3xl font-semibold", children: "Famous places to visit" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid md:grid-cols-2 gap-4", children: dest.places.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5 rounded-2xl bg-card border border-border/60 hover:shadow-soft transition-shadow", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3 mb-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-display text-lg font-semibold", children: p.name }),
          p.free && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs px-2 py-0.5 rounded-full bg-leaf/20 text-leaf-foreground font-medium shrink-0", children: "FREE" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground/80 mb-3", children: p.why }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: `inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full font-medium ${categoryTint[p.category]}`, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Tag, { className: "h-3 w-3" }),
          p.category
        ] })
      ] }, p.name)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-3xl bg-secondary/60 p-8 md:p-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Lightbulb, { className: "h-5 w-5 text-primary" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-3xl font-semibold", children: "Money-saving tips" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "grid md:grid-cols-2 gap-4", children: dest.tips.map((tip, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex gap-3 items-start", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mt-1 h-6 w-6 rounded-full bg-primary text-primary-foreground grid place-items-center text-xs font-semibold shrink-0", children: i + 1 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground/85", children: tip })
      ] }, i)) })
    ] })
  ] });
}
export {
  ExplorePage as component
};
