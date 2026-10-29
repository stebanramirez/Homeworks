function Adyacencia({ red }) {
  const nodos = red.graph.nodes;

  return (
    <div className="panel">
      <h2>Lista de adyacencia</h2>
      {red.graph.isEmpty() && <p className="vacio">El grafo esta vacio</p>}
      <ul className="lista-ady">
        {nodos.map((n) => (
          <li key={n.id}>
            <strong>{n.nombre}</strong> {" -> "}
            {red.graph
              .getAdjacent(n.id)
              .map((v) => v.nombre)
              .join(", ")}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Adyacencia;