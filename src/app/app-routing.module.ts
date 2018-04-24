import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Componentes para las rutas.
import { PrincipalModuleComponent } from "./principal-module/principal-module.component";
import { RegistrarModuleComponent } from "./registrar-module/registrar-module.component";
import { LoginModuleComponent } from "./login-module/login-module.component";
import { BeaconsModuleComponent } from "./beacons-module/beacons-module.component";
import { UsuariosModuleComponent } from "./usuarios-module/usuarios-module.component";
import { ComidasModuleComponent } from "./comidas-module/comidas-module.component";
import { EstadisticasModuleComponent } from "./estadisticas-module/estadisticas-module.component";
import { EventosModuleComponent } from "./eventos-module/eventos-module.component";
import { NotFoundPageComponent } from "./not-found-page/not-found-page.component";
import { PerfilModuleComponent } from "./perfil-module/perfil-module.component"; 

const routes: Routes = [
  { path: 'login', component: LoginModuleComponent},
  { path: 'registrar', component: RegistrarModuleComponent},
  { path: 'principal', component: PrincipalModuleComponent},
  { path: 'gestionarBeacons', component: BeaconsModuleComponent},
  { path: 'gestionarUsuarios', component: UsuariosModuleComponent},
  { path: 'gestionarComidas', component: ComidasModuleComponent},
  { path: 'estadisticas', component: EstadisticasModuleComponent},
  { path: 'gestionarEventos', component: EventosModuleComponent},
  { path: 'administrarPerfil', component: PerfilModuleComponent},
  { path: '**', component: NotFoundPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
