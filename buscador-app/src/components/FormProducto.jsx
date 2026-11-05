import { useState } from "react";

export default function FormProducto({ onAgregar }) {
  const [nombre, setNombre] = useState("");
  const [popularidad, setPopularidad] = useState("");
  const [mensaje, setMensaje] = useState("");

  const enviar = (e) => {
    e.preventDefault();
    try {
      onAgregar(nombre, popularidad);
      setMensaje(`Producto "${nombre.trim().toLowerCase()}" guardado`);
      setNombre("");
      setPopularidad("");
    } catch (err) {
      setMensaje(err.message);
    }
  };

  return (
    <form className="card" onSubmit={enviar}>
      <h2>Agregar producto</h2>
      <input placeholder="Nombre (ej: air max)" value={nombre} onChange={(e) => setNombre(e.target.value)} />
      <input type="number" placeholder="Popularidad (0-100)" value={popularidad} onChange={(e) => setPopularidad(e.target.value)} />
      <button type="submit">Guardar en el Trie</button>
      {mensaje && <p className="mensaje">{mensaje}</p>}
    </form>
  );
}