import { mockData } from "./mockData"
import { EquipmentList } from "./components/EquipmentList"

function App() {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>
        TechInventory
      </h1>
      
      {/* Pasamos los datos falsos al componente */}
      
      <EquipmentList items={mockData} onDelete={}  />
    </div>
  )
}

export default App
