//Crea en TypeScript una función llamada cajaSorpresa que funcione como un contenedor genérico. La función debe aceptar un argumento de cualquier tipo (contenido). Debe devolver un objeto con dos propiedades: datos (el contenido original) y secreto (un booleano true). Usa Genéricos (<T>) para que TypeScript sepa exactamente qué tipo de dato hay dentro de la caja. haz dos llamadas a la función, una pasándole un número y otra un texto. Intenta acceder a un método de string (como .toUpperCase()) en la caja del número para ver cómo TypeScript te avisa del error.

const cajaSorpresa=<T>(contenido: T)=>({datos:contenido,secreto:true});

const cajaNumero = cajaSorpresa(42);
const cajaTexto = cajaSorpresa("Hola Mundo");

// Accediendo a las propiedades de la caja de número
console.log(cajaNumero.datos); // 42
console.log(cajaNumero.secreto); // true
// Intentando usar un método de string en la caja de número
// console.log(cajaNumero.datos.toUpperCase()); // Error de TypeScript

// Accediendo a las propiedades de la caja de texto
console.log(cajaTexto.datos); // "Hola Mundo"
console.log(cajaTexto.secreto); // true
// Usando un método de string en la caja de texto
console.log(cajaTexto.datos.toUpperCase()); // "HOLA MUNDO" 

