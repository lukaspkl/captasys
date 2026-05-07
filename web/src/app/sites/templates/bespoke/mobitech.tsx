"use client";

import { motion } from "framer-motion";
import { 
  Cpu, 
  Pulse, 
  ArrowsOutSimple, 
  IdentificationCard, 
  ShoppingCart,
  Clock,
  MapPin
} from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Utility for Tailwind Class Merging */
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface MobitechTemplateProps {
  site: {
    subdomain: string;
    theme_id: string;
    content: {
      site_name: string;
      hero_title: string;
      hero_subtitle: string;
      whatsapp: string;
      theme_color: string;
      cta_text: string;
      services: Array<{ title: string; desc: string }>;
      store_items?: Array<{ title: string; price: string; img: string; size: string }>;
      lab_stats?: Array<{ label: string; val: string; icon: string }>;
    };
  };
}

export default function MobitechTemplate({ site }: MobitechTemplateProps) {
  const { content } = site;
  const brandColor = content.theme_color || "#38BDF8";

  // Fallback defaults for missing dynamic fields
  const storeItems = content.store_items || [
    { title: "iPhone 15 Pro", price: "R$ 7.200", img: "https://picsum.photos/seed/phone1/600/600", size: "large" },
    { title: "AirPods Pro Max", price: "R$ 4.890", img: "https://picsum.photos/seed/audio/800/600", size: "small" },
    { title: "Cabo USB-C Titan", price: "R$ 149", img: "https://picsum.photos/seed/cable/600/600", size: "small" },
  ];

  const labStats = content.lab_stats || [
    { label: "Capacidade Operacional", val: "84%", icon: "Pulse" },
    { label: "Tempo Médio (Tela)", val: "42 min", icon: "IdentificationCard" },
    { label: "Eficiência Cirúrgica", val: "99.8%", icon: "Cpu" },
  ];

  const iconMap: Record<string, React.ElementType> = {
    Pulse,
    IdentificationCard,
    Cpu,
  };

  return (
    <div 
        className="relative flex flex-col w-full bg-dark-bg text-white font-sans overflow-hidden"
        style={{ '--brand': brandColor } as React.CSSProperties}
    >
      {/* 1. NAVBAR */}
      <nav className="fixed top-0 inset-x-0 z-100 h-20 bg-black/40 backdrop-blur-2xl border-b border-white/5 px-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-brand flex items-center justify-center">
             <Cpu size={18} weight="bold" className="text-black" />
          </div>
          <span className="text-sm font-black tracking-tighter uppercase italic">{content.site_name || "MOBITECH"}</span>
        </div>
        
        <div className="hidden md:flex items-center gap-12 text-[10px] font-mono text-white/40 uppercase tracking-[0.3em]">
           <a href="#home" className="hover:text-brand transition-colors">Lab_Start</a>
           <a href="#services" className="hover:text-brand transition-colors">Methods</a>
           <a href="#store" className="hover:text-brand transition-colors">Supply_Chain</a>
        </div>

        <Link 
            href={`https://wa.me/${content.whatsapp}`} 
            className="px-6 py-2.5 bg-white/5 border border-white/10 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-brand hover:text-black transition-all"
        >
            CONTACT_NODE
        </Link>
      </nav>

      {/* 2. HERO */}
      <section id="home" className="relative min-h-dvh flex items-center justify-center pt-32 px-4 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&q=80&w=1920"
            alt="Dashboard Backdrop"
            fill
            className="object-cover opacity-30 scale-110"
            priority
          />
          <div className="absolute inset-0 bg-linear-to-t from-dark-bg via-dark-bg/60 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto w-full flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 space-y-8">
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="space-y-4"
            >
              <div className="flex items-center gap-2 px-3 py-1 w-max rounded-full border border-brand/20 bg-brand/5 backdrop-blur-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-brand animate-pulse" />
                <span className="text-[10px] uppercase tracking-[0.2em] font-medium text-brand">
                  Terminal_Active / {site.subdomain}.siteprox
                </span>
              </div>
              
              <h1 className="text-4xl sm:text-6xl md:text-8xl leading-none font-bold text-white uppercase italic">
                {content?.hero_title?.includes(' ') 
                  ? content.hero_title.split(' ').slice(0, -1).join(' ') 
                  : (content?.hero_title || "PRECISÃO")} <br />
                <span className="text-brand">
                  {content?.hero_title?.includes(' ') 
                    ? content.hero_title.split(' ').pop() 
                    : "CIRÚRGICA"}
                </span>
              </h1>
              
              <p className="text-base sm:text-lg text-white/50 max-w-[25ch] sm:max-w-md leading-relaxed font-light">
                {content.hero_subtitle}
              </p>
            </motion.div>

            <div className="flex flex-col sm:flex-row flex-wrap gap-4">
              <Link 
                href={`https://wa.me/${content.whatsapp}`}
                className="flex items-center justify-center gap-3 px-8 py-4 bg-brand text-black font-black uppercase text-xs rounded-full group transition-all hover:scale-105"
              >
                <span>{content.cta_text || "ORÇAMENTO_AGORA"}</span>
                <div className="w-6 h-6 rounded-full bg-black/10 flex items-center justify-center group-hover:translate-x-1 transition-transform">
                  <ArrowsOutSimple size={12} weight="bold" />
                </div>
              </Link>
            </div>
          </div>

          {/* Right: Technical HUD */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 1 }}
            className="w-full md:w-80 space-y-4"
          >
            <div className="p-6 space-y-6 bg-white/5 backdrop-blur-2xl border border-white/5 rounded-[2rem]">
               <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Cpu className="text-brand" size={18} />
                    <span className="text-xs uppercase tracking-widest text-white/40">Lab_Telemetry</span>
                  </div>
                  <span className="text-[10px] font-mono text-brand">V4.02</span>
               </div>
               
               <div className="space-y-4">
                 {labStats.map((stat, i) => {
                   const Icon = iconMap[stat.icon] || Cpu;
                   return (
                    <div key={i} className="flex items-center justify-between border-b border-white/5 pb-2">
                      <div className="flex items-center gap-2">
                        <Icon className="text-white/20" size={14} />
                        <span className="text-[10px] uppercase text-white/40">{stat.label}</span>
                      </div>
                      <span className="text-xs font-mono text-white/80">{stat.val}</span>
                    </div>
                   );
                 })}
               </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 3. SERVICES (Methods) */}
      <section id="services" className="py-32 px-4 border-t border-white/5 relative bg-[#080808]">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="flex flex-col md:flex-row items-end justify-between gap-8">
            <div className="space-y-4">
              <span className="text-brand font-mono text-xs uppercase tracking-[0.3em]">Engineering_Workflow</span>
              <h2 className="text-3xl sm:text-5xl md:text-7xl font-bold">
                MÉTODOS <br />
                <span className="text-white/20">OPERACIONAIS.</span>
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {content.services.map((service, idx) => (
              <div key={idx} className="p-8 border border-white/5 bg-white/5 rounded-[2rem] space-y-4 group hover:border-brand/40 transition-all">
                <div className="w-12 h-12 rounded-2xl bg-brand/10 flex items-center justify-center text-brand">
                   <Cpu size={24} />
                </div>
                <h3 className="text-xl font-bold uppercase italic text-white group-hover:text-brand transition-colors">{service.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed font-light">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. STORE (Supply Chain) */}
      <section id="store" className="py-32 px-4 bg-black">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="flex justify-between items-end">
            <div className="space-y-4">
              <span className="text-brand font-mono text-xs uppercase tracking-[0.3em]">Hardware_Supply</span>
              <h2 className="text-3xl font-black italic uppercase">Componentes_Elite</h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 min-h-[500px]">
            {storeItems.map((product, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.02 }}
                className={cn(
                  "group relative overflow-hidden rounded-[2rem] border border-white/5 bg-white/5",
                  product.size === "large" && "md:col-span-2 md:row-span-2",
                  product.size === "medium" && "md:col-span-2 md:row-span-1"
                )}
              >
                <Image
                  src={product.img}
                  alt={product.title}
                  fill
                  className="object-cover opacity-40 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
                />
                <div className="absolute inset-x-0 bottom-0 p-8 bg-linear-to-t from-black to-transparent flex items-end justify-between pointer-events-none">
                  <div>
                     <h4 className="text-lg font-bold italic uppercase">{product.title}</h4>
                     <p className="text-brand font-mono text-xs">{product.price}</p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-brand text-black flex items-center justify-center shadow-lg shadow-brand/40">
                    <ShoppingCart size={18} weight="bold" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. FOOTER */}
      <footer className="py-24 border-t border-white/5 bg-dark-bg">
          <div className="max-w-7xl mx-auto px-4 space-y-16">
             <div className="flex flex-col md:flex-row items-center justify-between gap-12">
                <div className="space-y-4 flex flex-col items-center md:items-start">
                   <h4 className="text-2xl font-black italic text-white/80">{content.site_name || "MOBITECH"}</h4>
                   <p className="text-[10px] font-mono text-white/20 uppercase tracking-[0.4em]">Laboratório de Engenharia Especializada</p>
                </div>
                
                <div className="flex flex-wrap items-center justify-center gap-12 text-[10px] font-mono text-white/40 uppercase tracking-widest">
                   <div className="flex items-center gap-2">
                     <MapPin size={12} className="text-brand" />
                     <span>Petrolândia, Contagem</span>
                   </div>
                   <div className="flex items-center gap-2">
                     <Clock size={12} className="text-brand" />
                     <span>Mon_Sat: 08:00 - 18:00</span>
                   </div>
                </div>
                
                <div className="p-4 border border-white/10 rounded-2xl bg-white/5 backdrop-blur-md">
                   <span className="text-[8px] font-black text-brand uppercase tracking-widest">Powered_By_SiteProx</span>
                </div>
             </div>

             <p className="text-[10px] font-mono text-white/10 uppercase tracking-[0.3em] text-center w-full pt-8 border-t border-white/5">
                 © {new Date().getFullYear()} {content.site_name}. todos os direitos reservados.
             </p>
          </div>
      </footer>

      {/* Global Aesthetics */}
      <style jsx global>{`
        .bg-brand { background-color: var(--brand); }
        .text-brand { color: var(--brand); }
        .border-brand { border-color: var(--brand); }
        .shadow-brand { shadow-color: var(--brand); }
        
        @font-face {
          font-family: 'Sans';
          src: local('Inter'), local('Segoe UI'), local('Roboto');
        }
      `}</style>
    </div>
  );
}
