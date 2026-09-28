import { useState } from "react";
import { Cola } from "../data/Cola";
import { mockPersonas, generarFechaLlegada } from "../data/mockPersonas";

function Cajero() {
  const [cola, setCola] = useState(() => {
    const inicial = new Cola();
    mockPersonas.forEach((persona) => inicial.encolar(persona));
    return inicial;
  });

  const [nombre, setNombre] = useState("");
  const [monto, setMonto] = useState("");

  const encolarPersona = (evt) => {
    evt.preventDefault();

    if (!nombre.trim() || !monto) return;

    setCola((prev) => {
      const copia = new Cola(...prev);
      copia.encolar({
        id: Date.now(),
        name: nombre,
        withdrawalAmount: Number(monto),
        arrivalDate: generarFechaLlegada(),
      });
      return copia;
    });

    setNombre("");
    setMonto("");
  };

  const atenderPersona = (evt, id) => {
    setCola((prev) => {
      const restantes = prev.filter((persona) => persona.id !== id);
      return new Cola(...restantes);
    });
  };

  const personas = cola.toArray();
  const ordenadas = [...personas].sort((a, b) => a.arrivalDate - b.arrivalDate);

  return (
    <section className="content">
      <h1>Fila del cajero</h1>
      <p className="subtitle">
        Cola: {cola.tamano()} persona{cola.tamano() !== 1 ? "s" : ""} en espera
      </p>

      <form className="persona-form" onSubmit={encolarPersona}>
        <input placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} />
        <input
          type="number"
          placeholder="Monto a retirar"
          value={monto}
          onChange={(e) => setMonto(e.target.value)}
        />
        <button type="submit">Hacer fila</button>
      </form>

      {ordenadas.length === 0 ? (
        <p className="empty">No hay nadie en la fila.</p>
      ) : (
        <ul className="cola-list">
          {ordenadas.map((persona, index) => (
            <li key={persona.id} className={index === 0 ? "top-item" : ""}>
              <div>
                <strong>{persona.name}</strong>
                <span className="meta">
                  Retiro: ${persona.withdrawalAmount.toLocaleString("es-CO")}
                </span>
                <span className="meta">
                  Turno asignado: {persona.arrivalDate.toLocaleTimeString("es-CO")}
                </span>
              </div>
              {index === 0 && (
                <button onClick={(evt) => atenderPersona(evt, persona.id)}>Atender</button>
              )}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default Cajero;
