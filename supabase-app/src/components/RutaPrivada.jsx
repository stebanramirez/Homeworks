import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

function RutaPrivada({ children }) {
  const { user, loading } = useAuth();

  if (loading) return <p className="cargando">Cargando...</p>;
  if (!user) return <Navigate to="/login" replace />;
  return children;
}

export default RutaPrivada;