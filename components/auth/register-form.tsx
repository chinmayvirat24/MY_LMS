"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/components/providers/auth-provider";
import { Button } from "@/components/ui/button";

export function RegisterForm() {
  const router = useRouter();
  const { register } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [previewCode, setPreviewCode] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setSubmitting(true);

    try {
      const result = await register({ name, email, password });
      setPreviewCode(result.verificationCode);
      router.push(
        `/verify?email=${encodeURIComponent(result.email)}&code=${encodeURIComponent(
          result.verificationCode
        )}`
      );
    } catch (submissionError) {
      setError(
        submissionError instanceof Error
          ? submissionError.message
          : "Unable to create your account right now."
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <label className="block space-y-2">
        <span className="text-sm font-medium text-slate-700">Full name</span>
        <input
          value={name}
          onChange={(event) => setName(event.target.value)}
          type="text"
          required
          placeholder="Ananya Raj"
          className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-900 outline-none transition-all focus:border-primary-300 focus:bg-white focus:shadow-halo"
        />
      </label>

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
          placeholder="Create a secure password"
          className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-900 outline-none transition-all focus:border-primary-300 focus:bg-white focus:shadow-halo"
        />
      </label>

      <label className="block space-y-2">
        <span className="text-sm font-medium text-slate-700">Confirm password</span>
        <input
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.target.value)}
          type="password"
          required
          placeholder="Repeat your password"
          className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-900 outline-none transition-all focus:border-primary-300 focus:bg-white focus:shadow-halo"
        />
      </label>

      {error ? (
        <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
          {error}
        </div>
      ) : null}

      {previewCode ? (
        <div className="rounded-2xl border border-primary-200 bg-primary-50 px-4 py-4 text-sm text-primary-900">
          Demo verification code: <span className="font-semibold">{previewCode}</span>
          <div className="mt-2">
            <Link
              href={`/verify?email=${encodeURIComponent(email)}&code=${encodeURIComponent(
                previewCode
              )}`}
              className="font-semibold text-primary-700"
            >
              Go to verification
            </Link>
          </div>
        </div>
      ) : null}

      <Button className="w-full" disabled={submitting}>
        {submitting ? "Creating account..." : "Create Account"}
      </Button>
    </form>
  );
}
