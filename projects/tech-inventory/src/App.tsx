import { mockData } from "./mockData";
import { EquipmentList } from "./components/EquipmentList";
import { useState } from "react";
import { useEffect } from "react";
import {
  getDocs,
  collection,
  addDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "./firebase";
import type { Equipment } from "./types";
import { EquipmentForm } from "./components/EquipmentForm";
function App() {
  const [equipment, setEquipment] = useState<Equipment[]>(mockData);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const querySnapshot = await getDocs(collection(db, "equipos"));
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Equipment[];

        setEquipment(data);
      } catch (error) {
        console.log(`Error al cargar los datos ${error}`);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleAddEquipment = async (newItem: Equipment) => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { id, ...dataToSave } = newItem;

      const docRef = await addDoc(collection(db, "equipos"), dataToSave);
      const savedItem = { ...newItem, id: docRef.id };

      setEquipment([...equipment, savedItem]);
    } catch (error) {
      console.log(`Error al guarda en la BBDD: ${error}`);
      alert(`Erro al guardar`);
    }
  };
  const handleDeleteEquipment = async (id: string) => {
    if (!confirm("Seguro que quieres eliminar el equipo")) return;
    try {
      await deleteDoc(doc(db, "equipos", id));

      const newList = equipment.filter((equipment) => equipment.id !== id);

      setEquipment(newList);
    } catch (error) {
      console.log(`Error al eliminar en la BBDD: ${error}`);
      alert(`Erro al eliminar`);
    }
  };
  return (
    <div style={{ maxWidth: "800px", margin: "0 auto" }}>
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
        TechInventory
      </h1>

      {/* Pasamos los datos falsos al componente */}
      <EquipmentForm onAdd={handleAddEquipment} />

      {isLoading ? (
        <p style={{ textAlign: "center", color: "#ffffff" }}>
          Cargando inventario...
        </p>
      ) : (
        <EquipmentList items={equipment} onDelete={handleDeleteEquipment} />
      )}

      {/*<EquipmentList items={equipment} onDelete={handleDeleteEquipment} />*/}
    </div>
  );
}

export default App;
