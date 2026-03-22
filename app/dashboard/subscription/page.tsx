import { Button } from "@/components/ui/button";
import { purchaseHistory, subscriptionPlans, userProfile } from "@/lib/data";
import { formatCurrency } from "@/lib/utils";

export default function DashboardSubscriptionPage() {
  return (
    <div className="space-y-8">
      <section className="rounded-[2.5rem] border border-white/80 bg-white p-8 shadow-soft">
        <p className="text-sm font-medium uppercase tracking-[0.24em] text-primary-600">
          Subscription Status
        </p>
        <h1 className="mt-2 text-4xl font-semibold tracking-tight text-slate-950">
          {userProfile.activeSubscription ? "Sikho Plus is active" : "Choose a plan"}
        </h1>
        <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-600">
          Manage your subscription access, view plan benefits, and review recent
          purchases from one place.
        </p>
      </section>

      <div className="grid gap-6 lg:grid-cols-2">
        {subscriptionPlans.map((plan) => (
          <div
            key={plan.name}
            className="rounded-[2.5rem] border border-white/80 bg-white p-8 shadow-card"
          >
            <h2 className="text-2xl font-semibold text-slate-950">{plan.name}</h2>
            <p className="mt-3 text-4xl font-semibold text-slate-950">
              {formatCurrency(plan.price)}
              <span className="ml-2 text-base font-medium text-slate-500">
                {plan.billingLabel}
              </span>
            </p>
            <ul className="mt-6 space-y-3 text-sm leading-7 text-slate-600">
              {plan.perks.map((perk) => (
                <li key={perk}>- {perk}</li>
              ))}
            </ul>
            <div className="mt-8">
              <Button className="w-full">
                {userProfile.activeSubscription ? "Current Plan" : "Subscribe"}
              </Button>
            </div>
          </div>
        ))}
      </div>

      <section className="rounded-[2.5rem] border border-white/80 bg-white p-8 shadow-card">
        <h2 className="text-2xl font-semibold text-slate-950">Purchase history</h2>
        <div className="mt-6 space-y-4">
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
                <p className="font-medium text-slate-900">{formatCurrency(purchase.amount)}</p>
                <p className="text-sm text-slate-500">{purchase.status}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
