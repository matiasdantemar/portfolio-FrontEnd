import { Component, OnInit, TemplateRef } from '@angular/core';
import { Educacion } from 'src/app/model/educacion';
import { EducacionService } from 'src/app/servicios/educacion.service';
import { TokenService } from 'src/app/servicios/token.service';
import { ImageService } from 'src/app/servicios/image.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-educacion',
  templateUrl: './educacion.component.html',
  styleUrls: ['./educacion.component.css']
})
export class EducacionComponent implements OnInit {
  numero: string="03";
  educacion: Educacion[] = [];
  id: number;
  name: string = "";

  modalRef?: BsModalRef;


  constructor(private educacionS: EducacionService, private tokenService: TokenService, private modalService: BsModalService, public imageS: ImageService, private appComponent: AppComponent) { }
  
  isLogged = false;

  ngOnInit(): void {
    this.cargarEducacion();
    if(this.tokenService.getToken()){
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }
    const pElement = document.getElementById('numero');
    pElement.innerHTML = this.numero.toString();
    const miEnlace = document.getElementById("enlace") as HTMLAnchorElement;
    miEnlace.setAttribute("href", "https://matias-portafolio.web.app/skills");
  }

  cargarEducacion(): void{
    this.educacionS.lista().subscribe(
      data =>{
        this.educacion = data;
      }
    )
  }

  openModal(template: TemplateRef<any>, id: number): void  {
    this.id = id;
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }
 
  confirm(): void {
    if( this.id != undefined){
      this.educacionS.delete(this.id).subscribe(
        data => {
          this.name = "educacion_"
          this.imageS.deleteImage(this.id, this.name); // llama a la función deleteImage()
          this.appComponent.add('success', 'Educación eliminada con éxito');
          this.cargarEducacion();
        }, err => {
          this.appComponent.add('danger', 'No se pudo eliminar la educación');
        }
      )
    }
    this.modalRef?.hide();
  }

  decline(): void {
    this.appComponent.add('primary', 'Eliminacion cancelada');
    this.modalRef?.hide();
  }
}
