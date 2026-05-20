"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { ArrowUpRight, X, ZoomIn } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { siteContent } from "@/lib/content";
import { ASSETS } from "@/lib/assets";
import { FadeUp } from "@/components/ui/FadeUp";

// ── QR Lightbox (portal) ──────────────────────────────────────────────────────
function QrLightbox({ src, onClose }: { src: string; onClose: () => void }) {
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", handler);
    };
  }, [onClose]);

  return (
    <>
      {/* Backdrop */}
      <motion.div
        style={{ position: "fixed", inset: 0, zIndex: 10000, background: "rgba(0,0,0,0.90)", backdropFilter: "blur(6px)" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.22 }}
        onPointerDown={onClose}
      />

      {/* QR card */}
      <motion.div
        style={{
          position: "fixed",
          zIndex: 10001,
          top: "50%", left: "50%",
          display: "flex", flexDirection: "column", alignItems: "center",
          gap: 20,
        }}
        initial={{ opacity: 0, scale: 0.92, y: "calc(-50% + 12px)", x: "-50%" }}
        animate={{ opacity: 1, scale: 1,    y: "-50%",              x: "-50%" }}
        exit={{   opacity: 0, scale: 0.96,  y: "calc(-50% + 8px)",  x: "-50%" }}
        transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
        onPointerDown={(e) => e.stopPropagation()}
      >
        {/* White QR container */}
        <div
          style={{
            background: "#fff",
            borderRadius: 20,
            padding: "20px",
            boxShadow: "0 24px 64px rgba(0,0,0,0.72)",
            width: "min(82vw, 360px)",
          }}
        >
          <Image
            src={src}
            alt="WeChat QR — baixiaokao"
            width={360}
            height={360}
            style={{ width: "100%", height: "auto", display: "block", borderRadius: 10 }}
            priority
          />
        </div>

        {/* Caption */}
        <div style={{ textAlign: "center" }}>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.82)", letterSpacing: "0.04em", marginBottom: 4 }}>
            微信号：<span style={{ fontWeight: 600 }}>baixiaokao</span>
          </p>
          <p style={{ fontSize: 11, color: "rgba(220,218,210,0.46)", letterSpacing: "0.08em" }}>
            扫码或搜索微信号添加
          </p>
        </div>
      </motion.div>

      {/* Close button */}
      <motion.button
        type="button"
        aria-label="关闭二维码"
        style={{
          position: "fixed", top: 18, right: 18, zIndex: 10002,
          width: 44, height: 44, borderRadius: "50%",
          background: "rgba(20,22,28,0.72)",
          border: "1px solid rgba(255,255,255,0.14)",
          color: "rgba(255,255,255,0.88)",
          display: "flex", alignItems: "center", justifyContent: "center",
          cursor: "pointer", backdropFilter: "blur(8px)",
        }}
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.7 }}
        transition={{ duration: 0.18, delay: 0.06 }}
        onPointerDown={(e) => { e.stopPropagation(); onClose(); }}
      >
        <X size={16} strokeWidth={2} />
      </motion.button>
    </>
  );
}

// ── Main Section ──────────────────────────────────────────────────────────────
export default function Contact() {
  const { contact } = siteContent;
  const [qrOpen, setQrOpen]   = useState(false);
  const [mounted, setMounted] = useState(false);

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { setMounted(true); }, []);

  return (
    <section
      id="contact"
      className="relative isolate"
      style={{
        paddingTop: "clamp(5rem, 9vw, 8rem)",
        paddingBottom: "clamp(4rem, 8vw, 6rem)",
        background:
          "linear-gradient(to bottom, rgba(4,6,8,0.55) 0%, rgba(4,6,8,0.72) 30%, rgba(4,6,8,0.88) 65%, rgba(2,3,6,0.97) 100%)",
      }}
    >
      {/* Atmosphere glows */}
      <div className="absolute pointer-events-none" style={{ top: "-18%", left: "-5%", width: "65%", height: "48%", background: "radial-gradient(ellipse at center, rgba(28,58,108,0.08) 0%, transparent 65%)", filter: "blur(90px)", zIndex: 0 }} />
      <div className="absolute pointer-events-none" style={{ top: "-12%", right: "-6%", width: "50%", height: "50%", background: "radial-gradient(ellipse at center, rgba(40,52,108,0.06) 0%, transparent 62%)", filter: "blur(90px)", zIndex: 0 }} />
      <div className="absolute top-0 left-0 right-0" style={{ height: 1, background: "rgba(255,255,255,0.04)", zIndex: 0 }} />

      {/* Content */}
      <div
        className="relative z-10 px-6 sm:px-10 md:px-14 lg:px-20"
        style={{ maxWidth: "min(1180px, 92vw)", margin: "0 auto" }}
      >
        {/* Kicker */}
        <FadeUp>
          <p className="text-[10px] uppercase tracking-[0.30em] mb-10 md:mb-12" style={{ color: "rgba(220,218,210,0.28)" }}>
            {contact.label}
          </p>
        </FadeUp>

        {/* Two-column layout */}
        <div className="flex flex-col md:flex-row md:items-start md:gap-14 lg:gap-20">

          {/* Left — headline + body + arrow */}
          <div className="md:flex-1 mb-10 md:mb-0">
            <FadeUp delay={0.06}>
              <div style={{ overflow: "hidden", marginBottom: "1rem" }}>
                <span className="block text-white uppercase" style={{ fontFamily: "'Cinzel', serif", fontWeight: 600, fontSize: "clamp(2.4rem, 6.5vw, 6rem)", letterSpacing: "-0.03em", lineHeight: 0.9, marginBottom: "0.05em" }}>
                  START A
                </span>
                <span className="block uppercase" style={{ fontFamily: "'Cinzel', serif", fontWeight: 600, fontSize: "clamp(2rem, 5.5vw, 5.2rem)", letterSpacing: "-0.04em", lineHeight: 0.9, color: "rgba(255,255,255,0.28)" }}>
                  CONVERSATION.
                </span>
              </div>
            </FadeUp>

            <FadeUp delay={0.14}>
              <p className="text-[14px] md:text-[15px] leading-relaxed mb-8 md:mb-10" style={{ color: "rgba(220,218,210,0.46)", maxWidth: "32rem" }}>
                If something here resonates, send a signal.
                <br />
                I am building in public — visual direction, systems, writing, and long-term output.
              </p>
            </FadeUp>

            {/* Arrow */}
            <FadeUp delay={0.22}>
              <div className="hidden md:flex items-center gap-3">
                <div style={{ width: 40, height: 1, background: "rgba(255,255,255,0.20)" }} />
                <motion.span
                  style={{ fontSize: "clamp(1.4rem, 2.5vw, 2rem)", color: "rgba(220,218,210,0.48)", lineHeight: 1, display: "block" }}
                  animate={{ x: [0, 5, 0], y: [0, -3, 0] }}
                  transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                >
                  ↗
                </motion.span>
                <span style={{ fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(220,218,210,0.28)" }}>
                  Reach out
                </span>
              </div>
              <div className="flex md:hidden items-center gap-3">
                <div style={{ width: 1, height: 28, background: "rgba(255,255,255,0.18)" }} />
                <motion.span
                  style={{ fontSize: "1.3rem", color: "rgba(220,218,210,0.42)", lineHeight: 1 }}
                  animate={{ y: [0, 5, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  ↓
                </motion.span>
                <span style={{ fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(220,218,210,0.26)" }}>
                  Reach out
                </span>
              </div>
            </FadeUp>
          </div>

          {/* Right — contact cards */}
          <motion.div
            className="md:w-[400px] lg:w-[440px] flex flex-col gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* ── WeChat card ── */}
            <div
              style={{
                border: "1px solid rgba(255,255,255,0.09)",
                borderRadius: "1.25rem",
                padding: "clamp(18px, 3vw, 28px)",
                background: "rgba(255,255,255,0.030)",
                display: "flex",
                gap: 16,
                alignItems: "flex-start",
                transition: "border-color 0.35s ease, background 0.35s ease",
              }}
              onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "rgba(255,255,255,0.18)"; el.style.background = "rgba(255,255,255,0.045)"; }}
              onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "rgba(255,255,255,0.09)"; el.style.background = "rgba(255,255,255,0.030)"; }}
            >
              {/* Text */}
              <div className="flex-1 min-w-0">
                <p style={{ fontSize: 9, letterSpacing: "0.28em", textTransform: "uppercase", color: "rgba(220,218,210,0.28)", marginBottom: 8 }}>
                  WeChat
                </p>
                {/* WeChat ID — big and clear */}
                <p style={{ fontSize: "clamp(1rem, 2vw, 1.25rem)", fontWeight: 600, letterSpacing: "0.02em", color: "rgba(255,255,255,0.92)", marginBottom: 6 }}>
                  {contact.wechat}
                </p>
                {/* Explicit label */}
                <p style={{ fontSize: 11, color: "rgba(220,218,210,0.38)", lineHeight: 1.5 }}>
                  微信号 · 扫码或搜索添加
                </p>
              </div>

              {/* QR — clickable */}
              <button
                type="button"
                aria-label="放大微信二维码"
                onClick={() => setQrOpen(true)}
                className="qr-zoom-btn"
                style={{
                  position: "relative",
                  width: "clamp(76px, 16vw, 104px)",
                  aspectRatio: "1",
                  borderRadius: 10,
                  background: "rgba(255,255,255,0.95)",
                  padding: 7,
                  overflow: "hidden",
                  flexShrink: 0,
                  cursor: "zoom-in",
                  border: "1px solid rgba(255,255,255,0.12)",
                  transition: "transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.transform   = "scale(1.04)";
                  el.style.borderColor = "rgba(255,255,255,0.38)";
                  el.style.boxShadow   = "0 4px 20px rgba(0,0,0,0.36)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.transform   = "scale(1)";
                  el.style.borderColor = "rgba(255,255,255,0.12)";
                  el.style.boxShadow   = "none";
                }}
              >
                <Image
                  src={ASSETS.wechatQr}
                  alt="WeChat QR — baixiaokao"
                  width={140}
                  height={140}
                  style={{ width: "100%", height: "100%", objectFit: "contain", borderRadius: 5, display: "block" }}
                />
                {/* Zoom hint — top-right corner */}
                <span
                  style={{
                    position: "absolute", top: 5, right: 5,
                    background: "rgba(0,0,0,0.38)",
                    borderRadius: 4,
                    padding: "1px 3px",
                    display: "flex", alignItems: "center",
                    pointerEvents: "none",
                  }}
                >
                  <ZoomIn size={9} strokeWidth={2} style={{ color: "rgba(255,255,255,0.80)" }} />
                </span>
              </button>
            </div>

            {/* ── Email card ── */}
            <a
              href={`mailto:${contact.email}`}
              className="group block"
              style={{
                border: "1px solid rgba(255,255,255,0.09)",
                borderRadius: "1.25rem",
                padding: "clamp(18px, 3vw, 28px)",
                background: "rgba(255,255,255,0.030)",
                transition: "border-color 0.35s ease, background 0.35s ease",
                textDecoration: "none",
              }}
              onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "rgba(255,255,255,0.18)"; el.style.background = "rgba(255,255,255,0.045)"; }}
              onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "rgba(255,255,255,0.09)"; el.style.background = "rgba(255,255,255,0.030)"; }}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p style={{ fontSize: 9, letterSpacing: "0.28em", textTransform: "uppercase", color: "rgba(220,218,210,0.28)", marginBottom: 8 }}>
                    Email
                  </p>
                  <p style={{ fontSize: "clamp(0.80rem, 1.5vw, 0.95rem)", fontWeight: 500, color: "rgba(255,255,255,0.88)", wordBreak: "break-all", lineHeight: 1.4, marginBottom: 6 }}>
                    {contact.email}
                  </p>
                  <p style={{ fontSize: 11, color: "rgba(220,218,210,0.36)", lineHeight: 1.5 }}>
                    For collaboration, feedback, or a serious conversation.
                  </p>
                </div>
                <ArrowUpRight
                  size={17} strokeWidth={1.6}
                  className="flex-shrink-0 mt-0.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  style={{ color: "rgba(220,218,210,0.34)" }}
                />
              </div>
            </a>
          </motion.div>
        </div>

        {/* Footer */}
        <div
          className="pt-7 mt-14 md:mt-18 border-t flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
          style={{ borderColor: "rgba(255,255,255,0.06)" }}
        >
          <span className="text-[11px] tracking-[0.06em]" style={{ color: "rgba(220,218,210,0.28)" }}>
            Jiaqi Yu · {new Date().getFullYear()}
          </span>
          <span className="text-[11px] uppercase tracking-[0.16em]" style={{ fontFamily: "'Cinzel', serif", color: "rgba(220,218,210,0.18)" }}>
            Student / Builder / System Thinker
          </span>
        </div>
      </div>

      {/* ── QR Lightbox — portal to document.body (bypasses isolate stacking context) ── */}
      {mounted && createPortal(
        <AnimatePresence mode="sync">
          {qrOpen && (
            <QrLightbox
              key="qr-lightbox"
              src={ASSETS.wechatQr}
              onClose={() => setQrOpen(false)}
            />
          )}
        </AnimatePresence>,
        document.body
      )}
    </section>
  );
}
