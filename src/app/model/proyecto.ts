export class Proyecto {
    id: number;
    nombre: string;
    color: string;
    url: string;
    
    constructor(nombre: string, color:string, url:string){
        this.nombre = nombre;
        this.color = color;
        this.url = url;
    }
}
