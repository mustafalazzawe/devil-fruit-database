import { createContext, useContext } from "react";
import { IAuthState } from "./Auth.types";

export const AuthContext = createContext<IAuthState | undefined>(undefined);
export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }

  return context;
};
