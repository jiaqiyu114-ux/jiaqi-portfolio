"use client";

import { siteContent } from "@/lib/content";
import { FadeUp } from "@/components/ui/FadeUp";

export default function Capabilities() {
  const { capabilities } = siteContent;

  return (
    <section
      id="systems"
      style={{
        background: "transparent",
        borderTop: "1px solid rgba(255,255,255,0.06)",
        paddingTop: "clamp(5rem, 9vw, 8rem)",
        paddingBottom: "clamp(5rem, 9vw, 8rem)",
      }}
    >
      <div className="px-6 sm:px-10 md:px-14 lg:px-20">
        <div className="flex flex-col lg:flex-row lg:gap-16 xl:gap-24 lg:items-start">

          {/* Left column — label + headline + subtitle */}
          <div className="lg:w-[38%] shrink-0 mb-14 lg:mb-0 lg:sticky lg:top-28">
            <FadeUp>
              <p
                style={{
                  fontSize: "10px",
                  letterSpacing: "0.30em",
                  textTransform: "uppercase",
                  color: "rgba(220,218,210,0.28)",
                  marginBottom: "2rem",
                }}
              >
                {capabilities.label}
              </p>
            </FadeUp>

            <FadeUp delay={0.08}>
              <h2
                className="uppercase leading-[0.86]"
                style={{
                  fontFamily: "'Instrument Serif', Georgia, serif",
                  fontStyle: "italic",
                  fontSize: "clamp(3.5rem, 6.5vw, 7rem)",
                  letterSpacing: "-0.04em",
                  color: "rgba(255,255,255,0.95)",
                  marginBottom: "2rem",
                }}
              >
                {capabilities.headline[0]}
                <br />
                <span style={{ color: "rgba(255,255,255,0.26)" }}>
                  {capabilities.headline[1]}
                </span>
              </h2>
            </FadeUp>

            <FadeUp delay={0.16}>
              <p
                style={{
                  fontSize: "clamp(13px, 1.1vw, 15px)",
                  lineHeight: 1.76,
                  color: "rgba(220,218,210,0.45)",
                  maxWidth: "26rem",
                }}
              >
                {capabilities.subtitle}
              </p>
            </FadeUp>
          </div>

          {/* Right column — command panel */}
          <div className="flex-1 min-w-0">
            <FadeUp delay={0.12}>
              <div
                style={{
                  border: "1px solid rgba(255,255,255,0.10)",
                  borderRadius: "1.25rem",
                  overflow: "hidden",
                  background: "rgba(3,5,10,0.50)",
                  backdropFilter: "blur(8px)",
                  WebkitBackdropFilter: "blur(8px)",
                }}
              >
                {/* Panel header bar */}
                <div
                  style={{
                    padding: "11px 20px",
                    borderBottom: "1px solid rgba(255,255,255,0.06)",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <span
                    style={{
                      width: 7,
                      height: 7,
                      borderRadius: "50%",
                      background: "rgba(255,255,255,0.14)",
                      display: "inline-block",
                    }}
                  />
                  <span
                    style={{
                      width: 7,
                      height: 7,
                      borderRadius: "50%",
                      background: "rgba(255,255,255,0.07)",
                      display: "inline-block",
                    }}
                  />
                  <span
                    style={{
                      width: 7,
                      height: 7,
                      borderRadius: "50%",
                      background: "rgba(255,255,255,0.04)",
                      display: "inline-block",
                    }}
                  />
                  <span
                    style={{
                      marginLeft: "auto",
                      fontFamily: "monospace",
                      fontSize: "9px",
                      letterSpacing: "0.22em",
                      textTransform: "uppercase",
                      color: "rgba(220,218,210,0.18)",
                    }}
                  >
                    ACTIVE — {capabilities.items.length} SYSTEMS
                  </span>
                </div>

                {/* Module list — one row per system */}
                {capabilities.items.map((item, i) => (
                  <div
                    key={i}
                    style={{
                      padding:
                        "clamp(22px, 2.8vw, 34px) clamp(20px, 2.5vw, 28px)",
                      borderBottom:
                        i < capabilities.items.length - 1
                          ? "1px solid rgba(255,255,255,0.055)"
                          : "none",
                    }}
                  >
                    {/* Index + tags row */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        justifyContent: "space-between",
                        gap: "12px",
                        marginBottom: "14px",
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "monospace",
                          fontSize: "9px",
                          letterSpacing: "0.20em",
                          color: "rgba(220,218,210,0.22)",
                          paddingTop: "1px",
                          flexShrink: 0,
                        }}
                      >
                        SYS.{item.number}
                      </span>
                      <div
                        style={{
                          display: "flex",
                          gap: "6px",
                          flexWrap: "wrap",
                          justifyContent: "flex-end",
                        }}
                      >
                        {item.tags.map((tag, ti) => (
                          <span key={ti} className="glass-chip">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Title */}
                    <h3
                      style={{
                        fontSize: "clamp(1.05rem, 1.6vw, 1.25rem)",
                        fontWeight: 500,
                        letterSpacing: "-0.02em",
                        color: "rgba(255,255,255,0.90)",
                        marginBottom: "10px",
                        lineHeight: 1.2,
                      }}
                    >
                      {item.title}
                    </h3>

                    {/* Description */}
                    <p
                      style={{
                        fontSize: "clamp(12px, 1vw, 13.5px)",
                        lineHeight: 1.72,
                        color: "rgba(220,218,210,0.46)",
                      }}
                    >
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </FadeUp>
          </div>
        </div>
      </div>
    </section>
  );
}
