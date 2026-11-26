// Monticulo maximo (Max Heap): la cancion con mas reproducciones siempre esta en la raiz.
// Se guarda en un arreglo: hijos de i -> 2i+1 y 2i+2, padre de i -> (i-1)/2.

export class SongMaxHeap {
  #items = []

  get size() {
    return this.#items.length
  }

  isEmpty() {
    return this.#items.length === 0
  }

  peek() {
    return this.#items[0] ?? null
  }

  // O(log n)
  insert(titulo, reproducciones, extra = {}) {
    this.#items.push({ titulo, reproducciones, ...extra })
    this.#subir(this.#items.length - 1)
  }

  // O(log n): saca y devuelve la cancion mas escuchada
  extractMax() {
    if (this.isEmpty()) return null
    const maximo = this.#items[0]
    const ultimo = this.#items.pop()
    if (this.#items.length > 0) {
      this.#items[0] = ultimo
      this.#bajar(0)
    }
    return maximo
  }

  // TOP N sin destruir el monticulo original: se trabaja sobre una copia.
  top(n) {
    const copia = new SongMaxHeap()
    copia.#items = [...this.#items]
    const salida = []
    while (salida.length < n && !copia.isEmpty()) salida.push(copia.extractMax())
    return salida
  }

  #subir(i) {
    while (i > 0) {
      const padre = Math.floor((i - 1) / 2)
      if (this.#items[padre].reproducciones >= this.#items[i].reproducciones) break
      this.#intercambiar(i, padre)
      i = padre
    }
  }

  #bajar(i) {
    const n = this.#items.length
    for (;;) {
      let mayor = i
      const izq = 2 * i + 1
      const der = 2 * i + 2
      if (izq < n && this.#items[izq].reproducciones > this.#items[mayor].reproducciones) mayor = izq
      if (der < n && this.#items[der].reproducciones > this.#items[mayor].reproducciones) mayor = der
      if (mayor === i) break
      this.#intercambiar(i, mayor)
      i = mayor
    }
  }

  #intercambiar(a, b) {
    ;[this.#items[a], this.#items[b]] = [this.#items[b], this.#items[a]]
  }
}