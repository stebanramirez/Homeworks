import { useNavigate } from "react-router-dom";
import { Navbar as BsNavbar, Container, Button } from "react-bootstrap";
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
    <BsNavbar className="app-navbar" variant="dark">
      <Container>
        <BsNavbar.Brand>Mis tareas</BsNavbar.Brand>
        <div className="nav-user">
          <span>{user.email}</span>
          <Button variant="outline-light" size="sm" onClick={salir}>
            Salir
          </Button>
        </div>
      </Container>
    </BsNavbar>
  );
}

export default Navbar;
