export class Cola extends Array {
  encolar(valor) {
    this.push(valor);
  }

  desencolar() {
    return this.shift();
  }

  peek() {
    return this[0];
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
