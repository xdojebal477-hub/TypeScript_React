import React, {useState} from 'react';
import type {Equipment} from '../type';



interface EquipmentFormProps {onAdd:(item:Equipment)=>void}

export function EquipmentForm({onAdd}:EquipmentFormProps){

    const [nombre,setNombre]=useState("");
    const[tipo,setTipo]=useState<Equipment ['tipo']>("portatil");
    const [estado,setEstado]=useState<Equipment ['estado']>("disponible");


    const handleSubmit=(e:React.SubmitEvent)=>{
        e.preventDefault();
        if(!nombre)return;

        const newItem: Equipment = {
            id: crypto.randomUUID(), // ID temporal aleatorio
            nombre,
            tipo,
            estado
        };
        onAdd(newItem);
        setNombre("");
    }


    return(
        <form onSubmit={handleSubmit} style={{ marginBottom: '20px', padding: '15px', border: '1px solid #ddd' }}>
      <input 
        type="text" 
        placeholder="Nombre del equipo"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        style={{ padding: '8px', marginRight: '10px' }}
      />
      
      <select value={tipo} onChange={(e) => setTipo(e.target.value as never)} style={{ padding: '8px', marginRight: '10px' }}>
        <option value="portatil">Portátil</option>
        <option value="monitor">Monitor</option>
        <option value="teclado">Teclado</option>
      </select>

      <select value={estado} onChange={(e)=> setEstado(e.target.value as never)}style={{ padding: '8px', marginRight: '10px' }}>
        <option value="disponible">Disponible</option>
        <option value="asignado">Asignado</option>
        <option value="averiado">Averiado</option>
      </select>

      <button type="submit" disabled={!nombre}>Añadir Equipo</button>
    </form>
    );
}