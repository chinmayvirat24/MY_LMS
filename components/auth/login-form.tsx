"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SocialButtons } from "@/components/auth/social-buttons";
import { useAuth } from "@/components/providers/auth-provider";
import { Button } from "@/components/ui/button";

export function LoginForm({
  next,
  initialEmail
}: {
  next?: string;
  initialEmail?: string;
}) {
  const router = useRouter();
  const { login, socialSignIn } = useAuth();
  const [email, setEmail] = useState(initialEmail ?? "");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      await login({ email, password });
      router.push(next || "/dashboard");
    } catch (submissionError) {
      setError(
        submissionError instanceof Error
          ? submissionError.message
          : "Unable to log you in right now."
      );
    } finally {
      setSubmitting(false);
    }
  }

  function handleSocial(provider: "google" | "github") {
    socialSignIn(provider);
    router.push(next || "/dashboard");
  }

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <label className="block space-y-2">
        <span className="text-sm font-medium text-slate-700">Email address</span>
        <input
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          type="email"
          required
          placeholder="you@example.com"
          className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-900 outline-none transition-all focus:border-primary-300 focus:bg-white focus:shadow-halo"
        />
      </label>

      <label className="block space-y-2">
        <span className="text-sm font-medium text-slate-700">Password</span>
        <input
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          type="password"
          required
          placeholder="Enter your password"
          className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-900 outline-none transition-all focus:border-primary-300 focus:bg-white focus:shadow-halo"
        />
      </label>

      {error ? (
        <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
          {error}
          {error.toLowerCase().includes("verify") ? (
            <span>
              {" "}
              <Link
                href={`/verify?email=${encodeURIComponent(email)}`}
                className="font-semibold text-primary-700"
              >
                Verify account
              </Link>
            </span>
          ) : null}
        </div>
      ) : null}

      <Button className="w-full" disabled={submitting}>
        {submitting ? "Logging in..." : "Log In"}
      </Button>

      <SocialButtons onSelect={handleSocial} />
    </form>
  );
}
