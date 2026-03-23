/* eslint-disable */
'use client';

import React from 'react';
import { Shield, Clock, Users } from 'lucide-react';

export default function Component({ data }: { data?: any }) {
  const content = data?.content || {
    hero_title: "Segurança e Monitoramento 24h",
    hero_subtitle: "Soluções completas em terceirização de serviços para sua tranquilidade.",
    section_about_title: "Sobre o Grupo Aliança",
    section_about_content: "Especialistas em segurança patrimonial e serviços terceirizados de alta qualidade.",
    theme_color: "#0f172a",
    feature_1_title: "Monitoramento 24h",
    feature_1_desc: "Vigilância ininterrupta com tecnologia de ponta.",
    feature_2_title: "Equipe Qualificada",
    feature_2_desc: "Profissionais treinados para diversos setores.",
    cta_text: "Falar com Consultor"
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white font-sans">
      {/* Header Placeholder */}
      <header className="p-6 border-b border-white/10 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Shield className="w-8 h-8 text-cyan-500" />
          <span className="font-bold text-xl uppercase tracking-tighter">Grupo Aliança</span>
        </div>
        <button className="bg-cyan-600 px-4 py-2 text-xs font-bold uppercase rounded-lg">Contato</button>
      </header>

      {/* Hero */}
      <section className="py-24 px-6 text-center space-y-6">
        <h1 className="text-5xl font-black uppercase tracking-tighter leading-none max-w-4xl mx-auto">
          {content.hero_title}
        </h1>
        <p className="text-slate-400 max-w-2xl mx-auto text-lg">
          {content.hero_subtitle}
        </p>
        <div className="pt-6">
           <button className="bg-white text-black px-10 py-4 font-black uppercase italic tracking-widest hover:bg-cyan-500 transition-colors">
             {content.cta_text}
           </button>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-6 grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
         <div className="p-8 bg-white/5 border border-white/10 space-y-4">
            <Clock className="w-10 h-10 text-cyan-500" />
            <h3 className="text-xl font-bold uppercase">{content.feature_1_title}</h3>
            <p className="text-slate-400">{content.feature_1_desc}</p>
         </div>
         <div className="p-8 bg-white/5 border border-white/10 space-y-4">
            <Users className="w-10 h-10 text-cyan-500" />
            <h3 className="text-xl font-bold uppercase">{content.feature_2_title}</h3>
            <p className="text-slate-400">{content.feature_2_desc}</p>
         </div>
      </section>

      {/* About */}
      <section className="py-20 px-6 bg-black/40">
        <div className="max-w-4xl mx-auto text-center space-y-4">
           <h2 className="text-3xl font-black uppercase">{content.section_about_title}</h2>
           <p className="text-slate-400 leading-relaxed italic">
             {content.section_about_content}
           </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="p-10 border-t border-white/10 text-center text-slate-600 text-[10px] uppercase tracking-[0.4em]">
        © 2024 Grupo Aliança // Protocolo de Segurança Ativo
      </footer>
    </div>
  );
}