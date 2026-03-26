import React from 'react';
import { 
  Shield, 
  Zap, 
  Smartphone, 
  MessageSquare, 
  TrendingDown, 
  CheckCircle2, 
  ArrowRight,
  Monitor,
  Cpu,
  RefreshCw,
  Clock,
  Printer
} from 'lucide-react';

interface RenewalDossierProps {
  lead?: {
    name?: string;
    city?: string;
    state?: string;
    site?: string;
    whatsapp?: string;
  };
  onPrint?: () => void;
}

const RenewalDossier: React.FC<RenewalDossierProps> = ({ lead, onPrint }) => {
  return (
    <div className="min-h-screen bg-[#050508] text-white font-['Inter'] selection:bg-[#ff00ea]/30 overflow-x-hidden relative">
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          .no-print { display: none !important; }
          body { background: white !important; color: black !important; }
          section { border: 1px solid #eee !important; break-inside: avoid !important; margin: 20px 0 !important; }
          .text-transparent { color: #ff00ea !important; -webkit-background-clip: unset !important; background: none !important; }
        }
      `}} />
      
      {/* HEADER NO-PRINT */}
      <header className="fixed top-0 w-full z-50 bg-black/60 backdrop-blur-xl border-b border-white/5 h-20 no-print">
        <nav className="flex items-center justify-between px-8 h-full w-full max-w-7xl mx-auto">
          <div className="text-xl font-black italic tracking-tighter text-[#ff00ea]">
            RENEWAL_DOSSIER
          </div>
          <button 
            onClick={onPrint}
            className="flex items-center gap-2 px-6 py-2 bg-[#ff00ea] text-white font-bold rounded-sm skew-x-[-12deg] hover:shadow-[0_0_15px_rgba(255,0,234,0.3)] transition-all active:scale-95"
          >
            <Printer size={16} />
            <span>IMPRIMIR_PROTOCOLO</span>
          </button>
        </nav>
      </header>

      {/* Background Ornaments */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden no-print pt-20">
        <div className="absolute top-[10%] right-[-10%] w-[500px] h-[500px] bg-[#ff00ea]/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[20%] left-[-10%] w-[400px] h-[400px] bg-[#00f2ff]/10 rounded-full blur-[100px]" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
      </div>

      <main className="relative z-10 p-6 md:p-12 max-w-7xl mx-auto space-y-24 pb-32 pt-32">
        
        {/* HERO SECTION - 1. CAPA */}
        <section className="min-h-[70vh] flex flex-col justify-center items-center text-center space-y-8">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#ff00ea]/10 border border-[#ff00ea]/30 text-[#ff00ea] text-xs font-bold tracking-widest uppercase mb-4 animate-pulse">
            <Shield size={14} />
            <span>Acesso Restrito // Protocolo 2099</span>
          </div>
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter leading-none italic uppercase">
            Dossiê: <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-[#ff00ea] via-[#7000ff] to-[#00f2ff] drop-shadow-[0_0_15px_rgba(255,0,234,0.5)]">
              {lead?.name || "Modernização"}
            </span>
            <br /> Digital
          </h1>
          <p className="text-xl md:text-2xl text-white/60 font-medium max-w-2xl mx-auto">
            Seu site está ajudando ou <span className="text-white border-b-2 border-[#ff00ea]">afastando</span> seus clientes?
          </p>
          <div className="flex flex-col md:flex-row gap-4 pt-8 no-print">
            <button className="px-8 py-4 bg-[#ff00ea] hover:bg-[#ff00ea]/80 text-white font-bold rounded-sm skew-x-[-12deg] transition-all transform hover:scale-105 shadow-[0_0_20px_rgba(255,0,234,0.4)]">
              INICIAR DIAGNÓSTICO
            </button>
            <button 
              onClick={onPrint}
              className="px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold rounded-sm skew-x-[-12deg] transition-all backdrop-blur-md"
            >
              GERAR RELATÓRIO PDF
            </button>
          </div>
        </section>

        {/* 2. ABERTURA & 3. PROBLEMAS COMUNS */}
        <section className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="w-12 h-1 bg-[#ff00ea] mb-4"></div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight uppercase italic">
              Hoje, não basta <br />ter um site.
            </h2>
            <p className="text-lg text-white/50 leading-relaxed">
              Em um ecossistema digital saturado, se o seu portal for <span className="text-[#ff00ea] font-bold">lento</span> ou <span className="text-[#ff00ea] font-bold">desatualizado</span>, a latência é o fim da sua autoridade.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: <Monitor className="text-[#ff00ea]" />, label: "Visual Antigo", desc: "Interface datada" },
              { icon: <Clock className="text-[#00f2ff]" />, label: "Lento", desc: "Perda de retenção" },
              { icon: <Smartphone className="text-[#ff00ea]" />, label: "Mobile Inoperante", desc: "Experiência quebrada" },
              { icon: <MessageSquare className="text-[#00f2ff]" />, label: "Sem Contato", desc: "Labirinto de CTA" }
            ].map((item, i) => (
              <div key={i} className="p-6 bg-white/5 border border-white/10 rounded-xl backdrop-blur-md hover:border-[#ff00ea]/50 transition-colors group">
                <div className="mb-4 transform group-hover:scale-110 transition-transform">{item.icon}</div>
                <h3 className="font-bold uppercase text-sm mb-1">{item.label}</h3>
                <p className="text-[10px] text-white/40 uppercase tracking-widest">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 4. IMPACTO & 6. REALIDADE */}
        <section className="relative p-8 md:p-16 rounded-3xl overflow-hidden border border-white/10">
          <div className="absolute inset-0 bg-linear-to-br from-[#120a2e] to-[#050508] -z-10" />
          <div className="absolute top-0 left-0 w-full h-[2px] bg-linear-to-r from-transparent via-[#ff00ea] to-transparent" />
          
          <div className="max-w-3xl space-y-8">
            <div className="inline-block px-3 py-1 bg-red-500/20 text-red-500 text-[10px] font-black tracking-[0.3em] uppercase border border-red-500/30">
              Critical Warning // Error 0x9942
            </div>
            <h2 className="text-4xl md:text-6xl font-black italic uppercase leading-tight">
              Um site ruim transmite <span className="text-transparent bg-clip-text bg-linear-to-r from-red-500 to-[#ff00ea]">insegurança.</span>
            </h2>
            <p className="text-xl text-white/60 leading-relaxed">
              No ecossistema digital, a primeira falha é a última. Seu site pode estar fazendo você <span className="text-white font-bold underline decoration-[#ff00ea]">perder dinheiro todos os dias.</span>
            </p>
            <div className="flex items-center space-x-6">
              <div className="text-center">
                <div className="text-4xl font-black text-[#ff00ea]">78.4%</div>
                <div className="text-[10px] text-white/40 uppercase tracking-tighter">Taxa de Abandono</div>
              </div>
              <div className="w-px h-12 bg-white/10" />
              <div className="text-center">
                <div className="text-4xl font-black text-[#00f2ff]">4.2s</div>
                <div className="text-[10px] text-white/40 uppercase tracking-tighter">Latência Média</div>
              </div>
            </div>
          </div>
        </section>

        {/* 5. COMPARAÇÃO ANTES VS DEPOIS */}
        <section className="space-y-12">
          <div className="text-center">
            <h2 className="text-3xl font-black uppercase tracking-widest italic mb-2">Análise de Evolução</h2>
            <div className="h-1 w-24 bg-[#ff00ea] mx-auto" />
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-8 bg-white/5 border border-white/10 rounded-2xl grayscale hover:grayscale-0 transition-all opacity-60 hover:opacity-100">
              <h3 className="text-xl font-bold uppercase mb-6 flex items-center gap-2">
                <TrendingDown className="text-red-500" /> Legado Estagnado
              </h3>
              <ul className="space-y-4 text-white/40">
                <li className="flex items-center gap-2 italic">--- Carregamento Lento (8s+)</li>
                <li className="flex items-center gap-2 italic">--- Interface Datada</li>
                <li className="flex items-center gap-2 italic">--- Experiência Ruidosa</li>
              </ul>
            </div>
            <div className="p-8 bg-[#ff00ea]/5 border border-[#ff00ea]/30 rounded-2xl relative shadow-[0_0_30px_rgba(255,0,234,0.1)]">
              <div className="absolute top-4 right-4 text-[10px] text-[#ff00ea] font-bold animate-pulse">OPTIMIZED_UI</div>
              <h3 className="text-xl font-bold uppercase mb-6 flex items-center gap-2 text-[#ff00ea]">
                <Zap /> Hoje: Neon-Protocol
              </h3>
              <ul className="space-y-4 text-white/80">
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-[#00f2ff]" /> Carregamento Instantâneo</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-[#00f2ff]" /> Focado em Conversão</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-[#00f2ff]" /> Integrado com WhatsApp</li>
              </ul>
            </div>
          </div>
        </section>

        {/* 7. SOLUÇÃO SITEPROX & 8. BENEFÍCIOS */}
        <section className="grid md:grid-cols-2 gap-16 items-center">
          <div className="relative aspect-square rounded-2xl bg-[#0e0e1a] border border-white/10 overflow-hidden group">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#ff00ea]/20 via-transparent to-transparent opacity-50" />
            <div className="absolute inset-0 flex items-center justify-center">
               <Cpu size={120} className="text-[#ff00ea]/20 group-hover:text-[#ff00ea]/40 transition-colors group-hover:scale-110 duration-700" />
            </div>
            <div className="absolute bottom-6 left-6 right-6 p-4 bg-black/60 backdrop-blur-md border border-white/10 rounded-lg">
              <div className="text-[10px] text-[#00f2ff] font-bold mb-1 tracking-widest uppercase">Encryption Level 9</div>
              <div className="text-xs text-white/60 italic">&ldquo;Mantemos seu site moderno, rápido e atualizado.&rdquo;</div>
            </div>
          </div>
          <div className="space-y-8">
            <h2 className="text-5xl font-black uppercase italic">Solução <br/><span className="text-[#00f2ff]">SiteProx</span></h2>
            <div className="space-y-6">
              {[
                { title: "Atualizações Constantes", desc: "Fluxo contínuo de patches de segurança e novas funcionalidades via rede neural." },
                { title: "Performance Alta", desc: "Otimização de hardware a nível de kernel para latência zero em ambientes de alto estresse." },
                { title: "Manutenção Inclusa", desc: "Suporte técnico 24/7 com diagnósticos preditivos e reparos modulares automáticos." }
              ].map((item, i) => (
                <div key={i} className="flex gap-4">
                  <div className="mt-1"><RefreshCw size={20} className="text-[#ff00ea]" /></div>
                  <div>
                    <h4 className="font-bold uppercase text-sm mb-1">{item.title}</h4>
                    <p className="text-sm text-white/50">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 10. PLANOS */}
        <section className="space-y-12">
          <div className="text-center">
            <h2 className="text-3xl font-black uppercase italic">Protocolos de Sistema</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: "Essencial", price: "100", features: ["Acesso Básico", "5GB Cache", "Suporte Holo"] },
              { name: "Pro", price: "150", features: ["Root Completo", "Banda Ilimitada", "Criptografia 1024-bits", "Prioridade"], highlight: true },
              { name: "Sazonal", price: "Sob Demanda", features: ["Pagamento por Uso", "Escalabilidade", "Burst Capacity"] }
            ].map((plano, i) => (
              <div key={i} className={`p-8 rounded-2xl border backdrop-blur-lg flex flex-col ${plano.highlight ? 'bg-[#ff00ea]/10 border-[#ff00ea] shadow-[0_0_30px_rgba(255,0,234,0.2)]' : 'bg-white/5 border-white/10'}`}>
                <h3 className="text-sm font-black uppercase text-white/40 mb-2">Protocolo_{i+1}</h3>
                <h4 className="text-2xl font-bold uppercase mb-6 italic">{plano.name}</h4>
                <div className="text-4xl font-black mb-8">
                  {plano.price !== "Sob Demanda" && <span className="text-xs align-top">R$</span>}
                  {plano.price}
                  {plano.price !== "Sob Demanda" && <span className="text-xs text-white/40 font-normal"> /MÊS</span>}
                </div>
                <ul className="space-y-4 mb-12 flex-grow">
                  {plano.features.map((f, j) => (
                    <li key={j} className="text-xs text-white/60 flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-[#ff00ea] rounded-full" /> {f}
                    </li>
                  ))}
                </ul>
                <button className={`w-full py-3 font-bold text-xs uppercase tracking-widest skew-x-[-10deg] transition-all ${plano.highlight ? 'bg-[#ff00ea] text-white hover:brightness-110' : 'bg-white/10 text-white hover:bg-white/20 border border-white/10'}`}>
                  Conectar Agora
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* 9. OFERTA & 11. CTA FINAL */}
        <section className="relative p-12 md:p-24 rounded-3xl text-center space-y-8 overflow-hidden">
          <div className="absolute inset-0 bg-linear-to-t from-[#ff00ea]/20 to-transparent -z-10" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#ff00ea]/10 rounded-full blur-[120px] -z-20" />
          
          <div className="inline-flex items-center space-x-2 px-4 py-1 border border-yellow-500/40 bg-yellow-500/10 text-yellow-500 text-[10px] font-black uppercase tracking-[0.2em] mb-4">
             Protocol: Override // 30%_Discount
          </div>
          <h2 className="text-5xl md:text-7xl font-black italic uppercase leading-none">
            30% de <span className="text-[#ff00ea] drop-shadow-[0_0_10px_rgba(255,0,234,0.5)]">Desconto</span>
          </h2>
          <p className="text-xl text-white/60 max-w-xl mx-auto uppercase font-bold tracking-widest">
            Nos primeiros 3 meses de conexão.
          </p>
          <div className="pt-12 no-print">
            <button className="group relative px-12 py-6 bg-white text-black font-black text-xl uppercase italic skew-x-[-12deg] transition-all hover:scale-105 active:scale-95 shadow-[0_0_40px_rgba(255,255,255,0.3)]">
              <span className="flex items-center gap-3">
                Mission Start: Atualizar Agora <ArrowRight className="group-hover:translate-x-2 transition-transform" />
              </span>
            </button>
            <p className="mt-8 text-[10px] text-white/30 uppercase tracking-[0.4em]">
              *Acesso imediato ao painel de controle após confirmação.
            </p>
          </div>
        </section>

      </main>

      <footer className="py-12 border-t border-white/5 bg-black/40 backdrop-blur-xl relative z-20">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-xl font-black italic tracking-tighter text-[#ff00ea]">DIGITAL DOSSIER</div>
          <div className="text-[10px] text-white/30 uppercase tracking-[0.3em]">© 2099 Neon-Noir Systems // Access Restricted</div>
          <div className="flex gap-8 text-[10px] text-white/40 uppercase tracking-widest font-bold">
            <a href="#" className="hover:text-[#ff00ea] transition-colors">Encryption_Log</a>
            <a href="#" className="hover:text-[#ff00ea] transition-colors">Data_Purge</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default RenewalDossier;