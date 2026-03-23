/* eslint-disable */
"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Star, 
  CheckCircle2, 
  MessageCircle, 
  Truck, 
  Droplets, 
  Scissors, 
  Heart,
  Zap,
  MapPin,
  Clock,
  Gem,
  Camera,
  Quote
} from 'lucide-react';

const Component = () => {

  const services = [
    {
      icon: <Scissors className="w-8 h-8 text-purple-400 font-black" />,
      title: "Cortes de Exposição",
      desc: "Técnicas internacionais de tosa na tesoura para raças que exigem perfeição estética."
    },
    {
      icon: <Droplets className="w-8 h-8 text-blue-400" />,
      title: "Hidratação de Ozônio",
      desc: "Terapia molecular que recupera a pelagem e protege a derme profunda."
    },
    {
      icon: <Truck className="w-8 h-8 text-emerald-400" />,
      title: "Concierge Pet Link",
      desc: "Logística premium com veículos climatizados e motoristas certificados em comportamento animal."
    }
  ];

  const plans = [
    {
      name: "SILVER_CARE",
      price: "180",
      features: ["Banho semanal", "Tosa higiênica", "Limpeza de ouvidos", "Perfume exclusivo"]
    },
    {
      name: "GOLD_EXCLUSIVE",
      price: "350",
      featured: true,
      features: ["Tudo do Silver", "Hidratação profunda", "Tosa na tesoura", "Mimos gourmet", "Taxi-pet incluso"]
    },
    {
      name: "DIAMOND_VIP",
      price: "580",
      features: ["Tudo do Gold", "Monitoramento 24h", "Checkout via App", "Acessórios de luxo", "Prioridade na agenda"]
    }
  ];

  const testimonials = [
    { name: "Luciana Almeida", text: "Nunca vi meu poodle tão calmo após um banho. O atendimento é outro nível.", pet: "Bolinha" },
    { name: "Ricardo Santos", text: "A tosa na tesoura é impecável. É visível que o cuidado é autêntico.", pet: "Thor" }
  ];

  const whatsappLink = `https://wa.me/5511999999999?text=Olá! Gostaria de agendar uma experiência premium para meu pet.`;

  return (
    <div className="min-h-screen bg-[#020617] text-white selection:bg-purple-500/30 font-sans overflow-x-hidden">
      
      {/* 🚥 MESH GRADIENT LAYER 🚥 */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-5%] w-[60%] h-[60%] bg-purple-900/10 rounded-full blur-[140px]" />
        <div className="absolute bottom-[0%] right-[-5%] w-[50%] h-[50%] bg-blue-900/10 rounded-full blur-[140px]" />
      </div>

      {/* Floating WhatsApp */}
      <motion.a
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="fixed bottom-10 right-10 z-[60] bg-emerald-500 p-5 rounded-full shadow-[0_0_40px_rgba(16,185,129,0.3)] cursor-pointer hover:scale-110 transition-transform active:scale-95"
      >
        <MessageCircle className="w-8 h-8 text-white fill-current shadow-inner" />
      </motion.a>

      {/* Hero Section - Alinhamento Reto e Imponente */}
      <section className="relative min-h-[95vh] flex items-center justify-center pt-28 pb-20 z-10 border-b border-white/5">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            
            <div className="space-y-10 text-center lg:text-left">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl"
              >
                <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
                <span className="text-[10px] uppercase font-black tracking-[0.4em] text-cyan-400">Padrão Elite 2024</span>
              </motion.div>

              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-6xl md:text-[8rem] font-black tracking-tight leading-[0.85] text-white"
              >
                O AUGE DO <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400">CUIDADO PET.</span>
              </motion.h1>

              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-xl text-slate-400 font-medium leading-relaxed max-w-xl mx-auto lg:mx-0"
              >
                Não é apenas estética, é respeito e bem-estar em um ambiente projetado para reduzir o estresse e potencializar a felicidade do seu melhor amigo.
              </motion.p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start">
                <a 
                  href={whatsappLink}
                  className="bg-white text-black px-12 py-6 rounded-none font-black text-xs uppercase tracking-widest hover:bg-cyan-400 transition-all flex items-center gap-4 group"
                >
                  Agendar Experiência VIP
                  <Zap className="w-4 h-4 fill-current group-hover:animate-bounce" />
                </a>
                <div className="flex items-center gap-4 px-6 border border-white/10 bg-white/5 backdrop-blur-md">
                   <div className="flex -space-x-2">
                      {[1,2,3].map(i => <div key={i} className="w-8 h-8 rounded-full bg-slate-800 border-2 border-slate-900 flex items-center justify-center"><Heart className="w-3 h-3 text-purple-400 fill-current" /></div>)}
                   </div>
                   <span className="text-[9px] font-black uppercase text-slate-400">Protocolo Humanizado</span>
                </div>
              </div>
            </div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative aspect-square lg:aspect-video rounded-[3rem] overflow-hidden group shadow-3xl"
            >
               <img 
                src="https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?q=80&w=1200&auto=format&fit=crop" 
                alt="Pet de Luxo" 
                className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
               <div className="absolute bottom-12 left-12 right-12 flex justify-between items-end border-t border-white/10 pt-8">
                  <div className="space-y-2">
                     <p className="text-[10px] font-black uppercase tracking-widest text-cyan-400">Unidade_Moema</p>
                     <p className="text-2xl font-bold tracking-tight">ESTRUTURA_VIP_ATIVA</p>
                  </div>
                  <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-xl mb-[-4px]">
                     <Scissors className="w-8 h-8 text-black" />
                  </div>
               </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Grid (Aumentado) */}
      <section className="py-32 z-10 relative">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
             <div className="space-y-4">
                <h2 className="text-[11px] font-black uppercase tracking-[0.5em] text-purple-500">EXCELÊNCIA EM SERVIÇOS</h2>
                <h3 className="text-5xl font-black tracking-tighter uppercase leading-none">O Estilo de <br /> Vida PET_LUX.</h3>
             </div>
             <p className="text-slate-500 font-medium max-w-sm text-sm">
                Nossos métodos combinam alta tecnologia estética com a psicologia canina para garantir relaxamento total.
             </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {services.map((service, idx) => (
              <div 
                key={idx}
                className="group p-12 bg-[#0a0f20]/60 border border-white/5 rounded-[4rem] hover:bg-white/5 transition-all duration-500 hover:border-cyan-500/20"
              >
                <div className="mb-10">{service.icon}</div>
                <h3 className="text-2xl font-black mb-6 uppercase tracking-tight leading-none">{service.title}</h3>
                <p className="text-slate-400 leading-relaxed font-medium mb-10">{service.desc}</p>
                <div className="w-12 h-1 bg-white/10 group-hover:w-full transition-all duration-700" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Galeria de Elite (NOVA SEÇÃO) */}
      <section className="py-32 bg-white/[0.02] border-y border-white/5">
         <div className="container mx-auto px-6">
            <div className="text-center mb-20">
               <Camera className="w-12 h-12 text-blue-500 mx-auto mb-6" />
               <h2 className="text-4xl font-black tracking-tight uppercase">Portfólio de_Estrela</h2>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
               {[1,2,3,4].map(i => (
                 <div key={i} className="aspect-square bg-slate-900 rounded-[2.5rem] overflow-hidden group border border-white/5">
                    <img 
                      src={`https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?q=80&w=600&auto=format&fit=crop&sig=${i}`} 
                      className="w-full h-full object-cover transition-transform group-hover:scale-110 grayscale-[50%] group-hover:grayscale-0 duration-1000"
                      alt="Happy Pet"
                    />
                 </div>
               ))}
            </div>
         </div>
      </section>

      {/* Tabela de Preços (NOVA SEÇÃO) */}
      <section className="py-32 z-10 relative">
        <div className="container mx-auto px-6">
          <div className="max-w-xl mx-auto text-center mb-24 space-y-6">
             <Gem className="w-12 h-12 text-yellow-500 mx-auto" />
             <h2 className="text-4xl md:text-5xl font-black tracking-tighter uppercase leading-none">Club_Membro Exclusive</h2>
             <p className="text-slate-500 text-sm font-medium uppercase tracking-widest">Escolha o seu nível de cuidado premium</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan, idx) => (
              <div 
                key={idx}
                className={`relative p-12 border rounded-[4rem] flex flex-col items-center text-center transition-all ${plan.featured ? 'bg-white text-black border-white shadow-[0_0_60px_rgba(255,255,255,0.1)] scale-105 z-10' : 'bg-[#0a0f20]/40 border-white/10 hover:border-white/20 text-white'}`}
              >
                <h4 className="text-[11px] font-black uppercase tracking-[0.5em] mb-10 opacity-50">{plan.name}</h4>
                <div className="flex items-start mb-12">
                   <span className="text-2xl mt-2 font-black tracking-tight tracking-widest leading-none">R$</span>
                   <span className="text-8xl font-black leading-none">{plan.price}</span>
                </div>
                <div className="space-y-4 mb-14">
                   {plan.features.map((f, i) => (
                     <div key={i} className={`flex items-center gap-3 text-xs font-bold uppercase tracking-tight ${plan.featured ? 'text-black' : 'text-slate-400'}`}>
                        <CheckCircle2 className="w-4 h-4 text-cyan-500" />
                        {f}
                     </div>
                   ))}
                </div>
                <a href={whatsappLink} className={`w-full py-6 font-black text-xs uppercase tracking-[0.3em] transition-all ${plan.featured ? 'bg-black text-white hover:opacity-90' : 'bg-white text-black hover:bg-cyan-500'}`}>ASSINAR_PLANO</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testemunhos (NOVA SEÇÃO) */}
      <section className="py-32 bg-blue-600/5">
         <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
               {testimonials.map((t, idx) => (
                 <div key={idx} className="p-16 border border-white/5 bg-black/40 rounded-[3rem] relative">
                    <Quote className="absolute top-10 right-10 w-12 h-12 text-blue-500/20" />
                    <div className="flex gap-1 mb-8">
                       {[1,2,3,4,5].map(i => <Star key={i} className="w-5 h-5 text-yellow-500 fill-current" />)}
                    </div>
                    <p className="text-3xl font-bold tracking-tight mb-10 italic">"{t.text}"</p>
                    <div className="flex items-center gap-4">
                       <div className="w-10 h-10 bg-slate-700 rounded-full" />
                       <div>
                          <p className="font-black text-xs uppercase tracking-widest">{t.name}</p>
                          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Tutor do {t.pet}</p>
                       </div>
                    </div>
                 </div>
               ))}
            </div>
         </div>
      </section>

      {/* Localização e Footer (MUITO MAIS DETALHE) */}
      <section className="py-32 z-10 relative border-t border-white/5">
        <div className="container mx-auto px-6">
           <div className="grid grid-cols-1 lg:grid-cols-3 gap-20">
              <div className="space-y-10">
                 <div className="flex items-center gap-3 text-2xl font-black tracking-tighter uppercase">
                    <div className="w-12 h-12 bg-white text-black flex items-center justify-center rounded-2xl"><Heart className="w-7 h-7 fill-current" /></div>
                    PET<span className="text-cyan-400">_ESTRELA</span>
                 </div>
                 <p className="text-slate-500 text-sm font-medium leading-relaxed uppercase">
                    A primeira boutique canina de alta performance do Brasil. Dedicação total à saúde e auto-estima animal.
                 </p>
                 <div className="flex gap-4">
                    {[1,2,3].map(i => <div key={i} className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-cyan-500 hover:text-black cursor-pointer transition-all"><Star className="w-5 h-5 fill-current" /></div>)}
                 </div>
              </div>

              <div className="space-y-10">
                 <h4 className="text-xs font-black uppercase tracking-[0.4em] text-slate-400">NAVEGAÇÃO_DO_CONCEITO</h4>
                 <ul className="space-y-4 text-sm font-bold uppercase tracking-widest">
                    <li className="hover:text-cyan-400 cursor-pointer transition-colors">A Boutique</li>
                    <li className="hover:text-cyan-400 cursor-pointer transition-colors">Nossos Planos</li>
                    <li className="hover:text-cyan-400 cursor-pointer transition-colors">Dermocosméticos</li>
                    <li className="hover:text-cyan-400 cursor-pointer transition-colors">Agendar Horário</li>
                 </ul>
              </div>

              <div className="space-y-10">
                 <h4 className="text-xs font-black uppercase tracking-[0.4em] text-slate-400">TERMINAL_DE_CONTATO</h4>
                 <div className="space-y-6">
                    <div className="flex gap-4">
                       <MapPin className="w-5 h-5 text-cyan-400 shrink-0" />
                       <div>
                          <p className="text-xs font-black uppercase tracking-widest leading-none mb-2">Moema, São Paulo</p>
                          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Av. dos Eucaliptos, 1024</p>
                       </div>
                    </div>
                    <div className="flex gap-4">
                       <Clock className="w-5 h-5 text-cyan-400 shrink-0" />
                       <div>
                          <p className="text-xs font-black uppercase tracking-widest leading-none mb-2">OPERAÇÃO_VIP</p>
                          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">SEG - SAB: 09:00 - 19:00</p>
                       </div>
                    </div>
                 </div>
              </div>
           </div>
           
           <div className="mt-32 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
              <p className="text-[9px] font-black text-slate-600 uppercase tracking-[0.5em]">AUTH_GEN_V8_2024</p>
              <div className="flex gap-8 text-[9px] font-black text-slate-500 uppercase tracking-widest">
                 <span>POLÍTICA_PRIVACIDADE</span>
                 <span>TERMOS_USO</span>
              </div>
           </div>
        </div>
      </section>

      <style jsx global>{`
        h1, h2, h3, h4 { font-family: 'Inter', sans-serif; letter-spacing: -0.05em; }
        .shadow-3xl { shadow: 0 40px 100px -20px rgba(0,0,0,0.8); }
      `}</style>
    </div>
  );
};

export default Component;