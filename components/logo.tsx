import Link from "next/link";

type LogoProps = {
  compact?: boolean;
};

export function Logo({ compact = false }: LogoProps) {
  return (
    <Link href="/" className="inline-flex items-center gap-3">
      <span className="relative inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-white shadow-card ring-1 ring-slate-200">
        <span className="absolute h-6 w-6 rounded-full bg-slate-950" />
        <span className="absolute left-[0.55rem] top-[0.55rem] h-3.5 w-3.5 rounded-full bg-slate-950" />
        <span className="absolute right-[0.55rem] top-[0.55rem] h-3.5 w-3.5 rounded-full bg-slate-950" />
        <span className="absolute h-3 w-3 rounded-full bg-white" />
        <span className="absolute left-[1.1rem] top-[1.45rem] h-1.5 w-1.5 rounded-full bg-slate-950" />
        <span className="absolute right-[1.1rem] top-[1.45rem] h-1.5 w-1.5 rounded-full bg-slate-950" />
        <span className="absolute top-[1.95rem] h-1.5 w-2 rounded-full bg-slate-950" />
      </span>
      {!compact ? (
        <span className="flex flex-col">
          <span className="text-lg font-semibold tracking-tight text-slate-950">Sikho</span>
          <span className="text-xs text-slate-500">Structured learning with AI</span>
        </span>
      ) : null}
    </Link>
  );
}
