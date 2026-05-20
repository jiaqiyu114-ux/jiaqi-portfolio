import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export — compatible with EdgeOne Pages / Aliyun OSS / any CDN host
  output: "export",
  // Images: disable Next.js optimization (static hosts can't run the image server)
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
