// lista enlazada simple - Pacientes en espera

class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  append(value) {
    const node = new Node(value);
    if (!this.head) {
      this.head = node;
    } else {
      this.tail.next = node;
    }
    this.tail = node;
    this.length++;
  }

  peek(id, current = this.head) {
    while (current) {
      if (current.value.id === id) return current;
      current = current.next;
    }
    return null;
  }

  size() {
    return this.length;
  }

  // saca al paciente de la fila y lo devuelve, asi lo puedo
  // mandar despues al historial
  remove(id, current = this.head) {
    if (!this.head) return null;

    if (this.head.value.id === id) {
      const removed = this.head;
      this.head = this.head.next;
      if (!this.head) this.tail = null;
      this.length--;
      return removed.value;
    }

    while (current.next && current.next.value.id !== id) {
      current = current.next;
    }

    if (current.next) {
      const removed = current.next;
      current.next = current.next.next;
      if (!current.next) this.tail = current;
      this.length--;
      return removed.value;
    }

    return null;
  }

  print() {
    let current = this.head;
    let out = "";
    while (current) {
      out += current.value.name + " -> ";
      current = current.next;
    }
    console.log(out + "null");
  }
}

const fila = new LinkedList();

fila.append({ id: 1, name: "Maria Gomez" });
fila.append({ id: 2, name: "Carlos Ruiz" });
fila.append({ id: 3, name: "Laura Diaz" });
fila.append({ id: 4, name: "Andres Torres" });

console.log("fila de espera:");
fila.print();
console.log("total:", fila.size());

console.log("\natendiendo al paciente 2...");
const atendido = fila.remove(2);
console.log("sale de la fila:", atendido);
fila.print();

module.exports = { Node, LinkedList, waitingList: fila };