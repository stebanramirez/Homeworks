import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import RutaPrivada from "./components/RutaPrivada";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Libros from "./pages/Libros";
import Cajero from "./pages/Cajero";
import "./App.css";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route
            path="/libros"
            element={
              <RutaPrivada>
                <Libros />
              </RutaPrivada>
            }
          />

          <Route
            path="/cajero"
            element={
              <RutaPrivada>
                <Cajero />
              </RutaPrivada>
            }
          />

          <Route path="/" element={<Navigate to="/libros" replace />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
