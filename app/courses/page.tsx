import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { ProtectedRoute } from "@/components/auth/protected-route";
import { CourseBrowser } from "@/components/course-browser";
import { Reveal } from "@/components/ui/reveal";
import { courses } from "@/lib/data";

export default function CoursesPage() {
  return (
    <ProtectedRoute>
      <div className="min-h-screen">
        <Navbar />
        <main className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <Reveal>
            <div className="mb-10 max-w-3xl">
              <p className="text-sm font-medium uppercase tracking-[0.24em] text-primary-600">
                Course Catalog
              </p>
              <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
                Explore structured learning tracks across frontend, backend, data, and programming.
              </h1>
              <p className="mt-4 text-lg leading-8 text-slate-600">
                Free, paid, and subscription courses are organized into a calm browsing
                experience with search, filters, progress cues, and lightweight pagination.
              </p>
            </div>
          </Reveal>

          <CourseBrowser courses={courses} />
        </main>
        <Footer />
      </div>
    </ProtectedRoute>
  );
}
