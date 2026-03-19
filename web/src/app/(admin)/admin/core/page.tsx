"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { Badge } from "@/components/ui/badge";
import { Shield, Settings, Users, Activity, Target, Zap, Layout } from "lucide-react";
import Link from "next/link";

export default function AdminCorePage() {
  const [nodeCount, setNodeCount] = useState<number | null>(null);
  const supabase = createClient();

  useEffect(() => {
    async function fetchMetrics() {
      const { count, error } = await supabase
        .from('site_projects')
        .select('*', { count: 'exact', head: true });

      if (!error) setNodeCount(count);
    }
    fetchMetrics();
  }, [supabase]);

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
           <div className="bg-black border border-cyan-500/20 p-4 text-center min-w-[120px] relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-8 h-8 bg-cyan-500/5 rotate-45 translate-x-4 -translate-y-4 border-b border-l border-cyan-500/20" />
              <div className="text-[10px] text-cyan-500/50 uppercase font-black tracking-widest mb-1">ACTIVE_NODES</div>
              <div className="text-3xl font-black text-white italic hacker-glow group-hover:text-cyan-400 transition-colors">
                 {nodeCount !== null ? nodeCount.toString().padStart(3, '0') : "---"}
              </div>
           </div>
           <div className="bg-black border border-cyan-500/20 p-4 text-center min-w-[120px] relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-8 h-8 bg-emerald-500/5 rotate-45 translate-x-4 -translate-y-4 border-b border-l border-emerald-500/20" />
              <div className="text-[10px] text-emerald-500/50 uppercase font-black tracking-widest mb-1">UPTIME_RELAY</div>
              <div className="text-3xl font-black text-white italic hacker-glow group-hover:text-emerald-400 transition-colors">99.9%</div>
           </div>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         {[
            { label: "USER_MANAGEMENT", icon: Users, color: "text-cyan-400", href: "/admin/nodes" },
            { label: "INVITE_GENERATOR", icon: Zap, color: "text-pink-400", href: "/admin/invites" },
            { label: "SYSTEM_RECORDS", icon: Activity, color: "text-emerald-400" },
            { label: "STITCH_TEMPLATES", icon: Layout, color: "text-red-400", href: "/admin/templates" },
            { label: "LEADS_SCANNER", icon: Target, color: "text-cyan-400", href: "/admin/leads" },
            { label: "SECURITY_PROTOCOLS", icon: Settings, color: "text-pink-400" },
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
