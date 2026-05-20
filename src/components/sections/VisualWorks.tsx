"use client";

import Image from "next/image";
import { useRef, useState, useEffect, useCallback, useMemo } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { siteContent } from "@/lib/content";
import { generatedWorks, type GeneratedWork } from "@/lib/works.generated";
import { FadeUp } from "@/components/ui/FadeUp";

// ── Deterministic shuffle — stable across SSR/hydration ───────────────────────
function seededShuffle<T>(arr: T[], seed: string): T[] {
  let h = 0;
  for (let i = 0; i < seed.length; i++) { h = ((h << 5) - h) + seed.charCodeAt(i); h |= 0; }
  const out = [...arr];
  for (let i = out.length - 1; i > 0; i--) {
    h = ((h << 5) - h) + i; h |= 0;
    const j = Math.abs(h) % (i + 1);
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

function arToRatio(ar: string): string {
  if (ar === "wide")   return "16/10";
  if (ar === "square") return "1/1";
  return "3/4";
}

// ── Lightbox (portal) ─────────────────────────────────────────────────────────
interface LightboxProps {
  works:      GeneratedWork[];
  index:      number;
  originRect: DOMRect | null;
  onClose:    () => void;
  onPrev:     () => void;
  onNext:     () => void;
}

function LightboxPortal({ works, index, originRect, onClose, onPrev, onNext }: LightboxProps) {
  const work = works[index];

  // Compute target rect once at mount (synchronous — component is client-only)
  const target = useMemo(() => {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const w  = Math.min(vw * 0.92, 1260);
    const h  = Math.min(vh * 0.82, 840);
    return { left: Math.round((vw - w) / 2), top: Math.round((vh - h) / 2), width: Math.round(w), height: Math.round(h) };
  }, []);

  const init = originRect
    ? { left: Math.round(originRect.left), top: Math.round(originRect.top), width: Math.round(originRect.width), height: Math.round(originRect.height) }
    : { left: target.left, top: target.top, width: 60, height: 80 };

  // Keyboard + body scroll lock
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape")     onClose();
      if (e.key === "ArrowLeft")  onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", handler);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", handler);
    };
  }, [onClose, onPrev, onNext]);

  const ctrlBtn: React.CSSProperties = {
    position: "fixed", zIndex: 10002,
    width: 48, height: 48, borderRadius: "50%",
    background: "rgba(20,22,28,0.72)",
    border: "1px solid rgba(255,255,255,0.14)",
    color: "rgba(255,255,255,0.88)",
    display: "flex", alignItems: "center", justifyContent: "center",
    cursor: "pointer",
    backdropFilter: "blur(8px)",
  };

  return (
    <>
      {/* ── Backdrop ── */}
      <motion.div
        style={{ position: "fixed", inset: 0, zIndex: 9999, background: "rgba(0,0,0,0.88)", backdropFilter: "blur(5px)" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.22, ease: "easeOut" }}
        onPointerDown={onClose}
      />

      {/* ── FLIP image container ── */}
      <motion.div
        style={{ position: "fixed", zIndex: 10000, overflow: "hidden", willChange: "transform, width, height", background: "rgba(8,10,14,0.55)" }}
        initial={{ left: init.left, top: init.top, width: init.width, height: init.height, borderRadius: 14, opacity: 0.85 }}
        animate={{ left: target.left, top: target.top, width: target.width, height: target.height, borderRadius: 22, opacity: 1 }}
        exit={{ left: init.left, top: init.top, width: init.width, height: init.height, borderRadius: 14, opacity: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 30, mass: 0.8 }}
        onPointerDown={(e) => e.stopPropagation()}
      >
        {/* Inner image — crossfades on index change */}
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={work.src}
            style={{ position: "absolute", inset: 0 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
          >
            <Image
              src={work.src}
              alt={work.title}
              fill
              sizes="92vw"
              className="object-contain"
              draggable={false}
              priority
            />
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* ── Close ── */}
      <motion.button
        type="button"
        aria-label="Close"
        style={{ ...ctrlBtn, top: 18, right: 18 }}
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.7 }}
        transition={{ duration: 0.18, delay: 0.08 }}
        onPointerDown={(e) => { e.stopPropagation(); onClose(); }}
      >
        <X size={18} strokeWidth={1.8} />
      </motion.button>

      {/* ── Prev ── */}
      <motion.button
        type="button"
        aria-label="Previous"
        style={{ ...ctrlBtn, left: 16, top: "50%", transform: "translateY(-50%)" }}
        initial={{ opacity: 0, x: -8 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -8 }}
        transition={{ duration: 0.18, delay: 0.10 }}
        onPointerDown={(e) => { e.stopPropagation(); onPrev(); }}
      >
        <ChevronLeft size={20} strokeWidth={1.8} />
      </motion.button>

      {/* ── Next ── */}
      <motion.button
        type="button"
        aria-label="Next"
        style={{ ...ctrlBtn, right: 16, top: "50%", transform: "translateY(-50%)" }}
        initial={{ opacity: 0, x: 8 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 8 }}
        transition={{ duration: 0.18, delay: 0.10 }}
        onPointerDown={(e) => { e.stopPropagation(); onNext(); }}
      >
        <ChevronRight size={20} strokeWidth={1.8} />
      </motion.button>

      {/* ── Caption ── */}
      <motion.div
        style={{
          position: "fixed", bottom: 22, left: "50%",
          zIndex: 10002, textAlign: "center",
          transform: "translateX(-50%)",
          pointerEvents: "none",
        }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        transition={{ duration: 0.22, delay: 0.12 }}
      >
        <span style={{ fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(220,218,210,0.50)" }}>
          {String(index + 1).padStart(2, "0")} / {String(works.length).padStart(2, "0")}
        </span>
        <span style={{ margin: "0 8px", color: "rgba(255,255,255,0.20)" }}>·</span>
        <span style={{ fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(220,218,210,0.50)" }}>
          {work.title}
        </span>
        <div style={{ fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", marginTop: 4, color: "rgba(180,20,20,0.65)" }}>
          {work.category}
        </div>
      </motion.div>
    </>
  );
}

// ── Gallery Row ───────────────────────────────────────────────────────────────
type PressStart = { x: number; y: number; time: number; index: number; rect: DOMRect };

interface RowProps {
  rowWorks:  GeneratedWork[];
  allWorks:  GeneratedWork[];
  direction: "left" | "right";
  duration:  number;
  height:    string;
  animDelay?: string;
  opacity?:  number;
  className?: string;
  onOpen:    (idx: number, rect: DOMRect) => void;
}

function GalleryRow({ rowWorks, allWorks, direction, duration, height, animDelay = "0s", opacity = 1, className = "", onOpen }: RowProps) {
  const containerRef  = useRef<HTMLDivElement>(null);
  const stripRef      = useRef<HTMLDivElement>(null);

  const isDownRef      = useRef(false);
  const isDraggingRef  = useRef(false);
  const pressStartRef  = useRef<PressStart | null>(null);
  const startXRef      = useRef(0);
  const startSLRef     = useRef(0);   // startScrollLeft
  const scrollModeRef  = useRef(false);

  const [scrollMode, setScrollMode] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const COPIES = rowWorks.length >= 12 ? 2 : 3;
  const strip  = Array.from({ length: COPIES }, () => rowWorks).flat();
  const anim   = direction === "left" ? "gallery-drift-left" : "gallery-drift-right";

  // One-time: freeze animation position into scrollLeft, switch to scroll mode
  const activateScrollMode = useCallback(() => {
    if (scrollModeRef.current) return;
    const c = containerRef.current;
    const s = stripRef.current;
    if (!c || !s) return;
    const tx = (() => { const t = window.getComputedStyle(s).transform; return t && t !== "none" ? new DOMMatrix(t).m41 : 0; })();
    scrollModeRef.current = true;
    c.style.overflowX = "auto";
    s.style.animation = "none";
    c.scrollLeft = Math.max(0, -tx);
    setScrollMode(true);
  }, []);

  const onPointerDown = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    activateScrollMode();
    const c = containerRef.current;
    if (!c) return;

    // Record if tap started on a work card
    const cardEl = (e.target as HTMLElement).closest("[data-work-index]") as HTMLElement | null;
    if (cardEl) {
      pressStartRef.current = {
        x:     e.clientX,
        y:     e.clientY,
        time:  Date.now(),
        index: parseInt(cardEl.getAttribute("data-work-index") ?? "-1", 10),
        rect:  cardEl.getBoundingClientRect(),
      };
    } else {
      pressStartRef.current = null;
    }

    isDownRef.current     = true;
    isDraggingRef.current = false;
    startXRef.current     = e.clientX;
    startSLRef.current    = c.scrollLeft;
    c.setPointerCapture(e.pointerId);
    setIsDragging(false);
  }, [activateScrollMode]);

  const onPointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDownRef.current) return;
    const c = containerRef.current;
    if (!c) return;
    const dx = e.clientX - startXRef.current;
    if (Math.abs(dx) > 8) {
      isDraggingRef.current = true;
      setIsDragging(true);
    }
    c.scrollLeft = startSLRef.current - dx;
  }, []);

  const onPointerUp = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    const c = containerRef.current;
    if (c && isDownRef.current) { try { c.releasePointerCapture(e.pointerId); } catch {} }

    const start = pressStartRef.current;
    pressStartRef.current = null;
    isDownRef.current = false;

    if (start && start.index >= 0) {
      const dx   = e.clientX - start.x;
      const dy   = e.clientY - start.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const dur  = Date.now() - start.time;
      if (dist <= 8 && dur <= 650 && !isDraggingRef.current) {
        onOpen(start.index, start.rect);
      }
    }

    setTimeout(() => { isDraggingRef.current = false; setIsDragging(false); }, 0);
  }, [onOpen]);

  return (
    <div className={`gallery-row visual-gallery-row${isDragging ? " is-dragging" : ""} ${className}`}
      style={{ opacity, width: "100%", position: "relative" }}>
      <div
        ref={containerRef}
        className="no-scrollbar"
        style={{ overflowX: scrollMode ? "auto" : "hidden", overflowY: "hidden", cursor: isDragging ? "grabbing" : "grab", userSelect: "none", WebkitOverflowScrolling: "touch", overscrollBehaviorX: "contain" }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
      >
        <div
          ref={stripRef}
          className="flex flex-nowrap gallery-strip"
          style={{
            height,
            width: "max-content",
            gap: "clamp(10px, 1.4vw, 20px)",
            animationName:           scrollMode ? "none" : anim,
            animationDuration:       `${duration}s`,
            animationTimingFunction: "linear",
            animationIterationCount: "infinite",
            animationDelay:          animDelay,
            willChange:              scrollMode ? "auto" : "transform",
          }}
        >
          {strip.map((work, i) => {
            const globalIdx = allWorks.findIndex((w) => w.src === work.src);
            const ratio = arToRatio(work.ar);
            return (
              <div
                key={`${work.src}-${i}`}
                role="button"
                tabIndex={0}
                aria-label={`View ${work.title}`}
                data-work-index={globalIdx >= 0 ? globalIdx : 0}
                className="group relative flex-shrink-0 overflow-hidden rounded-xl visual-work-card work-card"
                style={{
                  height:      "100%",
                  aspectRatio: ratio,
                  border:      "1px solid rgba(255,255,255,0.10)",
                  background:  "rgba(255,255,255,0.03)",
                  boxShadow:   "0 2px 20px rgba(0,0,0,0.32)",
                  cursor:      "zoom-in",
                  flexShrink:  0,
                  outline:     "none",
                }}
                onClick={(e) => {
                  // Keyboard / assistive tech fallback
                  const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
                  onOpen(globalIdx >= 0 ? globalIdx : 0, rect);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
                    onOpen(globalIdx >= 0 ? globalIdx : 0, rect);
                  }
                }}
              >
                <Image
                  src={work.src}
                  alt={work.title}
                  fill
                  sizes="(max-width: 768px) 72vw, (max-width: 1280px) 32vw, 420px"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03] select-none"
                  loading="lazy"
                  draggable={false}
                />
                {/* Hover overlay */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 pointer-events-none"
                  style={{ background: "linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.22) 55%, transparent 100%)" }}
                >
                  <span style={{ display: "block", marginBottom: 3, color: "rgba(180,20,20,0.92)", fontSize: 9, letterSpacing: "0.22em", textTransform: "uppercase" }}>
                    {work.category}
                  </span>
                  <p style={{ color: "rgba(255,255,255,0.96)", fontSize: 13, fontWeight: 600, lineHeight: 1.3 }}>
                    {work.title}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ── Main Section ──────────────────────────────────────────────────────────────
export default function VisualWorks() {
  const { visualWorks } = siteContent;

  const works: GeneratedWork[] = generatedWorks.length > 0
    ? generatedWorks
    : visualWorks.items.map((w) => ({ src: w.image, title: w.title, category: w.category, ar: "portrait" }));

  const rowA = seededShuffle(works, "row-a");
  const rowB = seededShuffle(works, "row-b");
  const rowC = seededShuffle(works, "row-c");

  const [lightboxIdx, setLightboxIdx]     = useState<number | null>(null);
  const [originRect, setOriginRect]       = useState<DOMRect | null>(null);
  const [mounted, setMounted]             = useState(false);

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { setMounted(true); }, []);

  const openLightbox = useCallback((idx: number, rect: DOMRect) => {
    setOriginRect(rect);
    setLightboxIdx(idx);
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxIdx(null);
    // Keep originRect alive for exit animation — cleared after AnimatePresence exit completes
  }, []);

  const prevImage = useCallback(() => {
    setLightboxIdx((i) => i === null ? null : (i - 1 + works.length) % works.length);
  }, [works.length]);

  const nextImage = useCallback(() => {
    setLightboxIdx((i) => i === null ? null : (i + 1) % works.length);
  }, [works.length]);

  return (
    <section
      id="work"
      className="relative py-28 md:py-40"
      style={{ background: "linear-gradient(to bottom, rgba(4,6,8,0.82) 0%, rgba(4,6,8,0.55) 30%, rgba(4,6,8,0.62) 70%, rgba(4,6,8,0.92) 100%)" }}
    >
      {/* Glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
        <div className="absolute" style={{ bottom: "-8%", left: "-8%", width: "42%", height: "55%", background: "radial-gradient(ellipse at center, rgba(140,10,10,0.06) 0%, transparent 65%)", filter: "blur(80px)" }} />
        <div className="absolute" style={{ top: "-5%", right: "-5%", width: "44%", height: "48%", background: "radial-gradient(ellipse at center, rgba(36,48,108,0.07) 0%, transparent 62%)", filter: "blur(70px)" }} />
      </div>

      {/* Section header */}
      <div className="relative z-10 px-6 sm:px-10 md:px-14 lg:px-20 mb-16 md:mb-24">
        <FadeUp>
          <p className="text-[10px] uppercase tracking-[0.30em] mb-8" style={{ color: "rgba(220,218,210,0.30)" }}>
            {visualWorks.label}
          </p>
        </FadeUp>
        <FadeUp delay={0.08}>
          <h2 className="uppercase tracking-[0.05em] leading-[0.88] mb-6"
            style={{ fontFamily: "'Cinzel', serif", fontWeight: 600, fontSize: "clamp(2.8rem, 7vw, 6.5rem)", color: "rgba(255,255,255,0.95)" }}>
            {visualWorks.headline[0]}<br />
            <span style={{ color: "rgba(255,255,255,0.28)" }}>{visualWorks.headline[1]}</span>
          </h2>
        </FadeUp>
        <FadeUp delay={0.14}>
          <p className="text-sm md:text-[15px] leading-relaxed max-w-md" style={{ color: "rgba(220,218,210,0.46)" }}>
            {visualWorks.subtitle}
          </p>
        </FadeUp>
        <FadeUp delay={0.20}>
          <p className="mt-3 text-[10px] uppercase tracking-[0.20em]" style={{ color: "rgba(220,218,210,0.20)" }}>
            Drag to explore · Tap to view
          </p>
        </FadeUp>
      </div>

      {/* Gallery */}
      <div className="relative z-10 flex flex-col gap-3 md:gap-4">
        <GalleryRow rowWorks={rowA} allWorks={works} direction="left"  duration={55} height="clamp(220px, 26vw, 340px)"              onOpen={openLightbox} />
        <GalleryRow rowWorks={rowB} allWorks={works} direction="right" duration={68} height="clamp(190px, 22vw, 300px)" animDelay="-18s" onOpen={openLightbox} />
        <GalleryRow rowWorks={rowC} allWorks={works} direction="left"  duration={80} height="clamp(160px, 18vw, 260px)" animDelay="-32s" opacity={0.55} className="hidden md:block" onOpen={openLightbox} />

        <div className="absolute inset-y-0 left-0 pointer-events-none" style={{ width: 80, background: "linear-gradient(to right, rgba(4,5,10,0.82) 0%, transparent 100%)", zIndex: 20 }} />
        <div className="absolute inset-y-0 right-0 pointer-events-none" style={{ width: 80, background: "linear-gradient(to left, rgba(4,5,10,0.82) 0%, transparent 100%)", zIndex: 20 }} />
        <div className="absolute bottom-0 left-0 right-0 pointer-events-none" style={{ height: "28vh", background: "linear-gradient(to bottom, transparent 0%, rgba(4,5,10,0.60) 55%, rgba(4,6,8,0.94) 85%, rgba(4,6,8,0.98) 100%)", zIndex: 20 }} />
      </div>

      {/* Footer note */}
      <div className="relative z-10 px-6 sm:px-10 md:px-14 lg:px-20 mt-12 md:mt-16">
        <p style={{ fontSize: "clamp(11px, 1vw, 13px)", letterSpacing: "0.04em", color: "rgba(220,218,210,0.28)", borderLeft: "1px solid rgba(255,255,255,0.10)", paddingLeft: 14, lineHeight: 1.6, maxWidth: "38rem" }}>
          {visualWorks.footerNote}
        </p>
      </div>

      {/* ── Lightbox — portal to document.body ── */}
      {mounted && createPortal(
        <AnimatePresence mode="sync" onExitComplete={() => setOriginRect(null)}>
          {lightboxIdx !== null && (
            <LightboxPortal
              key="lightbox"
              works={works}
              index={lightboxIdx}
              originRect={originRect}
              onClose={closeLightbox}
              onPrev={prevImage}
              onNext={nextImage}
            />
          )}
        </AnimatePresence>,
        document.body
      )}
    </section>
  );
}
