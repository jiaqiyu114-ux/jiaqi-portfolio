"use client";

import { siteContent } from "@/lib/content";
import { WordsPullUp } from "@/components/ui/WordsPullUp";
import { FadeUp } from "@/components/ui/FadeUp";

export default function Identity() {
  const { identity } = siteContent;

  return (
    <section
      id="identity"
      className="py-20 md:py-28 px-3 md:px-5 relative overflow-hidden isolate"
    >
      {/* Section atmosphere — desaturated, reduced */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ zIndex: -1 }}
      >
        {/* Top fade — bridges from Hero, less saturated blue */}
        <div
          className="absolute top-0 left-0 right-0"
          style={{
            height: "180px",
            background:
              "linear-gradient(to bottom, rgba(12,24,68,0.22) 0%, transparent 100%)",
          }}
        />
        {/* Subtle centre glow */}
        <div
          className="absolute"
          style={{
            top: "10%",
            left: "10%",
            width: "80%",
            height: "60%",
            background:
              "radial-gradient(ellipse at center, rgba(38,55,118,0.05) 0%, transparent 65%)",
            filter: "blur(60px)",
          }}
        />
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto">
        <FadeUp>
          <div
            className="relative rounded-[2rem] overflow-hidden px-8 py-14 sm:px-14 sm:py-18 md:px-20 md:py-24 text-center border"
            style={{
              background: "rgba(185,190,205,0.022)",
              borderColor: "rgba(185,192,205,0.09)",
            }}
          >
            {/* Card top glow — muted */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse 80% 45% at 50% 0%, rgba(45,70,148,0.04) 0%, transparent 100%)",
              }}
            />

            {/* Label */}
            <FadeUp delay={0.05}>
              <p
                className="relative text-[10px] uppercase tracking-[0.28em] mb-12 md:mb-16"
                style={{ color: "rgba(158,165,178,0.48)" }}
              >
                {identity.label}
              </p>
            </FadeUp>

            {/* Heading */}
            <h2 className="relative text-5xl sm:text-6xl md:text-7xl font-light leading-[1.0] tracking-[-0.025em] mb-10 md:mb-14">
              <span className="block">
                <WordsPullUp
                  text={identity.headlineA}
                  className="text-[#f2f0ea]"
                  delay={0.12}
                />
              </span>
              <span className="block">
                <WordsPullUp
                  text={identity.headlineB}
                  className="font-serif italic text-[#f2f0ea]"
                  delay={0.26}
                />
              </span>
            </h2>

            {/* Divider */}
            <div
              className="relative w-10 h-px mx-auto mb-10 md:mb-14"
              style={{ background: "rgba(185,192,205,0.12)" }}
            />

            {/* Body */}
            <FadeUp delay={0.38}>
              <p
                className="relative text-sm md:text-[15px] leading-[1.95] max-w-xl mx-auto"
                style={{ color: "rgba(175,182,195,0.85)" }}
              >
                {identity.bio}
              </p>
            </FadeUp>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
