"use client";

import { siteContent } from "@/lib/content";
import { FadeUp } from "@/components/ui/FadeUp";
import { motion } from "framer-motion";

export default function Principles() {
  const { principles } = siteContent;

  return (
    <section
      id="principles"
      className="section-panel py-24 md:py-32 px-6 sm:px-10 md:px-14 lg:px-20 relative overflow-hidden isolate"
    >
      {/* Atmosphere */}
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: -1 }}>
        <div className="absolute" style={{
          top: "5%", left: "-5%", width: "45%", height: "65%",
          background: "radial-gradient(ellipse at center, rgba(36,52,118,0.07) 0%, transparent 62%)",
          filter: "blur(70px)",
        }} />
        <div className="absolute" style={{
          bottom: "0%", right: "-5%", width: "40%", height: "55%",
          background: "radial-gradient(ellipse at center, rgba(48,36,118,0.06) 0%, transparent 62%)",
          filter: "blur(75px)",
        }} />
        <div className="absolute top-0 left-0 right-0" style={{
          height: "120px",
          background: "linear-gradient(to bottom, rgba(4,5,10,0.25) 0%, transparent 100%)",
        }} />
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Two-column: left = sticky title/subtitle, right = manifesto rule board */}
        <div className="grid md:grid-cols-[36%_1fr] gap-10 md:gap-16 items-start">

          {/* Left: section identity — sticky */}
          <div className="md:sticky md:top-32 overflow-hidden">
            <FadeUp>
              <p
                className="text-[10px] uppercase tracking-[0.30em] mb-8"
                style={{ color: "rgba(220,218,210,0.30)" }}
              >
                {principles.label}
              </p>
            </FadeUp>
            <FadeUp delay={0.08}>
              <h2
                className="uppercase tracking-[0.05em] leading-[0.88] mb-7"
                style={{
                  fontFamily: "'Cinzel', serif",
                  fontWeight: 600,
                  fontSize: "clamp(2.2rem, 4.5vw, 4rem)",
                  color: "rgba(255,255,255,0.93)",
                }}
              >
                {principles.headline[0]}<br />
                <span style={{ color: "rgba(255,255,255,0.32)" }}>
                  {principles.headline[1]}
                </span>
              </h2>
            </FadeUp>
            <FadeUp delay={0.16}>
              <p
                className="text-[13px] leading-[1.75] max-w-[240px]"
                style={{ color: "rgba(220,218,210,0.44)" }}
              >
                {principles.subtitle}
              </p>
            </FadeUp>
          </div>

          {/* Right: manifesto rule board */}
          <div className="border-t" style={{ borderColor: "rgba(255,255,255,0.07)" }}>
            {principles.items.map((item, i) => (
              <motion.div
                key={i}
                className="py-7 md:py-9 border-b"
                style={{ borderColor: "rgba(255,255,255,0.06)" }}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                {/* Rule header: number + divider + title */}
                <div className="flex items-center gap-3 mb-3">
                  <span
                    style={{
                      fontFamily: "'Instrument Serif', Georgia, serif",
                      fontStyle: "italic",
                      fontSize: "13px",
                      color: "rgba(184,157,106,0.65)",
                      flexShrink: 0,
                    }}
                  >
                    {item.number}
                  </span>
                  <span
                    style={{
                      width: "1px",
                      height: "12px",
                      background: "rgba(255,255,255,0.14)",
                      flexShrink: 0,
                    }}
                  />
                  <h3
                    className="uppercase tracking-[0.04em] leading-snug"
                    style={{
                      fontFamily: "'Cinzel', serif",
                      fontWeight: 600,
                      fontSize: "clamp(0.9rem, 1.6vw, 1.15rem)",
                      color: "rgba(255,255,255,0.92)",
                    }}
                  >
                    {item.title.replace(/\.$/, "")}
                  </h3>
                </div>

                {/* Rule description */}
                <p
                  className="text-[13px] md:text-sm leading-[1.82] pl-[calc(13px+12px+0.75rem)]"
                  style={{ color: "rgba(220,218,210,0.72)" }}
                >
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
