import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { ProtectedRoute } from "@/components/auth/protected-route";
import { Button } from "@/components/ui/button";
import { subscriptionPlans, userProfile } from "@/lib/data";
import { formatCurrency } from "@/lib/utils";

export default function SubscriptionPage() {
  return (
    <ProtectedRoute>
      <div className="min-h-screen">
        <Navbar />
        <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-medium uppercase tracking-[0.24em] text-primary-600">
              Subscription
            </p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
              Unlock premium courses, AI support, and a smoother learning path.
            </h1>
            <p className="mt-4 text-lg leading-8 text-slate-600">
              Subscription courses stay available as your catalog grows, making Sikho
              ready to scale far beyond the initial 24-course starter library.
            </p>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {subscriptionPlans.map((plan) => (
              <div
                key={plan.name}
                className="rounded-[2.5rem] border border-white/80 bg-white p-8 shadow-soft"
              >
                <p className="text-sm font-medium uppercase tracking-[0.24em] text-primary-600">
                  {plan.seats}
                </p>
                <h2 className="mt-3 text-3xl font-semibold text-slate-950">{plan.name}</h2>
                <p className="mt-4 text-4xl font-semibold text-slate-950">
                  {formatCurrency(plan.price)}
                  <span className="ml-2 text-base font-medium text-slate-500">
                    {plan.billingLabel}
                  </span>
                </p>
                <ul className="mt-6 space-y-4">
                  {plan.perks.map((perk) => (
                    <li key={perk} className="flex gap-3 text-sm leading-7 text-slate-600">
                      <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-primary-100 text-[10px] font-semibold text-primary-700">
                        OK
                      </span>
                      <span>{perk}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-8">
                  <Button className="w-full">
                    {userProfile.activeSubscription ? "Current Plan" : "Subscribe Now"}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </main>
        <Footer />
      </div>
    </ProtectedRoute>
  );
}
