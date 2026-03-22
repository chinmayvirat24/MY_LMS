import { dashboardMetrics, getRecentCourses, userProfile } from "@/lib/data";

export default function DashboardProfilePage() {
  const recentCourses = getRecentCourses();

  return (
    <div className="space-y-8">
      <section className="grid gap-6 xl:grid-cols-[0.8fr,1.2fr]">
        <div className="rounded-[2.5rem] border border-white/80 bg-white p-8 shadow-soft">
          <div className="inline-flex h-20 w-20 items-center justify-center rounded-[2rem] bg-primary-100 text-2xl font-semibold text-primary-700">
            {userProfile.initials}
          </div>
          <h1 className="mt-5 text-3xl font-semibold tracking-tight text-slate-950">
            {userProfile.name}
          </h1>
          <p className="mt-2 text-sm text-slate-500">{userProfile.email}</p>
          <p className="mt-1 text-sm text-slate-500">{userProfile.role}</p>
          <p className="mt-5 text-sm leading-7 text-slate-600">{userProfile.bio}</p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
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
        </div>
      </section>

      <section className="rounded-[2.5rem] border border-white/80 bg-white p-8 shadow-card">
        <p className="text-sm font-medium uppercase tracking-[0.24em] text-primary-600">
          Recent Courses
        </p>
        <div className="mt-6 grid gap-5 xl:grid-cols-3">
          {recentCourses.map((course) => (
            <div key={course.id} className="rounded-[1.75rem] bg-slate-50 p-5">
              <img
                src={course.thumbnailUrl}
                alt={course.title}
                className="h-36 w-full rounded-[1.5rem] object-cover"
              />
              <h2 className="mt-4 text-xl font-semibold text-slate-950">{course.title}</h2>
              <p className="mt-2 text-sm text-slate-500">{course.instructor}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
