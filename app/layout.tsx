import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter, Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ClientSplashCursor from "@/components/ClientSplashCursor";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
});

const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["400", "700", "800"],
});

export const metadata: Metadata = {
  title: "Fort Speed",
  description: "Build modern apps",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-black">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} ${poppins.variable} antialiased relative w-full min-h-screen overflow-x-hidden bg-black`}
      >
        {/* <SplashCursor

          SIM_RESOLUTION={128}
          DYE_RESOLUTION={1440}
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
        /> */}
        {/* <SmoothCursor /> */}
        <ClientSplashCursor />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
