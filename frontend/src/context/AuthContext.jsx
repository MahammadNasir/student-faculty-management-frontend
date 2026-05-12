import { createContext, useContext, useMemo, useState } from "react";
import { authApi } from "../services/api.js";

const AuthContext = createContext(null);
const STORAGE_KEY = "sfms_auth";

export function AuthProvider({ children }) {
  const [session, setSession] = useState(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  });

  async function login(email, password) {
    const { data } = await authApi.login({ email, password });
    const next = { token: data.token, user: data };
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
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw).token : null;
}
