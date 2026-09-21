import { useState } from "react";
import FormularioPersona from "./components/FormularioPersona";
import ColaCajero from "./components/ColaCajero";
import { Cola } from "./data/Cola";
import { mockPersonas, generarFechaLlegada } from "./data/mockPersonas";
import "./App.css";

function App() {
  const [cola, setCola] = useState(() => {
    const inicial = new Cola();
    mockPersonas.forEach((persona) => inicial.encolar(persona));
    return inicial;
  });

  const encolarPersona = (nombre, monto) => {
    setCola((prev) => {
      const copia = new Cola(...prev);
      copia.encolar({
        id: Date.now(),
        name: nombre,
        withdrawalAmount: monto,
        arrivalDate: generarFechaLlegada(),
      });
      return copia;
    });
  };

  const atenderPersona = (evt, id) => {
    setCola((prev) => {
      const restantes = prev.filter((persona) => persona.id !== id);
      return new Cola(...restantes);
    });
  };

  return (
    <div className="app">
      <h1>Fila del cajero</h1>
      <p className="subtitle">
        Cola: {cola.tamano()} persona{cola.tamano() !== 1 ? "s" : ""} en
        espera
      </p>

      <FormularioPersona onEncolar={encolarPersona} />
      <ColaCajero personas={cola.toArray()} onAtender={atenderPersona} />
    </div>
  );
}

export default App;