"use client";

import { siteContent } from "@/lib/content";
import { FadeUp, ScaleFadeIn } from "@/components/ui/FadeUp";

export default function Building() {
  const { building } = siteContent;

  return (
    <section id="building" className="relative min-h-screen overflow-hidden">

      {/* Cinematic dark base */}
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(160deg, #03050b 0%, #050810 50%, #060a14 100%)" }}
      />

      {/* Atmospheric depth — muted, not saturated */}
      <div className="absolute pointer-events-none" style={{
        top: "-20%", left: "10%", width: "70%", height: "80%",
        background: "radial-gradient(ellipse at center, rgba(36,48,108,0.14) 0%, transparent 62%)",
        filter: "blur(90px)",
      }} />
      <div className="absolute pointer-events-none" style={{
        bottom: "-10%", right: "0%", width: "55%", height: "60%",
        background: "radial-gradient(ellipse at center, rgba(28,38,88,0.10) 0%, transparent 62%)",
        filter: "blur(80px)",
      }} />

      {/* Content */}
      <div className="relative z-10 flex flex-col min-h-screen px-6 sm:px-10 md:px-14 lg:px-20 py-28 md:py-32">

        {/* Header */}
        <div className="mb-12 md:mb-14">
          <FadeUp>
            <p className="text-[10px] uppercase tracking-[0.30em] mb-8" style={{ color: "rgba(220,218,210,0.30)" }}>
              {building.label}
            </p>
          </FadeUp>
          <FadeUp delay={0.08}>
            <h2
              className="text-white uppercase tracking-[0.06em] leading-[0.88] mb-5"
              style={{
                fontFamily: "'Cinzel', serif",
                fontWeight: 600,
                fontSize: "clamp(2.8rem, 7vw, 6.5rem)",
              }}
            >
              {building.headline.split(" ").slice(0, 1).join(" ")}<br />
              <span style={{ color: "rgba(255,255,255,0.38)" }}>
                {building.headline.split(" ").slice(1).join(" ")}
              </span>
            </h2>
          </FadeUp>
          <FadeUp delay={0.16}>
            <p className="text-sm md:text-[15px] leading-relaxed max-w-sm" style={{ color: "rgba(220,218,210,0.45)" }}>
              {building.subline}
            </p>
          </FadeUp>
        </div>

        {/* System Core Panel */}
        <FadeUp delay={0.24}>
          <div
            className="glass-card overflow-hidden"
            style={{ padding: "3px" }}
          >
            {/* Panel window chrome */}
            <div
              className="rounded-[calc(1.25rem-2px)] flex items-center justify-between px-5 py-3 mb-0.5"
              style={{
                background: "rgba(255,255,255,0.03)",
                borderBottom: "1px solid rgba(255,255,255,0.05)",
              }}
            >
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: "rgba(255,255,255,0.10)" }} />
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: "rgba(255,255,255,0.10)" }} />
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: "rgba(184,157,106,0.60)" }} />
              </div>
              <span className="text-[9px] uppercase tracking-[0.26em]" style={{ color: "rgba(220,218,210,0.22)" }}>
                Core Systems — Active
              </span>
              <span className="text-[9px] uppercase tracking-[0.16em]" style={{ color: "rgba(220,218,210,0.14)" }}>
                2024–
              </span>
            </div>

            {/* 2 × 2 system tile grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-0.5 p-0.5">
              {building.items.map((item, i) => (
                <ScaleFadeIn key={item.number} delay={0.30 + i * 0.08}>
                  <div
                    className="liquid-glass rounded-[calc(1.25rem-4px)] p-6 min-h-[220px] md:min-h-[240px] flex flex-col justify-between cursor-default"
                    style={{ borderRadius: "calc(1.25rem - 4px)" }}
                  >
                    {/* Top: number + chips */}
                    <div className="flex items-start justify-between gap-2 mb-auto">
                      <span className="text-[11px] font-mono shrink-0" style={{ color: "rgba(255,255,255,0.18)" }}>
                        {item.number}
                      </span>
                      <div className="flex flex-wrap gap-1 justify-end">
                        {item.tags.map((tag) => (
                          <span key={tag} className="glass-chip">{tag}</span>
                        ))}
                      </div>
                    </div>

                    {/* Bottom: title + desc */}
                    <div className="mt-8">
                      <h3
                        className="font-semibold mb-2 leading-snug"
                        style={{ color: "rgba(255,255,255,0.90)", fontSize: "15px" }}
                      >
                        {item.title}
                      </h3>
                      <p className="text-[13px] leading-[1.72]" style={{ color: "rgba(220,218,210,0.52)" }}>
                        {item.description}
                      </p>
                    </div>
                  </div>
                </ScaleFadeIn>
              ))}
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
