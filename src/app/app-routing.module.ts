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
import { PrivadoComponent } from "./comun/privado/privado.component";
import { RegistradoCorrectamenteComponent } from './comun/registrado-correctamente/registrado-correctamente.component';

// Importar guard
import { AuthGuard } from "./guards/auth.guard";

const routes: Routes = [
  { path: '', component: LoginModuleComponent},
  { path: 'registrar', component: RegistrarModuleComponent},
  { path: 'privado', component: PrivadoComponent},
  { path: 'registrado', component: RegistradoCorrectamenteComponent},
  { path: 'principal', component: PrincipalModuleComponent},
  { path: 'principal/gestionarBeacons', component: BeaconsModuleComponent},
  { path: 'principal/gestionarUsuarios', component: UsuariosModuleComponent},
  { path: 'principal/gestionarComidas', component: ComidasModuleComponent},
  { path: 'principal/estadisticas', component: EstadisticasModuleComponent},
  { path: 'principal/gestionarEventos', component: EventosModuleComponent},
  { path: 'principal/administrarPerfil', component: PerfilModuleComponent, canActivate:[AuthGuard]},
  { path: '**', component: NotFoundPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
