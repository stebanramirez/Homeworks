import Node from "./Node";

// Trie: la información está en el camino, cada arista es una letra
export default class Trie {
  constructor() {
    this.root = new Node(); // la raíz no representa ninguna letra
  }

  normalizar(texto) {
    return texto.trim().toLowerCase();
  }

  // Inserta un producto letra por letra y marca el último nodo como fin de palabra
  insert(name, popularity) {
    const palabra = this.normalizar(name);
    if (palabra === "") throw new Error("El nombre no puede estar vacío");
    const pop = Number(popularity);
    if (!Number.isFinite(pop) || pop < 0 || pop > 100) {
      throw new Error("La popularidad debe ser un número entre 0 y 100");
    }

    let actual = this.root;
    for (const letra of palabra) {
      if (!actual.children.has(letra)) actual.children.set(letra, new Node());
      actual = actual.children.get(letra);
    }
    actual.isEndOfWord = true;
    actual.product = { name: palabra, popularity: pop }; // si ya existía, actualiza la popularidad
  }

  // Busca una palabra completa
  search(name) {
    const nodo = this.buscarNodo(this.normalizar(name));
    return nodo !== null && nodo.isEndOfWord;
  }

  // Recorre el prefijo y devuelve el nodo donde termina o null
  buscarNodo(prefijo) {
    let actual = this.root;
    for (const letra of prefijo) {
      if (!actual.children.has(letra)) return null;
      actual = actual.children.get(letra);
    }
    return actual;
  }

  // Devuelve todos los productos que empiezan con el prefijo
  searchByPrefix(prefix) {
    const nodo = this.buscarNodo(this.normalizar(prefix));
    if (nodo === null) return [];
    const resultado = [];
    this.recolectar(nodo, resultado);
    return resultado;
  }

  // Recorrido recursivo del subárbol recolectando los fin de palabra
  recolectar(nodo, resultado) {
    if (nodo.isEndOfWord) resultado.push(nodo.product);
    for (const hijo of nodo.children.values()) this.recolectar(hijo, resultado);
  }
}