/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import { Radar, ShieldCheck, X, Crosshair, Cpu, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface DossierModalProps {
  isOpen: boolean;
  onClose: () => void;
  lead: any;
  isLoading: boolean;
  competitorsCount: { radius2km: number; radius5km: number };
  competitorsList: any[];
  pitch: string;
  onPrint: () => void;
  onSendZap: (lead: any) => void;
  isPrinting?: boolean;
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
  isPrinting = false,
}) => {
  if (!isOpen || !lead) return null;

  return (
    <div
      id="dossier-print-zone"
      className="fixed inset-0 bg-[#020617]/95 backdrop-blur-2xl z-[200] flex items-center justify-center p-4 overflow-y-auto"
    >
      <div className="bg-[#0f172a] border border-pink-500/30 w-full max-w-4xl min-h-[80vh] h-fit flex flex-col relative shadow-[0_0_100px_rgba(236,72,153,0.1)] my-auto">
        <div className="absolute top-0 left-0 w-full h-1 bg-pink-500 shadow-[0_0_15px_rgba(236,72,153,0.5)]" />

        <div className="p-8 border-b border-white/5 flex flex-col gap-4 bg-black/40">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 bg-pink-500/10 flex items-center justify-center border border-pink-500/20">
                <Radar className="w-8 h-8 text-pink-500 animate-pulse" />
              </div>
              <div>
                <h2 className="font-outfit text-2xl font-black italic text-white uppercase tracking-tighter">
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
              <h3 className="text-xl font-bold text-white uppercase italic">
                {lead.title}
              </h3>
            </div>
            <Badge className="bg-pink-500 text-white border-none text-[8px] font-black uppercase px-3 h-6 mb-1">
              CLASSIFICADO // CONFIDENCIAL
            </Badge>
          </div>
        </div>

        <div className="p-10 flex-1 space-y-12">
          {isLoading ? (
            <div className="h-64 flex flex-col items-center justify-center space-y-6">
              <div className="w-20 h-20 border-t-2 border-pink-500 border-r-2 border-transparent rounded-full animate-spin" />
              <p className="text-xs font-black text-pink-500 uppercase tracking-[0.5em] animate-pulse">
                Sincronizando satélites...
              </p>
            </div>
          ) : (
            <>
              {/* Radar Section */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-black/40 border border-white/5 p-6 space-y-4">
                  <p className="text-[10px] text-slate-500 font-black uppercase">
                    Densidade Local 2km
                  </p>
                  <h3 className="text-4xl font-black text-white italic">
                    {competitorsCount.radius2km}
                  </h3>
                  <p className="text-[9px] text-pink-500 font-bold uppercase tracking-tighter">
                    Concorrentes Diretos Detectados
                  </p>
                </div>
                <div className="bg-black/40 border border-white/5 p-6 space-y-4">
                  <p className="text-[10px] text-slate-500 font-black uppercase">
                    Alcance Regional 5km
                  </p>
                  <h3 className="text-4xl font-black text-white italic">
                    {competitorsCount.radius5km}
                  </h3>
                  <p className="text-[9px] text-pink-500 font-bold uppercase tracking-tighter">
                    Projeção de Mercado Ativo
                  </p>
                </div>
                <div className="bg-black/40 border border-white/5 p-6 space-y-4">
                  <p className="text-[10px] text-slate-500 font-black uppercase">
                    Métrica de Percepção
                  </p>
                  <h3
                    className={`text-4xl font-black italic ${
                      parseFloat(lead.rating) < 4.6
                        ? "text-rose-500"
                        : "text-emerald-500"
                    }`}
                  >
                    {lead.rating}★
                  </h3>
                  <p className="text-[9px] text-slate-500 font-bold uppercase tracking-tighter">
                    Score Médio no Google Business
                  </p>
                </div>
              </div>

              {/* Competitors List */}
              <div className="space-y-6">
                <h4 className="text-[11px] font-black text-white uppercase tracking-[0.2em] flex items-center gap-2">
                  <Crosshair className="w-4 h-4 text-pink-500" /> Alvos de Monitoramento
                  Próximos
                </h4>
                <div className="grid grid-cols-1 gap-3">
                  {competitorsList.map((c: any, i: number) => (
                    <div
                      key={i}
                      className="bg-white/5 border border-white/5 p-4 flex justify-between items-center group hover:bg-white/10 transition-all"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-1.5 h-1.5 bg-pink-500 rounded-full group-hover:animate-ping" />
                        <div>
                          <p className="text-xs font-bold text-white uppercase">
                            {c.title}
                          </p>
                          <p className="text-[9px] text-slate-500 tracking-tighter uppercase">
                            {c.address || "Localização Oculta"}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-[10px] font-black text-pink-300 italic">
                          {c.rating}★
                        </span>
                        <Badge className="bg-pink-500/10 text-pink-500 border-none text-[8px] uppercase">
                          {c.reviews} reviews
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pitch Final */}
              <div className="bg-pink-500/5 border-l-4 border-pink-500 p-8 space-y-4">
                <h4 className="text-[11px] font-black text-pink-500 uppercase tracking-[0.2em] flex items-center gap-2">
                  <Cpu className="w-4 h-4" /> Recomendação Tática do System
                </h4>
                <p className="text-lg font-bold text-white leading-relaxed italic pr-12">
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

        <div className="p-4 bg-black/20 border-t border-white/5 text-center">
          <p className="text-[8px] text-slate-600 font-black uppercase tracking-[0.5em]">
            SiteProx Intelligence System // Confidential Data
          </p>
        </div>
      </div>
    </div>
  );
};

export default DossierModal;
