"use client";

import { User, Hash, Heart, ArrowRight, ArrowLeft } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Header from "../Header";
import { PersonDetails } from "@/types/love";

type PersonStepProps = {
  step: number;
  total: number;
  title: string;
  subtitle: string;
  person: PersonDetails;
  setPerson: (person: PersonDetails) => void;
  onNext: () => void;
  onPrev: () => void;
};

export default function PersonStep({
  step,
  total,
  title,
  subtitle,
  person,
  setPerson,
  onNext,
  onPrev,
}: PersonStepProps) {
  return (
    <div className="space-y-10">
      <Header step={step} total={total} title={title} subtitle={subtitle} />
      
      <div className="space-y-8">
        <div className="space-y-3 group">
          <Label className="font-black uppercase tracking-[0.2em] text-primary/70 text-[10px] ml-2 transition-colors group-focus-within:text-primary">
            Full Name
          </Label>
          <div className="relative">
            <User className="absolute left-5 top-1/2 -translate-y-1/2 text-primary/40 w-5 h-5 transition-colors group-focus-within:text-primary" />
            <Input
              placeholder="Enter name"
              value={person.name}
              onChange={(e) => setPerson({ ...person, name: e.target.value })}
              className="h-16 pl-14 rounded-2xl bg-white/10 border-white/10 text-white placeholder:text-zinc-600 focus:bg-white/[0.15] focus:border-primary/50 focus:ring-0 transition-all text-lg font-medium"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-3 group">
            <Label className="font-black uppercase tracking-[0.2em] text-primary/70 text-[10px] ml-2 transition-colors group-focus-within:text-primary">
              Age
            </Label>
            <div className="relative">
              <Hash className="absolute left-5 top-1/2 -translate-y-1/2 text-primary/40 w-5 h-5 transition-colors group-focus-within:text-primary" />
              <Input
                type="number"
                placeholder="Age"
                value={person.age || ""}
                onChange={(e) => setPerson({ ...person, age: Number(e.target.value) })}
                className="h-16 pl-14 rounded-2xl bg-white/10 border-white/10 text-white placeholder:text-zinc-600 focus:bg-white/[0.15] focus:border-primary/50 focus:ring-0 transition-all text-lg font-medium"
              />
            </div>
          </div>
          <div className="space-y-3 group">
            <Label className="font-black uppercase tracking-[0.2em] text-primary/70 text-[10px] ml-2 transition-colors group-focus-within:text-primary">
              Fav Number
            </Label>
            <div className="relative">
              <Hash className="absolute left-5 top-1/2 -translate-y-1/2 text-primary/40 w-5 h-5 transition-colors group-focus-within:text-primary" />
              <Input
                type="number"
                placeholder="0-99"
                value={person.favoriteNumber || ""}
                onChange={(e) => setPerson({ ...person, favoriteNumber: Number(e.target.value) })}
                className="h-16 pl-14 rounded-2xl bg-white/10 border-white/10 text-white placeholder:text-zinc-600 focus:bg-white/[0.15] focus:border-primary/50 focus:ring-0 transition-all text-lg font-medium"
              />
            </div>
          </div>
        </div>

        <div className="space-y-3 group">
          <Label className="font-black uppercase tracking-[0.2em] text-primary/70 text-[10px] ml-2 transition-colors group-focus-within:text-primary">
            Major Hobby
          </Label>
          <div className="relative">
            <Heart className="absolute left-5 top-1/2 -translate-y-1/2 text-red-500 fill-red-500 w-5 h-5 transition-all group-focus-within:scale-110 group-focus-within:drop-shadow-[0_0_8px_rgba(239,68,68,0.5)]" />
            <Input
              placeholder="e.g. Photography, Gaming"
              value={person.hobby}
              onChange={(e) => setPerson({ ...person, hobby: e.target.value })}
              className="h-16 pl-14 rounded-2xl bg-white/10 border-white/10 text-white placeholder:text-zinc-600 focus:bg-white/[0.15] focus:border-primary/50 focus:ring-0 transition-all text-lg font-medium"
            />
          </div>
        </div>
      </div>

      <div className="flex gap-4 pt-6">
        <Button
          variant="secondary"
          size="icon"
          onClick={onPrev}
          className="h-16 w-16 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all group"
        >
          <ArrowLeft className="w-7 h-7 text-white opacity-50 group-hover:opacity-100 transition-opacity" />
        </Button>
        <Button
          disabled={!person.name || !person.age}
          onClick={onNext}
          className="flex-1 h-16 rounded-2xl font-black text-xl uppercase tracking-widest bg-primary text-primary-foreground hover:bg-primary/90 transition-all shadow-[0_0_30px_rgba(var(--primary),0.3)] border-none"
        >
          Next <ArrowRight className="w-7 h-7 ml-3" />
        </Button>
      </div>
    </div>
  );
}
