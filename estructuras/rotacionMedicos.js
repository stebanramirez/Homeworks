// lista circular - Turnos de los medicos 
// el ultimo nodo apunta otra vez al primero, por eso circular

class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class CircularLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
    this.current = null; // quien esta de medico ahorita
  }

  append(value) {
    const node = new Node(value);

    if (!this.head) {
      this.head = node;
      this.tail = node;
      node.next = node;
      this.current = node;
    } else {
      this.tail.next = node;
      this.tail = node;
      this.tail.next = this.head;
    }

    this.length++;
  }

  size() {
    return this.length;
  }

  rotate() {
    if (!this.current) return null;
    this.current = this.current.next;
    return this.current.value;
  }

  print() {
    if (!this.head) {
      console.log("(vacio)");
      return;
    }
    let current = this.head;
    let out = "";
    do {
      out += current.value.name;
      out += current === this.current ? " (medico) -> " : " -> ";
      current = current.next;
    } while (current !== this.head);
    console.log(out + "...vuelve a " + this.head.value.name);
  }
}

const turnos = new CircularLinkedList();

turnos.append({ id: 1, name: "Dr. Alvarez" });
turnos.append({ id: 2, name: "Dra. Bermudez" });
turnos.append({ id: 3, name: "Dr. Castillo" });

console.log("rotacion:");
turnos.print();

console.log("\ncambia cada 10s:");
console.log(turnos.current.value.name);
console.log(turnos.rotate().name);
console.log(turnos.rotate().name);
console.log(turnos.rotate().name, "(otra vuelta)");

module.exports = { Node, CircularLinkedList, doctorRotation: turnos };