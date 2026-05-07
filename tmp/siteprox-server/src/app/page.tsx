import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { Store } from "@/components/Store";
import { Contact } from "@/components/Contact";

import { DeveloperBadge } from "@/components/DeveloperBadge";

export default function Home() {
  return (
    <main className="relative flex flex-col w-full bg-surface-950 overflow-hidden">
      <Navbar />
      <Hero />
      <Services />
      <Store />
      <Contact />
      
      {/* Footer Branding */}
      <footer className="py-24 border-t border-white/5 bg-surface-900/50">
         <div className="max-w-7xl mx-auto px-4 space-y-16">
            <div className="flex flex-col md:flex-row items-center justify-between gap-12">
               <div className="space-y-4 flex flex-col items-center text-center">
                  <h4 className="text-2xl font-bold tracking-widest text-white/80">MOBITECH®</h4>
                  <p className="text-[10px] font-mono text-white/20 uppercase tracking-[0.4em]">Laboratório de Engenharia Mobile</p>
               </div>
               
               <div className="flex flex-wrap items-center justify-center gap-12 text-[10px] font-mono text-white/40 uppercase tracking-widest text-center md:text-left">
                  <span> petrolândia, contagem </span>
                  <span> since 2012 </span>
                  <span> made in contagem </span>
               </div>
               
               <DeveloperBadge />
            </div>

            <p className="text-[10px] font-mono text-white/10 uppercase tracking-[0.3em] text-center w-full pt-8 border-t border-white/5">
                © {new Date().getFullYear()} MobiTech materiais variados peças e serviços. todos os direitos reservados.
            </p>
         </div>
      </footer>

      {/* Extreme Visual Texture Layer */}
      <div className="fixed inset-0 pointer-events-none z-0">
          {/* Subtle Ambient Glows - NO PURPLE BAN VALIDATED */}
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-brand/5 blur-[120px] rounded-full" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-emerald-500/5 blur-[100px] rounded-full" />
      </div>
    </main>
  );
}
