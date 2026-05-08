import { Heart, ArrowRight } from "lucide-react";

type WelcomeStepProps = {
  onStart: () => void;
  recentResults?: { id: string; score: number }[];
};

export default function WelcomeStep({ onStart, recentResults }: WelcomeStepProps) {
  return (
    <div className="text-center space-y-8 py-12">
      <div className="inline-flex p-4 bg-accent/10 rounded-3xl mb-4">
        <Heart className="w-12 h-12 text-accent fill-accent" />
      </div>
      <h1 className="text-5xl font-black text-white tracking-tighter">
        COSMIC <span className="text-accent">MATCH</span>
      </h1>
      <p className="text-zinc-400 text-lg max-w-sm mx-auto">
        Ready to find your celestial alignment? Step into the cosmic analyzer.
      </p>
      <button
        onClick={onStart}
        className="w-full py-6 bg-white text-black rounded-2xl font-black text-xl hover:bg-accent hover:text-white transition-all flex items-center justify-center gap-3"
      >
        Start Analysis <ArrowRight className="w-6 h-6" />
      </button>

      {/* Mini History Preview */}
      <div className="pt-8 border-t border-white/5">
        <p className="text-[10px] font-black uppercase tracking-widest text-zinc-600 mb-4">
          Recent Discoveries
        </p>
        <div className="flex justify-center gap-2">
          {recentResults?.slice(0, 3).map((r: { id: string; score: number }) => (
            <div
              key={r.id}
              className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[10px] font-bold"
            >
              {r.score}%
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
