import useBuscador from "./hooks/useBuscador";
import FormProducto from "./components/FormProducto";
import Buscador from "./components/Buscador";
import ListaProductos from "./components/ListaProductos";
import "./styles/App.css";

export default function App() {
  const b = useBuscador();

  return (
    <div className="app">
      <h1>Buscador inteligente: Trie + Heap</h1>
      <div className="grid">
        <FormProducto onAgregar={b.agregarProducto} />
        <Buscador
          prefijo={b.prefijo}
          setPrefijo={b.setPrefijo}
          k={b.k}
          setK={b.setK}
          resultados={b.resultados}
          buscado={b.buscado}
          error={b.error}
          onBuscar={b.buscar}
        />
      </div>
      <ListaProductos productos={b.productos} />
    </div>
  );
}