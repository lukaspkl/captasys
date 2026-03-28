"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  getSiteById,
  updateSiteContent,
  updateSiteBilling,
} from "@/app/actions/sites";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Save,
  ArrowLeft,
  Globe,
  Layout,
  Monitor,
  Smartphone as Phone,
  ExternalLink,
  Zap,
  Loader2,
  RefreshCcw,
  Palette,
  CreditCard,
  MessageSquare,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { format } from "date-fns";

interface SiteProjectData {
  id: string;
  subdomain: string;
  theme_id: string;
  updated_at: string;
  expiry_date: string;
  billing_status: "paid" | "pending" | "overdue";
  monthly_fee: number;
  content: SiteContent;
}

interface SiteContent {
  site_name: string;
  hero_title: string;
  hero_subtitle: string;
  whatsapp: string;
  theme_color: string;
  cta_text: string;
  services: Array<{ title: string; desc: string }>;
}

export default function AdminProjectEditor() {
  const { id } = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [project, setProject] = useState<SiteProjectData | null>(null);
  const [content, setContent] = useState<SiteContent | null>(null);
  const [viewMode, setViewMode] = useState<"desktop" | "mobile">("desktop");
  const [statusMsg, setStatusMsg] = useState({ text: "", type: "" });
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    async function load() {
      const { data, error } = await getSiteById(id as string);
      if (error || !data) {
        router.push("/admin/leads");
        return;
      }
      setProject(data as unknown as SiteProjectData);
      setContent(
        (data.content as unknown as SiteContent) || {
          site_name: "",
          hero_title: "",
          hero_subtitle: "",
          whatsapp: "",
          theme_color: "",
          cta_text: "",
          services: [],
        },
      );
      setLoading(false);
    }
    load();
  }, [id, router]);

  const handleUpdateContent = (
    field: keyof SiteContent,
    value: string | Array<{ title: string; desc: string }>,
  ) => {
    setContent((prev) => (prev ? { ...prev, [field]: value } : null));
  };

  const handleUpdateService = (index: number, field: string, value: string) => {
    const newServices = [...(content?.services || [])];
    newServices[index] = { ...newServices[index], [field]: value };
    handleUpdateContent("services", newServices);
  };

  const handleUpdateBilling = async (updates: Partial<SiteProjectData>) => {
    setSaving(true);
    setStatusMsg({ text: "PROCESSANDO_FINANCEIRO...", type: "info" });
    try {
      const res = await updateSiteBilling(
        id as string,
        updates as Record<string, unknown>,
      );
      if (res.success) {
        setProject((prev) => (prev ? { ...prev, ...updates } : null));
        setStatusMsg({ text: "FINANCEIRO_SINCRONIZADO.", type: "success" });
      }
    } finally {
      setSaving(false);
      setTimeout(() => setStatusMsg({ text: "", type: "" }), 3000);
    }
  };

  const markAsPaid = async () => {
    const nextMonth = new Date(project?.expiry_date || new Date());
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    await handleUpdateBilling({
      billing_status: "paid",
      expiry_date: nextMonth.toISOString(),
    });
  };

  const copyWhatsappCharge = () => {
    const msg = `Olá! Seu site profissional (${project?.subdomain}.siteprox.com.br) já está online. Para renovar sua manutenção mensal de R$ ${project?.monthly_fee?.toFixed(2)}, utilize nossa chave PIX CNPJ 12.345.678/0001-90. Qualquer dúvida, conte conosco!`;
    navigator.clipboard.writeText(msg);
    setStatusMsg({ text: "LINK_COPIADO.", type: "success" });
  };

  const save = async () => {
    setSaving(true);
    setStatusMsg({ text: "SINCRONIZANDO_NÓ...", type: "info" });

    try {
      if (!content) return;
      const res = await updateSiteContent(
        id as string,
        content as unknown as Record<string, unknown>,
      );
      if (res.success) {
        setStatusMsg({ text: "SISTEMA_ATUALIZADO.", type: "success" });
        // Forçar o iframe a recarregar
        const iframe = document.getElementById(
          "preview-iframe",
        ) as HTMLIFrameElement;
        if (iframe) iframe.src = iframe.src;
      } else {
        setStatusMsg({ text: "ERRO_DE_TRANSMISSÃO.", type: "error" });
      }
    } finally {
      setSaving(false);
      setTimeout(() => setStatusMsg({ text: "", type: "" }), 3000);
    }
  };

  if (loading)
    return (
      <div className="h-screen bg-[#050510] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-12 h-12 text-cyan-500 animate-spin" />
          <span className="text-[10px] font-black text-cyan-500 uppercase tracking-[0.5em] animate-pulse">
            CARREGANDO_ESTRUTURA...
          </span>
        </div>
      </div>
    );

  return (
    <div className="h-screen bg-[#050510] flex flex-col font-sans overflow-hidden">
      {/* HUD CRITICAL HEADER */}
      <header className="h-16 border-b border-white/5 bg-slate-950/80 backdrop-blur-xl flex items-center justify-between px-6 z-50">
        <div className="flex items-center gap-6">
          <Link
            href="/admin/leads"
            className="text-slate-500 hover:text-white transition-all flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-[10px] font-black uppercase tracking-widest hidden sm:inline">
              DASHBOARD
            </span>
          </Link>
          <div className="h-8 w-px bg-white/5" />
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <h1 className="text-white text-xs font-black uppercase tracking-tight italic">
                SITE_ARCHITECT<span className="text-cyan-500 ml-1">v4.0</span>
              </h1>
              <Badge
                variant="outline"
                className="border-cyan-500/20 text-cyan-400 text-[8px] h-4 rounded-none uppercase"
              >
                PROJETO: {project?.subdomain}
              </Badge>
            </div>
            <span className="text-[8px] text-slate-500 font-mono mt-0.5">
              UUID: {project?.id?.split("-")[0]} | SAT_LINK: STABLE
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <AnimatePresence>
            {statusMsg.text && (
              <motion.span
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className={`text-[9px] font-mono font-black uppercase tracking-widest ${statusMsg.type === "error" ? "text-red-500" : "text-cyan-400"}`}
              >
                {statusMsg.text}
              </motion.span>
            )}
          </AnimatePresence>

          <div className="flex items-center gap-1 bg-black/40 p-1 border border-white/5 mr-4">
            <button
              onClick={() => setViewMode("desktop")}
              className={`w-9 h-8 flex items-center justify-center transition-all ${viewMode === "desktop" ? "bg-cyan-500 text-black shadow-[0_0_15px_rgba(34,211,238,0.3)]" : "text-slate-500 hover:text-white"}`}
            >
              <Monitor className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setViewMode("mobile")}
              className={`w-9 h-8 flex items-center justify-center transition-all ${viewMode === "mobile" ? "bg-cyan-500 text-black shadow-[0_0_15px_rgba(34,211,238,0.3)]" : "text-slate-500 hover:text-white"}`}
            >
              <Phone className="w-3.5 h-3.5" />
            </button>
          </div>

          <Button
            onClick={save}
            disabled={saving}
            className="bg-cyan-500 hover:bg-cyan-400 text-black text-[10px] font-black uppercase rounded-none px-8 h-10 shadow-[0_0_20px_rgba(6,182,212,0.2)]"
          >
            {saving ? (
              <RefreshCcw className="w-4 h-4 animate-spin mr-2" />
            ) : (
              <Save className="w-4 h-4 mr-2" />
            )}
            SINC_GERAL
          </Button>
        </div>
      </header>

      {/* MAIN SPLIT WORKSPACE */}
      <main className="flex-1 flex overflow-hidden">
        {/* LEFT: EDITOR CONTROLS */}
        <aside className="w-1/3 min-w-[400px] border-r border-white/10 flex flex-col bg-[#050510]">
          {/* Sections Tab */}
          <div className="flex border-b border-white/5">
            {[
              { id: "hero", icon: Layout, label: "HEADLINE" },
              { id: "identity", icon: Palette, label: "ESTILO" },
              { id: "services", icon: Zap, label: "SERVIÇOS" },
              { id: "billing", icon: CreditCard, label: "FINANCEIRO" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveSection(tab.id)}
                className={`flex-1 flex flex-col items-center py-4 gap-2 transition-all border-b-2 ${activeSection === tab.id ? "border-cyan-500 bg-cyan-500/5" : "border-transparent text-slate-600 hover:text-slate-300"}`}
              >
                <tab.icon
                  className={`w-4 h-4 ${activeSection === tab.id ? "text-cyan-400" : ""}`}
                />
                <span className="text-[8px] font-black uppercase tracking-widest">
                  {tab.label}
                </span>
              </button>
            ))}
          </div>

          {/* Form Area */}
          <div className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar relative z-10">
            <AnimatePresence mode="wait">
              {activeSection === "hero" && (
                <motion.div
                  key="hero"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-6"
                >
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-3 h-3 bg-cyan-500 rounded-full animate-pulse" />
                      <h3 className="text-[10px] font-black text-white uppercase tracking-widest">
                        FRONT_DOOR_CONTROL
                      </h3>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[8px] font-black text-slate-500 uppercase italic">
                        Hero_Headline
                      </label>
                      <Input
                        value={content?.hero_title || ""}
                        onChange={(e) =>
                          handleUpdateContent("hero_title", e.target.value)
                        }
                        className="bg-black/80 border-white/10 rounded-none h-12 text-sm text-cyan-100 font-bold focus:border-cyan-500 transition-all shadow-inner"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-[8px] font-black text-slate-500 uppercase italic">
                        Hero_Subheadline
                      </label>
                      <Textarea
                        value={content?.hero_subtitle || ""}
                        onChange={(e) =>
                          handleUpdateContent("hero_subtitle", e.target.value)
                        }
                        className="bg-black/80 border-white/10 rounded-none min-h-[120px] text-sm text-slate-300 focus:border-cyan-500 transition-all resize-none shadow-inner"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-[8px] font-black text-slate-500 uppercase italic">
                        Hero_CTA_Action
                      </label>
                      <Input
                        value={content?.cta_text || ""}
                        onChange={(e) =>
                          handleUpdateContent("cta_text", e.target.value)
                        }
                        className="bg-black/80 border-white/10 rounded-none h-12 text-sm text-emerald-400 font-black focus:border-emerald-500 transition-all"
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {activeSection === "identity" && (
                <motion.div
                  key="identity"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse" />
                      <h3 className="text-[10px] font-black text-white uppercase tracking-widest">
                        BRANDING_INJECTION
                      </h3>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[8px] font-black text-slate-500 uppercase italic">
                        Primary_Design_Token (Color)
                      </label>
                      <div className="flex gap-4 items-center">
                        <input
                          type="color"
                          value={content?.theme_color || "#06b6d4"}
                          onChange={(e) =>
                            handleUpdateContent("theme_color", e.target.value)
                          }
                          className="w-12 h-12 bg-transparent border-none cursor-pointer"
                        />
                        <Input
                          value={content?.theme_color || "#06b6d4"}
                          onChange={(e) =>
                            handleUpdateContent("theme_color", e.target.value)
                          }
                          className="bg-black/80 border-white/10 rounded-none h-12 text-sm font-mono uppercase"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[8px] font-black text-slate-500 uppercase italic">
                        Brand_Identity (Xandim...)
                      </label>
                      <Input
                        value={content?.site_name || ""}
                        onChange={(e) =>
                          handleUpdateContent("site_name", e.target.value)
                        }
                        className="bg-black/80 border-white/10 rounded-none h-12 text-sm text-white font-black italic uppercase"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-[8px] font-black text-slate-500 uppercase italic">
                        Contact_Node (WhatsApp)
                      </label>
                      <Input
                        value={content?.whatsapp || ""}
                        onChange={(e) =>
                          handleUpdateContent("whatsapp", e.target.value)
                        }
                        className="bg-black/80 border-white/10 rounded-none h-12 text-sm text-emerald-500 font-mono"
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {activeSection === "services" && (
                <motion.div
                  key="services"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-[10px] font-black text-pink-500 uppercase tracking-widest">
                      SERVICES_GRID_ARRAY
                    </h3>
                    <Button
                      size="sm"
                      className="bg-pink-500/10 text-pink-500 border border-pink-500/30 text-[8px] rounded-none hover:bg-pink-500 hover:text-black"
                    >
                      ADD_NODE +
                    </Button>
                  </div>

                  <div className="space-y-4">
                    {(content?.services || []).map(
                      (
                        service: { title: string; desc: string },
                        idx: number,
                      ) => (
                        <div
                          key={idx}
                          className="p-6 bg-black/40 border-l-2 border-pink-500/50 space-y-4 group relative"
                        >
                          <Input
                            value={service.title}
                            onChange={(e) =>
                              handleUpdateService(idx, "title", e.target.value)
                            }
                            className="bg-transparent border-none text-xs font-black text-white hover:bg-white/5 transition-all p-0 h-auto"
                          />
                          <Textarea
                            value={service.desc}
                            onChange={(e) =>
                              handleUpdateService(idx, "desc", e.target.value)
                            }
                            className="bg-transparent border-none text-[10px] text-slate-500 p-0 min-h-[60px] resize-none hover:bg-white/5 transition-all outline-none"
                          />
                          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-6 w-6 p-0 text-slate-700 hover:text-red-500"
                            >
                              ×
                            </Button>
                          </div>
                        </div>
                      ),
                    )}
                  </div>
                </motion.div>
              )}
              {activeSection === "billing" && (
                <motion.div
                  key="billing"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="space-y-6"
                >
                  <div className="p-6 bg-black/40 border border-white/5 space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <CreditCard className="w-4 h-4 text-emerald-500" />
                        <h3 className="text-[10px] font-black text-white uppercase tracking-widest">
                          BILLING_CORE_v1
                        </h3>
                      </div>
                      <Badge
                        className={`${
                          project?.billing_status === "paid"
                            ? "bg-emerald-500/20 text-emerald-500 border-emerald-500/30"
                            : project?.billing_status === "overdue"
                              ? "bg-red-500/20 text-red-500 border-red-500/30"
                              : "bg-amber-500/20 text-amber-500 border-amber-500/30"
                        } rounded-none text-[8px] uppercase font-black`}
                      >
                        STATUS: {project?.billing_status}
                      </Badge>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[8px] font-black text-slate-500 uppercase italic">
                        Próxima_Expiração
                      </label>
                      <div className="text-xl font-black text-white italic">
                        {project?.expiry_date
                          ? format(new Date(project.expiry_date), "dd/MM/yyyy")
                          : "DEFINIR_DATA"}
                      </div>
                    </div>

                    <div className="space-y-4 pt-4 border-t border-white/5">
                      <div className="space-y-2">
                        <label className="text-[8px] font-black text-slate-500 uppercase italic">
                          Mensalidade_Base (BRL)
                        </label>
                        <Input
                          type="number"
                          value={project?.monthly_fee || 99}
                          onChange={(e) =>
                            handleUpdateBilling({
                              monthly_fee: parseFloat(e.target.value),
                            })
                          }
                          className="bg-black/60 border-white/5 text-emerald-400 font-black h-12"
                        />
                      </div>

                      <div className="grid grid-cols-1 gap-2">
                        <Button
                          onClick={markAsPaid}
                          className="w-full bg-emerald-600 hover:bg-emerald-500 text-white text-[10px] font-black uppercase rounded-none h-12 flex items-center gap-2"
                        >
                          <CheckCircle2 className="w-4 h-4" />
                          MARCAR_COMO_PAGO (+30 DIAS)
                        </Button>
                        <Button
                          variant="outline"
                          onClick={copyWhatsappCharge}
                          className="w-full border-cyan-500/30 text-cyan-400 hover:bg-cyan-500 hover:text-black text-[10px] font-black uppercase rounded-none h-12 flex items-center gap-2"
                        >
                          <MessageSquare className="w-4 h-4" />
                          COBRAR_VIA_WHATSAPP (COPY)
                        </Button>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-[8px] text-slate-600 font-mono">
                      <AlertCircle className="w-3 h-3 text-slate-700" />
                      SISTEMA_DE_LOCKDOWN_SEMI_AUTOMÁTICO_ATIVO
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Bottom Utility Bar */}
          <div className="p-4 border-t border-white/5 bg-slate-950 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <RefreshCcw className="w-3 h-3 text-slate-800" />
              <span className="text-[8px] font-black text-slate-800 uppercase italic">
                Last_Sync:{" "}
                {project?.updated_at
                  ? new Date(project.updated_at).toLocaleTimeString()
                  : "N/A"}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Monitor className="w-3 h-3 text-cyan-950" />
              <Zap className="w-3 h-3 text-yellow-950" />
            </div>
          </div>
        </aside>

        {/* RIGHT: REAL-TIME PREVIEW CANVAS */}
        <section className="flex-1 bg-[#0a0a15] p-6 lg:p-12 flex items-center justify-center relative">
          {/* Grid Overlay */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.02] cyber-grid" />

          {/* The Device Frame */}
          <motion.div
            layout
            initial={false}
            animate={{
              width: viewMode === "desktop" ? "100%" : "375px",
              height: viewMode === "desktop" ? "100%" : "80%",
            }}
            transition={{ type: "spring", damping: 25, stiffness: 120 }}
            className="bg-white shadow-[0_0_100px_rgba(0,243,255,0.15)] relative rounded-none overflow-hidden border border-white/10"
          >
            {/* URL Bar Simulation */}
            <div className="h-10 bg-slate-900 border-b border-black flex items-center justify-between px-4 z-10">
              <div className="flex gap-1.5">
                <div className="w-2 h-2 rounded-full bg-rose-500/30" />
                <div className="w-2 h-2 rounded-full bg-amber-500/30" />
                <div className="w-2 h-2 rounded-full bg-emerald-500/30" />
              </div>
              <div className="bg-black/60 px-4 py-1 flex items-center gap-2 max-w-[50%] overflow-hidden">
                <Globe className="w-3 h-3 text-slate-600" />
                <span className="text-[9px] text-slate-400 truncate font-mono">
                  {project?.subdomain}.siteprox.com.br?preview=true
                </span>
              </div>
              <Link href={`/sites/${project?.subdomain}`} target="_blank">
                <ExternalLink className="w-3 h-3 text-cyan-400 hover:text-white transition-all" />
              </Link>
            </div>

            {/* The Actual Preview Content */}
            <div className="w-full h-[calc(100%-40px)] overflow-hidden bg-white">
              <iframe
                id="preview-iframe"
                src={`/sites/${project?.subdomain}?preview=true`}
                className="w-full h-full border-none"
              />
            </div>

            {/* Device Controls floating bottom */}
            <div className="absolute bottom-6 right-6 flex flex-col gap-2">
              <Button
                size="sm"
                className="bg-black/80 backdrop-blur-md rounded-full w-10 h-10 p-0 border border-white/10 shadow-2xl"
                onClick={() => {
                  const iframe = document.getElementById(
                    "preview-iframe",
                  ) as HTMLIFrameElement;
                  if (iframe) iframe.src = iframe.src;
                }}
              >
                <RefreshCcw className="w-4 h-4 text-cyan-400" />
              </Button>
            </div>
          </motion.div>

          {/* Meta Info Hud */}
          <div className="absolute bottom-8 left-8 flex items-center gap-4 text-[9px] font-black text-slate-800 uppercase tracking-widest pointer-events-none">
            <span className="flex items-center gap-1 group">
              <RefreshCcw className="w-3 h-3" /> BUFFER_MODE: AUTO_SYNC
            </span>
            <span className="w-1.5 h-1.5 bg-cyan-500/20 rounded-full" />
            <span>RENDERER: {project?.theme_id || "DEFAULT_HUD_v1"}</span>
          </div>
        </section>
      </main>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #1e293b;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #334155;
        }
        .cyber-grid {
          background-image: linear-gradient(
              to right,
              rgba(0, 243, 255, 0.1) 1px,
              transparent 1px
            ),
            linear-gradient(
              to bottom,
              rgba(0, 243, 255, 0.1) 1px,
              transparent 1px
            );
          background-size: 40px 40px;
        }
      `}</style>
    </div>
  );
}
