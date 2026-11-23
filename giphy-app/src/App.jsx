import { useState } from "react";
import useGifs from "./hooks/useGifs";
import Buscador from "./components/Buscador";
import GifGrid from "./components/GifGrid";
import "./styles/App.css";

export default function App() {
  const [texto, setTexto] = useState("");
  const { gifs, cargando, error } = useGifs(texto);

  return (
    <div className="app">
      <h1>Buscador de GIFs</h1>
      <Buscador valor={texto} onCambio={setTexto} />

      {cargando && <p className="info">Buscando...</p>}
      {error && <p className="error">{error}</p>}
      {!cargando && !error && texto.trim() !== "" && gifs.length === 0 && (
        <p className="info">No se encontraron gifs para "{texto.trim()}"</p>
      )}
      {texto.trim() === "" && <p className="info">Escribe algo para buscar gifs</p>}

      <GifGrid gifs={gifs} />
    </div>
  );
}