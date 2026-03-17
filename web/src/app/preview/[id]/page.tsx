'use client';

import { useEffect, useState, useRef } from 'react';
import { useParams } from 'next/navigation';

interface PreviewData {
  id: string;
  html: string;
  leadName: string;
  leadPhone: string;
  createdAt: number;
  expiresAt: number;
}

const STORYTELLING: { delay: number; text: string; sub?: string }[] = [
  { delay: 4000,  text: '✦ Este protótipo foi criado especialmente para você.', sub: 'Veja como seus clientes veriam seu negócio.' },
  { delay: 12000, text: '🎯 Seus clientes veriam isso antes de ligar para você.', sub: 'Um site profissional aumenta em 3x a taxa de contato.' },
  { delay: 22000, text: '💬 "Eu escolho quem tem site. Transmite mais confiança."', sub: '— Opinião mais comum de consumidores locais' },
  { delay: 34000, text: '📞 Quantas ligações você perdeu essa semana?', sub: 'Sem site, clientes escolhem o concorrente que tem.' },
  { delay: 46000, text: '⏳ Este site pode ser seu. A decisão é agora.', sub: 'Esta prévia expira em breve — não deixe para depois.' },
];

export default function PreviewPage() {
  const params = useParams();
  const id = params.id as string;
  const [preview, setPreview] = useState<PreviewData | null>(null);
  const [expired, setExpired] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ h: 47, m: 59, s: 59 });
  const [toast, setToast] = useState<{ text: string; sub?: string } | null>(null);
  const [toastVisible, setToastVisible] = useState(false);
  const [isImmersive, setIsImmersive] = useState(false);
  const toastTimers = useRef<ReturnType<typeof setTimeout>[]>([]);

  // Load preview from localStorage
  useEffect(() => {
    const cache = localStorage.getItem('capta_previews');
    if (!cache) { setExpired(true); return; }
    const previews: PreviewData[] = JSON.parse(cache);
    const found = previews.find(p => p.id === id);
    if (!found) { setExpired(true); return; }
    if (Date.now() > found.expiresAt) { setExpired(true); return; }
    setPreview(found);
  }, [id]);

  // Countdown timer
  useEffect(() => {
    if (!preview) return;
    const tick = setInterval(() => {
      const remaining = Math.max(0, preview.expiresAt - Date.now());
      if (remaining === 0) { setExpired(true); clearInterval(tick); return; }
      const h = Math.floor(remaining / 3_600_000);
      const m = Math.floor((remaining % 3_600_000) / 60_000);
      const s = Math.floor((remaining % 60_000) / 1_000);
      setTimeLeft({ h, m, s });
    }, 1000);
    return () => clearInterval(tick);
  }, [preview]);

  // Storytelling toasts
  useEffect(() => {
    if (!preview) return;
    STORYTELLING.forEach(({ delay, text, sub }) => {
      const t = setTimeout(() => {
        setToast({ text, sub });
        setToastVisible(true);
        setTimeout(() => setToastVisible(false), 6000);
      }, delay);
      toastTimers.current.push(t);
    });
    return () => toastTimers.current.forEach(clearTimeout);
  }, [preview]);

  const pad = (n: number) => String(n).padStart(2, '0');

  const whatsappUrl = preview
    ? `https://wa.me/5531982188309?text=${encodeURIComponent(`Olá! Vi a prévia do site para ${preview.leadName} e gostaria de saber mais sobre como fechar o projeto. Ainda está disponível?`)}`
    : '#';

  if (expired) return (
    <div className="min-h-screen bg-[#0d1117] flex flex-col items-center justify-center text-white text-center p-8">
      <div className="text-7xl mb-6">⏳</div>
      <h1 className="text-3xl font-black italic uppercase tracking-tighter mb-3">Esta Prévia Expirou</h1>
      <p className="text-slate-400 text-sm mb-8">O período de visualização de 48 horas encerrou.</p>
      <p className="text-slate-500 text-xs">Entre em contato com quem enviou este link para uma nova demonstração.</p>
    </div>
  );

  if (!preview) return (
    <div className="min-h-screen bg-[#0d1117] flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="relative min-h-screen bg-white">

      {/* TOP BAR — Urgency Banner */}
      {!isImmersive && (
        <div className="fixed top-0 left-0 right-0 z-[999] bg-[#0d1117] border-b border-white/10 px-4 py-3 flex items-center justify-between gap-4 shadow-2xl transition-all duration-500">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-2 h-2 rounded-full bg-rose-500 animate-pulse shrink-0" />
            <span className="text-[10px] font-black text-white uppercase tracking-widest truncate">
              PRÉVIA EXCLUSIVA — {preview.leadName}
            </span>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button 
              onClick={() => setIsImmersive(true)}
              className="mr-4 text-[9px] font-black text-cyan-400 hover:text-white uppercase tracking-widest border border-cyan-400/30 px-2 py-1 flex items-center gap-1 transition-all"
            >
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></svg>
              VER TELA CHEIA
            </button>
            <div className="flex items-center gap-1 bg-rose-500/10 border border-rose-500/30 px-2 py-1 rounded">
              <span className="text-rose-400 font-black text-xs tabular-nums">
                {pad(timeLeft.h)}:{pad(timeLeft.m)}:{pad(timeLeft.s)}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* SITE CONTENT — Isolated Iframe for 100% fidelity */}
      <div 
        className="w-full h-screen transition-all duration-500 ease-in-out" 
        style={{ 
          paddingTop: isImmersive ? '0px' : '52px', 
          paddingBottom: isImmersive ? '0px' : '80px' 
        }}
      >
        <iframe
          srcDoc={preview.html}
          className="w-full h-full border-none"
          title="Stitch Preview"
          sandbox="allow-scripts allow-same-origin"
        />
      </div>

      {/* FLOATING RESTORE BUTTON (Shown only in immersive) */}
      {isImmersive && (
        <button
          onClick={() => setIsImmersive(false)}
          className="fixed bottom-6 left-6 z-[1000] bg-black/80 backdrop-blur-md text-white border border-white/20 p-3 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all flex items-center gap-2 group"
          title="Sair do Modo Imersivo"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 14h6v6M20 10h-6V4M14 10l7-7M3 21l7-7"/></svg>
          <span className="text-[10px] font-black uppercase tracking-widest pr-2 hidden group-hover:block transition-all">Sair da Tela Cheia</span>
        </button>
      )}

      {/* STORYTELLING TOAST */}
      {!isImmersive && (
        <div
          className={`fixed bottom-24 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-sm z-[998] transition-all duration-500 ${
            toastVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
          }`}
        >
          <div className="bg-[#0f172a] border border-cyan-500/20 shadow-[0_0_40px_rgba(6,182,212,0.15)] p-4 rounded-xl">
            <p className="text-white font-bold text-sm leading-snug">{toast?.text}</p>
            {toast?.sub && <p className="text-slate-400 text-xs mt-1 leading-snug">{toast.sub}</p>}
          </div>
        </div>
      )}

      {/* BOTTOM BAR — CTA */}
      {!isImmersive && (
        <div className="fixed bottom-0 left-0 right-0 z-[999] bg-[#0d1117]/95 backdrop-blur-md border-t border-white/10 px-4 py-3 flex items-center justify-between gap-4 transition-all duration-500">
          <p className="text-[10px] font-bold text-slate-400 uppercase leading-tight hidden sm:block">
            Gostou? Este site<br />pode ser seu em 48h.
          </p>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#22c55e] text-white font-black text-sm uppercase tracking-wider px-6 py-3 rounded-xl shadow-lg shadow-green-500/20 transition-all active:scale-95"
          >
            <svg width="18" height="18" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.52a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592z"/>
            </svg>
            QUERO ESSE SITE →
          </a>
        </div>
      )}

    </div>
  );
}
