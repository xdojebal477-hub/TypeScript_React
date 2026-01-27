//Crea en TypeScript una función llamada cajaSorpresa que funcione como un contenedor genérico. La función debe aceptar un argumento de cualquier tipo (contenido). Debe devolver un objeto con dos propiedades: datos (el contenido original) y secreto (un booleano true). Usa Genéricos (<T>) para que TypeScript sepa exactamente qué tipo de dato hay dentro de la caja. haz dos llamadas a la función, una pasándole un número y otra un texto. Intenta acceder a un método de string (como .toUpperCase()) en la caja del número para ver cómo TypeScript te avisa del error.

function cajaSorpresa<T>(contenido: T): { datos: T; secreto: boolean } {
  return {
    datos: contenido,
    secreto: true,
  };
}

const cajaNumero = cajaSorpresa(42);
const cajaTexto = cajaSorpresa("¡Hola, mundo!");

// Accediendo a las propiedades de la caja con número
console.log("Caja con número:", cajaNumero.datos); // 42
// El siguiente línea causará un error de TypeScript porque 'toUpperCase' no es un método de 'number'
// console.log(cajaNumero.datos.toUpperCase()); // Error

// Accediendo a las propiedades de la caja con texto
console.log("Caja con texto:", cajaTexto.datos); // "¡Hola, mundo!"
console.log("Texto en mayúsculas:", cajaTexto.datos.toUpperCase()); // "¡HOLA, MUNDO!"