import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, Form, Button, Alert } from "react-bootstrap";
import { useAuth } from "../hooks/useAuth";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [enviando, setEnviando] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const crearCuenta = async (evt) => {
    evt.preventDefault();
    setError("");

    if (password.length < 6) {
      setError("La contraseña debe tener minimo 6 caracteres");
      return;
    }

    setEnviando(true);

    try {
      await register(email, password);
      navigate("/tasks", { replace: true });
    } catch (err) {
      if (err.code === "auth/email-already-in-use") {
        setError("Ese correo ya esta registrado");
      } else {
        setError("No se pudo crear la cuenta");
      }
    }

    setEnviando(false);
  };

  return (
    <div className="centered">
      <Card className="auth-card">
        <Card.Body>
          <h1>Crear cuenta</h1>

          <Form onSubmit={crearCuenta}>
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
                placeholder="Password (minimo 6 caracteres)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>

            {error && <Alert variant="danger">{error}</Alert>}

            <Button type="submit" className="w-100" disabled={enviando}>
              Registrarme
            </Button>
          </Form>

          <p className="auth-link">
            ¿Ya tienes cuenta? <Link to="/login">Inicia sesion</Link>
          </p>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Register;
