export class Educacion {
    id: number;
    nombre: string;
    descripcion: string;
    inicio: string;
    fin: string;
    img: string;

    constructor(nombre: string, descripcion: string, inicio: string, fin: string, img: string){
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.inicio = inicio;
        this.fin = fin;
        this.img = img;
    }
}
