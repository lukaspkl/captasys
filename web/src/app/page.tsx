"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Zap, 
  Rocket, 
  Target, 
  ArrowRight,
  ShieldCheck,
  Globe,
  Star,
  Users,
  Briefcase
} from 'lucide-react';
import { Sora, Silkscreen } from 'next/font/google';
import { Badge } from "@/components/ui/badge";

const sora = Sora({ subsets: ['latin'], weight: ['400', '700', '800'] });
const pixelFont = Silkscreen({ weight: '400', subsets: ['latin'] });

// --- ANIMATION WRAPPER ---
const FadeIn = ({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
  >
    {children}
  </motion.div>
);

export default function HomePage() {
  const associateBenefits = [
    { title: "PROSPECÇÃO_SCANNER", icon: Target, desc: "Encontre leads quentes sem site em segundos." },
    { title: "BUILD_INSTANTÂNEO", icon: Zap, desc: "Gere sites profissionais com um clique." },
    { title: "LUCRO_RECORRENTE", icon: Rocket, desc: "MRR imbatível no mercado de SaaS." }
  ];

  const clientBenefits = [
    { title: "PRESENÇA_DE_ELITE", icon: ShieldCheck, desc: "Design Cyber-Vaporwave que converte." },
    { title: "DOMÍNIO_GOOGLE", icon: Globe, desc: "SEO Local otimizado para o Google Maps." },
    { title: "FOCO_WHATSAPP", icon: Zap, desc: "Direto ao ponto para fechar vendas reais." }
  ];

  return (
    <div className={`min-h-screen bg-[#020617] text-white selection:bg-pink-500/30 overflow-x-hidden relative ${sora.className}`}>
      
      {/* --- BACKGROUND ESTÉTICO --- */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[radial-gradient(#00f3ff_1px,transparent_1px)] bg-size-[40px_40px] opacity-[0.03]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-linear-to-b from-cyan-500/10 to-transparent blur-[120px] opacity-20" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-pink-500/10 rounded-full blur-[140px] opacity-10" />
      </div>

      <div className="scanline"></div>

      {/* --- HERO SECTION --- */}
      <section className="relative pt-32 pb-20 z-10 px-6">
        <div className="max-w-7xl mx-auto text-center space-y-12">
           <FadeIn>
             <Badge className="bg-transparent border border-cyan-400 text-cyan-400 font-black uppercase tracking-[0.5em] text-[9px] rounded-none py-1.5 px-6 shadow-[inset_0_0_10px_rgba(0,243,255,0.2)]">
                CONNECTION_STABLE // SITEPROX_CORE_V2.5
             </Badge>
           </FadeIn>

           <div className="space-y-6">
             <motion.h1 
               initial={{ opacity: 0, scale: 0.9 }}
               animate={{ opacity: 1, scale: 1 }}
               transition={{ duration: 1 }}
               className="text-6xl md:text-[9rem] font-black italic tracking-tighter leading-[0.85] uppercase text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.1)]"
             >
                SITEPROX<span className="text-pink-500">.</span>
             </motion.h1>
             <FadeIn delay={0.4}>
                <h2 className="text-pink-500 font-hacker text-xl md:text-3xl font-black italic uppercase tracking-[0.2em] shadow-pink-500/20 drop-shadow-lg">
                   No caos da web, nós somos a ordem
                </h2>
             </FadeIn>
           </div>

           <FadeIn delay={0.6}>
             <p className="text-cyan-400/60 font-mono text-sm md:text-base uppercase tracking-[0.3em] max-w-4xl mx-auto leading-relaxed">
                A plataforma definitiva para quem constrói e para quem <br className="hidden md:block"/> precisa de uma presença digital inesquecível.
             </p>
           </FadeIn>

           {/* --- PRIMARY CTAS --- */}
           <div className="flex flex-col md:flex-row gap-8 justify-center items-center pt-12 animate-in fade-in zoom-in-95 duration-1000 delay-500">
             <Link href="/register?role=associate" className="group relative px-12 py-6 bg-cyan-500 text-black font-black uppercase tracking-widest text-xs italic hover:scale-105 transition-all shadow-[0_0_30px_rgba(0,243,255,0.4)]">
                QUERO_SER_ASSOCIADO
                <ArrowRight className="inline-block ml-3 w-4 h-4" />
             </Link>
             <Link href="/login" className="px-12 py-6 border-2 border-pink-500 text-pink-500 font-black uppercase tracking-widest text-xs italic hover:bg-pink-500 hover:text-black transition-all">
                SOU_CLIENTE_ACESSAR
             </Link>
           </div>
        </div>
      </section>

      {/* --- DUAL PATH SECTION --- */}
      <section className="py-20 relative z-10 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20">
          
          {/* CLIENT SIDE */}
          <FadeIn>
            <div className="bg-[#0a0a0a]/60 border border-white/5 p-12 hover:border-cyan-500/30 transition-all rounded-[3rem] group">
              <div className="flex items-center gap-4 mb-10">
                <div className="w-14 h-14 bg-cyan-500/10 border border-cyan-400 flex items-center justify-center">
                  <Briefcase className="w-8 h-8 text-cyan-400" />
                </div>
                <div>
                  <h3 className="text-2xl font-black uppercase italic text-cyan-400">PARA_SEU_NEGÓCIO</h3>
                  <p className="text-[9px] text-cyan-900 font-black uppercase tracking-widest mt-1">SITES_DE_ALTA_CONVERSÃO</p>
                </div>
              </div>
              
              <div className="space-y-6">
                {clientBenefits.map((item, i) => (
                  <div key={i} className="bg-black/40 border border-white/5 p-6 flex items-start gap-5 group-hover:bg-cyan-950/5 transition-colors">
                    <item.icon className="w-6 h-6 text-cyan-400 mt-1" />
                    <div>
                      <h4 className="font-black text-white text-xs uppercase mb-1">{item.title}</h4>
                      <p className="text-[10px] text-slate-500 uppercase font-bold">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Link href="/vendas" className="mt-12 block text-center py-5 bg-transparent border border-cyan-400/30 text-cyan-400 font-black uppercase tracking-widest text-[10px] italic hover:bg-cyan-400 hover:text-black transition-all">
                 VER_NOSSOS_PLANOS_DE_ELITE
              </Link>
            </div>
          </FadeIn>

          {/* ASSOCIATE SIDE */}
          <FadeIn delay={0.2}>
            <div className="bg-[#0a0a0a]/60 border border-white/5 p-12 hover:border-pink-500/30 transition-all rounded-[3rem] group">
              <div className="flex items-center gap-4 mb-10">
                <div className="w-14 h-14 bg-pink-500/10 border border-pink-400 flex items-center justify-center">
                  <Users className="w-8 h-8 text-pink-400" />
                </div>
                <div>
                  <h3 className="text-2xl font-black uppercase italic text-pink-500">PARA_ASSOCIADOS</h3>
                  <p className="text-[9px] text-pink-900 font-black uppercase tracking-widest mt-1">PROSPECÇÃO_E_LUCRO_RECORRENTE</p>
                </div>
              </div>

              <div className="space-y-6">
                {associateBenefits.map((item, i) => (
                  <div key={i} className="bg-black/40 border border-white/5 p-6 flex items-start gap-5 group-hover:bg-pink-950/5 transition-colors">
                    <item.icon className="w-6 h-6 text-pink-400 mt-1" />
                    <div>
                      <h4 className="font-black text-white text-xs uppercase mb-1">{item.title}</h4>
                      <p className="text-[10px] text-slate-500 uppercase font-bold">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <button className="mt-12 w-full py-5 bg-pink-500 text-black font-black uppercase tracking-widest text-[10px] italic hover:bg-white transition-all shadow-[0_0_20px_rgba(236,72,153,0.3)]">
                 SEJA_UM_SÓCIO_OPERACIONAL
              </button>
            </div>
          </FadeIn>

        </div>
      </section>

      {/* --- SOCIAL PROOF --- */}
      <section className="py-20 bg-linear-to-b from-transparent to-black/40">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="flex items-center gap-6">
              <div className="flex -space-x-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="w-14 h-14 rounded-full border-2 border-[#020617] bg-slate-800 flex items-center justify-center overflow-hidden relative">
                    <Image 
                      src={`/ana_solar_estetica.png`} 
                      alt="Usuário Verificado" 
                      fill
                      className="object-cover grayscale opacity-50"
                    />
                  </div>
                ))}
              </div>
              <div>
                <p className="text-xs font-black uppercase text-white">Confiança_Empilhada</p>
                <div className="flex gap-1 mt-1">
                  {[1,2,3,4,5].map(i => <Star key={i} className="w-3 h-3 text-cyan-400 fill-current" />)}
                </div>
              </div>
            </div>
            <div className="flex gap-10">
               <div className="text-center">
                 <p className="text-3xl font-black text-cyan-400">+500</p>
                 <p className="text-[8px] font-bold text-slate-600 uppercase tracking-widest">SITES_ATIVOS</p>
               </div>
               <div className="text-center">
                 <p className="text-3xl font-black text-pink-500">99.9%</p>
                 <p className="text-[8px] font-bold text-slate-600 uppercase tracking-widest">UPTIME_SISTEMA</p>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- TECH STACK --- */}
      <section className="py-12 border-y border-white/5 bg-black/20">
        <div className="max-w-7xl mx-auto px-6 overflow-hidden">
           <div className="flex flex-wrap justify-center gap-12 grayscale opacity-30 hover:grayscale-0 hover:opacity-100 transition-all duration-1000">
             {["NEXT.JS // V16", "SUPABASE // DB", "GEMINI AI // HUB", "TAILWIND // CSS"].map((stack) => (
               <span key={stack} className={`text-[10px] font-black uppercase tracking-[0.4em] ${pixelFont.className}`}>{stack}</span>
             ))}
           </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="py-32 relative z-10 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="space-y-4 text-center md:text-left">
            <h4 className="text-3xl font-black italic tracking-tighter uppercase">SITE<span className="text-cyan-400">PROX</span></h4>
            <p className="text-[9px] font-bold text-slate-700 uppercase tracking-[0.6em]">No caos da web, nós somos a ordem.</p>
          </div>
          <div className="flex gap-8 text-[10px] font-black text-slate-500 uppercase tracking-widest">
            <Link href="/terms" className="hover:text-cyan-400 transition-colors">Termos</Link>
            <Link href="/privacy" className="hover:text-cyan-400 transition-colors">Privacidade</Link>
            <span>© 2026 SITEPROX_LABS</span>
          </div>
        </div>
      </footer>

      <style jsx global>{`
        .scanline {
          width: 100%;
          height: 2px;
          z-index: 100;
          background: rgba(0, 243, 255, 0.05);
          opacity: 0.5;
          position: fixed;
          bottom: 100%;
          animation: scanline 8s linear infinite;
        }
        @keyframes scanline {
          0% { bottom: 100%; }
          100% { bottom: 0%; }
        }
        .cyber-grid {
          background-image: linear-gradient(rgba(0, 243, 255, 0.05) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(0, 243, 255, 0.05) 1px, transparent 1px);
          background-size: 50px 50px;
        }
        .hacker-glow {
          text-shadow: 0 0 20px rgba(255, 255, 255, 0.3), 0 0 40px rgba(0, 243, 255, 0.2);
        }
      `}</style>
    </div>
  );
}


