function DoctorRotationPanel({ doctors, countdown, onRotateNow }) {
  return (
    <section className="panel">
      <h2>Rotacion de medicos</h2>
      <p className="subtitle">Lista circular - cambia sola cada 10 segundos</p>

      <div className="countdown">
        Proximo cambio en <strong>{countdown}s</strong>
        <button onClick={onRotateNow}>Rotar ahora</button>
      </div>

      <ul className="ring-list">
        {doctors.map((d) => (
          <li key={d.id} className={d.isOnDuty ? "active" : ""}>
            <strong>{d.name}</strong>
            <span className="meta">{d.specialty}</span>
            {d.isOnDuty && <span className="badge">De guardia</span>}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default DoctorRotationPanel;