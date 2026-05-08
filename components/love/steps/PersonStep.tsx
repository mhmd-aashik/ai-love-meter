"use client";

import { User, Calendar, Hash, Moon, ArrowRight, ArrowLeft } from "lucide-react";
import Header from "../Header";
import InputGroup from "../InputGroup";
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
        <InputGroup
          label="Name"
          icon={<User className="w-4 h-4" />}
          value={person.name}
        >
          <input
            placeholder={person.name ? "" : "Enter name..."}
            value={person.name}
            onChange={(e) => setPerson({ ...person, name: e.target.value })}
            className="bg-transparent w-full text-white outline-none"
          />
        </InputGroup>
        <InputGroup
          label="Birthday"
          icon={<Calendar className="w-4 h-4" />}
          value={person.dateOfBirth}
        >
          <input
            type="date"
            value={person.dateOfBirth}
            onChange={(e) => setPerson({ ...person, dateOfBirth: e.target.value })}
            className="bg-transparent w-full text-white outline-none [color-scheme:dark]"
          />
        </InputGroup>
        <div className="grid grid-cols-2 gap-4">
          <InputGroup
            label="Fav #"
            icon={<Hash className="w-4 h-4" />}
            value={person.favoriteNumber}
          >
            <input
              type="number"
              value={person.favoriteNumber}
              onChange={(e) =>
                setPerson({ ...person, favoriteNumber: Number(e.target.value) })
              }
              className="bg-transparent w-full text-white outline-none"
            />
          </InputGroup>
          <InputGroup
            label="Zodiac"
            icon={<Moon className="w-4 h-4" />}
            value={person.zodiacSign}
          >
            <input
              placeholder={person.zodiacSign ? "" : "e.g. Leo"}
              value={person.zodiacSign}
              onChange={(e) => setPerson({ ...person, zodiacSign: e.target.value })}
              className="bg-transparent w-full text-white outline-none"
            />
          </InputGroup>
        </div>
      </div>
      <div className="flex gap-4 pt-4">
        <button
          onClick={onPrev}
          className="p-6 rounded-2xl glass hover:bg-white/10 text-white transition-all"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <button
          disabled={!person.name || !person.dateOfBirth}
          onClick={onNext}
          className="flex-1 py-6 bg-white text-black rounded-2xl font-black text-xl disabled:opacity-30 transition-all flex items-center justify-center gap-2"
        >
          Continue <ArrowRight className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}
