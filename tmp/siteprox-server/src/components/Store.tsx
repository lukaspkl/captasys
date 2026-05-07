"use client";

import { motion } from "framer-motion";
import { ShoppingCart } from "@phosphor-icons/react";
import Image from "next/image";

const PRODUCTS = [
  { 
    title: "AirPods Pro Max", 
    price: "R$ 4.890", 
    img: "https://picsum.photos/seed/audio/800/600",
    size: "large"
  },
  { 
    title: "iPhone 15 Pro", 
    price: "R$ 7.200", 
    img: "https://picsum.photos/seed/phone1/600/600",
    size: "small"
  },
  { 
    title: "Cabo USB-C Titan", 
    price: "R$ 149", 
    img: "https://picsum.photos/seed/cable/600/600",
    size: "small"
  },
  { 
    title: "Logitech MX Master 3", 
    price: "R$ 650", 
    img: "https://picsum.photos/seed/mouse/600/800",
    size: "medium"
  },
];

export function Store() {
  return (
    <section id="store" className="py-32 px-4 bg-surface-900/20">
      <div className="max-w-7xl mx-auto space-y-24">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row items-end justify-between gap-8">
          <div className="space-y-4">
            <span className="text-brand font-mono text-xs uppercase tracking-[0.3em]">Catálogo de Hardware</span>
            <h2 className="text-3xl sm:text-5xl md:text-7xl font-bold">
              ELETRÔNICOS <br />
              <span className="text-white/20">SELECIONADOS.</span>
            </h2>
          </div>
          <button className="flex items-center gap-2 group text-brand text-sm font-bold border-b border-brand/20 pb-2">
            Ver loja completa ➞
          </button>
        </div>

        {/* Bento Grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-4 h-full min-h-[600px]">
          {PRODUCTS.map((product, idx) => (
            <motion.div
              key={idx}
              initial={{ scale: 0.95, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className={cn(
                "group relative overflow-hidden rounded-[2rem] border border-white/5 bg-surface-900/40",
                product.size === "large" && "md:col-span-2 md:row-span-2",
                product.size === "medium" && "md:col-span-2 md:row-span-1"
              )}
            >
              <Image
                src={product.img}
                alt={product.title}
                fill
                className="object-cover opacity-50 grayscale hover:grayscale-0 hover:scale-105 transition-all duration-700"
              />
              <div className="absolute inset-x-0 bottom-0 p-8 bg-gradient-to-t from-black/80 to-transparent flex items-end justify-between translate-y-2 group-hover:translate-y-0 transition-transform">
                <div>
                   <h4 className="text-xl font-bold">{product.title}</h4>
                   <p className="text-brand font-mono text-sm">{product.price}</p>
                </div>
                <button className="w-10 h-10 rounded-full bg-brand text-black flex items-center justify-center -translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all shadow-lg shadow-brand/40">
                  <ShoppingCart size={18} weight="bold" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

import { cn } from "@/lib/utils";
