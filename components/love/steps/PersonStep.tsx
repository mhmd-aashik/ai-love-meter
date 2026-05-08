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
    <div className="space-y-8">
      <Header step={step} total={total} title={title} subtitle={subtitle} />
      
      <div className="space-y-6">
        <div className="space-y-2">
          <Label className="font-black uppercase tracking-widest text-muted-foreground text-[10px] ml-1">Full Name</Label>
          <div className="relative">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Enter name"
              value={person.name}
              onChange={(e) => setPerson({ ...person, name: e.target.value })}
              className="h-14 pl-12 rounded-lg bg-white/5 border-white/10 focus:border-primary/50 transition-all"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="font-black uppercase tracking-widest text-muted-foreground text-[10px] ml-1">Age</Label>
            <div className="relative">
              <Hash className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                type="number"
                placeholder="Age"
                value={person.age || ""}
                onChange={(e) => setPerson({ ...person, age: Number(e.target.value) })}
                className="h-14 pl-12 rounded-lg bg-white/5 border-white/10 focus:border-primary/50 transition-all"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label className="font-black uppercase tracking-widest text-muted-foreground text-[10px] ml-1">Fav Number</Label>
            <div className="relative">
              <Hash className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                type="number"
                placeholder="0-99"
                value={person.favoriteNumber || ""}
                onChange={(e) => setPerson({ ...person, favoriteNumber: Number(e.target.value) })}
                className="h-14 pl-12 rounded-lg bg-white/5 border-white/10 focus:border-primary/50 transition-all"
              />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label className="font-black uppercase tracking-widest text-muted-foreground text-[10px] ml-1">Major Hobby</Label>
          <div className="relative">
            <Heart className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="e.g. Photography, Gaming"
              value={person.hobby}
              onChange={(e) => setPerson({ ...person, hobby: e.target.value })}
              className="h-14 pl-12 rounded-lg bg-white/5 border-white/10 focus:border-primary/50 transition-all"
            />
          </div>
        </div>
      </div>

      <div className="flex gap-4 pt-4">
        <Button
          variant="secondary"
          size="icon"
          onClick={onPrev}
          className="h-14 w-14 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all"
        >
          <ArrowLeft className="w-6 h-6" />
        </Button>
        <Button
          disabled={!person.name || !person.age}
          onClick={onNext}
          className="flex-1 h-14 rounded-xl font-bold text-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-all shadow-lg"
        >
          Next <ArrowRight className="w-6 h-6 ml-2" />
        </Button>
      </div>
    </div>
  );
}
