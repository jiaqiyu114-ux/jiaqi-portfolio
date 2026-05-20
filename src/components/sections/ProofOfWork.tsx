"use client";

import { ArrowUpRight } from "lucide-react";
import { siteContent } from "@/lib/content";
import { FadeUp } from "@/components/ui/FadeUp";
import { motion } from "framer-motion";

const statusColors: Record<string, string> = {
  Building:      "rgba(112,135,175,0.88)",
  "In Progress": "rgba(168,175,188,0.82)",
  Testing:       "rgba(72,162,155,0.82)",
  Exploring:     "rgba(138,150,172,0.78)",
};

export default function ProofOfWork() {
  const { proofOfWork } = siteContent;

  return (
    <section
      id="proof"
      className="section-panel py-24 md:py-32 px-6 sm:px-10 md:px-14 lg:px-20 relative overflow-hidden isolate"
    >
      {/* Atmosphere */}
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: -1 }}>
        <div className="absolute" style={{
          top: "-5%", left: "20%", width: "60%", height: "50%",
          background: "radial-gradient(ellipse at center, rgba(40,40,120,0.07) 0%, transparent 62%)",
          filter: "blur(70px)",
        }} />
        <div className="absolute top-0 left-0 right-0" style={{
          height: "120px",
          background: "linear-gradient(to bottom, rgba(4,5,10,0.28) 0%, transparent 100%)",
        }} />
      </div>

      <div className="max-w-7xl mx-auto">

        {/* Full-width section header — label + subtitle sit ABOVE the grid so
            the big title on the left and the first record on the right start
            at the same vertical position, eliminating visual overlap. */}
        <div className="mb-12 md:mb-14">
          <FadeUp>
            <p className="text-[10px] uppercase tracking-[0.30em] mb-5" style={{ color: "rgba(220,218,210,0.30)" }}>
              {proofOfWork.label}
            </p>
          </FadeUp>
          <FadeUp delay={0.06}>
            <p className="text-[13px] md:text-[15px] leading-relaxed max-w-lg" style={{ color: "rgba(220,218,210,0.52)" }}>
              {proofOfWork.subtitle}
            </p>
          </FadeUp>
        </div>

        {/* Two-column grid: left = big stacked title, right = archive records.
            Percentage columns prevent long words (e.g. "CLAIMS.") from bleeding
            into the right column at any viewport width. */}
        <div className="grid md:grid-cols-[38%_1fr] gap-10 md:gap-16 items-start">

          {/* Left: stacked title, sticky */}
          <div className="md:sticky md:top-32 overflow-hidden">
            <FadeUp>
              <h2
                className="uppercase tracking-[0.05em] leading-[0.86]"
                style={{
                  fontFamily: "'Cinzel', serif",
                  fontWeight: 600,
                  fontSize: "clamp(2.8rem, 6vw, 5.5rem)",
                  color: "rgba(255,255,255,0.94)",
                }}
              >
                PROOF<br />
                <span style={{ color: "rgba(255,255,255,0.34)" }}>OVER</span><br />
                CLAIMS.
              </h2>
            </FadeUp>
          </div>

          {/* Right: archive record rows */}
          <div className="border-t" style={{ borderColor: "rgba(255,255,255,0.07)" }}>
            {proofOfWork.items.map((item, i) => {
              const statusColor = statusColors[item.status] ?? "rgba(158,165,178,0.78)";
              return (
                <motion.div
                  key={i}
                  className="group flex items-start gap-4 md:gap-5 py-5 md:py-6 border-b cursor-default"
                  style={{
                    borderColor: "rgba(255,255,255,0.06)",
                    transition: "background 0.25s ease",
                  }}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.022)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.background = "transparent";
                  }}
                >
                  {/* Number */}
                  <span
                    className="font-mono text-[10px] shrink-0 pt-1 w-5"
                    style={{ color: "rgba(220,218,210,0.22)" }}
                  >
                    {item.number}
                  </span>

                  {/* Record body */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 mb-2">
                      <h3
                        className="font-semibold text-[15px] md:text-base"
                        style={{ color: "rgba(255,255,255,0.90)" }}
                      >
                        {item.title}
                      </h3>
                      <span style={{ color: "rgba(220,218,210,0.22)" }} className="text-[10px]">·</span>
                      <span
                        className="text-[11px]"
                        style={{ color: "rgba(220,218,210,0.48)" }}
                      >
                        {item.type}
                      </span>
                      {/* Status badge — right-aligned */}
                      <span
                        className="ml-auto text-[9px] border rounded-full px-2 py-0.5 tracking-[0.08em] shrink-0"
                        style={{
                          color: statusColor,
                          borderColor: statusColor.replace(/[\d.]+\)$/, "0.20)"),
                          background: statusColor.replace(/[\d.]+\)$/, "0.06)"),
                        }}
                      >
                        {item.status}
                      </span>
                    </div>
                    <p
                      className="text-[13px] leading-[1.70]"
                      style={{ color: "rgba(220,218,210,0.72)" }}
                    >
                      {item.description}
                    </p>
                  </div>

                  {/* Arrow link */}
                  <a
                    href={item.link}
                    className="shrink-0 w-7 h-7 rounded-full border flex items-center justify-center mt-0.5"
                    style={{ borderColor: "rgba(255,255,255,0.10)", transition: "border-color 0.25s, background 0.25s" }}
                    onMouseEnter={(e) => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.borderColor = "rgba(255,255,255,0.28)";
                      el.style.background = "rgba(255,255,255,0.06)";
                    }}
                    onMouseLeave={(e) => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.borderColor = "rgba(255,255,255,0.10)";
                      el.style.background = "transparent";
                    }}
                  >
                    <ArrowUpRight size={12} style={{ color: "rgba(220,218,210,0.45)" }} />
                  </a>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
