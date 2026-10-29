// Grafo no dirigido, lista de nodos + objeto de adyacencia
export class Graph {
  constructor() {
    this.nodes = [];
    this.adjList = {};
  }

  isEmpty() {
    return this.nodes.length === 0;
  }

  searchNode(id) {
    return this.nodes.find((n) => n.id === id);
  }

  addNode(node) {
    if (!this.searchNode(node.id)) {
      this.nodes.push(node);
      this.adjList[node.id] = [];
    }
  }

  addEdge(id1, id2) {
    if (id1 === id2) return;
    if (!this.searchNode(id1) || !this.searchNode(id2)) return;
    if (this.adjList[id1].includes(id2)) return;

    this.adjList[id1].push(id2);
    this.adjList[id2].push(id1);
  }

  removeNode(id) {
    if (!this.searchNode(id)) return;

    this.nodes = this.nodes.filter((n) => n.id !== id);
    delete this.adjList[id];

    // el nodo tambien se quita de las listas de sus vecinos
    for (const key in this.adjList) {
      this.adjList[key] = this.adjList[key].filter((vecino) => vecino !== id);
    }
  }

  // nodos conectados a uno dado
  getAdjacent(id) {
    const vecinos = this.adjList[id] || [];
    return vecinos.map((v) => this.searchNode(v));
  }

  printAdjacency(id) {
    const nodo = this.searchNode(id);
    if (!nodo) return;

    const nombres = this.getAdjacent(id).map((v) => v.nombre);
    console.log(`${nodo.nombre} -> ${nombres.join(", ")}`);
  }

  print() {
    console.log(this.adjList);
  }
}