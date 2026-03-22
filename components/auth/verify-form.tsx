"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/components/providers/auth-provider";
import { Button } from "@/components/ui/button";

export function VerifyForm({
  initialEmail,
  initialCode
}: {
  initialEmail?: string;
  initialCode?: string;
}) {
  const router = useRouter();
  const { verify, pendingVerification } = useAuth();
  const [email, setEmail] = useState(initialEmail ?? "");
  const [code, setCode] = useState(initialCode ?? pendingVerification?.verificationCode ?? "");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setSuccess("");

    try {
      verify({ email, code });
      setSuccess("Your account is verified. You can log in now.");
      router.push(`/login?email=${encodeURIComponent(email)}&verified=1`);
    } catch (submissionError) {
      setError(
        submissionError instanceof Error
          ? submissionError.message
          : "Unable to verify this account."
      );
    }
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
        <span className="text-sm font-medium text-slate-700">Verification code</span>
        <input
          value={code}
          onChange={(event) => setCode(event.target.value)}
          type="text"
          required
          placeholder="Enter 6-digit code"
          className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm tracking-[0.25em] text-slate-900 outline-none transition-all focus:border-primary-300 focus:bg-white focus:shadow-halo"
        />
      </label>

      {pendingVerification?.email === email.toLowerCase() ? (
        <div className="rounded-2xl border border-primary-200 bg-primary-50 px-4 py-4 text-sm text-primary-900">
          Demo code for this account:{" "}
          <span className="font-semibold">{pendingVerification.verificationCode}</span>
        </div>
      ) : null}

      {error ? (
        <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
          {error}
        </div>
      ) : null}

      {success ? (
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
          {success}
        </div>
      ) : null}

      <Button className="w-full">Verify Account</Button>

      <p className="text-sm text-slate-500">
        Need a different account?{" "}
        <Link href="/register" className="font-medium text-primary-700">
          Create one
        </Link>
      </p>
    </form>
  );
}
