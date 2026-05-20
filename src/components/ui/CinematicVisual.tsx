"use client";

/**
 * CinematicVisual — CSS-only atmospheric background.
 * Simulates: cloud/fog depth, warm gold horizon light, cool violet sky,
 * atmospheric haze, and a top point light source.
 * All via radial-gradient + blur + mix-blend-mode: screen.
 * No images, no video, no WebGL.
 */
export function CinematicVisual() {
  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      {/* Base: dark warm-cool foundation */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(158deg, #0d0b10 0%, #090608 45%, #0b0906 100%)",
        }}
      />

      {/* Horizon warmth — amber from bottom-left, primary light source */}
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: "-25%",
          left: "-8%",
          width: "85%",
          height: "85%",
          background:
            "radial-gradient(ellipse at center, rgba(255,172,72,0.34) 0%, rgba(226,190,104,0.20) 35%, transparent 68%)",
          filter: "blur(72px)",
          mixBlendMode: "screen",
        }}
      />

      {/* Secondary horizon gold — bottom-right warmth */}
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: "-15%",
          right: "-2%",
          width: "55%",
          height: "60%",
          background:
            "radial-gradient(ellipse at center, rgba(226,190,104,0.28) 0%, transparent 62%)",
          filter: "blur(90px)",
          mixBlendMode: "screen",
        }}
      />

      {/* Distant sky — violet from upper-right */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: "-15%",
          right: "-10%",
          width: "72%",
          height: "68%",
          background:
            "radial-gradient(ellipse at center, rgba(112,80,255,0.22) 0%, rgba(40,90,180,0.14) 42%, transparent 68%)",
          filter: "blur(88px)",
          mixBlendMode: "screen",
        }}
      />

      {/* Cool depth — blue shadow upper-left */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: "-8%",
          left: "-8%",
          width: "48%",
          height: "52%",
          background:
            "radial-gradient(ellipse at center, rgba(40,90,180,0.20) 0%, transparent 62%)",
          filter: "blur(72px)",
          mixBlendMode: "screen",
        }}
      />

      {/* Atmospheric fog — large soft mist in lower-centre */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: "30%",
          left: "10%",
          width: "80%",
          height: "55%",
          background:
            "radial-gradient(ellipse at center, rgba(255,200,130,0.11) 0%, transparent 62%)",
          filter: "blur(110px)",
          mixBlendMode: "screen",
        }}
      />

      {/* Teal atmospheric accent — right-mid */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: "42%",
          right: "12%",
          width: "38%",
          height: "38%",
          background:
            "radial-gradient(ellipse at center, rgba(80,220,180,0.12) 0%, transparent 58%)",
          filter: "blur(75px)",
          mixBlendMode: "screen",
        }}
      />

      {/* Point light — warm centre-top, simulates sun / window source */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: "-12%",
          left: "28%",
          width: "40%",
          height: "46%",
          background:
            "radial-gradient(ellipse at center, rgba(255,220,150,0.32) 0%, rgba(255,172,72,0.14) 45%, transparent 70%)",
          filter: "blur(55px)",
          mixBlendMode: "screen",
        }}
      />
    </div>
  );
}
