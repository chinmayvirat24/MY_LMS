"use client";

import { motion } from "framer-motion";
import type { Course } from "@/lib/types";
import { formatCompactNumber, formatDuration, getAccessBadge } from "@/lib/utils";
import { ProgressBar } from "@/components/ui/progress-bar";
import { Button } from "@/components/ui/button";

type CourseCardProps = {
  course: Course;
  progress?: number;
  actionHref: string;
  actionLabel: string;
};

export function CourseCard({
  course,
  progress = 0,
  actionHref,
  actionLabel
}: CourseCardProps) {
  return (
    <motion.article
      whileHover={{ y: -6 }}
      transition={{ duration: 0.2 }}
      className="group overflow-hidden rounded-[2rem] border border-slate-900/8 bg-white shadow-card"
    >
      <div className="relative overflow-hidden">
        <img
          src={course.thumbnailUrl}
          alt={course.title}
          className="h-52 w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
        />
        <div className="absolute inset-x-4 top-4 flex items-start justify-between gap-3">
          <span className="rounded-full bg-white/92 px-3 py-1 text-xs font-medium text-slate-700 shadow-sm">
            {course.category}
          </span>
          <span className="rounded-full bg-slate-950 px-3 py-1 text-xs font-medium text-white shadow-sm">
            {getAccessBadge(course.accessType, course.price)}
          </span>
        </div>
      </div>
      <div className="space-y-5 p-5">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-slate-400">
            <span>{course.level}</span>
            <span className="h-1 w-1 rounded-full bg-slate-300" />
            <span>{formatCompactNumber(course.students)} learners</span>
          </div>
          <h3 className="text-xl font-semibold tracking-tight text-slate-950">
            {course.title}
          </h3>
          <p className="text-sm leading-6 text-slate-500">{course.shortDescription}</p>
        </div>
        <div className="grid grid-cols-2 gap-3 rounded-2xl border border-primary-100 bg-[linear-gradient(180deg,#ffffff_0%,#f6f9ff_100%)] p-4 text-sm text-slate-600">
          <div>
            <p className="text-xs uppercase tracking-[0.16em] text-slate-400">Instructor</p>
            <p className="mt-1 font-medium text-slate-900">{course.instructor}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.16em] text-slate-400">Duration</p>
            <p className="mt-1 font-medium text-slate-900">
              {formatDuration(course.durationMinutes)}
            </p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.16em] text-slate-400">Lessons</p>
            <p className="mt-1 font-medium text-slate-900">{course.lessonsCount}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.16em] text-slate-400">Rating</p>
            <p className="mt-1 font-medium text-slate-900">{course.rating.toFixed(1)}</p>
          </div>
        </div>
        {progress > 0 ? <ProgressBar value={progress} label="Progress" /> : null}
        <div className="flex items-center justify-between gap-3">
          <Button href={`/courses/${course.slug}`} variant="outline" className="flex-1">
            View Details
          </Button>
          <Button href={actionHref} className="flex-1">
            {actionLabel}
          </Button>
        </div>
      </div>
    </motion.article>
  );
}
