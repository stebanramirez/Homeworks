import { useState } from "react";

function FormPersona({ ciudades, onAgregar }) {
  const [nombre, setNombre] = useState("");
  const [edad, setEdad] = useState("");
  const [ciudadId, setCiudadId] = useState("");
  const [mensaje, setMensaje] = useState("");

  const agregar = (evt) => {
    evt.preventDefault();
    try {
      onAgregar(nombre, edad, ciudadId);
      setMensaje(`Se agrego ${nombre.trim()}`);
      setNombre("");
      setEdad("");
    } catch (err) {
      setMensaje(err.message);
    }
  };

  return (
    <form className="form-caja" onSubmit={agregar}>
      <h2>Nueva persona</h2>
      <div className="fila-form">
        <input
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={(evt) => setNombre(evt.target.value)}
        />
        <input
          className="campo-edad"
          type="number"
          placeholder="Edad"
          value={edad}
          onChange={(evt) => setEdad(evt.target.value)}
        />
      </div>
      <div className="fila-form">
        <select value={ciudadId} onChange={(evt) => setCiudadId(evt.target.value)}>
          <option value="">Ciudad donde vive</option>
          {ciudades.map((c) => (
            <option key={c.id} value={c.id}>
              {c.nombre}
            </option>
          ))}
        </select>
        <button type="submit">Agregar</button>
      </div>
      <p className="mensaje">{mensaje}</p>
    </form>
  );
}

export default FormPersona;