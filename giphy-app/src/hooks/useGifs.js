import { useState, useEffect } from "react";
import { buscarGifs } from "../services/giphyService";

// Busca gifs cuando cambia el texto con una pequeña espera y cancela la petición anterior
export default function useGifs(texto) {
  const [gifs, setGifs] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const consulta = texto.trim();
    if (consulta === "") {
      setGifs([]);
      setError("");
      setCargando(false);
      return;
    }

    const controller = new AbortController();
    setCargando(true);
    setError("");

    // debounce: espera 400 ms después de que el usuario deja de escribir
    const timer = setTimeout(async () => {
      try {
        const resultado = await buscarGifs(consulta, controller.signal);
        setGifs(resultado);
      } catch (e) {
        if (e.name === "AbortError") return; // petición cancelada a propósito
        setError(e.message);
        setGifs([]);
      } finally {
        if (!controller.signal.aborted) setCargando(false);
      }
    }, 400);

    // cleanup: si cambia el texto, se cancela el timer y la petición anterior
    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [texto]);

  return { gifs, cargando, error };
}