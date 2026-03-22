"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type SidebarLessonItemProps = {
  title: string;
  href: string;
  active?: boolean;
  completed?: boolean;
  locked?: boolean;
  duration: string;
};

export function SidebarLessonItem({
  title,
  href,
  active = false,
  completed = false,
  locked = false,
  duration
}: SidebarLessonItemProps) {
  return (
    <motion.div whileHover={{ x: 2 }} transition={{ duration: 0.18 }}>
      <Link
        href={locked ? "#" : href}
        className={cn(
          "flex items-center gap-3 rounded-2xl border px-4 py-3 transition-all",
          active
            ? "border-primary-200 bg-primary-50 shadow-sm"
            : "border-transparent bg-white hover:border-slate-200 hover:bg-slate-50",
          locked && "cursor-not-allowed opacity-70"
        )}
      >
        <span
          className={cn(
            "flex h-10 w-10 items-center justify-center rounded-2xl text-sm font-semibold",
            completed
              ? "bg-emerald-100 text-emerald-700"
              : locked
                ? "bg-slate-100 text-slate-400"
                : "bg-primary-100 text-primary-700"
          )}
        >
          {completed ? "OK" : locked ? "LK" : "GO"}
        </span>
        <div className="min-w-0 flex-1">
          <p
            className={cn(
              "truncate text-sm font-medium",
              active ? "text-primary-700" : "text-slate-900"
            )}
          >
            {title}
          </p>
          <p className="text-xs text-slate-500">{duration}</p>
        </div>
      </Link>
    </motion.div>
  );
}
