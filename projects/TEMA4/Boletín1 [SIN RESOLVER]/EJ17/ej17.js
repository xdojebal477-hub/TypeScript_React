const apiRest ="https://dani-demo-ajax-default-rtdb.europe-west1.firebasedatabase.app/";
document.getElementById("recuperarDatos").addEventListener("click", recuperarDatos);
formNuevoAlumno.addEventListener("submit", insertarAlumno);

async function recuperarDatos() {
    const fichero = "alumnos.json";
    try{
        const response = await fetch(apiRest + fichero);
        if(!response.ok){throw new Error(`Error en la peticion ${response.status}`)}
        const datos= await response.json();
        mostrarAlumnos(Object.values(datos));
    }
    catch(error){
        console.log(error);
    }

    // fetch(apiRest + fichero)
    // .then((res) => res.json())
    // .then((data) => Object.values(data)) //Devuelve un objeto cuyos índice es el id generado por Firebase. Lo quitamos quedándonos con values
    // .then(mostrarAlumnos)
    // .catch(console.log);
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

function borrarSalida() {
    document.getElementById("salida").innerHTML = "";
}

async function insertarAlumno(event) {
    const fichero = "alumnos.json";
    const apellidos = formNuevoAlumno.apellidos.value.trim();
    const nombre = formNuevoAlumno.nombre.value.trim();
    const edad = formNuevoAlumno.edad.value;
    const id = formNuevoAlumno.id.value;

    const nuevoAlumno = {
        apellidos: apellidos,
        nombre: nombre,
        edad: edad,
        id: id,
    };
    event.preventDefault();

    try{
        const response = await fetch(apiRest + fichero, {
            method: "POST",
            headers: {
            "Content-Type": "application/json;charset=utf-8",
            },
            body: JSON.stringify(nuevoAlumno),
        });
        if(!response.ok){throw new Error(`Error en la peticion ${response.status}`)}
        const datos= await response.json();
        console.log(datos);
        setTimeout(recuperarDatos, 800); //Para dar margen a que la actualización del dato se haya hecho en la BD
    }
    catch(error){
        console.log(error);
    }

//     fetch(apiRest + fichero, {
//         method: "POST",
//         headers: {
//         "Content-Type": "application/json;charset=utf-8",
//         },
//         body: JSON.stringify(nuevoAlumno),
//     })
//         .then((res) => res.json())
//         .then(console.log);
//     setTimeout(recuperarDatos, 800); //Para dar margen a que la actualización del dato se haya hecho en la BD
}