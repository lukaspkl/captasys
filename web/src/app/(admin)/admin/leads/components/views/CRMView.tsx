/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";

interface CRMViewProps {
  leads: any[];
  openLeadDetails: (lead: any) => void;
  updateLeadStatus: (url: string, status: string) => void;
}

const CRMView: React.FC<CRMViewProps> = ({
  leads,
  openLeadDetails,
  updateLeadStatus,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 h-[calc(100vh-250px)] animate-in fade-in slide-in-from-bottom-4 px-6 pb-20">
      {["NOVO", "CONTATADO", "PROPOSTA", "FECHADO"].map((status) => (
        <div
          key={status}
          className="flex flex-col gap-6 bg-[#0a0a0a]/80 border border-cyan-400/10 p-2 rounded-none group hover:border-cyan-400/30 transition-all hacker-grid-bg"
        >
          <h4 className="font-hacker font-black italic text-[12px] text-cyan-400 uppercase tracking-[0.3em] border-b border-cyan-400/20 pb-4 mb-2 flex items-center justify-between px-4">
            {status}_PHASE
            <span className="text-[10px] bg-cyan-500 text-black px-3 py-0.5 rounded-none font-mono font-black">
              {
                leads.filter((l) => (l.status || "NOVO") === status)
                  .length
              }
            </span>
          </h4>
          <div className="flex-1 overflow-y-auto space-y-4 custom-scrollbar px-2">
            {leads
              .filter((l) => (l.status || "NOVO") === status)
              .map((lead, idx) => (
                <div
                  key={idx}
                  onClick={() => openLeadDetails(lead)}
                  className="bg-dark-bg border border-cyan-400/10 p-5 hover:border-cyan-400/40 transition-all cursor-crosshair relative group/card shadow-lg hover:shadow-cyan-500/5"
                >
                  <div className="text-[11px] font-black text-cyan-400 uppercase font-mono truncate pr-4 group-hover/card:hacker-glow">
                    {lead.title}
                  </div>
                  <div className="text-[9px] text-cyan-900 mt-2 truncate font-black uppercase font-mono tracking-tighter">
                    {lead.address || "LOCATION_OFFLINE"}
                  </div>

                  <div className="flex items-center justify-between mt-6 pt-4 border-t border-cyan-400/10">
                    <div
                      className={`text-[9px] font-black px-3 py-1 rounded-none font-mono ${lead.score > 70 ? "bg-cyan-500/10 text-cyan-400 border border-cyan-400/20 shadow-[0_0_10px_rgba(6,182,212,0.1)]" : lead.score > 40 ? "bg-amber-500/10 text-amber-500 border border-amber-500/20" : "bg-pink-500/10 text-pink-500 border border-pink-500/20"}`}
                    >
                      SCORE::{lead.score}
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        const nextStatus =
                          status === "NOVO"
                            ? "CONTATADO"
                            : status === "CONTATADO"
                              ? "PROPOSTA"
                              : status === "PROPOSTA"
                                ? "FECHADO"
                                : "NOVO";
                        updateLeadStatus(lead.url, nextStatus);
                      }}
                      className="text-[9px] text-[#06b6d4] font-black hover:text-white uppercase italic tracking-tighter opacity-0 group-hover/card:opacity-100 transition-opacity"
                    >
                      AVANÇAR_MISSÃO {">>"}
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CRMView;
