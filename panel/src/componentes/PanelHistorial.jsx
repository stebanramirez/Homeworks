function HistoryPanel({ history }) {
  const items = [...history].reverse();

  return (
    <section className="panel">
      <h2>Historial de atencion</h2>
      <p className="subtitle">
        Lista doblemente enlazada - {history.length} atendidos
      </p>

      {items.length === 0 && (
        <p className="empty">Todavia no se ha atendido a nadie.</p>
      )}

      <ol className="item-list">
        {items.map((p) => (
          <li key={p.id + p.attendedAt}>
            <div>
              <strong>{p.name}</strong>
              <span className="meta"> - {p.reason}</span>
            </div>
            <span className="time">{p.attendedAt}</span>
          </li>
        ))}
      </ol>
    </section>
  );
}

export default HistoryPanel;