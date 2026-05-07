"use client";

import { motion } from "framer-motion";
import { DeviceMobile, BatteryHigh, ArrowsClockwise, HardDrive, Cpu, Lightning } from "@phosphor-icons/react";

const SERVICES = [
  { 
    title: "Troca de Tela", 
    desc: "Recuperação total da resolução original. Vidro premium e calibração de toque.", 
    time: "45 min", 
    icon: DeviceMobile, 
    color: "emerald" 
  },
  { 
    title: "Saúde da Bateria", 
    desc: "Substituição por células de alta performance. Ciclo de carga calibrado.", 
    time: "30 min", 
    icon: BatteryHigh, 
    color: "blue" 
  },
  { 
    title: "Recuperação de Placa", 
    desc: "Solda microscópica e reparo de CPU. Onde outros dizem 'sem conserto'.", 
    time: "4-48h", 
    icon: Cpu, 
    color: "indigo" 
  },
  { 
    title: "Upgrade de Armazenamento", 
    desc: "Expansão de memória NAND com as melhores marcas. Rapidez na leitura.", 
    time: "24h", 
    icon: HardDrive, 
    color: "amber" 
  },
  { 
    title: "Problema de Software", 
    desc: "Desbloqueio, restauração e backup de dados. Sigilo absoluto.", 
    time: "1-2h", 
    icon: ArrowsClockwise, 
    color: "rose" 
  },
  { 
    title: "Reparo no Conector", 
    desc: "Substituição completa do módulo de carga. Volte a carregar em segundos.", 
    time: "20 min", 
    icon: Lightning, 
    color: "sky" 
  },
];

export function Services() {
  return (
    <section id="services" className="py-32 px-4 relative">
      <div className="max-w-7xl mx-auto space-y-24">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row items-end justify-between gap-8">
          <div className="space-y-4">
            <span className="text-brand font-mono text-xs uppercase tracking-[0.3em]">Protocolos de Atendimento</span>
            <h2 className="text-3xl sm:text-5xl md:text-7xl font-bold bg-gradient-to-r from-white via-white/80 to-white/20 bg-clip-text text-transparent">
              CUIDADO <br />
              ESPECIALISTA.
            </h2>
          </div>
          <p className="text-white/40 max-w-sm text-sm border-l border-white/10 pl-6 h-max">
            Diagnosticamos cada dispositivo com scanners de última geração, 
            garantindo que o problema real seja atacado de imediato.
          </p>
        </div>

        {/* Services Grid (Double-Bezel) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service, idx) => (
            <motion.div
              key={idx}
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
              className="glass-panel group"
            >
              <div className="glass-inner flex flex-col justify-between h-full space-y-12 hoveR:bg-white/5 transition-colors">
                 <div className="space-y-6">
                    <div className="flex items-start justify-between">
                       <div className="w-12 h-12 rounded-xl bg-surface-800 flex items-center justify-center border border-white/5 group-hover:bg-brand transition-colors">
                          <service.icon size={24} weight="light" className="group-hover:text-black transition-colors" />
                       </div>
                       <span className="font-mono text-[10px] text-brand/60 uppercase">Procedimento: Lab-0{(idx+1)}</span>
                    </div>
                    <div>
                       <h3 className="text-2xl font-bold mb-2">{service.title}</h3>
                       <p className="text-sm text-white/40 leading-relaxed">{service.desc}</p>
                    </div>
                 </div>

                 <div className="flex items-center justify-between pt-6 border-t border-white/5">
                    <div className="flex items-center gap-2">
                       <span className="text-[10px] font-mono text-white/20">TEMPO ESTIMADO:</span>
                       <span className="text-xs font-bold text-white/80 uppercase">{service.time}</span>
                    </div>
                    <button className="text-[10px] font-bold text-brand uppercase tracking-widest hover:translate-x-1 transition-transform cursor-pointer">
                      Ver mais ➞
                    </button>
                 </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
