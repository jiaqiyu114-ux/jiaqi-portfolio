"use client";

import { motion } from "framer-motion";

/*
 * Slow-drifting coloured blobs that create the aurora / cinematic glow
 * inside the Hero container. Uses mix-blend-mode:screen so each blob
 * adds light without washing out the dark base.
 *
 * To tweak colours: edit the `color` fields below.
 * To tune intensity: adjust the alpha channel (last number) in each rgba().
 * To change speed: adjust `dur` (seconds per full cycle).
 */

interface Blob {
  color: string;
  w: string;
  h: string;
  pos: React.CSSProperties;
  blur: number;
  dur: number;
  delay: number;
  drift: {
    scale: number[];
    x: number[];
    y: number[];
  };
}

const blobs: Blob[] = [
  {
    // warm amber / gold — bottom-left key light
    color: "rgba(255, 148, 44, 0.32)",
    w: "72vw",
    h: "52vw",
    pos: { bottom: "-18%", left: "-10%" },
    blur: 120,
    dur: 18,
    delay: 0,
    drift: { scale: [1, 1.06, 0.97, 1.04, 1], x: [0, 22, -14, 12, 0], y: [0, -18, 11, -9, 0] },
  },
  {
    // deep indigo / violet — top-right fill
    color: "rgba(68, 88, 248, 0.24)",
    w: "56vw",
    h: "48vw",
    pos: { top: "-12%", right: "-8%" },
    blur: 110,
    dur: 22,
    delay: 3,
    drift: { scale: [1, 0.95, 1.07, 0.98, 1], x: [0, -18, 14, -10, 0], y: [0, 14, -10, 8, 0] },
  },
  {
    // teal / cyan accent — centre
    color: "rgba(68, 210, 158, 0.14)",
    w: "44vw",
    h: "38vw",
    pos: { top: "25%", left: "28%" },
    blur: 100,
    dur: 26,
    delay: 7,
    drift: { scale: [1, 1.08, 0.95, 1.05, 1], x: [0, 12, -8, 16, 0], y: [0, -10, 14, -6, 0] },
  },
  {
    // deep crimson / orange — lower-right
    color: "rgba(215, 72, 44, 0.16)",
    w: "50vw",
    h: "44vw",
    pos: { bottom: "5%", right: "10%" },
    blur: 130,
    dur: 20,
    delay: 11,
    drift: { scale: [1, 0.97, 1.06, 0.96, 1], x: [0, -14, 10, -18, 0], y: [0, 12, -14, 8, 0] },
  },
];

export function AmbientBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {blobs.map((b, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: b.w,
            height: b.h,
            background: `radial-gradient(circle, ${b.color} 0%, transparent 68%)`,
            filter: `blur(${b.blur}px)`,
            mixBlendMode: "screen",
            willChange: "transform",
            ...b.pos,
          }}
          animate={b.drift}
          transition={{
            duration: b.dur,
            delay: b.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
