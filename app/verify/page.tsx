import Link from "next/link";
import { GuestRoute } from "@/components/auth/guest-route";
import { VerifyForm } from "@/components/auth/verify-form";
import { AuthShell } from "@/components/auth-shell";

type VerifyPageProps = {
  searchParams?: {
    email?: string;
    code?: string;
  };
};

export default function VerifyPage({ searchParams }: VerifyPageProps) {
  return (
    <GuestRoute>
      <AuthShell
        eyebrow="Verify account"
        title="Confirm your email access"
        subtitle="Use the verification code from the demo inbox preview to unlock login access for protected areas of the application."
        footer={
          <p>
            Back to{" "}
            <Link href="/login" className="font-medium text-primary-700">
              login
            </Link>
          </p>
        }
      >
        <VerifyForm
          initialEmail={searchParams?.email}
          initialCode={searchParams?.code}
        />
      </AuthShell>
    </GuestRoute>
  );
}
