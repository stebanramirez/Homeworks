import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [aviso, setAviso] = useState("");

  const crear = async (evt) => {
    evt.preventDefault();
    setError("");
    setAviso("");

    if (password.length < 6) {
      setError("La contrasena debe tener minimo 6 caracteres");
      return;
    }

    try {
      const data = await register(email, password);

      // con confirm email activo, Supabase devuelve un usuario sin identidades si el correo ya existe
      if (data.user?.identities?.length === 0) {
        setError("Ese correo ya esta registrado");
        return;
      }

      // sin sesion = falta confirmar el correo
      if (!data.session) {
        setAviso("Revisa tu correo para confirmar la cuenta");
        return;
      }

      navigate("/tareas", { replace: true });
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="auth-page">
      <form className="auth-form" onSubmit={crear}>
        <h1>Crear cuenta</h1>
        <input type="email" placeholder="Email" value={email} onChange={(evt) => setEmail(evt.target.value)} />
        <input type="password" placeholder="Password (min 6)" value={password} onChange={(evt) => setPassword(evt.target.value)} />
        {error && <p className="error">{error}</p>}
        {aviso && <p className="aviso">{aviso}</p>}
        <button type="submit">Registrarme</button>
        <p className="enlace">
          ¿Ya tienes cuenta? <Link to="/login">Inicia sesion</Link>
        </p>
      </form>
    </div>
  );
}

export default Register;