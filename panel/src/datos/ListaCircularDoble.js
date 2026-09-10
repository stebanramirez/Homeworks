// lista circular doblemente enlazada- El comite administrativo

export class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
    this.prev = null;
  }
}

export class CircularDoublyLinkedList {
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

  toArray() {
    if (!this.head) return [];
    const out = [];
    let current = this.head;
    do {
      out.push({ ...current.value, isActive: current === this.current });
      current = current.next;
    } while (current !== this.head);
    return out;
  }

  clone() {
    const copy = new CircularDoublyLinkedList();
    const currentId = this.current ? this.current.value.id : null;
    this.toArray().forEach(({ isActive, ...v }) => {
      void isActive;
      copy.append(v);
    });
    if (currentId !== null) {
      let node = copy.head;
      do {
        if (node.value.id === currentId) {
          copy.current = node;
          break;
        }
        node = node.next;
      } while (node !== copy.head);
    }
    return copy;
  }
}