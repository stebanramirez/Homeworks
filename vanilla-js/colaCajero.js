// cola (queue) de personas esperando el cajero
// como vimos en clase, peek es el unico metodo que toca implementar,
// el resto ya viene heredado de Array (push, shift, length,etc)

class Cola extends Array {
  encolar(valor) {
    this.push(valor);
  }

  desencolar() {
    return this.shift();
  }

  peek() {
    return this[0];
  }

  estaVacia() {
    return this.length === 0;
  }

  tamano() {
    return this.length;
  }

  print() {
    console.log([...this]);
  }
}

// el turno se lo asigna el sistema en el momento en que la persona llega
function generarFechaLlegada() {
  const ahora = Date.now();
  const minutosAleatorios = Math.floor(Math.random() * 20);
  return new Date(ahora + minutosAleatorios * 60000);
}

const cola = new Cola();

cola.encolar({
  name: "Marcela Gutierrez",
  withdrawalAmount: 150000,
  arrivalDate: generarFechaLlegada(),
});
cola.encolar({
  name: "Felipe Arango",
  withdrawalAmount: 80000,
  arrivalDate: generarFechaLlegada(),
});
cola.encolar({
  name: "Natalia Correa",
  withdrawalAmount: 300000,
  arrivalDate: generarFechaLlegada(),
});

console.log("cola del cajero:");
cola.print();
console.log("primero en la fila:", cola.peek());
console.log("total en espera:", cola.tamano());

console.log("\natiende al primero...");
const atendido = cola.desencolar();
console.log("se atendio a:", atendido.name);
cola.print();