"use client";

import React from "react";
import { Activity } from "lucide-react";
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardContent 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { Lead } from "../../types";

interface RadarPanelProps {
  statusText: string;
  progress: number;
  nicho: string;
  quarantinedLeads: Lead[];
  leads: Lead[];
  cidade: string;
}

const RadarPanel: React.FC<RadarPanelProps> = ({
  statusText,
  progress,
  nicho,
  quarantinedLeads,
  leads,
  cidade,
}) => {
  return (
    <div className="xl:col-span-4 space-y-8">
      <Card className="bg-[#0a0a0a] border border-cyan-400/30 rounded-none shadow-[0_0_20px_rgba(0,243,255,0.1)] backdrop-blur-md relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-full h-px bg-cyan-400/50 animate-[scanline_4s_linear_infinite]"></div>
        <CardHeader className="border-b border-cyan-400/20 bg-cyan-950/10">
          <CardTitle className="font-mono text-[10px] font-black text-cyan-400 uppercase tracking-[0.3em] flex items-center gap-2">
            <Activity className="w-3 h-3 animate-pulse" />{" "}
            RADAR_OP_CONSOLE
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-8 space-y-6">
          <div className="space-y-3">
            <div className="flex justify-between text-[9px] font-black text-cyan-400 uppercase font-mono tracking-widest">
              <span className="animate-pulse">
                &gt; {statusText}
              </span>
              <span className="text-pink-500">{progress}%</span>
            </div>
            <div className="h-6 bg-black border border-cyan-400/30 p-1 relative overflow-hidden">
              <div className="absolute inset-0 bg-[repeating-linear-gradient(90deg,transparent,transparent_4px,rgba(0,243,255,0.1)_4px,rgba(0,243,255,0.1)_5px)]"></div>
              <div
                className="h-full bg-cyan-500 transition-all duration-500 shadow-[0_0_15px_#00f3ff]"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-cyan-950/20 p-4 border-l-4 border-pink-500">
              <p className="text-[8px] font-black text-cyan-400/50 uppercase mb-1 font-mono tracking-widest">
                LAST_TARGET_RECOGNITION
              </p>
              <p className="font-black text-cyan-400 uppercase tracking-tighter font-hacker text-xl leading-none">
                {nicho || "NODATA"}
              </p>
            </div>
            <div className="bg-rose-950/20 p-4 border-l-4 border-rose-500">
              <p className="text-[8px] font-black text-rose-400/50 uppercase mb-1 font-mono tracking-widest">
                QUARANTINED_TARGETS
              </p>
              <p className="font-black text-rose-400 uppercase tracking-tighter font-hacker text-xl leading-none">
                {quarantinedLeads.length}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {leads.length > 0 && (
        <Card className="bg-[#06b6d4] text-black border-none rounded-none -skew-x-2 transition-all">
          <CardHeader>
            <CardTitle className="font-outfit text-lg font-black italic uppercase">
              PITCH_RÁPIDO
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-xs font-bold leading-relaxed">
              Sugerimos focar no nicho de{" "}
              <span className="underline">{nicho}</span> na região
              de <span className="underline">{cidade}</span>. O
              score médio de oportunidade alto.
            </p>
            <Button className="w-full bg-black text-pink-500 border border-black hover:bg-black/80 font-mono font-black rounded-none transition-all uppercase text-[9px] h-11 tracking-[0.2em] shadow-[0_4px_0_rgba(0,0,0,0.3)] active:translate-y-1 active:shadow-none">
              START_HACK_PROSPECTION
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default RadarPanel;
