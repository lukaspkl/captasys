"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Loader2, Cpu, Activity, CheckCircle2 } from "lucide-react";
import { register } from "./actions";
import Link from "next/link";

export default function RegisterPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [mode, setMode] = useState<"CLIENT" | "PARTNER">("CLIENT");
  const [inviteCode, setInviteCode] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [bootSequence, setBootSequence] = useState<string[]>([]);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [encryptionLevel, setEncryptionLevel] = useState(0);

  useEffect(() => {
    setEncryptionLevel(Math.min(password.length * 10, 100));
  }, [password]);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (password !== confirmPassword) {
      setErrorMsg("AS_CHAVES_DE_ACESSO_NAO_CONFEREM_ERROR");
      return;
    }

    if (mode === "PARTNER" && !inviteCode.trim()) {
      setErrorMsg("PROTOCOLO_DE_CONVITE_REQUERIDO_PARA_PARCEIROS");
      return;
    }

    setIsRegistering(true);
    setBootSequence([
      "SCANNING_IDENTITY_PROTOCOL...",
      "VERIFYING_ACCESS_CLEARANCE...",
      "ALLOCATING_CLOUD_RESOURCES...",
      "SYNCING_WITH_SITEPROX_CORE...",
    ]);

    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);
    formData.append('fullName', fullName);
    formData.append('role', mode);
    formData.append('inviteCode', inviteCode);

    await new Promise(r => setTimeout(r, 1500));

    const result = await register(formData);
    
    if (result?.error) {
      setErrorMsg(result.error);
      setIsRegistering(false);
    } else {
      setSuccess(true);
      setIsRegistering(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 font-mono relative overflow-hidden">
        <div className="scanline opacity-20" />
        <div className="hud-panel p-8 max-w-md w-full border-emerald-500/30 text-center space-y-6 bg-slate-900/40 backdrop-blur-xl">
           <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto animate-pulse" />
           <h2 className="text-2xl font-black text-white uppercase tracking-tighter italic">REGISTRO_CONCLUÍDO</h2>
           <p className="text-xs text-cyan-400 font-bold leading-relaxed uppercase tracking-widest">
             HANDSHAKE_ESTABELECIDO. <br />
             Seu novo nó na rede SiteProx foi provisionado com sucesso.
           </p>
           <Link 
            href="/login" 
            className="flex items-center justify-center w-full bg-emerald-500 hover:bg-emerald-400 text-black font-black uppercase tracking-widest h-12 rounded-none transition-all hover:scale-[1.02]"
           >
              INICIAR_SESSÃO_HUB
           </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 cyber-grid flex items-center justify-center p-4 relative overflow-hidden font-mono">
      <div className="absolute inset-0 bg-linear-to-b from-transparent via-cyan-950/20 to-transparent pointer-events-none" />
      <div className="scanline opacity-20" />
      
      <div className="max-w-md w-full relative z-10 animate-in fade-in zoom-in-95 duration-700">
        <div className="hud-panel p-px bg-linear-to-br from-cyan-500/40 via-transparent to-pink-500/40 shadow-[0_0_100px_rgba(0,0,0,0.95)]">
          <div className="laser-scanner" />
          <Card className="bg-slate-950/90 border-none rounded-none shadow-none backdrop-blur-3xl relative overflow-hidden">
            <CardHeader className="space-y-6 pt-12 pb-6 px-10">
              <div className="flex items-center justify-between">
                <Badge variant="outline" className="border-cyan-500/30 text-cyan-400 font-extrabold uppercase text-[9px] tracking-[0.3em] bg-cyan-950/20 px-3 py-1">
                   DEPLOY_NEW_NODE
                </Badge>
                <Cpu className="w-4 h-4 text-pink-500" />
              </div>
              
              <div className="space-y-2">
                <CardTitle className="text-5xl font-black text-white italic tracking-tighter uppercase leading-none">JOIN_REDE</CardTitle>
                <div className="h-1 w-20 bg-pink-500" />
              </div>

              {/* MODE SWITCHER */}
              <div className="flex bg-black/40 border border-white/5 p-1 rounded-none relative overflow-hidden mt-6 shadow-inner">
                 <div className={`absolute top-0 bottom-0 w-1/2 bg-cyan-500/10 border-x border-cyan-400/30 transition-all duration-500 ease-out ${mode === 'PARTNER' ? 'translate-x-full border-pink-500/30 bg-pink-500/10' : 'translate-x-0'}`} />
                 <button 
                  type="button"
                  onClick={() => setMode('CLIENT')}
                  className={`flex-1 py-3 text-[10px] font-black uppercase tracking-[0.3em] relative z-10 transition-colors ${mode === 'CLIENT' ? 'text-cyan-400 shadow-[0_0_10px_rgba(0,243,255,0.2)]' : 'text-slate-600 hover:text-slate-400'}`}
                 >
                    CLIENT_HUB
                 </button>
                 <button 
                  type="button"
                  onClick={() => setMode('PARTNER')}
                  className={`flex-1 py-3 text-[10px] font-black uppercase tracking-[0.3em] relative z-10 transition-colors ${mode === 'PARTNER' ? 'text-pink-500 shadow-[0_0_10px_rgba(255,0,255,0.2)]' : 'text-slate-600 hover:text-slate-400'}`}
                 >
                    PARTNER_CORE
                 </button>
              </div>
            </CardHeader>

            <CardContent className="px-10 pb-10 space-y-6">
              {isRegistering ? (
                <div className="space-y-8 py-14 bg-black/40 p-8 border border-white/5">
                    <div className="flex flex-col items-center gap-4 text-cyan-400">
                        <Loader2 className="w-10 h-10 animate-spin text-pink-500" />
                        <span className="text-[10px] font-black uppercase tracking-[0.4em] animate-pulse">TRANSMISSAO_DADOS_PROG...</span>
                    </div>
                    <div className="space-y-3 font-mono border-l-2 border-cyan-500/20 pl-4 py-2">
                        {bootSequence.map((line, i) => (
                            <div key={i} className="text-cyan-500/70 text-[9px] font-black leading-none animate-in slide-in-from-left-4 duration-500">
                            {`> ${line}`}
                            </div>
                        ))}
                    </div>
                </div>
              ) : (
                <form onSubmit={handleRegister} className="space-y-6">
                  {errorMsg && (
                    <div className="bg-red-500/5 border-l-4 border-red-500 p-4 text-red-500 text-[9px] uppercase font-black tracking-widest animate-in shake-in-1">
                      {errorMsg}
                    </div>
                  )}

                  <div className="space-y-2">
                    <label className="text-white/30 text-[9px] font-black uppercase tracking-[3px] pl-1">NAME_PROTOCOL</label>
                    <Input 
                      placeholder="NOME_COMPLETO"
                      className="bg-black/60 border-white/10 text-white h-12 focus:border-cyan-400 focus:ring-0 rounded-none transition-all placeholder:text-slate-800 uppercase font-black tracking-widest"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-white/30 text-[9px] font-black uppercase tracking-[3px] pl-1">NET_IDENTIFIER (EMAIL)</label>
                    <Input 
                      type="email"
                      placeholder="ID@REDE_SITEPROX.NET"
                      className="bg-black/60 border-white/10 text-white h-12 focus:border-cyan-400 focus:ring-0 rounded-none transition-all placeholder:text-slate-800 uppercase font-black tracking-widest"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-white/30 text-[9px] font-black uppercase tracking-[3px] pl-1">ENCRYPTION_KEY (PASS)</label>
                    <Input 
                      type="password"
                      placeholder="••••••••"
                      className="bg-black/60 border-white/10 text-white h-12 focus:border-cyan-400 focus:ring-0 rounded-none transition-all placeholder:text-slate-800"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <Progress value={encryptionLevel} className="h-1 bg-white/5" />
                  </div>

                  <div className="space-y-2">
                    <label className="text-white/30 text-[9px] font-black uppercase tracking-[3px] pl-1">CONFIRM_SYNC</label>
                    <Input 
                      type="password"
                      placeholder="••••••••"
                      className="bg-black/60 border-white/10 text-white h-12 focus:border-cyan-400 focus:ring-0 rounded-none transition-all placeholder:text-slate-800"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                  </div>

                  {/* INVITE CODE - CONDITIONAL */}
                  {mode === 'PARTNER' && (
                    <div className="space-y-2 animate-in slide-in-from-top-4 duration-500 bg-pink-500/5 p-4 border border-pink-500/20">
                      <label className="text-pink-500/80 text-[10px] font-black uppercase tracking-[3px] flex items-center gap-2">
                        <Activity className="w-3 h-3 animate-pulse" /> PROTOCOL_ACCESS_CODE
                      </label>
                      <Input 
                        placeholder="SPROX-XXXX-XXXX"
                        className="bg-black/60 border-pink-500/40 text-pink-400 h-12 focus:border-pink-500 focus:ring-0 rounded-none transition-all placeholder:text-pink-900 uppercase font-black tracking-[4px]"
                        value={inviteCode}
                        onChange={(e) => setInviteCode(e.target.value)}
                        required
                      />
                      <p className="text-[8px] text-pink-500/50 uppercase font-bold tracking-widest pl-1 mt-2 flex items-center gap-1">
                        * OBRIGATÓRIO PARA AUTORIZAÇÃO DE PARCEIRO NÍVEL 1
                      </p>
                    </div>
                  )}

                  <div className="pt-6 space-y-6">
                    <Button 
                      type="submit" 
                      className={`w-full font-black uppercase tracking-[0.4em] transition-all h-16 rounded-none cyber-button active:scale-95 shadow-[0_5px_0_rgba(0,0,0,0.4)] ${mode === 'PARTNER' ? 'bg-pink-600 hover:bg-pink-500 text-white shadow-pink-900/40' : 'bg-cyan-500 hover:bg-cyan-400 text-black shadow-cyan-900/40'}`}
                    >
                      {mode === 'CLIENT' ? 'INICIAR_CONTA_CLIENTE' : 'ATIVAR_PROTOCOLO_PARCEIRO'}
                    </Button>
                    <p className="text-center text-[9px] text-slate-600 font-bold uppercase tracking-widest">
                       NAO_PODE_ESPERAR? <Link href="/login" className="text-cyan-400 hover:underline">VOLTAR_AO_LOGIN</Link>
                    </p>
                  </div>
                </form>
              )}
            </CardContent>

            <div className="p-4 bg-cyan-950/20 border-t border-cyan-400/20 flex items-center justify-between text-[8px] font-black text-white/40 tracking-[0.2em] uppercase">
                <div className="flex items-center gap-2">
                    <Activity className="w-3 h-3 text-cyan-400/60" />
                    NODE_ENCRYPTION_ACTIVE
                </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
