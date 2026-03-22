import type { Metadata } from "next";
import type { ReactNode } from "react";
import { AuthProvider } from "@/components/providers/auth-provider";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: "Sikho",
  description: "AI-powered learning platform frontend built with Next.js and Tailwind CSS."
};

export default function RootLayout({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
