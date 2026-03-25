/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { X, Trash2, ShieldOff, ShieldAlert, RotateCcw, Plus } from "lucide-react";
import type { Lead } from "../../types";

interface BlacklistModalProps {
  isOpen: boolean;
  blacklist: string[];
  quarantinedLeads: Lead[];
  newBlacklistEntry: string;
  setNewBlacklistEntry: (v: string) => void;
  onClose: () => void;
  onAdd: (entry: string) => void;
  onRemove: (entry: string) => void;
  onRecover: (lead: Lead) => void;
  onClearQuarantine: () => void;
}

export default function BlacklistModal({
  isOpen,
  blacklist,
  quarantinedLeads,
  newBlacklistEntry,
  setNewBlacklistEntry,
  onClose,
  onAdd,
  onRemove,
  onRecover,
  onClearQuarantine,
}: BlacklistModalProps) {
  const [tab, setTab] = useState<"blacklist" | "quarantine">("blacklist");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-xl z-[400] flex items-center justify-center p-4">
      <div className="bg-dark-bg border border-red-500/30 w-full max-w-2xl max-h-[90vh] flex flex-col shadow-[0_0_60px_rgba(239,68,68,0.15)] relative">
        {/* Top bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-red-500/20 bg-red-950/10">
          <div className="flex items-center gap-3">
            <ShieldOff className="w-5 h-5 text-red-500" />
            <div>
              <h2 className="text-base font-black text-red-400 uppercase tracking-widest font-mono">
                BLACKLIST_MANAGER
              </h2>
              <p className="text-[9px] text-red-500/50 font-mono uppercase tracking-wider">
                {blacklist.length} tokens bloqueados · {quarantinedLeads.length}{" "}
                na quarentena
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center text-slate-600 hover:text-red-400 hover:bg-red-500/10 transition-all"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-white/5">
          {[
            { key: "blacklist", label: "LISTA NEGRA", icon: ShieldAlert },
            {
              key: "quarantine",
              label: `QUARENTENA (${quarantinedLeads.length})`,
              icon: RotateCcw,
            },
          ].map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key as "blacklist" | "quarantine")}
              className={`flex-1 flex items-center justify-center gap-2 py-3 text-[10px] font-black uppercase tracking-widest font-mono transition-all ${
                tab === t.key
                  ? "text-red-400 border-b-2 border-red-500 bg-red-950/10"
                  : "text-slate-600 hover:text-slate-400"
              }`}
            >
              <t.icon className="w-3 h-3" />
              {t.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {tab === "blacklist" && (
            <div className="p-6 space-y-4">
              {/* Add new */}
              <div className="flex gap-2">
                <input
                  value={newBlacklistEntry}
                  onChange={(e) => setNewBlacklistEntry(e.target.value)}
                  onKeyDown={(e) =>
                    e.key === "Enter" && onAdd(newBlacklistEntry)
                  }
                  placeholder="ex: booking.com, trivago..."
                  className="flex-1 bg-black/60 border border-white/10 px-4 py-2 text-[11px] text-white font-mono focus:outline-none focus:border-red-400/50 placeholder:text-slate-700 h-10"
                />
                <button
                  onClick={() => onAdd(newBlacklistEntry)}
                  className="w-10 h-10 flex items-center justify-center bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20 transition-all"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {/* List */}
              <div className="space-y-1">
                {blacklist.map((entry) => (
                  <div
                    key={entry}
                    className="flex items-center justify-between px-4 py-2 bg-white/[0.02] border border-white/5 group hover:border-red-500/20 transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 bg-red-500 flex-shrink-0" />
                      <span className="text-[11px] font-mono text-slate-400 group-hover:text-white transition-colors">
                        {entry}
                      </span>
                    </div>
                    <button
                      onClick={() => onRemove(entry)}
                      className="w-6 h-6 flex items-center justify-center text-slate-700 hover:text-red-400 hover:bg-red-500/10 opacity-0 group-hover:opacity-100 transition-all"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                ))}
                {blacklist.length === 0 && (
                  <div className="text-center py-10 text-slate-700 text-[11px] font-mono uppercase tracking-widest">
                    Blacklist vazia — nenhum domínio bloqueado
                  </div>
                )}
              </div>
            </div>
          )}

          {tab === "quarantine" && (
            <div className="p-6 space-y-4">
              {quarantinedLeads.length > 0 && (
                <div className="flex justify-end">
                  <button
                    onClick={onClearQuarantine}
                    className="text-[9px] font-black font-mono uppercase tracking-widest text-slate-600 hover:text-red-400 flex items-center gap-1 transition-colors"
                  >
                    <Trash2 className="w-3 h-3" /> LIMPAR TUDO
                  </button>
                </div>
              )}
              <div className="space-y-2">
                {quarantinedLeads.map((lead, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between px-4 py-3 bg-white/[0.02] border border-white/5 group hover:border-amber-500/20 transition-all gap-3"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="text-[11px] font-bold text-slate-300 truncate">
                        {lead.title || "Sem título"}
                      </p>
                      <p className="text-[9px] font-mono text-slate-600 truncate mt-0.5">
                        {lead.url || "—"}
                      </p>
                      <span className="inline-block mt-1 text-[8px] font-black uppercase tracking-wider text-amber-500/70 bg-amber-500/10 px-2 py-0.5">
                        {lead.blockedReason || "Bloqueado"}
                      </span>
                    </div>
                    <button
                      onClick={() => onRecover(lead)}
                      className="flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 text-[9px] font-black font-mono uppercase tracking-wider text-cyan-400 border border-cyan-400/20 hover:bg-cyan-400/10 hover:border-cyan-400 transition-all"
                    >
                      <RotateCcw className="w-3 h-3" /> RECUPERAR
                    </button>
                  </div>
                ))}
                {quarantinedLeads.length === 0 && (
                  <div className="text-center py-10 text-slate-700 text-[11px] font-mono uppercase tracking-widest">
                    Nenhum lead na quarentena
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Bottom bar */}
        <div className="px-6 py-4 border-t border-white/5 bg-black/20 flex justify-between items-center">
          <p className="text-[9px] font-mono text-slate-700 uppercase tracking-widest">
            Alterações salvas automaticamente no localStorage
          </p>
          <button
            onClick={onClose}
            className="text-[10px] font-black font-mono uppercase tracking-widest text-slate-500 hover:text-white transition-colors px-4 py-2"
          >
            FECHAR
          </button>
        </div>
      </div>
    </div>
  );
}
