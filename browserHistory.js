//Punto 2
// Doubly linked list para navegar adelante y atras entre paginas visitadas 

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

  // Agrega una nueva pagina visitada al final del historial
  append(value) {
    const newNode = new Node(value);

    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
      this.length++;
      return;
    }

    this.tail.next = newNode;
    newNode.prev = this.tail;
    this.tail = newNode;

    this.length++;
  }

  // Busca y retorna el nodo que tenga esa url
  peek(value, current = this.head) {
    while (current) {
      if (current.value === value) {
        return current;
      }
      current = current.next;
    }

    return null;
  }

  // Retorna el numero de paginas en el historial
  size() {
    return this.length;
  }

  // Elimina una pagina del historial por url
  remove(value) {
    if (!this.head) return null;

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

  // Imprime el historial completo en orden (head-tail)
  print() {
    let current = this.head;
    let result = "";
    while (current) {
      result += current.value + " <-> ";
      current = current.next;
    }
    console.log(result + "null");
  }
}


// Navegador simple:usa el DoublyLinkedList como historial

// y un puntero currentPage para saber en donde esta el usuario

class Browser {
  constructor() {
    this.history = new DoublyLinkedList();
    this.currentPage = null;
  }

  visit(url) {
    this.history.append(url);
    this.currentPage = this.history.tail;
    console.log(`Visitando: ${this.currentPage.value}`);
  }

  back() {
    if (this.currentPage && this.currentPage.prev) {
      this.currentPage = this.currentPage.prev;
      console.log(`Atras -> ${this.currentPage.value}`);
    } else {
      console.log("No hay paginas anteriores en el historial.");
    }
    return this.currentPage;
  }

  forward() {
    if (this.currentPage && this.currentPage.next) {
      this.currentPage = this.currentPage.next;
      console.log(`Adelante -> ${this.currentPage.value}`);
    } else {
      console.log("No hay paginas siguientes en el historial.");
    }
    return this.currentPage;
  }
}


// Uso: historial de navegador con datos fake

const browser = new Browser();

browser.visit("https://uao.edu.co");
browser.visit("https://github.com/stebanramirez");
browser.visit("https://developer.mozilla.org");
browser.visit("https://es.stackoverflow.com");

console.log("\nHistorial completo:");
browser.history.print();

console.log("\nNavegando:");
browser.back();
browser.back();
browser.forward();

console.log("\nPagina actual:", browser.currentPage.value);
console.log("Numero de paginas en el historial:", browser.history.size());

module.exports = { Node, DoublyLinkedList, Browser };