import { Badge } from "@/components/ui/badge";
import { Globe, BarChart, Settings, MousePointerClick } from "lucide-react";

export default function ClientDashboardPage() {
  return (
    <div className="p-8 space-y-8 animate-in fade-in duration-700">
      <header className="flex items-center justify-between border-b border-emerald-500/20 pb-6">
        <div className="space-y-1">
          <Badge className="bg-emerald-500 text-black font-black uppercase tracking-widest text-[10px]">AUTH_LEVEL: CLIENT_HUD</Badge>
          <h1 className="text-4xl font-black text-white italic uppercase tracking-tighter flex items-center gap-3">
            <Globe className="w-8 h-8 text-emerald-500 hacker-flicker" />
            MY_DIGITAL_HUB
          </h1>
        </div>
        <div className="flex gap-4">
           <div className="bg-black border border-emerald-500/20 p-4 text-center min-w-[120px]">
              <div className="text-[10px] text-emerald-500/50 uppercase font-black">LEADS_CAPTURED</div>
              <div className="text-2xl font-black text-emerald-500">254</div>
           </div>
           <div className="bg-black border border-emerald-500/20 p-4 text-center min-w-[120px]">
              <div className="text-[10px] text-cyan-500/50 uppercase font-black">TOTAL_VISITS</div>
              <div className="text-2xl font-black text-white">4.2k</div>
           </div>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
         {[
           { label: "SITE_EDITOR", icon: Settings, color: "text-cyan-400" },
           { label: "VISIT_ANALYTICS", icon: BarChart, color: "text-emerald-400" },
           { label: "CLICK_TRACKING", icon: MousePointerClick, color: "text-pink-400" }
         ].map((tool, i) => (
           <div key={i} className="bg-emerald-950/10 border border-emerald-500/10 p-8 hover:bg-emerald-500/5 transition-all group cursor-pointer">
              <tool.icon className={`w-8 h-8 ${tool.color} mb-4 group-hover:scale-110 transition-transform`} />
              <div className="text-xs font-black text-white uppercase tracking-widest leading-none">{tool.label}</div>
              <p className="text-[10px] text-emerald-700/60 mt-4 uppercase">Sincronizado com seu subdomínio.</p>
           </div>
         ))}
      </div>
    </div>
  );
}
