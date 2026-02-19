import type { BookLog } from "./types";

export const mockData: BookLog[] = [
  {
    id:"1",
    titulo: "Don Quijote de la Mancha",
    autor: "Miguel de Cervantes",
    estado: "disponible",
    numeroPaginas: 637,
    fechaPrestamo: "2025-01-01",
    portadaUrl: "https://placehold.co/300x400/3498db/white?text=El+Quijote",
  },
  {
    id:"2",
    titulo: "Homero,La Odisea",
    autor: "Homero",
    estado: "prestado",
    numeroPaginas: 450,
    fechaPrestamo: "2026-02-20",
    portadaUrl: "https://placehold.co/300x400/3498db/white?text=La+Odisea",
  },
];
