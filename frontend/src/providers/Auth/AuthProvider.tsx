import { FC, PropsWithChildren, useCallback, useState } from "react";

import { AuthContext } from "./Auth.context";

const AUTH_STORAGE_KEY = "api_key";

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const [apiKey, setApiKey] = useState<string | null>(() => {
    return localStorage.getItem(AUTH_STORAGE_KEY);
  });

  const login = useCallback((key: string) => {
    localStorage.setItem(AUTH_STORAGE_KEY, key);
    setApiKey(key);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    setApiKey(null);
  }, []);

  const value = {
    apiKey,
    login,
    logout,
    isAuthenticated: !!apiKey,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
