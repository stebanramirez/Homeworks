import { useState, useEffect } from "react";
import Loader from "./components/Loader";
import ContactForm from "./components/ContactForm";
import ContactList from "./components/ContactList";
import { mockContacts } from "./data/mockContacts";
import "./App.css";

function App() {
  const [cargando, setCargando] = useState(true);
  const [contactos, setContactos] = useState([]);

  // simulamos la carga inicial de datos como si vinieran de una API
  useEffect(() => {
    const timer = setTimeout(() => {
      setContactos(mockContacts);
      setCargando(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  const addContact = (nombre, telefono) => {
    const nuevo = {
      id: Date.now(),
      name: nombre,
      phone: telefono,
    };
    setContactos((prev) => [...prev, nuevo]);
  };

  const deleteContact = (evt, id) => {
    setContactos((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <div className="app">
      <h1>Agenda de contactos</h1>

      {cargando ? (
        <Loader />
      ) : (
        <>
          <ContactForm onAdd={addContact} />
          <ContactList contacts={contactos} onDelete={deleteContact} />
        </>
      )}
    </div>
  );
}

export default App;