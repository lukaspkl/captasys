"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Activity } from "lucide-react";

interface PreviewModalProps {
  isOpen: boolean;
  htmlInput: string;
  onHtmlInputChange: (value: string) => void;
  previewLink: string;
  onSave: () => void;
  onClose: () => void;
}

export default function PreviewModal({
  isOpen,
  htmlInput,
  onHtmlInputChange,
  previewLink,
  onSave,
  onClose,
}: PreviewModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[700] flex items-center justify-center p-6 bg-black/95 backdrop-blur-xl animate-in fade-in duration-300">
      <div className="hud-panel w-full max-w-2xl p-10 bg-slate-950 border-cyan-500/40 space-y-8 shadow-[0_0_50px_rgba(6,182,212,0.15)]">
        <div className="space-y-1">
          <Badge className="bg-cyan-500 text-black font-black uppercase text-[9px]">UPLOADER_v4.0</Badge>
          <h3 className="text-2xl font-black text-white italic uppercase tracking-tighter">SUBIR_AO_STITCH_CORE (48H)</h3>
          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Injete o código gerado pelo motor de IA para criar o link de expiração.</p>
        </div>

        <div className="space-y-4">
          <textarea
            value={htmlInput}
            onChange={(e) => onHtmlInputChange(e.target.value)}
            className="w-full h-64 bg-black/60 border border-cyan-500/20 text-cyan-400 p-6 font-mono text-[10px] focus:border-cyan-500 outline-none rounded-none"
            placeholder="Cole o código do site aqui... (Next.js/HTML exportado)"
          />
          {previewLink && (
            <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-black font-mono text-xs break-all">
              LINK_GERADO: {previewLink}
            </div>
          )}
        </div>

        <div className="flex gap-4">
          <Button
            className="flex-1 bg-cyan-500 text-black font-black h-16 rounded-none uppercase tracking-widest hover:bg-white transition-colors"
            onClick={onSave}
          >
            <Activity className="w-5 h-5 mr-3" /> GERAR_LINK_E_COPIAR_WHATS
          </Button>
          <Button
            variant="outline"
            className="px-8 border-white/10 text-slate-400 h-16 rounded-none uppercase text-[10px] font-black hover:bg-white/5"
            onClick={onClose}
          >
            FECHAR
          </Button>
        </div>
      </div>
    </div>
  );
}
