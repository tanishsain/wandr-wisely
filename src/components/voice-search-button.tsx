import { useEffect, useRef, useState } from "react";
import { Mic, MicOff, Loader2 } from "lucide-react";

// Minimal types for Web Speech API (not in default lib.dom)
type SpeechRecognitionAlternative = { transcript: string; confidence: number };
type SpeechRecognitionResult = { 0: SpeechRecognitionAlternative; isFinal: boolean; length: number };
type SpeechRecognitionEvent = {
  resultIndex: number;
  results: ArrayLike<SpeechRecognitionResult>;
};
type SpeechRecognitionErrorEvent = { error: string; message?: string };
interface SpeechRecognitionLike {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  maxAlternatives: number;
  onresult: ((e: SpeechRecognitionEvent) => void) | null;
  onerror: ((e: SpeechRecognitionErrorEvent) => void) | null;
  onend: (() => void) | null;
  onstart: (() => void) | null;
  start: () => void;
  stop: () => void;
  abort: () => void;
}

function getRecognitionCtor(): (new () => SpeechRecognitionLike) | null {
  if (typeof window === "undefined") return null;
  const w = window as unknown as {
    SpeechRecognition?: new () => SpeechRecognitionLike;
    webkitSpeechRecognition?: new () => SpeechRecognitionLike;
  };
  return w.SpeechRecognition ?? w.webkitSpeechRecognition ?? null;
}

// Strip leading command phrases so "show me places in Jaipur" -> "Jaipur".
const COMMAND_PATTERNS: RegExp[] = [
  /^\s*(please\s+)?(show\s+me|find\s+me|search\s+(for\s+)?|look\s+up|tell\s+me\s+about|take\s+me\s+to)\s+/i,
  /^\s*(places|tourist\s+(spots?|places?|attractions?)|attractions?|hotels?|things\s+to\s+do|sights?)\s+(in|near|around|at)\s+/i,
  /^\s*(plan\s+(a\s+)?trip|trip|travel|visit|go)\s+(to|in|for)\s+/i,
  /^\s*(in|near|around|at)\s+/i,
  // Hinglish/Hindi prefixes
  /^\s*(mujhe|hume|humein)\s+/i,
  /\s+(ke\s+(paas|pass|aas\s*paas)|me|mein|main)\s*$/i,
  /\s+(dikhao|batao|jana\s+hai|chalna\s+hai)\s*$/i,
];

export function extractLocation(raw: string): string {
  let q = raw.trim().replace(/[?.!]+$/g, "");
  for (const re of COMMAND_PATTERNS) q = q.replace(re, "");
  return q.trim();
}

type Props = {
  onResult: (location: string, rawTranscript: string) => void;
  disabled?: boolean;
};

const LANG_CYCLE = ["en-IN", "hi-IN", "en-US"];
const LANG_LABEL: Record<string, string> = {
  "en-IN": "EN",
  "hi-IN": "हिं",
  "en-US": "EN",
};

export function VoiceSearchButton({ onResult, disabled }: Props) {
  const [supported, setSupported] = useState(true);
  const [state, setState] = useState<"idle" | "requesting" | "listening" | "processing" | "error">(
    "idle",
  );
  const [transcript, setTranscript] = useState("");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [langIdx, setLangIdx] = useState(0);
  const recogRef = useRef<SpeechRecognitionLike | null>(null);

  useEffect(() => {
    setSupported(getRecognitionCtor() !== null);
    return () => {
      try {
        recogRef.current?.abort();
      } catch {
        /* noop */
      }
    };
  }, []);

  async function start() {
    if (state === "listening" || state === "requesting") {
      recogRef.current?.stop();
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

    // Explicit permission prompt — also surfaces a clear error if blocked.
    try {
      if (navigator.mediaDevices?.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        // Immediately stop; SpeechRecognition will open its own stream.
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
        // Auto-reset shortly after dispatch
        setTimeout(() => setState("idle"), 600);
      }
    };
    recog.onerror = (e) => {
      setState("error");
      const map: Record<string, string> = {
        "no-speech": "Didn't catch that — try again.",
        "audio-capture": "No microphone found.",
        "not-allowed": "Microphone permission denied.",
        network: "Voice service unreachable. Check your connection.",
      };
      setErrorMsg(map[e.error] ?? `Voice error: ${e.error}`);
    };
    recog.onend = () => {
      setState((s) => (s === "listening" ? "idle" : s));
    };

    recogRef.current = recog;
    try {
      recog.start();
    } catch {
      setState("error");
      setErrorMsg("Could not start voice recognition.");
    }
  }

  function cycleLang(e: React.MouseEvent) {
    e.stopPropagation();
    setLangIdx((i) => (i + 1) % LANG_CYCLE.length);
  }

  if (!supported) {
    return (
      <button
        type="button"
        disabled
        title="Voice search isn't supported in this browser. Try Chrome or Edge."
        className="px-4 py-3 rounded-full bg-secondary/60 text-muted-foreground cursor-not-allowed inline-flex items-center gap-2"
      >
        <MicOff className="h-4 w-4" />
      </button>
    );
  }

  const listening = state === "listening" || state === "requesting";
  const lang = LANG_CYCLE[langIdx];

  return (
    <div className="relative">
      <button
        type="button"
        onClick={start}
        disabled={disabled || state === "processing"}
        aria-pressed={listening}
        aria-label={listening ? "Stop listening" : "Start voice search"}
        title={`Voice search (${lang}) — click to ${listening ? "stop" : "speak"}`}
        className={`relative px-4 py-3 rounded-full inline-flex items-center gap-2 transition-colors ${
          listening
            ? "bg-destructive text-destructive-foreground"
            : "bg-secondary text-foreground hover:bg-secondary/80"
        } disabled:opacity-60`}
      >
        {listening && (
          <>
            <span className="absolute inset-0 rounded-full bg-destructive/40 animate-ping" />
            <span className="absolute inset-0 rounded-full ring-2 ring-destructive/60 animate-pulse" />
          </>
        )}
        {state === "processing" ? (
          <Loader2 className="h-4 w-4 animate-spin relative" />
        ) : (
          <Mic className={`h-4 w-4 relative ${listening ? "animate-pulse" : ""}`} />
        )}
        <span
          onClick={cycleLang}
          className="relative text-[10px] font-semibold px-1.5 py-0.5 rounded-full bg-background/30 hover:bg-background/50"
        >
          {LANG_LABEL[lang]}
        </span>
      </button>

      {(listening || transcript || errorMsg) && (
        <div className="absolute z-30 right-0 mt-2 w-72 rounded-2xl border border-border bg-card shadow-warm p-3 text-sm animate-fade-in">
          {listening && (
            <div className="flex items-center gap-2 text-destructive font-medium mb-1">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full rounded-full bg-destructive opacity-75 animate-ping" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-destructive" />
              </span>
              Listening… ({lang})
            </div>
          )}
          {transcript && (
            <p className="text-foreground/80">
              <span className="text-muted-foreground text-xs">Heard:</span> "{transcript}"
            </p>
          )}
          {errorMsg && <p className="text-destructive text-xs mt-1">{errorMsg}</p>}
          {!errorMsg && (
            <p className="text-[11px] text-muted-foreground mt-1">
              Try: "Show me places in Jaipur", "Hotels in Jodhpur", "Plan a trip to Jaisalmer"
            </p>
          )}
        </div>
      )}
    </div>
  );
}
