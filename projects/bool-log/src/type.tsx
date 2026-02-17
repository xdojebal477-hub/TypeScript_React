 //modelamos nuestra interfaz para los datos
 export interface Equipment{
        titulo:string;
        autor:string;
        numeroPaginas:number;
        estado:'disponible'|'prestado'|'retirado';
        fechaPrestamo?:Date;
 }