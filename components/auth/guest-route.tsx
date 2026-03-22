"use client";

import { useEffect, type ReactNode } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader } from "@/components/ui/loader";
import { useAuth } from "@/components/providers/auth-provider";

export function GuestRoute({
  children,
  redirectTo = "/dashboard"
}: {
  children: ReactNode;
  redirectTo?: string;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { status } = useAuth();

  useEffect(() => {
    if (status !== "authenticated") {
      return;
    }

    const next = searchParams.get("next");
    router.replace(next || redirectTo);
  }, [redirectTo, router, searchParams, status]);

  if (status === "loading") {
    return <Loader className="min-h-screen" label="Loading your Sikho session" />;
  }

  if (status === "authenticated") {
    return <Loader className="min-h-screen" label="Redirecting to your workspace" />;
  }

  return <>{children}</>;
}
