"use client";

import React from "react";
import { 
  X, Printer, ShieldAlert, TrendingDown, Zap, 
  BarChart3, AlertCircle, Smartphone, Globe, Activity,
  SmartphoneIcon, Gauge, MousePointer2, Megaphone,
  CheckCircle2, Target, Cpu
} from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Lead } from "../../types";

interface AuditModalProps {
  isOpen: boolean;
  onClose: () => void;
  lead: Lead | null;
  ticketMedio: number;
  fluxoMensal: number;
  conversaoAtual: number;
  onPrint: () => void;
}

const AuditModal: React.FC<AuditModalProps> = ({
  isOpen,
  onClose,
  lead,
  ticketMedio,
  fluxoMensal,
  conversaoAtual,
  onPrint
}) => {
  if (!isOpen || !lead) return null;

  const lucroPerdido = (fluxoMensal * (conversaoAtual / 100) * ticketMedio);
  const projections = {
    atual: lucroPerdido,
    comSite: lucroPerdido * 1.4, // Estimativa de +40% com SiteProx
    gap: (lucroPerdido * 1.4) - lucroPerdido
  };

  return (
    <div 
      id="audit-root"
      className="fixed inset-0 bg-[#020617]/95 backdrop-blur-2xl z-200 flex items-start justify-center p-0 md:p-8 overflow-y-auto print:bg-white print:p-0"
    >
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          html, body { 
            background: white !important;
            overflow: hidden !important;
            margin: 0 !important;
            padding: 0 !important;
          }
          
          #main-dashboard-container, aside, header, nav, .print\\:hidden, #manual-cmd-btn, button { 
            display: none !important; 
            visibility: hidden !important;
          }

          #audit-root {
            display: block !important;
            position: fixed !important;
            top: 0 !important;
            left: 0 !important;
            width: 210mm !important;
            height: 297mm !important;
            margin: 0 !important;
            padding: 10mm !important;
            background: white !important;
            z-index: 99999 !important;
            overflow: hidden !important;
          }

          #audit-modal-content {
            display: block !important;
            position: relative !important;
            width: 100% !important;
            height: 100% !important;
            border: none !important;
            box-shadow: none !important;
            margin: 0 !important;
            background: white !important;
          }

          .text-white, h1, h2, h3, h4, p, span, div { color: black !important; }
          .bg-black\\/40, .bg-\\[\\#0f172a\\] { background: transparent !important; }
          .bg-amber-500\\/5, .bg-white\\/5 { background: #f9f9f9 !important; border: 1px solid #ddd !important; }
          .text-amber-500, .text-\\[\\#fbce07\\] { color: #d97706 !important; }
          .text-rose-500 { color: #be123c !important; }
          
          @page { size: A4; margin: 0; }
        }
      `}} />

      <div 
        id="audit-modal-content"
        className="bg-[#0f172a] border border-[#fbce07]/30 w-full max-w-4xl relative shadow-[0_0_100px_rgba(251,206,7,0.1)] my-0 md:my-auto print:bg-white print:border-none print:shadow-none"
      >
        {/* Top Glow Bar */}
        <div className="h-1 bg-[#fbce07] w-full shadow-[0_0_15px_rgba(251,206,7,0.5)] print:hidden" />
        
        {/* Premium Header */}
        <div className="p-10 border-b border-white/5 bg-black/40 flex flex-col gap-6 print:bg-white print:border-b-2 print:border-gray-100">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 bg-[#fbce07]/10 flex items-center justify-center border border-[#fbce07]/20 print:border-[#fbce07]">
                <ShieldAlert className="w-8 h-8 text-[#fbce07]" />
              </div>
              <div>
                <h2 className="text-[10px] font-black text-[#fbce07] uppercase tracking-[0.4em] italic mb-1">
                  Relatório de Auditoria de Performance // v4.0
                </h2>
                <h1 className="text-4xl font-black text-white print:text-black uppercase tracking-tighter italic leading-none">
                  ANÁLISE_DE_PERDA_<span className="text-[#fbce07]">SITEPROX</span>
                </h1>
              </div>
            </div>
            
            <div className="flex items-center gap-3 print:hidden">
              <Button
                onClick={onPrint}
                variant="outline"
                className="border-white/10 text-white hover:bg-white/5 gap-2 rounded-none font-black italic uppercase text-[10px] tracking-widest"
              >
                <Printer className="w-4 h-4" /> Exportar PDF
              </Button>
              <button
                onClick={onClose}
                className="w-10 h-10 flex items-center justify-center border border-white/10 text-slate-500 hover:text-white transition-all transform hover:rotate-90"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          <div className="flex justify-between items-end pt-4 border-t border-white/5">
            <div>
              <label className="text-[9px] text-slate-500 font-black uppercase tracking-widest">Alvo da Auditoria</label>
              <h3 className="text-xl font-bold text-white print:text-black uppercase italic">{lead.title}</h3>
            </div>
            <div className="bg-[#fbce07] text-black px-3 py-1 text-[8px] font-black uppercase italic tracking-widest">
              DIAGNÓSTICO CRÍTICO
            </div>
          </div>
        </div>

        <div className="p-12 space-y-12 print:p-8 print:space-y-8">
          
          {/* Main Financial Impact Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <TrendingDown className="w-6 h-6 text-rose-500" />
                <h3 className="text-xs font-black text-white print:text-black uppercase tracking-widest italic">Vazamento de Receita Estimado</h3>
              </div>
              
              <div className="bg-rose-500/5 border border-rose-500/20 p-8 space-y-2 relative overflow-hidden print:bg-gray-50 print:border-gray-200">
                <div className="absolute top-0 right-0 p-2 opacity-10">
                  <BarChart3 className="w-16 h-16 text-rose-500" />
                </div>
                <p className="text-[10px] text-rose-400 font-bold uppercase tracking-wider">Passivo Mensal Acumulado</p>
                <p className="text-5xl font-black text-white print:text-black tracking-tighter">
                  - R$ {projections.gap.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </p>
                <p className="text-[11px] text-slate-500 italic font-medium leading-relaxed pr-8">
                  &ldquo;Este valor projeta os leads qualificados que buscam pelo seu serviço no Google, mas que hoje são capturados pela concorrência devido à obsolescência técnica da sua infraestrutura.&rdquo;
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <Target className="w-6 h-6 text-[#fbce07]" />
                <h3 className="text-xs font-black text-white print:text-black uppercase tracking-widest italic">Variáveis de Mercado (Input)</h3>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/5 border border-white/10 p-5 print:border-gray-100">
                  <span className="text-[9px] text-slate-500 uppercase block mb-1">Passagem Mensal</span>
                  <span className="text-lg font-black text-white print:text-black">{fluxoMensal} Clientes/Mês</span>
                </div>
                <div className="bg-white/5 border border-white/10 p-5 print:border-gray-100">
                  <span className="text-[9px] text-slate-500 uppercase block mb-1">Ticket Médio</span>
                  <span className="text-lg font-black text-white print:text-black">R$ {ticketMedio}</span>
                </div>
                <div className="bg-white/5 border border-white/10 p-5 print:border-gray-100">
                  <span className="text-[9px] text-slate-500 uppercase block mb-1">Conversão Identificada</span>
                  <span className="text-lg font-black text-rose-500 tracking-widest">{conversaoAtual}% (CRÍTICA)</span>
                </div>
                <div className="bg-[#fbce07]/10 border border-[#fbce07]/30 p-5 print:bg-gray-100">
                  <span className="text-[9px] text-[#fbce07] uppercase block mb-1">Potencial Recovery</span>
                  <span className="text-lg font-black text-[#fbce07] tracking-widest">42,7% Est.</span>
                </div>
              </div>
            </div>
          </div>

          {/* Technical Obstruction Checklist */}
          <div className="space-y-8">
            <div className="flex items-center gap-4">
              <div className="flex-1 h-px bg-white/5" />
              <div className="flex items-center gap-4">
                <AlertCircle className="w-5 h-5 text-[#fbce07]" />
                <h3 className="text-xs font-black text-white print:text-black uppercase tracking-[0.3em] italic">Déficit de Infraestrutura Detectado</h3>
              </div>
              <div className="flex-1 h-px bg-white/5" />
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { icon: Smartphone, label: "Touch Navigation", status: "INOPERANTE", color: "text-rose-500" },
                { icon: Gauge, label: "Latência LCP", status: "> 3.2 SEGUNDOS", color: "text-rose-500" },
                { icon: MousePointer2, label: "CTA Conversion", status: "BAIXO_IMPACTO", color: "text-amber-500" },
                { icon: Globe, label: "SEO Dominance", status: "ZONA_SOMBRA", color: "text-rose-500" },
                { icon: Activity, label: "Tracking Real-time", status: "NÃO_DETECTADO", color: "text-slate-500" },
                { icon: Megaphone, label: "Google ADS Score", status: "INSUFICIENTE", color: "text-rose-500" },
                { icon: SmartphoneIcon, label: "Ajuste Responsivo", status: "REJEITADO", color: "text-rose-500" },
                { icon: CheckCircle2, label: "Segurança SSL", status: "EXPIRANDO", color: "text-amber-500" },
              ].map((item, i) => (
                <div key={i} className="border border-white/5 p-4 flex flex-col items-center text-center gap-2 group hover:bg-white/5 transition-all print:border-gray-100">
                  <item.icon className={`w-6 h-6 ${item.color}`} />
                  <span className="text-[10px] font-black text-white print:text-black uppercase tracking-tighter">{item.label}</span>
                  <span className={`text-[8px] font-black italic tracking-widest px-2 py-0.5 ${item.color} bg-current/5 print:bg-transparent`}>{item.status}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tactical Verdict */}
          <div className="bg-[#fbce07]/5 border-l-8 border-[#fbce07] p-12 space-y-6 relative overflow-hidden print:bg-gray-100 print:border-gray-300 print:p-8">
            <div className="absolute top-0 right-0 p-4 opacity-5">
              <Cpu className="w-24 h-24 text-[#fbce07]" />
            </div>
            <div className="flex items-center gap-4">
              <Zap className="w-6 h-6 text-[#fbce07] fill-[#fbce07]" />
              <h4 className="text-[11px] font-black text-[#fbce07] uppercase tracking-widest">Protocolo de Recuperação SiteProx</h4>
            </div>
            <p className="text-3xl font-black text-white print:text-black italic leading-tight tracking-tighter uppercase">
              &ldquo;Sua operação está sob ataque competitivo silencioso. O SiteProx irá estancar a perda mensal de R$ {projections.gap.toLocaleString('pt-BR')} ajustando os pilares de conversão e latência em tempo recorde.&rdquo;
            </p>
          </div>
        </div>

        {/* Tactical Footer */}
        <div className="p-6 bg-black/40 border-t border-white/5 flex justify-between items-center print:bg-white print:border-gray-200">
          <p className="text-[8px] text-slate-500 font-black uppercase tracking-[0.5em]">
            SiteProx // Performance Auditor v4 // Confidential Data
          </p>
          <p className="text-[8px] text-slate-700 font-black uppercase">
            Lead_Track: {lead.id?.substring(0, 8).toUpperCase()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuditModal;
