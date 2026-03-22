"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { Course } from "@/lib/types";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { BackButton } from "@/components/ui/back-button";
import { ProgressBar } from "@/components/ui/progress-bar";
import { ResourceSection } from "@/components/resource-section";
import { getCourseProgress, getCourseLessonsWithProgress, hasCourseAccess, userProfile } from "@/lib/data";
import {
  formatCompactNumber,
  formatDuration,
  formatCurrency,
  getAccessBadge
} from "@/lib/utils";

type CourseDetailProps = {
  course: Course;
};

export function CourseDetail({ course }: CourseDetailProps) {
  const [expandedSection, setExpandedSection] = useState(course.sections[0]?.id ?? "");
  const [modalOpen, setModalOpen] = useState(false);
  const [enrolled, setEnrolled] = useState(
    userProfile.enrolledCourseSlugs.includes(course.slug)
  );

  const accessible =
    course.accessType === "free" ? enrolled : hasCourseAccess(course);
  const sections = getCourseLessonsWithProgress(course).map((section) => ({
    ...section,
    lessons: section.lessons.map((lesson) => ({
      ...lesson,
      isLocked: accessible ? lesson.isLocked : true
    }))
  }));
  const progress = getCourseProgress(course);
  const firstLessonId = course.sections[0]?.lessons[0]?.id ?? "";

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <BackButton href="/courses" label="Back to Courses" />
      </div>

      <section className="overflow-hidden rounded-[2.5rem] border border-slate-900/8 bg-white shadow-soft">
        <div
          className="relative overflow-hidden px-6 py-8 sm:px-8 lg:px-10 lg:py-10"
          style={{
            background: `linear-gradient(135deg, ${course.accent.from}, ${course.accent.to})`
          }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.32),transparent_35%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(2,6,23,0.08),transparent_46%)]" />
          <div className="relative grid gap-8 lg:grid-cols-[1.2fr,0.8fr]">
            <div className="space-y-6">
              <div className="flex flex-wrap gap-2">
                <span className="rounded-full bg-white/85 px-3 py-1 text-xs font-medium text-slate-700">
                  {course.category}
                </span>
                <span className="rounded-full bg-slate-950/85 px-3 py-1 text-xs font-medium text-white">
                  {getAccessBadge(course.accessType, course.price)}
                </span>
                <span className="rounded-full bg-white/85 px-3 py-1 text-xs font-medium text-slate-700">
                  {course.level}
                </span>
              </div>

              <div>
                <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
                  {course.title}
                </h1>
                <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-800/80">
                  {course.description}
                </p>
              </div>

              <div className="flex flex-wrap gap-6 text-sm text-slate-800/85">
                <span>By {course.instructor}</span>
                <span>{course.rating.toFixed(1)} rating</span>
                <span>{formatCompactNumber(course.reviewCount)} reviews</span>
                <span>{formatCompactNumber(course.students)} students</span>
              </div>

              <div className="flex flex-wrap gap-3">
                {course.accessType === "free" && !accessible ? (
                  <Button onClick={() => setEnrolled(true)}>Enroll Free</Button>
                ) : accessible ? (
                  <Button href={`/learn/${course.slug}/${firstLessonId}`}>
                    Start Learning
                  </Button>
                ) : course.accessType === "paid" ? (
                  <Button href={`/checkout?course=${course.slug}`}>
                    Buy for {formatCurrency(course.price)}
                  </Button>
                ) : (
                  <Button href="/subscription">
                    Subscribe to Access
                  </Button>
                )}
                <Button variant="ghost" onClick={() => setModalOpen(true)}>
                  What&apos;s Included
                </Button>
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/55 bg-white/78 p-6 shadow-card backdrop-blur-sm">
              <ProgressBar value={progress.percent} label="Course completion" />
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl bg-white/80 p-4">
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Lessons</p>
                  <p className="mt-2 text-2xl font-semibold text-slate-950">
                    {course.lessonsCount}
                  </p>
                </div>
                <div className="rounded-2xl bg-white/80 p-4">
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Duration</p>
                  <p className="mt-2 text-2xl font-semibold text-slate-950">
                    {formatDuration(course.durationMinutes)}
                  </p>
                </div>
              </div>
              <div className="mt-6 rounded-[1.75rem] bg-white/80 p-5">
                <h2 className="text-sm font-semibold text-slate-900">What you will learn</h2>
                <ul className="mt-4 space-y-3">
                  {course.whatYouWillLearn.map((item) => (
                    <li key={item} className="flex gap-3 text-sm leading-6 text-slate-600">
                      <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-primary-100 text-[10px] font-semibold text-primary-700">
                        OK
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-8 lg:grid-cols-[0.9fr,1.1fr]">
        <div className="space-y-6 rounded-[2.5rem] border border-slate-900/8 bg-white p-6 shadow-card">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.24em] text-primary-600">
              About this course
            </p>
            <h2 className="mt-3 text-2xl font-semibold text-slate-950">Description</h2>
            <p className="mt-4 text-base leading-8 text-slate-600">{course.shortDescription}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {course.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-slate-100 px-3 py-1.5 text-sm text-slate-600"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="space-y-4 rounded-[2.5rem] border border-slate-900/8 bg-white p-6 shadow-card">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.24em] text-primary-600">
              Curriculum
            </p>
            <h2 className="mt-3 text-2xl font-semibold text-slate-950">Course curriculum</h2>
          </div>

          {sections.map((section) => {
            const open = expandedSection === section.id;

            return (
              <div key={section.id} className="rounded-[1.75rem] border border-slate-100 bg-slate-50/70">
                <button
                  type="button"
                  onClick={() => setExpandedSection(open ? "" : section.id)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                >
                  <div>
                    <p className="text-base font-semibold text-slate-900">{section.title}</p>
                    <p className="mt-1 text-sm text-slate-500">
                      {section.lessons.length} lessons
                    </p>
                  </div>
                  <span className="text-slate-400">{open ? "-" : "+"}</span>
                </button>

                <motion.div
                  initial={false}
                  animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
                  className="overflow-hidden"
                >
                  <div className="space-y-3 px-5 pb-5">
                    {section.lessons.map((lesson) => (
                      <div
                        key={lesson.id}
                        className="flex items-center justify-between gap-4 rounded-2xl bg-white px-4 py-3"
                      >
                        <div className="flex items-center gap-3">
                          <span className="inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-slate-100 text-sm">
                            {lesson.isCompleted ? "OK" : lesson.isLocked ? "LK" : "GO"}
                          </span>
                          <div>
                            <p className="text-sm font-medium text-slate-900">{lesson.title}</p>
                            <p className="text-xs text-slate-500">{lesson.description}</p>
                          </div>
                        </div>
                        <span className="text-xs text-slate-500">
                          {lesson.durationMinutes} min
                        </span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>
      </section>

      <ResourceSection
        eyebrow="Resources"
        title="Study guides and references"
        description="Keep the most useful companion material nearby while you move through the course. These links reinforce the lessons without sending learners into a noisy rabbit hole."
        resources={course.resources}
      />

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Included with this course"
        description="A focused learning path with progress cues, curriculum structure, and AI support."
      >
        <div className="space-y-4">
          <div className="rounded-[1.75rem] bg-slate-50 p-5">
            <p className="text-sm font-medium text-slate-900">
              {course.accessType === "free"
                ? "Free access includes the full course and progress tracking."
                : course.accessType === "paid"
                  ? `One-time purchase for ${formatCurrency(course.price)} with lifetime access.`
                  : "Subscription access unlocks this course plus the rest of the premium catalog."}
            </p>
          </div>
          <ul className="space-y-3 text-sm leading-6 text-slate-600">
            <li>Structured curriculum with strict lesson flow and completion cues.</li>
            <li>AI tutor support for summaries, explanations, and practice prompts.</li>
            <li>Responsive learning interface with lesson sidebar and progress tracking.</li>
            <li>Dashboard visibility for saved courses, certificates, and purchase history.</li>
          </ul>
        </div>
      </Modal>
    </div>
  );
}
