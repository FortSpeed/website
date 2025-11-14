import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter, Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import dynamic from "next/dynamic";

// Lazy load heavy components (client-side only)
// Note: In Next.js 16, ssr: false must be in client components
const SplashCursor = dynamic(() => import("@/components/SplashCursor"), {
  loading: () => null,
});

// Optimize fonts with display swap and preload
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true,
  fallback: ["system-ui", "arial"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  preload: false, // Not critical, defer loading
  fallback: ["monospace"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  preload: true,
  fallback: ["system-ui", "arial"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["400", "700", "800"],
  subsets: ["latin"],
  display: "swap",
  preload: false, // Defer non-critical font
  fallback: ["system-ui", "arial"],
});

export const metadata: Metadata = {
  title: "Fort Speed",
  description: "Build modern apps",
  other: {
    "format-detection": "telephone=no",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Preconnect to Google Fonts for faster font loading */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} ${poppins.variable} antialiased relative max-w-[1400px] mx-auto`}
      >
        {/* Lazy load SplashCursor - only loads after initial render */}
        <SplashCursor
          SIM_RESOLUTION={128}
          DYE_RESOLUTION={1024}
          CAPTURE_RESOLUTION={512}
          DENSITY_DISSIPATION={3.5}
          VELOCITY_DISSIPATION={2}
          PRESSURE={0.1}
          PRESSURE_ITERATIONS={20}
          CURL={3}
          SPLAT_RADIUS={0.2}
          SPLAT_FORCE={6000}
          SHADING={true}
          COLOR_UPDATE_SPEED={10}
          BACK_COLOR={{ r: 0.5, g: 0, b: 0 }}
          TRANSPARENT={true}
        />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
