import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { CourseCard } from "@/components/course-card";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import {
  getCourseProgress,
  getPopularCourses,
  hasCourseAccess,
  platformFeatures,
  testimonials
} from "@/lib/data";
import { getCourseAction } from "@/lib/utils";

export default function HomePage() {
  const popularCourses = getPopularCourses();

  return (
    <div className="min-h-screen">
      <Navbar />

      <main>
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-hero-grid bg-[size:42px_42px] opacity-40" />
          <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.08fr,0.92fr] lg:px-8 lg:py-24">
            <Reveal className="relative space-y-8">
              <div className="inline-flex rounded-full border border-primary-100 bg-primary-50 px-4 py-2 text-sm font-medium text-primary-700">
                Premium AI learning for focused students
              </div>
              <div className="space-y-6">
                <h1 className="max-w-3xl text-balance text-5xl font-semibold leading-tight tracking-tight text-slate-950 sm:text-6xl">
                  AI Powered Learning Platform
                </h1>
                <p className="max-w-2xl text-lg leading-8 text-slate-600">
                  Learn through structured video paths, a context-aware AI tutor,
                  smooth progress tracking, and curated recommendations designed to
                  keep the next step obvious.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button href="/courses" size="lg">
                  Explore Courses
                </Button>
                <Button href="/register" variant="secondary" size="lg">
                  Get Started
                </Button>
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                {[
                  ["24", "Curated courses"],
                  ["216", "Video lessons"],
                  ["4.8", "Average learner rating"]
                ].map(([value, label], index) => (
                  <Reveal key={label} delay={0.08 * index}>
                    <div className="rounded-[1.75rem] border border-white/70 bg-white/85 p-5 shadow-card backdrop-blur-sm">
                      <p className="text-3xl font-semibold text-slate-950">{value}</p>
                      <p className="mt-2 text-sm text-slate-500">{label}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.1} className="relative">
              <div className="rounded-[2.5rem] border border-white/70 bg-white/85 p-6 shadow-soft backdrop-blur-sm">
                <div className="rounded-[2rem] border border-slate-100 bg-slate-50 p-6">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-sm font-medium uppercase tracking-[0.24em] text-primary-600">
                        Learning Focus
                      </p>
                      <h2 className="mt-2 text-2xl font-semibold text-slate-950">
                        Content-first workspace
                      </h2>
                    </div>
                    <span className="rounded-full bg-white px-4 py-2 text-sm text-slate-600 shadow-sm">
                      Light theme
                    </span>
                  </div>
                  <div className="mt-6 grid gap-4">
                    {[
                      "Watch lessons in a distraction-light player.",
                      "Ask the AI tutor for explanations without switching tabs.",
                      "Track progress and unlock lessons in sequence."
                    ].map((item, index) => (
                      <div key={item} className="flex gap-4 rounded-[1.5rem] bg-white p-4 shadow-sm">
                        <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-primary-100 text-primary-700">
                          {index + 1}
                        </span>
                        <p className="text-sm leading-7 text-slate-600">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-[1.75rem] bg-gradient-to-br from-white to-primary-50 p-5">
                    <p className="text-sm text-slate-500">AI Tutor</p>
                    <p className="mt-2 text-xl font-semibold text-slate-950">
                      Context-aware guidance
                    </p>
                  </div>
                  <div className="rounded-[1.75rem] bg-gradient-to-br from-white to-sky-50 p-5">
                    <p className="text-sm text-slate-500">Recommendations</p>
                    <p className="mt-2 text-xl font-semibold text-slate-950">
                      Smart next-course flow
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <Reveal>
            <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm font-medium uppercase tracking-[0.24em] text-primary-600">
                  Features
                </p>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">
                  Built for clear learning flow
                </h2>
              </div>
              <p className="max-w-xl text-sm leading-7 text-slate-500">
                Minimal UI, generous spacing, and fast transitions keep the focus on
                the lesson rather than the chrome around it.
              </p>
            </div>
          </Reveal>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {platformFeatures.map((feature, index) => (
              <Reveal key={feature.title} delay={index * 0.05}>
                <div className="h-full rounded-[2rem] border border-white/80 bg-white p-6 shadow-card">
                  <p className="text-sm font-medium uppercase tracking-[0.24em] text-primary-600">
                    {feature.metric}
                  </p>
                  <h3 className="mt-4 text-xl font-semibold text-slate-950">
                    {feature.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-slate-500">
                    {feature.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <Reveal>
            <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm font-medium uppercase tracking-[0.24em] text-primary-600">
                  Popular Courses
                </p>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">
                  Start with what students love most
                </h2>
              </div>
              <Button href="/courses" variant="secondary">
                View Full Catalog
              </Button>
            </div>
          </Reveal>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {popularCourses.map((course, index) => {
              const accessible = hasCourseAccess(course);
              const action = getCourseAction(course, accessible);

              return (
                <Reveal key={course.id} delay={index * 0.05}>
                  <CourseCard
                    course={course}
                    progress={getCourseProgress(course).percent}
                    actionHref={action.href}
                    actionLabel={action.label}
                  />
                </Reveal>
              );
            })}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <Reveal>
            <div className="rounded-[2.5rem] border border-white/80 bg-white p-8 shadow-soft sm:p-10">
              <div className="grid gap-8 lg:grid-cols-[0.9fr,1.1fr]">
                <div>
                  <p className="text-sm font-medium uppercase tracking-[0.24em] text-primary-600">
                    Testimonials
                  </p>
                  <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">
                    Learners keep the momentum because the flow stays clear.
                  </h2>
                </div>
                <div className="grid gap-4">
                  {testimonials.map((testimonial, index) => (
                    <Reveal key={testimonial.name} delay={index * 0.06}>
                      <div className="rounded-[1.75rem] bg-slate-50 p-6">
                        <p className="text-base leading-8 text-slate-600">
                          "{testimonial.quote}"
                        </p>
                        <div className="mt-4">
                          <p className="font-semibold text-slate-900">{testimonial.name}</p>
                          <p className="text-sm text-slate-500">{testimonial.role}</p>
                        </div>
                      </div>
                    </Reveal>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </section>
      </main>

      <Footer />
    </div>
  );
}
