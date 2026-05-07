"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { RocketLaunch } from "@phosphor-icons/react";

export function DeveloperBadge() {
  return (
    <div className="flex flex-col items-center gap-2 shrink-0">
      <span className="text-[10px] font-mono text-white/20 uppercase tracking-[0.2em]">
        Desenvolvido por:
      </span>
      <Link
        href="https://www.siteprox.com.br"
        target="_blank"
        className="relative group"
      >
        <motion.div
          whileHover="launched"
          whileTap={{ scale: 0.95 }}
          className="relative px-5 py-2.5 bg-white/[0.03] border border-white/5 rounded-xl flex items-center gap-2.5 transition-all duration-300 group-hover:bg-brand/5 group-hover:border-brand/30 group-hover:shadow-[0_0_20px_rgba(56,189,248,0.15)] overflow-hidden"
        >
          {/* ... existing lightning beams ... */}
          <motion.div
            initial={{ x: "-150%", opacity: 0 }}
            variants={{
              launched: {
                x: ["-150%", "250%", "250%", "-150%", "250%"],
                opacity: [0, 1, 0, 0, 1, 0],
                transition: {
                  duration: 0.6,
                  times: [0, 0.2, 0.3, 0.4, 0.6, 0.7],
                  ease: "circOut",
                  repeat: Infinity,
                  repeatDelay: 2,
                },
              },
            }}
            className="absolute inset-x-0 h-full w-2/3 bg-gradient-to-r from-transparent via-brand/60 to-transparent -skew-x-[45deg] pointer-events-none blur-[2px] z-10"
          />

          <motion.div
            initial={{ opacity: 0 }}
            variants={{
              launched: {
                opacity: [0, 1, 0.3, 1, 0],
                transition: {
                  duration: 0.6,
                  repeat: Infinity,
                  repeatDelay: 2,
                },
              },
            }}
            className="absolute inset-0 bg-brand/10 z-20 pointer-events-none"
          />

          <div className="relative z-30 flex items-center gap-2">
            <motion.div
              variants={{
                initial: { x: 0, y: 0, opacity: 1, scale: 1, rotate: 0 },
                launched: {
                  x: 100,
                  y: -100,
                  rotate: 45,
                  opacity: 0,
                  scale: 1.5,
                  transition: { duration: 0.8, ease: "backIn" },
                },
              }}
              initial="initial"
            >
              <RocketLaunch
                size={16}
                weight="fill"
                className="text-white/40 group-hover:text-brand transition-colors drop-shadow-[0_0_8px_rgba(56,189,248,0.5)]"
              />
            </motion.div>

            <span className="text-[11px] font-black tracking-[0.3em] text-white/50 group-hover:text-white transition-all duration-200">
              SITEPROX
            </span>
          </div>

          {/* Electric Spark Particles (CSS Only) */}
          <div className="absolute top-0 left-1/4 w-[1px] h-1 bg-brand opacity-0 group-hover:animate-ping delay-75" />
          <div className="absolute bottom-0 right-1/3 w-[1px] h-1 bg-brand opacity-0 group-hover:animate-ping delay-300" />
        </motion.div>

        {/* Underglow */}
        <div className="absolute inset-0 -z-10 bg-brand/0 group-hover:bg-brand/10 blur-2xl transition-all duration-500 rounded-full" />
      </Link>
    </div>
  );
}
