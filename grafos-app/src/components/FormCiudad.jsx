import { useState } from "react";

function FormCiudad({ onAgregar }) {
  const [nombre, setNombre] = useState("");
  const [mensaje, setMensaje] = useState("");

  const agregar = (evt) => {
    evt.preventDefault();
    try {
      onAgregar(nombre);
      setMensaje(`Se agrego ${nombre.trim()}`);
      setNombre("");
    } catch (err) {
      setMensaje(err.message);
    }
  };

  return (
    <form className="form-caja" onSubmit={agregar}>
      <h2>Nueva ciudad</h2>
      <div className="fila-form">
        <input
          type="text"
          placeholder="Nombre de la ciudad"
          value={nombre}
          onChange={(evt) => setNombre(evt.target.value)}
        />
        <button type="submit">Agregar</button>
      </div>
      <p className="mensaje">{mensaje}</p>
    </form>
  );
}

export default FormCiudad;