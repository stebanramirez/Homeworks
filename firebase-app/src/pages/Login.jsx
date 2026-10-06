import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, Form, Button, Alert } from "react-bootstrap";
import { useAuth } from "../hooks/useAuth";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [enviando, setEnviando] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const entrar = async (evt) => {
    evt.preventDefault();
    setError("");
    setEnviando(true);

    try {
      await login(email, password);
      navigate("/tasks", { replace: true });
    } catch (err) {
      setError("Correo o contraseña incorrectos");
    }

    setEnviando(false);
  };

  return (
    <div className="centered">
      <Card className="auth-card">
        <Card.Body>
          <h1>Iniciar sesion</h1>

          <Form onSubmit={entrar}>
            <Form.Group className="mb-3">
              <Form.Control
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>

            {error && <Alert variant="danger">{error}</Alert>}

            <Button type="submit" className="w-100" disabled={enviando}>
              Entrar
            </Button>
          </Form>

          <p className="auth-link">
            ¿No tienes cuenta? <Link to="/register">Registrate</Link>
          </p>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Login;
