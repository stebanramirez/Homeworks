import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();

  const capturaEmail = (e) => setEmail(e.target.value);
  const capturaPassword = (e) => setPassword(e.target.value);

  const entrar = (evt) => {
    evt.preventDefault();

    const exito = login(email, password);

    if (exito) {
      navigate("/libros", { replace: true });
    } else {
      setError("Correo o contraseña incorrectos");
    }
  };

  return (
    <div className="login-page">
      <form className="login-form" onSubmit={entrar}>
        <h1>Iniciar sesion</h1>

        <input
          placeholder="Email"
          value={email}
          onChange={capturaEmail}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={capturaPassword}
        />

        <button type="submit">Entrar</button>

        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
}

export default Login;
