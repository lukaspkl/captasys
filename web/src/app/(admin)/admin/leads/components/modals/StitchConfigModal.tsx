"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Zap } from "lucide-react";
import type { StitchConfig } from "../../types";

interface StitchConfigModalProps {
  isOpen: boolean;
  config: StitchConfig;
  onConfigChange: (config: StitchConfig) => void;
  onClose: () => void;
  onSubmit: () => void;
}

export default function StitchConfigModal({
  isOpen,
  config,
  onConfigChange,
  onClose,
  onSubmit,
}: StitchConfigModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[700] flex items-center justify-center p-6 bg-black/95 backdrop-blur-xl animate-in fade-in duration-300">
      <div className="hud-panel w-full max-w-lg p-10 bg-slate-950 border-cyan-500/40 space-y-8 shadow-[0_0_50px_rgba(6,182,212,0.15)]">
        <div className="space-y-1">
          <Badge className="bg-cyan-500 text-black font-black uppercase text-[9px]">SÍNTESE_CONFIG</Badge>
          <h3 className="text-2xl font-black text-white italic uppercase tracking-tighter">PREPARAR_CLONAGEM</h3>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-[9px] font-black text-slate-500 uppercase">IDENTIFICADOR_PUBLICO (BIBLIOTECA)</label>
            <Input
              value={config.name}
              onChange={(e) => onConfigChange({ ...config, name: e.target.value })}
              className="bg-black/60 border-cyan-500/20 text-white rounded-none uppercase text-xs h-12 focus:border-cyan-500"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[9px] font-black text-slate-500 uppercase">ID_UNICO_TEMA (ARQUIVO .TSX)</label>
            <Input
              value={config.themeId}
              onChange={(e) => onConfigChange({ ...config, themeId: e.target.value })}
              className="bg-black/60 border-cyan-500/20 text-white rounded-none text-xs h-12 font-mono focus:border-cyan-500"
            />
            <p className="text-[8px] text-slate-600 font-bold uppercase tracking-widest">* SERÁ CRIADO EM: /templates/{config.themeId}.tsx</p>
          </div>

          <div className="space-y-2">
            <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest leading-none">NICHO_ALVO (REGRAS_DE_DESIGN)</label>
            <select
              value={config.segment}
              onChange={(e) => onConfigChange({ ...config, segment: e.target.value })}
              className="w-full bg-black/60 border border-cyan-500/20 text-white rounded-none h-12 text-[10px] uppercase font-bold px-4 outline-none focus:border-cyan-500"
            >
              <option value="energia-solar">☀️ ENERGIA SOLAR</option>
              <option value="odontologia">🦷 ODONTOLOGIA</option>
              <option value="mecanica">🛠️ OFICINA MECÂNICA</option>
              <option value="climatizacao">❄️ AR / REFRIGERAÇÃO</option>
              <option value="estetica">✨ ESTÉTICA</option>
              <option value="beleza">💇‍♀️ SALÃO / BELEZA</option>
              <option value="veterinaria">🐶 PET SHOP / VET</option>
              <option value="advocacia">⚖️ ADVOCACIA</option>
              <option value="seguranca">🔐 SEGURANÇA / CFTV</option>
              <option value="mudancas">🚚 MUDANÇAS / FRETES</option>
              <option value="limpeza">🧼 HIGIENIZAÇÃO / SOFÁ</option>
              <option value="chaveiro">🔑 CHAVEIRO 24H</option>
              <option value="vidracaria">🚿 VIDRAÇARIA</option>
              <option value="hamburgueria">🍔 HAMBURGUERIA</option>
              <option value="pizzaria">🍕 PIZZARIA</option>
              <option value="academia">🏋️‍♀️ ACADEMIA</option>
              <option value="construcao">🧱 MAT. CONSTRUÇÃO</option>
              <option value="geral">💼 SERVIÇOS GERAIS</option>
            </select>
          </div>
        </div>

        <div className="flex gap-4 pt-4">
          <Button
            className="flex-1 bg-cyan-500 text-black font-black h-16 rounded-none uppercase tracking-widest hover:bg-white transition-colors"
            onClick={onSubmit}
          >
            <Zap className="w-4 h-4 mr-2" /> INICIAR_SÍNTESE_FINAL
          </Button>
          <Button
            variant="outline"
            className="px-8 border-white/10 text-slate-400 h-16 rounded-none uppercase text-[10px] font-black hover:bg-white/5"
            onClick={onClose}
          >
            CANCELAR
          </Button>
        </div>
      </div>
    </div>
  );
}
