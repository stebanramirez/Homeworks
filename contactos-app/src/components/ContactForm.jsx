import { useState } from "react";

function ContactForm({ onAdd }) {
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");

  const capturaNombre = (e) => {
    setNombre(e.target.value);
  };

  const capturaTelefono = (e) => {
    setTelefono(e.target.value);
  };

  const agregar = (evt) => {
    evt.preventDefault();

    if (!nombre.trim() || !telefono.trim()) return;

    onAdd(nombre, telefono);
    setNombre("");
    setTelefono("");
  };

  return (
    <form className="contact-form" onSubmit={agregar}>
      <input
        placeholder="Nombre"
        value={nombre}
        onChange={(e) => capturaNombre(e)}
      />
      <input
        placeholder="Telefono"
        value={telefono}
        onChange={(e) => capturaTelefono(e)}
      />
      <button type="submit">Agregar contacto</button>
    </form>
  );
}

export default ContactForm;