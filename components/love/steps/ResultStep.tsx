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
    <div className="text-center space-y-10 py-4 max-w-2xl mx-auto">
      <div className="relative inline-flex items-center justify-center">
        {/* Animated Outer Ring */}
        <div className="absolute inset-0 rounded-full border-2 border-primary/20 animate-[spin_10s_linear_infinite]" />
        
        <div className="w-48 h-48 rounded-full border-[12px] border-white/5 flex items-center justify-center relative bg-black/40 backdrop-blur-md shadow-[0_0_60px_rgba(var(--primary),0.2)]">
          <span className="text-7xl font-black text-white tracking-tighter">{results.score}%</span>
        </div>
        
        <motion.div
          initial={{ scale: 0, rotate: -45 }}
          animate={{ scale: 1, rotate: 0 }}
          className="absolute -top-3 -right-3 w-16 h-16 bg-primary rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(var(--primary),0.6)] border-4 border-black"
        >
          <Zap className="w-8 h-8 text-primary-foreground fill-current" />
        </motion.div>
      </div>

      <div className="space-y-4">
        <h2 className="text-4xl font-black text-primary uppercase tracking-[0.25em] drop-shadow-[0_0_15px_rgba(var(--primary),0.4)]">
          {results.status}
        </h2>
        <p className="text-zinc-200 text-xl md:text-2xl font-medium italic leading-relaxed px-4">
          &quot;{results.summary}&quot;
        </p>
      </div>

      <div className="space-y-6 text-left">
        {/* Key Strengths - Full Width */}
        <div className="p-6 rounded-[2rem] bg-green-500/10 border border-green-500/20 backdrop-blur-sm shadow-xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-2 h-6 bg-green-500 rounded-full" />
            <span className="text-sm font-black uppercase text-green-400 tracking-[0.2em]">
              Key Strengths
            </span>
          </div>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3 text-sm text-zinc-100 font-medium">
            {results.strengths.map((s: string, i: number) => (
              <li key={i} className="flex gap-3 items-start">
                <span className="text-green-500 font-black mt-0.5">✓</span>
                <span className="leading-snug">{s}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Potential Risks - Full Width */}
        <div className="p-6 rounded-[2rem] bg-amber-500/10 border border-amber-500/20 backdrop-blur-sm shadow-xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-2 h-6 bg-amber-500 rounded-full" />
            <span className="text-sm font-black uppercase text-amber-400 tracking-[0.2em]">
              Potential Risks
            </span>
          </div>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3 text-sm text-zinc-100 font-medium">
            {results.warnings.map((w: string, i: number) => (
              <li key={i} className="flex gap-3 items-start">
                <span className="text-amber-500 font-black mt-0.5">!</span>
                <span className="leading-snug">{w}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="p-8 bg-primary/5 border border-primary/10 rounded-[2rem] text-primary text-base md:text-lg font-bold italic shadow-inner">
        &quot;{results.funnyLine}&quot;
      </div>

      <div className="flex gap-4 pt-6">
        <button
          onClick={onReset}
          className="flex-1 py-6 rounded-2xl glass text-white font-bold hover:bg-white/10 transition-all flex items-center justify-center gap-3 border border-white/5"
        >
          <RefreshCcw className="w-6 h-6 opacity-70" /> Try Again
        </button>
        <button className="flex-1 py-6 rounded-2xl bg-white text-black font-black uppercase tracking-[0.2em] hover:scale-[1.02] transition-all flex items-center justify-center gap-3 shadow-2xl">
          <Check className="w-7 h-7" /> Finish
        </button>
      </div>
    </div>
  );
}
