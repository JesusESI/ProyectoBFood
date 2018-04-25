import { Component, OnInit } from '@angular/core';

// Importar servicio Auth
import { AuthService } from "../services/auth.service";

// import Router, para redirecionarnos.
import { Router } from "@angular/router";

@Component({
  selector: 'app-registrar-module',
  templateUrl: './registrar-module.component.html',
  styleUrls: ['./registrar-module.component.scss']
})
export class RegistrarModuleComponent implements OnInit {

  // Variables de la vista.
  public nombre: string;
  public apellidos: string;
  public email: string;
  public usuario: string;
  public password: string;
  public repeatPassword: string;

  // Inyección servicio Auth.
  constructor(
    public authService: AuthService,
    public router: Router
  ) { }

  ngOnInit() {

  }

  onSubmitRegisterAddUser() {
    console.log("Función onSubmitRegisterAddUser() ejecutandose...");
    // Mostrar por la consola la respuesta de firebase, controlado por manejador
    this.authService.registerUser(this.email, this.password)
      .then( (res) => {
        console.log('Usuario registrado correctamente.');
        console.log(res);
        // Programar un alert para decirle al usuario que se ha registrado correctamente.
        this.router.navigate(['/']);
      }).catch( 
        (err) => {
          console.log(err);
          // Programar un alert para decirle al usuario que no s eha podido registrar.
        }
      )
  }

  // Método de prueba
  mostrarDatos() {
    console.log(this.nombre);
    console.log(this.apellidos);
    console.log(this.email);
    console.log(this.usuario);
    console.log(this.password);
    console.log(this.repeatPassword);
    this.onSubmitRegisterAddUser();
  }

}
