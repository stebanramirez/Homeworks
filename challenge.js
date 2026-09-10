// Diferencias entre Arrow Functions y Regular Functions:

// this: Regular tiene su propio this, Arrow hereda el del contexto
// arguments: Regular lo tiene, Arrow no
// Hoisting: Regular (function nombre(){}) se eleva, Arrow no
// Constructor: Regular puede usarse con new, Arrow no

function checkParityRegular(numero) {
  if (numero % 2 === 0) {
    console.log(`${numero} es par`);
  } else {
    console.log(`${numero} es impar`);
  }
}

const checkParityArrow = (numero) => {
  if (numero % 2 === 0) {
    console.log(`${numero} es par`);
  } else {
    console.log(`${numero} es impar`);
  }
};

checkParityRegular(7);
checkParityRegular(10);
checkParityArrow(3);
checkParityArrow(8);    