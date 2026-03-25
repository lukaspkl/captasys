"use client";

import React from "react";
import { Radar, ShieldCheck, X, Crosshair, Cpu, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Lead } from "../../types";

interface DossierModalProps {
  isOpen: boolean;
  onClose: () => void;
  lead: Lead | null;
  isLoading: boolean;
  competitorsCount: { radius2km: number; radius5km: number };
  competitorsList: Lead[];
  pitch: string;
  onPrint: () => void;
  onSendZap: (lead: Lead) => void;
}

const DossierModal: React.FC<DossierModalProps> = ({
  isOpen,
  onClose,
  lead,
  isLoading,
  competitorsCount,
  competitorsList,
  pitch,
  onPrint,
  onSendZap,
}) => {
  if (!isOpen || !lead) return null;

  return (
    <div
      id="dossier-root"
      className="fixed inset-0 bg-[#020617]/95 backdrop-blur-2xl z-200 flex items-start justify-center p-0 md:p-4 overflow-y-auto"
    >
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          /* Reset de containers superiores */
          html, body { 
            background: white !important;
            height: 100% !important;
            width: 100% !important;
            min-height: 0 !important;
            overflow: hidden !important;
            margin: 0 !important;
            padding: 0 !important;
          }
          
          /* Esconde a "sujeira" do Dashboard e Modais irmãos */
          #main-dashboard-container, aside, header, nav, .print\\:hidden, #manual-cmd-btn, button { 
            display: none !important; 
            visibility: hidden !important;
          }

          /* O dossiê vira o rei da página única */
          #dossier-root {
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
            box-sizing: border-box !important;
          }

          #dossier-modal-content {
            display: block !important;
            position: relative !important;
            width: 100% !important;
            height: 100% !important;
            min-height: 0 !important;
            border: none !important;
            box-shadow: none !important;
            margin: 0 !important;
            background: white !important;
            padding: 0 !important;
          }

          /* Tipografia e Cores de Impressão */
          .text-white, h2, h3, h4, p, span { color: black !important; }
          .bg-black\\/40, .bg-\\[\\#0f172a\\] { background: transparent !important; }
          .bg-pink-500\\/5, .bg-white\\/5 { background: #f9f9f9 !important; border: 1px solid #ddd !important; }
          .text-pink-500 { color: #ec4899 !important; }
          
          @page { size: A4; margin: 0; }
        }
      `}} />

      <div 
        id="dossier-modal-content"
        className="bg-[#0f172a] border border-pink-500/30 w-full max-w-4xl min-h-[80vh] h-fit flex flex-col relative shadow-[0_0_100px_rgba(236,72,153,0.1)] my-0 md:my-auto print:bg-white print:border-none print:shadow-none"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-pink-500 shadow-[0_0_15px_rgba(236,72,153,0.5)] print:hidden" />

        <div className="p-8 border-b border-white/5 flex flex-col gap-4 bg-black/40 print:bg-white">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 bg-pink-500/10 flex items-center justify-center border border-pink-500/20 print:border-pink-500">
                <Radar className="w-8 h-8 text-pink-500" />
              </div>
              <div>
                <h2 className="font-outfit text-2xl font-black italic text-white print:text-black uppercase tracking-tighter">
                  Dossiê de Inteligência Tática
                </h2>
                <p className="text-[10px] text-pink-500 font-black uppercase tracking-[0.3em] flex items-center gap-2">
                  <ShieldCheck className="w-3 h-3" /> Relatório_ID:{" "}
                  {lead.id?.split("-")[0] || "UNK"} SITEPROX_V3
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-slate-500 hover:text-white transition-all print:hidden"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="mt-4 pt-4 border-t border-white/5 flex justify-between items-end">
            <div>
              <label className="text-[9px] text-slate-500 font-black uppercase tracking-widest">
                Alvo da Análise
              </label>
              <h3 className="text-xl font-bold text-white print:text-black uppercase italic">
                {lead.title}
              </h3>
            </div>
            <Badge className="bg-pink-500 text-white border-none text-[8px] font-black uppercase px-3 h-6 mb-1">
              CLASSIFICADO // CONFIDENCIAL
            </Badge>
          </div>
        </div>

        <div className="p-10 flex-1 space-y-12 print:p-6 print:space-y-6">
          {isLoading ? (
            <div className="h-64 flex flex-col items-center justify-center space-y-6">
              <div className="w-20 h-20 border-2 border-transparent border-t-pink-500 rounded-full animate-spin" />
              <p className="text-xs font-black text-pink-500 uppercase tracking-[0.5em] animate-pulse">
                Sincronizando satélites...
              </p>
            </div>
          ) : (
            <>
              {/* Radar Section */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 print:gap-4 print:grid-cols-3">
                <div className="bg-black/40 border border-white/5 p-6 space-y-4 print:border-gray-200">
                  <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest">
                    Densidade Local 2km
                  </p>
                  <h3 className="text-4xl font-black text-white print:text-black italic">
                    {competitorsCount.radius2km}
                  </h3>
                  <div className="space-y-1">
                    <p className="text-[9px] text-pink-500 font-bold uppercase tracking-tighter">
                      Concorrentes Diretos Detectados
                    </p>
                    <p className="text-[8px] text-slate-500 leading-tight">
                      Empresas na sua vizinhança digital imediata disputando o tráfego de proximidade.
                    </p>
                  </div>
                </div>
                <div className="bg-black/40 border border-white/5 p-6 space-y-4 print:border-gray-200">
                  <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest">
                    Alcance Regional 5km
                  </p>
                  <h3 className="text-4xl font-black text-white print:text-black italic">
                    {competitorsCount.radius5km}
                  </h3>
                  <div className="space-y-1">
                    <p className="text-[9px] text-pink-500 font-bold uppercase tracking-tighter">
                      Projeção de Mercado Ativo
                    </p>
                    <p className="text-[8px] text-slate-500 leading-tight">
                      Seu potencial de expansão. Indica o volume de buscas qualificadas num raio estratégico.
                    </p>
                  </div>
                </div>
                <div className="bg-black/40 border border-white/5 p-6 space-y-4 print:border-gray-200">
                  <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest">
                    Métrica de Percepção
                  </p>
                  <h3 className="text-4xl font-black italic flex items-center gap-2">
                    <span className="text-white print:text-black">
                      {lead.rating || "0.0"}
                    </span>
                    <span className="text-emerald-500 text-2xl">★</span>
                  </h3>
                  <div className="space-y-1">
                    <p className="text-[9px] text-emerald-500 font-bold uppercase tracking-tighter">
                      Score no Google Business
                    </p>
                    <p className="text-[8px] text-slate-500 leading-tight">
                      Nota de autoridade baseada no sentimento e avaliações reais do mercado local.
                    </p>
                  </div>
                </div>
              </div>

              {/* Competitors List */}
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="flex-1 h-px bg-white/5" />
                  <div className="flex items-center gap-4">
                    <Crosshair className="w-5 h-5 text-pink-500 animate-pulse" />
                    <h4 className="text-xs font-black text-white print:text-black uppercase tracking-[0.3em] italic">
                      Alvos de Monitoramento Próximos
                    </h4>
                  </div>
                  <div className="flex-1 h-px bg-white/5" />
                </div>

                <div className="grid grid-cols-1 gap-4">
                  {competitorsList.length > 0 ? (
                    competitorsList.map((comp, idx) => (
                      <div key={idx} className="bg-white/5 border border-white/5 p-5 flex justify-between items-center group hover:bg-white/10 transition-all print:border-gray-200">
                        <div className="space-y-1">
                          <h5 className="text-[11px] font-black text-white print:text-black uppercase tracking-wider group-hover:text-pink-500 transition-colors">
                            {comp.title}
                          </h5>
                          <p className="text-[9px] text-slate-400 print:text-gray-600 truncate max-w-sm">
                            {comp.addressBase || comp.address}
                          </p>
                        </div>
                        <div className="flex items-center gap-4 text-[10px] font-black italic">
                          <div className="flex items-center gap-1 text-white print:text-black">
                            {comp.rating || "N/A"}
                            <span className="text-emerald-500">★</span>
                          </div>
                          <div className="bg-pink-500/10 text-pink-500 px-3 py-1 rounded text-[8px] uppercase font-black tracking-tighter">
                            {comp.reviewCount || 0} REVIEWS
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-[10px] text-slate-500 italic text-center py-4">
                      Sincronizando coordenadas de baixa latência...
                    </p>
                  )}
                </div>
                <p className="text-[8px] text-slate-500 italic text-center -mt-2">
                  &ldquo;Lideranças digitais que atualmente detêm a vantagem competitiva sobre o tráfego regional.&rdquo;
                </p>
              </div>

              {/* Recommendation Pitch Section */}
              <div className="bg-pink-500/5 border border-pink-500/20 p-10 space-y-4 print:p-6 print:bg-gray-50 print:border-gray-200">
                <div className="flex items-center gap-3">
                  <Cpu className="w-6 h-6 text-pink-500 fill-pink-500" />
                  <h4 className="text-[10px] font-black text-pink-500 uppercase tracking-widest">
                    Recomendação Tática do System
                  </h4>
                </div>
                <p className="text-lg font-bold text-white print:text-black italic leading-relaxed tracking-tight">
                  &ldquo;{pitch}&rdquo;
                </p>
                <div className="pt-6 flex gap-4 print:hidden">
                  <Button
                    onClick={onPrint}
                    className="bg-white text-black font-black uppercase tracking-widest text-[10px] h-12 px-8 hover:bg-pink-500 hover:text-white transition-all rounded-none"
                  >
                    Exportar PDF_DOSSIÊ
                  </Button>
                  <Button
                    onClick={() => onSendZap(lead)}
                    className="bg-emerald-500 text-white font-black uppercase tracking-widest text-[10px] h-12 px-8 hover:bg-white hover:text-black transition-all rounded-none gap-3"
                  >
                    <Zap className="w-4 h-4" /> Iniciar Ataque WhatsApp
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>

        <div className="p-4 bg-black/20 border-t border-white/5 text-center print:bg-white print:border-gray-200">
          <p className="text-[8px] text-slate-600 font-black uppercase tracking-[0.5em]">
            SiteProx Intelligence System // Confidential Data
          </p>
        </div>
      </div>
    </div>
  );
};

export default DossierModal;
