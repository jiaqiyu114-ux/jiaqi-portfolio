"use client";

import { siteContent } from "@/lib/content";
import { FadeUp } from "@/components/ui/FadeUp";
import { motion } from "framer-motion";

export default function CurrentFocus() {
  const { currentFocus } = siteContent;

  return (
    <section
      id="focus"
      className="section-panel py-24 md:py-32 px-6 sm:px-10 md:px-14 lg:px-20 relative overflow-hidden isolate"
    >
      {/* Atmosphere */}
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: -1 }}>
        <div className="absolute" style={{
          top: "-5%", right: "-5%", width: "48%", height: "60%",
          background: "radial-gradient(ellipse at center, rgba(22,88,120,0.07) 0%, transparent 62%)",
          filter: "blur(70px)",
        }} />
        <div className="absolute top-0 left-0 right-0" style={{
          height: "120px",
          background: "linear-gradient(to bottom, rgba(4,5,10,0.25) 0%, transparent 100%)",
        }} />
      </div>

      <div className="max-w-7xl mx-auto">

        {/* Section header */}
        <div className="mb-14 md:mb-16">
          <FadeUp>
            <p
              className="text-[10px] uppercase tracking-[0.30em] mb-8"
              style={{ color: "rgba(220,218,210,0.30)" }}
            >
              {currentFocus.label}
            </p>
          </FadeUp>
          <FadeUp delay={0.08}>
            <h2
              className="uppercase tracking-[0.05em] leading-[0.88] mb-5"
              style={{
                fontFamily: "'Cinzel', serif",
                fontWeight: 600,
                fontSize: "clamp(2.5rem, 6vw, 5.5rem)",
                color: "rgba(255,255,255,0.94)",
              }}
            >
              {currentFocus.headline[0]}<br />
              <span style={{ color: "rgba(255,255,255,0.30)" }}>
                {currentFocus.headline[1]}
              </span>
            </h2>
          </FadeUp>
          <FadeUp delay={0.14}>
            <p
              className="text-[13px] md:text-[15px] leading-relaxed max-w-md"
              style={{ color: "rgba(220,218,210,0.48)" }}
            >
              {currentFocus.context}
            </p>
          </FadeUp>
        </div>

        {/* Trajectory tracks */}
        <div className="border-t" style={{ borderColor: "rgba(255,255,255,0.07)" }}>
          {currentFocus.items.map((item, i) => (
            <motion.div
              key={i}
              className="flex items-start gap-4 md:gap-6 py-6 md:py-8 border-b"
              style={{
                borderColor: "rgba(255,255,255,0.06)",
                transition: "background 0.25s ease",
              }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.018)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = "transparent";
              }}
            >
              {/* Track number */}
              <span
                className="font-mono text-[10px] shrink-0 mt-1 w-5"
                style={{ color: "rgba(220,218,210,0.22)" }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>

              {/* Track rail: dot + gradient line */}
              <div className="flex flex-col items-center gap-0 shrink-0 mt-1.5">
                <div
                  className="w-2 h-2 rounded-full border shrink-0"
                  style={{ borderColor: "rgba(255,255,255,0.36)" }}
                >
                  <div
                    className="w-full h-full rounded-full scale-[0.38]"
                    style={{ background: "rgba(255,255,255,0.70)" }}
                  />
                </div>
                <div
                  className="w-px mt-2"
                  style={{
                    height: "calc(100% - 8px)",
                    background: "linear-gradient(to bottom, rgba(255,255,255,0.14), transparent)",
                    minHeight: "24px",
                  }}
                />
              </div>

              {/* Track content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <h3
                    className="font-semibold text-[15px] md:text-base leading-snug"
                    style={{ color: "rgba(255,255,255,0.90)" }}
                  >
                    {item.title}
                  </h3>
                  <span className="glass-chip shrink-0 mt-0.5">Active</span>
                </div>
                <p
                  className="text-[13px] leading-[1.78]"
                  style={{ color: "rgba(220,218,210,0.68)" }}
                >
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
