import { Component, OnInit } from '@angular/core';

// Importar servicio Auth
import { AuthService } from "../services/auth.service";

// Importar Router, para redirecionarnos.
import { Router } from "@angular/router";

@Component({
  selector: 'app-registrar-module',
  templateUrl: './registrar-module.component.html',
  styleUrls: ['./registrar-module.component.scss']
})
export class RegistrarModuleComponent implements OnInit {

  // Variables de la vista(provisional, crear oibjeto usuario).
  public nombre: string;
  public apellidos: string;
  public email: string;
  public usuario: string;
  public password: string;
  public repeatPassword: string;

  // Flags
  private enableAlert: boolean;

  // Mensaje.
  private message: string;

  // Inyección servicio Auth.
  constructor(
    public authService: AuthService,
    public router: Router
  ) { }

  ngOnInit() {
    this.enableAlert = false;
  }

  onSubmitRegisterAddUser() {
    // Comprobar que las contrseñas coincidan y que todos los campos estén completos.
    let flag: boolean = true;
    
    flag = this.checkFields();
    
    if (flag) {
      
      flag = this.checkPassword();

      if (flag) {
        this.addUser();
      } else {
        this.enableAlert = true;
        this.message = "Compruebe que las contraseñas son iguales."
      }
    } else {
      // Crear mensaje de alerta y activarlo.
      this.enableAlert = true;
      this.message = "Todos los campos son obligatorios."
    }
    
  }

  checkPassword(): boolean {
    if(this.password === this.repeatPassword) {
      return true;
    } else {
      return false;
    }
  }

  checkFields(): boolean {
    if ((this.nombre && this.apellidos && this.email && this.usuario && this.password && this.repeatPassword) !== undefined) {
      return true;
    } else {
      return false;
    }
  }

  checkErr(err: any) {
    this.enableAlert = true;

    if (err.code === "auth/invalid-email") {
      this.message = "Formato del email incorrecto."
    }

    if (err.code === "auth/weak-password") {
      this.message = "La contraseña debe tener al menos 6 caracteres."
    }

    if (err.code === "auth/email-already-in-use") {
      this.message = "Ya existe un usuario con este email."
    }
  }

  addUser() {
    // Esto deberia ir en el userDAO.
    console.log("Función onSubmitRegisterAddUser() ejecutandose...");
    // Mostrar por la consola la respuesta de firebase, controlado por manejador
    this.authService.registerUser(this.email, this.password)
      .then( (res) => {
        console.log('Usuario registrado correctamente.');
        console.log(res);
        // Programar un alert para decirle al usuario que se ha registrado correctamente.
        this.router.navigate(['registrado']);
      }).catch( 
        (err) => {
          console.log(err);
          this.checkErr(err);
        }
      )
  }

  closeAlert() {
    // Cerramos la alerta y reseteamos las variables.
    this.enableAlert = false;
    this.message = "";
  }

  onVolver() {
    this.router.navigate(['']);
  }

  // Método de prueba
  /*mostrarDatos() {
    console.log(this.nombre);
    console.log(this.apellidos);
    console.log(this.email);
    console.log(this.usuario);
    console.log(this.password);
    console.log(this.repeatPassword);
    this.onSubmitRegisterAddUser();
  }*/

}
