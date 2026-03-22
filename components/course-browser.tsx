"use client";

import { startTransition, useDeferredValue, useState } from "react";
import type { Course } from "@/lib/types";
import { CourseCard } from "@/components/course-card";
import { Button } from "@/components/ui/button";
import { courseCategories, getCourseProgress, hasCourseAccess } from "@/lib/data";
import { getCourseAction } from "@/lib/utils";

type CourseBrowserProps = {
  courses: Course[];
};

export function CourseBrowser({ courses }: CourseBrowserProps) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [visibleCount, setVisibleCount] = useState(8);
  const deferredQuery = useDeferredValue(query);

  const filteredCourses = courses.filter((course) => {
    const matchesQuery =
      course.title.toLowerCase().includes(deferredQuery.toLowerCase()) ||
      course.instructor.toLowerCase().includes(deferredQuery.toLowerCase()) ||
      course.tags.some((tag) =>
        tag.toLowerCase().includes(deferredQuery.toLowerCase())
      );
    const matchesCategory = category === "All" || course.category === category;

    return matchesQuery && matchesCategory;
  });

  const visibleCourses = filteredCourses.slice(0, visibleCount);

  return (
    <div className="space-y-8">
      <div className="rounded-[2rem] border border-white/80 bg-white p-5 shadow-card">
        <div className="grid gap-4 lg:grid-cols-[1.3fr,1fr]">
          <label className="space-y-2">
            <span className="text-sm font-medium text-slate-700">Search courses</span>
            <input
              value={query}
              onChange={(event) => {
                const nextQuery = event.target.value;
                startTransition(() => {
                  setQuery(nextQuery);
                  setVisibleCount(8);
                });
              }}
              placeholder="Python, React, SQL, instructor..."
              className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-900 outline-none transition-all focus:border-primary-300 focus:bg-white focus:shadow-halo"
            />
          </label>
          <div className="space-y-2">
            <span className="text-sm font-medium text-slate-700">Categories</span>
            <div className="flex flex-wrap gap-2">
              {courseCategories.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() =>
                    startTransition(() => {
                      setCategory(item);
                      setVisibleCount(8);
                    })
                  }
                  className={`rounded-full px-4 py-2 text-sm transition-all ${
                    category === item
                      ? "bg-primary-600 text-white shadow-card"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-950"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-slate-500">
        <p>
          Showing <span className="font-semibold text-slate-900">{visibleCourses.length}</span>{" "}
          of <span className="font-semibold text-slate-900">{filteredCourses.length}</span>{" "}
          courses
        </p>
        <p>Scalable catalog with 24 curated courses and 216 structured video lessons.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {visibleCourses.map((course) => {
          const accessible = hasCourseAccess(course);
          const action = getCourseAction(course, accessible);

          return (
            <CourseCard
              key={course.id}
              course={course}
              progress={getCourseProgress(course).percent}
              actionHref={action.href}
              actionLabel={action.label}
            />
          );
        })}
      </div>

      {visibleCourses.length < filteredCourses.length ? (
        <div className="flex justify-center">
          <Button
            variant="secondary"
            onClick={() => startTransition(() => setVisibleCount((current) => current + 8))}
          >
            Load More Courses
          </Button>
        </div>
      ) : null}
    </div>
  );
}
