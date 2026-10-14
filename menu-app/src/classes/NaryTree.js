import { NaryNode } from "./NaryNode";

export class NaryTree {
  constructor() {
    // la raiz no se muestra, solo agrupa los menus principales
    this.root = new NaryNode("root", "/", null);
  }

  // DFS: baja por cada rama antes de pasar a la siguiente
  dfs(node = this.root, resultado = []) {
    if (node !== this.root) resultado.push(node);
    node.children.forEach((hijo) => this.dfs(hijo, resultado));
    return resultado;
  }

  // BFS: nivel por nivel de izquierda a derecha
  bfs() {
    const resultado = [];
    const cola = [...this.root.children];
    while (cola.length > 0) {
      const actual = cola.shift();
      resultado.push(actual);
      cola.push(...actual.children);
    }
    return resultado;
  }
}
