"use client";

import React, { useState, useEffect } from 'react';
import { 
  MessageCircle, 
  Wrench, 
  ShieldCheck, 
  Gauge, 
  CheckCircle2, 
  Star, 
  ChevronDown, 
  MapPin, 
  Phone, 
  Clock, 
  AlertTriangle,
  ArrowRight,
  Zap,
  ShieldAlert
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Component = ({ site }: any) => {
  const data = site?.content || {};
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const services = [
    {
      icon: <Gauge className="w-8 h-8 text-amber-500" />,
      title: "Diagnóstico Computadorizado",
      desc: "Tecnologia de ponta para identificar falhas invisíveis antes que se tornem problemas graves."
    },
    {
      icon: <Wrench className="w-8 h-8 text-amber-500" />,
      title: "Manutenção Preventiva",
      desc: "Revisão completa de sistemas de freios, suspensão e motor com precisão técnica absoluta."
    },
    {
      icon: <Zap className="w-8 h-8 text-amber-500" />,
      title: "Injeção Eletrônica",
      desc: "Otimização de performance e consumo de combustível com equipamentos de última geração."
    }
  ];

  const faqs = [
    { q: "Qual o tempo médio de um diagnóstico?", a: "Realizamos o scanner completo e entregamos o laudo técnico em até 2 horas." },
    { q: "Vocês oferecem garantia nos serviços?", a: "Sim, oferecemos garantia total de 1 ano em mão de obra e peças aplicadas." },
    { q: "Trabalham com veículos importados?", a: "Sim, somos especialistas em mecânica de precisão para nacionais e importados premium." },
    { q: "Preciso agendar ou posso levar o carro agora?", a: "Para garantir o padrão de excelência, trabalhamos com agendamento prioritário via WhatsApp." },
    { q: "Quais peças são utilizadas nos reparos?", a: "Utilizamos exclusivamente peças originais ou de marcas premium com certificação internacional." },
    { q: "Como funciona o orçamento?", a: "O orçamento é 100% transparente, detalhado por item e aprovado por você antes de qualquer intervenção." }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-amber-500/30">
      {/* Header/Nav */}
      <nav className="fixed top-0 w-full z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-amber-500 p-1.5 rounded-lg">
              <Wrench className="w-6 h-6 text-slate-950" />
            </div>
            <span className="font-bold text-xl tracking-tight italic uppercase">{data.site_name}</span>
          </div>
          <a 
            href={`https://wa.me/${data.whatsapp}`}
            className="hidden md:flex items-center gap-2 bg-slate-800 hover:bg-slate-700 px-4 py-2 rounded-full transition-all text-sm font-medium border border-slate-700"
          >
            <MapPin className="w-4 h-4 text-amber-500" />
            {data.address}
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-6"
          >
            <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 px-4 py-1.5 rounded-full text-amber-500 text-sm font-semibold uppercase tracking-wider">
              <Star className="w-4 h-4 fill-amber-500" />
              Referência em {data.address}
            </div>
            <h1 className="text-4xl md:text-7xl font-extrabold tracking-tight leading-tight">
              {data.hero_title}
            </h1>
            <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              {data.hero_subtitle}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href={`https://wa.me/${data.whatsapp}`}
                className="w-full sm:w-auto bg-amber-500 hover:bg-amber-400 text-slate-950 px-8 py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(245,158,11,0.3)]"
              >
                {data.cta_text || 'Falar com Especialista'}
                <ArrowRight className="w-5 h-5" />
              </motion.a>
              <div className="flex items-center gap-4 text-sm text-slate-400">
                <div className="flex -space-x-2">
                  {[1,2,3].map(i => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-slate-950 bg-slate-800 flex items-center justify-center">
                      <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                    </div>
                  ))}
                </div>
                <span>+2.000 clientes satisfeitos</span>
              </div>
            </div>

            {/* NEW: Hero Visual Banner (DNA) */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="mt-16 relative mx-auto max-w-5xl group"
            >
              <div className="absolute inset-0 bg-amber-500/20 blur-[100px] rounded-full opacity-30 group-hover:opacity-50 transition-opacity" />
              <div className="relative rounded-[2rem] overflow-hidden border border-slate-800 shadow-2xl aspect-video md:aspect-[21/9]">
                <img 
                  src={data.hero_image_src || `https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&q=80&w=2000`} 
                  alt={data.site_name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Social Proof Bar */}
      <section className="py-8 bg-slate-900/50 border-y border-slate-800">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all">
          <div className="flex items-center gap-2 font-bold text-xl tracking-tighter uppercase"><ShieldCheck className="w-6 h-6"/> Certificado ASE</div>
          <div className="flex items-center gap-2 font-bold text-xl tracking-tighter uppercase"><CheckCircle2 className="w-6 h-6"/> Qualidade ISO</div>
          <div className="flex items-center gap-2 font-bold text-xl tracking-tighter uppercase font-mono italic text-2xl">BOSCH</div>
          <div className="flex items-center gap-2 font-bold text-xl tracking-tighter uppercase font-serif">MOBIL 1</div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 px-4 bg-slate-950">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl md:text-5xl font-bold">Excelência Técnica em cada detalhe</h2>
            <p className="text-slate-400">Serviços especializados com padrão de concessionária e preço justo.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {services.map((s, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -10 }}
                className="p-8 rounded-3xl bg-slate-900 border border-slate-800 hover:border-amber-500/50 transition-all group"
              >
                <div className="mb-6 inline-block p-4 rounded-2xl bg-amber-500/5 group-hover:bg-amber-500/10 transition-colors">
                  {s.icon}
                </div>
                <h3 className="text-xl font-bold mb-4">{s.title}</h3>
                <p className="text-slate-400 leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Section - The Dossiê */}
      <section className="py-24 px-4 bg-gradient-to-b from-slate-950 to-red-950/20">
        <div className="max-w-5xl mx-auto bg-slate-900 border-2 border-red-500/30 rounded-[2.5rem] p-8 md:p-16 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <ShieldAlert className="w-48 h-48 text-red-500" />
          </div>
          <div className="relative z-10 space-y-8">
            <div className="flex items-center gap-3 text-red-500 font-bold uppercase tracking-widest text-sm">
              <AlertTriangle className="w-5 h-5" /> Alerta de Prejuízo
            </div>
            <h2 className="text-3xl md:text-5xl font-black uppercase italic tracking-tighter">O Preço da Negligência</h2>
            <div className="space-y-6">
              <p className="text-xl text-slate-300 leading-relaxed">
                Ignorar barulhos estranhos ou postergar a revisão preventiva não é economia. É um risco financeiro brutal. 
              </p>
              <div className="p-6 bg-red-500/10 rounded-2xl border border-red-500/20">
                <p className="text-slate-300 text-lg">
                  O custo médio de uma quebra súbita de motor ou transmissão por falta de manutenção chega a:
                </p>
                <div className="text-4xl md:text-6xl font-black text-red-500 mt-2 tracking-tighter">
                  R$ 15.000,00+
                </div>
                <p className="text-red-400 font-medium mt-2">Em prejuízos evitáveis com uma simples visita técnica.</p>
              </div>
              <p className="text-slate-400 italic">&quot;Imagine-se parado no meio de uma rodovia à noite, com sua família, esperando um guincho por algo que custaria 10x menos para prevenir.&quot;</p>
            </div>
            <div className="pt-4">
              <a 
                href={`https://wa.me/${data.whatsapp}`}
                className="inline-flex items-center gap-3 text-white bg-red-600 hover:bg-red-500 px-8 py-4 rounded-xl font-bold transition-all shadow-lg"
              >
                {data.cta_text || 'Evitar Prejuízo Agora'}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-16 italic uppercase tracking-tighter">Quem confia, não troca</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "Ricardo Silva", text: `Meu carro tinha um problema crônico que 3 oficinas não resolviam. Na ${data.site_name}, diagnosticaram em 1 hora e o carro está perfeito.` },
              { name: "Mariana Costa", text: "Atendimento impecável e transparente. Mostraram cada peça que precisava de troca e o porquê. Senti total confiança." },
              { name: "André Santos", text: "O padrão de organização e limpeza da oficina reflete a qualidade do serviço. Preço justo e entrega no prazo combinado." }
            ].map((t, i) => (
              <div key={i} className="bg-slate-900 p-8 rounded-3xl border border-slate-800 relative">
                <div className="flex gap-1 mb-4 text-amber-500">
                  {[1,2,3,4,5].map(s => <Star key={s} className="w-4 h-4 fill-amber-500" />)}
                </div>
                <p className="text-slate-400 italic mb-6">"{t.text}"</p>
                <div className="font-bold text-slate-200">— {t.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 px-4 bg-slate-900/30">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-16">Dúvidas Frequentes</h2>
          <div className="space-y-4">
            {faqs.map((f, i) => (
              <div key={i} className="border border-slate-800 rounded-2xl overflow-hidden">
                <button 
                  onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-slate-800/50 transition-colors"
                >
                  <span className="font-bold text-slate-200">{f.q}</span>
                  <ChevronDown className={`w-5 h-5 transition-transform ${activeFaq === i ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {activeFaq === i && (
                    <motion.div 
                      initial={{ height: 0 }}
                      animate={{ height: 'auto' }}
                      exit={{ height: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="p-6 pt-0 text-slate-400 border-t border-slate-800 bg-slate-800/20">
                        {f.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-slate-800 pt-16 pb-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-16">
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <Wrench className="w-6 h-6 text-amber-500" />
                <span className="font-bold text-xl italic uppercase tracking-tight">{data.site_name}</span>
              </div>
              <p className="text-slate-500 text-sm leading-relaxed">
                Referência em alta performance e mecânica de precisão em {data.address}. Seu carro merece o melhor tratamento.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-6 text-amber-500 uppercase tracking-widest text-sm">Contato</h4>
              <ul className="space-y-4 text-slate-400 text-sm">
                <li className="flex items-center gap-3"><Phone className="w-4 h-4" /> {data.whatsapp}</li>
                <li className="flex items-center gap-3"><MapPin className="w-4 h-4" /> {data.address}</li>
                <li className="flex items-center gap-3"><Clock className="w-4 h-4" /> {data.hours}</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-6 text-amber-500 uppercase tracking-widest text-sm">Serviços</h4>
              <ul className="space-y-3 text-slate-400 text-sm">
                <li>Motor e Câmbio</li>
                <li>Suspensão e Freios</li>
                <li>Elétrica e Injeção</li>
                <li>Revisão Preventiva</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-6 text-amber-500 uppercase tracking-widest text-sm">Social</h4>
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center hover:bg-amber-500 hover:text-slate-950 transition-all cursor-pointer">IG</div>
                <div className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center hover:bg-amber-500 hover:text-slate-950 transition-all cursor-pointer">FB</div>
              </div>
            </div>
          </div>
          <div className="pt-8 border-t border-slate-900 flex flex-col md:row items-center justify-between gap-4 text-xs text-slate-600">
            <p>&copy; {new Date().getFullYear()} {data.site_name}. Todos os direitos reservados.</p>
            <p>Atendimento: {data.hours}</p>
          </div>
        </div>
      </footer>

      {/* WhatsApp Fixed Button */}
      <motion.a
        href={`https://wa.me/${data.whatsapp}`}
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="fixed bottom-6 right-6 z-100 bg-green-500 text-white p-4 rounded-full shadow-[0_10px_40px_rgba(34,197,94,0.5)] flex items-center justify-center group"
      >
        <MessageCircle className="w-8 h-8 fill-current" />
        <span className="absolute right-full mr-4 bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border border-slate-800">
          Falar com Especialista
        </span>
      </motion.a>
      
      {/* Mobile Bottom Bar for Conversions */}
      <div className="md:hidden fixed bottom-0 left-0 w-full bg-slate-950/90 backdrop-blur-lg border-t border-slate-800 p-4 z-40">
        <a 
          href={`https://wa.me/${data.whatsapp}`}
          className="w-full bg-amber-500 text-slate-950 py-3 rounded-xl font-bold text-center flex items-center justify-center gap-2"
        >
          <MessageCircle className="w-5 h-5" />
          Agendar via WhatsApp
        </a>
      </div>
    </div>
  );
};

export default Component;