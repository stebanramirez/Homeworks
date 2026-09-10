import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SongsPage from "./pages/SongsPage";
import BrowserHistoryPage from "./pages/BrowserHistoryPage";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <nav className="top-nav">
        <NavLink to="/" end>
          Inicio
        </NavLink>
        <NavLink to="/songs">Canciones</NavLink>
        <NavLink to="/history">Historial</NavLink>
      </nav>

      <main className="content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/songs" element={<SongsPage />} />
          <Route path="/history" element={<BrowserHistoryPage />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;