"use client";

import { motion } from "framer-motion";

type StepCardProps = {
  children: React.ReactNode;
  variants: {
    enter: (d: number) => object;
    center: object;
    exit: (d: number) => object;
  };
  direction: number;
  className?: string;
};

export default function StepCard({
  children,
  variants,
  direction,
  className = "max-w-md",
}: StepCardProps) {
  return (
    <motion.div
      custom={direction}
      variants={variants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 },
      }}
      className={`w-full ${className} glass rounded-[40px] p-8 md:p-10 shadow-2xl relative z-10 mx-4`}
    >
      {children}
    </motion.div>
  );
}
