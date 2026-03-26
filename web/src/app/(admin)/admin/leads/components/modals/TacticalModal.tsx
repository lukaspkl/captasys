"use client";

import React from "react";
import { X, Link2 } from "lucide-react";
import type { Lead } from "../../types";
import TacticalDossierHUD from "./pure-stitch/TacticalDossier";

interface TacticalModalProps {
  isOpen: boolean;
  onClose: () => void;
  lead: Lead | null;
  leads: Lead[]; // Recebe a lista global para busca de concorrentes
  competitorsList?: Lead[]; // Concorrentes reais vindos do radar (opcional)
  niche: string; // Nicho atual para exibir no reporte
  onPrint: () => void;
  onShare: (type: 'audit' | 'tactical' | 'renewal', data: Record<string, unknown>) => Promise<string | null>;
}

const TacticalModal: React.FC<TacticalModalProps> = ({
  isOpen,
  onClose,
  lead,
  leads,
  competitorsList = [],
  niche,
  onPrint,
  onShare
}) => {
  // Busca concorrentes reais (Top 2 com as melhores notas no mesmo nicho/localidade)
  const realCompetitors = React.useMemo(() => {
    if (!lead) return [];
    
    // Se já tivermos a lista do radar (populada no useLeadsState), usamos ela
    if (competitorsList.length > 0) {
      return competitorsList.slice(0, 5);
    }

    // Função auxiliar para normalizar e extrair a cidade/bairro principal
    const normalizeLoc = (loc?: string) => {
      if (!loc) return "";
      const normalized = loc.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      return normalized;
    };

    const targetLoc = normalizeLoc(lead.addressBase || lead.address || "");
    const targetNiche = normalizeLoc(niche);
    
    // Busca na lista local (dashboard)
    const candidates = leads.filter(l => {
      if (l.id === lead.id || l.title === lead.title) return false;
      
      const lLoc = normalizeLoc(l.addressBase || l.address || "");
      const lNiche = normalizeLoc(l.classificationMotivity || "");
      
      const matchesNiche = targetNiche === "geral" || lNiche.includes(targetNiche) || (lead.classificationMotivity && lNiche.includes(normalizeLoc(lead.classificationMotivity)));
      const matchesLoc = targetLoc !== "" && (lLoc.includes(targetLoc) || targetLoc.includes(lLoc));
      
      return matchesNiche && (matchesLoc || leads.length < 5); // Relaxa se tiver poucos leads
    });

    // Ordena por rating e review count
    return candidates
      .sort((a, b) => {
        const ratingA = parseFloat(String(a.rating || 0));
        const ratingB = parseFloat(String(b.rating || 0));
        if (ratingB !== ratingA) return ratingB - ratingA;
        return parseInt(String(b.reviewCount || 0)) - parseInt(String(a.reviewCount || 0));
      })
      .slice(0, 5);
  }, [lead, leads, competitorsList, niche]);

  if (!isOpen || !lead) return null;

  // Frase de destaque (Pode vir de uma prop no futuro, mas por enquanto vamos passar um placeholder ou permitir customização)
  const highlightPhrase = "O MERCADO DIGITAL NA SUA REGIÃO ESTÁ SENDO DOMINADO POR CONCORRENTES QUE JÁ UTILIZAM ESTRATÉGIAS DE CAPTURA GEOGRÁFICA.";

  return (
    <div className="fixed inset-0 z-[200] overflow-y-auto bg-[#020617] print:bg-white">
      <div className="fixed top-6 right-6 z-[100] flex items-center gap-3 no-print">
        <button 
          onClick={() => onShare('tactical', { 
            lead, 
            competitors: realCompetitors, 
            niche, 
            highlightPhrase 
          })}
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

      <TacticalDossierHUD 
        lead={lead} 
        competitors={realCompetitors}
        nicho={niche}
        onPrint={onPrint}
        highlightPhrase={highlightPhrase}
      />
    </div>
  );
};

export default TacticalModal;
