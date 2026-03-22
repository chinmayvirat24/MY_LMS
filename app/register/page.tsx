import Link from "next/link";
import { GuestRoute } from "@/components/auth/guest-route";
import { RegisterForm } from "@/components/auth/register-form";
import { AuthShell } from "@/components/auth-shell";

export default function RegisterPage() {
  return (
    <GuestRoute>
      <AuthShell
        eyebrow="Create account"
        title="Start learning with Sikho"
        subtitle="Create your account first, verify it in the next step, and then unlock protected dashboards, courses, checkout, and learning flows."
        footer={
          <p>
            Already have an account?{" "}
            <Link href="/login" className="font-medium text-primary-700">
              Log in
            </Link>
          </p>
        }
      >
        <RegisterForm />
      </AuthShell>
    </GuestRoute>
  );
}
