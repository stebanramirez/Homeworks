// lista circular- Turno del medico

export class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

export class CircularLinkedList {
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

  toArray() {
    if (!this.head) return [];
    const out = [];
    let current = this.head;
    do {
      out.push({ ...current.value, isOnDuty: current === this.current });
      current = current.next;
    } while (current !== this.head);
    return out;
  }

  clone() {
    const copy = new CircularLinkedList();
    const currentId = this.current ? this.current.value.id : null;
    this.toArray().forEach(({ isOnDuty, ...v }) => {
      void isOnDuty;
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