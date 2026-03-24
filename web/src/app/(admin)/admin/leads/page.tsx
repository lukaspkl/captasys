/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
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
  ShieldAlert,
  RotateCcw,
  Plus,
  Sparkles,
  Home,
  Check,
  Library,
  Layers,
  Loader2,
  Copy,
} from "lucide-react";
import { updateProjectStatus } from "@/app/actions/nodes";
import { generateStitchLayout, saveGeneratedTemplate } from "@/app/actions/ai-content";

/**
 *          DESIGN COMMITMENT: NEON HUD ENGINE (Localizada & Funcional)
 */

// ─── BLACKLIST MANAGER MODAL ────────────────────────────────────────────────
function BlacklistModal({
  blacklist,
  quarantinedLeads,
  newBlacklistEntry,
  setNewBlacklistEntry,
  onClose,
  onAdd,
  onRemove,
  onRecover,
  onClearQuarantine,
}: {
  blacklist: string[];
  quarantinedLeads: any[];
  newBlacklistEntry: string;
  setNewBlacklistEntry: (v: string) => void;
  onClose: () => void;
  onAdd: (entry: string) => void;
  onRemove: (entry: string) => void;
  onRecover: (lead: any) => void;
  onClearQuarantine: () => void;
}) {
  const [tab, setTab] = useState<"blacklist" | "quarantine">("blacklist");

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-xl z-[400] flex items-center justify-center p-4">
      <div className="bg-dark-bg border border-red-500/30 w-full max-w-2xl max-h-[90vh] flex flex-col shadow-[0_0_60px_rgba(239,68,68,0.15)] relative">
        {/* Top bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-red-500/20 bg-red-950/10">
          <div className="flex items-center gap-3">
            <ShieldOff className="w-5 h-5 text-red-500" />
            <div>
              <h2 className="text-base font-black text-red-400 uppercase tracking-widest font-mono">
                BLACKLIST_MANAGER
              </h2>
              <p className="text-[9px] text-red-500/50 font-mono uppercase tracking-wider">
                {blacklist.length} tokens bloqueados · {quarantinedLeads.length}{" "}
                na quarentena
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center text-slate-600 hover:text-red-400 hover:bg-red-500/10 transition-all"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-white/5">
          {[
            { key: "blacklist", label: "LISTA NEGRA", icon: ShieldAlert },
            {
              key: "quarantine",
              label: `QUARENTENA (${quarantinedLeads.length})`,
              icon: RotateCcw,
            },
          ].map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key as "blacklist" | "quarantine")}
              className={`flex-1 flex items-center justify-center gap-2 py-3 text-[10px] font-black uppercase tracking-widest font-mono transition-all ${
                tab === t.key
                  ? "text-red-400 border-b-2 border-red-500 bg-red-950/10"
                  : "text-slate-600 hover:text-slate-400"
              }`}
            >
              <t.icon className="w-3 h-3" />
              {t.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {tab === "blacklist" && (
            <div className="p-6 space-y-4">
              {/* Add new */}
              <div className="flex gap-2">
                <input
                  value={newBlacklistEntry}
                  onChange={(e) => setNewBlacklistEntry(e.target.value)}
                  onKeyDown={(e) =>
                    e.key === "Enter" && onAdd(newBlacklistEntry)
                  }
                  placeholder="ex: booking.com, trivago..."
                  className="flex-1 bg-black/60 border border-white/10 px-4 py-2 text-[11px] text-white font-mono focus:outline-none focus:border-red-400/50 placeholder:text-slate-700 h-10"
                />
                <button
                  onClick={() => onAdd(newBlacklistEntry)}
                  className="w-10 h-10 flex items-center justify-center bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20 transition-all"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {/* List */}
              <div className="space-y-1">
                {blacklist.map((entry) => (
                  <div
                    key={entry}
                    className="flex items-center justify-between px-4 py-2 bg-white/[0.02] border border-white/5 group hover:border-red-500/20 transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 bg-red-500 flex-shrink-0" />
                      <span className="text-[11px] font-mono text-slate-400 group-hover:text-white transition-colors">
                        {entry}
                      </span>
                    </div>
                    <button
                      onClick={() => onRemove(entry)}
                      className="w-6 h-6 flex items-center justify-center text-slate-700 hover:text-red-400 hover:bg-red-500/10 opacity-0 group-hover:opacity-100 transition-all"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                ))}
                {blacklist.length === 0 && (
                  <div className="text-center py-10 text-slate-700 text-[11px] font-mono uppercase tracking-widest">
                    Blacklist vazia — nenhum domínio bloqueado
                  </div>
                )}
              </div>
            </div>
          )}

          {tab === "quarantine" && (
            <div className="p-6 space-y-4">
              {quarantinedLeads.length > 0 && (
                <div className="flex justify-end">
                  <button
                    onClick={onClearQuarantine}
                    className="text-[9px] font-black font-mono uppercase tracking-widest text-slate-600 hover:text-red-400 flex items-center gap-1 transition-colors"
                  >
                    <Trash2 className="w-3 h-3" /> LIMPAR TUDO
                  </button>
                </div>
              )}
              <div className="space-y-2">
                {quarantinedLeads.map((lead, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between px-4 py-3 bg-white/[0.02] border border-white/5 group hover:border-amber-500/20 transition-all gap-3"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="text-[11px] font-bold text-slate-300 truncate">
                        {lead.title || "Sem título"}
                      </p>
                      <p className="text-[9px] font-mono text-slate-600 truncate mt-0.5">
                        {lead.url || "—"}
                      </p>
                      <span className="inline-block mt-1 text-[8px] font-black uppercase tracking-wider text-amber-500/70 bg-amber-500/10 px-2 py-0.5">
                        {lead.blockedReason || "Bloqueado"}
                      </span>
                    </div>
                    <button
                      onClick={() => onRecover(lead)}
                      className="flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 text-[9px] font-black font-mono uppercase tracking-wider text-cyan-400 border border-cyan-400/20 hover:bg-cyan-400/10 hover:border-cyan-400 transition-all"
                    >
                      <RotateCcw className="w-3 h-3" /> RECUPERAR
                    </button>
                  </div>
                ))}
                {quarantinedLeads.length === 0 && (
                  <div className="text-center py-10 text-slate-700 text-[11px] font-mono uppercase tracking-widest">
                    Nenhum lead na quarentena
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Bottom bar */}
        <div className="px-6 py-4 border-t border-white/5 bg-black/20 flex justify-between items-center">
          <p className="text-[9px] font-mono text-slate-700 uppercase tracking-widest">
            Alterações salvas automaticamente no localStorage
          </p>
          <button
            onClick={onClose}
            className="text-[10px] font-black font-mono uppercase tracking-widest text-slate-500 hover:text-white transition-colors px-4 py-2"
          >
            FECHAR
          </button>
        </div>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const [currentView, setCurrentView] = useState("dashboard"); // dashboard, campaigns, active-sites, crm
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mercado, setMercado] = useState("nacional");
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
  const [citySearch, setCitySearch] = useState("");

  // --- IBGE API (Moved/Consolidated) ---

  const [isSearching, setIsSearching] = useState(false);
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState("Vessel em Espera...");
  const [leads, setLeads] = useState<any[]>([]);
  const [vaultLeads, setVaultLeads] = useState<any[]>([]);
  const [swipeLeads, setSwipeLeads] = useState<any[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedLeadIndex, setSelectedLeadIndex] = useState<number | null>(
    null,
  );
  const [selectedLeadDetails, setSelectedLeadDetails] = useState<any>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [generatedMessage, setGeneratedMessage] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [targetSearch, setTargetSearch] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [activeTab, setActiveTab] = useState("all");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [landingPageUrl, setLandingPageUrl] = useState("");
  const [leadAnalysis, setLeadAnalysis] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isPromptCopied, setIsPromptCopied] = useState(false);
  const [stitchStatuses, setStitchStatuses] = useState<Record<string, 'idle' | 'generating' | 'completed' | 'error'>>({});
  const [isStitchConfigOpen, setIsStitchConfigOpen] = useState(false);
  const [stitchConfig, setStitchConfig] = useState({ name: '', themeId: '', segment: 'geral', lead: null as any });
  const [filterMode, setFilterMode] = useState("all"); // all, no-site, no-pixel, no-mobile, low-rating
  const [isAuditModalOpen, setIsAuditModalOpen] = useState(false);
  const [ticketMedio, setTicketMedio] = useState<number>(500);
  const [fluxoMensal, setFluxoMensal] = useState<number>(60);
  const [auditConversion, setAuditConversion] = useState<number>(30);
  const [roiVisibility, setRoiVisibility] = useState(false);
  const [isSiteOutdated, setIsSiteOutdated] = useState(false);
  const [isRenewalModalOpen, setIsRenewalModalOpen] = useState(false);
  const [isLovableModalOpen, setIsLovableModalOpen] = useState(false);
  const [lovablePromptText, setLovablePromptText] = useState("");
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const [previewHtmlInput, setPreviewHtmlInput] = useState("");
  const [previewLink, setPreviewLink] = useState("");
  const [activeProjects, setActiveProjects] = useState<any[]>([]);
  const [isProjectSettingsOpen, setIsProjectSettingsOpen] = useState(false);
  const [isManualModalOpen, setIsManualModalOpen] = useState(false);
  const [manualInput, setManualInput] = useState("");
  const [manualProcessing, setManualProcessing] = useState(false);
  const [editingProject, setEditingProject] = useState<any>(null);
  const [projectSettings, setProjectSettings] = useState({
    name: "",
    slug: "",
    whatsapp: "",
    monthlyFee: "",
    liveUrl: "",
  });

  const [templateConfig, setTemplateConfig] = useState({
    sellerName: "Hacker",
    basePrice: "R$ 149,00",
    installments: "3",
    installmentValue: "R$ 49,66",
    demoBaseUrl: "https://demo.captasites.com/",
  });

  const [selectedTemplateLeadUrl, setSelectedTemplateLeadUrl] = useState<
    string | null
  >(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [activeTemplate, setActiveTemplate] = useState<any>(null);

  const calculateLeadScore = useCallback((lead: any) => {
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

    const ratingNum = lead.rating ? parseFloat(lead.rating) : 0;
    const reviewsNum = lead.reviewCount ? parseInt(lead.reviewCount) : 0;

    if (ratingNum > 0) {
      if (reviewsNum < 5) {
        score += 15;
        reasons.push(
          `Nota ${ratingNum} mas com apenas ${reviewsNum} avaliações (pouco confiável)`,
        );
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
  const [isTemplatePreviewOpen, setIsTemplatePreviewOpen] = useState(false);
  const [whatsappPreviewMessage, setWhatsappPreviewMessage] = useState("");

  // Blacklist Manager
  const DEFAULT_BLACKLIST = [
    "booking.com",
    "tripadvisor",
    "trivago",
    "ifood",
    "rappi",
    "airbnb",
    "zapimoveis",
    "quintoandar",
    "vivareal",
    "chavesnamao",
    "olx",
    "mercadolivre",
    "guiamais",
    "telelistas",
    "hagah",
    "facebook.com",
    "instagram.com",
    "linkedin.com",
    "g1.globo",
    "veja.abril",
    "hoteis.com",
    "decolar",
    "kayak",
    "youtube.com",
  ];
  const [blacklist, setBlacklist] = useState<string[]>(DEFAULT_BLACKLIST);
  const [quarantinedLeads, setQuarantinedLeads] = useState<any[]>([]);
  const [isBlacklistModalOpen, setIsBlacklistModalOpen] = useState(false);
  const [newBlacklistEntry, setNewBlacklistEntry] = useState("");

  const templatesList = [
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

  const processTemplatePreview = (template: any) => {
    setActiveTemplate(template);
    const selectedTemplateLead = leads.find(
      (l: any) => l.url === selectedTemplateLeadUrl,
    );

    if (!selectedTemplateLead) {
      setWhatsappPreviewMessage(
        "⚠️ SELECIONE UM LEAD PRIMEIRO PARA VISUALIZAR A INTERPOLAÇÃO DE VARIÁVEIS.",
      );
      setIsTemplatePreviewOpen(true);
      return;
    }

    const leadName = selectedTemplateLead.title.split(" ")[0] || "Responsável";
    const nichoName = nicho || "seu segmento";
    const cityName = cidade || "sua região";
    const linkDemo = `${templateConfig.demoBaseUrl}${selectedTemplateLead.title.toLowerCase().replace(/[^a-z0-9]/g, "-")}`;

    let msg = template.content;
    msg = msg.replace(/\{\{nome_lead\}\}/g, leadName);
    msg = msg.replace(/\{\{nome_vendedor\}\}/g, templateConfig.sellerName);
    msg = msg.replace(/\{\{nome_empresa\}\}/g, selectedTemplateLead.title);
    msg = msg.replace(/\{\{nicho\}\}/g, nichoName);
    msg = msg.replace(/\{\{cidade\}\}/g, cityName);
    msg = msg.replace(/\{\{link_demo\}\}/g, linkDemo);
    msg = msg.replace(/\{\{preco\}\}/g, templateConfig.basePrice);
    msg = msg.replace(/\{\{parcelas\}\}/g, templateConfig.installments);
    msg = msg.replace(
      /\{\{valor_parcela\}\}/g,
      templateConfig.installmentValue,
    );

    setWhatsappPreviewMessage(msg);
    setIsTemplatePreviewOpen(true);
  };

  // Carregar leads do localStorage ao iniciar
  useEffect(() => {
    const savedLeads = localStorage.getItem("capta_leads_cache");
    if (savedLeads) {
      try {
        setLeads(JSON.parse(savedLeads));
      } catch (e) {
        console.error("Erro ao carregar leads", e);
      }
    }
    const savedVault = localStorage.getItem("capta_leads_vault_cache");
    if (savedVault) {
      try {
        setVaultLeads(JSON.parse(savedVault));
      } catch (e) {
        console.error("Erro ao carregar cofre", e);
      }
    }
    const savedSwipe = localStorage.getItem("capta_swipe_leads");
    if (savedSwipe) {
      try {
        setSwipeLeads(JSON.parse(savedSwipe));
      } catch (e) {
        console.error("Erro ao carregar swipe file", e);
      }
    }

    const savedProjects = localStorage.getItem("capta_active_projects");
    let projectsToSet = [];
    if (savedProjects) {
      try {
        projectsToSet = JSON.parse(savedProjects);
      } catch (e) {
        console.error("Erro ao carregar projetos ativos", e);
      }
    }

    if (!projectsToSet || projectsToSet.length === 0) {
      // SEED MOCK DATA PARA TESTE LOCAL (FASE 1)
      projectsToSet = [
        {
          id: "v-bistro",
          name: "Villa Bistrô Hamburgueria",
          slug: "villa-bistro",
          status: "active",
          renewal: "17/01",
          monthlyFee: "149,00",
          liveUrl: "villa-bistro.localhost:3000",
          type: "Recorrência",
        },
        {
          id: "m-silva",
          name: "Silva Auto Mecânica",
          slug: "mecanica-silva",
          status: "active",
          renewal: "17/01",
          monthlyFee: "149,00",
          liveUrl: "mecanica-silva.localhost:3000",
          type: "Recorrência",
        },
      ];
      localStorage.setItem(
        "capta_active_projects",
        JSON.stringify(projectsToSet),
      );
    }
    setActiveProjects(projectsToSet);

    const savedBlacklist = localStorage.getItem("capta_blacklist");
    if (savedBlacklist) {
      try {
        setBlacklist(JSON.parse(savedBlacklist));
      } catch (e) {
        console.error("Erro ao carregar blacklist", e);
      }
    }

    const savedQuarantine = localStorage.getItem("capta_quarantine");
    if (savedQuarantine) {
      try {
        setQuarantinedLeads(JSON.parse(savedQuarantine));
      } catch (e) {
        console.error("Erro ao carregar quarentena", e);
      }
    }
  }, []);

  // Salvar leads sempre que mudar
  useEffect(() => {
    if (leads.length > 0) {
      localStorage.setItem("capta_leads_cache", JSON.stringify(leads));
    }
  }, [leads]);

  // Persistir blacklist
  useEffect(() => {
    localStorage.setItem("capta_blacklist", JSON.stringify(blacklist));
  }, [blacklist]);

  const addToBlacklist = (entry: string) => {
    const clean = entry.trim().toLowerCase();
    if (!clean || blacklist.includes(clean)) return;
    setBlacklist((prev) => [...prev, clean]);
    setNewBlacklistEntry("");
  };

  const removeFromBlacklist = (entry: string) => {
    setBlacklist((prev) => prev.filter((e) => e !== entry));
  };

  const recoverLead = (lead: any) => {
    setLeads((prev) => [{ ...lead, blockedReason: undefined }, ...prev]);
    setQuarantinedLeads((prev) => {
      const updated = prev.filter(
        (q) => q.url !== lead.url || q.title !== lead.title,
      );
      localStorage.setItem("capta_quarantine", JSON.stringify(updated));
      return updated;
    });
  };

  const clearQuarantine = () => {
    setQuarantinedLeads([]);
    localStorage.removeItem("capta_quarantine");
  };

  useEffect(() => {
    let active = true;
    if (!estado || estado.length !== 2) {
      setCidadesList([]);
      return;
    }
    
    // A API do IBGE aceita tanto o ID numérico quanto a Sigla (UF).
    // Usar a Sigla diretamente é mais robusto e elimina a necessidade de um mapa manual.
    fetch(
      `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${estado.toUpperCase()}/municipios`,
    )
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        if (active && Array.isArray(data)) {
          const formatted = data.map((c: any) => ({ nome: c.nome, id: c.id }));
          setCidadesList(formatted);
        }
      })
      .catch((err) => {
        console.warn("[IBGE/Localidades] Falha na rede ou API indisponível:", err.message);
      });

    return () => {
      active = false;
    };
  }, [estado]);

  // Carregar Bairros (Distritos) ao selecionar cidade
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
          // Filtrar nomes únicos e remover o nome da própria cidade se for o único
          const formatted = data.map((d: any) => ({ nome: d.nome }));
          setBairrosList(formatted);
        }
      })
      .catch(() => setBairrosList([]));

    return () => { active = false; };
  }, [cidadeId]);

  const handleEstadoChange = (val: string) => {
    setEstado(val || "");
    setCidade("");
    setCidadeId(null);
    setBairro("");
    setBairrosList([]);
  };

  const handleCidadeChange = (val: string) => {
    setCidade(val);
    const selected = cidadesList.find(c => c.nome === val);
    if (selected) setCidadeId(selected.id);
    else setCidadeId(null);
    setBairro("");
  };

  useEffect(() => {
    const handleExtensionUpdate = (event: any) => {
      const msg = event.detail;
      if (msg.action === "SEARCH_PROGRESS") {
        setStatusText(msg.status);
        setProgress(msg.progress);
        setIsSearching(true);
      } else if (msg.action === "LEADS_FOUND") {
        const sanitizeUrl = (u: string) => {
          if (!u) return "";
          try {
            return new URL(u).hostname.replace(/^www\./, "");
          } catch {
            return u
              .replace(/^https?:\/\//, "")
              .replace(/^www\./, "")
              .split("/")[0]
              .toLowerCase();
          }
        };

        const rawLeads = msg.leads || [];
        setLeads((prev) => {
          const blocked: any[] = [];
          const validNewLeads = rawLeads
            .filter((nl: any) => {
              // 1. Remove "Patrocinado" (Check Title AND Snippet)
              const isSponsor =
                (nl.title && nl.title.toLowerCase().includes("patrocinado")) ||
                (nl.snippet &&
                  nl.snippet.toLowerCase().includes("patrocinado"));
              if (isSponsor) {
                blocked.push({ ...nl, blockedReason: "Anúncio / Patrocinado" });
                return false;
              }

              // 2. Filtro Blacklist
              const matchedToken = blacklist.find(
                (token) =>
                  (nl.url && nl.url.toLowerCase().includes(token)) ||
                  (nl.title && nl.title.toLowerCase().includes(token)),
              );
              if (matchedToken) {
                blocked.push({
                  ...nl,
                  blockedReason: `Blacklist: ${matchedToken}`,
                });
                return false;
              }

              // 2.5 Filtro de Avaliações Mínimas (Autoridadae)
              const reviewsNum = nl.reviewCount ? parseInt(nl.reviewCount) : 0;
              if (searchMode === "maps" && reviewsNum < minReviewsCount) {
                blocked.push({
                  ...nl,
                  blockedReason: `Baixa Autoridade (<${minReviewsCount} reviews)`,
                });
                return false;
              }

              // 3. Desduplicação Inteligente
              const existsAlready = prev.some((p: any) => {
                const sameUrl =
                  sanitizeUrl(p.url) &&
                  sanitizeUrl(nl.url) &&
                  sanitizeUrl(p.url) === sanitizeUrl(nl.url);
                const sameTitle =
                  p.title &&
                  nl.title &&
                  p.title.toLowerCase() === nl.title.toLowerCase();
                return sameUrl || sameTitle;
              });

              if (existsAlready) return false;

              const score = calculateLeadScore(nl);
              if (score.score < 15) {
                blocked.push(nl);
                return false;
              }

              return true;
            })
            .map((nl: any) => {
              const classification = calculateLeadScore(nl);
              return {
                ...nl,
                ...classification,
                status: "NOVO",
                analysisStatus: nl.phone ? "COMPLETO" : "PENDENTE",
              };
            });

          if (blocked.length > 0) {
            setQuarantinedLeads((prevQ) => {
              const merged = [...blocked, ...prevQ].slice(0, 200);
              localStorage.setItem("capta_quarantine", JSON.stringify(merged));
              return merged;
            });
          }

          if (validNewLeads.length === 0 && rawLeads.length > 0) {
            setStatusText(
              `ALVOS REJEITADOS::${rawLeads.length} (AUTORIDADE_BAIXA)`,
            );
          } else {
            setStatusText(
              `VARREDURA FINALIZADA::${validNewLeads.length} ALVOS.`,
            );
          }

          return [...validNewLeads, ...prev];
        });
        setIsSearching(false);
        setProgress(100);
      } else if (msg.action === "LEAD_ANALYSIS_RESULT") {
        setLeadAnalysis(msg.analysis);
        setIsAnalyzing(false);

        // Sincroniza dados ricos extraizados
        if (selectedLeadDetails && msg.analysis) {
          const enrich = (l: any) => {
            const updated = {
              ...l,
              address: msg.analysis.address || l.address,
              phone:
                msg.analysis.extraPhones && msg.analysis.extraPhones.length > 0
                  ? msg.analysis.extraPhones[0]
                  : msg.analysis.phone || l.phone,
              socials: {
                instagram:
                  msg.analysis.socials?.instagram || l.socials?.instagram,
                facebook: msg.analysis.socials?.facebook || l.socials?.facebook,
              },
              perceptions: msg.analysis.perceptions || l.perceptions,
              analysisStatus: "COMPLETO",
              techData: {
                cms: msg.analysis.platform || l.techData?.cms,
                pixel: msg.analysis.hasPixel || l.techData?.pixel,
                gtm: msg.analysis.hasGTM || l.techData?.gtm,
                ads: msg.analysis.hasAds || l.techData?.ads,
                responsive: msg.analysis.isResponsive || l.techData?.responsive,
              },
            };
            const classification = calculateLeadScore(updated);
            return { ...updated, ...classification };
          };

          setLeads((prev) =>
            prev.map((l) =>
              l.url === msg.url || l.url === selectedLeadDetails.url
                ? enrich(l)
                : l,
            ),
          );
          if (
            selectedLeadDetails &&
            (selectedLeadDetails.url === msg.url ||
              selectedLeadDetails.url === msg.originalUrl)
          ) {
            setSelectedLeadDetails((prev: any) => enrich(prev));
          }
        }
      } else if (msg.action === "MANUAL_LEAD_ADDED") {
        setLeads((prev) => {
          const updated = [msg.lead, ...prev];
          localStorage.setItem("leads_offline", JSON.stringify(updated));
          return updated;
        });
        setStatusText("Lead manual capturado!");
      } else if (msg.action === "SEARCH_FINISHED") {
        setIsSearching(false);
        setStatusText("Varredura Finalizada.");
        setProgress(100);
      }
    };
    window.addEventListener("CAPTASAAS_UPDATE", handleExtensionUpdate);
    return () =>
      window.removeEventListener("CAPTASAAS_UPDATE", handleExtensionUpdate);
  }, [
    selectedLeadDetails,
    blacklist,
    calculateLeadScore,
    searchMode,
    minReviewsCount,
    quarantinedLeads.length,
  ]);

  // ORQUESTRADOR DE ENRIQUECIMENTO AUTOMÁTICO (Expert Agent Engine)
  useEffect(() => {
    if (isSearching || isAnalyzing) return; // Não sobrecarregar se já estiver fazendo algo

    // Encontra o próximo lead sem telefone que ainda não foi marcado como "ANALISANDO"
    const nextToEnrich = leads.find(
      (l) => !l.phone && l.analysisStatus === "PENDENTE",
    );

    if (nextToEnrich) {
      console.log("Auto-Enriching next lead:", nextToEnrich.title);

      // Marca como "ANALISANDO" imediatamente para não repetir
      setLeads((prev) =>
        prev.map((l) =>
          l.id === nextToEnrich.id ? { ...l, analysisStatus: "ANALISANDO" } : l,
        ),
      );

      // Dispara análise silenciosa
      window.dispatchEvent(
        new CustomEvent("CAPTASAAS_START_ANALYSIS", {
          detail: {
            url: nextToEnrich.url,
            mapsUrl: nextToEnrich.mapsUrl,
            silent: true,
          },
        }),
      );
    }
  }, [leads, isSearching, isAnalyzing]);

  const handleManualScan = () => {
    if (!manualInput.trim()) return;
    setManualProcessing(true);

    // Simular inteligência de extração
    setTimeout(() => {
      const input = manualInput.trim();

      // Tentar extrair URL
      const urlMatch = input.match(/(https?:\/\/[^\s]+)/);
      const url = urlMatch ? urlMatch[0] : "";

      // Tentar extrair Nome (o que vem antes da URL ou antes de um separador comum)
      let title = "Lead Capturado Manualmente";

      if (url) {
        const beforeUrl = input.split(url)[0].trim();
        const cleanBefore = beforeUrl.replace(/[  \-|:;,]+$/, "").trim();

        if (cleanBefore && cleanBefore.length > 2 && cleanBefore.length < 100) {
          title = cleanBefore;
        } else if (
          url.includes("google.com/maps") ||
          url.includes("goo.gl/maps")
        ) {
          title = "Lead no Google Maps";
        } else {
          try {
            const domain = new URL(url).hostname.replace("www.", "");
            title = domain.charAt(0).toUpperCase() + domain.slice(1);
          } catch {
            title = "Lead (URL)";
          }
        }
      } else {
        if (input.length < 60) {
          title = input;
        }
      }

      const isMaps =
        url.includes("google.com/maps") || url.includes("goo.gl/maps");

      const newLead = {
        id: crypto.randomUUID(),
        title: title,
        url:
          url ||
          (input.startsWith("http")
            ? input
            : `https://google.com/search?q=${encodeURIComponent(input)}`),
        mapsUrl: isMaps ? url : null,
        phone: "",
        rating: "N/A",
        reviewCount: "0",
        address: isMaps ? "Analisando localização..." : "Informação manual",
        status: "novo",
        perceptions: ["Captação Manual", "Aguardando ANÁLISE Profunda"],
        socials: {},
      };

      setLeads((prev) => [newLead, ...prev]);
      setManualProcessing(false);
      setIsManualModalOpen(false);
      setManualInput("");
      setStatusText("    Lead Manual Adicionado!");

      openLeadDetails(newLead);
    }, 1500);
  };

  const handleStartSearch = async () => {
    if (!nicho || !cidade) {
      console.warn("Dashboard: Nicho ou Cidade faltando.");
      return;
    }

    setIsModalOpen(false);
    setIsSearching(true);
    setProgress(5);
    setLeads([]);

    const runScan = async (targetBairro?: string, currentProgress: number = 10) => {
      try {
        const keyword = nicho + (targetBairro ? " em " + targetBairro : "");
        setStatusText(`Radar ${targetBairro ? `[${targetBairro}]` : `[Geral]`}: Escaneando ${nicho}...`);
        
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
          const formated = data.leads.map((l: any) => ({
            ...l,
            id: crypto.randomUUID(),
            status: "novo",
            reviewCount: l.reviews?.toString() || "0",
            rating: l.rating?.toString() || "N/A",
            perceptions: typeof l.classificationMotivity === 'string' ? l.classificationMotivity.split(" | ") : []
          }));
          
          setLeads(prev => {
            // Evitar duplicatas no merge
            const existingUrls = new Set(prev.map(p => p.url));
            const uniqueNew = formated.filter((f: any) => !existingUrls.has(f.url));
            return [...prev, ...uniqueNew];
          });
        }
      } catch (err) {
        console.error("Erro no scan segmentado:", err);
      }
    };

    try {
      if (isDeepScan && bairrosList.length > 0) {
        setStatusText(`INICIANDO MODO_DE_VARREDURA_TOTAL [${bairrosList.length} Bairros]`);
        
        // Loop sequencial para não estourar rate limit ou timeout
        for (let i = 0; i < bairrosList.length; i++) {
          const b = bairrosList[i].nome;
          const p = Math.floor(5 + ((i + 1) / bairrosList.length) * 90);
          setProgress(p);
          await runScan(b, p);
          // Pequena pausa tática
          await new Promise(r => setTimeout(r, 800));
        }
        
      } else {
        await runScan(bairro);
      }

      setProgress(100);
      setStatusText(`Sincronização Finalizada.`);
    } catch (err: any) {
      setStatusText(`FALHA_NOS_SATÉLITES: ${err.message}`);
    } finally {
      setTimeout(() => {
        setIsSearching(false);
        setProgress(0);
      }, 3000);
    }
  };

  const generateLovablePrompt = () => {
    if (!selectedLeadDetails) return "";

    const tipo = nicho || "Local Business";
    const nome = selectedLeadDetails.title;
    const local = selectedLeadDetails.address || `${cidade}, ${estado}`;
    const telefone = selectedLeadDetails.phone || "N/A";
    const rating = selectedLeadDetails.rating || null;
    const reviews = selectedLeadDetails.reviewCount || null;
    const plataforma = leadAnalysis?.platform || "unknown platform";
    const problemas = leadAnalysis?.perceptions || [];
    const instagram = selectedLeadDetails.socials?.instagram || null;
    const facebook = selectedLeadDetails.socials?.facebook || null;
    const lostRev = (fluxoMensal * 0.3 * ticketMedio).toLocaleString("pt-BR");

    const problemBlock =
      problemas.length > 0
        ? problemas.map((p: string) => `  - ${p}`).join("\n")
        : "  - No specific issues detected, focus on full modernization";

    const socialBlock =
      [
        instagram ? `  - Instagram: ${instagram}` : null,
        facebook ? `  - Facebook: ${facebook}` : null,
      ]
        .filter(Boolean)
        .join("\n") ||
      "  - No social profiles detected (add placeholder links)";

    const ratingBlock = rating
      ? `${rating} stars based on ${reviews} Google reviews`
      : "No public rating (build trust through testimonials and certifications)";

    const prompt = `# LOVABLE BUILD REQUEST — PREMIUM HIGH-CONVERSION LANDING PAGE
(Seed Context: ${nome} | ${tipo} | ${cidade})

## 🎯 OBJETIVO PRINCIPAL
Criar uma landing page de ALTA CONVERSÃO (Máquina de Vendas) que transforme visitantes em leads via WhatsApp. Use o framework "5 Cs" (Clareza, Credibilidade, Conversão, Contexto e Conveniência).

## 📊 DADOS REAIS DO NEGÓCIO (Injete no conteúdo)
- **Empresa:** ${nome}
- **Nicho:** ${tipo}
- **Localização:** ${local}
- **WhatsApp:** ${telefone}
- **Social Proof:** ${ratingBlock}
- **Impacto Financeiro:** Estimativa de perda de R$ ${lostRev}/mês pela falta de presença digital atual.

## ⚡ PRINCÍPIOS DE CONVERSÃO OBRIGATÓRIOS (Framework 2025)
1. **Clareza Absoluta**: Headline com benefício principal em até 8 palavras. Subheadline expandindo o "como" em 15 palavras.
2. **Psicologia Brasileira**: Foco no emocional e relacional. Use "Imagine-se..." e fotos que evoquem conexão humana e autoridade.
3. **Credibilidade Imediata**: Trust signals nos primeiros 3 segundos (Nota ${rating || "4.9"}, Anos de experiência, ícones de certificação).
4. **Mobile-First Radical**: 70% dos acessos serão mobile. 
   - Botão WhatsApp fixo no Bottom Sheet (mobile).
   - Touch targets de no mínimo 44x44px.
   - Zero Layout Shift (CLS = 0).

## 🛠️ PROBLEMAS TÉCNICOS A CORRIGIR (Detectados no site atual: ${plataforma})
${problemBlock}
👉 *Instrução para IA:* Implemente soluções modernas para estes problemas específicos (ex: se falta Pixel, crie estrutura para tracking; se não é responsivo, use grid fluido).

## 🎨 DESIGN SYSTEM & AESTHETIC
- **Estilo:** Luxo moderno, minimalista mas "quente". Sensação de site de R$ 5.000+.
- **Cores:** Escuras e profissionais (Deep Charcoal) com acentos em Ouro/Âmbar (#e8a838). NO PURPLE.
- **Tipografia:** 'Playfair Display' para H1 (Autoridade) e 'Inter' para o corpo (Leitura).
- **Animações:** Suaves (fade-in on scroll), sem parallax excessivo em mobile.

## 🏗️ ESTRUTURA DA PÁGINA (Padrão de Sucesso BR)
1. **Hero**: Headline matadora + Subheadline + CTA de WhatsApp em 1ª pessoa ("Quero Agendar Agora").
2. **Trust Bar**: Logo dos principais parceiros ou "Destaques no Google".
3. **Serviços (Grid)**: 3 cards com fotos reais/placeholders profissionais e CTAs individuais.
4. **Diferenciais**: Por que escolher ${nome}? (Lista de benefícios claros).
5. **Dossiê de Impacto**: Seção educacional explicando o prejuízo de não ter um site moderno (use o dado de R$ ${lostRev}).
6. **Depoimentos (Social Proof)**: 3 histórias reais (Problema -> Solução) com nome e bairro.
7. **FAQ**: 6 perguntas frequentes que quebram as objeções de compra do brasileiro.
8. **Footer**: Mapa, CNPJ (placeholder), horário e links sociais:
${socialBlock}

## 🎬 TECH STACK
- React 18 + Tailwind CSS.
- Lucide React para ícones.
- Framer Motion para micro-interações.
- WhatsApp Float Button: Verde (#25D366), pulsação visual a cada 3s.

**IMPORTANTE:** O conteúdo deve ser em Português do Brasil (pt-BR), com tom profissional e persuasivo.`;

    navigator.clipboard.writeText(prompt);
    setLovablePromptText(prompt);
    setIsLovableModalOpen(true);
    setStatusText("    Prompt Lovable gerado!");
    setTimeout(() => setStatusText("Dashboard Ativo."), 4000);
    return prompt;
  };

  const handleDeleteLead = (leadOrUrl: any) => {
    const key = typeof leadOrUrl === "string" ? leadOrUrl : (leadOrUrl.mapsUrl || leadOrUrl.url || leadOrUrl.title);
    
    setLeads((prev) => prev.filter((l) => (l.mapsUrl || l.url || l.title) !== key));
    const cached = JSON.parse(
      localStorage.getItem("capta_leads_cache") || "[]",
    );
    localStorage.setItem(
      "capta_leads_cache",
      JSON.stringify(cached.filter((l: any) => (l.mapsUrl || l.url || l.title) !== key)),
    );
  };

  const addToVault = (lead: any) => {
    const key = lead.mapsUrl || lead.title || lead.url;
    if (vaultLeads.some((l) => (l.mapsUrl || l.title || l.url) === key)) {
      setStatusText("Lead já está no cofre!");
      handleDeleteLead(key); // Força limpeza da matriz principal se já estiver salvo
      return;
    }
    const updated = [
      ...vaultLeads,
      { ...lead, savedAt: new Date().toISOString() },
    ];
    setVaultLeads(updated);
    localStorage.setItem("capta_leads_vault_cache", JSON.stringify(updated));
    
    // Purificar da main stream (Mover em vez de Duplicar)
    handleDeleteLead(key);
    
    setStatusText("Lead Extraído para o COFRE_LEADS!");
    setTimeout(() => setStatusText("Dashboard Ativo."), 2000);
  };

  const removeFromVault = (leadOrUrl: any) => {
    const key = typeof leadOrUrl === "string" ? leadOrUrl : (leadOrUrl.mapsUrl || leadOrUrl.title || leadOrUrl.url);
    const updated = vaultLeads.filter((l) => (l.mapsUrl || l.url || l.title) !== key);
    setVaultLeads(updated);
    localStorage.setItem("capta_leads_vault_cache", JSON.stringify(updated));
  };

  const addToSwipe = (lead: any) => {
    const key = lead.mapsUrl || lead.title || lead.url;
    if (swipeLeads.some((l) => (l.mapsUrl || l.title || l.url) === key)) {
      setStatusText("Design já está no Swipe File!");
      return;
    }
    const updated = [
      ...swipeLeads,
      { ...lead, swipedAt: new Date().toISOString() },
    ];
    setSwipeLeads(updated);
    localStorage.setItem("capta_swipe_leads", JSON.stringify(updated));
    setStatusText("Site marcado para CLONAGEM_UI!");
    setTimeout(() => setStatusText("Dashboard Ativo."), 2000);
  };

  const removeFromSwipe = (lead: any) => {
    const key = lead.mapsUrl || lead.title || lead.url;
    const updated = swipeLeads.filter((l) => (l.mapsUrl || l.url || l.title) !== key);
    setSwipeLeads(updated);
    localStorage.setItem("capta_swipe_leads", JSON.stringify(updated));
  };

  const generateCloningPrompt = (lead: any) => {
    const prompt = `# CLONAGEM DE NICHO // ENGENHARIA REVERSA DE ALTA FIDELIDADE
Aja como um desenvolvedor Fullstack Senior e especialista em UI/UX. 
Analise este site de referência no nicho '${lead.title}': ${lead.url} 

Objetivo: Quero realizar a 'engenharia reversa' COMPLETA deste site para criar um TEMPLATE DE NICHO idêntico.

## 🎨 DESIGN SYSTEM ORIGINAL (Capture exatamente):
1. MAPA DE CORES: Extraia as cores fundamentais (HEX/HSL), gradientes e esquemas de contraste.
2. TIPOGRAFIA: Identifique as famílias de fontes ou similares próximos (Google Fonts), tamanhos e pesos.
3. ESTILIZAÇÃO: Replique o arredondamento de bordas (border-radius), sombras e efeitos de vidro/glassmorphism.

## 🏗️ ESTRUTURA E LAYOUT:
1. HERO SECTION: Replique o alinhamento de texto, CTAs, imagens de fundo e hierarquia central.
2. COMPONENTES: Mapeie as seções de Serviços, Depoimentos, Galeria e Formulários exatamente como no site.
3. MICRO-INTERAÇÕES: Capture as animações de scroll, hover de botões e transições suaves.

## ⚡ REQUISITOS TÉCNICOS:
- Framework: Next.js 14, Tailwind CSS e Framer Motion.
- Generalização: Transforme nomes, logos e fotos específicas em placeholders genéricos para o nicho (ex: 'Sua Clínica', 'Serviço Premium').

IMPORTANTE: Mantenha a estética original em 100%. NÃO adapte para o estilo Cyberpunk. O objetivo é que o resultado final seja o template pronto perfeito para outros clientes deste mesmo nicho.`;

    navigator.clipboard.writeText(prompt);
    setIsPromptCopied(true);
    setTimeout(() => setIsPromptCopied(false), 3000);
    setStatusText("Prompt de Clonagem Copiado!");
    setTimeout(() => setStatusText("Dashboard Ativo."), 3000);
  };

  const openStitchConfig = (lead: any) => {
    const cleanName = lead.title.split('-')[0].trim();
    const safeId = cleanName.toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]/g, '_')
      .replace(/_{2,}/g, '_')
      .replace(/^_|_$/g, '');
    
    setStitchConfig({
      name: `SWIPE: ${cleanName}`,
      themeId: `${safeId}_v1`,
      segment: nicho || 'geral',
      lead
    });
    setIsStitchConfigOpen(true);
  };

  const handleAutoBuild = async (overrideLead?: any) => {
    const targetLead = overrideLead || stitchConfig.lead;
    if (!targetLead || stitchStatuses[targetLead.url] === 'generating') return;
    
    const finalName = overrideLead ? `SWIPE: ${targetLead.title}` : stitchConfig.name;
    const finalThemeId = overrideLead ? `swipe_${Date.now()}` : stitchConfig.themeId;
    const finalSegment = overrideLead ? (nicho || 'geral') : stitchConfig.segment;

    setIsStitchConfigOpen(false);
    setStitchStatuses(prev => ({ ...prev, [targetLead.url]: 'generating' }));
    setStatusText(`Iniciando Síntese: ${finalName}...`);

    const promptData = `# CLONAGEM DE NICHO // ENGENHARIA REVERSA DE ALTA FIDELIDADE
Aja como um desenvolvedor Fullstack Senior e especialista em UI/UX. 
Analise este site de referência no nicho '${finalSegment}': ${targetLead.url} 

Objetivo: Quero realizar a 'engenharia reversa' COMPLETA deste site para criar um TEMPLATE DE NICHO idêntico.

## 🎨 DESIGN SYSTEM ORIGINAL (Capture exatamente):
1. MAPA DE CORES: Extraia as cores principais (HEX/HSL).
2. TIPOGRAFIA: Identifique fontes Google similares.
3. ESTILIZAÇÃO: Replique border-radius e sombras originais.

## 🏗️ ESTRUTURA E LAYOUT:
1. HERO & SEÇÕES: Replique o alinhamento de texto e CTAs.
2. COMPONENTES: Mapeie seções de Serviços e Depoimentos.

## ⚡ REQUISITOS TÉCNICOS:
- Framework: Next.js 14, Tailwind CSS e Framer Motion.
- Generalização: Use placeholders genéricos para o nicho.

IMPORTANTE: Mantenha a estética original em 100%. NÃO use o estilo Cyberpunk.`;

    try {
      const result = await generateStitchLayout(promptData, finalSegment);
      if (result.success && result.code) {
        const saveResult = await saveGeneratedTemplate(
          finalName, 
          finalSegment, 
          finalThemeId, 
          result.code
        );

        if (saveResult.success) {
          setStitchStatuses(prev => ({ ...prev, [targetLead.url]: 'completed' }));
          setStatusText("Template Sincronizado com Sucesso!");
          setIsPromptCopied(true);
          setTimeout(() => setIsPromptCopied(false), 3000);
        } else {
          throw new Error("Falha ao salvar no banco.");
        }
      } else {
        throw new Error(result.error);
      }
    } catch (error: any) {
      console.error("Stitch Build Error:", error);
      setStitchStatuses(prev => ({ ...prev, [targetLead.url]: 'error' }));
      setStatusText(error.message || "Erro na Síntese.");
    }
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

  const handleSendZap = (lead: any) => {
    if (!lead || !lead.phone) return;
    const cleanPhone = lead.phone.replace(/\D/g, "");
    const message =
      generatedMessage ||
      `Ol   ${lead.title}, vi que vocês trabalham com ${nicho || "serviçãos"} em ${cidade}. Tenho uma proposta para aumentar sua visibilidade digital. Podemos conversar?`;
    const url = `https://wa.me/55${cleanPhone}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  const openLeadDetails = (lead: any) => {
    setLeadAnalysis(null);
    setIsAnalyzing(false);
    setIsSiteOutdated(false);
    setSelectedLeadDetails(lead);
    setIsDetailsModalOpen(true);
    setGeneratedMessage("");
    setLandingPageUrl(
      `https://lovable.dev/?prompt=${encodeURIComponent(nicho + " " + lead.title)}`,
    );
  };

  const generateAIPitch = (type: "venda" | "recall" | "apresentacao") => {
    if (!selectedLeadDetails) return;

    const empresa = selectedLeadDetails.title;
    const local = cidade || "sua região";
    const nichoEmpresa = nicho || "negócio";
    void nichoEmpresa; // suppress unused-vars: valor reservado para templates futuros

    let template = "";

    if (type === "venda") {
      template = `Olá! Vi seu perfil no Google em ${local}. Reparei que sem um site moderno, vocês podem estar perdendo vários clientes toda semana por falta de confiança digital. A concorrência acaba levando quem pesquisa na internet. Fiz uma prévia de como ficaria a presença digital oficial da ${empresa}. Toparia ver?`;
    } else if (type === "recall") {
      template = `Oi pessoal da ${empresa}! Sou o especialista que analisou sua presença em ${local}. O mercado de ${nichoEmpresa} está aquecendo e notei que a falta de um site de alta qualidade está fazendo vocês deixarem dinheiro na mesa todo dia. Vamos retomar o papo de colocar sua marca no mapa digital?`;
    } else {
      template = `Olá! Notei que a ${empresa} ainda não possui um site moderno e otimizado para celulares. Estudos mostram que 78% dos clientes desistem de lojas ou serviços locais apenas por não confiarem na presença online. Gostaria de receber a auditoria de presença digital que eu fiz de vocês gratuitamente?`;
    }

    setGeneratedMessage(template);
    setStatusText("Pitch Gerado!");
    setTimeout(() => setStatusText("Dashboard Ativo."), 2000);
  };

  const sortedLeads = useMemo(() => {
    return [...leads].sort((a, b) => {
      const priority = { Quente: 3, Morno: 2, Frio: 1 };
      const aP = priority[a.temperature as keyof typeof priority] || 0;
      const bP = priority[b.temperature as keyof typeof priority] || 0;
      if (aP !== bP) return bP - aP;
      return (b.score || 0) - (a.score || 0);
    });
  }, [leads]);

  const filteredLeads = sortedLeads.filter((lead) => {
    if (filterMode === "no-site")
      return !lead.url || lead.url.includes("google.com");
    if (filterMode === "no-pixel")
      return lead.perceptions?.some((p: string) =>
        p.toLowerCase().includes("sem pixels"),
      );
    if (filterMode === "no-mobile")
      return lead.perceptions?.some((p: string) =>
        p.toLowerCase().includes("não é amigável para celular"),
      );
    if (filterMode === "low-rating")
      return lead.rating && parseFloat(lead.rating) < 4.0;
    return true;
  });

  const updateLeadStatus = (leadUrl: string, newStatus: string) => {
    setLeads((prev) =>
      prev.map((l) => (l.url === leadUrl ? { ...l, status: newStatus } : l)),
    );
  };

  const convertToActive = (lead: any) => {
    if (!lead) return;

    const id = crypto.randomUUID().split("-")[0];
    const slug = lead.title.toLowerCase().replace(/[^a-z0-9]/g, "-");
    const newProject = {
      id,
      name: lead.title,
      slug,
      status: "active",
      renewal: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
        .toLocaleDateString("pt-BR")
        .substring(0, 5), // +30 dias
      type: "Recorrência",
      monthlyFee: "149,00",
      liveUrl: getSubdomainUrl(slug), // Link multi-tenant dinâmico
      htmlContent: previewHtmlInput || "", // Usa o último HTML colado se houver
      leadInfo: lead,
    };

    const updatedProjects = [...activeProjects, newProject];
    setActiveProjects(updatedProjects);
    localStorage.setItem(
      "capta_active_projects",
      JSON.stringify(updatedProjects),
    );

    setCurrentView("active-sites");
    setIsDetailsModalOpen(false);
    setStatusText(`       ${lead.title} ativado em producao!`);
    setTimeout(() => setStatusText("Dashboard Ativo."), 3000);
  };

  const deleteActiveProject = (id: string) => {
    const updated = activeProjects.filter((p) => p.id !== id);
    setActiveProjects(updated);
    localStorage.setItem("capta_active_projects", JSON.stringify(updated));
    setStatusText("Projeto removido.");
  };

  const toggleProjectStatus = async (id: string) => {
    let newStatus = "";
    const updated = activeProjects.map((p) => {
      if (p.id === id) {
        newStatus = p.status === "active" ? "suspended" : "active";
        return { ...p, status: newStatus };
      }
      return p;
    });

    // Sync with DB
    const result = await updateProjectStatus(id, newStatus);
    if (!result.success) {
      setStatusText(result.message || "Erro ao sincronizar status.");
      return;
    }

    setActiveProjects(updated);
    localStorage.setItem("capta_active_projects", JSON.stringify(updated));
  };

  const openProjectSettings = (project: any) => {
    setEditingProject(project);
    setProjectSettings({
      name: project.name,
      slug: project.slug,
      whatsapp: project.leadInfo?.phone || "",
      monthlyFee: project.monthlyFee || "149,00",
      liveUrl: project.liveUrl || "",
    });
    setIsProjectSettingsOpen(true);
  };

  const saveProjectSettings = () => {
    if (!editingProject) return;
    const updated = activeProjects.map((p) => {
      if (p.id === editingProject.id) {
        return {
          ...p,
          name: projectSettings.name,
          slug: projectSettings.slug,
          monthlyFee: projectSettings.monthlyFee,
          liveUrl: projectSettings.liveUrl,
          leadInfo: { ...p.leadInfo, phone: projectSettings.whatsapp },
        };
      }
      return p;
    });
    setActiveProjects(updated);
    localStorage.setItem("capta_active_projects", JSON.stringify(updated));
    setIsProjectSettingsOpen(false);
    setStatusText("       Configurações salvas!");
    setTimeout(() => setStatusText("Dashboard Ativo."), 3000);
  };

  /**
   * MULTI-TENANT ENGINE INTEGRATION
   * Gera o link baseado no host atual (localhost ou produção)
   */
  const getSubdomainUrl = (slug: string) => {
    if (typeof window === "undefined") return `localhost:3000`;
    const host = window.location.host;
    // Se for localhost:3000 -> villa-bistro.localhost:3000
    // Se for captasites.com.br -> villa-bistro.captasites.com.br
    return `${slug}.${host}`;
  };

  const generateBundle = (project: any) => {
    setStatusText(`       Preparando bundle para ${project.name}...`);
    setTimeout(() => {
      setStatusText("       Bundle gerado e pronto para download!");
      setTimeout(() => setStatusText("Dashboard Ativo."), 3000);
    }, 1500);
  };

  const startLeadAnalysis = useCallback(() => {
    if (!selectedLeadDetails) return;
    setIsAnalyzing(true);
    window.dispatchEvent(
      new CustomEvent("CAPTASAAS_START_ANALYSIS", {
        detail: { url: selectedLeadDetails.url },
      }),
    );
  }, [selectedLeadDetails]);

  const startMapsAnalysis = useCallback(() => {
    if (!selectedLeadDetails?.mapsUrl) return;
    setIsAnalyzing(true);
    window.dispatchEvent(
      new CustomEvent("CAPTASAAS_START_ANALYSIS", {
        detail: { url: selectedLeadDetails.mapsUrl },
      }),
    );
  }, [selectedLeadDetails]);

  // Gatilho automático de análise ao abrir um lead
  useEffect(() => {
    if (
      isDetailsModalOpen &&
      selectedLeadDetails &&
      !leadAnalysis &&
      !isAnalyzing
    ) {
      startLeadAnalysis();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDetailsModalOpen]); // Intencional: só dispara quando o modal abre

  return (
    <>
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

      {isDetailsModalOpen && selectedLeadDetails && (
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
                        (selectedLeadDetails.temperature || "Morno") ===
                        "Quente"
                          ? "bg-rose-500/10 text-rose-500 border-rose-500/20"
                          : (selectedLeadDetails.temperature || "Morno") ===
                              "Frio"
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
                            {selectedLeadDetails.rating} (
                            {selectedLeadDetails.reviewCount || "N/A"}{" "}
                            AVALIAÇÕES)
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
                onClick={() => setIsDetailsModalOpen(false)}
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
                    <Activity className="w-4 h-4 text-[#06b6d4]" /> ANÁLISE de
                    OPERAÇÃO Digital
                  </h3>
                  <div className="grid grid-cols-2 gap-y-4 text-sm font-bold">
                    <div className="flex flex-col">
                      <span className="text-[10px] text-slate-600 uppercase">
                        Website / Fonte
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="text-white italic truncate max-w-[150px]">
                          {selectedLeadDetails.url.includes("google.com")
                            ? "Google Profile"
                            : "Direto (URL)"}
                        </span>
                        {selectedLeadDetails.mapsUrl && (
                          <button
                            onClick={() =>
                              window.open(selectedLeadDetails.mapsUrl, "_blank")
                            }
                            className="text-yellow-500 hover:text-white"
                            title="Ver Perfil no Maps"
                          >
                            <MapPin className="w-3 h-3" />
                          </button>
                        )}
                        <button
                          onClick={() =>
                            window.open(selectedLeadDetails.url, "_blank")
                          }
                          className="text-[#06b6d4] hover:text-white"
                          title="Abrir Site"
                        >
                          <ExternalLink className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] text-slate-600 uppercase">
                        Plataforma
                      </span>
                      <span
                        className={`italic uppercase text-[10px] tracking-widest ${leadAnalysis ? "text-[#06b6d4]" : "text-slate-500"}`}
                      >
                        {isAnalyzing
                          ? "DETECTANDO..."
                          : leadAnalysis?.platform || "Aguardando..."}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] text-slate-600 uppercase">
                        Score Mobile
                      </span>
                      <span
                        className={`italic uppercase text-[10px] tracking-widest ${leadAnalysis ? (leadAnalysis.score < 50 ? "text-rose-500" : "text-emerald-500") : "text-slate-500"}`}
                      >
                        {leadAnalysis
                          ? `${leadAnalysis.score}/100`
                          : "Indefinido"}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] text-slate-600 uppercase">
                        Site / DOMÍNIO
                      </span>
                      <span
                        className={`italic uppercase text-[10px] tracking-widest ${selectedLeadDetails.url && !selectedLeadDetails.url.includes("google.com") ? "text-emerald-400" : "text-rose-500"}`}
                      >
                        {selectedLeadDetails.url &&
                        !selectedLeadDetails.url.includes("google.com")
                          ? "DETERMINADO"
                          : "AUSENTE"}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] text-slate-600 uppercase">
                        WhatsApp / Celular
                      </span>
                      <span
                        className={`italic uppercase text-[10px] tracking-widest ${selectedLeadDetails.phone ? "text-emerald-400" : "text-slate-500"}`}
                      >
                        {selectedLeadDetails.phone
                          ? selectedLeadDetails.phone
                          : "NÃO_DETECTADO"}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mt-6">
                    <div className="flex flex-col">
                      <span className="text-[10px] text-slate-600 uppercase">
                        Social Score
                      </span>
                      <span className="text-white italic uppercase text-[10px] tracking-widest">
                        {selectedLeadDetails.socials?.instagram ||
                        selectedLeadDetails.socials?.facebook
                          ? "PRESENÇA_ALTA"
                          : "FRACA"}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] text-slate-600 uppercase">
                        Maps Overall
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="text-emerald-400 italic uppercase text-[10px] tracking-widest">
                          {selectedLeadDetails.rating
                            ? `${selectedLeadDetails.rating}     (${selectedLeadDetails.reviewCount || 0})`
                            : "SEM_DADOS"}
                        </span>
                        {selectedLeadDetails.mapsUrl && (
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() =>
                                window.open(
                                  selectedLeadDetails.mapsUrl,
                                  "_blank",
                                )
                              }
                              className="text-slate-500 hover:text-white text-[9px] font-black uppercase italic underline decoration-[#06b6d4]"
                            >
                              VER_NO_MAPS
                            </button>
                            <button
                              onClick={startMapsAnalysis}
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
                        <span className="text-[11px] font-black text-white uppercase tracking-[0.2em]">
                          Motivo da classificaç&atilde;o
                        </span>
                      </div>
                      <p className="text-[12px] text-slate-300 font-medium leading-relaxed italic pr-4">
                        {selectedLeadDetails.classificationMotivity}
                      </p>
                    </div>
                  )}

                  {leadAnalysis?.perceptions && (
                    <div className="mt-6 pt-6 border-t border-white/5">
                      <span className="text-[11px] text-[#06b6d4] font-black uppercase tracking-[0.2em] block mb-4">
                        {" "}
                        Pontos Cr&iacute;ticos Detectados
                      </span>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {leadAnalysis.perceptions.map(
                          (p: string, i: number) => (
                            <div
                              key={i}
                              className="flex items-start gap-3 bg-white/5 p-3 group hover:bg-white/10 transition-colors"
                            >
                              <div className="w-1.5 h-1.5 rounded-full bg-[#06b6d4] mt-1.5 shadow-[0_0_5px_#06b6d4]" />
                              <p className="text-[11px] font-bold text-slate-300 leading-tight uppercase tracking-tight">
                                {p}
                              </p>
                            </div>
                          ),
                        )}
                      </div>
                    </div>
                  )}
                </section>

                <section className="bg-black/20 border border-white/5 p-6 rounded-none">
                  <h3 className="text-[11px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-4">
                    Mudar Status Operacional
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {["NOVO", "CONTATADO", "PROPOSTA", "FECHADO"].map(
                      (status) => (
                        <button
                          key={status}
                          onClick={() => {
                            updateLeadStatus(selectedLeadDetails.url, status);
                            setSelectedLeadDetails(
                              (prev: Record<string, unknown>) => ({
                                ...prev,
                                status,
                              }),
                            );
                          }}
                          className={`h-10 px-4 text-[10px] font-black italic tracking-widest border border-white/10 hover:bg-[#06b6d4] hover:text-black transition-all ${(selectedLeadDetails.status || "NOVO") === status ? "bg-[#06b6d4] text-black border-[#06b6d4]" : "text-slate-500"}`}
                        >
                          {status}
                        </button>
                      ),
                    )}
                  </div>

                  {(selectedLeadDetails.status === "FECHADO" ||
                    selectedLeadDetails.status === "PROPOSTA") && (
                    <div className="mt-4 pt-4 border-t border-white/10 animate-in fade-in zoom-in duration-300">
                      <Button
                        onClick={() => convertToActive(selectedLeadDetails)}
                        className="w-full h-14 bg-emerald-500 hover:bg-white text-black font-black italic tracking-[0.2em] transition-all flex items-center justify-center gap-3 rounded-none shadow-[0_0_30px_rgba(16,185,129,0.3)]"
                      >
                        <Zap className="w-5 h-5 fill-current" />
                        ATIVAR_SITE_EM_PRODUÇÃO
                      </Button>
                      <p className="text-[9px] text-center text-emerald-500 font-bold uppercase tracking-widest mt-2">
                        Pronto para iniciar faturamento recorrente
                      </p>
                    </div>
                  )}
                </section>
              </div>

              {/* Coluna Direita: Gerador de PressKit */}
              <div className="col-span-12 lg:col-span-5 space-y-8">
                <section className="bg-black/40 border border-[#06b6d4]/20 p-6 rounded-none border-t-4 border-t-[#06b6d4]">
                  <h3 className="text-[11px] font-bold text-[#06b6d4] uppercase tracking-[0.2em] mb-4">
                    Gerar PressKit de Venda
                  </h3>
                  <div className="space-y-4">
                    <p className="text-[10px] text-slate-500 italic">
                      Copie o prompt estruturado para o Lovable ou Switch
                      abaixo:
                    </p>
                    <Button
                      onClick={generateLovablePrompt}
                      className="w-full h-12 bg-white text-black font-black italic tracking-widest hover:bg-[#06b6d4] hover:text-black transition-all"
                    >
                      GERAR_PROMPT_LOVABLE_GPT
                    </Button>

                    {selectedLeadDetails?.url && (
                      <div
                        onClick={() => setIsSiteOutdated(!isSiteOutdated)}
                        className={`flex items-center gap-3 p-4 border transition-all cursor-pointer ${isSiteOutdated ? "bg-[#ff00ff]/10 border-[#ff00ff]/50" : "bg-black border-white/10 hover:border-white/30"}`}
                      >
                        <div className={`w-4 h-4 border flex items-center justify-center transition-colors ${isSiteOutdated ? 'bg-[#ff00ff] border-[#ff00ff]' : 'border-slate-500'}`}>
                          {isSiteOutdated && <Check className="w-3 h-3 text-black" />}
                        </div>
                        <div>
                          <p className={`text-[10px] font-black uppercase tracking-widest ${isSiteOutdated ? "text-[#ff00ff]" : "text-slate-400"}`}>
                            Marcador: Site Desatualizado / Lento
                          </p>
                          <p className="text-[8px] text-slate-500 uppercase leading-none mt-1">
                            Ativa Proposta de Renovação (-30%)
                          </p>
                        </div>
                      </div>
                    )}

                    {isSiteOutdated ? (
                      <Button
                        onClick={() => setIsRenewalModalOpen(true)}
                        className="w-full h-12 bg-[#ff00ff] text-white font-black italic tracking-widest hover:bg-white hover:text-black transition-all border-none shadow-[0_0_20px_rgba(255,0,255,0.4)]"
                      >
                        DIAGNÓSTICO_RENOVAÇÃO_PRO
                      </Button>
                    ) : (
                      <Button
                        onClick={() => setIsAuditModalOpen(true)}
                        className="w-full h-12 bg-[#fbce07] text-black font-black italic tracking-widest hover:bg-white hover:text-black transition-all border-none"
                      >
                        GERAR_DOSSIÊ_AUDITORIA_V2
                      </Button>
                    )}
                    <button
                      onClick={() => {
                        generateLovablePrompt();
                        setTimeout(
                          () =>
                            window.open(
                              "https://stitch.withgoogle.com",
                              "_blank",
                            ),
                          600,
                        );
                      }}
                      className="w-full h-10 bg-gradient-to-r from-[#fbce07] to-[#f59e0b] text-black font-black italic text-[9px] uppercase tracking-widest hover:opacity-90 transition-all flex items-center justify-center gap-2"
                    >
                      <Sparkles className="w-3.5 h-3.5 fill-current" />
                      GOOGLE_STITCH_MCP
                    </button>
                    <Button
                      onClick={() => setIsPreviewModalOpen(true)}
                      className="w-full h-10 bg-black border border-[#06b6d4]/40 text-[#06b6d4] font-black italic text-[9px] uppercase tracking-widest hover:bg-[#06b6d4]/10 transition-all flex items-center justify-center gap-2"
                    >
                      <Activity className="w-3.5 h-3.5" />
                      SUBIR_PREVIEW_48H
                    </Button>
                  </div>
                </section>

                <section className="bg-black/20 border border-white/5 p-6 rounded-none">
                  <h3 className="text-[11px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-4">
                    Gatilhos de Mensagem (Whats)
                  </h3>
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-2">
                      <Button
                        onClick={() => generateAIPitch("venda")}
                        className="h-10 bg-white/5 border border-white/10 text-white font-bold text-[9px] uppercase italic tracking-tighter hover:bg-emerald-500 hover:text-black"
                      >
                        Chamada_Venda
                      </Button>
                      <Button
                        onClick={() => generateAIPitch("recall")}
                        className="h-10 bg-white/5 border border-white/10 text-white font-bold text-[9px] uppercase italic tracking-tighter hover:bg-[#06b6d4] hover:text-black"
                      >
                        Chamada_Recall
                      </Button>
                      <Button
                        onClick={() => generateAIPitch("apresentacao")}
                        className="h-10 bg-white/5 border border-white/10 text-white font-bold text-[9px] uppercase italic tracking-tighter hover:bg-amber-500 hover:text-black col-span-2"
                      >
                        Apresentação_Empresarial
                      </Button>
                    </div>

                    {generatedMessage && (
                      <div className="mt-6 space-y-4 animate-in fade-in slide-in-from-bottom-2">
                        <div className="p-4 bg-black/60 border border-white/5 font-bold text-[11px] text-slate-400 italic leading-relaxed whitespace-pre-wrap">
                          {generatedMessage}
                        </div>
                        <div className="flex gap-2">
                          <Button
                            onClick={() => handleSendZap(selectedLeadDetails)}
                            className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white font-black tracking-widest h-12 flex items-center justify-center gap-2 uppercase italic text-[10px]"
                          >
                            <Zap className="w-4 h-4" /> Enviar WhatsApp
                          </Button>
                          <Button
                            variant="outline"
                            onClick={() =>
                              navigator.clipboard.writeText(generatedMessage)
                            }
                            className="w-12 h-12 border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all"
                          >
                            <Database className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </section>
              </div>
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
                      <option value="Empresa de Energia Solar" className="bg-[#0f172a] text-cyan-400">☀️ EMPRESA DE ENERGIA SOLAR</option>
                      <option value="Clínica Odontológica" className="bg-[#0f172a] text-cyan-400">🦷 CLÍNICA ODONTOLÓGICA</option>
                      <option value="Oficina Mecânica" className="bg-[#0f172a] text-cyan-400">🛠️ OFICINA MECÂNICA</option>
                      <option value="Ar Condicionado e Refrigeração" className="bg-[#0f172a] text-cyan-400">❄️ AR CONDICIONADO / REFRIGERAÇÃO</option>
                      <option value="Clínica de Estética" className="bg-[#0f172a] text-cyan-400">✨ CLÍNICA DE ESTÉTICA</option>
                      <option value="Salão de Beleza" className="bg-[#0f172a] text-cyan-400">💇‍♀️ SALÃO DE BELEZA / BARBEARIA</option>
                      <option value="Clínica Veterinária" className="bg-[#0f172a] text-cyan-400">🐶 CLÍNICA VETERINÁRIA / PET SHOP</option>
                      <option value="Escritório de Advocacia" className="bg-[#0f172a] text-cyan-400">⚖️ ADVOCACIA / ESCRITÓRIO</option>
                      <option value="Empresa de Segurança e Câmeras" className="bg-[#0f172a] text-cyan-400">🔐 SEGURANÇA / CFTV</option>
                      <option value="Mudanças e Fretes" className="bg-[#0f172a] text-cyan-400">🚚 MUDANÇAS E FRETES</option>
                      <option value="Limpeza de Sofá e Higienização" className="bg-[#0f172a] text-cyan-400">🧼 LIMPEZA DE SOFÁ / HIGIENIZAÇÃO</option>
                      <option value="Chaveiro 24h" className="bg-[#0f172a] text-cyan-400">🔑 CHAVEIRO 24H</option>
                      <option value="Vidraçaria e Esquadrias" className="bg-[#0f172a] text-cyan-400">🚿 VIDRAÇARIA / ESQUADRIAS</option>
                      <option value="Hamburgueria" className="bg-[#0f172a] text-cyan-400">🍔 HAMBURGUERIA / FAST FOOD</option>
                      <option value="Pizzaria Delivery" className="bg-[#0f172a] text-cyan-400">🍕 PIZZARIA DELIVERY</option>
                      <option value="Academia Fitness" className="bg-[#0f172a] text-cyan-400">🏋️‍♀️ ACADEMIA / CROSSFIT</option>
                      <option value="Material de Construção" className="bg-[#0f172a] text-cyan-400">🧱 MATERIAL DE CONSTRUÇÃO</option>
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
                  </select>
                </div>

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

      {/*      MODAL DE AUDITORIA (PDF STYLE) v3.0 */}
      {isAuditModalOpen && selectedLeadDetails && (
        <div className="fixed inset-0 bg-black/98 backdrop-blur-3xl z-[200] flex items-center justify-center p-4 print:static print:inset-auto print:bg-white print:text-black print:p-0 print:block print:overflow-visible print:backdrop-blur-none print:backdrop-filter-none modal-print-container overflow-y-auto w-full h-full">
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
                onClick={() => window.print()}
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
        <div className="fixed inset-0 bg-black/98 backdrop-blur-3xl z-[200] flex items-center justify-center p-4 print:static print:inset-auto print:bg-white print:text-black print:p-0 print:block print:overflow-visible print:backdrop-blur-none print:backdrop-filter-none modal-print-container w-full h-full overflow-y-auto">
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
                onClick={() => window.print()}
                className="bg-[#ff00ff] text-white px-10 py-6 rounded-none font-black text-[10px] uppercase tracking-[0.2em] shadow-xl shadow-[#ff00ff]/20 hover:bg-black relative z-10 transition-colors"
              >
                [IMPRIMIR_PROPOSTA]
              </Button>
            </footer>
          </div>
        </div>
      )}

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

      {isStitchConfigOpen && (
        <div className="fixed inset-0 z-[700] flex items-center justify-center p-6 bg-black/95 backdrop-blur-xl animate-in fade-in duration-300">
           <div className="hud-panel w-full max-w-lg p-10 bg-slate-950 border-cyan-500/40 space-y-8 shadow-[0_0_50px_rgba(6,182,212,0.15)]">
              <div className="space-y-1">
                 <Badge className="bg-cyan-500 text-black font-black uppercase text-[9px]">SÍNTESE_CONFIG</Badge>
                 <h3 className="text-2xl font-black text-white italic uppercase tracking-tighter">PREPARAR_CLONAGEM</h3>
              </div>

              <div className="space-y-6">
                 <div className="space-y-2">
                    <label className="text-[9px] font-black text-slate-500 uppercase">IDENTIFICADOR_PUBLICO (BIBLIOTECA)</label>
                    <Input 
                      value={stitchConfig.name}
                      onChange={(e) => setStitchConfig({ ...stitchConfig, name: e.target.value })}
                      className="bg-black/60 border-cyan-500/20 text-white rounded-none uppercase text-xs h-12 focus:border-cyan-500"
                    />
                 </div>

                 <div className="space-y-2">
                    <label className="text-[9px] font-black text-slate-500 uppercase">ID_UNICO_TEMA (ARQUIVO .TSX)</label>
                    <Input 
                      value={stitchConfig.themeId}
                      onChange={(e) => setStitchConfig({ ...stitchConfig, themeId: e.target.value })}
                      className="bg-black/60 border-cyan-500/20 text-white rounded-none text-xs h-12 font-mono focus:border-cyan-500"
                    />
                    <p className="text-[8px] text-slate-600 font-bold uppercase tracking-widest">* SERÁ CRIADO EM: /templates/{stitchConfig.themeId}.tsx</p>
                 </div>

                 <div className="space-y-2">
                     <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest leading-none">NICHO_ALVO (REGRAS_DE_DESIGN)</label>
                     <select 
                       value={stitchConfig.segment}
                       onChange={(e) => setStitchConfig({ ...stitchConfig, segment: e.target.value })}
                       className="w-full bg-black/60 border border-cyan-500/20 text-white rounded-none h-12 text-[10px] uppercase font-bold px-4 outline-none focus:border-cyan-500"
                     >
                       <option value="energia-solar">☀️ ENERGIA SOLAR</option>
                       <option value="odontologia">🦷 ODONTOLOGIA</option>
                       <option value="mecanica">🛠️ OFICINA MECÂNICA</option>
                       <option value="climatizacao">❄️ AR / REFRIGERAÇÃO</option>
                       <option value="estetica">✨ ESTÉTICA</option>
                       <option value="beleza">💇‍♀️ SALÃO / BELEZA</option>
                       <option value="veterinaria">🐶 PET SHOP / VET</option>
                       <option value="advocacia">⚖️ ADVOCACIA</option>
                       <option value="seguranca">🔐 SEGURANÇA / CFTV</option>
                       <option value="mudancas">🚚 MUDANÇAS / FRETES</option>
                       <option value="limpeza">🧼 HIGIENIZAÇÃO / SOFÁ</option>
                       <option value="chaveiro">🔑 CHAVEIRO 24H</option>
                       <option value="vidracaria">🚿 VIDRAÇARIA</option>
                       <option value="hamburgueria">🍔 HAMBURGUERIA</option>
                       <option value="pizzaria">🍕 PIZZARIA</option>
                       <option value="academia">🏋️‍♀️ ACADEMIA</option>
                       <option value="construcao">🧱 MAT. CONSTRUÇÃO</option>
                       <option value="geral">💼 SERVIÇOS GERAIS</option>
                     </select>
                 </div>
              </div>

              <div className="flex gap-4 pt-4">
                 <Button 
                    className="flex-1 bg-cyan-500 text-black font-black h-16 rounded-none uppercase tracking-widest hover:bg-white transition-colors"
                    onClick={() => handleAutoBuild()}
                 >
                    <Zap className="w-4 h-4 mr-2" /> INICIAR_SÍNTESE_FINAL
                 </Button>
                 <Button 
                    variant="outline"
                    className="px-8 border-white/10 text-slate-400 h-16 rounded-none uppercase text-[10px] font-black hover:bg-white/5"
                    onClick={() => setIsStitchConfigOpen(false)}
                 >
                    CANCELAR
                 </Button>
              </div>
           </div>
        </div>
      )}
      {isPreviewModalOpen && (
        <div className="fixed inset-0 z-[700] flex items-center justify-center p-6 bg-black/95 backdrop-blur-xl animate-in fade-in duration-300">
           <div className="hud-panel w-full max-w-2xl p-10 bg-slate-950 border-cyan-500/40 space-y-8 shadow-[0_0_50px_rgba(6,182,212,0.15)]">
              <div className="space-y-1">
                 <Badge className="bg-cyan-500 text-black font-black uppercase text-[9px]">UPLOADER_v4.0</Badge>
                 <h3 className="text-2xl font-black text-white italic uppercase tracking-tighter">SUBIR_AO_STITCH_CORE (48H)</h3>
                 <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Injete o código gerado pelo motor de IA para criar o link de expiração.</p>
              </div>

              <div className="space-y-4">
                 <textarea 
                   value={previewHtmlInput}
                   onChange={(e) => setPreviewHtmlInput(e.target.value)}
                   className="w-full h-64 bg-black/60 border border-cyan-500/20 text-cyan-400 p-6 font-mono text-[10px] focus:border-cyan-500 outline-none rounded-none"
                   placeholder="Cole o código do site aqui... (Next.js/HTML exportado)"
                 />
                 {previewLink && (
                   <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-black font-mono text-xs break-all">
                     LINK_GERADO: {previewLink}
                   </div>
                 )}
              </div>

              <div className="flex gap-4">
                 <Button 
                    className="flex-1 bg-cyan-500 text-black font-black h-16 rounded-none uppercase tracking-widest hover:bg-white transition-colors"
                    onClick={() => savePreview()}
                 >
                    <Activity className="w-5 h-5 mr-3" /> GERAR_LINK_E_COPIAR_WHATS
                 </Button>
                 <Button 
                    variant="outline"
                    className="px-8 border-white/10 text-slate-400 h-16 rounded-none uppercase text-[10px] font-black hover:bg-white/5"
                    onClick={() => { setIsPreviewModalOpen(false); setPreviewLink(""); }}
                 >
                    FECHAR
                 </Button>
              </div>
           </div>
        </div>
      )}


      <style dangerouslySetInnerHTML={{ __html: `
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
          /* Como a div principal do app já tem print:hidden, 
             aqui limpamos as formatações globais sem aplicar \`visibility: hidden\` no body */
          body {
            background-color: white !important;
            color: black !important;
          }
          .modal-print-container {
            position: absolute !important;
            left: 0 !important;
            top: 0 !important;
            width: 100% !important;
            margin: 0 !important;
            padding: 0 !important;
            background: white !important;
            overflow: visible !important;
            /* Forçar a impressão das cores de fundo */
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          .no-print, .no-print * {
            display: none !important;
          }
        }
      `}} />
    </>
  );
}
