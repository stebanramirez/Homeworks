import { createContext } from "react";
import { useSupabaseAuth } from "../hooks/useSupabaseAuth";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const auth = useSupabaseAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}