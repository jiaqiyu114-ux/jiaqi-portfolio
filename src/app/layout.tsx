import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Jiaqi Yu",
  description:
    "Student. Builder. System Thinker. I am early, but I am serious.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        {/* Fonts via Chinese-accessible mirror — falls back to system fonts gracefully */}
        <link rel="preconnect" href="https://fonts.loli.net" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.loli.net/css2?family=Almarai:wght@300;400;700;800&family=Instrument+Serif:ital@0;1&family=Cinzel:wght@400;600;700&display=swap"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
