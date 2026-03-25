"use client";

import React from "react";
import { 
  X, Printer, ShieldAlert, TrendingDown, Zap, 
  BarChart3, AlertCircle, Smartphone, Globe, Activity,
  SmartphoneIcon, Gauge, MousePointer2, Megaphone
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
    <div className="fixed inset-0 bg-[#020617]/95 backdrop-blur-2xl z-200 flex items-start justify-center overflow-y-auto p-0 md:p-8 animate-in fade-in duration-300 print:bg-white print:p-0">
      <div className="bg-[#0f172a] border border-white/10 w-full max-w-[210mm] relative shadow-[0_0_100px_rgba(251,206,7,0.15)] print:shadow-none print:border-none print:w-[210mm] print:h-[297mm] print:overflow-hidden print:m-0">
        
        {/* Hacker Header */}
        <div className="h-1 bg-[#fbce07] w-full print:hidden" />
        
        <div className="p-10 border-b border-white/5 bg-black/40 flex justify-between items-center print:bg-white print:border-b-2 print:border-gray-100 print:p-8">
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <ShieldAlert className="w-5 h-5 text-[#fbce07]" />
              <h2 className="text-[10px] font-black text-[#fbce07] uppercase tracking-[0.4em] italic mb-1">
                Relatório de Auditoria de Performance // v2.0
              </h2>
            </div>
            <h1 className="text-4xl font-black text-white print:text-black uppercase tracking-tighter italic">
              ANÁLISE_DE_PERDA_<span className="text-[#fbce07]">{lead.title?.replace(/\s/g, '_').toUpperCase()}</span>
            </h1>
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

        <div className="p-12 space-y-12 print:p-8 print:space-y-8">
          
          {/* Section 1: Perda Financeira (Impacto Real) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <TrendingDown className="w-6 h-6 text-rose-500" />
                <h3 className="text-xs font-black text-white print:text-black uppercase tracking-widest italic">
                  Vazamento de Receita Estimado
                </h3>
              </div>
              
              <div className="bg-rose-500/5 border border-rose-500/20 p-8 space-y-2 relative overflow-hidden print:bg-gray-50 print:border-gray-200">
                <div className="absolute top-0 right-0 p-2 opacity-10">
                  <BarChart3 className="w-16 h-16 text-rose-500" />
                </div>
                <p className="text-[10px] text-rose-400 font-bold uppercase tracking-wider">Prejuízo Mensal Acumulado</p>
                <p className="text-5xl font-black text-white print:text-black tracking-tighter">
                  - R$ {projections.gap.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </p>
                <p className="text-[11px] text-slate-500 italic font-medium leading-relaxed pr-8">
                  &ldquo;Este valor representa os contatos que o Google envia para a sua região mas você não recebe por falhas na sua infraestrutura digital.&rdquo;
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <BarChart3 className="w-6 h-6 text-[#fbce07]" />
                <h3 className="text-xs font-black text-white print:text-black uppercase tracking-widest italic">
                  Variáveis do Diagnóstico
                </h3>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/5 border border-white/10 p-4 print:border-gray-100">
                  <span className="text-[9px] text-slate-500 uppercase block mb-1">Passagem Mensal</span>
                  <span className="text-lg font-black text-white print:text-black">{fluxoMensal} Clientes</span>
                </div>
                <div className="bg-white/5 border border-white/10 p-4 print:border-gray-100">
                  <span className="text-[9px] text-slate-500 uppercase block mb-1">Ticket Médio</span>
                  <span className="text-lg font-black text-white print:text-black">R$ {ticketMedio}</span>
                </div>
                <div className="bg-white/5 border border-white/10 p-4 print:border-gray-100">
                  <span className="text-[9px] text-slate-500 uppercase block mb-1">Conversão Atual</span>
                  <span className="text-lg font-black text-rose-500">{conversaoAtual}% (CRÍTICA)</span>
                </div>
                <div className="bg-[#fbce07]/10 border border-[#fbce07]/30 p-4 print:bg-gray-100">
                  <span className="text-[9px] text-[#fbce07] uppercase block mb-1">Potencial v4</span>
                  <span className="text-lg font-black text-[#fbce07]">42% Est.</span>
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Checklist do Insucesso */}
          <div className="space-y-8">
            <div className="flex items-center gap-4">
              <AlertCircle className="w-6 h-6 text-[#fbce07]" />
              <h3 className="text-xs font-black text-white print:text-black uppercase tracking-widest italic">
                Checklist de Obstrução de Vendas
              </h3>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { icon: Smartphone, label: "Touch Inoperante", status: "FALHA", color: "text-rose-500" },
                { icon: Gauge, label: "Latência LCP > 3.2s", status: "LENTO", color: "text-rose-500" },
                { icon: MousePointer2, label: "Falta de CTAs", status: "AUSENTE", color: "text-amber-500" },
                { icon: Globe, label: "SEO Regional", status: "ZUMBI", color: "text-rose-500" },
                { icon: Activity, label: "Monitoramento", status: "OFF-LINE", color: "text-slate-500" },
                { icon: Megaphone, label: "Google ADS 25", status: "REJEITADO", color: "text-rose-500" },
                { icon: SmartphoneIcon, label: "Responiv. Total", status: "NÃO", color: "text-rose-500" },
                { icon: Zap, label: "Páginas LCP", status: "42/100", color: "text-rose-500" },
              ].map((item, i) => (
                <div key={i} className="border border-white/5 p-4 flex flex-col items-center text-center gap-2 group hover:bg-white/5 transition-all print:border-gray-100">
                  <item.icon className={`w-6 h-6 ${item.color}`} />
                  <span className="text-[10px] font-black text-white print:text-black uppercase tracking-tighter">{item.label}</span>
                  <span className={`text-[9px] font-black italic tracking-widest bg-white/5 px-2 py-0.5 ${item.color} print:bg-transparent`}>{item.status}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Section 3: Veredito Tático */}
          <div className="bg-[#fbce07]/5 border-l-8 border-[#fbce07] p-12 space-y-4 print:bg-gray-50 print:border-gray-200 print:p-8">
            <div className="flex items-center gap-3">
              <Zap className="w-6 h-6 text-[#fbce07] fill-[#fbce07]" />
              <h4 className="text-[11px] font-black text-[#fbce07] uppercase tracking-widest">
                Protocolo de Recuperação // SiteProx
              </h4>
            </div>
            <p className="text-2xl font-black text-white print:text-black italic leading-tight tracking-tight">
              &ldquo;Sua empresa está sendo superada pelo volume de buscas regionais devido a uma estrutura técnica obsoleta. O SiteProx irá estancar o vazamento de receita de R$ {projections.gap.toLocaleString('pt-BR')} e reverter o fluxo de leads para sua operação em até 72 horas.&rdquo;
            </p>
          </div>

          {/* Footer Auditoria */}
          <div className="pt-12 border-t border-white/5 flex justify-between items-center opacity-30 print:opacity-100 print:text-gray-400">
            <div className="text-[10px] font-black uppercase tracking-widest">
              Relatório Gerado por: <span className="text-white print:text-black">Consultoria SiteProx // Sniper Digital</span>
            </div>
            <div className="text-[8px] font-bold uppercase">
              Hash Protocolo: {lead.id?.substring(0, 8).toUpperCase() || "SNIPER_V2"}
            </div>
          </div>
        </div>

        {/* Global Print Hacks */}
        <style jsx global>{`
          @media print {
            body { 
              background: white !important;
              color: black !important;
            }
            #main-dashboard-container {
              display: none !important;
            }
            .fixed {
              position: relative !important;
              background: white !important;
              display: block !important;
              padding: 0 !important;
            }
            .z-200 {
              z-index: auto !important;
            }
            @page {
              size: A4;
              margin: 0;
            }
          }
        `}</style>
      </div>
    </div>
  );
};

export default AuditModal;
