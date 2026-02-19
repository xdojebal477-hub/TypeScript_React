import type { Equipment } from "../types";

export interface EquipmentCardProps {
  data: Equipment;
  onDelete: (id: string) => void;
}

export function EquipmentCard({ data, onDelete }: EquipmentCardProps) {
  const statusColor =
    data.estado === "disponible"
      ? "green"
      : data.estado === "averiado"
        ? "red"
        : "orange";

  return (
    <div
      style={{
        border: "1px solid #000000",
        padding: "10px",
        borderRadius: "8px",
        marginBottom: "10px",
        backgroundColor: "gray",
      }}
    >
      <h3>{data.nombre}</h3>
      <p>
        Tipo: <strong>{data.tipo}</strong>
      </p>

      <div style={{ marginTop: "10px" }}>
        Estado:
        <span
          style={{ color: statusColor, fontWeight: "bold", marginLeft: "5px" }}
        >
          {data.estado.toUpperCase()}
        </span>
      </div>
      <div
        style={{
          marginTop: "15px",
          borderTop: "1px solid #eee",
          paddingTop: "10px",
        }}
      >
        <button
          onClick={() => onDelete(data.id)}
          style={{
            backgroundColor: "#ff4444",
            color: "white",
            border: "none",
            padding: "5px 10px",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Eliminar
        </button>
      </div>
    </div>
  );
}
