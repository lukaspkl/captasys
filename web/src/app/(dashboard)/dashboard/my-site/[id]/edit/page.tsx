"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  Save, ArrowLeft, Globe, MessageSquare, 
  Layout, MapPin, Clock, Zap, Loader2, ExternalLink
} from "lucide-react";
import Link from "next/link";

export default function EditSitePage() {
  const { id } = useParams();
  const router = useRouter();
  const supabase = createClient();
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [site, setSite] = useState<any>(null);
  const [content, setContent] = useState<any>(null);

  useEffect(() => {
    async function fetchSite() {
      const { data, error } = await supabase
        .from('site_projects')
        .select('*')
        .eq('id', id)
        .single();

      if (error || !data) {
        console.error("Erro ao carregar site:", error);
        router.push("/dashboard/my-site");
        return;
      }

      setSite(data);
      setContent(data.content);
      setLoading(false);
    }

    if (id) fetchSite();
  }, [id, supabase, router]);

  const handleUpdateContent = (field: string, value: any) => {
    setContent((prev: any) => ({
      ...prev,
      [field]: value
    }));
  };

  const handleUpdateService = (index: number, field: string, value: string) => {
    const newServices = [...content.services];
    newServices[index] = { ...newServices[index], [field]: value };
    handleUpdateContent('services', newServices);
  };

  const handleSave = async () => {
    setSaving(true);
    const { error } = await supabase
      .from('site_projects')
      .update({ content: content })
      .eq('id', id);

    if (error) {
      alert("Erro ao salvar: " + error.message);
    } else {
      // Pequeno feedback visual
      setTimeout(() => {
        setSaving(false);
        router.refresh();
      }, 500);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center">
        <Loader2 className="w-10 h-10 text-purple-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white font-sans p-6 md:p-12">
      <div className="max-w-5xl mx-auto space-y-12">
        
        {/* Header de Comando */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-white/5 pb-8">
          <div className="space-y-2">
            <Link href="/dashboard/my-site" className="text-xs text-slate-500 hover:text-purple-400 flex items-center gap-2 transition-colors uppercase font-black tracking-widest mb-4">
              <ArrowLeft className="w-3 h-3" /> Voltar para Meus Sites
            </Link>
            <div className="flex items-center gap-4">
               <div className="w-12 h-12 bg-purple-500/10 border border-purple-500/30 flex items-center justify-center">
                  <Layout className="w-6 h-6 text-purple-500" />
               </div>
               <div>
                  <h1 className="text-4xl font-black italic uppercase tracking-tighter">Editor_de_Conteúdo</h1>
                  <Badge className="bg-purple-500/10 text-purple-400 border-none rounded-none text-[8px] tracking-[0.3em] font-black uppercase">
                    MODO_EDIÇÃO_ATIVO: {site.subdomain}
                  </Badge>
               </div>
            </div>
          </div>

          <Button 
            onClick={handleSave}
            disabled={saving}
            className="bg-purple-600 hover:bg-purple-500 text-white font-black uppercase tracking-widest text-xs px-10 h-14 rounded-none shadow-[0_0_30px_rgba(139,92,246,0.3)] transition-all flex items-center gap-3"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            {saving ? "SINCRONIZANDO..." : "SALVAR_ALTERAÇÕES"}
          </Button>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* PAINEL DE EDIÇÃO */}
          <div className="lg:col-span-7 space-y-10">
            
            {/* Seção: Identidade */}
            <section className="space-y-6">
              <h3 className="text-[10px] font-black text-purple-400 uppercase tracking-[0.3em] flex items-center gap-3">
                <div className="w-1 h-1 bg-purple-500"></div> IDENTIDADE_VISUAL
              </h3>
              <div className="grid grid-cols-1 gap-6 bg-white/[0.02] border border-white/5 p-8">
                <div className="space-y-2">
                  <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Nome do Negócio</label>
                  <Input 
                    value={content.site_name}
                    onChange={(e) => handleUpdateContent('site_name', e.target.value)}
                    className="bg-black/60 border-white/10 rounded-none h-12 text-sm font-bold uppercase italic focus:border-purple-500 transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Link do WhatsApp (Apenas Números)</label>
                  <div className="relative">
                    <Input 
                      value={content.whatsapp}
                      onChange={(e) => handleUpdateContent('whatsapp', e.target.value)}
                      className="bg-black/60 border-white/10 rounded-none h-12 text-sm font-bold pl-12 focus:border-purple-500 transition-all text-emerald-400"
                    />
                    <MessageSquare className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-500" />
                  </div>
                </div>
              </div>
            </section>

            {/* Seção: Hero (Headline) */}
            <section className="space-y-6">
              <h3 className="text-[10px] font-black text-cyan-400 uppercase tracking-[0.3em] flex items-center gap-3">
                <div className="w-1 h-1 bg-cyan-500"></div> CHAMADA_PRINCIPAL (HERO)
              </h3>
              <div className="grid grid-cols-1 gap-6 bg-white/[0.02] border border-white/5 p-8">
                <div className="space-y-2">
                  <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Título de Impacto</label>
                  <Input 
                    value={content.hero_title}
                    onChange={(e) => handleUpdateContent('hero_title', e.target.value)}
                    className="bg-black/60 border-white/10 rounded-none h-12 text-sm font-bold focus:border-cyan-500 transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Subtítulo Persuasivo</label>
                  <Textarea 
                    value={content.hero_subtitle}
                    onChange={(e) => handleUpdateContent('hero_subtitle', e.target.value)}
                    className="bg-black/60 border-white/10 rounded-none min-h-[100px] text-sm font-medium focus:border-cyan-500 transition-all resize-none"
                  />
                </div>
              </div>
            </section>

            {/* Seção: Serviços */}
            <section className="space-y-6">
              <h3 className="text-[10px] font-black text-pink-500 uppercase tracking-[0.3em] flex items-center gap-3">
                <div className="w-1 h-1 bg-pink-500"></div> GRID_DE_SERVIÇOS
              </h3>
              <div className="space-y-4">
                {content.services.map((service: any, index: number) => (
                  <div key={index} className="bg-white/[0.02] border border-white/5 p-6 space-y-4 group hover:border-pink-500/20 transition-all">
                    <div className="flex justify-between items-center">
                       <span className="text-[8px] font-black text-slate-700 uppercase tracking-widest">#00{index + 1}</span>
                    </div>
                    <div className="space-y-4">
                      <Input 
                        value={service.title}
                        onChange={(e) => handleUpdateService(index, 'title', e.target.value)}
                        placeholder="Título do Serviço"
                        className="bg-black/40 border-white/5 rounded-none h-10 text-xs font-bold uppercase tracking-tight focus:border-pink-500 transition-all"
                      />
                      <Textarea 
                         value={service.desc}
                         onChange={(e) => handleUpdateService(index, 'desc', e.target.value)}
                         placeholder="Breve descrição"
                         className="bg-black/40 border-white/5 rounded-none min-h-[80px] text-xs font-medium focus:border-pink-500 transition-all resize-none"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* PAINEL LATERAL: LOCALIZAÇÃO E PREVIEW */}
          <div className="lg:col-span-5 space-y-10">
            
            {/* Seção: Localização */}
            <section className="space-y-6">
              <h3 className="text-[10px] font-black text-amber-500 uppercase tracking-[0.3em] flex items-center gap-3">
                <div className="w-1 h-1 bg-amber-500"></div> LOCALIZAÇÃO_E_HORÁRIO
              </h3>
              <div className="bg-white/[0.02] border border-white/5 p-8 space-y-6">
                <div className="space-y-2">
                  <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                    <MapPin className="w-3 h-3" /> Endereço Físico
                  </label>
                  <Input 
                    value={content.address}
                    onChange={(e) => handleUpdateContent('address', e.target.value)}
                    className="bg-black/60 border-white/10 rounded-none h-12 text-xs font-bold focus:border-amber-500 transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                    <Clock className="w-3 h-3" /> Horário de Funcionamento
                  </label>
                  <Input 
                    value={content.hours}
                    onChange={(e) => handleUpdateContent('hours', e.target.value)}
                    className="bg-black/60 border-white/10 rounded-none h-12 text-xs font-bold focus:border-amber-500 transition-all"
                  />
                </div>
              </div>
            </section>

            {/* Seção: Preview Rápido */}
            <section className="bg-purple-950/10 border border-purple-500/20 p-8 space-y-6 relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                  <Zap className="w-24 h-24 text-purple-500" />
               </div>
               <h3 className="text-[12px] font-black text-white uppercase tracking-tighter italic flex items-center gap-2">
                 <Globe className="w-4 h-4 text-purple-400" /> VISUALIZAR_SISTEMA
               </h3>
               <p className="text-[10px] text-slate-400 font-medium leading-relaxed uppercase tracking-widest">
                 Seu nó digital está ativo no endereço:
                 <span className="block text-purple-400 font-black mt-2 underline">{site.subdomain}.siteprox.com</span>
               </p>
               <Link href={site.liveUrl?.startsWith('http') ? site.liveUrl : `https://${site.liveUrl}`} target="_blank">
                  <Button className="w-full h-12 bg-white/5 border border-white/20 text-white font-black uppercase text-[10px] tracking-widest hover:bg-white hover:text-black transition-all rounded-none mt-4">
                    ABRIR_SENTINELA_LIVE <ExternalLink className="w-4 h-4 ml-2" />
                  </Button>
               </Link>
            </section>
          </div>

        </div>
      </div>
    </div>
  );
}
