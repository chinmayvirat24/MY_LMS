import Link from "next/link";
import { GuestRoute } from "@/components/auth/guest-route";
import { LoginForm } from "@/components/auth/login-form";
import { AuthShell } from "@/components/auth-shell";

type LoginPageProps = {
  searchParams?: {
    next?: string;
    email?: string;
    verified?: string;
  };
};

export default function LoginPage({ searchParams }: LoginPageProps) {
  const next = searchParams?.next;
  const email = searchParams?.email;
  const verified = searchParams?.verified === "1";

  return (
    <GuestRoute>
      <AuthShell
        eyebrow="Welcome back"
        title="Log in to Sikho"
        subtitle="Register, verify your account, and then resume your learning flow with protected access across the app."
        footer={
          <div className="space-y-2">
            {verified ? (
              <p className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-emerald-700">
                Your account is verified. You can log in now.
              </p>
            ) : null}
            <p>
              New to Sikho?{" "}
              <Link href="/register" className="font-medium text-primary-700">
                Create an account
              </Link>
            </p>
          </div>
        }
      >
        <LoginForm next={next} initialEmail={email} />
      </AuthShell>
    </GuestRoute>
  );
}
