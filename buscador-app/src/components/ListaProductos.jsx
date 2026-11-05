export default function ListaProductos({ productos }) {
  return (
    <div className="card">
      <h2>Productos guardados ({productos.length})</h2>
      <ul className="lista">
        {productos.map((p) => (
          <li key={p.name}>
            <span>{p.name}</span>
            <strong>{p.popularity}</strong>
          </li>
        ))}
      </ul>
    </div>
  );
}