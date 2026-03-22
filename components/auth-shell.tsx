import type { ReactNode } from "react";
import { Logo } from "@/components/logo";

type AuthShellProps = {
  title: string;
  subtitle: string;
  eyebrow: string;
  footer: ReactNode;
  children: ReactNode;
};

export function AuthShell({
  title,
  subtitle,
  eyebrow,
  footer,
  children
}: AuthShellProps) {
  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)]">
      <div className="mx-auto grid min-h-screen max-w-7xl items-stretch gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[1.15fr,0.85fr] lg:px-8">
        <div className="relative hidden overflow-hidden rounded-[2.5rem] border border-white/80 bg-gradient-to-br from-primary-50 via-white to-sky-50 p-8 shadow-soft lg:block">
          <div className="absolute inset-0 bg-hero-grid bg-[size:36px_36px] opacity-50" />
          <div className="relative flex h-full flex-col justify-between">
            <Logo />
            <div className="max-w-xl space-y-6">
              <span className="inline-flex rounded-full bg-white/80 px-4 py-2 text-sm font-medium text-primary-700 shadow-sm">
                Smart learning flow
              </span>
              <h1 className="text-5xl font-semibold leading-tight tracking-tight text-slate-950">
                Learn with structure, guidance, and an AI tutor that stays in context.
              </h1>
              <p className="text-lg leading-8 text-slate-600">
                Sikho combines curated courses, lesson sequencing, and fast progress
                cues so students can stay focused on learning instead of navigating
                clutter.
              </p>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {[
                ["24", "Courses"],
                ["216", "Video lessons"],
                ["4.8", "Average rating"]
              ].map(([value, label]) => (
                <div
                  key={label}
                  className="rounded-[1.75rem] border border-white/80 bg-white/80 p-5 shadow-card"
                >
                  <p className="text-3xl font-semibold text-slate-950">{value}</p>
                  <p className="mt-1 text-sm text-slate-500">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center">
          <div className="w-full max-w-xl rounded-[2.5rem] border border-white/80 bg-white p-8 shadow-soft sm:p-10">
            <div className="mb-8 space-y-3">
              <p className="text-sm font-medium uppercase tracking-[0.28em] text-primary-600">
                {eyebrow}
              </p>
              <h2 className="text-4xl font-semibold tracking-tight text-slate-950">
                {title}
              </h2>
              <p className="text-base leading-7 text-slate-500">{subtitle}</p>
            </div>
            <div className="space-y-6">{children}</div>
            <div className="mt-8 border-t border-slate-100 pt-6 text-sm text-slate-500">
              {footer}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
