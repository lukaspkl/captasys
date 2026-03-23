import SegurancaV2 from "../templates/segurança-v2";
import SegurançaV1 from "../templates/Segurança_v1";
import SwipeGenGrupoAlianAMonitoramento24hETerceirizaODeServiOs6391 from "../templates/swipe_gen_grupo_alian_a___monitoramento_24h_e_terceiriza__o_de_servi_os_6391";
import PetShop01 from "../templates/pet-shop-01";
import GenTheme0615 from "../templates/gen_theme_0615";
import { createClient } from "@/utils/supabase/server";
import { notFound } from "next/navigation";
import { ShieldAlert } from "lucide-react";
import MecanicaAlpha01 from "../templates/mecanica_alpha_01";
import MecanicaSlickV2 from "../templates/mecanica_slick_v2";

import { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  console.log(`[Metadata] Generating for slug: ${slug}`);
  const supabase = await createClient();
  const { data: site } = await supabase
    .from('site_projects')
    .select('content')
    .eq('subdomain', slug)
    .single();

  if (!site) return { title: 'Site não encontrado' };

  return {
    title: `${site.content.site_name} | ${site.content.hero_title}`,
    description: site.content.hero_subtitle || 'Visite nosso site e saiba mais sobre nossos serviços.',
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const TEMPLATE_MAP: Record<string, any> = {
  'segurança-v2': SegurancaV2,

  'Segurança_v1': SegurançaV1,

  'swipe_gen_grupo_alian_a___monitoramento_24h_e_terceiriza__o_de_servi_os_6391': SwipeGenGrupoAlianAMonitoramento24hETerceirizaODeServiOs6391,

  'pet-shop-01': PetShop01,

  'gen_theme_0615': GenTheme0615,

  'default': MecanicaAlpha01,
  'mecanica_alpha_01': MecanicaAlpha01,
  'mecanica_slick_v2': MecanicaSlickV2,
};

export default async function TenantPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  console.log(`[TenantPage] Rendering for slug: ${slug}`);
  const supabase = await createClient();
  
  // 1. Fetch site data based on subdomain (slug)
  const { data: site } = await supabase
    .from('site_projects')
    .select('*')
    .eq('subdomain', slug)
    .single();

  if (!site) {
     console.error(`[TenantPage] Site NOT FOUND for slug: ${slug}`);
     return notFound();
  }

  // ─── KILL SWITCH (Status Check) ───
  if (site.status === 'blocked') {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-6 font-mono">
        <div className="max-w-md w-full hud-panel p-10 border-red-500/30 text-center space-y-6">
          <div className="relative inline-block">
             <ShieldAlert className="w-16 h-16 text-red-500 mx-auto hacker-flicker" />
             <div className="absolute inset-0 bg-red-500/20 blur-xl rounded-full" />
          </div>
          <div className="space-y-2">
            <h1 className="text-3xl font-black text-white italic tracking-tighter uppercase">ACCESS_SUSPENDED</h1>
            <p className="text-[10px] text-red-500 font-bold uppercase tracking-[0.2em] leading-relaxed">
              O acesso a este terminal foi revogado pelo administrador da rede. <br/>
              protocol_code: 403_SUSPENSION_ACTIVE
            </p>
          </div>
          <div className="pt-6 border-t border-red-500/10 text-[8px] text-slate-700 uppercase">
             CONTATE O SUPORTE PARA REATIVAÇÃO DO NÓ.
          </div>
        </div>
      </div>
    );
  }

  // ─── SELECT TEMPLATE ───
  const SelectedTemplate = TEMPLATE_MAP[site.theme_id] || TEMPLATE_MAP['default'];

  return <SelectedTemplate site={site} />;
}
