"use client";

import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Zap, Plus, Trash2, ShieldAlert, Activity, ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";

interface Invite {
  id: string;
  code: string;
  max_uses: number;
  uses: number;
  is_active: boolean;
  created_at: string;
}

export default function InviteGeneratorPage() {
  const [invites, setInvites] = useState<Invite[]>([]);
  const [loading, setLoading] = useState(true);
  const [newMaxUses, setNewMaxUses] = useState(1);
  const [statusMsg, setStatusMsg] = useState("");

  const supabase = createClient();

  useEffect(() => {
    let mounted = true;
    const fetchInvites = async () => {
      const { data, error } = await supabase
        .from('invites')
        .select('*')
        .order('created_at', { ascending: false });

      if (mounted) {
        if (!error) setInvites(data || []);
        setLoading(false);
      }
    };
    fetchInvites();
    return () => { mounted = false; };
  }, [supabase]);

  const generateInvite = async () => {
    const code = `SPROX-${Math.random().toString(36).substring(2, 6).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
    
    setStatusMsg("GENERATION_PROTOCOL...");
    const { error } = await supabase.from('invites').insert({
      code,
      max_uses: newMaxUses,
      is_active: true
    });

    if (error) {
      console.error('Supabase Insert Error:', error);
      setStatusMsg(`ERRO: ${error.message || 'FALHA_NA_VAL_PROTOCOLO'}`);
    } else {
      setStatusMsg("PROTOCOLO_GERADO_COM_SUCESSO");
      // Trigger a re-fetch manually or just add to list
      const { data } = await supabase.from('invites').select('*').order('created_at', { ascending: false });
      if (data) setInvites(data);
    }
    setTimeout(() => setStatusMsg(""), 3000);
  };

  const deleteInvite = async (id: string) => {
    const { error } = await supabase.from('invites').delete().eq('id', id);
    if (!error) {
        setInvites(prev => prev.filter(i => i.id !== id));
    }
  };

  const toggleStatus = async (invite: Invite) => {
    const { error } = await supabase.from('invites').update({ is_active: !invite.is_active }).eq('id', invite.id);
    if (!error) {
        setInvites(prev => prev.map(i => i.id === invite.id ? { ...i, is_active: !i.is_active } : i));
    }
  };

  return (
    <div className="p-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 font-mono">
      <header className="flex items-center justify-between border-b border-pink-500/20 pb-6">
        <div className="space-y-1">
          <Link href="/admin/core" className="text-[10px] text-slate-500 hover:text-pink-400 flex items-center gap-1 uppercase font-black transition-colors mb-2">
            <ArrowLeft className="w-3 h-3" /> VOLTAR_AO_HUB
          </Link>
          <h1 className="text-4xl font-black text-white italic uppercase tracking-tighter flex items-center gap-3">
            <Zap className="w-8 h-8 text-pink-500 animate-pulse" />
            INVITE_GENERATOR
          </h1>
        </div>
        <Badge className="bg-pink-500 text-black font-black uppercase tracking-widest text-[10px] h-fit">LEVEL: COMMANDER</Badge>
      </header>

      {/* GENERATOR BOX */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1 space-y-6">
          <div className="bg-black/40 border border-pink-500/20 p-8 hud-panel space-y-6">
            <div className="space-y-2">
                <label className="text-pink-500/60 text-[10px] font-black uppercase tracking-widest">MAX_USES (PROTOCOLO)</label>
                <Input 
                  type="number" 
                  value={newMaxUses} 
                  onChange={(e) => setNewMaxUses(parseInt(e.target.value))}
                  className="bg-black/60 border-white/10 text-pink-400 h-12 focus:border-pink-500 focus:ring-0 rounded-none font-black text-xl"
                />
            </div>
            <Button 
                onClick={generateInvite}
                disabled={statusMsg === "GENERATING_PROTOCOL..."}
                className="w-full bg-pink-600 hover:bg-pink-500 text-white font-black uppercase tracking-widest h-14 rounded-none transition-all active:scale-95 shadow-[0_4px_0_var(--color-pink-900)] disabled:opacity-50"
            >
                {statusMsg === "GENERATING_PROTOCOL..." ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Plus className="w-4 h-4 mr-2" />} 
                GERAR_NOVO_CONVITE
            </Button>
            {statusMsg && (
                <div className={`text-[10px] text-center font-black uppercase tracking-widest animate-in fade-in ${statusMsg.includes('ERRO') ? 'text-red-500' : 'text-emerald-400'}`}>
                    {statusMsg}
                </div>
            )}
          </div>

          <div className="bg-pink-950/10 border border-pink-500/10 p-6 space-y-4">
             <div className="flex items-center gap-2 text-pink-500 text-[10px] font-black uppercase tracking-widest">
                <ShieldAlert className="w-4 h-4" /> INSTRUÇÕES_SEGURAÇA
             </div>
             <p className="text-[9px] text-slate-500 uppercase leading-relaxed font-bold">
               Convites gerados aqui permitem o acesso direto ao cargo de PARCEIRO. 
               Não compartilhe códigos em canais públicos. Use tokens de uso único (1) para maior controle.
             </p>
          </div>
        </div>

        {/* LIST TABLE */}
        <div className="md:col-span-2">
            <div className="bg-black/20 border border-white/5 relative overflow-hidden">
                <div className="scanline opacity-10 pointer-events-none" />
                <Table>
                    <TableHeader className="bg-white/5">
                        <TableRow className="border-white/10 hover:bg-transparent">
                            <TableHead className="text-[10px] font-black uppercase tracking-widest text-slate-500 py-6 px-6">PROTOCOL_CODE</TableHead>
                            <TableHead className="text-[10px] font-black uppercase tracking-widest text-slate-500 py-6 text-center">USAGE</TableHead>
                            <TableHead className="text-[10px] font-black uppercase tracking-widest text-slate-500 py-6 text-center">STATUS</TableHead>
                            <TableHead className="text-[10px] font-black uppercase tracking-widest text-slate-500 py-6 text-right px-6">ACTION</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {loading ? (
                            <TableRow>
                                <TableCell colSpan={4} className="text-center py-20 text-slate-700 text-xs font-black uppercase animate-pulse">
                                    SYNCHRONIZING_DATABASE...
                                </TableCell>
                            </TableRow>
                        ) : invites.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={4} className="text-center py-20 text-slate-800 text-xs font-black uppercase">
                                    NENHUM_PROTOCOLO_ATIVO
                                </TableCell>
                            </TableRow>
                        ) : invites.map((invite) => (
                            <TableRow key={invite.id} className="border-white/5 hover:bg-white/2 group transition-all">
                                <TableCell className="py-6 px-6">
                                    <div className="flex flex-col gap-1">
                                        <span className="text-sm font-black text-white italic tracking-tighter uppercase font-mono">{invite.code}</span>
                                        <span className="text-[8px] text-slate-600 font-bold uppercase">{new Date(invite.created_at).toLocaleDateString()}</span>
                                    </div>
                                </TableCell>
                                <TableCell className="text-center py-6">
                                    <div className="flex items-center justify-center gap-2">
                                        <div className="w-16 h-1 bg-white/5 relative">
                                            <div 
                                                className="absolute inset-y-0 left-0 bg-pink-500 transition-all duration-1000" 
                                                style={{ width: `${Math.min((invite.uses / invite.max_uses) * 100, 100)}%` }}
                                            />
                                        </div>
                                        <span className="text-[10px] font-black text-white">{invite.uses}/{invite.max_uses}</span>
                                    </div>
                                </TableCell>
                                <TableCell className="text-center py-6">
                                    <Badge 
                                        onClick={() => toggleStatus(invite)}
                                        className={`rounded-none text-[8px] font-black uppercase cursor-pointer transition-all ${invite.is_active ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/30' : 'bg-red-500/20 text-red-400 border-red-500/30 hover:bg-red-500/30'}`}
                                    >
                                        {invite.is_active ? 'ACTIVE' : 'LOCKED'}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-right py-6 px-6">
                                    <button 
                                        onClick={() => deleteInvite(invite.id)}
                                        className="p-2 text-slate-700 hover:text-red-500 hover:bg-red-500/10 transition-all opacity-0 group-hover:opacity-100"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
            
            <div className="mt-8 flex items-center justify-between border-t border-white/5 pt-6">
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 text-[10px] font-black text-slate-600 uppercase">
                        <Activity className="w-3 h-3" /> RELAY_STATUS: SECURE
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}
