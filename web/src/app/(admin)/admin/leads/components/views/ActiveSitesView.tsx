/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import { 
  Globe, 
  Zap, 
  Activity, 
  Sparkles, 
  Settings, 
  ExternalLink, 
  Database, 
  Trash2 
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardContent, 
  CardFooter 
} from "@/components/ui/card";

interface ActiveSitesViewProps {
  activeProjects: any[];
  toggleProjectStatus: (id: string) => void;
  openProjectSettings: (project: any) => void;
  generateBundle: (project: any) => void;
  deleteActiveProject: (id: string) => void;
}

const ActiveSitesView: React.FC<ActiveSitesViewProps> = ({
  activeProjects,
  toggleProjectStatus,
  openProjectSettings,
  generateBundle,
  deleteActiveProject,
}) => {
  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <section className="grid grid-cols-1 md:grid-cols-4 gap-0 border border-white/10 divide-x divide-white/10 bg-dark-bg/20">
        {[
          {
            label: "SITES_EM_PRODUÇÃO",
            value: activeProjects.length,
            icon: Globe,
            trend: "ON",
            suffix: "live",
          },
          {
            label: "FATURAMENTO_MENSAL",
            value: (
              activeProjects.filter((p) => p.status === "active")
                .length * 149
            ).toLocaleString("pt-BR"),
            icon: Zap,
            trend: "MRR",
            suffix: "reais",
          },
          {
            label: "RENOVACOES_PENDENTES",
            value: "0",
            icon: Activity,
            trend: "AÇÃO",
            suffix: "leads",
          },
          {
            label: "UPTIME_SISTEMA",
            value: "99.9",
            icon: Sparkles,
            trend: "MAX",
            suffix: "%",
          },
        ].map((stat, i) => (
          <div
            key={i}
            className="p-8 group hover:bg-[#06b6d4]/5 transition-colors"
          >
            <p className="text-[10px] font-black tracking-widest text-slate-500 uppercase mb-4">
              {stat.label}
            </p>
            <div className="flex items-baseline gap-2">
              <h3 className="font-hacker text-4xl font-black text-white tracking-tighter">
                {stat.value}
              </h3>
              <span className="text-xs font-bold text-slate-600 uppercase tracking-widest">
                {stat.suffix}
              </span>
            </div>
          </div>
        ))}
      </section>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {activeProjects.length > 0 ? (
          activeProjects.map((site, i) => (
            <Card
              key={i}
              className="bg-dark-bg/40 border-white/5 rounded-none group hover:border-[#06b6d4]/30 transition-all"
            >
              <CardHeader className="p-6 border-b border-white/5">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-sm font-black italic text-white uppercase truncate mb-1">
                      {site.name}
                    </CardTitle>
                    <p className="text-[10px] text-slate-500 font-mono tracking-tight">
                      {site.slug}.captasites.com.br
                    </p>
                  </div>
                  <Badge
                    onClick={() => toggleProjectStatus(site.id)}
                    className={`${site.status === "active" ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30" : "bg-rose-500/20 text-rose-400 border-rose-500/30"} rounded-none text-[8px] font-black cursor-pointer hover:opacity-80 transition-opacity`}
                  >
                    {site.status.toUpperCase()}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest">
                  <span className="text-slate-500">
                    Proxima Renovacao:
                  </span>
                  <span className="text-white">{site.renewal}</span>
                </div>
                <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest">
                  <span className="text-slate-500">Plano:</span>
                  <span className="text-white">
                    R$ {site.monthlyFee}/mes
                  </span>
                </div>
              </CardContent>
              <CardFooter className="p-4 border-t border-white/5 bg-black/20 grid grid-cols-4 gap-2">
                <Button
                  onClick={() => openProjectSettings(site)}
                  className="h-9 bg-white/5 hover:bg-white/10 text-white rounded-none p-0"
                  title="Configurar Site"
                >
                  <Settings className="w-3.5 h-3.5" />
                </Button>
                <Button
                  onClick={() =>
                    site.liveUrl &&
                    window.open(
                      site.liveUrl.startsWith("http")
                        ? site.liveUrl
                        : `https://${site.liveUrl}`,
                      "_blank",
                    )
                  }
                  disabled={!site.liveUrl}
                  className={`h-9 rounded-none p-0 ${site.liveUrl ? "bg-white/5 hover:bg-white/10 text-white" : "bg-white/5 text-slate-700 cursor-not-allowed"}`}
                  title={
                    site.liveUrl
                      ? "Ver Site Ao Vivo"
                      : "Nenhum link configurado"
                  }
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </Button>
                <Button
                  onClick={() => generateBundle(site)}
                  className="h-9 bg-amber-500/10 hover:bg-amber-500 text-amber-500 hover:text-black rounded-none p-0 transition-all"
                  title="Gerar Bundle ZIP"
                >
                  <Database className="w-3.5 h-3.5" />
                </Button>
                <Button
                  onClick={() => deleteActiveProject(site.id)}
                  className="h-9 bg-rose-500/10 hover:bg-rose-500 text-rose-500 hover:text-black rounded-none p-0 transition-all"
                  title="Remover Projeto"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </Button>
              </CardFooter>
            </Card>
          ))
        ) : (
          <div className="col-span-3 h-[200px] flex flex-col items-center justify-center border border-dashed border-white/10 text-slate-500 uppercase font-black italic text-[10px] gap-3">
            <Globe className="w-8 h-8 opacity-10" />
            Nenhum site em producao ativa
          </div>
        )}
      </div>
    </div>
  );
};

export default ActiveSitesView;
