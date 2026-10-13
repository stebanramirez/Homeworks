import { TreeNode } from "./TreeNode";

export class BinaryTree {
  constructor() {
    this.root = null;
  }

  // no se permiten valores repetidos, devuelve false si ya existia
  insert(value) {
    const nuevo = new TreeNode(value);

    if (this.root === null) {
      this.root = nuevo;
      return true;
    }

    let actual = this.root;
    while (true) {
      if (value === actual.value) return false;

      if (value < actual.value) {
        if (actual.left === null) {
          actual.left = nuevo;
          return true;
        }
        actual = actual.left;
      } else {
        if (actual.right === null) {
          actual.right = nuevo;
          return true;
        }
        actual = actual.right;
      }
    }
  }

  // N - L - R
  preOrder(node = this.root, resultado = []) {
    if (node === null) return resultado;
    resultado.push(node.value);
    this.preOrder(node.left, resultado);
    this.preOrder(node.right, resultado);
    return resultado;
  }

  // L - N - R
  inOrder(node = this.root, resultado = []) {
    if (node === null) return resultado;
    this.inOrder(node.left, resultado);
    resultado.push(node.value);
    this.inOrder(node.right, resultado);
    return resultado;
  }

  // L - R - N
  postOrder(node = this.root, resultado = []) {
    if (node === null) return resultado;
    this.postOrder(node.left, resultado);
    this.postOrder(node.right, resultado);
    resultado.push(node.value);
    return resultado;
  }

  // busca el valor bajando por la izquierda o la derecha
  contains(value) {
    let actual = this.root;
    while (actual !== null) {
      if (value === actual.value) return true;
      actual = value < actual.value ? actual.left : actual.right;
    }
    return false;
  }

  // react-d3-tree pide { name, children: [...] }
  toD3(node = this.root, lado = "raiz") {
    if (node === null) return null;

    const children = [];
    if (node.left) children.push(this.toD3(node.left, "izquierdo"));
    if (node.right) children.push(this.toD3(node.right, "derecho"));

    return {
      name: String(node.value),
      attributes: { lado },
      children,
    };
  }
}
