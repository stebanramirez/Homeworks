import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const entrar = async (evt) => {
    evt.preventDefault();
    try {
      await login(email, password);
      navigate("/explorer", { replace: true });
    } catch {
      setError("Correo o contrasena incorrectos");
    }
  };

  return (
    <div className="auth-page">
      <form className="auth-form" onSubmit={entrar}>
        <h1>Iniciar sesion</h1>
        <input type="email" placeholder="Email" value={email} onChange={(evt) => setEmail(evt.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={(evt) => setPassword(evt.target.value)} />
        {error && <p className="error">{error}</p>}
        <button type="submit">Entrar</button>
        <p className="enlace">
          ¿No tienes cuenta? <Link to="/register">Registrate</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
