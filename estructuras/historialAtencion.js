// lista doblemente enlazada - Historial de atencion

class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
    this.prev = null;
  }
}

class DoublyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  append(value) {
    const node = new Node(value);

    if (!this.head) {
      this.head = node;
      this.tail = node;
      this.length++;
      return node;
    }

    this.tail.next = node;
    node.prev = this.tail;
    this.tail = node;
    this.length++;
    return node;
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

  remove(id) {
    let current = this.head;

    while (current) {
      if (current.value.id === id) {
        if (current === this.head) {
          this.head = current.next;
          if (this.head) this.head.prev = null;
        }
        if (current === this.tail) {
          this.tail = current.prev;
          if (this.tail) this.tail.next = null;
        }
        if (current.prev) current.prev.next = current.next;
        if (current.next) current.next.prev = current.prev;

        this.length--;
        return current.value;
      }
      current = current.next;
    }

    return null;
  }

  print() {
    let current = this.head;
    let out = "";
    while (current) {
      out += current.value.name + " <-> ";
      current = current.next;
    }
    console.log(out + "null");
  }
}

const historial = new DoublyLinkedList();

historial.append({ id: 2, name: "Carlos Ruiz", attendedAt: "08:15" });
historial.append({ id: 5, name: "Sofia Perez", attendedAt: "08:32" });
historial.append({ id: 6, name: "Jorge Ramirez", attendedAt: "08:50" });

console.log("historial:");
historial.print();
console.log("atendidos:", historial.size());

module.exports = { Node, DoublyLinkedList, attentionHistory: historial };