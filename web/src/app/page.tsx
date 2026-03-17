/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect, useCallback } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  Globe, Database, Activity, Target, X, 
  ExternalLink, Trash2, Zap, Sparkles,
  LayoutDashboard, Settings, MapPin, Package, MessageSquare, Send,
  ShieldOff, ShieldAlert, RotateCcw, Plus
} from 'lucide-react';

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
  const [tab, setTab] = useState<'blacklist' | 'quarantine'>('blacklist');

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-xl z-[400] flex items-center justify-center p-4">
      <div className="bg-dark-bg border border-red-500/30 w-full max-w-2xl max-h-[90vh] flex flex-col shadow-[0_0_60px_rgba(239,68,68,0.15)] relative">
        {/* Top bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-red-500/20 bg-red-950/10">
          <div className="flex items-center gap-3">
            <ShieldOff className="w-5 h-5 text-red-500" />
            <div>
              <h2 className="text-base font-black text-red-400 uppercase tracking-widest font-mono">BLACKLIST_MANAGER</h2>
              <p className="text-[9px] text-red-500/50 font-mono uppercase tracking-wider">
                {blacklist.length} tokens bloqueados · {quarantinedLeads.length} na quarentena
              </p>
            </div>
          </div>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center text-slate-600 hover:text-red-400 hover:bg-red-500/10 transition-all">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-white/5">
          {[
            { key: 'blacklist', label: 'LISTA NEGRA', icon: ShieldAlert },
            { key: 'quarantine', label: `QUARENTENA (${quarantinedLeads.length})`, icon: RotateCcw },
          ].map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key as 'blacklist' | 'quarantine')}
              className={`flex-1 flex items-center justify-center gap-2 py-3 text-[10px] font-black uppercase tracking-widest font-mono transition-all ${
                tab === t.key
                  ? 'text-red-400 border-b-2 border-red-500 bg-red-950/10'
                  : 'text-slate-600 hover:text-slate-400'
              }`}
            >
              <t.icon className="w-3 h-3" />
              {t.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {tab === 'blacklist' && (
            <div className="p-6 space-y-4">
              {/* Add new */}
              <div className="flex gap-2">
                <input
                  value={newBlacklistEntry}
                  onChange={(e) => setNewBlacklistEntry(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && onAdd(newBlacklistEntry)}
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
                  <div key={entry} className="flex items-center justify-between px-4 py-2 bg-white/[0.02] border border-white/5 group hover:border-red-500/20 transition-all">
                    <div className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 bg-red-500 flex-shrink-0" />
                      <span className="text-[11px] font-mono text-slate-400 group-hover:text-white transition-colors">{entry}</span>
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

          {tab === 'quarantine' && (
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
                  <div key={i} className="flex items-center justify-between px-4 py-3 bg-white/[0.02] border border-white/5 group hover:border-amber-500/20 transition-all gap-3">
                    <div className="flex-1 min-w-0">
                      <p className="text-[11px] font-bold text-slate-300 truncate">{lead.title || 'Sem título'}</p>
                      <p className="text-[9px] font-mono text-slate-600 truncate mt-0.5">{lead.url || '—'}</p>
                      <span className="inline-block mt-1 text-[8px] font-black uppercase tracking-wider text-amber-500/70 bg-amber-500/10 px-2 py-0.5">
                        {lead.blockedReason || 'Bloqueado'}
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
   const [cidadesList, setCidadesList] = useState<{nome: string}[]>([]);
   const [bairro, setBairro] = useState("");
   const [searchMode, setSearchMode] = useState<'web' | 'maps'>('web');
   const [minReviewsCount, setMinReviewsCount] = useState<number>(10);
   // eslint-disable-next-line @typescript-eslint/no-unused-vars
   const [citySearch, setCitySearch] = useState("");
   
   const [isSearching, setIsSearching] = useState(false);
   const [progress, setProgress] = useState(0);
   const [statusText, setStatusText] = useState("Vessel em Espera...");
   const [leads, setLeads] = useState<any[]>([]);
   // eslint-disable-next-line @typescript-eslint/no-unused-vars
   const [selectedLeadIndex, setSelectedLeadIndex] = useState<number | null>(null);
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
  const [filterMode, setFilterMode] = useState('all'); // all, no-site, no-pixel, no-mobile, low-rating
  const [isAuditModalOpen, setIsAuditModalOpen] = useState(false);
  const [ticketMedio, setTicketMedio] = useState<number>(500);
  const [fluxoMensal, setFluxoMensal] = useState<number>(50);
  const [roiVisibility, setRoiVisibility] = useState(false);
  const [isLovableModalOpen, setIsLovableModalOpen] = useState(false);
  const [lovablePromptText, setLovablePromptText] = useState('');
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const [previewHtmlInput, setPreviewHtmlInput] = useState('');
  const [previewLink, setPreviewLink] = useState('');
  const [activeProjects, setActiveProjects] = useState<any[]>([]);
  const [isProjectSettingsOpen, setIsProjectSettingsOpen] = useState(false);
  const [isManualModalOpen, setIsManualModalOpen] = useState(false);
  const [manualInput, setManualInput] = useState("");
  const [manualProcessing, setManualProcessing] = useState(false);
  const [editingProject, setEditingProject] = useState<any>(null);
  const [projectSettings, setProjectSettings] = useState({
    name: '',
    slug: '',
    whatsapp: '',
    monthlyFee: '',
    liveUrl: ''
  });

  const [templateConfig, setTemplateConfig] = useState({
    sellerName: 'Hacker',
    basePrice: 'R$ 149,00',
    installments: '3',
    installmentValue: 'R$ 49,66',
    demoBaseUrl: 'https://demo.captasites.com/'
  });

  const [selectedTemplateLeadUrl, setSelectedTemplateLeadUrl] = useState<string | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [activeTemplate, setActiveTemplate] = useState<any>(null);

  const calculateLeadScore = useCallback((lead: any) => {
    let score = 30;
    const reasons: string[] = [];
    let temp: 'Frio' | 'Morno' | 'Quente' = 'Morno';

    if (!lead.url || lead.url.includes("google.com")) {
      score += 40;
      temp = 'Quente';
      reasons.push("Ausência de website (Oportunidade Máxima)");
    } else {
      score -= 10;
      reasons.push("Já possui website");
      if (lead.techData?.cms?.toLowerCase().includes('wordpress')) reasons.push("Plataforma WordPress");
      if (lead.techData?.gtm) { score -= 15; reasons.push("Usa Google Tag Manager"); }
      if (lead.techData?.pixel) { score -= 10; reasons.push("Possui Pixel de Rastreamento"); }
      if (lead.techData?.ads) { score -= 10; reasons.push("Investe em anúncios"); }
      if (score < 40) temp = 'Frio';
    }

    const ratingNum = lead.rating ? parseFloat(lead.rating) : 0;
    const reviewsNum = lead.reviewCount ? parseInt(lead.reviewCount) : 0;

    if (ratingNum > 0) {
      if (reviewsNum < 5) {
        score += 15;
        reasons.push(`Nota ${ratingNum} mas com apenas ${reviewsNum} avaliações (pouco confiável)`);
        if (temp === 'Morno') temp = 'Quente';
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
      temperature: temp as 'Frio' | 'Morno' | 'Quente',
      classificationMotivity: reasons.join("; ")
    };
  }, []);
  const [isTemplatePreviewOpen, setIsTemplatePreviewOpen] = useState(false);
  const [whatsappPreviewMessage, setWhatsappPreviewMessage] = useState("");

  // Blacklist Manager
  const DEFAULT_BLACKLIST = [
    'booking.com', 'tripadvisor', 'trivago', 'ifood', 'rappi', 'airbnb',
    'zapimoveis', 'quintoandar', 'vivareal', 'chavesnamao', 'olx', 'mercadolivre',
    'guiamais', 'telelistas', 'hagah', 'facebook.com', 'instagram.com', 'linkedin.com',
    'g1.globo', 'veja.abril', 'hoteis.com', 'decolar', 'kayak', 'youtube.com'
  ];
  const [blacklist, setBlacklist] = useState<string[]>(DEFAULT_BLACKLIST);
  const [quarantinedLeads, setQuarantinedLeads] = useState<any[]>([]);
  const [isBlacklistModalOpen, setIsBlacklistModalOpen] = useState(false);
  const [newBlacklistEntry, setNewBlacklistEntry] = useState('');

  const templatesList = [
    {
      id: 'no-site-demo',
      name: 'Sem Site - Demo Pronta',
      description: 'Curto, direto, qualificatório focando na falta de site.',
      content: `Oi {{nome_lead}}! Aqui é o {{nome_vendedor}}.

Pesquisei "{{nicho}}" em "{{cidade}}" e a {{nome_empresa}} não aparece adequadamente no Google. Isso significa clientes indo pro concorrente.

Como vocês têm uma ótima reputação, criei uma demonstração de como ficaria a presença digital de vocês:
👉 {{link_demo}}

Essa página fica pronta super rápido, otimizada pro celular e pro Google.
💰 Investimento: {{preco}} (ou {{parcelas}}x de {{valor_parcela}})

Como é para uso pessoal, me diz o que acha?`
    },
    {
      id: 'no-site-impact',
      name: 'Sem Site - Impacto Visual',
      description: 'Foco na perda de clientes para a concorrência.',
      content: `{{nome_lead}}, tudo bem? Aqui é o {{nome_vendedor}}.

Vi que a {{nome_empresa}} tem um ótimo serviço, mas quem pesquisa "{{nicho}}" em "{{cidade}}" acaba encontrando seus concorrentes.

Fiz uma análise da presença digital de vocês e montei um projeto de posicionamento pra resolver isso.

Posso te mandar o link da demonstração que fiz pra vocês darem uma olhada? É sem compromisso.
O investimento depois seria de apenas {{preco}}.`
    },
    {
      id: 'follow-up-1',
      name: 'Follow-up Simples',
      description: 'Retomada de contato após envio da demonstração.',
      content: `Oi {{nome_lead}}, conseguiu dar uma olhada na demonstração que te enviei ontem sobre a {{nome_empresa}}?

Estou por aqui, qualquer dúvida sobre o site ou as condições ({{preco}}). Me avisa!`
    }
  ];

  const processTemplatePreview = (template: any) => {
    setActiveTemplate(template);
    const selectedTemplateLead = leads.find((l: any) => l.url === selectedTemplateLeadUrl);

    if (!selectedTemplateLead) {
      setWhatsappPreviewMessage("⚠️ SELECIONE UM LEAD PRIMEIRO PARA VISUALIZAR A INTERPOLAÇÃO DE VARIÁVEIS.");
      setIsTemplatePreviewOpen(true);
      return;
    }

    const leadName = selectedTemplateLead.title.split(' ')[0] || 'Responsável';
    const nichoName = nicho || 'seu segmento';
    const cityName = cidade || 'sua região';
    const linkDemo = `${templateConfig.demoBaseUrl}${selectedTemplateLead.title.toLowerCase().replace(/[^a-z0-9]/g, '-')}`;

    let msg = template.content;
    msg = msg.replace(/\{\{nome_lead\}\}/g, leadName);
    msg = msg.replace(/\{\{nome_vendedor\}\}/g, templateConfig.sellerName);
    msg = msg.replace(/\{\{nome_empresa\}\}/g, selectedTemplateLead.title);
    msg = msg.replace(/\{\{nicho\}\}/g, nichoName);
    msg = msg.replace(/\{\{cidade\}\}/g, cityName);
    msg = msg.replace(/\{\{link_demo\}\}/g, linkDemo);
    msg = msg.replace(/\{\{preco\}\}/g, templateConfig.basePrice);
    msg = msg.replace(/\{\{parcelas\}\}/g, templateConfig.installments);
    msg = msg.replace(/\{\{valor_parcela\}\}/g, templateConfig.installmentValue);

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

    const savedProjects = localStorage.getItem("capta_active_projects");
    if (savedProjects) {
      try {
        setActiveProjects(JSON.parse(savedProjects));
      } catch (e) {
        console.error("Erro ao carregar projetos ativos", e);
      }
    }

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
    setBlacklist(prev => [...prev, clean]);
    setNewBlacklistEntry('');
  };

  const removeFromBlacklist = (entry: string) => {
    setBlacklist(prev => prev.filter(e => e !== entry));
  };

  const recoverLead = (lead: any) => {
    setLeads(prev => [{ ...lead, blockedReason: undefined }, ...prev]);
    setQuarantinedLeads(prev => {
      const updated = prev.filter(q => q.url !== lead.url || q.title !== lead.title);
      localStorage.setItem('capta_quarantine', JSON.stringify(updated));
      return updated;
    });
  };

  const clearQuarantine = () => {
    setQuarantinedLeads([]);
    localStorage.removeItem('capta_quarantine');
  };

  useEffect(() => {
    let active = true;
    if (!estado) {
      setCidadesList([]);
      return;
    }
    const ufTokens: Record<string, number> = {
      'AC': 12, 'AL': 27, 'AP': 16, 'AM': 13, 'BA': 29, 'CE': 23, 'DF': 53, 'ES': 32, 'GO': 52, 'MA': 21,
      'MT': 51, 'MS': 50, 'MG': 31, 'PA': 15, 'PB': 25, 'PR': 41, 'PE': 26, 'PI': 22, 'RJ': 33, 'RN': 24,
      'RS': 43, 'RO': 11, 'RR': 14, 'SC': 42, 'SP': 35, 'SE': 28, 'TO': 17
    };
    fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufTokens[estado]}/municipios`)
      .then(res => res.json())
      .then(data => { if (active) setCidadesList(data); })
      .catch(err => console.error("IBGE Error", err));
    return () => { active = false; };
  }, [estado]);

  const handleEstadoChange = (val: string) => {
    setEstado(val || "");
    setCidade("");
    setCitySearch("");
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
          if (!u) return '';
          try {
            return new URL(u).hostname.replace(/^www\./, '');
          } catch {
            return u.replace(/^https?:\/\//, '').replace(/^www\./, '').split('/')[0].toLowerCase();
          }
        };

        const rawLeads = msg.leads || [];
        setLeads((prev) => {
          const blocked: any[] = [];
          const validNewLeads = rawLeads.filter((nl: any) => {
              // 1. Remove "Patrocinado" (Check Title AND Snippet)
              const isSponsor = (nl.title && nl.title.toLowerCase().includes('patrocinado')) || 
                                (nl.snippet && nl.snippet.toLowerCase().includes('patrocinado'));
              if (isSponsor) {
                blocked.push({ ...nl, blockedReason: 'Anúncio / Patrocinado' });
                return false;
              }

              // 2. Filtro Blacklist
              const matchedToken = blacklist.find(token =>
                (nl.url && nl.url.toLowerCase().includes(token)) ||
                (nl.title && nl.title.toLowerCase().includes(token))
              );
              if (matchedToken) {
                blocked.push({ ...nl, blockedReason: `Blacklist: ${matchedToken}` });
                return false;
              }

               // 2.5 Filtro de Avaliações Mínimas (Autoridadae)
               const reviewsNum = nl.reviewCount ? parseInt(nl.reviewCount) : 0;
               if (searchMode === 'maps' && reviewsNum < minReviewsCount) {
                 blocked.push({ ...nl, blockedReason: `Baixa Autoridade (<${minReviewsCount} reviews)` });
                 return false;
               }

              // 3. Desduplicação Inteligente
              const existsAlready = prev.some((p: any) => {
                const sameUrl = (sanitizeUrl(p.url) && sanitizeUrl(nl.url) && sanitizeUrl(p.url) === sanitizeUrl(nl.url));
                const sameTitle = (p.title && nl.title && p.title.toLowerCase() === nl.title.toLowerCase());
                return sameUrl || sameTitle;
              });
              
              if (existsAlready) return false;

              const score = calculateLeadScore(nl);
              if (score.score < 15) {
                blocked.push(nl);
                return false;
              }
              
              return true;
          }).map((nl: any) => {
            const classification = calculateLeadScore(nl);
            return { ...nl, ...classification, status: 'NOVO', analysisStatus: nl.phone ? 'COMPLETO' : 'PENDENTE' };
          });

          if (blocked.length > 0) {
            setQuarantinedLeads(prevQ => {
              const merged = [...blocked, ...prevQ].slice(0, 200);
              localStorage.setItem('capta_quarantine', JSON.stringify(merged));
              return merged;
            });
          }

          if (validNewLeads.length === 0 && rawLeads.length > 0) {
            setStatusText(`ALVOS REJEITADOS::${rawLeads.length} (AUTORIDADE_BAIXA)`);
          } else {
            setStatusText(`VARREDURA FINALIZADA::${validNewLeads.length} ALVOS.`);
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
              phone: (msg.analysis.extraPhones && msg.analysis.extraPhones.length > 0) ? msg.analysis.extraPhones[0] : (msg.analysis.phone || l.phone),
              socials: {
                instagram: msg.analysis.socials?.instagram || l.socials?.instagram,
                facebook: msg.analysis.socials?.facebook || l.socials?.facebook
              },
              perceptions: msg.analysis.perceptions || l.perceptions,
              analysisStatus: 'COMPLETO',
              techData: {
                cms: msg.analysis.platform || l.techData?.cms,
                pixel: msg.analysis.hasPixel || l.techData?.pixel,
                gtm: msg.analysis.hasGTM || l.techData?.gtm,
                ads: msg.analysis.hasAds || l.techData?.ads,
                responsive: msg.analysis.isResponsive || l.techData?.responsive
              }
            };
            const classification = calculateLeadScore(updated);
            return { ...updated, ...classification };
          };

          setLeads(prev => prev.map(l => (l.url === msg.url || l.url === selectedLeadDetails.url) ? enrich(l) : l));
          if (selectedLeadDetails && (selectedLeadDetails.url === msg.url || selectedLeadDetails.url === msg.originalUrl)) {
             setSelectedLeadDetails((prev: any) => enrich(prev));
          }
        }
      } else if (msg.action === "MANUAL_LEAD_ADDED") {
        setLeads(prev => {
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
    return () => window.removeEventListener("CAPTASAAS_UPDATE", handleExtensionUpdate);
  }, [selectedLeadDetails, blacklist, calculateLeadScore, searchMode, minReviewsCount, quarantinedLeads.length]);

  // ORQUESTRADOR DE ENRIQUECIMENTO AUTOMÁTICO (Expert Agent Engine)
  useEffect(() => {
    if (isSearching || isAnalyzing) return; // Não sobrecarregar se já estiver fazendo algo
    
    // Encontra o próximo lead sem telefone que ainda não foi marcado como "ANALISANDO"
    const nextToEnrich = leads.find(l => !l.phone && l.analysisStatus === 'PENDENTE');
    
    if (nextToEnrich) {
      console.log("Auto-Enriching next lead:", nextToEnrich.title);
      
      // Marca como "ANALISANDO" imediatamente para não repetir
      setLeads(prev => prev.map(l => l.id === nextToEnrich.id ? { ...l, analysisStatus: 'ANALISANDO' } : l));
      
      // Dispara análise silenciosa
      window.dispatchEvent(new CustomEvent("CAPTASAAS_START_ANALYSIS", { 
        detail: { url: nextToEnrich.url, mapsUrl: nextToEnrich.mapsUrl, silent: true } 
      }));
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
        } else if (url.includes("google.com/maps") || url.includes("goo.gl/maps")) {
          title = "Lead no Google Maps";
        } else {
          try {
            const domain = new URL(url).hostname.replace('www.', '');
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

      const isMaps = url.includes("google.com/maps") || url.includes("goo.gl/maps");

      const newLead = {
        id: crypto.randomUUID(),
        title: title,
        url: url || (input.startsWith('http') ? input : `https://google.com/search?q=${encodeURIComponent(input)}`),
        mapsUrl: isMaps ? url : null,
        phone: "",
        rating: "N/A",
        reviewCount: "0",
        address: isMaps ? "Analisando localização..." : "Informação manual",
        status: 'novo',
        perceptions: ["Captação Manual", "Aguardando ANÁLISE Profunda"],
        socials: {}
      };

      setLeads(prev => [newLead, ...prev]);
      setManualProcessing(false);
      setIsManualModalOpen(false);
      setManualInput("");
      setStatusText("    Lead Manual Adicionado!");

      openLeadDetails(newLead);
    }, 1500);
  };

  const handleStartSearch = () => {
    if (!nicho || !cidade) {
       console.warn("Dashboard: Nicho ou Cidade faltando.");
       return;
    }

    setIsModalOpen(false);
    setIsSearching(true);
    setProgress(5);
    setStatusText(searchMode === 'maps' ? `Iniciando Varredura EXCLUSIVA no bairro ${bairro || 'Geral'}...` : "Acionando Varredura Multi-Engine...");
    setLeads([]);

    // Dork dinâmica baseada no modo
    let dork = "";
    if (searchMode === 'maps') {
      // Forçar URL direta do Maps para evitar fallback para o Google Search
      dork = `https://www.google.com/maps/search/${encodeURIComponent(nicho + " " + (bairro ? bairro + " " : "") + cidade)}`;
    } else {
      dork = `"${nicho}" "${cidade}" (site:instagram.com OR site:facebook.com OR site:google.com/maps) -inurl:post -inurl:p/`;
    }

    // Backup para a extensão
    localStorage.setItem("capta_dork", dork);
    localStorage.setItem("capta_nicho", nicho);
    localStorage.setItem("capta_cidade", cidade);
    localStorage.setItem("capta_bairro", bairro);
    localStorage.setItem("capta_search_mode", searchMode);

    console.log(`Dashboard: Disparando ${searchMode} Search`, dork);

    window.dispatchEvent(new CustomEvent("CAPTASAAS_START_SEARCH", {
      detail: { 
        dork, 
        pages: searchMode === 'maps' ? 10 : 5, 
        autoAnalyze: true, 
        nicho, 
        cidade, 
        bairro,
        mode: searchMode,
        engine: searchMode === 'maps' ? 'maps' : 'google',
        mapsExclusive: searchMode === 'maps',
        minReviews: minReviewsCount
      }
    }));
  };

  const generateLovablePrompt = () => {
    if (!selectedLeadDetails) return "";

    const tipo = nicho || "Local Business";
    const nome = selectedLeadDetails.title;
    const local = selectedLeadDetails.address || `${cidade}, ${estado}`;
    const telefone = selectedLeadDetails.phone || 'N/A';
    const rating = selectedLeadDetails.rating || null;
    const reviews = selectedLeadDetails.reviewCount || null;
    const plataforma = leadAnalysis?.platform || 'unknown platform';
    const problemas = leadAnalysis?.perceptions || [];
    const instagram = selectedLeadDetails.socials?.instagram || null;
    const facebook = selectedLeadDetails.socials?.facebook || null;
    const lostRev = (fluxoMensal * 0.3 * ticketMedio).toLocaleString('pt-BR');

    const problemBlock = problemas.length > 0
      ? problemas.map((p: string) => `  - ${p}`).join('\n')
      : '  - No specific issues detected, focus on full modernization';

    const socialBlock = [
      instagram ? `  - Instagram: ${instagram}` : null,
      facebook  ? `  - Facebook: ${facebook}` : null,
    ].filter(Boolean).join('\n') || '  - No social profiles detected (add placeholder links)';

    const ratingBlock = rating
      ? `${rating} stars based on ${reviews} Google reviews`
      : 'No public rating (build trust through testimonials and certifications)';

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
3. **Credibilidade Imediata**: Trust signals nos primeiros 3 segundos (Nota ${rating || '4.9'}, Anos de experiência, ícones de certificação).
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
    setStatusText('    Prompt Lovable gerado!');
    setTimeout(() => setStatusText('Dashboard Ativo.'), 4000);
    return prompt;
  };

  const handleDeleteLead = (url: string) => {
    setLeads(prev => prev.filter(l => l.url !== url));
  };

  const savePreview = () => {
    if (!previewHtmlInput.trim() || !selectedLeadDetails) return;
    const id = crypto.randomUUID().split('-')[0];
    const now = Date.now();
    const entry = {
      id,
      html: previewHtmlInput.trim(),
      leadName: selectedLeadDetails.title,
      leadPhone: selectedLeadDetails.phone || '',
      createdAt: now,
      expiresAt: now + 48 * 60 * 60 * 1000,
    };
    const existing = JSON.parse(localStorage.getItem('capta_previews') || '[]');
    localStorage.setItem('capta_previews', JSON.stringify([...existing, entry]));
    const link = `${window.location.origin}/preview/${id}`;
    setPreviewLink(link);
    const msg = `Oi ${selectedLeadDetails.title}!       \n\nPreparei uma prévia exclusiva do seu novo site digital.\n\n       ${link}\n\n       Disponível por apenas 48 horas. Depois expira!\n\nMe conta o que achou?     `;
    navigator.clipboard.writeText(msg);
    setStatusText('       Mensagem de venda copiada!');
    setTimeout(() => setStatusText('Dashboard Ativo.'), 3000);
  };



  const handleSendZap = (lead: any) => {
    if (!lead || !lead.phone) return;
    const cleanPhone = lead.phone.replace(/\D/g, "");
    const message = generatedMessage || `Ol   ${lead.title}, vi que vocês trabalham com ${nicho || "serviçãos"} em ${cidade}. Tenho uma proposta para aumentar sua visibilidade digital. Podemos conversar?`;
    const url = `https://wa.me/55${cleanPhone}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  const openLeadDetails = (lead: any) => {
    setLeadAnalysis(null);
    setIsAnalyzing(false);
    setSelectedLeadDetails(lead);
    setIsDetailsModalOpen(true);
    setGeneratedMessage("");
    setLandingPageUrl(`https://lovable.dev/?prompt=${encodeURIComponent(nicho + " " + lead.title)}`);
  };

  const generateAIPitch = (type: 'venda' | 'recall' | 'apresentacao') => {
    if (!selectedLeadDetails) return;

    const empresa = selectedLeadDetails.title;
    const local = cidade || "sua região";
    const nichoEmpresa = nicho || "negócio";
    void nichoEmpresa; // suppress unused-vars: valor reservado para templates futuros

    let template = "";
    const lostRevenue = Math.floor(fluxoMensal * 0.3 * ticketMedio); // 30% loss estimation

    if (type === 'venda') {
      template = `Olá! Vi seu perfil no Google em ${local}.        Reparei que sem um atendimento automático, vocês podem estar perdendo cerca de R$ ${lostRevenue.toLocaleString('pt-BR')} todos os meses em vendas perdidas por demora. Fiz um dossiê técnico da ${empresa}. Toparia ver?`;
    } else if (type === 'recall') {
      template = `Oi pessoal da ${empresa}! Sou o especialista que analisou sua performance em ${local}. O mercado está aquecendo e vi que vocês estão sem Pixel de Rastreamento. Isso está "jogando dinheiro fora" em anúncios. Vamos retomar o papo do site novo?`;
    } else {
      template = `Olá! Notei que a ${empresa} ainda não usa rob  s de atendimento. Calculei que isso gera uma perda de faturamento em torno de R$ ${lostRevenue.toLocaleString('pt-BR')}/mes. Gostaria de receber o PDF da auditoria que fiz de vocês gratuitamente?`;
    }

    setGeneratedMessage(template);
    setStatusText("Pitch Gerado!");
    setTimeout(() => setStatusText("Dashboard Ativo."), 2000);
  };

  const filteredLeads = leads.filter(lead => {
    if (filterMode === 'no-site') return !lead.url || lead.url.includes("google.com");
    if (filterMode === 'no-pixel') return lead.perceptions?.some((p: string) => p.toLowerCase().includes("sem pixels"));
    if (filterMode === 'no-mobile') return lead.perceptions?.some((p: string) => p.toLowerCase().includes("não é amigável para celular"));
    if (filterMode === 'low-rating') return lead.rating && parseFloat(lead.rating) < 4.0;
    return true;
  });

  const updateLeadStatus = (leadUrl: string, newStatus: string) => {
    setLeads(prev => prev.map(l => l.url === leadUrl ? { ...l, status: newStatus } : l));
  };

  const convertToActive = (lead: any) => {
    if (!lead) return;

    const id = crypto.randomUUID().split('-')[0];
    const slug = lead.title.toLowerCase().replace(/[^a-z0-9]/g, '-');
    const newProject = {
      id,
      name: lead.title,
      slug,
      status: 'active',
      renewal: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString('pt-BR').substring(0, 5), // +30 dias
      type: 'Recorrência',
      monthlyFee: '149,00',
      liveUrl: getSubdomainUrl(slug), // Link multi-tenant dinâmico
      htmlContent: previewHtmlInput || '', // Usa o último HTML colado se houver
      leadInfo: lead
    };

    const updatedProjects = [...activeProjects, newProject];
    setActiveProjects(updatedProjects);
    localStorage.setItem('capta_active_projects', JSON.stringify(updatedProjects));

    setCurrentView('active-sites');
    setIsDetailsModalOpen(false);
    setStatusText(`       ${lead.title} ativado em producao!`);
    setTimeout(() => setStatusText('Dashboard Ativo.'), 3000);
  };

  const deleteActiveProject = (id: string) => {
    const updated = activeProjects.filter(p => p.id !== id);
    setActiveProjects(updated);
    localStorage.setItem('capta_active_projects', JSON.stringify(updated));
    setStatusText('Projeto removido.');
  };

  const toggleProjectStatus = (id: string) => {
    const updated = activeProjects.map(p => {
      if (p.id === id) {
        return { ...p, status: p.status === 'active' ? 'suspended' : 'active' };
      }
      return p;
    });
    setActiveProjects(updated);
    localStorage.setItem('capta_active_projects', JSON.stringify(updated));
  };

  const openProjectSettings = (project: any) => {
    setEditingProject(project);
    setProjectSettings({
      name: project.name,
      slug: project.slug,
      whatsapp: project.leadInfo?.phone || '',
      monthlyFee: project.monthlyFee || '149,00',
      liveUrl: project.liveUrl || ''
    });
    setIsProjectSettingsOpen(true);
  };

  const saveProjectSettings = () => {
    if (!editingProject) return;
    const updated = activeProjects.map(p => {
      if (p.id === editingProject.id) {
        return {
          ...p,
          name: projectSettings.name,
          slug: projectSettings.slug,
          monthlyFee: projectSettings.monthlyFee,
          liveUrl: projectSettings.liveUrl,
          leadInfo: { ...p.leadInfo, phone: projectSettings.whatsapp }
        };
      }
      return p;
    });
    setActiveProjects(updated);
    localStorage.setItem('capta_active_projects', JSON.stringify(updated));
    setIsProjectSettingsOpen(false);
    setStatusText('       Configurações salvas!');
    setTimeout(() => setStatusText('Dashboard Ativo.'), 3000);
  };

  /**
   * MULTI-TENANT ENGINE INTEGRATION
   * Gera o link baseado no host atual (localhost ou produção)
   */
  const getSubdomainUrl = (slug: string) => {
    if (typeof window === 'undefined') return `localhost:3000`;
    const host = window.location.host;
    // Se for localhost:3000 -> villa-bistro.localhost:3000
    // Se for captasites.com.br -> villa-bistro.captasites.com.br
    return `${slug}.${host}`;
  };

  const generateBundle = (project: any) => {
    setStatusText(`       Preparando bundle para ${project.name}...`);
    setTimeout(() => {
      setStatusText('       Bundle gerado e pronto para download!');
      setTimeout(() => setStatusText('Dashboard Ativo.'), 3000);
    }, 1500);
  };



  const startLeadAnalysis = useCallback(() => {
    if (!selectedLeadDetails) return;
    setIsAnalyzing(true);
    window.dispatchEvent(new CustomEvent("CAPTASAAS_START_ANALYSIS", {
      detail: { url: selectedLeadDetails.url }
    }));
  }, [selectedLeadDetails]);

  const startMapsAnalysis = useCallback(() => {
    if (!selectedLeadDetails?.mapsUrl) return;
    setIsAnalyzing(true);
    window.dispatchEvent(new CustomEvent("CAPTASAAS_START_ANALYSIS", {
      detail: { url: selectedLeadDetails.mapsUrl }
    }));
  }, [selectedLeadDetails]);

  // Gatilho automático de análise ao abrir um lead
  useEffect(() => {
    if (isDetailsModalOpen && selectedLeadDetails && !leadAnalysis && !isAnalyzing) {

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
          { id: "dashboard", icon: LayoutDashboard, label: "SYS_DASH" },
          { id: 'templates', icon: MessageSquare, label: 'TEMPLATES' },
          { id: 'active-sites', icon: Globe, label: 'NET_SITES' },
          { id: 'plans', icon: Package, label: 'BIZ_MODELS' },
          { id: "crm", icon: Database, label: "CORE_LEADS" },
          { id: "settings", icon: Settings, label: "CONFIG" },
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => setCurrentView(item.id)}
            className={`w-12 h-12 flex items-center justify-center transition-all group relative border ${currentView === item.id ? 'bg-cyan-500/20 border-cyan-400 text-cyan-400 shadow-[0_0_15px_rgba(0,243,255,0.4)]' : 'border-white/5 text-slate-700 hover:text-cyan-400 hover:border-cyan-400/50 hover:bg-cyan-900/10'}`}
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
              {quarantinedLeads.length > 9 ? '9+' : quarantinedLeads.length}
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
                  CAPTA_SYS<span className="text-pink-500 font-hacker">_v2.0</span>
                </h1>
                <span className="text-[8px] font-mono text-cyan-400/60 uppercase racking-[0.4em]">90s_ENCRYPTION_ACTIVE</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-6">
             <div className="hidden md:flex items-center gap-4 text-[9px] font-black tracking-widest uppercase text-cyan-400/40 font-mono">
               <span className="text-pink-500">SYS_STATUS:</span>
               <span className="flex items-center gap-2">
                 <span className={`w-2 h-2 ${isSearching ? 'bg-pink-500 animate-[ping_1.5s_infinite]' : 'bg-cyan-500'} shadow-[0_0_8px_currentColor]`} />
                 {isSearching ? "UPLOADING_DATA..." : "TERMINAL_IDLE"}
               </span>
            </div>
             <div className="flex gap-4">
               <Button onClick={() => setIsManualModalOpen(true)}
                 className="bg-transparent text-cyan-400 border border-cyan-400/30 hover:bg-cyan-400/10 hover:border-cyan-400 rounded-none px-6 h-10 font-mono font-black text-[10px] tracking-widest transition-all"
               >
                 CMD_MANUAL
               </Button>
               <Button onClick={() => setIsModalOpen(true)}
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
                  <h2 className="font-hacker text-5xl font-black text-cyan-400 uppercase tracking-tighter hacker-glow animate-[text-flicker_3s_infinite]">TERMINAL_SCANNER</h2>
                  <div className="flex items-center gap-4">
                     <Badge className="bg-pink-500 text-black font-black font-mono rounded-none px-4 py-1 text-[9px] tracking-widest uppercase shadow-[0_0_10px_rgba(255,0,255,0.4)]">LOCAL_HACK_ENGINE_V1.9</Badge>
                     <Badge className="bg-transparent text-cyan-400 font-black font-mono rounded-none px-4 py-1 text-[9px] tracking-widest border border-cyan-400/40 uppercase shadow-[inset_0_0_5px_rgba(0,243,255,0.2)]">[{leads.length}] SECTORS_IN_CACHE</Badge>
                  </div>
                </div>

                {/*         FILTROS DE ESTRAT  GIA (TABBED CONSOLE) */}
                <div className="flex flex-wrap gap-1 bg-cyan-950/20 p-1 border border-cyan-400/20">
                  {[
                    { id: 'all', label: 'SYS_ALL', icon: Globe },
                    { id: 'no-site', label: 'MISSING_WEB', icon: X },
                    { id: 'no-pixel', label: 'NO_TRACKING', icon: Activity },
                    { id: 'no-mobile', label: 'LEGACY_UI', icon: LayoutDashboard },
                    { id: 'low-rating', label: 'LOW_REPUTATION', icon: Target },
                  ].map((f) => (
                    <button
                      key={f.id}
                      onClick={() => setFilterMode(f.id)}
                      className={`h-9 px-4 text-[8px] font-black tracking-widest transition-all uppercase font-mono flex items-center gap-2 ${filterMode === f.id ? 'bg-cyan-500 text-black shadow-[0_0_10px_rgba(0,243,255,0.4)]' : 'text-cyan-400/50 hover:text-cyan-400 hover:bg-cyan-500/5'}`}
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
                  { label: "MEMORY_CACHE_LEADS", value: leads.length, icon: Target, suffix: "OBJ" },
                  { label: "BUFFER_SYSTRON_SPEED", value: isSearching ? "98.4" : "0.0", icon: Activity, suffix: "MHZ" },
                  { label: "ENCRYPTED_ZONES", value: leads.length > 0 ? "12" : "0", icon: Globe, suffix: "LOC" },
                ].map((stat, i) => (
                  <div key={i} className="p-8 bg-[#0a0a0a] hacker-border group hover:bg-cyan-500/5 transition-all cursor-crosshair relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-16 h-16 bg-cyan-500/5 rotate-45 translate-x-8 -translate-y-8 border-b border-l border-cyan-400 opacity-20"></div>
                    <p className="text-[9px] font-black tracking-[0.3em] text-cyan-400/40 uppercase mb-4 flex items-center gap-2 font-mono">
                      <span className="w-1 h-1 bg-pink-500"></span> {stat.label}
                    </p>
                    <div className="flex items-baseline gap-2">
                      <h3 className="font-hacker text-6xl font-black text-cyan-400 tracking-tighter hacker-glow">{stat.value}</h3>
                      <span className="text-[10px] font-black text-pink-500 uppercase tracking-widest font-mono">{stat.suffix}</span>
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
                        <Activity className="w-3 h-3 animate-pulse" /> RADAR_OP_CONSOLE
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-8 space-y-6">
                      <div className="space-y-3">
                        <div className="flex justify-between text-[9px] font-black text-cyan-400 uppercase font-mono tracking-widest">
                          <span className="animate-pulse">&gt; {statusText}</span>
                          <span className="text-pink-500">{progress}%</span>
                        </div>
                        <div className="h-6 bg-black border border-cyan-400/30 p-1 relative overflow-hidden">
                           <div className="absolute inset-0 bg-[repeating-linear-gradient(90deg,transparent,transparent_4px,rgba(0,243,255,0.1)_4px,rgba(0,243,255,0.1)_5px)]"></div>
                           <div className="h-full bg-cyan-500 transition-all duration-500 shadow-[0_0_15px_#00f3ff]" style={{ width: `${progress}%` }} />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-cyan-950/20 p-4 border-l-4 border-pink-500">
                          <p className="text-[8px] font-black text-cyan-400/50 uppercase mb-1 font-mono tracking-widest">LAST_TARGET_RECOGNITION</p>
                          <p className="font-black text-cyan-400 uppercase tracking-tighter font-hacker text-xl leading-none">{nicho || "NODATA"}</p>
                        </div>
                        <div className="bg-rose-950/20 p-4 border-l-4 border-rose-500">
                          <p className="text-[8px] font-black text-rose-400/50 uppercase mb-1 font-mono tracking-widest">QUARANTINED_TARGETS</p>
                          <p className="font-black text-rose-400 uppercase tracking-tighter font-hacker text-xl leading-none">{quarantinedLeads.length}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {leads.length > 0 && (
                    <Card className="bg-[#06b6d4] text-black border-none rounded-none skew-x-[-2deg] transition-all">
                      <CardHeader>
                        <CardTitle className="font-outfit text-lg font-black italic uppercase">PITCH_RÁPIDO</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <p className="text-xs font-bold leading-relaxed">Sugerimos focar no nicho de <span className="underline">{nicho}</span> na região de <span className="underline">{cidade}</span>. O score médio de oportunidade    alto.</p>
                        <Button className="w-full bg-black text-pink-500 border border-black hover:bg-black/80 font-mono font-black rounded-none transition-all uppercase text-[9px] h-11 tracking-[0.2em] shadow-[0_4px_0_rgba(0,0,0,0.3)] active:translate-y-1 active:shadow-none">START_HACK_PROSPECTION</Button>
                      </CardContent>
                    </Card>
                  )}
                </div>

                {/*      TABELA DE LEADS (HACKER TERMINAL) */}
                <div className="xl:col-span-8 space-y-6">
                  <div className="flex items-center justify-between border-b border-cyan-400/20 pb-4">
                    <h3 className="font-hacker text-2xl font-black text-cyan-400 uppercase tracking-widest hacker-glow">SCAN_RESULTS_STREAM ({filteredLeads.length})</h3>
                    <Button variant="ghost" className="text-[9px] text-pink-500 font-black hover:text-white font-mono tracking-widest" onClick={() => { localStorage.removeItem("capta_leads_cache"); setLeads([]); }}>WIPE_MEMORY_CACHE</Button>
                  </div>
                  <div className="bg-[#0a0a0a] border border-cyan-400/20 p-1">
                    <Table>
                      <TableHeader className="bg-cyan-950/20">
                        <TableRow className="border-cyan-400/10 hover:bg-transparent text-[8px] font-black uppercase tracking-[0.3em] text-cyan-400/60 font-mono">
                          <TableHead className="h-10">HEX_IDENTIFIER</TableHead>
                          <TableHead className="h-10">OP_INDEX</TableHead>
                          <TableHead className="h-10">COMMS_LINK</TableHead>
                          <TableHead className="h-10 text-right">EXE_CMDS</TableHead>
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
                                <span className="text-xs font-black text-cyan-400 uppercase font-mono truncate max-w-[200px] group-hover:hacker-glow">{lead.title}</span>
                                <span className="text-[9px] text-cyan-700 font-mono truncate max-w-[250px]">{lead.snippet}</span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <Badge className={`text-[8px] font-black uppercase tracking-widest rounded-none border ${
                                  (lead.temperature || 'Morno') === 'Quente' ? 'bg-rose-500/10 text-rose-500 border-rose-500/20 shadow-[0_0_10px_rgba(244,63,94,0.2)]' :
                                  (lead.temperature || 'Morno') === 'Frio' ? 'bg-cyan-500/10 text-cyan-400 border-cyan-400/20' :
                                  'bg-amber-500/10 text-amber-500 border-amber-500/20'
                                }`}>
                                  {lead.temperature || 'Morno'}
                                </Badge>
                                <div className="flex flex-col gap-0.5 ml-2">
                                  <div className="w-16 h-1 bg-white/5 relative overflow-hidden">
                                     <div className={`h-full transition-all ${lead.score > 70 ? 'bg-emerald-500 shadow-[0_0_10px_#10b981]' : (lead.score > 40 ? 'bg-amber-500' : 'bg-rose-500')}`} style={{ width: `${lead.score || 0}%` }} />
                                  </div>
                                  <span className="text-[10px] font-mono text-white/40">{lead.score || 0}%_OP</span>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              {lead.phone ? (
                                <Badge className="bg-cyan-500/10 text-cyan-400 border border-cyan-400/20 rounded-none text-[8px] font-black font-mono">{lead.phone}</Badge>
                              ) : lead.analysisStatus === 'ANALISANDO' ? (
                                <div className="flex items-center gap-2">
                                   <div className="w-2 h-2 bg-pink-500 animate-pulse rounded-full shadow-[0_0_8px_#ec4899]" />
                                   <span className="text-[8px] text-pink-500 font-black animate-pulse font-mono uppercase tracking-widest">SCANNING_DATA...</span>
                                </div>
                              ) : lead.email ? (
                                <Badge className="bg-pink-500/10 text-pink-400 border border-pink-500/20 rounded-none text-[8px] font-black font-mono">{lead.email}</Badge>
                              ) : (
                                <span className="text-[8px] text-cyan-900 font-black tracking-widest font-mono">WAITING_ENRICHMENT</span>
                              )}
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button onClick={(e) => { e.stopPropagation(); openLeadDetails(lead); }} className="w-8 h-8 flex items-center justify-center border border-cyan-400/30 text-cyan-400 hover:bg-cyan-500 hover:text-black transition-all" title="READ_DOSSIER"><Activity className="w-3.5 h-3.5" /></button>
                                <button onClick={(e) => { e.stopPropagation(); setSelectedLeadIndex(idx); }} className="w-8 h-8 flex items-center justify-center border border-pink-400/30 text-pink-400 hover:bg-pink-500 hover:text-black transition-all" title="MARK_TARGET"><Sparkles className="w-3.5 h-3.5" /></button>
                                <button onClick={(e) => { e.stopPropagation(); window.open(lead.url, "_blank"); }} className="w-8 h-8 flex items-center justify-center border border-cyan-400/30 text-cyan-400 hover:bg-cyan-400 hover:text-black transition-all" title="OPEN_GATEWAY"><ExternalLink className="w-3.5 h-3.5" /></button>
                                <button onClick={(e) => { e.stopPropagation(); handleDeleteLead(lead.url); }} className="w-8 h-8 flex items-center justify-center border border-pink-600/30 text-pink-600 hover:bg-pink-600 hover:text-white transition-all" title="PURGE_RECORD"><Trash2 className="w-3.5 h-3.5" /></button>
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
          ) : currentView === 'active-sites' ? (
            <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <section className="grid grid-cols-1 md:grid-cols-4 gap-0 border border-white/10 divide-x divide-white/10 bg-dark-bg/20">
                {[
                  { label: "SITES_EM_PRODUÇÃO", value: activeProjects.length, icon: Globe, trend: "ON", suffix: "live" },
                  { label: "FATURAMENTO_MENSAL", value: (activeProjects.filter(p => p.status === 'active').length * 149).toLocaleString('pt-BR'), icon: Zap, trend: "MRR", suffix: "reais" },
                  { label: "RENOVACOES_PENDENTES", value: "0", icon: Activity, trend: "AÇÃO", suffix: "leads" },
                  { label: "UPTIME_SISTEMA", value: "99.9", icon: Sparkles, trend: "MAX", suffix: "%" },
                ].map((stat, i) => (
                  <div key={i} className="p-8 group hover:bg-[#06b6d4]/5 transition-colors">
                    <p className="text-[10px] font-black tracking-widest text-slate-500 uppercase mb-4">{stat.label}</p>
                    <div className="flex items-baseline gap-2">
                      <h3 className="font-hacker text-4xl font-black text-white tracking-tighter">{stat.value}</h3>
                      <span className="text-xs font-bold text-slate-600 uppercase tracking-widest">{stat.suffix}</span>
                    </div>
                  </div>
                ))}
              </section>

              <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                {activeProjects.length > 0 ? activeProjects.map((site, i) => (
                  <Card key={i} className="bg-dark-bg/40 border-white/5 rounded-none group hover:border-[#06b6d4]/30 transition-all">
                    <CardHeader className="p-6 border-b border-white/5">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-sm font-black italic text-white uppercase truncate mb-1">{site.name}</CardTitle>
                          <p className="text-[10px] text-slate-500 font-mono tracking-tight">{site.slug}.captasites.com.br</p>
                        </div>
                        <Badge
                          onClick={() => toggleProjectStatus(site.id)}
                          className={`${site.status === 'active' ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' : 'bg-rose-500/20 text-rose-400 border-rose-500/30'} rounded-none text-[8px] font-black cursor-pointer hover:opacity-80 transition-opacity`}
                        >
                          {site.status.toUpperCase()}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="p-6 space-y-4">
                      <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest">
                        <span className="text-slate-500">Proxima Renovacao:</span>
                        <span className="text-white">{site.renewal}</span>
                      </div>
                      <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest">
                        <span className="text-slate-500">Plano:</span>
                        <span className="text-white">R$ {site.monthlyFee}/mes</span>
                      </div>
                    </CardContent>
                    <CardFooter className="p-4 border-t border-white/5 bg-black/20 grid grid-cols-4 gap-2">
                      <Button onClick={() => openProjectSettings(site)} className="h-9 bg-white/5 hover:bg-white/10 text-white rounded-none p-0" title="Configurar Site">
                        <Settings className="w-3.5 h-3.5" />
                      </Button>
                      <Button onClick={() => site.liveUrl && window.open(site.liveUrl.startsWith('http') ? site.liveUrl : `https://${site.liveUrl}`, '_blank')}
                        disabled={!site.liveUrl}
                        className={`h-9 rounded-none p-0 ${site.liveUrl ? 'bg-white/5 hover:bg-white/10 text-white' : 'bg-white/5 text-slate-700 cursor-not-allowed'}`}
                        title={site.liveUrl ? "Ver Site Ao Vivo" : "Nenhum link configurado"}
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </Button>
                      <Button onClick={() => generateBundle(site)} className="h-9 bg-amber-500/10 hover:bg-amber-500 text-amber-500 hover:text-black rounded-none p-0 transition-all" title="Gerar Bundle ZIP">
                        <Database className="w-3.5 h-3.5" />
                      </Button>
                      <Button onClick={() => deleteActiveProject(site.id)} className="h-9 bg-rose-500/10 hover:bg-rose-500 text-rose-500 hover:text-black rounded-none p-0 transition-all" title="Remover Projeto">
                        <Trash2 className="w-3.5 h-3.5" />
                      </Button>
                    </CardFooter>
                  </Card>
                )) : (
                  <div className="col-span-3 h-[200px] flex flex-col items-center justify-center border border-dashed border-white/10 text-slate-500 uppercase font-black italic text-[10px] gap-3">
                    <Globe className="w-8 h-8 opacity-10" />
                    Nenhum site em producao ativa
                  </div>
                )}
              </div>
            </div>
          ) : currentView === 'plans' ? (
            <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 px-6">
               <div className="flex flex-col gap-4">
                 <h2 className="font-hacker text-5xl font-black text-cyan-400 uppercase tracking-tighter hacker-glow">MONETIZATION_STRAT_v4.0</h2>
                 <p className="text-pink-500 font-black uppercase text-[10px] tracking-[0.5em] font-mono">MODEL_DE_NEGOCIO_RECORRENTE_V1</p>
               </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
                 {/* SETUP */}
                 <Card className="bg-[#0a0a0a] border-2 border-cyan-400 rounded-none relative overflow-hidden group shadow-[0_0_40px_rgba(6,182,212,0.15)]">
                   <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-30 transition-opacity">
                     <Zap className="w-32 h-32 text-cyan-400" />
                   </div>
                   <CardHeader className="p-8 border-b border-cyan-400/20 bg-cyan-500/5">
                     <Badge className="bg-cyan-500 text-black font-black uppercase rounded-none self-start mb-6 font-mono tracking-widest">GATEWAY_SETUP</Badge>
                     <CardTitle className="font-hacker text-4xl font-black text-white uppercase tracking-tighter italic">STARTUP_NODE</CardTitle>
                     <p className="text-cyan-700 text-[9px] font-black uppercase mt-2 font-mono tracking-[0.2em]">Ativação de Presença Digital</p>
                   </CardHeader>
                   <CardContent className="p-8 space-y-8">
                     <div className="flex items-baseline gap-2">
                       <span className="text-cyan-900 text-xs font-black uppercase tracking-widest font-mono">BRL</span>
                       <h3 className="text-6xl font-black text-cyan-400 italic tracking-tighter font-hacker hacker-glow">800</h3>
                       <span className="text-pink-500 text-[10px] font-black uppercase tracking-widest font-mono">/ONE_TIME</span>
                     </div>
                     <ul className="space-y-5 pt-8 border-t border-cyan-400/10">
                       {[
                         "Site em Alta Performance",
                         "Otimização SEO Local (Google)",
                         "Integração WhatsApp Direct",
                         "Certificado SSL Integrado",
                         "Copywriting Persuasivo"
                       ].map((item, i) => (
                         <li key={i} className="flex items-center gap-4 text-[9px] font-black text-cyan-100 uppercase tracking-widest font-mono">
                           <div className="w-1.5 h-1.5 bg-cyan-400 shadow-[0_0_5px_#00f3ff]"></div>
                           {item}
                         </li>
                       ))}
                     </ul>
                   </CardContent>
                 </Card>

                 {/* RECURRING */}
                 <Card className="bg-[#0a0a0a] border border-cyan-400/20 rounded-none relative overflow-hidden group hover:border-amber-500 transition-all shadow-xl">
                    <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-amber-500/5 rotate-12"></div>
                   <CardHeader className="p-8 border-b border-cyan-400/10 bg-amber-500/5">
                     <Badge className="bg-amber-500 text-black font-black uppercase rounded-none self-start mb-6 font-mono tracking-widest">RECURRENCE_LOOP</Badge>
                     <CardTitle className="font-hacker text-4xl font-black text-white uppercase tracking-tighter italic">LINK_MAINTENANCE</CardTitle>
                     <p className="text-amber-700 text-[9px] font-black uppercase mt-2 font-mono tracking-[0.2em]">Hospedagem & Radar Ativo</p>
                   </CardHeader>
                   <CardContent className="p-8 space-y-8">
                     <div className="flex items-baseline gap-2">
                       <span className="text-cyan-900 text-xs font-black uppercase tracking-widest font-mono">BRL</span>
                       <h3 className="text-6xl font-black text-amber-500 italic tracking-tighter font-hacker shadow-amber-500/20 drop-shadow-md">149</h3>
                       <span className="text-amber-500 text-[10px] font-black uppercase tracking-widest font-mono">/MONTHLY</span>
                     </div>
                     <ul className="space-y-5 pt-8 border-t border-cyan-400/10">
                       {[
                         "Hospedagem Vercel Edge",
                         "MONITORAMENTO_24_7",
                         "ATUALIZACOES_SEGURANÇA",
                         "SUPORTE_PRIORITARIO",
                         "INTERFACE_HACKER_TERMINAL"
                       ].map((item, i) => (
                         <li key={i} className="flex items-center gap-4 text-[9px] font-black text-amber-100 uppercase tracking-widest font-mono">
                           <Activity className="w-3 h-3 text-amber-500" />
                           {item}
                         </li>
                       ))}
                     </ul>
                   </CardContent>
                 </Card>

                 {/* SEASONAL */}
                 <Card className="bg-[#0a0a0a] border border-cyan-400/20 rounded-none relative overflow-hidden group hover:border-pink-500 transition-all">
                   <CardHeader className="p-8 border-b border-cyan-400/10 bg-pink-500/5">
                     <Badge className="bg-pink-500 text-black font-black uppercase rounded-none self-start mb-6 font-mono tracking-widest">EXT_MODULE</Badge>
                     <CardTitle className="font-hacker text-4xl font-black text-white uppercase tracking-tighter italic">SEASON_VOX</CardTitle>
                     <p className="text-pink-700 text-[9px] font-black uppercase mt-2 font-mono tracking-[0.2em]">ESTÉTICAS_FESTIVAS</p>
                   </CardHeader>
                   <CardContent className="p-8 space-y-8">
                     <div className="flex items-baseline gap-2">
                       <span className="text-cyan-900 text-xs font-black uppercase tracking-widest font-mono">+ BRL</span>
                       <h3 className="text-6xl font-black text-pink-500 italic tracking-tighter font-hacker hacker-glow">100</h3>
                       <span className="text-pink-500 text-[10px] font-black uppercase tracking-widest font-mono">/EVENT</span>
                     </div>
                     <p className="text-[10px] text-cyan-700 font-mono uppercase border-t border-cyan-400/10 pt-6 leading-relaxed">TROCA_TOTAL_ESTÉTICA_NATAL_BLACKFRIDAY_RETORNO_AUTOMÁTICO</p>
                   </CardContent>
                 </Card>

                 {/* AI BOT */}
                 <Card className="bg-[#0a0a0a] border border-emerald-500/30 rounded-none relative overflow-hidden group hover:border-emerald-500 transition-all">
                   <CardHeader className="p-8 border-b border-emerald-500/10 bg-emerald-500/5">
                     <Badge className="bg-emerald-500 text-black font-black uppercase rounded-none self-start mb-6 font-mono tracking-widest">AI_CORE_LICENSE</Badge>
                     <CardTitle className="font-hacker text-4xl font-black text-white uppercase tracking-tighter italic">CHATSAVASSI_IA</CardTitle>
                     <p className="text-emerald-700 text-[9px] font-black uppercase mt-2 font-mono tracking-[0.2em]">MANUTENÇÃO_E_LICENÇA_IA</p>
                   </CardHeader>
                   <CardContent className="p-8 space-y-8">
                     <div className="flex items-baseline gap-2">
                       <span className="text-cyan-900 text-xs font-black uppercase tracking-widest font-mono">BRL</span>
                       <h3 className="text-6xl font-black text-emerald-500 italic tracking-tighter font-hacker hacker-glow">150</h3>
                       <span className="text-emerald-500 text-[10px] font-black uppercase tracking-widest font-mono">/MONTHLY</span>
                     </div>
                     <p className="text-[10px] text-cyan-700 font-mono uppercase border-t border-cyan-400/10 pt-6 leading-relaxed">QUALIFICAÇÃO_DE_LEADS_24H_VIA_NEURAL_PROCESSING</p>
                   </CardContent>
                 </Card>

                 {/* MIGRATION */}
                 <Card className="bg-[#0a0a0a] border border-cyan-400/20 rounded-none relative overflow-hidden group hover:border-cyan-400 transition-all">
                   <CardHeader className="p-8 border-b border-cyan-400/10 bg-cyan-500/5">
                     <Badge className="bg-cyan-400 text-black font-black uppercase rounded-none self-start mb-6 font-mono tracking-widest">LEGACY_PATCH</Badge>
                     <CardTitle className="font-hacker text-4xl font-black text-white uppercase tracking-tighter italic">MIGRATION_TURBO</CardTitle>
                     <p className="text-cyan-700 text-[9px] font-black uppercase mt-2 font-mono tracking-[0.2em]">Upgrade de Sites Antigos</p>
                   </CardHeader>
                   <CardContent className="p-8 space-y-8">
                     <div className="flex items-baseline gap-2">
                       <span className="text-cyan-900 text-xs font-black uppercase tracking-widest font-mono">BRL</span>
                       <h3 className="text-6xl font-black text-cyan-400 italic tracking-tighter font-hacker">400</h3>
                       <span className="text-pink-500 text-[10px] font-black uppercase tracking-widest font-mono">/ONE_TIME</span>
                     </div>
                     <p className="text-[10px] text-cyan-700 font-mono uppercase border-t border-cyan-400/10 pt-6 leading-relaxed">Refactoring de infraestrutura legada para arquitetura de alta performance CAPTA.</p>
                   </CardContent>
                 </Card>

                 {/* ADVANCED CHATBOT */}
                 <Card className="bg-[#0a0a0a] border-2 border-emerald-500 rounded-none relative overflow-hidden group shadow-[0_0_40px_rgba(16,185,129,0.15)]">
                   <CardHeader className="p-8 border-b border-emerald-500/20 bg-emerald-500/10">
                     <Badge className="bg-emerald-500 text-black font-black uppercase rounded-none self-start mb-6 font-mono tracking-widest">AI_ELITE_OPS</Badge>
                     <CardTitle className="font-hacker text-4xl font-black text-white uppercase tracking-tighter italic">AI_BOT_MASTER</CardTitle>
                     <p className="text-emerald-700 text-[9px] font-black uppercase mt-2 font-mono tracking-[0.2em]">AUTOMAÇÃO_NIVEL_ELITE</p>
                   </CardHeader>
                   <CardContent className="p-8 space-y-8">
                     <div className="flex items-baseline gap-2">
                       <span className="text-cyan-900 text-xs font-black uppercase tracking-widest font-mono">BRL</span>
                       <h3 className="text-6xl font-black text-white italic tracking-tighter font-hacker shadow-emerald-500/50 drop-shadow-lg">2.000</h3>
                       <span className="text-emerald-500 text-[10px] font-black uppercase tracking-widest font-mono">/SETUP</span>
                     </div>
                     <p className="text-[10px] text-cyan-500 font-mono uppercase border-t border-emerald-500/20 pt-6 leading-relaxed">DEPLOYMENT_CRM_NEURAL_AUTO_CLOSING</p>
                   </CardContent>
                 </Card>
              </div>
            </div>
) : currentView === 'templates' ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 h-[calc(100vh-250px)] animate-in fade-in slide-in-from-bottom-4 px-6 pb-20">
              {/* Painel Esquerdo: Seletor de Leads & Configuração */}
              <div className="lg:col-span-1 bg-[#0a0a0a]/80 border border-cyan-400/10 p-6 flex flex-col gap-6 hacker-grid-bg">
                <h3 className="font-hacker font-black italic text-[14px] text-cyan-400 uppercase tracking-[0.3em] border-b border-cyan-400/20 pb-4 flex items-center gap-3">
                  <Database className="w-4 h-4" /> LEAD_TARGETING
                </h3>

                <div className="space-y-4 flex-1">
                  <div className="space-y-2">
                    <label className="text-[10px] text-cyan-400/60 uppercase font-mono tracking-widest pl-1">Selecione o Alvo</label>
                    <div className="relative">
                      <select
                        value={selectedTemplateLeadUrl || ""}
                        onChange={(e) => setSelectedTemplateLeadUrl(e.target.value)}
                        className="w-full bg-dark-bg border border-cyan-400/20 rounded-none h-12 px-3 text-[11px] font-black uppercase text-cyan-400 italic appearance-none cursor-pointer focus:border-cyan-400 focus:outline-none transition-colors group/select"
                      >
                        <option value="" disabled className="bg-dark-bg text-cyan-800">&gt;&gt;&gt; ESCOLHER ALVO_</option>
                        {leads.map(l => (
                          <option key={l.url} value={l.url} className="bg-dark-bg text-cyan-400">
                            {l.title} {l.phone ? "(WHATSAPP_OK)" : "(NO_CONTACT)"}
                          </option>
                        ))}
                      </select>
                      <Target className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-cyan-400/50 pointer-events-none" />
                    </div>
                    {selectedTemplateLeadUrl && !leads.find((l) => l.url === selectedTemplateLeadUrl)?.phone && (
                        <p className="text-[9px] text-pink-500 uppercase tracking-tighter mt-1 font-black">
                          ⚠️ AVISO: WHATSAPP NÃO DETECTADO NESTE DOMÍNIO
                        </p>
                    )}
                  </div>

                  <div className="space-y-4 pt-6 mt-6 border-t border-cyan-400/10">
                    <label className="text-[10px] text-cyan-400/60 uppercase font-mono tracking-widest pl-1">VARIÁVEIS GLOBAIS (SYS_CONFIG)</label>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <span className="text-[8px] text-cyan-600 uppercase font-black">NOME VENDEDOR</span>
                        <Input
                          value={templateConfig.sellerName}
                          onChange={(e) => setTemplateConfig(prev => ({ ...prev, sellerName: e.target.value }))}
                          className="bg-black/40 border-cyan-400/20 rounded-none h-8 text-[10px] font-mono text-cyan-400"
                        />
                      </div>
                      <div className="space-y-1">
                        <span className="text-[8px] text-cyan-600 uppercase font-black">PREÇO BASE</span>
                        <Input
                          value={templateConfig.basePrice}
                          onChange={(e) => setTemplateConfig(prev => ({ ...prev, basePrice: e.target.value }))}
                          className="bg-black/40 border-cyan-400/20 rounded-none h-8 text-[10px] font-mono text-cyan-400"
                        />
                      </div>
                      <div className="space-y-1">
                        <span className="text-[8px] text-cyan-600 uppercase font-black">PARCELAS</span>
                        <Input
                          value={templateConfig.installments}
                          onChange={(e) => setTemplateConfig(prev => ({ ...prev, installments: e.target.value }))}
                          className="bg-black/40 border-cyan-400/20 rounded-none h-8 text-[10px] font-mono text-cyan-400"
                        />
                      </div>
                      <div className="space-y-1">
                        <span className="text-[8px] text-cyan-600 uppercase font-black">VALOR PARCELA</span>
                        <Input
                          value={templateConfig.installmentValue}
                          onChange={(e) => setTemplateConfig(prev => ({ ...prev, installmentValue: e.target.value }))}
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
                        <h4 className="text-[12px] font-black text-cyan-400 uppercase font-mono mb-2 group-hover:hacker-glow">{tpl.name}</h4>
                        <p className="text-[10px] text-cyan-600 mb-6 italic">{tpl.description}</p>
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
) : currentView === 'crm' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 h-[calc(100vh-250px)] animate-in fade-in slide-in-from-bottom-4 px-6 pb-20">
              {['NOVO', 'CONTATADO', 'PROPOSTA', 'FECHADO'].map((status) => (
                <div key={status} className="flex flex-col gap-6 bg-[#0a0a0a]/80 border border-cyan-400/10 p-2 rounded-none group hover:border-cyan-400/30 transition-all hacker-grid-bg">
                  <h4 className="font-hacker font-black italic text-[12px] text-cyan-400 uppercase tracking-[0.3em] border-b border-cyan-400/20 pb-4 mb-2 flex items-center justify-between px-4">
                    {status}_PHASE
                    <span className="text-[10px] bg-cyan-500 text-black px-3 py-0.5 rounded-none font-mono font-black">
                      {leads.filter(l => (l.status || 'NOVO') === status).length}
                    </span>
                  </h4>
                  <div className="flex-1 overflow-y-auto space-y-4 custom-scrollbar px-2">
                    {leads.filter(l => (l.status || 'NOVO') === status).map((lead, idx) => (
                      <div
                        key={idx}
                        onClick={() => openLeadDetails(lead)}
                        className="bg-dark-bg border border-cyan-400/10 p-5 hover:border-cyan-400/40 transition-all cursor-crosshair relative group/card shadow-lg hover:shadow-cyan-500/5"
                      >
                        <div className="text-[11px] font-black text-cyan-400 uppercase font-mono truncate pr-4 group-hover/card:hacker-glow">{lead.title}</div>
                        <div className="text-[9px] text-cyan-900 mt-2 truncate font-black uppercase font-mono tracking-tighter">{lead.address || "LOCATION_OFFLINE"}</div>

                        <div className="flex items-center justify-between mt-6 pt-4 border-t border-cyan-400/10">
                          <div className={`text-[9px] font-black px-3 py-1 rounded-none font-mono ${lead.score > 70 ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-400/20 shadow-[0_0_10px_rgba(6,182,212,0.1)]' : (lead.score > 40 ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20' : 'bg-pink-500/10 text-pink-500 border border-pink-500/20')}`}>
                            SCORE::{lead.score}
                          </div>
                          <button onClick={(e) => {
                              e.stopPropagation();
                              const nextStatus = status === 'NOVO' ? 'CONTATADO' : status === 'CONTATADO' ? 'PROPOSTA' : status === 'PROPOSTA' ? 'FECHADO' : 'NOVO';
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
          ) : (
            <div className="h-[60vh] flex flex-col items-center justify-center border-2 border-dashed border-white/5 rounded-none">
              <Database className="w-16 h-16 text-slate-800 mb-6" />
              <h2 className="font-outfit text-2xl font-black italic text-white uppercase tracking-widest">MÓDULO Externo</h2>
              <p className="text-xs font-bold text-slate-500 mt-2 uppercase tracking-tighter">CONEXÃO pendente com módulo de {currentView === 'campaigns' ? 'CAMPANHAS_ATIVAS' : 'CONFIGURAÇÃO_SISTEMA'}.</p>
              <Button variant="outline" className="mt-8 rounded-none border-white/10 text-white font-bold text-[10px] tracking-widest" onClick={() => setCurrentView("dashboard")}>RETORNAR_AO_DASHBOARD</Button>
            </div>
          )}
        </div>
      </div>

      {isDetailsModalOpen && selectedLeadDetails && (
        <div className="fixed inset-0 bg-[#020617]/90 backdrop-blur-3xl z-150 flex items-center justify-center p-4">
          <div className="bg-[#0f172a] border border-white/10 w-full max-w-6xl h-[90vh] flex flex-col relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-1 bg-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.5)]" />

             <div className="p-8 border-b border-white/5 flex justify-between items-center bg-black/20">
                <div className="flex items-center gap-6">
                   <div className="w-16 h-16 bg-white/5 flex items-center justify-center border border-white/10 group overflow-hidden relative">
                      <Globe className="w-8 h-8 text-[#06b6d4] group-hover:scale-110 transition-transform" />
                      <div className="absolute inset-0 bg-[#06b6d4]/5 animate-pulse" />
                   </div>
                   <div>
                      <h2 className="font-outfit text-3xl font-black italic text-white uppercase tracking-tighter leading-none">{selectedLeadDetails.title}</h2>
                          <div className="flex items-center gap-4 mt-2">
                              <Badge className={`text-[10px] font-black uppercase rounded-none px-3 border ${
                                (selectedLeadDetails.temperature || 'Morno') === 'Quente' ? 'bg-rose-500/10 text-rose-500 border-rose-500/20' :
                                (selectedLeadDetails.temperature || 'Morno') === 'Frio' ? 'bg-cyan-500/10 text-cyan-400 border-cyan-400/20' :
                                'bg-amber-500/10 text-amber-500 border-amber-500/20'
                              }`}>
                                {selectedLeadDetails.temperature || 'Morno'}
                              </Badge>
                              <div className="flex items-center gap-1">
                                  {selectedLeadDetails.rating ? (
                                     <>
                                       <Sparkles className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                                       <span className="text-[10px] font-bold text-white ml-1">
                                         {selectedLeadDetails.rating} ({selectedLeadDetails.reviewCount || 'N/A'} AVALIAÇÕES)
                                       </span>
                                     </>
                                  ) : (
                                     <span className="text-[9px] text-slate-500 font-bold uppercase tracking-tighter">Sem Rating Pública</span>
                                  )}
                              </div>
                              <div className="flex items-center gap-2">
                                 <Target className="w-3 h-3 text-[#06b6d4]" />
                                 <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{cidade}, {estado}</span>
                              </div>
                           </div>
                   </div>
                </div>
                <button onClick={() => setIsDetailsModalOpen(false)} className="w-12 h-12 flex items-center justify-center border border-white/10 text-slate-500 hover:text-white hover:bg-white/5 transition-all">
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
                               <span className="text-white italic truncate max-w-[150px]">{selectedLeadDetails.url.includes("google.com") ? "Google Profile" : "Direto (URL)"}</span>
                               {selectedLeadDetails.mapsUrl && (
                                 <button onClick={() => window.open(selectedLeadDetails.mapsUrl, "_blank")} className="text-yellow-500 hover:text-white" title="Ver Perfil no Maps"><MapPin className="w-3 h-3" /></button>
                               )}
                               <button onClick={() => window.open(selectedLeadDetails.url, "_blank")} className="text-[#06b6d4] hover:text-white" title="Abrir Site"><ExternalLink className="w-3 h-3" /></button>
                            </div>
                         </div>
                          <div className="flex flex-col">
                             <span className="text-[10px] text-slate-600 uppercase">Plataforma</span>
                             <span className={`italic uppercase text-[10px] tracking-widest ${leadAnalysis ? 'text-[#06b6d4]' : 'text-slate-500'}`}>
                                {isAnalyzing ? "DETECTANDO..." : (leadAnalysis?.platform || "Aguardando...")}
                             </span>
                          </div>
                         <div className="flex flex-col">
                            <span className="text-[10px] text-slate-600 uppercase">Score Mobile</span>
                            <span className={`italic uppercase text-[10px] tracking-widest ${leadAnalysis ? (leadAnalysis.score < 50 ? 'text-rose-500' : 'text-emerald-500') : 'text-slate-500'}`}>
                               {leadAnalysis ? `${leadAnalysis.score}/100` : "Indefinido"}
                            </span>
                         </div>
                         <div className="flex flex-col">
                            <span className="text-[10px] text-slate-600 uppercase">Site / DOMÍNIO</span>
                            <span className={`italic uppercase text-[10px] tracking-widest ${selectedLeadDetails.url && !selectedLeadDetails.url.includes("google.com") ? 'text-emerald-400' : 'text-rose-500'}`}>
                               {selectedLeadDetails.url && !selectedLeadDetails.url.includes("google.com") ? "DETERMINADO" : "AUSENTE"}
                            </span>
                         </div>
                         <div className="flex flex-col">
                            <span className="text-[10px] text-slate-600 uppercase">WhatsApp / Celular</span>
                            <span className={`italic uppercase text-[10px] tracking-widest ${selectedLeadDetails.phone ? 'text-emerald-400' : 'text-slate-500'}`}>
                               {selectedLeadDetails.phone ? selectedLeadDetails.phone : "NÃO_DETECTADO"}
                            </span>
                         </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 mt-6">
                         <div className="flex flex-col">
                            <span className="text-[10px] text-slate-600 uppercase">Social Score</span>
                            <span className="text-white italic uppercase text-[10px] tracking-widest">
                               {(selectedLeadDetails.socials?.instagram || selectedLeadDetails.socials?.facebook) ? "PRESENÇA_ALTA" : "FRACA"}
                            </span>
                         </div>
                         <div className="flex flex-col">
                            <span className="text-[10px] text-slate-600 uppercase">Maps Overall</span>
                            <div className="flex items-center gap-2">
                               <span className="text-emerald-400 italic uppercase text-[10px] tracking-widest">
                                  {selectedLeadDetails.rating ? `${selectedLeadDetails.rating}     (${selectedLeadDetails.reviewCount || 0})` : "SEM_DADOS"}
                               </span>
                               {selectedLeadDetails.mapsUrl && (
                                  <div className="flex items-center gap-2">
                                     <button onClick={() => window.open(selectedLeadDetails.mapsUrl, "_blank")} className="text-slate-500 hover:text-white text-[9px] font-black uppercase italic underline decoration-[#06b6d4]">VER_NO_MAPS</button>
                                     <button onClick={startMapsAnalysis} className="bg-[#06b6d4]/10 text-[#06b6d4] px-1 hover:bg-[#06b6d4] hover:text-black transition-all text-[8px] font-black uppercase tracking-tighter border border-[#06b6d4]/20">SINCRONIZAR_MAPS</button>
                                  </div>
                               )}
                            </div>
                         </div>
                      </div>

                       {selectedLeadDetails.classificationMotivity && (
                        <div className="mt-8 bg-black/40 border-l-4 border-cyan-500 p-5 group hover:bg-cyan-500/3 transition-all">
                           <div className="flex items-center gap-3 mb-2">
                              <ShieldAlert className="w-4 h-4 text-cyan-500 animate-pulse" />
                              <span className="text-[11px] font-black text-white uppercase tracking-[0.2em]">Motivo da classificaç&atilde;o</span>
                           </div>
                           <p className="text-[12px] text-slate-300 font-medium leading-relaxed italic pr-4">
                              {selectedLeadDetails.classificationMotivity}
                           </p>
                        </div>
                       )}

                       {leadAnalysis?.perceptions && (
                        <div className="mt-6 pt-6 border-t border-white/5">
                           <span className="text-[11px] text-[#06b6d4] font-black uppercase tracking-[0.2em] block mb-4">        Pontos Cr&iacute;ticos Detectados</span>
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
                          {["NOVO", "CONTATADO", "PROPOSTA", "FECHADO"].map(status => (
                              <button 
                                 key={status} 
                                 onClick={() => {
                                   updateLeadStatus(selectedLeadDetails.url, status);
                                   setSelectedLeadDetails((prev: Record<string, unknown>) => ({ ...prev, status }));
                                 }}
                                 className={`h-10 px-4 text-[10px] font-black italic tracking-widest border border-white/10 hover:bg-[#06b6d4] hover:text-black transition-all ${(selectedLeadDetails.status || "NOVO") === status ? 'bg-[#06b6d4] text-black border-[#06b6d4]' : 'text-slate-500'}`}
                              >
                                {status}
                             </button>
                          ))}
                       </div>

                      {(selectedLeadDetails.status === 'FECHADO' || selectedLeadDetails.status === 'PROPOSTA') && (
                        <div className="mt-4 pt-4 border-t border-white/10 animate-in fade-in zoom-in duration-300">
                           <Button onClick={() => convertToActive(selectedLeadDetails)}
                              className="w-full h-14 bg-emerald-500 hover:bg-white text-black font-black italic tracking-[0.2em] transition-all flex items-center justify-center gap-3 rounded-none shadow-[0_0_30px_rgba(16,185,129,0.3)]"
                           >
                              <Zap className="w-5 h-5 fill-current" />
                              ATIVAR_SITE_EM_PRODUÇÃO
                           </Button>
                           <p className="text-[9px] text-center text-emerald-500 font-bold uppercase tracking-widest mt-2">Pronto para iniciar faturamento recorrente</p>
                        </div>
                      )}
                   </section>
                </div>

                {/* Coluna Direita: Gerador de PressKit */}
                <div className="col-span-12 lg:col-span-5 space-y-8">
                   <section className="bg-black/40 border border-[#06b6d4]/20 p-6 rounded-none border-t-4 border-t-[#06b6d4]">
                      <h3 className="text-[11px] font-bold text-[#06b6d4] uppercase tracking-[0.2em] mb-4">Gerar PressKit de Venda</h3>
                      <div className="space-y-4">
                         <p className="text-[10px] text-slate-500 italic">Copie o prompt estruturado para o Lovable ou Switch abaixo:</p>
                         <Button onClick={generateLovablePrompt}
                           className="w-full h-12 bg-white text-black font-black italic tracking-widest hover:bg-[#06b6d4] hover:text-black transition-all"
                         >
                           GERAR_PROMPT_LOVABLE_GPT
                         </Button>
                         <Button onClick={() => setIsAuditModalOpen(true)}
                            className="w-full h-12 bg-[#fbce07] text-black font-black italic tracking-widest hover:bg-white hover:text-black transition-all border-none"
                         >
                            GERAR_DOSSIÊ_AUDITORIA_V2
                         </Button>
                         <button onClick={() => {
                              generateLovablePrompt();
                              setTimeout(() => window.open('https://stitch.withgoogle.com', '_blank'), 600);
                            }}
                            className="w-full h-10 bg-gradient-to-r from-[#fbce07] to-[#f59e0b] text-black font-black italic text-[9px] uppercase tracking-widest hover:opacity-90 transition-all flex items-center justify-center gap-2"
                         >
                            <Sparkles className="w-3.5 h-3.5 fill-current" />
                            GOOGLE_STITCH_MCP
                         </button>
                         <Button onClick={() => setIsPreviewModalOpen(true)}
                            className="w-full h-10 bg-black border border-[#06b6d4]/40 text-[#06b6d4] font-black italic text-[9px] uppercase tracking-widest hover:bg-[#06b6d4]/10 transition-all flex items-center justify-center gap-2"
                         >
                            <Activity className="w-3.5 h-3.5" />
                            SUBIR_PREVIEW_48H
                         </Button>
                      </div>
                   </section>

                   <section className="bg-black/20 border border-white/5 p-6 rounded-none">
                      <h3 className="text-[11px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-4">Gatilhos de Mensagem (Whats)</h3>
                      <div className="space-y-3">
                         <div className="grid grid-cols-2 gap-2">
                            <Button onClick={() => generateAIPitch('venda')}
                              className="h-10 bg-white/5 border border-white/10 text-white font-bold text-[9px] uppercase italic tracking-tighter hover:bg-emerald-500 hover:text-black"
                            >
                               Chamada_Venda
                            </Button>
                            <Button onClick={() => generateAIPitch('recall')}
                              className="h-10 bg-white/5 border border-white/10 text-white font-bold text-[9px] uppercase italic tracking-tighter hover:bg-[#06b6d4] hover:text-black"
                            >
                               Chamada_Recall
                            </Button>
                            <Button onClick={() => generateAIPitch('apresentacao')}
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
                                 <Button onClick={() => handleSendZap(selectedLeadDetails)} className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white font-black tracking-widest h-12 flex items-center justify-center gap-2 uppercase italic text-[10px]">
                                    <Zap className="w-4 h-4" /> Enviar WhatsApp
                                 </Button>
                                 <Button variant="outline" onClick={() => navigator.clipboard.writeText(generatedMessage)} className="w-12 h-12 border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all">
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
                <button onClick={() => setIsProjectSettingsOpen(false)} className="text-slate-500 hover:text-white transition-colors"><X className="w-5 h-5" /></button>
              </div>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest pl-1">Nome do Cliente/Site</label>
                  <Input 
                    value={projectSettings.name}
                    onChange={(e) => setProjectSettings(prev => ({ ...prev, name: e.target.value }))}
                    className="bg-black/40 border-white/10 rounded-none h-12 text-xs font-bold text-white italic uppercase placeholder:text-slate-700"
                    placeholder="Ex: Clínica Sorriso"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest pl-1">Subdomínio (slug)</label>
                  <div className="relative">
                    <Input 
                      value={projectSettings.slug}
                      onChange={(e) => setProjectSettings(prev => ({ ...prev, slug: e.target.value.toLowerCase().replace(/[^a-z0-9]/g, '-') }))}
                      className="bg-black/40 border-white/10 rounded-none h-12 text-xs font-bold text-white italic pr-32"
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-slate-600 font-black italic">.captasites.com</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest pl-1">WhatsApp Destino</label>
                    <Input 
                      value={projectSettings.whatsapp}
                      onChange={(e) => setProjectSettings(prev => ({ ...prev, whatsapp: e.target.value }))}
                      className="bg-black/40 border-white/10 rounded-none h-12 text-xs font-bold text-white"
                      placeholder="55..."
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest pl-1">Mensalidade (R$)</label>
                    <Input 
                      value={projectSettings.monthlyFee}
                      onChange={(e) => setProjectSettings(prev => ({ ...prev, monthlyFee: e.target.value }))}
                      className="bg-black/40 border-white/10 rounded-none h-12 text-xs font-bold text-white"
                      placeholder="149,00"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                  <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest pl-1">URL de Produção (Vercel/Stitch)</label>
                  <Input 
                    value={projectSettings.liveUrl}
                    onChange={(e) => setProjectSettings(prev => ({ ...prev, liveUrl: e.target.value }))}
                    className="bg-black/40 border-white/10 rounded-none h-12 text-xs font-bold text-[#06b6d4] italic placeholder:text-slate-800"
                  />
                  <p className="text-[8px] text-slate-600 font-bold uppercase italic mt-1">Este link será aberto ao clicar em &quot;Ver Site&quot;</p>
                </div>

              <div className="pt-4 border-t border-white/5">
                <Button onClick={saveProjectSettings}
                  className="w-full h-12 bg-[#06b6d4] hover:bg-white text-black font-black italic tracking-widest transition-all rounded-none"
                >
                  SALVAR_ALTERAÇÕES
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/*         MODAL DE MISSÃO */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-[#020617]/95 backdrop-blur-xl z-[100] flex items-center justify-center p-4">
          <Card className="bg-[#0f172a] border-white/10 rounded-none shadow-2xl w-full max-w-xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-[#06b6d4]" />
            <CardHeader className="p-10 border-b border-white/5">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="font-outfit text-3xl font-black italic text-white uppercase tracking-tighter">INICIALIZAR_MISSÃO</CardTitle>
                </div>
                <button onClick={() => setIsModalOpen(false)} className="text-slate-500 hover:text-white"><X className="w-5 h-5" /></button>
              </div>
            </CardHeader>
            <CardContent className="p-10 space-y-8">
                <div className="grid grid-cols-2 gap-4">
                  {["NACIONAL", "GLOBAL"].map(item => (
                    <button 
                      key={item}
                      onClick={() => setMercado(item.toLowerCase())}
                      className={`h-12 font-black text-xs border-2 transition-all ${mercado === item.toLowerCase() ? 'bg-white text-black border-white' : 'bg-transparent border-white/10 text-slate-500 hover:text-white'}`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
                <div className="space-y-4">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                    <span className="w-1 h-1 bg-[#06b6d4]"></span> NICHO_DO_ALVO
                  </label>
                  <select 
                    value={nicho} 
                    onChange={(e) => setNicho(e.target.value)}
                    className="w-full bg-black/60 border-2 border-white/10 h-14 px-6 text-white font-black italic uppercase tracking-widest appearance-none focus:border-[#06b6d4] outline-none transition-all cursor-pointer"
                    style={{ backgroundImage: 'linear-gradient(45deg, transparent 50%, #06b6d4 50%), linear-gradient(135deg, #06b6d4 50%, transparent 50%)', backgroundPosition: 'calc(100% - 20px) calc(1em + 10px), calc(100% - 15px) calc(1em + 10px)', backgroundSize: '5px 5px, 5px 5px', backgroundRepeat: 'no-repeat' }}
                  >
                    <option value="" className="bg-[#0f172a]">SELECIONAR_NICHO</option>
                    <option value="Psicólogo" className="bg-[#0f172a]">Psicólogo</option>
                    <option value="Dentista" className="bg-[#0f172a]">Dentista</option>
                    <option value="Nutricionista" className="bg-[#0f172a]">Nutricionista</option>
                    <option value="Advogado" className="bg-[#0f172a]">Advogado</option>
                    <option value="Terapeuta" className="bg-[#0f172a]">Terapeuta</option>
                    <option value="Clínica ESTÉTICA" className="bg-[#0f172a]">Clínica ESTÉTICA</option>
                    <option value="Pet Shop" className="bg-[#0f172a]">Pet Shop</option>
                    <option value="Barbearia" className="bg-[#0f172a]">Barbearia / SALÃO</option>
                    <option value="Contabilidade" className="bg-[#0f172a]">Contabilidade</option>
                    <option value="IMOBILIÁRIA" className="bg-[#0f172a]">IMOBILIÁRIA</option>
                    <option value="Academia" className="bg-[#0f172a]">Academia / Personal</option>
                    <option value="Oficina MECÂNICA" className="bg-[#0f172a]">Oficina MECÂNICA</option>
                    <option value="Restaurante" className="bg-[#0f172a]">Restaurante / Gastronomia</option>
                    <option value="Hotelaria" className="bg-[#0f172a]">Hotelaria / Pousadas</option>
                    <option value="Arquitetura" className="bg-[#0f172a]">Arquitetura / Engenharia</option>
                    <option value="Buffet / Eventos" className="bg-[#0f172a]">Buffet / Eventos</option>
                    <option value="Auto-Escola" className="bg-[#0f172a]">Auto-Escola</option>
                    <option value="Escola Particular" className="bg-[#0f172a]">Escola / Cursos</option>
                    <option value="Loja de Roupas" className="bg-[#0f172a]">Comércio / Varejo</option>
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                       <span className="w-1 h-1 bg-[#fbce07]"></span> ESTADO
                    </label>
                    <select 
                      value={estado} 
                      onChange={(e) => handleEstadoChange(e.target.value)}
                      className="w-full bg-black/60 border-2 border-white/10 h-14 px-6 text-white font-black italic uppercase tracking-widest appearance-none focus:border-[#fbce07] outline-none transition-all cursor-pointer"
                      style={{ backgroundImage: 'linear-gradient(45deg, transparent 50%, #fbce07 50%), linear-gradient(135deg, #fbce07 50%, transparent 50%)', backgroundPosition: 'calc(100% - 20px) calc(1em + 10px), calc(100% - 15px) calc(1em + 10px)', backgroundSize: '5px 5px, 5px 5px', backgroundRepeat: 'no-repeat' }}
                    >
                      <option value="" className="bg-[#0f172a]">UF</option>
                      {['AC','AL','AP','AM','BA','CE','DF','ES','GO','MA','MT','MS','MG','PA','PB','PR','PE','PI','RJ','RN','RS','RO','RR','SC','SP','SE','TO'].map(uf => (
                        <option key={uf} value={uf} className="bg-[#0f172a]">{uf}</option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-4">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                      <span className="w-1 h-1 bg-[#fbce07]"></span> CIDADE
                    </label>
                    <select 
                      value={cidade} 
                      onChange={(e) => setCidade(e.target.value)}
                      disabled={!estado || cidadesList.length === 0}
                      className="w-full bg-black/60 border-2 border-white/10 h-14 px-6 text-white font-black italic uppercase tracking-widest appearance-none focus:border-[#fbce07] outline-none transition-all cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
                      style={{ backgroundImage: 'linear-gradient(45deg, transparent 50%, #fbce07 50%), linear-gradient(135deg, #fbce07 50%, transparent 50%)', backgroundPosition: 'calc(100% - 20px) calc(1em + 10px), calc(100% - 15px) calc(1em + 10px)', backgroundSize: '5px 5px, 5px 5px', backgroundRepeat: 'no-repeat' }}
                    >
                      <option value="" className="bg-[#0f172a]">{!estado ? "UF NECESSÁRIA" : "SELECIONE..."}</option>
                      {cidadesList.map((cid) => (
                        <option key={cid.nome} value={cid.nome} className="bg-[#0f172a]">{cid.nome}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="space-y-6 pt-6 border-t border-white/5">
                  <div className="flex items-center justify-between">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                       <span className="w-1 h-1 bg-cyan-400"></span> ESTRATÉGIA_DE_VARREDURA
                    </label>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => setSearchMode('web')}
                        className={`px-3 py-1.5 text-[9px] font-black uppercase tracking-widest transition-all ${searchMode === 'web' ? 'bg-white text-black shadow-[0_0_10px_rgba(255,255,255,0.3)]' : 'bg-white/5 text-slate-500'}`}
                      >DEEP_WEB</button>
                      <button 
                        onClick={() => setSearchMode('maps')}
                        className={`px-3 py-1.5 text-[9px] font-black uppercase tracking-widest transition-all ${searchMode === 'maps' ? 'bg-cyan-500 text-black shadow-[0_0_10px_rgba(6,182,212,0.3)]' : 'bg-white/5 text-slate-500'}`}
                      >HYPER_LOCAL_MAPS</button>
                    </div>
                  </div>

                  {searchMode === 'maps' && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-top-2 duration-300">
                      <div className="space-y-4">
                        <label className="text-[10px] font-black text-[#fbce07] uppercase tracking-widest flex items-center gap-2">
                          <span className="w-1 h-1 bg-[#fbce07]"></span> SELECIONAR_BAIRRO
                        </label>
                        <div className="relative">
                          <Input 
                            value={bairro}
                            onChange={(e) => setBairro(e.target.value)}
                            placeholder="Digite o bairro (ex: Batel, Centro...)"
                            className="bg-black/60 border-2 border-white/10 h-14 px-6 text-white font-black italic uppercase tracking-widest focus:border-cyan-400 outline-none transition-all placeholder:text-slate-700 rounded-none"
                          />
                          {(cidade === 'Curitiba' || cidade === 'São Paulo' || cidade === 'Rio de Janeiro') && (
                            <div className="flex flex-wrap gap-1 mt-2">
                              {(cidade === 'Curitiba' ? ['Batel', 'Santa Felicidade', 'Bigorrilho', 'Juvevê', 'Centro'] : 
                                cidade === 'São Paulo' ? ['Itaim Bibi', 'Pinheiros', 'Moema', 'Jardins', 'Vila Madalena'] : 
                                ['Copacabana', 'Ipanema', 'Leblon', 'Barra', 'Botafogo'])
                                .map(b => (
                                  <button key={b} onClick={() => setBairro(b)} className={`text-[8px] font-bold uppercase tracking-tighter border px-2 py-1 transition-all ${bairro === b ? 'border-cyan-400 bg-cyan-400/10 text-cyan-400' : 'border-white/5 bg-white/[0.02] text-slate-500 hover:text-cyan-400'}`}>
                                    {b}
                                  </button>
                                ))
                              }
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <label className="text-[10px] font-black text-rose-500 uppercase tracking-widest flex items-center gap-2">
                            <span className="w-1 h-1 bg-rose-500"></span> FILTRO_AUTORIDADE_MÍNIMA
                          </label>
                          <span className="text-[10px] font-black text-rose-500 bg-rose-500/10 px-2 py-0.5">{minReviewsCount}+ AVALIAÇÕES</span>
                        </div>
                        <input 
                          type="range" 
                          min="0" 
                          max="100" 
                          step="5"
                          value={minReviewsCount}
                          onChange={(e) => setMinReviewsCount(parseInt(e.target.value))}
                          className="w-full h-1 bg-white/10 appearance-none cursor-pointer accent-rose-500"
                        />
                        <p className="text-[9px] text-slate-600 font-bold italic uppercase">Empresas com menos de {minReviewsCount} avaliações serão ignoradas para focar no &quot;Top do Bairro&quot;.</p>
                      </div>
                    </div>
                  )}
                </div>
            </CardContent>
            <CardFooter className="p-10 pt-0">
               <Button onClick={handleStartSearch} className={`w-full h-14 font-black italic rounded-none tracking-widest transition-all shadow-[0_0_30px_rgba(6,182,212,0.3)] ${searchMode === 'maps' ? 'bg-cyan-500 text-black hover:bg-white' : 'bg-[#06b6d4] text-black hover:bg-white'}`}>
                 {searchMode === 'maps' ? 'INICIAR_VARREDURA_MAPS' : 'ACIONAR_BUSCADORES_WEB'}
               </Button>
            </CardFooter>
          </Card>
        </div>
      )}
        {/* Modal pulse line fix */}
        <div className="fixed top-0 left-0 w-full h-[1px] bg-[#06b6d4] opacity-10 animate-pulse z-[200] no-print" />
      </div>

      {/*      MODAL DE AUDITORIA (PDF STYLE) */}
      {isAuditModalOpen && selectedLeadDetails && (
        <div className="fixed inset-0 bg-black/95 backdrop-blur-3xl z-[200] flex items-center justify-center p-4 print:p-0 print:bg-white print:static print:z-0 print:block print:text-black modal-print-container">
          <div className="bg-white text-slate-900 w-full max-w-4xl max-h-[95vh] flex flex-col relative shadow-[0_0_100px_rgba(6,182,212,0.3)] print:max-h-none print:shadow-none print:w-full print:max-w-none print:bg-white print:static print:block modal-print-content">
            {/* Header Report */}
            <div className="bg-slate-900 p-10 flex justify-between items-end print:p-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 print:hidden">
                   <div className="w-6 h-6 bg-[#06b6d4] rotate-45 flex items-center justify-center">
                      <Zap className="w-3 h-3 text-black -rotate-45 fill-current" />
                   </div>
                   <span className="text-white font-black italic tracking-tighter uppercase text-xl">CAPTA<span className="text-[#06b6d4]">SAAS</span></span>
                </div>
                <h1 className="text-white text-3xl font-black italic uppercase tracking-tighter">ANÁLISE_DE_IMPACTO_DIGITAL</h1>
                <p className="text-[#06b6d4] text-[10px] font-bold tracking-[0.3em] uppercase">MANUTENÇÃO_MENSAL_STRATEGY_REPORT_V2.5</p>
              </div>
              <div className="text-right space-y-1 print:text-slate-400">
                <p className="text-slate-500 text-[9px] font-black uppercase tracking-widest print:text-slate-500">DATA_DE_EMISSÃO</p>
                <p className="text-white text-sm font-bold print:text-slate-900">{new Date().toLocaleDateString('pt-BR')}</p>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-12 space-y-12 bg-white print:overflow-visible print:px-16 print:py-12">
              {/* Seção 1: Score Geral */}
              <div className="grid grid-cols-12 gap-10 items-center">
                <div className="col-span-12 md:col-span-5 flex flex-col items-center border-r border-slate-100 pr-10">
                   <div className="relative w-48 h-48 flex items-center justify-center">
                      <svg className="w-full h-full transform -rotate-90">
                        <circle cx="96" cy="96" r="88" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-slate-100" />
                        <circle cx="96" cy="96" r="88" stroke="currentColor" strokeWidth="8" fill="transparent" strokeDasharray={552} strokeDashoffset={552 - (552 * calculateLeadScore(selectedLeadDetails).score) / 100} className={calculateLeadScore(selectedLeadDetails).score > 70 ? "text-emerald-500" : "text-rose-500"} />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-5xl font-black italic tracking-tighter">{calculateLeadScore(selectedLeadDetails).score}%</span>
                        <span className="text-[10px] font-bold text-slate-400 uppercase text-center leading-tight">  ÍNDICE_DE<br/>CONFIANÇA</span>
                      </div>
                   </div>
                </div>
                <div className="col-span-12 md:col-span-7 space-y-6">
                   <div className="space-y-1">
                      <h2 className="text-2xl font-black italic text-slate-900 uppercase tracking-tighter">{selectedLeadDetails.title}</h2>
                      <p className="text-slate-500 text-xs font-bold flex items-center gap-2">
                        <MapPin className="w-3 h-3" /> {selectedLeadDetails.address || `${cidade}, ${estado}`}
                      </p>
                   </div>
                   <div className="p-6 bg-slate-50 border-l-4 border-[#06b6d4]">
                      <p className="text-[10px] font-black text-[#06b6d4] uppercase mb-2">DIAGNÓSTICO DE VENDAS</p>
                      <p className="text-xs text-slate-600 leading-relaxed italic font-medium">
                        &quot;Notamos que sua empresa está perdendo clientes interessados por dois motivos simples: você não tem um <strong>Site Profissional</strong> que passe confiança imediata, e não tem um <strong>Robô de atendimento no WhatsApp</strong> para responder na hora. Enquanto você dorme ou atende um cliente, outros estão indo embora porque não tiveram resposta imediata.&quot;
                      </p>
                   </div>
                </div>
              </div>

              {/* Seção 2: Checklist TECNICO & Justificativas */}
              <div className="grid grid-cols-2 gap-4">
                 {[
                   { 
                     label: "SITE PROFISSIONAL (VITRINE 24H)", 
                     status: !!selectedLeadDetails.url && !selectedLeadDetails.url.includes("google.com"), 
                     icon: Globe,
                     why: "Mais do que um site,    sua vitrine oficial. Se o cliente não te acha bonito no Google, ele acha que sua empresa é pequena ou amadora."
                   },
                   { 
                     label: "ATENDIMENTO AUTOMÁTICO (WHATSAPP 24H)", 
                     status: false,
                     icon: Zap,
                     why: "Se o cliente te chama e você demora 10 minutos para responder, ele já chamou o concorrente. O robô responde em 2 segundos."
                   },
                   { 
                     label: "RASTRADOR DE VENDAS (MARKETING)", 
                     status: leadAnalysis?.pixels?.length > 0, 
                     icon: Activity,
                     why: "Sabe quando você vê o anúncio de algo que acabou de pesquisar? É isso. Sem isso, você gasta com anúncios e não persegue o cliente."
                   },
                   { 
                     label: "ABERTURA RÁPIDA NO CELULAR", 
                     status: leadAnalysis?.responsive, 
                     icon: Activity,
                     why: "Quase todo mundo busca pelo celular. Se o seu site demora a abrir ou fica tudo torto, o cliente desiste na hora."
                   },
                 ].map((item, i) => (
                   <div key={i} className="flex flex-col p-4 border border-slate-100 bg-white hover:border-[#06b6d4] transition-colors group">
                      <div className="flex items-center gap-4 mb-3">
                         <div className={`w-8 h-8 flex items-center justify-center rounded-full ${item.status ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                            <item.icon className="w-4 h-4" />
                         </div>
                         <div className="flex-1">
                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-tight">{item.label}</p>
                            <p className={`text-[9px] font-bold uppercase mt-1 ${item.status ? 'text-emerald-700' : 'text-rose-700'}`}>
                               {item.status ? "    ESTRUTURA_OK" : "    FALHA_DETECTADA"}
                            </p>
                         </div>
                      </div>
                      <div className="space-y-1">
                         <p className="text-[8px] font-black text-[#06b6d4] uppercase tracking-tighter">O QUE ISSO SIGNIFICA?</p>
                         <p className="text-[10px] text-slate-500 font-medium leading-tight italic">
                           &quot;{item.why}&quot;
                         </p>
                      </div>
                   </div>
                 ))}
              </div>

              {/* Seção 3: PercepCOESes Qualitativas */}
               <div className="space-y-6">
                  <h3 className="text-xs font-black text-slate-900 border-b-2 border-slate-900 pb-2 flex justify-between uppercase tracking-widest">
                     <span>PLANO DE RECUPERAÇÃO DE VENDAS E CONVERSÃO</span>
                     <span className="text-rose-600">!! PRIORIDADE_MÁXIMA !!</span>
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     {(leadAnalysis?.perceptions || ["ANÁLISE profunda pendente - Recomendamos varredura completa."]).map((p: string, i: number) => (
                        <div key={i} className="flex gap-4 p-4 bg-slate-50 border border-slate-100">
                           <div className="w-2 h-2 mt-1.5 bg-rose-500 rotate-45 shrink-0" />
                           <p className="text-xs font-bold text-slate-700 leading-relaxed uppercase italic">{p}</p>
                        </div>
                     ))}
                  </div>
               </div>

               {/* Seção 4: Plano de Domínio de Mercado (O Ecossistema) */}
               <div className="space-y-6">
                 <div className="flex items-center gap-2 mb-2">
                   <div className="w-1 h-6 bg-pink-500 shadow-[0_0_10px_#ec4899]" />
                   <h4 className="text-sm font-black text-slate-900 uppercase italic tracking-widest">ARQUITETURA_DO_ECOSSISTEMA_DE_LUCRO</h4>
                 </div>
                 
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                   {[
                     { 
                       title: "PRIME_SITE_2025", 
                       desc: "Vitrine de luxo focada em converter visitantes em leads qualificados via WhatsApp.", 
                       status: "ESSENCIAL",
                       icon: Globe
                     },
                     { 
                       title: "CONVERSATIONAL_BOT", 
                       desc: `Robô inteligente pronto para fazer o agendamento de ${nicho || 'serviços'} 24/7.`, 
                       status: "ACELERAÇÃO",
                       icon: Zap
                     },
                     { 
                       title: "SEASONAL_ADS_ENGINE", 
                       desc: "Campanhas sazonais inteligentes prontas para serem acionadas no Natal, Páscoa e Black Friday.", 
                       status: "ESCALABILIDADE",
                       icon: Sparkles
                     }
                   ].map((item, i) => (
                     <div key={i} className="border border-slate-100 bg-slate-50 p-4 group hover:border-pink-500/30 transition-all cursor-default relative overflow-hidden h-full">
                       <div className="absolute top-0 right-0 p-1">
                         <span className="text-[6px] font-black text-pink-500/40 uppercase tracking-[0.2em]">{item.status}</span>
                       </div>
                       <item.icon className="w-5 h-5 text-pink-500 mb-3" />
                       <h5 className="text-[10px] font-black text-slate-900 uppercase italic mb-1">{item.title}</h5>
                       <p className="text-[9px] text-slate-500 font-mono leading-relaxed">{item.desc}</p>
                     </div>
                   ))}
                 </div>
               </div>

               {/* Seção 5: Proposta de Valor & Impacto Financeiro Reestilizado */}
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <div className="space-y-4">
                   <div className="flex items-center gap-2">
                     <div className="w-1 h-4 bg-cyan-600" />
                     <h4 className="text-[10px] font-black text-cyan-600 uppercase tracking-widest">ESTRATÉGIA_DE_RECUPERAÇÃO</h4>
                   </div>
                   <div className="border border-cyan-100 bg-cyan-50/30 p-4 space-y-3">
                     <p className="text-xs font-bold leading-relaxed text-slate-700 italic">
                       &quot;A análise detectou que {selectedLeadDetails.title} está deixando de faturar por não possuir um Ecossistema pronto. Nossa meta é recuperar no mínimo 30% da demanda reprimida em 90 dias através da integração SITE + BOT.&quot;
                     </p>
                     <div className="flex gap-2">
                        <Badge className="bg-cyan-500/10 text-cyan-700 border-none rounded-none text-[8px] font-black">#ROI_PREVISÍVEL</Badge>
                        <Badge className="bg-pink-500/10 text-pink-700 border-none rounded-none text-[8px] font-black">#DOMÍNIO_TOTAL</Badge>
                     </div>
                   </div>
                 </div>

                 <div className="space-y-4">
                    <div className="flex items-center gap-2">
                     <div className="w-1 h-4 bg-rose-600" />
                     <h4 className="text-[10px] font-black text-rose-600 uppercase tracking-widest">CALCULADORA_DE_FATURAMENTO_RETIDO</h4>
                   </div>
                   <div className="border border-rose-100 bg-rose-50/30 p-4 flex flex-col justify-center min-h-[120px]">
                     <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-black text-slate-900 italic">R$ {(fluxoMensal * 0.3 * ticketMedio).toLocaleString('pt-BR')}</span>
                        <span className="text-[8px] text-rose-600 font-bold uppercase tracking-widest">/MÊS_PERDIDO</span>
                     </div>
                     <p className="text-[9px] text-slate-500 font-mono mt-1">Estimativa de 30% de perda por falta de automação e site profissional.</p>
                     <div className="mt-4 flex gap-4 border-t border-rose-100 pt-4 no-print">
                        <div className="flex-1">
                           <label className="text-[8px] font-black text-slate-400 uppercase tracking-widest">TICKET_MÉDIO</label>
                           <Input type="number" value={ticketMedio} onChange={(e) => setTicketMedio(Number(e.target.value))} className="bg-transparent border-none text-slate-900 font-black italic p-0 h-6 focus-visible:ring-0" />
                        </div>
                        <div className="flex-1">
                           <label className="text-[8px] font-black text-slate-400 uppercase tracking-widest">ZAPS_MÊS</label>
                           <Input type="number" value={fluxoMensal} onChange={(e) => setFluxoMensal(Number(e.target.value))} className="bg-transparent border-none text-slate-900 font-black italic p-0 h-6 focus-visible:ring-0" />
                        </div>
                     </div>
                   </div>
                 </div>
               </div>

               {/* Seção 6: Sobre o Especialista Responsável */}
               <div className="p-10 bg-slate-900 text-white flex flex-col md:flex-row gap-10 items-center border border-slate-800 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#06b6d4]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-[#06b6d4]/20 transition-all pointer-events-none" />
                  <div className="w-24 h-24 bg-[#06b6d4] rotate-45 shrink-0 flex items-center justify-center border-4 border-white shadow-[0_0_30px_rgba(6,182,212,0.4)] overflow-hidden">
                    <div className="w-full h-full -rotate-45 flex items-center justify-center bg-black/10">
                      <Zap className="w-12 h-12 text-black fill-current" />
                    </div>
                  </div>
                  <div className="space-y-6 flex-1">
                     <div className="space-y-1">
                        <p className="text-[#06b6d4] text-[10px] font-black uppercase tracking-[0.3em] mb-1">PROGRAMADOR_&_ESTRATEGISTA</p>
                        <h4 className="text-2xl font-black italic uppercase tracking-tighter leading-none">LUCAS | FULL_STACK_&_IA_SPECIALIST</h4>
                     </div>
                     <p className="text-[11px] text-slate-400 leading-relaxed uppercase font-bold italic max-w-2xl">
                       Especialista em Engenharia de Software de Alta Performance e Inteligência Artificial. 
                       Com sólido domínio no ecossistema Next.js, Java e soluções imersivas, Lucas foca em transformar 
                       requisitos de negócio em infraestruturas digitais que operam 24/7. 
                       Seu trabalho prioriza segurança, performance (Core Web Vitals) e a integração de automações 
                       inteligentes que maximizam o lucro e a escala de operações digitais.
                     </p>
                     <div className="flex flex-wrap gap-4 pt-4 border-t border-white/5">
                        <div className="flex items-center gap-2">
                          <Activity className="w-3 h-3 text-[#06b6d4]" />
                          <span className="text-[9px] font-black uppercase tracking-widest text-[#06b6d4]">Performance Engineering</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Globe className="w-3 h-3 text-white" />
                          <span className="text-[9px] font-black uppercase tracking-widest opacity-60">IA Agent Integration</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Zap className="w-3 h-3 text-yellow-500" />
                          <span className="text-[9px] font-black uppercase tracking-widest opacity-60">Full-Stack Scalability</span>
                        </div>
                     </div>
                  </div>
               </div>
            </div>

            {/* Footer Buttons */}
            <div className="p-8 bg-slate-50 border-t border-slate-100 flex justify-between items-center print:hidden">
               <button onClick={() => setIsAuditModalOpen(false)} className="text-[10px] font-black text-slate-400 hover:text-slate-900 uppercase tracking-widest">FECHAR_MODAL</button>
               <div className="flex gap-4">
                  <Button onClick={() => { generateAIPitch('venda'); setRoiVisibility(!roiVisibility); }} className={`bg-[#06b6d4] text-black rounded-none font-black italic text-xs px-8 h-12 uppercase `}>
                    {roiVisibility ? 'SCRIPT_OK' : 'GERAR_SCRIPT_IA'}
                  </Button>
                  <Button onClick={() => window.print()} className="bg-slate-900 text-white rounded-none font-black italic text-xs px-8 h-12 uppercase">
                    IMPRIMIR_GERAR_PDF
                  </Button>
               </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal do Prompt Lovable */}
      {isLovableModalOpen && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-xl z-[300] flex items-center justify-center p-4 no-print">
          <div className="bg-[#0f172a] border border-[#06b6d4]/30 w-full max-w-3xl max-h-[85vh] flex flex-col relative shadow-[0_0_80px_rgba(6,182,212,0.2)]">
            {/* Header */}
            <div className="p-6 border-b border-white/5 flex justify-between items-center bg-black/20">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-[#06b6d4] flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-black fill-current" />
                </div>
                <div>
                  <h2 className="font-black italic text-white uppercase tracking-tighter text-lg leading-none">PROMPT_LOVABLE_GERADO</h2>
                  <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mt-0.5">Cole no lovable.dev      app.v0.dev      bolt.new</p>
                </div>
              </div>
              <button onClick={() => setIsLovableModalOpen(false)} className="w-10 h-10 flex items-center justify-center border border-white/10 text-slate-500 hover:text-white hover:bg-white/5 transition-all">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Prompt textarea */}
            <div className="flex-1 overflow-hidden p-6">
              <textarea
                readOnly
                value={lovablePromptText}
                className="w-full h-full min-h-[400px] bg-black/60 border border-white/10 text-slate-300 text-[11px] font-mono leading-relaxed p-4 resize-none outline-none focus:border-[#06b6d4]/40 transition-colors"
                onClick={(e) => (e.target as HTMLTextAreaElement).select()}
              />
            </div>

            {/* Footer actions */}
            <div className="p-6 border-t border-white/5 bg-black/20 flex justify-between items-center gap-4">
              <p className="text-[9px] font-bold text-slate-600 uppercase tracking-widest italic">Clique no texto para selecionar tudo      Prompt inclui dados reais do lead</p>
              <div className="flex gap-3">
                <Button onClick={() => {
                    navigator.clipboard.writeText(lovablePromptText);
                    setStatusText('       Copiado!');
                    setTimeout(() => setStatusText('Dashboard Ativo.'), 2000);
                  }}
                  className="bg-[#06b6d4] text-black font-black italic text-xs px-6 h-10 uppercase rounded-none hover:bg-white transition-all"
                >
                  COPIAR_PROMPT
                </Button>
                <Button onClick={() => window.open('https://lovable.dev', '_blank')}
                  className="bg-white text-black font-black italic text-xs px-6 h-10 uppercase rounded-none hover:bg-[#fbce07] transition-all"
                >
                  ABRIR_LOVABLE       
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Preview 48h */}
      {isPreviewModalOpen && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-xl z-[300] flex items-center justify-center p-4 no-print">
          <div className="bg-[#0f172a] border border-cyan-500/30 w-full max-w-4xl max-h-[90vh] flex flex-col relative shadow-[0_0_80px_rgba(6,182,212,0.15)]">
            {/* Header */}
            <div className="p-6 border-b border-white/5 flex justify-between items-center bg-black/20">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-cyan-500 flex items-center justify-center">
                  <Activity className="w-5 h-5 text-black" />
                </div>
                <div>
                  <h2 className="font-black italic text-white uppercase tracking-tighter text-xl leading-none">CONFIGURAR_PREVIEW_48H</h2>
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">Gere o link de demonstração para o cliente</p>
                </div>
              </div>
              <button onClick={() => setIsPreviewModalOpen(false)} className="w-10 h-10 flex items-center justify-center border border-white/10 text-slate-500 hover:text-white hover:bg-white/5 transition-all">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-hidden flex divide-x divide-white/5">
              {/* Coluna Esquerda: Input */}
              <div className="w-1/3 p-8 space-y-6 overflow-y-auto">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Badge className="bg-cyan-500 text-black font-black italic">PASSO_01</Badge>
                    <p className="text-white font-bold uppercase text-xs italic tracking-tigh">Cole o HTML do Stitch:</p>
                  </div>
                  <textarea
                    value={previewHtmlInput}
                    onChange={(e) => setPreviewHtmlInput(e.target.value)}
                    placeholder="<!DOCTYPE html>..."
                    className="w-full h-[500px] bg-black/40 border border-white/10 text-cyan-400 text-[10px] font-mono p-4 outline-none focus:border-cyan-500/50 transition-all resize-none"
                  />
                </div>

                {previewLink && (
                  <div className="bg-cyan-500/5 border border-cyan-500/20 p-4 space-y-3">
                    <p className="text-cyan-500 font-black italic text-[9px] uppercase tracking-widest">       LINK_VÁLIDO</p>
                    <div className="flex gap-2">
                      <input readOnly value={previewLink} className="flex-1 bg-black/60 border border-white/10 text-white p-2 text-[10px] font-mono outline-none" />
                      <Button onClick={() => navigator.clipboard.writeText(previewLink)} className="bg-cyan-500 text-black font-black italic h-10 uppercase rounded-none px-4 text-[10px]">COPIAR</Button>
                    </div>
                  </div>
                )}
              </div>

              {/* Coluna Direita: Live Preview */}
              <div className="flex-1 bg-slate-900 relative">
                <div className="absolute top-4 left-4 z-10 bg-black/60 backdrop-blur-md px-3 py-1.5 border border-white/10 flex items-center gap-2">
                   <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                   <span className="text-[9px] font-black text-white uppercase tracking-widest">LIVE_FIDELITY_CHECK</span>
                </div>
                {previewHtmlInput.trim() ? (
                  <iframe
                    srcDoc={previewHtmlInput}
                    className="w-full h-full border-none bg-white"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-slate-600 gap-4">
                    <Globe className="w-12 h-12 opacity-20" />
                    <p className="text-[10px] font-bold uppercase tracking-widest">Aguardando código HTML...</p>
                  </div>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="p-8 border-t border-white/5 bg-black/20 flex justify-end items-center gap-4">
              <button onClick={() => setIsPreviewModalOpen(false)}
                className="text-[11px] font-black text-slate-500 hover:text-white uppercase tracking-widest"
              >
                CANCELAR
              </button>
              <Button
                disabled={!previewHtmlInput.trim()}
                onClick={savePreview}
                className="bg-cyan-500 text-black font-black italic text-sm px-10 h-14 uppercase rounded-none hover:bg-white transition-all shadow-xl shadow-cyan-500/20"
              >
                SALVAR_E_GERAR_LINK_DOCS
              </Button>
            </div>
          </div>
        </div>
      )}
      
      {/*                MODAL VARREDURA MANUAL */}
      {isManualModalOpen && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-xl z-[300] flex items-center justify-center p-4">
          <Card className="bg-[#0f172a] border border-[#06b6d4]/30 w-full max-w-xl rounded-none shadow-[0_0_50px_rgba(6,182,212,0.2)]">
            <CardHeader className="p-8 border-b border-white/5 flex flex-row items-center justify-between">
              <div>
                <CardTitle className="font-outfit text-2xl font-black italic text-white uppercase tracking-tighter">VARREDURA_MANUAL</CardTitle>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">Insira qualquer info (Link Maps, Nome, URL)</p>
              </div>
              <button onClick={() => setIsManualModalOpen(false)} className="text-slate-500 hover:text-white transition-colors">
                <X className="w-6 h-6" />
              </button>
            </CardHeader>
            <CardContent className="p-8 space-y-6">
              <div className="space-y-4">
                <label className="text-[10px] font-black text-[#06b6d4] uppercase tracking-widest">INPUT_DE_DADOS_BRUTOS</label>
                <textarea 
                  value={manualInput}
                  onChange={(e) => setManualInput(e.target.value)}
                  placeholder="Cole aqui o link do Google Maps da empresa, ou o nome + cidade..."
                  className="w-full h-32 bg-black/60 border-2 border-white/10 p-4 text-white font-medium outline-none focus:border-[#06b6d4] transition-all resize-none"
                />
              </div>
              <div className="bg-white/5 border-l-2 border-[#fbce07] p-4">
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tight leading-relaxed">
                  O sistema usará a IA para extrair nome, telefone e presença digital a partir do dado fornecido.
                </p>
              </div>
            </CardContent>
            <CardFooter className="p-8 pt-0">
              <Button onClick={handleManualScan}
                disabled={!manualInput.trim() || manualProcessing}
                className="w-full h-14 bg-[#06b6d4] text-black font-black italic rounded-none tracking-widest hover:bg-white shadow-[0_0_30px_#06b6d4] disabled:opacity-50"
              >
                {manualProcessing ? "PROCESSANDO_DADOS..." : "FORCE_RECOGNITION"}
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}

      {isTemplatePreviewOpen && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-[150] flex items-center justify-center p-4">
          <Card className="max-w-[500px] w-full bg-[#050505] border-2 border-cyan-400/50 rounded-none hacker-grid-bg relative text-white">
            <div className="absolute top-0 left-0 w-full flex items-center h-8 bg-cyan-900/30 border-b border-cyan-400/20 px-3">
              <span className="text-[10px] text-cyan-400 font-mono tracking-widest font-black uppercase flex items-center gap-2">
                <MessageSquare className="w-3 h-3" /> WHATSAPP_PREVIEW
              </span>
            </div>
            <button onClick={() => setIsTemplatePreviewOpen(false)} className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-cyan-400 hover:bg-red-500 hover:text-white transition-colors z-10">
              <X className="w-4 h-4" />
            </button>
            <CardContent className="p-8 pt-12 space-y-4">
              <p className="text-[10px] text-cyan-600 font-mono italic mb-2">MENSAGEM A SER ENVIADA:</p>
              <textarea
                value={whatsappPreviewMessage}
                onChange={(e) => setWhatsappPreviewMessage(e.target.value)}
                className="w-full h-48 bg-[#0a0a0a] border border-cyan-400/20 p-4 text-[13px] text-cyan-100 font-mono focus:outline-none focus:border-cyan-400 transition-colors custom-scrollbar"
              />
              <div className="bg-amber-500/10 border-l border-amber-500 p-3 flex gap-3 text-amber-500">
                <Target className="w-4 h-4 shrink-0" />
                <p className="text-[9px] uppercase tracking-wider font-bold">Revise as vari&aacute;veis se necess&aacute;rio. O disparo abrir&aacute; o WhatsApp Web / App diretamente.</p>
              </div>
            </CardContent>
            <CardFooter className="p-8 pt-0 flex gap-4">
              <Button onClick={() => setIsTemplatePreviewOpen(false)} className="flex-1 bg-transparent border border-cyan-400/20 text-cyan-400 hover:bg-white/5 rounded-none font-mono text-[10px] uppercase font-black">
                CANCELAR
              </Button>
              <Button onClick={() => {
                  const lead = leads.find((l) => l.url === selectedTemplateLeadUrl);
                  if (lead && lead.phone) {
                    const number = lead.phone.replace(/\D/g, '');
                    const encodedMsg = encodeURIComponent(whatsappPreviewMessage);
                    window.open(`https://wa.me/55${number}?text=${encodedMsg}`, '_blank');
                    setIsTemplatePreviewOpen(false);
                  } else {
                    alert("Lead não possui telefone válido para WhatsApp.");
                  }
                }} 
                className="flex-1 bg-cyan-500 hover:bg-cyan-600 text-black font-black font-mono text-[10px] tracking-[0.2em] rounded-none uppercase flex items-center gap-2 justify-center"
              >
                <Zap className="w-3 h-3 fill-black" /> SHIP_TO_ZAP
              </Button>
            </CardFooter>
          </Card>
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

      <div className="fixed top-0 left-0 w-full h-[1px] bg-[#06b6d4] opacity-10 animate-pulse z-[200]" />
      <style jsx global>{`
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-thumb { background: #06b6d4; }
        @media print {
          @page { size: A4; margin: 8mm; }
          html, body { 
            background: white !important; 
            color: black !important;
            height: auto !important;
            overflow: visible !important;
            margin: 0 !important;
            padding: 0 !important;
          }
          .no-print, .print\:hidden { display: none !important; }
          .modal-print-container, .modal-print-content {
            position: static !important;
            display: block !important;
            width: 100% !important;
            height: auto !important;
            min-height: 100% !important;
            float: none !important;
            overflow: visible !important;
            background: white !important;
            margin: 0 !important;
            padding: 0 !important;
          }
          .modal-print-content {
             padding-bottom: 40px !important;
          }
          .modal-print-content * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            max-width: 100% !important;
          }
        }
      `}</style>
    </>
  );
}


