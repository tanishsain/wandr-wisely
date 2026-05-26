import { Star, Quote, Shield, Zap, Lock, Globe2, Sparkles, Check, X, Clock, Flame, BadgeCheck, ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";

/* -------------------- Social proof (hero) -------------------- */
export function HeroSocialProof() {
  return (
    <div className="flex flex-col items-center gap-3 mb-10">
      <div className="flex items-center gap-1.5 text-gold">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} className="h-4 w-4 fill-current" />
        ))}
        <span className="ml-3 text-xs font-medium tracking-[0.22em] uppercase text-foreground/80">4.9 · 500+ Travelers</span>
      </div>
    </div>
  );
}

/* -------------------- Trust badges strip -------------------- */
export function TrustBadges() {
  const badges = [
    { icon: Shield, label: "Money Back Guarantee" },
    { icon: Zap, label: "Instant Delivery" },
    { icon: Lock, label: "Secured by Razorpay" },
    { icon: Globe2, label: "10,000+ Destinations" },
    { icon: Sparkles, label: "AI-Powered Planning" },
  ];
  return (
    <section className="border-y border-gold" style={{ background: "var(--ink-deep)" }}>
      <div className="mx-auto max-w-7xl px-6 py-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {badges.map((b) => (
          <div key={b.label} className="flex items-center gap-3 justify-center sm:justify-start">
            <b.icon className="h-4 w-4 text-gold shrink-0" />
            <span className="text-[11px] sm:text-xs font-medium tracking-[0.18em] uppercase text-foreground/75 leading-tight">
              {b.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

/* -------------------- Testimonials carousel -------------------- */
const TESTIMONIALS = [
  { name: "Priya Sharma", city: "Delhi", quote: "Planned my entire Rajasthan trip in minutes. The hidden gems section was extraordinary." },
  { name: "Rahul Verma", city: "Mumbai", quote: "Worth every rupee. A complete 7-day Jaipur itinerary, instantly. My family loved every moment." },
  { name: "Anjali Singh", city: "Bangalore", quote: "The finest travel planner for India. The budget breakdown saved us nearly ₹5,000." },
  { name: "Amit Patel", city: "Ahmedabad", quote: "Used the Standard Plan for our honeymoon. Everything was flawlessly orchestrated." },
  { name: "Sneha Gupta", city: "Jaipur", quote: "A travel planner that truly understands India. The coverage was remarkably precise." },
  { name: "Vikram Kumar", city: "Hyderabad", quote: "Premium plan was worth every paisa. WhatsApp support throughout our entire road trip." },
];

export function TestimonialsGrid() {
  // Duplicate list for seamless loop
  const loop = [...TESTIMONIALS, ...TESTIMONIALS];

  return (
    <section className="relative overflow-hidden border-y border-gold" style={{ background: "var(--ink-deep)" }}>
      <div className="mx-auto max-w-7xl px-6 py-24">
        <div className="text-center mb-16 relative">
          <span
            aria-hidden
            className="absolute -top-8 left-1/2 -translate-x-1/2 font-display text-[12rem] leading-none text-gold/10 select-none pointer-events-none"
          >
            "
          </span>
          <div className="eyebrow mb-5 relative">Words from our travelers</div>
          <h2 className="font-display text-4xl md:text-6xl font-medium mb-5 relative">Loved across the world</h2>
          <div className="flex items-center justify-center gap-1.5 text-gold relative">
            {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
            <span className="ml-3 text-xs tracking-[0.22em] uppercase text-muted-foreground">4.9 average</span>
          </div>
        </div>

        <div
          className="relative"
          style={{
            maskImage: "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)",
            WebkitMaskImage: "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)",
          }}
        >
          <div className="flex gap-6 animate-[scroll_60s_linear_infinite] hover:[animation-play-state:paused]" style={{ width: "max-content" }}>
            {loop.map((t, i) => (
              <figure
                key={`${t.name}-${i}`}
                className="w-[340px] shrink-0 p-7 rounded-2xl border border-gold flex flex-col"
                style={{ background: "var(--surface)" }}
              >
                <Quote className="h-6 w-6 text-gold/40 mb-4" />
                <blockquote className="font-display italic text-lg text-foreground/90 mb-6 flex-1 leading-relaxed">
                  {t.quote}
                </blockquote>
                <div className="flex items-center gap-1 text-gold mb-3">
                  {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-3 w-3 fill-current" />)}
                </div>
                <figcaption>
                  <div className="text-sm font-medium text-gold tracking-wide">{t.name}</div>
                  <div className="text-[11px] tracking-[0.22em] uppercase text-muted-foreground mt-1">{t.city}</div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}

/* -------------------- Countdown timer + urgency banner -------------------- */
export function UrgencyBanner() {
  const [secs, setSecs] = useState(24 * 3600);
  useEffect(() => {
    const id = setInterval(() => setSecs((s) => (s > 0 ? s - 1 : 24 * 3600)), 1000);
    return () => clearInterval(id);
  }, []);
  const h = String(Math.floor(secs / 3600)).padStart(2, "0");
  const m = String(Math.floor((secs % 3600) / 60)).padStart(2, "0");
  const s = String(secs % 60).padStart(2, "0");

  return (
    <div className="mx-auto max-w-6xl px-6 pt-12 -mb-4">
      <div
        className="rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4 border border-gold-strong"
        style={{
          background: "var(--surface)",
          borderColor: "var(--border-gold-strong)",
        }}
      >
        <div className="flex items-center gap-4">
          <div className="h-10 w-10 rounded-full border border-gold grid place-items-center text-gold">
            <Flame className="h-4 w-4" />
          </div>
          <div>
            <div className="eyebrow text-gold mb-1">Limited offer · 60% off</div>
            <div className="text-sm text-foreground/80">Only 10 spots left today</div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Clock className="h-3.5 w-3.5 text-gold" />
          <span className="text-[11px] tracking-[0.22em] uppercase text-muted-foreground">Ends in</span>
          <div className="flex gap-1 font-display text-xl text-gold tabular-nums">
            <span>{h}</span><span className="text-gold/50">:</span>
            <span>{m}</span><span className="text-gold/50">:</span>
            <span>{s}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* -------------------- Comparison section -------------------- */
export function ComparisonSection() {
  const features = [
    { feature: "Planning time", others: "Hours of research", wandr: "10 seconds" },
    { feature: "Cost", others: "₹5,000+ commission", wandr: "₹199 — keep the savings" },
    { feature: "Day-by-day itinerary", others: false, wandr: true },
    { feature: "Hidden gems", others: false, wandr: true },
    { feature: "Budget in INR", others: false, wandr: true },
    { feature: "Money-back guarantee", others: false, wandr: true },
  ];

  return (
    <section className="mx-auto max-w-5xl px-6 py-24">
      <div className="text-center mb-14">
        <div className="eyebrow mb-5">The Wandr advantage</div>
        <h2 className="font-display text-4xl md:text-6xl font-medium mb-4">Why travelers choose Wandr</h2>
      </div>

      <div
        className="rounded-2xl overflow-hidden border border-gold"
        style={{ background: "var(--surface)" }}
      >
        <div className="grid grid-cols-[1.4fr_1fr_1fr] text-[10px] sm:text-xs tracking-[0.22em] uppercase">
          <div className="p-5 sm:p-6 text-muted-foreground border-b border-gold">Feature</div>
          <div className="p-5 sm:p-6 text-muted-foreground border-b border-l border-gold text-center">Others</div>
          <div
            className="p-5 sm:p-6 text-center border-b border-l border-gold font-semibold"
            style={{ background: "var(--gradient-gold)", color: "var(--ink)" }}
          >
            Wandr
          </div>

          {features.map((row, i) => (
            <div key={row.feature} className="contents">
              <div className={`p-5 sm:p-6 text-foreground/90 text-sm normal-case tracking-normal ${i < features.length - 1 ? "border-b border-gold" : ""}`}>
                {row.feature}
              </div>
              <div className={`p-5 sm:p-6 text-center border-l border-gold ${i < features.length - 1 ? "border-b" : ""}`}>
                {typeof row.others === "boolean" ? (
                  row.others
                    ? <Check className="h-4 w-4 text-gold inline" />
                    : <X className="h-4 w-4 text-muted-foreground inline" />
                ) : (
                  <span className="text-xs text-muted-foreground normal-case tracking-normal">{row.others}</span>
                )}
              </div>
              <div className={`p-5 sm:p-6 text-center border-l border-gold ${i < features.length - 1 ? "border-b" : ""}`}>
                {typeof row.wandr === "boolean" ? (
                  row.wandr
                    ? <Check className="h-4 w-4 text-gold inline" strokeWidth={2.5} />
                    : <X className="h-4 w-4 text-muted-foreground inline" />
                ) : (
                  <span className="text-xs text-gold font-semibold normal-case tracking-normal">{row.wandr}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------- Guarantee section -------------------- */
export function GuaranteeSection() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-20">
      <div
        className="rounded-2xl p-10 sm:p-14 border border-gold flex flex-col sm:flex-row items-center gap-10 text-center sm:text-left"
        style={{ background: "var(--surface)" }}
      >
        <div className="relative shrink-0">
          <div
            className="h-28 w-28 rounded-full grid place-items-center border-2"
            style={{
              background: "rgba(201,168,76,0.08)",
              borderColor: "var(--gold)",
            }}
          >
            <BadgeCheck className="h-14 w-14 text-gold" strokeWidth={1.5} />
          </div>
        </div>
        <div>
          <div className="eyebrow mb-4">100% Guarantee</div>
          <h2 className="font-display text-3xl sm:text-5xl font-medium mb-4">Not satisfied? Every rupee returned.</h2>
          <p className="text-foreground/75 text-base leading-relaxed">
            We're so confident you'll love your itinerary, we back it with a <span className="text-gold">complete money-back guarantee</span>.
            If it doesn't move you, we'll refund you. No questions asked.
          </p>
        </div>
      </div>
    </section>
  );
}

/* -------------------- FAQ -------------------- */
const FAQS = [
  { q: "How quickly will I receive my itinerary?", a: "Instantly after payment. Your full day-by-day plan is unlocked the moment your Razorpay checkout completes." },
  { q: "What if I'm not satisfied with my itinerary?", a: "100% money-back guarantee — no questions asked. Email us within 7 days and we'll refund you in full." },
  { q: "Can I plan trips outside Rajasthan?", a: "Of course. We cover all of India — from Kerala backwaters to Ladakh, Goa to the North-East." },
  { q: "Which plan should I choose?", a: "Our Standard plan is the most popular — the perfect balance of features and value for week-long journeys." },
  { q: "Is my payment secure?", a: "Yes. All payments are processed by Razorpay with bank-grade encryption. We never see your card details." },
  { q: "Can I modify my itinerary?", a: "Standard plan includes 2 free revisions. Premium plan includes 5 revisions plus WhatsApp support." },
];

export function FAQSection() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="mx-auto max-w-3xl px-6 py-24">
      <div className="text-center mb-14">
        <div className="eyebrow mb-5">Frequently asked</div>
        <h2 className="font-display text-4xl md:text-6xl font-medium">Questions, answered.</h2>
      </div>
      <div className="space-y-3">
        {FAQS.map((f, i) => {
          const isOpen = open === i;
          return (
            <div
              key={f.q}
              className="rounded-xl border border-gold transition-all"
              style={{ background: "var(--surface)" }}
            >
              <button
                onClick={() => setOpen(isOpen ? null : i)}
                className="w-full flex items-center justify-between gap-4 p-6 text-left"
                aria-expanded={isOpen}
              >
                <span className="font-display text-lg sm:text-xl font-medium pr-4">{f.q}</span>
                <ChevronDown className={`h-4 w-4 shrink-0 text-gold transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
              </button>
              <div className={`grid transition-all duration-300 ease-out ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                <div className="overflow-hidden">
                  <p className="px-6 pb-6 text-muted-foreground leading-relaxed text-[15px]">{f.a}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
