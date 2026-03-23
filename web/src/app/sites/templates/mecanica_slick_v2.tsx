import Image from "next/image";
import { MapPin, Clock, Instagram, Zap, ShieldCheck, Settings } from "lucide-react";
import LeadContactForm from "../[slug]/_components/contact-form";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function MecanicaSlickV2({ site }: { site: any }) {
  const config = site.content || {};
  const themeColor = config.theme_color || '#ef4444';

  return (
    <div className="min-h-screen bg-[#020202] text-white font-sans selection:bg-red-500 selection:text-white pb-20">
      
      {/* ─── HUD OVERLAY ─── */}
      <div className="fixed inset-0 pointer-events-none border-[1px] border-white/5 z-50 m-4" />
      <div className="fixed top-8 left-8 z-50 hidden md:block">
         <div className="flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 backdrop-blur-md">
            <div className="w-1.5 h-1.5 bg-red-500 animate-pulse" />
            <span className="text-[9px] font-black tracking-widest uppercase">NODE_STATUS: ONLINE</span>
         </div>
      </div>

      {/* ─── HEADER ─── */}
      <nav className="fixed top-0 w-full z-40 bg-black/60 backdrop-blur-xl border-b border-white/5 px-8 h-20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-red-600 flex items-center justify-center skew-x-12">
             <Zap className="w-6 h-6 text-white -skew-x-12" />
          </div>
          <span className="text-xl font-black italic tracking-tighter uppercase">{config.site_name}</span>
        </div>
        <a 
          href={`https://wa.me/${config.whatsapp}`}
          className="px-6 py-2 border border-red-500/50 text-red-500 font-black text-xs uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all"
        >
          CONTATO_DIRETO
        </a>
      </nav>

      {/* ─── HERO CYBER ─── */}
      <section className="relative pt-40 pb-32 px-8 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full cyber-grid opacity-20" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-red-600/10 blur-[120px] rounded-full -z-10" />
        
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
           <div className="space-y-8 reveal-left">
              <div className="space-y-4">
                <Badge_Local color={themeColor}>PROTOCOLO_ALFA_ATIVO</Badge_Local>
                <h1 className="text-6xl md:text-8xl font-black italic leading-[0.85] tracking-tighter uppercase text-white">
                  {config.hero_title}
                </h1>
                <p className="text-slate-400 text-lg max-w-md font-medium leading-relaxed">
                  {config.hero_subtitle}
                </p>
              </div>

              <div className="flex flex-wrap gap-6">
                 <div className="flex items-center gap-3 bg-white/5 p-4 border border-white/10 flex-1 min-w-[200px]">
                    <ShieldCheck className="w-8 h-8 text-red-500" />
                    <div>
                       <div className="text-[10px] font-black text-slate-500 uppercase">GARANTIA</div>
                       <div className="text-sm font-bold uppercase">CERTIFICADA</div>
                    </div>
                 </div>
                 <div className="flex items-center gap-3 bg-white/5 p-4 border border-white/10 flex-1 min-w-[200px]">
                    <Settings className="w-8 h-8 text-red-500 animate-spin-slow" />
                    <div>
                       <div className="text-[10px] font-black text-slate-500 uppercase">PRECISÃO</div>
                       <div className="text-sm font-bold uppercase">DIAGNÓSTICA</div>
                    </div>
                 </div>
              </div>
           </div>

           <div className="relative reveal-right">
              <div className="aspect-square bg-slate-900 border border-white/10 relative group overflow-hidden">
                 <div className="absolute inset-0 bg-red-600/20 mix-blend-overlay z-10 pointer-events-none" />
                 <Image 
                   src={config.logo_url || "https://images.unsplash.com/photo-1486006920555-c77dcf18193c?w=800"} 
                   alt="Logo"
                   fill
                   className="object-cover grayscale brightness-75 group-hover:grayscale-0 transition-all duration-700"
                 />
                 <div className="scanline" />
              </div>
              <div className="absolute -bottom-8 -right-8 bg-red-600 p-8 skew-x-6 shadow-[20px_20px_0_rgba(0,0,0,1)]">
                 <div className="text-white -skew-x-6">
                    <p className="text-[10px] font-black uppercase tracking-widest opacity-80">CHAME_NO_WHATS</p>
                    <p className="text-2xl font-black italic">{config.whatsapp}</p>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* ─── CONTACT FORM HUD ─── */}
      <section className="py-24 px-8 border-t border-white/5 relative bg-black">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20">
           <div className="space-y-10 reveal-left">
              <div className="space-y-4">
                 <h2 className="text-5xl font-black italic tracking-tighter uppercase leading-[0.8]">Abra um chamado de serviço</h2>
                 <p className="text-slate-500 text-lg">Nosso time entrará em contato com o diagnóstico inicial em tempo real.</p>
              </div>
              <div className="space-y-6">
                 <div className="flex items-center gap-4 text-red-500/50">
                    <Zap className="w-5 h-5" />
                    <span className="text-xs font-black uppercase tracking-widest">RESPOSTA_ESTIMADA: 15_MIN</span>
                 </div>
                 <div className="flex items-center gap-4 text-emerald-500">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-xs font-black uppercase tracking-widest">NÓ_COMUNICAÇÃO: ATIVO</span>
                 </div>
              </div>
           </div>
           <div className="reveal-right">
              <LeadContactForm siteId={site.id} themeColor={themeColor} />
           </div>
        </div>
      </section>

      {/* ─── DETAILS ─── */}
      <section className="py-24 border-t border-white/5 bg-slate-950">
         <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { title: "LOCALIZAÇÃO", content: config.address || "Consulte no Zap", icon: MapPin },
              { title: "HORÁRIOS", content: config.hours || "Seg-Sáb: 08:00 - 18:00", icon: Clock },
              { title: "SOCIAL", content: "@oficial_mecanica", icon: Instagram },
            ].map((item, i) => (
              <div key={i} className="space-y-6 reveal-up" style={{ animationDelay: `${i * 0.2}s` }}>
                 <div className="w-16 h-16 bg-white/5 border border-white/10 flex items-center justify-center">
                    <item.icon className="w-8 h-8 text-red-500" />
                 </div>
                 <div className="space-y-2">
                    <h3 className="text-xs font-black tracking-widest text-slate-500 uppercase">{item.title}</h3>
                    <p className="text-xl font-bold uppercase">{item.content}</p>
                 </div>
              </div>
            ))}
         </div>
      </section>
      
      <div className="scanline opacity-10 pointer-events-none" />
    </div>
  );
}

function Badge_Local({ children, color }: { children: React.ReactNode, color: string }) {
  return (
    <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2">
       <div className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
       <span className="text-[10px] font-black tracking-[3px] uppercase text-slate-400">{children}</span>
    </div>
  );
}
