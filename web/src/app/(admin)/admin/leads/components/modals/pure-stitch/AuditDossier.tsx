"use client";

import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Activity, 
  Zap, 
  AlertTriangle,
  Target,
  ChevronRight,
  Monitor,
  Smartphone,
  PieChart,
  Lock,
  TrendingDown,
  Rocket,
} from 'lucide-react';
import { Lead } from '../../../types';

interface AuditDossierProps {
  lead?: Lead & { name?: string; site?: string };
  onPrint?: () => void;
  ticketMedio?: number;
  fluxoMensal?: number;
  conversaoAtual?: number;
  slug?: string;
}

const AuditDossier: React.FC<AuditDossierProps> = ({ 
  lead, 
  ticketMedio = 1000, 
  fluxoMensal = 60, 
  conversaoAtual = 2.5,
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

  // Garantindo que a conversão seja tratada como número e evite 0 se necessário
  const ConversaoSanitized = Number(conversaoAtual) || 0.01;

  // Cálculos de Impacto (Lógica V7.1 - Dinâmica)
  const faturamentoAtual = (fluxoMensal * (ConversaoSanitized / 100)) * ticketMedio;
  
  // Se a conversão atual já for alta (ex: > 10%), a meta deve ser proporcionalmente maior para mostrar ROI
  const conversaoAlvo = ConversaoSanitized >= 10 ? Number((ConversaoSanitized * 1.5).toFixed(1)) : 12.5;
  const faturamentoAlvo = (fluxoMensal * (conversaoAlvo / 100)) * ticketMedio;
  
  const lucroPerdido = Math.max(0, faturamentoAlvo - faturamentoAtual);
  const perdaAnual = lucroPerdido * 12;

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

        @keyframes pulse-neon {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.02); }
        }

        .animate-pulse-neon {
          animation: pulse-neon 2s infinite ease-in-out;
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
            <span className="text-secondary">SYSTEM_CONNECTED</span>
            <span>DATA_STREAM_ENCRYPTED</span>
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
                <Target className="w-4 h-4 text-secondary animate-pulse" />
                <span className="font-mono text-[10px] text-secondary font-black uppercase tracking-[0.4em]">Audit Target Acquired</span>
              </div>
              <h1 className="text-4xl xs:text-5xl md:text-8xl font-headline font-black italic text-white leading-[0.9] uppercase tracking-tighter chromatic-aberration">
                Dossiê de <br/>
                <span className="text-primary neon-glow-pink underline decoration-white/10 underline-offset-8">Auditoria Digital</span>
              </h1>
              <div className="w-full max-w-xl h-0.5 bg-linear-to-r from-transparent via-primary md:from-primary md:via-primary to-transparent mt-8"></div>
            </div>
            
            <div className="glass p-6 md:p-8 border-l-4 border-l-secondary space-y-4 min-w-full md:min-w-[320px] w-full md:w-auto text-left">
              <div className="text-[9px] md:text-[10px] font-mono text-slate-500 uppercase tracking-widest font-bold flex justify-between items-center gap-4">
                <span>Protocolo de Identidade</span>
                {slug && <span className="opacity-30 text-[7px] md:text-[8px] tracking-normal font-normal">ID: {slug}</span>}
              </div>
              <div className="text-3xl md:text-4xl font-headline font-black text-white italic uppercase tracking-tighter">
                {lead?.name || lead?.title?.split(' ')[0] || 'IDENT_UNKNOWN'}
              </div>
              <div className="flex items-center gap-3 font-mono text-[8px] md:text-[9px] text-secondary uppercase tracking-[0.2em]">
                <ShieldCheck className="w-3 h-3" />
                Dossiê Gerado: {new Date().toLocaleDateString('pt-BR')}
              </div>
            </div>
          </div>
        </header>

        {/* Critical Analysis Section */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 space-y-8">
            <div className="glass p-10 relative overflow-hidden scanline-effect group hover:border-primary/30 transition-all duration-700">
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-30 transition-opacity">
                <PieChart className="w-40 h-40 text-primary rotate-12" />
              </div>
              <h3 className="font-headline text-sm font-black text-primary uppercase tracking-[0.4em] mb-12 flex items-center gap-4">
                <Activity className="w-5 h-5" /> Análise de Conversão Crítica
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 relative z-10">
                <div className="space-y-12">
                  <div className="space-y-4">
                    <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest flex items-center gap-2">
                       Eficiência Técnica Atual
                       <span className="text-slate-400 font-bold">({conversaoAtual}%)</span>
                    </span>
                    <div className="text-6xl font-headline font-black text-white italic tracking-tighter flex items-end gap-2">
                      R$ {faturamentoAtual.toLocaleString('pt-BR')}
                      <span className="text-xs font-normal text-slate-500 uppercase mb-2">/mês</span>
                    </div>
                    <div className="h-2 w-full bg-white/5 relative overflow-hidden">
                      <div 
                        style={{ 
                          width: `${Math.min(100, (conversaoAtual/conversaoAlvo)*100)}%`,
                          transition: 'width 1.5s cubic-bezier(0.19, 1, 0.22, 1)'
                        }}
                        className="h-full bg-rose-500 shadow-[0_0_15px_#f43f5e]" 
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <span className="text-[10px] font-mono text-secondary uppercase tracking-widest flex items-center gap-2">
                       <Zap className="w-3 h-3" /> Potencial com SiteProx
                       <span className="text-secondary/60 font-bold">({conversaoAlvo}%)</span>
                    </span>
                    <div className="text-4xl xs:text-6xl font-headline font-black text-secondary neon-glow-cyan italic tracking-tighter flex items-end gap-2">
                      R$ {faturamentoAlvo.toLocaleString('pt-BR')}
                      <span className="text-[10px] md:text-xs font-normal text-slate-500 uppercase mb-2">/mês</span>
                    </div>
                    <div className="h-2 w-full bg-white/5 relative overflow-hidden">
                      <div 
                        style={{ 
                          width: '100%',
                          transition: 'width 1.5s cubic-bezier(0.19, 1, 0.22, 1) 0.3s'
                        }}
                        className="h-full bg-secondary shadow-[0_0_20px_#00f3ff]" 
                      />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col justify-end">
                   <div className="bg-primary/5 border-l-4 border-primary p-8 space-y-6">
                      <p className="text-xs font-bold text-slate-400 leading-relaxed uppercase tracking-wider">
                        A cada 100 visitantes qualificados em <span className="text-white">{lead?.site || 'seu ecossistema'}</span>, cerca de <span className="text-primary font-black">{(100 - ConversaoSanitized).toFixed(0)} EVADEM</span> instantaneamente devido a fricoes de UI/UX e falta de posicionamento estrat&eacute;gico.
                      </p>
                      <div className="pt-6 border-t border-primary/10">
                        <span className="text-[10px] font-mono text-primary uppercase tracking-widest mb-2 block font-black">Capital Perdido Mensal</span>
                        <div className="text-5xl font-headline font-black text-primary neon-glow-pink italic tracking-tighter">
                          R$ {Math.max(0, lucroPerdido).toLocaleString('pt-BR')}
                        </div>
                      </div>
                   </div>
                </div>
              </div>

              {/* Cálculo Legend - Transparência para o Cliente */}
              <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center gap-6 opacity-60 hover:opacity-100 transition-opacity">
                <div className="flex items-center gap-3 bg-secondary/5 px-4 py-2 border border-secondary/10">
                  <PieChart className="w-4 h-4 text-secondary" />
                  <span className="text-[9px] font-mono text-secondary uppercase tracking-[0.2em] font-black">Audit_Logic_v7.1</span>
                </div>
                <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest leading-relaxed text-center md:text-left">
                  Como chegamos a esse valor? Multiplicamos seu <span className="text-slate-300">Fluxo Mensal ({fluxoMensal} visitas)</span> pela <span className="text-slate-300">Diferen&ccedil;a de Efici&ecirc;ncia</span> técnica e pelo seu <span className="text-slate-300">Ticket M&eacute;dio (R$ {ticketMedio})</span>. O resultado &eacute; o lucro que voc&ecirc; j&aacute; deveria estar recebendo se seu site n&atilde;o estivesse &quot;vazando&quot; autoridade.
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 space-y-8">
            <div className="glass p-10 h-full border-t-secondary/40 flex flex-col justify-between group hover:bg-secondary/5 transition-colors duration-500">
               <div className="space-y-8">
                  <div className="w-16 h-16 bg-secondary/10 flex items-center justify-center border border-secondary/20">
                    <AlertTriangle className="w-8 h-8 text-secondary animate-pulse" />
                  </div>
                  <h4 className="text-3xl font-headline font-black text-white italic uppercase tracking-tighter leading-none">
                    Vazamento <br/> de <span className="text-secondary">Autoridade</span>
                  </h4>
                  <p className="font-mono text-[11px] text-slate-400 leading-relaxed uppercase tracking-widest">
                    Sua marca está sendo filtrada pelos &quot;Invasores Digitais&quot;. Enquanto sua conversão estagna, concorrentes regionais absorvem seu tráfego vitalício.
                  </p>
               </div>
               
               <div className="space-y-4 pt-10">
                 <div className="flex justify-between font-mono text-[9px] text-slate-500 uppercase tracking-widest font-bold">
                    <span>Loss Impact</span>
                    <span className="text-rose-500">Nível Crítico</span>
                 </div>
                 <div className="text-5xl font-headline font-black text-rose-500 italic tracking-tighter">
                   R$ {Math.abs(perdaAnual).toLocaleString('pt-BR')}
                   <span className="text-[9px] block text-slate-600 tracking-[0.4em] font-mono mt-2 uppercase">Vácuo Anual Estimado</span>
                 </div>
               </div>
            </div>
          </div>
        </section>

        {/* Tactical Audit Pillars */}
        <section className="space-y-16 py-12 text-center md:text-left">
           <div className="max-w-2xl mx-auto md:mx-0 flex flex-col items-center md:items-start">
             <h2 className="text-4xl md:text-5xl font-headline font-black text-white italic uppercase tracking-tighter mb-4">Núcleo de Intervenção</h2>
             <div className="w-24 h-2 bg-secondary mb-8"></div>
             <p className="font-mono text-xs uppercase text-slate-500 tracking-widest leading-loose">
               Mapeamento detalhado dos pontos de fricção detectados no projeto original da {lead?.title}.
             </p>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
             {[
               { icon: Monitor, title: 'Inconsistência Visual', desc: 'Sua interface atual falha em transmitir a autoridade necessária para fechar contratos de alto ticket.', id: 'ID_VISUAL_01', color: 'text-primary' },
               { icon: Smartphone, title: 'Fricção Mobile', desc: '82% do tráfego abandona o site em menos de 5 segundos devido ao tempo de carregamento no 4G.', id: 'ID_SPEED_02', color: 'text-secondary' },
               { icon: Lock, title: 'Barreiras de Confiança', desc: 'Falta de elementos de prova social e CTAs estratégicos mata a jornada do lead antes do clique.', id: 'ID_TRUST_03', color: 'text-accent' },
               { icon: TrendingDown, title: 'Abono de Oportunidade', desc: 'Não há captura de dados para remarketing, resultando em 98% de perda de visitantes anônimos.', id: 'ID_GHOST_04', color: 'text-slate-100' }
             ].map((item, idx) => (
               <div key={idx} className="glass p-10 space-y-8 group hover:scale-[1.02] transition-all relative overflow-hidden">
                 <div className="absolute top-0 right-0 p-4 font-mono text-[9px] text-white/10 group-hover:text-white/30 transition-colors uppercase tracking-[0.3em]">{item.id}</div>
                 <item.icon className={`w-12 h-12 ${item.color} mb-4 transition-transform group-hover:rotate-12`} />
                 <h4 className="text-xl font-headline font-black text-white italic uppercase tracking-tighter">{item.title}</h4>
                 <p className="font-mono text-[10px] uppercase text-slate-500 leading-relaxed tracking-widest group-hover:text-slate-300 transition-colors">{item.desc}</p>
                 <div className="flex items-center gap-2 text-[10px] font-black text-secondary group-hover:gap-4 transition-all">
                   Em Espera <ChevronRight className="w-3 h-3" />
                 </div>
               </div>
             ))}
           </div>
        </section>

        {/* Final Dominance Plan */}
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 cyber-grid opacity-10"></div>
          <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-primary to-transparent"></div>
          
          <div className="relative z-10 text-center max-w-5xl mx-auto space-y-16">
            <div className="space-y-4">
              <span className="font-mono text-xs text-secondary tracking-[0.8em] uppercase">Solution_Architect_Selection</span>
              <h2 className="text-5xl md:text-8xl font-headline font-black text-white leading-none italic uppercase tracking-tighter">
                O Futuro é <span className="text-primary neon-glow-pink">Alta Performance</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
               {/* Essential */}
               <div className="glass p-12 border-white/5 flex flex-col group hover:bg-white/5 transition-all text-left">
                  <div className="font-mono text-[9px] text-slate-500 mb-8 uppercase tracking-widest flex items-center gap-2 font-bold">
                    <span className="w-2 h-2 bg-slate-500 rounded-full"></span>
                    STP Presença Core
                  </div>
                  <h3 className="text-3xl font-headline font-black mb-10 uppercase italic text-white tracking-tighter text-glow-primary">Plano Presença</h3>
                  <div className="text-6xl font-headline font-black text-white mb-12 tracking-tighter">
                    <span className="text-sm font-normal text-slate-500 uppercase align-top mt-2 inline-block">R$</span>100<span className="text-sm font-normal text-slate-500">/mês</span>
                  </div>
                  <ul className="space-y-6 mb-12 grow font-mono text-[10px] uppercase tracking-widest">
                    <li className="flex items-center gap-4 text-slate-500 group-hover:text-white transition-colors">
                      <span className="text-secondary">&gt;</span> Site One-Page Moderno
                    </li>
                    <li className="flex items-center gap-4 text-slate-500 group-hover:text-white transition-colors">
                      <span className="text-secondary">&gt;</span> Foco em Leads WhatsApp
                    </li>
                    <li className="flex items-center gap-4 text-slate-500 group-hover:text-white transition-colors">
                      <span className="text-secondary">&gt;</span> Stack Vessel 2025
                    </li>
                  </ul>
                  <button className="w-full py-5 border border-white/20 text-white font-mono text-[10px] uppercase tracking-[0.3em] hover:bg-white hover:text-black hover:border-white transition-all duration-300 cursor-pointer">
                    Iniciar STP Presença
                  </button>
               </div>

               {/* Professional */}
               <div className="glass p-12 border-primary/50 bg-primary/5 transform md:scale-110 z-20 flex flex-col relative shadow-[0_0_80px_rgba(255,0,255,0.1)] text-left">
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 px-6 py-2 bg-primary text-white font-black text-[9px] tracking-[0.4em] uppercase shadow-lg shadow-primary/40 animate-pulse">
                    HIGH_EFFICIENCY_CHOICE
                  </div>
                  <div className="font-mono text-[9px] text-primary mb-8 uppercase tracking-widest flex items-center gap-2 font-black">
                    <span className="w-2 h-2 bg-primary rounded-full animate-ping"></span>
                    STP Autoridade Override
                  </div>
                  <h3 className="text-4xl font-headline font-black mb-10 uppercase italic text-white tracking-tighter neon-glow-pink">Autoridade</h3>
                  <div className="text-7xl font-headline font-black text-white mb-12 tracking-tighter">
                    <span className="text-sm font-normal text-primary uppercase align-top mt-2 inline-block">R$</span>150<span className="text-sm font-normal text-slate-500">/mês</span>
                  </div>
                  <ul className="space-y-6 mb-12 grow font-mono text-[10px] uppercase tracking-widest">
                    <li className="flex items-center gap-4 text-white">
                      <span className="text-primary font-bold">#</span> Site Multi-Page Completo
                    </li>
                    <li className="flex items-center gap-4 text-white">
                      <span className="text-primary font-bold">#</span> Galeria de Fotos/Portfólio
                    </li>
                    <li className="flex items-center gap-4 text-white">
                      <span className="text-primary font-bold">#</span> SEO Local Otimizado
                    </li>
                  </ul>
                  <button className="w-full py-6 bg-primary text-white font-mono text-xs font-black uppercase tracking-[0.4em] shadow-[0_0_40px_rgba(255,0,255,0.4)] hover:bg-white hover:text-primary transition-all duration-300 animate-pulse-neon cursor-pointer">
                    Executar STP Autoridade
                  </button>
               </div>

               {/* Custom */}
               <div className="glass p-12 border-white/5 flex flex-col group hover:bg-white/5 transition-all text-left">
                  <div className="font-mono text-[9px] text-slate-500 mb-8 uppercase tracking-widest flex items-center gap-2 font-bold">
                    <span className="w-2 h-2 bg-slate-500 rounded-full"></span>
                    STP Sazonal Upgrade
                  </div>
                  <h3 className="text-3xl font-headline font-black mb-10 uppercase italic text-white tracking-tighter">Upgrade Sazonal</h3>
                  <div className="text-5xl font-headline font-black text-white mb-8 tracking-tighter">
                    <span className="text-sm font-normal text-slate-500 uppercase align-top mt-2 inline-block">R$</span>50<span className="text-sm font-normal text-slate-500">_FIXO</span>
                  </div>
                  <ul className="space-y-6 mb-12 grow font-mono text-[10px] uppercase tracking-widest">
                    <li className="flex items-center gap-4 text-slate-500 group-hover:text-white transition-colors">
                      <span className="text-secondary">&gt;</span> Natal / Black Friday
                    </li>
                    <li className="flex items-center gap-4 text-slate-500 group-hover:text-white transition-colors">
                      <span className="text-secondary">&gt;</span> Festividades Nacionais
                    </li>
                  </ul>
                  <button className="w-full py-5 border border-white/20 text-white font-mono text-[10px] uppercase tracking-[0.3em] hover:bg-white hover:text-black hover:border-white transition-all duration-300 cursor-pointer">
                    Iniciar Upgrade
                  </button>
               </div>
            </div>
          </div>
        </section>

        {/* Final CTA Area */}
        <section className="py-12 md:py-24 text-center">
           <div className="max-w-4xl mx-auto glass p-8 md:p-20 relative overflow-hidden rounded-[2rem] border-white/10 group">
              <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
              <div className="relative z-10 space-y-8 md:space-y-12">
                 <p className="font-mono text-secondary text-[8px] md:text-xs tracking-[0.3em] md:tracking-[0.6em] mb-4">END_OF_TRANSMISSION_PROTOCOL</p>
                 <h2 className="text-3xl md:text-8xl font-headline font-black mb-8 md:mb-16 italic uppercase leading-tight md:leading-none text-white chromatic-aberration">
                    AVANÇAR PARA <br/><span className="text-primary neon-glow-pink">STATUS_ATIVO</span>
                 </h2>
                 <button className="inline-flex items-center gap-4 md:gap-8 px-8 md:px-16 py-6 md:py-10 bg-white text-black font-headline text-xl md:text-3xl font-black uppercase italic tracking-tighter hover:scale-105 md:hover:scale-110 hover:bg-primary hover:text-white transition-all shadow-[0_0_80px_rgba(255,255,255,0.2)] active:scale-95 w-full md:w-auto justify-center">
                    RECLAMAR MEU SITE
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
              <a href="#" className="hover:text-secondary transition-colors border border-white/5 md:border-none p-4 md:p-0">[ PRIVACY_PROT ]</a>
              <a href="#" className="hover:text-secondary transition-colors border border-white/5 md:border-none p-4 md:p-0">[ STATUS_LOGS ]</a>
              <a href="#" className="hover:text-secondary transition-colors border border-white/5 md:border-none p-4 md:p-0">[ TERMINAL_ACCESS ]</a>
           </div>
        </div>
      </footer>
    </div>
  );
};

export default AuditDossier;