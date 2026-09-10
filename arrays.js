console.log("===== ARRAYS FUNCTIONS =====");

// Array principal
const numbers = [1, 2, 3, 4, 5];


// 1. at()
// Obtiene un elemento usando su posición.
console.log("\n1. at()");
console.log(numbers.at(2));


// 2. concat()
// Une dos o más arrays.
console.log("\n2. concat()");
const numbers2 = [6, 7, 8];
console.log(numbers.concat(numbers2));


// 3. copyWithin()
// Copia una parte del array dentro del mismo array.
console.log("\n3. copyWithin()");
const copyArray = [1, 2, 3, 4, 5];
console.log(copyArray.copyWithin(0, 3));


// 4. entries()
// Devuelve pares de índice y valor.
console.log("\n4. entries()");
const entriesArray = ["a", "b", "c"];

for (const entry of entriesArray.entries()) {
    console.log(entry);
}


// 5. every()
// Comprueba si todos los elementos cumplen una condición.
console.log("\n5. every()");
console.log(numbers.every(number => number > 0));


// 6. fill()
// Cambia los elementos por un valor determinado.
console.log("\n6. fill()");
const fillArray = [1, 2, 3, 4, 5];
console.log(fillArray.fill(0, 1, 4));


// 7. filter()
// Crea un nuevo array con los elementos que cumplen una condición.
console.log("\n7. filter()");
console.log(numbers.filter(number => number % 2 === 0));


// 8. find()
// Devuelve el primer elemento que cumple una condición.
console.log("\n8. find()");
console.log(numbers.find(number => number > 3));


// 9. findIndex()
// Devuelve la posición del primer elemento que cumple una condición.
console.log("\n9. findIndex()");
console.log(numbers.findIndex(number => number > 3));


// 10. findLast()
// Devuelve el último elemento que cumple una condición.
console.log("\n10. findLast()");
console.log(numbers.findLast(number => number > 2));


// 11. findLastIndex()
// Devuelve la posición del último elemento que cumple una condición.
console.log("\n11. findLastIndex()");
console.log(numbers.findLastIndex(number => number > 2));


// 12. flat()
// Convierte un array con arrays internos en un solo array.
console.log("\n12. flat()");
const nestedArray = [1, [2, 3], [4, 5]];
console.log(nestedArray.flat());


// 13. flatMap()
// Hace un map y después aplana el resultado.
console.log("\n13. flatMap()");
console.log(numbers.flatMap(number => [number, number * 2]));


// 14. forEach()
// Recorre todos los elementos del array.
console.log("\n14. forEach()");
numbers.forEach(number => {
    console.log(number);
});


// 15. includes()
// Comprueba si un elemento existe en el array.
console.log("\n15. includes()");
console.log(numbers.includes(3));


// 16. indexOf()
// Devuelve la posición de la primera aparición de un elemento.
console.log("\n16. indexOf()");
console.log(numbers.indexOf(4));


// 17. join()
// Une todos los elementos en un string.
console.log("\n17. join()");
console.log(numbers.join(" - "));


// 18. keys()
// Devuelve los índices del array.
console.log("\n18. keys()");
for (const key of numbers.keys()) {
    console.log(key);
}


// 19. lastIndexOf()
// Devuelve la posición de la última aparición de un elemento.
console.log("\n19. lastIndexOf()");
const repeatedNumbers = [1, 2, 3, 2, 5];
console.log(repeatedNumbers.lastIndexOf(2));


// 20. length
// Indica la cantidad de elementos del array.
console.log("\n20. length()");
console.log(numbers.length);


// 21. map()
// Crea un nuevo array modificando cada elemento.
console.log("\n21. map()");
console.log(numbers.map(number => number * 2));


// 22. pop()
// Elimina el último elemento.
console.log("\n22. pop()");
const popArray = [1, 2, 3, 4];
const lastElement = popArray.pop();

console.log(lastElement);
console.log(popArray);


// 23. push()
// Agrega uno o más elementos al final.
console.log("\n23. push()");
const pushArray = [1, 2, 3];
pushArray.push(4);

console.log(pushArray);


// 24. reduce()
// Reduce todos los elementos a un solo valor.
console.log("\n24. reduce()");
const sum = numbers.reduce((total, number) => total + number, 0);
console.log(sum);


// 25. reduceRight()
// Reduce los elementos comenzando desde la derecha.
console.log("\n25. reduceRight()");
const words = ["Hola", "mundo", "JavaScript"];

const result = words.reduceRight(
    (result, word) => result + " " + word,
    ""
);

console.log(result.trim());


// 26. reverse()
// Invierte el orden de los elementos.
console.log("\n26. reverse()");
const reverseArray = [1, 2, 3, 4, 5];
console.log(reverseArray.reverse());


// 27. shift()
// Elimina el primer elemento.
console.log("\n27. shift()");
const shiftArray = [1, 2, 3, 4];
const firstElement = shiftArray.shift();

console.log(firstElement);
console.log(shiftArray);


// 28. slice()
// Copia una parte del array sin modificar el original.
console.log("\n28. slice()");
const sliceArray = [1, 2, 3, 4, 5];
console.log(sliceArray.slice(1, 4));


// 29. some()
// Comprueba si al menos un elemento cumple una condición.
console.log("\n29. some()");
console.log(numbers.some(number => number > 4));


// 30. sort()
// Ordena los elementos.
console.log("\n30. sort()");
const sortArray = [5, 2, 8, 1, 3];
console.log(sortArray.sort((a, b) => a - b));


// 31. splice()
// Agrega, elimina o reemplaza elementos.
console.log("\n31. splice()");
const spliceArray = [1, 2, 3, 4, 5];

spliceArray.splice(2, 1, 10);

console.log(spliceArray);


// 32. toLocaleString()
// Convierte los elementos a un string usando formato local.
console.log("\n32. toLocaleString()");
const localeArray = [1000, 2000, 3000];
console.log(localeArray.toLocaleString());


// 33. toString()
// Convierte el array en un string.
console.log("\n33. toString()");
console.log(numbers.toString());


// 34. unshift()
// Agrega uno o más elementos al principio.
console.log("\n34. unshift()");
const unshiftArray = [2, 3, 4];

unshiftArray.unshift(1);

console.log(unshiftArray);


// 35. values()
// Devuelve los valores del array.
console.log("\n35. values()");
for (const value of numbers.values()) {
    console.log(value);
}


console.log("\n===== FIN DEL HOMEWORK =====");