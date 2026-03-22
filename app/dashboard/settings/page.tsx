import { Button } from "@/components/ui/button";

export default function SettingsPage() {
  return (
    <div className="space-y-8">
      <div>
        <p className="text-sm font-medium uppercase tracking-[0.24em] text-primary-600">
          Settings
        </p>
        <h1 className="mt-2 text-4xl font-semibold tracking-tight text-slate-950">
          Manage profile preferences and learning notifications.
        </h1>
      </div>

      <section className="rounded-[2.5rem] border border-white/80 bg-white p-8 shadow-soft">
        <div className="grid gap-5 lg:grid-cols-2">
          <label className="space-y-2">
            <span className="text-sm font-medium text-slate-700">Display name</span>
            <input
              defaultValue="Ananya Raj"
              className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none transition-all focus:border-primary-300 focus:bg-white focus:shadow-halo"
            />
          </label>
          <label className="space-y-2">
            <span className="text-sm font-medium text-slate-700">Email</span>
            <input
              defaultValue="ananya@sikho.app"
              className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none transition-all focus:border-primary-300 focus:bg-white focus:shadow-halo"
            />
          </label>
        </div>

        <div className="mt-8 space-y-4">
          {[
            "Email me when a new recommended course matches my progress.",
            "Send weekly progress summaries.",
            "Enable AI tutor tip suggestions during lessons."
          ].map((item, index) => (
            <label
              key={item}
              className="flex items-center justify-between rounded-[1.5rem] bg-slate-50 px-5 py-4"
            >
              <span className="text-sm text-slate-700">{item}</span>
              <input type="checkbox" defaultChecked={index !== 1} className="h-4 w-4" />
            </label>
          ))}
        </div>

        <div className="mt-8">
          <Button>Save Changes</Button>
        </div>
      </section>
    </div>
  );
}
