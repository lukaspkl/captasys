"use client";

import { WhatsappLogo, MapPin, Clock, Phone, IdentificationCard } from "@phosphor-icons/react";

export function Contact() {
  return (
    <section id="contact" className="py-32 px-4 relative">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-24">
        {/* Left: Store Meta & Locations */}
        <div className="space-y-12">
           <div className="space-y-4">
              <span className="text-brand font-mono text-xs uppercase tracking-[0.3em]">Onde nos encontrar</span>
              <h2 className="text-3xl sm:text-5xl md:text-7xl font-bold leading-none">
                PONTO DE <br />
                RECUPERAÇÃO.
              </h2>
           </div>

           <div className="space-y-8">
              {[
                { icon: MapPin, label: "Endereço", val: "R. Asfalto, 398 - Petrolândia, Contagem - MG" },
                { icon: Clock, label: "Horário", val: "Seg - Sex: 09:00 às 18:30 | Sáb: 09:00 às 14:00" },
                { icon: Phone, label: "Telefones", val: "+55 31 99170-7632" },
              ].map((item, i) => (
                <div key={i} className="flex gap-4 items-start border-l border-white/5 pl-6 hover:border-brand transition-colors">
                  <div className="w-10 h-10 rounded-lg bg-surface-900 flex items-center justify-center shrink-0">
                    <item.icon size={20} weight="light" className="text-brand" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-mono text-white/20 uppercase tracking-widest leading-none">{item.label}</p>
                    <p className="text-lg text-white/80 font-medium">{item.val}</p>
                  </div>
                </div>
              ))}
           </div>
           
           <div className="pt-8">
             <Link 
               href="https://www.google.com/maps/search/?api=1&query=Mobi%20materiais%20variados%20pe%C3%A7as%20e%20servi%C3%A7os%20R.%20Asfalto%2C%20n%C3%BAmero%20398" 
               target="_blank"
               className="text-xs font-bold text-white/40 border-b border-white/10 pb-2 hover:text-white transition-colors"
             >
                Ver no Maps ➞
             </Link>
           </div>
        </div>

        {/* Right: Modern Form (Double-Bezel) */}
        <div className="glass-panel">
           <div className="glass-inner space-y-8">
              <div className="space-y-2">
                 <h4 className="text-3xl font-bold">Solicitar Diagnóstico Online</h4>
                 <p className="text-sm text-white/40">Descreva o problema e nossa equipe entrará em contato em minutos.</p>
              </div>

              <form className="space-y-6">
                 <div className="space-y-2">
                    <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest pl-4">Aparelho</label>
                    <input 
                      type="text" 
                      placeholder="Ex: iPhone 13 Pro Max" 
                      className="w-full bg-surface-800 border border-white/5 px-6 py-4 rounded-full text-sm focus:border-brand/40 outline-none hover:bg-surface-800/80 transition-all shadow-inner shadow-white/5"
                    />
                 </div>
                 
                 <div className="space-y-2">
                    <label className="text-[10px] font-mono text-white/40 uppercase tracking-widest pl-4">Problema Relatado</label>
                    <textarea 
                      placeholder="Ex: Tela com linhas verdes ou não carrega..." 
                      className="w-full bg-surface-800 border border-white/5 px-6 py-4 rounded-3xl text-sm min-h-[120px] focus:border-brand/40 outline-none hover:bg-surface-800/80 transition-all shadow-inner shadow-white/5"
                    />
                 </div>
                 
                 <button className="w-full bg-brand text-black font-extrabold uppercase py-6 rounded-full group magnetic-transition hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-3">
                    <IdentificationCard size={20} weight="fill" />
                    <span>Enviar para Auditoria Técnica</span>
                 </button>
                 
                 <div className="flex items-center gap-4 py-4">
                    <div className="h-[1px] flex-1 bg-white/5" />
                    <span className="text-[10px] font-mono text-white/20">OU PREFERE RÁPIDO?</span>
                    <div className="h-[1px] flex-1 bg-white/5" />
                 </div>
                 
                 <button className="w-full border border-white/10 text-white font-bold py-5 rounded-full hover:bg-white/5 flex items-center justify-center gap-2">
                    <WhatsappLogo size={20} weight="fill" className="text-emerald-500" />
                    <span>WhatsApp Direto</span>
                 </button>
              </form>
           </div>
        </div>
      </div>
    </section>
  );
}

import Link from "next/link";
