type EstadoCarga = "iddle" | "loading" | "success" | "error";

interface Usuario {
  id: string;
  nombre: string;
}

interface RespuestaAPI {
  estado: EstadoCarga;
  data: Usuario | null;
}
function procesarRespuesta(respuesta: RespuestaAPI): void {
  switch (respuesta.estado) {
    case "iddle":
      console.log("La solicitud no ha comenzado aún.");
      break;
    case "loading":
      console.log("La solicitud está en curso...");
      break;
    case "success":
      if (respuesta.data) {
        console.log(
          `Usuario cargado: ${respuesta.data.nombre} (ID: ${respuesta.data.id})`,
        );
      }
      break;
    case "error":
      console.log("Hubo un error al cargar los datos del usuario.");
      break;
  }
}

const respuestaEjemplo: RespuestaAPI = {
  estado: "success",
  data: { id: "123", nombre: "Juan Pérez" },
};

procesarRespuesta(respuestaEjemplo);
