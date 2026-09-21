import { useState } from "react";

function FormularioPersona({ onEncolar }) {
  const [nombre, setNombre] = useState("");
  const [monto, setMonto] = useState("");

  const capturaNombre = (e) => {
    setNombre(e.target.value);
  };

  const capturaMonto = (e) => {
    setMonto(e.target.value);
  };

  const encolar = (evt) => {
    evt.preventDefault();

    if (!nombre.trim() || !monto) return;

    onEncolar(nombre, Number(monto));
    setNombre("");
    setMonto("");
  };

  return (
    <form className="persona-form" onSubmit={encolar}>
      <input
        placeholder="Nombre"
        value={nombre}
        onChange={(e) => capturaNombre(e)}
      />
      <input
        type="number"
        placeholder="Monto a retirar"
        value={monto}
        onChange={(e) => capturaMonto(e)}
      />
      <button type="submit">Hacer fila</button>
    </form>
  );
}

export default FormularioPersona;
