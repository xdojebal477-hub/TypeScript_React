export interface InventoryItem{
    id:string;
    name:string;
    category:'Portátil'|'Periférico'|'Monitor'|'otro';
    quantity:number;
    isCritical?:boolean;

}