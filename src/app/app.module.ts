import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from "@angular/forms";
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
import { PrincipalModuleComponent } from './principal-module/principal-module.component';
import { RegistrarModuleComponent } from './registrar-module/registrar-module.component';
import { PrivadoComponent } from './comun/privado/privado.component';
import { DialogModule } from 'primeng/dialog';
import { AccordionModule } from 'primeng/primeng';
import { PanelModule } from 'primeng/primeng';
import { ButtonModule } from 'primeng/primeng';
import { RadioButtonModule } from 'primeng/primeng';
import { TableModule } from 'primeng/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TooltipModule } from 'primeng/tooltip'


// Import mportamosI los servicios (providers).
import { AuthService } from "./services/auth.service";
import { AngularFireModule } from "angularfire2"
import { AngularFireAuthModule } from "angularfire2/auth";

// Importar configuración del environment.
import { environment } from "../environments/environment";

// Importar guard
import { AuthGuard } from "./guards/auth.guard";
import { RegistradoCorrectamenteComponent } from './comun/registrado-correctamente/registrado-correctamente.component';
import { NavbarComponent } from './comun/navbar/navbar.component';
import { UserService } from './services/user.service';


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
    PrincipalModuleComponent,
    RegistrarModuleComponent,
    PrivadoComponent,
    RegistradoCorrectamenteComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireAuthModule,
    DialogModule,
    AccordionModule,
    PanelModule,
    ButtonModule,
    TableModule,
    AccordionModule,
    BrowserAnimationsModule,
    OverlayPanelModule,
    DialogModule,
    TooltipModule,
    AngularFireModule.initializeApp(environment.firebaseConfig)
  ],
  providers: [
    AuthService,
    UserService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
