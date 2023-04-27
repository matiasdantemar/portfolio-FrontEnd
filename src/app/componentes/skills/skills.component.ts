import { Component, OnInit, TemplateRef } from '@angular/core';
import { Skill } from 'src/app/model/skill';
import { SkillService } from 'src/app/servicios/skill.service';
import { TokenService } from 'src/app/servicios/token.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements OnInit {
  numero: string = "04";
  skill: Skill[] = [];
  id: number;
  modalRef?: BsModalRef;

  constructor(private skills: SkillService, private tokenService: TokenService, private modalService: BsModalService, private appComponent: AppComponent) { }
  isLogged = false;

  ngOnInit() {
    this.cargarSkills();
    if(this.tokenService.getToken()){
      this.isLogged = true;
    }else{
      this.isLogged = false;
    }
    const pElement = document.getElementById('numero');
    pElement.innerHTML = this.numero.toString();
    const miEnlace = document.getElementById("enlace") as HTMLAnchorElement;
    miEnlace.setAttribute("href", "http://localhost:4200/proyectos");
  }

  cargarSkills(): void{
    this.skills.lista().subscribe(
      data=>{
        this.skill = data;
      }
    )
  }

  openModal(template: TemplateRef<any>, id: number): void {
    this.id = id;
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }

  confirm(): void {
    if (this.id != undefined) {
      this.skills.delete(this.id).subscribe(
        data => {
          this.appComponent.add('success', 'Skill eliminada con éxito');
          this.cargarSkills();
        }, err => {
          this.appComponent.add('danger', 'No se pudo eliminar la skill');
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

