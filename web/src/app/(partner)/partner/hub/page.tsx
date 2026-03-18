import { Badge } from "@/components/ui/badge";
import { DollarSign, Rocket, PieChart, Users } from "lucide-react";

export default function PartnerHubPage() {
  return (
    <div className="p-8 space-y-8 animate-in fade-in duration-700">
      <header className="flex items-center justify-between border-b border-pink-500/20 pb-6">
        <div className="space-y-1">
          <Badge className="bg-pink-500 text-black font-black uppercase tracking-widest text-[10px]">AUTH_LEVEL: PARTNER_HUB</Badge>
          <h1 className="text-4xl font-black text-white italic uppercase tracking-tighter flex items-center gap-3">
            <Rocket className="w-8 h-8 text-pink-500 hacker-flicker" />
            PARTNER_NETWORK
          </h1>
        </div>
        <div className="flex gap-4">
           <div className="bg-black border border-pink-500/20 p-4 text-center min-w-[120px]">
              <div className="text-[10px] text-pink-500/50 uppercase font-black">ACCUMULATED_CREDIT</div>
              <div className="text-2xl font-black text-emerald-500">R$ 1.540,00</div>
           </div>
           <div className="bg-black border border-pink-500/20 p-4 text-center min-w-[120px]">
              <div className="text-[10px] text-cyan-500/50 uppercase font-black">REFERRAL_COUNT</div>
              <div className="text-2xl font-black text-white">42</div>
           </div>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
         {[
           { label: "REFERRAL_LINK", icon: Users, color: "text-cyan-400" },
           { label: "EARNINGS_REPORT", icon: DollarSign, color: "text-emerald-400" },
           { label: "MARKETING_KITS", icon: PieChart, color: "text-pink-400" }
         ].map((tool, i) => (
           <div key={i} className="bg-pink-950/10 border border-pink-500/10 p-8 hover:bg-pink-500/5 transition-all group cursor-pointer">
              <tool.icon className={`w-8 h-8 ${tool.color} mb-4 group-hover:scale-110 transition-transform`} />
              <div className="text-xs font-black text-white uppercase tracking-widest leading-none">{tool.label}</div>
           </div>
         ))}
      </div>
    </div>
  );
}
