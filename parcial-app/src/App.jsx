import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { FilesProvider } from "./context/FilesContext";
import Navbar from "./components/Navbar";
import RutaPrivada from "./components/RutaPrivada";
import RutaPublica from "./components/RutaPublica";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Explorer from "./pages/Explorer";
import "./styles/App.css";

function App() {
  return (
    <AuthProvider>
      <FilesProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/login" element={<RutaPublica><Login /></RutaPublica>} />
            <Route path="/register" element={<RutaPublica><Register /></RutaPublica>} />
            <Route path="/explorer" element={<RutaPrivada><Explorer /></RutaPrivada>} />
            <Route path="/" element={<Navigate to="/explorer" replace />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </BrowserRouter>
      </FilesProvider>
    </AuthProvider>
  );
}

export default App;
