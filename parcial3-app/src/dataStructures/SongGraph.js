// Grafo NO dirigido (lista de adyacencia): si A es similar a B, tambien B es similar a A.

export class SongGraph {
  #adyacentes = new Map() // titulo -> Set de titulos similares

  get size() {
    return this.#adyacentes.size
  }

  addVertex(titulo) {
    if (!this.#adyacentes.has(titulo)) this.#adyacentes.set(titulo, new Set())
  }

  // La arista se guarda en AMBOS sentidos (eso lo hace no dirigido).
  addEdge(a, b) {
    if (a === b) return false
    this.addVertex(a)
    this.addVertex(b)
    this.#adyacentes.get(a).add(b)
    this.#adyacentes.get(b).add(a)
    return true
  }

  hasEdge(a, b) {
    return this.#adyacentes.get(a)?.has(b) ?? false
  }

  neighbors(titulo) {
    return [...(this.#adyacentes.get(titulo) ?? [])]
  }

  // Recomendaciones con BFS: primero las canciones directamente conectadas (distancia 1),
  // luego las de "amigos de amigos" (distancia 2), hasta maxDistancia.
  recommend(titulo, maxDistancia = 2) {
    if (!this.#adyacentes.has(titulo)) return []
    const visitados = new Set([titulo])
    const cola = [{ titulo, distancia: 0 }]
    const resultado = []
    while (cola.length > 0) {
      const actual = cola.shift()
      if (actual.distancia >= maxDistancia) continue
      for (const vecino of this.#adyacentes.get(actual.titulo)) {
        if (visitados.has(vecino)) continue
        visitados.add(vecino)
        const distancia = actual.distancia + 1
        resultado.push({ titulo: vecino, distancia })
        cola.push({ titulo: vecino, distancia })
      }
    }
    return resultado
  }
}