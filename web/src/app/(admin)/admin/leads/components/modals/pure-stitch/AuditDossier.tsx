'use client';

import React from 'react';
import { 
  ShieldCheck, 
  Activity, 
  Zap, 
  LayoutDashboard, 
  Smartphone, 
  MessageSquare,
  Search,
  Wrench,
  AlertTriangle,
  Globe,
  Database,
  ArrowRight
} from 'lucide-react';
import { Lead } from '../../../types';

interface AuditDossierProps {
  lead?: Lead;
  onPrint?: () => void;
  ticketMedio?: number;
  fluxoMensal?: number;
  conversaoAtual?: number;
}

const AuditDossier: React.FC<AuditDossierProps> = ({ 
  lead, 
  onPrint, 
  ticketMedio = 1000, 
  fluxoMensal = 50, 
  conversaoAtual = 2 
}) => {
  // Cálculos baseados no "Neon Syndicate" logic
  const faturamentoAtual = (fluxoMensal * (conversaoAtual / 100)) * ticketMedio;
  const conversaoAlvo = 10; // Meta do SiteProx
  const faturamentoAlvo = (fluxoMensal * (conversaoAlvo / 100)) * ticketMedio;
  const lucroPerdido = faturamentoAlvo - faturamentoAtual;

  return (
    <div className="min-h-screen bg-[#140727] text-[#eee0ff] font-['Manrope'] p-8 md:p-16 selection:bg-[#ff51fa] selection:text-white">
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Manrope:wght@300;400;500;600;700&display=swap');
        
        body { font-family: 'Manrope', sans-serif; }
        .font-space { font-family: 'Space Grotesk', sans-serif; }
        
        .glass-panel {
          background: rgba(26, 10, 46, 0.6);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 81, 250, 0.1);
          border-radius: 24px;
        }

        .neon-text-primary {
          color: #ff51fa;
          text-shadow: 0 0 15px rgba(255, 81, 250, 0.4);
        }

        .gradient-border-box {
          position: relative;
          border-radius: 24px;
          background: #1a0a2e;
          padding: 1px;
        }

        .gradient-border-box::before {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: 24px;
          padding: 1px;
          background: linear-gradient(135deg, #ff51fa, #00dce6);
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          pointer-events: none;
        }
      `}} />

      <main className="max-w-7xl mx-auto space-y-24">
        {/* Header Tático */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 border-b border-[#ff51fa]/10 pb-12">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="bg-[#ff51fa]/10 p-2 rounded-xl border border-[#ff51fa]/20">
                <ShieldCheck className="w-6 h-6 text-[#ff51fa]" />
              </div>
              <span className="font-space text-xs font-bold tracking-[0.3em] uppercase text-[#ff51fa]">Dossiê de Auditoria v.2026</span>
            </div>
            <h1 className="font-space text-4xl md:text-6xl font-black italic tracking-tighter text-white uppercase leading-none">
              DIAGNÓSTICO <br/>
              <span className="text-[#ff51fa]">VULNERABILIDADE</span>
            </h1>
          </div>
          
          <div className="flex flex-col items-end text-right">
            <div className="text-[10px] font-black tracking-widest text-[#00dce6] mb-2 uppercase">Protocolo_Ativo</div>
            <div className="text-2xl font-space font-bold text-white tracking-widest">{lead?.title?.split(' ')[0] || 'LEAD'}_CORE</div>
            <button onClick={onPrint} className="mt-4 px-6 py-2 bg-[#ff51fa] text-white font-space text-[10px] font-black uppercase italic tracking-widest transition-all hover:bg-white hover:text-black hover:scale-105 active:scale-95 no-print rounded-full">
              Exportar_Relatório
            </button>
          </div>
        </header>

        {/* Impacto Financeiro */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="glass-panel p-10 lg:col-span-2 space-y-8">
            <h3 className="font-space text-sm font-black text-[#ff51fa] uppercase tracking-widest mb-6 border-l-4 border-[#ff51fa] pl-4">Impacto Mensal de Conversão</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="space-y-4 flex flex-col justify-between h-full">
                <span className="text-[10px] font-bold text-[#eee0ff]/40 uppercase tracking-widest">Faturamento Atual</span>
                <div className="text-4xl font-space font-black text-white italic tracking-tighter">
                  R$ {faturamentoAtual.toLocaleString('pt-BR')}
                </div>
                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-rose-500 w-[20%]"></div>
                </div>
              </div>

              <div className="space-y-4 flex flex-col justify-between h-full">
                <span className="text-[10px] font-bold text-[#00dce6]/60 uppercase tracking-widest">Potencial de Otimização</span>
                <div className="text-4xl font-space font-black text-[#00dce6] italic tracking-tighter">
                  R$ {faturamentoAlvo.toLocaleString('pt-BR')}
                </div>
                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-[#00dce6] w-[100%]"></div>
                </div>
              </div>

              <div className="space-y-4 flex flex-col justify-between h-full">
                <span className="text-[10px] font-bold text-[#ff51fa] uppercase tracking-widest">Lucro Desperdiçado</span>
                <div className="text-4xl font-space font-black text-[#ff51fa] italic tracking-tighter">
                  R$ {lucroPerdido.toLocaleString('pt-BR')}
                </div>
                <div className="h-1.5 w-full bg-[#ff51fa]/5 rounded-full overflow-hidden">
                  <div className="h-full bg-[#ff51fa] w-[80%] animate-pulse"></div>
                </div>
              </div>
            </div>
            
            <p className="text-xs text-[#eee0ff]/60 leading-relaxed font-medium bg-[#ff51fa]/5 p-6 border-l-4 border-[#ff51fa]">
               *Estimativa baseada em um aumento de {conversaoAlvo - conversaoAtual}% na taxa de conversão direta ao implementar o ecossistema <span className="text-white font-bold">SiteProx Pro</span>.
            </p>
          </div>

          <div className="space-y-8 flex flex-col">
            <div className="glass-panel p-8 bg-[#ff51fa]/5 border-[#ff51fa]/20 flex-1">
               <AlertTriangle className="w-8 h-8 text-rose-500 mb-6" />
               <h4 className="font-space text-lg font-black text-white uppercase italic mb-4">Urgência Crítica</h4>
               <p className="text-sm text-[#eee0ff]/80 leading-relaxed mb-6">
                 Sua operação digital atual está operando sob "vazamento de tráfego". A cada 100 visitantes, {100 - conversaoAtual} são perdidos devido a fricções técnicas e falta de autoridade visual.
               </p>
               <div className="py-3 px-4 bg-rose-500/10 border border-rose-500/20 text-rose-500 text-[10px] font-black uppercase tracking-widest rounded-lg flex items-center justify-center gap-2">
                 <Zap className="w-4 h-4" /> Alerta de Evasão de Leads
               </div>
            </div>
          </div>
        </section>

        {/* Pilares da Auditoria */}
        <section className="space-y-12">
          <div className="text-center space-y-4">
            <h2 className="font-space text-4xl font-black text-white uppercase italic tracking-tighter">Pilares de Dominância Digital</h2>
            <p className="text-slate-400 text-sm max-w-2xl mx-auto">Relatório técnico detalhando os pontos de falha corrigidos pelo sistema SiteProx.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Smartphone, title: 'Ergonomia Mobile', desc: 'Sua interface atual falha em 82% das interações via toque em dispositivos pequenos.', color: 'text-[#ff51fa]' },
              { icon: Activity, title: 'Velocidade Core', desc: 'Tempo de reposta acima de 3s mata a intenção de compra instantaneamente.', color: 'text-[#00dce6]' },
              { icon: ShieldCheck, title: 'Autoridade de Marca', desc: 'Design incoerente gera desconfiança sobre a real capacidade da sua empresa.', color: 'text-[#beee00]' },
              { icon: Zap, title: 'Taxa de Retenção', desc: 'Visitantes saem do site sem sequer ver seu principal diferencial competitivo.', color: 'text-orange-400' }
            ].map((pilar, idx) => (
              <div key={idx} className="glass-panel p-8 group hover:bg-[#ff51fa]/5 transition-all cursor-default">
                 <pilar.icon className={`w-10 h-10 ${pilar.color} mb-6`} />
                 <h4 className="font-space text-lg font-black text-white uppercase italic mb-4">{pilar.title}</h4>
                 <p className="text-xs text-[#eee0ff]/60 leading-relaxed">{pilar.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Profissional */}
        <section className="py-24 text-center space-y-12 no-print relative overflow-hidden rounded-[40px] border border-white/5 bg-black/40">
          <div className="absolute inset-0 bg-gradient-to-r from-[#ff51fa]/10 via-transparent to-[#00dce6]/10 pointer-events-none"></div>
          <div className="relative z-10 space-y-8">
             <h2 className="font-space text-4xl md:text-5xl font-black text-white uppercase italic tracking-tighter leading-none">
               Recupere os <span className="text-[#ff51fa]">R$ {lucroPerdido.toLocaleString('pt-BR')}</span> <br/> que você está deixando na mesa.
             </h2>
             <button className="px-12 py-6 bg-white text-black font-space text-xl font-black uppercase italic tracking-widest transition-all hover:bg-[#ff51fa] hover:text-white hover:scale-110 active:scale-95 shadow-[0_0_50px_rgba(255,255,255,0.2)] rounded-full">
               Ativar Operação Agora
             </button>
             <p className="text-[#eee0ff]/40 text-[10px] font-bold uppercase tracking-widest">Tempo estimado para implementação: 48 horas</p>
          </div>
        </section>
      </main>

      <footer className="mt-32 border-t border-white/5 pt-12 text-center text-[10px] font-space font-bold uppercase tracking-[0.4em] text-[#eee0ff]/20">
        SiteProx Global Infrastructure // Auditoria_Document_#8827-01
      </footer>
    </div>
  );
};

export default AuditDossier;