"use client";

import React, { useState } from "react";
import { X, Copy, Check, ExternalLink, ShieldCheck } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ShareLinkModalProps {
  isOpen: boolean;
  onClose: () => void;
  link: string;
}

const ShareLinkModal: React.FC<ShareLinkModalProps> = ({ isOpen, onClose, link }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-[500] flex items-center justify-center p-4">
      <Card className="bg-[#0f172a] border border-emerald-500/30 rounded-none w-full max-w-md overflow-hidden relative shadow-[0_0_50px_rgba(16,185,129,0.15)]">
        <div className="absolute top-0 left-0 w-full h-1 bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.5)]" />
        
        <CardHeader className="p-6 border-b border-white/5 bg-white/2">
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg font-black italic text-white uppercase tracking-tighter flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-emerald-500" />
              PROTOCOLO_INTELIGÊNCIA
            </CardTitle>
            <button
              onClick={onClose}
              className="text-slate-500 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </CardHeader>

        <CardContent className="p-8 space-y-6">
          <div className="space-y-4">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center leading-relaxed font-headline italic">
              O Link de Acesso ao Dossiê Tático foi gerado com sucesso e expira em <span className="text-emerald-400">48 horas</span>.
            </p>

            <div className="relative group p-4 border border-white/10 bg-black/40">
              <div className="flex items-center gap-4 bg-black/60 border border-emerald-500/40 p-1">
                <input
                  readOnly
                  value={link}
                  className="bg-transparent border-none text-[10px] font-mono text-emerald-300 w-full px-4 outline-none select-all"
                />
                <Button
                  onClick={handleCopy}
                  className="bg-emerald-500 hover:bg-emerald-400 text-black font-black rounded-none h-10 px-4 transition-all flex items-center gap-2"
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  <span className="text-[9px] uppercase tracking-tighter">{copied ? "COPIADO" : "COPIAR"}</span>
                </Button>
              </div>
            </div>

            <div className="pt-4 flex flex-col gap-2">
              <a 
                href={link} 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center justify-center gap-2 text-[9px] font-black text-slate-500 hover:text-emerald-400 transition-colors uppercase tracking-[0.2em] py-2"
              >
                <ExternalLink className="w-3 h-3" />
                Validar Link de Transmissão
              </a>
            </div>
          </div>

          <Button
            onClick={onClose}
            className="w-full bg-slate-800 hover:bg-slate-700 text-white font-black font-mono text-[10px] tracking-widest rounded-none py-6 uppercase border border-white/5 transition-all"
          >
            FECHAR_PAINEL
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ShareLinkModal;
