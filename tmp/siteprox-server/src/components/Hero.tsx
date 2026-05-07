"use client";

import { motion } from "framer-motion";
import { Cpu, Pulse, ArrowsOutSimple, IdentificationCard } from "@phosphor-icons/react";
import Image from "next/image";

export function Hero() {
  return (
    <section id="home" className="relative min-h-[100dvh] flex items-center justify-center pt-32 px-4 overflow-hidden">
      {/* Background Asset withstylized fade */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero.png"
          alt="MobiTech Lab Backdrop"
          fill
          className="object-cover opacity-60 scale-110"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-surface-950 via-surface-950/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-surface-950 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full flex flex-col md:flex-row items-center gap-12">
        {/* Left: Content and Typography */}
        <div className="flex-1 space-y-8">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-4"
          >
            <div className="flex items-center gap-2 px-3 py-1 w-max rounded-full border border-brand/20 bg-brand/5 backdrop-blur-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-brand animate-pulse" />
              <span className="text-[10px] uppercase tracking-[0.2em] font-medium text-brand">
                Smartphone Clinic / Petrolândia - Contagem
              </span>
            </div>
            
            <h1 className="text-4xl sm:text-6xl md:text-8xl leading-none font-bold text-white drop-shadow-2xl">
              PRECISÃO <br />
              <span className="text-brand">CIRÚRGICA</span> EM CADA CHIP.
            </h1>
            
            <p className="text-base sm:text-lg text-white/60 max-w-[25ch] sm:max-w-md leading-relaxed font-light">
              Na MobiTech, tratamos seu aparelho como um paciente. Diagnóstico laboratorial, 
              reparos imediatos e garantia real da única clínica de smartphones de Contagem.
            </p>
          </motion.div>

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="flex flex-col sm:flex-row flex-wrap gap-4"
          >
            <button className="flex items-center justify-center gap-3 px-8 py-4 bg-brand text-black font-bold rounded-full group magnetic-transition hover:scale-105 active:scale-95 shadow-lg shadow-brand/20">
              <span>Agendar Diagnóstico</span>
              <div className="w-8 h-8 rounded-full bg-black/10 flex items-center justify-center group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">
                <ArrowsOutSimple size={14} weight="bold" />
              </div>
            </button>
            <button className="px-8 py-4 border border-white/10 rounded-full hover:bg-white/5 font-medium transition-colors text-center">
              Ver Catálogo de Produtos
            </button>
          </motion.div>
        </div>

        {/* Right: Technical HUD */}
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 1 }}
          className="w-full md:w-80 space-y-4"
        >
          <div className="glass-panel p-6 space-y-6 bg-surface-900/40 backdrop-blur-2xl border-white/5">
             <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Cpu className="text-brand" size={18} />
                  <span className="text-xs uppercase tracking-widest text-white/40">Status do Lab</span>
                </div>
                <span className="text-[10px] font-mono text-brand">V1.04</span>
             </div>
             
             <div className="space-y-4">
               {[
                 { label: "Capacidade Operacional", val: "84%", icon: Pulse },
                 { label: "Tempo Médio (Tela)", val: "42 min", icon: IdentificationCard },
                 { label: "Eficiência Cirúrgica", val: "99.8%", icon: Cpu },
               ].map((stat, i) => (
                 <div key={i} className="flex items-center justify-between border-b border-white/5 pb-2">
                   <div className="flex items-center gap-2">
                     <stat.icon className="text-white/20" size={14} />
                     <span className="text-xs text-white/40">{stat.label}</span>
                   </div>
                   <span className="text-sm font-mono text-white/80">{stat.val}</span>
                 </div>
               ))}
             </div>
             
             <div className="w-full h-24 relative overflow-hidden rounded-xl border border-white/5">
                <Image
                  src="https://picsum.photos/seed/tech/400/200"
                  alt="Live Bench"
                  fill
                  className="object-cover opacity-50 sepia-[0.5] hue-rotate-[180deg]"
                />
                <div className="absolute inset-0 bg-brand/10" />
                <div className="absolute bottom-2 left-2 flex items-center gap-1.5">
                  <div className="w-1 h-1 rounded-full bg-red-500 animate-ping" />
                  <span className="text-[8px] font-mono text-red-500 uppercase">Live Bench Feed</span>
                </div>
             </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
