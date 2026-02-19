document.getElementById("addJSON").addEventListener("click", procesarFichero);

function procesarFichero() {
    const url=formulario.url.value.trim();
    fetch(url)
    .then((response) => response.text())
    .then(mostrarObjetoConsola).catch(console.log)
}

const mostrarObjetoConsola=(texto)=>{
    let listaUsuarios=JSON.parse(texto).results;
    console.log(listaUsuarios);
}