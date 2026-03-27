"use client";

import React from "react";
import { X, Check, Copy, Sparkles, Zap } from "lucide-react";

interface LovableModalProps {
  isOpen: boolean;
  onClose: () => void;
  promptText: string;
}

const LovableModal: React.FC<LovableModalProps> = ({ isOpen, onClose, promptText }) => {
  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(promptText);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-[#020617]/80 backdrop-blur-md z-[9999] flex items-center justify-center p-4">
      <div className="bg-[#0f172a] border border-cyan-500/30 w-full max-w-2xl relative shadow-[0_0_50px_rgba(6,182,212,0.2)] overflow-hidden rounded-none">
        {/* Progress Bar Header */}
        <div className="h-1 bg-cyan-500 shadow-[0_0_10px_#06b6d4] animate-pulse" />
        
        <div className="p-8">
          <div className="flex justify-between items-start mb-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-cyan-500/10 border border-cyan-500/40 flex items-center justify-center relative">
                 <Sparkles className="w-6 h-6 text-[#06b6d4]" />
                 <div className="absolute inset-0 bg-cyan-500/5 animate-pulse" />
              </div>
              <div>
                <h2 className="text-2xl font-headline font-black italic uppercase tracking-tighter text-white">PROMPT_GERADO_SUCESSO</h2>
                <p className="text-[10px] font-mono text-cyan-500/60 uppercase tracking-widest mt-1">Sincronização com STITCH.withgoogle.com ativa</p>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-white/5 text-slate-500 hover:text-white transition-all"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="space-y-6">
            <div className="bg-black/40 border border-white/5 p-6 font-mono text-xs text-slate-400 relative group">
              <div className="absolute top-2 right-2 opacity-30 group-hover:opacity-100 transition-opacity">
                <Check className="w-4 h-4 text-cyan-500" />
              </div>
              <pre className="whitespace-pre-wrap max-h-60 overflow-y-auto custom-scrollbar">
                {promptText}
              </pre>
            </div>

            <div className="flex flex-col md:flex-row gap-4">
               <button 
                 onClick={handleCopy}
                 className="flex-1 h-14 bg-white text-black font-black uppercase italic tracking-widest hover:bg-[#06b6d4] hover:text-black transition-all flex items-center justify-center gap-3 active:scale-95"
               >
                 <Copy className="w-5 h-5" /> COPIAR_E_FECHAR
               </button>
               <button 
                 onClick={() => {
                   window.open("https://stitch.withgoogle.com", "_blank");
                   onClose();
                 }}
                 className="flex-1 h-14 bg-[#fbce07] text-black font-black uppercase italic tracking-widest hover:bg-white hover:text-black transition-all flex items-center justify-center gap-3 active:scale-95 shadow-[0_0_20px_rgba(251,206,7,0.3)]"
               >
                 <Zap className="w-5 h-5 fill-current" /> ABRIR_STITCH_ENGINE
               </button>
            </div>
          </div>
        </div>

        {/* Footer HUD */}
        <div className="p-4 border-t border-white/5 bg-black/20 flex justify-center">
            <span className="text-[8px] font-black tracking-[1em] text-slate-700 uppercase">SiteProx Networks // UI Gen Engine</span>
        </div>
      </div>
    </div>
  );
};

export default LovableModal;

