import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import Providers from "@/components/providers";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "AI Love Meter | Cosmic Compatibility",
  description: "Discover your cosmic alignment with Gemini-powered AI analysis",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable} dark h-full overflow-hidden`}>
      <body className="bg-background text-foreground font-sans h-full relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="glow-orb w-[500px] h-[500px] bg-accent/20 -top-48 -left-48" />
        <div className="glow-orb w-[600px] h-[600px] bg-accent-secondary/10 -bottom-48 -right-48" />
        
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
