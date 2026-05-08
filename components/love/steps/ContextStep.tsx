"use client";

import { Heart, Sparkles, Zap, ArrowLeft, Loader2 } from "lucide-react";
import Header from "../Header";
import InputGroup from "../InputGroup";

type ContextStepProps = {
  step: number;
  total: number;
  relationshipType: string;
  setRelationshipType: (val: string) => void;
  extraContext: string;
  setExtraContext: (val: string) => void;
  isPending: boolean;
  onSubmit: () => void;
  onPrev: () => void;
};

export default function ContextStep({
  step,
  total,
  relationshipType,
  setRelationshipType,
  extraContext,
  setExtraContext,
  isPending,
  onSubmit,
  onPrev,
}: ContextStepProps) {
  return (
    <div className="space-y-8">
      <Header
        step={step}
        total={total}
        title="The Vibe"
        subtitle="Setting the celestial context."
      />
      <div className="space-y-6">
        <InputGroup
          label="Relationship Type"
          icon={<Heart className="w-4 h-4" />}
          value={relationshipType}
        >
          <select
            value={relationshipType}
            onChange={(e) => setRelationshipType(e.target.value)}
            className="bg-transparent w-full text-white outline-none [color-scheme:dark]"
          >
            <option>Romantic</option>
            <option>Friends</option>
            <option>Work Colleagues</option>
            <option>Enemies to Lovers</option>
          </select>
        </InputGroup>
        <InputGroup
          label="Extra Context"
          icon={<Sparkles className="w-4 h-4" />}
          value={extraContext}
        >
          <textarea
            placeholder={
              extraContext ? "" : "How did you meet? What's the feeling? (Optional)"
            }
            value={extraContext}
            onChange={(e) => setExtraContext(e.target.value)}
            className="bg-transparent w-full text-white outline-none h-32 resize-none"
          />
        </InputGroup>
      </div>
      <div className="flex gap-4 pt-4">
        <button
          onClick={onPrev}
          className="p-6 rounded-2xl glass hover:bg-white/10 text-white transition-all"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <button
          disabled={isPending}
          onClick={onSubmit}
          className="flex-1 py-6 bg-accent text-white rounded-2xl font-black text-xl hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2"
        >
          {isPending ? (
            <Loader2 className="w-6 h-6 animate-spin" />
          ) : (
            <>
              Ignite <Zap className="w-6 h-6 fill-current" />
            </>
          )}
        </button>
      </div>
    </div>
  );
}
