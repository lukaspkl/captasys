"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Code2, 
  Monitor, 
  Smartphone, 
  Tablet, 
  History, 
  Layers, 
  Send, 
  ChevronLeft, 
  Save,
  Loader2,
  Check,
  Zap
} from "lucide-react";
import Link from "next/link";
import { generateStitchLayout, saveGeneratedTemplate } from "@/app/actions/ai-content";

// Simulação de histórico de versões (depois vindo do banco)
const HISTORY_MOCK = [
  { id: 1, prompt: "Design inicial: Clínica Odontológica", time: "10:30" },
  { id: 2, prompt: "Mudar botões para verde WhatsApp", time: "10:35" },
  { id: 3, prompt: "Adicionar seção de preços", time: "10:42" },
];

export default function StitchStudioPage() {
  const [device, setDevice] = useState<'desktop' | 'mobile' | 'tablet'>('desktop');
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedCode, setGeneratedCode] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  
  // Ações de Salvamento
  const [showSaveConfirm, setShowSaveConfirm] = useState(false);
  const [saveName, setSaveName] = useState("");
  const [saveThemeId, setSaveThemeId] = useState("");
  const [saveSegment, setSaveSegment] = useState("geral");
  const [isSaving, setIsSaving] = useState(false);

  const handleGenerate = async () => {
    if (!prompt || isGenerating) return;
    setIsGenerating(true);
    try {
      // PROTÓTIPO PLANO B: Conectando ao retorno real do Stitch Google
      const result = await generateStitchLayout(prompt, "vendas");
      if (result.success) {
        setGeneratedCode(result.code || null);
        // URL Real Gerada pelo Stitch da Google (lh3.googleusercontent.com)
        setPreviewUrl("https://lh3.googleusercontent.com/aida/ADBb0ug5vqGqVFI44_BIUaH4odTixTBV5oH0t_11b_DPzTDTk7Sl3eaWo1uJpB1xgnC8hYrK_P08pMZlW8Ez8jcgLmunAbiZkkMg6MSEpoVqhsXPtC0_n84eZcbAg39zs9ZyhIL3u4SAZ-4pKEkMN4SCMeq08rEnUu_iAvYglynylR0Dt58HP1nORBee8OZO3FLI2-mhEEqgxx6JO1Vxay4tf9AwybwgH5Y1YWgNCYEePJEMrudClgjDMJe2Bb4");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSave = async () => {
    if (!saveName || !saveThemeId || !generatedCode) return;
    setIsSaving(true);
    const result = await saveGeneratedTemplate(saveName, saveSegment, saveThemeId, generatedCode);
    if (result.success) {
      setShowSaveConfirm(false);
      alert("Design salvo com sucesso na Biblioteca Core!");
    }
    setIsSaving(false);
  };

  return (
    <div className="h-screen bg-black overflow-hidden flex flex-col font-sans">
      
      {/* Top Bar - Minimalista e Funcional */}
      <header className="h-14 border-b border-white/5 bg-slate-950/80 backdrop-blur-md flex items-center justify-between px-6 z-50">
        <div className="flex items-center gap-4">
          <Link href="/admin/templates" className="text-slate-500 hover:text-white transition-colors">
            <ChevronLeft className="w-5 h-5" />
          </Link>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="border-cyan-500/30 text-cyan-400 text-[8px] uppercase font-black px-2">PROJECT_STITCH_CORE</Badge>
            <h1 className="text-white text-xs font-black uppercase tracking-tighter">Studio_Synthesizer_v3</h1>
          </div>
        </div>

        {/* Versão seletora (Desktop/Mobile) */}
        <div className="flex items-center gap-1 bg-black/40 p-1 border border-white/5">
          <button 
            onClick={() => setDevice('desktop')}
            className={`w-9 h-8 flex items-center justify-center transition-all ${device === 'desktop' ? 'bg-cyan-500 text-black shadow-[0_0_15px_rgba(34,211,238,0.3)]' : 'text-slate-500 hover:text-white'}`}
          >
            <Monitor className="w-4 h-4" />
          </button>
          <button 
            onClick={() => setDevice('tablet')}
            className={`w-9 h-8 flex items-center justify-center transition-all ${device === 'tablet' ? 'bg-cyan-500 text-black' : 'text-slate-500 hover:text-white'}`}
          >
            <Tablet className="w-4 h-4" />
          </button>
          <button 
            onClick={() => setDevice('mobile')}
            className={`w-9 h-8 flex items-center justify-center transition-all ${device === 'mobile' ? 'bg-cyan-500 text-black' : 'text-slate-500 hover:text-white'}`}
          >
            <Smartphone className="w-4 h-4" />
          </button>
        </div>

        <div className="flex items-center gap-3">
          <Button 
            disabled={!generatedCode}
            onClick={() => {
                setSaveName(`LAYOUT_${Date.now().toString().slice(-4)}`);
                setSaveThemeId(`gen_theme_${Date.now().toString().slice(-4)}`);
                setShowSaveConfirm(true);
            }}
            className="bg-emerald-500 hover:bg-emerald-400 text-black text-[10px] font-black uppercase rounded-none px-6 h-9"
          >
            <Save className="w-3 h-3 mr-2" />
            VINCULAR_AO_CORE
          </Button>
        </div>
      </header>

      {/* Main Workspace */}
      <main className="flex-1 flex overflow-hidden">
        
        {/* Left Sidebar - History & Layers */}
        <aside className="w-64 border-r border-white/5 bg-slate-950/40 p-4 space-y-6 hidden lg:block overflow-y-auto custom-scrollbar">
          <div className="space-y-4">
             <div className="flex items-center gap-2 text-slate-400 mb-2">
                <History className="w-3 h-3" />
                <span className="text-[9px] font-black uppercase tracking-widest">LINHA_DO_TEMPO</span>
             </div>
             {HISTORY_MOCK.map((item) => (
                <div key={item.id} className="p-3 border border-white/5 bg-black/20 hover:border-cyan-500/30 transition-all cursor-pointer group">
                   <p className="text-[10px] text-white font-bold leading-tight mb-1 truncate">{item.prompt}</p>
                   <span className="text-[8px] text-slate-600 font-mono">{item.time} - REV_0{item.id}</span>
                </div>
             ))}
          </div>

          <div className="space-y-4 pt-4 border-t border-white/5">
             <div className="flex items-center gap-2 text-slate-400 mb-2">
                <Layers className="w-3 h-3" />
                <span className="text-[9px] font-black uppercase tracking-widest">ESTRUTURA_TEMA</span>
             </div>
             <div className="space-y-1">
                {['HeroSection', 'Features', 'Pricing', 'Footer'].map(layer => (
                    <div key={layer} className="text-[10px] text-slate-500 font-mono py-1 px-2 border-l border-white/5 hover:text-cyan-400 transition-colors cursor-default">
                       {layer}
                    </div>
                ))}
             </div>
          </div>
        </aside>

        {/* Center - The Canvas / Preview */}
        <section className="flex-1 bg-[#0a0a0a] relative flex flex-col p-8 overflow-y-auto">
          
          <div className="mx-auto w-full max-w-5xl h-full flex flex-col gap-4">
              
              {/* Canvas Frame */}
              <div className={`mx-auto bg-white shadow-2xl transition-all duration-500 overflow-hidden relative ${
                device === 'desktop' ? 'w-full aspect-video' : 
                device === 'tablet' ? 'w-[768px] aspect-[4/3]' : 
                'w-[375px] aspect-[9/19]'
              }`}>
                {previewUrl ? (
                   <img src={previewUrl} className="w-full h-full object-cover" alt="Preview Design" />
                ) : (
                   <div className="w-full h-full bg-slate-900 flex flex-col items-center justify-center gap-6 opacity-30">
                      <Zap className="w-16 h-16 text-cyan-500 animate-pulse" />
                      <p className="text-xs font-black uppercase tracking-[0.3em] text-white">AGUARDANDO_SÍNTESE</p>
                   </div>
                )}

                {/* Loading Overlay */}
                {isGenerating && (
                    <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center gap-4 z-10 animate-in fade-in">
                       <Loader2 className="w-10 h-10 text-cyan-500 animate-spin" />
                       <span className="text-[10px] font-black text-cyan-400 uppercase tracking-[0.5em] animate-pulse">SINTETIZANDO_INTERFACE...</span>
                    </div>
                )}
              </div>

              {/* Interaction Bar - The Prompt */}
              <div className="mt-4 hud-panel bg-slate-950 border-cyan-500/20 p-4 relative group transition-all focus-within:border-cyan-500/60">
                 <div className="flex items-center gap-4">
                    <input 
                      placeholder={generatedCode ? "O que deseja mudar nesse layout? (Ex: troque o azul por neon)" : "Descreva o seu template premium..."}
                      className="flex-1 bg-transparent text-white border-none outline-none font-bold text-sm placeholder:text-slate-700"
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
                    />
                    <Button 
                        size="sm"
                        onClick={handleGenerate}
                        disabled={isGenerating || !prompt}
                        className="bg-cyan-500 text-black hover:bg-cyan-400 rounded-none px-6 uppercase font-black text-[10px]"
                    >
                        {isGenerating ? <Loader2 className="w-4 h-4 animate-spin" /> : <><Send className="w-3 h-3 mr-2" /> DISPARAR</>}
                    </Button>
                 </div>
              </div>

              {/* Code Preview Toggle */}
              {generatedCode && (
                  <div className="mt-8 space-y-4 animate-in slide-in-from-bottom-5 duration-700">
                     <div className="flex items-center gap-3 mb-2">
                        <Code2 className="w-4 h-4 text-cyan-400" />
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">CÓDIGO_FONTE_SINTETIZADO</span>
                     </div>
                     <div className="bg-black/90 border border-white/5 p-6 rounded-none font-mono text-[10px] text-cyan-100/50 max-h-64 overflow-auto custom-scrollbar">
                        <pre><code>{generatedCode}</code></pre>
                     </div>
                  </div>
              )}
          </div>

        </section>
      </main>

      {/* SAVE MODAL (REUTILIZADO) */}
      {showSaveConfirm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/95 backdrop-blur-md animate-in fade-in duration-300">
          <div className="hud-panel w-full max-w-md p-10 bg-slate-950 border-emerald-500/40 space-y-8 text-center">
             <div className="space-y-2">
                <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-500/20">
                    <Check className="w-8 h-8 text-emerald-500" />
                </div>
                <h3 className="text-2xl font-black text-white italic uppercase tracking-tighter">FINALIZAR_LOTE</h3>
                <p className="text-[10px] text-slate-500 font-bold uppercase">Confirmar a injeção do arquivo no sistema.</p>
             </div>

             <div className="space-y-4 text-left">
                <div className="space-y-1">
                   <label className="text-[8px] font-black text-slate-600 uppercase">LABEL_PUBLICO</label>
                   <Input 
                    value={saveName}
                    onChange={(e) => setSaveName(e.target.value)}
                    className="bg-black border-emerald-500/20 text-white rounded-none h-12 text-xs uppercase"
                   />
                </div>
                
                <div className="space-y-1">
                    <label className="text-[8px] font-black text-slate-600 uppercase tracking-widest leading-none">CATEGORIA_NICHO (BACKEND)</label>
                    <select 
                      value={saveSegment}
                      onChange={(e) => setSaveSegment(e.target.value)}
                      className="w-full bg-black border border-emerald-500/20 text-white rounded-none h-12 text-[10px] uppercase font-bold px-4 focus:border-emerald-500/60 outline-none appearance-none cursor-pointer"
                    >
                      <option value="mecanica">🚗 MECÂNICA / AUTO</option>
                      <option value="saude">🏥 SAÚDE / BEM-ESTAR</option>
                      <option value="vendas">🛍️ VENDAS / LOJAS</option>
                      <option value="geral">💼 SERVIÇOS GERAIS</option>
                    </select>
                </div>

                <div className="space-y-1">
                   <label className="text-[8px] font-black text-slate-600 uppercase">SYSTEM_FILE_NAME (ID_TEMA)</label>
                   <Input 
                    value={saveThemeId}
                    onChange={(e) => setSaveThemeId(e.target.value)}
                    className="bg-black border-emerald-500/20 text-white rounded-none h-12 text-xs"
                   />
                </div>
             </div>

             <div className="flex flex-col gap-3">
                <Button 
                    className="w-full bg-emerald-500 text-black font-black h-14 rounded-none uppercase tracking-widest hover:bg-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.2)]"
                    onClick={handleSave}
                    disabled={isSaving}
                >
                    {isSaving ? <Loader2 className="w-5 h-5 animate-spin" /> : 'CONCLUIR_E_PUBLICAR'}
                </Button>
                <button 
                    onClick={() => setShowSaveConfirm(false)}
                    className="text-[10px] font-black text-slate-600 uppercase hover:text-white transition-colors py-2"
                >
                    VOLTAR_AO_EDITOR
                </button>
             </div>
          </div>
        </div>
      )}

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #1e293b; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #334155; }
        .hud-panel { position: relative; border: 1px solid rgba(255, 255, 255, 0.05); }
        .hud-panel::after { content: ''; position: absolute; top: -1px; left: -1px; width: 10px; height: 10px; border-top: 2px solid currentColor; border-left: 2px solid currentColor; pointer-events: none; opacity: 0.5; }
        @keyframes loading { 0% { transform: translateX(-100%); } 100% { transform: translateX(200%); } }
      `}</style>
    </div>
  );
}
