import { useState } from "react";
import { items } from "./hooks/useInventory";
import type { InventoryItem } from "./types";
import "./App.css";
import InventoryCard from "./components/InventoryCard";
import { ItemInventoryForm } from "./components/AddleItemForm";

function App() {
  const [inventoryItems, setInventoryItems] = useState<InventoryItem[]>(items);

  const handleAñadirQuantity = (id: string) => {
    setInventoryItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    );
  };

  const handleRestarQuantity = (id: string) => {
    setInventoryItems((prev) =>
      prev.map((item) =>
        item.id === id && item.quantity > 0
          ? { ...item, quantity: item.quantity - 1 }
          : item,
      ),
    );
  };

  const handleAddEquipment = (newItem: InventoryItem) => {
    setInventoryItems((prev) => [...prev, newItem]);
  };

  return (
    <div className="app-container">
      <h1>📦 Tech Inventory</h1>

      <div className="layout">
        <aside>
          <h2>Añadir Nuevo Material</h2>
          <ItemInventoryForm onAdd={handleAddEquipment} />
        </aside>

        <main>
          <h2>Listado de Inventario</h2>
          <div className="grid">
            {inventoryItems.map((item) => (
              <InventoryCard
                key={item.id}
                data={item}
                onAñadir={handleAñadirQuantity}
                onRestar={handleRestarQuantity}
              />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
