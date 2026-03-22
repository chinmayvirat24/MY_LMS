"use client";

import { useEffect, type ReactNode } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Loader } from "@/components/ui/loader";
import { useAuth } from "@/components/providers/auth-provider";

export function ProtectedRoute({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { status } = useAuth();

  useEffect(() => {
    if (status !== "unauthenticated") {
      return;
    }

    const query = searchParams.toString();
    const next = `${pathname}${query ? `?${query}` : ""}`;
    router.replace(`/login?next=${encodeURIComponent(next)}`);
  }, [pathname, router, searchParams, status]);

  if (status !== "authenticated") {
    return <Loader className="min-h-[50vh]" label="Checking your Sikho session" />;
  }

  return <>{children}</>;
}
