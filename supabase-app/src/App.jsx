import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import RutaPrivada from "./components/RutaPrivada";
import RutaPublica from "./components/RutaPublica";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Tareas from "./pages/Tareas";
import "./styles/App.css";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/login" element={<RutaPublica><Login /></RutaPublica>} />
          <Route path="/register" element={<RutaPublica><Register /></RutaPublica>} />
          <Route path="/tareas" element={<RutaPrivada><Tareas /></RutaPrivada>} />
          <Route path="/" element={<Navigate to="/tareas" replace />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;