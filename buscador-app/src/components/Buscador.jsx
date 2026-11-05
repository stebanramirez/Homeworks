export default function Buscador({ prefijo, setPrefijo, k, setK, resultados, buscado, error, onBuscar }) {
  const enviar = (e) => {
    e.preventDefault();
    onBuscar();
  };

  return (
    <div className="card">
      <h2>Buscador inteligente</h2>
      <form className="fila" onSubmit={enviar}>
        <input
          placeholder="Prefijo (ej: air)"
          value={prefijo}
          onChange={(e) => {
            setPrefijo(e.target.value);
            onBuscar(e.target.value, k); // autocompletado mientras escribe
          }}
        />
        <input
          className="corto"
          type="number"
          min="1"
          value={k}
          onChange={(e) => setK(e.target.value)}
          title="Top K"
        />
        <button type="submit">Buscar Top K</button>
      </form>
      {error && <p className="error">{error}</p>}
      {buscado && resultados.length === 0 && <p className="vacio">No hay productos con ese prefijo</p>}
      <ol className="lista">
        {resultados.map((p) => (
          <li key={p.name}>
            <span>{p.name}</span>
            <strong>{p.popularity}</strong>
          </li>
        ))}
      </ol>
    </div>
  );
}