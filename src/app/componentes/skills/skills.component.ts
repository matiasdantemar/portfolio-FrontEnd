import * as ProgressBar from 'progressbar.js';
import { Component, OnInit } from '@angular/core';
import { PortfolioService } from 'src/app/servicios/portfolio.service';


@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements OnInit {
  
  habilidadesList: any;
  
  constructor(private datosPorfolio: PortfolioService) { }
  
  ngOnInit() {
    this.datosPorfolio.obtenerDatos().subscribe(data => {
      this.habilidadesList = data.habilidades;
      for (let habilidad of this.habilidadesList) {
        
        let bar = new ProgressBar.Line(`#container-${habilidad.nombre}`, {
          strokeWidth: 4,
          easing: 'easeInOut',
          duration: 1400,
          color: habilidad.color,
          trailColor: '#eee',
          trailWidth: 1,
          svgStyle: { width: '100%', height: '100%' }
        });
        bar.animate(habilidad.dominio / 100);
      }
    });
  }
}