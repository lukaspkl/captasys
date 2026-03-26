"use client";

import React from "react";
import { X } from "lucide-react";
import type { Lead } from "../../types";
import RenewalDossier from "./pure-stitch/RenewalDossier";

interface RenewalModalProps {
  isOpen: boolean;
  onClose: () => void;
  lead: Lead | null;
  onPrint: () => void;
}

const RenewalModal: React.FC<RenewalModalProps> = ({
  isOpen,
  onClose,
  lead,
  onPrint
}) => {
  if (!isOpen || !lead) return null;

  return (
    <div className="fixed inset-0 z-200 overflow-y-auto bg-[#020617] print:bg-white text-white">
      {/* Botão de Fechar flutuante */}
      <button 
        onClick={onClose}
        className="fixed top-6 right-6 z-[100] w-12 h-12 flex items-center justify-center bg-cyan-500/20 border border-cyan-400/30 text-cyan-400 hover:bg-cyan-500 hover:text-white transition-all rounded-full no-print"
      >
        <X className="w-6 h-6" />
      </button>

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
