interface Docente {
  nombre: String;
  modulo: String;
}

function mostrarDocente(docente: Docente): void {
  console.log(
    `El docente ${docente.nombre} imparte el módulo de ${docente.modulo}`,
  );
}
const docente1: Docente = { nombre: "David", modulo: "Cliente" };
mostrarDocente(docente1);
