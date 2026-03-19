import { Globe, Phone, MapPin, Clock, Instagram, Star, ChevronRight, MessageSquare } from "lucide-react";
import LeadContactForm from "../[slug]/_components/contact-form";

export default function MecanicaAlpha01({ site }: { site: any }) {
  const config = site.content || {};
  const themeColor = config.theme_color || '#06b6d4';

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-slate-950 selection:text-white pb-20">
      
      {/* ─── NAV ─── */}
      <nav className="fixed top-0 w-full z-50 bg-white/70 backdrop-blur-2xl border-b border-slate-100 px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-3 group">
          <div className="w-12 h-12 bg-slate-950 rounded-2xl flex items-center justify-center text-white rotate-3 group-hover:rotate-0 transition-all">
             <Globe className="w-6 h-6" />
          </div>
          <span className="text-2xl font-black italic tracking-tighter uppercase">{config.site_name}</span>
        </div>
        <div className="flex items-center gap-6">
           <a href={`https://wa.me/${config.whatsapp}`} className="hidden md:block text-sm font-black uppercase tracking-widest text-slate-500 hover:text-slate-950">Fale Conosco</a>
           <a 
            href={`https://wa.me/${config.whatsapp}`} 
            style={{ backgroundColor: themeColor }}
            className="text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 transition-all hover:scale-105 active:scale-95 shadow-xl shadow-slate-200"
          >
             <Phone className="w-4 h-4 fill-white" />
             Agendar Agora
           </a>
        </div>
      </nav>

      {/* ─── HERO ─── */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-slate-50 -z-10 skew-x-12 translate-x-20" />
        
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 space-y-6 reveal-left">
            <div className="inline-flex items-center gap-2 bg-slate-100 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-slate-600">
               <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
               Destaque em {site.segment.toUpperCase()}
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-slate-950 leading-[0.9] tracking-tighter">
              {config.hero_title}
            </h1>
            <p className="text-lg text-slate-600 max-w-lg leading-relaxed">
              {config.hero_subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
               <a 
                href={`https://wa.me/${config.whatsapp}`}
                style={{ backgroundColor: themeColor }}
                className="flex items-center justify-center gap-3 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:scale-105 active:scale-95 transition-all shadow-xl shadow-slate-200"
               >
                 Abrir Chat no WhatsApp
                 <ChevronRight className="w-5 h-5" />
               </a>
            </div>
          </div>
          
          <div className="flex-1 relative reveal-right">
             <div className="aspect-square rounded-[40px] overflow-hidden rotate-2 shadow-2xl relative bg-slate-100 italic flex items-center justify-center text-slate-300">
                {config.logo_url ? (
                   <img src={config.logo_url} alt="Logo" className="w-full h-full object-cover" />
                ) : (
                   <div className="text-center p-10">
                      <Globe className="w-20 h-20 mb-4 mx-auto opacity-20" />
                      <p className="font-bold tracking-widest text-xs uppercase text-slate-400">IMAGE_PLACEHOLDER</p>
                   </div>
                )}
             </div>
          </div>
        </div>
      </section>

      {/* ─── INFO SECTION ─── */}
      <section className="py-20 bg-slate-950 text-white rounded-t-[60px] -mt-10 relative z-10 pb-32">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12">
           <div className="space-y-4 reveal-up">
              <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center">
                 <MapPin className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold">Localização</h3>
              <p className="text-slate-400 text-sm">{config.address || 'Consulte nosso endereço no WhatsApp'}</p>
           </div>
           <div className="space-y-4 reveal-up" style={{ animationDelay: '0.2s' }}>
              <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center">
                 <Clock className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold">Funcionamento</h3>
              <p className="text-slate-400 text-sm">{config.hours || 'Seg à Sáb: 08h - 18h'}</p>
           </div>
           <div className="space-y-4 reveal-up" style={{ animationDelay: '0.4s' }}>
              <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center">
                 <Instagram className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold">Contato Direto</h3>
              <p className="text-slate-400 text-sm">Entre em contato para orçamentos e dúvidas rápidas.</p>
           </div>
        </div>
      </section>

      {/* ─── CONTACT SECTION ─── */}
      <section className="py-24 px-6 -mt-16 relative z-20">
        <div className="max-w-4xl mx-auto">
           <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
             <div className="lg:col-span-1 space-y-6 reveal-left">
                <div className="w-16 h-1 bg-slate-950" />
                <h2 className="text-4xl font-black italic tracking-tighter uppercase leading-[0.9]">Peça seu Orçamento agora</h2>
                <p className="text-slate-500 text-sm font-bold uppercase tracking-widest leading-relaxed">Resposta rápida via WhatsApp ou E-mail.</p>
                <div className="flex items-center gap-3 text-emerald-600 font-black text-xs uppercase">
                   <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                   SISTEMA_ONLINE
                </div>
             </div>
             <div className="lg:col-span-2 reveal-right">
                <LeadContactForm siteId={site.id} themeColor={themeColor} />
             </div>
           </div>
        </div>
      </section>
    </div>
  );
}
