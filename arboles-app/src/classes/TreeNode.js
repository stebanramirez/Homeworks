export class TreeNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }

  // una hoja es un nodo sin hijos
  isLeaf() {
    return this.left === null && this.right === null;
  }
}
