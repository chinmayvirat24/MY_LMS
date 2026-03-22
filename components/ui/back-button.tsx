import Link from "next/link";
import { cn } from "@/lib/utils";

type BackButtonProps = {
  href: string;
  label: string;
  className?: string;
};

export function BackButton({ href, label, className }: BackButtonProps) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-slate-900/10 bg-white/90 px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-primary-400 hover:text-primary-700",
        className
      )}
    >
      <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-slate-950 text-xs text-white">
        {"<"}
      </span>
      <span>{label}</span>
    </Link>
  );
}
