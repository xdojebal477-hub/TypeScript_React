document.getElementById("addJSON").addEventListener("click", atacarAPIRest);

// function atacarAPIRest() {
//     fetch('https://picsum.photos/list')
//     .then((response)=>response.json())
//     .then(generarLista)
//     .catch(console.log)
// }

// function generarLista(imagenes){
//     let lista="<ul>";
//     for(let imagen of imagenes){
//         lista+=`<li><a target="_blank" href="${imagen.post_url}">IMAGEN</a> ${imagen.author}</li>`;
//     }   
//     lista+="</ul>";
//     document.getElementById("salida").innerHTML=lista;
//     }



async function atacarAPIRest() {
    try {
        const response = await fetch('https://picsum.photos/list');
        if(!response.ok){throw new Error(`Error en la peticion ${response.status}`)}
        const imagenes = await response.json();
        generarLista(imagenes);
    } catch (error) {
        console.log(error);
    }
}

function generarLista(imagenes){
    let lista="<ul>";
    let imagenes_Final=imagenes.slice(0,10); 
    for(let imagen of imagenes_Final){
        lista+=`<li><a target="_blank" href="${imagen.post_url}">IMAGEN</a> ${imagen.author}</li>`;
    }   
    lista+="</ul>";
    document.getElementById("salida").innerHTML=lista;
}