"use client";

import React from "react";
import { 
  Library, 
  Globe, 
  Trash2, 
  Loader2, 
  Check, 
  Zap, 
  Copy 
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent 
} from "@/components/ui/card";
import { Lead } from "../../types";

interface SwipeViewProps {
  swipeLeads: Lead[];
  removeFromSwipe: (lead: Lead) => void;
  stitchStatuses: Record<string, string>;
  generateCloningPrompt: (lead: Lead) => void;
  openStitchConfig: (lead: Lead) => void;
}

const SwipeView: React.FC<SwipeViewProps> = ({
  swipeLeads,
  removeFromSwipe,
  stitchStatuses,
  generateCloningPrompt,
  openStitchConfig,
}) => {
  return (
    <div className="px-6 pb-20 space-y-8 animate-in fade-in slide-in-from-bottom-4">
      <div className="flex justify-between items-end border-b border-amber-500/20 pb-6">
        <div>
          <h2 className="text-3xl font-black text-white italic tracking-tighter uppercase font-hacker">
            SWIPE_FILE // <span className="text-amber-500">BIBLIOTECA_DESIGN</span>
          </h2>
          <p className="text-[10px] text-slate-500 font-mono tracking-widest mt-1 uppercase">
            Leads frios com interface de alta qualidade para engenharia reversa.
          </p>
        </div>
        <Badge className="bg-amber-500 text-black font-black px-4 py-1 rounded-none border-none">
          {swipeLeads.length} REFERÊNCIAS_SALVAS
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {swipeLeads.map((lead, i) => (
          <Card key={i} className="bg-[#0a0a0a] border border-amber-500/20 rounded-none overflow-hidden group hover:border-amber-500/50 transition-all">
            <div className="h-32 bg-amber-500/5 relative flex items-center justify-center overflow-hidden border-b border-white/5">
              <Globe className="w-12 h-12 text-amber-500/20 group-hover:scale-110 group-hover:text-amber-500/40 transition-all duration-700" />
              <div className="absolute top-2 right-2 flex gap-1">
                <Badge className="bg-black/60 text-amber-500 text-[8px] font-black border border-amber-500/30 rounded-none">UI_REFERENCE</Badge>
              </div>
            </div>
            <CardContent className="p-6 space-y-4">
              <div>
                <h4 className="text-sm font-black text-white uppercase truncate">{lead.title}</h4>
                <p className="text-[10px] text-slate-500 font-mono truncate">{lead.url}</p>
              </div>
              <div className="flex gap-2">
                <Button 
                  onClick={() => window.open(lead.url, '_blank')}
                  className="flex-1 h-10 bg-white/5 border border-white/10 text-white font-black text-[9px] uppercase tracking-widest hover:bg-white hover:text-black transition-all"
                >
                  VER_SITE
                </Button>
                <Button 
                  onClick={() => removeFromSwipe(lead)}
                  className="w-10 h-10 bg-transparent border border-rose-500/20 text-rose-500 hover:bg-rose-500 hover:text-white transition-all p-0 flex items-center justify-center"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </Button>
              </div>
              <div className="space-y-2">
                {stitchStatuses[lead.url || ""] === 'generating' ? (
                  <Button className="w-full h-11 bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 font-black text-[9px] uppercase rounded-none cursor-wait">
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" /> SINTETIZANDO_INTERFACE...
                  </Button>
                ) : stitchStatuses[lead.url || ""] === 'completed' ? (
                  <div className="space-y-2 animate-in fade-in zoom-in-95">
                     <Button className="w-full h-11 bg-emerald-500 text-black font-black text-[9px] uppercase tracking-tighter rounded-none shadow-[0_0_20px_rgba(16,185,129,0.2)]">
                        <Check className="w-3.5 h-3.5 mr-2" /> TEMPLATE_PRONTO_NO_CORE
                     </Button>
                     <div className="flex gap-2">
                        <Button 
                          onClick={() => window.open('/admin/studio', '_blank')}
                          className="flex-1 h-9 bg-white/5 border border-white/10 text-white font-black text-[8px] uppercase tracking-widest hover:bg-white hover:text-black transition-all"
                        >
                          <Zap className="w-3 h-3 mr-1.5" /> ABRIR_NO_STUDIO
                        </Button>
                        <Button 
                          onClick={() => window.open('/admin/templates', '_blank')}
                          className="flex-1 h-9 bg-white/5 border border-white/10 text-white font-black text-[8px] uppercase tracking-widest hover:bg-white hover:text-black transition-all"
                        >
                          <Library className="w-3 h-3 mr-1.5" /> BIBLIOTECA
                        </Button>
                     </div>
                  </div>
                ) : (
                  <>
                    <Button 
                      onClick={() => generateCloningPrompt(lead)}
                      className="w-full h-11 bg-amber-500/10 border border-amber-500/20 text-amber-500 font-black text-[9px] uppercase tracking-tighter hover:bg-amber-500 hover:text-black transition-all"
                    >
                      <Copy className="w-3 h-3 mr-2" /> COPIAR_PROMPT (BACKUP)
                    </Button>
                    <Button 
                      onClick={() => openStitchConfig(lead)}
                      className={`w-full h-11 ${stitchStatuses[lead.url || ""] === 'error' ? 'bg-rose-500' : 'bg-cyan-500'} text-black font-black text-[9px] uppercase tracking-tighter hover:bg-white transition-all shadow-lg shadow-cyan-500/10`}
                    >
                      <Zap className="w-3 h-3 mr-2" /> 
                      {stitchStatuses[lead.url || ""] === 'error' ? 'RE-TENTAR_AUTO_BUILD' : 'AUTO_STITCH_BUILD (FÁBRICA)'}
                    </Button>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
        {swipeLeads.length === 0 && (
          <div className="col-span-full py-32 border-2 border-dashed border-white/5 flex flex-col items-center justify-center text-slate-700">
            <Library className="w-12 h-12 mb-4 opacity-20" />
            <p className="text-[10px] font-black uppercase tracking-[0.4em]">Swipe_File_Vazio</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SwipeView;
