import { mockData } from "./mockData";
import { EquipmentList } from "./components/EquipmentList";
import { useState } from "react";
import type { Equipment } from "./type";
import { EquipmentForm } from "./components/EquipmentForm";
function App() {
  const [equipment, setEquipment] = useState<Equipment[]>(mockData);

  const hnadleEquipment = (newItem: Equipment) => {
    setEquipment([...equipment, newItem]);
  };
  return (
    <div style={{ maxWidth: "800px", margin: "0 auto" }}>
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
        TechInventory
      </h1>

      {/* Pasamos los datos falsos al componente */}
      <EquipmentForm onAdd={hnadleEquipment} />
      <EquipmentList items={equipment} onDelete={() => {}} />
    </div>
  );
}

export default App;
