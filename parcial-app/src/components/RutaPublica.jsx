import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

function RutaPublica({ children }) {
  const { user, loading } = useAuth();

  if (loading) return <p className="cargando">Cargando...</p>;
  if (user) return <Navigate to="/explorer" replace />;
  return children;
}

export default RutaPublica;
