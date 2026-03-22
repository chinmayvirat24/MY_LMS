"use client";

export type AuthProvider = "credentials" | "google" | "github";

export type StoredUser = {
  id: string;
  name: string;
  email: string;
  passwordHash: string | null;
  isVerified: boolean;
  verificationCode: string | null;
  provider: AuthProvider;
  createdAt: string;
};

export type AuthSession = {
  id: string;
  name: string;
  email: string;
  provider: AuthProvider;
};

type RegisterInput = {
  name: string;
  email: string;
  password: string;
};

type VerifyInput = {
  email: string;
  code: string;
};

type LoginInput = {
  email: string;
  password: string;
};

type RegisterResult = {
  email: string;
  verificationCode: string;
};

type PendingVerification = {
  email: string;
  verificationCode: string;
  createdAt: string;
};

const USERS_KEY = "sikho_auth_users";
const SESSION_KEY = "sikho_auth_session";
const PENDING_KEY = "sikho_pending_verification";
const COOKIE_KEY = "sikho_session";

function hasWindow() {
  return typeof window !== "undefined";
}

function readJson<T>(key: string, fallback: T): T {
  if (!hasWindow()) {
    return fallback;
  }

  const raw = window.localStorage.getItem(key);

  if (!raw) {
    return fallback;
  }

  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function writeJson(key: string, value: unknown) {
  if (!hasWindow()) {
    return;
  }

  window.localStorage.setItem(key, JSON.stringify(value));
}

function setSessionCookie(session: AuthSession | null) {
  if (!hasWindow()) {
    return;
  }

  if (!session) {
    document.cookie = `${COOKIE_KEY}=; path=/; max-age=0; samesite=lax`;
    return;
  }

  document.cookie = `${COOKIE_KEY}=${encodeURIComponent(
    JSON.stringify(session)
  )}; path=/; max-age=${60 * 60 * 24 * 30}; samesite=lax`;
}

function readCookie(name: string) {
  if (!hasWindow()) {
    return null;
  }

  const cookie = document.cookie
    .split("; ")
    .find((entry) => entry.startsWith(`${name}=`));

  return cookie ? decodeURIComponent(cookie.split("=")[1] ?? "") : null;
}

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

function getUsers() {
  return readJson<StoredUser[]>(USERS_KEY, []);
}

function saveUsers(users: StoredUser[]) {
  writeJson(USERS_KEY, users);
}

function saveSession(session: AuthSession | null) {
  if (!hasWindow()) {
    return;
  }

  if (session) {
    writeJson(SESSION_KEY, session);
  } else {
    window.localStorage.removeItem(SESSION_KEY);
  }

  setSessionCookie(session);
}

export function getSession() {
  const storedSession = readJson<AuthSession | null>(SESSION_KEY, null);

  if (storedSession) {
    return storedSession;
  }

  const cookieSession = readCookie(COOKIE_KEY);

  if (!cookieSession) {
    return null;
  }

  try {
    const parsed = JSON.parse(cookieSession) as AuthSession;
    writeJson(SESSION_KEY, parsed);
    return parsed;
  } catch {
    return null;
  }
}

async function hashPassword(email: string, password: string) {
  const content = new TextEncoder().encode(`${normalizeEmail(email)}::${password}`);
  const digest = await window.crypto.subtle.digest("SHA-256", content);

  return Array.from(new Uint8Array(digest))
    .map((value) => value.toString(16).padStart(2, "0"))
    .join("");
}

function buildVerificationCode() {
  return `${Math.floor(100000 + Math.random() * 900000)}`;
}

function createSession(user: StoredUser): AuthSession {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    provider: user.provider
  };
}

export function getPendingVerification(email?: string) {
  const pending = readJson<PendingVerification | null>(PENDING_KEY, null);

  if (!pending) {
    return null;
  }

  if (email && pending.email !== normalizeEmail(email)) {
    return null;
  }

  return pending;
}

export async function registerUser({
  name,
  email,
  password
}: RegisterInput): Promise<RegisterResult> {
  const normalizedEmail = normalizeEmail(email);
  const users = getUsers();

  if (users.some((user) => user.email === normalizedEmail)) {
    throw new Error("An account with this email already exists.");
  }

  const verificationCode = buildVerificationCode();
  const passwordHash = await hashPassword(normalizedEmail, password);
  const nextUser: StoredUser = {
    id: crypto.randomUUID(),
    name: name.trim(),
    email: normalizedEmail,
    passwordHash,
    isVerified: false,
    verificationCode,
    provider: "credentials",
    createdAt: new Date().toISOString()
  };

  saveUsers([...users, nextUser]);
  writeJson(PENDING_KEY, {
    email: normalizedEmail,
    verificationCode,
    createdAt: new Date().toISOString()
  });

  return {
    email: normalizedEmail,
    verificationCode
  };
}

export function verifyUser({ email, code }: VerifyInput) {
  const normalizedEmail = normalizeEmail(email);
  const users = getUsers();
  const user = users.find((entry) => entry.email === normalizedEmail);

  if (!user) {
    throw new Error("No account found for this email.");
  }

  if (user.isVerified) {
    return true;
  }

  if (user.verificationCode !== code.trim()) {
    throw new Error("The verification code is incorrect.");
  }

  saveUsers(
    users.map((entry) =>
      entry.email === normalizedEmail
        ? { ...entry, isVerified: true, verificationCode: null }
        : entry
    )
  );

  if (hasWindow()) {
    window.localStorage.removeItem(PENDING_KEY);
  }

  return true;
}

export async function loginUser({
  email,
  password
}: LoginInput): Promise<AuthSession> {
  const normalizedEmail = normalizeEmail(email);
  const users = getUsers();
  const user = users.find((entry) => entry.email === normalizedEmail);

  if (!user || !user.passwordHash) {
    throw new Error("Invalid email or password.");
  }

  if (!user.isVerified) {
    throw new Error("Please verify your account before logging in.");
  }

  const passwordHash = await hashPassword(normalizedEmail, password);

  if (passwordHash !== user.passwordHash) {
    throw new Error("Invalid email or password.");
  }

  const session = createSession(user);
  saveSession(session);
  return session;
}

export function socialLogin(provider: Exclude<AuthProvider, "credentials">) {
  const users = getUsers();
  const normalizedEmail = `${provider}.learner@sikho.app`;
  let user = users.find((entry) => entry.email === normalizedEmail);

  if (!user) {
    user = {
      id: crypto.randomUUID(),
      name: provider === "google" ? "Google Learner" : "GitHub Learner",
      email: normalizedEmail,
      passwordHash: null,
      isVerified: true,
      verificationCode: null,
      provider,
      createdAt: new Date().toISOString()
    };

    saveUsers([...users, user]);
  }

  const session = createSession(user);
  saveSession(session);
  return session;
}

export function logoutUser() {
  saveSession(null);
}
