"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode
} from "react";
import type { AuthSession, AuthProvider as SessionProviderType } from "@/lib/auth";
import {
  getPendingVerification,
  getSession,
  loginUser,
  logoutUser,
  registerUser,
  socialLogin,
  verifyUser
} from "@/lib/auth";

type AuthContextValue = {
  session: AuthSession | null;
  status: "loading" | "authenticated" | "unauthenticated";
  pendingVerification: ReturnType<typeof getPendingVerification>;
  register: typeof registerUser;
  verify: typeof verifyUser;
  login: typeof loginUser;
  socialSignIn: (provider: Exclude<SessionProviderType, "credentials">) => AuthSession;
  logout: () => void;
  refresh: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<AuthSession | null>(null);
  const [status, setStatus] = useState<"loading" | "authenticated" | "unauthenticated">(
    "loading"
  );
  const [pendingVerification, setPendingVerification] = useState(
    getPendingVerification()
  );

  function refresh() {
    const currentSession = getSession();
    setSession(currentSession);
    setPendingVerification(getPendingVerification());
    setStatus(currentSession ? "authenticated" : "unauthenticated");
  }

  useEffect(() => {
    refresh();

    function handleStorage() {
      refresh();
    }

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      session,
      status,
      pendingVerification,
      register: async (input) => {
        const result = await registerUser(input);
        setPendingVerification(getPendingVerification(result.email));
        setStatus(session ? "authenticated" : "unauthenticated");
        return result;
      },
      verify: (input) => {
        const result = verifyUser(input);
        setPendingVerification(getPendingVerification(input.email));
        refresh();
        return result;
      },
      login: async (input) => {
        const nextSession = await loginUser(input);
        setSession(nextSession);
        setStatus("authenticated");
        return nextSession;
      },
      socialSignIn: (provider) => {
        const nextSession = socialLogin(provider);
        setSession(nextSession);
        setStatus("authenticated");
        return nextSession;
      },
      logout: () => {
        logoutUser();
        setSession(null);
        setStatus("unauthenticated");
      },
      refresh
    }),
    [pendingVerification, session, status]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider.");
  }

  return context;
}
