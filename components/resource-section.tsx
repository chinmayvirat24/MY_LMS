import type { CourseResource } from "@/lib/types";

type ResourceSectionProps = {
  eyebrow: string;
  title: string;
  description: string;
  resources: CourseResource[];
};

export function ResourceSection({
  eyebrow,
  title,
  description,
  resources
}: ResourceSectionProps) {
  return (
    <section className="rounded-[2.25rem] border border-slate-900/10 bg-white p-6 shadow-card">
      <div className="mb-6">
        <p className="text-sm font-medium uppercase tracking-[0.24em] text-primary-600">
          {eyebrow}
        </p>
        <h2 className="mt-3 text-2xl font-semibold tracking-tight text-slate-950">
          {title}
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">{description}</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {resources.map((resource) => (
          <a
            key={`${resource.type}-${resource.title}`}
            href={resource.href}
            target="_blank"
            rel="noreferrer"
            className="group rounded-[1.75rem] border border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)] p-5 transition-all duration-200 hover:-translate-y-1 hover:border-primary-300 hover:shadow-card"
          >
            <div className="flex items-start justify-between gap-4">
              <span className="rounded-full bg-primary-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-primary-700">
                {resource.type}
              </span>
              <span className="text-sm font-medium text-slate-400 transition-colors group-hover:text-primary-600">
                Open
              </span>
            </div>
            <h3 className="mt-5 text-lg font-semibold text-slate-950">{resource.title}</h3>
            <p className="mt-3 text-sm leading-7 text-slate-600">{resource.description}</p>
          </a>
        ))}
      </div>
    </section>
  );
}
