"use client";

import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Sparkles, History, Send, Loader2, RefreshCcw, AlertTriangle, CheckCircle2 } from "lucide-react";
import {
  graphqlRequest,
  ANALYZE_LOVE_MUTATION,
  GET_RECENT_RESULTS_QUERY,
} from "@/lib/graphql-client";

type PersonForm = {
  name: string;
  dateOfBirth: string;
  favoriteNumber: number;
  favoriteColor: string;
  zodiacSign: string;
};

const initialPerson: PersonForm = {
  name: "",
  dateOfBirth: "",
  favoriteNumber: 7,
  favoriteColor: "",
  zodiacSign: "",
};

export default function LoveMeter() {
  const queryClient = useQueryClient();
  const [personA, setPersonA] = useState<PersonForm>({ ...initialPerson });
  const [personB, setPersonB] = useState<PersonForm>({ ...initialPerson });
  const [relationshipType, setRelationshipType] = useState("Romantic");
  const [extraContext, setExtraContext] = useState("");
  const [showResult, setShowResult] = useState(false);

  const { data: recentData, isLoading: isLoadingRecent } = useQuery({
    queryKey: ["recentResults"],
    queryFn: () => graphqlRequest(GET_RECENT_RESULTS_QUERY, { limit: 5 }),
  });

  const mutation = useMutation({
    mutationFn: (variables: Record<string, unknown>) => graphqlRequest(ANALYZE_LOVE_MUTATION, variables),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["recentResults"] });
      setShowResult(true);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate({
      personA: { ...personA, favoriteNumber: Number(personA.favoriteNumber) },
      personB: { ...personB, favoriteNumber: Number(personB.favoriteNumber) },
      relationshipType,
      extraContext,
    });
  };

  const handleReset = () => {
    setShowResult(false);
    mutation.reset();
  };

  const results = mutation.data?.analyzeLove;

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Main Analysis Section */}
      <div className="lg:col-span-2 space-y-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-zinc-900 rounded-3xl p-8 shadow-2xl border border-pink-100 dark:border-pink-900/30 overflow-hidden relative"
        >
          {/* Background Decoration */}
          <div className="absolute top-0 right-0 -mt-20 -mr-20 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

          <header className="relative z-10 text-center mb-10">
            <div className="inline-flex items-center justify-center p-3 bg-pink-50 dark:bg-pink-950/30 rounded-2xl mb-4">
              <Heart className="w-8 h-8 text-pink-500 fill-pink-500" />
            </div>
            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-600">
              AI Love Meter
            </h1>
            <p className="text-zinc-500 dark:text-zinc-400 mt-2">
              Discover your cosmic compatibility powered by Gemini AI
            </p>
          </header>

          <AnimatePresence mode="wait">
            {!showResult ? (
              <motion.form 
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit} 
                className="space-y-10 relative z-10"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Person A */}
                  <div className="space-y-4 p-6 bg-pink-50/50 dark:bg-pink-950/10 rounded-2xl border border-pink-100 dark:border-pink-900/20">
                    <h3 className="text-lg font-semibold text-pink-600 dark:text-pink-400 flex items-center gap-2">
                      <Sparkles className="w-4 h-4" /> Person One
                    </h3>
                    <div className="space-y-3">
                      <input
                        placeholder="Full Name"
                        className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 focus:ring-2 focus:ring-pink-500 outline-none transition-all"
                        value={personA.name}
                        onChange={e => setPersonA({...personA, name: e.target.value})}
                        required
                      />
                      <input
                        type="date"
                        className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 focus:ring-2 focus:ring-pink-500 outline-none transition-all"
                        value={personA.dateOfBirth}
                        onChange={e => setPersonA({...personA, dateOfBirth: e.target.value})}
                        required
                      />
                      <div className="grid grid-cols-2 gap-3">
                        <input
                          type="number"
                          placeholder="Fav Number"
                          className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 focus:ring-2 focus:ring-pink-500 outline-none transition-all"
                          value={personA.favoriteNumber}
                          onChange={e => setPersonA({...personA, favoriteNumber: Number(e.target.value)})}
                        />
                        <input
                          placeholder="Zodiac Sign"
                          className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 focus:ring-2 focus:ring-pink-500 outline-none transition-all"
                          value={personA.zodiacSign}
                          onChange={e => setPersonA({...personA, zodiacSign: e.target.value})}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Person B */}
                  <div className="space-y-4 p-6 bg-purple-50/50 dark:bg-purple-950/10 rounded-2xl border border-purple-100 dark:border-purple-900/20">
                    <h3 className="text-lg font-semibold text-purple-600 dark:text-purple-400 flex items-center gap-2">
                      <Sparkles className="w-4 h-4" /> Person Two
                    </h3>
                    <div className="space-y-3">
                      <input
                        placeholder="Full Name"
                        className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 focus:ring-2 focus:ring-purple-500 outline-none transition-all"
                        value={personB.name}
                        onChange={e => setPersonB({...personB, name: e.target.value})}
                        required
                      />
                      <input
                        type="date"
                        className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 focus:ring-2 focus:ring-purple-500 outline-none transition-all"
                        value={personB.dateOfBirth}
                        onChange={e => setPersonB({...personB, dateOfBirth: e.target.value})}
                        required
                      />
                      <div className="grid grid-cols-2 gap-3">
                        <input
                          type="number"
                          placeholder="Fav Number"
                          className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 focus:ring-2 focus:ring-purple-500 outline-none transition-all"
                          value={personB.favoriteNumber}
                          onChange={e => setPersonB({...personB, favoriteNumber: Number(e.target.value)})}
                        />
                        <input
                          placeholder="Zodiac Sign"
                          className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 focus:ring-2 focus:ring-purple-500 outline-none transition-all"
                          value={personB.zodiacSign}
                          onChange={e => setPersonB({...personB, zodiacSign: e.target.value})}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <select 
                    className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 outline-none"
                    value={relationshipType}
                    onChange={e => setRelationshipType(e.target.value)}
                  >
                    <option>Romantic</option>
                    <option>Friends</option>
                    <option>Work Colleagues</option>
                    <option>Enemies to Lovers</option>
                  </select>
                  <textarea
                    placeholder="Extra Context (Optional: How did you meet? What's the vibe?)"
                    className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 h-24 outline-none"
                    value={extraContext}
                    onChange={e => setExtraContext(e.target.value)}
                  />
                </div>

                <button
                  type="submit"
                  disabled={mutation.isPending}
                  className="w-full py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-2xl font-bold text-lg shadow-lg shadow-pink-500/25 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {mutation.isPending ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Analyzing Your Vibe...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Check Compatibility
                    </>
                  )}
                </button>
              </motion.form>
            ) : (
              <motion.div 
                key="result"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-8 relative z-10"
              >
                <div className="text-center space-y-4">
                  <div className="relative inline-block">
                    <svg className="w-48 h-48">
                      <circle
                        cx="96"
                        cy="96"
                        r="88"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="12"
                        className="text-zinc-100 dark:text-zinc-800"
                      />
                      <motion.circle
                        cx="96"
                        cy="96"
                        r="88"
                        fill="none"
                        stroke="url(#gradient)"
                        strokeWidth="12"
                        strokeDasharray="552.92"
                        initial={{ strokeDashoffset: 552.92 }}
                        animate={{ strokeDashoffset: 552.92 - (552.92 * (results?.score || 0)) / 100 }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        strokeLinecap="round"
                        className="transform -rotate-90 origin-center"
                      />
                      <defs>
                        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#ec4899" />
                          <stop offset="100%" stopColor="#8b5cf6" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-5xl font-black text-zinc-900 dark:text-white">{results?.score}%</span>
                      <span className="text-sm font-medium text-pink-500 uppercase tracking-widest">{results?.status}</span>
                    </div>
                  </div>
                  
                  <div className="max-w-lg mx-auto">
                    <p className="text-xl font-medium italic text-zinc-700 dark:text-zinc-300">
                      &quot;{results?.summary}&quot;
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-5 bg-green-50 dark:bg-green-900/10 rounded-2xl border border-green-100 dark:border-green-900/20">
                    <h4 className="text-green-600 font-bold mb-3 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4" /> Strengths
                    </h4>
                    <ul className="space-y-2">
                      {results?.strengths.map((s: string, i: number) => (
                        <li key={i} className="text-sm text-zinc-600 dark:text-zinc-400">• {s}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="p-5 bg-amber-50 dark:bg-amber-900/10 rounded-2xl border border-amber-100 dark:border-amber-900/20">
                    <h4 className="text-amber-600 font-bold mb-3 flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4" /> Red Flags?
                    </h4>
                    <ul className="space-y-2">
                      {results?.warnings.map((w: string, i: number) => (
                        <li key={i} className="text-sm text-zinc-600 dark:text-zinc-400">• {w}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="p-6 bg-zinc-50 dark:bg-zinc-800/50 rounded-2xl text-center italic text-zinc-500">
                  &quot;{results?.funnyLine}&quot;
                </div>

                <button
                  onClick={handleReset}
                  className="w-full py-4 border-2 border-zinc-200 dark:border-zinc-800 rounded-2xl font-bold text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-all flex items-center justify-center gap-2"
                >
                  <RefreshCcw className="w-5 h-5" />
                  Try Another Match
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Sidebar - Recent Results */}
      <div className="space-y-6">
        <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 shadow-xl border border-zinc-100 dark:border-zinc-800">
          <h3 className="text-lg font-bold flex items-center gap-2 mb-6 text-zinc-800 dark:text-white">
            <History className="w-5 h-5 text-pink-500" /> Recent Vibes
          </h3>
          
          <div className="space-y-4">
            {isLoadingRecent ? (
              [1, 2, 3].map(i => (
                <div key={i} className="h-16 bg-zinc-100 dark:bg-zinc-800 rounded-2xl animate-pulse" />
              ))
            ) : (
              recentData?.getRecentResults.map((res: { id: string; personAName: string; personBName: string; status: string; score: number }) => (
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  key={res.id} 
                  className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors group cursor-default"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-zinc-800 dark:text-zinc-200">
                        {res.personAName} & {res.personBName}
                      </span>
                      <span className="text-xs text-zinc-500">{res.status}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-lg font-black text-pink-500">{res.score}%</span>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </div>

        <div className="p-6 bg-gradient-to-br from-pink-500 to-purple-600 rounded-3xl text-white shadow-xl relative overflow-hidden group">
          <Heart className="absolute -bottom-4 -right-4 w-24 h-24 opacity-20 group-hover:scale-110 transition-transform" />
          <h4 className="font-bold text-lg mb-2">Upgrade Your Love Life</h4>
          <p className="text-pink-100 text-sm leading-relaxed">
            Our AI analysis is based on cosmic alignment and name vibrations. Always follow your heart!
          </p>
        </div>
      </div>
    </div>
  );
}
