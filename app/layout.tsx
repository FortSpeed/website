import type { Metadata } from "next";
import "./globals.css";

import Footer from "@/components/layout/Footer";

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
    <html lang="en">
      <body
        className="antialiased relative max-w-[1920px] mx-auto overflow-x-hidden bg-black"
      >
  
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
