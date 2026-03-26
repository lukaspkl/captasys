'use client';

import React from 'react';
import { 
  Terminal, Share2, Radar, Eye, MousePointer2, 
  CircleDollarSign, TriangleAlert, Timer,
  Star, StarHalf, ChevronRight
} from 'lucide-react';
import { Lead } from '../../../types';

interface TacticalDossierProps {
  lead?: Lead;
  onPrint?: () => void;
}

const TacticalDossier: React.FC<TacticalDossierProps> = ({ lead, onPrint }) => {

  return (
    <div className="min-h-screen bg-[#130b18] text-[#f4defe] font-['Manrope'] selection:bg-[#d575ff] selection:text-[#390050] relative overflow-x-hidden">
      {/* SCANLINE / CRT OVERLAY (15%) */}
      <div className="fixed inset-0 pointer-events-none z-100 opacity-[0.15] select-none" style={{ 
        background: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))',
        backgroundSize: '100% 2px, 3px 100%'
      }}></div>

      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700;900&family=Manrope:wght@300;400;500;600;700;800&display=swap');
        
        .font-headline { font-family: 'Space Grotesk', sans-serif; }
        .font-body { font-family: 'Manrope', sans-serif; }
        
        .glow-primary { box-shadow: 0 0 15px rgba(213, 117, 255, 0.4); }
        .glow-secondary { box-shadow: 0 0 15px rgba(0, 219, 233, 0.4); }
        .text-glow-primary { text-shadow: 0 0 8px rgba(213, 117, 255, 0.6); }
        
        .glass-panel {
          backdrop-filter: blur(12px);
          background: rgba(32, 21, 39, 0.6);
        }
        
        .asymmetric-clip {
          clip-path: polygon(0 0, 100% 0, 95% 100%, 0% 100%);
        }

        .vertical-text {
          writing-mode: vertical-rl;
          text-orientation: mixed;
        }

        @media print {
          .no-print { display: none !important; }
        }
      `}} />

      {/* Navigation Shell */}
      <header className="fixed top-0 w-full z-50 rounded-none bg-[#130b18]/60 backdrop-blur-xl border-b border-[#52425c]/20 shadow-[0_4px_20px_rgba(185,10,252,0.15)] flex justify-between items-center px-8 h-20 no-print">
        <div className="text-2xl font-black tracking-tighter text-[#d575ff] drop-shadow-[0_0_8px_rgba(213,117,255,0.5)] font-headline uppercase">
          Tactical Dossier
        </div>
        <nav className="hidden md:flex gap-8 items-center">
          <a className="text-[#00dbe9] border-b-2 border-[#00dbe9] pb-1 font-headline tracking-tighter uppercase text-sm" href="#capa">Capa</a>
          <a className="text-[#b8a4c2] hover:text-[#f4defe] transition-colors font-headline tracking-tighter uppercase text-sm" href="#intro">Intro</a>
          <a className="text-[#b8a4c2] hover:text-[#f4defe] transition-colors font-headline tracking-tighter uppercase text-sm" href="#concorrentes">Concorrentes</a>
          <a className="text-[#b8a4c2] hover:text-[#f4defe] transition-colors font-headline tracking-tighter uppercase text-sm" href="#analise">Análise</a>
          <a className="text-[#b8a4c2] hover:text-[#f4defe] transition-colors font-headline tracking-tighter uppercase text-sm" href="#insights">Insights</a>
          <a className="text-[#b8a4c2] hover:text-[#f4defe] transition-colors font-headline tracking-tighter uppercase text-sm" href="#alerta">Alerta</a>
          <a className="text-[#b8a4c2] hover:text-[#f4defe] transition-colors font-headline tracking-tighter uppercase text-sm" href="#conclusao">Conclusão</a>
        </nav>
        <div className="flex gap-4">
          <button className="text-[#d575ff] p-2 hover:bg-[#362641]/50 transition-all duration-300">
            <Terminal className="w-5 h-5" />
          </button>
          <button onClick={onPrint} className="text-[#d575ff] p-2 hover:bg-[#362641]/50 transition-all duration-300">
            <Share2 className="w-5 h-5" />
          </button>
        </div>
      </header>

      <main className="pt-20">
        {/* SECTION 1: CAPA */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-6 lg:px-24" id="capa">
          <div className="absolute inset-0 z-0">
            <img 
              className="w-full h-full object-cover opacity-30 grayscale contrast-125" 
              alt="abstract grid" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAf4YfRiWs_F8Zs10sc-hRio8O6OS04PzTzX6CN_hpY9TViC4KW0LzylGh0bYiHH2J0qU5SJf37YC7EukD6pdkUmOQyS9kAya4AEbZ1R8JJUwHwOuCaRiC-xWLtKWzanNsNeiHKg0TAxdF1-DaZnI-qr84V-eh8OJph2ZC7QTGTwlNpFcYFk98ol3WEVl6B6bwRy76Namuo-gkKPaHAoHga-mLYL8BmZjC2jhy7uwccRarsNPOZ7O0pBcE0nnKZ4kl4iVzt0meX6uo" 
            />
            <div className="absolute inset-0 bg-linear-to-b from-[#130b18]/80 via-[#130b18]/40 to-[#130b18]"></div>
          </div>
          <div className="relative z-10 max-w-5xl text-center">
            <div className="inline-block px-4 py-1 bg-[#d575ff]/20 border-l-4 border-[#d575ff] text-[#d575ff] font-headline text-xs tracking-[0.3em] uppercase mb-6">
              Intel System Online: Protocol 772
            </div>
            <h1 className="font-headline text-5xl md:text-8xl font-black text-[#f4defe] tracking-tighter uppercase mb-6 drop-shadow-[0_0_20px_rgba(213,117,255,0.4)] leading-none">
              Dossiê Tático de <br/><span className="text-[#00dbe9] italic">Presença Digital</span>
            </h1>
            <p className="text-[#b8a4c2] font-body text-xl md:text-2xl max-w-2xl mx-auto mb-10 leading-relaxed">
              Análise estratégica de alta frequência sobre o impacto e autoridade de <span className="text-[#f4defe] font-bold">{lead?.title || 'sua organização'}</span> no ecossistema digital contemporâneo.
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
              <button className="bg-[#d575ff] text-[#390050] font-headline font-bold uppercase tracking-widest px-10 py-4 text-sm glow-primary hover:scale-105 transition-transform duration-300">
                Iniciar Escaneamento
              </button>
              <div className="flex items-center gap-3 text-[#00ccd9] font-headline text-xs tracking-widest uppercase">
                <Radar className="w-4 h-4 animate-pulse" />
                Data Stream: Active
              </div>
            </div>
          </div>
          <div className="absolute bottom-10 left-10 hidden lg:block">
            <div className="font-headline text-[10px] text-[#816f8b] tracking-[0.5em] uppercase vertical-text">
              ID: 00-SYNC-992 // SECTOR 7G
            </div>
          </div>
        </section>

        {/* SECTION 2: INTRODUÇÃO */}
        <section className="py-24 px-6 lg:px-24 bg-[#19101f] relative" id="intro">
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="absolute -top-10 -left-10 w-32 h-32 bg-[#00dbe9]/10 rounded-none border border-[#00dbe9]/20 blur-xl"></div>
              <img 
                className="w-full h-[500px] object-cover border-l-8 border-[#00dbe9] grayscale hover:grayscale-0 transition-all duration-700" 
                alt="cyberpunk office" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBzBnfL6QQqudtmMQoXm21bdALDn1NhK7eFVGaxMGBOZnblKbRCDJnuT_NJhaAMc8F41XmeVPJSOPJ1rRIp13EHun-eMgQCXCOLuGAcDiN-6rVw1D--Zg11bwpS6Px0NrJ4vjok7UPwCG4BiqmjM0dFFz3Ud3NfNs7wHqaAUyg4qm7nolMeZdGJafuussh_s3ZqzS54aKqMAWjBALjiXrRqUmQXuWXicqLI8WMkHaF71a5GVtR-ojlQAjsxdeDcxvWkxKJRpJGo538" 
              />
              <div className="absolute bottom-4 right-4 bg-[#130b18] p-6 border-b-2 border-[#d575ff] shadow-2xl">
                <div className="text-[#d575ff] font-headline text-4xl font-black">94%</div>
                <div className="text-[#b8a4c2] text-[10px] uppercase tracking-tighter font-headline">dos clientes pesquisam antes</div>
              </div>
            </div>
            <div>
              <h2 className="font-headline text-3xl md:text-5xl font-bold text-[#f4defe] mb-8 tracking-tight">
                A Decisão do Cliente <br/><span className="text-[#d575ff]">Começa no Google</span>
              </h2>
              <div className="space-y-6 text-[#b8a4c2] leading-relaxed text-lg">
                <p>
                  No cenário atual de saturação de informação, a primeira batalha pela atenção não ocorre no seu estabelecimento, mas nos resultados de busca. 
                </p>
                <p className="border-l-2 border-[#00dbe9] pl-6 italic bg-[#00dbe9]/5 py-4 text-[#f4defe]">
                  "Hoje, a decisão de um cliente começa no Google. Se sua presença digital é invisível ou mal otimizada, você não existe para o mercado."
                </p>
                <p>
                  Não se trata apenas de "ter um site". Trata-se de dominar as frequências onde o seu público está sintonizado. Este dossiê revela onde você está e quão longe seus concorrentes avançaram enquanto sua estação estava em silêncio.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: CONCORRENTES */}
        <section className="py-24 px-6 lg:px-24 bg-[#130b18]" id="concorrentes">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
              <div>
                <span className="text-[#00dbe9] font-headline text-sm tracking-[0.4em] uppercase">Tactical Radar Scan</span>
                <h2 className="font-headline text-4xl font-black uppercase tracking-tighter mt-2 text-[#f4defe]">Local Competitor Map</h2>
              </div>
              <div className="text-[#b8a4c2] font-headline text-xs uppercase tracking-widest text-right">
                Location: <span className="text-[#f4defe]">Lead Coordinates</span><br/>
                Signal Strength: <span className="text-[#00dbe9]">Optimal</span>
              </div>
            </div>
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 relative h-[500px] bg-[#2e2038] overflow-hidden">
                <img 
                  className="w-full h-full object-cover opacity-40 mix-blend-screen grayscale" 
                  alt="schematic map" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDIFLNn67ZFkbzSdhWCweqHgMLKqe7EbggkTGt0-NA6lsL_uMzYcyvg1iWNQoBVNHlbXC8JirU4ThoXg1BNyFe73raagRYmu2awFjHYiKbGomu_9cPG6qyL3tW4-z1TNHDrMf9p5Js77VkTuZBO9vgmZTEtSbLC0Xs5f3nYyf4yJL3SWF7qmvshohDGi86ugsx1Qdp-EXKIehRUcX-tWJpfTpBkIno3Gi4BV56oyvJS_boV5I6AzWyEKFOGjvJV4nz68eXmT8d_x4M" 
                />
                <div className="absolute inset-0 border border-[#52425c]/30"></div>
                <div className="absolute top-1/4 left-1/3 w-4 h-4 bg-[#00dbe9] rounded-full animate-pulse glow-secondary"></div>
                <div className="absolute top-1/2 left-1/2 w-4 h-4 bg-[#d575ff] rounded-full animate-pulse glow-primary"></div>
                <div className="absolute bottom-1/3 right-1/4 w-4 h-4 bg-[#ffb1c3] rounded-full animate-pulse shadow-[0_0_10px_rgba(228,0,108,0.5)]"></div>
                <div className="absolute bottom-4 left-4 glass-panel p-4 border-l-2 border-[#00dbe9]">
                  <div className="text-[10px] text-[#00dbe9] font-headline uppercase mb-1">Status Report</div>
                  <div className="text-xs text-[#f4defe] font-body leading-tight">3 Aggressive Competitors detected within <br/>a 2km radius of your coordinates.</div>
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <div className="bg-[#201527] p-6 border-l-4 border-[#ffb1c3]">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="font-headline font-bold text-xl uppercase tracking-tighter text-[#f4defe]">Cyber_Dyne Tech</h3>
                    <span className="bg-[#ffb1c3]/20 text-[#ffb1c3] px-2 py-0.5 text-[10px] font-headline">RANK 01</span>
                  </div>
                  <div className="flex gap-1 text-[#00dbe9] mb-4">
                    <Star className="w-3.5 h-3.5 fill-[#00dbe9]" />
                    <Star className="w-3.5 h-3.5 fill-[#00dbe9]" />
                    <Star className="w-3.5 h-3.5 fill-[#00dbe9]" />
                    <Star className="w-3.5 h-3.5 fill-[#00dbe9]" />
                    <StarHalf className="w-3.5 h-3.5 fill-[#00dbe9]" />
                    <span className="text-[#b8a4c2] text-xs ml-2 font-headline">4.8 (1.2k reviews)</span>
                  </div>
                  <div className="flex justify-between text-xs text-[#b8a4c2] font-headline border-t border-[#52425c]/30 pt-4">
                    <span>Distância: 0.4km</span>
                    <span className="text-[#00dbe9]">Visibilidade: 98%</span>
                  </div>
                </div>
                <div className="bg-[#201527] p-6 border-l-4 border-[#00dbe9]/50">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="font-headline font-bold text-xl uppercase tracking-tighter text-[#f4defe]">Neo-Tokyo Sol.</h3>
                    <span className="bg-[#00dbe9]/20 text-[#00dbe9] px-2 py-0.5 text-[10px] font-headline">RANK 02</span>
                  </div>
                  <div className="flex gap-1 text-[#00dbe9] mb-4">
                    <Star className="w-3.5 h-3.5 fill-[#00dbe9]" />
                    <Star className="w-3.5 h-3.5 fill-[#00dbe9]" />
                    <Star className="w-3.5 h-3.5 fill-[#00dbe9]" />
                    <Star className="w-3.5 h-3.5 fill-[#00dbe9]" />
                    <Star className="w-3.5 h-3.5" />
                    <span className="text-[#b8a4c2] text-xs ml-2 font-headline">4.1 (840 reviews)</span>
                  </div>
                  <div className="flex justify-between text-xs text-[#b8a4c2] font-headline border-t border-[#52425c]/30 pt-4">
                    <span>Distância: 1.2km</span>
                    <span className="text-[#00dbe9]">Visibilidade: 72%</span>
                  </div>
                </div>
                <div className="bg-[#19101f] p-6 opacity-60 border-l-4 border-[#816f8b]">
                  <div className="text-[#816f8b] font-headline font-bold text-xl uppercase tracking-tighter">{lead?.title || 'Sua Empresa'}</div>
                  <div className="text-[#b8a4c2] text-xs font-headline mt-4">Calculando métricas...</div>
                  <div className="w-full bg-[#52425c]/20 h-1 mt-2">
                    <div className="bg-[#d575ff] h-full w-1/4"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: ANÁLISE */}
        <section className="py-24 px-6 lg:px-24 bg-[#201527]" id="analise">
          <div className="max-w-7xl mx-auto flex flex-col items-center">
            <h2 className="font-headline text-4xl md:text-6xl font-black text-center mb-16 uppercase italic text-[#f4defe]">
              <span className="text-[#d575ff]">Fluxo</span> de Captura Digital
            </h2>
            <div className="w-full grid md:grid-cols-3 gap-0 border border-[#52425c]/30">
              <div className="p-12 border-r border-[#52425c]/30 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 font-headline text-[10px] text-[#00dbe9] opacity-30">001</div>
                <Eye className="text-[#00dbe9] w-12 h-12 mb-8" />
                <h3 className="font-headline text-2xl font-bold mb-4 uppercase text-[#f4defe]">Visualização</h3>
                <p className="text-[#b8a4c2]">Esses negócios estão sendo vistos todos os dias por milhares de usuários locais.</p>
                <div className="mt-12 h-20 flex items-end gap-1">
                  <div className="bg-[#00dbe9]/40 w-full h-[40%]"></div>
                  <div className="bg-[#00dbe9]/60 w-full h-[60%]"></div>
                  <div className="bg-[#00dbe9]/80 w-full h-[90%]"></div>
                  <div className="bg-[#00dbe9] w-full h-full glow-secondary"></div>
                </div>
              </div>
              <div className="p-12 border-r border-[#52425c]/30 relative overflow-hidden bg-[#d575ff]/5">
                <div className="absolute top-0 right-0 p-4 font-headline text-[10px] text-[#d575ff] opacity-30">002</div>
                <MousePointer2 className="text-[#d575ff] w-12 h-12 mb-8" />
                <h3 className="font-headline text-2xl font-bold mb-4 uppercase text-[#f4defe]">Interação</h3>
                <p className="text-[#b8a4c2]">Cliques em rotas, chamadas e visitas ao site. A intenção de compra é imediata.</p>
                <div className="mt-12 space-y-2">
                  <div className="w-full bg-[#52425c]/20 h-2"><div className="bg-[#d575ff] h-full w-3/4"></div></div>
                  <div className="w-full bg-[#52425c]/20 h-2"><div className="bg-[#d575ff] h-full w-1/2"></div></div>
                  <div className="w-full bg-[#52425c]/20 h-2"><div className="bg-[#d575ff] h-full w-5/6"></div></div>
                </div>
              </div>
              <div className="p-12 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 font-headline text-[10px] text-[#ffb1c3] opacity-30">003</div>
                <CircleDollarSign className="text-[#ffb1c3] w-12 h-12 mb-8" />
                <h3 className="font-headline text-2xl font-bold mb-4 uppercase text-[#f4defe]">Conversão</h3>
                <p className="text-[#b8a4c2]">Visitantes transformados em receita real. O ciclo do domínio digital se completa.</p>
                <div className="mt-12 flex justify-center">
                  <div className="w-16 h-16 rounded-full border-4 border-[#ffb1c3] border-t-transparent animate-spin"></div>
                  <div className="absolute flex flex-col items-center justify-center h-16 pt-0.5">
                    <span className="text-[#ffb1c3] font-headline font-bold text-xl">$</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 5: INSIGHTS */}
        <section className="py-24 px-6 lg:px-24 bg-[#130b18]" id="insights">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-start">
              <div>
                <div className="bg-[#00dbe9]/10 border-l-2 border-[#00dbe9] p-4 mb-8 inline-block">
                  <span className="text-[#00dbe9] font-headline uppercase text-xs tracking-widest">Neural Insights Core</span>
                </div>
                <h2 className="font-headline text-5xl font-black mb-8 leading-tight uppercase tracking-tighter text-[#f4defe]">O que os dados <br/><span className="text-[#00dbe9]">estão gritando:</span></h2>
                <div className="space-y-8">
                  {[
                    { id: 'A', title: 'Quem aparece mais → vende mais', text: 'A visibilidade é o novo petróleo. No ambiente digital, ser visto não é vaidade, é sobrevivência comercial.', color: '#00dbe9' },
                    { id: 'B', title: 'Autoridade por Validação', text: '"Quem tem mais avaliações → transmite confiança". O cérebro humano busca atalhos; 5 estrelas é o maior atalho de vendas.', color: '#d575ff' },
                    { id: 'C', title: 'Velocidade de Resposta', text: 'A conveniência de um botão "Ligar" ou "Como Chegar" reduz a fricção da venda a quase zero.', color: '#ffb1c3' }
                  ].map((insight) => (
                    <div key={insight.id} className="flex gap-6 group">
                      <div 
                        className="w-12 h-12 flex-shrink-0 bg-[#362641] flex items-center justify-center border border-[#52425c]/30 group-hover:border-current transition-colors"
                        style={{ color: insight.color }}
                      >
                        <span className="font-headline font-bold">{insight.id}</span>
                      </div>
                      <div>
                        <h4 className="font-headline font-bold text-xl text-[#f4defe] mb-2 uppercase">{insight.title}</h4>
                        <p className="text-[#b8a4c2] leading-relaxed">{insight.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative mt-12 lg:mt-0">
                <div className="absolute -inset-4 bg-linear-to-tr from-[#d575ff]/20 to-[#00dbe9]/20 blur-2xl opacity-30"></div>
                <div className="relative bg-[#201527] p-8 border border-[#52425c]/20">
                  <img 
                    className="w-full aspect-square object-cover grayscale opacity-80 mb-8 border border-[#52425c]/30" 
                    alt="financial dash" 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBMqRupAlrRL47e4US85nYHFTA9b7kwqPsrnNLGNq8uBvTAxzwD9cmIEzYG7JK2xS7qKGLTYMcSK4m-xlkTPo898gx-IePNz5Hi_qxQYbn_lhwqCoRGmSo9bDOdaFTv_qB5nM51cUORCcKliMidyWKU-Lz591hfFZQ2rLEO1bF_7lltMEvykarkeVWYRACSkj84AXhfM3A5v7ClUPsKZRS7uTetzEpUdyp7wrm6wxLDCswNYu_mVLb2qjcUfUNMg32_Bgd1Gcb-NKI" 
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-[#130b18]">
                      <div className="text-[10px] font-headline text-[#816f8b] uppercase">Dominância</div>
                      <div className="text-2xl font-headline font-bold text-[#00dbe9]">LOW</div>
                    </div>
                    <div className="p-4 bg-[#130b18]">
                      <div className="text-[10px] font-headline text-[#816f8b] uppercase">Risco</div>
                      <div className="text-2xl font-headline font-bold text-[#ffb1c3]">CRITICAL</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 6: ALERTA */}
        <section className="py-20 px-6 lg:px-24 bg-[#130b18] border-y-2 border-[#ffb1c3]/30 relative overflow-hidden" id="alerta">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(228,0,108,0.1),transparent_70%)]"></div>
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <div className="flex justify-center mb-8">
              <div className="w-20 h-20 rounded-none border-2 border-[#ffb1c3] flex items-center justify-center animate-pulse">
                <TriangleAlert className="text-[#ffb1c3] w-10 h-10" />
              </div>
            </div>
            <h2 className="font-headline text-4xl md:text-6xl font-black text-[#f4defe] uppercase mb-8 tracking-tighter">
              Sistema em <span className="text-[#ffb1c3] underline decoration-double">Estado de Alerta</span>
            </h2>
            <p className="text-xl md:text-2xl font-body text-[#b8a4c2] mb-12 leading-relaxed">
              "Enquanto você está parado, seus concorrentes estão captando clientes todos os dias. Cada hora de inatividade digital é um cliente que entrou na porta do vizinho."
            </p>
            <div className="inline-block glass-panel border border-[#ffb1c3]/40 px-8 py-4 asymmetric-clip">
              <div className="text-[#f4defe] font-headline font-bold uppercase tracking-widest flex items-center gap-3">
                <Timer className="text-[#ffb1c3] w-5 h-5" />
                TEMPO RESTANTE PARA REAÇÃO: ESTIMATIVA <span className="text-[#ffb1c3]">LIMITADA</span>
              </div>
            </div>
          </div>
          <div className="absolute top-0 left-0 w-full h-1 bg-[repeating-linear-gradient(45deg,#e4006c,#e4006c_10px,#130b18_10px,#130b18_20px)]"></div>
          <div className="absolute bottom-0 left-0 w-full h-1 bg-[repeating-linear-gradient(45deg,#e4006c,#e4006c_10px,#130b18_10px,#130b18_20px)]"></div>
        </section>

        {/* SECTION 7: CONCLUSÃO & CTA */}
        <section className="py-32 px-6 lg:px-24 bg-[#130b18] relative overflow-hidden" id="conclusao">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#d575ff]/5 to-transparent"></div>
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="grid lg:grid-cols-2 gap-20 items-center">
              <div>
                <h2 className="font-headline text-5xl md:text-7xl font-black text-[#f4defe] mb-8 uppercase leading-[0.9] tracking-tighter">
                  Hoje, não basta existir. <br/><span className="text-[#00dbe9] italic">É preciso ser encontrado.</span>
                </h2>
                <p className="text-[#b8a4c2] text-xl mb-12 leading-relaxed max-w-lg">
                  O silêncio digital é a morte lenta de qualquer negócio moderno. Recupere o controle da sua frequência e domine o seu mercado local.
                </p>
                <div className="flex flex-col sm:flex-row gap-6">
                  <button className="bg-[#00dbe9] text-[#00484d] font-headline font-black uppercase px-12 py-5 text-sm tracking-[0.2em] glow-secondary hover:-translate-y-1 transition-all duration-300">
                    Baixar Dossier PDF
                  </button>
                  <button className="border-2 border-[#d575ff] text-[#d575ff] font-headline font-black uppercase px-12 py-5 text-sm tracking-[0.2em] hover:bg-[#d575ff]/10 transition-all duration-300">
                    Consultar Especialista
                  </button>
                </div>
              </div>
              <div className="glass-panel p-10 border border-[#52425c]/30">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 bg-[#d575ff]/20 flex items-center justify-center">
                    <ChevronRight className="text-[#d575ff] w-8 h-8" />
                  </div>
                  <h3 className="font-headline font-bold text-2xl uppercase text-[#f4defe]">Solicitar Briefing</h3>
                </div>
                <form className="space-y-6">
                  <div>
                    <label className="font-headline text-[10px] text-[#816f8b] uppercase tracking-widest mb-2 block">Cripto ID / Nome</label>
                    <input className="w-full bg-[#201527] border-b border-[#52425c] focus:border-[#d575ff] focus:ring-0 text-[#f4defe] font-body p-3 placeholder:text-[#52425c]" placeholder="SEU NOME" type="text"/>
                  </div>
                  <div>
                    <label className="font-headline text-[10px] text-[#816f8b] uppercase tracking-widest mb-2 block">Data Channel / Email</label>
                    <input className="w-full bg-[#201527] border-b border-[#52425c] focus:border-[#d575ff] focus:ring-0 text-[#f4defe] font-body p-3 placeholder:text-[#52425c]" placeholder="EMAIL@CYBER.COM" type="email"/>
                  </div>
                  <div>
                    <label className="font-headline text-[10px] text-[#816f8b] uppercase tracking-widest mb-2 block">Objective</label>
                    <textarea className="w-full bg-[#201527] border-b border-[#52425c] focus:border-[#d575ff] focus:ring-0 text-[#f4defe] font-body p-3 placeholder:text-[#52425c]" placeholder="QUAL O SEU DESAFIO ATUAL?" rows={3}></textarea>
                  </div>
                  <button className="w-full bg-[#d575ff] text-[#390050] font-headline font-bold uppercase py-4 tracking-widest glow-primary hover:brightness-110 transition-all" type="submit">Transmitir Mensagem</button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer Shell */}
      <footer className="w-full border-t-2 border-[#d575ff]/30 bg-[#201527] flex flex-col md:flex-row justify-between items-center py-12 px-10 relative">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%)] bg-[length:100%_4px] pointer-events-none opacity-20"></div>
        <div className="z-10 text-lg font-bold text-[#d575ff] font-headline uppercase mb-6 md:mb-0">
          Neon Syndicate Intel
        </div>
        <div className="z-10 text-[#00dbe9] font-headline text-[10px] tracking-[0.2em] uppercase text-center md:text-left">
          © 2024 NEON SYNDICATE INTEL. ALL RIGHTS RESERVED.
        </div>
        <div className="z-10 flex gap-8 mb-6 md:mb-0">
          <a className="text-[#b8a4c2] hover:text-[#ffb1c3] transition-colors font-headline text-[10px] tracking-[0.2em] uppercase" href="#">Privacy</a>
          <a className="text-[#b8a4c2] hover:text-[#ffb1c3] transition-colors font-headline text-[10px] tracking-[0.2em] uppercase" href="#">Terminal Access</a>
          <a className="text-[#b8a4c2] hover:text-[#ffb1c3] transition-colors font-headline text-[10px] tracking-[0.2em] uppercase" href="#">Support</a>
        </div>
      </footer>
    </div>
  );
};

export default TacticalDossier;