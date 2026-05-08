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
    <div className="text-center space-y-6">
      <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-accent to-accent-secondary" />
      <div className="relative inline-flex items-center justify-center">
        <div className="w-40 h-40 rounded-full border-8 border-white/5 flex items-center justify-center">
          <span className="text-5xl font-black text-white">{results.score}%</span>
        </div>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute -top-2 -right-2 w-12 h-12 bg-accent rounded-full flex items-center justify-center shadow-lg"
        >
          <Zap className="w-6 h-6 text-white fill-current" />
        </motion.div>
      </div>

      <div className="space-y-2">
        <h2 className="text-2xl font-black text-accent uppercase tracking-widest">
          {results.status}
        </h2>
        <p className="text-white text-lg font-medium italic">
          &quot;{results.summary}&quot;
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 text-left">
        <div className="p-4 rounded-2xl bg-green-500/5 border border-green-500/10">
          <span className="text-[8px] font-black uppercase text-green-400 block mb-2">
            Strengths
          </span>
          <ul className="text-[10px] text-zinc-400 space-y-1">
            {results.strengths.slice(0, 2).map((s: string, i: number) => (
              <li key={i}>• {s}</li>
            ))}
          </ul>
        </div>
        <div className="p-4 rounded-2xl bg-amber-500/5 border border-amber-500/10">
          <span className="text-[8px] font-black uppercase text-amber-400 block mb-2">
            Warnings
          </span>
          <ul className="text-[10px] text-zinc-400 space-y-1">
            {results.warnings.slice(0, 2).map((w: string, i: number) => (
              <li key={i}>• {w}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="p-6 bg-white/5 rounded-2xl text-zinc-500 text-sm italic">
        &quot;{results.funnyLine}&quot;
      </div>

      <div className="flex gap-4">
        <button
          onClick={onReset}
          className="flex-1 py-5 rounded-2xl glass text-white font-bold hover:bg-white/10 transition-all flex items-center justify-center gap-2"
        >
          <RefreshCcw className="w-5 h-5" /> Reset
        </button>
        <button className="flex-1 py-5 rounded-2xl bg-white text-black font-bold hover:scale-[1.02] transition-all flex items-center justify-center gap-2">
          <Check className="w-5 h-5" /> Done
        </button>
      </div>
    </div>
  );
}
