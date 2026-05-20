"use client";

import { siteContent } from "@/lib/content";
import { FadeUp } from "@/components/ui/FadeUp";

type BlockData = {
  tag: string;
  heading: string;
  items: string[];
  divider?: boolean;
};

function IndexBlock({ tag, heading, items, divider }: BlockData) {
  return (
    <div
      className={divider ? "index-block-divider" : ""}
      style={{ padding: "clamp(24px, 3vw, 40px)" }}
    >
      <p
        style={{
          fontSize: "9px",
          letterSpacing: "0.28em",
          textTransform: "uppercase",
          color: "rgba(220,218,210,0.26)",
          marginBottom: "6px",
        }}
      >
        {tag}
      </p>
      <p
        style={{
          fontSize: "clamp(12px, 1.1vw, 14px)",
          fontWeight: 500,
          color: "rgba(255,255,255,0.62)",
          marginBottom: "20px",
          lineHeight: 1.3,
        }}
      >
        {heading}
      </p>
      <div
        style={{
          height: "1px",
          background: "rgba(255,255,255,0.07)",
          marginBottom: "4px",
        }}
      />
      <ul>
        {items.map((item, i) => (
          <li
            key={i}
            style={{
              padding: "10px 0",
              fontSize: "clamp(11.5px, 1vw, 13px)",
              color: "rgba(220,218,210,0.50)",
              lineHeight: 1.45,
              borderBottom:
                i < items.length - 1
                  ? "1px solid rgba(255,255,255,0.05)"
                  : "none",
            }}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function OperatingIndex() {
  const { operatingIndex } = siteContent;

  const blocks: BlockData[] = [
    {
      tag: "PROOF",
      heading: operatingIndex.proof.heading,
      items: operatingIndex.proof.items,
      divider: true,
    },
    {
      tag: "PRINCIPLES",
      heading: operatingIndex.principles.heading,
      items: operatingIndex.principles.items,
      divider: true,
    },
    {
      tag: "NOW",
      heading: operatingIndex.now.heading,
      items: operatingIndex.now.items,
    },
  ];

  return (
    <section
      id="index"
      style={{
        background: "transparent",
        borderTop: "1px solid rgba(255,255,255,0.06)",
        paddingTop: "clamp(5rem, 9vw, 8rem)",
        paddingBottom: "clamp(5rem, 9vw, 8rem)",
      }}
    >
      <div className="px-6 sm:px-10 md:px-14 lg:px-20">
        {/* Label */}
        <FadeUp>
          <p
            style={{
              fontSize: "10px",
              letterSpacing: "0.30em",
              textTransform: "uppercase",
              color: "rgba(220,218,210,0.28)",
              marginBottom: "3rem",
            }}
          >
            {operatingIndex.label}
          </p>
        </FadeUp>

        {/* Main layout: headline left + 3 blocks right */}
        <div className="flex flex-col lg:flex-row lg:gap-20 xl:gap-28 lg:items-start">
          {/* Left: large editorial headline */}
          <div className="lg:w-[28%] shrink-0 mb-12 lg:mb-0">
            <FadeUp delay={0.06}>
              <h2
                className="uppercase leading-[0.86]"
                style={{
                  fontFamily: "'Instrument Serif', Georgia, serif",
                  fontStyle: "italic",
                  fontSize: "clamp(3rem, 5.5vw, 5.5rem)",
                  letterSpacing: "-0.04em",
                  color: "rgba(255,255,255,0.95)",
                }}
              >
                {operatingIndex.headline[0]}
                <br />
                <span style={{ color: "rgba(255,255,255,0.26)" }}>
                  {operatingIndex.headline[1]}
                </span>
              </h2>
            </FadeUp>
          </div>

          {/* Right: archive index panel */}
          <div className="flex-1 min-w-0">
            <FadeUp delay={0.12}>
              <div
                className="grid grid-cols-1 sm:grid-cols-3"
                style={{
                  border: "1px solid rgba(255,255,255,0.10)",
                  borderRadius: "1rem",
                  overflow: "hidden",
                  background: "rgba(3,5,10,0.44)",
                  backdropFilter: "blur(8px)",
                  WebkitBackdropFilter: "blur(8px)",
                }}
              >
                {blocks.map((block, i) => (
                  <IndexBlock key={i} {...block} />
                ))}
              </div>
            </FadeUp>
          </div>
        </div>
      </div>
    </section>
  );
}
