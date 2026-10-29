import { useState } from "react";
import { RedSocial } from "../classes/RedSocial";

export function useRed() {
  const [red] = useState(() => RedSocial.conDatosIniciales());
  const [seleccionada, setSeleccionada] = useState("");

  // la red es una clase mutable, cada cambio genera datos nuevos para el grafo y vuelve a dibujar
  const [data, setData] = useState(() => red.toD3(""));

  const actualizar = (ciudadSeleccionada = seleccionada) => {
    setData(red.toD3(ciudadSeleccionada));
  };

  const agregarCiudad = (nombre) => {
    red.agregarCiudad(nombre);
    actualizar();
  };

  const agregarPersona = (nombre, edad, ciudadId) => {
    red.agregarPersona(nombre, edad, ciudadId);
    actualizar();
  };

  const eliminarPersona = (id) => {
    red.eliminarPersona(id);
    actualizar();
  };

  const eliminarCiudad = (id) => {
    red.eliminarCiudad(id);
    const nueva = id === seleccionada ? "" : seleccionada;
    setSeleccionada(nueva);
    actualizar(nueva);
  };

  const seleccionar = (ciudadId) => {
    setSeleccionada(ciudadId);
    if (ciudadId) red.graph.printAdjacency(ciudadId);
    actualizar(ciudadId);
  };

  return {
    red,
    data,
    seleccionada,
    ciudades: red.ciudades(),
    agregarCiudad,
    agregarPersona,
    eliminarPersona,
    eliminarCiudad,
    seleccionar,
  };
}