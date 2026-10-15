import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const crear = async (evt) => {
    evt.preventDefault();

    if (password.length < 6) {
      setError("La contrasena debe tener minimo 6 caracteres");
      return;
    }

    try {
      await register(email, password);
      navigate("/explorer", { replace: true });
    } catch (err) {
      if (err.code === "auth/email-already-in-use") {
        setError("Ese correo ya esta registrado");
      } else {
        setError("No se pudo crear la cuenta");
      }
    }
  };

  return (
    <div className="auth-page">
      <form className="auth-form" onSubmit={crear}>
        <h1>Crear cuenta</h1>
        <input type="email" placeholder="Email" value={email} onChange={(evt) => setEmail(evt.target.value)} />
        <input type="password" placeholder="Password (min 6)" value={password} onChange={(evt) => setPassword(evt.target.value)} />
        {error && <p className="error">{error}</p>}
        <button type="submit">Registrarme</button>
        <p className="enlace">
          ¿Ya tienes cuenta? <Link to="/login">Inicia sesion</Link>
        </p>
      </form>
    </div>
  );
}

export default Register;
