import type { Metadata } from "next";
import { Outfit, Geist } from "next/font/google";
import "./globals.css";
import Providers from "@/components/providers";
import { cn } from "@/lib/utils";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

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
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "dark",
        "min-h-full",
        outfit.variable,
        "font-sans",
        geist.variable,
      )}
    >
      <body className="bg-background text-foreground font-sans min-h-full relative overflow-x-hidden">
        {/* Animated Background Elements */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
          <div className="glow-orb w-[500px] h-[500px] bg-accent/20 -top-48 -left-48" />
          <div className="glow-orb w-[600px] h-[600px] bg-accent-secondary/10 -bottom-48 -right-48" />
        </div>

        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
