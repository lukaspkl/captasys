/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useLeadsState, templatesList } from "./hooks/useLeadsState";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Globe,
  Database,
  Activity,
  Target,
  X,
  ExternalLink,
  Trash2,
  Zap,
  LayoutDashboard,
  Settings,
  MapPin,
  MessageSquare,
  Send,
  Archive,
  ShieldOff,
  RotateCcw,
  Sparkles,
  Home,
  Check,
  Library,
  Layers,
  Loader2,
  Copy,
  FileText,
  Radar,
  ShieldCheck,
  Crosshair,
  Cpu,
} from "lucide-react";
import { NICHE_CONFIG } from "./types";

// components/modals
import BlacklistModal from "./components/modals/BlacklistModal";
import StitchConfigModal from "./components/modals/StitchConfigModal";
import PreviewModal from "./components/modals/PreviewModal";
import LeadDetailsModal from "./components/modals/LeadDetailsModal";

/**
 *          DESIGN COMMITMENT: NEON HUD ENGINE (Localizada & Funcional)
 */

export default function DashboardPage() {
  const {
    currentView, setCurrentView,
    isModalOpen, setIsModalOpen,
    nicho, setNicho,
    estado, setEstado,
    cidade, setCidade,
    cidadeId, setCidadeId,
    cidadesList,
    bairro, setBairro,
    bairrosList,
    isDeepScan, setIsDeepScan,
    searchMode, setSearchMode,
    minReviewsCount, setMinReviewsCount,
    numResults, setNumResults,
    isSearching, setIsSearching,
    progress, setProgress,
    statusText, setStatusText,
    leads, setLeads,
    vaultLeads, setVaultLeads,
    swipeLeads, setSwipeLeads,
    isDossierModalOpen, setIsDossierModalOpen,
    dossierLead, setDossierLead,
    isDossierLoading, setIsDossierLoading,
    competitorsCount, setCompetitorsCount,
    competitorsList, setCompetitorsList,
    dossierPitch, setDossierPitch,
    isPrinting, setIsPrinting,
    customBairro, setCustomBairro,
    selectedLeadIndex, setSelectedLeadIndex,
    selectedLeadDetails, setSelectedLeadDetails,
    isDetailsModalOpen, setIsDetailsModalOpen,
    generatedMessage, setGeneratedMessage,
    leadAnalysis, setLeadAnalysis,
    isAnalyzing, setIsAnalyzing,
    isPromptCopied, setIsPromptCopied,
    stitchStatuses, setStitchStatuses,
    isStitchConfigOpen, setIsStitchConfigOpen,
    stitchConfig, setStitchConfig,
    filterMode, setFilterMode,
    isAuditModalOpen, setIsAuditModalOpen,
    ticketMedio, setTicketMedio,
    fluxoMensal, setFluxoMensal,
    auditConversion, setAuditConversion,
    isSiteOutdated, setIsSiteOutdated,
    isRenewalModalOpen, setIsRenewalModalOpen,
    isPreviewModalOpen, setIsPreviewModalOpen,
    previewHtmlInput, setPreviewHtmlInput,
    previewLink, setPreviewLink,
    activeProjects, setActiveProjects,
    isProjectSettingsOpen, setIsProjectSettingsOpen,
    manualInput, setManualInput,
    editingProject, setEditingProject,
    projectSettings, setProjectSettings,
    whatsappPreviewMessage, setWhatsappPreviewMessage,
    isTemplatePreviewOpen, setIsTemplatePreviewOpen,
    isLovableModalOpen, setIsLovableModalOpen,
    lovablePromptText, setLovablePromptText,
    landingPageUrl, setLandingPageUrl,
    isManualModalOpen, setIsManualModalOpen,
    templateConfig, setTemplateConfig,
    selectedTemplateLeadUrl, setSelectedTemplateLeadUrl,
    activeTemplate, setActiveTemplate,
    blacklist, setBlacklist,
    quarantinedLeads, setQuarantinedLeads,
    isBlacklistModalOpen, setIsBlacklistModalOpen,
    newBlacklistEntry, setNewBlacklistEntry,
    calculateLeadScore,
    handleCidadeChange,
    addToBlacklist,
    removeFromBlacklist,
    recoverLead,
    clearQuarantine,
    handleDeleteLead,
    addToVault,
    removeFromVault,
    addToSwipe,
    removeFromSwipe,
    generateCloningPrompt,
    openStitchConfig,
    handleAutoBuild,
    handleSendZap,
    updateLeadStatus,
    convertToActive,
    startLeadAnalysis,
    startMapsAnalysis,
    generateAIPitch,
    generateTacticalDossier,
    generateLovablePrompt,
    handleStartSearch,
    handlePrintDossier,
    toggleProjectStatus,
    openProjectSettings,
    processTemplatePreview,
    filteredLeads,
    openLeadDetails,
    deleteActiveProject,
    savePreview,
    generateBundle,
  } = useLeadsState();

  // ─── NUCLEAR PRINT ENGINE V3 ──────────────────────────────────────────────

  return (
    <>
      {/* NUCLEAR PRINT LAYER - ISOLAMENTO TOTAL PARA PDF */}
      <div className={`print-dossier-overlay ${isPrinting && (dossierLead || isAuditModalOpen || isRenewalModalOpen) ? 'active' : ''}`}>
        <style jsx global>{`
          @media screen {
            .print-dossier-overlay { display: none; }
          }
          @media print {
            @page {
              size: A4;
              margin: 0;
            }
            html, body {
              height: 100%;
              margin: 0 !important;
              padding: 0 !important;
              overflow: visible !important;
            }
            .print-dossier-overlay.active, .print-audit-overlay.active { 
              display: block !important; 
              position: absolute !important;
              left: 0 !important;
              top: 0 !important;
              width: 100% !important;
              height: auto !important;
              background: white !important;
              z-index: 9999999 !important;
            }
            /* Esconde apenas a raiz do dashboard, mantendo a árvore React viva para o print */
            .min-h-screen.print\:hidden {
              display: none !important;
            }
          }
        `}</style>
        
        {/*      UNIDADE DE ENTREGA DE PDF: DOSSIÊ TÁTICO & AUDITORIA ESTRATÉGICA */}
        {selectedLeadDetails && (
          <>
            {/* 1. DOSSIÊ TÁTICO (COR: ROSA/HACKER) */}
            {dossierLead && (
              <div id="dossier-print-render" className="w-full bg-white font-outfit text-black print:p-0">
                <div className="max-w-[210mm] mx-auto p-[20mm] bg-white space-y-12">
                  {/* Cabeçalho */}
                  <div className="border-b-[6px] border-pink-500 pb-10 flex justify-between items-start">
                    <div className="space-y-4">
                      <div className="flex items-center gap-6">
                        <div className="w-20 h-20 bg-pink-600 flex items-center justify-center -skew-x-6 text-white">
                          <Radar className="w-10 h-10" />
                        </div>
                        <div>
                          <h1 className="text-4xl font-black uppercase italic tracking-tighter leading-none text-black">
                            Dossiê de Inteligência <br/> <span className="text-pink-600 underline">Estratégica</span>
                          </h1>
                          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 mt-3">
                             Ref_ID: {dossierLead.id.split('-')[0].toUpperCase() + " // SITEPROX_MILITARY_GRADE"}
                          </p>
                        </div>
                      </div>
                      <div className="mt-8">
                        <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest block mb-1">Target_Subject</span>
                        <h2 className="text-2xl font-black uppercase italic text-black">{dossierLead.title}</h2>
                        <p className="text-xs font-bold text-slate-500">{dossierLead.address}</p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2 text-right">
                      <div className="bg-red-600 text-white px-4 py-1 text-[10px] font-black uppercase whitespace-nowrap">CONFI_LEVEL: ALPHA</div>
                      <div className="border-2 border-black p-4 text-[9px] font-bold uppercase leading-tight italic text-black">
                        Data do Relatório: <br/> {new Date().toLocaleDateString('pt-BR')} <br/> 
                        <span className="text-pink-600">UNIDADE_SITEPROX_SYS</span>
                      </div>
                    </div>
                  </div>

                  {/* Seção 1 */}
                  <section className="space-y-10">
                    <div className="flex items-center gap-4">
                      <div className="h-0.5 flex-1 bg-slate-200"></div>
                      <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 italic">Mapeamento de Hostilidade Local</h3>
                      <div className="h-0.5 flex-1 bg-slate-200"></div>
                    </div>

                    <div className="grid grid-cols-3 gap-8">
                      <div className="border-2 border-slate-100 p-8 space-y-4 relative bg-white">
                        <span className="text-[10px] font-black uppercase text-pink-600">Zona 01 // 2km</span>
                        <h4 className="text-[10px] font-bold uppercase italic text-slate-400">Confronto Imediato</h4>
                        <p className="text-6xl font-black italic tracking-tighter text-black">{competitorsCount.radius2km}</p>
                        <p className="text-[9px] font-bold leading-tight text-slate-400 uppercase">Rivais Ativos Detectados.</p>
                      </div>
                      <div className="border-2 border-slate-100 p-8 space-y-4 relative bg-slate-50">
                        <span className="text-[10px] font-black uppercase text-slate-800">Zona 02 // 5km</span>
                        <h4 className="text-[10px] font-bold uppercase italic text-slate-400">Alcance Regional</h4>
                        <p className="text-6xl font-black italic tracking-tighter text-black">{competitorsCount.radius5km}</p>
                        <p className="text-[9px] font-bold leading-tight text-slate-400 uppercase">Ocupação de Mercado Alvo.</p>
                      </div>
                      <div className="border-2 border-slate-900 p-8 space-y-4 relative bg-white">
                        <span className="text-[10px] font-black uppercase text-slate-800">Métrica Social</span>
                        <h4 className="text-[10px] font-bold uppercase italic text-slate-400">Score de Reputação</h4>
                        <p className={`text-6xl font-black italic tracking-tighter ${parseFloat(dossierLead.rating) < 4.6 ? 'text-red-600' : 'text-emerald-600'}`}>
                          {dossierLead.rating}★
                        </p>
                        <p className="text-[9px] font-bold leading-tight text-slate-400 uppercase">Qualidade Percebida.</p>
                      </div>
                    </div>
                  </section>

                  {/* Seção 2 */}
                  <section className="space-y-6">
                    <h3 className="text-xs font-black uppercase tracking-widest text-slate-900 border-l-4 border-pink-500 pl-4 bg-slate-50 py-2">Monitoramento de Alvos Relevantes</h3>
                    <div className="border-2 border-slate-100 divide-y divide-slate-100">
                      {competitorsList.length > 0 ? competitorsList.map((c, i) => (
                        <div key={i} className="p-5 flex justify-between items-center bg-white">
                          <div className="flex items-center gap-5">
                            <div className="w-1.5 h-1.5 bg-pink-500 rounded-full"></div>
                            <div>
                              <p className="text-xs font-black uppercase text-black">{c.title}</p>
                              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">{c.address?.slice(0, 80)}...</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <span className="text-xs font-black italic text-black">{c.rating}★</span>
                            <p className="text-[8px] font-bold text-pink-500 uppercase">{c.reviews} reviews</p>
                          </div>
                        </div>
                      )) : (
                        <p className="p-10 text-center text-xs font-bold text-slate-300 italic uppercase">Aguardando dados de sensores...</p>
                      )}
                    </div>
                  </section>

                  {/* Seção 3 */}
                  <section className="border-[8px] border-slate-900 p-12 bg-white relative">
                    <div className="absolute top-0 right-10 -translate-y-1/2 bg-black text-white px-4 py-1 text-[8px] font-black uppercase">PARECER_TÉCNICO</div>
                    <p className="text-2xl font-black text-slate-900 leading-snug italic py-4">
                      &ldquo;{dossierPitch}&rdquo;
                    </p>
                    <div className="mt-12 pt-10 border-t-2 border-slate-100 flex justify-between items-end">
                      <div className="space-y-1">
                        <p className="text-[9px] font-black uppercase text-slate-400">Certificado Digitalmente:</p>
                        <p className="text-sm font-black italic uppercase tracking-tighter text-black">SiteProx_Strategic_Intelligence_Network</p>
                      </div>
                      <div className="text-right">
                        <div className="w-16 h-1.5 bg-pink-500 mb-2 ml-auto"></div>
                        <p className="text-[8px] font-black uppercase opacity-50 text-black">Cód._Fiscal: SPX-HACK-V3-2024</p>
                      </div>
                    </div>
                  </section>

                  <footer className="pt-20 text-center space-y-3 opacity-40">
                    <div className="h-0.5 w-full bg-slate-100"></div>
                    <p className="text-[8px] font-black uppercase tracking-[0.5em] text-black">Este documento contém dados confidenciais de inteligência. Uso proibido sem autorização do operador.</p>
                  </footer>
                </div>
              </div>
            )}

            {/* 2. AUDITORIA ESTRATÉGICA (COR: CIANO/DIGITAL) */}
            {isAuditModalOpen && (
              <div className={`print-audit-overlay ${isPrinting && isAuditModalOpen ? 'active' : ''}`}>
                <div className="w-full bg-white font-mono text-black p-[15mm]">
                  <header className="border-b-[6px] border-cyan-500 pb-10 flex justify-between items-start">
                    <div className="space-y-4">
                      <div className="flex items-center gap-6">
                        <div className="w-20 h-20 bg-cyan-600 flex items-center justify-center -skew-x-6 text-white text-3xl font-black">
                          SPX
                        </div>
                        <div>
                          <h1 className="text-4xl font-black uppercase italic tracking-tighter leading-none text-black">
                            Auditoria Digital <br/> <span className="text-cyan-600 underline">de Performance</span>
                          </h1>
                          <p className="text-[10px] font-black text-slate-400 mt-2 uppercase tracking-[0.4em]">Protocolo_SiteProx_2025 // v4.0</p>
                        </div>
                      </div>
                    </div>
                    <div className="text-right space-y-2">
                       <div className="bg-black text-white px-6 py-2 text-xs font-black uppercase italic">STATUS: CRÍTICO</div>
                       <p className="text-[10px] font-black text-slate-400 uppercase">Gerado em: {new Date().toLocaleDateString('pt-BR')}</p>
                    </div>
                  </header>

                  <section className="space-y-16 mt-12">
                    <div className="bg-slate-50 border border-slate-200 p-8 relative overflow-hidden">
                      <div className="absolute top-0 right-0 p-6 opacity-5">
                        <Target className="w-20 h-20 text-black" />
                      </div>
                      <h3 className="text-xs font-black text-cyan-600 uppercase tracking-widest mb-4">[::] DIAGNÓSTICO_PRIORITÁRIO</h3>
                      <p className="text-3xl font-black text-black italic uppercase tracking-tighter">{selectedLeadDetails.title}</p>
                      <p className="text-sm font-bold text-slate-500 mt-1 uppercase">{selectedLeadDetails.address}</p>
                    </div>

                    <div className="flex gap-10">
                      <div className="flex-1 bg-black p-10 text-white space-y-4 shadow-xl">
                        <p className="text-[10px] text-cyan-400 font-black uppercase tracking-[0.4em]">SCORE_DE_OPORTUNIDADE</p>
                        <p className="text-8xl font-black italic tracking-tighter leading-none">{selectedLeadDetails.score || '98'}%</p>
                        <div className="h-1.5 w-full bg-white/10 mt-6 relative overflow-hidden">
                          <div className="absolute top-0 left-0 h-full bg-cyan-400 w-[98%]"></div>
                        </div>
                      </div>
                      <div className="w-1/3 border-4 border-black p-8 flex flex-col justify-center items-center text-center">
                        <Zap className="w-12 h-12 text-cyan-600 mb-4" />
                        <p className="text-xs font-black uppercase text-black leading-tight">ENTREGA_PROMETIDA: REDUÇÃO_RESIDUO_ZERO</p>
                      </div>
                    </div>

                    <div className="bg-cyan-50 border-2 border-cyan-100 p-10 space-y-6">
                      <h4 className="text-xl font-black uppercase text-cyan-900 tracking-widest flex items-center gap-3">
                        POTENCIAL_DE_LUCRO_VASSADO (MENSAL)
                      </h4>
                      <p className="text-7xl font-black text-black italic tracking-tighter">
                        R$ {(ticketMedio * fluxoMensal * (auditConversion / 100)).toLocaleString('pt-BR')}
                      </p>
                      <div className="grid grid-cols-2 gap-8 pt-6 border-t border-cyan-200">
                        <div>
                          <p className="text-[8px] font-black text-cyan-600 uppercase">Ticket_Médio_Ref:</p>
                          <p className="text-lg font-black text-black">R$ {ticketMedio}</p>
                        </div>
                        <div>
                          <p className="text-[8px] font-black text-cyan-600 uppercase">Fluxo_Mensal_Estimado:</p>
                          <p className="text-lg font-black text-black">{fluxoMensal} Leads</p>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-10">
                      <div className="border border-slate-200 p-8 space-y-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-rose-500 text-white flex items-center justify-center font-black">01</div>
                          <h5 className="text-sm font-black uppercase text-black italic">PRESENÇA_MOBILE_REATIVA</h5>
                        </div>
                        <p className="text-[10px] text-slate-500 leading-relaxed font-medium italic border-l-2 border-rose-200 pl-4 text-justify">
                          A falta de carregamento instantâneo e botões de ação direta no celular causa uma perda de leads de até 65%. 
                        </p>
                      </div>
                      <div className="border border-slate-200 p-8 space-y-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-purple-500 text-white flex items-center justify-center font-black">02</div>
                          <h5 className="text-sm font-black uppercase text-black italic">CONFIABILIDADE_VISUAL</h5>
                        </div>
                        <p className="text-[10px] text-slate-500 leading-relaxed font-medium italic border-l-2 border-purple-200 pl-4 text-justify">
                          Empresas sem site moderno perdem autoridade. O cliente decide pelo concorrente que transmite mais confiança digital.
                        </p>
                      </div>
                    </div>
                  </section>
                  
                  <footer className="mt-24 pt-10 border-t-2 border-slate-200 flex justify-between items-end">
                    <div className="space-y-4">
                      <p className="text-2xl font-black uppercase italic text-black border-b-4 border-cyan-500 inline-block pr-10">LUCAS_ESTRATEGISTA</p>
                      <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">SQUAD_SITEPROX // OPERAÇÃO_LUCRO_TOTAL</p>
                    </div>
                    <div className="text-right">
                      <p className="text-3xl font-black italic text-black">SITE<span className="text-cyan-600">PROX</span></p>
                      <p className="text-[8px] font-black text-slate-400 uppercase tracking-[0.4em] mb-2">RESIDUO_ZERO_PROTOCOL</p>
                    </div>
                  </footer>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      <div className="min-h-screen bg-[#020617] text-slate-100 font-outfit relative overflow-x-hidden print:hidden">

      <div className="flex-1 flex flex-col relative z-20 print:hidden">
        {/*      HUD CRT OVERLAY */}
        <div className="fixed inset-0 pointer-events-none z-[100] opacity-10">
          <div className="absolute inset-0 bg-[#050505] mix-blend-overlay"></div>
          <div className="scanline"></div>
        </div>

        {/*      MATRIX BACKGROUND */}
        <div className="fixed inset-0 pointer-events-none opacity-5 z-0 cyber-grid"></div>

        {/*      NAVEGAÇÃO LATERAL (TERMINAL STYLE) */}
        <nav className="fixed left-6 top-1/2 -translate-y-1/2 flex flex-col gap-6 hidden lg:flex z-50 p-4 bg-[#0a0a0a] hacker-border no-print">
          {[
            {
              id: "hub",
              icon: Home,
              label: "CENTRAL_HUB",
              href: "/admin/core",
            },
            { id: "dashboard", icon: LayoutDashboard, label: "SYS_DASH" },
            { id: "templates", icon: MessageSquare, label: "TEMPLATES" },
            { id: "active-sites", icon: Globe, label: "NET_SITES" },
            { id: "vault", icon: Archive, label: "COFRE_LEADS" },
            { id: "swipe", icon: Library, label: "SWIPE_FILE" },
            { id: "crm", icon: Database, label: "CORE_LEADS" },
            { id: "settings", icon: Settings, label: "CONFIG" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => {
                if (item.href) window.location.href = item.href;
                else setCurrentView(item.id);
              }}
              className={`w-12 h-12 flex items-center justify-center transition-all group relative border ${currentView === item.id ? "bg-cyan-500/20 border-cyan-400 text-cyan-400 shadow-[0_0_15px_rgba(0,243,255,0.4)]" : "border-white/5 text-slate-700 hover:text-cyan-400 hover:border-cyan-400/50 hover:bg-cyan-900/10"}`}
            >
              <item.icon className="w-5 h-5 !font-black" />
              <div className="absolute left-16 px-2 py-1 bg-cyan-500 text-black text-[9px] font-black rounded-none opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none uppercase tracking-widest whitespace-nowrap font-mono">
                {item.label}
              </div>
            </button>
          ))}
          {/* Blacklist — abre modal */}
          <button
            onClick={() => setIsBlacklistModalOpen(true)}
            className="w-12 h-12 flex items-center justify-center transition-all group relative border border-white/5 text-slate-700 hover:text-red-400 hover:border-red-400/50 hover:bg-red-900/10"
          >
            <ShieldOff className="w-5 h-5" />
            {quarantinedLeads.length > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-black text-[7px] font-black flex items-center justify-center font-mono">
                {quarantinedLeads.length > 9 ? "9+" : quarantinedLeads.length}
              </span>
            )}
            <div className="absolute left-16 px-2 py-1 bg-red-500 text-black text-[9px] font-black rounded-none opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none uppercase tracking-widest whitespace-nowrap font-mono">
              BLACKLIST
            </div>
          </button>
        </nav>

        {/*         CONTAINER PRINCIPAL */}
        <div className="flex-1 flex flex-col relative z-10 lg:pl-28">
          {/*      BARRA SUPERIOR (HACKER CONSOLE) */}
          <header className="h-20 flex items-center justify-between px-10 border-b border-cyan-400/20 bg-[#050505]/80 backdrop-blur-md sticky top-0">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 border border-cyan-400 flex items-center justify-center shadow-[0_0_15px_rgba(0,243,255,0.4)] bg-cyan-950/20">
                  <Zap className="w-5 h-5 text-cyan-400 fill-cyan-400 animate-pulse" />
                </div>
                <div className="flex flex-col -gap-1">
                  <h1 className="font-hacker text-3xl font-black text-cyan-400 tracking-tighter uppercase leading-none hacker-glow">
                    CAPTA_SYS
                    <span className="text-pink-500 font-hacker">_v2.0</span>
                  </h1>
                  <span className="text-[8px] font-mono text-cyan-400/60 uppercase racking-[0.4em]">
                    90s_ENCRYPTION_ACTIVE
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <div className="hidden md:flex items-center gap-4 text-[9px] font-black tracking-widest uppercase text-cyan-400/40 font-mono">
                <span className="text-pink-500">SYS_STATUS:</span>
                <span className="flex items-center gap-2">
                  <span
                    className={`w-2 h-2 ${isSearching ? "bg-pink-500 animate-[ping_1.5s_infinite]" : "bg-cyan-500"} shadow-[0_0_8px_currentColor]`}
                  />
                  {isSearching ? "UPLOADING_DATA..." : "TERMINAL_IDLE"}
                </span>
              </div>
              <div className="flex gap-4">
                <Button
                  onClick={() => setIsManualModalOpen(true)}
                  className="bg-transparent text-cyan-400 border border-cyan-400/30 hover:bg-cyan-400/10 hover:border-cyan-400 rounded-none px-6 h-10 font-mono font-black text-[10px] tracking-widest transition-all"
                >
                  CMD_MANUAL
                </Button>
                <Button
                  onClick={() => setIsModalOpen(true)}
                  disabled={isSearching}
                  className="bg-cyan-500 text-black hover:bg-pink-500 shadow-[0_0_15px_rgba(0,243,255,0.5)] rounded-none px-8 h-10 font-mono font-black tracking-widest border-none transition-all active:translate-y-1"
                >
                  {isSearching ? "MOTOR_RUNNING" : "EXEC_SCAN_NEW"}
                </Button>
              </div>
            </div>
          </header>

          {/*      CONTE  DO DIN  MICO */}
          <div className="p-10 space-y-12 max-w-[1600px] w-full mx-auto">
            {currentView === "dashboard" ? (
              <>
                {/*         HEADER DE VARREDURA (HACKER STYLE) */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                  <div className="space-y-4">
                    <h2 className="font-hacker text-5xl font-black text-cyan-400 uppercase tracking-tighter hacker-glow animate-[text-flicker_3s_infinite]">
                      TERMINAL_SCANNER
                    </h2>
                    <div className="flex items-center gap-4">
                      <Badge className="bg-pink-500 text-black font-black font-mono rounded-none px-4 py-1 text-[9px] tracking-widest uppercase shadow-[0_0_10px_rgba(255,0,255,0.4)]">
                        LOCAL_HACK_ENGINE_V1.9
                      </Badge>
                      <Badge className="bg-transparent text-cyan-400 font-black font-mono rounded-none px-4 py-1 text-[9px] tracking-widest border border-cyan-400/40 uppercase shadow-[inset_0_0_5px_rgba(0,243,255,0.2)]">
                        [{leads.length}] SECTORS_IN_CACHE
                      </Badge>
                    </div>
                  </div>

                  {/*         FILTROS DE ESTRAT  GIA (TABBED CONSOLE) */}
                  <div className="flex flex-wrap gap-1 bg-cyan-950/20 p-1 border border-cyan-400/20">
                    {[
                      { id: "all", label: "SYS_ALL", icon: Globe },
                      { id: "no-site", label: "MISSING_WEB", icon: X },
                      { id: "no-pixel", label: "NO_TRACKING", icon: Activity },
                      {
                        id: "no-mobile",
                        label: "LEGACY_UI",
                        icon: LayoutDashboard,
                      },
                      {
                        id: "low-rating",
                        label: "LOW_REPUTATION",
                        icon: Target,
                      },
                    ].map((f) => (
                      <button
                        key={f.id}
                        onClick={() => setFilterMode(f.id)}
                        className={`h-9 px-4 text-[8px] font-black tracking-widest transition-all uppercase font-mono flex items-center gap-2 ${filterMode === f.id ? "bg-cyan-500 text-black shadow-[0_0_10px_rgba(0,243,255,0.4)]" : "text-cyan-400/50 hover:text-cyan-400 hover:bg-cyan-500/5"}`}
                      >
                        <f.icon className="w-3 h-3" />
                        {f.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/*     STATS DASHBOARD (CYBER-GRID) */}
                <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    {
                      label: "MEMORY_CACHE_LEADS",
                      value: leads.length,
                      icon: Target,
                      suffix: "OBJ",
                    },
                    {
                      label: "BUFFER_SYSTRON_SPEED",
                      value: isSearching ? "98.4" : "0.0",
                      icon: Activity,
                      suffix: "MHZ",
                    },
                    {
                      label: "ENCRYPTED_ZONES",
                      value: leads.length > 0 ? "12" : "0",
                      icon: Globe,
                      suffix: "LOC",
                    },
                  ].map((stat, i) => (
                    <div
                      key={i}
                      className="p-8 bg-[#0a0a0a] hacker-border group hover:bg-cyan-500/5 transition-all cursor-crosshair relative overflow-hidden"
                    >
                      <div className="absolute top-0 right-0 w-16 h-16 bg-cyan-500/5 rotate-45 translate-x-8 -translate-y-8 border-b border-l border-cyan-400 opacity-20"></div>
                      <p className="text-[9px] font-black tracking-[0.3em] text-cyan-400/40 uppercase mb-4 flex items-center gap-2 font-mono">
                        <span className="w-1 h-1 bg-pink-500"></span>{" "}
                        {stat.label}
                      </p>
                      <div className="flex items-baseline gap-2">
                        <h3 className="font-hacker text-6xl font-black text-cyan-400 tracking-tighter hacker-glow">
                          {stat.value}
                        </h3>
                        <span className="text-[10px] font-black text-pink-500 uppercase tracking-widest font-mono">
                          {stat.suffix}
                        </span>
                      </div>
                    </div>
                  ))}
                </section>

                <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
                  <div className="xl:col-span-4 space-y-8">
                    <Card className="bg-[#0a0a0a] border border-cyan-400/30 rounded-none shadow-[0_0_20px_rgba(0,243,255,0.1)] backdrop-blur-md relative overflow-hidden group">
                      <div className="absolute top-0 right-0 w-full h-[1px] bg-cyan-400/50 animate-[scanline_4s_linear_infinite]"></div>
                      <CardHeader className="border-b border-cyan-400/20 bg-cyan-950/10">
                        <CardTitle className="font-mono text-[10px] font-black text-cyan-400 uppercase tracking-[0.3em] flex items-center gap-2">
                          <Activity className="w-3 h-3 animate-pulse" />{" "}
                          RADAR_OP_CONSOLE
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="pt-8 space-y-6">
                        <div className="space-y-3">
                          <div className="flex justify-between text-[9px] font-black text-cyan-400 uppercase font-mono tracking-widest">
                            <span className="animate-pulse">
                              &gt; {statusText}
                            </span>
                            <span className="text-pink-500">{progress}%</span>
                          </div>
                          <div className="h-6 bg-black border border-cyan-400/30 p-1 relative overflow-hidden">
                            <div className="absolute inset-0 bg-[repeating-linear-gradient(90deg,transparent,transparent_4px,rgba(0,243,255,0.1)_4px,rgba(0,243,255,0.1)_5px)]"></div>
                            <div
                              className="h-full bg-cyan-500 transition-all duration-500 shadow-[0_0_15px_#00f3ff]"
                              style={{ width: `${progress}%` }}
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="bg-cyan-950/20 p-4 border-l-4 border-pink-500">
                            <p className="text-[8px] font-black text-cyan-400/50 uppercase mb-1 font-mono tracking-widest">
                              LAST_TARGET_RECOGNITION
                            </p>
                            <p className="font-black text-cyan-400 uppercase tracking-tighter font-hacker text-xl leading-none">
                              {nicho || "NODATA"}
                            </p>
                          </div>
                          <div className="bg-rose-950/20 p-4 border-l-4 border-rose-500">
                            <p className="text-[8px] font-black text-rose-400/50 uppercase mb-1 font-mono tracking-widest">
                              QUARANTINED_TARGETS
                            </p>
                            <p className="font-black text-rose-400 uppercase tracking-tighter font-hacker text-xl leading-none">
                              {quarantinedLeads.length}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {leads.length > 0 && (
                      <Card className="bg-[#06b6d4] text-black border-none rounded-none skew-x-[-2deg] transition-all">
                        <CardHeader>
                          <CardTitle className="font-outfit text-lg font-black italic uppercase">
                            PITCH_RÁPIDO
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <p className="text-xs font-bold leading-relaxed">
                            Sugerimos focar no nicho de{" "}
                            <span className="underline">{nicho}</span> na região
                            de <span className="underline">{cidade}</span>. O
                            score médio de oportunidade alto.
                          </p>
                          <Button className="w-full bg-black text-pink-500 border border-black hover:bg-black/80 font-mono font-black rounded-none transition-all uppercase text-[9px] h-11 tracking-[0.2em] shadow-[0_4px_0_rgba(0,0,0,0.3)] active:translate-y-1 active:shadow-none">
                            START_HACK_PROSPECTION
                          </Button>
                        </CardContent>
                      </Card>
                    )}
                  </div>

                  {/*      TABELA DE LEADS (HACKER TERMINAL) */}
                  <div className="xl:col-span-8 space-y-6">
                    <div className="flex items-center justify-between border-b border-cyan-400/20 pb-4">
                      <h3 className="font-hacker text-2xl font-black text-cyan-400 uppercase tracking-widest hacker-glow">
                        SCAN_RESULTS_STREAM ({filteredLeads.length})
                      </h3>
                      <Button
                        variant="ghost"
                        className="text-[9px] text-pink-500 font-black hover:text-white font-mono tracking-widest"
                        onClick={() => {
                          localStorage.removeItem("capta_leads_cache");
                          setLeads([]);
                        }}
                      >
                        WIPE_MEMORY_CACHE
                      </Button>
                    </div>
                    <div className="bg-[#0a0a0a] border border-cyan-400/20 p-1">
                      <style dangerouslySetInnerHTML={{ __html: `
                        @keyframes neonBlink1 { 0%, 49% { opacity: 1; } 50%, 100% { opacity: 0; } }
                        @keyframes neonBlink2 { 0%, 49% { opacity: 0; } 50%, 100% { opacity: 1; } }
                        .blink-1 { animation: neonBlink1 1.5s infinite; }
                        .blink-2 { animation: neonBlink2 1.5s infinite; }
                        
                        @media print {
                          body * { visibility: hidden !important; }
                          #dossier-print-zone, #dossier-print-zone * { visibility: visible !important; }
                          #dossier-print-zone {
                            position: absolute !important;
                            left: 0 !important;
                            top: 0 !important;
                            width: 100% !important;
                            display: block !important;
                            background: white !important;
                            color: black !important;
                            height: auto !important;
                          }
                          #dossier-print-zone > div {
                            border: none !important;
                            width: 100% !important;
                            max-width: 100% !important;
                            background: white !important;
                          }
                          #dossier-print-zone .bg-[#0f172a] { background: white !important; color: black !important; }
                          #dossier-print-zone .text-white { color: black !important; }
                          #dossier-print-zone .bg-black\/40 { background: #f8fafc !important; border: 1px solid #e2e8f0 !important; }
                          #dossier-print-zone .bg-white\/5 { background: #f1f5f9 !important; border: 1px solid #e2e8f0 !important; }
                          #dossier-print-zone .bg-pink-500\/5 { background: #fff1f2 !important; border: 2px solid #ec4899 !important; }
                          #dossier-print-zone .text-slate-500 { color: #475569 !important; }
                          #dossier-print-zone .text-pink-500 { color: #ec4899 !important; }
                          #dossier-print-zone button { display: none !important; }
                        }
                      `}} />
                      <Table>
                        <TableHeader className="bg-cyan-950/20">
                          <TableRow className="border-cyan-400/10 hover:bg-transparent text-[8px] font-black uppercase tracking-[0.3em] text-cyan-400/60 font-mono">
                            <TableHead className="h-10">
                              HEX_IDENTIFIER
                            </TableHead>
                            <TableHead className="h-10">OP_INDEX</TableHead>
                            <TableHead className="h-10">COMMS_LINK</TableHead>
                            <TableHead className="h-10 text-right">
                              EXE_CMDS
                            </TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filteredLeads.map((lead, idx) => (
                            <TableRow
                              key={idx}
                              onClick={() => openLeadDetails(lead)}
                              className="border-b border-cyan-400/5 group hover:bg-cyan-500/5 transition-colors cursor-crosshair h-20"
                            >
                              <TableCell className="py-2">
                                <div className="flex flex-col">
                                  <span className="text-xs font-black text-cyan-400 uppercase font-mono truncate max-w-[200px] group-hover:hacker-glow">
                                    {lead.title}
                                  </span>
                                  <span className="text-[9px] text-cyan-700 font-mono truncate max-w-[250px]">
                                    {lead.snippet}
                                  </span>
                                </div>
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center gap-2">
                                  {((lead.temperature || "Morno") === "Quente" && (!lead.url || lead.url.includes("google.com"))) ? (
                                    <div className="relative w-20 h-5 flex items-center justify-center border border-pink-500/40 bg-pink-500/10 shadow-[0_0_15px_rgba(236,72,153,0.3)]">
                                      <span className="absolute text-[8px] font-black uppercase tracking-widest text-rose-500 blink-1">
                                        QUENTE
                                      </span>
                                      <span className="absolute text-[7px] font-black uppercase tracking-[0.2em] text-pink-400 blink-2 shadow-pink-500">
                                        SEM_WEBSITE
                                      </span>
                                    </div>
                                  ) : (
                                    <Badge
                                      className={`text-[8px] font-black uppercase tracking-widest rounded-none border ${
                                        (lead.temperature || "Morno") === "Quente"
                                          ? "bg-rose-500/10 text-rose-500 border-rose-500/20 shadow-[0_0_10px_rgba(244,63,94,0.2)]"
                                          : (lead.temperature || "Morno") ===
                                              "Frio"
                                            ? "bg-cyan-500/10 text-cyan-400 border-cyan-400/20"
                                            : "bg-amber-500/10 text-amber-500 border-amber-500/20"
                                      }`}
                                    >
                                      {lead.temperature || "Morno"}
                                    </Badge>
                                  )}
                                  <div className="flex flex-col gap-0.5 ml-2">
                                    <div className="w-16 h-1 bg-white/5 relative overflow-hidden">
                                      <div
                                        className={`h-full transition-all ${lead.score > 70 ? "bg-emerald-500 shadow-[0_0_10px_#10b981]" : lead.score > 40 ? "bg-amber-500" : "bg-rose-500"}`}
                                        style={{ width: `${lead.score || 0}%` }}
                                      />
                                    </div>
                                    <span className="text-[10px] font-mono text-white/40">
                                      {lead.score || 0}%_OP
                                    </span>
                                  </div>
                                </div>
                              </TableCell>
                              <TableCell>
                                {lead.phone ? (
                                  <Badge className="bg-cyan-500/10 text-cyan-400 border border-cyan-400/20 rounded-none text-[8px] font-black font-mono">
                                    {lead.phone}
                                  </Badge>
                                ) : lead.analysisStatus === "ANALISANDO" ? (
                                  <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 bg-pink-500 animate-pulse rounded-full shadow-[0_0_8px_#ec4899]" />
                                    <span className="text-[8px] text-pink-500 font-black animate-pulse font-mono uppercase tracking-widest">
                                      SCANNING_DATA...
                                    </span>
                                  </div>
                                ) : lead.email ? (
                                  <Badge className="bg-pink-500/10 text-pink-400 border border-pink-500/20 rounded-none text-[8px] font-black font-mono">
                                    {lead.email}
                                  </Badge>
                                ) : (
                                  <span className="text-[8px] text-cyan-900 font-black tracking-widest font-mono">
                                    WAITING_ENRICHMENT
                                  </span>
                                )}
                              </TableCell>
                              <TableCell className="text-right">
                                <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      openLeadDetails(lead);
                                    }}
                                    className="w-8 h-8 flex items-center justify-center border border-cyan-400/30 text-cyan-400 hover:bg-cyan-500 hover:text-black transition-all"
                                    title="READ_DOSSIER"
                                  >
                                    <Activity className="w-3.5 h-3.5" />
                                  </button>
                                  {lead.mapsUrl && (
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        window.open(lead.mapsUrl, "_blank");
                                      }}
                                      className="w-8 h-8 flex items-center justify-center border border-yellow-500/30 text-yellow-500 hover:bg-yellow-500 hover:text-black transition-all"
                                      title="MAPS_PROFILE"
                                    >
                                      <MapPin className="w-3.5 h-3.5" />
                                    </button>
                                  )}
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      generateTacticalDossier(lead);
                                    }}
                                    className="w-8 h-8 flex items-center justify-center border border-pink-500/30 text-pink-500 hover:bg-pink-500 hover:text-white transition-all"
                                    title="TÁTICO_DOSSIÊ"
                                  >
                                    <FileText className="w-3.5 h-3.5" />
                                  </button>
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setSelectedLeadIndex(idx);
                                    }}
                                    className="w-8 h-8 flex items-center justify-center border border-pink-400/30 text-pink-400 hover:bg-pink-500 hover:text-black transition-all"
                                    title="MARK_TARGET"
                                  >
                                    <Sparkles className="w-3.5 h-3.5" />
                                  </button>
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      addToSwipe(lead);
                                    }}
                                    className="w-8 h-8 flex items-center justify-center border border-amber-400/30 text-amber-400 hover:bg-amber-500 hover:text-black transition-all"
                                    title="SWIPE_FOR_CLONING"
                                  >
                                    <Layers className="w-3.5 h-3.5" />
                                  </button>
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      addToVault(lead);
                                    }}
                                    className="w-8 h-8 flex items-center justify-center border border-[#06b6d4]/30 text-[#06b6d4] hover:bg-[#06b6d4] hover:text-black transition-all"
                                    title="SAVE_TO_VAULT"
                                  >
                                    <Archive className="w-3.5 h-3.5" />
                                  </button>
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleDeleteLead(lead);
                                    }}
                                    className="w-8 h-8 flex items-center justify-center border border-pink-600/30 text-pink-600 hover:bg-pink-600 hover:text-white transition-all"
                                    title="PURGE_RECORD"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                </div>
              </>
            ) : currentView === "active-sites" ? (
              <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <section className="grid grid-cols-1 md:grid-cols-4 gap-0 border border-white/10 divide-x divide-white/10 bg-dark-bg/20">
                  {[
                    {
                      label: "SITES_EM_PRODUÇÃO",
                      value: activeProjects.length,
                      icon: Globe,
                      trend: "ON",
                      suffix: "live",
                    },
                    {
                      label: "FATURAMENTO_MENSAL",
                      value: (
                        activeProjects.filter((p) => p.status === "active")
                          .length * 149
                      ).toLocaleString("pt-BR"),
                      icon: Zap,
                      trend: "MRR",
                      suffix: "reais",
                    },
                    {
                      label: "RENOVACOES_PENDENTES",
                      value: "0",
                      icon: Activity,
                      trend: "AÇÃO",
                      suffix: "leads",
                    },
                    {
                      label: "UPTIME_SISTEMA",
                      value: "99.9",
                      icon: Sparkles,
                      trend: "MAX",
                      suffix: "%",
                    },
                  ].map((stat, i) => (
                    <div
                      key={i}
                      className="p-8 group hover:bg-[#06b6d4]/5 transition-colors"
                    >
                      <p className="text-[10px] font-black tracking-widest text-slate-500 uppercase mb-4">
                        {stat.label}
                      </p>
                      <div className="flex items-baseline gap-2">
                        <h3 className="font-hacker text-4xl font-black text-white tracking-tighter">
                          {stat.value}
                        </h3>
                        <span className="text-xs font-bold text-slate-600 uppercase tracking-widest">
                          {stat.suffix}
                        </span>
                      </div>
                    </div>
                  ))}
                </section>

                <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                  {activeProjects.length > 0 ? (
                    activeProjects.map((site, i) => (
                      <Card
                        key={i}
                        className="bg-dark-bg/40 border-white/5 rounded-none group hover:border-[#06b6d4]/30 transition-all"
                      >
                        <CardHeader className="p-6 border-b border-white/5">
                          <div className="flex justify-between items-start">
                            <div>
                              <CardTitle className="text-sm font-black italic text-white uppercase truncate mb-1">
                                {site.name}
                              </CardTitle>
                              <p className="text-[10px] text-slate-500 font-mono tracking-tight">
                                {site.slug}.captasites.com.br
                              </p>
                            </div>
                            <Badge
                              onClick={() => toggleProjectStatus(site.id)}
                              className={`${site.status === "active" ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30" : "bg-rose-500/20 text-rose-400 border-rose-500/30"} rounded-none text-[8px] font-black cursor-pointer hover:opacity-80 transition-opacity`}
                            >
                              {site.status.toUpperCase()}
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent className="p-6 space-y-4">
                          <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest">
                            <span className="text-slate-500">
                              Proxima Renovacao:
                            </span>
                            <span className="text-white">{site.renewal}</span>
                          </div>
                          <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest">
                            <span className="text-slate-500">Plano:</span>
                            <span className="text-white">
                              R$ {site.monthlyFee}/mes
                            </span>
                          </div>
                        </CardContent>
                        <CardFooter className="p-4 border-t border-white/5 bg-black/20 grid grid-cols-4 gap-2">
                          <Button
                            onClick={() => openProjectSettings(site)}
                            className="h-9 bg-white/5 hover:bg-white/10 text-white rounded-none p-0"
                            title="Configurar Site"
                          >
                            <Settings className="w-3.5 h-3.5" />
                          </Button>
                          <Button
                            onClick={() =>
                              site.liveUrl &&
                              window.open(
                                site.liveUrl.startsWith("http")
                                  ? site.liveUrl
                                  : `https://${site.liveUrl}`,
                                "_blank",
                              )
                            }
                            disabled={!site.liveUrl}
                            className={`h-9 rounded-none p-0 ${site.liveUrl ? "bg-white/5 hover:bg-white/10 text-white" : "bg-white/5 text-slate-700 cursor-not-allowed"}`}
                            title={
                              site.liveUrl
                                ? "Ver Site Ao Vivo"
                                : "Nenhum link configurado"
                            }
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </Button>
                          <Button
                            onClick={() => generateBundle(site)}
                            className="h-9 bg-amber-500/10 hover:bg-amber-500 text-amber-500 hover:text-black rounded-none p-0 transition-all"
                            title="Gerar Bundle ZIP"
                          >
                            <Database className="w-3.5 h-3.5" />
                          </Button>
                          <Button
                            onClick={() => deleteActiveProject(site.id)}
                            className="h-9 bg-rose-500/10 hover:bg-rose-500 text-rose-500 hover:text-black rounded-none p-0 transition-all"
                            title="Remover Projeto"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </Button>
                        </CardFooter>
                      </Card>
                    ))
                  ) : (
                    <div className="col-span-3 h-[200px] flex flex-col items-center justify-center border border-dashed border-white/10 text-slate-500 uppercase font-black italic text-[10px] gap-3">
                      <Globe className="w-8 h-8 opacity-10" />
                      Nenhum site em producao ativa
                    </div>
                  )}
                </div>
              </div>
            ) : currentView === "templates" ? (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 h-[calc(100vh-250px)] animate-in fade-in slide-in-from-bottom-4 px-6 pb-20">
                {/* Painel Esquerdo: Seletor de Leads & Configuração */}
                <div className="lg:col-span-1 bg-[#0a0a0a]/80 border border-cyan-400/10 p-6 flex flex-col gap-6 hacker-grid-bg">
                  <h3 className="font-hacker font-black italic text-[14px] text-cyan-400 uppercase tracking-[0.3em] border-b border-cyan-400/20 pb-4 flex items-center gap-3">
                    <Database className="w-4 h-4" /> LEAD_TARGETING
                  </h3>

                  <div className="space-y-4 flex-1">
                    <div className="space-y-2">
                      <label className="text-[10px] text-cyan-400/60 uppercase font-mono tracking-widest pl-1">
                        Selecione o Alvo
                      </label>
                      <div className="relative">
                        <select
                          value={selectedTemplateLeadUrl || ""}
                          onChange={(e) =>
                            setSelectedTemplateLeadUrl(e.target.value)
                          }
                          className="w-full bg-dark-bg border border-cyan-400/20 rounded-none h-12 px-3 text-[11px] font-black uppercase text-cyan-400 italic appearance-none cursor-pointer focus:border-cyan-400 focus:outline-none transition-colors group/select"
                        >
                          <option
                            value=""
                            disabled
                            className="bg-dark-bg text-cyan-800"
                          >
                            &gt;&gt;&gt; ESCOLHER ALVO_
                          </option>
                          {leads.map((l) => (
                            <option
                              key={l.url}
                              value={l.url}
                              className="bg-dark-bg text-cyan-400"
                            >
                              {l.title}{" "}
                              {l.phone ? "(WHATSAPP_OK)" : "(NO_CONTACT)"}
                            </option>
                          ))}
                        </select>
                        <Target className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-cyan-400/50 pointer-events-none" />
                      </div>
                      {selectedTemplateLeadUrl &&
                        !leads.find((l) => l.url === selectedTemplateLeadUrl)
                          ?.phone && (
                          <p className="text-[9px] text-pink-500 uppercase tracking-tighter mt-1 font-black">
                            ⚠️ AVISO: WHATSAPP NÃO DETECTADO NESTE DOMÍNIO
                          </p>
                        )}
                    </div>

                    <div className="space-y-4 pt-6 mt-6 border-t border-cyan-400/10">
                      <label className="text-[10px] text-cyan-400/60 uppercase font-mono tracking-widest pl-1">
                        VARIÁVEIS GLOBAIS (SYS_CONFIG)
                      </label>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <span className="text-[8px] text-cyan-600 uppercase font-black">
                            NOME VENDEDOR
                          </span>
                          <Input
                            value={templateConfig.sellerName}
                            onChange={(e) =>
                              setTemplateConfig((prev) => ({
                                ...prev,
                                sellerName: e.target.value,
                              }))
                            }
                            className="bg-black/40 border-cyan-400/20 rounded-none h-8 text-[10px] font-mono text-cyan-400"
                          />
                        </div>
                        <div className="space-y-1">
                          <span className="text-[8px] text-cyan-600 uppercase font-black">
                            PREÇO BASE
                          </span>
                          <Input
                            value={templateConfig.basePrice}
                            onChange={(e) =>
                              setTemplateConfig((prev) => ({
                                ...prev,
                                basePrice: e.target.value,
                              }))
                            }
                            className="bg-black/40 border-cyan-400/20 rounded-none h-8 text-[10px] font-mono text-cyan-400"
                          />
                        </div>
                        <div className="space-y-1">
                          <span className="text-[8px] text-cyan-600 uppercase font-black">
                            PARCELAS
                          </span>
                          <Input
                            value={templateConfig.installments}
                            onChange={(e) =>
                              setTemplateConfig((prev) => ({
                                ...prev,
                                installments: e.target.value,
                              }))
                            }
                            className="bg-black/40 border-cyan-400/20 rounded-none h-8 text-[10px] font-mono text-cyan-400"
                          />
                        </div>
                        <div className="space-y-1">
                          <span className="text-[8px] text-cyan-600 uppercase font-black">
                            VALOR PARCELA
                          </span>
                          <Input
                            value={templateConfig.installmentValue}
                            onChange={(e) =>
                              setTemplateConfig((prev) => ({
                                ...prev,
                                installmentValue: e.target.value,
                              }))
                            }
                            className="bg-black/40 border-cyan-400/20 rounded-none h-8 text-[10px] font-mono text-cyan-400"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Painel Direito: Lista de Templates */}
                <div className="lg:col-span-2 bg-dark-bg p-6 flex flex-col gap-6 custom-scrollbar overflow-y-auto border border-cyan-400/10">
                  <h3 className="font-hacker font-black italic text-[14px] text-cyan-400 uppercase tracking-[0.3em] border-b border-cyan-400/20 pb-4 flex items-center gap-3">
                    <MessageSquare className="w-4 h-4" /> TEMPLATE_LIBRARY
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {templatesList.map((tpl) => (
                      <div
                        key={tpl.id}
                        className="bg-dark-bg border border-cyan-400/20 p-5 group hover:border-cyan-400 transition-all cursor-crosshair relative hacker-grid-bg flex flex-col justify-between"
                      >
                        <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-cyan-400/0 via-cyan-400 to-cyan-400/0 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <div>
                          <h4 className="text-[12px] font-black text-cyan-400 uppercase font-mono mb-2 group-hover:hacker-glow">
                            {tpl.name}
                          </h4>
                          <p className="text-[10px] text-cyan-600 mb-6 italic">
                            {tpl.description}
                          </p>
                        </div>

                        <Button
                          onClick={() => processTemplatePreview(tpl)}
                          className="w-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500 hover:text-black rounded-none uppercase text-[9px] font-black tracking-widest transition-all italic mt-2"
                        >
                          <Send className="w-3 h-3 mr-2" /> INJETAR_E_VISUALIZAR
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : currentView === "crm" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 h-[calc(100vh-250px)] animate-in fade-in slide-in-from-bottom-4 px-6 pb-20">
                {["NOVO", "CONTATADO", "PROPOSTA", "FECHADO"].map((status) => (
                  <div
                    key={status}
                    className="flex flex-col gap-6 bg-[#0a0a0a]/80 border border-cyan-400/10 p-2 rounded-none group hover:border-cyan-400/30 transition-all hacker-grid-bg"
                  >
                    <h4 className="font-hacker font-black italic text-[12px] text-cyan-400 uppercase tracking-[0.3em] border-b border-cyan-400/20 pb-4 mb-2 flex items-center justify-between px-4">
                      {status}_PHASE
                      <span className="text-[10px] bg-cyan-500 text-black px-3 py-0.5 rounded-none font-mono font-black">
                        {
                          leads.filter((l) => (l.status || "NOVO") === status)
                            .length
                        }
                      </span>
                    </h4>
                    <div className="flex-1 overflow-y-auto space-y-4 custom-scrollbar px-2">
                      {leads
                        .filter((l) => (l.status || "NOVO") === status)
                        .map((lead, idx) => (
                          <div
                            key={idx}
                            onClick={() => openLeadDetails(lead)}
                            className="bg-dark-bg border border-cyan-400/10 p-5 hover:border-cyan-400/40 transition-all cursor-crosshair relative group/card shadow-lg hover:shadow-cyan-500/5"
                          >
                            <div className="text-[11px] font-black text-cyan-400 uppercase font-mono truncate pr-4 group-hover/card:hacker-glow">
                              {lead.title}
                            </div>
                            <div className="text-[9px] text-cyan-900 mt-2 truncate font-black uppercase font-mono tracking-tighter">
                              {lead.address || "LOCATION_OFFLINE"}
                            </div>

                            <div className="flex items-center justify-between mt-6 pt-4 border-t border-cyan-400/10">
                              <div
                                className={`text-[9px] font-black px-3 py-1 rounded-none font-mono ${lead.score > 70 ? "bg-cyan-500/10 text-cyan-400 border border-cyan-400/20 shadow-[0_0_10px_rgba(6,182,212,0.1)]" : lead.score > 40 ? "bg-amber-500/10 text-amber-500 border border-amber-500/20" : "bg-pink-500/10 text-pink-500 border border-pink-500/20"}`}
                              >
                                SCORE::{lead.score}
                              </div>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  const nextStatus =
                                    status === "NOVO"
                                      ? "CONTATADO"
                                      : status === "CONTATADO"
                                        ? "PROPOSTA"
                                        : status === "PROPOSTA"
                                          ? "FECHADO"
                                          : "NOVO";
                                  updateLeadStatus(lead.url, nextStatus);
                                }}
                                className="text-[9px] text-[#06b6d4] font-black hover:text-white uppercase italic tracking-tighter opacity-0 group-hover/card:opacity-100 transition-opacity"
                              >
                                AVANÇAR_MISSÃO {">>"}
                              </button>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : currentView === "swipe" ? (
              <div className="px-6 pb-20 space-y-8 animate-in fade-in slide-in-from-bottom-4">
                <div className="flex justify-between items-end border-b border-amber-500/20 pb-6">
                  <div>
                    <h2 className="text-3xl font-black text-white italic tracking-tighter uppercase font-hacker">
                      SWIPE_FILE // <span className="text-amber-500">BIBLIOTECA_DESIGN</span>
                    </h2>
                    <p className="text-[10px] text-slate-500 font-mono tracking-widest mt-1 uppercase">
                      Leads frios com interface de alta qualidade para engenharia reversa.
                    </p>
                  </div>
                  <Badge className="bg-amber-500 text-black font-black px-4 py-1 rounded-none border-none">
                    {swipeLeads.length} REFERÊNCIAS_SALVAS
                  </Badge>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {swipeLeads.map((lead, i) => (
                    <Card key={i} className="bg-[#0a0a0a] border border-amber-500/20 rounded-none overflow-hidden group hover:border-amber-500/50 transition-all">
                      <div className="h-32 bg-amber-500/5 relative flex items-center justify-center overflow-hidden border-b border-white/5">
                        <Globe className="w-12 h-12 text-amber-500/20 group-hover:scale-110 group-hover:text-amber-500/40 transition-all duration-700" />
                        <div className="absolute top-2 right-2 flex gap-1">
                          <Badge className="bg-black/60 text-amber-500 text-[8px] font-black border border-amber-500/30 rounded-none">UI_REFERENCE</Badge>
                        </div>
                      </div>
                      <CardContent className="p-6 space-y-4">
                        <div>
                          <h4 className="text-sm font-black text-white uppercase truncate">{lead.title}</h4>
                          <p className="text-[10px] text-slate-500 font-mono truncate">{lead.url}</p>
                        </div>
                        <div className="flex gap-2">
                          <Button 
                            onClick={() => window.open(lead.url, '_blank')}
                            className="flex-1 h-10 bg-white/5 border border-white/10 text-white font-black text-[9px] uppercase tracking-widest hover:bg-white hover:text-black transition-all"
                          >
                            VER_SITE
                          </Button>
                          <Button 
                            onClick={() => removeFromSwipe(lead)}
                            className="w-10 h-10 bg-transparent border border-rose-500/20 text-rose-500 hover:bg-rose-500 hover:text-white transition-all p-0 flex items-center justify-center"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </Button>
                        </div>
                        <div className="space-y-2">
                          {stitchStatuses[lead.url] === 'generating' ? (
                            <Button className="w-full h-11 bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 font-black text-[9px] uppercase rounded-none cursor-wait">
                              <Loader2 className="w-4 h-4 mr-2 animate-spin" /> SINTETIZANDO_INTERFACE...
                            </Button>
                          ) : stitchStatuses[lead.url] === 'completed' ? (
                            <div className="space-y-2 animate-in fade-in zoom-in-95">
                               <Button className="w-full h-11 bg-emerald-500 text-black font-black text-[9px] uppercase tracking-tighter rounded-none shadow-[0_0_20px_rgba(16,185,129,0.2)]">
                                  <Check className="w-3.5 h-3.5 mr-2" /> TEMPLATE_PRONTO_NO_CORE
                               </Button>
                               <div className="flex gap-2">
                                  <Button 
                                    onClick={() => window.open('/admin/studio', '_blank')}
                                    className="flex-1 h-9 bg-white/5 border border-white/10 text-white font-black text-[8px] uppercase tracking-widest hover:bg-white hover:text-black transition-all"
                                  >
                                    <Zap className="w-3 h-3 mr-1.5" /> ABRIR_NO_STUDIO
                                  </Button>
                                  <Button 
                                    onClick={() => window.open('/admin/templates', '_blank')}
                                    className="flex-1 h-9 bg-white/5 border border-white/10 text-white font-black text-[8px] uppercase tracking-widest hover:bg-white hover:text-black transition-all"
                                  >
                                    <Library className="w-3 h-3 mr-1.5" /> BIBLIOTECA
                                  </Button>
                               </div>
                            </div>
                          ) : (
                            <>
                              <Button 
                                onClick={() => generateCloningPrompt(lead)}
                                className="w-full h-11 bg-amber-500/10 border border-amber-500/20 text-amber-500 font-black text-[9px] uppercase tracking-tighter hover:bg-amber-500 hover:text-black transition-all"
                              >
                                <Copy className="w-3 h-3 mr-2" /> COPIAR_PROMPT (BACKUP)
                              </Button>
                              <Button 
                                onClick={() => openStitchConfig(lead)}
                                className={`w-full h-11 ${stitchStatuses[lead.url] === 'error' ? 'bg-rose-500' : 'bg-cyan-500'} text-black font-black text-[9px] uppercase tracking-tighter hover:bg-white transition-all shadow-lg shadow-cyan-500/10`}
                              >
                                <Zap className="w-3 h-3 mr-2" /> 
                                {stitchStatuses[lead.url] === 'error' ? 'RE-TENTAR_AUTO_BUILD' : 'AUTO_STITCH_BUILD (FÁBRICA)'}
                              </Button>
                            </>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  {swipeLeads.length === 0 && (
                    <div className="col-span-full py-32 border-2 border-dashed border-white/5 flex flex-col items-center justify-center text-slate-700">
                      <Library className="w-12 h-12 mb-4 opacity-20" />
                      <p className="text-[10px] font-black uppercase tracking-[0.4em]">Swipe_File_Vazio</p>
                    </div>
                  )}
                </div>
              </div>
            ) : currentView === "vault" ? (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
                <div className="flex items-center justify-between border-b border-cyan-400/20 pb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-cyan-500/10 border border-cyan-400 flex items-center justify-center">
                      <Archive className="w-6 h-6 text-cyan-400" />
                    </div>
                    <div>
                      <h3 className="font-hacker text-3xl font-black text-cyan-400 uppercase tracking-widest hacker-glow">
                        VAULT_LEADS_CACHED
                      </h3>
                      <p className="text-[10px] text-cyan-700 font-mono font-black uppercase tracking-widest">
                        REGISTROS_PROTEGIDOS_EM_STORAGE_LOCAL
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    className="text-[9px] text-pink-500 font-black hover:text-white font-mono tracking-widest"
                    onClick={() => {
                      localStorage.removeItem("capta_leads_vault_cache");
                      setVaultLeads([]);
                    }}
                  >
                    WIPE_VAULT_DEEP_MEMORY
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {vaultLeads.map((lead, idx) => (
                    <Card
                      key={idx}
                      className="bg-[#0a0a0a] border border-cyan-400/20 rounded-none group hover:border-cyan-400 transition-all relative overflow-hidden h-full flex flex-col"
                    >
                      <div className="absolute top-0 right-0 p-2 opacity-20 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => removeFromVault(lead)}
                          className="text-pink-500 hover:text-white transition-colors"
                          title="REMOVE_FROM_VAULT"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                      <CardHeader className="border-b border-cyan-400/5 bg-cyan-950/5">
                        <CardTitle className="text-xs font-black text-cyan-400 uppercase font-mono truncate">
                          {lead.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="pt-6 flex-1">
                        <div className="flex items-center gap-3 mb-4">
                          <Badge className="bg-cyan-500/10 text-cyan-400 border border-cyan-400/20 rounded-none text-[8px] font-black">
                            {lead.temperature || "Morno"}
                          </Badge>
                          <span className="text-[10px] font-black text-white/40 font-mono tracking-tighter">
                            SCORE::{lead.score}%
                          </span>
                        </div>
                        <p className="text-[10px] text-cyan-900 font-mono leading-relaxed line-clamp-3 mb-4 italic uppercase">
                          &quot;{lead.snippet}&quot;
                        </p>

                        <div className="space-y-2 pt-4 border-t border-cyan-400/10">
                          {lead.phone && (
                            <div className="flex items-center gap-2">
                              <Zap className="w-3 h-3 text-[#06b6d4]" />
                              <span className="text-[10px] font-black text-cyan-400 font-mono">
                                {lead.phone}
                              </span>
                            </div>
                          )}
                          <div className="flex items-center gap-2">
                            <Globe className="w-3 h-3 text-slate-700" />
                            <span className="text-[10px] font-black text-slate-600 font-mono truncate max-w-[200px]">
                              {lead.url || "—"}
                            </span>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="bg-black/40 border-t border-cyan-400/5 p-4 flex gap-2">
                        <Button
                          onClick={() => openLeadDetails(lead)}
                          className="flex-1 bg-cyan-500 text-black hover:bg-pink-500 font-mono font-black text-[9px] rounded-none h-10 tracking-widest"
                        >
                          OPEN_DOSSIER
                        </Button>
                        {lead.mapsUrl && (
                          <Button
                            onClick={() => window.open(lead.mapsUrl, "_blank")}
                            className="w-10 h-10 bg-transparent border border-white/10 text-white hover:bg-white/10 p-0 flex items-center justify-center rounded-none"
                          >
                            <MapPin className="w-4 h-4" />
                          </Button>
                        )}
                      </CardFooter>
                    </Card>
                  ))}
                  {vaultLeads.length === 0 && (
                    <div className="col-span-full h-[40vh] border-2 border-dashed border-cyan-400/10 flex flex-col items-center justify-center">
                      <Archive className="w-12 h-12 text-cyan-950 mb-4" />
                      <p className="font-hacker text-xl font-black text-cyan-900 uppercase tracking-widest">
                        VAULT_EMPTY
                      </p>
                      <p className="text-[10px] text-cyan-950 font-black mt-2 uppercase tracking-tighter">
                        Salve leads promissores para visualiz&aacute;-los aqui
                        posteriormente.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="h-[60vh] flex flex-col items-center justify-center border-2 border-dashed border-white/5 rounded-none">
                <Database className="w-16 h-16 text-slate-800 mb-6" />
                <h2 className="font-outfit text-2xl font-black italic text-white uppercase tracking-widest">
                  MÓDULO Externo
                </h2>
                <p className="text-xs font-bold text-slate-500 mt-2 uppercase tracking-tighter">
                  CONEXÃO pendente com módulo de {currentView === "campaigns" ? "CAMPANHAS_ATIVAS" : "CONFIGURAÇÃO_SISTEMA"}.
                </p>

                <Button
                  variant="outline"
                  className="mt-8 rounded-none border-white/10 text-white font-bold text-[10px] tracking-widest"
                  onClick={() => setCurrentView("dashboard")}
                >
                  RETORNAR_AO_DASHBOARD
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>




      <LeadDetailsModal
        isOpen={isDetailsModalOpen}
        selectedLeadDetails={selectedLeadDetails}
        leadAnalysis={leadAnalysis}
        isAnalyzing={isAnalyzing}
        isSiteOutdated={isSiteOutdated}
        generatedMessage={generatedMessage}
        cidade={cidade}
        estado={estado}
        onClose={() => setIsDetailsModalOpen(false)}
        onStartMapsAnalysis={() => startMapsAnalysis()}
        onUpdateLeadStatus={(url, status) => updateLeadStatus(url, status)}
        onSetSelectedLeadDetails={(details) => setSelectedLeadDetails(details)}
        onConvertToActive={(lead) => convertToActive(lead)}
        onGenerateLovablePrompt={() => generateLovablePrompt()}
        onSetIsRenewalModalOpen={(open) => setIsRenewalModalOpen(open)}
        onSetIsAuditModalOpen={(open) => setIsAuditModalOpen(open)}
        onGenerateTacticalDossier={(lead) => generateTacticalDossier(lead)}
        onSetIsPreviewModalOpen={(open) => setIsPreviewModalOpen(open)}
        onGenerateAIPitch={(type) => generateAIPitch(type)}
        onHandleSendZap={(lead) => handleSendZap(lead)}
        onSetIsSiteOutdated={(outdated) => setIsSiteOutdated(outdated)}
      />


      {/* DOSSIÊ TÁTICO MODAL */}
      {isDossierModalOpen && dossierLead && (
        <div id="dossier-print-zone" className="fixed inset-0 bg-[#020617]/95 backdrop-blur-2xl z-[200] flex items-center justify-center p-4 overflow-y-auto">
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
                        <ShieldCheck className="w-3 h-3" /> Relatório_ID: {dossierLead.id.split('-')[0]} SITEPROX_V3
                      </p>
                    </div>
                  </div>
                  <button onClick={() => setIsDossierModalOpen(false)} className="text-slate-500 hover:text-white transition-all print:hidden">
                    <X className="w-6 h-6" />
                  </button>
              </div>
              
              <div className="mt-4 pt-4 border-t border-white/5 flex justify-between items-end">
                 <div>
                    <label className="text-[9px] text-slate-500 font-black uppercase tracking-widest">Alvo da Análise</label>
                    <h3 className="text-xl font-bold text-white uppercase italic">{dossierLead.title}</h3>
                 </div>
                 <Badge className="bg-pink-500 text-white border-none text-[8px] font-black uppercase px-3 h-6 mb-1">CLASSIFICADO // CONFIDENCIAL</Badge>
              </div>
            </div>

            <div className="p-10 flex-1 space-y-12">
              {isDossierLoading ? (
                <div className="h-64 flex flex-col items-center justify-center space-y-6">
                  <div className="w-20 h-20 border-t-2 border-pink-500 border-r-2 border-transparent rounded-full animate-spin" />
                  <p className="text-xs font-black text-pink-500 uppercase tracking-[0.5em] animate-pulse">Sincronizando satélites...</p>
                </div>
              ) : (
                <>
                  {/* Radar Section */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="bg-black/40 border border-white/5 p-6 space-y-4">
                      <p className="text-[10px] text-slate-500 font-black uppercase">Densidade Local 2km</p>
                      <h3 className="text-4xl font-black text-white italic">{competitorsCount.radius2km}</h3>
                      <p className="text-[9px] text-pink-500 font-bold uppercase tracking-tighter">Concorrentes Diretos Detectados</p>
                    </div>
                    <div className="bg-black/40 border border-white/5 p-6 space-y-4">
                      <p className="text-[10px] text-slate-500 font-black uppercase">Alcance Regional 5km</p>
                      <h3 className="text-4xl font-black text-white italic">{competitorsCount.radius5km}</h3>
                      <p className="text-[9px] text-pink-500 font-bold uppercase tracking-tighter">Projeção de Mercado Ativo</p>
                    </div>
                    <div className="bg-black/40 border border-white/5 p-6 space-y-4">
                      <p className="text-[10px] text-slate-500 font-black uppercase">Métrica de Percepção</p>
                      <h3 className={`text-4xl font-black italic ${parseFloat(dossierLead.rating) < 4.6 ? 'text-rose-500' : 'text-emerald-500'}`}>
                        {dossierLead.rating}★
                      </h3>
                      <p className="text-[9px] text-slate-500 font-bold uppercase tracking-tighter">Score Médio no Google Business</p>
                    </div>
                  </div>

                  {/* Competitors List */}
                  <div className="space-y-6">
                    <h4 className="text-[11px] font-black text-white uppercase tracking-[0.2em] flex items-center gap-2">
                       <Crosshair className="w-4 h-4 text-pink-500" /> Alvos de Monitoramento Próximos
                    </h4>
                    <div className="grid grid-cols-1 gap-3">
                      {competitorsList.map((c: any, i: number) => (
                        <div key={i} className="bg-white/5 border border-white/5 p-4 flex justify-between items-center group hover:bg-white/10 transition-all">
                          <div className="flex items-center gap-4">
                             <div className="w-1.5 h-1.5 bg-pink-500 rounded-full group-hover:animate-ping" />
                             <div>
                               <p className="text-xs font-bold text-white uppercase">{c.title}</p>
                               <p className="text-[9px] text-slate-500 tracking-tighter uppercase">{c.address || 'Localização Oculta'}</p>
                             </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <span className="text-[10px] font-black text-pink-300 italic">{c.rating}★</span>
                            <Badge className="bg-pink-500/10 text-pink-500 border-none text-[8px] uppercase">{c.reviews} reviews</Badge>
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
                      &ldquo;{dossierPitch}&rdquo;
                    </p>
                    <div className="pt-6 flex gap-4">
                       <Button 
                        onClick={() => handlePrintDossier()}
                        className="bg-white text-black font-black uppercase tracking-widest text-[10px] h-12 px-8 hover:bg-pink-500 hover:text-white transition-all rounded-none"
                       >
                         Exportar PDF_DOSSIÊ
                       </Button>
                       <Button 
                        onClick={() => handleSendZap(dossierLead)}
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
              <p className="text-[8px] text-slate-600 font-black uppercase tracking-[0.5em]">SiteProx Intelligence System // Confidential Data</p>
            </div>
          </div>
        </div>
      )}

      {/*      MODAL DE SCAN DEFAULT */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-[150] flex items-center justify-center p-4">
          <Card className="bg-[#0f172a] border border-cyan-500/30 rounded-none w-full max-w-lg overflow-hidden relative shadow-[0_0_50px_rgba(6,182,212,0.15)]">
            <div className="absolute top-0 left-0 w-full h-1 bg-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.5)]" />
            <CardHeader className="p-6 border-b border-white/5 bg-white/[0.02]">
              <div className="flex justify-between items-center">
                <CardTitle className="text-xl font-black italic text-white uppercase tracking-tighter flex items-center gap-3">
                  <Target className="w-5 h-5 text-cyan-500" />
                  INITIATE_SCANNER
                </CardTitle>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-slate-500 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-[9px] font-black text-cyan-500 uppercase tracking-widest pl-1">
                    Nicho Alvo (Sistemas Locais)
                  </label>
                  <select
                      value={nicho}
                      onChange={(e) => setNicho(e.target.value)}
                      className="w-full bg-black/40 border border-cyan-500/20 rounded-none h-12 text-xs font-bold text-white uppercase p-3 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all font-mono"
                    >
                      <option value="" className="bg-[#0f172a] text-cyan-400">SELECIONE O ALVO DA EXTRAÇÃO...</option>
                      {Object.entries(NICHE_CONFIG).map(([key, cfg]) => (
                        <option key={key} value={key} className="bg-[#0f172a] text-cyan-400">
                          {cfg.emoji} {key.toUpperCase()}
                        </option>
                      ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[9px] font-black text-cyan-500 uppercase tracking-widest pl-1">
                      Estado (UF)
                    </label>
                    <select
                      value={estado}
                      onChange={(e) => setEstado(e.target.value)}
                      className="w-full bg-black/40 border border-cyan-500/20 rounded-none h-12 text-xs font-bold text-white uppercase p-3 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all font-mono"
                    >
                      <option value="" className="bg-[#0f172a] text-cyan-400">UF...</option>
                      {['AC', 'AL', 'AM', 'AP', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MG', 'MS', 'MT', 'PA', 'PB', 'PE', 'PI', 'PR', 'RJ', 'RN', 'RO', 'RR', 'RS', 'SC', 'SE', 'SP', 'TO'].map(uf => (
                        <option key={uf} value={uf} className="bg-[#0f172a] text-cyan-400">{uf}</option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] font-black text-cyan-500 uppercase tracking-widest pl-1">
                      Cidade Alvo
                    </label>
                    <select
                      value={cidade}
                      onChange={(e) => handleCidadeChange(e.target.value)}
                      disabled={!estado || cidadesList.length === 0}
                      className="w-full bg-black/40 border border-cyan-500/20 rounded-none h-12 text-xs font-bold text-white uppercase p-3 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all font-mono disabled:opacity-50"
                    >
                      <option value="" className="bg-[#0f172a] text-cyan-400">SELECIONE A CIDADE...</option>
                      {cidadesList.map((c: any) => (
                        <option key={c.id} value={c.nome} className="bg-[#0f172a] text-cyan-400">{c.nome}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-[9px] font-black text-cyan-500 uppercase tracking-widest pl-1">
                      Bairro (Localização Geográfica)
                    </label>
                    <div className="flex items-center gap-2">
                      <span className="text-[8px] font-black text-pink-500 uppercase font-mono">Deep Scan Mode</span>
                      <input 
                        type="checkbox" 
                        checked={isDeepScan} 
                        onChange={(e) => setIsDeepScan(e.target.checked)}
                        className="w-3 h-3 accent-pink-500"
                      />
                    </div>
                  </div>
                  <select
                    value={bairro}
                    onChange={(e) => setBairro(e.target.value)}
                    disabled={isDeepScan || !cidade}
                    className="w-full bg-black/40 border border-cyan-500/20 rounded-none h-12 text-xs font-bold text-white uppercase p-3 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all font-mono disabled:opacity-30"
                  >
                    <option value="" className="bg-[#0f172a] text-cyan-400">
                      {isDeepScan ? "MODO SCAN TOTAL ATIVADO (Pular Bairro)" : "SELECIONE O BAIRRO (OU GERAL)..."}
                    </option>
                    {bairrosList.map((b: any) => (
                      <option key={b.nome} value={b.nome} className="bg-[#0f172a] text-cyan-400">
                        {b.nome}
                      </option>
                    ))}
                    {!isDeepScan && cidade && (
                      <option value="OUTRO" className="bg-[#0f172a] text-pink-500 font-black italic">
                        &gt;&gt;&gt; OUTRO (ESCREVER MANUALMENTE)...
                      </option>
                    )}
                  </select>
                </div>

                {bairro === "OUTRO" && !isDeepScan && (
                  <div className="space-y-2 animate-in slide-in-from-top-2 duration-300">
                    <label className="text-[9px] font-black text-pink-500 uppercase tracking-widest pl-1">
                      Digite o Nome do Bairro
                    </label>
                    <Input
                      value={customBairro}
                      onChange={(e) => setCustomBairro(e.target.value)}
                      placeholder="EX: SAVASSI, CENTRO, ALPHAVILLE..."
                      className="bg-black/40 border border-pink-500/40 rounded-none h-12 text-xs font-bold text-white uppercase focus:border-pink-500 focus:ring-1 focus:ring-pink-500 transition-all font-mono placeholder:text-pink-900/50"
                    />
                  </div>
                )}

                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <label className="text-[9px] font-black text-cyan-500 uppercase tracking-widest pl-1">
                      Modo de Varredura
                    </label>
                    <select
                      value={searchMode}
                      onChange={(e) => setSearchMode(e.target.value as "web" | "maps")}
                      className="w-full bg-black/40 border border-cyan-500/20 rounded-none h-12 text-xs font-bold text-white uppercase p-3 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all font-mono"
                    >
                      <option value="web" className="bg-[#0f172a] text-cyan-400">
                        WEB (Multi)
                      </option>
                      <option value="maps" className="bg-[#0f172a] text-cyan-400">
                        MAPS (Local)
                      </option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] font-black text-cyan-500 uppercase tracking-widest pl-1">
                      Mínimo Avaliações
                    </label>
                    <Input
                      type="number"
                      value={minReviewsCount}
                      onChange={(e) => setMinReviewsCount(Number(e.target.value))}
                      className="bg-black/40 border border-cyan-500/20 rounded-none h-12 text-xs font-bold text-white uppercase focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all font-mono"
                      placeholder="10"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] font-black text-cyan-500 uppercase tracking-widest pl-1">
                      Resultados (Max 100)
                    </label>
                    <Input
                      type="number"
                      value={numResults}
                      onChange={(e) => setNumResults(Math.min(100, Math.max(1, Number(e.target.value))))}
                      className="bg-black/40 border border-cyan-500/20 rounded-none h-12 text-xs font-bold text-white uppercase focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all font-mono"
                      placeholder="20"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-6">
                <Button
                  onClick={handleStartSearch}
                  disabled={!nicho || !cidade}
                  className="w-full bg-cyan-500 hover:bg-cyan-400 text-black font-black font-mono text-[11px] tracking-[0.2em] rounded-none py-6 uppercase border-none shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:shadow-[0_0_30px_rgba(6,182,212,0.6)] transition-all flex items-center justify-center gap-2"
                >
                  <Zap className="w-5 h-5 fill-black/20" /> INICIAR_VARREDURA_TÁTICA
                </Button>
                {(!nicho || !cidade) && (
                  <p className="text-[9px] text-red-400 font-mono text-center mt-3 uppercase tracking-widest">
                    Preencha Nicho e Cidade para iniciar
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/*        MODAL DE CONFIGURAÇÃO DE PROJETO */}
      {isProjectSettingsOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-[150] flex items-center justify-center p-4">
          <Card className="bg-[#0f172a] border border-white/10 rounded-none w-full max-w-md overflow-hidden relative shadow-2xl">
            <div className="absolute top-0 left-0 w-full h-1 bg-[#06b6d4] shadow-[0_0_15px_rgba(6,182,212,0.5)]" />
            <CardHeader className="p-6 border-b border-white/5 bg-white/[0.02]">
              <div className="flex justify-between items-center">
                <CardTitle className="text-xl font-black italic text-white uppercase tracking-tighter flex items-center gap-3">
                  <Settings className="w-5 h-5 text-[#06b6d4]" />
                  CONFIG_PROJETO
                </CardTitle>
                <button
                  onClick={() => setIsProjectSettingsOpen(false)}
                  className="text-slate-500 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest pl-1">
                    Nome do Cliente/Site
                  </label>
                  <Input
                    value={projectSettings.name}
                    onChange={(e) =>
                      setProjectSettings((prev) => ({
                        ...prev,
                        name: e.target.value,
                      }))
                    }
                    className="bg-black/40 border-white/10 rounded-none h-12 text-xs font-bold text-white italic uppercase placeholder:text-slate-700"
                    placeholder="Ex: Clínica Sorriso"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest pl-1">
                    Subdomínio (slug)
                  </label>
                  <div className="relative">
                    <Input
                      value={projectSettings.slug}
                      onChange={(e) =>
                        setProjectSettings((prev) => ({
                          ...prev,
                          slug: e.target.value
                            .toLowerCase()
                            .replace(/[^a-z0-9]/g, "-"),
                        }))
                      }
                      className="bg-black/40 border-white/10 rounded-none h-12 text-xs font-bold text-white italic pr-32"
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-slate-600 font-black italic">
                      .captasites.com
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest pl-1">
                      WhatsApp Destino
                    </label>
                    <Input
                      value={projectSettings.whatsapp}
                      onChange={(e) =>
                        setProjectSettings((prev) => ({
                          ...prev,
                          whatsapp: e.target.value,
                        }))
                      }
                      className="bg-black/40 border-white/10 rounded-none h-12 text-xs font-bold text-white"
                      placeholder="55..."
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest pl-1">
                      Mensalidade (R$)
                    </label>
                    <Input
                      value={projectSettings.monthlyFee}
                      onChange={(e) =>
                        setProjectSettings((prev) => ({
                          ...prev,
                          monthlyFee: e.target.value,
                        }))
                      }
                      className="bg-black/40 border-white/10 rounded-none h-12 text-xs font-bold text-white"
                      placeholder="149,00"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest pl-1">
                  URL de Produção (Vercel/Stitch)
                </label>
                <Input
                  value={projectSettings.liveUrl}
                  onChange={(e) =>
                    setProjectSettings((prev) => ({
                      ...prev,
                      liveUrl: e.target.value,
                    }))
                  }
                  className="bg-black/40 border-white/10 rounded-none h-12 text-xs font-bold text-[#06b6d4] italic placeholder:text-slate-800"
                />
                <p className="text-[8px] text-slate-600 font-bold uppercase italic mt-1">
                  Este link será aberto ao clicar em &quot;Ver Site&quot;
                </p>
              </div>

              <div className="pt-8">
                <Button
                  onClick={() => setIsProjectSettingsOpen(false)}
                  className="w-full bg-slate-900 border border-white/5 hover:bg-slate-800 text-white font-black font-mono text-[10px] tracking-[0.2em] rounded-none py-6 uppercase flex items-center gap-2 justify-center shadow-2xl"
                >
                  <RotateCcw className="w-4 h-4" /> SALVAR_CONFIGS_E_FECHAR
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/*      MODAL DE AUDITORIA (SCREEN ONLY) */}
      {isAuditModalOpen && selectedLeadDetails && (
        <div className="fixed inset-0 bg-black/98 backdrop-blur-3xl z-[200] flex items-center justify-center p-4 print:hidden overflow-y-auto w-full h-full">
          <div className="bg-white text-slate-900 w-full max-w-4xl flex flex-col relative shadow-[0_0_150px_rgba(6,182,212,0.4)] border border-white/10 print:shadow-none print:w-full print:max-w-none print:border-none print:m-0 print:p-0 print:block rounded-none overflow-hidden print:overflow-visible">
            <style dangerouslySetInnerHTML={{ __html: `
              .cyber-grid-print {
                background-image: 
                  linear-gradient(to right, #f1f5f9 1px, transparent 1px),
                  linear-gradient(to bottom, #f1f5f9 1px, transparent 1px);
                background-size: 20px 20px;
              }
            `}} />
            <header className="bg-slate-950 p-10 flex justify-between items-start border-b border-[#00ffff]/20 relative overflow-hidden print:bg-white print:border-b-4 print:border-[#00ffff]">
              <div className="absolute top-4 right-10 text-[8px] text-[#00ffff] font-black tracking-widest text-right hidden print:block">
                 [ ID_7A9F // V3.0 // CONFIDENTIAL ]
              </div>
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50 print:hidden" />
              <div className="relative z-10 w-full">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-cyan-500 flex items-center justify-center rotate-45 print:bg-black">
                    <Target className="w-6 h-6 text-black -rotate-45 print:text-white" />
                  </div>
                  <h1 className="text-2xl font-black text-white italic tracking-tighter print:text-black">
                    SITE<span className="text-[#06b6d4] print:text-black">PROX</span>
                  </h1>
                </div>
                <div className="space-y-1">
                  <h2 className="text-4xl font-black text-white leading-none uppercase tracking-tight">
                    AUDITORIA_ESTRATÉGICA_DE_LUCRO
                  </h2>
                </div>
              </div>
            </header>

            <div className="flex-1 p-10 space-y-10 overflow-y-auto font-mono text-[11px] text-slate-700 relative cyber-grid-print">
              {/* Diagnóstico HUD */}
              <section className="bg-white shadow-[10px_10px_0_#f1f5f9] border border-slate-200 border-l-4 border-[#00ffff] p-6 relative overflow-hidden group">
                <div className="absolute top-1 left-2 text-[6px] text-slate-300 font-black tracking-widest select-none">
                  [////] SYS.SCAN_INIT // DATA_STREAM_OPEN
                </div>
                <div className="absolute top-0 right-0 p-4 opacity-5">
                  <Activity className="w-12 h-12" />
                </div>
                <p className="text-2xl font-black text-slate-900 border-b-2 border-[#00ffff]/20 pb-2 mb-4 mt-2 uppercase tracking-tighter italic">
                  [::] {selectedLeadDetails.title}
                </p>
                <div className="flex flex-wrap gap-6">
                  <p className="flex items-center gap-2 text-slate-500 font-bold uppercase">
                    <MapPin className="w-4 h-4 text-cyan-500" />{" "}
                    {selectedLeadDetails.address}
                  </p>
                  <p className="flex items-center gap-2 text-slate-500 font-bold uppercase">
                    <Globe className="w-4 h-4 text-cyan-500" />{" "}
                    {selectedLeadDetails.url || "SEM_SITE_PRÓPRIO"}
                  </p>
                </div>
              </section>

              <section className="bg-[#050505] p-10 text-white border-b-8 border-[#00ffff] flex justify-between items-center shadow-2xl relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,transparent_0%,#00ffff_100%)] pointer-events-none"></div>
                <div className="space-y-4 relative z-10">
                  <p className="text-[10px] text-[#00ffff] font-black uppercase tracking-[0.4em]">
                    [///] SCORE_DE_OPORTUNIDADE_ESTRATÉGICA
                  </p>
                  <p className="text-8xl font-black italic tracking-tighter leading-none drop-shadow-[0_0_15px_rgba(0,255,255,0.5)]">
                    {selectedLeadDetails.score || "98"}%
                  </p>
                  <Badge className="bg-[#00ffff] text-black font-black text-[10px] px-3 py-1 rounded-none border-none animate-pulse">
                    ALTA_VALORIZAÇÃO_REBITDA
                  </Badge>
                </div>
                <div className="text-right space-y-2 relative z-10">
                  <p className="text-[10px] text-white/40 font-bold uppercase">
                    Status Local:
                  </p>
                  <p className="text-xl font-black text-white uppercase italic">
                    {selectedLeadDetails.category || "ESTRATÉGICO V3"}
                  </p>
                  <div className="h-2 w-48 bg-white/10 mt-4 overflow-hidden">
                    <div className="h-full bg-cyan-500 w-[98%] animate-pulse"></div>
                  </div>
                </div>
              </section>

              {/* Checklist de Gaps */}
              <section className="space-y-8">
                <div className="flex items-center gap-4">
                  <div className="h-px flex-1 bg-slate-100"></div>
                  <h3 className="text-[12px] font-black text-slate-400 uppercase tracking-[0.3em]">
                    ANÁLISE_DE_GAPS_OPERACIONAIS
                  </h3>
                  <div className="h-px flex-1 bg-slate-100"></div>
                </div>

                <div className="grid grid-cols-2 gap-12">
                  <div className="space-y-4 border border-slate-200 bg-white p-6 shadow-[5px_5px_0_#f1f5f9] relative">
                    <div className="absolute top-0 right-4 -translate-y-1/2 bg-white px-2">
                       <span className="text-[8px] text-rose-500 font-black tracking-widest">[ VULNERABILITY_FOUND ]</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-rose-500 flex items-center justify-center text-white font-black">
                        01
                      </div>
                      <p className="text-[11px] font-black uppercase text-slate-900 tracking-wider">
                        PRESENÇA_MOBILE_REATIVA <span className="text-rose-500">(FALHA)</span>
                      </p>
                    </div>
                    <p className="text-[10px] text-slate-500 leading-relaxed italic border-l-2 border-rose-200 pl-4">
                      &quot;O tempo de carregamento e a falta de botões de
                      &quot;Call to Action&quot; imediatos no dispositivo móvel
                      reduzem a retenção de leads qualificados em até 65%.&quot;
                    </p>
                  </div>
                  <div className="space-y-4 border border-slate-200 bg-white p-6 shadow-[5px_5px_0_#f1f5f9] relative">
                    <div className="absolute top-0 right-4 -translate-y-1/2 bg-white px-2">
                       <span className="text-[8px] text-[#ff00ff] font-black tracking-widest">[ TRUST_GAP_DETECTED ]</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-[#ff00ff] flex items-center justify-center text-white font-black">
                        02
                      </div>
                      <p className="text-[11px] font-black uppercase text-slate-900 tracking-wider">
                        CONFIABILIDADE VISUAL <span className="text-[#ff00ff]">(BAIXA)</span>
                      </p>
                    </div>
                    <p className="text-[10px] text-slate-500 leading-relaxed italic border-l-2 border-[#ff00ff]/30 pl-4">
                      &quot;A ausência de um site moderno afeta drasticamente a credibilidade. O cliente pesquisa a empresa no Google, não encontra uma vitrine profissional e acaba fechando com o concorrente que transmite mais autoridade digital.&quot;
                    </p>
                  </div>
                </div>
              </section>

              <section className="space-y-6 bg-white p-8 border border-slate-200 shadow-[5px_5px_0_#f1f5f9] break-inside-avoid print:break-inside-avoid">
                 <h3 className="text-2xl font-black text-slate-900 uppercase">A Vantagem Tecnológica SiteProx</h3>
                 <p className="text-sm font-medium text-slate-600 leading-relaxed mb-4">
                   Enquanto a maioria das empresas usa sistemas lentos, nós operamos na **Stack Vessel 2025 (Next.js + Vercel)**. Isso garante que sua empresa tenha o site mais rápido do setor na sua região.
                 </p>
                 <div className="grid grid-cols-2 gap-4">
                    <div className="bg-emerald-50 p-4 border border-emerald-100">
                       <h4 className="text-[11px] font-black uppercase text-emerald-800 mb-1">⚡ VELOCIDADE LUMINAR (LCP &lt; 1s)</h4>
                       <p className="text-[10px] text-emerald-700">Seu site abre instantaneamente. Seus clientes não esperam mais para ver seus serviços.</p>
                    </div>
                    <div className="bg-slate-50 p-4 border border-slate-100">
                       <h4 className="text-[11px] font-black uppercase text-slate-800 mb-1">✓ Equipe SiteProx (Chave na Mão)</h4>
                       <p className="text-[10px] text-slate-500">Nossa equipe de especialistas configura tudo. Você recebe o site pronto para vender.</p>
                    </div>
                    <div className="bg-purple-50 p-4 border border-purple-100">
                       <h4 className="text-[11px] font-black uppercase text-purple-800 mb-1">📅 Upgrade Sazonal</h4>
                       <p className="text-[10px] text-purple-700">Mantenha seu site vivo! Design festivo (Natal, Black Friday) por apenas R$ 50.</p>
                    </div>
                 </div>
              </section>

              {/* ROI Calculadora Master */}
              <section className="grid grid-cols-2 gap-10 break-inside-avoid print:break-inside-avoid">
                <div className="bg-cyan-50 p-10 border border-cyan-100 relative overflow-hidden">
                  <div className="absolute -bottom-10 -right-10 opacity-5">
                    <Globe className="w-40 h-40" />
                  </div>
                  <h4 className="text-[15px] font-black uppercase text-cyan-600 tracking-widest mb-6">
                    PLANO_DE_DOMÍNIO_EM_3_FASES
                  </h4>
                  <div className="space-y-6">
                    {[
                      {
                        f: "Fase 01",
                        t: "ECOSSISTEMA_PRIME",
                        d: "Deploy de site moderno, mobile-first e de carregamento ultrarrápido.",
                      },
                      {
                        f: "Fase 02",
                        f2: "OTIMIZAÇÃO_CONVERSÃO",
                        d2: "Estruturação de jornada do usuário com botões flutuantes e CTAs diretos.",
                      },
                      {
                        f: "Fase 03",
                        f3: "SEO_LOCAL_BÁSICO",
                        d3: "Indexação facilitada para ser encontrado pelo Google em buscas locais.",
                      },
                    ].map((item, i) => (
                      <div key={i} className="flex gap-4">
                        <span className="text-cyan-400 font-bold">
                          0{i + 1}
                        </span>
                        <div>
                          <p className="text-[10px] font-black text-slate-800 uppercase leading-none mb-1">
                            {item.f || item.f2 || item.f3}
                          </p>
                          <p className="text-[9px] text-slate-400 font-medium italic">
                            {item.d || item.d2 || item.d3}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-slate-950 p-10 border border-white/5 relative group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500 opacity-5 blur-[80px]"></div>
                  <h4 className="text-[16px] font-black uppercase text-white tracking-widest mb-8 flex items-center gap-2">
                    CALCULADORA_DE_VALORIZAÇÃO_R${" "}
                    <Sparkles className="w-5 h-5 text-cyan-500" />
                  </h4>

                  <div className="grid grid-cols-2 gap-6 mb-8">
                    <div className="space-y-1">
                      <label className="text-[9px] text-slate-500 uppercase font-black">
                        Ticket Médio (R$)
                      </label>
                      <Input
                        type="number"
                        value={ticketMedio}
                        onChange={(e) => setTicketMedio(Number(e.target.value))}
                        className="bg-white/5 border-white/10 rounded-none h-10 text-xl font-black text-white focus:ring-cyan-500"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[9px] text-slate-500 uppercase font-black">
                        Leads_Estimados / Mês
                      </label>
                      <Input
                        type="number"
                        value={fluxoMensal}
                        onChange={(e) => setFluxoMensal(Number(e.target.value))}
                        className="bg-white/5 border-white/10 rounded-none h-10 text-xl font-black text-white focus:ring-cyan-500"
                      />
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="bg-cyan-500/10 p-6 border-l-[6px] border-cyan-500 shadow-2xl relative overflow-hidden">
                      <div className="absolute top-2 right-4 flex items-center gap-2">
                        <span className="text-[8px] text-cyan-500 font-bold uppercase">
                          Taxa Conv.
                        </span>
                        <input
                          type="number"
                          value={auditConversion}
                          onChange={(e) =>
                            setAuditConversion(Number(e.target.value))
                          }
                          className="bg-transparent border-none p-0 w-8 text-[12px] font-black text-white focus:ring-0"
                        />
                        <span className="text-[10px] text-white/50">%</span>
                      </div>
                      <p className="text-[12px] text-cyan-500 font-bold uppercase tracking-[0.3em] mb-2">
                        Potencial de Lucro Vasado:
                      </p>
                      <p className="text-6xl font-black text-white italic tracking-tighter leading-none">
                        R${" "}
                        {(
                          ticketMedio *
                          fluxoMensal *
                          (auditConversion / 100)
                        ).toLocaleString("pt-BR")}
                      </p>
                    </div>
                  </div>
                </div>
              </section>
              
              <section className="bg-rose-50 border border-current p-8 shadow-[5px_5px_0_#f1f5f9] text-rose-600 relative overflow-hidden break-inside-avoid print:break-inside-avoid">
                 <h3 className="text-2xl font-black uppercase mb-4 relative z-10">SOLUÇÃO SUGERIDA (INVESTIMENTO)</h3>
                 <p className="text-sm font-bold relative z-10 leading-relaxed mb-6 text-rose-800">
                   Com base no diagnóstico acima, recomendamos um dos nossos pacotes de &quot;Vessel Digital&quot; para capturar as oportunidades perdidas. Escolha o nível de armamento comercial ideal para o momento da sua empresa:
                 </p>
                 <div className="grid grid-cols-2 gap-6 relative z-10 mb-6 font-mono">
                    <div className="bg-white p-6 border border-rose-200 shadow-sm flex flex-col justify-between items-start gap-4">
                       <div>
                         <p className="text-[12px] font-black uppercase text-slate-500 mb-1">PLANO PRESENÇA</p>
                         <p className="text-[10px] pt-1 text-slate-500 font-medium">One-Page moderna, ágil e focada em gerar cliques reais no seu WhatsApp. Perfeito para empresas que buscam entrar no digital com baixo custo.</p>
                       </div>
                       <p className="text-3xl font-black text-rose-600">R$ 100 <span className="text-xs text-rose-400 font-bold">/mês</span></p>
                    </div>
                    <div className="bg-rose-600 outline outline-2 outline-offset-2 outline-rose-600 p-6 border border-white/20 shadow-md flex flex-col justify-between items-start text-white relative">
                       <div className="absolute top-0 right-0 bg-white text-rose-600 text-[9px] font-black px-2 py-1 uppercase">RECOMENDADO</div>
                       <div>
                         <p className="text-[12px] font-black uppercase text-rose-100 mb-1">PLANO AUTORIDADE</p>
                         <p className="text-[10px] pt-1 text-rose-200 font-medium">Site Multi-page completo (Serviços, Sobre, Contato e Galeria). Ideal para quem já tem site desatualizado e quer transmitir autoridade máxima.</p>
                       </div>
                       <p className="text-3xl font-black">R$ 150 <span className="text-xs text-rose-200 font-bold">/mês</span></p>
                    </div>
                 </div>
              </section>

              <footer className="pt-20 flex justify-between items-end border-t-2 border-slate-200 relative">
                <div className="absolute top-4 right-0 text-[8px] text-slate-400 font-mono tracking-widest text-right">
                  [ TERMINAL_SPOOL::OUT ]<br/>
                  CLASSIFIED // SITEPROX_PROTOCOL
                </div>
                <div className="flex gap-12 items-end">
                  <div className="bg-[#050505] w-36 h-36 flex items-center justify-center rotate-2 border-8 border-white shadow-2xl relative">
                    <Zap className="w-16 h-16 text-[#00ffff] fill-[#00ffff]/20" />
                    <div className="absolute -top-3 -right-3 bg-[#ff00ff] text-[9px] text-white font-black px-2 py-1 rotate-12">
                      TOP_CERTIFIED
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h5 className="text-3xl font-black text-slate-900 border-b-8 border-[#00ffff] inline-block pr-12 uppercase italic tracking-tighter">
                      LUCAS | DIGITAL_STRATEGIST
                    </h5>
                    <div className="flex gap-6">
                      <p className="text-[10px] font-mono font-black text-slate-400 uppercase tracking-widest">
                        SITEPROX_V4.0_PROTOCOL
                      </p>
                      <p className="text-[10px] font-mono font-black text-[#00ffff] uppercase tracking-widest">
                        VERIFIED_SPECIALIST
                      </p>
                    </div>
                  </div>
                </div>
                <div className="text-right space-y-1">
                  <p className="text-4xl font-black text-slate-900 italic tracking-tighter leading-none">
                    SITE<span className="text-[#00ffff]">PROX</span>
                  </p>
                  <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.4em]">
                    ESTRATÉGIA_RESIDUO_ZERO
                  </p>
                </div>
              </footer>
            </div>

            <footer className="no-print p-8 bg-slate-50 border-t border-slate-200 flex justify-end gap-4 relative overflow-hidden">
              <div className="absolute top-1/2 -translate-y-1/2 left-8 flex gap-2">
                {[...Array(20)].map((_,i) => <div key={i} className="w-2 h-6 bg-slate-200 skew-x-12"></div>)}
              </div>
              <Button
                onClick={() => setIsAuditModalOpen(false)}
                className="bg-white border border-slate-200 text-slate-600 px-8 py-6 rounded-none font-black text-[10px] uppercase tracking-widest hover:bg-slate-100 relative z-10"
              >
                ABORT_SEQUENCE
              </Button>
              <Button
                onClick={() => handlePrintDossier()}
                className="bg-[#ff00ff] text-white px-10 py-6 rounded-none font-black text-[10px] uppercase tracking-[0.2em] shadow-xl shadow-[#ff00ff]/20 hover:bg-black relative z-10 transition-colors"
              >
                [SPOOL_TO_DATA_DRIVE]
              </Button>
            </footer>
          </div>
        </div>
      )}

      {/* MODAL DE PROPOSTA DE RENOVAÇÃO DE SITE (PDF STYLE) */}
      {isRenewalModalOpen && selectedLeadDetails && (
        <div className={`fixed inset-0 bg-black/98 backdrop-blur-3xl z-[200] flex items-center justify-center p-4 print:static print:bg-white print:text-black print:p-0 print:block modal-print-container w-full h-full overflow-y-auto ${isPrinting ? 'active' : ''}`}>
          <div className="bg-white text-slate-900 w-full max-w-4xl flex flex-col relative shadow-[0_0_150px_rgba(255,0,255,0.4)] border border-white/10 print:shadow-none print:w-full print:max-w-none print:border-none print:m-0 print:p-0 print:block rounded-none overflow-hidden print:overflow-visible">
            <style dangerouslySetInnerHTML={{ __html: `
              .cyber-grid-print-pink {
                background-image: 
                  linear-gradient(to right, #fdf4ff 1px, transparent 1px),
                  linear-gradient(to bottom, #fdf4ff 1px, transparent 1px);
                background-size: 20px 20px;
              }
            `}} />
            <header className="bg-slate-950 p-10 flex justify-between items-start border-b border-[#ff00ff]/20 relative overflow-hidden print:bg-white print:border-b-4 print:border-[#ff00ff]">
              <div className="absolute top-4 right-10 text-[8px] text-[#ff00ff] font-black tracking-widest text-right hidden print:block">
                 [ RENEWAL_PROTOCOL // CONFIDENTIAL ]
              </div>
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#ff00ff] to-transparent opacity-50 print:hidden" />
              <div className="relative z-10 w-full">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-[#ff00ff] flex items-center justify-center rotate-45 print:bg-black">
                    <Target className="w-6 h-6 text-white -rotate-45 print:text-white" />
                  </div>
                  <h1 className="text-2xl font-black text-white italic tracking-tighter print:text-black">
                    SITE<span className="text-[#ff00ff] print:text-black">PROX</span>
                  </h1>
                </div>
                <div className="space-y-1">
                  <h2 className="text-4xl font-black text-white leading-none uppercase tracking-tight">
                    DIAGNÓSTICO_DE_OBSOLESCÊNCIA
                  </h2>
                </div>
              </div>
            </header>

            <div className="flex-1 p-10 space-y-10 overflow-y-auto font-mono text-[11px] text-slate-700 relative cyber-grid-print-pink">
              <section className="bg-white shadow-[10px_10px_0_#fdf4ff] border border-slate-200 border-l-4 border-[#ff00ff] p-6 relative overflow-hidden group break-inside-avoid print:break-inside-avoid">
                <div className="absolute top-1 left-2 text-[6px] text-slate-300 font-black tracking-widest select-none">
                  [////] SYS.SCAN_INIT // TARGET_FOUND
                </div>
                <p className="text-2xl font-black text-slate-900 border-b-2 border-[#ff00ff]/20 pb-2 mb-4 mt-2 uppercase tracking-tighter italic">
                  [::] {selectedLeadDetails.title}
                </p>
                <div className="flex flex-wrap gap-6">
                  <p className="flex items-center gap-2 text-slate-500 font-bold uppercase">
                    <Globe className="w-4 h-4 text-[#ff00ff]" />{" "}
                    {selectedLeadDetails.url}
                  </p>
                </div>
              </section>

              <section className="bg-[#050505] p-10 text-white border-b-8 border-[#ff00ff] flex justify-between items-center shadow-2xl relative overflow-hidden break-inside-avoid print:break-inside-avoid">
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,transparent_0%,#ff00ff_100%)] pointer-events-none"></div>
                <div className="space-y-4 relative z-10">
                  <p className="text-[10px] text-[#ff00ff] font-black uppercase tracking-[0.4em]">
                    [///] STATUS_TECNOLÓGICO DA PLATAFORMA
                  </p>
                  <p className="text-6xl font-black italic tracking-tighter leading-none drop-shadow-[0_0_15px_rgba(255,0,255,0.5)]">
                    DEFASADO
                  </p>
                  <Badge className="bg-[#ff00ff] text-white font-black text-[10px] px-4 py-1 rounded-none border-none animate-pulse">
                    FALHA DE RETENÇÃO DETECTADA
                  </Badge>
                </div>
              </section>

              <section className="space-y-6 bg-white p-8 border border-slate-200 shadow-[5px_5px_0_#fdf4ff] break-inside-avoid print:break-inside-avoid">
                 <h3 className="text-2xl font-black text-slate-900 uppercase">Por que a SiteProx é diferente?</h3>
                 <p className="text-sm font-medium text-slate-600 leading-relaxed mb-4">
                   Agências tradicionais cobram caro e entregam sites lentos. A SiteProx utiliza a **Stack Vessel 2025 (Next.js + Vercel Edgeless)**, garantindo que seu site carregue em menos de 1 segundo, retendo muito mais clientes.
                 </p>
                 <div className="grid grid-cols-2 gap-4">
                    <div className="bg-emerald-50 p-4 border border-emerald-100">
                       <h4 className="text-[11px] font-black uppercase text-emerald-800 mb-1">⚡ VELOCIDADE LUMINAR (LCP &lt; 1s)</h4>
                       <p className="text-[10px] text-emerald-700">Seu site abre instantaneamente no 4G/5G. Mais velocidade = Mais vendas no WhatsApp.</p>
                    </div>
                    <div className="bg-slate-50 p-4 border border-slate-100">
                       <h4 className="text-[11px] font-black uppercase text-slate-800 mb-1">✓ Feito Para Você (Done-for-You)</h4>
                       <p className="text-[10px] text-slate-500">Nossa IA e especialistas configuram tudo. Você não precisa mexer em nada (diferente do Wix).</p>
                    </div>
                    <div className="bg-slate-50 p-4 border border-slate-100">
                       <h4 className="text-[11px] font-black uppercase text-slate-800 mb-1">✓ Segurança Ativa SSL</h4>
                       <p className="text-[10px] text-slate-500">Monitoramento 24h contra ataques e quedas. Seu site sempre online e seguro.</p>
                    </div>
                    <div className="bg-slate-50 p-4 border border-slate-100">
                       <h4 className="text-[11px] font-black uppercase text-slate-800 mb-1">✓ Domínio Personalizado Grátis</h4>
                       <p className="text-[10px] text-slate-500">Use seu nome.com.br ou nosso subdomínio profissional sem custo adicional.</p>
                    </div>
                 </div>
              </section>

              <section className="bg-rose-50 border border-current p-8 shadow-[5px_5px_0_#fdf4ff] text-rose-600 relative overflow-hidden break-inside-avoid print:break-inside-avoid">
                 <div className="absolute top-0 right-0 bg-rose-600 text-white px-4 py-2 font-black text-xs uppercase italic animate-pulse">Oferta de Resgate Aplicada</div>
                 <h3 className="text-2xl font-black uppercase mb-4 relative z-10">VALORES ESPECIAIS (-30% OFF)</h3>
                 <p className="text-sm font-bold relative z-10 leading-relaxed mb-6 text-rose-800">
                   Como seu site atual foi detectado com atraso tecnológico, liberamos o **Protocolo de Resgate**. Garanta 30% de desconto nas 3 primeiras mensalidades:
                 </p>
                 <div className="grid grid-cols-2 gap-6 relative z-10 mb-6">
                    <div className="bg-white p-6 border border-rose-200 shadow-sm flex flex-col justify-between items-start gap-4">
                       <div>
                         <p className="text-[12px] font-black uppercase text-slate-500 mb-1">PLANO PRESENÇA</p>
                         <p className="text-[10px] pt-1 text-slate-500 font-medium font-mono">Setup Completo + One-Page + Whats</p>
                       </div>
                       <div>
                         <p className="text-[10px] text-slate-400 line-through font-bold">DE R$ 100/mês</p>
                         <p className="text-4xl font-black text-rose-600">R$ 70 <span className="text-xs text-rose-400 font-bold">/mês*</span></p>
                         <p className="text-[8px] mt-1 font-bold text-rose-400 uppercase">*3 Primeiras mensalidades</p>
                       </div>
                    </div>
                    <div className="bg-rose-600 outline outline-2 outline-offset-2 outline-rose-600 p-6 border border-white/20 shadow-md flex flex-col justify-between items-start text-white relative">
                       <div className="absolute top-0 right-0 bg-white text-rose-600 text-[9px] font-black px-2 py-1 uppercase">MAIS ESCOLHIDO</div>
                       <div>
                         <p className="text-[12px] font-black uppercase text-rose-100 mb-1">PLANO AUTORIDADE</p>
                         <p className="text-[10px] pt-1 text-rose-200 font-medium font-mono">Multi-page + Serviços + Galeria</p>
                       </div>
                       <div>
                         <p className="text-[10px] text-rose-300 line-through font-bold">DE R$ 150/mês</p>
                         <p className="text-4xl font-black">R$ 105 <span className="text-xs text-rose-200 font-bold">/mês*</span></p>
                         <p className="text-[8px] mt-1 font-bold text-rose-100 uppercase">*3 Primeiras mensalidades</p>
                       </div>
                    </div>
                 </div>
              </section>

              <footer className="pt-10 flex justify-between items-end border-t-2 border-slate-200 relative break-inside-avoid print:break-inside-avoid">
                <div className="flex gap-12 items-end">
                  <div className="space-y-4">
                    <h5 className="text-2xl font-black text-slate-900 border-b-8 border-[#ff00ff] inline-block pr-12 uppercase italic tracking-tighter">
                      LUCAS | AI_STRATEGIST
                    </h5>
                    <div className="flex gap-6">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                        SITEPROX_PROTOCOL
                      </p>
                    </div>
                  </div>
                </div>
                <div className="text-right space-y-1">
                  <p className="text-4xl font-black text-slate-900 italic tracking-tighter leading-none">
                    SITE<span className="text-[#ff00ff]">PROX</span>
                  </p>
                  <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.4em]">
                    ESTRATÉGIA_RESIDUO_ZERO
                  </p>
                </div>
              </footer>
            </div>

            <footer className="no-print p-8 bg-slate-50 border-t border-slate-200 flex justify-end gap-4 relative overflow-hidden">
              <Button
                onClick={() => setIsRenewalModalOpen(false)}
                className="bg-white border border-slate-200 text-slate-600 px-8 py-6 rounded-none font-black text-[10px] uppercase tracking-widest hover:bg-slate-100 relative z-10"
              >
                ABORTAR_PROPOSTA
              </Button>
              <Button
                onClick={() => handlePrintDossier()}
                className="bg-[#ff00ff] text-white px-10 py-6 rounded-none font-black text-[10px] uppercase tracking-[0.2em] shadow-xl shadow-[#ff00ff]/20 hover:bg-black relative z-10 transition-colors"
              >
                [IMPRIMIR_PROPOSTA]
              </Button>
            </footer>
          </div>
        </div>
      )}

      {/* MODAIS GLOBAIS */}

      {isBlacklistModalOpen && (
        <BlacklistModal
          blacklist={blacklist}
          quarantinedLeads={quarantinedLeads}
          newBlacklistEntry={newBlacklistEntry}
          setNewBlacklistEntry={setNewBlacklistEntry}
          onClose={() => setIsBlacklistModalOpen(false)}
          onAdd={addToBlacklist}
          onRemove={removeFromBlacklist}
          onRecover={recoverLead}
          onClearQuarantine={clearQuarantine}
        />
      )}

      {isPromptCopied && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[600] animate-in fade-in zoom-in slide-in-from-bottom-5">
          <div className="bg-cyan-500 text-black px-8 py-4 flex items-center gap-4 shadow-[0_0_30px_rgba(6,182,212,0.5)] border border-cyan-400">
            <Check className="w-5 h-5 font-black" />
            <span className="font-mono font-black text-xs uppercase tracking-widest">Prompt_de_Clonagem_Copiado_no_Clipboard</span>
          </div>
        </div>
      )}

      <StitchConfigModal
        isOpen={isStitchConfigOpen}
        config={stitchConfig}
        onConfigChange={setStitchConfig}
        onClose={() => setIsStitchConfigOpen(false)}
        onSubmit={() => handleAutoBuild()}
      />

      <PreviewModal
        isOpen={isPreviewModalOpen}
        htmlInput={previewHtmlInput}
        onHtmlInputChange={setPreviewHtmlInput}
        previewLink={previewLink}
        onSave={() => savePreview()}
        onClose={() => {
          setIsPreviewModalOpen(false);
          setPreviewLink("");
        }}
      />

      <LeadDetailsModal
        isOpen={isDetailsModalOpen}
        selectedLeadDetails={selectedLeadDetails}
        leadAnalysis={leadAnalysis}
        isAnalyzing={isAnalyzing}
        isSiteOutdated={isSiteOutdated}
        generatedMessage={generatedMessage}
        cidade={cidade}
        estado={estado}
        onClose={() => setIsDetailsModalOpen(false)}
        onStartMapsAnalysis={startMapsAnalysis}
        onUpdateLeadStatus={updateLeadStatus}
        onSetSelectedLeadDetails={setSelectedLeadDetails}
        onConvertToActive={convertToActive}
        onGenerateLovablePrompt={generateLovablePrompt}
        onSetIsRenewalModalOpen={setIsRenewalModalOpen}
        onSetIsAuditModalOpen={setIsAuditModalOpen}
        onGenerateTacticalDossier={generateTacticalDossier}
        onSetIsPreviewModalOpen={setIsPreviewModalOpen}
        onGenerateAIPitch={generateAIPitch}
        onHandleSendZap={handleSendZap}
        onSetIsSiteOutdated={setIsSiteOutdated}
      />

      {/* MODAL SCAN MANUAL V3 */}
      {isManualModalOpen && (
        <div className="fixed inset-0 bg-slate-950/95 backdrop-blur-xl z-[900] flex items-center justify-center p-6 font-mono text-cyan-400 select-none animate-in fade-in zoom-in duration-300">
          <div className="max-w-xl w-full border border-cyan-400/30 bg-black/40 p-8 space-y-8 shadow-[0_0_50px_rgba(34,211,238,0.1)] relative group">
             {/* Decorativos Cyber */}
             <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-cyan-400"></div>
             <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-cyan-400"></div>
             <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-cyan-400"></div>
             <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-cyan-400"></div>
             
             <div className="flex justify-between items-start">
               <div>
                 <h2 className="text-xl font-black italic tracking-widest flex items-center gap-3">
                   <Cpu className="w-6 h-6 animate-pulse" /> CMD_INJECTION_MANUAL
                 </h2>
                 <p className="text-[10px] text-cyan-400/60 mt-1 uppercase">Entrada de alvos via processamento bruto de string.</p>
               </div>
               <Button onClick={() => setIsManualModalOpen(false)} className="bg-transparent hover:bg-cyan-400/10 text-cyan-400 border border-cyan-400/30 p-2 h-10 w-10">
                 <X className="w-5 h-5" />
               </Button>
             </div>

             <div className="space-y-4">
                <div className="flex justify-between items-end border-b border-cyan-400/20 pb-2">
                   <span className="text-[9px] font-black uppercase text-cyan-400/40">Query_Buffer</span>
                   <span className="text-[9px] font-black text-cyan-400 animate-pulse">Aguardando_Input...</span>
                </div>
                <textarea
                  value={manualInput}
                  onChange={(e) => setManualInput(e.target.value)}
                  placeholder="Cole aqui a descrição do alvo ou URL crua..."
                  className="w-full h-40 bg-slate-900/50 border border-cyan-400/20 p-4 text-cyan-400 text-xs focus:border-cyan-400/60 focus:ring-0 outline-none scrollbar-thin scrollbar-thumb-cyan-900 resize-none font-mono"
                ></textarea>
                <div className="flex gap-4">
                   <div className="flex-1 bg-cyan-400/5 border border-cyan-400/10 p-4 text-[10px] space-y-2 opacity-60">
                      <p className="font-black text-cyan-400 italic uppercase underline decorations-2">Sintaxe Protegida</p>
                      <p>O motor de IA irá sanitizar seu input e tentar extrair Title, Site e Category automaticamente.</p>
                   </div>
                </div>
             </div>

             <Button 
               onClick={() => {
                 // handleManualScan logic restored
                 if (!manualInput.trim()) return;
                 setIsManualModalOpen(false);
                 setStatusText("Injetando alvo manual...");
                 
                 // Mock logic simple enrichment
                 const newLead: any = {
                   id: "manual-" + Math.random().toString(36).substr(2, 9),
                   title: manualInput.slice(0, 30) + (manualInput.length > 30 ? "..." : ""),
                   snippet: manualInput,
                   category: nicho || "Manual",
                   status: "NOVO",
                   analysisStatus: "PENDENTE",
                   reviewCount: "0",
                   rating: "5.0"
                 };
                 
                 setLeads(prev => [newLead, ...prev]);
                 setManualInput("");
                 setTimeout(() => setStatusText("Dashboard Ativo."), 2000);
               }}
               className="w-full bg-cyan-400 text-black font-black uppercase tracking-[0.3em] rounded-none py-6 h-auto hover:bg-white transition-all shadow-[0_0_20px_rgba(6,182,212,0.4)]"
             >
               EXECUTAR_INJEÇÃO_DE_ALVO
             </Button>
          </div>
        </div>
      )}

      {/* MODAL TEMPLATE WHATSAPP PREVIEW */}
      {isTemplatePreviewOpen && (
        <div className="fixed inset-0 bg-slate-950/90 backdrop-blur z-[950] flex items-center justify-center p-6 font-mono text-emerald-400">
          <div className="max-w-2xl w-full border border-emerald-400/30 bg-black p-8 space-y-6">
            <div className="flex justify-between items-center border-b border-emerald-400/20 pb-4">
               <h3 className="text-xl font-black italic tracking-widest uppercase">Preview_Proposta_WA</h3>
               <Button onClick={() => setIsTemplatePreviewOpen(false)} className="bg-transparent hover:bg-emerald-400/10 text-emerald-400">
                 <X className="w-5 h-5" />
               </Button>
            </div>
            <div className="bg-slate-900/50 p-6 border border-emerald-400/10 h-80 overflow-y-auto font-mono text-sm leading-relaxed whitespace-pre-wrap">
              {whatsappPreviewMessage}
            </div>
            <div className="flex gap-4">
               <Button 
                 onClick={() => {
                   navigator.clipboard.writeText(whatsappPreviewMessage);
                   setStatusText("Copiado com sucesso!");
                   setTimeout(() => setStatusText("Dashboard Ativo."), 2000);
                 }}
                 className="flex-1 bg-emerald-500 text-black font-black uppercase h-14 rounded-none hover:bg-white"
               >
                 COPIAR_MENSAGEM
               </Button>
            </div>
          </div>
        </div>
      )}

      {/* LOVABLE PROMPT MODAL */}
      {isLovableModalOpen && (
        <div className="fixed inset-0 bg-slate-950/98 backdrop-blur z-[1000] flex items-center justify-center p-6">
          <div className="max-w-4xl w-full border border-pink-500/30 bg-black/80 p-10 space-y-8 relative shadow-[0_0_100px_rgba(255,0,255,0.1)]">
             <div className="flex justify-between items-start">
                <div className="space-y-2">
                   <h2 className="text-3xl font-black italic tracking-tighter text-white uppercase underline decoration-pink-500 decoration-4">Lovable_DNA_Exporter</h2>
                   <p className="text-xs text-pink-500 font-bold uppercase tracking-widest">Prompt de clonagem tática e estruturação de site.</p>
                </div>
                <Button onClick={() => setIsLovableModalOpen(false)} className="text-pink-500 hover:bg-pink-500/10">
                   <Trash2 className="w-6 h-6" />
                </Button>
             </div>
             
             <div className="bg-pink-500/5 border border-pink-500/20 p-8 h-[400px] overflow-y-auto scrollbar-thin scrollbar-thumb-pink-900">
                <p className="text-sm font-mono text-pink-400 leading-relaxed whitespace-pre-wrap">
                  {lovablePromptText}
                </p>
             </div>

             <div className="grid grid-cols-2 gap-6">
                <Button 
                  onClick={() => {
                     navigator.clipboard.writeText(lovablePromptText);
                     setStatusText("Prompt DNA Copiado!");
                     setTimeout(() => setStatusText("Envie agora no Lovable.dev"), 3000);
                  }}
                  className="bg-pink-600 text-white font-black uppercase py-8 h-auto rounded-none hover:bg-white hover:text-pink-600 transition-all text-sm tracking-widest shadow-[0_0_30px_rgba(255,0,255,0.4)]"
                >
                  [ 01 ] COPIAR_PROMPT_DNA
                </Button>
                <a 
                  href={landingPageUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white text-black font-black uppercase py-8 h-auto rounded-none hover:bg-pink-500 hover:text-white transition-all text-sm tracking-widest flex items-center justify-center gap-4"
                >
                  [ 02 ] DISPARAR_BUILD_LOVABLE <ExternalLink className="w-5 h-5" />
                </a>
             </div>
             <p className="text-[10px] text-pink-500/40 text-center font-black uppercase italic">
                Atenção: Use o prompt (01) se o disparar build falhar ou para customizações profundas.
             </p>
          </div>
        </div>
      )}

      <style>{`
        ::-webkit-scrollbar {
          width: 4px;
        }
        ::-webkit-scrollbar-thumb {
          background: #06b6d4;
        }
        @media print {
          @page {
            size: A4;
            margin: 0;
          }
          body {
            background-color: white !important;
            color: black !important;
          }
          .modal-print-container.active {
            display: block !important;
            position: absolute !important;
            left: 0 !important;
            top: 0 !important;
            width: 100% !important;
            height: auto !important;
            margin: 0 !important;
            padding: 0 !important;
            background: white !important;
            z-index: 9999999 !important;
            overflow: visible !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          .no-print, .no-print * {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
}
