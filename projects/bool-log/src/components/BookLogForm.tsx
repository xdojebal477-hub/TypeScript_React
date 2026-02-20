import React, { useState } from "react";
import type { BookLog } from "../types";
import { PlusIcon } from "@heroicons/react/24/solid";

export interface BookLogFormProps {
  onAdd: (item: BookLog) => void;
}
export function BookLogForm({ onAdd }: BookLogFormProps) {
  const [titulo, setTitulo] = useState("");
  const [autor, setAutor] = useState("");
  const [estado, setEstado] = useState<BookLog["estado"]>("disponible");
  const [numeroPaginas, setNumeroPaginas] = useState(0);
  const [portadaUrl, setPortadaUrl] = useState("");

  const isValid = titulo.trim() !== "" && autor.trim() !== "";

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();

    if (!isValid) return;
    const newBookLog: BookLog = {
      id: crypto.randomUUID(),
      titulo,
      autor,
      estado,
      numeroPaginas,
      fechaPrestamo: new Date().toISOString(),
      portadaUrl:
        portadaUrl ||
        `https://placehold.co/300x400/1e1b4b/a78bfa?text=${encodeURIComponent(titulo)}`,
    };

    onAdd(newBookLog);
    setTitulo("");
    setAutor("");
    setEstado("disponible");
    setNumeroPaginas(0);
    setPortadaUrl("");
  };

  // Clases reutilizables para los inputs
  const inputClass =
    "w-full px-3 py-2 rounded-lg border border-slate-700 bg-slate-800/50 text-slate-200 text-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50 transition";
  const labelClass = "block text-sm font-semibold text-slate-400 mb-1";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Fila 1: Título + Autor (en desktop van lado a lado) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Título *</label>
          <input
            type="text"
            placeholder="Ej: Don Quijote de la Mancha"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            className={inputClass}
          />
        </div>

        <div>
          <label className={labelClass}>Autor *</label>
          <input
            type="text"
            placeholder="Ej: Miguel de Cervantes"
            value={autor}
            onChange={(e) => setAutor(e.target.value)}
            className={inputClass}
          />
        </div>
      </div>

      {/* Fila 2: Estado + Páginas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Estado</label>
          <select
            value={estado}
            onChange={(e) => setEstado(e.target.value as BookLog["estado"])}
            className={inputClass}
          >
            <option value="disponible">Disponible</option>
            <option value="prestado">Prestado</option>
            <option value="retirado">Retirado</option>
          </select>
        </div>

        <div>
          <label className={labelClass}>Número de páginas</label>
          <input
            type="number"
            min={0}
            placeholder="Ej: 350"
            value={numeroPaginas}
            onChange={(e) => setNumeroPaginas(Number(e.target.value))}
            className={inputClass}
          />
        </div>
      </div>

      {/* Fila 3: URL de portada */}
      <div>
        <label className={labelClass}>URL de la portada (opcional)</label>
        <input
          type="url"
          placeholder="https://ejemplo.com/portada.jpg"
          value={portadaUrl}
          onChange={(e) => setPortadaUrl(e.target.value)}
          className={inputClass}
        />
      </div>

      {/* Botón de envío */}
      <button
        type="submit"
        disabled={!isValid}
        className={`w-full sm:w-auto px-6 py-2.5 rounded-lg text-sm font-semibold text-white transition-all cursor-pointer
          ${
            isValid
              ? "bg-violet-600 hover:bg-violet-500 active:scale-95 neon-glow-violet"
              : "bg-slate-700 text-slate-500 cursor-not-allowed"
          }`}
      >
        <PlusIcon className="w-4 h-4 inline-block mr-1 -mt-0.5" />
        Añadir Libro
      </button>
    </form>
  );
}
