import { Navigate } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import { useAuth } from "../hooks/useAuth";

function RutaPrivada({ children }) {
  const { user, loading } = useAuth();

  // mientras firebase revisa si hay sesion no decidimos nada todavia
  if (loading) {
    return (
      <div className="centered">
        <Spinner animation="border" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default RutaPrivada;
