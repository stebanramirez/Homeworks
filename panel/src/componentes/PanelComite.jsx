function CommitteePanel({ members, onNext, onPrev }) {
  return (
    <section className="panel">
      <h2>Comite administrativo</h2>
      <p className="subtitle">Lista circular doblemente enlazada</p>

      <div className="controls">
        <button onClick={onPrev}>Anterior</button>
        <button onClick={onNext}>Siguiente</button>
      </div>

      <ul className="ring-list">
        {members.map((m) => {
          const cls = m.isActive ? "active" : "";
          return (
            <li key={m.id} className={cls}>
              <strong>{m.name}</strong>
              <span className="meta">{m.role}</span>
              {m.isActive && <span className="badge">Activo</span>}
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export default CommitteePanel;