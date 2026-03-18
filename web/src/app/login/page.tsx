"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Shield, Lock, User, Loader2, Globe, AlertCircle, Cpu, Activity } from "lucide-react";
import { login } from "./actions";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [bootSequence, setBootSequence] = useState<string[]>([]);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [showSplash, setShowSplash] = useState(true);
  const [encryptionLevel, setEncryptionLevel] = useState(0);

  // Initial Splash Sequence
  useEffect(() => {
    const sequence = [
      "INITIALIZING_SITEPROX_CORE...",
      "LOADING_PROTOCOL_V1.0...",
      "STATUS: SECURE_CONNECTION_ESTABLISHED",
      "HANDSHAKE_READY."
    ];
    
    let i = 0;
    const interval = setInterval(() => {
      if (i < sequence.length) {
        setBootSequence(prev => [...prev, sequence[i]]);
        i++;
      } else {
        clearInterval(interval);
        setTimeout(() => setShowSplash(false), 800);
      }
    }, 400);

    return () => clearInterval(interval);
  }, []);

  // Password encryption level simulation
  useEffect(() => {
    setEncryptionLevel(Math.min(password.length * 10, 100));
  }, [password]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setIsAuthenticating(true);
    setBootSequence([
      "AUTH_HANDSHAKE_INITIATED...",
      "DECRYPTING_CREDENTIALS...",
      "ESTABLISHING_SECURE_TUNNEL...",
      "VERIFYING_IDENTITY_NODE...",
    ]);

    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);

    // Short artificial delay for the UX feel
    await new Promise(r => setTimeout(r, 1500));

    const result = await login(formData);
    
    if (result?.error) {
      setErrorMsg(result.error);
      setIsAuthenticating(false);
    }
  };

  if (showSplash) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4 font-mono overflow-hidden">
        <div className="scanline opacity-20" />
        <div className="space-y-4 max-w-xs w-full text-left">
           {bootSequence.map((line, i) => (
             <div key={i} className="text-cyan-400 text-xs font-black uppercase tracking-widest animate-in fade-in slide-in-from-left-2 transition-all">
                {`> ${line}`}
             </div>
           ))}
           <div className="w-full h-1 bg-cyan-950 mt-4 overflow-hidden relative">
              <div className="absolute inset-0 bg-cyan-400 animate-infinite-loading -translate-x-full" />
           </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 cyber-grid flex items-center justify-center p-4 relative overflow-hidden font-mono">
      {/* Background Decor */}
      <div className="absolute inset-0 bg-linear-to-b from-transparent via-cyan-950/10 to-transparent pointer-events-none" />
      <div className="scanline opacity-20" />
      
      <div className="max-w-md w-full relative z-10 transition-all duration-700 animate-in fade-in zoom-in-95">
        
        {/* ACCESS TERMINAL HUD */}
        <div className="hud-panel p-px bg-linear-to-br from-cyan-500/20 via-transparent to-pink-500/20 shadow-[0_0_80px_rgba(0,0,0,0.9)]">
          
          {/* Laser Scanner Line */}
          <div className="laser-scanner" />

          <Card className="bg-slate-950/80 border-none rounded-none shadow-none backdrop-blur-xl relative overflow-hidden group">
            
            {/* Top Bar Decoration */}
            <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-cyan-400 to-transparent opacity-50" />
            
            <CardHeader className="space-y-4 pt-10 pb-4 relative">
              <div className="flex items-center justify-between">
                <Badge variant="outline" className="border-cyan-500/30 text-cyan-400 font-extrabold uppercase text-[9px] tracking-[0.2em] animate-pulse">
                  HANDSHAKE_NODE_v1.0
                </Badge>
                <Cpu className="w-4 h-4 text-cyan-500/50" />
              </div>
              
              <div className="space-y-2 text-center sm:text-left">
                <CardTitle className="text-5xl font-black text-white italic tracking-tighter uppercase glitch-text" data-text="SITEPROX">
                  SITEPROX
                </CardTitle>
                <CardDescription className="text-pink-500 text-[10px] font-black uppercase tracking-[0.4em] hacker-flicker">
                  PROTOCOLO_DO_FUTURO
                </CardDescription>
              </div>
            </CardHeader>

            <CardContent className="p-8 space-y-6">
              {isAuthenticating ? (
                <div className="space-y-6 py-10 bg-black/60 p-6 border border-cyan-500/20 hud-panel">
                    <div className="flex items-center gap-4 text-cyan-400 text-xs font-extrabold font-mono">
                        <Loader2 className="w-5 h-5 animate-spin" />
                        AWAITING_ENCRYPTION_KEY...
                    </div>
                    <div className="space-y-2">
                        {bootSequence.map((line, i) => (
                            <div key={i} className="text-emerald-500/80 text-[10px] font-mono leading-none animate-in slide-in-from-left-2 duration-300">
                            {`> ${line}`}
                            </div>
                        ))}
                    </div>
                    <Progress value={75} className="h-1 bg-emerald-950" />
                </div>
              ) : (
                <form onSubmit={handleLogin} className="space-y-6">
                  {errorMsg && (
                    <div className="bg-red-500/10 border border-red-500/40 p-3 flex items-center gap-3 text-red-500 text-[10px] uppercase font-black tracking-widest animate-in shake-in-1">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      {errorMsg}
                    </div>
                  )}

                  <div className="space-y-2">
                    <label className="text-cyan-500/60 text-[9px] font-black uppercase tracking-[2px] pl-1">TERMINAL_ID (EMAIL)</label>
                    <div className="relative group/input">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-cyan-500/30 group-focus-within/input:text-cyan-400 group-focus-within/input:scale-110 transition-all duration-300" />
                      <Input 
                        type="email"
                        placeholder="ADMIN@SITEPROX.NET"
                        className="bg-black/60 border-cyan-500/20 text-white pl-10 h-12 focus:border-cyan-400 focus:shadow-[0_0_15px_rgba(0,243,255,0.2)] focus:ring-0 rounded-none transition-all placeholder:text-slate-800 uppercase font-bold tracking-widest"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                        <label className="text-cyan-500/60 text-[9px] font-black uppercase tracking-[2px] pl-1">ACCESS_CODE (PASS)</label>
                        <span className="text-[8px] text-slate-600 font-bold uppercase">SECURE_LAYER: {encryptionLevel}%</span>
                    </div>
                    <div className="relative group/input">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-cyan-500/30 group-focus-within/input:text-cyan-400 group-focus-within/input:scale-110 transition-all duration-300" />
                      <Input 
                        type="password"
                        placeholder="••••••••"
                        className="bg-black/60 border-cyan-500/20 text-white pl-10 h-12 focus:border-cyan-400 focus:shadow-[0_0_15px_rgba(0,243,255,0.2)] focus:ring-0 rounded-none transition-all placeholder:text-slate-800"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                    <Progress value={encryptionLevel} className="h-0.5 bg-cyan-950" />
                  </div>

                  <div className="pt-4 space-y-4">
                    <Button 
                      type="submit" 
                      className="w-full bg-neon-cyan text-black font-black uppercase tracking-widest hover:bg-cyan-300 transition-all relative overflow-hidden group/btn flex items-center justify-center gap-2 h-14 rounded-none cyber-button-pulse"
                    >
                      <Shield className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                      AUTENTICAR_NA_REDE
                    </Button>

                    <div className="relative flex items-center justify-center">
                        <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-cyan-500/10"></span></div>
                        <span className="relative px-3 bg-slate-950 text-[8px] text-cyan-500/40 font-black uppercase tracking-[0.3em]">AUTH_VIA_EXTERNAL_NODE</span>
                    </div>

                    <Button 
                      variant="outline"
                      type="button"
                      className="w-full border-cyan-500/30 text-cyan-400 font-bold uppercase tracking-widest hover:bg-cyan-500/5 h-12 rounded-none flex items-center justify-center gap-3"
                    >
                        <Globe className="w-4 h-4" />
                        GOOGLE_OAUTH_SYSTEM
                    </Button>
                  </div>
                </form>
              )}
            </CardContent>

            <div className="p-4 bg-cyan-950/20 border-t border-cyan-400/20 flex items-center justify-between text-[8px] font-black text-white/40 tracking-[0.2em] uppercase">
                <div className="flex items-center gap-2">
                    <Activity className="w-3 h-3 text-cyan-400/60" />
                    SSL_TLS_v1.3_ACTIVE
                </div>
                <div className="text-pink-500/50">BUILD_6182_PRO_STABLE</div>
            </div>

            {/* Glowing Corner Accents */}
            <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-cyan-400" />
            <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-cyan-400" />
            <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-cyan-400" />
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-cyan-400" />
          </Card>
        </div>

        {/* Footer Stats Line */}
        <div className="mt-12 flex items-center justify-center gap-10 opacity-30 group-hover:opacity-60 transition-opacity">
            <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_#10b981]" />
                <span className="text-[9px] font-black text-emerald-500 uppercase tracking-widest">NET_UP</span>
            </div>
            <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-cyan-500 rounded-full shadow-[0_0_8px_#06b6d4]" />
                <span className="text-[9px] font-black text-cyan-500 uppercase tracking-widest">LATENCY_4MS</span>
            </div>
            <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-pink-500 rounded-full animate-ping shadow-[0_0_8px_#ec4899]" />
                <span className="text-[9px] font-black text-pink-500 uppercase tracking-widest">VPN_ENCRYPTED</span>
            </div>
        </div>

      </div>
    </div>
  );
}
