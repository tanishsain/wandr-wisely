/**
 * Luxury hero — animated SVG globe with gold grid lines, glowing destination
 * markers, animated flight arcs, drifting gold particles. Pure SVG/CSS — no
 * Three.js so it stays SSR-safe and feather-light on mobile.
 */
export function HeroGlobe() {
  // Destination markers (longitude-style x %, latitude-style y %)
  const markers = [
    { x: 28, y: 38, delay: 0 },     // London-ish
    { x: 52, y: 42, delay: 0.4 },   // Cairo-ish
    { x: 68, y: 48, delay: 0.8 },   // Mumbai-ish
    { x: 78, y: 38, delay: 1.2 },   // Tokyo-ish
    { x: 18, y: 52, delay: 1.6 },   // NYC-ish
    { x: 36, y: 64, delay: 2.0 },   // Rio-ish
    { x: 82, y: 62, delay: 2.4 },   // Sydney-ish
  ];

  // Flight arcs between marker pairs
  const arcs = [
    { from: 0, to: 3, delay: 0 },
    { from: 4, to: 2, delay: 1.5 },
    { from: 1, to: 6, delay: 3 },
    { from: 5, to: 0, delay: 4.5 },
  ];

  const arcPath = (a: { x: number; y: number }, b: { x: number; y: number }) => {
    const mx = (a.x + b.x) / 2;
    const my = (a.y + b.y) / 2 - 12; // lift arc above midpoint
    return `M ${a.x} ${a.y} Q ${mx} ${my} ${b.x} ${b.y}`;
  };

  return (
    <div
      className="absolute inset-0 grid place-items-center pointer-events-none lux-fade-in"
      aria-hidden
    >
      {/* Outer glow halo */}
      <div
        className="absolute h-[120vmin] w-[120vmin] max-h-[1100px] max-w-[1100px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(201,168,76,0.12) 0%, transparent 55%)",
          filter: "blur(40px)",
        }}
      />

      {/* Globe sphere */}
      <div
        className="relative h-[85vmin] w-[85vmin] max-h-[780px] max-w-[780px] rounded-full overflow-hidden"
        style={{
          background:
            "radial-gradient(circle at 35% 30%, #131a2e 0%, #0a1020 50%, #04060f 100%)",
          boxShadow:
            "inset 0 0 80px rgba(201,168,76,0.08), 0 0 120px rgba(201,168,76,0.15)",
        }}
      >
        {/* Rotating meridians (vertical longitude lines) */}
        <div className="absolute inset-0 globe-rotate">
          <svg viewBox="0 0 100 100" className="w-full h-full" preserveAspectRatio="none">
            <defs>
              <radialGradient id="gridFade" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#c9a84c" stopOpacity="0.35" />
                <stop offset="70%" stopColor="#c9a84c" stopOpacity="0.18" />
                <stop offset="100%" stopColor="#c9a84c" stopOpacity="0" />
              </radialGradient>
            </defs>
            {Array.from({ length: 12 }).map((_, i) => {
              const rx = 50 - i * 4;
              return (
                <ellipse
                  key={`mer-${i}`}
                  cx="50"
                  cy="50"
                  rx={rx < 1 ? 1 : rx}
                  ry="48"
                  fill="none"
                  stroke="url(#gridFade)"
                  strokeWidth="0.18"
                />
              );
            })}
          </svg>
        </div>

        {/* Rotating parallels (horizontal latitude lines) */}
        <div className="absolute inset-0 globe-rotate-rev" style={{ animationDuration: "100s" }}>
          <svg viewBox="0 0 100 100" className="w-full h-full" preserveAspectRatio="none">
            {Array.from({ length: 9 }).map((_, i) => {
              const y = 5 + i * 11.25;
              const rx = Math.sqrt(50 * 50 - (y - 50) * (y - 50)) || 0.1;
              return (
                <ellipse
                  key={`par-${i}`}
                  cx="50"
                  cy={y}
                  rx={rx}
                  ry="1.4"
                  fill="none"
                  stroke="#c9a84c"
                  strokeOpacity="0.18"
                  strokeWidth="0.18"
                />
              );
            })}
          </svg>
        </div>

        {/* Equator highlight */}
        <div
          className="absolute left-0 right-0 top-1/2 h-px"
          style={{
            background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.35), transparent)",
          }}
        />

        {/* Markers + arcs */}
        <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full">
          <defs>
            <radialGradient id="markerGlow">
              <stop offset="0%" stopColor="#f5e6c8" stopOpacity="1" />
              <stop offset="60%" stopColor="#c9a84c" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#c9a84c" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="arcGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#c9a84c" stopOpacity="0" />
              <stop offset="50%" stopColor="#f5e6c8" stopOpacity="1" />
              <stop offset="100%" stopColor="#c9a84c" stopOpacity="0" />
            </linearGradient>
          </defs>

          {arcs.map((arc, i) => {
            const a = markers[arc.from];
            const b = markers[arc.to];
            return (
              <path
                key={`arc-${i}`}
                d={arcPath(a, b)}
                fill="none"
                stroke="url(#arcGrad)"
                strokeWidth="0.4"
                strokeLinecap="round"
                className="arc-draw"
                style={{ animationDelay: `${arc.delay}s` }}
              />
            );
          })}

          {markers.map((m, i) => (
            <g key={`m-${i}`} className="marker-pulse" style={{ animationDelay: `${m.delay}s` }}>
              <circle cx={m.x} cy={m.y} r="2.5" fill="url(#markerGlow)" />
              <circle cx={m.x} cy={m.y} r="0.7" fill="#f5e6c8" />
            </g>
          ))}
        </svg>
      </div>
    </div>
  );
}

/** Golden particles drifting upward — purely decorative. */
export function GoldParticles() {
  const particles = Array.from({ length: 14 }).map((_, i) => ({
    left: (i * 7.3) % 100,
    delay: (i * 1.1) % 14,
    duration: 12 + (i % 5) * 1.5,
    size: 1 + (i % 3) * 0.8,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
      {particles.map((p, i) => (
        <span
          key={i}
          className="absolute bottom-0 rounded-full particle-rise"
          style={{
            left: `${p.left}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            background: "rgba(245, 230, 200, 0.6)",
            boxShadow: "0 0 6px rgba(201, 168, 76, 0.7)",
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
          }}
        />
      ))}
    </div>
  );
}
