import type { Metadata } from "next";
import localFont from "next/font/local";
import { Space_Mono } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

const relative = localFont({
  src: [
    { path: "../../src/fonts/Relative-Book.ttf",   weight: "400", style: "normal" },
    { path: "../../src/fonts/Relative-Medium.ttf",  weight: "500", style: "normal" },
    { path: "../../src/fonts/Relative-Bold.ttf",    weight: "700", style: "normal" },
  ],
  variable: "--font-relative",
  display: "swap",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "DigiTreak — Enterprise Web, Built to Own",
    template: "%s | DigiTreak",
  },
  description:
    "Full-service digital agency delivering enterprise-grade web experiences on open-source tech. No lock-in. Full ownership. Since 2015.",
  icons: {
    icon: [
      { url: "/icon.png", type: "image/png" },
    ],
    apple: [
      { url: "/apple-icon.png", type: "image/png" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={cn("h-full antialiased", relative.variable, spaceMono.variable)}>
      <body className="min-h-full flex flex-col font-relative">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
