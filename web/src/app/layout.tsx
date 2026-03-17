import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Space_Mono, VT323 } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
});

const spaceMono = Space_Mono({
  weight: ["400", "700"],
  variable: "--font-space-mono",
  subsets: ["latin"],
});

const vt323 = VT323({
  weight: ["400"],
  variable: "--font-vt323",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CaptaSaaS | Hacker HUD v1.0",
  description: "Terminal de prospecção retro-futurista de alta performance.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="dark" suppressHydrationWarning>
      <body
        className={`${plusJakartaSans.variable} ${spaceMono.variable} ${vt323.variable} antialiased font-mono bg-[#050505]`}
      >
        {children}
      </body>
    </html>
  );
}
