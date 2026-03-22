import Link from "next/link";
import { AuthShell } from "@/components/auth-shell";
import { Button } from "@/components/ui/button";

export default function RegisterPage() {
  return (
    <AuthShell
      eyebrow="Create account"
      title="Start learning with Sikho"
      subtitle="Join a calm, premium learning platform with AI tutoring, structured lessons, and progress tracking built in."
      footer={
        <p>
          Already have an account?{" "}
          <Link href="/login" className="font-medium text-primary-700">
            Log in
          </Link>
        </p>
      }
    >
      <form className="space-y-5">
        <label className="block space-y-2">
          <span className="text-sm font-medium text-slate-700">Full name</span>
          <input
            type="text"
            placeholder="Ananya Raj"
            className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-900 outline-none transition-all focus:border-primary-300 focus:bg-white focus:shadow-halo"
          />
        </label>

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
            placeholder="Create a secure password"
            className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-900 outline-none transition-all focus:border-primary-300 focus:bg-white focus:shadow-halo"
          />
        </label>

        <Button className="w-full">Create Account</Button>
        <Button variant="secondary" className="w-full">
          Continue with Google
        </Button>
      </form>
    </AuthShell>
  );
}
