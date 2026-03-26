"use client";

import React from "react";
import { Target, X, Zap } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { NICHE_CONFIG } from "../../types";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  nicho: string;
  setNicho: (val: string) => void;
  estado: string;
  setEstado: (val: string) => void;
  cidade: string;
  handleCidadeChange: (val: string) => void;
  cidadesList: { nome: string; id: string | number }[];
  bairro: string;
  setBairro: (val: string) => void;
  bairrosList: { nome: string }[];
  isDeepScan: boolean;
  setIsDeepScan: (val: boolean) => void;
  customBairro: string;
  setCustomBairro: (val: string) => void;
  searchMode: "web" | "maps";
  setSearchMode: (val: "web" | "maps") => void;
  minReviewsCount: number;
  setMinReviewsCount: (val: number) => void;
  numResults: number;
  setNumResults: (val: number) => void;
  mapsLink: string;
  setMapsLink: (val: string) => void;
  onStartSearch: () => void;
}

const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  nicho,
  setNicho,
  estado,
  setEstado,
  cidade,
  handleCidadeChange,
  cidadesList,
  bairro,
  setBairro,
  bairrosList,
  isDeepScan,
  setIsDeepScan,
  customBairro,
  setCustomBairro,
  searchMode,
  setSearchMode,
  minReviewsCount,
  setMinReviewsCount,
  numResults,
  setNumResults,
  mapsLink,
  setMapsLink,
  onStartSearch,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-150 flex items-center justify-center p-4">
      <Card className="bg-[#0f172a] border border-cyan-500/30 rounded-none w-full max-w-lg overflow-hidden relative shadow-[0_0_50px_rgba(6,182,212,0.15)]">
        <div className="absolute top-0 left-0 w-full h-1 bg-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.5)]" />
        <CardHeader className="p-6 border-b border-white/5 bg-white/2">
          <div className="flex justify-between items-center">
            <CardTitle className="text-xl font-black italic text-white uppercase tracking-tighter flex items-center gap-3">
              <Target className="w-5 h-5 text-cyan-500" />
              INITIATE_SCANNER
            </CardTitle>
            <button
              onClick={onClose}
              className="text-slate-500 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <div className="space-y-4">
            {/* NOVO: CAMPO DE LINK DIRETO (EXTRAÇÃO TÁTICA) */}
            <div className="space-y-2 pb-2 border-b border-white/5">
              <label className="text-[9px] font-black text-pink-500 uppercase tracking-widest pl-1">
                EXTRAÇÃO DIRETA (Link do Google Maps / Link Curto)
              </label>
              <Input
                value={mapsLink}
                onChange={(e) => setMapsLink(e.target.value)}
                placeholder="https://maps.app.goo.gl/..."
                className="bg-pink-500/5 border border-pink-500/20 rounded-none h-12 text-xs font-bold text-white focus:border-pink-500 focus:ring-1 focus:ring-pink-500 transition-all font-mono placeholder:text-pink-500/20"
              />
              <p className="text-[7px] text-slate-500 font-bold uppercase tracking-tighter pl-1">
                Use para extrair dados instantâneos de um alvo específico que o scanner não detectou.
              </p>
            </div>

            <div className="space-y-2">
              <label className="text-[9px] font-black text-cyan-500 uppercase tracking-widest pl-1">
                Nicho Alvo (Sistemas Locais)
              </label>
              <select
                value={nicho}
                onChange={(e) => setNicho(e.target.value)}
                disabled={!!mapsLink}
                className="w-full bg-black/40 border border-cyan-500/20 rounded-none h-12 text-xs font-bold text-white uppercase p-3 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all font-mono disabled:opacity-20"
              >
                <option value="" className="bg-[#0f172a] text-cyan-400">
                  SELECIONE O ALVO DA EXTRAÇÃO...
                </option>
                {Object.entries(NICHE_CONFIG).map(([key, cfg]) => (
                  <option key={key} value={key} className="bg-[#0f172a] text-cyan-400">
                    {cfg.emoji} {key.toUpperCase()}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[9px] font-black text-cyan-500 uppercase tracking-widest pl-1">
                  Estado (UF)
                </label>
                <select
                  value={estado}
                  onChange={(e) => setEstado(e.target.value)}
                  className="w-full bg-black/40 border border-cyan-500/20 rounded-none h-12 text-xs font-bold text-white uppercase p-3 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all font-mono disabled:opacity-20"
                >
                  <option value="" className="bg-[#0f172a] text-cyan-400">
                    UF...
                  </option>
                  {[
                    "AC", "AL", "AM", "AP", "BA", "CE", "DF", "ES", "GO", "MA",
                    "MG", "MS", "MT", "PA", "PB", "PE", "PI", "PR", "RJ", "RN",
                    "RO", "RR", "RS", "SC", "SE", "SP", "TO",
                  ].map((uf) => (
                    <option key={uf} value={uf} className="bg-[#0f172a] text-cyan-400">
                      {uf}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[9px] font-black text-cyan-500 uppercase tracking-widest pl-1">
                  Cidade Alvo
                </label>
                <select
                  value={cidade}
                  onChange={(e) => handleCidadeChange(e.target.value)}
                  className="w-full bg-black/40 border border-cyan-500/20 rounded-none h-12 text-xs font-bold text-white uppercase p-3 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all font-mono disabled:opacity-20"
                >
                  <option value="" className="bg-[#0f172a] text-cyan-400">
                    SELECIONE A CIDADE...
                  </option>
                  {cidadesList.map((c: { nome: string; id: string | number }) => (
                    <option key={c.id} value={c.nome} className="bg-[#0f172a] text-cyan-400">
                      {c.nome}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center mb-1">
                <label className="text-[9px] font-black text-cyan-500 uppercase tracking-widest pl-1">
                  Bairro (Localização Geográfica)
                </label>
                <div className="flex items-center gap-2">
                  <span className="text-[8px] font-black text-pink-500 uppercase font-mono">
                    Deep Scan Mode
                  </span>
                  <input
                    type="checkbox"
                    checked={isDeepScan}
                    onChange={(e) => setIsDeepScan(e.target.checked)}
                    className="w-3 h-3 accent-pink-500"
                  />
                </div>
              </div>
              <select
                value={bairro}
                onChange={(e) => setBairro(e.target.value)}
                disabled={isDeepScan || !cidade}
                className="w-full bg-black/40 border border-cyan-500/20 rounded-none h-12 text-xs font-bold text-white uppercase p-3 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all font-mono disabled:opacity-30"
              >
                <option value="" className="bg-[#0f172a] text-cyan-400">
                  {isDeepScan
                    ? "MODO SCAN TOTAL ATIVADO (Pular Bairro)"
                    : "SELECIONE O BAIRRO (OU GERAL)..."}
                </option>
                {bairrosList.map((b: { nome: string }) => (
                  <option key={b.nome} value={b.nome} className="bg-[#0f172a] text-cyan-400">
                    {b.nome}
                  </option>
                ))}
                {!isDeepScan && cidade && (
                  <option
                    value="OUTRO"
                    className="bg-[#0f172a] text-pink-500 font-black italic"
                  >
                    &gt;&gt;&gt; OUTRO (ESCREVER MANUALMENTE)...
                  </option>
                )}
              </select>
            </div>

            {bairro === "OUTRO" && !isDeepScan && (
              <div className="space-y-2 animate-in slide-in-from-top-2 duration-300">
                <label className="text-[9px] font-black text-pink-500 uppercase tracking-widest pl-1">
                  Digite o Nome do Bairro
                </label>
                <Input
                  value={customBairro}
                  onChange={(e) => setCustomBairro(e.target.value)}
                  placeholder="EX: SAVASSI, CENTRO, ALPHAVILLE..."
                  className="bg-black/40 border border-pink-500/40 rounded-none h-12 text-xs font-bold text-white uppercase focus:border-pink-500 focus:ring-1 focus:ring-pink-500 transition-all font-mono placeholder:text-pink-900/50"
                />
              </div>
            )}

            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-[9px] font-black text-cyan-500 uppercase tracking-widest pl-1">
                  Modo de Varredura
                </label>
                <select
                  value={searchMode}
                  onChange={(e) => setSearchMode(e.target.value as "web" | "maps")}
                  className="w-full bg-black/40 border border-cyan-500/20 rounded-none h-12 text-xs font-bold text-white uppercase p-3 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all font-mono"
                >
                  <option value="web" className="bg-[#0f172a] text-cyan-400">
                    WEB (Multi)
                  </option>
                  <option value="maps" className="bg-[#0f172a] text-cyan-400">
                    MAPS (Local)
                  </option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[9px] font-black text-cyan-500 uppercase tracking-widest pl-1">
                  Mínimo Avaliações
                </label>
                <Input
                  type="number"
                  value={minReviewsCount}
                  onChange={(e) => setMinReviewsCount(Number(e.target.value))}
                  className="bg-black/40 border border-cyan-500/20 rounded-none h-12 text-xs font-bold text-white uppercase focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all font-mono"
                  placeholder="10"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[9px] font-black text-cyan-500 uppercase tracking-widest pl-1">
                  Resultados (Max 100)
                </label>
                <Input
                  type="number"
                  value={numResults}
                  onChange={(e) =>
                    setNumResults(Math.min(100, Math.max(1, Number(e.target.value))))
                  }
                  className="bg-black/40 border border-cyan-500/20 rounded-none h-12 text-xs font-bold text-white uppercase focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all font-mono"
                  placeholder="20"
                />
              </div>
            </div>
          </div>

          <div className="pt-6">
            <Button
              onClick={onStartSearch}
              disabled={!mapsLink && (!nicho || !cidade)}
              className={`w-full ${mapsLink ? 'bg-pink-500 hover:bg-pink-400' : 'bg-cyan-500 hover:bg-cyan-400'} text-black font-black font-mono text-[11px] tracking-[0.2em] rounded-none py-6 uppercase border-none shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:shadow-[0_0_30px_rgba(6,182,212,0.6)] transition-all flex items-center justify-center gap-2`}
            >
              <Zap className="w-5 h-5 fill-black/20" /> 
              {mapsLink ? 'EXECUTAR_EXTRAÇÃO_DIRETA' : 'INICIAR_VARREDURA_TÁTICA'}
            </Button>
            {!mapsLink && (!nicho || !cidade) && (
              <p className="text-[9px] text-red-400 font-mono text-center mt-3 uppercase tracking-widest">
                Preencha Nicho e Cidade para iniciar
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SearchModal;
