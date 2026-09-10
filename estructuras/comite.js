// lista circular doblemente enlazada - Comite administrativo
// se puede recorrer para adelante y para atras, y tambien es circular

class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
    this.prev = null;
  }
}

class CircularDoublyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
    this.current = null;
  }

  append(value) {
    const node = new Node(value);

    if (!this.head) {
      this.head = node;
      this.tail = node;
      node.next = node;
      node.prev = node;
      this.current = node;
    } else {
      node.prev = this.tail;
      node.next = this.head;
      this.tail.next = node;
      this.head.prev = node;
      this.tail = node;
    }

    this.length++;
  }

  size() {
    return this.length;
  }

  next() {
    if (!this.current) return null;
    this.current = this.current.next;
    return this.current.value;
  }

  previous() {
    if (!this.current) return null;
    this.current = this.current.prev;
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
      out += current === this.current ? " (activo) <-> " : " <-> ";
      current = current.next;
    } while (current !== this.head);
    console.log(out + "...vuelve a " + this.head.value.name);
  }
}

const comite = new CircularDoublyLinkedList();

comite.append({ id: 1, name: "Fernanda Ospina" });
comite.append({ id: 2, name: "Mateo Rojas" });
comite.append({ id: 3, name: "Camila Salas" });
comite.append({ id: 4, name: "Julian Vega" });

console.log("comite:");
comite.print();

console.log("\nnavegando:");
console.log("activo:", comite.current.value.name);
console.log("siguiente:", comite.next().name);
console.log("siguiente:", comite.next().name);
console.log("anterior:", comite.previous().name);

module.exports = { Node, CircularDoublyLinkedList, committee: comite };