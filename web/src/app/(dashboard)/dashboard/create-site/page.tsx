"use client";

import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Globe, ArrowRight, Check, Hammer, HeartPulse, Building2, Store, ChevronRight, Loader2, Sparkles, Layout } from "lucide-react";
import { createSite, checkSubdomain } from "@/app/actions/sites";
import { getTemplatesBySegment } from "@/app/actions/templates";
import { useRouter } from "next/navigation";

const SEGMENTS = [
  { id: 'mecanica', label: 'Mecânica / Auto', icon: Hammer, color: 'text-red-500', bg: 'bg-red-500/10' },
  { id: 'saude', label: 'Saúde / Bem-Estar', icon: HeartPulse, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
  { id: 'vendas', label: 'Vendas / Lojas', icon: Store, color: 'text-pink-500', bg: 'bg-pink-500/10' },
  { id: 'geral', label: 'Serviços Gerais', icon: Building2, color: 'text-cyan-500', bg: 'bg-cyan-500/10' },
];

export default function CreateSiteWizard() {
  const [step, setStep] = useState(1);
  const [segment, setSegment] = useState('');
  const [themeId, setThemeId] = useState('');
  const [availableTemplates, setAvailableTemplates] = useState<any[]>([]);
  const [subdomain, setSubdomain] = useState('');
  const [isCheckingSubdomain, setIsCheckingSubdomain] = useState(false);
  const [isSubdomainAvailable, setIsSubdomainAvailable] = useState<boolean | null>(null);
  
  // Data States
  const [siteName, setSiteName] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [description, setDescription] = useState('');
  const [hours, setHours] = useState('Seg à Sáb: 08h - 18h');
  const [address, setAddress] = useState('');
  const [heroImage, setHeroImage] = useState('');
  const [heroPrompt, setHeroPrompt] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingTemplates, setIsLoadingTemplates] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const router = useRouter();

  // Load templates when segment changes
  useEffect(() => {
    if (segment) {
      setIsLoadingTemplates(true);
      getTemplatesBySegment(segment).then(data => {
        setAvailableTemplates(data);
        setIsLoadingTemplates(false);
      });
    }
  }, [segment]);

  // Subdomain check with debounce
  useEffect(() => {
    const check = async () => {
      if (subdomain.length >= 3) {
        setIsCheckingSubdomain(true);
        const taken = await checkSubdomain(subdomain);
        setIsSubdomainAvailable(!taken);
        setIsCheckingSubdomain(false);
      } else {
        setIsSubdomainAvailable(null);
      }
    };
    const timer = setTimeout(check, 500);
    return () => clearTimeout(timer);
  }, [subdomain]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg(null);

    const formData = new FormData();
    formData.append('subdomain', subdomain);
    formData.append('segment', segment);
    formData.append('themeId', themeId);
    formData.append('siteName', siteName);
    formData.append('whatsapp', whatsapp);
    formData.append('description', description);
    formData.append('hours', hours);
    formData.append('address', address);
    formData.append('heroImage', heroImage);
    formData.append('heroPrompt', heroPrompt);

    const result = await createSite(formData);

    if (result.error) {
      setErrorMsg(result.error);
      setIsSubmitting(false);
    } else {
      router.push(`/dashboard/my-site?new=true`);
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-12 animate-in fade-in duration-700">
      
      {/* Header HUD */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-cyan-500/20 pb-10">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Badge className="bg-cyan-500 text-black font-black uppercase tracking-widest text-[9px]">WIZARD_v1.0</Badge>
            <div className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em] animate-pulse">PROVISIONING_TUNNEL_ACTIVE</div>
          </div>
          <h1 className="text-5xl font-black text-white italic uppercase tracking-tighter flex items-center gap-4">
            <Sparkles className="w-10 h-10 text-cyan-400 hacker-flicker" />
            GERAR_NOVO_PROJETO
          </h1>
        </div>
        
        <div className="flex items-center gap-4">
          {[1, 2, 3, 4].map((s) => (
            <div 
              key={s} 
              className={`w-10 h-1 bg-cyan-950 relative overflow-hidden transition-all duration-500 ${step >= s ? 'w-16' : 'w-4'}`}
            >
               {step >= s && (
                 <div className="absolute inset-0 bg-cyan-400 shadow-[0_0_10px_#22d3ee]" />
               )}
            </div>
          ))}
        </div>
      </header>

      {/* Main Form Area */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Sidebar Info */}
        <aside className="md:col-span-1 space-y-8">
            <div className="hud-panel p-6 bg-slate-950/40 border border-cyan-500/10 space-y-4">
                <div className="text-[9px] font-black text-cyan-500/50 uppercase tracking-widest">PROGRESS_REPORT</div>
                <div className="space-y-3">
                    <div className={`text-[10px] font-bold uppercase flex items-center gap-2 ${step >= 1 ? 'text-emerald-400' : 'text-slate-600'}`}>
                        {step > 1 ? <Check className="w-3 h-3" /> : <div className="w-3 h-3 rounded-full border border-current" />}
                        SEGMENTO
                    </div>
                    <div className={`text-[10px] font-bold uppercase flex items-center gap-2 ${step >= 2 ? 'text-emerald-400' : 'text-slate-600'}`}>
                        {step > 2 ? <Check className="w-3 h-3" /> : <div className="w-3 h-3 rounded-full border border-current" />}
                        TEMPLATE
                    </div>
                    <div className={`text-[10px] font-bold uppercase flex items-center gap-2 ${step >= 3 ? 'text-emerald-400' : 'text-slate-600'}`}>
                        {step > 3 ? <Check className="w-3 h-3" /> : <div className="w-3 h-3 rounded-full border border-current" />}
                        URL_VALIDA
                    </div>
                    <div className={`text-[10px] font-bold uppercase flex items-center gap-2 ${step >= 4 ? 'text-emerald-400' : 'text-slate-600'}`}>
                        {step > 4 ? <Check className="w-3 h-3" /> : <div className="w-3 h-3 rounded-full border border-current" />}
                        READY
                    </div>
                </div>
            </div>
        </aside>

        {/* Content Area */}
        <main className="md:col-span-3">
          
          <form onSubmit={handleSubmit} className="space-y-12">
            
            {/* ETAPA 1: SEGMENTO */}
            {step === 1 && (
              <div className="space-y-8 animate-in slide-in-from-right-4 duration-500">
                <div className="space-y-2">
                  <h2 className="text-2xl font-black text-white italic uppercase tracking-tight">01. SELECIONE O CLUSTER</h2>
                  <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">O template será otimizado para o seu nicho de mercado.</p>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {SEGMENTS.map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => { setSegment(s.id); setStep(2); }}
                      className={`group p-8 text-left border transition-all relative overflow-hidden ${
                        segment === s.id 
                        ? 'bg-cyan-500/10 border-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.1)]' 
                        : 'bg-black/40 border-cyan-500/10 hover:border-cyan-500/30'
                      }`}
                    >
                      <div className={`w-12 h-12 rounded-none ${s.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                        <s.icon className={`w-6 h-6 ${s.color}`} />
                      </div>
                      <div className="font-black text-white uppercase tracking-widest text-sm">{s.label}</div>
                      <div className="mt-2 text-[10px] text-slate-500 font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">ATIVAR_SISTEMA</div>
                      {segment === s.id && <div className="absolute top-2 right-2 w-2 h-2 bg-cyan-400 shadow-[0_0_8px_#22d3ee]" />}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* ETAPA 2: TEMPLATE SELECTION */}
            {step === 2 && (
              <div className="space-y-8 animate-in slide-in-from-right-4 duration-500">
                <div className="space-y-2">
                  <h2 className="text-2xl font-black text-white italic uppercase tracking-tight">02. SELECIONE O LAYOUT_ENGINE</h2>
                  <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">Escolha a estética visual que define a autoridade do seu nó.</p>
                </div>

                {isLoadingTemplates ? (
                  <div className="py-20 flex flex-col items-center justify-center gap-4">
                    <Loader2 className="w-10 h-10 text-cyan-500 animate-spin" />
                    <span className="text-[10px] text-slate-600 font-black uppercase">ACESSANDO_BIBLIOTECA_STITCH...</span>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {availableTemplates.length > 0 ? (
                        availableTemplates.map((t) => (
                        <button
                          key={t.id}
                          type="button"
                          onClick={() => { setThemeId(t.theme_id); setStep(3); }}
                          className={`group aspect-video border transition-all relative overflow-hidden bg-black/40 ${
                            themeId === t.theme_id ? 'border-cyan-400' : 'border-white/5 hover:border-white/20'
                          }`}
                        >
                          <img src={t.preview_url || '/placeholder-template.png'} className="w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-opacity" />
                          <div className="absolute inset-x-0 bottom-0 bg-black/80 p-3 flex justify-between items-center">
                             <span className="text-[10px] font-black text-white uppercase truncate">{t.name}</span>
                             <Layout className="w-3 h-3 text-cyan-400" />
                          </div>
                          {themeId === t.theme_id && <div className="absolute top-2 right-2 w-2 h-2 bg-cyan-400 shadow-[0_0_10px_#22d3ee]" />}
                        </button>
                      ))
                    ) : (
                      <div className="col-span-2 py-10 text-center border-2 border-dashed border-white/5">
                         <p className="text-[10px] text-slate-700 font-black uppercase tracking-[0.2em]">Nenhum template disponível para este segmento.</p>
                         <p className="text-[8px] text-slate-800 mt-2">O Admin ainda não registrou layouts para {segment}.</p>
                         <Button variant="ghost" className="mt-4 text-[10px]" onClick={() => setStep(1)}>VOLTAR_CLUSTER</Button>
                      </div>
                    )}
                  </div>
                )}
                
                {themeId && (
                  <div className="flex gap-4">
                    <Button type="button" variant="ghost" onClick={() => setStep(1)}>VOLTAR_AO_CLUSTER</Button>
                  </div>
                )}
              </div>
            )}

            {/* ETAPA 3: SUBDOMÍNIO */}
            {step === 3 && (
              <div className="space-y-8 animate-in slide-in-from-right-4 duration-500">
                <div className="space-y-2">
                  <h2 className="text-2xl font-black text-white italic uppercase tracking-tight">03. IDENTIDADE DA REDE</h2>
                  <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">Defina como o seu site será visualizado na internet.</p>
                </div>

                <div className="space-y-6 hud-panel p-8 bg-black/40 border border-cyan-500/10">
                   <div className="space-y-4">
                      <label className="text-cyan-500/60 text-[9px] font-black uppercase tracking-[2px] block">ENDEREÇO_DO_SITE (SUBDOMÍNIO)</label>
                      <div className="relative group">
                          <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-cyan-500/30" />
                          <Input 
                            placeholder="SUA-EMPRESA"
                            className="bg-black/60 border-cyan-500/20 text-white pl-12 pr-40 h-16 focus:border-cyan-400 rounded-none transition-all placeholder:text-slate-800 uppercase font-black tracking-widest text-lg"
                            value={subdomain}
                            onChange={(e) => setSubdomain(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
                          />
                          <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-3">
                              {isCheckingSubdomain && <Loader2 className="w-5 h-5 text-cyan-400 animate-spin" />}
                              {!isCheckingSubdomain && isSubdomainAvailable === true && <Check className="w-5 h-5 text-emerald-500" />}
                              {!isCheckingSubdomain && isSubdomainAvailable === false && <span className="text-[10px] text-red-500 font-black uppercase">INDISPONÍVEL</span>}
                              <span className="text-slate-600 font-bold text-xs">.CAPTASYS.NET</span>
                          </div>
                      </div>
                   </div>
                </div>

                <div className="flex gap-4">
                  <Button type="button" variant="ghost" onClick={() => setStep(2)}>VOLTAR</Button>
                  <Button 
                    type="button" 
                    disabled={!isSubdomainAvailable}
                    className="flex-1 bg-cyan-500 text-black font-black uppercase h-14 rounded-none hover:bg-cyan-400 disabled:opacity-20"
                    onClick={() => setStep(4)}
                  >
                    CONTINUAR <ChevronRight className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            )}

            {/* ETAPA 4: CONTEÚDO */}
            {step === 4 && (
              <div className="space-y-8 animate-in slide-in-from-right-4 duration-500">
                <div className="space-y-2">
                  <h2 className="text-2xl font-black text-white italic uppercase tracking-tight">04. INJEÇÃO_DE_DADOS_MASTER</h2>
                  <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">Informações reais para alimentar o motor de IA de 5.000 Reais.</p>
                </div>

                <div className="space-y-6 hud-panel p-8 bg-black/40 border border-cyan-500/10">
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-cyan-500/60 text-[9px] font-black uppercase tracking-[2px] block">NOME_COMERCIAL</label>
                        <Input 
                            placeholder="EX: SILVA AUTO SERVICE"
                            className="bg-black/60 border-cyan-500/20 text-white h-12 rounded-none transition-all placeholder:text-slate-800 uppercase font-bold tracking-widest text-sm"
                            value={siteName}
                            onChange={(e) => setSiteName(e.target.value)}
                            required
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-cyan-500/60 text-[9px] font-black uppercase tracking-[2px] block">CONTATO_WHATSAPP</label>
                        <Input 
                            placeholder="55(DDD)XXXXXXXXX"
                            className="bg-black/60 border-cyan-500/20 text-white h-12 rounded-none transition-all placeholder:text-slate-800 font-bold tracking-widest text-sm"
                            value={whatsapp}
                            onChange={(e) => setWhatsapp(e.target.value.replace(/\D/g, ''))}
                            required
                        />
                      </div>

                      <div className="md:col-span-2 space-y-2">
                        <label className="text-cyan-500/60 text-[9px] font-black uppercase tracking-[2px] block">BREVE_REDE_SOBRE (OPCIONAL)</label>
                        <textarea 
                            placeholder="Ex: Somos especialistas em câmbio automático há 20 anos..."
                            className="w-full bg-black/60 border border-cyan-500/20 text-white p-4 h-24 rounded-none transition-all placeholder:text-slate-800 font-bold text-xs"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-cyan-500/60 text-[9px] font-black uppercase tracking-[2px] block">ESTABELECIMENTO (ENDEREÇO)</label>
                        <Input 
                            placeholder="Rua Exemplo, 123 - Centro"
                            className="bg-black/60 border-cyan-500/20 text-white h-12 rounded-none transition-all placeholder:text-slate-800 font-bold text-xs"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-cyan-500/60 text-[9px] font-black uppercase tracking-[2px] block">CRONOGRAMA (HORÁRIO)</label>
                        <Input 
                            placeholder="Seg-Sáb: 08:00 - 18:00"
                            className="bg-black/60 border-cyan-500/20 text-white h-12 rounded-none transition-all placeholder:text-slate-800 font-bold text-xs"
                            value={hours}
                            onChange={(e) => setHours(e.target.value)}
                        />
                      </div>

                      {/* NEW: Hero Image Choice */}
                      <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-white/5 mt-4">
                        <div className="space-y-2">
                          <label className="text-cyan-400 text-[9px] font-black uppercase tracking-[2px] block flex items-center gap-2">
                             <Globe className="w-3 h-3" /> FOTO_REAL_LINK (Prioridade)
                          </label>
                          <Input 
                              placeholder="URL DA SUA FOTOGRAFIA REAL"
                              className="bg-black/60 border-cyan-500/20 text-white h-12 rounded-none transition-all placeholder:text-slate-800 text-[10px]"
                              value={heroImage}
                              onChange={(e) => setHeroImage(e.target.value)}
                          />
                          <p className="text-[8px] text-slate-600 font-bold uppercase italic">O site usará esta imagem se você fornecer o link.</p>
                        </div>

                        <div className="space-y-2">
                          <label className="text-cyan-400 text-[9px] font-black uppercase tracking-[2px] block flex items-center gap-2">
                             <Sparkles className="w-3 h-3" /> CENÁRIO_IA (Se não tiver foto)
                          </label>
                          <textarea 
                              placeholder="Descreva o que quer na foto do banner..."
                              className="w-full bg-black/60 border border-cyan-500/20 text-white p-3 h-12 rounded-none transition-all placeholder:text-slate-800 text-[10px] focus:border-cyan-400 outline-none"
                              value={heroPrompt}
                              onChange={(e) => setHeroPrompt(e.target.value)}
                          />
                          <p className="text-[8px] text-slate-600 font-bold uppercase italic">A IA gerará esta imagem somente no momento da publicação.</p>
                        </div>
                      </div>
                   </div>
                </div>

                {errorMsg && <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-500 text-[10px] font-black uppercase tracking-widest">{errorMsg}</div>}

                <div className="flex gap-4">
                  <Button type="button" variant="ghost" onClick={() => setStep(3)}>VOLTAR</Button>
                  <Button 
                    type="submit" 
                    disabled={isSubmitting || !siteName || !whatsapp}
                    className="flex-1 bg-emerald-500 text-black font-black uppercase h-16 rounded-none hover:bg-emerald-400 disabled:opacity-20 flex items-center justify-center gap-3 shadow-[0_4px_20px_rgba(16,185,129,0.3)]"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>PROCESSANDO_CONTEÚDO_IA...</span>
                      </>
                    ) : (
                      <>
                        <span>BOOT_FINAL_PROVISÃO</span> 
                        <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </Button>
                </div>
              </div>
            )}

          </form>

        </main>
      </div>

      {/* Decorative Scanlines */}
      <div className="scanline opacity-10 pointer-events-none" />
    </div>
  );
}
