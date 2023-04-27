import { Injectable } from '@angular/core';
import { Storage, ref, uploadBytes, listAll, getDownloadURL, list, deleteObject } from '@angular/fire/storage'
//Storage me permite enganchar todo el espacio que tengo en la nube con todas las acciones que vaya a hacer con angular
//ref me permite gestionar las referencias, carpetas
//uploadBytes me permite decirle donde va a ser la referencia donde voy a subir y cual es el fichero que voy a subir
//listAll me permite descargar todas las referencias de cada una de las imagenes, luego voy a descargar sus URLS publicas
//getDownloadURL obtiene las URLS y la mostrare luego en mi interfaz 

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  url: string = "";
  urlImg: string="";
  nombre: string="";
  constructor(private storage: Storage) { }

  public uploadImage(imageBlob: any, name:string){ //para subir una imagen 
    const file = imageBlob; //se obtiene la primera imagen seleccionada por el usuario y se almacena en la variable file.
    this.nombre = name;
    //marco referencia donde voy a subir la imagen
    const imgRef = ref(this.storage, `imagen/` + name); //"Storage" para subir una imagen a una ubicación específica en Firebase Storage
    //subiendola a la referencia
    uploadBytes(imgRef, file) //uploadBytes de Firebase Storage para cargar la imagen en la ubicación especificada en imgRef. imgRef referencia y file datos del fichero
    .then(response => {this.getImages()}) //si la carga de la imagen se realiza con éxito, se llama a la función getImages()
    .catch(error => console.log(error)) //si no se muestra un error por consola
  }

  getImages() {
    const imagesRef = ref(this.storage, 'imagen') //Crea una referencia a la carpeta imagen en Firebase Storage mediante la función ref().
    list(imagesRef)//Utiliza la función list() para obtener una lista de los elementos dentro de la carpeta imagen. útil para obtener una lista de archivos en una ubicación específica, 
    .then(async response => {
      for(let item of response.items){ //En el resultado de la lista obtenida, recorre cada elemento con un ciclo for of.
        this.url = await getDownloadURL(item); //Para cada elemento de la lista, se utiliza la función getDownloadURL() para obtener la URL de la imagen y se guarda en la variable this.url 
        if(this.nombre==item.name){
          this.urlImg=this.url;
        }
        console.log("La URL es: " + this.url);
      }
    })
    
    .catch(error => console.log(error))
  }

  clearUrl() {
    this.url = "";
    this.urlImg ="";
  }

  deleteImage(id: number, name:string) {
    this.nombre = name;
    const imgRef = ref(this.storage, `imagen/` + name + id);
    deleteObject(imgRef)
      .then(() => console.log('Imagen eliminada exitosamente'))
      .catch((error) => console.log(error));
  }

}
