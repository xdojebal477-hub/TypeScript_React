import React, { useState } from "react";
import type { BookLog } from "../types";

export interface BookLogFormProps {
  onAdd: (item: BookLog) => void;
}
export function BookLogForm({ onAdd }: BookLogFormProps) {
  const [titulo, setTitulo] = useState("");
  const [autor, setAutor] = useState("");
  const [estado, setEstado] = useState<BookLog["estado"]>("disponible");
  const [numeroPaginas, setNumeroPaginas] = useState(0);
  const [portadaUrl, setPortadaUrl] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!titulo.trim() || !autor.trim()) return;
    const newBookLog: BookLog = {
      id: crypto.randomUUID(),
      titulo,
      autor,
      estado,
      numeroPaginas,
      fechaPrestamo: new Date().toISOString(),
      portadaUrl:
        portadaUrl ||
        `https://placehold.co/300x400/3498db/white?text=${encodeURIComponent(titulo)}`,
    };

    onAdd(newBookLog);
    setTitulo("");
    setAutor("");
    setEstado("disponible");
    setNumeroPaginas(0);
    setPortadaUrl("");
  };

  return (
    <form onSubmit={handleSubmit}>
      
      <div style={{ marginBottom: "10px" }}>
        <label
          style={{ display: "block", marginBottom: "4px", fontWeight: 600 }}
        >
          Título *
        </label>
        <input
          type="text"
          placeholder="Ej: Don Quijote de la Mancha"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          style={{ padding: "8px", width: "100%", boxSizing: "border-box" }}
        />
      </div>

      {/* Campo: Autor */}
      <div style={{ marginBottom: "10px" }}>
        <label
          style={{ display: "block", marginBottom: "4px", fontWeight: 600 }}
        >
          Autor *
        </label>
        <input
          type="text"
          placeholder="Ej: Miguel de Cervantes"
          value={autor}
          onChange={(e) => setAutor(e.target.value)}
          style={{ padding: "8px", width: "100%", boxSizing: "border-box" }}
        />
      </div>

      {/* Campo: Estado (select cerrado - solo 3 opciones posibles) */}
      <div style={{ marginBottom: "10px" }}>
        <label
          style={{ display: "block", marginBottom: "4px", fontWeight: 600 }}
        >
          Estado
        </label>
        <select
          value={estado}
          onChange={(e) => setEstado(e.target.value as BookLog["estado"])}
          style={{ padding: "8px", width: "100%", boxSizing: "border-box" }}
        >
          <option value="disponible">Disponible</option>
          <option value="prestado">Prestado</option>
          <option value="perdido">Perdido</option>
        </select>
      </div>

      {/* Campo: Número de páginas */}
      <div style={{ marginBottom: "10px" }}>
        <label
          style={{ display: "block", marginBottom: "4px", fontWeight: 600 }}
        >
          Número de páginas
        </label>
        <input
          type="number"
          min={0}
          placeholder="Ej: 350"
          value={numeroPaginas}
          onChange={(e) => setNumeroPaginas(Number(e.target.value))}
          style={{ padding: "8px", width: "100%", boxSizing: "border-box" }}
        />
      </div>

      {/* Campo: URL de portada (opcional) */}
      <div style={{ marginBottom: "15px" }}>
        <label
          style={{ display: "block", marginBottom: "4px", fontWeight: 600 }}
        >
          URL de la portada (opcional)
        </label>
        <input
          type="url"
          placeholder="https://ejemplo.com/portada.jpg"
          value={portadaUrl}
          onChange={(e) => setPortadaUrl(e.target.value)}
          style={{ padding: "8px", width: "100%", boxSizing: "border-box" }}
        />
      </div>

      {/* Botón de envío: desactivado si no hay título */}
      <button
        type="submit"
        disabled={!titulo.trim() || !autor.trim()}
        style={{
          padding: "10px 20px",
          backgroundColor:
            !titulo.trim() || !autor.trim() ? "#95a5a6" : "#3498db",
          color: "white",
          border: "none",
          borderRadius: "6px",
          cursor: !titulo.trim() || !autor.trim() ? "not-allowed" : "pointer",
          fontWeight: 600,
        }}
      >
        📖 Añadir Libro
      </button>
    </form>
  );
}
