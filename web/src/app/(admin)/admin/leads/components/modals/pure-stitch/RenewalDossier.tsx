'use client';

import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  RefreshCw, 
  Cpu, 
  Smartphone, 
  Monitor, 
  Zap, 
  Clock, 
  TrendingUp,
  Target,
  Rocket,
  ChevronRight,
} from 'lucide-react';

interface RenewalDossierProps {
  lead?: {
    name?: string;
    city?: string;
    state?: string;
    site?: string;
    whatsapp?: string;
    title?: string;
  };
  onPrint?: () => void;
  slug?: string;
}

const RenewalDossier: React.FC<RenewalDossierProps> = ({ lead, onPrint, slug }) => {
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const dateStr = now.toISOString().replace('T', ' // ').split('.')[0].replace(/-/g, '.');
      setCurrentTime(dateStr + '_UTC');
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-[#05010d] text-slate-300 font-['Manrope'] selection:bg-primary selection:text-white overflow-x-hidden">
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Manrope:wght@300;400;500;600;700&family=Fira+Code:wght@300;400;500&display=swap');
        
        :root {
          --primary: #ff00ff;
          --secondary: #00f3ff;
          --accent: #9d4edd;
        }

        .font-headline { font-family: 'Space Grotesk', sans-serif; }
        .font-mono { font-family: 'Fira Code', monospace; }
        
        .glass {
          background: rgba(13, 2, 31, 0.7);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.05);
        }

        .neon-glow-pink {
          text-shadow: 0 0 20px rgba(255, 0, 255, 0.5), 0 0 40px rgba(255, 0, 255, 0.2);
        }

        .neon-glow-cyan {
          text-shadow: 0 0 20px rgba(0, 243, 255, 0.5), 0 0 40px rgba(0, 243, 255, 0.2);
        }

        .cyber-grid {
          background-image: linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
          background-size: 50px 50px;
        }

        @keyframes scanline {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }

        .scanline-effect::after {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(to bottom, transparent, rgba(0, 243, 255, 0.05), transparent);
          animation: scanline 8s linear infinite;
          pointer-events: none;
          z-index: 50;
        }

        .chromatic-aberration {
          text-shadow: 2px 0 0 rgba(255, 0, 0, 0.3), -2px 0 0 rgba(0, 0, 255, 0.3);
        }

        @media print {
          .no-print { display: none !important; }
          body { background: white; color: black; }
          .glass { background: white; border: 1px solid #eee; color: black; }
          .text-white { color: black !important; }
          .text-slate-300, .text-slate-400, .text-slate-500 { color: #333 !important; }
        }
      ` }} />

      {/* Top Status Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-linear-to-r from-primary via-secondary to-primary z-100 animate-pulse"></div>
      
      <nav className="border-b border-white/5 px-6 py-4 flex justify-between items-center bg-black/40 backdrop-blur-md sticky top-1 z-50">
        <div className="flex items-center gap-3 md:gap-6">
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <Rocket className="w-4 h-4 md:w-5 md:h-5 text-white fill-current" />
              <span className="text-white font-black italic tracking-tighter text-lg md:text-xl leading-none">SITEPROX</span>
            </div>
            <span className="text-[7px] md:text-[8px] font-mono text-secondary tracking-[0.2em] md:tracking-[0.3em] uppercase">No caos da web, nós somos a ordem!</span>
          </div>
          <div className="hidden md:flex items-center gap-4 pl-6 border-l border-white/10 font-mono text-[9px] uppercase tracking-widest text-slate-500">
            <span className="text-secondary">Módulo de Renovação v7</span>
            <span>Manutenção do Sistema Ativa</span>
          </div>
        </div>
        <div className="flex items-center">
          <div className="font-mono text-[9px] md:text-[11px] text-slate-500 uppercase tracking-widest bg-white/5 px-3 py-1 md:px-4 md:py-2 border border-white/5">
            {currentTime}
          </div>
        </div>
      </nav>

      <main className="max-w-[1400px] mx-auto px-6 py-12 space-y-24 relative">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[150px] -z-10 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[150px] -z-10"></div>

        {/* Hero Section */}
        <header className="relative py-12 md:py-20 overflow-hidden">
          <div className="flex flex-col md:flex-row justify-between items-center md:items-end gap-12 text-center md:text-left">
            <div className="space-y-6 relative z-10 w-full flex flex-col items-center md:items-start">
              <div className="inline-flex items-center gap-3 px-4 py-2 bg-secondary/10 border border-secondary/20 rounded-none mb-4">
                <RefreshCw className="w-4 h-4 text-secondary animate-spin-slow" />
                <span className="font-mono text-[10px] text-secondary font-black uppercase tracking-[0.4em]">Renovação de Protocolo Solicitada</span>
              </div>
              <h1 className="text-4xl xs:text-5xl md:text-8xl font-headline font-black italic text-white leading-[0.9] uppercase tracking-tighter chromatic-aberration">
                Modernização <br/>
                <span className="text-primary neon-glow-pink underline decoration-white/10 underline-offset-8">Digital de Elite</span>
              </h1>
              <div className="w-full max-w-xl h-0.5 bg-linear-to-r from-transparent via-primary md:from-primary md:via-primary to-transparent"></div>
            </div>
            
            <div className="glass p-6 md:p-8 border-l-4 border-l-secondary space-y-4 min-w-full md:min-w-[320px] w-full md:w-auto text-left">
              <div className="text-[9px] md:text-[10px] font-mono text-slate-500 uppercase tracking-widest font-bold flex justify-between items-center gap-4">
                <span>Identificação do Lead</span>
                {slug && <span className="opacity-30 text-[7px] md:text-[8px] tracking-normal font-normal">ID: {slug}</span>}
              </div>
              <div className="text-3xl md:text-4xl font-headline font-black text-white italic uppercase tracking-tighter">
                {lead?.title || lead?.name || 'CORE_TARGET'}
              </div>
              <div className="flex items-center gap-3 font-mono text-[8px] md:text-[9px] text-secondary uppercase tracking-[0.2em]">
                <Clock className="w-3 h-3" />
                Vagas Limitadas: Março 2026
              </div>
            </div>
          </div>
        </header>

        {/* Urgency Section */}
        <section className="bg-rose-500/5 border border-rose-500/20 p-12 relative overflow-hidden group text-center md:text-left flex flex-col items-center md:items-start">
          <div className="absolute top-0 left-0 w-2 h-full bg-rose-500 shadow-[0_0_20px_rgba(244,63,94,0.8)]"></div>
          <h3 className="font-headline text-2xl md:text-4xl font-black italic uppercase text-white mb-4 leading-tight">
            Seu site atual está <span className="text-rose-500">AFASTANDO</span> bons clientes.
          </h3>
          <p className="font-mono text-xs uppercase tracking-[0.4em] text-rose-500/60 leading-relaxed font-black">
            No ecossistema digital, a primeira falha é a última. A latência é o fim da sua autoridade.
          </p>
        </section>

        {/* Benefits Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
           {[
             { icon: Cpu, title: 'Atualização Constante', desc: 'Fluxo contínuo de segurança e novas funcionalidades via rede SiteProx.', color: 'text-primary' },
             { icon: Zap, title: 'Performance Alta', desc: 'Otimização avançada para latência zero em ambientes de alto estresse.', color: 'text-secondary' },
             { icon: ShieldCheck, title: 'Manutenção Inclusa', desc: 'Suporte técnico prioritário com diagnósticos preditivos semanais.', color: 'text-accent' },
           ].map((item, idx) => (
             <div key={idx} className="glass p-10 space-y-8 group hover:scale-[1.02] transition-all">
               <item.icon className={`w-12 h-12 ${item.color} group-hover:rotate-12 transition-transform`} />
               <h4 className="text-xl font-headline font-black text-white italic uppercase tracking-tighter">{item.title}</h4>
               <p className="font-mono text-[10px] uppercase text-slate-500 leading-relaxed tracking-widest group-hover:text-slate-300 transition-colors">{item.desc}</p>
             </div>
           ))}
        </section>

        {/* Seasonality Pitch */}
        <section className="glass p-12 border-t-secondary/40 relative overflow-hidden">
           <div className="absolute inset-0 cyber-grid opacity-10"></div>
           <div className="relative z-10 flex flex-col md:flex-row items-center gap-12">
              <div className="flex-1 space-y-6">
                 <h2 className="text-4xl md:text-6xl font-headline font-black text-white italic uppercase tracking-tighter leading-none">
                    Design <span className="text-secondary neon-glow-cyan">Vivo</span>. <br/>
                    O Ano Inteiro.
                 </h2>
                 <p className="text-lg text-slate-400 font-medium leading-relaxed">
                    Na SiteProx, seu site não fica parado. Renovamos seu visual para <span className="text-white">Natal, Black Friday e Festividades Nacionais</span> por uma taxa única de R$ 50.
                 </p>
              </div>
              <div className="glass p-10 border-white/10 text-center min-w-[200px]">
                 <span className="text-[10px] font-mono text-slate-500 uppercase block mb-4">Módulo Sazonal</span>
                 <div className="text-6xl font-headline font-black text-white italic tracking-tighter mb-4">R$ 50</div>
                 <div className="text-[9px] font-black text-secondary tracking-[0.3em] uppercase">Taxa Fixa de Upgrade</div>
              </div>
           </div>
        </section>

        {/* Pricing Strategy */}
        <section className="py-20">
            <div className="text-center mb-16 space-y-4 flex flex-col items-center">
              <h2 className="text-4xl md:text-7xl font-headline font-black text-white italic uppercase tracking-tighter leading-none">Escolha Sua <span className="text-primary">Arma.</span></h2>
              <div className="w-24 h-2 bg-primary"></div>
            </div>
           
           <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
             {/* Plano Presença */}
             <div className="glass p-12 border-white/5 flex flex-col hover:border-white/20 transition-all">
                <div className="font-mono text-[9px] text-slate-500 mb-8 uppercase tracking-widest font-black">STP Presença V7</div>
                <h3 className="text-3xl font-headline font-black mb-10 uppercase italic text-white tracking-tighter">Plano Presença</h3>
                <div className="text-6xl font-headline font-black text-white mb-12 tracking-tighter">
                  <span className="text-sm font-normal text-slate-500 uppercase align-top mt-2 inline-block">R$</span>100<span className="text-sm font-normal text-slate-500">/mês</span>
                </div>
                <ul className="space-y-6 mb-12 grow font-mono text-[10px] uppercase tracking-widest text-slate-400">
                  <li className="flex items-center gap-4"><ChevronRight className="w-3 h-3 text-secondary" /> Site One-Page Moderno</li>
                  <li className="flex items-center gap-4"><ChevronRight className="w-3 h-3 text-secondary" /> Foco em Leads WhatsApp</li>
                  <li className="flex items-center gap-4"><ChevronRight className="w-3 h-3 text-secondary" /> Stack Vessel 2025</li>
                </ul>
             </div>

             {/* Plano Autoridade */}
             <div className="glass p-12 border-primary/50 bg-primary/5 flex flex-col relative shadow-[0_0_80px_rgba(255,0,255,0.1)] scale-105 z-10">
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 px-6 py-2 bg-primary text-white font-black text-[9px] tracking-[0.4em] uppercase shadow-lg shadow-primary/40">
                   Plano Potencial Máximo
                </div>
                <div className="font-mono text-[9px] text-primary mb-8 uppercase tracking-widest font-black">STP Autoridade V7</div>
                <h3 className="text-3xl font-headline font-black mb-10 uppercase italic text-white tracking-tighter">Autoridade</h3>
                <div className="text-6xl font-headline font-black text-white mb-12 tracking-tighter">
                  <span className="text-sm font-normal text-primary uppercase align-top mt-2 inline-block">R$</span>150<span className="text-sm font-normal text-slate-500">/mês</span>
                </div>
                <ul className="space-y-6 mb-12 grow font-mono text-[10px] uppercase tracking-widest text-white/80">
                  <li className="flex items-center gap-4 text-white"><ChevronRight className="w-3 h-3 text-primary" /> Site Multi-Page Completo</li>
                  <li className="flex items-center gap-4 text-white"><ChevronRight className="w-3 h-3 text-primary" /> Galeria de Fotos/Portfólio</li>
                  <li className="flex items-center gap-4 text-white"><ChevronRight className="w-3 h-3 text-primary" /> SEO Local Otimizado</li>
                </ul>
             </div>
           </div>
        </section>

        {/* Final CTA */}
        <section className="py-12 md:py-24 text-center">
           <div className="max-w-4xl mx-auto glass p-8 md:p-20 relative overflow-hidden rounded-[2rem] border-white/10 group">
              <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
               <div className="relative z-10 space-y-8 md:space-y-12">
                  <p className="font-mono text-secondary text-[8px] md:text-xs tracking-[0.3em] md:tracking-[0.6em] mb-4">MISSION_OBJECTIVE_ACCOMPLISHED</p>
                  <h2 className="text-3xl md:text-8xl font-headline font-black mb-8 md:mb-16 italic uppercase leading-tight md:leading-none text-white chromatic-aberration">
                     RENOVAR MEU <br/><span className="text-primary neon-glow-pink">PODER DIGITAL</span>
                  </h2>
                  <button className="inline-flex items-center gap-4 md:gap-8 px-8 md:px-16 py-6 md:py-10 bg-white text-black font-headline text-xl md:text-3xl font-black uppercase italic tracking-tighter hover:scale-105 md:hover:scale-110 transition-all shadow-[0_0_80px_rgba(255,255,255,0.2)] active:scale-95 w-full md:w-auto justify-center">
                     MODERNIZAR AGORA
                  </button>
                 <p className="font-mono text-[9px] text-slate-600 uppercase tracking-[0.8em] pt-12">
                   SiteProx Networks // No caos da web, nós somos a ordem!
                 </p>
              </div>
           </div>
        </section>
      </main>

      <footer className="border-t border-white/5 py-12 px-6 bg-black/50">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-center gap-12 text-[9px] font-mono font-bold text-slate-600 uppercase tracking-[0.4em] text-center md:text-left">
           <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
              <span className="text-white hover:text-primary transition-colors cursor-crosshair text-lg md:text-[9px]">SITEPROX</span>
              <span className="max-w-[250px] md:max-w-none">© 2026 SiteProx_Labs // No caos da web, nós somos a ordem.</span>
           </div>
           <div className="flex flex-col md:flex-row gap-6 md:gap-10">
              <span className="hover:text-secondary cursor-pointer border border-white/5 md:border-none p-4 md:p-0">[ VERSION: 7.4.2 ]</span>
              <span className="hover:text-secondary cursor-pointer border border-white/5 md:border-none p-4 md:p-0">[ STATUS: SECURE ]</span>
           </div>
        </div>
      </footer>
    </div>
  );
};

export default RenewalDossier;