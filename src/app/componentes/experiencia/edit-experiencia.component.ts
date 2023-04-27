import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Experiencia } from 'src/app/model/experiencia';
import { ImageService } from 'src/app/servicios/image.service';
import { SExperienciaService } from 'src/app/servicios/s-experiencia.service';
import { ImageCroppedEvent, ImageTransform, LoadedImage } from 'ngx-image-cropper';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-edit-experiencia',
  templateUrl: './edit-experiencia.component.html',
  styleUrls: ['./edit-experiencia.component.css']
})
export class EditExperienciaComponent implements OnInit {
  numero: string = "02";
  expLab: Experiencia = null;
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

  constructor(private sExperiencia: SExperienciaService, private activatedRouter: ActivatedRoute, private router: Router, public imageService: ImageService, private appComponent: AppComponent) { }

  ngOnInit(): void {
    const id = this.activatedRouter.snapshot.params['id'];
    this.sExperiencia.detail(id).subscribe(
      data => {
        this.expLab = data;
        this.imageService.urlImg = this.expLab.img + `nombre`;
      }, err => {
        this.appComponent.add('danger', 'Error al modificar experiencia');
        this.router.navigate(['/experiencia']);
      }
    )
    const pElement = document.getElementById('numero');
    pElement.innerHTML = this.numero.toString();
    const miEnlace = document.getElementById("enlace") as HTMLAnchorElement;
    miEnlace.setAttribute("href", "http://localhost:4200/educacion");
  }

  onUpdate(): void { //actualiza la experiencia en la base de datos cuando se envía el formulario
    this.img = this.imageService.urlImg;
    const id = this.activatedRouter.snapshot.params['id'];
    this.expLab.img = this.imageService.urlImg;
    this.sExperiencia.update(id, this.expLab).subscribe(
      data => {
        this.appComponent.add('success', 'Experiencia actualizada');
        this.router.navigate(['/experiencia']);
      }, err => {
        this.appComponent.add('danger', 'Error al modificar experiencia');
        this.router.navigate(['/experiencia']);
      }
    )
  }

  uploadImage() {
    const id = this.activatedRouter.snapshot.params['id']; //obtiene el id actualmente activo en la aplicación a través del objeto "activatedRouter"
    const name = 'experiencia_' + id; //se utiliza para construir un nombre para la imagen.
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
    this.router.navigate(['/experiencia']);
  }
}