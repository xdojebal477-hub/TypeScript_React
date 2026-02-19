document.getElementById("addTexto").addEventListener("click", procesarFichero);

function procesarFichero() {
    const fichero = formulario.nombreFichero.value.trim();
    console.log(fichero);

    fetch(fichero)
    .then((response) => response.text())
    .then(addTextoCapa)
    .catch(console.log);
}

const addTextoCapa = (texto) => (document.getElementById("capa").innerHTML += texto);



