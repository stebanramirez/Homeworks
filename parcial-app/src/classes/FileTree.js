import { FsNode } from "./FsNode";

export class FileTree {
  constructor() {
    // raiz virtual, no se guarda en la base de datos
    this.root = new FsNode({ id: null, name: "root", type: "folder", ownerEmail: "" });
  }

  find(id, node = this.root) {
    if (node.id === id) return node;
    for (const hijo of node.children) {
      const encontrado = this.find(id, hijo);
      if (encontrado) return encontrado;
    }
    return null;
  }

  // inserta un nodo bajo su padre (parentId null = raiz)
  insert(datos) {
    const padre = datos.parentId === null ? this.root : this.find(datos.parentId);
    if (!padre) throw new Error("La carpeta padre no existe");
    return padre.addChild(new FsNode(datos));
  }

  // DFS: carpeta primero y luego su contenido
  dfs(node = this.root, resultado = []) {
    if (node !== this.root) resultado.push(node);
    node.children.forEach((hijo) => this.dfs(hijo, resultado));
    return resultado;
  }

  // el nodo y todo lo que cuelga de el
  subtree(id) {
    const nodo = this.find(id);
    if (!nodo) return [];
    return [nodo, ...this.dfs(nodo)];
  }

  // arma el arbol desde la lista plana que viene de la base de datos
  static fromList(lista) {
    const arbol = new FileTree();
    const pendientes = [...lista].sort((a, b) => a.createdAt - b.createdAt);

    // un padre siempre se crea antes que sus hijos
    let progreso = true;
    while (pendientes.length > 0 && progreso) {
      progreso = false;
      for (let i = pendientes.length - 1; i >= 0; i--) {
        const dato = pendientes[i];
        const padre = dato.parentId === null ? arbol.root : arbol.find(dato.parentId);
        if (padre && padre.isFolder()) {
          padre.addChild(new FsNode(dato));
          pendientes.splice(i, 1);
          progreso = true;
        }
      }
    }
    return arbol;
  }
}
