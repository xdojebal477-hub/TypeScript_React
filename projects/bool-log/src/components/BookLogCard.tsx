import type { BookLog } from "../types";

export interface BookLogProps {
  data: BookLog;
  onDelete: (id: string) => void;
}

export function BookLogCard({ data, onDelete }: BookLogProps) {
  const statusColor =
    data.estado === "disponible"
      ? "green"
      : data.estado === "prestado"
        ? "orange"
        : "red";
  const badgeColor = statusColor;

  return (
    <div
      className="card"
      style={{ display: "flex", flexDirection: "column", gap: "10px" }}
    >
      <img
        src={data.portadaUrl}
        alt={`Portada de ${data.titulo}`}
        className="card-img"
        style={{ height: "200px", objectFit: "cover" }}
      />

      <div className="card-body">
        <h3 style={{ margin: "0 0 5px 0", fontSize: "1.1rem" }}>
          {data.titulo}
        </h3>
        <p style={{ margin: 0, color: "#666", fontSize: "0.9rem" }}>
          {data.autor}
        </p>

        <div
          style={{
            marginTop: "10px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span
            style={{
              backgroundColor: badgeColor,
              color: "white",
              padding: "4px 8px",
              borderRadius: "12px",
              fontSize: "0.8rem",
              textTransform: "capitalize",
            }}
          >
            {data.estado}
          </span>
          <small style={{ color: "#999" }}>{data.numeroPaginas} págs.</small>
        </div>

        {/* Ahora el botón SÍ hace algo: llama a onDelete con el id del libro */}
        <button
          className="btn btn-danger"
          style={{ marginTop: "15px" }}
          onClick={() => onDelete(data.id)}
        >
          Eliminar
        </button>
      </div>
    </div>
  );
}
