import { createContext, useContext, useMemo, useState } from "react";
import { authApi } from "../services/api.js";

const AuthContext = createContext(null);
const STORAGE_KEY = "sfms_auth";

function isValidSession(session) {
  return Boolean(
    session?.token &&
    session?.user &&
    typeof session.user.role === "string" &&
    typeof session.user.userId !== "undefined"
  );
}

function readStoredSession() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const session = raw ? JSON.parse(raw) : null;
    if (!session) return null;
    if (isValidSession(session)) return session;
    localStorage.removeItem(STORAGE_KEY);
    return null;
  } catch {
    localStorage.removeItem(STORAGE_KEY);
    return null;
  }
}

export function AuthProvider({ children }) {
  const [session, setSession] = useState(readStoredSession);

  async function login(email, password) {
    const { data } = await authApi.login({ email, password });
    const next = { token: data.token, user: data };
    if (!isValidSession(next)) {
      throw new Error("Invalid login response.");
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    setSession(next);
  }

  function logout() {
    localStorage.removeItem(STORAGE_KEY);
    setSession(null);
  }

  const value = useMemo(() => ({
    token: session?.token,
    user: session?.user,
    isAuthenticated: Boolean(session?.token),
    login,
    logout
  }), [session]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}

export function getStoredToken() {
  return readStoredSession()?.token ?? null;
}
