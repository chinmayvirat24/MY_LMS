import Link from "next/link";
import { AuthShell } from "@/components/auth-shell";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  return (
    <AuthShell
      eyebrow="Welcome back"
      title="Log in to Sikho"
      subtitle="Continue your current courses, resume your videos, and pick up exactly where you left off."
      footer={
        <p>
          New to Sikho?{" "}
          <Link href="/register" className="font-medium text-primary-700">
            Create an account
          </Link>
        </p>
      }
    >
      <form className="space-y-5">
        <label className="block space-y-2">
          <span className="text-sm font-medium text-slate-700">Email address</span>
          <input
            type="email"
            placeholder="you@example.com"
            className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-900 outline-none transition-all focus:border-primary-300 focus:bg-white focus:shadow-halo"
          />
        </label>

        <label className="block space-y-2">
          <span className="text-sm font-medium text-slate-700">Password</span>
          <input
            type="password"
            placeholder="********"
            className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-900 outline-none transition-all focus:border-primary-300 focus:bg-white focus:shadow-halo"
          />
        </label>

        <Button className="w-full">Log In</Button>
        <Button variant="secondary" className="w-full">
          Continue with Google
        </Button>
      </form>
    </AuthShell>
  );
}
