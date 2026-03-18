import { Shield, Zap, Globe, Lock } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-dark-bg flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* HUD OVERLAY */}
      <div className="fixed inset-0 pointer-events-none opacity-5 cyber-grid"></div>
      <div className="scanline"></div>

      <div className="max-w-4xl w-full space-y-12 text-center relative z-10 transition-all">
        <div className="space-y-4">
          <Badge className="bg-cyan-500 text-black font-black uppercase tracking-[0.4em] text-[10px] rounded-none py-1 px-4">
            STATUS: SECURE_CONNECTION_ESTABLISHED
          </Badge>
          <h1 className="text-6xl md:text-8xl font-black text-white italic uppercase tracking-tighter leading-none hacker-glow animate-[text-flicker_3s_infinite]">
             SITEPROX<span className="text-pink-500 font-hacker text-4xl">_CORE</span>
          </h1>
          <p className="text-cyan-400 font-mono text-sm uppercase tracking-widest max-w-2xl mx-auto">
            The next generation of high-conversion digital presence. 
            Automated lead capturing, instant site generation, and 90s-encrypted data relays.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-12">
           {[
             { label: "AUTO_SCAN", icon: Zap, color: "text-amber-400" },
             { label: "SECURE_VAULT", icon: Lock, color: "text-emerald-400" },
             { label: "GLOBAL_RELAY", icon: Globe, color: "text-cyan-400" }
           ].map((item, i) => (
             <div key={i} className="bg-cyan-950/10 border border-cyan-500/10 p-6 backdrop-blur-sm group hover:border-cyan-500/30 transition-all">
                <item.icon className={`w-8 h-8 ${item.color} mx-auto mb-4 group-hover:scale-110 transition-transform`} />
                <div className="text-[10px] font-black text-white uppercase tracking-widest leading-none">{item.label}</div>
             </div>
           ))}
        </div>

        <div className="flex flex-col md:flex-row gap-6 justify-center">
           <Link href="/login" className="px-12 py-4 bg-cyan-500 text-black font-black uppercase tracking-widest hover:bg-pink-500 transition-all shadow-[0_0_20px_rgba(0,243,255,0.4)]">
              INITIALIZE_HANDSHAKE
           </Link>
           <Link href="/register" className="px-12 py-4 border border-cyan-500 text-cyan-400 font-black uppercase tracking-widest hover:bg-cyan-500/10 transition-all">
              JOIN_THE_NETWORK
           </Link>
        </div>

        <div className="pt-12 flex flex-col items-center gap-2">
           <Shield className="w-5 h-5 text-red-500 hacker-flicker" />
           <span className="text-[9px] text-slate-700 font-mono uppercase tracking-[0.6em]">
              ENCRYPTION_LAYER_ACTIVE_V1.0
           </span>
        </div>
      </div>
    </div>
  );
}
