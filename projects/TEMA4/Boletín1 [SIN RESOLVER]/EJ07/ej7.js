// const sumar=(...numeros)=>{//hacemos uso del operador rest para recibir un nmero indeterminado de argumentos
//     return numeros.reduce(//reduce nos permite reducir un array a un solo valor, en este caso la suma del array
//         (total, num) => total + num, 0);
//         //el 0 es el valor inicial
// }
const sumar = (...numeros) => numeros.reduce((total, num) => total + num, 0);
let try1=[1,2,3,4,5];
console.log(sumar(1,2,3,4,5)); //15
console.log(sumar(10,20,30)); //60
console.log(sumar(...try1)); //15