import { useState } from "react";
import SearchEngine from "../classes/SearchEngine";

export default function useBuscador() {
  const [motor] = useState(() => SearchEngine.conDatosIniciales());
  const [productos, setProductos] = useState(() => motor.trie.searchByPrefix(""));
  const [prefijo, setPrefijo] = useState("");
  const [k, setK] = useState(2);
  const [resultados, setResultados] = useState([]);
  const [buscado, setBuscado] = useState(false);
  const [error, setError] = useState("");

  const agregarProducto = (nombre, popularidad) => {
    motor.insert(nombre, popularidad); // lanza error si es inválido
    setProductos(motor.trie.searchByPrefix(""));
    setBuscado(false);
  };

  const buscar = (nuevoPrefijo = prefijo, nuevoK = k) => {
    setError("");
    try {
      const top = motor.searchTopK(nuevoPrefijo, nuevoK);
      console.log(`searchTopK("${nuevoPrefijo}", ${nuevoK})`, top);
      setResultados(top);
      setBuscado(true);
    } catch (e) {
      setError(e.message);
      setResultados([]);
      setBuscado(false);
    }
  };

  return { productos, prefijo, setPrefijo, k, setK, resultados, buscado, error, agregarProducto, buscar };
}