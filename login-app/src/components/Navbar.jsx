import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

function Navbar() {
  const { usuario, logout } = useAuth();
  const navigate = useNavigate();

  if (!usuario) return null;

  const salir = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <nav className="navbar">
      <div className="nav-links">
        <Link to="/libros">Libros</Link>
        <Link to="/cajero">Cajero</Link>
      </div>
      <div className="nav-user">
        <span>{usuario.email}</span>
        <button onClick={salir}>Salir</button>
      </div>
    </nav>
  );
}

export default Navbar;
