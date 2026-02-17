import type { Equipment } from "../type";
import { EquipmentCard } from "./EquipmentCard";

export interface EquipmentListProps {
  items: Equipment[];
  onDelete: (id: string) => void;
}

export function EquipmentList({ items, onDelete }: EquipmentListProps) {
  if (items.length === 0) {
    return <p>No hay equipos en el Inventario</p>;
  }

  return (
    <div style={{ display: "grid", gap: "20px" }}>
      {items.map((item) => (
        // IMPORTANTE: La prop 'key' es obligatoria en listas de React
        <EquipmentCard key={item.id} data={item} onDelete={onDelete} />
      ))}
    </div>
  );
}
