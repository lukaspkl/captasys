/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import { 
  Archive, 
  X, 
  Zap, 
  Globe, 
  MapPin 
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardContent, 
  CardFooter 
} from "@/components/ui/card";
import { Lead } from "../../types";

interface VaultViewProps {
  vaultLeads: Lead[];
  setVaultLeads: (leads: Lead[]) => void;
  removeFromVault: (lead: Lead) => void;
  openLeadDetails: (lead: Lead) => void;
}

const VaultView: React.FC<VaultViewProps> = ({
  vaultLeads,
  setVaultLeads,
  removeFromVault,
  openLeadDetails,
}) => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
      <div className="flex items-center justify-between border-b border-cyan-400/20 pb-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-cyan-500/10 border border-cyan-400 flex items-center justify-center">
            <Archive className="w-6 h-6 text-cyan-400" />
          </div>
          <div>
            <h3 className="font-hacker text-3xl font-black text-cyan-400 uppercase tracking-widest hacker-glow">
              VAULT_LEADS_CACHED
            </h3>
            <p className="text-[10px] text-cyan-700 font-mono font-black uppercase tracking-widest">
              REGISTROS_PROTEGIDOS_EM_STORAGE_LOCAL
            </p>
          </div>
        </div>
        <Button
          variant="ghost"
          className="text-[9px] text-pink-500 font-black hover:text-white font-mono tracking-widest"
          onClick={() => {
            localStorage.removeItem("capta_leads_vault_cache");
            setVaultLeads([]);
          }}
        >
          WIPE_VAULT_DEEP_MEMORY
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {vaultLeads.map((lead, idx) => (
          <Card
            key={idx}
            className="bg-[#0a0a0a] border border-cyan-400/20 rounded-none group hover:border-cyan-400 transition-all relative overflow-hidden h-full flex flex-col"
          >
            <div className="absolute top-0 right-0 p-2 opacity-20 group-hover:opacity-100 transition-opacity">
              <button
                onClick={() => removeFromVault(lead)}
                className="text-pink-500 hover:text-white transition-colors"
                title="REMOVE_FROM_VAULT"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <CardHeader className="border-b border-cyan-400/5 bg-cyan-950/5">
              <CardTitle className="text-xs font-black text-cyan-400 uppercase font-mono truncate">
                {lead.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 flex-1">
              <div className="flex items-center gap-3 mb-4">
                <Badge className="bg-cyan-500/10 text-cyan-400 border border-cyan-400/20 rounded-none text-[8px] font-black">
                  {lead.temperature || "Morno"}
                </Badge>
                <span className="text-[10px] font-black text-white/40 font-mono tracking-tighter">
                  SCORE::{lead.score}%
                </span>
              </div>
              <p className="text-[10px] text-cyan-900 font-mono leading-relaxed line-clamp-3 mb-4 italic uppercase">
                &quot;{lead.snippet}&quot;
              </p>

              <div className="space-y-2 pt-4 border-t border-cyan-400/10">
                {lead.phone && (
                  <div className="flex items-center gap-2">
                    <Zap className="w-3 h-3 text-[#06b6d4]" />
                    <span className="text-[10px] font-black text-cyan-400 font-mono">
                      {lead.phone}
                    </span>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <Globe className="w-3 h-3 text-slate-700" />
                  <span className="text-[10px] font-black text-slate-600 font-mono truncate max-w-[200px]">
                    {lead.url || "—"}
                  </span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="bg-black/40 border-t border-cyan-400/5 p-4 flex gap-2">
              <Button
                onClick={() => openLeadDetails(lead)}
                className="flex-1 bg-cyan-500 text-black hover:bg-pink-500 font-mono font-black text-[9px] rounded-none h-10 tracking-widest"
              >
                OPEN_DOSSIER
              </Button>
              {lead.mapsUrl && (
                <Button
                  onClick={() => window.open(lead.mapsUrl, "_blank")}
                  className="w-10 h-10 bg-transparent border border-white/10 text-white hover:bg-white/10 p-0 flex items-center justify-center rounded-none"
                >
                  <MapPin className="w-4 h-4" />
                </Button>
              )}
            </CardFooter>
          </Card>
        ))}
        {vaultLeads.length === 0 && (
          <div className="col-span-full h-[40vh] border-2 border-dashed border-cyan-400/10 flex flex-col items-center justify-center">
            <Archive className="w-12 h-12 text-cyan-950 mb-4" />
            <p className="font-hacker text-xl font-black text-cyan-900 uppercase tracking-widest">
              VAULT_EMPTY
            </p>
            <p className="text-[10px] text-cyan-950 font-black mt-2 uppercase tracking-tighter">
              Salve leads promissores para visualiz&aacute;-los aqui
              posteriormente.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default VaultView;
