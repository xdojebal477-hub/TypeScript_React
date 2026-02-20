import type { BookLog } from "../types";
import {
  TrashIcon,
  CalendarDaysIcon,
  CheckCircleIcon,
  ArrowPathIcon,
  ArchiveBoxXMarkIcon,
} from "@heroicons/react/24/outline";

export interface BookLogProps {
  data: BookLog;
  onDelete: (id: string) => void;
}

export function BookLogCard({ data, onDelete }: BookLogProps) {
  // Mapa de colores por estado — neon style
  const statusStyles: Record<BookLog["estado"], string> = {
    disponible:
      "bg-emerald-500/15 text-emerald-400 border border-emerald-500/20",
    prestado: "bg-blue-500/15 text-blue-400 border border-blue-500/20",
    retirado: "bg-rose-500/15 text-rose-400 border border-rose-500/20",
  };

  const statusIcon: Record<BookLog["estado"], React.ReactNode> = {
    disponible: <CheckCircleIcon className="w-3.5 h-3.5" />,
    prestado: <ArrowPathIcon className="w-3.5 h-3.5" />,
    retirado: <ArchiveBoxXMarkIcon className="w-3.5 h-3.5" />,
  };

  return (
    <div className="glass rounded-xl neon-border overflow-hidden flex flex-col transition-all duration-300">
      {/* Portada */}
      <img
        src={
          data.portadaUrl ||
          `https://placehold.co/300x400/1e1b4b/a78bfa?text=${encodeURIComponent(data.titulo)}`
        }
        alt={`Portada de ${data.titulo}`}
        className="w-full h-48 object-cover"
      />

      {/* Contenido */}
      <div className="p-4 flex flex-col flex-1">
        <h3 className="text-base font-semibold text-slate-100 leading-tight mb-1 line-clamp-2">
          {data.titulo}
        </h3>
        <p className="text-sm text-slate-400 mb-3">{data.autor}</p>

        {/* Badge de estado + páginas */}
        <div className="flex items-center justify-between mt-auto mb-3">
          <span
            className={`text-xs font-medium px-2.5 py-1 rounded-full flex items-center gap-1 ${statusStyles[data.estado]}`}
          >
            {statusIcon[data.estado]} {data.estado}
          </span>
          <span className="text-xs text-slate-500">
            {data.numeroPaginas} págs.
          </span>
        </div>

        {/* Fecha de préstamo si existe */}
        {data.fechaPrestamo && (
          <p className="text-xs text-slate-500 mb-3 flex items-center gap-1">
            <CalendarDaysIcon className="w-3.5 h-3.5" />
            {new Date(data.fechaPrestamo).toLocaleDateString("es-ES")}
          </p>
        )}

        {/* Botón eliminar */}
        <button
          onClick={() => onDelete(data.id)}
          className="w-full py-2 text-sm font-medium text-rose-400 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-1.5"
        >
          <TrashIcon className="w-4 h-4" />
          Eliminar
        </button>
      </div>
    </div>
  );
}
