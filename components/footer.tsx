import Link from "next/link";
import { Logo } from "@/components/logo";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.2fr_repeat(3,1fr)] lg:px-8">
        <div className="space-y-4">
          <Logo />
          <p className="max-w-sm text-sm leading-6 text-slate-500">
            Sikho combines structured video learning, AI help, and clear progress
            cues so students stay focused from lesson one to completion.
          </p>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-slate-900">Learn</h3>
          <div className="mt-4 space-y-3 text-sm text-slate-500">
            <Link href="/courses" className="block hover:text-slate-900">
              Explore Courses
            </Link>
            <Link href="/dashboard/my-learning" className="block hover:text-slate-900">
              My Learning
            </Link>
            <Link href="/dashboard/certificates" className="block hover:text-slate-900">
              Certificates
            </Link>
          </div>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-slate-900">Platform</h3>
          <div className="mt-4 space-y-3 text-sm text-slate-500">
            <Link href="/subscription" className="block hover:text-slate-900">
              Subscription
            </Link>
            <Link href="/checkout" className="block hover:text-slate-900">
              Checkout
            </Link>
            <Link href="/profile" className="block hover:text-slate-900">
              Profile
            </Link>
          </div>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-slate-900">Support</h3>
          <div className="mt-4 space-y-3 text-sm text-slate-500">
            <a href="mailto:support@sikho.app" className="block hover:text-slate-900">
              support@sikho.app
            </a>
            <Link href="/dashboard/settings" className="block hover:text-slate-900">
              Settings
            </Link>
            <Link href="/login" className="block hover:text-slate-900">
              Login
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
