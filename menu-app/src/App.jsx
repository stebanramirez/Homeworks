import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import menu from "./menu";
import "./styles/App.css";

function App() {
  // una ruta por cada nodo del arbol, recorrido con DFS
  const nodos = menu.dfs();

  console.log("DFS:", nodos.map((n) => n.title).join(" - "));
  console.log("BFS:", menu.bfs().map((n) => n.title).join(" - "));

  return (
    <BrowserRouter>
      <div className="layout">
        <Sidebar menu={menu} />
        <main className="contenido">
          <Routes>
            <Route path="/" element={<Navigate to="/profile" replace />} />
            {nodos.map((n) => (
              <Route key={n.link} path={n.link} element={<n.component />} />
            ))}
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
