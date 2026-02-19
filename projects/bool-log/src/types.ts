//modelamos nuestra interfaz para los datos
export interface BookLog {
  id:string;
  titulo: string;
  autor: string;
  estado: "disponible" | "prestado" | "retirado";
  numeroPaginas: number;
  fechaPrestamo?: string;
  portadaUrl?: string; 
}
