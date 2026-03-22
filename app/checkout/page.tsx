import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { ProtectedRoute } from "@/components/auth/protected-route";
import { Button } from "@/components/ui/button";
import { purchaseHistory, getCourseBySlug } from "@/lib/data";
import { formatCurrency } from "@/lib/utils";

type CheckoutPageProps = {
  searchParams?: {
    course?: string | string[];
  };
};

export default function CheckoutPage({ searchParams }: CheckoutPageProps) {
  const selectedSlug = Array.isArray(searchParams?.course)
    ? searchParams?.course[0]
    : searchParams?.course;
  const selectedCourse = selectedSlug
    ? getCourseBySlug(selectedSlug)
    : null;

  return (
    <ProtectedRoute>
      <div className="min-h-screen">
        <Navbar />
        <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="mb-10 max-w-3xl">
            <p className="text-sm font-medium uppercase tracking-[0.24em] text-primary-600">
              Checkout
            </p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-950">
              Complete your course purchase with a clean, fast checkout flow.
            </h1>
          </div>

          <div className="grid gap-8 lg:grid-cols-[1fr,0.9fr]">
            <section className="rounded-[2.5rem] border border-white/80 bg-white p-8 shadow-soft">
              <h2 className="text-2xl font-semibold text-slate-950">Payment Details</h2>
              <div className="mt-6 grid gap-5">
                <label className="space-y-2">
                  <span className="text-sm font-medium text-slate-700">Cardholder name</span>
                  <input
                    className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none transition-all focus:border-primary-300 focus:bg-white focus:shadow-halo"
                    placeholder="Ananya Raj"
                  />
                </label>
                <label className="space-y-2">
                  <span className="text-sm font-medium text-slate-700">Card number</span>
                  <input
                    className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none transition-all focus:border-primary-300 focus:bg-white focus:shadow-halo"
                    placeholder="1234 5678 9012 3456"
                  />
                </label>
                <div className="grid gap-5 sm:grid-cols-2">
                  <label className="space-y-2">
                    <span className="text-sm font-medium text-slate-700">Expiry</span>
                    <input
                      className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none transition-all focus:border-primary-300 focus:bg-white focus:shadow-halo"
                      placeholder="MM / YY"
                    />
                  </label>
                  <label className="space-y-2">
                    <span className="text-sm font-medium text-slate-700">CVV</span>
                    <input
                      className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none transition-all focus:border-primary-300 focus:bg-white focus:shadow-halo"
                      placeholder="123"
                    />
                  </label>
                </div>
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button>{selectedCourse ? "Pay Securely" : "Complete Purchase"}</Button>
                <Button href="/courses" variant="secondary">
                  Back to Courses
                </Button>
              </div>
            </section>

            <section className="space-y-6">
              <div className="rounded-[2.5rem] border border-white/80 bg-white p-8 shadow-soft">
                <p className="text-sm font-medium uppercase tracking-[0.24em] text-primary-600">
                  Order Summary
                </p>
                <h2 className="mt-3 text-2xl font-semibold text-slate-950">
                  {selectedCourse ? selectedCourse.title : "Sikho Premium Course"}
                </h2>
                <p className="mt-3 text-sm leading-7 text-slate-500">
                  {selectedCourse?.shortDescription ??
                    "Select a paid course from the catalog to prefill your order summary here."}
                </p>
                <div className="mt-6 rounded-[1.75rem] bg-slate-50 p-5">
                  <div className="flex items-center justify-between text-sm text-slate-500">
                    <span>Course price</span>
                    <span className="font-medium text-slate-900">
                      {formatCurrency(selectedCourse?.price ?? 1799)}
                    </span>
                  </div>
                  <div className="mt-3 flex items-center justify-between text-sm text-slate-500">
                    <span>Platform fee</span>
                    <span className="font-medium text-slate-900">Included</span>
                  </div>
                  <div className="mt-4 border-t border-slate-200 pt-4 text-base font-semibold text-slate-950">
                    Total: {formatCurrency(selectedCourse?.price ?? 1799)}
                  </div>
                </div>
              </div>

              <div className="rounded-[2.5rem] border border-white/80 bg-white p-8 shadow-soft">
                <p className="text-sm font-medium uppercase tracking-[0.24em] text-primary-600">
                  Purchase History
                </p>
                <div className="mt-5 space-y-4">
                  {purchaseHistory.map((purchase) => (
                    <div
                      key={purchase.id}
                      className="flex items-center justify-between rounded-[1.5rem] bg-slate-50 p-4"
                    >
                      <div>
                        <p className="font-medium text-slate-900">{purchase.label}</p>
                        <p className="text-sm text-slate-500">{purchase.date}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-slate-900">
                          {formatCurrency(purchase.amount)}
                        </p>
                        <p className="text-sm text-slate-500">{purchase.status}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>
        </main>
        <Footer />
      </div>
    </ProtectedRoute>
  );
}
