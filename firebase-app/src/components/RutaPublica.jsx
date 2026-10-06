import { Navigate } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import { useAuth } from "../hooks/useAuth";

// login y register: si ya hay sesion no tiene sentido que los vea
function RutaPublica({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="centered">
        <Spinner animation="border" />
      </div>
    );
  }

  if (user) {
    return <Navigate to="/tasks" replace />;
  }

  return children;
}

export default RutaPublica;
