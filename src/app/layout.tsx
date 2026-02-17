import type { Metadata } from "next";
import { EB_Garamond, Cormorant_Garamond } from "next/font/google";
import SessionProvider from "@/components/providers/SessionProvider";
import "./globals.css";

// Classical serif fonts inspired by Loeb Classical Library
const ebGaramond = EB_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "POLYBIUS ACI",
  description: "Authoritarian Consolidation Index - Real-time democratic health monitoring powered by political science research and AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${ebGaramond.variable} ${cormorant.variable} antialiased`}
        style={{ fontFamily: 'var(--font-serif), Georgia, serif' }}
      >
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
