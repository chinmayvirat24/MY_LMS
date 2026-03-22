"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/logo";
import { cn } from "@/lib/utils";

const items = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/courses", label: "Courses" },
  { href: "/dashboard/my-learning", label: "My Learning" },
  { href: "/dashboard/saved", label: "Saved" },
  { href: "/dashboard/certificates", label: "Certificates" },
  { href: "/dashboard/subscription", label: "Subscription" },
  { href: "/dashboard/profile", label: "Profile" },
  { href: "/dashboard/settings", label: "Settings" },
  { href: "/login", label: "Logout" }
];

export function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <aside className="sticky top-6 hidden h-[calc(100vh-3rem)] rounded-[2rem] border border-white/80 bg-white p-5 shadow-card lg:block">
      <div className="border-b border-slate-100 pb-5">
        <Logo />
      </div>
      <nav className="mt-5 space-y-2">
        {items.map((item) => {
          const active =
            pathname === item.href || (item.href !== "/" && pathname.startsWith(`${item.href}/`));

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center rounded-2xl px-4 py-3 text-sm transition-all",
                active
                  ? "bg-primary-50 font-medium text-primary-700"
                  : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
              )}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
