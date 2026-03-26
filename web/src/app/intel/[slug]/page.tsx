
import { getIntelBySlug } from "@/app/actions/prospecting";
import AuditDossier from "@/app/(admin)/admin/leads/components/modals/pure-stitch/AuditDossier";
import TacticalDossier from "@/app/(admin)/admin/leads/components/modals/pure-stitch/TacticalDossier";
import RenewalDossier from "@/app/(admin)/admin/leads/components/modals/pure-stitch/RenewalDossier";
import { ShieldAlert, Rocket, Clock } from "lucide-react";
import Link from "next/link";

export default async function IntelDossierPage({ params }: { params: { slug: string } }) {
    const { slug } = params;
    const result = await getIntelBySlug(slug);

    if (result.error || !result.dossier) {
        return (
            <div className="min-h-screen bg-[#020617] text-white flex flex-col items-center justify-center p-6 font-outfit">
                <div className="w-20 h-20 bg-rose-500/10 border border-rose-500/20 flex items-center justify-center mb-8 shadow-[0_0_30px_rgba(244,63,94,0.1)]">
                    <ShieldAlert className="w-10 h-10 text-rose-500" />
                </div>
                <h1 className="text-4xl font-headline font-black italic uppercase tracking-tighter mb-4">
                    ACESSO <span className="text-rose-500">EXPIRADO</span>
                </h1>
                <p className="text-slate-400 font-mono text-[10px] uppercase tracking-widest text-center max-w-md leading-relaxed">
                    O protocolo de inteligência [ID: {slug}] foi removido por razões de segurança ou o tempo de validade de 48h foi atingido.
                </p>
                <div className="mt-12 p-8 border border-white/5 bg-white/5 backdrop-blur-sm max-w-sm text-center">
                   <p className="text-xs font-bold text-white uppercase mb-4 tracking-tighter italic">&quot;No caos da web, nós somos a ordem!&quot;</p>
                   <p className="text-[10px] text-slate-500 mb-8 font-mono tracking-widest">Contate o comando SiteProx para reativar este dossiê ou solicitar uma nova análise.</p>
                   <Link 
                        href="/" 
                        className="inline-block px-10 py-4 bg-primary text-black font-black uppercase italic text-xs tracking-[0.2em] hover:bg-white transition-all"
                   >
                        VOLTAR_ AO_SITE_PRINCIPAL
                   </Link>
                </div>
            </div>
        );
    }

    const { type, data } = result.dossier;

    return (
        <main className="min-h-screen bg-[#020617] overflow-x-hidden selection:bg-primary selection:text-black">
            {/* Header de Segurança SiteProx para Visualização Pública */}
            <header className="fixed top-0 left-0 w-full h-1 border-b border-primary/20 bg-primary/10 z-100"></header>
            <div className="fixed top-4 right-8 z-100 pointer-events-none opacity-40">
                <div className="flex flex-col items-end">
                    <span className="text-[8px] font-mono font-bold text-primary uppercase tracking-[0.3em]">SECURE_PROTOCOL_V7</span>
                    <span className="text-[10px] font-headline font-black text-white italic uppercase tracking-tighter flex items-center gap-2">
                        SITEPROX <Rocket className="w-3 h-3" />
                    </span>
                </div>
            </div>

            {/* Countdown de Expiração Flutuante */}
            <div className="fixed bottom-8 left-8 z-100 flex items-center gap-3 glass p-4 border-l-2 border-l-secondary">
                <Clock className="w-4 h-4 text-secondary animate-pulse" />
                <div className="flex flex-col">
                    <span className="text-[7px] font-mono text-slate-500 uppercase tracking-widest">Dossiê Exclui em:</span>
                    <span className="text-[10px] font-headline font-black text-white italic uppercase tracking-tighter">
                        CONEXÃO_TEMPORÁRIA_ [48H]
                    </span>
                </div>
            </div>

            <div className="intel-content max-w-screen-2xl mx-auto py-20 px-4">
                {type === 'audit' && <AuditDossier {...data} onPrint={() => window.print()} />}
                {type === 'tactical' && <TacticalDossier {...data} onPrint={() => window.print()} />}
                {type === 'renewal' && <RenewalDossier {...data} onPrint={() => window.print()} />}
            </div>

            <style dangerouslySetInnerHTML={{ __html: `
                @media print {
                    .fixed { display: none !important; }
                    main { background: white !important; color: black !important; }
                }
            ` }} />
        </main>
    );
}

