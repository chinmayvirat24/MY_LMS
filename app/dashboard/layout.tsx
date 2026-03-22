import type { ReactNode } from "react";
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar";
import { Logo } from "@/components/logo";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[#f7f9fc]">
      <div className="border-b border-white/70 bg-white/90 px-4 py-4 backdrop-blur-xl lg:hidden">
        <Logo />
      </div>
      <div className="mx-auto grid max-w-[1600px] gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[280px,1fr] lg:px-8">
        <DashboardSidebar />
        <main className="min-w-0">{children}</main>
      </div>
    </div>
  );
}
