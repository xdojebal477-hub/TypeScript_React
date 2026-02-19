//importamos las funciones necesarias
import { sumar, restar, multiplicar, dividir } from './funciones.js';

//definimos las variables
const num1 = 10;
const num2 = 5;

//realizamos las operaciones y mostramos los resultados
console.log(`Suma: ${num1} + ${num2} = ${sumar(num1, num2)}`);
console.log(`Resta: ${num1} - ${num2} = ${restar(num1, num2)}`);
console.log(`Multiplicación: ${num1} * ${num2} = ${multiplicar(num1, num2)}`);
console.log(`División: ${num1} / ${num2} = ${dividir(num1, num2)}`);