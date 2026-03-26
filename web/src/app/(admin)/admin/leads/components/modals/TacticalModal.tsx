"use client";

import React from "react";
import { X } from "lucide-react";
import type { Lead } from "../../types";
import TacticalDossierHUD from "./pure-stitch/TacticalDossier";

interface TacticalModalProps {
  isOpen: boolean;
  onClose: () => void;
  lead: Lead | null;
  onPrint: () => void;
}

const TacticalModal: React.FC<TacticalModalProps> = ({
  isOpen,
  onClose,
  lead,
  onPrint
}) => {
  if (!isOpen || !lead) return null;

  return (
    <div className="fixed inset-0 z-200 overflow-y-auto bg-[#020617] print:bg-white">
      {/* Botão de Fechar flutuante (não sai no print) */}
      <button 
        onClick={onClose}
        className="fixed top-6 right-6 z-[100] w-12 h-12 flex items-center justify-center bg-blue-500/20 border border-blue-400/30 text-blue-400 hover:bg-blue-500 hover:text-white transition-all rounded-full no-print"
      >
        <X className="w-6 h-6" />
      </button>

      <TacticalDossierHUD 
        lead={{
          name: lead.title,
          city: lead.locality || "",
          state: lead.region || "",
          site: lead.url || "",
          whatsapp: lead.phone || "",
        }} 
        onPrint={onPrint} 
      />
    </div>
  );
};

export default TacticalModal;
