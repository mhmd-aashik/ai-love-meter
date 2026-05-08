"use client";

import { useState } from "react";

type InputGroupProps = {
  label: string;
  children: React.ReactNode;
  icon: React.ReactNode;
  value?: string | number;
};

export default function InputGroup({
  label,
  children,
  icon,
  value,
}: InputGroupProps) {
  const [isFocused, setIsFocused] = useState(false);
  const hasValue = value !== undefined && value !== "" && value !== 0;

  return (
    <div className="relative group pt-4">
      <div
        className={`absolute inset-0 bg-gradient-to-r from-accent/10 to-accent-secondary/10 rounded-2xl blur-xl transition-opacity duration-500 ${isFocused ? "opacity-100" : "opacity-0"}`}
      />
      <div
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={`relative z-10 px-6 py-5 rounded-2xl bg-white/[0.02] border transition-all duration-300 ${isFocused ? "border-accent ring-1 ring-accent/20 bg-white/[0.05]" : "border-white/5"}`}
      >
        <div
          className={`absolute left-6 transition-all duration-300 pointer-events-none flex items-center gap-2 ${isFocused || hasValue ? "-top-3 text-[10px] text-accent font-black bg-background px-2" : "top-1/2 -translate-y-1/2 text-zinc-500 text-sm"}`}
        >
          {icon}
          <span className="uppercase tracking-widest">{label}</span>
        </div>
        <div className="flex items-center">{children}</div>
      </div>
    </div>
  );
}
