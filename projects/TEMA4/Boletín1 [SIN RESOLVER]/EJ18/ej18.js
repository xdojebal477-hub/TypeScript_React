const capaSalida = document.getElementById("salida");
const apiRest ="https://dani-demo-ajax-default-rtdb.europe-west1.firebasedatabase.app/";

document.getElementById("recuperarDatos").addEventListener("click", recuperarDatos);
frmActualizaRegistro.addEventListener("submit", actualizarAlumno);


async function recuperarDatos(){
    const fichero="alumnos.json";
    try{
        const response=await fetch(apiRest+fichero);
        if(!response.ok) throw new Error(`Error en la peticion ${response.status}`);
        const datos=await response.json();
        const listaAlumnos = [];
        for (let id in datos) {
            listaAlumnos.push({
                id: id,
                ...datos[id]
            });
        }
        mostrarAlumnos(listaAlumnos);
    }
    catch(error){console.log(error)}
}

function borrarSalida(){
    document.getElementById("salida").innerHTML="";
}

function mostrarAlumnos(listaAlumnos) {
    const capaSalida = document.getElementById("salida");
    let tabla = document.createElement("table");
    let cabecera = document.createElement("thead");
    let fila, celda;
    cabecera.innerHTML =
        "<th>Id</th><th>Apellidos</th><th>Nombre</th><th>Edad</th>";
    tabla.append(cabecera);
    for (let alumno of listaAlumnos) {
        fila = tabla.insertRow();
        celda = fila.insertCell();
        celda.textContent = alumno.id;
        celda = fila.insertCell();
        celda.textContent = alumno.apellidos;
        celda = fila.insertCell();
        celda.textContent = alumno.nombre;
        celda = fila.insertCell();
        celda.textContent = alumno.edad;
    }
    borrarSalida();
    capaSalida.append(tabla);
}
async function actualizarAlumno(event) {
    event.preventDefault();
    let datos = { apellidos: "" ,edad:0,};
    const fichero = "alumnos/";
    const apellidos = frmActualizaRegistro.apellidos.value.trim();
    const edad = parseInt(frmActualizaRegistro.edad.value.trim());
    const idFirebase = frmActualizaRegistro.idFirebase.value.trim() + ".json";

    datos.apellidos = apellidos;
    datos.edad = edad;

    /*fetch(apiRest + fichero + idFirebase, {
    method: "PATCH",
    headers: {
        "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(datos),
    }).then((res) => res.json());*/
    try{
        const response = await fetch(apiRest + fichero + idFirebase, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
            },
            body: JSON.stringify(datos),
        });
        if(!response.ok){throw new Error(`Error en la peticion ${response.status}`)}
        const resultado= await response.json();
        console.log(resultado);
        recuperarDatos();

    }
    catch(error){console.log(error)}

}