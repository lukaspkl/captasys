/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import { 
  Globe, 
  X, 
  Activity, 
  LayoutDashboard, 
  Target 
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface DashboardHeaderProps {
  leads: any[];
  filterMode: string;
  setFilterMode: (val: string) => void;
  isSearching: boolean;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  leads,
  filterMode,
  setFilterMode,
  isSearching,
}) => {
  return (
    <>
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div className="space-y-4">
          <h2 className="font-hacker text-5xl font-black text-cyan-400 uppercase tracking-tighter hacker-glow animate-[text-flicker_3s_infinite]">
            TERMINAL_SCANNER
          </h2>
          <div className="flex items-center gap-4">
            <Badge className="bg-pink-500 text-black font-black font-mono rounded-none px-4 py-1 text-[9px] tracking-widest uppercase shadow-[0_0_10px_rgba(255,0,255,0.4)]">
              LOCAL_HACK_ENGINE_V1.9
            </Badge>
            <Badge className="bg-transparent text-cyan-400 font-black font-mono rounded-none px-4 py-1 text-[9px] tracking-widest border border-cyan-400/40 uppercase shadow-[inset_0_0_5px_rgba(0,243,255,0.2)]">
              [{leads.length}] SECTORS_IN_CACHE
            </Badge>
          </div>
        </div>

        <div className="flex flex-wrap gap-1 bg-cyan-950/20 p-1 border border-cyan-400/20">
          {[
            { id: "all", label: "SYS_ALL", icon: Globe },
            { id: "no-site", label: "MISSING_WEB", icon: X },
            { id: "no-pixel", label: "NO_TRACKING", icon: Activity },
            {
              id: "no-mobile",
              label: "LEGACY_UI",
              icon: LayoutDashboard,
            },
            {
              id: "low-rating",
              label: "LOW_REPUTATION",
              icon: Target,
            },
          ].map((f) => ( f.id === filterMode ? (
            <button
              key={f.id}
              onClick={() => setFilterMode(f.id)}
              className="h-9 px-4 text-[8px] font-black tracking-widest transition-all uppercase font-mono flex items-center gap-2 bg-cyan-500 text-black shadow-[0_0_10px_rgba(0,243,255,0.4)]"
            >
              <f.icon className="w-3 h-3" />
              {f.label}
            </button>
          ) : (
            <button
              key={f.id}
              onClick={() => setFilterMode(f.id)}
              className="h-9 px-4 text-[8px] font-black tracking-widest transition-all uppercase font-mono flex items-center gap-2 text-cyan-400/50 hover:text-cyan-400 hover:bg-cyan-500/5"
            >
              <f.icon className="w-3 h-3" />
              {f.label}
            </button>
          )))}
        </div>
      </div>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          {
            label: "MEMORY_CACHE_LEADS",
            value: leads.length,
            icon: Target,
            suffix: "OBJ",
          },
          {
            label: "BUFFER_SYSTRON_SPEED",
            value: isSearching ? "98.4" : "0.0",
            icon: Activity,
            suffix: "MHZ",
          },
          {
            label: "ENCRYPTED_ZONES",
            value: leads.length > 0 ? "12" : "0",
            icon: Globe,
            suffix: "LOC",
          },
        ].map((stat, i) => (
          <div
            key={i}
            className="p-8 bg-[#0a0a0a] hacker-border group hover:bg-cyan-500/5 transition-all cursor-crosshair relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-16 h-16 bg-cyan-500/5 rotate-45 translate-x-8 -translate-y-8 border-b border-l border-cyan-400 opacity-20"></div>
            <p className="text-[9px] font-black tracking-[0.3em] text-cyan-400/40 uppercase mb-4 flex items-center gap-2 font-mono">
              <span className="w-1 h-1 bg-pink-500"></span>{" "}
              {stat.label}
            </p>
            <div className="flex items-baseline gap-2">
              <h3 className="font-hacker text-6xl font-black text-cyan-400 tracking-tighter hacker-glow">
                {stat.value}
              </h3>
              <span className="text-[10px] font-black text-pink-500 uppercase tracking-widest font-mono">
                {stat.suffix}
              </span>
            </div>
          </div>
        ))}
      </section>
    </>
  );
};

export default DashboardHeader;
