"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { siteContent } from "@/lib/content";

export default function Navbar() {
  return (
    <motion.nav
      className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-max"
      initial={{ y: -18, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
    >
      <div className="liquid-glass-strong rounded-full flex items-center px-1.5 py-1.5 gap-0">

        {/* Logo mark */}
        <Link
          href="/"
          className="flex items-center justify-center w-8 h-8 rounded-full shrink-0"
          aria-label="Jiaqi Yu — Home"
        >
          <span
            className="font-serif italic text-white/80 text-[15px] leading-none select-none"
            style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
          >
            j
          </span>
        </Link>

        {/* Separator — desktop only */}
        <div
          className="hidden md:block h-[14px] w-px mx-2 shrink-0"
          style={{ background: "rgba(255,255,255,0.11)" }}
        />

        {/* Nav links — hidden on mobile */}
        <div className="hidden md:flex items-center">
          {siteContent.nav.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-[11px] tracking-[0.04em] px-3 py-1.5 rounded-full whitespace-nowrap transition-colors duration-200"
              style={{ color: "rgba(220,218,210,0.52)" }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.color =
                  "rgba(255,255,255,0.90)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.color =
                  "rgba(220,218,210,0.52)";
              }}
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* Separator — desktop only */}
        <div
          className="hidden md:block h-[14px] w-px mx-2 shrink-0"
          style={{ background: "rgba(255,255,255,0.11)" }}
        />

        {/* CTA — always visible */}
        <a
          href="#contact"
          className="flex items-center gap-1 bg-white text-black text-[11px] font-medium tracking-[0.02em] rounded-full px-3.5 py-1.5 hover:bg-white/90 transition-colors duration-200 shrink-0 mr-0.5"
        >
          <span className="hidden sm:inline">{siteContent.navCta}</span>
          <span className="sm:hidden">Chat</span>
          <ArrowUpRight size={10} strokeWidth={2.5} />
        </a>
      </div>
    </motion.nav>
  );
}
