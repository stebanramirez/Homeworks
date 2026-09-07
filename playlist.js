//  Punto 1
// Linked list para reproducir canciones en orden

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

  // Agrega una nueva cancion al final de la lista
  append(value) {
    const newNode = new Node(value);

    if (!this.head) {
      this.head = newNode;
    } else {
      this.tail.next = newNode;
    }

    this.tail = newNode;
    this.length++;
  }

  // Busca y retorna el nodo que tenga ese valor
  peek(value, current = this.head) {
    while (current) {
      if (current.value === value) {
        return current;
      }
      current = current.next;
    }

    return null;
  }

  // Retorna el numero de elementos en la lista
  size() {
    return this.length;
  }

  // Elimina una cancion de la lista (por titulo)
  remove(value, current = this.head) {
    if (!this.head) return null;

    if (this.head.value === value) {
      this.head = this.head.next;

      if (!this.head) {
        this.tail = null;
      }

      this.length--;
      return;
    }

    while (current.next && current.next.value !== value) {
      current = current.next;
    }

    if (current.next) {
      current.next = current.next.next;
      if (!current.next) this.tail = current;
      this.length--;
    }
  }

  // Imprime la lista completa en orden
  print() {
    let current = this.head;
    let result = "";
    while (current) {
      result += current.value + " -> ";
      current = current.next;
    }
    console.log(result + "null");
  }
}


// Uso-lista de reproduccion con datos mock
const playlist = new LinkedList();

playlist.append("Bohemian Rhapsody - Queen");
playlist.append("Billie Jean - Michael Jackson");
playlist.append("Hotel California - Eagles");
playlist.append("Smells Like Teen Spirit - Nirvana");
playlist.append("Shape of You - Ed Sheeran");

console.log("Playlist completa:");
playlist.print();

console.log("\nNumero de canciones:", playlist.size());

console.log("\nBuscando 'Hotel California - Eagles':");
console.log(playlist.peek("Hotel California - Eagles"));

console.log("\nEliminando 'Billie Jean - Michael Jackson'...");
playlist.remove("Billie Jean - Michael Jackson");
playlist.print();

console.log("\nNumero de canciones despues de eliminar:", playlist.size());

module.exports = { Node, LinkedList, playlist };