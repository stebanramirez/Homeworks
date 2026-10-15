import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) return null;

  const salir = async () => {
    await logout();
    navigate("/login", { replace: true });
  };

  return (
    <header className="navbar">
      <strong>Explorador de archivos</strong>
      <div className="nav-user">
        <span>{user.email}</span>
        <button onClick={salir}>Salir</button>
      </div>
    </header>
  );
}

export default Navbar;
