/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import { 
  Database, 
  Target, 
  MessageSquare, 
  Send 
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface TemplatesViewProps {
  selectedTemplateLeadUrl: string | null;
  setSelectedTemplateLeadUrl: (url: string) => void;
  leads: any[];
  templateConfig: {
    sellerName: string;
    basePrice: string;
    installments: string;
    installmentValue: string;
  };
  setTemplateConfig: React.Dispatch<React.SetStateAction<any>>;
  templatesList: any[];
  processTemplatePreview: (tpl: any) => void;
}

const TemplatesView: React.FC<TemplatesViewProps> = ({
  selectedTemplateLeadUrl,
  setSelectedTemplateLeadUrl,
  leads,
  templateConfig,
  setTemplateConfig,
  templatesList,
  processTemplatePreview,
}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 h-[calc(100vh-250px)] animate-in fade-in slide-in-from-bottom-4 px-6 pb-20">
      {/* Painel Esquerdo: Seletor de Leads & Configuração */}
      <div className="lg:col-span-1 bg-[#0a0a0a]/80 border border-cyan-400/10 p-6 flex flex-col gap-6 hacker-grid-bg">
        <h3 className="font-hacker font-black italic text-[14px] text-cyan-400 uppercase tracking-[0.3em] border-b border-cyan-400/20 pb-4 flex items-center gap-3">
          <Database className="w-4 h-4" /> LEAD_TARGETING
        </h3>

        <div className="space-y-4 flex-1">
          <div className="space-y-2">
            <label className="text-[10px] text-cyan-400/60 uppercase font-mono tracking-widest pl-1">
              Selecione o Alvo
            </label>
            <div className="relative">
              <select
                value={selectedTemplateLeadUrl || ""}
                onChange={(e) =>
                  setSelectedTemplateLeadUrl(e.target.value)
                }
                className="w-full bg-dark-bg border border-cyan-400/20 rounded-none h-12 px-3 text-[11px] font-black uppercase text-cyan-400 italic appearance-none cursor-pointer focus:border-cyan-400 focus:outline-none transition-colors group/select"
              >
                <option
                  value=""
                  disabled
                  className="bg-dark-bg text-cyan-800"
                >
                  &gt;&gt;&gt; ESCOLHER ALVO_
                </option>
                {leads.map((l) => (
                  <option
                    key={l.url}
                    value={l.url}
                    className="bg-dark-bg text-cyan-400"
                  >
                    {l.title}{" "}
                    {l.phone ? "(WHATSAPP_OK)" : "(NO_CONTACT)"}
                  </option>
                ))}
              </select>
              <Target className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-cyan-400/50 pointer-events-none" />
            </div>
            {selectedTemplateLeadUrl &&
              !leads.find((l) => l.url === selectedTemplateLeadUrl)
                ?.phone && (
                <p className="text-[9px] text-pink-500 uppercase tracking-tighter mt-1 font-black">
                  ⚠️ AVISO: WHATSAPP NÃO DETECTADO NESTE DOMÍNIO
                </p>
              )}
          </div>

          <div className="space-y-4 pt-6 mt-6 border-t border-cyan-400/10">
            <label className="text-[10px] text-cyan-400/60 uppercase font-mono tracking-widest pl-1">
              VARIÁVEIS GLOBAIS (SYS_CONFIG)
            </label>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <span className="text-[8px] text-cyan-600 uppercase font-black">
                  NOME VENDEDOR
                </span>
                <Input
                  value={templateConfig.sellerName}
                  onChange={(e) =>
                    setTemplateConfig((prev: any) => ({
                      ...prev,
                      sellerName: e.target.value,
                    }))
                  }
                  className="bg-black/40 border-cyan-400/20 rounded-none h-8 text-[10px] font-mono text-cyan-400"
                />
              </div>
              <div className="space-y-1">
                <span className="text-[8px] text-cyan-600 uppercase font-black">
                  PREÇO BASE
                </span>
                <Input
                  value={templateConfig.basePrice}
                  onChange={(e) =>
                    setTemplateConfig((prev: any) => ({
                      ...prev,
                      basePrice: e.target.value,
                    }))
                  }
                  className="bg-black/40 border-cyan-400/20 rounded-none h-8 text-[10px] font-mono text-cyan-400"
                />
              </div>
              <div className="space-y-1">
                <span className="text-[8px] text-cyan-600 uppercase font-black">
                  PARCELAS
                </span>
                <Input
                  value={templateConfig.installments}
                  onChange={(e) =>
                    setTemplateConfig((prev: any) => ({
                      ...prev,
                      installments: e.target.value,
                    }))
                  }
                  className="bg-black/40 border-cyan-400/20 rounded-none h-8 text-[10px] font-mono text-cyan-400"
                />
              </div>
              <div className="space-y-1">
                <span className="text-[8px] text-cyan-600 uppercase font-black">
                  VALOR PARCELA
                </span>
                <Input
                  value={templateConfig.installmentValue}
                  onChange={(e) =>
                    setTemplateConfig((prev: any) => ({
                      ...prev,
                      installmentValue: e.target.value,
                    }))
                  }
                  className="bg-black/40 border-cyan-400/20 rounded-none h-8 text-[10px] font-mono text-cyan-400"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Painel Direito: Lista de Templates */}
      <div className="lg:col-span-2 bg-dark-bg p-6 flex flex-col gap-6 custom-scrollbar overflow-y-auto border border-cyan-400/10">
        <h3 className="font-hacker font-black italic text-[14px] text-cyan-400 uppercase tracking-[0.3em] border-b border-cyan-400/20 pb-4 flex items-center gap-3">
          <MessageSquare className="w-4 h-4" /> TEMPLATE_LIBRARY
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {templatesList.map((tpl) => (
            <div
              key={tpl.id}
              className="bg-dark-bg border border-cyan-400/20 p-5 group hover:border-cyan-400 transition-all cursor-crosshair relative hacker-grid-bg flex flex-col justify-between"
            >
              <div className="absolute top-0 left-0 w-full h-0.5 bg-cyan-400/0 group-hover:bg-cyan-400 transition-all"></div>
              <div>
                <h4 className="text-[12px] font-black text-cyan-400 uppercase font-mono mb-2 group-hover:hacker-glow">
                  {tpl.name}
                </h4>
                <p className="text-[10px] text-cyan-600 mb-6 italic">
                  {tpl.description}
                </p>
              </div>

              <Button
                onClick={() => processTemplatePreview(tpl)}
                className="w-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500 hover:text-black rounded-none uppercase text-[9px] font-black tracking-widest transition-all italic mt-2"
              >
                <Send className="w-3 h-3 mr-2" /> INJETAR_E_VISUALIZAR
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TemplatesView;
