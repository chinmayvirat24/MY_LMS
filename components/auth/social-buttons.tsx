"use client";

import type { AuthProvider } from "@/lib/auth";
import { Button } from "@/components/ui/button";

const labels: Record<Exclude<AuthProvider, "credentials">, string> = {
  google: "Continue with Google",
  github: "Continue with GitHub"
};

export function SocialButtons({
  onSelect,
  className
}: {
  onSelect: (provider: Exclude<AuthProvider, "credentials">) => void;
  className?: string;
}) {
  return (
    <div className={className}>
      <div className="mb-4 flex items-center gap-3 text-xs uppercase tracking-[0.22em] text-slate-400">
        <span className="h-px flex-1 bg-slate-200" />
        <span>Quick Access</span>
        <span className="h-px flex-1 bg-slate-200" />
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {(Object.keys(labels) as Array<Exclude<AuthProvider, "credentials">>).map(
          (provider) => (
            <Button
              key={provider}
              type="button"
              variant="secondary"
              className="w-full"
              onClick={() => onSelect(provider)}
            >
              {labels[provider]}
            </Button>
          )
        )}
      </div>
      <p className="mt-3 text-xs leading-6 text-slate-500">
        Google and GitHub buttons currently use instant local demo sign-in in this frontend-only build.
      </p>
    </div>
  );
}
