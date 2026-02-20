import type { InventoryItem } from "../types";
import  InventoryCard  from "./InventoryCard";


export interface InventoryListProps{
    items:InventoryItem[];
}

export function InventoryList({items}:InventoryListProps){
    return(
        <div className="grid">
            {items.map((item)=>(
                <InventoryCard key={item.id} data={item} onAñadir={()=>{}} onRestar={()=>{}}/>
            ))}
        </div>
    );
}