/**
 * Centralized media asset URLs.
 *
 * Defaults to /public local files. Override with NEXT_PUBLIC_* env vars to
 * point at a CDN (Tencent COS, Aliyun OSS, EdgeOne, etc.) at build time.
 *
 * Example .env.local:
 *   NEXT_PUBLIC_DESKTOP_VIDEO_URL=https://cdn.example.com/hero-bg.mp4
 *   NEXT_PUBLIC_MOBILE_VIDEO_URL=https://cdn.example.com/hero-bg-mobile.mp4
 *   NEXT_PUBLIC_DESKTOP_POSTER_URL=https://cdn.example.com/hero-poster.jpg
 *   NEXT_PUBLIC_MOBILE_POSTER_URL=https://cdn.example.com/hero-poster-mobile.jpg
 *   NEXT_PUBLIC_WECHAT_QR_URL=https://cdn.example.com/wechat-qr.jpg
 */
export const ASSETS = {
  desktopVideo:
    process.env.NEXT_PUBLIC_DESKTOP_VIDEO_URL ?? "/hero-bg.mp4",
  mobileVideo:
    process.env.NEXT_PUBLIC_MOBILE_VIDEO_URL ?? "/hero-bg-mobile.mp4",
  desktopPoster:
    process.env.NEXT_PUBLIC_DESKTOP_POSTER_URL ?? "/hero-poster.jpg",
  mobilePoster:
    process.env.NEXT_PUBLIC_MOBILE_POSTER_URL ?? "/hero-poster-mobile.jpg",
  wechatQr:
    process.env.NEXT_PUBLIC_WECHAT_QR_URL ?? "/contact/wechat-qr.jpg",
} as const;
