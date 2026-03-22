import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="mx-auto flex max-w-3xl flex-col items-center px-4 py-24 text-center sm:px-6 lg:px-8">
        <div className="rounded-[2.5rem] border border-white/80 bg-white p-10 shadow-soft">
          <p className="text-sm font-medium uppercase tracking-[0.24em] text-primary-600">
            404
          </p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-950">
            This page isn&apos;t in the learning path.
          </h1>
          <p className="mt-4 text-lg leading-8 text-slate-600">
            The route may have changed, or the lesson you were looking for is no longer available.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button href="/courses">Explore Courses</Button>
            <Button href="/dashboard" variant="secondary">
              Go to Dashboard
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
