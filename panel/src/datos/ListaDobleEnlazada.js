// lista doblemente enlazada- Historial de atencion

export class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
    this.prev = null;
  }
}

export class DoublyLinkedList {
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

  toArray() {
    const out = [];
    let current = this.head;
    while (current) {
      out.push(current.value);
      current = current.next;
    }
    return out;
  }

  clone() {
    const copy = new DoublyLinkedList();
    this.toArray().forEach((v) => copy.append(v));
    return copy;
  }
}