// lista enlazada simple- Los pacientes en espera

export class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

export class LinkedList {
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

  toArray() {
    const out = [];
    let current = this.head;
    while (current) {
      out.push(current.value);
      current = current.next;
    }
    return out;
  }

  // uso esto para que React se de cuenta del cambio (le paso un
  // objeto nuevo en vez de mutar el estado anterior)
  clone() {
    const copy = new LinkedList();
    this.toArray().forEach((v) => copy.append(v));
    return copy;
  }
}