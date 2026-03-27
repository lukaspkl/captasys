import { getIntelBySlug } from "@/app/actions/prospecting";
import AuditDossier from "@/app/(admin)/admin/leads/components/modals/pure-stitch/AuditDossier";
import TacticalDossier from "@/app/(admin)/admin/leads/components/modals/pure-stitch/TacticalDossier";
import RenewalDossier from "@/app/(admin)/admin/leads/components/modals/pure-stitch/RenewalDossier";
import { ShieldAlert, Rocket, Clock } from "lucide-react";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const result = await getIntelBySlug(slug);
    
    if (!result.success || !result.dossier) {
        return {
            title: "Acesso Negado | SiteProx Intelligence",
            robots: "noindex, nofollow"
        };
    }

    const businessName = result.dossier.prospecting_leads?.title || "Empresa";
    const type = result.dossier.type === 'audit' ? 'Auditoria' : 
                   result.dossier.type === 'tactical' ? 'Dossiê Tático' : 'Renovação';

    return {
        title: `${type}: ${businessName} | SiteProx Labs`,
        description: `Análise estratégica de performance digital e posicionamento local para ${businessName}. Protocolo de segurança nível 7 ativo.`,
        robots: "noindex, nofollow" // Dossiers are private intelligence and expire
    };
}

export default async function IntelDossierPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const result = await getIntelBySlug(slug);

    const isExpired = result.dossier && (new Date(result.dossier.expires_at) < new Date() || !result.dossier.is_active);
    const sellerWhatsapp = result.dossier?.data?.seller_whatsapp || "5511999999999";
    const whatsappLink = `https://wa.me/${sellerWhatsapp}?text=Olá! Vi o meu dossiê SiteProx mas ele expirou. Gostaria de reativar o acesso ao Protocolo [ID: ${slug}]`;

    if (result.error || !result.dossier || isExpired) {
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
                   <a 
                        href={whatsappLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block px-10 py-4 bg-[#25D366] text-black font-black uppercase italic text-xs tracking-[0.2em] hover:bg-white transition-all shadow-[0_0_20px_rgba(37,211,102,0.3)]"
                   >
                        FALAR COM COMANDO SITEPROX
                   </a>
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

            {/* Global HUD Ticker (Mobile & Desktop) */}
            <div className="fixed top-0 left-0 w-full z-[150] bg-black/95 backdrop-blur-xl border-b border-secondary/20 py-2 px-6 flex items-center justify-between no-print shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-secondary animate-ping rounded-full"></div>
                        <span className="text-[7px] md:text-[9px] font-mono text-slate-400 tracking-[0.3em] uppercase">SECURE_HUD_v2</span>
                    </div>
                    <div className="hidden md:flex items-center gap-3 border-l border-white/10 pl-4">
                        <span className="text-[7px] font-mono text-slate-500 uppercase tracking-widest italic">Encrypted Stream Protocol // V7.ALPHA</span>
                    </div>
                </div>
                <div className="flex items-center gap-4 md:gap-8">
                    <div className="hidden lg:flex items-center gap-2 text-[8px] font-mono text-slate-500 uppercase tracking-widest">
                        <span className="text-secondary/50">STATUS:</span>
                        <span className="text-white animate-pulse">CONNECTION_STABLE</span>
                    </div>
                    <div className="flex items-center gap-2 bg-secondary/10 px-3 py-1 border border-secondary/20">
                        <Clock className="w-3 h-3 text-secondary animate-pulse" />
                        <span className="text-[9px] md:text-[11px] font-headline font-black text-white italic uppercase tracking-tighter">
                            CONEXÃO_EXPIRA: <span className="text-secondary neon-glow-cyan">[48H]</span>
                        </span>
                    </div>
                </div>
            </div>

            <div className="intel-content max-w-screen-2xl mx-auto py-20 px-4">
                {type === 'audit' && <AuditDossier {...data} slug={slug} />}
                {type === 'tactical' && <TacticalDossier {...data} slug={slug} />}
                {type === 'renewal' && <RenewalDossier {...data} slug={slug} />}
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

