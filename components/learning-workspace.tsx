"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import type { Course } from "@/lib/types";
import { AIChatPanel } from "@/components/ai-chat-panel";
import { Logo } from "@/components/logo";
import { SidebarLessonItem } from "@/components/sidebar-lesson-item";
import { Button } from "@/components/ui/button";
import { ProgressBar } from "@/components/ui/progress-bar";
import { VideoPlayer } from "@/components/video-player";
import { hasCourseAccess, userProfile } from "@/lib/data";
import { formatDuration, percentage } from "@/lib/utils";

type LearningWorkspaceProps = {
  course: Course;
  lessonId: string;
};

export function LearningWorkspace({
  course,
  lessonId
}: LearningWorkspaceProps) {
  const storageKey = `sikho-progress-${course.slug}`;
  const initialCompleted = userProfile.completedLessonIds.filter((id) =>
    id.startsWith(course.slug)
  );
  const [collapsed, setCollapsed] = useState(false);
  const [completedIds, setCompletedIds] = useState<string[]>(initialCompleted);
  const accessible = hasCourseAccess(course) || course.accessType === "free";
  const allLessons = course.sections.flatMap((section) => section.lessons);

  useEffect(() => {
    const stored = window.localStorage.getItem(storageKey);

    if (stored) {
      try {
        const parsed = JSON.parse(stored) as string[];
        setCompletedIds(Array.from(new Set([...initialCompleted, ...parsed])));
      } catch {
        window.localStorage.removeItem(storageKey);
      }
    }
  }, [initialCompleted, storageKey]);

  useEffect(() => {
    window.localStorage.setItem(storageKey, JSON.stringify(completedIds));
  }, [completedIds, storageKey]);

  const lessonStates = allLessons.map((lesson, index) => {
    const isCompleted = completedIds.includes(lesson.id);
    const previousLesson = index > 0 ? allLessons[index - 1] : null;
    const previousCompleted = previousLesson
      ? completedIds.includes(previousLesson.id)
      : true;

    return {
      ...lesson,
      isCompleted,
      isLocked: !accessible || (!isCompleted && !previousCompleted)
    };
  });

  const activeIndex = Math.max(
    0,
    lessonStates.findIndex((lesson) => lesson.id === lessonId)
  );
  const activeLesson = lessonStates[activeIndex] ?? lessonStates[0];
  const previousLesson = activeIndex > 0 ? lessonStates[activeIndex - 1] : null;
  const nextLesson =
    activeIndex < lessonStates.length - 1 ? lessonStates[activeIndex + 1] : null;
  const progress = percentage(
    lessonStates.filter((lesson) => lesson.isCompleted).length,
    lessonStates.length
  );
  const relatedLessons = lessonStates.slice(activeIndex + 1, activeIndex + 4);

  function markCompleted() {
    if (!activeLesson || completedIds.includes(activeLesson.id)) {
      return;
    }

    setCompletedIds((current) => [...current, activeLesson.id]);
  }

  if (!accessible) {
    return (
      <div className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl rounded-[2.5rem] border border-white/80 bg-white p-8 shadow-soft">
          <Logo />
          <h1 className="mt-8 text-3xl font-semibold tracking-tight text-slate-950">
            This course is locked for your account.
          </h1>
          <p className="mt-4 text-base leading-8 text-slate-600">
            Purchase the course or unlock it with a Sikho subscription to access
            the video player, lesson sidebar, AI tutor, and progress tracking.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            {course.accessType === "paid" ? (
              <Button href={`/checkout?course=${course.slug}`}>Buy Course</Button>
            ) : (
              <Button href="/subscription">Subscribe to Access</Button>
            )}
            <Button href={`/courses/${course.slug}`} variant="secondary">
              Back to Course
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f7f9fc]">
      <header className="border-b border-white/70 bg-white/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <Logo />
            <div className="hidden md:block">
              <p className="text-xs uppercase tracking-[0.24em] text-primary-600">
                Learning workspace
              </p>
              <h1 className="text-lg font-semibold text-slate-950">{course.title}</h1>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button href={`/courses/${course.slug}`} variant="ghost" size="sm">
              Course Details
            </Button>
            <Button href="/dashboard" variant="secondary" size="sm">
              Dashboard
            </Button>
          </div>
        </div>
      </header>

      <div className="mx-auto flex max-w-[1600px] gap-6 px-4 py-6 sm:px-6 lg:px-8">
        <motion.aside
          animate={{ width: collapsed ? 88 : 360 }}
          transition={{ duration: 0.22 }}
          className="hidden shrink-0 overflow-hidden rounded-[2rem] border border-white/80 bg-white p-4 shadow-card lg:block"
        >
          <div className="mb-4 flex items-center justify-between gap-4">
            {!collapsed ? (
              <div>
                <p className="text-sm font-semibold text-slate-900">Course Content</p>
                <p className="text-xs text-slate-500">
                  {lessonStates.length} lessons in sequence
                </p>
              </div>
            ) : null}
            <button
              type="button"
              onClick={() => setCollapsed((current) => !current)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition-colors hover:text-slate-950"
            >
              {collapsed ? ">" : "<"}
            </button>
          </div>

          {!collapsed ? (
            <div className="space-y-5">
              <ProgressBar value={progress} label="Overall progress" />
              {course.sections.map((section) => (
                <div key={section.id} className="space-y-3">
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                      Section {section.order}
                    </p>
                    <p className="mt-1 font-semibold text-slate-900">{section.title}</p>
                  </div>
                  <div className="space-y-2">
                    {section.lessons.map((lesson) => {
                      const state = lessonStates.find((item) => item.id === lesson.id)!;

                      return (
                        <SidebarLessonItem
                          key={lesson.id}
                          title={lesson.title}
                          href={`/learn/${course.slug}/${lesson.id}`}
                          active={lesson.id === activeLesson.id}
                          completed={state.isCompleted}
                          locked={state.isLocked}
                          duration={`${lesson.durationMinutes} min`}
                        />
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              {lessonStates.map((lesson, index) => (
                <Link
                  key={lesson.id}
                  href={lesson.isLocked ? "#" : `/learn/${course.slug}/${lesson.id}`}
                  className={`flex h-12 items-center justify-center rounded-2xl text-sm ${
                    lesson.id === activeLesson.id
                      ? "bg-primary-50 text-primary-700"
                      : "bg-slate-50 text-slate-500"
                  }`}
                >
                  {index + 1}
                </Link>
              ))}
            </div>
          )}
        </motion.aside>

        <main className="min-w-0 flex-1 space-y-6">
          <VideoPlayer title={activeLesson.title} embedUrl={activeLesson.embedUrl} />

          <section className="rounded-[2rem] border border-white/80 bg-white p-6 shadow-card">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
              <div className="max-w-3xl">
                <p className="text-sm font-medium uppercase tracking-[0.24em] text-primary-600">
                  Current lesson
                </p>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">
                  {activeLesson.title}
                </h2>
                <p className="mt-4 text-base leading-8 text-slate-600">
                  {activeLesson.description}
                </p>
              </div>
              <div className="rounded-[1.75rem] bg-slate-50 p-4 text-sm text-slate-600">
                <p>
                  Lesson {activeIndex + 1} of {lessonStates.length}
                </p>
                <p className="mt-1">{formatDuration(course.durationMinutes)} total course time</p>
              </div>
            </div>

            <div className="mt-6">
              <ProgressBar value={progress} label="Course completion" />
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              {previousLesson ? (
                <Button href={`/learn/${course.slug}/${previousLesson.id}`} variant="secondary">
                  Previous Lesson
                </Button>
              ) : (
                <Button variant="secondary" disabled>
                  Previous Lesson
                </Button>
              )}

              {nextLesson && !nextLesson.isLocked ? (
                <Button href={`/learn/${course.slug}/${nextLesson.id}`}>Next Lesson</Button>
              ) : (
                <Button disabled>Next Lesson</Button>
              )}

              <Button
                variant={activeLesson.isCompleted ? "outline" : "ghost"}
                onClick={markCompleted}
              >
                {activeLesson.isCompleted ? "Completed" : "Mark as Completed"}
              </Button>
            </div>
          </section>

          <section className="grid gap-6 xl:grid-cols-[1.1fr,0.9fr]">
            <div className="rounded-[2rem] border border-white/80 bg-white p-6 shadow-card">
              <p className="text-sm font-medium uppercase tracking-[0.24em] text-primary-600">
                Related lessons
              </p>
              <div className="mt-5 grid gap-4">
                {relatedLessons.map((lesson) => (
                  <Link
                    key={lesson.id}
                    href={`/learn/${course.slug}/${lesson.id}`}
                    className="flex items-center gap-4 rounded-[1.5rem] border border-slate-100 p-4 transition-all hover:border-primary-200 hover:bg-primary-50/40"
                  >
                    <img
                      src={lesson.thumbnailUrl}
                      alt={lesson.title}
                      className="h-20 w-32 rounded-2xl object-cover"
                    />
                    <div>
                      <p className="font-medium text-slate-900">{lesson.title}</p>
                      <p className="mt-1 text-sm text-slate-500">{lesson.durationMinutes} min</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/80 bg-white p-6 shadow-card">
              <p className="text-sm font-medium uppercase tracking-[0.24em] text-primary-600">
                Lesson flow
              </p>
              <div className="mt-5 space-y-4">
                {[
                  "Watch the lesson and stay in context with the sidebar.",
                  "Ask the AI tutor for summaries, analogies, or practice questions.",
                  "Mark the lesson complete to unlock the next step in the course."
                ].map((item, index) => (
                  <div key={item} className="flex gap-4 rounded-[1.5rem] bg-slate-50 p-4">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-primary-100 text-primary-700">
                      {index + 1}
                    </span>
                    <p className="text-sm leading-7 text-slate-600">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </main>
      </div>

      <AIChatPanel courseTitle={course.title} lessonTitle={activeLesson.title} />
    </div>
  );
}
