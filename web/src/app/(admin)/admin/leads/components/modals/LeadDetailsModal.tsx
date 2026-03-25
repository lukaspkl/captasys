"use client";

import React from "react";
import { 
  X, Globe, MapPin, ExternalLink, ShieldAlert, Activity, Zap, Check, Sparkles, Radar, Database, Target
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Lead, LeadAnalysis } from "../../types";

interface LeadDetailsModalProps {
  isOpen: boolean;
  selectedLeadDetails: Lead | null;
  leadAnalysis: LeadAnalysis | null;
  isAnalyzing: boolean;
  isSiteOutdated: boolean;
  generatedMessage: string;
  cidade: string;
  estado: string;
  onClose: () => void;
  onStartMapsAnalysis: () => void;
  onUpdateLeadStatus: (url: string, status: string) => void;
  onSetSelectedLeadDetails: React.Dispatch<React.SetStateAction<Lead | null>>;
  onConvertToActive: (lead: Lead) => void;
  onGenerateLovablePrompt: () => void;
  onSetIsRenewalModalOpen: (open: boolean) => void;
  onSetIsAuditModalOpen: (open: boolean) => void;
  onGenerateTacticalDossier: (lead: Lead) => void;
  onSetIsPreviewModalOpen: (open: boolean) => void;
  onGenerateAIPitch: (type: "venda" | "recall" | "apresentacao") => void;
  onHandleSendZap: (lead: Lead) => void;
  onSetIsSiteOutdated: (outdated: boolean) => void;
}

const LeadDetailsModal: React.FC<LeadDetailsModalProps> = ({
  isOpen,
  selectedLeadDetails,
  leadAnalysis,
  isAnalyzing,
  isSiteOutdated,
  generatedMessage,
  cidade,
  estado,
  onClose,
  onStartMapsAnalysis,
  onUpdateLeadStatus,
  onSetSelectedLeadDetails,
  onConvertToActive,
  onGenerateLovablePrompt,
  onSetIsRenewalModalOpen,
  onSetIsAuditModalOpen,
  onGenerateTacticalDossier,
  onSetIsPreviewModalOpen,
  onGenerateAIPitch,
  onHandleSendZap,
  onSetIsSiteOutdated,
}) => {
  if (!isOpen || !selectedLeadDetails) return null;

  return (
    <div className="fixed inset-0 bg-[#020617]/90 backdrop-blur-3xl z-150 flex items-center justify-center p-4 print:hidden">
      <div className="bg-[#0f172a] border border-white/10 w-full max-w-6xl h-[90vh] flex flex-col relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.5)]" />

        <div className="p-8 border-b border-white/5 flex justify-between items-center bg-black/20">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 bg-white/5 flex items-center justify-center border border-white/10 group overflow-hidden relative">
              <Globe className="w-8 h-8 text-[#06b6d4] group-hover:scale-110 transition-transform" />
              <div className="absolute inset-0 bg-[#06b6d4]/5 animate-pulse" />
            </div>
            <div>
              <h2 className="font-outfit text-3xl font-black italic text-white uppercase tracking-tighter leading-none">
                {selectedLeadDetails.title}
              </h2>
              <div className="flex items-center gap-4 mt-2">
                <Badge
                  className={`text-[10px] font-black uppercase rounded-none px-3 border ${
                    (selectedLeadDetails.temperature || "Morno") === "Quente"
                      ? "bg-rose-500/10 text-rose-500 border-rose-500/20"
                      : (selectedLeadDetails.temperature || "Morno") === "Frio"
                        ? "bg-cyan-500/10 text-cyan-400 border-cyan-400/20"
                        : "bg-amber-500/10 text-amber-500 border-amber-500/20"
                  }`}
                >
                  {selectedLeadDetails.temperature || "Morno"}
                </Badge>
                <div className="flex items-center gap-1">
                  {selectedLeadDetails.rating ? (
                    <>
                      <Sparkles className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                      <span className="text-[10px] font-bold text-white ml-1">
                        {selectedLeadDetails.rating} ({selectedLeadDetails.reviewCount || "N/A"} AVALIAÇÕES)
                      </span>
                    </>
                  ) : (
                    <span className="text-[9px] text-slate-500 font-bold uppercase tracking-tighter">
                      Sem Rating Pública
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <Target className="w-3 h-3 text-[#06b6d4]" />
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    {cidade}, {estado}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-12 h-12 flex items-center justify-center border border-white/10 text-slate-500 hover:text-white hover:bg-white/5 transition-all"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-8 grid grid-cols-12 gap-8">
          {/* Coluna Esquerda: ANÁLISE */}
          <div className="col-span-12 lg:col-span-7 space-y-8">
            <section className="bg-black/20 border border-white/5 p-6 rounded-none">
              <h3 className="text-[11px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                <Activity className="w-4 h-4 text-[#06b6d4]" /> ANÁLISE de OPERAÇÃO Digital
              </h3>
              <div className="grid grid-cols-2 gap-y-4 text-sm font-bold">
                <div className="flex flex-col">
                  <span className="text-[10px] text-slate-600 uppercase">Website / Fonte</span>
                  <div className="flex items-center gap-2">
                    <span className="text-white italic truncate max-w-[150px]">
                      {selectedLeadDetails.url?.includes("google.com") ? "Google Profile" : "Direto (URL)"}
                    </span>
                    {selectedLeadDetails.mapsUrl && (
                      <button
                        onClick={() => window.open(selectedLeadDetails.mapsUrl, "_blank")}
                        className="text-yellow-500 hover:text-white"
                        title="Ver Perfil no Maps"
                      >
                        <MapPin className="w-3 h-3" />
                      </button>
                    )}
                    {selectedLeadDetails.url && (
                      <button
                        onClick={() => window.open(selectedLeadDetails.url, "_blank")}
                        className="text-[#06b6d4] hover:text-white"
                        title="Abrir Site"
                      >
                        <ExternalLink className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] text-slate-600 uppercase">Plataforma</span>
                  <span className={`italic uppercase text-[10px] tracking-widest ${leadAnalysis ? "text-[#06b6d4]" : "text-slate-500"}`}>
                    {isAnalyzing ? "DETECTANDO..." : leadAnalysis?.platform || "Aguardando..."}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] text-slate-600 uppercase">Score Mobile</span>
                  <span className={`italic uppercase text-[10px] tracking-widest ${leadAnalysis ? ((leadAnalysis.score ?? 0) < 50 ? "text-rose-500" : "text-emerald-500") : "text-slate-500"}`}>
                    {leadAnalysis ? `${leadAnalysis.score ?? 0}/100` : "Indefinido"}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] text-slate-600 uppercase">Site / DOMÍNIO</span>
                  <span className={`italic uppercase text-[10px] tracking-widest ${selectedLeadDetails.url && !selectedLeadDetails.url.includes("google.com") ? "text-emerald-400" : "text-rose-500"}`}>
                    {selectedLeadDetails.url && !selectedLeadDetails.url.includes("google.com") ? "DETERMINADO" : "AUSENTE"}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] text-slate-600 uppercase">WhatsApp / Celular</span>
                  <span className={`italic uppercase text-[10px] tracking-widest ${selectedLeadDetails.phone ? "text-emerald-400" : "text-slate-500"}`}>
                    {selectedLeadDetails.phone ? selectedLeadDetails.phone : "NÃO_DETECTADO"}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="flex flex-col">
                  <span className="text-[10px] text-slate-600 uppercase">Social Score</span>
                  <span className="text-white italic uppercase text-[10px] tracking-widest">
                    {selectedLeadDetails.socials?.instagram || selectedLeadDetails.socials?.facebook ? "PRESENÇA_ALTA" : "FRACA"}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] text-slate-600 uppercase">Maps Overall</span>
                  <div className="flex items-center gap-2">
                    <span className="text-emerald-400 italic uppercase text-[10px] tracking-widest">
                      {selectedLeadDetails.rating ? `${selectedLeadDetails.rating} (${selectedLeadDetails.reviewCount || 0})` : "SEM_DADOS"}
                    </span>
                    {selectedLeadDetails.mapsUrl && (
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => window.open(selectedLeadDetails.mapsUrl, "_blank")}
                          className="text-slate-500 hover:text-white text-[9px] font-black uppercase italic underline decoration-[#06b6d4]"
                        >
                          VER_NO_MAPS
                        </button>
                        <button
                          onClick={onStartMapsAnalysis}
                          className="bg-[#06b6d4]/10 text-[#06b6d4] px-1 hover:bg-[#06b6d4] hover:text-black transition-all text-[8px] font-black uppercase tracking-tighter border border-[#06b6d4]/20"
                        >
                          SINCRONIZAR_MAPS
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {selectedLeadDetails.classificationMotivity && (
                <div className="mt-8 bg-black/40 border-l-4 border-cyan-500 p-5 group hover:bg-cyan-500/3 transition-all">
                  <div className="flex items-center gap-3 mb-2">
                    <ShieldAlert className="w-4 h-4 text-cyan-500 animate-pulse" />
                    <span className="text-[11px] font-black text-white uppercase tracking-[0.2em]">Motivo da classificaç&otilde;es</span>
                  </div>
                  <p className="text-[12px] text-slate-300 font-medium leading-relaxed italic pr-4">
                    {selectedLeadDetails.classificationMotivity}
                  </p>
                </div>
              )}

              {leadAnalysis?.perceptions && (
                <div className="mt-6 pt-6 border-t border-white/5">
                  <span className="text-[11px] text-[#06b6d4] font-black uppercase tracking-[0.2em] block mb-4">Pontos Cr&iacute;ticos Detectados</span>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {leadAnalysis.perceptions.map((p: string, i: number) => (
                      <div key={i} className="flex items-start gap-3 bg-white/5 p-3 group hover:bg-white/10 transition-colors">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#06b6d4] mt-1.5 shadow-[0_0_5px_#06b6d4]" />
                        <p className="text-[11px] font-bold text-slate-300 leading-tight uppercase tracking-tight">{p}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </section>

            <section className="bg-black/20 border border-white/5 p-6 rounded-none">
              <h3 className="text-[11px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-4">Mudar Status Operacional</h3>
              <div className="flex flex-wrap gap-2">
                {["NOVO", "CONTATADO", "PROPOSTA", "FECHADO"].map((status) => (
                  <button
                    key={status}
                    onClick={() => {
                      onUpdateLeadStatus(selectedLeadDetails.url!, status);
                      onSetSelectedLeadDetails((prev) => prev ? ({ ...prev, status }) : null);
                    }}
                    className={`h-10 px-4 text-[10px] font-black italic tracking-widest border border-white/10 hover:bg-[#06b6d4] hover:text-black transition-all ${(selectedLeadDetails.status || "NOVO") === status ? "bg-[#06b6d4] text-black border-[#06b6d4]" : "text-slate-500"}`}
                  >
                    {status}
                  </button>
                ))}
              </div>

              {(selectedLeadDetails.status === "FECHADO" || selectedLeadDetails.status === "PROPOSTA") && (
                <div className="mt-4 pt-4 border-t border-white/10 animate-in fade-in zoom-in duration-300">
                  <Button
                    onClick={() => onConvertToActive(selectedLeadDetails)}
                    className="w-full h-14 bg-emerald-500 hover:bg-white text-black font-black italic tracking-[0.2em] transition-all flex items-center justify-center gap-3 rounded-none shadow-[0_0_30px_rgba(16,185,129,0.3)]"
                  >
                    <Zap className="w-5 h-5 fill-current" /> ATIVAR_SITE_EM_PRODUÇÃO
                  </Button>
                  <p className="text-[9px] text-center text-emerald-500 font-bold uppercase tracking-widest mt-2">Pronto para iniciar faturamento recorrente</p>
                </div>
              )}
            </section>
          </div>

          <div className="col-span-12 lg:col-span-5 space-y-8">
            <section className="bg-black/40 border border-[#06b6d4]/20 p-6 rounded-none border-t-4 border-t-[#06b6d4]">
              <h3 className="text-[11px] font-bold text-[#06b6d4] uppercase tracking-[0.2em] mb-4">Gerar PressKit de Venda</h3>
              <div className="space-y-4">
                <p className="text-[10px] text-slate-500 italic">Copie o prompt estruturado para o Lovable ou Switch abaixo:</p>
                <Button
                  onClick={onGenerateLovablePrompt}
                  className="w-full h-12 bg-white text-black font-black italic tracking-widest hover:bg-[#06b6d4] hover:text-black transition-all"
                >
                  GERAR_PROMPT_LOVABLE_GPT
                </Button>

                {selectedLeadDetails?.url && (
                  <div
                    onClick={() => onSetIsSiteOutdated(!isSiteOutdated)}
                    className={`flex items-center gap-3 p-4 border transition-all cursor-pointer ${isSiteOutdated ? "bg-neon-pink/10 border-neon-pink/50" : "bg-black border-white/10 hover:border-white/30"}`}
                  >
                    <div className={`w-4 h-4 border flex items-center justify-center transition-colors ${isSiteOutdated ? 'bg-neon-pink border-neon-pink' : 'border-slate-500'}`}>
                      {isSiteOutdated && <Check className="w-3 h-3 text-black" />}
                    </div>
                    <div>
                      <p className={`text-[10px] font-black uppercase tracking-widest ${isSiteOutdated ? "text-neon-pink" : "text-slate-400"}`}>Marcador: Site Desatualizado / Lento</p>
                      <p className="text-[8px] text-slate-500 uppercase leading-none mt-1">Ativa Proposta de Renovação (-30%)</p>
                    </div>
                  </div>
                )}

                {isSiteOutdated ? (
                  <Button
                    onClick={() => onSetIsRenewalModalOpen(true)}
                    className="w-full h-12 bg-neon-pink text-white font-black italic tracking-widest hover:bg-white hover:text-black transition-all border-none shadow-[0_0_20px_rgba(255,0,255,0.4)]"
                  >
                    DIAGNÓSTICO_RENOVAÇÃO_PRO
                  </Button>
                ) : (
                  <Button
                    onClick={() => onSetIsAuditModalOpen(true)}
                    className="w-full h-12 bg-[#fbce07] text-black font-black italic tracking-widest hover:bg-white hover:text-black transition-all border-none"
                  >
                    GERAR_DOSSIÊ_AUDITORIA_V2
                  </Button>
                )}
                <Button
                  onClick={() => onGenerateTacticalDossier(selectedLeadDetails)}
                  className="w-full h-12 bg-pink-500 text-white font-black italic tracking-widest hover:bg-white hover:text-pink-500 transition-all border-none shadow-[0_0_20px_rgba(236,72,153,0.3)] my-4"
                >
                  <Radar className="w-5 h-5 mr-2" /> GERAR_DOSSIÊ_TÁTICO_V4
                </Button>
                  <button
                    onClick={() => {
                      onGenerateLovablePrompt();
                      setTimeout(() => window.open("https://stitch.withgoogle.com", "_blank"), 600);
                    }}
                    className="w-full h-10 bg-linear-to-r from-[#fbce07] to-[#f59e0b] text-black font-black italic text-[9px] uppercase tracking-widest hover:opacity-90 transition-all flex items-center justify-center gap-2"
                  >
                  <Sparkles className="w-3.5 h-3.5 fill-current" /> GOOGLE_STITCH_MCP
                </button>
                <Button
                  onClick={() => onSetIsPreviewModalOpen(true)}
                  className="w-full h-10 bg-black border border-[#06b6d4]/40 text-[#06b6d4] font-black italic text-[9px] uppercase tracking-widest hover:bg-[#06b6d4]/10 transition-all flex items-center justify-center gap-2"
                >
                  <Activity className="w-3.5 h-3.5" /> SUBIR_PREVIEW_48H
                </Button>
              </div>
            </section>

            <section className="bg-black/20 border border-white/5 p-6 rounded-none">
              <h3 className="text-[11px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-4">Gatilhos de Mensagem (Whats)</h3>
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-2">
                  <Button onClick={() => onGenerateAIPitch("venda")} className="h-10 bg-white/5 border border-white/10 text-white font-bold text-[9px] uppercase italic tracking-tighter hover:bg-emerald-500 hover:text-black">Chamada_Venda</Button>
                  <Button onClick={() => onGenerateAIPitch("recall")} className="h-10 bg-white/5 border border-white/10 text-white font-bold text-[9px] uppercase italic tracking-tighter hover:bg-[#06b6d4] hover:text-black">Chamada_Recall</Button>
                  <Button onClick={() => onGenerateAIPitch("apresentacao")} className="h-10 bg-white/5 border border-white/10 text-white font-bold text-[9px] uppercase italic tracking-tighter hover:bg-amber-500 hover:text-black col-span-2">Apresentação_Empresarial</Button>
                </div>

                {generatedMessage && (
                  <div className="mt-6 space-y-4 animate-in fade-in slide-in-from-bottom-2">
                    <div className="p-4 bg-black/60 border border-white/5 font-bold text-[11px] text-slate-400 italic leading-relaxed whitespace-pre-wrap">{generatedMessage}</div>
                    <div className="flex gap-2">
                      <Button onClick={() => onHandleSendZap(selectedLeadDetails)} className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white font-black tracking-widest h-12 flex items-center justify-center gap-2 uppercase italic text-[10px]"><Zap className="w-4 h-4" /> Enviar WhatsApp</Button>
                      <Button variant="outline" onClick={() => navigator.clipboard.writeText(generatedMessage)} className="w-12 h-12 border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all"><Database className="w-4 h-4" /></Button>
                    </div>
                  </div>
                )}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeadDetailsModal;
