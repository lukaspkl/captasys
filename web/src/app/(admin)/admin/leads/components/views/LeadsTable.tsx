/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import { 
  Activity, 
  MapPin, 
  FileText, 
  Sparkles, 
  Layers, 
  Archive, 
  Trash2 
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface LeadsTableProps {
  filteredLeads: any[];
  openLeadDetails: (lead: any) => void;
  generateTacticalDossier: (lead: any) => void;
  setSelectedLeadIndex: (idx: number | null) => void;
  addToSwipe: (lead: any) => void;
  addToVault: (lead: any) => void;
  handleDeleteLead: (lead: any) => void;
  setLeads: (leads: any[]) => void;
}

const LeadsTable: React.FC<LeadsTableProps> = ({
  filteredLeads,
  openLeadDetails,
  generateTacticalDossier,
  setSelectedLeadIndex,
  addToSwipe,
  addToVault,
  handleDeleteLead,
  setLeads,
}) => {
  return (
    <div className="xl:col-span-8 space-y-6">
      <div className="flex items-center justify-between border-b border-cyan-400/20 pb-4">
        <h3 className="font-hacker text-2xl font-black text-cyan-400 uppercase tracking-widest hacker-glow">
          SCAN_RESULTS_STREAM ({filteredLeads.length})
        </h3>
        <Button
          variant="ghost"
          className="text-[9px] text-pink-500 font-black hover:text-white font-mono tracking-widest"
          onClick={() => {
            localStorage.removeItem("capta_leads_cache");
            setLeads([]);
          }}
        >
          WIPE_MEMORY_CACHE
        </Button>
      </div>
      <div className="bg-[#0a0a0a] border border-cyan-400/20 p-1">
        <style dangerouslySetInnerHTML={{ __html: `
          @keyframes neonBlink1 { 0%, 49% { opacity: 1; } 50%, 100% { opacity: 0; } }
          @keyframes neonBlink2 { 0%, 49% { opacity: 0; } 50%, 100% { opacity: 1; } }
          .blink-1 { animation: neonBlink1 1.5s infinite; }
          .blink-2 { animation: neonBlink2 1.5s infinite; }
        `}} />
        <Table>
          <TableHeader className="bg-cyan-950/20">
            <TableRow className="border-cyan-400/10 hover:bg-transparent text-[8px] font-black uppercase tracking-[0.3em] text-cyan-400/60 font-mono">
              <TableHead className="h-10">
                HEX_IDENTIFIER
              </TableHead>
              <TableHead className="h-10">OP_INDEX</TableHead>
              <TableHead className="h-10">COMMS_LINK</TableHead>
              <TableHead className="h-10 text-right">
                EXE_CMDS
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredLeads.map((lead, idx) => (
              <TableRow
                key={idx}
                onClick={() => openLeadDetails(lead)}
                className="border-b border-cyan-400/5 group hover:bg-cyan-500/5 transition-colors cursor-crosshair h-20"
              >
                <TableCell className="py-2">
                  <div className="flex flex-col">
                    <span className="text-xs font-black text-cyan-400 uppercase font-mono truncate max-w-[200px] group-hover:hacker-glow">
                      {lead.title}
                    </span>
                    <span className="text-[9px] text-cyan-700 font-mono truncate max-w-[250px]">
                      {lead.snippet}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {((lead.temperature || "Morno") === "Quente" && (!lead.url || lead.url.includes("google.com"))) ? (
                      <div className="relative w-20 h-5 flex items-center justify-center border border-pink-500/40 bg-pink-500/10 shadow-[0_0_15px_rgba(236,72,153,0.3)]">
                        <span className="absolute text-[8px] font-black uppercase tracking-widest text-rose-500 blink-1">
                          QUENTE
                        </span>
                        <span className="absolute text-[7px] font-black uppercase tracking-[0.2em] text-pink-400 blink-2 shadow-pink-500">
                          SEM_WEBSITE
                        </span>
                      </div>
                    ) : (
                      <Badge
                        className={`text-[8px] font-black uppercase tracking-widest rounded-none border ${
                          (lead.temperature || "Morno") === "Quente"
                            ? "bg-rose-500/10 text-rose-500 border-rose-500/20 shadow-[0_0_10px_rgba(244,63,94,0.2)]"
                            : (lead.temperature || "Morno") ===
                                "Frio"
                              ? "bg-cyan-500/10 text-cyan-400 border-cyan-400/20"
                              : "bg-amber-500/10 text-amber-500 border-amber-500/20"
                        }`}
                      >
                        {lead.temperature || "Morno"}
                      </Badge>
                    )}
                    <div className="flex flex-col gap-0.5 ml-2">
                      <div className="w-16 h-1 bg-white/5 relative overflow-hidden">
                        <div
                          className={`h-full transition-all ${lead.score > 70 ? "bg-emerald-500 shadow-[0_0_10px_#10b981]" : lead.score > 40 ? "bg-amber-500" : "bg-rose-500"}`}
                          style={{ width: `${lead.score || 0}%` }}
                        />
                      </div>
                      <span className="text-[10px] font-mono text-white/40">
                        {lead.score || 0}%_OP
                      </span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  {lead.phone ? (
                    <Badge className="bg-cyan-500/10 text-cyan-400 border border-cyan-400/20 rounded-none text-[8px] font-black font-mono">
                      {lead.phone}
                    </Badge>
                  ) : lead.analysisStatus === "ANALISANDO" ? (
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-pink-500 animate-pulse rounded-full shadow-[0_0_8px_#ec4899]" />
                      <span className="text-[8px] text-pink-500 font-black animate-pulse font-mono uppercase tracking-widest">
                        SCANNING_DATA...
                      </span>
                    </div>
                  ) : lead.email ? (
                    <Badge className="bg-pink-500/10 text-pink-400 border border-pink-500/20 rounded-none text-[8px] font-black font-mono">
                      {lead.email}
                    </Badge>
                  ) : (
                    <span className="text-[8px] text-cyan-900 font-black tracking-widest font-mono">
                      WAITING_ENRICHMENT
                    </span>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        openLeadDetails(lead);
                      }}
                      className="w-8 h-8 flex items-center justify-center border border-cyan-400/30 text-cyan-400 hover:bg-cyan-500 hover:text-black transition-all"
                      title="READ_DOSSIER"
                    >
                      <Activity className="w-3.5 h-3.5" />
                    </button>
                    {lead.mapsUrl && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(lead.mapsUrl, "_blank");
                        }}
                        className="w-8 h-8 flex items-center justify-center border border-yellow-500/30 text-yellow-500 hover:bg-yellow-500 hover:text-black transition-all"
                        title="MAPS_PROFILE"
                      >
                        <MapPin className="w-3.5 h-3.5" />
                      </button>
                    )}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        generateTacticalDossier(lead);
                      }}
                      className="w-8 h-8 flex items-center justify-center border border-pink-500/30 text-pink-500 hover:bg-pink-500 hover:text-white transition-all"
                      title="TÁTICO_DOSSIÊ"
                    >
                      <FileText className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedLeadIndex(idx);
                      }}
                      className="w-8 h-8 flex items-center justify-center border border-pink-400/30 text-pink-400 hover:bg-pink-500 hover:text-black transition-all"
                      title="MARK_TARGET"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        addToSwipe(lead);
                      }}
                      className="w-8 h-8 flex items-center justify-center border border-amber-400/30 text-amber-400 hover:bg-amber-500 hover:text-black transition-all"
                      title="SWIPE_FOR_CLONING"
                    >
                      <Layers className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        addToVault(lead);
                      }}
                      className="w-8 h-8 flex items-center justify-center border border-[#06b6d4]/30 text-[#06b6d4] hover:bg-[#06b6d4] hover:text-black transition-all"
                      title="SAVE_TO_VAULT"
                    >
                      <Archive className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteLead(lead);
                      }}
                      className="w-8 h-8 flex items-center justify-center border border-pink-600/30 text-pink-600 hover:bg-pink-600 hover:text-white transition-all"
                      title="PURGE_RECORD"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default LeadsTable;
