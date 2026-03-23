/* eslint-disable */
"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Shield, 
  ShieldCheck, 
  Users, 
  Cctv, 
  MapPin, 
  Phone, 
  Mail, 
  ArrowRight, 
  Menu, 
  X, 
  CheckCircle2,
  Lock,
  ChevronRight,
  Award
} from 'lucide-react';

export default function Component({ data }: { data?: any }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Default data fallback for reverse engineering fidelity
  const content = {
    nav: data?.nav || {
      logo: "GRUPO SEGURANÇA",
      links: ["Início", "Sobre Nós", "Serviços", "Soluções", "Contato"]
    },
    hero: data?.hero || {
      title: "Segurança Inteligente e Proteção Patrimonial de Elite",
      subtitle: "Soluções integradas com tecnologia de ponta e profissionais altamente treinados para garantir a sua tranquilidade 24 horas por dia.",
      cta: "Solicitar Orçamento",
      secondaryCta: "Conhecer Soluções"
    },
    stats: data?.stats || [
      { label: "Anos de Experiência", value: "15+" },
      { label: "Clientes Atendidos", value: "2.5k" },
      { label: "Profissionais", value: "850+" },
      { label: "Cidades Atendidas", value: "40+" }
    ],
    services: data?.services || [
      {
        icon: <ShieldCheck className="w-8 h-8" />,
        title: "Vigilância Patrimonial",
        desc: "Proteção estratégica para empresas, condomínios e indústrias com rondas preventivas."
      },
      {
        icon: <Cctv className="w-8 h-8" />,
        title: "Monitoramento 24h",
        desc: "Central de inteligência avançada com resposta rápida a alarmes e eventos críticos."
      },
      {
        icon: <Users className="w-8 h-8" />,
        title: "Facilities & Portaria",
        desc: "Controle de acesso rigoroso e serviços auxiliares com foco em hospitalidade e rigor."
      },
      {
        icon: <Lock className="w-8 h-8" />,
        title: "Segurança Eletrônica",
        desc: "Projetos personalizados de CFTV, cercas elétricas e biometria de última geração."
      }
    ],
    about: data?.about || {
      tag: "POR QUE NOS ESCOLHER",
      title: "Excelência e Compromisso com a sua Proteção",
      desc: "O Grupo Aliança (Referência) opera sob os mais rigorosos padrões de qualidade e conformidade legal. Nossa missão é entregar não apenas vigilância, mas a paz de espírito necessária para o seu negócio prosperar.",
      features: [
        "Profissionais com certificação técnica",
        "Tecnologia de monitoramento em tempo real",
        "Atendimento personalizado e consultivo",
        "Frota própria e rastreada"
      ]
    }
  };

  const navVariants = {
    hidden: { y: -100 },
    visible: { y: 0, transition: { duration: 0.5 } }
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 font-sans selection:bg-amber-500 selection:text-slate-900">
      
      {/* --- HEADER --- */}
      <motion.nav
        variants={navVariants}
        initial="hidden"
        animate="visible"
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled ? 'bg-slate-950/90 backdrop-blur-md border-b border-slate-800 py-3' : 'bg-transparent py-6'
        }`}
      >
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="bg-amber-500 p-1.5 rounded">
              <Shield className="w-6 h-6 text-slate-950 fill-current" />
            </div>
            <span className="text-xl font-bold tracking-tighter text-white">
              {content.nav.logo}
            </span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {content.nav.links.map((link: string) => (
              <a key={link} href="#" className="text-sm font-medium hover:text-amber-500 transition-colors">
                {link}
              </a>
            ))}
            <button className="bg-amber-600 hover:bg-amber-500 text-slate-950 px-5 py-2.5 rounded-full font-bold text-sm transition-all transform hover:scale-105">
              {content.hero.cta}
            </button>
          </div>

          {/* Mobile Toggle */}
          <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </motion.nav>

      {/* --- MOBILE MENU --- */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            className="fixed inset-0 z-40 bg-slate-950 flex flex-col justify-center items-center gap-8"
          >
            {content.nav.links.map((link: string) => (
              <a 
                key={link} 
                href="#" 
                onClick={() => setMobileMenuOpen(false)}
                className="text-2xl font-semibold text-white"
              >
                {link}
              </a>
            ))}
            <button className="bg-amber-500 text-slate-950 px-8 py-4 rounded-full font-bold">
              {content.hero.cta}
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- HERO SECTION --- */}
      <section className="relative h-screen flex items-center overflow-hidden">
        {/* Abstract Background Elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent z-10" />
          <img 
            src="https://images.unsplash.com/photo-1557597774-9d2739f85a76?auto=format&fit=crop&q=80" 
            alt="Security Background" 
            className="w-full h-full object-cover opacity-40"
          />
        </div>

        <div className="container mx-auto px-6 relative z-20">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 bg-slate-800/50 border border-slate-700 px-3 py-1 rounded-full mb-6">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
              <span className="text-xs font-bold tracking-widest uppercase text-amber-400">Certificação ISO 9001</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-[1.1]">
              {content.hero.title}
            </h1>
            <p className="text-lg md:text-xl text-slate-400 mb-10 max-w-2xl leading-relaxed">
              {content.hero.subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-amber-600 hover:bg-amber-500 text-slate-950 px-8 py-4 rounded-lg font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-amber-900/20 group">
                {content.hero.cta}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="border border-slate-700 hover:bg-slate-800 text-white px-8 py-4 rounded-lg font-bold transition-all">
                {content.hero.secondaryCta}
              </button>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50">
          <span className="text-[10px] uppercase tracking-widest">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-amber-500 to-transparent" />
        </div>
      </section>

      {/* --- STATS BAR --- */}
      <section className="bg-slate-900 border-y border-slate-800 relative z-20">
        <div className="container mx-auto px-6 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {content.stats.map((stat: any, idx: number) => (
              <motion.div 
                key={idx}
                {...fadeInUp}
                transition={{ delay: idx * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-bold text-amber-500 mb-1">{stat.value}</div>
                <div className="text-sm text-slate-500 uppercase tracking-wider">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- SERVICES GRID --- */}
      <section className="py-24 bg-slate-950 relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-amber-500 font-bold tracking-widest uppercase text-sm mb-4">Soluções Corporativas</h2>
            <h3 className="text-4xl md:text-5xl font-bold text-white mb-6">Proteção Completa em 360 Graus</h3>
            <p className="text-slate-400">Combinamos vigilância humana especializada com tecnologia de monitoramento de última geração para criar ambientes seguros e produtivos.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {content.services.map((service: any, idx: number) => (
              <motion.div
                key={idx}
                {...fadeInUp}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -10 }}
                className="bg-slate-900/50 border border-slate-800 p-8 rounded-2xl hover:bg-slate-900 hover:border-amber-500/50 transition-all group"
              >
                <div className="bg-slate-800 p-4 rounded-xl inline-block mb-6 group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors">
                  {service.icon}
                </div>
                <h4 className="text-xl font-bold text-white mb-4">{service.title}</h4>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                  {service.desc}
                </p>
                <a href="#" className="inline-flex items-center gap-2 text-amber-500 text-sm font-bold group-hover:gap-3 transition-all">
                  Saiba Mais <ChevronRight className="w-4 h-4" />
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- ABOUT SECTION --- */}
      <section className="py-24 bg-slate-900">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="lg:w-1/2 relative">
              <div className="absolute -top-4 -left-4 w-32 h-32 bg-amber-500/10 rounded-full blur-3xl" />
              <div className="relative rounded-2xl overflow-hidden border border-slate-700">
                <img 
                  src="https://images.unsplash.com/photo-1541873676946-84474f6788a5?auto=format&fit=crop&q=80" 
                  alt="Security Team" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-slate-950 border border-slate-800 p-6 rounded-xl hidden md:block">
                <div className="flex items-center gap-4">
                  <div className="bg-amber-500/20 p-3 rounded-lg">
                    <Award className="w-8 h-8 text-amber-500" />
                  </div>
                  <div>
                    <div className="text-white font-bold text-xl leading-none">100% Legal</div>
                    <div className="text-slate-500 text-xs mt-1 uppercase">Polícia Federal</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:w-1/2">
              <span className="text-amber-500 font-bold uppercase tracking-widest text-sm">{content.about.tag}</span>
              <h2 className="text-4xl md:text-5xl font-bold text-white mt-4 mb-8 leading-tight">
                {content.about.title}
              </h2>
              <p className="text-slate-400 text-lg mb-8 leading-relaxed">
                {content.about.desc}
              </p>
              
              <div className="grid sm:grid-cols-2 gap-4 mb-10">
                {content.about.features.map((feat: string, i: number) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-amber-500 shrink-0" />
                    <span className="text-slate-300 font-medium">{feat}</span>
                  </div>
                ))}
              </div>

              <button className="bg-white text-slate-950 px-8 py-4 rounded-lg font-bold hover:bg-amber-500 transition-colors">
                Nossa História
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* --- CTA SECTION --- */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="bg-gradient-to-br from-amber-600 to-amber-700 rounded-3xl p-10 md:p-16 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="absolute top-0 right-0 opacity-10 pointer-events-none">
              <Shield className="w-96 h-96 -mr-20 -mt-20" />
            </div>
            
            <div className="relative z-10 max-w-2xl text-center md:text-left">
              <h2 className="text-3xl md:text-4xl font-black text-slate-950 mb-4 uppercase italic">
                Pronto para elevar o nível da sua segurança?
              </h2>
              <p className="text-slate-900/80 text-lg font-medium">
                Desenvolvemos projetos personalizados de acordo com a vulnerabilidade de cada local.
              </p>
            </div>
            
            <div className="relative z-10 flex shrink-0">
              <button className="bg-slate-950 text-white px-10 py-5 rounded-full font-black text-lg hover:bg-slate-800 transition-all shadow-xl hover:scale-105 uppercase tracking-tighter">
                Falar com Especialista
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-slate-950 border-t border-slate-900 pt-20 pb-10">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 lg:col-span-1">
              <div className="flex items-center gap-2 mb-6">
                <div className="bg-amber-500 p-1.5 rounded">
                  <Shield className="w-6 h-6 text-slate-950 fill-current" />
                </div>
                <span className="text-xl font-bold tracking-tighter text-white">
                  {content.nav.logo}
                </span>
              </div>
              <p className="text-slate-500 mb-6 leading-relaxed">
                Referência em segurança integrada e facilities no Brasil. Protegendo o que é importante para você com tecnologia e confiança.
              </p>
              <div className="flex gap-4">
                {/* Social icons placeholder */}
                {[1,2,3,4].map(i => (
                  <div key={i} className="w-10 h-10 bg-slate-900 rounded-full border border-slate-800 flex items-center justify-center hover:bg-amber-500 hover:text-slate-950 cursor-pointer transition-all" />
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Serviços</h4>
              <ul className="space-y-4">
                {content.services.map((s: any, i: number) => (
                  <li key={i}><a href="#" className="text-slate-500 hover:text-amber-500 transition-colors">{s.title}</a></li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Empresa</h4>
              <ul className="space-y-4">
                <li><a href="#" className="text-slate-500 hover:text-amber-500 transition-colors">Quem Somos</a></li>
                <li><a href="#" className="text-slate-500 hover:text-amber-500 transition-colors">Compliance</a></li>
                <li><a href="#" className="text-slate-500 hover:text-amber-500 transition-colors">Trabalhe Conosco</a></li>
                <li><a href="#" className="text-slate-500 hover:text-amber-500 transition-colors">Blog & Notícias</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Contato</h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-amber-500 shrink-0" />
                  <span className="text-slate-500 text-sm">Av. Central de Proteção, 1000 - Centro Empresarial</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-amber-500 shrink-0" />
                  <span className="text-slate-500 text-sm">0800 700 4000</span>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-amber-500 shrink-0" />
                  <span className="text-slate-500 text-sm">contato@gruposeguranca.com</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="pt-10 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-slate-600 text-sm text-center md:text-left">
              &copy; {new Date().getFullYear()} {content.nav.logo}. Todos os direitos reservados. CNPJ: 00.000.000/0001-00
            </p>
            <div className="flex gap-8">
              <a href="#" className="text-slate-600 hover:text-white text-xs uppercase tracking-widest font-bold">Privacidade</a>
              <a href="#" className="text-slate-600 hover:text-white text-xs uppercase tracking-widest font-bold">Termos</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}