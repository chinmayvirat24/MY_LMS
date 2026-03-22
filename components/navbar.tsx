"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useAuth } from "@/components/providers/auth-provider";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const links = [
  { href: "/courses", label: "Courses" },
  { href: "/subscription", label: "Pricing" },
  { href: "/dashboard", label: "Dashboard" }
];

export function Navbar() {
  const pathname = usePathname();
  const { session, logout, status } = useAuth();

  return (
    <motion.header
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="sticky top-0 z-40 border-b border-slate-900/8 bg-white/85 backdrop-blur-xl"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <Logo />
        <nav className="hidden items-center gap-2 rounded-full border border-slate-900/10 bg-white p-1.5 shadow-sm md:flex">
          {links.map((link) => {
            const active =
              pathname === link.href || pathname.startsWith(`${link.href}/`);

            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "rounded-full px-4 py-2 text-sm transition-colors",
                  active
                    ? "bg-slate-950 text-white"
                    : "text-slate-500 hover:bg-primary-50 hover:text-primary-700"
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center gap-3">
          {status === "authenticated" && session ? (
            <>
              <span className="hidden rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-600 shadow-sm sm:inline-flex">
                {session.name}
              </span>
              <Button href="/dashboard" variant="ghost" size="sm">
                Dashboard
              </Button>
              <Button type="button" size="sm" onClick={logout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button href="/login" variant="ghost" size="sm" className="hidden sm:inline-flex">
                Log in
              </Button>
              <Button href="/register" size="sm">
                Get Started
              </Button>
            </>
          )}
        </div>
      </div>
    </motion.header>
  );
}
