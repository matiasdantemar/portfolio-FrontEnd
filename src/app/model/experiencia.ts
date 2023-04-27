export class Experiencia {
    id?: number;
    nombre: string;
    descripcion: string;
    tipo: string;
    inicio: string;
    fin: string;
    img: string;

    constructor(nombre: string, descripcion: string, tipo: string, inicio: string, fin:string, img: string) {{
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.tipo = tipo;
        this.inicio = inicio;
        this.fin = fin;
        this.img = img;
    }
}
}
