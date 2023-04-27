import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Proyecto } from 'src/app/model/proyecto';
import { ProyectoService } from 'src/app/servicios/proyecto.service';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-edit-proyectos',
  templateUrl: './edit-proyectos.component.html',
  styleUrls: ['./edit-proyectos.component.css']
})
export class EditProyectosComponent {
  numero:string="05";
  proyecto: Proyecto = null;
  constructor(private sProyecto: ProyectoService, private activatedRouter: ActivatedRoute, private router: Router, private appComponent: AppComponent){}

  ngOnInit(): void {
    const id= this.activatedRouter.snapshot.params['id'];
    this.sProyecto.detail(id).subscribe(
      data =>{
        this.proyecto = data;
      }, err =>{
        this.appComponent.add('danger', 'Error al modificar proyecto');
        this.router.navigate(['/proyectos']);
        const miEnlace = document.getElementById("enlace") as HTMLAnchorElement;
        miEnlace.setAttribute("href", "https://matias-portafolio.onrender.com/login");
      }
    )
    const pElement = document.getElementById('numero');
    pElement.innerHTML = this.numero.toString();
  }

  onUpdate(): void{ //actualiza el proyecto en la base de datos cuando se envía el formulario
    if (!this.proyecto.url) {
      alert("Por favor ingrese una URL.");
      return;
    }
    const id= this.activatedRouter.snapshot.params['id'];
    this.sProyecto.update(id, this.proyecto).subscribe(
      data =>{
        this.appComponent.add('success', 'Proyecto actualizado');
        this.router.navigate(['/proyectos']);
      }, err =>{
        this.appComponent.add('danger', 'Error al modificar proyecto');
        this.router.navigate(['/proyectos']);
      }
    )
  }

  cancel(): void {
    this.appComponent.add('primary', 'Edición cancelada');
    this.router.navigate(['/proyectos']);
  }
}