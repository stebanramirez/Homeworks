import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

// custom hook para consumir el AuthContext sin repetir useContext en cada pagina
export function useAuth() {
  return useContext(AuthContext);
}
