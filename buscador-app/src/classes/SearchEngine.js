import Trie from "./Trie";
import MinHeap from "./MinHeap";

// Buscador inteligente: Trie para buscar por prefijo + Heap para el Top K
export default class SearchEngine {
  constructor() {
    this.trie = new Trie();
  }

  insert(name, popularity) {
    this.trie.insert(name, popularity);
  }

  // Top K más populares con ese prefijo.
  // Se usa un Min Heap de tamaño K: si se pasa de K se saca el menos popular
  
  searchTopK(prefix, k) {
    const cantidad = Math.floor(Number(k));
    if (!Number.isFinite(cantidad) || cantidad <= 0) {
      throw new Error("K debe ser un número entero mayor que 0");
    }
    const coincidencias = this.trie.searchByPrefix(prefix);
    const heap = new MinHeap();
    for (const producto of coincidencias) {
      heap.push(producto);
      if (heap.size() > cantidad) heap.pop();
    }
    const resultado = [];
    while (!heap.isEmpty()) resultado.push(heap.pop()); // salen de menor a mayor
    return resultado.reverse(); // de mayor a menor popularidad
  }

  static conDatosIniciales() {
    const motor = new SearchEngine();
    motor.insert("air max", 90);
    motor.insert("air force", 95);
    motor.insert("air jordan", 85);
    motor.insert("adidas boost", 80);
    return motor;
  }
}