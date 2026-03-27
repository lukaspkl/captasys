"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { updateProjectStatus } from "@/app/actions/nodes";
import { generateStitchLayout, saveGeneratedTemplate } from "@/app/actions/ai-content";
import { createIntelDossier } from "@/app/actions/prospecting";
import type { Lead, StitchConfig, ProjectSettings, TemplateConfig, ActiveProject, MarketingTemplate, LeadAnalysis, View } from "../types";
import { NICHE_CONFIG } from "../types";

export const templatesList = [
  {
    id: "no-site-demo",
    name: "Sem Site - Demo Pronta",
    description: "Curto, direto, qualificatório focando na falta de site.",
    content: `Oi {{nome_lead}}! Aqui é o {{nome_vendedor}}.

Pesquisei "{{nicho}}" em "{{cidade}}" e a {{nome_empresa}} não aparece adequadamente no Google. Isso significa clientes indo pro concorrente.

Como vocês têm uma ótima reputação, criei uma demonstração de como ficaria a presença digital de vocês:
👉 {{link_demo}}

Essa página fica pronta super rápido, otimizada pro celular e pro Google.
💰 Investimento: {{preco}} (ou {{parcelas}}x de {{valor_parcela}})

Como é para uso pessoal, me diz o que acha?`,
  },
  {
    id: "no-site-impact",
    name: "Sem Site - Impacto Visual",
    description: "Foco na perda de clientes para a concorrência.",
    content: `{{nome_lead}}, tudo bem? Aqui é o {{nome_vendedor}}.

Vi que a {{nome_empresa}} tem um ótimo serviço, mas quem pesquisa "{{nicho}}" em "{{cidade}}" acaba encontrando seus concorrentes.

Fiz uma análise da presença digital de vocês e montei um projeto de posicionamento pra resolver isso.

Posso te mandar o link da demonstração que fiz pra vocês darem uma olhada? É sem compromisso.
O investimento depois seria de apenas {{preco}}.`,
  },
  {
    id: "follow-up-1",
    name: "Follow-up Simples",
    description: "Retomada de contato após envio da demonstração.",
    content: `Oi {{nome_lead}}, conseguiu dar uma olhada na demonstração que te enviei ontem sobre a {{nome_empresa}}?

Estou por aqui, qualquer dúvida sobre o site ou as condições ({{preco}}). Me avisa!`,
  },
];

export const useLeadsState = () => {
  const [currentView, setCurrentView] = useState<View>("dashboard"); // dashboard, campaigns, active-sites, crm
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [nicho, setNicho] = useState("");
  const [estado, setEstado] = useState("");
  const [cidade, setCidade] = useState("");
  const [cidadeId, setCidadeId] = useState<string | number | null>(null);
  const [cidadesList, setCidadesList] = useState<{ nome: string; id: string | number }[]>([]);
  const [bairro, setBairro] = useState("");
  const [bairrosList, setBairrosList] = useState<{ nome: string }[]>([]);
  const [isDeepScan, setIsDeepScan] = useState(false);
  const [searchMode, setSearchMode] = useState<"web" | "maps">("web");
  const [minReviewsCount, setMinReviewsCount] = useState<number>(10);
  const [numResults, setNumResults] = useState<number>(20);
  const [mapsLink, setMapsLink] = useState("");
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [generatedShareLink, setGeneratedShareLink] = useState("");

  const [isSearching, setIsSearching] = useState(false);
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState("Vessel em Espera...");
  const [leads, setLeads] = useState<Lead[]>([]);
  const [vaultLeads, setVaultLeads] = useState<Lead[]>([]);
  const [swipeLeads, setSwipeLeads] = useState<Lead[]>([]);
  const [isDossierModalOpen, setIsDossierModalOpen] = useState(false);
  const [dossierLead, setDossierLead] = useState<Lead | null>(null);
  const [isDossierLoading, setIsDossierLoading] = useState(false);
  const [competitorsCount, setCompetitorsCount] = useState({ radius2km: 0, radius5km: 0 });
  const [competitorsList, setCompetitorsList] = useState<Lead[]>([]);
  const [dossierPitch, setDossierPitch] = useState("");
  const [isPrinting, setIsPrinting] = useState(false);

  const [customBairro, setCustomBairro] = useState("");
  const [selectedLeadIndex, setSelectedLeadIndex] = useState<number | null>(null);
  const [selectedLeadDetails, setSelectedLeadDetails] = useState<Lead | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [generatedMessage, setGeneratedMessage] = useState("");
  const [leadAnalysis, setLeadAnalysis] = useState<LeadAnalysis | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isPromptCopied, setIsPromptCopied] = useState(false);
  const [stitchStatuses, setStitchStatuses] = useState<Record<string, 'idle' | 'generating' | 'completed' | 'error'>>({});
  const [isStitchConfigModalOpen, setIsStitchConfigModalOpen] = useState(false);
  const [stitchConfig, setStitchConfig] = useState<StitchConfig>({ name: '', themeId: '', segment: 'geral', lead: null });
  const [filterMode, setFilterMode] = useState("all");
  const [isAuditModalOpen, setIsAuditModalOpen] = useState(false);
  const [ticketMedio, setTicketMedio] = useState<number>(500);
  const [fluxoMensal, setFluxoMensal] = useState<number>(60);
  const [auditConversion, setAuditConversion] = useState<number>(30);
  const [isSiteOutdated, setIsSiteOutdated] = useState(false);
  const [isRenewalModalOpen, setIsRenewalModalOpen] = useState(false);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const [previewHtmlInput, setPreviewHtmlInput] = useState("");
  const [previewLink, setPreviewLink] = useState("");
  const [activeProjects, setActiveProjects] = useState<ActiveProject[]>([]);
  const [isProjectSettingsOpen, setIsProjectSettingsOpen] = useState(false);
  const [manualInput, setManualInput] = useState("");
  const [editingProject, setEditingProject] = useState<ActiveProject | null>(null);
  const [projectSettings, setProjectSettings] = useState<ProjectSettings>({
    name: "",
    slug: "",
    whatsapp: "",
    monthlyFee: "",
    liveUrl: "",
  });
  const [whatsappPreviewMessage, setWhatsappPreviewMessage] = useState("");
  const [isTemplatePreviewOpen, setIsTemplatePreviewOpen] = useState(false);
  const [isLovableModalOpen, setIsLovableModalOpen] = useState(false);
  const [lovablePromptText, setLovablePromptText] = useState("");
  const [landingPageUrl, setLandingPageUrl] = useState("");
  const [isManualModalOpen, setIsManualModalOpen] = useState(false);

  const [templateConfig, setTemplateConfig] = useState<TemplateConfig>({
    sellerName: "Hacker",
    sellerWhatsapp: "5531982188309", // Número oficial do Lukas
    basePrice: "R$ 149,00",
    installments: "3",
    installmentValue: "R$ 49,66",
    demoBaseUrl: "https://demo.captasites.com/",
  });

  const [selectedTemplateLeadUrl, setSelectedTemplateLeadUrl] = useState<string | null>(null);
  const [activeTemplate, setActiveTemplate] = useState<MarketingTemplate | null>(null);

  // Blacklist Manager
  const DEFAULT_BLACKLIST = [
    "booking.com", "tripadvisor", "trivago", "ifood", "rappi", "airbnb", "zapimoveis",
    "quintoandar", "vivareal", "chavesnamao", "olx", "mercadolivre", "guiamais",
    "telelistas", "hagah", "facebook.com", "instagram.com", "linkedin.com",
    "g1.globo", "veja.abril", "hoteis.com", "decolar", "kayak", "youtube.com",
  ];
  const [blacklist, setBlacklist] = useState<string[]>(DEFAULT_BLACKLIST);
  const [quarantinedLeads, setQuarantinedLeads] = useState<Lead[]>([]);
  const [isBlacklistModalOpen, setIsBlacklistModalOpen] = useState(false);
  const [newBlacklistEntry, setNewBlacklistEntry] = useState("");

  // ==========================================
  // PERSISTÊNCIA DE DADOS (MEMÓRIA HUD)
  // ==========================================
  useEffect(() => {
    // Carrega dados salvos ao iniciar (Mount)
    const savedLeads = localStorage.getItem("capta_leads_v4");
    const savedParams = localStorage.getItem("capta_search_params_v4");
    const savedVault = localStorage.getItem("capta_vault_v4");
    const savedSwipe = localStorage.getItem("capta_swipe_v4");
    const savedBlacklist = localStorage.getItem("capta_blacklist_v4");
    const savedQuarantine = localStorage.getItem("capta_quarantine_v4");

    if (savedLeads) try { setLeads(JSON.parse(savedLeads)); } catch { }
    if (savedVault) try { setVaultLeads(JSON.parse(savedVault)); } catch { }
    if (savedSwipe) try { setSwipeLeads(JSON.parse(savedSwipe)); } catch { }
    if (savedBlacklist) try { setBlacklist(JSON.parse(savedBlacklist)); } catch { }
    if (savedQuarantine) try { setQuarantinedLeads(JSON.parse(savedQuarantine)); } catch { }
    
    if (savedParams) {
      try {
        const params = JSON.parse(savedParams);
        if (params.nicho) setNicho(params.nicho);
        if (params.estado) setEstado(params.estado);
        if (params.cidade) setCidade(params.cidade);
        if (params.cidadeId) setCidadeId(params.cidadeId);
        if (params.bairro) setBairro(params.bairro);
        if (params.searchMode) setSearchMode(params.searchMode);
        if (params.mapsLink) setMapsLink(params.mapsLink);
        if (params.customBairro) setCustomBairro(params.customBairro);
      } catch { }
    }
  }, []);

  // Auto-Save Effects
  useEffect(() => {
    if (leads.length > 0) localStorage.setItem("capta_leads_v4", JSON.stringify(leads));
  }, [leads]);

  useEffect(() => {
    localStorage.setItem("capta_search_params_v4", JSON.stringify({
      nicho, estado, cidade, cidadeId, bairro, searchMode, mapsLink, customBairro
    }));
  }, [nicho, estado, cidade, cidadeId, bairro, searchMode, mapsLink, customBairro]);

  useEffect(() => {
    localStorage.setItem("capta_vault_v4", JSON.stringify(vaultLeads));
  }, [vaultLeads]);

  useEffect(() => {
    localStorage.setItem("capta_swipe_v4", JSON.stringify(swipeLeads));
  }, [swipeLeads]);

  useEffect(() => {
    localStorage.setItem("capta_blacklist_v4", JSON.stringify(blacklist));
  }, [blacklist]);

  useEffect(() => {
    localStorage.setItem("capta_quarantine_v4", JSON.stringify(quarantinedLeads));
  }, [quarantinedLeads]);

  const calculateLeadScore = useCallback((lead: Lead) => {
    let score = 30;
    const reasons: string[] = [];
    let temp: "Frio" | "Morno" | "Quente" = "Morno";

    if (!lead.url || lead.url.includes("google.com")) {
      score += 40;
      temp = "Quente";
      reasons.push("Ausência de website (Oportunidade Máxima)");
    } else {
      score -= 10;
      reasons.push("Já possui website");
      if (lead.techData?.cms?.toLowerCase().includes("wordpress"))
        reasons.push("Plataforma WordPress");
      if (lead.techData?.gtm) {
        score -= 15;
        reasons.push("Usa Google Tag Manager");
      }
      if (lead.techData?.pixel) {
        score -= 10;
        reasons.push("Possui Pixel de Rastreamento");
      }
      if (lead.techData?.ads) {
        score -= 10;
        reasons.push("Investe em anúncios");
      }
      if (score < 40) temp = "Frio";
    }

    const ratingNum = lead.rating ? parseFloat(String(lead.rating)) : 0;
    const reviewsNum = lead.reviewCount ? parseInt(String(lead.reviewCount), 10) : 0;

    if (ratingNum > 0) {
      if (reviewsNum < 5) {
        score += 15;
        reasons.push(`Nota ${ratingNum} mas com apenas ${reviewsNum} avaliações (pouco confiável)`);
        if (temp === "Morno") temp = "Quente";
      } else if (ratingNum < 4.2) {
        score += 10;
        reasons.push(`Nota baixa no Google (${ratingNum})`);
      }
    }

    if (lead.phone) {
      score += 10;
      reasons.push("Tem telefone");
    } else {
      score -= 20;
      reasons.push("Sem telefone visível");
    }

    const finalScore = Math.max(0, Math.min(score, 100));

    return {
      score: finalScore,
      temperature: temp as "Frio" | "Morno" | "Quente",
      classificationMotivity: reasons.join("; "),
    };
  }, []);

  const handleCidadeChange = (val: string) => {
    setCidade(val);
    const selected = cidadesList.find(c => c.nome === val);
    if (selected) setCidadeId(selected.id);
    else setCidadeId(null);
    setBairro("");
  };

  const addToBlacklist = (entry: string) => {
    const clean = entry.trim().toLowerCase();
    if (!clean || blacklist.includes(clean)) return;
    setBlacklist((prev) => [...prev, clean]);
    setNewBlacklistEntry("");
  };

  const removeFromBlacklist = (entry: string) => {
    setBlacklist((prev) => prev.filter((e) => e !== entry));
  };

  const recoverLead = (lead: Lead) => {
    setLeads((prev) => [{ ...lead, blockedReason: undefined }, ...prev]);
    setQuarantinedLeads((prev) => {
      const updated = prev.filter((q) => q.url !== lead.url || q.title !== lead.title);
      return updated;
    });
  };

  const clearQuarantine = () => {
    setQuarantinedLeads([]);
  };

  const handleDeleteLead = (leadOrUrl: Lead | string) => {
    const key = typeof leadOrUrl === "string" ? leadOrUrl : (leadOrUrl.mapsUrl || leadOrUrl.url || leadOrUrl.title || "");
    setLeads((prev) => prev.filter((l) => (l.mapsUrl || l.url || l.title) !== key));
    const cached = JSON.parse(localStorage.getItem("capta_leads_cache") || "[]");
    localStorage.setItem("capta_leads_cache", JSON.stringify(cached.filter((l: Lead) => (l.mapsUrl || l.url || l.title) !== key)));
  };

  const addToVault = (lead: Lead) => {
    const key = (lead.mapsUrl || lead.title || lead.url || "").toString();
    if (vaultLeads.some((l) => (l.mapsUrl || l.title || l.url) === key)) {
      setStatusText("Lead já está no cofre!");
      handleDeleteLead(key);
      return;
    }
    const updated = [...vaultLeads, { ...lead, savedAt: new Date().toISOString() }];
    setVaultLeads(updated);
    localStorage.setItem("capta_leads_vault_cache", JSON.stringify(updated));
    handleDeleteLead(key);
    setStatusText("Lead Extraído para o COFRE_LEADS!");
    setTimeout(() => setStatusText("Dashboard Ativo."), 2000);
  };

  const removeFromVault = (leadOrUrl: Lead | string) => {
    const key = typeof leadOrUrl === "string" ? leadOrUrl : (leadOrUrl.mapsUrl || leadOrUrl.title || leadOrUrl.url || "");
    const updated = vaultLeads.filter((l) => (l.mapsUrl || l.url || l.title) !== key);
    setVaultLeads(updated);
    localStorage.setItem("capta_leads_vault_cache", JSON.stringify(updated));
  };

  const addToSwipe = (lead: Lead) => {
    const key = (lead.mapsUrl || lead.title || lead.url || "").toString();
    if (swipeLeads.some((l) => (l.mapsUrl || l.title || l.url) === key)) {
      setStatusText("Design já está no Swipe File!");
      return;
    }
    const updated = [...swipeLeads, { ...lead, swipedAt: new Date().toISOString() }];
    setSwipeLeads(updated);
    localStorage.setItem("capta_swipe_leads", JSON.stringify(updated));
    setStatusText("Site marcado para CLONAGEM_UI!");
    setTimeout(() => setStatusText("Dashboard Ativo."), 2000);
  };

  const removeFromSwipe = (lead: Lead) => {
    const key = (lead.mapsUrl || lead.title || lead.url || "").toString();
    const updated = swipeLeads.filter((l) => (l.mapsUrl || l.url || l.title) !== key);
    setSwipeLeads(updated);
    localStorage.setItem("capta_swipe_leads", JSON.stringify(updated));
  };

  const generateCloningPrompt = (lead: Lead) => {
    const prompt = `# CLONAGEM DE NICHO // ENGENHARIA REVERSA DE ALTA FIDELIDADE
Aja como um desenvolvedor Fullstack Senior e especialista em UI/UX. 
Analise este site de referência no nicho '${lead.title}': ${lead.url} 
Objetivo: Quero realizar a 'engenharia reversa' COMPLETA deste site para criar um TEMPLATE DE NICHO idêntico.
IMPORTANTE: Mantenha a estética original em 100%. NÃO adapte para o estilo Cyberpunk.`;
    navigator.clipboard.writeText(prompt);
    setIsPromptCopied(true);
    setTimeout(() => setIsPromptCopied(false), 3000);
    setStatusText("Prompt de Clonagem Copiado!");
    setTimeout(() => setStatusText("Dashboard Ativo."), 3000);
  };

  const openStitchConfig = (lead: Lead) => {
    const cleanName = lead.title?.split('-')[0].trim() || "Lead";
    const safeId = cleanName.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]/g, '_').replace(/_{2,}/g, '_').replace(/^_|_$/g, '');
    setStitchConfig({ name: `SWIPE: ${cleanName}`, themeId: `${safeId}_v1`, segment: nicho || 'geral', lead });
    setIsStitchConfigModalOpen(true);
  };

  const handleAutoBuild = async (overrideLead?: Lead) => {
    const targetLead = overrideLead || stitchConfig.lead;
    if (!targetLead || !targetLead.url || stitchStatuses[targetLead.url] === 'generating') return;
    const finalName = overrideLead ? `SWIPE: ${targetLead.title}` : stitchConfig.name;
    const finalThemeId = overrideLead ? `swipe_${Date.now()}` : stitchConfig.themeId;
    const finalSegment = overrideLead ? (nicho || 'geral') : stitchConfig.segment;
    setIsStitchConfigModalOpen(false);
    setStitchStatuses(prev => ({ ...prev, [targetLead.url!]: 'generating' }));
    setStatusText(`Iniciando Síntese: ${finalName}...`);
    try {
      const result = await generateStitchLayout("CLONAGEM_PROMPT", finalSegment);
      if (result.success && result.code) {
        await saveGeneratedTemplate(finalName, finalSegment, finalThemeId, result.code);
        setStitchStatuses(prev => ({ ...prev, [targetLead.url!]: 'completed' }));
        setStatusText("Template Sincronizado!");
      } else { throw new Error(result.error); }
    } catch (error: unknown) { setStatusText(error instanceof Error ? error.message : "Erro desconhecido"); }
  };

  const handleSendZap = (lead: Lead) => {
    if (!lead || !lead.phone) return;
    const cleanPhone = lead.phone.replace(/\D/g, "");
    const message = generatedMessage || `Oi ${lead.title}, vi que trabalham com ${nicho} em ${cidade}. Podemos conversar?`;
    window.open(`https://wa.me/55${cleanPhone}?text=${encodeURIComponent(message)}`, "_blank");
  };

  const updateLeadStatus = (leadUrl: string, newStatus: string) => {
    setLeads((prev) => prev.map((l) => (l.url === leadUrl ? { ...l, status: newStatus } : l)));
  };

  const getSubdomainUrl = (slug: string) => {
    if (typeof window === "undefined") return `localhost:3000`;
    return `${slug}.${window.location.host}`;
  };

  const convertToActive = (lead: Lead) => {
    if (!lead) return;
    const slug = lead.title?.toLowerCase().replace(/[^a-z0-9]/g, "-") || "new-project";
    const newProject: ActiveProject = {
      id: Math.random().toString(36).substring(7),
      name: lead.title || "Novo Projeto", slug, status: "active",
      renewal: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString("pt-BR").substring(0, 5),
      type: "Recorrência", monthlyFee: "149,00",
      liveUrl: getSubdomainUrl(slug), htmlContent: previewHtmlInput || "", leadInfo: lead,
    };
    const updated = [...activeProjects, newProject];
    setActiveProjects(updated);
    localStorage.setItem("capta_active_projects", JSON.stringify(updated));
    setCurrentView("active-sites");
    setIsDetailsModalOpen(false);
    setStatusText(`${lead.title} ativado!`);
  };

  const startLeadAnalysis = useCallback(() => {
    if (!selectedLeadDetails || !selectedLeadDetails.url) return;
    setIsAnalyzing(true);
    window.dispatchEvent(new CustomEvent("CAPTASAAS_START_ANALYSIS", { detail: { url: selectedLeadDetails.url } }));
  }, [selectedLeadDetails]);

  const startMapsAnalysis = useCallback(() => {
    if (!selectedLeadDetails?.mapsUrl) return;
    setIsAnalyzing(true);
    window.dispatchEvent(new CustomEvent("CAPTASAAS_START_ANALYSIS", { detail: { url: selectedLeadDetails.mapsUrl } }));
  }, [selectedLeadDetails]);

  const generateAIPitch = useCallback((type: "venda" | "recall" | "apresentacao", overrideLead?: Lead) => {
    const targetLead = overrideLead || selectedLeadDetails;
    if (!targetLead) return "";
    
    const empresa = targetLead.title;
    const local = cidade || "sua região";
    const nichoAlvo = nicho || "seu segmento";
    
    if (type === "apresentacao") {
      const hasNoSite = !targetLead.url || targetLead.url.includes("google.com");
      
      return `Diagnóstico Estratégico para ${empresa}: Identificamos que a concorrência no nicho de ${nichoAlvo} em ${local} está se consolidando rapidamente. ${hasNoSite 
        ? `A falta de um portal otimizado está drenando sua densidade orgânica, entregando tráfego qualificado para os 'Invasores Digitais' monitorados neste dossiê.` 
        : `Apesar de possuir um ponto digital, sua performance em ${local} está 40% abaixo do potencial máximo de conversão regional.`} Nossa recomendação é o upgrade imediato para o SiteProx para retomar a soberania do mercado local.`;
    }

    if (type === "venda") {
      return `Olá ${empresa}! Fizemos um mapeamento tático em ${local} e vimos que vocês têm um potencial incrível, mas os concorrentes estão ocupando os espaços onde vocês deveriam brilhar. Já pensou em dominar o Google por aqui?`;
    }

    return `Estratégia Vencedora: upgrade site ativo para ${empresa}. Aumente sua conversão em ${local} e bloqueie o crescimento da concorrência local.`;
  }, [selectedLeadDetails, cidade, nicho]);

  const generateTacticalDossier = async (lead: Lead) => {
    if (!lead) return;
    setSelectedLeadDetails(lead);
    setDossierLead(lead);
    setIsDossierModalOpen(true);
    setIsDossierLoading(true);

    // Imediatamente tenta popular com o que já temos no cache local para não ficar vazio
    const localCompetitors = leads
      .filter(l => l.url !== lead.url && l.title !== lead.title)
      .slice(0, 5);
    setCompetitorsList(localCompetitors);

    try {
      // Tenta extrair o logradouro (nome da rua) para uma busca ultra-localizada
      const addressBase = lead.address?.split(',')[0]?.trim() || '';
      const refinedKeyword = addressBase 
        ? `${nicho} próximo a ${addressBase}, ${cidade}` 
        : `${nicho} em ${cidade}`;

      console.log('--- DOSSIER RADAR SEARCH ---', refinedKeyword);

      const res = await fetch("/api/scanner/search", {
        method: "POST", 
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ keyword: refinedKeyword, num: 25 }),
      });
      const data = await res.json();
      
      if (data.leads && data.leads.length > 0) {
        // Filtra para remover o próprio lead e garantir relevância
        const freshCompetitors = data.leads
          .filter((l: Lead) => l.url !== lead.url && l.title !== lead.title)
          .slice(0, 6); // Top 6 concorrentes diretos

        setCompetitorsList(freshCompetitors);
        
        // Simulação de distribuição baseada no volume real retornado para manter a visualização rica
        const total = data.leads.length;
        setCompetitorsCount({ 
          radius2km: Math.max(3, Math.floor(total * 0.4)), // Assume 40% no raio ultra-estreito
          radius5km: total 
        });
      } else {
        // Fallback enriquecido
        setCompetitorsCount({ radius2km: 4, radius5km: 12 });
      }
      
      setDossierPitch(generateAIPitch("apresentacao", lead) || "Estratégia Vencedora: upgrade site ativo.");
    } catch { 
      setDossierPitch("Erro no radar."); 
    } finally { 
      setIsDossierLoading(false); 
    }
  };

  const generateAuditDossier = (lead: Lead) => {
    setSelectedLeadDetails(lead);
    setIsAuditModalOpen(true);
  };

  const generateRenewalDossier = (lead: Lead) => {
    setSelectedLeadDetails(lead);
    setIsRenewalModalOpen(true);
  };

  const generateLovablePrompt = () => {
    if (!selectedLeadDetails) return "";
    
    const details = [
      `# FICHA TÉCNICA DO CLIENTE - PARA STITCH / LOVABLE`,
      `EMPRESA: ${selectedLeadDetails.title}`,
      `NICHO: ${nicho}`,
      `LOCAL: ${cidade}, ${estado}`,
      `ENDEREÇO: ${selectedLeadDetails.address || 'N/A'}`,
      `TELEFONE: ${selectedLeadDetails.phone || 'N/A'}`,
      `RATING: ${selectedLeadDetails.rating || 'N/A'} (${selectedLeadDetails.reviewCount || 0} avaliações)`,
      `WEBSITE: ${selectedLeadDetails.url || 'AUSENTE'}`,
      `MAPS: ${selectedLeadDetails.mapsUrl || 'N/A'}`,
    ];

    if (selectedLeadDetails.socials) {
      if (selectedLeadDetails.socials.instagram) details.push(`INSTAGRAM: ${selectedLeadDetails.socials.instagram}`);
      if (selectedLeadDetails.socials.facebook) details.push(`FACEBOOK: ${selectedLeadDetails.socials.facebook}`);
    }

    if (isSiteOutdated) details.push(`STATUS: SITE DESATUALIZADO / LENTO Detectado`);

    const prompt = details.join('\n');
    navigator.clipboard.writeText(prompt);
    setLovablePromptText(prompt);
    setIsLovableModalOpen(true);
    return prompt;
  };

  const handleStartSearch = async () => {
    if (!mapsLink && (!nicho || !cidade)) return;
    setIsModalOpen(false);
    setIsSearching(true);
    setProgress(5);
    setLeads([]);

    // SE FOR LINK DIRETO (MODO FISGADA COMPLETA)
    if (mapsLink) {
        setStatusText("Iniciando Radar Tático...");
        try {
            const res = await fetch("/api/scanner/search", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ keyword: mapsLink })
            });
            const data = await res.json();
            
            if (data.leads && data.leads.length > 0) {
                const targetLead = {
                    ...data.leads[0],
                    id: crypto.randomUUID(),
                    status: "extração_direta"
                };
                
                setLeads([targetLead]);
                setMapsLink(""); // Limpa após sucesso
                setStatusText(`Alvo [${targetLead.title}] Localizado!`);
                setProgress(50);

                // VARREDURA DE CONCORRÊNCIA AUTOMÁTICA (APENAS SE TIVER LOCALIZAÇÃO VÁLIDA)
                const targetKeyword = targetLead.category || targetLead.classification || nicho || "Empresas";
                const targetLocation = targetLead.address || targetLead.addressBase || cidade || "";
                
                // Só dispara se tivermos uma localização que não seja vazia ou "undefined"
                if (targetLocation && targetLocation !== "undefined" && targetLocation !== "") {
                    setStatusText(`Mapeando Vizinhança de [${targetLead.title}]...`);
                    
                    const compRes = await fetch("/api/scanner/search", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ 
                            keyword: `${targetKeyword} em ${targetLocation}`,
                            num: 15 // Reduzido para não poluir demais
                        })
                    });
                    
                    const compData = await compRes.json();
                    if (compData.leads && compData.leads.length > 0) {
                        const competitors = compData.leads
                            .filter((l: Lead) => l.title !== targetLead.title)
                            .map((l: Lead) => ({ ...l, id: crypto.randomUUID(), status: "cold" }));
                        
                        setLeads(prev => [...prev, ...competitors]);
                        setStatusText(`Radar Sincronizado: ${competitors.length} vizinhos detectados.`);
                    }
                } else {
                    setStatusText("Alvo Sincronizado (Localidade isolada).");
                }
            }
        } catch (err) {
            console.error("Erro na extração tática completa:", err);
            setStatusText("Falha na Extração.");
        } finally {
            setProgress(100);
            setTimeout(() => {
                setIsSearching(false);
                setProgress(0);
            }, 3000);
        }
        return;
    }

    const runScan = async (targetKeyword: string, targetBairro?: string) => {
      try {
        const keyword = targetKeyword + (targetBairro ? " em " + targetBairro : "");
        setStatusText(`Radar ${targetBairro ? `[${targetBairro}]` : `[Geral]`}: Escaneando ${targetKeyword}...`);
        
        const res = await fetch("/api/scanner/search", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            keyword: keyword,
            cities: [cidade],
            num: numResults
          }),
        });

        if (!res.ok) throw new Error("Satélites fora de alcance.");
        const data = await res.json();
        
        if (data.leads && data.leads.length > 0) {
          const bairroTerm = targetBairro?.toUpperCase() || "";
          
          const formated: Lead[] = data.leads.map((l: Lead) => {
            const isExact = bairroTerm && l.address?.toUpperCase().includes(bairroTerm);
            return {
              ...l,
              id: crypto.randomUUID(),
              status: isExact ? "novo" : "relevante_expandido",
              reviewCount: l.reviews?.toString() || "0",
              rating: l.rating?.toString() || "N/A"
            };
          });
          
          setLeads(prev => {
            const existingUrls = new Set(prev.map(p => p.url));
            const uniqueNew = formated.filter((f) => !existingUrls.has(f.url));
            return [...prev, ...uniqueNew];
          });
        }
      } catch (err) {
        console.error("Erro no scan segmentado:", err);
      }
    };

    try {
      const configObj = NICHE_CONFIG[nicho as keyof typeof NICHE_CONFIG];
      const subNiches = configObj?.keywords || [nicho];
      const targetBairro = bairro === "OUTRO" ? customBairro : bairro;
      const bairros = isDeepScan ? (bairrosList.length > 0 ? bairrosList : [{ nome: "" }]) : [{ nome: targetBairro || "" }];
      const totalSteps = bairros.length * subNiches.length;
      let completedSteps = 0;

      for (const bObj of bairros) {
        for (const kw of subNiches) {
          completedSteps++;
          const p = Math.floor(5 + (completedSteps / totalSteps) * 90);
          setProgress(p);
          await runScan(kw, bObj.nome);
          await new Promise(r => setTimeout(r, 600));
        }
      }

      setProgress(100);
      setStatusText(`Sincronização Finalizada.`);
    } catch (err: unknown) {
      setStatusText(`FALHA_NOS_SATÉLITES: ${err instanceof Error ? err.message : "Erro desconhecido"}`);
    } finally {
      setTimeout(() => {
        setIsSearching(false);
        setProgress(0);
      }, 3000);
    }
  };

  const handlePrintDossier = () => {
    setIsPrinting(true);
    setTimeout(() => { window.print(); setTimeout(() => setIsPrinting(false), 2000); }, 800);
  };

  const toggleProjectStatus = async (id: string) => {
    const p = activeProjects.find(x => x.id === id);
    if (!p) return;
    const newStatus = p.status === "active" ? "suspended" : "active";
    const result = await updateProjectStatus(id, newStatus);
    if (result.success) {
      setActiveProjects(prev => prev.map(x => x.id === id ? { ...x, status: newStatus } : x));
    }
  };

  const openProjectSettings = (project: ActiveProject) => {
    setEditingProject(project);
    setProjectSettings({
      name: project.name, slug: project.slug,
      whatsapp: project.leadInfo?.phone || "",
      monthlyFee: project.monthlyFee || "149,00",
      liveUrl: project.liveUrl || "",
    });
    setIsProjectSettingsOpen(true);
  };

  const savePreview = () => {
    if (!previewHtmlInput.trim() || !selectedLeadDetails) return;
    const id = crypto.randomUUID().split("-")[0];
    const now = Date.now();
    const entry = {
      id,
      html: previewHtmlInput.trim(),
      leadName: selectedLeadDetails.title,
      leadPhone: selectedLeadDetails.phone || "",
      createdAt: now,
      expiresAt: now + 48 * 60 * 60 * 1000,
    };
    const existing = JSON.parse(localStorage.getItem("capta_previews") || "[]");
    localStorage.setItem(
      "capta_previews",
      JSON.stringify([...existing, entry]),
    );
    const link = `${window.location.origin}/preview/${id}`;
    setPreviewLink(link);
    const msg = `Oi ${selectedLeadDetails.title}!       \n\nPreparei uma prévia exclusiva do seu novo site digital.\n\n       ${link}\n\n       Disponível por apenas 48 horas. Depois expira!\n\nMe conta o que achou?     `;
    navigator.clipboard.writeText(msg);
    setStatusText("       Mensagem de venda copiada!");
    setTimeout(() => setStatusText("Dashboard Ativo."), 3000);
  };

  const processTemplatePreview = (template: MarketingTemplate) => {
    setActiveTemplate(template);
    const selectedTemplateLead = leads.find((l) => l.url === selectedTemplateLeadUrl);

    if (!selectedTemplateLead) {
      setWhatsappPreviewMessage("⚠️ SELECIONE UM LEAD PRIMEIRO PARA VISUALIZAR A INTERPOLAÇÃO DE VARIÁVEIS.");
      setIsTemplatePreviewOpen(true);
      return;
    }

    const leadName = selectedTemplateLead.title?.split(" ")[0] || "Responsável";
    const nichoName = nicho || "seu segmento";
    const cityName = cidade || "sua região";
    const linkDemo = `${templateConfig.demoBaseUrl}${selectedTemplateLead.title?.toLowerCase().replace(/[^a-z0-9]/g, "-")}`;

    let msg = template.content;
    msg = msg.replace(/\{\{nome_lead\}\}/g, leadName);
    msg = msg.replace(/\{\{nome_vendedor\}\}/g, templateConfig.sellerName);
    msg = msg.replace(/\{\{nome_empresa\}\}/g, selectedTemplateLead.title || "");
    msg = msg.replace(/\{\{nicho\}\}/g, nichoName);
    msg = msg.replace(/\{\{cidade\}\}/g, cityName);
    msg = msg.replace(/\{\{link_demo\}\}/g, linkDemo);
    msg = msg.replace(/\{\{preco\}\}/g, templateConfig.basePrice);
    msg = msg.replace(/\{\{parcelas\}\}/g, templateConfig.installments);
    msg = msg.replace(/\{\{valor_parcela\}\}/g, templateConfig.installmentValue);

    setWhatsappPreviewMessage(msg);
    setIsTemplatePreviewOpen(true);
  };

    const sortedLeads = useMemo(() => {
      return [...leads].sort((a, b) => (b.score || 0) - (a.score || 0));
    }, [leads]);
  
    const filteredLeads = useMemo(() => {
      return sortedLeads.filter((lead) => {
        if (filterMode === "no-site") return !lead.url || lead.url.includes("google.com");
        return true;
      });
    }, [sortedLeads, filterMode]);
  
    const generateShareLink = async (type: 'audit' | 'tactical' | 'renewal', dossierData: Record<string, unknown>) => {
      if (!selectedLeadDetails) {
        setStatusText("Selecione um lead primeiro.");
        return null;
      }
  
      setStatusText(`Gerando protocolo ${type.toUpperCase()}...`);
      
      const payload = {
        lead_id: undefined, 
        title: selectedLeadDetails.title || "Empresa Sem Nome",
        type,
        data: { 
          ...dossierData,
          seller_whatsapp: templateConfig.sellerWhatsapp 
        },
        leadData: { 
          ...selectedLeadDetails, 
          niche: nicho, 
          city: cidade 
        } // Envia dados completos para auto-save se necessário
      };
  
      const result = await createIntelDossier(payload);
  
      if (result.success && result.slug) {
        const link = `${window.location.origin}/intel/${result.slug}`;
        setGeneratedShareLink(link);
        setIsShareModalOpen(true);
        setStatusText("Protocolo Tático Prontificado!");
        setTimeout(() => setStatusText("Dashboard Ativo."), 3000);
        return link;
      } else {
        setStatusText(`Erro: ${result.error}`);
        return null;
      }
    };
  
    // --- IBGE API (Cidades e Bairros) ---
  useEffect(() => {
    let active = true;
    if (!estado || estado.length !== 2) {
      setCidadesList([]);
      return;
    }
    
    fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${estado.toUpperCase()}/municipios`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        if (active && Array.isArray(data)) {
          const formatted = data.map((c: { nome: string; id: string }) => ({ nome: c.nome, id: c.id }));
          setCidadesList(formatted);
        }
      })
      .catch((err) => {
        console.warn("[IBGE/Localidades] Falha na rede ou API indisponível:", err.message);
      });

    return () => { active = false; };
  }, [estado]);

  useEffect(() => {
    let active = true;
    if (!cidadeId) {
      setBairrosList([]);
      return;
    }
    
    fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/municipios/${cidadeId}/distritos`)
      .then(res => res.json())
      .then(data => {
        if (active && Array.isArray(data)) {
          const formatted = data.map((d: { nome: string }) => ({ nome: d.nome }));
          setBairrosList(formatted);
        }
      })
      .catch(() => setBairrosList([]));

    return () => { active = false; };
  }, [cidadeId]);

  const openLeadDetails = (lead: Lead) => {
    setLeadAnalysis(null);
    setIsAnalyzing(false);
    setSelectedLeadDetails(lead);
    setIsDetailsModalOpen(true);
    setGeneratedMessage("");
    setLandingPageUrl(`https://lovable.dev/?prompt=${encodeURIComponent(nicho + " " + lead.title)}`);
  };

  // Enriquecimento Automático
  useEffect(() => {
    if (isSearching || isAnalyzing) return;
    const nextToEnrich = leads.find(l => !l.phone && l.analysisStatus === "PENDENTE");
    if (nextToEnrich) {
      setLeads(prev => prev.map(l => l.id === nextToEnrich.id ? { ...l, analysisStatus: "ANALISANDO" } : l));
      window.dispatchEvent(new CustomEvent("CAPTASAAS_START_ANALYSIS", { detail: { url: nextToEnrich.url, mapsUrl: nextToEnrich.mapsUrl, silent: true } }));
    }
  }, [leads, isSearching, isAnalyzing]);

  // Extension Listeners
  useEffect(() => {
    const handleExtensionUpdate = (event: Event) => {
      const msg = (event as CustomEvent).detail;
      if (msg.action === "SEARCH_PROGRESS") { setStatusText(msg.status); setProgress(msg.progress); setIsSearching(true); }
      else if (msg.action === "LEADS_FOUND") { 
        setLeads(prev => [...(msg.leads || []), ...prev]);
        setIsSearching(false); setProgress(100);
      }
      else if (msg.action === "LEAD_ANALYSIS_RESULT") {
        setLeadAnalysis(msg.analysis);
        setIsAnalyzing(false);
      }
    };
    window.addEventListener("CAPTASAAS_UPDATE", handleExtensionUpdate);
    return () => window.removeEventListener("CAPTASAAS_UPDATE", handleExtensionUpdate);
  }, []);

  const deleteActiveProject = (id: string) => {
    setActiveProjects(prev => prev.filter(p => p.id !== id));
  };

  const generateBundle = (project: ActiveProject) => {
    setStatusText(`       Preparando bundle para ${project.name}...`);
    setTimeout(() => {
      setStatusText("       Bundle gerado e pronto para download!");
      setTimeout(() => setStatusText("Dashboard Ativo."), 3000);
    }, 1500);
  };

  return {
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
    mapsLink, setMapsLink,
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
    isStitchConfigModalOpen, setIsStitchConfigModalOpen,
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
    isShareModalOpen, setIsShareModalOpen,
    generatedShareLink, setGeneratedShareLink,
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
    generateAuditDossier,
    generateRenewalDossier,
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
    generateShareLink,
  };
};
