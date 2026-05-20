"use client";

import { CinematicVisual } from "./CinematicVisual";

/**
 * MediaFrame — hero background layer.
 * Default: CSS-generated CinematicVisual.
 *
 * To swap in real media:
 *   Video — place file at public/hero-bg.mp4, then pass videoSrc="/hero-bg.mp4"
 *   Image — place file at public/hero-bg.jpg, then pass imageSrc="/hero-bg.jpg"
 *
 * The colour-grade overlay is always rendered on top of the media layer
 * so contrast and legibility stay consistent regardless of source.
 */
type MediaFrameProps = {
  videoSrc?: string;
  imageSrc?: string;
};

export function MediaFrame({ videoSrc, imageSrc }: MediaFrameProps) {
  if (videoSrc) {
    return (
      <>
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src={videoSrc}
          autoPlay
          muted
          loop
          playsInline
        />
        {/* Warm colour multiply to keep video toned */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "rgba(20,10,4,0.28)", mixBlendMode: "multiply" }}
        />
      </>
    );
  }

  if (imageSrc) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        className="absolute inset-0 w-full h-full object-cover"
        src={imageSrc}
        alt=""
      />
    );
  }

  return <CinematicVisual />;
}
