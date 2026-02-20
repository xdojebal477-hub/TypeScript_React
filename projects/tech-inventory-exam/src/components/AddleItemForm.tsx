import React, { useState } from "react";
import type { InventoryItem } from "../types";

interface ItemFormProps {
  onAdd: (item: InventoryItem) => void;
}

export function ItemInventoryForm({ onAdd }: ItemFormProps) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState<InventoryItem["category"]>("otro");
  const [quantity, setQuantity] = useState(0);
  const [isCritical, setIsCritical] = useState(false);

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();
    const newItem: InventoryItem = {
      id: crypto.randomUUID(),
      name,
      category,
      quantity,
      isCritical,
    };
    onAdd(newItem);
    setName("");
    setCategory("otro");
    setQuantity(0);
    setIsCritical(false);
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Nombre item"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <select
        value={category}
        onChange={(e) =>
          setCategory(e.target.value as InventoryItem["category"])
        }
      >
        <option value="Portátil">Portátil</option>
        <option value="Periférico">Periférico</option>
        <option value="Monitor">Monitor</option>
        <option value="otro">otro</option>
      </select>
      <input
        type="number"
        placeholder="Cantidad"
        value={quantity}
        min={0}
        onChange={(e) => setQuantity(Number(e.target.value))}
      />
      <label>
        <input
          type="checkbox"
          checked={isCritical}
          onChange={(e) => setIsCritical(e.target.checked)}
        />
        Material Crítico
      </label>
      <button type="submit">Añadir</button>
    </form>
  );
}
