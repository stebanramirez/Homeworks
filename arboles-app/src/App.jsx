import { useMemo, useState } from "react";
import ArbolVisual from "./components/ArbolVisual";
import { NUMEROS, construirArbol, imprimirEnConsola } from "./arbol";
import "./styles/App.css";

function App() {
  const [numeros, setNumeros] = useState(NUMEROS);
  const [valorInsertar, setValorInsertar] = useState("");
  const [valorBuscar, setValorBuscar] = useState("");
  const [mensajeInsertar, setMensajeInsertar] = useState("");
  const [mensajeBuscar, setMensajeBuscar] = useState("");
  const [encontrado, setEncontrado] = useState(null);

  const arbol = useMemo(() => construirArbol(numeros), [numeros]);

  const insertar = (evt) => {
    evt.preventDefault();
    if (valorInsertar.trim() === "") return;

    const valor = Number(valorInsertar);
    if (Number.isNaN(valor)) return;

    if (numeros.includes(valor)) {
      setMensajeInsertar(`El ${valor} ya esta en el arbol`);
      return;
    }

    const nuevos = [...numeros, valor];
    setNumeros(nuevos);
    setMensajeInsertar(`Se inserto el ${valor}`);
    setValorInsertar("");
    setEncontrado(null);
    setMensajeBuscar("");
    imprimirEnConsola(construirArbol(nuevos));
  };

  const buscar = (evt) => {
    evt.preventDefault();
    if (valorBuscar.trim() === "") return;

    const valor = Number(valorBuscar);
    if (Number.isNaN(valor)) return;

    if (arbol.contains(valor)) {
      setEncontrado(String(valor));
      setMensajeBuscar(`El ${valor} SI esta en el arbol`);
    } else {
      setEncontrado(null);
      setMensajeBuscar(`El ${valor} NO esta en el arbol`);
    }
  };

  return (
    <div className="pagina">
      <h1>Arbol binario</h1>
      <p className="subtitulo">Los recorridos tambien se imprimen en la consola del navegador</p>

      <div className="formularios">
        <form onSubmit={insertar}>
          <input
            type="number"
            placeholder="Insertar numero"
            value={valorInsertar}
            onChange={(evt) => setValorInsertar(evt.target.value)}
          />
          <button type="submit">Insertar</button>
          <p className="mensaje">{mensajeInsertar}</p>
        </form>

        <form onSubmit={buscar}>
          <input
            type="number"
            placeholder="Buscar numero"
            value={valorBuscar}
            onChange={(evt) => setValorBuscar(evt.target.value)}
          />
          <button type="submit">Buscar</button>
          <p className="mensaje">{mensajeBuscar}</p>
        </form>
      </div>

      <ArbolVisual data={arbol.toD3()} encontrado={encontrado} />

      <div className="recorridos">
        <div className="recorrido">
          <h2>InOrder</h2>
          <p>{arbol.inOrder().join(" - ")}</p>
        </div>
        <div className="recorrido">
          <h2>PostOrder</h2>
          <p>{arbol.postOrder().join(" - ")}</p>
        </div>
        <div className="recorrido">
          <h2>PreOrder</h2>
          <p>{arbol.preOrder().join(" - ")}</p>
        </div>
      </div>
    </div>
  );
}

export default App;
