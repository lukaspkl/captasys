"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Rocket, ShieldAlert, Target, Zap } from "lucide-react";

/**
 * DOSSIER DESIGN SYSTEM - BASED ON STITCH PROJECTS:
 * - The Neon Architect (Tactical)
 * - The Digital Nocturne (Audit)
 * - The Digital Synth-Wave (Renewal)
 */

interface DossierContainerProps {
  children: React.ReactNode;
  theme: "tactical" | "audit" | "renewal";
  id?: string;
}

export const DossierContainer: React.FC<DossierContainerProps> = ({ children, theme, id }) => {
  const themeStyles = {
    tactical: "bg-[#130b18] border-[#BC13FE]/30 shadow-[0_0_100px_rgba(188,19,254,0.1)]",
    audit: "bg-[#020617] border-[#ff00ff]/30 shadow-[0_0_100px_rgba(255,0,255,0.1)]",
    renewal: "bg-[#0e0e13] border-[#00f4fe]/30 shadow-[0_0_100px_rgba(0,244,254,0.1)]"
  };

  return (
    <div 
      id={id}
      className={cn(
        "w-full max-w-4xl relative border my-0 md:my-auto transition-all duration-500",
        themeStyles[theme],
        "print:bg-white print:border-none print:shadow-none"
      )}
    >
      {/* Top Glow bar based on theme */}
      <div className={cn(
        "h-1 w-full shadow-lg print:hidden",
        theme === "tactical" ? "bg-[#BC13FE]" : theme === "audit" ? "bg-[#ff00ff]" : "bg-[#00f4fe]"
      )} />
      {children}
    </div>
  );
};

export const DossierHeader = ({ 
  title, 
  subtitle, 
  badge, 
  theme 
}: { 
  title: string; 
  subtitle: string; 
  badge: string;
  theme: "tactical" | "audit" | "renewal";
}) => {
  const icon = {
    tactical: <ShieldAlert className="w-8 h-8 text-[#BC13FE]" />,
    audit: <Target className="w-8 h-8 text-[#ff00ff]" />,
    renewal: <Rocket className="w-8 h-8 text-[#00f4fe]" />
  };

  const badgeColor = {
    tactical: "bg-[#BC13FE] text-black",
    audit: "bg-[#ff00ff] text-white",
    renewal: "bg-[#00f4fe] text-black"
  };

  return (
    <div className="p-10 border-b border-white/5 bg-black/40 flex flex-col gap-6 print:bg-white print:border-b-2 print:border-gray-100">
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-6">
          <div className={cn(
            "w-16 h-16 flex items-center justify-center border print:border-current",
            theme === "tactical" ? "bg-[#BC13FE]/10 border-[#BC13FE]/20" : 
            theme === "audit" ? "bg-[#ff00ff]/10 border-[#ff00ff]/20" : 
            "bg-[#00f4fe]/10 border-[#00f4fe]/20"
          )}>
            {icon[theme]}
          </div>
          <div>
            <h2 className={cn(
              "text-[10px] font-black uppercase tracking-[0.4em] italic mb-1",
              theme === "tactical" ? "text-[#BC13FE]" : theme === "audit" ? "text-[#ff00ff]" : "text-[#00f4fe]"
            )}>
              Protocolo de Inteligência // v5.4
            </h2>
            <h1 className="text-4xl font-black text-white print:text-black uppercase tracking-tighter italic leading-none">
              {title}
            </h1>
          </div>
        </div>
        
        <div className={cn(
          "px-3 py-1 text-[8px] font-black uppercase italic tracking-widest",
          badgeColor[theme]
        )}>
          {badge}
        </div>
      </div>

      <div className="flex justify-between items-end pt-4 border-t border-white/5">
        <div>
          <label className="text-[9px] text-slate-500 font-black uppercase tracking-widest">Entidade Alvo</label>
          <h3 className="text-xl font-bold text-white print:text-black uppercase italic">{subtitle}</h3>
        </div>
      </div>
    </div>
  );
};

export const DossierSectionHeader = ({ 
  icon: Icon, 
  title, 
  theme 
}: { 
  icon: any; 
  title: string; 
  theme: "tactical" | "audit" | "renewal";
}) => (
  <div className="flex items-center gap-4">
    <Icon className={cn(
      "w-6 h-6",
      theme === "tactical" ? "text-[#BC13FE]" : theme === "audit" ? "text-[#ff00ff]" : "text-[#00f4fe]"
    )} />
    <h3 className="text-xs font-black text-white print:text-black uppercase tracking-widest italic">{title}</h3>
  </div>
);

export const DossierCard = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <div className={cn(
    "bg-white/5 border border-white/10 p-6 relative overflow-hidden transition-all hover:bg-white/10 print:bg-gray-50 print:border-gray-200",
    className
  )}>
    {children}
  </div>
);

export const DossierGlowCard = ({ 
  title, 
  value, 
  label, 
  theme,
  isCritical = false
}: { 
  title: string; 
  value: string; 
  label: string; 
  theme: "tactical" | "audit" | "renewal";
  isCritical?: boolean;
}) => {
  const styles = {
    tactical: "bg-[#BC13FE]/5 border-[#BC13FE]/20 text-[#BC13FE]",
    audit: "bg-[#ff00ff]/5 border-[#ff00ff]/20 text-[#ff00ff]",
    renewal: "bg-[#00f4fe]/5 border-[#00f4fe]/20 text-[#00f4fe]"
  };

  return (
    <div className={cn(
      "p-8 border relative overflow-hidden print:bg-gray-50 print:border-gray-200",
      isCritical ? "bg-rose-500/5 border-rose-500/20" : styles[theme]
    )}>
      <p className={cn(
        "text-[10px] font-bold uppercase tracking-wider mb-2",
        isCritical ? "text-rose-400" : styles[theme]
      )}>{title}</p>
      <p className="text-4xl font-black text-white print:text-black tracking-tighter mb-4">
        {value}
      </p>
      <div className="h-px bg-white/10 w-full mb-4" />
      <p className="text-[11px] text-slate-500 italic font-medium leading-relaxed">
        &ldquo;{label}&rdquo;
      </p>
    </div>
  );
};
