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
  verification: {
    google: "SFnEDYxFDVQGyVFD51rVpNOQW_wyfGs5",
  },
  title: {
    default: "SiteProx | Estratégia Digital & Sites de Alta Performance",
    template: "%s | SiteProx"
  },
  description: "Especialistas em criação de sites que convertem, SEO Local e Google Maps. Transformamos sua presença digital em uma máquina de vendas.",
  keywords: ["criação de sites", "seo local", "google maps", "marketing para mecânicas", "pet shop digital", "site profissional"],
  authors: [{ name: "SiteProx Labs" }],
  creator: "SiteProx",
  publisher: "SiteProx",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://siteprox.com.br",
    title: "SiteProx | Domine o Google Maps & Venda mais no WhatsApp",
    description: "Sites profissionais de alta performance para negócios locais. No caos da web, nós somos a lei.",
    siteName: "SiteProx",
  },
  twitter: {
    card: "summary_large_image",
    title: "SiteProx | Criação de Sites de Elite",
    description: "Transformando leads locais em lucro digital com tecnologia de ponta.",
    creator: "@siteprox",
  },
  icons: {
    icon: [
      { url: '/favicon.png?v=1', type: 'image/png' },
    ],
    shortcut: '/favicon.png?v=1',
    apple: '/favicon.png?v=1',
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
        className={`${plusJakartaSans.variable} ${spaceMono.variable} ${vt323.variable} antialiased font-mono bg-dark-bg`}
      >
        {children}
      </body>
    </html>
  );
}
