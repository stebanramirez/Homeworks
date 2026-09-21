function ColaCajero({ personas, onAtender }) {
  if (personas.length === 0) {
    return <p className="empty">No hay nadie en la fila.</p>;
  }

  const ordenadas = [...personas].sort(
    (a, b) => a.arrivalDate - b.arrivalDate
  );

  return (
    <ul className="cola-list">
      {ordenadas.map((persona, index) => {
        return (
          <li key={persona.id} className={index === 0 ? "next-up" : ""}>
            <div>
              <strong>{persona.name}</strong>
              <span className="meta">
                Retiro: ${persona.withdrawalAmount.toLocaleString("es-CO")}
              </span>
              <span className="time">
                Turno asignado: {persona.arrivalDate.toLocaleTimeString("es-CO")}
              </span>
            </div>
            {index === 0 && (
              <button onClick={(evt) => onAtender(evt, persona.id)}>
                Atender
              </button>
            )}
          </li>
        );
      })}
    </ul>
  );
}

export default ColaCajero;
