import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MobiTech Celulares | Clínica Especializada em Smartphones em Contagem",
  description: "Manutenção técnica de precisão, troca de tela, bateria e placa. Loja de eletrônicos premium em Petrolândia, Contagem - MG. Seu celular novo em minutos.",
  keywords: ["conserto de celular contagem", "manutenção iphone contagem", "troca de tela celular mg", "assistência técnica smartphones", "loja celulares petrolândia"],
  openGraph: {
    title: "MobiTech - Clínica de Smartphones",
    description: "Precisão cirúrgica em cada reparo. Peças e serviços em Contagem.",
    type: "website",
    locale: "pt_BR",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${geistSans.variable} ${geistMono.variable}`}>
       <body className="antialiased selection:bg-brand selection:text-black">
          {/* Universal Grain Layer */}
          <div className="grain-overlay" />
          {children}
       </body>
    </html>
  );
}
