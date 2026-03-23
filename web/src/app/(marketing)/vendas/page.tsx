"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { 
  ShieldCheck, 
  Rocket, 
  MessageCircle, 
  Check, 
  CheckCircle2,
  Star,
  AlertOctagon,
  History,
} from 'lucide-react';
import { Sora, Inter, Silkscreen } from 'next/font/google';

const sora = Sora({ subsets: ['latin'], weight: ['400', '700', '800'] });
const inter = Inter({ subsets: ['latin'], weight: ['400', '500', '700'] });
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

// --- COMPONENTS ---

const WhatsAppButton = () => (
  <motion.div
    initial={{ scale: 0, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    className="fixed bottom-10 right-10 z-[100] group"
  >
    <div className="relative">
      <motion.div 
        animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 3, repeat: Infinity }}
        className="absolute inset-0 bg-[#25D366] rounded-full blur-2xl"
      />
      <motion.a
        href="https://wa.me/5511999999999"
        target="_blank"
        whileHover={{ scale: 1.1 }}
        className="relative flex items-center justify-center w-20 h-20 bg-gradient-to-tr from-[#25D366] to-[#22d3ee] rounded-full shadow-[0_0_30px_rgba(37,211,102,0.5)] border-2 border-white/20"
      >
        <MessageCircle className="w-10 h-10 text-white fill-current" />
        <div className="absolute right-24 top-1/2 -translate-y-1/2 bg-black/90 backdrop-blur-3xl border border-emerald-500/50 px-6 py-4 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none whitespace-nowrap shadow-2xl">
           <p className="text-white text-xs font-black uppercase tracking-widest italic">Falar_com_especialista_agora</p>
           <p className="text-[#25D366] text-[9px] font-bold uppercase mt-1 tracking-widest animate-pulse">● Resposta em minutos</p>
        </div>
      </motion.a>
    </div>
  </motion.div>
);

const AnimatedGrid = () => (
  <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
    <motion.div 
      animate={{ y: [0, -40] }}
      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      className="absolute inset-0 bg-[radial-gradient(#8b5cf6_1px,transparent_1px)] [background-size:40px_40px] opacity-[0.05]" 
    />
    <div className="absolute bottom-[-10%] left-[-10%] w-[60%] h-[60%] bg-[#ec4899]/5 rounded-full blur-[140px]" />
    <div className="absolute top-[20%] right-[-10%] w-[50%] h-[50%] bg-[#22d3ee]/5 rounded-full blur-[140px]" />
  </div>
);

interface Plan {
  name: string;
  price: string;
  tag: string;
  features: string[];
  featured: boolean;
}

const PlanCard = ({ plan }: { plan: Plan }) => (
  <motion.div 
    whileHover={{ y: -10 }}
    className={`relative p-10 rounded-[2.5rem] border backdrop-blur-3xl transition-all duration-700 flex flex-col justify-between group ${plan.featured ? 'bg-white text-black border-white shadow-[0_0_80px_rgba(236,72,153,0.1)] scale-105 z-20' : 'bg-black/40 border-white/10 text-white'}`}
  >
    <div className="relative space-y-8">
       <div className="flex justify-between items-start">
          <div>
             <h4 className={`text-3xl font-black tracking-tighter uppercase italic ${sora.className}`}>{plan.name}</h4>
             <p className={`text-[10px] font-bold uppercase tracking-widest ${plan.featured ? 'text-slate-500' : 'text-slate-400'}`}>{plan.tag}</p>
          </div>
          {plan.featured && <div className="bg-emerald-500 text-white text-[8px] font-black px-3 py-1 rounded-full animate-bounce">TOP_VALUE</div>}
       </div>

       <div className="flex items-start gap-1">
          <span className="text-xl font-bold mt-2">R$</span>
          <span className="text-7xl font-black tracking-tighter leading-none">{plan.price}</span>
          <span className="text-xs opacity-50 mt-10 font-black">/mês</span>
       </div>

       <ul className="space-y-4">
          {plan.features.map((f: string, i: number) => (
            <li key={i} className={`flex items-center gap-3 text-[11px] font-bold uppercase tracking-tight ${plan.featured ? 'text-black/80' : 'text-slate-400'}`}>
               <Check className={`w-4 h-4 ${plan.featured ? 'text-emerald-600' : 'text-[#8b5cf6]'}`} />
               {f}
            </li>
          ))}
       </ul>
    </div>

    <button className={`mt-10 py-5 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] transition-all ${plan.featured ? 'bg-black text-white hover:bg-emerald-600' : 'bg-gradient-to-r from-[#8b5cf6] to-[#ec4899] text-white shadow-xl'}`}>
       Quero_Meu_Site_Agora
    </button>
  </motion.div>
);

const SiteProxPage = () => {
  const plansData = [
    { 
      name: "Plano Presença", 
      price: "100", 
      tag: "Entrada Digital", 
      features: [
        "Site One-Page Moderno", 
        "Foco em Leads WhatsApp", 
        "Stack Vessel 2025 (Next.js)", 
        "Domínio / SSL Incluso", 
        "Hospedagem Gerenciada"
      ], 
      featured: false 
    },
    { 
      name: "Plano Autoridade", 
      price: "150", 
      tag: "O Mais Escolhido", 
      features: [
        "Site Multi-Page Completo", 
        "Galeria de Fotos/Portfólio", 
        "Páginas de Serviços Elite", 
        "SEO Local Otimizado", 
        "Suporte Prioritário Whats"
      ], 
      featured: true 
    }
  ];

  return (
    <div className={`min-h-screen bg-[#0a0a0f] text-white selection:bg-[#ec4899]/30 overflow-x-hidden ${inter.className}`}>
      
      <AnimatedGrid />
      <WhatsAppButton />

      {/* --- URGENCY BANNER --- */}
      <div className="relative z-[60] bg-gradient-to-r from-[#8b5cf6] to-[#ec4899] py-3 text-center">
         <motion.p 
           animate={{ opacity: [1, 0.5, 1] }}
           transition={{ duration: 2, repeat: Infinity }}
           className="text-[10px] font-black uppercase tracking-[0.4em] text-white"
         >
           ⚠️ Vagas limitadas para Março. 30% OFF na migração este mês.
         </motion.p>
      </div>

      {/* --- HERO SECTION --- */}
      <section className="relative pt-32 pb-32 z-10">
        <div className="container mx-auto px-6 text-center">
           <FadeIn>
             <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl mb-10 group cursor-none">
                <motion.div 
                  animate={{ scale: [1, 1.2, 1], filter: ["hue-rotate(0deg)", "hue-rotate(90deg)", "hue-rotate(0deg)"] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="w-2 h-2 bg-[#22d3ee] rounded-full shadow-[0_0_10px_#22d3ee]" 
                />
                <span className={`text-[10px] font-black uppercase tracking-[0.3em] text-[#22d3ee] ${pixelFont.className}`}>PROTOCOL_ACTIVE_v5.4</span>
             </div>
           </FadeIn>

           <div className="max-w-6xl mx-auto space-y-10">
              <div className="space-y-4">
                <motion.h1 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className={`text-6xl md:text-9xl font-black italic tracking-tighter leading-[0.85] uppercase ${sora.className}`}
                >
                  <span className="block text-white">TRANSFORME</span>
                  <span className="block text-white">LEADS EM</span>
                  <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-[#8b5cf6] via-[#ec4899] to-[#22d3ee] bg-[length:200%_auto] animate-gradient-flow drop-shadow-[0_0_15px_rgba(236,72,153,0.3)]">
                    LUCRO DIGITAL.
                  </span>
                </motion.h1>
                <FadeIn delay={0.4}>
                  <p className={`text-xs md:text-sm font-black uppercase tracking-[0.5em] text-slate-500 line-clamp-1 italic ${pixelFont.className}`}>
                    SiteProx — No caos da web, nós somos a ordem.
                  </p>
                </FadeIn>
              </div>
              
              <FadeIn delay={0.6}>
                <p className="text-2xl md:text-4xl text-white font-black max-w-4xl mx-auto leading-none uppercase italic border-l-8 border-[#22d3ee] pl-8 text-left bg-white/5 py-8 backdrop-blur-sm group hover:border-[#ec4899] transition-colors duration-500">
                  Criamos sites profissionais para negócios locais que querem <span className="text-[#22d3ee] group-hover:text-white transition-colors">mais clientes</span> pelo WhatsApp e Google.
                </p>
              </FadeIn>
           </div>

           <FadeIn delay={0.8}>
             <div className="flex justify-center mt-12">
                <a 
                  href="https://wa.me/5531982188309"
                  target="_blank"
                  className="group relative overflow-hidden bg-gradient-to-r from-[#8b5cf6] to-[#ec4899] px-20 py-7 rounded-2xl font-black text-sm uppercase tracking-widest shadow-[0_0_50px_rgba(139,92,246,0.6)] active:scale-95 transition-all flex items-center justify-center min-w-[320px]"
                >
                   <span className="relative z-10 font-bold">Quero meu site agora</span>
                   <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                </a>
             </div>
           </FadeIn>
        </div>
      </section>

      {/* --- THE PAIN --- */}
      <section className="py-40 z-10 relative">
         <div className="container mx-auto px-6">
            <FadeIn>
              <div className="bg-gradient-to-br from-red-600/10 to-transparent border border-red-500/20 rounded-[4rem] p-16 relative overflow-hidden">
                 <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    <div className="space-y-10">
                       <AlertOctagon className="w-16 h-16 text-red-500" />
                       <h2 className={`text-5xl md:text-[6rem] font-black tracking-tighter uppercase italic leading-[0.85] ${sora.className}`}>
                         Você está <span className="text-red-500 underline decoration-wavy">perdendo</span> clientes agora.
                       </h2>
                       <p className="text-2xl text-slate-400 font-medium italic border-l-4 border-red-500 pl-8">
                         Enquanto você está offline ou com um site lento, seu concorrente está fechando vendas no WhatsApp. Seu negócio é <span className="text-white font-black">INVISÍVEL.</span>
                       </p>
                    </div>
                    <div className="space-y-8">
                       {[ "O lead não espera 3 segundos.", "Visual amador afasta bons clientes.", "Sites lentos custam dinheiro real." ].map((item, i) => (
                         <div key={i} className="p-8 bg-black/40 border border-white/5 rounded-3xl flex items-center gap-6 group hover:border-red-500/50 transition-all">
                            <History className="w-10 h-10 text-red-500 opacity-50 group-hover:opacity-100 group-hover:scale-110 transition-all" />
                            <p className="text-xl font-black uppercase tracking-tighter">{item}</p>
                         </div>
                       ))}
                    </div>
                 </div>
              </div>
            </FadeIn>
         </div>
      </section>

      {/* --- MANTRA --- */}
      <section className="relative py-60 z-10 overflow-hidden bg-[#05050a]">
         <div className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-[#8b5cf6]/50 to-transparent top-0" />
         <div className="container mx-auto px-6 text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="space-y-12">
               <h2 className={`text-5xl md:text-8xl font-black tracking-tight uppercase leading-none text-white ${sora.className}`}>
                  No caos da web, <br className="hidden md:block"/> 
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-400 to-white/50 bg-[length:200%_auto] animate-gradient-flow">
                     NÓS SOMOS A ORDEM.
                  </span>
               </h2>
               <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 text-slate-400">
                  <p className="text-xl md:text-2xl font-medium uppercase tracking-[0.2em] italic">
                     Sites rápidos. Automação. <br className="md:hidden"/> Presença digital que <span className="text-white font-black underline decoration-[#ec4899] decoration-2 underline-offset-8">gera resultado.</span>
                  </p>
               </div>
            </motion.div>
         </div>
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-[#8b5cf6]/5 rounded-full blur-[120px] pointer-events-none" />
      </section>

      {/* --- TESTIMONIALS (PREMIUM UPGRADE) --- */}
      <section className="py-32 z-10 relative">
         <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { 
                name: "Lucas - Pet Estrela", 
                avatar: "lucas_pet_estrela.png",
                text: "Faturamento subiu 40% no primeiro mês porque o lead chega 'quente' no WhatsApp.", 
                res: "+40% Lucro",
                color: "group-hover:border-cyan-500/50"
              },
              { 
                name: "Ana - Solar Estética", 
                avatar: "ana_solar_estetica.png",
                text: "O visual Cyberpunk chamou muita atenção. A performance é absurda, carrega instantâneo.", 
                res: "100/100 Perf",
                color: "group-hover:border-purple-500/50"
              }
            ].map((t, idx) => (
              <FadeIn key={idx} delay={idx * 0.2}>
                <motion.div 
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 6 + idx, repeat: Infinity, ease: "easeInOut" }}
                  className={`p-12 border border-white/10 bg-white/5 backdrop-blur-3xl rounded-[3rem] relative group transition-all duration-700 h-full flex flex-col justify-between min-h-[480px] ${t.color}`}
                >
                   <div>
                      <div className="flex gap-1 mb-10">
                         {[1,2,3,4,5].map(i => <Star key={i} className="w-5 h-5 text-cyan-400 fill-current shadow-[0_0_10px_rgba(34,211,238,0.5)]" />)}
                      </div>
                      <p className="text-2xl font-black italic tracking-tight mb-12 text-white leading-relaxed">
                        &quot;{t.text}&quot;
                      </p>
                   </div>
                   
                   <div className="flex justify-between items-center bg-black/20 p-6 rounded-2xl border border-white/5">
                      <div className="flex items-center gap-4">
                         <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-white/10 group-hover:border-cyan-400/50 transition-colors">
                            <img src={`/${t.avatar}`} alt={t.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                         </div>
                         <div className="text-left">
                            <div className="flex items-center gap-2">
                               <p className="text-[11px] font-black uppercase tracking-widest">{t.name}</p>
                               <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                            </div>
                            <div className="flex items-center gap-1.5 mt-1 border border-emerald-500/20 bg-emerald-500/5 px-2 py-0.5 rounded-full w-fit">
                               <ShieldCheck className="w-3 h-3 text-emerald-500/50" />
                               <p className="text-[8px] text-emerald-500 font-black uppercase tracking-widest">Sistema_Verificado</p>
                            </div>
                         </div>
                      </div>
                      <div className="px-6 py-3 bg-white/5 border border-white/10 text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-white hover:text-black transition-all">
                         {t.res}
                      </div>
                   </div>
                </motion.div>
              </FadeIn>
            ))}
         </div>
      </section>
 
      {/* --- SEASONALITY PITCH --- */}
      <section className="py-20 z-10 relative">
        <div className="container mx-auto px-6">
           <div className="bg-linear-to-r from-purple-900/20 to-pink-900/20 border border-white/5 rounded-[3rem] p-10 md:p-20 relative overflow-hidden group">
              <div className="relative z-10 flex flex-col md:flex-row items-center gap-16">
                 <div className="space-y-8 flex-1">
                    <h2 className={`text-4xl md:text-6xl font-black tracking-tighter uppercase italic leading-[0.85] ${sora.className}`}>
                       Sem Site <span className="text-pink-500 underline decoration-wavy">Engessado.</span> <br/>
                       Design Vivo para o Ano Todo.
                    </h2>
                    <p className="text-xl text-slate-400 leading-relaxed font-medium">
                       Na SiteProx, seu site não fica parado. Nossa equipe de especialistas renova o seu visual para **Natal, Black Friday e Festividades Nacionais** por uma taxa simbólica de **R$ 50**. 
                    </p>
                    <div className="flex gap-4">
                       <div className="px-6 py-3 bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-widest rounded-xl">Upgrade Sazonal</div>
                       <div className="px-6 py-3 bg-pink-500/10 border border-pink-500/30 text-pink-500 text-[10px] font-black uppercase tracking-widest rounded-xl">Taxa Fixa R$ 50</div>
                    </div>
                 </div>
                 <div className="w-full md:w-1/3 grid grid-cols-2 gap-4">
                    {[
                      { icon: Check, t: "NATAL" },
                      { icon: Check, t: "BLACK FRIDAY" },
                      { icon: Check, t: "CARNAVAL" },
                      { icon: Check, t: "FESTAS LOCAIS" }
                    ].map((item, i) => (
                      <div key={i} className="p-6 bg-black/40 border border-white/5 rounded-3xl text-center group-hover:border-pink-500/30 transition-all">
                        <item.icon className="w-6 h-6 text-pink-500 mx-auto mb-3" />
                        <p className="text-[9px] font-black uppercase tracking-widest">{item.t}</p>
                      </div>
                    ))}
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* --- PLANS --- */}
      <section className="py-40 z-10 relative">
        <div className="container mx-auto px-6 text-center space-y-32">
           <h2 className={`text-6xl md:text-8xl font-black tracking-tighter uppercase italic leading-none ${sora.className}`}>Escolha Sua <span className="text-[#ec4899]">Arma.</span></h2>
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
             {plansData.map((plan, idx) => ( <PlanCard key={idx} plan={plan} /> ))}
           </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="py-32 z-10 relative border-t border-white/5 bg-[#0a0a0f]">
         <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-20 text-slate-500">
            <div className="space-y-8">
               <div className="flex items-center gap-4 text-white">
                  <div className="w-12 h-12 bg-white text-black flex items-center justify-center rounded-2xl">
                     <Rocket className="w-8 h-8 fill-current" />
                  </div>
                  <div>
                    <span className={`text-3xl font-black italic tracking-tighter uppercase ${sora.className}`}>SITE<span className="text-[#22d3ee]">PROX</span></span>
                    <p className="text-[8px] font-black uppercase tracking-[0.4em] mt-1 italic">No caos da web, nós somos a ordem.</p>
                  </div>
               </div>
            </div>
            <p className="text-[11px] font-black tracking-widest uppercase italic">© 2026 SITEPROX_LABS</p>
         </div>
      </footer>

      <style jsx global>{`
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-thumb { background: #1e1e26; border-radius: 10px; }
        @keyframes gradient-flow {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient-flow { animation: gradient-flow 6s ease infinite; }
      `}</style>
    </div>
  );
};

export default SiteProxPage;
