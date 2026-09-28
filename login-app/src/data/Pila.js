export class Pila extends Array {
  apilar(valor) {
    this.push(valor);
  }

  desapilar() {
    return this.pop();
  }

  peek() {
    return this[this.length - 1];
  }

  estaVacia() {
    return this.length === 0;
  }

  tamano() {
    return this.length;
  }

  toArray() {
    return [...this];
  }
}
