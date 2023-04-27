import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Skill } from 'src/app/model/skill';
import { SkillService } from 'src/app/servicios/skill.service';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-edit-skill',
  templateUrl: './edit-skill.component.html',
  styleUrls: ['./edit-skill.component.css']
})

export class EditSkillComponent implements OnInit {
  numero: string = "04";
  skill: Skill = null;

  constructor(private skills: SkillService, private activatedRouter: ActivatedRoute, private router: Router, private appComponent: AppComponent) { }

  ngOnInit(): void {
    const id = this.activatedRouter.snapshot.params['id'];
    this.skills.detail(id).subscribe(
      data => {
        this.skill = data;
      }, err => {
        this.appComponent.add('danger', 'Error al modificar skill');
        this.router.navigate(['/skills']);
      }
    )
    const pElement = document.getElementById('numero');
    pElement.innerHTML = this.numero.toString();
    const miEnlace = document.getElementById("enlace") as HTMLAnchorElement;
    miEnlace.setAttribute("href", "http://localhost:4200/proyectos");
  }

  onUpdate() {
    if (this.skill.nombre.length > 10) {
      alert("El nombre de la skill no debe ser mas de 10 caracteres.");
      return;
    }
    if (!this.skill.porcentaje) {
      alert("Por favor ingrese un porcentaje.");
      return;
    }
    if (this.skill.porcentaje < 1 || this.skill.porcentaje > 100) {
      alert("El porcentaje debe estar entre 1 y 100.");
      return;
    }
    const id = this.activatedRouter.snapshot.params['id'];
    this.skills.update(id, this.skill).subscribe(
      data => {
        this.appComponent.add('success', 'Skill actualizada');
        this.router.navigate(['/skills']);
      }, err => {
        this.appComponent.add('danger', 'Error al modificar Skill');
        this.router.navigate(['/skills']);
      }
    )
  }

  cancel(): void {
    this.appComponent.add('primary', 'Edición cancelada');
    this.router.navigate(['/skills']);
  }

}
