import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';

import { InicioComponent } from './componentes/inicio/inicio.component';
import { ExperienciaComponent } from './componentes/experiencia/experiencia.component';
import { EducacionComponent } from './componentes/educacion/educacion.component';
import { SkillsComponent } from './componentes/skills/skills.component';
import { ProyectosComponent } from './componentes/proyectos/proyectos.component';
import { LoginComponent } from './componentes/login/login.component';
import { NewExperienciaComponent } from './componentes/experiencia/new-experiencia.component';
import { EditExperienciaComponent } from './componentes/experiencia/edit-experiencia.component';
import { NewEducacionComponent } from './componentes/educacion/new-educacion.component';
import { EditEducacionComponent } from './componentes/educacion/edit-educacion.component';
import { NewSKillComponent } from './componentes/skills/new-skill.component';
import { EditSkillComponent } from './componentes/skills/edit-skill.component';
import { EditInicioComponent } from './componentes/inicio/edit-inicio.component';
import { NewProyectosComponent } from './componentes/proyectos/new-proyectos.component';
import { EditProyectosComponent } from './componentes/proyectos/edit-proyectos.component';
import { AuthGuard } from './servicios/auth.guard';

const routes: Routes = [  
  {path:'', redirectTo: 'inicio', pathMatch: 'full'},
  {path:'login', component: LoginComponent},

  {path:'editinicio/:id', component: EditInicioComponent, canActivate: [AuthGuard]},

  {path:'newexp', component: NewExperienciaComponent, canActivate: [AuthGuard]},
  {path:'editexp/:id', component: EditExperienciaComponent, canActivate: [AuthGuard]},

  {path:'newedu', component: NewEducacionComponent, canActivate: [AuthGuard]},
  {path:'editedu/:id', component: EditEducacionComponent, canActivate: [AuthGuard]},

  {path:'newskill', component: NewSKillComponent, canActivate: [AuthGuard]},
  {path:'editskill/:id', component: EditSkillComponent, canActivate: [AuthGuard]},

  {path:'newproye', component: NewProyectosComponent, canActivate: [AuthGuard]},
  {path:'editproye/:id', component: EditProyectosComponent, canActivate: [AuthGuard]},

  {path:'login', component: LoginComponent},
  {path:'inicio', component:InicioComponent},
  {path:'experiencia', component:ExperienciaComponent},
  {path:'educacion', component:EducacionComponent},
  {path:'skills', component:SkillsComponent},
  {path:'proyectos', component:ProyectosComponent},


  { path: '**', redirectTo: 'inicio' }
  // {path:'porfolio', component:PortfolioComponent, canActivate: [GuardGuard]},
  // {path:'iniciar-sesion', component:IniciarSesionComponent},

  // {path:'', redirectTo: 'inicio', pathMatch: 'full'},
  // {path:'', component:InicioComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
