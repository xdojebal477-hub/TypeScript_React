interface Tarea {
  id: string;
  texto: string;
  completada: boolean;
}

//hacemos un array de tareas
const tareas: Tarea[] = [
  { id: "1", texto: "Comprar leche", completada: false },
  { id: "2", texto: "Estudiar TypeScript", completada: true },
  { id: "3", texto: "Hacer ejercicio", completada: false },
];

function buscarTarea({ id }: Tarea) {
  const tareaEncontrada = tareas.find((tarea) => tarea.id === id);
  if (tareaEncontrada) {
    console.log(
      `Tarea con id ${id} encontrada: ${tareaEncontrada.texto}, Completada: ${tareaEncontrada.completada}`,
    );
  } else {
    console.log(`Tarea no encontrada con id: ${id}`);
  }
}
const tareaABuscar: Tarea = { id: "2", texto: "", completada: false };
buscarTarea(tareaABuscar);
buscarTarea({id:"4", texto:"", completada:false});
