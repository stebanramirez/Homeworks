import { Graph } from "./Graph";
import { Persona } from "./Persona";
import { Ciudad } from "./Ciudad";

// Reglas del reto, personas y ciudades son nodos, cada persona se conecta a una sola ciudad
export class RedSocial {
  constructor() {
    this.graph = new Graph();
    this.contador = 0;
  }

  ciudades() {
    return this.graph.nodes.filter((n) => n.tipo === "ciudad");
  }

  personas() {
    return this.graph.nodes.filter((n) => n.tipo === "persona");
  }

  agregarCiudad(nombre) {
    const limpio = nombre.trim();
    if (limpio === "") throw new Error("La ciudad necesita un nombre");

    const existe = this.ciudades().some((c) => c.nombre.toLowerCase() === limpio.toLowerCase());
    if (existe) throw new Error(`La ciudad ${limpio} ya existe`);

    this.contador++;
    const ciudad = new Ciudad(`ciudad-${this.contador}`, limpio);
    this.graph.addNode(ciudad);
    return ciudad;
  }

  agregarPersona(nombre, edad, ciudadId) {
    const limpio = nombre.trim();
    const edadNumero = Number(edad);

    if (limpio === "") throw new Error("La persona necesita un nombre");
    if (!Number.isInteger(edadNumero) || edadNumero < 0 || edadNumero > 120) {
      throw new Error("La edad no es valida");
    }

    const ciudad = this.graph.searchNode(ciudadId);
    if (!ciudad || ciudad.tipo !== "ciudad") throw new Error("Elige una ciudad");

    this.contador++;
    const persona = new Persona(`persona-${this.contador}`, limpio, edadNumero, ciudadId);
    this.graph.addNode(persona);
    this.graph.addEdge(persona.id, ciudadId);
    return persona;
  }

  // personas que viven en una ciudad, los vecinos de la ciudad que son personas
  personasDeCiudad(ciudadId) {
    return this.graph.getAdjacent(ciudadId).filter((n) => n.tipo === "persona");
  }

  eliminarPersona(id) {
    this.graph.removeNode(id);
  }

  eliminarCiudad(id) {
    if (this.personasDeCiudad(id).length > 0) {
      throw new Error("No puedes eliminar una ciudad que tiene personas");
    }
    this.graph.removeNode(id);
  }

  // datos en el formato que pide react-d3-graph
  toD3(ciudadSeleccionada) {
    const nodes = this.graph.nodes.map((n) => {
      if (n.tipo === "ciudad") {
        return {
          id: n.id,
          label: n.nombre,
          symbolType: "square",
          size: 900,
          color: n.id === ciudadSeleccionada ? "#e5a100" : "#2f8f5b",
        };
      }
      return {
        id: n.id,
        label: `${n.nombre} (${n.edad})`,
        symbolType: "circle",
        size: 500,
        color: "#4a6fa5",
      };
    });

    const links = [];
    for (const id in this.graph.adjList) {
      this.graph.adjList[id].forEach((vecino) => {
        if (id < vecino) links.push({ source: id, target: vecino });
      });
    }

    return { nodes, links };
  }

  static conDatosIniciales() {
    const red = new RedSocial();
    const cali = red.agregarCiudad("Cali");
    const bogota = red.agregarCiudad("Bogota");
    const medellin = red.agregarCiudad("Medellin");

    red.agregarPersona("Ana", 22, cali.id);
    red.agregarPersona("Luis", 25, cali.id);
    red.agregarPersona("Maria", 30, bogota.id);
    red.agregarPersona("Sofia", 21, bogota.id);
    red.agregarPersona("Pedro", 28, medellin.id);
    return red;
  }
}