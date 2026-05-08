"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

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
        x: { type: "spring", stiffness: 200, damping: 25 },
        opacity: { duration: 0.3 },
      }}
      className={cn(
        "w-full relative z-10 mx-4",
        className
      )}
    >
      {/* Folder Tab Design */}
      <div className="relative">
        {/* The "Cut Corner" Shadow/Glow */}
        <div 
          className="absolute inset-0 bg-primary/20 blur-2xl -z-10 translate-x-4 translate-y-4 opacity-50" 
          style={{ clipPath: "polygon(0% 0%, 100% 0%, 100% 92%, 92% 100%, 0% 100%)" }}
        />
        
        {/* Main Folder Body */}
        <div 
          className="glass border border-white/10 relative overflow-hidden"
          style={{ 
            clipPath: "polygon(0% 0%, 100% 0%, 100% 92%, 92% 100%, 0% 100%)",
            backgroundColor: "rgba(0, 0, 0, 0.85)"
          }}
        >
          {/* Accent Line on Top */}
          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />
          
          <div className="p-8 md:p-12">
            {children}
          </div>
          
          {/* Bottom Cut Corner Accent */}
          <div 
            className="absolute bottom-0 right-0 w-12 h-12 bg-primary/10 border-l border-t border-white/20"
            style={{ clipPath: "polygon(100% 0, 100% 100%, 0 100%)" }}
          />
        </div>
      </div>
    </motion.div>
  );
}
