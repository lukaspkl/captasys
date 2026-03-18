"use client";

import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Users, ArrowLeft, Activity, AlertTriangle, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { getUsers, updateUserRole } from "@/app/actions/nodes";

interface ProfileNode {
  id: string;
  email: string;
  full_name: string;
  role: string;
  created_at: string;
}

export default function AdminNodesPage() {
  const [nodes, setNodes] = useState<ProfileNode[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedNode, setSelectedNode] = useState<ProfileNode | null>(null);
  const [targetRole, setTargetRole] = useState<string>("");
  const [isConfirming, setIsConfirming] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [statusMsg, setStatusMsg] = useState({ text: "", type: "" });

  const fetchNodes = async () => {
    setLoading(true);
    const data = await getUsers();
    setNodes(data);
    setLoading(false);
  };

  useEffect(() => {
    let mounted = true;
    (async () => {
      const data = await getUsers();
      if (mounted) {
        setNodes(data as ProfileNode[]);
        setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

  const openConfirmation = (node: ProfileNode, role: string) => {
    setSelectedNode(node);
    setTargetRole(role);
    setIsConfirming(true);
  };

  const handleUpdate = async () => {
    if (!selectedNode) return;
    setUpdating(true);
    const result = await updateUserRole(selectedNode.id, targetRole, selectedNode.email, selectedNode.full_name);
    
    if (result.success) {
      setStatusMsg({ text: result.message, type: "success" });
      await fetchNodes();
    } else {
      setStatusMsg({ text: result.message, type: "error" });
    }
    
    setUpdating(false);
    setIsConfirming(false);
    setSelectedNode(null);
    
    setTimeout(() => setStatusMsg({ text: "", type: "" }), 5000);
  };

  return (
    <div className="p-8 space-y-8 animate-in fade-in duration-700 relative min-h-screen">
      {/* HUD CRT OVERLAY INSIDE */}
      <div className="fixed inset-0 pointer-events-none opacity-5 z-0 cyber-grid"></div>

      <header className="flex flex-col md:flex-row md:items-center justify-between border-b border-cyan-500/20 pb-8 relative z-10 gap-6">
        <div className="space-y-2">
          <Link href="/admin/core" className="text-[10px] font-black text-cyan-500/50 hover:text-cyan-400 flex items-center gap-2 uppercase tracking-widest transition-all mb-2">
            <ArrowLeft className="w-3 h-3" /> VOLTAR_AO_HUB
          </Link>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 border border-cyan-500 flex items-center justify-center shadow-[0_0_15px_rgba(0,243,255,0.4)] bg-cyan-950/20">
              <Users className="w-6 h-6 text-cyan-400" />
            </div>
            <h1 className="text-4xl font-black text-white italic uppercase tracking-tighter">
              NODE_RECORDS<span className="text-pink-500 font-hacker ml-2">_C&C</span>
            </h1>
          </div>
        </div>

        <div className="bg-black/40 border border-cyan-500/20 p-4 backdrop-blur-md">
           <div className="text-[10px] text-pink-500 uppercase font-black tracking-widest flex items-center gap-2">
              <Activity className="w-3 h-3 animate-pulse" /> SYSTEM_BROADCAST_STATUS
           </div>
           <div className="text-xs text-white font-mono mt-1">
             {statusMsg.text || (loading ? "CONSULTANDO_REDE..." : "MONITORANDO_NODES_ATIVOS.")}
           </div>
        </div>
      </header>

      {/* NODES TABLE */}
      <div className="relative z-10 bg-black/40 border border-cyan-500/10 backdrop-blur-md">
        <Table>
          <TableHeader className="bg-cyan-950/20">
            <TableRow className="border-cyan-500/10 hover:bg-transparent">
              <TableHead className="text-cyan-500 font-black uppercase text-[10px] tracking-widest py-6">IDENT_UUID</TableHead>
              <TableHead className="text-cyan-500 font-black uppercase text-[10px] tracking-widest py-6">OPERADOR_NAME</TableHead>
              <TableHead className="text-cyan-500 font-black uppercase text-[10px] tracking-widest py-6">COMMS_EMAIL</TableHead>
              <TableHead className="text-cyan-500 font-black uppercase text-[10px] tracking-widest py-6">ACCESS_LEVEL</TableHead>
              <TableHead className="text-right text-cyan-500 font-black uppercase text-[10px] tracking-widest py-6">PROTOCOL_CMDS</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-20 text-slate-700 animate-pulse font-mono uppercase tracking-widest">Aguardando resposta da colmeia...</TableCell>
              </TableRow>
            ) : nodes.length === 0 ? (
               <TableRow>
                 <TableCell colSpan={5} className="text-center py-20 text-slate-700 font-mono uppercase tracking-widest">Nenhum nó detectado na rede.</TableCell>
               </TableRow>
            ) : nodes.map((node) => (
              <TableRow key={node.id} className="border-cyan-500/5 hover:bg-cyan-500/5 transition-all">
                <TableCell className="font-mono text-[10px] text-slate-600 uppercase py-6">{node.id.split('-')[0]}...{node.id.slice(-4)}</TableCell>
                <TableCell className="font-black text-white uppercase text-xs">{node.full_name || 'DESCONHECIDO'}</TableCell>
                <TableCell className="font-mono text-xs text-cyan-400 opacity-60">{node.email}</TableCell>
                <TableCell>
                  <Badge className={`rounded-none text-[9px] font-black tracking-widest uppercase border ${
                    node.role === 'ADMIN' ? 'bg-red-500/10 text-red-500 border-red-500/30 shadow-[0_0_10px_#ef444433]' :
                    node.role === 'PARTNER' ? 'bg-cyan-500/10 text-cyan-400 border-cyan-400/30' :
                    'bg-slate-800 text-slate-400 border-slate-700'
                  }`}>
                    {node.role}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-3">
                    {node.role !== 'ADMIN' ? (
                      <>
                        {node.role === 'CLIENT' && (
                          <Button 
                            size="sm" 
                            variant="ghost" 
                            onClick={() => openConfirmation(node, 'PARTNER')}
                            className="h-8 rounded-none border border-cyan-500/20 text-[9px] font-black text-cyan-400 uppercase tracking-widest hover:bg-cyan-500 hover:text-black transition-all"
                          >
                            PROMOTE_PARTNER
                          </Button>
                        )}
                        {node.role === 'PARTNER' && (
                          <Button 
                            size="sm" 
                            variant="ghost" 
                            onClick={() => openConfirmation(node, 'CLIENT')}
                            className="h-8 rounded-none border border-pink-500/20 text-[9px] font-black text-pink-500 uppercase tracking-widest hover:bg-pink-500 hover:text-black transition-all px-4"
                          >
                            REBAIXAR_CLIENTE
                          </Button>
                        )}
                      </>
                    ) : (
                      <span className="text-[10px] text-slate-700 font-black tracking-widest uppercase italic pr-4">PROTOCOLO_BLOQUEADO</span>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* CUSTOM CONFIRMATION MODAL (CYBER STYLE) */}
      {isConfirming && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/90 backdrop-blur-xl animate-in fade-in duration-300">
           <div className="w-full max-w-lg bg-[#0a0a0a] border border-red-500/30 p-1 relative shadow-[0_0_50px_rgba(239,68,68,0.2)]">
              <div className="border border-red-500/20 p-8 space-y-6">
                 <div className="flex items-center gap-4 text-red-500 mb-6">
                    <AlertTriangle className="w-10 h-10 hacker-flicker" />
                    <div>
                       <h3 className="text-xl font-black uppercase italic tracking-tighter">PROTOCOLO_ALTO_RISCO</h3>
                       <p className="text-[10px] font-mono tracking-widest text-red-500/60 uppercase">AUTORIZAÇÃO_LEVEL_0_REQUERIDA</p>
                    </div>
                 </div>

                 <p className="text-sm text-slate-400 leading-relaxed font-mono">
                   Você está prestes a reconfigurar o acesso de <span className="text-white font-bold">{selectedNode?.full_name}</span> para o cargo de <span className={`font-bold ${targetRole === 'ADMIN' ? 'text-red-500' : 'text-cyan-400'}`}>{targetRole}</span>.
                   <br /><br />
                   Um e-mail de transmissão criptografado será enviado para <span className="text-white italic">{selectedNode?.email}</span> notificando a mudança de status.
                 </p>

                 <div className="flex flex-col gap-3 pt-4">
                    <Button 
                      onClick={handleUpdate} 
                      disabled={updating}
                      className="w-full h-12 bg-red-600 hover:bg-red-700 text-white font-black uppercase tracking-[0.2em] rounded-none shadow-[0_0_15px_rgba(220,38,38,0.3)] transition-all active:scale-95 flex items-center justify-center gap-3"
                    >
                      {updating ? (
                        <>PROMOVENDO_ACESSO...</>
                      ) : (
                        <><ShieldCheck className="w-4 h-4" /> CONFIRMAR_TRANSMISSÃO</>
                      )}
                    </Button>
                    <Button 
                      onClick={() => setIsConfirming(false)} 
                      disabled={updating}
                      className="w-full h-12 bg-transparent border border-white/10 hover:bg-white/5 text-slate-500 font-black uppercase tracking-[0.2em] rounded-none transition-all"
                    >
                      ABORTAR_PROTOCOLO
                    </Button>
                 </div>
              </div>
              <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-red-500"></div>
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-red-500"></div>
           </div>
        </div>
      )}

      {/* FOOTER FRASE */}
      <footer className="text-center pt-20 relative z-10 pb-10">
         <p className="text-[9px] font-black text-slate-800 uppercase tracking-[0.8em]">
           SiteProx: Protocolo do Futuro - No caos da web moderna, nós somos a ordem.
         </p>
      </footer>
    </div>
  );
}
