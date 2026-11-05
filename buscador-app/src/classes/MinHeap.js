// Min Heap guardado en un arreglo. Se compara por popularidad el menor queda arriba
export default class MinHeap {
  constructor() {
    this.heap = [];
  }

  size() {
    return this.heap.length;
  }

  isEmpty() {
    return this.heap.length === 0;
  }

  peek() {
    return this.heap.length ? this.heap[0] : null;
  }

  toArray() {
    return [...this.heap];
  }

  swap(i, j) {
    [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
  }

  // Inserta al final y sube el elemento hasta su lugar
  push(item) {
    this.heap.push(item);
    this.percolateUp(this.heap.length - 1);
  }

  // Quita el mínimo (la raíz): mueve el último a la raíz y lo baja
  pop() {
    if (this.isEmpty()) return null;
    const min = this.heap[0];
    const ultimo = this.heap.pop();
    if (this.heap.length > 0) {
      this.heap[0] = ultimo;
      this.percolateDown(0);
    }
    return min;
  }

  // Convierte un arreglo desordenado en heap
  heapify(arr) {
    this.heap = [...arr];
    for (let i = Math.floor(this.heap.length / 2) - 1; i >= 0; i--) {
      this.percolateDown(i);
    }
  }

  percolateUp(i) {
    while (i > 0) {
      const padre = Math.floor((i - 1) / 2);
      if (this.heap[i].popularity >= this.heap[padre].popularity) break;
      this.swap(i, padre);
      i = padre;
    }
  }

  percolateDown(i) {
    const n = this.heap.length;
    while (true) {
      const izq = 2 * i + 1;
      const der = 2 * i + 2;
      let menor = i;
      if (izq < n && this.heap[izq].popularity < this.heap[menor].popularity) menor = izq;
      if (der < n && this.heap[der].popularity < this.heap[menor].popularity) menor = der;
      if (menor === i) break;
      this.swap(i, menor);
      i = menor;
    }
  }
}