"use client";

import React from "react";
import { X } from "lucide-react";
import type { Lead } from "../../types";
import AuditDossier from "./pure-stitch/AuditDossier";

interface AuditModalProps {
  isOpen: boolean;
  onClose: () => void;
  lead: Lead | null;
  ticketMedio: number;
  fluxoMensal: number;
  conversaoAtual: number;
  onPrint: () => void;
}

const AuditModal: React.FC<AuditModalProps> = ({
  isOpen,
  onClose,
  lead,
  // ticketMedio, // Usar se necessário no componente interno
  // fluxoMensal,
  // conversaoAtual,
  onPrint
}) => {
  if (!isOpen || !lead) return null;

  return (
    <div className="fixed inset-0 z-[200] overflow-y-auto bg-[#020617] print:bg-white text-white">
      {/* Botão de Fechar flutuante (não sai no print) */}
      <button 
        onClick={onClose}
        className="fixed top-6 right-6 z-100 w-12 h-12 flex items-center justify-center bg-yellow-500/20 border border-yellow-400/30 text-yellow-400 hover:bg-yellow-500 hover:text-white transition-all rounded-full no-print"
      >
        <X className="w-6 h-6" />
      </button>

      <AuditDossier 
        lead={{
          ...lead,
          name: lead.title,
          site: lead.url || "SEM SITE DETECTADO",
        }} 
        ticketMedio={ticketMedio}
        fluxoMensal={fluxoMensal}
        conversaoAtual={conversaoAtual}
        onPrint={onPrint} 
      />
    </div>
  );
};

export default AuditModal;
