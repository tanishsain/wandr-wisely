import { Star, Quote, Shield, Zap, Lock, Globe2, Sparkles, Check, X, Clock, Flame, BadgeCheck, ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";

/* -------------------- Social proof (hero) -------------------- */
export function HeroSocialProof() {
  return (
    <div className="flex flex-col items-center gap-2 mb-8">
      <div className="flex items-center gap-1 text-[#FF6A00]">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} className="h-5 w-5 fill-current" />
        ))}
        <span className="ml-2 text-sm font-semibold text-foreground">4.9/5</span>
      </div>
      <div className="flex items-center gap-3 text-sm text-muted-foreground">
        <div className="flex -space-x-2">
          {["bg-[#FF6A00]", "bg-amber-400", "bg-rose-400", "bg-emerald-400", "bg-sky-400"].map((c, i) => (
            <div key={i} className={`h-7 w-7 rounded-full border-2 border-background ${c} grid place-items-center text-[10px] font-bold text-white`}>
              {["P", "R", "A", "S", "V"][i]}
            </div>
          ))}
        </div>
        <span><span className="font-semibold text-foreground">Join 500+ happy travelers</span> planning smarter trips</span>
      </div>
    </div>
  );
}

/* -------------------- Trust badges strip -------------------- */
export function TrustBadges() {
  const badges = [
    { icon: Shield, label: "100% Money Back Guarantee" },
    { icon: Zap, label: "Instant Delivery" },
    { icon: Lock, label: "Secured by Razorpay" },
    { icon: Globe2, label: "10,000+ Destinations" },
    { icon: Sparkles, label: "AI Powered Planning" },
  ];
  return (
    <section className="bg-card border-y border-border/60">
      <div className="mx-auto max-w-6xl px-5 py-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {badges.map((b) => (
          <div key={b.label} className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl bg-secondary/40">
            <div className="h-9 w-9 rounded-lg bg-[#FF6A00]/10 text-[#FF6A00] grid place-items-center shrink-0">
              <b.icon className="h-4.5 w-4.5" />
            </div>
            <span className="text-xs sm:text-sm font-semibold leading-tight">{b.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

/* -------------------- Testimonials (6) -------------------- */
const TESTIMONIALS = [
  { name: "Priya Sharma", city: "Delhi", quote: "Planned my entire Rajasthan trip in minutes! Saved hours of research. The hidden gems section was amazing!" },
  { name: "Rahul Verma", city: "Mumbai", quote: "Worth every rupee! Got a complete 7 day Jaipur itinerary instantly. My family loved the trip!" },
  { name: "Anjali Singh", city: "Bangalore", quote: "Best travel planning tool for India! The budget breakdown saved us at least Rs.5000 on our trip!" },
  { name: "Amit Patel", city: "Ahmedabad", quote: "Used Standard Plan for honeymoon planning. Everything was perfect! Highly recommend Wandr Wisely!" },
  { name: "Sneha Gupta", city: "Jaipur", quote: "Finally a travel planner that understands Indian destinations! Sri Ganganagar coverage was spot on!" },
  { name: "Vikram Kumar", city: "Hyderabad", quote: "Premium plan was totally worth it. Had WhatsApp support throughout my entire Rajasthan road trip!" },
];

export function TestimonialsGrid() {
  return (
    <section className="bg-warm/40 border-y border-border/60">
      <div className="mx-auto max-w-6xl px-5 py-20">
        <div className="text-center mb-12">
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-[#FF6A00] mb-3">Loved by 500+ travelers</span>
          <h2 className="font-display text-4xl md:text-5xl font-semibold mb-3">Real reviews from real travelers</h2>
          <div className="flex items-center justify-center gap-1 text-[#FF6A00]">
            {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-5 w-5 fill-current" />)}
            <span className="ml-2 text-sm text-muted-foreground">4.9/5 average rating</span>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {TESTIMONIALS.map((t) => (
            <figure key={t.name} className="p-6 rounded-3xl bg-card border border-border/60 shadow-soft flex flex-col hover:-translate-y-1 hover:shadow-warm transition-all duration-300">
              <div className="flex items-center gap-1 text-[#FF6A00] mb-3">
                {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
              </div>
              <Quote className="h-5 w-5 text-[#FF6A00]/30 mb-2" />
              <blockquote className="text-foreground/90 mb-5 flex-1 text-[15px] leading-relaxed">"{t.quote}"</blockquote>
              <figcaption className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-[#FF6A00]/15 text-[#FF6A00] grid place-items-center font-bold text-sm">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <div className="font-semibold text-sm">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.city}</div>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
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
    <div className="mx-auto max-w-6xl px-5 pt-8 -mb-6">
      <div className="rounded-2xl bg-gradient-to-r from-[#FF6A00] to-[#FF8124] text-white p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-[0_14px_40px_-12px_rgba(255,106,0,0.55)]">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-white/20 grid place-items-center animate-pulse">
            <Flame className="h-5 w-5" />
          </div>
          <div>
            <div className="font-bold text-base sm:text-lg leading-tight">⚡ Limited Time Offer · 60% OFF</div>
            <div className="text-xs sm:text-sm text-white/90">Only 10 spots left today</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4" />
          <span className="text-sm font-medium">Offer ends in</span>
          <div className="flex gap-1.5 font-mono font-bold text-base">
            <span className="px-2.5 py-1 rounded-md bg-white/20 backdrop-blur tabular-nums">{h}</span>:
            <span className="px-2.5 py-1 rounded-md bg-white/20 backdrop-blur tabular-nums">{m}</span>:
            <span className="px-2.5 py-1 rounded-md bg-white/20 backdrop-blur tabular-nums">{s}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* -------------------- Comparison section -------------------- */
export function ComparisonSection() {
  const rows = [
    { vs: "Google Search", them: "Hours of endless searching", us: "Complete plan in 10 seconds" },
    { vs: "Travel Agent", them: "Rs.5,000+ commission per trip", us: "Just Rs.199 — keep the savings" },
    { vs: "MakeMyTrip", them: "Only handles bookings", us: "Complete day-by-day planning" },
  ];
  return (
    <section className="mx-auto max-w-6xl px-5 py-20">
      <div className="text-center mb-12">
        <span className="inline-block text-xs font-semibold uppercase tracking-widest text-[#FF6A00] mb-3">The Wandr advantage</span>
        <h2 className="font-display text-4xl md:text-5xl font-semibold mb-3">Why Wandr Wisely vs Others</h2>
        <p className="text-muted-foreground max-w-xl mx-auto">See how we stack up against the alternatives.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-5">
        {rows.map((r) => (
          <div key={r.vs} className="rounded-3xl bg-card border border-border/60 overflow-hidden shadow-soft">
            <div className="px-6 py-4 bg-secondary/60 border-b border-border/60">
              <div className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">vs</div>
              <div className="font-display text-xl font-semibold">{r.vs}</div>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex gap-3 items-start">
                <div className="h-7 w-7 rounded-full bg-rose-100 text-rose-600 grid place-items-center shrink-0">
                  <X className="h-4 w-4" strokeWidth={3} />
                </div>
                <div>
                  <div className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">{r.vs}</div>
                  <div className="text-sm text-foreground/80 line-through decoration-rose-400/60">{r.them}</div>
                </div>
              </div>
              <div className="flex gap-3 items-start">
                <div className="h-7 w-7 rounded-full bg-[#FF6A00]/15 text-[#FF6A00] grid place-items-center shrink-0">
                  <Check className="h-4 w-4" strokeWidth={3} />
                </div>
                <div>
                  <div className="text-[11px] font-semibold uppercase tracking-wide text-[#FF6A00]">Wandr Wisely</div>
                  <div className="text-sm font-semibold text-foreground">{r.us}</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* -------------------- Guarantee section -------------------- */
export function GuaranteeSection() {
  return (
    <section className="mx-auto max-w-5xl px-5 py-16">
      <div className="rounded-3xl bg-gradient-to-br from-[#FF6A00] to-[#FF8124] p-8 sm:p-12 text-white shadow-[0_24px_60px_-24px_rgba(255,106,0,0.55)] flex flex-col sm:flex-row items-center gap-8 text-center sm:text-left">
        <div className="relative shrink-0">
          <div className="h-32 w-32 rounded-full bg-white/15 backdrop-blur grid place-items-center border-4 border-white/30">
            <BadgeCheck className="h-16 w-16" strokeWidth={2} />
          </div>
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-white text-[#FF6A00] text-[10px] font-black uppercase tracking-wider whitespace-nowrap">
            100% Guarantee
          </div>
        </div>
        <div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-3">Not happy? Get every rupee back.</h2>
          <p className="text-white/95 text-base sm:text-lg leading-relaxed">
            We're so confident you'll love your itinerary, we back it with a <span className="font-bold">100% money-back guarantee</span>.
            If you're not happy, we'll refund you — no questions asked.
          </p>
        </div>
      </div>
    </section>
  );
}

/* -------------------- FAQ -------------------- */
const FAQS = [
  { q: "How quickly will I get my itinerary?", a: "Instantly after payment! Your full day-by-day plan is unlocked the moment your Razorpay checkout completes." },
  { q: "What if I don't like my itinerary?", a: "100% money back guarantee — no questions asked. Just email us within 7 days and we'll refund you in full." },
  { q: "Can I plan trips outside Rajasthan?", a: "Yes! We cover all of India — from Kerala backwaters to Ladakh, Goa to the North-East." },
  { q: "Which plan should I choose?", a: "Standard Plan is our most popular choice — perfect balance of features and price for week-long trips." },
  { q: "Is my payment secure?", a: "Yes! All payments are securely processed by Razorpay with bank-grade encryption. We never see your card details." },
  { q: "Can I modify my itinerary?", a: "Standard plan includes 2 free revisions. Premium plan includes 5 revisions plus WhatsApp support." },
];

export function FAQSection() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="mx-auto max-w-3xl px-5 py-20">
      <div className="text-center mb-10">
        <span className="inline-block text-xs font-semibold uppercase tracking-widest text-[#FF6A00] mb-3">FAQ</span>
        <h2 className="font-display text-4xl md:text-5xl font-semibold mb-3">Got questions? We've got answers.</h2>
      </div>
      <div className="space-y-3">
        {FAQS.map((f, i) => {
          const isOpen = open === i;
          return (
            <div key={f.q} className={`rounded-2xl border transition-all ${isOpen ? "border-[#FF6A00] bg-card shadow-soft" : "border-border/60 bg-card hover:border-[#FF6A00]/40"}`}>
              <button
                onClick={() => setOpen(isOpen ? null : i)}
                className="w-full flex items-center justify-between gap-4 p-5 text-left"
                aria-expanded={isOpen}
              >
                <span className="font-semibold text-base sm:text-lg">{f.q}</span>
                <ChevronDown className={`h-5 w-5 shrink-0 text-[#FF6A00] transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
              </button>
              <div className={`grid transition-all duration-300 ease-out ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                <div className="overflow-hidden">
                  <p className="px-5 pb-5 text-muted-foreground leading-relaxed">{f.a}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
