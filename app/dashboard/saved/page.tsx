import { CourseCard } from "@/components/course-card";
import { getCourseProgress, getSavedCourses, hasCourseAccess } from "@/lib/data";
import { getCourseAction } from "@/lib/utils";

export default function SavedPage() {
  const courses = getSavedCourses();

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-medium uppercase tracking-[0.24em] text-primary-600">
          Saved Courses
        </p>
        <h1 className="mt-2 text-4xl font-semibold tracking-tight text-slate-950">
          Courses you bookmarked for later.
        </h1>
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        {courses.map((course) => {
          const action = getCourseAction(course, hasCourseAccess(course));

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
    </div>
  );
}
