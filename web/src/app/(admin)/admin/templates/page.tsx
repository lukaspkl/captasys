"use client";

import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Layout, Plus, Trash2, Globe, Search, Loader2, Sparkles, FolderTree, FlaskConical, Code2, Copy, Save, Check, Zap } from "lucide-react";
import { addTemplate, deleteTemplate, generateStitchPreview } from "@/app/actions/templates";
import { generateStitchLayout, saveGeneratedTemplate } from "@/app/actions/ai-content";
import { createClient } from "@/utils/supabase/client";
import { UploadCloud, X } from "lucide-react";

const SEGMENTS = ['mecanica', 'saude', 'vendas', 'geral'];

export default function AdminTemplatesPage() {
  const [activeTab, setActiveTab] = useState<'library' | 'lab'>('library');
  const [templates, setTemplates] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGeneratingPreview, setIsGeneratingPreview] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  
  // Form State
  const [name, setName] = useState('');
  const [segment, setSegment] = useState('geral');
  const [themeId, setThemeId] = useState('');
  const [previewUrl, setPreviewUrl] = useState('');

  // Lab State
  const [labPrompt, setLabPrompt] = useState('');
  const [labSegment, setLabSegment] = useState('mecanica');
  const [isLabGenerating, setIsLabGenerating] = useState(false);
  const [generatedCode, setGeneratedCode] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  // Save Modal State
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [saveName, setSaveName] = useState('');
  const [saveThemeId, setSaveThemeId] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const supabase = createClient();

  const fetchTemplates = async () => {
    setLoading(true);
    const { data } = await supabase
      .from('site_templates')
      .select('*')
      .order('created_at', { ascending: false });
    setTemplates(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchTemplates();
  }, []);

  const handleMagicPreview = async () => {
    if (!name || isGeneratingPreview) return;
    setIsGeneratingPreview(true);
    try {
      const result = await generateStitchPreview(segment, name);
      if (result.success) {
        setPreviewUrl(result.url);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsGeneratingPreview(false);
    }
  };

  const handleLabGenerate = async () => {
    if (!labPrompt || isLabGenerating) return;
    setIsLabGenerating(true);
    setGeneratedCode(null);
    try {
      const result = await generateStitchLayout(labPrompt, labSegment);
      if (result.success) {
        setGeneratedCode(result.code || null);
      } else {
        setErrorMsg(result.error || 'Erro inesperado.');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLabGenerating(false);
    }
  };

  const copyToClipboard = () => {
    if (!generatedCode) return;
    navigator.clipboard.writeText(generatedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleOpenSaveModal = () => {
    if (!generatedCode) return;
    // Sugerir um nome baseado no prompt ou segmento
    setSaveName(`${labSegment.toUpperCase()} LOTE ${Math.floor(Math.random() * 999)}`);
    setSaveThemeId(`${labSegment}_gen_${Date.now().toString().slice(-4)}`);
    setShowSaveModal(true);
  };

  const handleConfirmSave = async () => {
    if (!saveName || !saveThemeId || !generatedCode) return;
    setIsSaving(true);
    setErrorMsg(null);

    const result = await saveGeneratedTemplate(
      saveName,
      labSegment,
      saveThemeId,
      generatedCode
    );

    if (result.success) {
      setShowSaveModal(false);
      setGeneratedCode(null);
      fetchTemplates();
    } else {
      setErrorMsg(result.error || 'Falha ao salvar template.');
    }
    setIsSaving(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg(null);

    const formData = new FormData();
    formData.append('name', name);
    formData.append('segment', segment);
    formData.append('themeId', themeId);
    formData.append('previewUrl', previewUrl);

    const result = await addTemplate(formData);

    if (result?.error) {
      setErrorMsg(result.error);
      setIsSubmitting(false);
    } else {
      setName('');
      setThemeId('');
      setPreviewUrl('');
      setIsSubmitting(false);
      fetchTemplates();
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Deseja excluir este template?')) return;
    const result = await deleteTemplate(id);
    if (result.success) fetchTemplates();
  };

  return (
    <div className="p-8 space-y-8 animate-in fade-in duration-700">
      
      {/* Header & Tabs */}
      <header className="flex flex-col md:flex-row md:items-end justify-between border-b border-red-500/20 pb-6 gap-6">
        <div className="space-y-1">
          <Badge className="bg-red-500 text-black font-black uppercase tracking-widest text-[10px]">AUTH_LEVEL: ROOT_TEMPLATES</Badge>
          <h1 className="text-4xl font-black text-white italic uppercase tracking-tighter flex items-center gap-3">
            <Layout className="w-8 h-8 text-red-500 hacker-flicker" />
            STITCH_FACTORY_v2
          </h1>
        </div>

        <nav className="flex items-center gap-1 bg-black/40 p-1 border border-white/5 h-12">
            <button 
                onClick={() => setActiveTab('library')}
                className={`px-6 h-full text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2 ${activeTab === 'library' ? 'bg-red-500 text-black' : 'text-slate-500 hover:text-white'}`}
            >
                <FolderTree className="w-3 h-3" />
                BIBLIOTECA_CORE
            </button>
            <button 
                onClick={() => setActiveTab('lab')}
                className={`px-6 h-full text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2 ${activeTab === 'lab' ? 'bg-cyan-500 text-black shadow-[0_0_20px_rgba(34,211,238,0.2)]' : 'text-slate-500 hover:text-white'}`}
            >
                <FlaskConical className="w-3 h-3" />
                LAB_SINTETIZADOR_IA
            </button>
            <a 
                href="/admin/studio"
                className="px-6 h-full text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2 text-emerald-500 hover:bg-emerald-500/10 border-l border-white/5"
            >
                <Zap className="w-3 h-3" />
                ABRIR_STUDIO_V3 (PRO)
            </a>
        </nav>
      </header>

      {activeTab === 'library' ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-in slide-in-from-left-4 duration-500">
          
          {/* Form para adicionar */}
          <div className="lg:col-span-1 space-y-6">
            <div className="hud-panel p-6 bg-slate-950/40 border border-red-500/20">
               <div className="flex items-center gap-2 mb-6">
                  <Plus className="w-4 h-4 text-red-500" />
                  <h3 className="text-xs font-black text-white uppercase tracking-widest">REGISTRAR_LAYOUT_FÍSICO</h3>
               </div>
               
               <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                     <label className="text-[9px] font-black text-slate-500 uppercase">IDENTIFICADOR_NOME</label>
                     <Input 
                      placeholder="Ex: Mecânica Slick Gold"
                      className="bg-black/60 border-red-500/10 text-white rounded-none uppercase text-xs"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                     />
                  </div>
  
                  <div className="space-y-2">
                     <label className="text-[9px] font-black text-slate-500 uppercase">THEME_ID (ARQUIVO .TSX)</label>
                     <Input 
                      placeholder="Ex: mecanica_gold_v1"
                      className="bg-black/60 border-red-500/10 text-white rounded-none text-xs"
                      value={themeId}
                      onChange={(e) => setThemeId(e.target.value)}
                      required
                     />
                  </div>
  
                  <div className="space-y-2">
                     <label className="text-[9px] font-black text-slate-500 uppercase">SEGMENTO_DESTINO</label>
                     <select 
                       className="w-full bg-black/60 border border-red-500/10 text-white rounded-none h-10 px-3 text-xs uppercase font-bold"
                       value={segment}
                       onChange={(e) => setSegment(e.target.value)}
                      >
                        {SEGMENTS.map(s => <option key={s} value={s}>{s}</option>)}
                     </select>
                  </div>
  
                  <div className="space-y-2">
                     <label className="text-[9px] font-black text-slate-500 uppercase">PREVIEW_URL (IMAGE)</label>
                     <div className="flex gap-2">
                        <Input 
                          placeholder="https://..."
                          className="bg-black/60 border-red-500/10 text-white rounded-none text-xs flex-1"
                          value={previewUrl}
                          onChange={(e) => setPreviewUrl(e.target.value)}
                        />
                        <Button 
                          type="button" 
                          variant="outline"
                          onClick={handleMagicPreview}
                          disabled={!name || isGeneratingPreview}
                          className={`border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10 rounded-none w-10 p-0 ${isGeneratingPreview ? 'animate-pulse' : ''}`}
                        >
                          {isGeneratingPreview ? <Loader2 className="w-3 h-3 animate-spin" /> : <Sparkles className="w-3 h-3" />}
                        </Button>
                     </div>
                  </div>
  
                  {errorMsg && (
                      <div className="text-[10px] text-red-500 font-bold bg-red-500/5 p-2 border border-red-500/20 uppercase">
                          {errorMsg}
                      </div>
                  )}
  
                  <Button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="w-full bg-red-500 text-black font-black uppercase tracking-widest rounded-none h-12 hover:bg-red-400"
                  >
                      {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : 'SINC_BANCO_DE_DADOS'}
                  </Button>
               </form>
            </div>
          </div>
  
          {/* Lista de Templates */}
          <div className="lg:col-span-2 space-y-6">
             <div className="bg-black/40 border border-white/5 p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                   <FolderTree className="w-4 h-4 text-cyan-500" />
                   <span className="text-xs font-black text-slate-400 uppercase tracking-widest">ACTIVE_LIBRARY: {templates.length} UNITS</span>
                </div>
                <Button size="sm" variant="ghost" className="text-[10px] text-slate-600" onClick={fetchTemplates}>RECARREGAR_REDE</Button>
             </div>
  
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {loading ? (
                   <div className="col-span-2 py-20 text-center"><Loader2 className="w-10 h-10 animate-spin mx-auto text-red-500/20" /></div>
                ) : (
                  templates.map((t) => (
                    <div key={t.id} className="hud-panel p-4 bg-black/60 border border-white/5 group relative">
                      <div className="flex justify-between items-start mb-4">
                         <Badge className="bg-cyan-500/10 text-cyan-400 border-none text-[8px] uppercase">{t.segment}</Badge>
                         <button 
                          onClick={() => handleDelete(t.id)}
                          className="opacity-0 group-hover:opacity-100 p-2 text-red-500 hover:bg-red-500/10 transition-all rounded-none"
                         >
                           <Trash2 className="w-4 h-4" />
                         </button>
                      </div>
                      
                      <div className="space-y-1">
                         <h4 className="text-sm font-black text-white uppercase">{t.name}</h4>
                         <p className="text-[10px] text-slate-600 font-bold font-mono">ID: {t.theme_id}</p>
                      </div>
  
                      <div className="mt-4 aspect-video bg-slate-900 border border-white/5 overflow-hidden relative">
                         {t.preview_url ? (
                           <img src={t.preview_url} alt={t.name} className="w-full h-full object-cover opacity-50 contrast-125" />
                         ) : (
                           <div className="w-full h-full flex items-center justify-center opacity-10">
                              <Globe className="w-10 h-10" />
                           </div>
                         )}
                         <div className="absolute inset-0 bg-linear-to-t from-black to-transparent" />
                      </div>
                    </div>
                  ))
                )}
             </div>
          </div>
        </div>
      ) : (
          /* LABORATÓRIO STITCH AI */
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-in slide-in-from-right-4 duration-500 h-[calc(100vh-250px)]">
              
              {/* Painel de Controle */}
              <div className="space-y-6 flex flex-col h-full">
                  <div className="hud-panel p-8 bg-slate-950/40 border border-cyan-500/20 flex-1 flex flex-col gap-6">
                      <div className="space-y-1">
                        <div className="flex items-center gap-3 text-cyan-400">
                            <Code2 className="w-5 h-5 animate-pulse" />
                            <h3 className="text-sm font-black uppercase tracking-widest">SINTETIZADOR_DE_LAYOUT</h3>
                        </div>
                        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Gere arquivos TSX puros via Inteligência de Design Stitch.</p>
                      </div>

                      <div className="space-y-4 flex-1 flex flex-col">
                         <div className="space-y-2">
                            <label className="text-[9px] font-black text-slate-500 uppercase">CLUSTER_DE_DESIGN (SEGMENTO)</label>
                            <select 
                                className="w-full bg-black/60 border border-cyan-500/20 text-white rounded-none h-12 px-4 text-xs uppercase font-bold focus:border-cyan-400 outline-none"
                                value={labSegment}
                                onChange={(e) => setLabSegment(e.target.value)}
                            >
                                {SEGMENTS.map(s => <option key={s} value={s}>{s}</option>)}
                            </select>
                         </div>

                         <div className="space-y-2 flex-1 flex flex-col">
                            <label className="text-[9px] font-black text-slate-500 uppercase">REQUISITOS_DO_TEMPLATE (PROMPT)</label>
                            <textarea 
                                placeholder="Ex: Crie um layout dark luxuoso para oficina, com foco em carros esportivos. Adicione seção de serviços com cards neon e rodapé minimalista..."
                                className="w-full flex-1 bg-black/60 border border-cyan-500/20 text-white p-6 rounded-none text-sm font-bold placeholder:text-slate-800 outline-none focus:border-cyan-400 transition-all resize-none"
                                value={labPrompt}
                                onChange={(e) => setLabPrompt(e.target.value)}
                            />
                         </div>
                      </div>

                      <Button 
                        onClick={handleLabGenerate}
                        disabled={isLabGenerating || !labPrompt}
                        className="w-full h-16 bg-cyan-500 text-black font-black uppercase tracking-[0.2em] rounded-none hover:bg-cyan-400 disabled:opacity-20 flex items-center justify-center gap-3 shadow-[0_0_30px_rgba(34,211,238,0.2)]"
                      >
                        {isLabGenerating ? (
                            <>
                                <Loader2 className="w-6 h-6 animate-spin text-black" />
                                <span>PROCESSANDO_SÍNTESE_DE_CÓDIGO...</span>
                            </>
                        ) : (
                            <>
                                <Sparkles className="w-6 h-6" />
                                <span>GERAR_TEMPLATE_COMPONENT</span>
                            </>
                        )}
                      </Button>
                  </div>
              </div>

              {/* Saída de Código / Preview */}
              <div className="h-full">
                  {!generatedCode && !isLabGenerating && (
                      <div className="h-full border border-dashed border-white/5 flex flex-col items-center justify-center gap-6 opacity-30 text-center p-12">
                          <FlaskConical className="w-20 h-20 text-slate-700" />
                          <div className="space-y-2">
                             <h4 className="font-black text-white uppercase text-xl">LABORATÓRIO_EM_STBY</h4>
                             <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Insira os requisitos ao lado para sintetizar a interface.</p>
                          </div>
                      </div>
                  )}

                  {isLabGenerating && (
                      <div className="h-full border border-cyan-500/20 bg-black/40 p-8 flex flex-col gap-6 items-center justify-center">
                          <div className="relative">
                            <Loader2 className="w-16 h-16 text-cyan-500 animate-spin" />
                            <Sparkles className="absolute inset-0 w-6 h-6 text-cyan-400 m-auto animate-flicker" />
                          </div>
                          <div className="text-center space-y-4">
                            <span className="text-[10px] text-cyan-400 font-black uppercase tracking-[0.5em] block animate-pulse">SINTETIZANDO_CÓDIGO_TSX</span>
                            <div className="w-64 h-1 bg-cyan-950 rounded-full overflow-hidden">
                               <div className="w-1/2 h-full bg-cyan-400 animate-[loading_2s_ease-in-out_infinite]" />
                            </div>
                          </div>
                      </div>
                  )}

                  {generatedCode && (
                      <div className="h-full flex flex-col space-y-4 animate-in slide-in-from-bottom-4 duration-700">
                          <div className="flex items-center justify-between border-b border-cyan-500/20 pb-4">
                             <div className="flex items-center gap-3">
                                <Code2 className="w-4 h-4 text-cyan-400" />
                                <span className="text-[10px] font-black text-white uppercase tracking-widest">CÓDIGO_SINTETIZADO_v2.0</span>
                             </div>
                             <div className="flex gap-2">
                                <Button size="sm" variant="outline" className="h-8 text-[9px] rounded-none border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10 flex items-center gap-2" onClick={copyToClipboard}>
                                    {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                                    {copied ? 'COPIADO' : 'COPIAR_CÓDIGO'}
                                </Button>
                                <Button 
                                  size="sm" 
                                  className="h-8 text-[9px] rounded-none bg-emerald-500 text-black hover:bg-emerald-400 font-black flex items-center gap-2" 
                                  onClick={handleOpenSaveModal}
                                >
                                    <UploadCloud className="w-3 h-3" />
                                    SUBIR_PAGINA
                                </Button>
                             </div>
                          </div>
                          
                          <div className="flex-1 bg-black/80 border border-cyan-500/10 p-6 overflow-auto custom-scrollbar font-mono text-[11px] leading-relaxed text-cyan-100/80">
                             <pre><code>{generatedCode}</code></pre>
                          </div>

                          <div className="hud-panel p-4 bg-emerald-500/5 border border-emerald-500/10 flex items-center justify-between">
                              <span className="text-[9px] text-emerald-400 font-black uppercase tracking-widest leading-none">Status: Código validado e pronto para implantação.</span>
                              <Badge className="bg-emerald-500 text-black text-[8px] uppercase">READY_TO_DEPLOY</Badge>
                          </div>
                      </div>
                  )}
              </div>
          </div>
      )}

      {/* Decorative Scanlines */}
      <div className="scanline opacity-10 pointer-events-none" />

      {/* SAVE MODAL */}
      {showSaveModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="hud-panel w-full max-w-lg p-8 bg-slate-950 border-emerald-500/40 relative space-y-8">
             <button 
              onClick={() => setShowSaveModal(false)}
              className="absolute top-4 right-4 text-slate-500 hover:text-white"
             >
                <X className="w-5 h-5" />
             </button>

             <div className="space-y-2">
                <Badge className="bg-emerald-500 text-black font-black uppercase text-[9px]">ENVIAR_PARA_CORE</Badge>
                <h3 className="text-2xl font-black text-white italic uppercase tracking-tighter">CONFIGURAR_SÍNTESE</h3>
             </div>

             <div className="space-y-6">
                <div className="space-y-2">
                   <label className="text-[9px] font-black text-slate-500 uppercase">NOME_DE_EXIBIÇÃO</label>
                   <Input 
                    placeholder="Ex: Layout Premium Dark"
                    className="bg-black/60 border-emerald-500/20 text-white rounded-none uppercase text-xs h-12"
                    value={saveName}
                    onChange={(e) => setSaveName(e.target.value)}
                   />
                </div>

                <div className="space-y-2">
                   <label className="text-[9px] font-black text-slate-500 uppercase">IDENTIFICADOR_DO_ARQUIVO (ID_TEMA)</label>
                   <Input 
                    placeholder="Ex: mecanica_v1_top"
                    className="bg-black/60 border-emerald-500/20 text-white rounded-none text-xs h-12"
                    value={saveThemeId}
                    onChange={(e) => setSaveThemeId(e.target.value)}
                   />
                   <p className="text-[8px] text-slate-600 uppercase font-bold">* ESTE NOME SERÁ USADO NO CAMINHO: .../templates/{saveThemeId}.tsx</p>
                </div>

                <div className="pt-4 flex gap-4">
                    <Button 
                      className="flex-1 bg-emerald-500 text-black font-black uppercase tracking-widest rounded-none h-14 hover:bg-emerald-400"
                      onClick={handleConfirmSave}
                      disabled={isSaving || !saveName || !saveThemeId}
                    >
                        {isSaving ? <Loader2 className="w-5 h-5 animate-spin" /> : 'CONFIRMAR_E_SUBIR'}
                    </Button>
                    <Button 
                      variant="outline"
                      className="px-8 border-white/10 text-slate-400 hover:bg-white/5 rounded-none h-14 uppercase text-[10px] font-black"
                      onClick={() => setShowSaveModal(false)}
                    >
                        CANCELAR
                    </Button>
                </div>
             </div>
          </div>
        </div>
      )}
    </div>
  );
}
