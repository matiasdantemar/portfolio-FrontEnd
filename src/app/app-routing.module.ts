import { NgModule } from '@angular/core';
import { CommonModule} from '@angular/common';
import { RouterModule, Routes} from '@angular/router';

import { InicioComponent } from './componentes/inicio/inicio.component';
import { ExperienciaComponent } from './componentes/experiencia/experiencia.component';
import { EducacionComponent } from './componentes/educacion/educacion.component';
import { SkillsComponent } from './componentes/skills/skills.component';
import { ProyectosComponent } from './componentes/proyectos/proyectos.component';
import { PortfolioComponent } from './componentes/portfolio/portfolio.component';
import { IniciarSesionComponent } from './componentes/iniciar-sesion/iniciar-sesion.component';
import { GuardGuard } from './servicios/guard.guard';

const routes: Routes = [  
  {path:'porfolio', component:PortfolioComponent, canActivate: [GuardGuard]},
  {path:'iniciar-sesion', component:IniciarSesionComponent},
  {path:'', redirectTo: 'iniciar-sesion', pathMatch: 'full'},
  
  {path:'inicio', component:InicioComponent, canActivate: [GuardGuard]},
  {path:'experiencia', component:ExperienciaComponent, canActivate: [GuardGuard]},
  {path:'educacion', component:EducacionComponent, canActivate: [GuardGuard]},
  {path:'skills', component:SkillsComponent, canActivate: [GuardGuard]},
  {path:'proyectos', component:ProyectosComponent, canActivate: [GuardGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
