//aqui exportaremos la funciones que vamos a utilizar en los ejercicios
const sumar = (a, b) => a + b;
const restar = (a, b) => a - b;
const multiplicar = (a, b) => a * b;
const dividir = (a, b) => {
    if (b === 0) {
        throw new Error("No se puede dividir por cero");
    }
    return a / b;
};

export { sumar, restar, multiplicar, dividir };