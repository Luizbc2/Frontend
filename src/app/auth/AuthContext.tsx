import { createContext, useContext, useState, type ReactNode } from "react";

import {
  clearStoredSession,
  type AuthSession,
  type AuthUser,
  getStoredToken,
  persistSession,
  readStoredSession,
} from "../lib/auth-storage";
import { loginWithApi, updateProfileWithApi } from "../services/auth";

type UpdateUserProfileInput = {
  name: string;
  cpf: string;
  password: string;
};

type AuthContextValue = {
  isAuthenticated: boolean;
  token: string | null;
  user: AuthUser | null;
  login: (email: string, password: string) => Promise<void>;
  updateUserProfile: (input: UpdateUserProfileInput) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<AuthSession | null>(readStoredSession);

  const login = async (email: string, password: string) => {
    if (!email.trim() || !password.trim()) {
      throw new Error("Preencha e-mail e senha para continuar.");
    }

    const response = await loginWithApi({
      email: email.trim().toLowerCase(),
      password,
    });

    const nextSession: AuthSession = {
      token: response.token,
      user: response.user,
    };

    persistSession(nextSession);
    setSession(nextSession);
  };

  const updateUserProfile = async (input: UpdateUserProfileInput) => {
    if (!session) {
      throw new Error("Nenhum usuario autenticado.");
    }

    const response = await updateProfileWithApi(
      {
        name: input.name.trim(),
        email: session.user.email,
        cpf: input.cpf,
        password: input.password,
      },
      session.token,
    );

    const nextSession: AuthSession = {
      ...session,
      user: response.user,
    };

    persistSession(nextSession);
    setSession(nextSession);
  };

  const logout = () => {
    clearStoredSession();
    setSession(null);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: session !== null,
        token: getStoredToken(),
        user: session?.user ?? null,
        login,
        updateUserProfile,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider.");
  }

  return context;
}
