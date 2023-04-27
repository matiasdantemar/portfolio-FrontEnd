import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Proyecto } from 'src/app/model/proyecto';
import { ImageService } from 'src/app/servicios/image.service';
import { ProyectoService } from 'src/app/servicios/proyecto.service';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-new-proyectos',
  templateUrl: './new-proyectos.component.html',
  styleUrls: ['./new-proyectos.component.css']
})
export class NewProyectosComponent {
  numero:string="05";
  nombre: string = '';
  color: string = '';
  url: string = '';


  constructor(private sProyecto: ProyectoService, private router: Router, public imageService: ImageService, private appComponent: AppComponent) { }
  
  ngOnInit(): void {
    this.color = '#3d685f'
    const pElement = document.getElementById('numero');
    pElement.innerHTML = this.numero.toString();
    const miEnlace = document.getElementById("enlace") as HTMLAnchorElement;
    miEnlace.setAttribute("href", "https://matias-portafolio.onrender.com/loginw");
  }

  onCreate(): void {
    if (!this.url) {
      alert("Por favor ingrese una URL.");
      return;
    }
    const proye = new Proyecto(this.nombre, this.color, this.url);
    this.sProyecto.save(proye).subscribe(
      data => {
        this.appComponent.add('success', 'Proyecto añadido con éxito');
        this.router.navigate(['/proyectos']);
      }, err => {
        this.appComponent.add('danger', 'Falló al añadir el proyecto');
        this.router.navigate(['/proyectos']);
      }
    );
  }

  cancel(): void {
    this.appComponent.add('primary', 'Adición cancelada');
    this.router.navigate(['/proyectos']);
  }
}