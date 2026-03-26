"use client";

import React from "react";
import { X, Link2 } from "lucide-react";
import type { Lead } from "../../types";
import RenewalDossier from "./pure-stitch/RenewalDossier";

interface RenewalModalProps {
  isOpen: boolean;
  onClose: () => void;
  lead: Lead | null;
  onPrint: () => void;
  onShare: (type: 'audit' | 'tactical' | 'renewal', data: Record<string, unknown>) => Promise<string | null>;
}

const RenewalModal: React.FC<RenewalModalProps> = ({
  isOpen,
  onClose,
  lead,
  onPrint,
  onShare
}) => {
  if (!isOpen || !lead) return null;

  return (
    <div className="fixed inset-0 z-200 overflow-y-auto bg-[#020617] print:bg-white text-white">
      <div className="fixed top-6 right-6 z-100 flex items-center gap-3 no-print">
        <button 
          onClick={() => onShare('renewal', { lead })}
          className="h-12 px-6 flex items-center justify-center gap-2 bg-emerald-500/20 border border-emerald-400/30 text-emerald-400 hover:bg-emerald-500 hover:text-white transition-all rounded-full font-headline font-black italic uppercase text-[10px] tracking-widest cursor-pointer shadow-[0_0_15px_rgba(16,185,129,0.2)]"
        >
          <Link2 className="w-4 h-4" />
          GERAR_LINK_48H
        </button>

        <button 
          onClick={onClose}
          className="w-12 h-12 flex items-center justify-center bg-blue-500/20 border border-blue-400/30 text-blue-400 hover:bg-blue-500 hover:text-white transition-all rounded-full"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      <RenewalDossier 
        lead={{
          name: lead.title,
          site: lead.url || "SEM SITE DETECTADO",
        }} 
        onPrint={onPrint} 
      />
    </div>
  );
};

export default RenewalModal;
