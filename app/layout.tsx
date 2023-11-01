import { GoogleTagManager } from "@next/third-parties/google";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "OnlyGames: The Ultimate Collection of Classic Word Games",
  description:
    "Discover a curated collection of your favorite word games at OnlyGames. From nostalgic classics to unique twists on popular games, indulge in hours of wordplay fun. Whether it's a tribute or an original, we have a word challenge for everyone!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
      <GoogleTagManager gtmId="GTM-T86BBK36" />
      <Analytics />
    </html>
  );
}
