import { Button } from "@/components/ui/button";
import { getDashboardResourceCourses, getFeaturedDashboardLessons } from "@/lib/data";
import { formatDuration } from "@/lib/utils";

const externalLinkClass =
  "inline-flex h-10 items-center justify-center rounded-2xl border border-slate-200 bg-white px-4 text-sm font-medium text-slate-900 shadow-card transition-all duration-200 hover:-translate-y-0.5 hover:border-primary-400 hover:text-primary-700";

export default function DashboardResourcesPage() {
  const featuredLessons = getFeaturedDashboardLessons();
  const resourceCourses = getDashboardResourceCourses();
  const totalVideoResources = resourceCourses.reduce(
    (sum, entry) => sum + entry.course.lessonsCount,
    0
  );
  const totalStudyLinks = resourceCourses.reduce(
    (sum, entry) => sum + entry.course.resources.length,
    0
  );

  return (
    <div className="space-y-8">
      <section className="rounded-[2.5rem] border border-white/80 bg-white p-8 shadow-soft">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.24em] text-primary-600">
              Resources
            </p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-950">
              Your learning library, organized for the dashboard.
            </h1>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">
              This view turns your saved YouTube lesson links and course companion
              material into one focused resource library, so you can resume videos,
              open guides, and jump back into a course without hunting around.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button href="/dashboard" variant="secondary">
              Back to Dashboard
            </Button>
            <Button href="/courses">Browse Courses</Button>
          </div>
        </div>
      </section>

      <section className="grid gap-5 xl:grid-cols-4">
        {[
          {
            label: "Courses in Library",
            value: `${resourceCourses.length}`,
            hint: "Active courses with resources ready"
          },
          {
            label: "Video Resources",
            value: `${totalVideoResources}`,
            hint: "YouTube lesson links mapped from course data"
          },
          {
            label: "Study Links",
            value: `${totalStudyLinks}`,
            hint: "Docs, guides, practice, and checklists"
          },
          {
            label: "Featured Now",
            value: `${featuredLessons.length}`,
            hint: "Fast resume cards for your next session"
          }
        ].map((metric) => (
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
              Featured Videos
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-950">
              Resume from the strongest next lesson
            </h2>
          </div>
        </div>

        <div className="grid gap-6 xl:grid-cols-3">
          {featuredLessons.map(({ course, focusLesson, progress }) => (
            <article
              key={`${course.id}-${focusLesson.id}`}
              className="overflow-hidden rounded-[2.25rem] border border-white/80 bg-white shadow-card"
            >
              <img
                src={focusLesson.thumbnailUrl}
                alt={focusLesson.title}
                className="h-48 w-full object-cover"
              />
              <div className="p-6">
                <div className="flex flex-wrap items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-slate-500">
                  <span>{course.category}</span>
                  <span className="text-primary-600">{progress.percent}% complete</span>
                </div>
                <h3 className="mt-3 text-2xl font-semibold text-slate-950">{course.title}</h3>
                <p className="mt-2 text-base font-medium text-slate-700">{focusLesson.title}</p>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  {focusLesson.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-3 text-sm text-slate-500">
                  <span>{focusLesson.durationMinutes} min lesson</span>
                  <span>{formatDuration(course.durationMinutes)} course runtime</span>
                </div>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Button href={`/learn/${course.slug}/${focusLesson.id}`} size="sm">
                    Open Workspace
                  </Button>
                  <a
                    href={focusLesson.youtubeUrl}
                    target="_blank"
                    rel="noreferrer"
                    className={externalLinkClass}
                  >
                    Watch on YouTube
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.24em] text-primary-600">
            By Course
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-slate-950">
            Dashboard-ready resources for each learning track
          </h2>
        </div>

        <div className="grid gap-6">
          {resourceCourses.map(({ course, focusLesson, previewLessons, progress }) => (
            <article
              key={course.id}
              className="rounded-[2.25rem] border border-white/80 bg-white p-6 shadow-card"
            >
              <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                <div>
                  <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary-600">
                    {course.category}
                  </p>
                  <h3 className="mt-2 text-3xl font-semibold text-slate-950">{course.title}</h3>
                  <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">
                    {course.shortDescription}
                  </p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <div className="rounded-[1.5rem] bg-slate-50 px-4 py-3 text-sm text-slate-600">
                    {progress.completedCount} lessons done
                  </div>
                  <div className="rounded-[1.5rem] bg-primary-50 px-4 py-3 text-sm text-primary-700">
                    {progress.percent}% course progress
                  </div>
                  <Button href={`/courses/${course.slug}`} variant="secondary" size="sm">
                    Open Course
                  </Button>
                </div>
              </div>

              <div className="mt-6 grid gap-6 xl:grid-cols-[1.1fr,0.9fr]">
                <div className="space-y-4 rounded-[2rem] bg-slate-50/80 p-5">
                  <div>
                    <p className="text-sm font-medium uppercase tracking-[0.18em] text-slate-500">
                      Focus Video
                    </p>
                    <h4 className="mt-2 text-xl font-semibold text-slate-950">
                      {focusLesson.title}
                    </h4>
                    <p className="mt-3 text-sm leading-7 text-slate-600">
                      {focusLesson.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <Button href={`/learn/${course.slug}/${focusLesson.id}`} size="sm">
                      Continue Lesson
                    </Button>
                    <a
                      href={focusLesson.youtubeUrl}
                      target="_blank"
                      rel="noreferrer"
                      className={externalLinkClass}
                    >
                      Open Source Video
                    </a>
                  </div>

                  <div className="grid gap-3">
                    {previewLessons.map((lesson) => (
                      <a
                        key={lesson.id}
                        href={lesson.youtubeUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center justify-between gap-4 rounded-[1.5rem] border border-slate-200 bg-white px-4 py-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-primary-300"
                      >
                        <div>
                          <p className="font-medium text-slate-900">{lesson.title}</p>
                          <p className="mt-1 text-sm text-slate-500">
                            {lesson.durationMinutes} min follow-along resource
                          </p>
                        </div>
                        <span className="text-sm font-medium text-primary-600">YouTube</span>
                      </a>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium uppercase tracking-[0.18em] text-slate-500">
                      Companion Resources
                    </p>
                    <h4 className="mt-2 text-xl font-semibold text-slate-950">
                      Docs, guides, and practice links
                    </h4>
                  </div>

                  <div className="grid gap-4">
                    {course.resources.map((resource) => (
                      <a
                        key={`${course.id}-${resource.title}`}
                        href={resource.href}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-[1.75rem] border border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)] p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-primary-300 hover:shadow-card"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <span className="rounded-full bg-primary-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-primary-700">
                            {resource.type}
                          </span>
                          <span className="text-sm font-medium text-slate-400">Open</span>
                        </div>
                        <h5 className="mt-5 text-lg font-semibold text-slate-950">
                          {resource.title}
                        </h5>
                        <p className="mt-3 text-sm leading-7 text-slate-600">
                          {resource.description}
                        </p>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
