import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

function RutaPrivada({ children }) {
  const { usuario } = useAuth();

  if (!usuario) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default RutaPrivada;
