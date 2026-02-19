import type { BookLog } from "./types";

export const mockData: BookLog[] = [
  {
    id:"1",
    titulo: "Don Quijote de la Mancha",
    autor: "Miguel de Cervantes",
    estado: "disponible",
    numeroPaginas: 637,
    fechaPrestamo: new Date(),
  },
  {
    id:"2",
    titulo: "Homero,La Odisea",
    autor: "Homero",
    estado: "prestado",
    numeroPaginas: 450,
    fechaPrestamo: new Date(2026, 1, 20),
  },
];
