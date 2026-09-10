import { useState } from "react";

function WaitingListPanel({ patients, onAttend, onAddPatient }) {
  const [name, setName] = useState("");
  const [reason, setReason] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!name.trim()) return;
    onAddPatient(name.trim(), reason.trim() || "Consulta general");
    setName("");
    setReason("");
  }

  return (
    <section className="panel">
      <h2>Pacientes en espera</h2>
      <p className="subtitle">
        Lista enlazada simple - {patients.length} en fila
      </p>

      <form className="inline-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nombre del paciente"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Motivo (opcional)"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        />
        <button type="submit">Agregar a la fila</button>
      </form>

      {patients.length === 0 && <p className="empty">No hay pacientes en espera.</p>}

      <ol className="item-list">
        {patients.map((patient, i) => (
          <li key={patient.id} className={i === 0 ? "next-up" : ""}>
            <div>
              <strong>{patient.name}</strong>
              <span className="meta"> - {patient.reason}</span>
            </div>
            <button onClick={() => onAttend(patient.id)}>Atender</button>
          </li>
        ))}
      </ol>
    </section>
  );
}

export default WaitingListPanel;