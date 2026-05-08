"use client";

import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AnimatePresence } from "framer-motion";
import {
  graphqlRequest,
  ANALYZE_LOVE_MUTATION,
  GET_RECENT_RESULTS_QUERY,
} from "@/lib/graphql-client";
import { PersonDetails } from "@/types/love";

// Components
import StepCard from "./love/StepCard";
import WelcomeStep from "./love/steps/WelcomeStep";
import PersonStep from "./love/steps/PersonStep";
import ContextStep from "./love/steps/ContextStep";
import ResultStep from "./love/steps/ResultStep";

const initialPerson: PersonDetails = {
  name: "",
  dateOfBirth: "",
  favoriteNumber: 7,
  favoriteColor: "",
  zodiacSign: "",
};

type Step = "welcome" | "personA" | "personB" | "context" | "result";

export default function LoveMeter() {
  const queryClient = useQueryClient();
  const [step, setStep] = useState<Step>("welcome");
  const [personA, setPersonA] = useState<PersonDetails>({ ...initialPerson });
  const [personB, setPersonB] = useState<PersonDetails>({ ...initialPerson });
  const [relationshipType, setRelationshipType] = useState("Romantic");
  const [extraContext, setExtraContext] = useState("");
  const [direction, setDirection] = useState(0);

  const { data: recentData } = useQuery({
    queryKey: ["recentResults"],
    queryFn: () => graphqlRequest(GET_RECENT_RESULTS_QUERY, { limit: 5 }),
  });

  const mutation = useMutation({
    mutationFn: (variables: Record<string, unknown>) =>
      graphqlRequest(ANALYZE_LOVE_MUTATION, variables),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["recentResults"] });
      setStep("result");
    },
  });

  const nextStep = (next: Step) => {
    setDirection(1);
    setStep(next);
  };

  const prevStep = (prev: Step) => {
    setDirection(-1);
    setStep(prev);
  };

  const handleSubmit = () => {
    mutation.mutate({
      personA: { ...personA, favoriteNumber: Number(personA.favoriteNumber) },
      personB: { ...personB, favoriteNumber: Number(personB.favoriteNumber) },
      relationshipType,
      extraContext,
    });
  };

  const handleReset = () => {
    setPersonA({ ...initialPerson });
    setPersonB({ ...initialPerson });
    setRelationshipType("Romantic");
    setExtraContext("");
    setStep("welcome");
    mutation.reset();
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      rotate: direction > 0 ? 10 : -10,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      rotate: 0,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      rotate: direction < 0 ? 10 : -10,
    }),
  };

  return (
    <div className="h-full w-full flex items-center justify-center relative overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute inset-0 z-0 flex items-center justify-center opacity-30 pointer-events-none">
        <div className="w-[800px] h-[800px] bg-accent/20 rounded-full blur-[120px] animate-pulse" />
      </div>

      <AnimatePresence custom={direction} mode="wait">
        {step === "welcome" && (
          <StepCard key="welcome" variants={variants} direction={direction}>
            <WelcomeStep
              onStart={() => nextStep("personA")}
              recentResults={recentData?.getRecentResults}
            />
          </StepCard>
        )}

        {step === "personA" && (
          <StepCard key="personA" variants={variants} direction={direction}>
            <PersonStep
              step={1}
              total={4}
              title="First Soul"
              subtitle="Tell us about the first person."
              person={personA}
              setPerson={setPersonA}
              onNext={() => nextStep("personB")}
              onPrev={() => prevStep("welcome")}
            />
          </StepCard>
        )}

        {step === "personB" && (
          <StepCard key="personB" variants={variants} direction={direction}>
            <PersonStep
              step={2}
              total={4}
              title="Second Soul"
              subtitle="Who are they matching with?"
              person={personB}
              setPerson={setPersonB}
              onNext={() => nextStep("context")}
              onPrev={() => prevStep("personA")}
            />
          </StepCard>
        )}

        {step === "context" && (
          <StepCard key="context" variants={variants} direction={direction}>
            <ContextStep
              step={3}
              total={4}
              relationshipType={relationshipType}
              setRelationshipType={setRelationshipType}
              extraContext={extraContext}
              setExtraContext={setExtraContext}
              isPending={mutation.isPending}
              onSubmit={handleSubmit}
              onPrev={() => prevStep("personB")}
            />
          </StepCard>
        )}

        {step === "result" && mutation.data?.analyzeLove && (
          <StepCard
            key="result"
            variants={variants}
            direction={direction}
            className="max-w-xl"
          >
            <ResultStep
              results={mutation.data.analyzeLove}
              onReset={handleReset}
            />
          </StepCard>
        )}
      </AnimatePresence>

      {/* Floating Indicators */}
      <div className="absolute bottom-12 inset-x-0 flex justify-center gap-2">
        {["welcome", "personA", "personB", "context", "result"].map((s) => (
          <div
            key={s}
            className={`h-1 transition-all rounded-full ${step === s ? "w-8 bg-accent" : "w-2 bg-white/10"}`}
          />
        ))}
      </div>
    </div>
  );
}
