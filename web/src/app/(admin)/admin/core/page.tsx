"use client";

import { Badge } from "@/components/ui/badge";
import { Shield, Settings, Users, Activity, Target, Zap } from "lucide-react";
import Link from "next/link";

export default function AdminCorePage() {
  return (
    <div className="p-8 space-y-8 animate-in fade-in duration-700">
      <div className="bg-red-950/20 border-y border-red-500/30 p-2 text-center overflow-hidden relative">
         <div className="absolute inset-0 bg-red-500/5 animate-pulse" />
         <span className="text-[10px] font-black text-red-500 uppercase tracking-[0.8em] hacker-flicker">
            WARNING: ROOT_ACCESS_DETECTED. PROTOCOL_OVERRIDE_ACTIVE.
         </span>
      </div>

      <header className="flex items-center justify-between border-b border-cyan-500/20 pb-6">
        <div className="space-y-1">
          <Badge className="bg-red-500 text-black font-black uppercase tracking-widest text-[10px]">AUTH_LEVEL: ADMIN_CORE</Badge>
          <h1 className="text-4xl font-black text-white italic uppercase tracking-tighter flex items-center gap-3">
            <Shield className="w-8 h-8 text-red-500 hacker-flicker" />
            CENTRAL_CONTROL
          </h1>
        </div>
        <div className="flex gap-4">
           <div className="bg-black border border-cyan-500/20 p-4 text-center min-w-[120px]">
              <div className="text-[10px] text-cyan-500/50 uppercase font-black">ACTIVE_NODES</div>
              <div className="text-2xl font-black text-white">128</div>
           </div>
           <div className="bg-black border border-cyan-500/20 p-4 text-center min-w-[120px]">
              <div className="text-[10px] text-emerald-500/50 uppercase font-black">UPTIME_RELAY</div>
              <div className="text-2xl font-black text-white">99.9%</div>
           </div>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         {[
            { label: "USER_MANAGEMENT", icon: Users, color: "text-cyan-400", href: "/admin/nodes" },
            { label: "INVITE_GENERATOR", icon: Zap, color: "text-pink-400", href: "/admin/invites" },
            { label: "SYSTEM_RECORDS", icon: Activity, color: "text-emerald-400" },
            { label: "SECURITY_PROTOCOLS", icon: Settings, color: "text-pink-400" },
            { label: "LEADS_SCANNER", icon: Target, color: "text-cyan-400", href: "/admin/leads" }
          ].map((tool, i) => (
            <div key={i} className="group transition-all">
                {tool.href ? (
                  <Link href={tool.href} className="block bg-cyan-950/10 border border-cyan-500/10 p-8 hover:bg-cyan-500/5 transition-all cursor-pointer h-full">
                     <tool.icon className={`w-8 h-8 ${tool.color} mb-4 group-hover:scale-110 transition-transform`} />
                     <div className="text-xs font-black text-white uppercase tracking-widest leading-none">{tool.label}</div>
                     <p className="text-[10px] text-slate-500 mt-4 uppercase">Acesso concedido apenas a operadores Nível 1.</p>
                  </Link>
                ) : (
                  <div className="bg-cyan-950/10 border border-cyan-500/10 p-8 opacity-40 cursor-not-allowed h-full">
                     <tool.icon className={`w-8 h-8 ${tool.color} mb-4`} />
                     <div className="text-xs font-black text-slate-500 uppercase tracking-widest leading-none">{tool.label}</div>
                     <p className="text-[10px] text-slate-700 mt-4 uppercase">Protocolo pendente de ativação.</p>
                  </div>
                )}
             </div>
           ))}
      </div>
    </div>
  );
}
