import { Badge } from "@/components/ui/badge";
import { UserCheck, Calendar, Phone, Mail, MessageSquare, ArrowLeft, Shield, Settings } from "lucide-react";
import Link from "next/link";
import { createClient } from "@/utils/supabase/server";
import { getLeadsBySite } from "@/app/actions/leads";

export default async function LeadsManagementPage({ searchParams }: { searchParams: { siteId?: string } }) {
  const supabase = await createClient();
  
  // Verify user is owner (simplified check, the action already does RLS checks)
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return <div>Acesso negado.</div>;

  const siteId = searchParams.siteId;
  const leads = siteId ? await getLeadsBySite(siteId) : [];

  // Fetch site info for the header if siteId exists
  const { data: site } = siteId 
    ? await supabase.from('site_projects').select('content').eq('id', siteId).single()
    : { data: null };

  return (
    <div className="p-8 space-y-8 animate-in fade-in duration-700">
      <header className="flex items-center justify-between border-b border-pink-500/20 pb-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
             <Link href="/dashboard/my-site" className="text-slate-500 hover:text-white transition-colors">
                <ArrowLeft className="w-4 h-4" />
             </Link>
             <Badge className="bg-pink-500 text-black font-black uppercase tracking-widest text-[10px]">AUTH_LEVEL: LEAD_OPERATOR</Badge>
          </div>
          <h1 className="text-4xl font-black text-white italic uppercase tracking-tighter flex items-center gap-3">
            <UserCheck className="w-8 h-8 text-pink-500 hacker-flicker" />
            INBOUND_PROSPECTS
          </h1>
          {site && <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">FILTRADO_POR: {site.content.site_name}</p>}
        </div>
      </header>

      <div className="space-y-4">
        {leads.length > 0 ? (
          leads.map((lead: any) => (
            <div key={lead.id} className="bg-slate-950/40 border border-white/5 p-6 hud-panel group hover:border-pink-500/30 transition-all">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-start gap-4">
                   <div className="w-12 h-12 bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-pink-500">
                      <Shield className="w-6 h-6" />
                   </div>
                   <div className="space-y-1">
                      <div className="text-lg font-black text-white uppercase italic">{lead.name}</div>
                      <div className="flex flex-wrap gap-4 text-[10px] text-slate-500 font-bold uppercase tracking-widest">
                         <span className="flex items-center gap-1.5"><Phone className="w-3 h-3 text-pink-400" /> {lead.phone}</span>
                         {lead.email && <span className="flex items-center gap-1.5"><Mail className="w-3 h-3 text-pink-400" /> {lead.email}</span>}
                         <span className="flex items-center gap-1.5"><Calendar className="w-3 h-3 text-pink-400" /> {new Date(lead.created_at).toLocaleDateString('pt-BR')}</span>
                      </div>
                   </div>
                </div>
                
                <div className="flex items-center gap-3">
                   <Badge className={`${lead.status === 'new' ? 'bg-emerald-500 text-black' : 'bg-slate-800 text-slate-400'} font-black text-[9px] uppercase tracking-widest`}>
                      {lead.status === 'new' ? 'NOVO_CADASTRO' : lead.status.toUpperCase()}
                   </Badge>
                   <button className="bg-white/5 p-3 hover:bg-pink-500 hover:text-black transition-all">
                      <Settings className="w-4 h-4" />
                   </button>
                </div>
              </div>

              {lead.message && (
                <div className="mt-6 p-4 bg-black/40 border-l-2 border-pink-500/50 text-sm text-slate-400 italic">
                   <div className="flex items-center gap-2 mb-2 text-[8px] font-black text-pink-500 uppercase tracking-[2px]">
                      <MessageSquare className="w-3 h-3" /> TRANSMISSÃO_MENSAGEM
                   </div>
                   &quot;{lead.message}&quot;
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="py-20 bg-slate-950/40 border-2 border-dashed border-pink-500/10 flex flex-col items-center justify-center text-center space-y-6">
              <UserCheck className="w-12 h-12 text-slate-800" />
              <div className="space-y-2">
                <h3 className="text-xl font-black text-slate-500 uppercase italic tracking-tighter">SEM_LEADS_NO_MOMENTO</h3>
                <p className="text-[10px] text-slate-700 font-bold uppercase tracking-widest">O tráfego ainda não gerou prospecções neste nó.</p>
              </div>
          </div>
        )}
      </div>
    </div>
  );
}
