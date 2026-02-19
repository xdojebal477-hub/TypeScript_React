document.getElementById("iniciaPromesa").onclick = iniciaPromesa;
document.getElementById("procesarPromesa").onclick = procesarPromesa;

let promesaFinalizada;

function iniciaPromesa() {
    promesaFinalizada = false;
    let promise = new Promise(function (resolve, reject) {//creamos el objeto promejo y le mandamos al ejecutor las funciones resolve y reject
        setTimeout(gestionarPromesa, 2000, resolve, reject);
    });

    promise.then(//cuando la promesa se resuelva o rechace, se ejecutan las funciones correspondientes, pero solo una de ellas
        (result) => mostrarResultado(result),
        (error) => mostrarResultado(error)
    );
}

function gestionarPromesa(resolve, reject) {
    if (promesaFinalizada) {
        resolve(document.getElementById("msjExito").value);
    } else {
        reject(document.getElementById("msjError").value);
    }
}

function procesarPromesa() {
    promesaFinalizada = true;
}

function mostrarResultado(mensaje) {
    document.getElementById("salida").innerHTML = mensaje;
}