"use client";

import React, { use } from 'react';
import { notFound } from 'next/navigation';
import { Utensils, MapPin, Phone, Instagram, Clock, Star, ChevronRight, MessageSquare } from 'lucide-react';

/**
 * MOCK DATABASE (FASE 1 - MVP)
 * No futuro, isso VIRÁ do Supabase com cache (ISR).
 * Para testar localmente: villa-bistro.localhost:3000
 */
const MOCK_CLIENTS: any = {
  'villa-bistro': {
    nome: "Villa Bistrô Hamburgueria",
    template: 'RESTAURANTE_ELITE',
    status: 'active',
    config: {
      color: "#8B4513", // Terracota
      accent: "#fbce07", // Dourado
      address: "Rua das Flores, 123 - Curitiba, PR",
      whatsapp: "5541988597898",
      instagram: "villabistrocwb",
      hours: "Ter à Dom: 18:00 - 23:30",
      rating: "4.9",
      reviews: "128",
      hero_title: "A Melhor Hamburgueria Artesanal de Curitiba",
      hero_subtitle: "Blend exclusivo, pão brioche amanteigado e ingredientes selecionais.",
      logo_url: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=400&h=400&fit=crop"
    }
  },
  'mecanica-silva': {
     nome: "Silva Auto Mecânica",
     template: 'RESTAURANTE_ELITE', // Usando o mesmo por enquanto (MVP)
     status: 'active',
     config: {
       color: "#1e293b",
       accent: "#ef4444",
       address: "Av. Principal, 444 - Pinhais, PR",
       whatsapp: "5541999999999",
       instagram: "silvamecanica",
       hours: "Seg à Sex: 08:00 - 18:00",
       rating: "4.7",
       reviews: "95",
       hero_title: "Cuidado de Especialista para o Seu Veículo",
       hero_subtitle: "Manutenção preventiva, freios, suspensão e injeção eletrônica com garantia.",
       logo_url: "https://images.unsplash.com/photo-1486006920555-c77dcf18193c?w=400&h=400&fit=crop"
     }
  }
};

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function TenantPage({ params }: PageProps) {
  const { slug } = use(params);
  const client = MOCK_CLIENTS[slug];

  if (!client || client.status !== 'active') {
    notFound();
  }

  const { config } = client;

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans">
      {/* ─── HEADER ─── */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-100 px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
           <div className="w-10 h-10 rounded-full overflow-hidden bg-slate-100 flex-shrink-0">
             <img src={config.logo_url} alt={client.nome} className="w-full h-full object-cover" />
           </div>
           <span className="font-bold text-lg tracking-tight">{client.nome}</span>
        </div>
        <a 
          href={`https://wa.me/${config.whatsapp}`} 
          className="hidden md:flex items-center gap-2 bg-slate-900 text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-slate-800 transition-all shadow-lg shadow-slate-200"
        >
          <MessageSquare className="w-4 h-4" />
          Falar no WhatsApp
        </a>
      </nav>

      {/* ─── HERO ─── */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        {/* Decorativo */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-slate-50 -z-10 skew-x-12 translate-x-20" />
        
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 space-y-6">
            <div className="inline-flex items-center gap-2 bg-slate-100 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-slate-600">
               <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
               Destaque Regional
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
                style={{ backgroundColor: config.color }}
                className="flex items-center justify-center gap-3 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:scale-105 active:scale-95 transition-all shadow-xl shadow-slate-200"
               >
                 Abrir Chat no WhatsApp
                 <ChevronRight className="w-5 h-5" />
               </a>
            </div>
            <div className="flex items-center gap-6 pt-6 border-t border-slate-100">
               <div className="flex flex-col">
                  <span className="text-2xl font-bold text-slate-950">{config.rating}⭐</span>
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">{config.reviews} Avaliações</span>
               </div>
               <div className="w-px h-8 bg-slate-100" />
               <div className="flex flex-col">
                  <span className="text-2xl font-bold text-slate-950">100%</span>
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">Garantia HUD</span>
               </div>
            </div>
          </div>
          
          <div className="flex-1 relative">
             <div className="aspect-square rounded-[40px] overflow-hidden rotate-2 shadow-2xl relative">
                <img 
                  src="https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=800&q=80" 
                  alt="Destaque" 
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                />
             </div>
             {/* Cardzinho flutuante */}
             <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-3xl shadow-2xl shadow-slate-300 flex items-center gap-4 animate-bounce-slow">
                <div className="w-12 h-12 bg-green-500 rounded-2xl flex items-center justify-center text-white">
                   <Phone className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Aberto Agora</p>
                  <p className="text-sm font-black">{config.whatsapp}</p>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* ─── INFO SECTION ─── */}
      <section className="py-20 bg-slate-950 text-white rounded-t-[60px] -mt-10 relative z-10">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12">
           <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center">
                 <MapPin className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold">Localização</h3>
              <p className="text-slate-400 text-sm">{config.address}</p>
           </div>
           
           <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center">
                 <Clock className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold">Funcionamento</h3>
              <p className="text-slate-400 text-sm">{config.hours}</p>
           </div>

           <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center">
                 <Instagram className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold">Redes Sociais</h3>
              <p className="text-slate-400 text-sm">Siga @{config.instagram} e fique por dentro das novidades.</p>
           </div>
        </div>
        
        <div className="mt-20 pt-10 border-t border-white/5 text-center text-[10px] font-bold uppercase tracking-[0.3em] text-white/20">
            Powered by CaptaSites.com.br
        </div>
      </section>

      {/* Botão flutuante mobile */}
      <a 
        href={`https://wa.me/${config.whatsapp}`}
        className="md:hidden fixed bottom-6 right-6 w-16 h-16 bg-green-500 rounded-full flex items-center justify-center text-white shadow-2xl shadow-green-500/40 z-50 animate-pulse"
      >
        <MessageSquare className="w-8 h-8" />
      </a>

      <style jsx global>{`
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
