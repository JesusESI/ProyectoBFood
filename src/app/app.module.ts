import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { LoginModuleComponent } from './login-module/login-module.component';
import { UsuariosModuleComponent } from './usuarios-module/usuarios-module.component';
import { BeaconsModuleComponent } from './beacons-module/beacons-module.component';
import { EstadisticasModuleComponent } from './estadisticas-module/estadisticas-module.component';
import { EventosModuleComponent } from './eventos-module/eventos-module.component';
import { ComidasModuleComponent } from './comidas-module/comidas-module.component';
import { PerfilModuleComponent } from './perfil-module/perfil-module.component';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';
import { BreadcrumbComponent } from './commons/breadcrumb/breadcrumb.component';
import { PrincipalModuleComponent } from './principal-module/principal-module.component';
import { RegistrarModuleComponent } from './registrar-module/registrar-module.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginModuleComponent,
    UsuariosModuleComponent,
    BeaconsModuleComponent,
    EstadisticasModuleComponent,
    EventosModuleComponent,
    ComidasModuleComponent,
    PerfilModuleComponent,
    NotFoundPageComponent,
    BreadcrumbComponent,
    PrincipalModuleComponent,
    RegistrarModuleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
