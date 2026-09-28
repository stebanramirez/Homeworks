import { createContext, useState } from "react";

export const AuthContext = createContext(null);

// credenciales validas segun el challenge
const EMAIL_VALIDO = "user@mail.com";
const PASSWORD_VALIDA = "123";

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(() => {
    const guardado = localStorage.getItem("usuario");
    return guardado ? JSON.parse(guardado) : null;
  });

  const login = (email, password) => {
    if (email === EMAIL_VALIDO && password === PASSWORD_VALIDA) {
      const datos = { email };
      setUsuario(datos);
      localStorage.setItem("usuario", JSON.stringify(datos));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUsuario(null);
    localStorage.removeItem("usuario");
  };

  return (
    <AuthContext.Provider value={{ usuario, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
