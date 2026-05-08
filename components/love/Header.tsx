import { Stars } from "lucide-react";

type HeaderProps = {
  step: number;
  total: number;
  title: string;
  subtitle: string;
};

export default function Header({ step, total, title, subtitle }: HeaderProps) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-[10px] font-black text-accent uppercase tracking-widest">
          Step {step} of {total}
        </span>
        <Stars className="w-4 h-4 text-accent/40" />
      </div>
      <h2 className="text-3xl font-black text-white">{title}</h2>
      <p className="text-zinc-500 text-sm">{subtitle}</p>
    </div>
  );
}
