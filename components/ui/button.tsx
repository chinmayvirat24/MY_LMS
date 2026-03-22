"use client";

import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost" | "outline";
type ButtonSize = "sm" | "md" | "lg";

type SharedProps = {
  children: ReactNode;
  className?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
};

type ActionButtonProps = SharedProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children">;

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "border border-primary-600 bg-primary-600 text-white shadow-card hover:bg-primary-700",
  secondary:
    "border border-white/60 bg-white/80 text-slate-900 shadow-card hover:border-primary-200 hover:text-primary-700",
  ghost:
    "border border-transparent bg-transparent text-slate-700 hover:bg-slate-100/80 hover:text-slate-950",
  outline:
    "border border-slate-200 bg-white text-slate-800 hover:border-primary-300 hover:text-primary-700"
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "h-10 px-4 text-sm",
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-6 text-base"
};

const baseClassName =
  "group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-2xl font-medium transition-all duration-200 transform-gpu hover:-translate-y-0.5 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300 disabled:pointer-events-none disabled:opacity-60";

function ButtonContent({ children }: { children: ReactNode }) {
  return (
    <>
      <span className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.22),transparent_50%)] opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
      <span className="absolute inset-y-0 -left-10 w-10 rotate-12 bg-white/40 blur-md transition-all duration-300 group-hover:left-[calc(100%+1rem)]" />
      <span className="relative z-10">{children}</span>
    </>
  );
}

export function Button({
  children,
  className,
  href,
  variant = "primary",
  size = "md",
  ...props
}: ActionButtonProps) {
  const classes = cn(baseClassName, variantClasses[variant], sizeClasses[size], className);

  if (href) {
    return (
      <Link
        href={href}
        className={cn(
          classes,
          "transform-gpu transition-transform duration-200 hover:-translate-y-0.5 active:scale-[0.98]"
        )}
      >
        <ButtonContent>{children}</ButtonContent>
      </Link>
    );
  }

  return (
    <button
      className={classes}
      {...props}
    >
      <ButtonContent>{children}</ButtonContent>
    </button>
  );
}
