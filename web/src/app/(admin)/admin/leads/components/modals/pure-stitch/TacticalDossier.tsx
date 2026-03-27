'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { 
  ShieldCheck, 
  Radar, 
  Target, 
  ChevronRight,
  Monitor,
  Smartphone,
  Zap,
  ExternalLink,
  Star,
  StarHalf,
  Rocket,
} from 'lucide-react';
import { Lead } from '../../../types';

interface TacticalDossierProps {
  lead?: Lead;
  competitors?: Lead[];
  nicho?: string;
  onPrint?: () => void;
  highlightPhrase?: string;
  slug?: string;
}

const TacticalDossier: React.FC<TacticalDossierProps> = ({ 
  lead, 
  competitors = [], 
  nicho = 'Geral', 
  onPrint,
  highlightPhrase,
  slug
}) => {
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
            <span className="text-secondary">Radar Ativo</span>
            <span>Intel Stream V7</span>
          </div>
        </div>
        <div className="flex items-center">
          <div className="font-mono text-[9px] md:text-[11px] text-slate-500 uppercase tracking-widest bg-white/5 px-3 py-1 md:px-4 md:py-2 border border-white/5">
            {currentTime}
          </div>
        </div>
      </nav>

      <main className="max-w-[1400px] mx-auto px-6 py-12 space-y-24 relative">
        {/* Background Gradients */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[150px] -z-10 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[150px] -z-10"></div>

        {/* Hero Section */}
        <header className="relative py-12 md:py-20 overflow-hidden">
          <div className="flex flex-col md:flex-row justify-between items-center md:items-end gap-12 text-center md:text-left">
            <div className="space-y-6 relative z-10 w-full flex flex-col items-center md:items-start">
              <div className="inline-flex items-center gap-3 px-4 py-2 bg-secondary/10 border border-secondary/20 rounded-none mb-4">
                <Radar className="w-4 h-4 text-secondary animate-pulse" />
                <span className="font-mono text-[10px] text-secondary font-black uppercase tracking-[0.4em]">Sector Scan Complete</span>
              </div>
              <h1 className="text-4xl xs:text-5xl md:text-8xl font-headline font-black italic text-white leading-[0.9] uppercase tracking-tighter chromatic-aberration">
                Dossiê <br/>
                <span className="text-secondary neon-glow-cyan underline decoration-white/10 underline-offset-8">Tático de Competição</span>
              </h1>
              <div className="w-full max-w-xl h-0.5 bg-linear-to-r from-transparent via-secondary md:from-secondary md:via-secondary to-transparent"></div>
            </div>
            
            <div className="glass p-6 md:p-8 border-l-4 border-l-primary space-y-4 min-w-full md:min-w-[320px] w-full md:w-auto text-left">
              <div className="text-[9px] md:text-[10px] font-mono text-slate-500 uppercase tracking-widest font-bold flex justify-between items-center gap-4">
                <span>Identificação do Alvo</span>
                {slug && <span className="opacity-30 text-[7px] md:text-[8px] tracking-normal font-normal">ID: {slug}</span>}
              </div>
              <div className="text-3xl md:text-4xl font-headline font-black text-white italic uppercase tracking-tighter">
                {lead?.title || 'OBJETIVO_DESCONHECIDO'}
              </div>
              <div className="flex items-center gap-3 font-mono text-[8px] md:text-[9px] text-primary uppercase tracking-[0.2em]">
                <ShieldCheck className="w-3 h-3" />
                Nicho: {nicho}
              </div>
            </div>
          </div>
        </header>

        {/* Customer Decision Section - SiteProx V7 */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center py-20 border-b border-white/5">
          <div className="relative group">
            <div className="absolute -inset-4 bg-primary/20 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
            <div className="relative overflow-hidden border border-white/10 rounded-none shadow-2xl aspect-square md:aspect-video lg:aspect-square">
              <Image 
                src="/tactical_decision.png" 
                alt="Tactical Workstation" 
                fill
                className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute bottom-0 right-0 glass p-8 border-l-4 border-l-primary min-w-[200px] flex flex-col items-end">
                <span className="text-5xl font-headline font-black text-white italic leading-none mb-2">94%</span>
                <span className="text-[8px] font-mono text-slate-400 uppercase tracking-[0.2em] text-right font-bold leading-tight">DOS CLIENTES PESQUISAM <br/>ONLINE ANTES DA COMPRA</span>
              </div>
            </div>
            {/* Visual scan element */}
            <div className="absolute top-0 left-0 w-full h-[2px] bg-secondary/50 animate-[scanline_4s_linear_infinite] pointer-events-none"></div>
          </div>

          <div className="space-y-10">
            <div className="space-y-4 text-center md:text-left">
              <h2 className="text-3xl xs:text-4xl md:text-6xl font-headline font-black text-white leading-[0.9] uppercase italic tracking-tighter">
                A Decisão do Cliente <br/>
                <span className="text-primary neon-glow-pink">Começa no Google</span>
              </h2>
            </div>
            
            <p className="text-xl text-slate-400 font-medium leading-relaxed max-w-xl font-headline italic">
              No cenário atual de saturação de informação, a primeira batalha pela atenção não ocorre no seu estabelecimento, mas nos resultados de busca.
            </p>

            <div className="relative p-10 bg-white/5 border-l-4 border-l-secondary flex flex-col gap-4">
               <span className="absolute -top-4 -left-4 text-6xl text-secondary opacity-20 font-serif font-black">&quot;</span>
               <p className="italic text-white font-medium text-xl leading-relaxed relative z-10">
                 Hoje, a decisão de um cliente começa no Google. Se sua presença digital é invisível ou mal otimizada, você não existe para o mercado.
               </p>
            </div>

            <p className="text-slate-500 font-mono text-[11px] uppercase tracking-[0.3em] font-bold leading-loose">
              Não se trata apenas de &quot;ter um site&quot;. Trata-se de dominar as frequências onde o seu público está sintonizado. Este dossiê revela onde você está e quão longe seus concorrentes avançaram enquanto sua estação estava em silêncio.
            </p>
          </div>
        </section>

        {/* Highlight Phrase */}
        {highlightPhrase && (
          <section className="bg-primary/5 border border-primary/20 p-12 relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-2 h-full bg-primary shadow-[0_0_20px_rgba(255,0,255,0.8)]"></div>
            <h3 className="font-headline text-2xl md:text-4xl font-black italic uppercase text-white mb-4 leading-tight">
              &quot;{highlightPhrase}&quot;
            </h3>
            <p className="font-mono text-[10px] text-primary uppercase tracking-[0.4em] font-black">Resumo da Avaliação Tática</p>
          </section>
        )}

        {/* Competitor Radar Grid */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 space-y-8">
            <div className="glass p-10 relative overflow-hidden scanline-effect min-h-[500px]">
              <h3 className="font-headline text-sm font-black text-secondary uppercase tracking-[0.4em] mb-12 flex items-center gap-4">
                <Target className="w-5 h-5" /> Varredura Setorial Ativa
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
                {competitors.length > 0 ? competitors.map((comp, idx) => (
                  <div key={idx} className="bg-white/5 border border-white/10 p-6 space-y-4 group hover:border-secondary/50 transition-all">
                    <div className="flex justify-between items-start">
                      <h4 className="font-headline font-bold text-lg text-white uppercase tracking-tighter truncate pr-4">{comp.title}</h4>
                      <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-secondary transition-colors" />
                    </div>
                    
                    <div className="flex gap-1 text-secondary">
                      {Array.from({ length: 5 }).map((_, i) => {
                        const r = parseFloat(String(comp.rating || 0));
                        if (i < Math.floor(r)) return <Star key={i} className="w-3.5 h-3.5 fill-secondary" />;
                        if (i === Math.floor(r) && r % 1 !== 0) return <StarHalf key={i} className="w-3.5 h-3.5 fill-secondary" />;
                        return <Star key={i} className="w-3.5 h-3.5" />;
                      })}
                      <span className="text-slate-500 text-[10px] ml-2 font-mono uppercase">({comp.reviewCount || 0} reviews)</span>
                    </div>

                    <div className="space-y-2">
                       <div className="flex justify-between font-mono text-[9px] text-slate-500 uppercase">
                          <span>Autoridade Digital</span>
                          <span className="text-secondary font-bold">{(Math.min(100, Number(comp.reviewCount || 0) * 0.5 + Number(comp.rating || 0) * 10)).toFixed(0)}%</span>
                       </div>
                       <div className="h-1 w-full bg-white/5 relative overflow-hidden">
                          <div 
                            className="h-full bg-secondary shadow-[0_0_10px_rgba(0,243,255,0.4)] transition-all duration-1000 ease-out" 
                            style={{ width: `${Math.min(100, Number(comp.reviewCount || 0) * 0.5 + Number(comp.rating || 0) * 10)}%` }}
                          ></div>
                          <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent w-1/4 animate-[scanline_2s_linear_infinite]"></div>
                       </div>
                    </div>
                  </div>
                )) : (
                  <div className="col-span-2 py-20 text-center border border-dashed border-white/10">
                    <p className="font-mono text-xs uppercase tracking-widest text-slate-500">Nenhum concorrente direto detectado nesta zona.</p>
                  </div>
                )}

                {/* Target Company (Loading/Intervention) card to fill the slot */}
                <div className="bg-primary/5 border border-primary/40 p-6 space-y-4 relative overflow-hidden group shadow-[inset_0_0_20px_rgba(255,0,255,0.1)] flex flex-col justify-between">
                  <div className="absolute top-0 right-0 px-2 py-1 bg-primary text-white font-mono text-[7px] uppercase tracking-widest z-20 font-black italic">
                    Análise do Alvo Requerida
                  </div>
                  <div className="absolute inset-0 bg-linear-to-tr from-primary/5 to-transparent pointer-events-none"></div>
                  
                  <div className="space-y-4 relative z-10">
                    <div className="flex justify-between items-start">
                      <h4 className="font-headline font-bold text-lg text-white uppercase tracking-tighter truncate pr-4">{lead?.title || 'Alvo Primário'}</h4>
                      <Target className="w-4 h-4 text-primary animate-pulse" />
                    </div>
                    
                    <div className="font-mono text-[10px] text-primary uppercase tracking-[0.2em] font-black italic">
                      STATUS: INVISÍVEL
                    </div>

                    <div className="space-y-2">
                       <div className="flex justify-between font-mono text-[9px] text-slate-500 uppercase font-bold">
                          <span>Autoridade Digital</span>
                          <span className="text-primary animate-pulse font-black">DETECTANDO...</span>
                       </div>
                       <div className="h-1 w-full bg-white/5 relative overflow-hidden">
                          <div className="h-full bg-primary w-1/4 animate-pulse shadow-[0_0_10px_rgba(255,0,255,0.8)]"></div>
                       </div>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-primary/10 flex items-center gap-2 text-[8px] font-mono text-rose-500 uppercase tracking-widest font-black animate-pulse relative z-10">
                    <Zap className="w-3 h-3" /> Intervenção Imediata V7
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 space-y-8">
            <div className="glass p-10 h-full border-t-primary/40 flex flex-col justify-between">
               <div className="space-y-8">
                  <div className="w-16 h-16 bg-primary/10 flex items-center justify-center border border-primary/20 text-primary">
                    <Target className="w-8 h-8" />
                  </div>
                  <h4 className="text-3xl font-headline font-black text-white italic uppercase tracking-tighter leading-none">
                    Status de <br/> <span className="text-primary underline decoration-white/10">Invisibilidade</span>
                  </h4>
                  <p className="font-mono text-[11px] text-slate-400 leading-relaxed uppercase tracking-widest">
                    Sua empresa está sendo filtrada pelos &quot;Invasores Digitais&quot;. Enquanto os concorrentes acima dominam os resultados locais, sua autoridade está evaporando.
                  </p>
               </div>
               
               <div className="pt-10 border-t border-white/5 space-y-4">
                 <span className="text-[10px] font-mono text-primary uppercase tracking-widest font-black">Risco Comercial</span>
                 <div className="text-5xl font-headline font-black text-rose-500 italic tracking-tighter animate-pulse">
                   CRÍTICO
                 </div>
               </div>
            </div>
          </div>
        </section>

        {/* Comparison Pillars */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
           {[
             { icon: Monitor, title: 'Presença Web', status: 'Obsoleto v2', color: 'text-primary', desc: 'Arquitetura que falha em converter visitantes em leads qualificados.' },
             { icon: Smartphone, title: 'Otimização Mobile', status: 'Sincronização Falha', color: 'text-secondary', desc: 'Interface não responsiva que causa abandono imediato de usuários.' },
             { icon: Zap, title: 'Velocidade Leads', status: 'OFFLINE', color: 'text-accent', desc: 'Tempo de resposta crítico, resultando em perda de oportunidade real.' },
           ].map((pillar, idx) => (
             <div key={idx} className="glass p-8 space-y-6 relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-4 font-mono text-[9px] text-white/5 uppercase">{pillar.status}</div>
               <pillar.icon className={`w-12 h-12 ${pillar.color}`} />
               <div className="space-y-4">
                 <h4 className="text-xl font-headline font-black text-white uppercase italic tracking-tighter">{pillar.title}</h4>
                 <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest leading-relaxed">
                   {pillar.desc}
                 </p>
               </div>
               <div className="flex items-center gap-2 text-[10px] font-black text-rose-500">
                 Requer Intervenção <ChevronRight className="w-3 h-3" />
               </div>
             </div>
           ))}
        </section>

        {/* Tactical Plans */}
        <section className="py-20 bg-linear-to-b from-primary/5 to-transparent border-t border-white/5">
           <div className="text-center mb-16 space-y-4 flex flex-col items-center">
              <h2 className="text-4xl md:text-6xl font-headline font-black text-white italic uppercase tracking-tighter leading-none">Protocolos de Domínio</h2>
              <div className="w-24 h-2 bg-primary mb-4"></div>
              <p className="font-mono text-xs text-slate-500 uppercase tracking-widest leading-loose">Selecione sua arma estratégica para recuperar o mercado.</p>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
             {/* Plano Presença */}
             <div className="glass p-12 border-white/5 group hover:border-primary/30 transition-all flex flex-col">
                <div className="font-mono text-[9px] text-slate-500 mb-8 uppercase tracking-widest flex items-center gap-2 font-bold">
                   STP Presença Core
                </div>
                <h3 className="text-3xl font-headline font-black mb-10 uppercase italic text-white tracking-tighter">Plano Presença</h3>
                <div className="text-6xl font-headline font-black text-white mb-12 tracking-tighter">
                  <span className="text-sm font-normal text-slate-500 uppercase align-top mt-2 inline-block">R$</span>100<span className="text-sm font-normal text-slate-500">/mês</span>
                </div>
                <ul className="space-y-6 mb-12 grow font-mono text-[10px] uppercase tracking-widest text-slate-500 group-hover:text-slate-300">
                  <li className="flex items-center gap-4 transition-colors">
                    <span className="text-secondary">&gt;</span> Site One-Page Moderno
                  </li>
                  <li className="flex items-center gap-4 transition-colors">
                    <span className="text-secondary">&gt;</span> Foco em Leads WhatsApp
                  </li>
                  <li className="flex items-center gap-4 transition-colors">
                    <span className="text-secondary">&gt;</span> Stack Vessel 2025
                  </li>
                </ul>
                 <button className="w-full py-5 border border-white/10 text-white font-mono text-[10px] uppercase tracking-[0.3em] hover:bg-white hover:text-black transition-all">
                  Iniciar Protocolo
                </button>
             </div>

             {/* Plano Autoridade */}
             <div className="glass p-12 border-primary/50 bg-primary/5 group relative shadow-[0_0_80px_rgba(255,0,255,0.1)] flex flex-col scale-105 z-10">
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 px-6 py-2 bg-primary text-white font-black text-[9px] tracking-[0.4em] uppercase shadow-lg shadow-primary/40 animate-pulse">
                   Estratégia Recomendada
                </div>
                <div className="font-mono text-[9px] text-primary mb-8 uppercase tracking-widest flex items-center gap-2 font-black">
                   STP Autoridade Override
                </div>
                <h3 className="text-3xl font-headline font-black mb-10 uppercase italic text-white tracking-tighter">Autoridade</h3>
                <div className="text-6xl font-headline font-black text-white mb-12 tracking-tighter">
                  <span className="text-sm font-normal text-primary uppercase align-top mt-2 inline-block">R$</span>150<span className="text-sm font-normal text-slate-500">/mês</span>
                </div>
                <ul className="space-y-6 mb-12 grow font-mono text-[10px] uppercase tracking-widest text-white/80">
                  <li className="flex items-center gap-4">
                    <span className="text-primary font-bold">#</span> Site Multi-Page Completo
                  </li>
                  <li className="flex items-center gap-4">
                    <span className="text-primary font-bold">#</span> Galeria de Fotos/Portfólio
                  </li>
                  <li className="flex items-center gap-4">
                    <span className="text-primary font-bold">#</span> SEO Local Otimizado
                  </li>
                </ul>
                 <button className="w-full py-5 bg-primary text-white font-mono text-[10px] font-black uppercase tracking-[0.3em] shadow-[0_0_40px_rgba(255,0,255,0.4)] hover:bg-white hover:text-primary transition-all">
                  Executar Protocolo
                </button>
             </div>
           </div>
        </section>

        {/* Final CTA */}
        <section className="py-12 md:py-24 text-center">
           <div className="max-w-4xl mx-auto glass p-8 md:p-20 relative overflow-hidden rounded-[2rem] border-white/10 group">
              <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
              <div className="relative z-10 space-y-8 md:space-y-12">
                 <p className="font-mono text-secondary text-[8px] md:text-xs tracking-[0.3em] md:tracking-[0.6em] mb-4">TACTICAL_TRANSMISSION_COMPLETE</p>
                 <h2 className="text-3xl md:text-8xl font-headline font-black mb-8 md:mb-16 italic uppercase leading-tight md:leading-none text-white chromatic-aberration">
                    RECLAMAR MEU <br/><span className="text-secondary neon-glow-cyan">TERRITÓRIO</span>
                 </h2>
                 <button className="inline-flex items-center gap-4 md:gap-8 px-8 md:px-16 py-6 md:py-10 bg-white text-black font-headline text-xl md:text-3xl font-black uppercase italic tracking-tighter hover:scale-105 md:hover:scale-110 transition-all shadow-[0_0_80px_rgba(255,255,255,0.2)] active:scale-95 w-full md:w-auto justify-center">
                    DOMINAR AGORA
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
              <span className="hover:text-secondary cursor-pointer border border-white/5 md:border-none p-4 md:p-0">[ ENCRYPTION: V7 ]</span>
              <span className="hover:text-secondary cursor-pointer border border-white/5 md:border-none p-4 md:p-0">[ SECTOR: GEOLOCAL ]</span>
           </div>
        </div>
      </footer>
    </div>
  );
};

export default TacticalDossier;