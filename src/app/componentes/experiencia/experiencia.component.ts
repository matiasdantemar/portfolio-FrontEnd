import { Component, OnInit, TemplateRef } from '@angular/core';
import { Experiencia } from 'src/app/model/experiencia';
import { SExperienciaService } from 'src/app/servicios/s-experiencia.service';
import { TokenService } from 'src/app/servicios/token.service';
import { ImageService } from 'src/app/servicios/image.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-experiencia',
  templateUrl: './experiencia.component.html',
  styleUrls: ['./experiencia.component.css']
})
export class ExperienciaComponent implements OnInit {
  numero: string = "02";
  expe: Experiencia[] = [];
  id: number;
  name: string = "";

  modalRef?: BsModalRef;


  constructor(private experienciaService: SExperienciaService, private tokenService: TokenService, private modalService: BsModalService, public imageS: ImageService, private appComponent: AppComponent) { }

  isLogged = false;

  ngOnInit(): void {
    this.cargarExperiencia();
    if (this.tokenService.getToken()) {
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }
    const pElement = document.getElementById('numero');
    pElement.innerHTML = this.numero.toString();
    const miEnlace = document.getElementById("enlace") as HTMLAnchorElement;
    miEnlace.setAttribute("href", "http://localhost:4200/educacion");
  }

  cargarExperiencia(): void { //carga la información de la persona de la base de datos
    this.experienciaService.lista().subscribe(
      data => {
        this.expe = data;
      }
    )
  }

  openModal(template: TemplateRef<any>, id: number): void {
    this.id = id;
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }

  confirm(): void {
    if (this.id != undefined) {
      this.experienciaService.delete(this.id).subscribe(
        data => {
          this.name = "experiencia_"
          this.imageS.deleteImage(this.id, this.name); // llama a la función deleteImage()
          this.appComponent.add('success', 'Experiencia eliminada con éxito');
          this.cargarExperiencia();
        }, err => {
          this.appComponent.add('danger', 'No se pudo eliminar la experiencia');
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