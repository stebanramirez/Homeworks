function PersonasPorCiudad({ red, ciudades, seleccionada, onSeleccionar, onEliminarPersona, onEliminarCiudad }) {
  const personas = seleccionada ? red.personasDeCiudad(seleccionada) : [];
  const ciudad = seleccionada ? red.graph.searchNode(seleccionada) : null;

  return (
    <div className="panel">
      <h2>Personas por ciudad</h2>
      <div className="fila-form">
        <select value={seleccionada} onChange={(evt) => onSeleccionar(evt.target.value)}>
          <option value="">Elige una ciudad</option>
          {ciudades.map((c) => (
            <option key={c.id} value={c.id}>
              {c.nombre}
            </option>
          ))}
        </select>
        {ciudad && (
          <button className="btn-borrar" onClick={() => onEliminarCiudad(ciudad.id)}>
            Eliminar ciudad
          </button>
        )}
      </div>

      {ciudad && personas.length === 0 && <p className="vacio">Nadie vive en {ciudad.nombre}</p>}

      <ul className="lista">
        {personas.map((p) => (
          <li key={p.id}>
            <span>
              {p.nombre}, {p.edad} años
            </span>
            <button className="btn-borrar" onClick={() => onEliminarPersona(p.id)}>
              Eliminar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PersonasPorCiudad;