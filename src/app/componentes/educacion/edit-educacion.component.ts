import { Component, OnInit, ViewChild} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Educacion } from 'src/app/model/educacion';
import { EducacionService } from 'src/app/servicios/educacion.service';
import { ImageService } from 'src/app/servicios/image.service';
import { ImageCroppedEvent, ImageTransform, LoadedImage } from 'ngx-image-cropper';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-edit-educacion',
  templateUrl: './edit-educacion.component.html',
  styleUrls: ['./edit-educacion.component.css']
})
export class EditEducacionComponent implements OnInit{
  numero: string = "03";
  educacion: Educacion = null;
  img: string = '';

  @ViewChild('lgModal') lgModal!: any;
  imageChangedEvent: any = '';
  croppedImage: any = '';
  rotateStatus: boolean = false;
  flipHorizontalStatus: boolean = false;
  flipVerticalStatus: boolean = false;
  discardChagnesStatus: boolean = false;
  transform: ImageTransform = {};

  imageBlob: Blob;
  
  constructor(private sEducacion: EducacionService, private activatedRouter: ActivatedRoute, private router: Router, public imageService: ImageService, private appComponent: AppComponent){}

  ngOnInit(): void {
    const id =this.activatedRouter.snapshot.params['id'];
    this.sEducacion.detail(id).subscribe(
      data =>{
        this.educacion = data;
        this.imageService.urlImg = this.educacion.img+`nombre`;
      }, err =>{
        this.appComponent.add('danger', 'Error al modificar Educación');
        this.router.navigate(['/educacion']);
      }
    )
    const pElement = document.getElementById('numero');
    pElement.innerHTML = this.numero.toString();
    const miEnlace = document.getElementById("enlace") as HTMLAnchorElement;
    miEnlace.setAttribute("href", "https://matias-portafolio.web.app/skills");
  }

  onUpdate(): void{ //actualiza la experiencia en la base de datos cuando se envía el formulario
    this.img=this.imageService.urlImg;
    const id= this.activatedRouter.snapshot.params['id'];
    this.educacion.img = this.imageService.urlImg;
    this.sEducacion.update(id, this.educacion).subscribe(
      data =>{
        this.appComponent.add('success', 'Educación actualizada');
        this.router.navigate(['/educacion']);
      }, err =>{
        this.appComponent.add('danger', 'Error al modificar educación');
        this.router.navigate(['/educacion']);
      }
    )
  }

  uploadImage() {
    const id = this.activatedRouter.snapshot.params['id']; //obtiene el id actualmente activo en la aplicación a través del objeto "activatedRouter"
    const name = 'educacion_' + id; //se utiliza para construir un nombre para la imagen.
    this.imageService.uploadImage(this.imageBlob, name);
    this.lgModal.hide();
  }

  //al seleccionar la imagen
  fileChangeEvent($event: any): void {
    this.imageChangedEvent = $event;
  }

  imageCropped($event: ImageCroppedEvent) {
    this.croppedImage = $event.base64;
    // Convierte la imagen base64 en un Blob
    const byteCharacters = atob(this.croppedImage.split(',')[1]);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    this.imageBlob = new Blob([byteArray], { type: 'image/png' });

  }
  imageLoaded(image?: LoadedImage) {
  }
  cropperReady() {
  }
  loadImageFailed() {
  }

  rotate() {
    this.rotateStatus = true;
    this.flipHorizontalStatus = false;
    this.flipVerticalStatus = false;
    this.discardChagnesStatus = false;
    const newValue = ((this.transform.rotate ?? 0) + 90) % 360;
    this.transform = {
      ...this.transform,
      rotate: newValue
    }
  }

  flipHorizontal() {
    this.rotateStatus = false;
    this.flipHorizontalStatus = true;
    this.flipVerticalStatus = false;
    this.discardChagnesStatus = false;

    this.transform = {
      ...this.transform,
      flipH: !this.transform.flipH
    }
  }

  flipVertical() {
    this.rotateStatus = false;
    this.flipHorizontalStatus = false;
    this.flipVerticalStatus = true;
    this.discardChagnesStatus = false;

    this.transform = {
      ...this.transform,
      flipV: !this.transform.flipV
    }
  }

  discardChagnes() {
    this.rotateStatus = false;
    this.flipHorizontalStatus = false;
    this.flipVerticalStatus = false;
    this.discardChagnesStatus = true;
    this.lgModal.hide();
  }
  
  cancel(): void {
    this.imageService.clearUrl();
    this.appComponent.add('primary', 'Edición cancelada');
    this.router.navigate(['/educacion']);
  }
}
