/* eslint-disable */
"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Shield, 
  CheckCircle2, 
  Users, 
  ArrowRight, 
  Phone, 
  Menu, 
  X, 
  ChevronRight, 
  Lock, 
  Award,
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin
} from 'lucide-react';

const Component = ({ data }: { data?: Record<string, unknown> }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Default Content based on Grupo Aliança aesthetics
  const heroData = (data?.hero || {}) as { title?: string; subtitle?: string; cta?: string };
  const content = {
    hero: {
      title: heroData.title || "Segurança e Soluções Completas para o seu Patrimônio",
      subtitle: heroData.subtitle || "Excelência na prestação de serviços com tecnologia de ponta e profissionais altamente qualificados.",
      cta: heroData.cta || "Solicitar Orçamento",
    },
    services: (data?.services as Array<{ icon?: React.ReactNode; title: string; description: string }>) || [
      {
        icon: <Shield className="w-8 h-8" />,
        title: "Segurança Patrimonial",
        description: "Vigilância especializada com foco em prevenção e controle de acesso rigoroso."
      },
      {
        icon: <Users className="w-8 h-8" />,
        title: "Facilities & Serviços",
        description: "Limpeza, portaria e manutenção com padrão premium de atendimento."
      },
      {
        icon: <Lock className="w-8 h-8" />,
        title: "Segurança Eletrônica",
        description: "Monitoramento 24h e tecnologias inteligentes para proteção total."
      }
    ],
    stats: [
      { value: "20+", label: "Anos de Mercado" },
      { value: "500+", label: "Clientes Atendidos" },
      { value: "1.2k+", label: "Colaboradores" },
      { value: "24/7", label: "Suporte Operacional" }
    ]
  };

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Início', href: '#' },
    { name: 'Grupo', href: '#' },
    { name: 'Serviços', href: '#' },
    { name: 'Tecnologia', href: '#' },
    { name: 'Contato', href: '#' },
  ];

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 overflow-x-hidden">
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg py-3' : 'bg-transparent py-5'}`}>
        <div className="max-w-7xl mx-auto px-4 md:px-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-[#002D62] rounded-lg flex items-center justify-center">
              <Shield className="text-[#FFB81C] w-6 h-6" />
            </div>
            <span className={`text-2xl font-bold tracking-tight ${isScrolled ? 'text-[#002D62]' : 'text-white'}`}>
              ALIANÇA<span className="text-[#FFB81C]">.</span>
            </span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                className={`text-sm font-semibold uppercase tracking-wider hover:text-[#FFB81C] transition-colors ${isScrolled ? 'text-slate-700' : 'text-white'}`}
              >
                {link.name}
              </a>
            ))}
            <button className="bg-[#FFB81C] hover:bg-[#e5a519] text-[#002D62] px-6 py-2.5 rounded-full font-bold text-sm transition-all shadow-lg hover:shadow-[#FFB81C]/20">
              ÁREA DO CLIENTE
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-[#FFB81C]" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={30} /> : <Menu size={30} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-[#002D62] pt-24 px-6 md:hidden"
          >
            <div className="flex flex-col gap-6">
              {navLinks.map((link) => (
                <a key={link.name} href={link.href} className="text-2xl font-bold text-white border-b border-white/10 pb-4">
                  {link.name}
                </a>
              ))}
              <button className="bg-[#FFB81C] text-[#002D62] w-full py-4 rounded-xl font-bold text-lg">
                Falar com Especialista
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80" 
            className="w-full h-full object-cover"
            alt="Corporate Background"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#002D62]/95 via-[#002D62]/80 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 w-full pt-20">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <div className="flex items-center gap-2 mb-6">
              <div className="h-1 w-12 bg-[#FFB81C]"></div>
              <span className="text-[#FFB81C] font-bold tracking-[0.2em] text-sm uppercase">Excelência em Serviços</span>
            </div>
            <h1 className="text-4xl md:text-7xl font-extrabold text-white leading-tight mb-8">
              {content.hero.title}
            </h1>
            <p className="text-lg md:text-xl text-slate-200 mb-10 leading-relaxed max-w-xl">
              {content.hero.subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-[#FFB81C] hover:bg-[#e5a519] text-[#002D62] px-10 py-5 rounded-full font-bold text-lg transition-all flex items-center justify-center gap-2 group">
                {content.hero.cta}
                <ArrowRight className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/30 px-10 py-5 rounded-full font-bold text-lg transition-all flex items-center justify-center gap-2">
                Conheça o Grupo
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="relative z-20 -mt-16 max-w-7xl mx-auto px-4">
        <div className="bg-white shadow-2xl rounded-2xl p-8 md:p-12 grid grid-cols-2 md:grid-cols-4 gap-8 border-b-4 border-[#FFB81C]">
          {content.stats.map((stat, idx) => (
            <div key={idx} className="text-center md:text-left border-r last:border-0 border-slate-100 pr-4">
              <div className="text-3xl md:text-4xl font-black text-[#002D62] mb-1">{stat.value}</div>
              <div className="text-xs md:text-sm font-bold text-slate-500 uppercase tracking-widest">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-[#002D62] text-sm font-black uppercase tracking-[0.3em] mb-4">Nossas Especialidades</h2>
            <h3 className="text-3xl md:text-5xl font-extrabold text-slate-900">Soluções Integradas</h3>
            <div className="w-20 h-1.5 bg-[#FFB81C] mx-auto mt-6 rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {content.services.map((service, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ y: -10 }}
                className="bg-white p-10 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 relative group overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                   <div className="scale-[4]">{service.icon}</div>
                </div>
                <div className="w-16 h-16 bg-[#002D62] text-[#FFB81C] rounded-2xl flex items-center justify-center mb-8">
                  {service.icon}
                </div>
                <h4 className="text-2xl font-bold text-[#002D62] mb-4">{service.title}</h4>
                <p className="text-slate-600 leading-relaxed mb-8">
                  {service.description}
                </p>
                <a href="#" className="inline-flex items-center gap-2 font-bold text-sm text-[#002D62] group-hover:text-[#FFB81C] transition-colors">
                  SAIBA MAIS <ChevronRight size={18} />
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="relative z-10 rounded-[2rem] overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&q=80" 
                  alt="Professional Team"
                  className="w-full h-[500px] object-cover"
                />
              </div>
              <div className="absolute -bottom-8 -right-8 w-64 h-64 bg-[#FFB81C] rounded-[2rem] -z-0 hidden md:block"></div>
              <div className="absolute -top-10 -left-10 p-8 bg-[#002D62] text-white rounded-3xl shadow-2xl z-20 max-w-[240px]">
                <Award className="w-12 h-12 text-[#FFB81C] mb-4" />
                <p className="font-bold text-lg">Certificação de Qualidade ISO 9001</p>
              </div>
            </div>

            <div className="space-y-8">
              <h2 className="text-4xl md:text-5xl font-black text-[#002D62] leading-tight">
                Mais do que Segurança, entregamos <span className="text-[#FFB81C]">Tranquilidade</span>.
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed">
                No Grupo Aliança, entendemos que cada cliente possui necessidades únicas. Por isso, desenvolvemos metodologias personalizadas para garantir a melhor proteção e gestão de serviços.
              </p>
              
              <div className="space-y-4">
                {[
                  "Equipes em constante treinamento tático",
                  "Tecnologia de monitoramento em tempo real",
                  "Atendimento personalizado e ágil",
                  "Compromisso rigoroso com a ética e legislação"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <CheckCircle2 className="text-[#FFB81C] shrink-0" />
                    <span className="font-bold text-slate-700">{item}</span>
                  </div>
                ))}
              </div>

              <button className="bg-[#002D62] text-white px-10 py-5 rounded-full font-bold text-lg shadow-xl hover:bg-[#001d40] transition-all">
                Conheça Nossa História
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-[#002D62] py-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[#FFB81C] skew-x-[-20deg] translate-x-32 opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10 text-center">
          <h2 className="text-3xl md:text-5xl font-black text-white mb-8">Pronto para elevar o nível da sua segurança?</h2>
          <p className="text-white/80 text-xl mb-12 max-w-2xl mx-auto">Nossos especialistas estão prontos para desenhar o plano ideal para você ou sua empresa.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <button className="w-full sm:w-auto bg-[#FFB81C] text-[#002D62] px-12 py-6 rounded-full font-black text-xl flex items-center justify-center gap-3 hover:scale-105 transition-transform">
              <Phone size={24} /> 0800 777 0000
            </button>
            <button className="w-full sm:w-auto bg-white text-[#002D62] px-12 py-6 rounded-full font-black text-xl hover:bg-slate-100 transition-colors">
              Falar via WhatsApp
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 pt-20 pb-10 text-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6 grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#FFB81C] rounded flex items-center justify-center">
                <Shield className="text-[#002D62] w-5 h-5" />
              </div>
              <span className="text-2xl font-bold">ALIANÇA</span>
            </div>
            <p className="text-slate-400 leading-relaxed">
              Referência nacional em soluções integradas de segurança e facilities, provendo excelência há mais de duas décadas.
            </p>
            <div className="flex gap-4">
              {[Facebook, Instagram, Linkedin].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#FFB81C] hover:text-[#002D62] transition-all">
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-8 border-l-4 border-[#FFB81C] pl-4">Nossos Serviços</h4>
            <ul className="space-y-4 text-slate-400">
              <li><a href="#" className="hover:text-white transition-colors">Vigilância Patrimonial</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Segurança Eletrônica</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Portaria Remota</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Limpeza Corporativa</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Escolta Armada</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-8 border-l-4 border-[#FFB81C] pl-4">Institucional</h4>
            <ul className="space-y-4 text-slate-400">
              <li><a href="#" className="hover:text-white transition-colors">Sobre o Grupo</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Nossa Tecnologia</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Trabalhe Conosco</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Canal de Ética</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Blog & Notícias</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-8 border-l-4 border-[#FFB81C] pl-4">Contato</h4>
            <div className="space-y-6">
              <div className="flex gap-4 items-start text-slate-400">
                <MapPin className="text-[#FFB81C] shrink-0" size={20} />
                <p>Av. Principal do Business, 1500<br />São Paulo - SP</p>
              </div>
              <div className="flex gap-4 items-center text-slate-400">
                <Mail className="text-[#FFB81C] shrink-0" size={20} />
                <p>contato@grupoalianca.com</p>
              </div>
              <div className="flex gap-4 items-center text-slate-400">
                <Phone className="text-[#FFB81C] shrink-0" size={20} />
                <p>(11) 4004-0000</p>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 md:px-6 pt-10 border-t border-white/5 flex flex-col md:row items-center justify-between gap-6 text-sm text-slate-500">
          <p>© 2024 Grupo Aliança. Todos os direitos reservados.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white">Política de Privacidade</a>
            <a href="#" className="hover:text-white">LGPD</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Component;