"use client";

import { useState, useEffect, use } from "react";
import { 
  Save, Play, Palette, Share2, Eye,
  ChevronLeft, Wand2, ArrowLeft, Star, Shield
} from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export default function SiteBuilderPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const [siteData, setSiteData] = useState({
    name: "",
    nicho: "",
    city: "",
    colors: { primary: "#06b6d4", secondary: "#0f172a" },
    headline: "Transforme sua presença digital hoje",
    description: "Referência em qualidade e atendimento personalizado. Nossa missão é entregar resultados excepcionais com foco total na satisfação do cliente.",
    services: ["Serviço de Elite 01", "Solução Estratégica 02", "Consultoria Técnica 03"],
    benefits: [
      { id: 1, title: "Qualidade Garantida", text: "Processos certificados e rigorosos para o melhor resultado." },
      { id: 2, title: "Atendimento 24/7", text: "Suporte especializado sempre disponível para você." },
      { id: 3, title: "Tecnologia de Ponta", text: "O que há de mais moderno no mercado à sua disposição." }
    ],
    testimonials: [
      { id: 1, name: "Maria Silva", role: "CEO da TechFlow", text: "O melhor investimento que fizemos este ano. Os resultados superaram todas as expectativas.", rating: 5 },
      { id: 2, name: "João Pedro", role: "Diretor Comercial", text: "Profissionalismo impecável e entrega no prazo. Recomendo fortemente para qualquer empresa.", rating: 5 }
    ]
  });

  const [activeTab, setActiveTab] = useState("content"); // content, design, media
  const [previewLoaded, setPreviewLoaded] = useState(false);

  useEffect(() => {
    // Tenta carregar dados do slug
    const rawName = slug.split('-').slice(0, -1).join(' ');
    const companyName = rawName ? rawName.replace(/\b\w/g, l => l.toUpperCase()) : "Nova Empresa";
    const cityName = slug.split('-').pop()?.replace(/\b\w/g, l => l.toUpperCase()) || "Cidade";
    
    // Tenta recuperar do localStorage o que foi configurado no Dashboard
    const savedNicho = localStorage.getItem("capta_nicho") || "Empresa";

    setSiteData(prev => ({
      ...prev,
      name: companyName,
      city: cityName,
      nicho: savedNicho,
      headline: `O melhor ${savedNicho} de ${cityName}`
    }));
    
    setPreviewLoaded(true);
  }, [slug]);

  if (!previewLoaded) return null;

  return (
    <div className="flex h-screen bg-[#020617] text-slate-300 font-sans overflow-hidden">
      
      {/* SIDEBAR DE EDIÇÃO */}
      <aside className="w-[400px] border-r border-white/5 bg-[#0a0f1e] flex flex-col z-50">
        <div className="p-6 border-b border-white/5 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded bg-white/5 flex items-center justify-center group-hover:bg-[#06b6d4] transition-all">
                <ArrowLeft className="w-4 h-4 text-slate-500 group-hover:text-black" />
            </div>
            <span className="text-xs font-black uppercase tracking-widest text-[#06b6d4]">Studio Builder</span>
          </Link>
          <Badge variant="outline" className="text-[9px] border-white/10 uppercase tracking-tighter">V1.0 Alpha</Badge>
        </div>

        <div className="flex-1 overflow-y-auto p-8 space-y-10 custom-scrollbar">
          
          {/* TABS NAVEGAÇÃO INTERNA */}
          <div className="flex bg-black/40 p-1 rounded-none border border-white/5">
            {["content", "design", "media"].map(tab => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 h-10 text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === tab ? 'bg-white text-black' : 'text-slate-500 hover:text-white'}`}
              >
                {tab}
              </button>
            ))}
          </div>

          {activeTab === "content" && (
            <div className="space-y-6 animate-in fade-in slide-in-from-left-4">
               <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] block">Título do Business</label>
                  <Input 
                    value={siteData.name} 
                    onChange={e => setSiteData({...siteData, name: e.target.value})}
                    className="bg-black/40 border-white/10 rounded-none h-12 text-sm italic font-bold focus:border-[#06b6d4]" 
                  />
               </div>

               <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] block">Headline Principal</label>
                  <textarea 
                    value={siteData.headline}
                    onChange={e => setSiteData({...siteData, headline: e.target.value})}
                    className="w-full bg-black/40 border border-white/10 rounded-none p-4 h-32 text-sm italic font-bold focus:border-[#06b6d4] outline-none transition-all"
                  />
               </div>

               <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] block">Serviços Oferecidos</label>
                  {siteData.services.map((service, idx) => (
                    <div key={idx} className="flex gap-2">
                      <Input 
                        value={service}
                        onChange={e => {
                          const newServices = [...siteData.services];
                          newServices[idx] = e.target.value;
                          setSiteData({...siteData, services: newServices});
                        }}
                        className="bg-black/40 border-white/10 rounded-none h-10 text-xs italic font-bold focus:border-[#06b6d4]" 
                      />
                    </div>
                  ))}
               </div>

               <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] block">Bio / Descrição</label>
                  <textarea 
                    value={siteData.description}
                    onChange={e => setSiteData({...siteData, description: e.target.value})}
                    className="w-full bg-black/40 border border-white/10 rounded-none p-4 h-32 text-sm italic font-bold focus:border-[#06b6d4] outline-none transition-all"
                  />
               </div>
            </div>
          )}

          {activeTab === "design" && (
            <div className="space-y-8 animate-in fade-in slide-in-from-left-4">
               <div className="space-y-4">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] block">Cor Primária (Accent)</label>
                  <div className="flex gap-4 items-center">
                     <input 
                       type="color" 
                       value={siteData.colors.primary} 
                       onChange={e => setSiteData({...siteData, colors: {...siteData.colors, primary: e.target.value}})}
                       className="w-12 h-12 bg-transparent border-none cursor-pointer"
                     />
                     <Input value={siteData.colors.primary} className="bg-black/40 border-white/10 text-xs font-mono uppercase" />
                  </div>
               </div>
               
               <div className="space-y-4">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] block">Cor de Fundo (Secondary)</label>
                  <div className="flex gap-4 items-center">
                     <input 
                       type="color" 
                       value={siteData.colors.secondary} 
                       onChange={e => setSiteData({...siteData, colors: {...siteData.colors, secondary: e.target.value}})}
                       className="w-12 h-12 bg-transparent border-none cursor-pointer"
                     />
                     <Input value={siteData.colors.secondary} className="bg-black/40 border-white/10 text-xs font-mono uppercase" />
                  </div>
               </div>
               
               <div className="pt-6">
                  <p className="text-[9px] text-slate-600 italic leading-relaxed">
                    * As cores são aplicadas automaticamente em botões, links, ícones e elementos de destaque no preview.
                  </p>
               </div>
            </div>
          )}

          {activeTab === "media" && (
            <div className="space-y-6 animate-in fade-in slide-in-from-left-4 text-center py-20">
               <Play className="w-12 h-12 mx-auto text-slate-700 mb-4" />
               <p className="text-xs italic text-slate-600">Gestão de fotos e vídeos em breve...</p>
            </div>
          )}

        </div>

        <div className="p-8 border-t border-white/5 space-y-4 bg-black/20">
            <Button className="w-full h-14 bg-[#06b6d4] hover:bg-white hover:text-black text-black font-black italic tracking-widest transition-all">
               <Save className="w-4 h-4 mr-2" /> SALVAR_PROJETO
            </Button>
            <div className="flex gap-4">
              <Button variant="outline" className="flex-1 border-white/10 text-white font-black italic text-[10px] rounded-none h-12">
                 <Share2 className="w-4 h-4 mr-2" /> SHARE
              </Button>
              <Button variant="outline" className="flex-1 border-white/10 text-white font-black italic text-[10px] rounded-none h-12">
                 <Eye className="w-4 h-4 mr-2" /> PREVIEW
              </Button>
            </div>
        </div>
      </aside>

      {/* CANVAS DE PREVIEW (SENSACIONÁL) */}
      <main className="flex-1 bg-[#050a18] p-10 flex items-center justify-center relative overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#06b6d4]/5 rounded-full blur-[120px] -mr-96 -mt-96 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-indigo-500/5 rounded-full blur-[100px] -ml-64 -mb-64"></div>
        
        {/* MOCKUP DO SITE */}
        <div className="w-full h-full max-w-5xl bg-[#0a0f1e] border border-white/10 rounded-none shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-700">
           {/* Browser Header */}
           <div className="h-10 border-b border-white/5 flex items-center px-4 bg-black/40 gap-2 shrink-0">
              <div className="flex gap-1.5">
                <div className="w-2 h-2 rounded-full bg-rose-500/40"></div>
                <div className="w-2 h-2 rounded-full bg-amber-500/40"></div>
                <div className="w-2 h-2 rounded-full bg-emerald-500/40"></div>
              </div>
              <div className="mx-auto bg-white/5 rounded px-4 py-0.5 text-[9px] font-mono text-slate-500 flex items-center gap-2">
                 <LinktreeIcon className="w-2.5 h-2.5" /> preview.bizboost.app/proposta/{slug}
              </div>
           </div>

           {/* Site Content (Simulação Dinâmica) */}
           <div className="flex-1 overflow-y-auto bg-white text-black font-sans leading-relaxed selection:bg-[#06b6d4]/30 custom-scrollbar scroll-smooth">
              
              {/* Header */}
              <nav className="px-10 py-6 flex justify-between items-center border-b border-slate-100 sticky top-0 bg-white/80 backdrop-blur-md z-10 transition-all">
                <span className="text-2xl font-black italic tracking-tighter uppercase">{siteData.name || "Business"}</span>
                <div className="hidden md:flex gap-8 text-[10px] font-bold uppercase tracking-widest text-slate-500">
                  <span className="text-black cursor-pointer hover:opacity-70 transition-colors">Início</span>
                  <span className="cursor-pointer hover:opacity-70 transition-colors">Vantagens</span>
                  <span className="cursor-pointer hover:opacity-70 transition-colors">Depoimentos</span>
                  <span className="cursor-pointer hover:opacity-70 transition-colors">Contato</span>
                </div>
                <Button 
                  style={{ backgroundColor: siteData.colors.primary }}
                  className="text-white hover:opacity-90 font-black italic uppercase text-[10px] tracking-widest rounded-none h-10 px-6"
                >
                  Falar Conosco
                </Button>
              </nav>

              {/* Hero Section - ULTRA PREMIUM */}
              <section className="relative px-10 py-28 md:py-40 border-b border-slate-50 overflow-hidden">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-slate-50/50 rounded-full blur-[100px] -mr-64 -mt-32"></div>
                
                <div className="max-w-4xl mx-auto space-y-10 relative z-10 text-center md:text-left">
                  <div className="flex items-center gap-3 justify-center md:justify-start">
                    <div className="w-8 h-px bg-slate-300"></div>
                    <span 
                      style={{ color: siteData.colors.primary }}
                      className="text-[11px] font-black uppercase tracking-[0.3em]"
                    >
                      {siteData.nicho || 'Referência Local'} em {siteData.city}
                    </span>
                  </div>

                  <h1 className="text-6xl md:text-8xl font-black italic leading-[0.85] tracking-tighter uppercase drop-shadow-sm">
                    {siteData.headline}
                  </h1>

                  <p className="text-xl text-slate-500 max-w-xl font-medium leading-relaxed italic">
                    {siteData.description}
                  </p>

                  <div className="flex flex-col sm:flex-row gap-6 pt-6 justify-center md:justify-start">
                     <Button 
                       style={{ backgroundColor: siteData.colors.primary }}
                       className="h-16 px-12 text-white font-black italic uppercase tracking-widest rounded-none hover:scale-105 transition-all text-sm shadow-xl shadow-[#000]/10"
                     >
                        Agendar Consultoria Grátis
                     </Button>
                     <div className="flex items-center gap-4 px-6 border-l-2 border-slate-100 hidden sm:flex">
                        <div className="flex gap-0.5">
                           {[1,2,3,4,5].map(i => (
                             <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                           ))}
                        </div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">4.9/5 Estrelas no Google</span>
                     </div>
                  </div>
                </div>
              </section>

              {/* Benefits Section - SLEEK CARDS */}
              <section className="px-10 py-24 bg-white">
                 <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-12">
                    {siteData.benefits.map((benefit) => (
                      <div key={benefit.id} className="group cursor-pointer">
                         <div 
                           style={{ backgroundColor: `${siteData.colors.primary}10` }}
                           className="w-16 h-16 flex items-center justify-center mb-8 rounded-none transition-all group-hover:scale-110"
                         >
                            <Shield className="w-7 h-7" style={{ color: siteData.colors.primary }} />
                         </div>
                         <h3 className="text-xl font-black italic uppercase tracking-tight mb-4 group-hover:opacity-70 transition-all">{benefit.title}</h3>
                         <p className="text-sm text-slate-500 leading-relaxed italic">
                            {benefit.text}
                         </p>
                      </div>
                    ))}
                 </div>
              </section>

              {/* Services Section - DEEP DESIGN */}
              <section className="px-10 py-28 bg-[#0a0f1e] text-white overflow-hidden relative">
                 <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_50%,rgba(6,182,212,0.1),transparent)] pointer-events-none"></div>
                 <div className="max-w-6xl mx-auto space-y-20 relative z-10">
                    <div className="text-center md:text-left space-y-4">
                       <h2 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter leading-none">Nossa Expertise <br/><span style={{ color: siteData.colors.primary }}>Ao Seu Alcance</span></h2>
                       <p className="text-slate-400 italic max-w-lg">Soluções planejadas para converter visitantes em clientes fiéis. O que fazemos não é mágica, é engenharia digital.</p>
                    </div>
                    
                    <div className="grid md:grid-cols-3 gap-8">
                       {siteData.services.map((service, idx) => (
                         <div key={idx} className="bg-white/5 border border-white/10 p-10 rounded-none hover:bg-white/10 transition-all backdrop-blur-md group">
                            <span className="text-[40px] font-black italic text-white/10 mb-6 block group-hover:text-white transition-all">0{idx + 1}</span>
                            <h3 className="text-lg font-black italic uppercase tracking-widest mb-4">{service}</h3>
                            <div className="h-0.5 w-10 bg-white/20 mb-6 group-hover:w-full transition-all duration-500" style={{ backgroundColor: siteData.colors.primary }}></div>
                            <p className="text-xs text-slate-400 leading-relaxed italic font-medium">
                               Implementação focada em UX e conversão agressiva para o público de {siteData.city}.
                            </p>
                         </div>
                       ))}
                    </div>
                 </div>
              </section>

              {/* Testimonials - SOCIAL PROOF */}
              <section className="px-10 py-28 bg-white border-b border-slate-50">
                 <div className="max-w-6xl mx-auto flex flex-col items-center space-y-16">
                    <div className="text-center space-y-3">
                       <Badge className="bg-slate-100 text-slate-500 rounded-none mb-2 border-none font-black italic uppercase tracking-widest text-[9px] px-4">Testemunhos</Badge>
                       <h2 className="text-4xl font-black italic uppercase tracking-tighter">O que dizem os Clientes</h2>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-10 w-full">
                       {siteData.testimonials.map((t) => (
                         <div key={t.id} className="p-12 border border-slate-100 bg-slate-50/30 flex flex-col gap-6 relative group overflow-hidden">
                            <div className="absolute top-0 left-0 w-1 h-0 bg-black group-hover:h-full transition-all duration-500" style={{ backgroundColor: siteData.colors.primary }}></div>
                            <div className="flex gap-1">
                               {[1,2,3,4,5].map(i => (
                                 <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                               ))}
                            </div>
                            <p className="text-lg font-medium italic text-slate-700 leading-relaxed">&ldquo;{t.text}&rdquo;</p>
                            <div className="flex items-center gap-4 mt-4">
                               <div className="w-12 h-12 rounded-full bg-slate-200 shrink-0 border border-slate-100 overflow-hidden">
                                  <Image src={`https://ui-avatars.com/api/?name=${encodeURIComponent(t.name)}&background=random&color=fff`} alt={t.name} width={48} height={48} />
                               </div>
                               <div>
                                  <h4 className="text-sm font-black uppercase tracking-widest">{t.name}</h4>
                                  <span className="text-[10px] font-bold text-slate-400 italic uppercase">{t.role}</span>
                               </div>
                            </div>
                         </div>
                       ))}
                    </div>
                 </div>
              </section>

              {/* Footer / Contact */}
              <footer className="px-10 py-24 bg-slate-50 text-slate-900 overflow-hidden relative">
                 <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-16 items-start">
                    <div className="space-y-6">
                       <h2 className="text-4xl font-black italic tracking-tighter uppercase">{siteData.name}</h2>
                       <p className="max-w-xs text-xs font-medium text-slate-400 italic leading-relaxed uppercase tracking-widest">A melhor experiência para clientes que buscam excelência no digital.</p>
                       <div className="flex gap-4">
                          {[1,2,3].map(i => <div key={i} className="w-10 h-10 border border-slate-200 flex items-center justify-center hover:bg-black hover:text-white transition-all cursor-pointer"><Share2 className="w-4 h-4" /></div>)}
                       </div>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-12 w-full md:w-auto">
                       <div className="space-y-4">
                          <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#06b6d4]" style={{ color: siteData.colors.primary }}>Navegação</h4>
                          <ul className="space-y-2 text-xs font-bold text-slate-500 uppercase tracking-widest italic">
                             <li className="hover:text-black cursor-pointer">Início</li>
                             <li className="hover:text-black cursor-pointer">Sobre</li>
                             <li className="hover:text-black cursor-pointer">Projetos</li>
                          </ul>
                       </div>
                       <div className="space-y-4">
                          <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#06b6d4]" style={{ color: siteData.colors.primary }}>Suporte</h4>
                          <ul className="space-y-2 text-xs font-bold text-slate-500 uppercase tracking-widest italic">
                             <li className="hover:text-black cursor-pointer">Contato</li>
                             <li className="hover:text-black cursor-pointer">Segurança</li>
                             <li className="hover:text-black cursor-pointer">LGPD</li>
                          </ul>
                       </div>
                    </div>
                 </div>
                 <div className="max-w-6xl mx-auto mt-20 pt-10 border-t border-slate-100 flex justify-between items-center text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em]">
                    <span>© 2026 {siteData.name}. All rights reserved.</span>
                    <span className="italic">Built with CaptaSaaS Studio</span>
                 </div>
              </footer>

           </div>
        </div>

        {/* Floating Tips */}
        <div className="absolute bottom-16 right-16 flex flex-col gap-4 animate-in slide-in-from-right-10 duration-700 delay-500">
           <div className="bg-black/60 backdrop-blur-md border border-[#06b6d4]/30 p-4 rounded-none shadow-xl flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-[#06b6d4]/20 flex items-center justify-center text-[#06b6d4]">
                 <Wand2 className="w-5 h-5" />
              </div>
              <div className="pr-4">
                 <p className="text-[10px] font-black text-white uppercase tracking-widest">Dica Builder</p>
                 <p className="text-[11px] text-slate-400 italic">Use cores contrastantes para o CTA principal.</p>
              </div>
           </div>
        </div>
      </main>
    </div>
  );
}

function LinktreeIcon(props: any) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  );
}
