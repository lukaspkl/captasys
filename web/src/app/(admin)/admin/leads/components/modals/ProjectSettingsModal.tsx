"use client";

import React from "react";
import { 
  X, 
  Settings 
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardContent 
} from "@/components/ui/card";
import type { ProjectSettings } from "../../types";

interface ProjectSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectSettings: ProjectSettings;
  setProjectSettings: React.Dispatch<React.SetStateAction<ProjectSettings>>;
}

const ProjectSettingsModal: React.FC<ProjectSettingsModalProps> = ({
  isOpen,
  onClose,
  projectSettings,
  setProjectSettings,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-150 flex items-center justify-center p-4">
      <Card className="bg-[#0f172a] border border-white/10 rounded-none w-full max-w-md overflow-hidden relative shadow-2xl">
        <div className="absolute top-0 left-0 w-full h-1 bg-[#06b6d4] shadow-[0_0_15px_rgba(6,182,212,0.5)]" />
        <CardHeader className="p-6 border-b border-white/5 bg-white/2">
          <div className="flex justify-between items-center">
            <CardTitle className="text-xl font-black italic text-white uppercase tracking-tighter flex items-center gap-3">
              <Settings className="w-5 h-5 text-[#06b6d4]" />
              CONFIG_PROJETO
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
            <div className="space-y-2">
              <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest pl-1">
                Nome do Cliente/Site
              </label>
              <Input
                value={projectSettings.name}
                onChange={(e) =>
                  setProjectSettings((prev: ProjectSettings) => ({
                    ...prev,
                    name: e.target.value,
                  }))
                }
                className="bg-black/40 border-white/10 rounded-none h-12 text-xs font-bold text-white italic uppercase placeholder:text-slate-700"
                placeholder="Ex: Clínica Sorriso"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest pl-1">
                Subdomínio (slug)
              </label>
              <div className="relative">
                <Input
                  value={projectSettings.slug}
                  onChange={(e) =>
                    setProjectSettings((prev: ProjectSettings) => ({
                      ...prev,
                      slug: e.target.value
                        .toLowerCase()
                        .replace(/[^a-z0-9]/g, "-"),
                    }))
                  }
                  className="bg-black/40 border-white/10 rounded-none h-12 text-xs font-bold text-white italic pr-32"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-slate-600 font-black italic">
                  .captasites.com
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest pl-1">
                  WhatsApp Destino
                </label>
                <Input
                  value={projectSettings.whatsapp}
                  onChange={(e) =>
                    setProjectSettings((prev: ProjectSettings) => ({
                      ...prev,
                      whatsapp: e.target.value,
                    }))
                  }
                  className="bg-black/40 border-white/10 rounded-none h-12 text-xs font-bold text-white italic placeholder:text-slate-700 font-mono tracking-widest"
                  placeholder="5511999999999"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProjectSettingsModal;
