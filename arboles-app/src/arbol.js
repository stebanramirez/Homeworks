import { BinaryTree } from "./classes/BinaryTree";

// serie de numeros del challenge
export const NUMEROS = [50, 30, 70, 20, 40, 60, 80, 35, 65];

export const construirArbol = (numeros) => {
  const arbol = new BinaryTree();
  numeros.forEach((n) => arbol.insert(n));
  return arbol;
};

export const imprimirEnConsola = (arbol) => {
  console.log("InOrder:", arbol.inOrder().join(" - "));
  console.log("PostOrder:", arbol.postOrder().join(" - "));
  console.log("PreOrder:", arbol.preOrder().join(" - "));
};

// imprime el arbol inicial apenas carga la pagina
imprimirEnConsola(construirArbol(NUMEROS));
