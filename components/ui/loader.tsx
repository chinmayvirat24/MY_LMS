import { cn } from "@/lib/utils";

type LoaderProps = {
  className?: string;
  label?: string;
};

export function Loader({ className, label = "Loading Sikho" }: LoaderProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center gap-4 py-16", className)}>
      <div className="relative h-14 w-14">
        <span className="absolute inset-0 animate-ping rounded-full bg-primary-200/70" />
        <span className="absolute inset-2 rounded-full bg-white shadow-card" />
        <span className="absolute inset-[1.05rem] rounded-full bg-gradient-to-br from-primary-500 to-sky-400" />
      </div>
      <p className="text-sm text-slate-500">{label}</p>
    </div>
  );
}
