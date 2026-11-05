// Nodo del Trie: guarda un mapa de hijos letra - nodo y la marca de fin de palabra
export default class Node {
  constructor() {
    this.children = new Map();
    this.isEndOfWord = false;
    this.product = null; // { name, popularity } cuando es fin de palabra
  }
}