import { Component, OnInit } from '@angular/core';
import { persona } from 'src/app/model/persona.model';
import { PersonaService } from 'src/app/servicios/persona.service';
import { TokenService } from 'src/app/servicios/token.service';


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  numero: string = "01";
  persona: persona = null;

  constructor(public personaService: PersonaService, private tokenService: TokenService) { }
  isLogged = false;
  ngOnInit(): void {


    this.cargarPersona();
    if (this.tokenService.getToken()) {
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }
    const pElement = document.getElementById('numero');
    pElement.innerHTML = this.numero.toString();
    const miEnlace = document.getElementById("enlace") as HTMLAnchorElement;
    miEnlace.setAttribute("href", "https://matias-portafolio.onrender.com/experiencia");
  }

  cargarPersona() { //carga la información de la persona de la base de datos
    this.personaService.detail(1).subscribe( //utiliza el servicio "PersonaService" para cargar la persona con id = 1
      data => {
        this.persona = data;
      }
    )
  }

  getNumero(): string {
    let numero = "01";
    return numero;
  }
}


