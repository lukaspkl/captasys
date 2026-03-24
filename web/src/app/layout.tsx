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
  metadataBase: new URL("https://siteprox.com.br"),
  title: "SiteProx | Criação de Sites de Alta Performance para Negócios Locais",
  description: "Criamos sites profissionais e aplicamos estratégias de SEO e Google Maps para mecânicas, pet shops e negócios locais. No caos da web, nós somos a lei.",
  icons: {
    icon: '/favicon.png',
  },
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
