import { Badge } from "@/components/ui/badge";
import { Globe, Settings, Plus, ExternalLink, ShieldAlert, Cpu, UserCheck } from "lucide-react";
import Link from "next/link";
import { createClient } from "@/utils/supabase/server";
import { Button } from "@/components/ui/button";
import { getLeadsBySite } from "@/app/actions/leads";

export default async function ClientDashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  const { data: sites } = await supabase
    .from('site_projects')
    .select('*')
    .eq('owner_id', user?.id)
    .order('created_at', { ascending: false });

  // Fetch leads for each site to get counts
  const sitesWithLeads = await Promise.all((sites || []).map(async (site) => {
    const leads = await getLeadsBySite(site.id);
    return { ...site, leadCount: leads.length };
  }));

  const totalLeads = sitesWithLeads.reduce((acc, s) => acc + s.leadCount, 0);

  return (
    <div className="p-8 space-y-8 animate-in fade-in duration-700">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-emerald-500/20 pb-6">
        <div className="space-y-1">
          <Badge className="bg-emerald-500 text-black font-black uppercase tracking-widest text-[10px]">AUTH_LEVEL: CLIENT_HUD</Badge>
          <h1 className="text-4xl font-black text-white italic uppercase tracking-tighter flex items-center gap-3">
            <Globe className="w-8 h-8 text-emerald-500 hacker-flicker" />
            MY_DIGITAL_NODES
          </h1>
        </div>
        
        <Link href="/dashboard/create-site">
          <button className="bg-emerald-500 text-black font-black uppercase tracking-widest text-xs px-6 py-4 rounded-none hover:bg-emerald-400 transition-all flex items-center gap-3 shadow-[0_0_20px_rgba(16,185,129,0.3)]">
            <Plus className="w-4 h-4" />
            GERAR_NOVO_SITE
          </button>
        </Link>
      </header>

      {/* Stats Summary */}
      <div className="flex gap-6">
          <div className="bg-black border border-emerald-500/20 p-6 text-center min-w-[160px] hud-panel relative overflow-hidden">
              <div className="text-[9px] text-emerald-500/50 uppercase font-black tracking-widest mb-2">ACTIVE_SITES</div>
              <div className="text-3xl font-black text-white">{sites?.filter(s => s.status === 'active').length || 0}</div>
              <div className="absolute top-1 right-1 w-1 h-1 bg-emerald-500 shadow-[0_0_5px_#10b981]" />
          </div>
          <div className="bg-black border border-pink-500/20 p-6 text-center min-w-[160px] hud-panel">
              <div className="text-[9px] text-pink-500/50 uppercase font-black tracking-widest mb-2">TOTAL_LEADS</div>
              <div className="text-3xl font-black text-pink-400 italic">{totalLeads}</div>
          </div>
          <div className="bg-black border border-cyan-500/20 p-6 text-center min-w-[160px] hud-panel">
              <div className="text-[9px] text-cyan-500/50 uppercase font-black tracking-widest mb-2">TOTAL_TRAFFIC</div>
              <div className="text-3xl font-black text-white italic">---</div>
          </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {sitesWithLeads.length > 0 ? (
          sitesWithLeads.map((site) => (
            <div key={site.id} className="group relative">
               <div className={`absolute inset-0 -z-10 blur-xl opacity-0 group-hover:opacity-20 transition-opacity bg-${site.status === 'active' ? 'emerald' : 'red'}-500/40`} />
               
               <div className={`p-8 bg-slate-950/60 border ${site.status === 'active' ? 'border-emerald-500/10' : 'border-red-500/30'} hud-panel relative overflow-hidden flex flex-col h-full`}>
                  
                  {/* Status & Leads Indicator */}
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex gap-2">
                       <Badge variant="outline" className={`${site.status === 'active' ? 'border-emerald-500/30 text-emerald-400' : 'border-red-500/30 text-red-500'} font-black text-[9px] uppercase tracking-widest`}>
                         {site.status === 'active' ? 'PROTOCOLO_ATIVO' : 'TERMINAL_BLOQUEADO'}
                       </Badge>
                       {site.leadCount > 0 && (
                          <Badge className="bg-pink-500 text-black font-black text-[9px] tracking-widest">
                             {site.leadCount} LEADS
                          </Badge>
                       )}
                    </div>
                    <Cpu className={`w-4 h-4 ${site.status === 'active' ? 'text-emerald-500/40' : 'text-red-500/40'}`} />
                  </div>

                  <div className="space-y-4 flex-1">
                    <div>
                      <h3 className="text-2xl font-black text-white italic uppercase tracking-tight">{site.content.site_name || site.subdomain}</h3>
                      <div className="flex items-center gap-2 text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">
                        <span className="text-cyan-400">URL:</span> {site.subdomain}.captasys.net
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 py-4 border-y border-white/5">
                        <div>
                          <p className="text-[8px] text-slate-600 font-black uppercase">CLUSTER</p>
                          <p className="text-[10px] text-white font-bold uppercase">{site.segment}</p>
                        </div>
                        <div>
                          <p className="text-[8px] text-slate-600 font-black uppercase">THEME</p>
                          <p className="text-[10px] text-white font-bold uppercase">{site.theme_id}</p>
                        </div>
                    </div>
                  </div>

                  <div className="mt-8 flex gap-3">
                    <Link href={`http://${site.subdomain}.localhost:3000`} target="_blank" className="flex-1">
                      <button className="w-full bg-white/5 border border-white/10 text-white font-black uppercase tracking-widest text-[9px] py-4 hover:bg-white/10 transition-all flex items-center justify-center gap-2">
                         PREVIEW <ExternalLink className="w-3 h-3" />
                      </button>
                    </Link>
                    <Link href={`/dashboard/leads?siteId=${site.id}`}>
                      <button title="Gerenciar Leads" className="p-4 bg-pink-500/10 border border-pink-500/20 text-pink-500 hover:bg-pink-500 hover:text-black transition-all">
                         <UserCheck className="w-4 h-4" />
                      </button>
                    </Link>
                    <Link href={`/dashboard/my-site/${site.id}/edit`}>
                      <button className={`p-4 border ${site.status === 'active' ? 'border-emerald-500/20 text-emerald-500' : 'border-purple-500/20 text-purple-500'} hover:bg-white/10 transition-all flex items-center gap-2 group/edit`}>
                         <Settings className="w-4 h-4 group-hover/edit:rotate-90 transition-transform" />
                         <span className="text-[9px] font-black uppercase tracking-widest">EDITAR_CONTEÚDO</span>
                      </button>
                    </Link>
                  </div>

                  {/* Laser effect for blocked */}
                  {site.status === 'blocked' && (
                    <div className="absolute inset-0 bg-red-950/10 pointer-events-none flex items-center justify-center rotate-12">
                        <div className="text-[40px] font-black text-red-500/10 border-4 border-red-500/10 px-10 py-4 scale-150">BLOCKED</div>
                    </div>
                  )}
               </div>
            </div>
          ))
        ) : (
          <div className="md:col-span-3 py-20 bg-slate-950/40 border-2 border-dashed border-emerald-500/10 flex flex-col items-center justify-center text-center space-y-6">
              <ShieldAlert className="w-12 h-12 text-slate-800" />
              <div className="space-y-2">
                <h3 className="text-xl font-black text-slate-500 uppercase italic tracking-tighter">NENHUM_SITE_ENCONTRADO_NA_REDE</h3>
                <p className="text-[10px] text-slate-700 font-bold uppercase tracking-widest">Inicie um novo provisionamento para começar.</p>
              </div>
              <Link href="/dashboard/create-site">
                <Button className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500 hover:text-black font-black uppercase tracking-widest text-[10px] px-10 h-12 rounded-none">
                  INICIALIZAR_PROJETO_ALPHA
                </Button>
              </Link>
          </div>
        )}
      </div>
    </div>
  );
}
