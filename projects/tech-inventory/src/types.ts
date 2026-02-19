export interface Equipment{
    id:string;//id de firebase

    nombre:string;//nombre del equipo 

    tipo:'portatil'|'monitor'|'teclado'|'otro';

    estado:'disponible'|'averiado'|'asignado';

}