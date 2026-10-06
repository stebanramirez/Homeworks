import { createContext } from "react";
import useFirebaseAuth from "../hooks/useFirebaseAuth";

export const AuthContext = createContext(null);

// contexto para el login / register, el estado sale del hook de firebase
export function AuthProvider({ children }) {
  const auth = useFirebaseAuth();

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}
