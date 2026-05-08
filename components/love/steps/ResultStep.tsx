"use client";

import { motion } from "framer-motion";
import { Zap, RefreshCcw, Check } from "lucide-react";
import { LoveAiResult } from "@/types/love";

type ResultStepProps = {
  results: LoveAiResult;
  onReset: () => void;
};

export default function ResultStep({ results, onReset }: ResultStepProps) {
  return (
    <div className="text-center space-y-8 py-2">
      <div className="relative inline-flex items-center justify-center">
        {/* Animated Outer Ring */}
        <div className="absolute inset-0 rounded-full border-2 border-primary/20 animate-[spin_10s_linear_infinite]" />
        
        <div className="w-44 h-44 rounded-full border-[10px] border-white/5 flex items-center justify-center relative bg-black/40 backdrop-blur-md shadow-[0_0_50px_rgba(var(--primary),0.15)]">
          <span className="text-6xl font-black text-white tracking-tighter">{results.score}%</span>
        </div>
        
        <motion.div
          initial={{ scale: 0, rotate: -45 }}
          animate={{ scale: 1, rotate: 0 }}
          className="absolute -top-2 -right-2 w-14 h-14 bg-primary rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(var(--primary),0.5)] border-4 border-black"
        >
          <Zap className="w-7 h-7 text-primary-foreground fill-current" />
        </motion.div>
      </div>

      <div className="space-y-3">
        <h2 className="text-3xl font-black text-primary uppercase tracking-[0.2em] drop-shadow-[0_0_10px_rgba(var(--primary),0.3)]">
          {results.status}
        </h2>
        <p className="text-zinc-200 text-xl font-medium italic leading-relaxed max-w-sm mx-auto">
          &quot;{results.summary}&quot;
        </p>
      </div>

      <div className="grid grid-cols-2 gap-5 text-left">
        <div className="p-5 rounded-[1.5rem] bg-green-500/10 border border-green-500/20 backdrop-blur-sm shadow-xl">
          <span className="text-[10px] font-black uppercase text-green-400 tracking-widest block mb-3 opacity-80">
            Key Strengths
          </span>
          <ul className="text-xs text-zinc-100 space-y-2 font-medium">
            {results.strengths.slice(0, 2).map((s: string, i: number) => (
              <li key={i} className="flex gap-2">
                <span className="text-green-500 shrink-0">•</span>
                <span>{s}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="p-5 rounded-[1.5rem] bg-amber-500/10 border border-amber-500/20 backdrop-blur-sm shadow-xl">
          <span className="text-[10px] font-black uppercase text-amber-400 tracking-widest block mb-3 opacity-80">
            Potential Risks
          </span>
          <ul className="text-xs text-zinc-100 space-y-2 font-medium">
            {results.warnings.slice(0, 2).map((w: string, i: number) => (
              <li key={i} className="flex gap-2">
                <span className="text-amber-500 shrink-0">•</span>
                <span>{w}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="p-6 bg-primary/5 border border-primary/10 rounded-[1.5rem] text-primary text-sm font-semibold italic shadow-inner">
        &quot;{results.funnyLine}&quot;
      </div>

      <div className="flex gap-4 pt-4">
        <button
          onClick={onReset}
          className="flex-1 py-5 rounded-2xl glass text-white font-bold hover:bg-white/10 transition-all flex items-center justify-center gap-3 border border-white/5"
        >
          <RefreshCcw className="w-5 h-5 opacity-70" /> Reset
        </button>
        <button className="flex-1 py-5 rounded-2xl bg-white text-black font-black uppercase tracking-widest hover:scale-[1.02] transition-all flex items-center justify-center gap-3 shadow-2xl">
          <Check className="w-6 h-6" /> Done
        </button>
      </div>
    </div>
  );
}
