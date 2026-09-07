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
    const newNode = new Node(value);

    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
      this.length++;
      return newNode;
    }

    this.tail.next = newNode;
    newNode.prev = this.tail;
    this.tail = newNode;

    this.length++;
    return newNode;
  }

  peek(value, current = this.head) {
    while (current) {
      if (current.value === value) {
        return current;
      }
      current = current.next;
    }

    return null;
  }

  size() {
    return this.length;
  }

  remove(value) {
    let current = this.head;

    while (current) {
      if (current.value === value) {
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
        return current;
      }
      current = current.next;
    }

    return null;
  }

  print() {
    let current = this.head;
    let result = "";
    while (current) {
      result += current.value + " <-> ";
      current = current.next;
    }
    console.log(result + "null");
  }

  toArray() {
    const values = [];
    let current = this.head;
    while (current) {
      values.push(current.value);
      current = current.next;
    }
    return values;
  }
}