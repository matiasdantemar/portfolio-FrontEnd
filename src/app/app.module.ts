//Component
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './componentes/nav/nav.component';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { ExperienciaComponent } from './componentes/experiencia/experiencia.component';
import { EducacionComponent } from './componentes/educacion/educacion.component';
import { LoginComponent } from './componentes/login/login.component';
import { NewExperienciaComponent } from './componentes/experiencia/new-experiencia.component';
import { EditExperienciaComponent } from './componentes/experiencia/edit-experiencia.component';
import { NewEducacionComponent } from './componentes/educacion/new-educacion.component';
import { EditEducacionComponent } from './componentes/educacion/edit-educacion.component';
import { NewSKillComponent } from './componentes/skills/new-skill.component';
import { SkillsComponent } from './componentes/skills/skills.component';
import { ProyectosComponent } from './componentes/proyectos/proyectos.component';
import { EditSkillComponent } from './componentes/skills/edit-skill.component';
import { EditInicioComponent } from './componentes/inicio/edit-inicio.component';
import { EditProyectosComponent } from './componentes/proyectos/edit-proyectos.component';
import { NewProyectosComponent } from './componentes/proyectos/new-proyectos.component';

import { AlertModule } from 'ngx-bootstrap/alert';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideStorage, getStorage } from '@angular/fire/storage';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ImageCropperModule } from 'ngx-image-cropper';


@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    ExperienciaComponent,
    EducacionComponent,
    NavComponent,
    LoginComponent,
    NewExperienciaComponent,
    EditExperienciaComponent,
    NewEducacionComponent,
    EditEducacionComponent,
    NewSKillComponent,
    EditSkillComponent,
    SkillsComponent,
    ProyectosComponent,
    EditInicioComponent,
    EditProyectosComponent,
    NewProyectosComponent,
  ],
  imports: [
    AlertModule.forRoot(),
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    ModalModule.forRoot(),
    ImageCropperModule,
    NgCircleProgressModule.forRoot({
    }),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideStorage(() => getStorage()),

  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
