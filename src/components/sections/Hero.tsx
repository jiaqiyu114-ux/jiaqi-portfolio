"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { siteContent } from "@/lib/content";

const ease = [0.16, 1, 0.3, 1] as const;

export default function Hero() {
  const { hero } = siteContent;

  return (
    <section
      id="home"
      className="relative flex flex-col p-3 md:p-5"
      style={{ minHeight: "100dvh", background: "transparent" }}
    >
      {/* Inset rounded container — transparent: shared video shows through */}
      <div
        className="relative overflow-hidden flex-1"
        style={{
          borderRadius: "2rem",
          border: "1px solid rgba(255,255,255,0.09)",
          background: "transparent",
          minHeight: "560px",
        }}
      >
        {/* Per-container cinematic gradient — clips to rounded corners */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.18) 0%, rgba(0,0,0,0.02) 28%, rgba(0,0,0,0) 48%, rgba(0,0,0,0.58) 100%)",
          }}
        />

        {/* Side vignette — clips to rounded corners */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 110% 100% at 50% 50%, transparent 42%, rgba(0,0,0,0.44) 100%)",
          }}
        />

        {/* Subtle noise */}
        <div
          className="absolute inset-0 pointer-events-none noise-overlay"
          style={{ opacity: 0.11, mixBlendMode: "overlay" }}
        />

        {/* Content — left-anchored, bottom-aligned */}
        <div className="relative z-10 flex flex-col h-full px-7 sm:px-11 md:px-16 lg:px-20">
          <div className="flex-1" />

          <div className="pb-8 sm:pb-10 md:pb-13 lg:pb-16">
            {/* Identity pill */}
            <motion.div
              className="mb-7 md:mb-9"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.28, ease }}
            >
              <div className="liquid-glass rounded-full inline-flex items-center gap-2.5 px-4 py-2">
                <div
                  className="w-1.5 h-1.5 rounded-full shrink-0"
                  style={{ background: "rgba(255,255,255,0.36)" }}
                />
                <span
                  className="text-[10px] tracking-[0.10em] uppercase"
                  style={{ color: "rgba(220,218,210,0.60)" }}
                >
                  {hero.pillLabel}
                </span>
              </div>
            </motion.div>

            {/* Main headline — Instrument Serif italic, cinematic */}
            <h1 className="mb-8 md:mb-10" aria-label={hero.landingHeadline.join(" ")}>
              {hero.landingHeadline.map((line, i) => (
                <div key={i} className="overflow-hidden">
                  <motion.div
                    className="text-white uppercase"
                    style={{
                      fontFamily: "'Instrument Serif', Georgia, serif",
                      fontStyle: "italic",
                      fontSize: "clamp(4.8rem, 9vw, 10rem)",
                      lineHeight: 0.82,
                      letterSpacing: "-0.05em",
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.05, delay: 0.46 + i * 0.14, ease }}
                  >
                    {line}
                  </motion.div>
                </div>
              ))}
            </h1>

            {/* Subtitle + CTAs — side by side on desktop */}
            <div className="flex flex-col md:flex-row md:items-end gap-5 md:gap-14 mb-9 md:mb-11">
              <motion.p
                className="text-sm md:text-[15px] leading-[1.76] max-w-xs md:max-w-sm"
                style={{ color: "rgba(220,218,210,0.50)" }}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.80, ease }}
              >
                {hero.landingSubtitle}
              </motion.p>

              <motion.div
                className="flex items-center gap-5 shrink-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.9, delay: 0.98 }}
              >
                <a
                  href="#systems"
                  className="liquid-glass rounded-full inline-flex items-center gap-2 px-5 py-2.5 text-[12px] tracking-[0.05em] transition-all duration-300"
                  style={{ color: "rgba(255,255,255,0.88)" }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.background =
                      "rgba(255,255,255,0.08)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.background = "";
                  }}
                >
                  {hero.cta}
                  <ArrowUpRight size={12} strokeWidth={1.8} />
                </a>
                <a
                  href="#work"
                  className="text-[12px] tracking-[0.04em] transition-colors duration-200"
                  style={{ color: "rgba(220,218,210,0.36)" }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.color =
                      "rgba(220,218,210,0.72)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.color =
                      "rgba(220,218,210,0.36)";
                  }}
                >
                  {hero.ctaSecondary}
                </a>
              </motion.div>
            </div>

            {/* 3 floating glass stat cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 max-w-2xl">
              {hero.statsCards.map((card, i) => (
                <motion.div
                  key={i}
                  className="liquid-glass rounded-2xl p-4 md:p-5"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1.16 + i * 0.10, ease }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className="text-[9px] uppercase tracking-[0.24em]"
                      style={{ color: "rgba(220,218,210,0.28)" }}
                    >
                      {card.label}
                    </span>
                    <div
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ background: "rgba(255,255,255,0.11)" }}
                    />
                  </div>
                  <div
                    className="h-px mb-3"
                    style={{ background: "rgba(255,255,255,0.06)" }}
                  />
                  <p
                    className="text-[12px] leading-snug"
                    style={{ color: "rgba(220,218,210,0.66)" }}
                  >
                    {card.value}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
