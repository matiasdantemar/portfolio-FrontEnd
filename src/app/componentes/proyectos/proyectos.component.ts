import { Component, OnInit, TemplateRef} from '@angular/core';
import { Proyecto } from 'src/app/model/proyecto';
import { ProyectoService } from 'src/app/servicios/proyecto.service';
import { TokenService } from 'src/app/servicios/token.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css']
})
export class ProyectosComponent implements OnInit {
  numero:string="05";
  proyecto: Proyecto[] = [];
  id: number;
  modalRef?: BsModalRef;

  constructor(private proyectoS: ProyectoService, private tokenService: TokenService, private modalService: BsModalService, private appComponent: AppComponent) { }
  isLogged = false;

  ngOnInit(): void {
    this.cargarProyecto();
    const miEnlace = document.getElementById("enlace") as HTMLAnchorElement;
    if (this.tokenService.getToken()) {
      this.isLogged = true;
      miEnlace.setAttribute("href", "http://localhost:4200/inicio");
    } else {
      this.isLogged = false;
      miEnlace.setAttribute("href", "http://localhost:4200/login");
    }
    const pElement = document.getElementById('numero');
    pElement.innerHTML = this.numero.toString();
  }

  cargarProyecto(): void {
    this.proyectoS.lista().subscribe(
      data => {
        this.proyecto = data;
      }
    )
  }

  openModal(template: TemplateRef<any>, id: number): void {
    this.id = id;
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }

  confirm(): void {
    if (this.id != undefined) {
      this.proyectoS.delete(this.id).subscribe(
        data => {
          this.appComponent.add('success', 'Proyecto eliminado con éxito');
          this.cargarProyecto();
        }, err => {
          this.appComponent.add('danger', 'No se pudo eliminar el proyecto');
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
