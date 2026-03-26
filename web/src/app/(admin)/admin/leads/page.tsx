"use client";

import { useLeadsState, templatesList } from "./hooks/useLeadsState";
import { Button } from "@/components/ui/button";
import { View } from "./types";
import {
  Globe,
  Database,
  Activity,
  LayoutDashboard,
  Settings,
  Archive,
  Sparkles,
} from "lucide-react";

// MODALS
import SearchModal from "./components/modals/SearchModal";
import AuditModal from "./components/modals/AuditModal";
import BlacklistModal from "./components/modals/BlacklistModal";
import StitchConfigModal from "./components/modals/StitchConfigModal";
import PreviewModal from "./components/modals/PreviewModal";
import LeadDetailsModal from "./components/modals/LeadDetailsModal";
import ProjectSettingsModal from "./components/modals/ProjectSettingsModal";
import TacticalModal from "./components/modals/TacticalModal";
import RenewalModal from "./components/modals/RenewalModal";

// VIEWS
import DashboardHeader from "./components/views/DashboardHeader";
import RadarPanel from "./components/views/RadarPanel";
import LeadsTable from "./components/views/LeadsTable";
import ActiveSitesView from "./components/views/ActiveSitesView";
import TemplatesView from "./components/views/TemplatesView";
import CRMView from "./components/views/CRMView";
import SwipeView from "./components/views/SwipeView";
import VaultView from "./components/views/VaultView";

/**
 *          DESIGN COMMITMENT: NEON HUD ENGINE (Localizada & Funcional)
 */

export default function DashboardPage() {
  const {
    // State
    currentView,
    setCurrentView,
    isModalOpen,
    setIsModalOpen,
    isSearching,
    statusText,
    progress,
    leads,
    filteredLeads,
    nicho,
    setNicho,
    estado,
    setEstado,
    cidade,
    bairro,
    setBairro,
    isDeepScan,
    setIsDeepScan,
    cidadesList,
    bairrosList,
    searchMode,
    setSearchMode,
    minReviewsCount,
    setMinReviewsCount,
    numResults,
    setNumResults,
    mapsLink,
    setMapsLink,
    isDetailsModalOpen,
    setIsDetailsModalOpen,
    selectedLeadDetails,
    setSelectedLeadDetails,
    leadAnalysis,
    isAnalyzing,
    filterMode,
    setFilterMode,
    isAuditModalOpen,
    setIsAuditModalOpen,
    ticketMedio,
    setTicketMedio,
    fluxoMensal,
    setFluxoMensal,
    auditConversion,
    setAuditConversion,
    isSiteOutdated,
    setIsSiteOutdated,
    isRenewalModalOpen,
    setIsRenewalModalOpen,
    generatedMessage,
    isDossierModalOpen,
    setIsDossierModalOpen,
    dossierLead,
    competitorsList,
    activeProjects,
    isProjectSettingsOpen,
    setIsProjectSettingsOpen,
    projectSettings,
    setProjectSettings,
    swipeLeads,
    vaultLeads,
    setVaultLeads,
    stitchStatuses,
    templateConfig,
    setTemplateConfig,
    selectedTemplateLeadUrl,
    setSelectedTemplateLeadUrl,
    customBairro,
    setCustomBairro,
    isBlacklistModalOpen,
    setIsBlacklistModalOpen,
    blacklist,
    newBlacklistEntry,
    setNewBlacklistEntry,
    isStitchConfigModalOpen,
    setIsStitchConfigModalOpen,
    stitchConfig,
    setStitchConfig,
    isPreviewModalOpen,
    setIsPreviewModalOpen,
    previewHtmlInput,
    setPreviewHtmlInput,
    previewLink,
    quarantinedLeads,

    // Handlers
    handleStartSearch,
    handleCidadeChange,
    openLeadDetails,
    updateLeadStatus,
    generateTacticalDossier,
    generateAuditDossier,
    generateRenewalDossier,
    handleSendZap,
    startMapsAnalysis,
    convertToActive,
    generateLovablePrompt,
    generateAIPitch,
    toggleProjectStatus,
    openProjectSettings,
    deleteActiveProject,
    generateBundle,
    removeFromSwipe,
    generateCloningPrompt,
    openStitchConfig,
    handleAutoBuild,
    removeFromVault,
    processTemplatePreview,
    addToSwipe,
    addToVault,
    handleDeleteLead,
    setLeads,
    setSelectedLeadIndex,
    addToBlacklist,
    removeFromBlacklist,
    recoverLead,
    clearQuarantine,
    savePreview,
    generateShareLink,
  } = useLeadsState();

  return (
    <>
      <div
        id="main-dashboard-container"
        className="min-h-screen bg-[#020617] text-white selection:bg-[#06b6d4] selection:text-black font-outfit"
      >
        <div className="flex">
          {/* NAVEGAÇÃO TÁTICA LATERAL */}
          <aside className="w-24 min-h-screen bg-black/40 border-r border-[#06b6d4]/10 flex flex-col items-center py-10 gap-10 sticky top-0 h-screen z-50">
            <div className="w-14 h-14 bg-[#06b6d4]/10 border border-[#06b6d4]/40 flex items-center justify-center group cursor-pointer hover:border-pink-500 transition-all duration-500 shadow-[0_0_15px_rgba(6,182,212,0.2)]">
              <Database className="w-6 h-6 text-[#06b6d4] group-hover:text-pink-500 transition-all" />
            </div>

            <nav className="flex flex-col gap-6">
              {(
                [
                  {
                    id: "dashboard",
                    icon: LayoutDashboard,
                    label: "MAIN_DASH",
                  },
                  { id: "active-sites", icon: Globe, label: "PROD_CORE" },
                  { id: "crm", icon: Activity, label: "CRM_FLOW" },
                  { id: "templates", icon: Database, label: "TEMPLATES" },
                  { id: "swipe", icon: Sparkles, label: "SWIPE_FILE" },
                  { id: "vault", icon: Archive, label: "SECRET_VAULT" },
                  { id: "settings", icon: Settings, label: "SYS_CONFIG" },
                ] as const
              ).map((item) => (
                <button
                  key={item.id}
                  onClick={() => setCurrentView(item.id as View)}
                  className={`w-12 h-12 flex flex-col items-center justify-center gap-1 transition-all group relative ${currentView === item.id ? "text-[#06b6d4]" : "text-slate-600 hover:text-white"}`}
                >
                  <item.icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  <span className="text-[7px] font-black tracking-tighter uppercase font-mono">
                    {item.label}
                  </span>
                  {currentView === item.id && (
                    <div className="absolute -right-[25px] w-1 h-8 bg-[#06b6d4] shadow-[0_0_10px_#06b6d4]" />
                  )}
                </button>
              ))}
            </nav>

            <Button
              variant="ghost"
              onClick={() => setIsBlacklistModalOpen(true)}
              className="mt-auto w-12 h-12 p-0 text-slate-700 hover:text-rose-500 hover:bg-rose-500/5"
              title="Blacklist Manager"
            >
              <Settings className="w-5 h-5" />
            </Button>
          </aside>

          {/* CONTAINER PRINCIPAL */}
          <div className="flex-1 flex flex-col">
            {/* HEADER SUPERIOR (STATS_STRIP) */}
            <header className="h-28 border-b border-[#06b6d4]/10 bg-black/20 backdrop-blur-xl flex items-center justify-between px-10 sticky top-0 z-40">
              <div className="flex items-center gap-8">
                <div>
                  <h1 className="font-hacker text-4xl font-black italic tracking-tighter text-white uppercase leading-none">
                    CAPTA_SYSTEM <span className="text-[#06b6d4]">v4.0</span>
                  </h1>
                  <div className="flex items-center gap-4 mt-1">
                    <span className="text-[9px] font-black tracking-[0.4em] text-slate-500 uppercase font-mono">
                      NEON_HUD_ENGINE_ONLINE
                    </span>
                    <span className="text-[8px] px-2 py-0.5 bg-cyan-500/10 text-cyan-500 border border-cyan-500/20 font-mono">
                      STITCH_CONNECTED
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
                    onClick={() => setIsModalOpen(true)}
                    disabled={isSearching}
                    className="bg-cyan-500 text-black hover:bg-pink-500 shadow-[0_0_15px_rgba(0,243,255,0.5)] rounded-none px-8 h-10 font-mono font-black tracking-widest border-none transition-all active:translate-y-1"
                  >
                    {isSearching ? "MOTOR_RUNNING" : "EXEC_SCAN_NEW"}
                  </Button>
                </div>
              </div>
            </header>

            {/*      CONTEÚDO DINÂMICO */}
            <div className="p-10 space-y-12 max-w-[1600px] w-full mx-auto">
              {currentView === "dashboard" ? (
                <>
                  <DashboardHeader
                    leads={leads}
                    filterMode={filterMode}
                    setFilterMode={setFilterMode}
                    isSearching={isSearching}
                  />

                  <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
                    <RadarPanel
                      statusText={statusText}
                      progress={progress}
                      nicho={nicho}
                      quarantinedLeads={quarantinedLeads}
                      leads={leads}
                      cidade={cidade}
                    />

                    <LeadsTable
                      filteredLeads={filteredLeads}
                      openLeadDetails={openLeadDetails}
                      generateTacticalDossier={generateTacticalDossier}
                      setSelectedLeadIndex={setSelectedLeadIndex}
                      addToSwipe={addToSwipe}
                      addToVault={addToVault}
                      handleDeleteLead={handleDeleteLead}
                      setLeads={setLeads}
                    />
                  </div>
                </>
              ) : currentView === "active-sites" ? (
                <ActiveSitesView
                  activeProjects={activeProjects}
                  toggleProjectStatus={toggleProjectStatus}
                  openProjectSettings={openProjectSettings}
                  generateBundle={generateBundle}
                  deleteActiveProject={deleteActiveProject}
                />
              ) : currentView === "templates" ? (
                <TemplatesView
                  selectedTemplateLeadUrl={selectedTemplateLeadUrl}
                  setSelectedTemplateLeadUrl={setSelectedTemplateLeadUrl}
                  leads={leads}
                  templateConfig={templateConfig}
                  setTemplateConfig={setTemplateConfig}
                  templatesList={templatesList}
                  processTemplatePreview={processTemplatePreview}
                />
              ) : currentView === "crm" ? (
                <CRMView
                  leads={leads}
                  openLeadDetails={openLeadDetails}
                  updateLeadStatus={updateLeadStatus}
                />
              ) : currentView === "swipe" ? (
                <SwipeView
                  swipeLeads={swipeLeads}
                  removeFromSwipe={removeFromSwipe}
                  stitchStatuses={stitchStatuses}
                  generateCloningPrompt={generateCloningPrompt}
                  openStitchConfig={openStitchConfig}
                />
              ) : currentView === "vault" ? (
                <VaultView
                  vaultLeads={vaultLeads}
                  setVaultLeads={setVaultLeads}
                  removeFromVault={removeFromVault}
                  openLeadDetails={openLeadDetails}
                />
              ) : (
                <div className="h-[60vh] flex flex-col items-center justify-center border-2 border-dashed border-white/5 rounded-none">
                  <Database className="w-16 h-16 text-slate-800 mb-6" />
                  <h2 className="font-hacker text-2xl font-black italic text-white uppercase tracking-widest">
                    MÓDULO Externo
                  </h2>
                  <p className="text-xs font-bold text-slate-500 mt-2 uppercase tracking-tighter">
                    CONEXÃO pendente com módulo de{" "}
                    {currentView === "campaigns"
                      ? "CAMPANHAS_ATIVAS"
                      : "CONFIGURAÇÃO_SISTEMA"}
                    .
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

      {/* MODALS */}
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
        onGenerateRenewalDossier={generateRenewalDossier}
        onGenerateAuditDossier={generateAuditDossier}
        onGenerateTacticalDossier={generateTacticalDossier}
        onSetIsPreviewModalOpen={setIsPreviewModalOpen}
        onGenerateAIPitch={generateAIPitch}
        onHandleSendZap={handleSendZap}
        onSetIsSiteOutdated={setIsSiteOutdated}
        ticketMedio={ticketMedio}
        onSetTicketMedio={setTicketMedio}
        fluxoMensal={fluxoMensal}
        onSetFluxoMensal={setFluxoMensal}
        auditConversion={auditConversion}
        onSetAuditConversion={setAuditConversion}
      />

      <TacticalModal
        isOpen={isDossierModalOpen}
        onClose={() => setIsDossierModalOpen(false)}
        lead={dossierLead}
        leads={leads}
        competitorsList={competitorsList}
        niche={nicho}
        onPrint={() => window.print()}
        onShare={generateShareLink}
      />

      <SearchModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        nicho={nicho}
        setNicho={setNicho}
        estado={estado}
        setEstado={setEstado}
        cidade={cidade}
        handleCidadeChange={handleCidadeChange}
        cidadesList={cidadesList}
        bairro={bairro}
        setBairro={setBairro}
        bairrosList={bairrosList}
        isDeepScan={isDeepScan}
        setIsDeepScan={setIsDeepScan}
        customBairro={customBairro}
        setCustomBairro={setCustomBairro}
        searchMode={searchMode}
        setSearchMode={setSearchMode}
        minReviewsCount={minReviewsCount}
        setMinReviewsCount={setMinReviewsCount}
        numResults={numResults}
        setNumResults={setNumResults}
        mapsLink={mapsLink}
        setMapsLink={setMapsLink}
        onStartSearch={handleStartSearch}
      />

      <ProjectSettingsModal
        isOpen={isProjectSettingsOpen}
        onClose={() => setIsProjectSettingsOpen(false)}
        projectSettings={projectSettings}
        setProjectSettings={setProjectSettings}
      />

      <BlacklistModal
        isOpen={isBlacklistModalOpen}
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

      <StitchConfigModal
        isOpen={isStitchConfigModalOpen}
        config={stitchConfig}
        onConfigChange={setStitchConfig}
        onSubmit={() => handleAutoBuild()}
        onClose={() => setIsStitchConfigModalOpen(false)}
      />

      <PreviewModal
        isOpen={isPreviewModalOpen}
        htmlInput={previewHtmlInput}
        onHtmlInputChange={setPreviewHtmlInput}
        previewLink={previewLink}
        onSave={savePreview}
        onClose={() => setIsPreviewModalOpen(false)}
      />

      <AuditModal
        isOpen={isAuditModalOpen}
        onClose={() => setIsAuditModalOpen(false)}
        lead={selectedLeadDetails}
        ticketMedio={ticketMedio}
        fluxoMensal={fluxoMensal}
        conversaoAtual={auditConversion}
        onPrint={() => window.print()}
        onShare={generateShareLink}
      />

      <RenewalModal
        isOpen={isRenewalModalOpen}
        onClose={() => setIsRenewalModalOpen(false)}
        lead={selectedLeadDetails}
        onPrint={() => window.print()}
        onShare={generateShareLink}
      />
    </>
  );
}
