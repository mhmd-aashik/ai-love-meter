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
  age: 0,
  favoriteNumber: 7,
  hobby: "",
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
    onSuccess: (data: { analyzeLove: any }) => {
      if (data?.analyzeLove) {
        queryClient.invalidateQueries({ queryKey: ["recentResults"] });
        setStep("result");
      }
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
      personA,
      personB,
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
      x: direction > 0 ? 800 : -800,
      opacity: 0,
      rotate: direction > 0 ? 5 : -5,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      rotate: 0,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 800 : -800,
      opacity: 0,
      rotate: direction < 0 ? 5 : -5,
    }),
  };

  return (
    <div className="min-h-[100dvh] w-full flex flex-col items-center justify-center relative py-8 md:py-12 gap-8 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 z-0 flex items-center justify-center opacity-40 pointer-events-none">
        <div className="w-[600px] h-[600px] bg-primary/20 rounded-full blur-[100px] animate-pulse" />
      </div>

      {mutation.isError && (
        <div className="absolute top-8 z-50 px-6 py-2 bg-destructive text-destructive-foreground rounded-full font-bold shadow-2xl animate-bounce text-sm">
          {mutation.error instanceof Error ? mutation.error.message : "Sync error. Try again."}
        </div>
      )}

      <div className="w-full flex items-center justify-center relative z-10">
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
                title="Person A"
                subtitle="Profile setup for the first user."
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
                title="Person B"
                subtitle="Profile setup for the match."
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
              className="max-w-6xl"
            >
              <ResultStep
                results={mutation.data.analyzeLove}
                onReset={handleReset}
              />
            </StepCard>
          )}
        </AnimatePresence>
      </div>

      {/* Modern Indicators - Now relative to content */}
      <div className="flex justify-center gap-3 z-20">
        {["welcome", "personA", "personB", "context", "result"].map((s) => (
          <div
            key={s}
            className={`h-1 transition-all rounded-full ${step === s ? "w-12 bg-primary shadow-[0_0_10px_rgba(var(--primary),0.5)]" : "w-4 bg-white/10"}`}
          />
        ))}
      </div>
    </div>
  );
}
