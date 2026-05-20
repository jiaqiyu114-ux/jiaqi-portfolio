"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ASSETS } from "@/lib/assets";

/**
 * Full-page fixed video background.
 * Sits at z-index: -10 behind all content.
 * Desktop: ASSETS.desktopVideo. Mobile: ASSETS.mobileVideo with 800ms defer.
 * Poster always present as fallback.
 */
export default function VideoBackground() {
  const [mounted, setMounted]           = useState(false);
  const [isMobile, setIsMobile]         = useState(false);
  const [videoDeferred, setVideoDeferred] = useState(false);
  const [videoReady, setVideoReady]     = useState(false);
  const [videoFailed, setVideoFailed]   = useState(false);

  const videoRef      = useRef<HTMLVideoElement>(null);
  const retryAttached = useRef(false);

  const attachRetry = useCallback((video: HTMLVideoElement) => {
    if (retryAttached.current) return;
    retryAttached.current = true;
    const events = ["touchstart", "pointerdown", "scroll"] as const;
    const handler = () => {
      video.play().catch(() => {});
      events.forEach((ev) => window.removeEventListener(ev, handler));
      retryAttached.current = false;
    };
    events.forEach((ev) =>
      window.addEventListener(ev, handler, { once: true, passive: true })
    );
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    const mq = window.matchMedia("(max-width: 767px)");
    setIsMobile(mq.matches);
    const onChange = (e: MediaQueryListEvent) => {
      setIsMobile(e.matches);
      setVideoReady(false);
      setVideoFailed(false);
      setVideoDeferred(false);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const id = setTimeout(() => setVideoDeferred(true), isMobile ? 800 : 0);
    return () => clearTimeout(id);
  }, [mounted, isMobile]);

  useEffect(() => {
    if (!mounted || !videoDeferred) return;
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    video.play().catch(() => attachRetry(video));
  }, [mounted, isMobile, videoDeferred, attachRetry]);

  const videoSrc  = isMobile ? ASSETS.mobileVideo  : ASSETS.desktopVideo;
  const posterSrc = isMobile ? ASSETS.mobilePoster  : ASSETS.desktopPoster;
  const videoKey  = isMobile ? "mobile" : "desktop";

  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: -10,
        overflow: "hidden",
        pointerEvents: "none",
      }}
    >
      {/* Poster fallback — always rendered */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url('${posterSrc}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: videoReady ? 0 : 0.6,
          transition: "opacity 0.8s ease",
        }}
      />

      {/* Video */}
      {mounted && videoDeferred && !videoFailed && (
        <video
          ref={videoRef}
          key={videoKey}
          src={videoSrc}
          poster={posterSrc}
          autoPlay
          muted
          loop
          playsInline
          preload={isMobile ? "none" : "metadata"}
          onCanPlay={() => setVideoReady(true)}
          onLoadedData={() => setVideoReady(true)}
          onError={() => setVideoFailed(true)}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center",
            opacity: videoReady ? 0.58 : 0,
            transition: "opacity 0.8s ease",
          }}
        />
      )}

      {/* Subtle vignette over video */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 110% 100% at 50% 50%, transparent 38%, rgba(0,0,0,0.42) 100%)",
        }}
      />
    </div>
  );
}
