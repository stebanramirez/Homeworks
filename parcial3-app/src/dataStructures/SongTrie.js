// Trie arbol de prefijos para titulos de canciones
// Cada nodo es una letra, el recorrido depende del largo del texto, no de la cantidad de canciones

function normalizar(texto) {
  return texto
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // quita tildes
    .toLowerCase()
    .trim()
}

class NodoTrie {
  constructor() {
    this.hijos = new Map()
    this.titulo = null // si no es null, aqui termina una cancion guarda el titulo original
  }
}

export class SongTrie {
  #raiz = new NodoTrie()
  #total = 0

  get size() {
    return this.#total
  }

  // Insertar canciones, Devuelve false si ya existia
  insert(titulo) {
    const clave = normalizar(titulo)
    if (!clave) return false
    let nodo = this.#raiz
    for (const letra of clave) {
      if (!nodo.hijos.has(letra)) nodo.hijos.set(letra, new NodoTrie())
      nodo = nodo.hijos.get(letra)
    }
    if (nodo.titulo !== null) return false
    nodo.titulo = titulo.trim()
    this.#total++
    return true
  }

  // Devuelve el titulo guardado si existe exactamente, o null
  find(titulo) {
    const nodo = this.#bajar(normalizar(titulo))
    return nodo ? nodo.titulo : null
  }

  // Buscar si una cancion existe.
  search(titulo) {
    return this.find(titulo) !== null
  }

  //  Sugerencias por prefijo recorrido en profundidad desde el nodo del prefijo
  suggest(prefijo, limite = 5) {
    const clave = normalizar(prefijo)
    if (!clave) return []
    const inicio = this.#bajar(clave)
    if (!inicio) return []
    const resultado = []
    const pila = [inicio]
    while (pila.length > 0 && resultado.length < limite) {
      const nodo = pila.pop()
      if (nodo.titulo !== null) resultado.push(nodo.titulo)
      // se apilan en orden inverso para visitar las letras alfabeticamente
      const letras = [...nodo.hijos.keys()].sort().reverse()
      for (const l of letras) pila.push(nodo.hijos.get(l))
    }
    return resultado
  }

  #bajar(clave) {
    let nodo = this.#raiz
    for (const letra of clave) {
      nodo = nodo.hijos.get(letra)
      if (!nodo) return null
    }
    return nodo
  }
}