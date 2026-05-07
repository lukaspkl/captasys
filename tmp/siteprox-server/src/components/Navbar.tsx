"use client";

import { motion } from "framer-motion";
import { DeviceMobile, WhatsappLogo, Storefront, Info } from "@phosphor-icons/react";
import Link from "next/link";

const NAV_ITEMS = [
  { label: "Início", href: "#home", icon: DeviceMobile },
  { label: "Serviços", href: "#services", icon: Info },
  { label: "Loja", href: "#store", icon: Storefront },
];

export function Navbar() {
  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1] }}
      className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] w-max"
    >
      <div className="flex items-center gap-1.5 p-1.5 glass-panel backdrop-blur-xl">
        {NAV_ITEMS.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex items-center gap-2 px-3 md:px-6 py-2 md:py-3 rounded-full text-xs md:text-sm font-medium transition-all hover:bg-white/10 group"
          >
            <item.icon size={18} weight="light" className="group-hover:text-brand transition-colors" />
            <span className="hidden sm:block">{item.label}</span>
          </Link>
        ))}
        
        <div className="w-[1px] h-6 bg-white/10 mx-1 md:mx-2" />
        
        <Link
          href="https://wa.me/5531991707632"
          target="_blank"
          className="flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 bg-brand text-black rounded-full text-xs md:text-sm font-bold active:scale-[0.98] transition-all group"
        >
          <WhatsappLogo size={18} weight="fill" className="group-hover:rotate-12 transition-transform" />
          <span className="hidden sm:inline">WhatsApp</span>
          <span className="hidden md:inline pl-0.5">Técnico</span>
        </Link>
      </div>
    </motion.nav>
  );
}
