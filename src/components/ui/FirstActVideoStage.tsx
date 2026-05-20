"use client";

import { ReactNode } from "react";

/**
 * Sticky layout wrapper for Hero + Capabilities + OperatingIndex.
 * The actual video is now in VideoBackground (fixed, full-page).
 * This component provides the sticky overlay effects and the
 * "sections overlap the viewport" layout trick.
 */
export default function FirstActVideoStage({ children }: { children: ReactNode }) {
  return (
    <div style={{ position: "relative" }}>
      {/* Sticky cinematic overlays — follow viewport while first-act scrolls */}
      <div
        aria-hidden="true"
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          overflow: "hidden",
          pointerEvents: "none",
        }}
      >
        {/* Top/bottom cinematic gradient */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.22) 0%, rgba(0,0,0,0.04) 28%, rgba(0,0,0,0.04) 68%, rgba(0,0,0,0.36) 100%)",
          }}
        />
        {/* Side vignette */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse 108% 100% at 50% 50%, transparent 42%, rgba(0,0,0,0.48) 100%)",
          }}
        />
      </div>

      {/* First-act sections — overlap the sticky overlay */}
      <div style={{ position: "relative", marginTop: "-100vh" }}>
        {children}
      </div>

      {/* Transition fade — OperatingIndex → VisualWorks */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "50vh",
          pointerEvents: "none",
          zIndex: 10,
          background:
            "linear-gradient(to bottom, transparent 0%, rgba(2,4,8,0.22) 36%, rgba(2,4,8,0.75) 68%, rgba(4,6,8,0.95) 88%, rgba(4,6,8,0.98) 100%)",
        }}
      />
    </div>
  );
}
