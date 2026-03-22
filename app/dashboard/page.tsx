import { CourseCard } from "@/components/course-card";
import { Button } from "@/components/ui/button";
import { dashboardMetrics, getContinueLearningCourses, getCourseProgress, getRecommendedCourses, getRecentCourses, hasCourseAccess, userProfile } from "@/lib/data";
import { getCourseAction } from "@/lib/utils";

export default function DashboardPage() {
  const continueLearning = getContinueLearningCourses().slice(0, 3);
  const recommended = getRecommendedCourses().slice(0, 3);
  const recent = getRecentCourses();

  return (
    <div className="space-y-8">
      <section className="rounded-[2.5rem] border border-white/80 bg-white p-8 shadow-soft">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.24em] text-primary-600">
              Welcome back
            </p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-950">
              {userProfile.name}, your next lesson is ready.
            </h1>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-600">
              Continue where you left off, review recommendations, and keep your
              learning streak moving through a calm, premium dashboard.
            </p>
          </div>
          <Button href="/courses">Browse More Courses</Button>
        </div>
      </section>

      <section className="grid gap-5 xl:grid-cols-4">
        {dashboardMetrics.map((metric) => (
          <div
            key={metric.label}
            className="rounded-[2rem] border border-white/80 bg-white p-6 shadow-card"
          >
            <p className="text-sm text-slate-500">{metric.label}</p>
            <p className="mt-3 text-4xl font-semibold text-slate-950">{metric.value}</p>
            <p className="mt-2 text-sm text-slate-500">{metric.hint}</p>
          </div>
        ))}
      </section>

      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.24em] text-primary-600">
              Continue Learning
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-950">Resume your active tracks</h2>
          </div>
          <Button href="/dashboard/my-learning" variant="secondary">
            View All
          </Button>
        </div>
        <div className="grid gap-6 xl:grid-cols-3">
          {continueLearning.map((course) => {
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
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.15fr,0.85fr]">
        <div className="space-y-6 rounded-[2.5rem] border border-white/80 bg-white p-6 shadow-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.24em] text-primary-600">
                Recommended
              </p>
              <h2 className="mt-2 text-2xl font-semibold text-slate-950">
                Smart next courses
              </h2>
            </div>
            <Button href="/courses" variant="ghost">
              View catalog
            </Button>
          </div>

          <div className="grid gap-4">
            {recommended.map((course) => (
              <div
                key={course.id}
                className="flex flex-col gap-4 rounded-[1.75rem] bg-slate-50 p-4 sm:flex-row"
              >
                <img
                  src={course.thumbnailUrl}
                  alt={course.title}
                  className="h-32 w-full rounded-[1.5rem] object-cover sm:w-44"
                />
                <div className="flex flex-1 flex-col justify-between gap-4">
                  <div>
                    <p className="text-sm text-slate-500">{course.category}</p>
                    <h3 className="mt-1 text-xl font-semibold text-slate-950">
                      {course.title}
                    </h3>
                    <p className="mt-2 text-sm leading-7 text-slate-500">
                      {course.shortDescription}
                    </p>
                  </div>
                  <Button href={`/courses/${course.slug}`} variant="secondary">
                    View Course
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[2.5rem] border border-white/80 bg-white p-6 shadow-card">
          <p className="text-sm font-medium uppercase tracking-[0.24em] text-primary-600">
            Recently Watched
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-slate-950">Quick resume list</h2>
          <div className="mt-6 space-y-4">
            {recent.map((course) => (
              <div key={course.id} className="rounded-[1.5rem] bg-slate-50 p-4">
                <p className="font-medium text-slate-900">{course.title}</p>
                <p className="mt-1 text-sm text-slate-500">{course.instructor}</p>
                <div className="mt-4">
                  <Button href={`/courses/${course.slug}`} variant="secondary" size="sm">
                    Open Course
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
