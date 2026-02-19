document.getElementById("recuperarDatos").addEventListener("click", atacarAPIRest);
const capaSalida = document.getElementById("salida");

async function atacarAPIRest() {
    try{
        const response = await fetch("https://dani-demo-ajax-default-rtdb.europe-west1.firebasedatabase.app/.json");
        if(!response.ok){throw new Error(`Error en la peticion ${response.status}`)}
        const datos= await response.json();
        //mostrarAlumnos(Object.values(datos.alumnos));
        capaSalida.innerHTML=JSON.stringify(datos,null,2);
        
    }
    catch(error){
        console.log(error);
        capaSalida.innerHTML=`<span style="color:red;">${error.message}</span>`;
    }
}
//genereamos los datos en modo json
function mostrarAlumnos(listaAlumnos) {
    const capaSalida = document.getElementById("salida");
    let salida = "";
    for (let alumno of listaAlumnos) {
        salida += JSON.stringify(alumno) + "<br>";
    }
    capaSalida.innerHTML = salida;
}


// function recuperarDatos() {
//     const url ="https://ejercicios2daw-default-rtdb.europe-west1.firebasedatabase.app/alumnos.json";
//     fetch(url)
//     .then((res) => res.json())
//     .then((objRespuesta) => Object.values(objRespuesta))
//     .then(mostrarAlumnos);
// }

